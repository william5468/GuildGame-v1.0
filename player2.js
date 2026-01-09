// === Player2 Integration Variables ===
let p2Token = null;
let p2EventSource = null;

let currentNpcKey = null;   // e.g., "ルナ" or "カイト"
let currentNpcId = null;    // UUID of the currently open NPC

const npcIds = {};          // Persistent storage: { "ルナ": "uuid", "カイト": "uuid", ... }

const API_BASE = 'https://api.player2.game/v1';
const OAUTH_BASE = 'https://player2.game';

let proactiveTypingTimeout = null; // プロアクティブ用タイムアウト


// === NPC/冒険者を統一的に取得（adventurers優先、なければvillageNPCs） ===
function getEntityByName(name) {
    // まず冒険者リストから検索（ルナ・カイトなど）
    let entity = gameState.adventurers.find(adv => adv.name === name);
    if (entity) return entity;

    // なければvillageNPCsから検索
    if (!gameState.villageNPCs) gameState.villageNPCs = {};
    return gameState.villageNPCs[name];
}

// === バッグ・好感度初期化（エンティティ汎用） ===
function initializeEntityBag(entity) {
    if (!entity.bag || !Array.isArray(entity.bag.items)) {
        entity.bag = { gold: 0, items: [] };
    }
    if (entity.Friendliness === undefined) {
        entity.Friendliness = 70;
    }
}

// === NPCがタイピング中を表示 ===
function showNpcTyping() {
    const log = document.getElementById('lunaChatLog');
    if (!log) return;

    const existing = document.getElementById('npcTypingBubble');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = 'npcTypingBubble';
    div.style.marginBottom = '15px';
    div.style.color = '#cccccc';
    div.style.fontSize = '1.1em';
    div.innerHTML = `
        <strong>${currentNpcKey}:</strong>
        <span style="margin-left:8px; opacity:0.7;">typing</span>
        <div class="typing-indicator" style="display:inline-block; margin-left:8px;">
            <span></span><span></span><span></span>
        </div>
    `;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

// === タイピングインジケーターを非表示 ===
function hideNpcTyping() {
    const bubble = document.getElementById('npcTypingBubble');
    if (bubble) bubble.remove();
}

async function player2Login() {
    if (p2Token) return;

    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('p2_verifier', verifier);

    const params = new URLSearchParams({
        client_id: '019b93e3-f6e6-74a6-83da-fc4774460837',
        redirect_uri: 'https://william5468.github.io/GuildGame-v1.0/',
        response_type: 'code',
        scope: 'npc.spawn npc.chat npc.responses',
        code_challenge: challenge,
        code_challenge_method: 'S256'
    });

    window.location.href = `${OAUTH_BASE}/authorize?${params}`;
}

function generateCodeVerifier() {
    const array = new Uint8Array(43);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Handle redirect back
function handlePlayer2Callback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const verifier = localStorage.getItem('p2_verifier');
    if (!verifier) return;

    fetch('https://api.player2.game/v1/login/authorization_code/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code: code,
            code_verifier: verifier,
            redirect_uri: 'https://william5468.github.io/GuildGame-v1.0/',
            client_id: '019b93e3-f6e6-74a6-83da-fc4774460837'
        })
    })
    .then(res => {
        if (!res.ok) {
            res.text().then(text => console.error('Token response:', text));
            throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        p2Token = data.p2Key;
        localStorage.setItem('p2_token', p2Token);
        localStorage.removeItem('p2_verifier');
        history.replaceState(null, '', '/GuildGame-v1.0/');
        better_alert('Player2ログイン成功！NPCと話せます', 'success');
    })
    .catch(err => {
        console.error('Token exchange failed:', err);
        better_alert('ログイン失敗 - 再試行してください', 'error');
    });
}

window.addEventListener('load', () => {
    p2Token = localStorage.getItem('p2_token');
    handlePlayer2Callback();

    if (typeof gameState !== 'undefined') {
        if (!gameState.lastNpcChatDay) gameState.lastNpcChatDay = {};
    }
});

async function spawnNpc(npcKey) {
    if (!p2Token) {
        better_alert('Player2にログインしてください', 'warning');
        player2Login();
        return;
    }

    if (npcIds[npcKey]) {
        currentNpcId = npcIds[npcKey];
        return;
    }

    const config = npcConfigs[npcKey];
    if (!config) {
        better_alert('このキャラクターは未対応です', 'error');
        return;
    }

    const spawnBody = {
        name: config.name,
        short_name: config.short_name,
        character_description: config.character_description,
        system_prompt: config.system_prompt.replace(/\{player\}/g, gameState.playerName || 'あなた'),
        keep_game_state: true,
        tts: {
            audio_format: "mp3",
            speed: 1.0,
            voice_ids: ["01955d76-ed5b-7451-92d6-5ef579d3ed28"]
        },
        commands: [
            {
                name: "adjust_friendliness",
                description: "Adjust your friendliness toward the player based on their message.",
                parameters: {
                    type: "object",
                    properties: {
                        delta: {
                            type: "integer",
                            description: "Change in friendliness (-20 to +20)."
                        }
                    },
                    required: ["delta"]
                }
            },
            {
                name: "give_to_player",
                description: "プレイヤーにゴールドやアイテムをあげる",
                parameters: {
                    type: "object",
                    properties: {
                        gold: { type: "integer" },
                        items: { type: "object" }
                    },
                    required: []
                }
            },
            {
                name: "craft_item",
                description: "バッグのアイテムやゴールドを使って新しいアイテムを作成する（品質は投資額に応じて自然に）",
                parameters: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        type: { type: "string", enum: ["potion", "equipment"] },
                        subtype: { type: "string", description: "potion: 'hp'/'mp', equipment: stat名" },
                        quality: { type: "string", enum: ["excellent", "good", "normal", "bad"] },
                        consume_gold: { type: "integer" },
                        consume_items: { type: "object" }
                    },
                    required: ["name", "type", "subtype", "quality"]
                }
            }
        ]
    };

    const res = await fetch(`${API_BASE}/npcs/spawn`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spawnBody)
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error('Spawn error:', res.status, errText);
        better_alert('NPC作成失敗: ' + errText, 'error');
        return;
    }

    const idText = await res.text();
    const id = idText.replace(/^"|"$/g, '').trim();
    npcIds[npcKey] = id;
    currentNpcId = id;

    localStorage.setItem('p2_npcIds', JSON.stringify(npcIds));

    if (!p2EventSource) startResponseListener();

    better_alert(`${npcKey}が準備できました！話しかけてください♪`, 'success');
}

function startResponseListener() {
    if (p2EventSource) return;

    p2EventSource = new EventSource(`${API_BASE}/npcs/responses?token=${p2Token}`);

    p2EventSource.addEventListener('npc-message', (e) => {
        try {
            const data = JSON.parse(e.data);

            if (data.npc_id !== currentNpcId) return;

            hideNpcTyping();
            if (proactiveTypingTimeout) {
                clearTimeout(proactiveTypingTimeout);
                proactiveTypingTimeout = null;
            }

            if (data.command && Array.isArray(data.command)) {
                data.command.forEach(cmd => {
                    let args = cmd.arguments;
                    if (typeof args === 'string') args = JSON.parse(args);

                    const entity = getEntityByName(currentNpcKey);
                    initializeEntityBag(entity);

                    if (cmd.name === 'adjust_friendliness') {
                        const delta = Math.max(-20, Math.min(20, args.delta || 0));
                        entity.Friendliness = Math.max(0, Math.min(100, (entity.Friendliness || 70) + delta));
                        better_alert(`${currentNpcKey}の好感度 ${delta > 0 ? '+' : ''}${delta}`, "friendliness", { delta: delta });
                    }

                    if (cmd.name === 'give_to_player') {
                        const gold = args.gold || 0;
                        const items = args.items || {};

                        if (gold > 0) {
                            const giveGold = Math.min(gold, entity.bag.gold);
                            if (giveGold > 0) {
                                gameState.gold += giveGold;
                                entity.bag.gold -= giveGold;
                                better_alert(`${currentNpcKey}が${giveGold}ゴールドをくれた！`, 'success');
                            }
                        }

                        for (const [key, value] of Object.entries(items)) {
                            let targetName = key;
                            let giveQty = 1;
                            let providedDetails = {};

                            if (typeof value === 'object' && value !== null) {
                                giveQty = value.qty || 1;
                                providedDetails = { ...value };
                                delete providedDetails.qty;
                                targetName = value.name || key;
                            } else {
                                giveQty = value;
                            }

                            const itemObj = entity.bag.items.find(i => i.name === targetName);
                            if (!itemObj || (itemObj.qty || 1) < giveQty) {
                                console.warn(`Give failed: insufficient ${targetName}`);
                                continue;
                            }

                            itemObj.qty = (itemObj.qty || 1) - giveQty;
                            if (itemObj.qty <= 0) {
                                entity.bag.items = entity.bag.items.filter(i => i !== itemObj);
                            }

                            const finalDetails = { ...itemObj };
                            delete finalDetails.qty;

                            let playerItem = gameState.inventory.find(i => i.name === targetName && JSON.stringify({ ...i, qty: undefined, id: undefined }) === JSON.stringify({ ...finalDetails, qty: undefined }));
                            if (playerItem) {
                                playerItem.qty = (playerItem.qty || 1) + giveQty;
                            } else {
                                const newItem = {
                                    name: targetName,
                                    qty: giveQty,
                                    id: gameState.nextId++,
                                    ...finalDetails
                                };
                                gameState.inventory.push(newItem);
                            }

                            better_alert(`${currentNpcKey}が${targetName} x${giveQty}をくれた！`, 'success');
                        }
                        updateNpcBagDisplay();
                        populateGiftItems();
                        updateGiftQtyMax();
                    }

                    if (cmd.name === 'craft_item') {
                        const { name, type, subtype, quality, consume_gold = 0, consume_items = {} } = args;

                        if (consume_gold > entity.bag.gold) return;
                        for (const [itemName, qty] of Object.entries(consume_items)) {
                            const itemObj = entity.bag.items.find(i => i.name === itemName);
                            if (!itemObj || (itemObj.qty || 1) < qty) return;
                        }

                        entity.bag.gold -= consume_gold;
                        for (const [itemName, qty] of Object.entries(consume_items)) {
                            const itemObj = entity.bag.items.find(i => i.name === itemName);
                            itemObj.qty -= qty;
                            if (itemObj.qty <= 0) entity.bag.items = entity.bag.items.filter(i => i !== itemObj);
                        }

                        let total_value = consume_gold;
                        for (const [itemName, qty] of Object.entries(consume_items)) {
                            let price = 50;
                            const template = gameState.inventory.find(i => i.name === itemName);
                            if (template) {
                                if (template.cost !== undefined) price = template.cost;
                                else if (template.minPrice !== undefined && template.maxPrice !== undefined) {
                                    price = (template.minPrice + template.maxPrice) / 2;
                                }
                            }
                            total_value += qty * price;
                        }

                        const qualityMult = {
                            excellent: 1.3,
                            good: 1.0,
                            normal: 0.8,
                            bad: 0.6
                        }[quality] || 1.0;

                        let itemDetails = {};
                        if (type === 'potion') {
                            let amount = Math.floor(total_value * 0.8 * qualityMult);
                            amount = Math.max(50, Math.min(amount, 600));
                            itemDetails = { type: 'potion', restore: subtype, amount };
                        } else if (type === 'equipment') {
                            let bonus = Math.floor(total_value / 30 * qualityMult);
                            bonus = Math.max(5, Math.min(bonus, 50));
                            itemDetails = { stat: subtype, bonus };
                        }

                        entity.bag.items.push({
                            name,
                            qty: 1,
                            ...itemDetails
                        });

                        better_alert(`${currentNpcKey}が${name}（${quality}品質）を作成した！`, 'success');
                        updateNpcBagDisplay();
                    }
                });
            }

            if (data.message) {
                let message = data.message
                    .replace(/\\u003c/g, '<')
                    .replace(/\\u003e/g, '>')
                    .replace(/<(Luna|Kaito)>/g, '')
                    .replace(/<\/(Luna|Kaito)>/g, '')
                    .trim();

                message = message.replace(/\{player\}/g, gameState.playerName || 'あなた');

                appendNpcMessage(message);
            }
        } catch (err) {
            console.warn('Parse error:', e.data, err);
        }
    });

    p2EventSource.addEventListener('ping', () => { /* silent */ });

    p2EventSource.onerror = () => {
        console.error('Stream error');
        better_alert('接続が切れました。再読み込みしてください', 'error');
        if (p2EventSource) p2EventSource.close();
    };
}

// === 贈り物UI関連関数 ===
function populateGiftItems() {
    const select = document.getElementById('giftItemSelect');
    if (!select) return;

    select.innerHTML = '<option value="">アイテム選択</option>';

    if (!gameState.inventory || !Array.isArray(gameState.inventory)) {
        gameState.inventory = [];
        return;
    }

    gameState.inventory.forEach(item => {
        const name = item.name;
        const qty = item.qty || 1;
        const isEquipment = !!item.stat;

        let label = name;
        if (!isEquipment) {
            label += ` (${qty}個)`;
        }

        const opt = new Option(label, item.id);
        opt.dataset.isEquipment = isEquipment;
        opt.dataset.qty = qty;
        select.appendChild(opt);
    });
}

function updateGiftQtyMax() {
    const select = document.getElementById('giftItemSelect');
    const qtyInput = document.getElementById('giftQtyInput');
    const qtySpan = document.querySelector('#giftSection span');

    if (!select || !qtyInput || !qtySpan) return;

    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption || !selectedOption.value) {
        qtyInput.style.display = 'none';
        qtySpan.style.display = 'none';
        return;
    }

    const isEquipment = selectedOption.dataset.isEquipment === 'true';
    if (isEquipment) {
        qtyInput.style.display = 'none';
        qtySpan.style.display = 'none';
        qtyInput.value = 1;
    } else {
        qtyInput.style.display = 'inline-block';
        qtySpan.style.display = 'inline';
        const max = parseInt(selectedOption.dataset.qty) || 1;
        qtyInput.max = max;
        if (parseInt(qtyInput.value) > max || parseInt(qtyInput.value) < 1) {
            qtyInput.value = max > 0 ? 1 : 0;
        }
    }
}

// === 単一送信関数：メッセージ + ゴールド贈り物 + アイテム贈り物を1回のAPIコールで処理 ===
async function submitChatAndGifts() {
    if (!currentNpcId || !currentNpcKey) return;

    // 入力取得
    const chatInput = document.getElementById('lunaInput');
    const message = chatInput.value.trim();

    const goldInput = document.getElementById('giftGoldInput');
    const goldAmount = parseInt(goldInput.value) || 0;

    const itemSelect = document.getElementById('giftItemSelect');
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    let itemGift = null;
    let itemQty = 1;
    if (selectedOption && selectedOption.value) {
        const itemId = selectedOption.value;
        const item = gameState.inventory.find(i => i.id == itemId);
        if (item) {
            if (!item.stat) {
                itemQty = parseInt(document.getElementById('giftQtyInput').value) || 1;
            }
            itemGift = { item, qty: itemQty };
        }
    }

    // バリデーション
    if (goldAmount > 0 && goldAmount > gameState.gold) {
        better_alert('ゴールドが不足しています', 'error');
        return;
    }
    if (itemGift && itemQty > (itemGift.item.qty || 1)) {
        better_alert('アイテム数量が不足しています', 'error');
        return;
    }

    // 贈り物処理（バッグ更新）
    let recentGiftInfos = [];

    const entity = getEntityByName(currentNpcKey);
    initializeEntityBag(entity);

    if (goldAmount > 0) {
        gameState.gold -= goldAmount;
        entity.bag.gold += goldAmount;
        recentGiftInfos.push(`Gold +${goldAmount}`);
        goldInput.value = '';
    }

    if (itemGift) {
        const { item, qty } = itemGift;
        // プレイヤーから削除
        if (item.stat || qty === (item.qty || 1)) {
            gameState.inventory = gameState.inventory.filter(i => i !== item);
        } else {
            item.qty -= qty;
        }
        // NPCに追加
        const existing = entity.bag.items.find(i => i.name === item.name && JSON.stringify({ ...i, qty: undefined }) === JSON.stringify({ ...item, qty: undefined, id: undefined }));
        if (existing) {
            existing.qty += qty;
        } else {
            const newItem = { name: item.name, qty };
            Object.assign(newItem, item);
            delete newItem.id;
            entity.bag.items.push(newItem);
        }
        recentGiftInfos.push(`${item.name} x${qty}`);
    }

    // UI更新
    updateNpcBagDisplay();
    populateGiftItems();
    updateGiftQtyMax();

    // ログ追加
    if (message) {
        appendPlayerMessage(message);
    }
    if (recentGiftInfos.length > 0) {
        appendPlayerMessage(`あなたは${currentNpcKey}に贈り物を渡した`);
    } else if (!message) {
        // 何も送らない場合（空送信防止）
        better_alert('メッセージまたは贈り物を入力してください', 'warning');
        return;
    }

    chatInput.value = '';

    // 経過日数計算
    if (!gameState.lastNpcChatDay) gameState.lastNpcChatDay = {};
    const lastDay = gameState.lastNpcChatDay[currentNpcKey] || 0;
    const daysSinceLast = gameState.day - lastDay;

    const friendliness = entity.Friendliness || 70;
    const itemList = entity.bag.items.map(it => `${it.name} x${it.qty || 1}`).join(", ") || "none";
    const bagInfo = `${currentNpcKey}のバッグ: ゴールド ${entity.bag.gold}, アイテム: ${itemList}.`;

    let recentGiftInfo = '';
    if (recentGiftInfos.length > 0) {
        recentGiftInfo = recentGiftInfos.map(info => `プレイヤーから贈り物を受け取りました: ${info}.`).join(' ');
    }

    showNpcTyping();

    await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: gameState.playerName || 'Player',
            sender_message: message,
            game_state_info: `好感度: ${friendliness}/100. 前回話してから経った日数: ${daysSinceLast}.${recentGiftInfo}. ${bagInfo}`
        })
    });

    // インタラクション発生でラスト日更新
    gameState.lastNpcChatDay[currentNpcKey] = gameState.day;
}

async function openNpcChat(npcKey) {
    if (!npcConfigs[npcKey]) {
        better_alert('このキャラクターのAIチャットは未対応です', 'warning');
        return;
    }

    currentNpcKey = npcKey;

    const titleEl = document.querySelector('#lunaChatModal h2');
    if (titleEl) titleEl.textContent = `${npcKey}と会話`;

    const log = document.getElementById('lunaChatLog');
    if (log) log.innerHTML = '';

    document.getElementById('lunaChatModal').style.display = 'flex';
    document.getElementById('lunaInput').focus();

    await spawnNpc(npcKey);

    if (!currentNpcId) return;

    const entity = getEntityByName(npcKey);
    if (!entity) {
        better_alert('キャラクターが見つかりません', 'error');
        return;
    }

    initializeEntityBag(entity);

    populateGiftItems();
    updateGiftQtyMax();
    updateNpcBagDisplay();

    document.getElementById('giftSection').style.display = 'none';
    document.getElementById('toggleGiftBtn').textContent = '贈り物 ▼';

    const friendliness = entity.Friendliness ?? 70;

    // 経過日数計算（安全初期化）
    if (!gameState.lastNpcChatDay) gameState.lastNpcChatDay = {};
    const lastDay = gameState.lastNpcChatDay[npcKey] || 0;
    const daysSinceLast = gameState.day - lastDay;

    let chance = 0;
    if (friendliness >= 80) chance = 0.95;
    else if (friendliness >= 60) chance = 0.7;
    else if (friendliness >= 40) chance = 0.4;
    else if (friendliness >= 20) chance = 0.15;

    if (Math.random() < chance) {
        showNpcTyping();

        proactiveTypingTimeout = setTimeout(() => {
            hideNpcTyping();
            proactiveTypingTimeout = null;
        }, 15000);

        const itemList = entity.bag.items.map(it => `${it.name} x${it.qty || 1}`).join(", ") || "none";
        const bagInfo = `${currentNpcKey}のバッグ: ゴールド ${entity.bag.gold}, アイテム: ${itemList}.`;

        await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${p2Token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender_name: gameState.playerName || 'Player',
                sender_message: '',
                game_state_info: `好感度: ${friendliness}/100. 前回話してから経った日数: ${daysSinceLast}. ${gameState.playerName}がこっちに来て、ちょっと話をしたいみたい. ${bagInfo}`
            })
        });

        gameState.lastNpcChatDay[npcKey] = gameState.day;
    } else {
        gameState.lastNpcChatDay[npcKey] = gameState.day;
    }
}

function closeNpcChat() {
    document.getElementById('lunaChatModal').style.display = 'none';
    currentNpcKey = null;
    currentNpcId = null;
    hideNpcTyping();
    if (proactiveTypingTimeout) {
        clearTimeout(proactiveTypingTimeout);
        proactiveTypingTimeout = null;
    }
}

function appendNpcMessage(text) {
    hideNpcTyping();
    const log = document.getElementById('lunaChatLog');
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.color = '#000000ff';
    div.style.fontSize = '1.1em';
    div.innerHTML = `<strong>${currentNpcKey}:</strong> ${text.replace(/\n/g, '<br>')}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function appendPlayerMessage(text) {
    const log = document.getElementById('lunaChatLog');
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.color = '#000000ff';
    div.style.textAlign = 'right';
    div.style.fontSize = '1.1em';
    div.innerHTML = `<strong>${gameState.playerName || 'あなた'}:</strong> ${text.replace(/\n/g, '<br>')}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function toggleGiftSection() {
    const section = document.getElementById('giftSection');
    const btn = document.getElementById('toggleGiftBtn');
    if (!section || !btn) return;

    if (section.style.display === 'none' || !section.style.display) {
        section.style.display = 'block';
        btn.textContent = '贈り物 ▲';
    } else {
        section.style.display = 'none';
        btn.textContent = '贈り物 ▼';
    }
}

function updateNpcBagDisplay() {
    const entity = getEntityByName(currentNpcKey);
    if (!entity || !entity.bag) return;

    const bag = entity.bag;
    const itemList = bag.items.map(it => {
        let str = `${it.name} x${it.qty || 1}`;
        if (it.type === 'potion') str += ` (回復: ${it.restore.toUpperCase()} +${it.amount})`;
        if (it.stat) str += ` (${it.stat} +${it.bonus}%)`;
        return str;
    }).join("<br>") || "なし";

    const display = document.getElementById('npcBagDisplay');
    if (display) {
        display.innerHTML = `<strong>${currentNpcKey}のバッグ:</strong><br>ゴールド: ${bag.gold}<br>アイテム:<br>${itemList}`;
    }
}