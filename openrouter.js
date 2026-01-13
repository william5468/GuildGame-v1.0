// openrouter.js
// This file handles the OpenRouter-specific NPC chat modal and interactions.
// It mirrors player2.js but uses a separate modal (OpenrouterChatModal) to avoid conflicts.
// Assumes index.html has been updated to include the OpenrouterChatModal HTML (copied from lunaChatModal with ID changes).
// Also assumes global variables like gameState, npcConfigs, etc., are available.

// === OpenRouter API Constants ===
const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';
const OPENROUTER_MODEL = 'xiaomi/mimo-v2-flash:free'; // Free roleplay-suitable model

let openRouterApiKey = localStorage.getItem('openRouterApiKey') || null;
let currentNpcKey_OR = null;
let currentNpcId_OR = null;

// Conversation history per NPC (stateful)
if (!gameState.npcConversations_OR) gameState.npcConversations_OR = {};

// === COMMAND INSTRUCTION (added to system prompt) ===
const commandInstruction = `

【コマンド出力ルール（絶対厳守）】
あなたはゲームシステムと連携するため、特定の行動が必要な場合にコマンドをJSON形式で出力します。
- コマンドを使う場合のみ、応答の最後に以下の形式でJSONを1つだけ出力してください。
- ロールプレイの会話テキストを先に自然に出力し、その後に1行空けてJSONを出力。
- コマンドを使わない場合はJSONを一切出力しない。

JSON形式（厳密にこの形式を守ってください）:
{"command": "コマンド名", "params": {パラメータ}}

使用可能なコマンド:
1. adjust_friendliness
   - 好感度を変更する場合に使用。
   - params: {"delta": 整数}  // -20～+20の範囲（例: +10, -5）

2. give_to_player
   - プレイヤーにゴールドやアイテムを渡す場合に使用。
   - params: {"gold": 整数（オプション）, "items": [{"name": "アイテム名", "qty": 整数}, ...]（オプション）}

3. craft_item
   - アイテムを作成する場合に使用（作成後、プレイヤーが欲しがったらgive_to_playerで渡す想定）。
   - params: {
       "name": "作成アイテム名",
       "type": "potion" または "equipment",
       "subtype": "hp"/"mp"/"status_heal"（potionの場合） または "STR"/"WIS"/"DEX"/"LUC"/"defense"（equipmentの場合）,
       "quality": "excellent"/"good"/"normal"/"bad",
       "consume_gold": 整数（消費ゴールド、0でも可）,
       "consume_items": [{"name": "素材名", "qty": 整数}, ...]（消費アイテム、オプション）
     }

例（好感度を+10する場合）:
「お前、今日はいい感じだな！」

{"command": "adjust_friendliness", "params": {"delta": 10}}

例（ゴールド100とHPポーション1個を渡す場合）:
「これ、持ってけよ。役に立つだろ。」

{"command": "give_to_player", "params": {"gold": 100, "items": [{"name": "HPポーション（小）", "qty": 1}]}}

- JSONは応答の最後に1つだけ。複数コマンドは不可。
- JSONが不正だとシステムが無視するので、必ず正しい形式で出力。
- ロールプレイが最優先：自然でキャラクターらしい会話を必ず出力してからJSON。
`.trim();

// === PROCESS COMMANDS FROM RESPONSE ===
function processOpenRouterCommands(fullResponse) {
    // Find ALL JSON command objects globally (supports code blocks, whitespace, multiple commands)
    const jsonRegex = /(?:```json[\s\n]*)?[\s\n]*(\{"command"\s*:\s*"[^"]+"\s*,\s*"params"\s*:\s*\{[\s\S]*?\}\})[\s\n]*(?:```)?/g;
    const matches = [...fullResponse.matchAll(jsonRegex)];

    let displayText = fullResponse;

    const entity = getEntityByName(currentNpcKey_OR);
    if (!entity) return displayText.trim() || '（応答がありました）';

    initializeEntityBag(entity);

    if (matches.length > 0) {
        // Remove ALL matched JSON blocks (including surrounding code fences/whitespace)
        matches.forEach(match => {
            displayText = displayText.replace(match[0], '');
        });

        // Clean up any leftover empty lines/spaces
        displayText = displayText.trim();
        if (!displayText || displayText.match(/^\s*$/)) {
            displayText = '（行動を実行しました）';
        }

        // Process each command sequentially
        for (const match of matches) {
            try {
                const cmdData = JSON.parse(match[1]);

                if (cmdData.command === 'adjust_friendliness') {
                    const delta = Math.max(-20, Math.min(20, cmdData.params.delta || 0));
                    const old = entity.Friendliness || 70;
                    entity.Friendliness = Math.max(0, Math.min(100, old + delta));
                    better_alert(`${currentNpcKey_OR}との好感度 ${delta > 0 ? '+' : ''}${delta}（${old} → ${entity.Friendliness}）`, 'friendliness', { delta });
                }
                else if (cmdData.command === 'give_to_player') {
                    // Gold: positive = NPC gives to player, negative = player pays NPC
                    if (cmdData.params.gold !== undefined) {
                        let goldDelta = cmdData.params.gold;
                        if (goldDelta > 0) {
                            const giveGold = Math.min(goldDelta, entity.bag.gold);
                            gameState.gold += giveGold;
                            entity.bag.gold -= giveGold;
                            better_alert(`ゴールド +${giveGold} をもらった！`, 'success');
                        } else if (goldDelta < 0) {
                            const payGold = Math.min(-goldDelta, gameState.gold);
                            gameState.gold -= payGold;
                            entity.bag.gold += payGold;
                            better_alert(`ゴールド ${goldDelta} を支払った`, 'basic');
                        }
                    }

                    // Items: positive qty = NPC gives to player, negative = player gives to NPC
                    if (Array.isArray(cmdData.params.items)) {
                        cmdData.params.items.forEach(gift => {
                            const qty = gift.qty || 1;
                            if (qty > 0) {
                                // NPC → Player
                                const npcItem = entity.bag.items.find(i => i.name === gift.name);
                                if (npcItem && npcItem.qty >= qty) {
                                    let playerItem = gameState.inventory.find(i => i.name === gift.name);
                                    if (!playerItem) {
                                        playerItem = { name: gift.name, qty: 0, ...npcItem };
                                        gameState.inventory.push(playerItem);
                                    }
                                    playerItem.qty += qty;
                                    npcItem.qty -= qty;
                                    if (npcItem.qty <= 0) {
                                        entity.bag.items = entity.bag.items.filter(i => i !== npcItem);
                                    }
                                    better_alert(`${gift.name} x${qty} をもらった！`, 'success');
                                }
                            } else if (qty < 0) {
                                // Player → NPC
                                const playerItem = gameState.inventory.find(i => i.name === gift.name);
                                if (playerItem && playerItem.qty >= -qty) {
                                    let npcItem = entity.bag.items.find(i => i.name === gift.name);
                                    if (!npcItem) {
                                        npcItem = { name: gift.name, qty: 0, ...playerItem };
                                        entity.bag.items.push(npcItem);
                                    }
                                    npcItem.qty += -qty;
                                    playerItem.qty += qty; // qty is negative
                                    if (playerItem.qty <= 0) {
                                        gameState.inventory = gameState.inventory.filter(i => i !== playerItem);
                                    }
                                    better_alert(`${gift.name} x${-qty} を渡した`, 'basic');
                                }
                            }
                        });
                    }
                    updateNpcBagDisplay_OR();
                    populateGiftItems_OR(); // Refresh gift dropdown
                }
                else if (cmdData.command === 'craft_item') {
                    // Consume resources
                    if (cmdData.params.consume_gold > 0) {
                        entity.bag.gold = Math.max(0, entity.bag.gold - cmdData.params.consume_gold);
                    }
                    if (Array.isArray(cmdData.params.consume_items)) {
                        cmdData.params.consume_items.forEach(cons => {
                            const item = entity.bag.items.find(i => i.name === cons.name);
                            if (item) {
                                item.qty = Math.max(0, item.qty - cons.qty);
                                if (item.qty <= 0) {
                                    entity.bag.items = entity.bag.items.filter(i => i !== item);
                                }
                            }
                        });
                    }

                    // Create item in NPC bag
                    let crafted = entity.bag.items.find(i => i.name === cmdData.params.name);
                    if (!crafted) {
                        crafted = {
                            name: cmdData.params.name,
                            qty: 0,
                            type: cmdData.params.type,
                            restore: cmdData.params.subtype.includes('hp') || cmdData.params.subtype.includes('mp') || cmdData.params.subtype === 'status_heal' ? cmdData.params.subtype : undefined,
                            stat: ['STR','WIS','DEX','LUC','defense'].includes(cmdData.params.subtype) ? cmdData.params.subtype : undefined,
                            amount: 100,
                            bonus: { excellent: 30, good: 20, normal: 10, bad: 5 }[cmdData.params.quality?.toLowerCase()] || 10
                        };
                        entity.bag.items.push(crafted);
                    }
                    crafted.qty += 1;

                    better_alert(`${currentNpcKey_OR}が${cmdData.params.name}を作成した！（品質: ${cmdData.params.quality}）`, 'success');
                    updateNpcBagDisplay_OR();
                }
            } catch (e) {
                console.warn('Failed to parse/execute one command JSON:', e, match[1]);
            }
        }
    }

    // Final cleanup
    return displayText.replace(/\s+$/, '') || '（応答がありました）';
}

// === Open OpenRouter Chat Modal ===
async function openOpenRouterChat(npcKey) {
    if (!openRouterApiKey) {
        better_alert('OpenRouter requires an API key. Please set it in settings.', 'warning');
        return;
    }

    if (!npcConfigs[npcKey]) {
        better_alert('This character is not supported for AI chat.', 'warning');
        return;
    }

    currentNpcKey_OR = npcKey;

    const titleEl = document.querySelector('#OpenrouterChatModal h2');
    if (titleEl) titleEl.textContent = `${npcKey}と会話`;

    const log = document.getElementById('openRouterChatLog');
    if (log) log.innerHTML = '';

    document.getElementById('OpenrouterChatModal').style.display = 'flex';

    // === キーワード提案セクションの動的作成（存在しなければ） ===
    let suggestionsDiv = document.getElementById('keywordSuggestions_OR');
    if (!suggestionsDiv) {
        suggestionsDiv = document.createElement('div');
        suggestionsDiv.id = 'keywordSuggestions_OR';
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

        const inputContainer = document.getElementById('openRouterInput').parentElement;
        inputContainer.parentElement.insertBefore(suggestionsDiv, inputContainer.nextSibling);
    }

    const inputEl = document.getElementById('openRouterInput');
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
                " onclick="appendKeyword_OR('${kw.replace(/'/g, "\\'")}')">${kw}</button>`
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

    checkQuestProgress("", "", false, 0, []);

    const entity = getEntityByName(npcKey);
    if (!entity) {
        better_alert('Character not found.', 'error');
        return;
    }

    initializeEntityBag(entity);

    populateGiftItems_OR();
    updateGiftQtyMax_OR();
    updateNpcBagDisplay_OR();

    document.getElementById('giftSection_OR').style.display = 'none';
    document.getElementById('toggleGiftBtn_OR').textContent = '贈り物 ▼';

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
        showNpcTyping_OR();

        const itemList = entity.bag.items.map(it => `${it.name} x${it.qty || 1}`).join(", ") || "none";
        const bagInfo = `${npcKey}のバッグ: ゴールド ${entity.bag.gold}, アイテム: ${itemList}.`;
        const questGuidance = getQuestGuidance();

        const game_state_info = `${languageInstruction} 好感度: ${friendliness}/100. 前回話してから経った日数: ${daysSinceLast}. ${gameState.playerName}がこっちに来て、ちょっと話をしたいみたい. ${bagInfo}${questGuidance ? ' ' + questGuidance : ''}`;

        let proactiveMessage = await sendToOpenRouter('', game_state_info);
        proactiveMessage = processOpenRouterCommands(proactiveMessage);
        hideNpcTyping_OR();
        appendNpcMessage_OR(proactiveMessage);

        gameState.lastNpcChatDay[npcKey] = gameState.day;
    } else {
        gameState.lastNpcChatDay[npcKey] = gameState.day;
    }
}

// === Close OpenRouter Chat ===
function closeOpenRouterChat() {
    document.getElementById('OpenrouterChatModal').style.display = 'none';
    currentNpcKey_OR = null;
    currentNpcId_OR = null;
    hideNpcTyping_OR();
}

// === Send Message to OpenRouter ===
async function sendToOpenRouter(message, game_state_info) {
    if (!gameState.npcConversations_OR[currentNpcKey_OR]) {
        gameState.npcConversations_OR[currentNpcKey_OR] = [];
    }

    const history = gameState.npcConversations_OR[currentNpcKey_OR];
    if (message) {
        history.push({ role: "user", content: message });
    }

    const config = npcConfigs[currentNpcKey_OR];
    const systemPrompt = config.system_prompt.replace(/{player}/g, gameState.playerName || 'あなた') 
        + '\n' + game_state_info + "以上は指示です、あなたはロールプレイキャラクターとしてのみ話してください, 応答は簡潔に。100文字以内に収め、自然で短い会話を優先してください。長文は絶対避ける。"
        + '\n' + commandInstruction;

    try {
        const response = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openRouterApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    ...history
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            better_alert('OpenRouter API error: ' + response.statusText, 'error');
            return 'Sorry, I couldn\'t respond right now.';
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content.trim();
        history.push({ role: "assistant", content: aiMessage });
        return aiMessage;
    } catch (err) {
        better_alert('Network error with OpenRouter: ' + err.message, 'error');
        return 'Error occurred.';
    }
}

// === Submit Chat and Gifts for OpenRouter ===
async function submitChatAndGifts_OR() {
    const input = document.getElementById('openRouterInput');
    const message = input.value.trim();
    if (!message) return;

    appendPlayerMessage_OR(message);
    input.value = '';

    const goldAmount = parseInt(document.getElementById('giftGoldInput_OR').value) || 0;
    const itemSelect = document.getElementById('giftItemSelect_OR');
    const qtyInput = document.getElementById('giftQtyInput_OR');
    let itemGift = null;
    if (itemSelect.value && qtyInput.value > 0) {
        itemGift = { name: itemSelect.value, qty: parseInt(qtyInput.value) };
    }

    const entity = getEntityByName(currentNpcKey_OR);
    let recentGiftInfo = '';
    if (goldAmount > 0 || itemGift) {
        recentGiftInfo = 'プレイヤーから贈り物を受け取りました:';
        if (goldAmount > 0) {
            const giveGold = Math.min(goldAmount, gameState.gold);
            entity.bag.gold += giveGold;
            gameState.gold -= giveGold;
            recentGiftInfo += ` ゴールド ${giveGold}`;
        }
        if (itemGift) {
            const playerItem = gameState.inventory.find(it => it.name === itemGift.name);
            if (playerItem) {
                const giveQty = Math.min(itemGift.qty, playerItem.qty);
                let npcItem = entity.bag.items.find(it => it.name === itemGift.name);
                if (!npcItem) {
                    npcItem = { ...playerItem, qty: 0 };
                    entity.bag.items.push(npcItem);
                }
                npcItem.qty += giveQty;
                playerItem.qty -= giveQty;
                if (playerItem.qty <= 0) {
                    gameState.inventory = gameState.inventory.filter(it => it !== playerItem);
                }
                recentGiftInfo += `, ${itemGift.name} x${giveQty}`;
            }
        }
        updateNpcBagDisplay_OR();
        populateGiftItems_OR();
        better_alert('贈り物を送りました！', 'success');
    }

    showNpcTyping_OR();

    const friendliness = entity.Friendliness || 70;
    const daysSinceLast = gameState.day - (gameState.lastNpcChatDay[currentNpcKey_OR] || 0);
    const itemList = entity.bag.items.map(it => `${it.name} x${it.qty || 1}`).join(", ") || "none";
    const bagInfo = `${currentNpcKey_OR}のバッグ: ゴールド ${entity.bag.gold}, アイテム: ${itemList}.`;
    const questGuidance = getQuestGuidance();

    const game_state_info = `${languageInstruction} 好感度: ${friendliness}/100. 前回話してから経った日数: ${daysSinceLast}.${recentGiftInfo ? ' ' + recentGiftInfo : ''} ${bagInfo}${questGuidance ? ' ' + questGuidance : ''}`;

    let aiResponse = await sendToOpenRouter(message, game_state_info);
    aiResponse = processOpenRouterCommands(aiResponse);

    hideNpcTyping_OR();
    appendNpcMessage_OR(aiResponse);

    checkQuestProgress(message, aiResponse.toLowerCase(), !!recentGiftInfo, goldAmount, itemGift ? [itemGift] : []);
    gameState.lastNpcChatDay[currentNpcKey_OR] = gameState.day;
}

// === Append Keyword for OpenRouter ===
function appendKeyword_OR(keyword) {
    const input = document.getElementById('openRouterInput');
    if (input) {
        input.value += (input.value.trim() ? ' ' : '') + keyword;
        input.focus();
    }
}

// === Show/Hide NPC Typing for OpenRouter ===
function showNpcTyping_OR() {
    const log = document.getElementById('openRouterChatLog');
    if (!log) return;

    const existing = document.getElementById('npcTypingBubble_OR');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = 'npcTypingBubble_OR';
    div.style.marginBottom = '15px';
    div.style.color = '#cccccc';
    div.style.fontSize = '1.1em';
    div.innerHTML = `
        <strong>${currentNpcKey_OR}:</strong>
        <span style="margin-left:8px; opacity:0.7;">typing</span>
        <div class="typing-indicator" style="display:inline-block; margin-left:8px;">
            <span></span><span></span><span></span>
        </div>
    `;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function hideNpcTyping_OR() {
    const bubble = document.getElementById('npcTypingBubble_OR');
    if (bubble) bubble.remove();
}

// === Append NPC Message for OpenRouter ===
function appendNpcMessage_OR(text) {
    const log = document.getElementById('openRouterChatLog');
    
    const div = document.createElement('div');
    div.style.cssText = `
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 12px;
        max-width: 90%;
        align-self: flex-start;
    `;

    const avatar = document.createElement('img');
    avatar.src = `Images/${currentNpcKey_OR}.png`;
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
    avatar.onerror = function() { this.src = 'Images/placeholder.png'; };

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
        <strong style="color:#333333; font-size:1.05em;">${currentNpcKey_OR}:</strong><br>
        <span style="line-height:1.5;">${text.replace(/\n/g, '<br>')}</span>
    `;

    div.appendChild(avatar);
    div.appendChild(messageDiv);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

// === Append Player Message for OpenRouter ===
function appendPlayerMessage_OR(text) {
    const log = document.getElementById('openRouterChatLog');
    
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
    avatar.onerror = function() { this.src = 'Images/placeholder.png'; };

    div.appendChild(messageDiv);
    div.appendChild(avatar);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

// === Toggle Gift Section for OpenRouter ===
function toggleGiftSection_OR() {
    const section = document.getElementById('giftSection_OR');
    const btn = document.getElementById('toggleGiftBtn_OR');
    if (!section || !btn) return;

    if (section.style.display === 'none' || !section.style.display) {
        section.style.display = 'block';
        btn.textContent = '贈り物 ▲';
    } else {
        section.style.display = 'none';
        btn.textContent = '贈り物 ▼';
    }
}

// === Populate Gift Items for OpenRouter ===
function populateGiftItems_OR() {
    const select = document.getElementById('giftItemSelect_OR');
    select.innerHTML = '<option value="">アイテムを選択</option>';
    gameState.inventory.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.name;
        opt.textContent = `${item.name} x${item.qty}`;
        select.appendChild(opt);
    });
}

// === Update Gift Qty Max for OpenRouter ===
function updateGiftQtyMax_OR() {
    const select = document.getElementById('giftItemSelect_OR');
    const qtyInput = document.getElementById('giftQtyInput_OR');
    const qtyLabel = qtyInput.nextElementSibling;

    if (select.value) {
        const item = gameState.inventory.find(it => it.name === select.value);
        if (item) {
            qtyInput.max = item.qty;
            qtyInput.style.display = 'inline-block';
            qtyLabel.style.display = 'inline-block';
        }
    } else {
        qtyInput.style.display = 'none';
        qtyLabel.style.display = 'none';
    }
}

// === Update NPC Bag Display for OpenRouter ===
function updateNpcBagDisplay_OR() {
    const entity = getEntityByName(currentNpcKey_OR);
    if (!entity || !entity.bag) return;

    const bag = entity.bag;
    const itemList = bag.items.map(it => {
        let str = `${it.name} x${it.qty || 1}`;
        if (it.type === 'potion') str += ` (回復: ${it.restore?.toUpperCase()} +${it.amount})`;
        if (it.stat) str += ` (${it.stat} +${it.bonus}%)`;
        return str;
    }).join("<br>") || "なし";

    const display = document.getElementById('npcBagDisplay_OR');
    if (display) {
        display.innerHTML = `<strong>${currentNpcKey_OR}のバッグ:</strong><br>ゴールド: ${bag.gold}<br>アイテム:<br>${itemList}`;
    }
}

// Export functions
window.openOpenRouterChat = openOpenRouterChat;
window.submitChatAndGifts_OR = submitChatAndGifts_OR;
window.toggleGiftSection_OR = toggleGiftSection_OR;