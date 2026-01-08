// === Player2 Integration Variables ===
let p2Token = null;
let p2EventSource = null;

let currentNpcKey = null;   // e.g., "ルナ" or "カイト"
let currentNpcId = null;    // UUID of the currently open NPC

const npcIds = {};          // Persistent storage: { "ルナ": "uuid", "カイト": "uuid", ... }

const API_BASE = 'https://api.player2.game/v1';
const OAUTH_BASE = 'https://player2.game';

function getAdventurerByName(name) {
    return gameState.adventurers.find(adv => adv.name === name);
}

// === バッグ初期化（保険） ===
function initializeAdventurerBag(adventurer) {
    if (!adventurer.bag) {
        adventurer.bag = { gold: 0, items: {} };
    }
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
});

async function spawnNpc(npcKey) {
    if (!p2Token) {
        better_alert('Player2にログインしてください', 'warning');
        player2Login();
        return;
    }

    // Reuse if already spawned
    if (npcIds[npcKey]) {
        currentNpcId = npcIds[npcKey];
        return;
    }

    const config = npcConfigs[npcKey];
    if (!config) {
        better_alert('このキャラクターは未対応です', 'error');
        return;
    }

    const adventurer = getAdventurerByName(npcKey);
    if (!adventurer) {
        better_alert('冒険者データが見つかりません', 'error');
        return;
    }

    initializeAdventurerBag(adventurer); // 保険

    const currentFriendliness = adventurer.Friendliness || 70;

    const spawnBody = {
        name: config.name,
        short_name: config.short_name,
        character_description: config.character_description,
        system_prompt: config.system_prompt.replace(/\{player\}/g, playerName || 'あなた'),
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
                            description: "Change in friendliness (-20 to +20). Positive for kind/nice messages, negative for rude/insulting."
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
                        gold: { type: "integer", description: "渡すゴールド量（0ならなし）" },
                        items: { type: "object", description: "アイテム名: 数量 のオブジェクト（例: {\"薬草\": 3}）" }
                    },
                    required: []
                }
            }
        ]
    };

    console.log(`Spawning ${npcKey} with body:`, JSON.stringify(spawnBody, null, 2));

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
    console.log(`${npcKey} spawned! Cleaned ID:`, id);

    if (!p2EventSource) startResponseListener();

    better_alert(`${npcKey}が準備できました！話しかけてください♪`, 'success');
}

function startResponseListener() {
    if (p2EventSource) return;

    p2EventSource = new EventSource(`${API_BASE}/npcs/responses?token=${p2Token}`);

    p2EventSource.addEventListener('npc-message', (e) => {
        try {
            const data = JSON.parse(e.data);
            console.log('Parsed full data:', data);

            if (data.npc_id !== currentNpcId) return;

            // Handle commands
            if (data.command && Array.isArray(data.command)) {
                data.command.forEach(cmd => {
                    let args = cmd.arguments;
                    if (typeof args === 'string') {
                        try {
                            args = JSON.parse(args);
                        } catch (parseErr) {
                            console.warn('Failed to parse string arguments:', args, parseErr);
                            return;
                        }
                    }

                    const adv = getAdventurerByName(currentNpcKey);
                    initializeAdventurerBag(adv);

                    if (cmd.name === 'adjust_friendliness' && args && typeof args.delta === 'number') {
                        const delta = Math.max(-20, Math.min(20, args.delta));
                        adv.Friendliness = Math.max(0, Math.min(100, (adv.Friendliness || 70) + delta));
                        console.log(`Friendliness for ${currentNpcKey} adjusted by ${delta}. New: ${adv.Friendliness}`);
                        better_alert(`${currentNpcKey}の好感度 ${delta > 0 ? '+' : ''}${delta}`, "friendliness", { delta: delta });
                        const friendlinessEl = document.getElementById(`friendliness-${currentNpcKey}`);
                        if (friendlinessEl) {
                            friendlinessEl.textContent = `好感度: ${adv.Friendliness}`;
                        }
                    }

                    if (cmd.name === 'give_to_player') {
                        const gold = args.gold || 0;
                        const items = args.items || {};

                        const adv = getAdventurerByName(currentNpcKey);
                        initializeAdventurerBag(adv);

                        // ゴールド
                        if (gold > 0) {
                            const giveGold = Math.min(gold, adv.bag.gold);
                            if (giveGold > 0) {
                                gameState.gold += giveGold;
                                adv.bag.gold -= giveGold;
                                better_alert(`${currentNpcKey}が${giveGold}ゴールドをくれた！`, 'success');
                            }
                        }

                        // アイテム
                        for (const [itemName, qty] of Object.entries(items)) {
                            const giveQty = Math.min(qty, adv.bag.items[itemName] || 0);
                            if (giveQty > 0) {
                                // プレイヤーのinventoryに追加（元のaddToInventoryロジックに準拠）
                                // ここでは簡易的にスタック品として扱う（装備品も仮にスタック扱い、必要なら拡張）
                                let playerItem = gameState.inventory.find(i => i.name === itemName && !i.stat);
                                if (playerItem) {
                                    playerItem.qty = (playerItem.qty || 1) + giveQty;
                                } else {
                                    gameState.inventory.push({
                                        name: itemName,
                                        qty: giveQty,
                                        id: gameState.nextId++
                                    });
                                }

                                // NPCバッグから減らす
                                adv.bag.items[itemName] -= giveQty;
                                if (adv.bag.items[itemName] <= 0) delete adv.bag.items[itemName];

                                better_alert(`${currentNpcKey}が${itemName} x${giveQty}をくれた！`, 'success');
                            }
                        }

                        updateNpcBagDisplay();
                        populateGiftItems();
                        updateGiftQtyMax();
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

                message = message.replace(/\{player\}/g, playerName || 'あなた');

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
function updateNpcBagDisplay() {
    const adv = getAdventurerByName(currentNpcKey);
    if (!adv || !adv.bag) return;
    const bag = adv.bag;
    const itemList = Object.entries(bag.items)
        .map(([name, qty]) => `${name} x${qty}`)
        .join("<br>") || "なし";
    const display = document.getElementById('npcBagDisplay');
    if (display) {
        display.innerHTML = `<strong>${currentNpcKey}のバッグ:</strong><br>ゴールド: ${bag.gold}<br>アイテム:<br>${itemList}`;
    }
}

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
        const isEquipment = !!item.stat; // statがあれば装備品

        let label = name;
        if (!isEquipment) {
            label += ` (${qty}個)`;
        }

        const opt = new Option(label, item.id); // valueはユニークID（装備品対応）
        opt.dataset.isEquipment = isEquipment;
        opt.dataset.qty = qty;
        select.appendChild(opt);
    });
}

// === 贈り物UI: 数量入力の表示/最大値を更新 ===
function updateGiftQtyMax() {
    const select = document.getElementById('giftItemSelect');
    const qtyInput = document.getElementById('giftQtyInput');
    const qtyContainer = qtyInput.parentElement; // 数量入力全体のdiv

    if (!select || !qtyInput || !qtyContainer) return;

    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption || !selectedOption.value) {
        qtyInput.style.display = 'none';
        document.querySelector('#giftSection span')?.style.setProperty('display', 'none'); // "個"のspan
        return;
    }

    const isEquipment = selectedOption.dataset.isEquipment === 'true';
    if (isEquipment) {
        // 装備品: 数量入力非表示（1個固定）
        qtyInput.style.display = 'none';
        document.querySelector('#giftSection span')?.style.setProperty('display', 'none');
        qtyInput.value = 1;
    } else {
        // スタック品: 数量入力表示
        qtyInput.style.display = 'inline-block';
        document.querySelector('#giftSection span')?.style.setProperty('display', 'inline');
        const max = parseInt(selectedOption.dataset.qty) || 1;
        qtyInput.max = max;
        if (parseInt(qtyInput.value) > max || parseInt(qtyInput.value) < 1) {
            qtyInput.value = max > 0 ? 1 : 0;
        }
    }
}

// === 贈り物送信関数 ===
async function giveGoldToNpc() {
    if (!currentNpcId || !currentNpcKey) return;
    const amount = parseInt(document.getElementById('giftGoldInput').value) || 0;
    if (amount <= 0 || amount > gameState.gold) {
        better_alert('ゴールドが不足しているか無効です', 'error');
        return;
    }

    gameState.gold -= amount;
    const adv = getAdventurerByName(currentNpcKey);
    initializeAdventurerBag(adv);
    adv.bag.gold += amount;

    updateNpcBagDisplay();
    appendPlayerMessage(`あなたは${currentNpcKey}に${amount}ゴールドを渡した`);
    document.getElementById('giftGoldInput').value = 0;

    const playerMsg = `(プレイヤーが${amount}ゴールドを渡した)`;
    const friendliness = adv.Friendliness || 70;
    const itemList = Object.entries(adv.bag.items).map(([k,v]) => `${k} x${v}`).join(", ") || "none";
    const bagInfo = `Your bag: Gold ${adv.bag.gold}, Items: ${itemList}.`;

    await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: playerName || 'Player',
            sender_message: playerMsg,
            game_state_info: `Current friendliness: ${friendliness}/100. ${bagInfo}`
        })
    });
}

async function giveItemToNpc() {
    if (!currentNpcId || !currentNpcKey) return;

    const select = document.getElementById('giftItemSelect');
    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption || !selectedOption.value) {
        better_alert('アイテムを選択してください', 'error');
        return;
    }

    const itemId = selectedOption.value;
    const item = gameState.inventory.find(i => i.id == itemId); // == で文字列/数値対応
    if (!item) {
        better_alert('アイテムが見つかりません', 'error');
        return;
    }

    let qty = 1;
    if (!item.stat) { // スタック品
        qty = parseInt(document.getElementById('giftQtyInput').value) || 0;
        if (qty <= 0 || qty > (item.qty || 1)) {
            better_alert('数量が無効です', 'error');
            return;
        }
    }

    // プレイヤーinventoryから削除/減らす
    if (item.stat || (item.qty || 1) === qty) {
        // 装備品 or 全量: 完全削除
        gameState.inventory = gameState.inventory.filter(i => i !== item);
    } else {
        // スタック品の一部: qty減らす
        item.qty -= qty;
    }

    // NPCバッグに追加（シンプルにname: qty でスタック）
    const adv = getAdventurerByName(currentNpcKey);
    initializeAdventurerBag(adv);
    adv.bag.items[item.name] = (adv.bag.items[item.name] || 0) + qty;

    updateNpcBagDisplay();
    populateGiftItems();
    updateGiftQtyMax();

    appendPlayerMessage(`あなたは${currentNpcKey}に${item.name}を${qty > 1 ? qty + '個' : ''}渡した`);

    // NPCに通知
    const playerMsg = `(プレイヤーが${item.name}を${qty > 1 ? qty + '個' : '1個'}渡した)`;
    const friendliness = adv.Friendliness || 70;
    const itemList = Object.entries(adv.bag.items).map(([k, v]) => `${k} x${v}`).join(", ") || "none";
    const bagInfo = `Your bag: Gold ${adv.bag.gold}, Items: ${itemList}.`;

    await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: playerName || 'Player',
            sender_message: playerMsg,
            game_state_info: `Current friendliness: ${friendliness}/100. ${bagInfo}`
        })
    });
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

    const adv = getAdventurerByName(npcKey);
    initializeAdventurerBag(adv);
    populateGiftItems();
    updateGiftQtyMax();
    updateNpcBagDisplay();

    // === Proactive initiation logic ===
    const friendliness = adv?.Friendliness ?? 70;

    let chance = 0;
    if (friendliness >= 80) chance = 0.95;
    else if (friendliness >= 60) chance = 0.7;
    else if (friendliness >= 40) chance = 0.4;
    else if (friendliness >= 20) chance = 0.15;

    if (Math.random() < chance) {
        const itemList = Object.entries(adv.bag.items).map(([k,v]) => `${k} x${v}`).join(", ") || "none";
        const bagInfo = `Your bag: Gold ${adv.bag.gold}, Items: ${itemList}.`;

        await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${p2Token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender_name: playerName || 'Player',
                sender_message: '',
                game_state_info: `Current friendliness: ${friendliness}/100. Player has just opened the chat and is waiting for you to speak. ${bagInfo}`
            })
        });
    }
}

function closeNpcChat() {
    document.getElementById('lunaChatModal').style.display = 'none';
    currentNpcKey = null;
    currentNpcId = null;
}

function appendNpcMessage(text) {
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
    div.innerHTML = `<strong>${playerName || 'あなた'}:</strong> ${text.replace(/\n/g, '<br>')}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

async function sendNpcMessage() {
    const input = document.getElementById('lunaInput');
    const message = input.value.trim();
    if (!message || !currentNpcId) return;

    appendPlayerMessage(message);
    input.value = '';

    const adv = getAdventurerByName(currentNpcKey);
    initializeAdventurerBag(adv);
    const currentFriendliness = adv ? (adv.Friendliness || 70) : 70;
    const itemList = Object.entries(adv.bag.items).map(([k,v]) => `${k} x${v}`).join(", ") || "none";
    const bagInfo = `Your bag: Gold ${adv.bag.gold}, Items: ${itemList}.`;

    await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: playerName || 'Player',
            sender_message: message,
            game_state_info: `Current friendliness toward player: ${currentFriendliness}/100. ${bagInfo}`
        })
    });
}