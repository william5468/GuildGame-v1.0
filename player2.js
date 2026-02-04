// === Player2 Integration Variables ===
let p2Token = null;
let p2EventSource = null;

let currentNpcKey = null;   // e.g., "ルナ" or "カイト"
let currentNpcId = null;    // UUID of the currently open NPC

const npcIds = {};          // Persistent storage: { "ルナ": "uuid", "カイト": "uuid", ... }

const API_BASE = 'https://api.player2.game/v1';
const OAUTH_BASE = 'https://player2.game';

let proactiveTypingTimeout = null; // プロアクティブ用タイムアウト

const langMap = {
    'ja': '日本語',
    'en': 'English',
    'zh': '中文'  // Traditional Chinese
};

const currentLang_player2 = localStorage.getItem('gameLang') || 'ja';
const responseLanguage = langMap[currentLang_player2] || '日本語';
const languageInstruction = `なるべく${responseLanguage}で返事してください`;

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

                            if (isNaN(giveQty) || giveQty <= 0) {
                                console.warn(`Invalid quantity detected: ${value.qty} - forcing to 1`);
                                giveQty = 1;
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

    const chatInput = document.getElementById('lunaInput');
    let message = chatInput.value.trim();

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

    const isGift = goldAmount > 0 || !!itemGift;
    if (!message && !isGift) {
        better_alert('メッセージまたは贈り物を入力してください', 'warning');
        return;
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

    // 贈り物処理
    let recentGiftInfos = [];

    const entity = getEntityByName(currentNpcKey);
    initializeEntityBag(entity);

    if (goldAmount > 0) {
        gameState.gold -= goldAmount;
        entity.bag.gold += goldAmount;
        recentGiftInfos.push(`ゴールド ${goldAmount}`);
        goldInput.value = '';
    }

    if (itemGift) {
        const { item, qty } = itemGift;
        if (item.stat || qty === (item.qty || 1)) {
            gameState.inventory = gameState.inventory.filter(i => i !== item);
        } else {
            item.qty -= qty;
        }
        const existing = entity.bag.items.find(i => i.name === item.name && JSON.stringify({ ...i, qty: undefined }) === JSON.stringify({ ...item, qty: undefined, id: undefined }));
        if (existing) {
            existing.qty = (existing.qty || 1) + qty;
        } else {
            const newItem = { name: item.name, qty };
            Object.assign(newItem, { ...item });
            delete newItem.id;
            entity.bag.items.push(newItem);
        }
        recentGiftInfos.push(`${item.name} x${qty}`);
    }

    updateNpcBagDisplay();
    populateGiftItems();
    updateGiftQtyMax();

    // ログ
    if (message) {
        appendPlayerMessage(message);
    }
    if (recentGiftInfos.length > 0) {
        const giftLog = recentGiftInfos.join(' と ');
        appendPlayerMessage(`あなたは${currentNpcKey}に ${giftLog} を贈り物として渡した`);
    }

    chatInput.value = '';

    // 経過日数
    if (!gameState.lastNpcChatDay) gameState.lastNpcChatDay = {};
    const lastDay = gameState.lastNpcChatDay[currentNpcKey] || 0;
    const daysSinceLast = gameState.day - lastDay;

    const friendliness = entity.Friendliness || 70;
    const itemList = entity.bag.items.map(it => `${it.name} x${it.qty || 1}`).join(", ") || "none";
    const bagInfo = `${currentNpcKey}のバッグ: ゴールド ${entity.bag.gold}, アイテム: ${itemList}.`;
    const questGuidance = getQuestGuidance();

    let recentGiftInfo = '';
    if (recentGiftInfos.length > 0) {
        recentGiftInfo = recentGiftInfos.map(info => `プレイヤーから贈り物を受け取りました: ${info}.`).join(' ');
    }

    const game_state_info = `${languageInstruction} 好感度: ${friendliness}/100. 前回話してから経った日数: ${daysSinceLast}.${recentGiftInfo ? ' ' + recentGiftInfo : ''} ${bagInfo}${questGuidance ? ' ' + questGuidance : ''}`;

    // 贈り物情報準備
    const giftedGold = goldAmount;
    const giftedItems = [];
    if (goldAmount > 0) giftedItems.push({ name: "ゴールド", qty: goldAmount });
    if (itemGift) giftedItems.push({ name: itemGift.item.name, qty: itemGift.qty });

    // プレイヤーメッセージでクエストチェック（keyword / keyword_and_itemのkeyword部分）
    checkQuestProgress(message.toLowerCase(), "", isGift, giftedGold, giftedItems);

    showNpcTyping();

    const response = await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: gameState.playerName || 'Player',
            sender_message: message,
            game_state_info: game_state_info
        })
    });


    gameState.lastNpcChatDay[currentNpcKey] = gameState.day;
}


function changeAiProvider() {
    const currentProvider = localStorage.getItem('aiProvider') || 'player2';
    const hasOpenRouterKey = !!localStorage.getItem('openRouterApiKey');
    const hasGeminiKey = !!localStorage.getItem('geminiApiKey');

    let msg = `現在のテキスト生成AIプロバイダー: ${currentProvider === 'openrouter' ? 'OpenRouter' : 'Player2（デフォルト）'}\n`;
    if (currentProvider === 'openrouter') {
        msg += `（OpenRouter APIキー: ${hasOpenRouterKey ? '登録済み' : '未登録'}）\n`;
    }
    msg += `\n音声生成（TTS）用Gemini APIキー: ${hasGeminiKey ? '登録済み' : '未登録'}\n`;
    msg += `(Geminiは音声生成専用です。テキスト生成には使用されません)\n\n`;

    msg += '何をしますか？\n\n';
    msg += '1 = Player2 に切り替える（デフォルト）\n';
    msg += '2 = OpenRouter に切り替える\n';
    msg += '3 = OpenRouter APIキーのみ変更・入力する\n';
    msg += '4 = OpenRouter APIキーを削除する\n\n';
    msg += '5 = Gemini APIキー（音声用）を入力・変更する\n';
    msg += '6 = Gemini APIキー（音声用）を削除する\n\n';
    msg += '番号を入力してください';

    const choice = prompt(msg, "1");

    // === Player2 切り替え ===
    if (choice === "1") {
        localStorage.setItem('aiProvider', 'player2');
        better_alert("テキスト生成AIを Player2 に変更しました", 'success');
    }

    // === OpenRouter 関連 ===
    else if (choice === "2") {
        let key = localStorage.getItem('openRouterApiKey');

        if (!key) {
            key = prompt(
                "OpenRouter APIキーを入力してください\n" +
                "(https://openrouter.ai/keys から無料で取得できます)\n" +
                "キャンセルするとPlayer2に戻ります",
                ""
            );
            if (!key || key.trim() === '') {
                better_alert("APIキーが入力されませんでした。Player2のままにします。", 'warning');
                localStorage.setItem('aiProvider', 'player2');
                return;
            }
            localStorage.setItem('openRouterApiKey', key.trim());
            better_alert("OpenRouter APIキーを保存しました", 'success');
        } else {
            better_alert("既存のOpenRouter APIキーを使用します", 'basic');
        }

        localStorage.setItem('aiProvider', 'openrouter');
        better_alert("テキスト生成AIを OpenRouter に変更しました", 'success');
    }
    else if (choice === "3") {
        const newKey = prompt(
            "新しいOpenRouter APIキーを入力してください\n" +
            "(https://openrouter.ai/keys から取得)\n" +
            "空欄でキャンセル",
            ""
        );

        if (newKey === null || newKey.trim() === '') {
            better_alert("変更をキャンセルしました", 'basic');
            return;
        }

        localStorage.setItem('openRouterApiKey', newKey.trim());
        better_alert("OpenRouter APIキーを更新しました", 'success');

        if (currentProvider === 'openrouter') {
            better_alert("次回のNPC会話から新しいキーが使用されます", 'basic');
        }
    }
    else if (choice === "4") {
        if (hasOpenRouterKey) {
            localStorage.removeItem('openRouterApiKey');
            better_alert("OpenRouter APIキーを削除しました", 'success');

            if (currentProvider === 'openrouter') {
                localStorage.setItem('aiProvider', 'player2');
                better_alert("APIキーがなくなったため、テキスト生成AIをPlayer2に自動切り替えしました", 'warning');
            }
        } else {
            better_alert("登録されているOpenRouter APIキーはありません", 'basic');
        }
    }

    // === Gemini APIキー（音声専用）関連 ===
    else if (choice === "5") {
        const newKey = prompt(
            "Gemini APIキー（音声生成用）を入力してください\n" +
            "(https://ai.google.dev/gemini-api から無料で取得できます)\n" +
            "キャンセルで変更なし",
            ""
        );

        if (newKey === null || newKey.trim() === '') {
            better_alert("変更をキャンセルしました", 'basic');
            return;
        }

        localStorage.setItem('geminiApiKey', newKey.trim());
        better_alert("Gemini APIキー（音声用）を保存・更新しました", 'success');
        better_alert("次回の音声生成から新しいキーが使用されます", 'basic');
    }
    else if (choice === "6") {
        if (hasGeminiKey) {
            localStorage.removeItem('geminiApiKey');
            better_alert("Gemini APIキー（音声用）を削除しました", 'success');
            better_alert("音声生成は停止します（テキスト表示は継続）", 'basic');
        } else {
            better_alert("登録されているGemini APIキーはありません", 'basic');
        }
    }

    // === 無効な選択 ===
    else {
        better_alert("無効な選択です。キャンセルしました。", 'warning');
    }
}

// === openNpcChat 関数全体（キーワード提案セクション追加版） ===
async function openNpcChat(npcKey) {
    if (!npcConfigs[npcKey] && !npcConfigs[npcKey.replace(/ .*/, '')]) {
        better_alert('このキャラクターのAIチャットは未対応です', 'warning');
        return;
    }

    currentNpcKey = npcKey;

    // ── AIプロバイダーの選択を読み込む ────────────────────────────────
    const savedProvider = localStorage.getItem('aiProvider') || 'player2';
    const useOpenRouter = (savedProvider === 'openrouter' && localStorage.getItem('openRouterApiKey'));

    if (useOpenRouter) {
        // OpenRouterを選択している＆APIキーが存在する場合
        if (typeof openOpenRouterChat === 'function') {
            await openOpenRouterChat(npcKey);
        } else {
            better_alert("OpenRouterチャット機能が読み込まれていません。\nopenrouter.js が正しく読み込まれているか確認してください。", 'error');
        }
        return; // ここで終了（Player2の処理はスキップ）
    }

    // ── 以下は Player2 の処理（従来のコード） ──────────────────────────

    const titleEl = document.querySelector('#lunaChatModal h2');
    if (titleEl) titleEl.textContent = `${npcKey}と会話`;

    const log = document.getElementById('lunaChatLog');
    if (log) log.innerHTML = '';

    document.getElementById('lunaChatModal').style.display = 'flex';

    // === キーワード提案セクションの動的作成（存在しなければ） ===
    let suggestionsDiv = document.getElementById('keywordSuggestions');
    if (!suggestionsDiv) {
        suggestionsDiv = document.createElement('div');
        suggestionsDiv.id = 'keywordSuggestions';
        suggestionsDiv.style.cssText = `
            margin: 8px 0;
            padding: 8px;
            background: rgba(30, 30, 40, 0.8);
            border-radius: 8px;
            max-height: 120px;
            overflow-y: auto;
            display: none;
            flex-wrap: wrap;
            gap: 6px;
        `;

        const inputContainer = document.getElementById('lunaInput').parentElement;
        inputContainer.parentElement.insertBefore(suggestionsDiv, inputContainer.nextSibling);
    }

    // === 入力フォーカスでキーワード提案を表示 ===
    const inputEl = document.getElementById('lunaInput');
    inputEl.onfocus = () => {
        const keywords = getRelevantKeywords(npcKey);
        if (keywords.length > 0) {
            suggestionsDiv.innerHTML = keywords.map(kw => 
                `<button type="button" style="
                    background: #5a4fcf;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 0.9em;
                    cursor: pointer;
                " onclick="appendKeyword('${kw.replace(/'/g, "\\'")}')">${kw}</button>`
            ).join('');
            suggestionsDiv.style.display = 'flex';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    };

    inputEl.onblur = () => {
        setTimeout(() => {
            suggestionsDiv.style.display = 'none';
        }, 200);
    };

    inputEl.focus();

    await spawnNpc(npcKey);

    // returnトリガー用チェック
    checkQuestProgress("", "", false, 0, []);

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
        const questGuidance = getQuestGuidance();

        const game_state_info = `${languageInstruction} 好感度: ${friendliness}/100. 前回話してから経った日数: ${daysSinceLast}. ${gameState.playerName}がこっちに来て、ちょっと話をしたいみたい. ${bagInfo}${questGuidance ? ' ' + questGuidance : ''}`;

        await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${p2Token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender_name: gameState.playerName || 'Player',
                sender_message: '',
                game_state_info: game_state_info
            })
        });

        gameState.lastNpcChatDay[npcKey] = gameState.day;
    } else {
        gameState.lastNpcChatDay[npcKey] = gameState.day;
    }
}

// === キーワード追加関数（グローバル） ===
function appendKeyword(keyword) {
    const input = document.getElementById('lunaInput');
    if (input) {
        input.value += (input.value.trim() ? ' ' : '') + keyword;
        input.focus();
    }
}


function getRelevantKeywords(npcKey) {
    const keywords = new Set();

    // 1. アクティブなクエストのdiscoveredKeywordsを追加（既存）
    Object.keys(gameState.activeQuests).forEach(questId => {
        const qState = gameState.activeQuests[questId];
        const def = questDefinitions.find(q => q.id === questId);
        if (!def) return;

        // このNPCが関わるクエストのみ
        const involvesNpc = def.stages.some(s => s.npc === npcKey || s.npc === "任何");
        if (!involvesNpc) return;

        // 発見済みキーワードを追加（過去のもの、会話の文脈として便利）
        qState.discoveredKeywords.forEach(kw => keywords.add(kw));
    });

    // 2. 新規追加: 未開始のクエストの開始キーワードを追加（最初のステージのnpcが一致する場合）
    questDefinitions.forEach(def => {
        const questId = def.id;
        // 既にアクティブ or 完了したクエストはスキップ
        if (gameState.activeQuests[questId] || gameState.completedQuests.includes(questId)) return;

        // 最初のステージのみチェック
        const firstStage = def.stages[0];
        if (!firstStage || firstStage.npc !== npcKey) return;

        // triggerがkeyword型の場合、そのkeywordsを追加
        if (firstStage.trigger && firstStage.trigger.type === "keyword" && Array.isArray(firstStage.trigger.keywords)) {
            firstStage.trigger.keywords.forEach(kw => keywords.add(kw));
        }
    });

    return Array.from(keywords);
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
    div.style.cssText = `
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 12px;
        max-width: 90%;
        align-self: flex-start;
    `;

    // NPCアバター（縦長画像をフル表示）
    const avatar = document.createElement('img');
    avatar.src = `Images/${currentNpcKey}.png`;
    avatar.style.cssText = `
        width: 80px;
        height: 120px;  /* 832:1248 ≈ 2:3 比率に合わせた縦長 */
        border-radius: 8px;  /* 円形をさらに弱く（ほぼ四角） */
        object-fit: contain;  /* 画像全体をトリミングせず表示（透明パディングOK） */
        background: transparent;  /* 背景透明 */
        flex-shrink: 0;
        border: 1px solid #cccccc;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    `;
    avatar.onerror = function() {
        this.src = 'Images/placeholder.png';
    };

    // メッセージバブル（白背景、黒文字）
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        background: #ffffff;
        color: #000000;
        padding: 14px 18px;
        border-radius: 18px;
        max-width: 100%;
        word-wrap: break-word;
        box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        border: 1px solid #e0e0e0;
    `;
    messageDiv.innerHTML = `
        <strong style="color:#333333; font-size:1.05em;">${currentNpcKey}:</strong><br>
        <span style="line-height:1.5;">${text.replace(/\n/g, '<br>')}</span>
    `;

    div.appendChild(avatar);
    div.appendChild(messageDiv);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;

    // NPC応答後のクエストチェック
    checkQuestProgress("", text.toLowerCase(), false, 0, []);
}

function appendPlayerMessage(text) {
    const log = document.getElementById('lunaChatLog');
    
    const div = document.createElement('div');
    div.style.cssText = `
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        margin-bottom: 20px;
        gap: 12px;
        max-width: 90%;
        align-self: flex-end;
    `;

    // メッセージバブル（白背景、黒文字）
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        background: #ffffff;
        color: #000000;
        padding: 14px 18px;
        border-radius: 18px;
        max-width: 100%;
        word-wrap: break-word;
        text-align: right;
        box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        border: 1px solid #e0e0e0;
    `;
    messageDiv.innerHTML = `
        <strong style="color:#333333; font-size:1.05em;">${gameState.playerName || 'あなた'}:</strong><br>
        <span style="line-height:1.5;">${text.replace(/\n/g, '<br>')}</span>
    `;

    // プレイヤーアバター（縦長画像フル表示）
    const avatar = document.createElement('img');
    avatar.src = 'Images/main_char.png';
    avatar.style.cssText = `
        width: 80px;
        height: 120px;
        border-radius: 8px;
        object-fit: contain;
        background: transparent;
        flex-shrink: 0;
        border: 1px solid #cccccc;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    `;
    avatar.onerror = function() {
        this.src = 'Images/placeholder.png';
    };

    div.appendChild(messageDiv);
    div.appendChild(avatar);
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