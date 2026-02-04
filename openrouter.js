// openrouter.js
// This file handles the OpenRouter-specific NPC chat modal and interactions.
// It mirrors player2.js but uses a separate modal (OpenrouterChatModal) to avoid conflicts.
// Assumes index.html has been updated to include the OpenrouterChatModal HTML (copied from lunaChatModal with ID changes).
// Also assumes global variables like gameState, npcConfigs, etc., are available.

// === OpenRouter API Constants ===
const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';
const OPENROUTER_MODEL = 'arcee-ai/trinity-large-preview:free'; // Free roleplay-suitable model

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
                                    // 修正点: ...npcItem を先に展開し、最後に qty: 0 を上書き
                                    // これで npcItem の qty がコピーされず、0 からスタート
                                    playerItem = { ...npcItem, qty: 0 };
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
                                    // 同様に修正: playerItem の qty がコピーされないよう qty: 0 を上書き
                                    npcItem = { ...playerItem, qty: 0 };
                                    entity.bag.items.push(npcItem);
                                }
                                npcItem.qty += -qty;   // 正の量を追加
                                playerItem.qty += qty;  // qty は負なので減算
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

        //let proactiveMessage = await sendToOpenRouter('', game_state_info);

        // processOpenRouterCommands でコマンド処理（返り値はトーンタグ付きの話し言葉テキスト）
        //let rawNpcText = processOpenRouterCommands(proactiveMessage);

        // === 新規: トーンタグ対応の音声生成 & 表示処理 ===
        const voiceType = npcVoiceTypes[currentNpcKey_OR];
        const voiceName = voiceType ? voiceType : null;  // プリビルドボイス名（Leda, Rasalgethi など）

        let audioUrl = null;
        //let cleanDisplayText = "{player}、おはよう！";  // デフォルト（タグなしの場合）



        hideNpcTyping_OR();

        // 表示（タグ完全除去済みのクリーンなテキスト）
        //appendNpcMessage_OR(cleanDisplayText);

        // 音声再生
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play().catch(e => console.warn('Audio play failed:', e));
            audio.onended = () => URL.revokeObjectURL(audioUrl); // メモリ解放
        }

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
                max_tokens: 500,
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
// === 既存関数を完全に置き換え: submitChatAndGifts_OR（音声対応版）===
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

    // processOpenRouterCommands でコマンド（adjust_friendliness など）を処理
    // 返り値はトーンタグ付きの話し言葉テキストと仮定
    let rawNpcText = processOpenRouterCommands(aiResponse);

    hideNpcTyping_OR();

    // === 同期でクリーンテキスト計算（タグ除去）===
    const cleanDisplayText = rawNpcText.replace(/<tone=[^>]+>(.*?)<\/tone>/gi, '$1').trim();

    // テキストを即座に表示（音声生成を待たずに）
    appendNpcMessage_OR(cleanDisplayText);

    // 入力欄をすぐにフォーカスして次の入力可能に
    input.focus();

    // === 非同期で音声生成・再生（テキスト表示後）===
    const voiceConfig = npcVoiceTypes[currentNpcKey_OR];  // オブジェクト or 文字列対応

    if (voiceConfig && rawNpcText && geminiApiKey) {
        generateNpcVoice(rawNpcText, voiceConfig)
            .then(ttsResult => {
                if (ttsResult && ttsResult.audioURL) {
                    const audio = new Audio(ttsResult.audioURL);
                    audio.play().catch(e => {
                        console.warn('Audio play failed:', e);
                        better_alert('音声再生に失敗しました（ブラウザ制限の可能性）。テキストは表示済みです。', 'warning');
                    });
                    audio.onended = () => URL.revokeObjectURL(ttsResult.audioURL);
                } else {
                    better_alert('音声生成に失敗しました（サーバーエラーや制限）。テキストのみ表示します。', 'warning');
                }
            })
            .catch(err => {
                console.error('TTS generation error:', err);
                better_alert('音声生成エラー: サーバー側問題の可能性があります。テキストのみ表示します。', 'warning');
            });
    } else if (voiceConfig && rawNpcText) {
        // APIキーなしの場合
        better_alert('Gemini APIキーが設定されていません。テキストのみ表示します。', 'warning');
    }
    // voiceConfigなし or rawNpcText空の場合は音声スキップ（サイレント）

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
// 修正された appendNpcMessage_OR 関数（トーンタグを完全に除去して表示）
function appendNpcMessage_OR(rawText) {  // rawText = LLMから来たトーンタグ付きテキスト
    const log = document.getElementById('openRouterChatLog');
    
    // トーンタグを完全に除去したクリーンテキストを作成
    const cleanText = rawText.replace(/<tone=[^>]+>(.*?)<\/tone>/gi, '$1').trim();

    const div = document.createElement('div');
    div.style.cssText = `
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 12px;
        max-width: 90%;
        align-self: flex-start;
    `;

    // currentNpcKey_OR をキーとしてエンティティを取得（冒険者 or villageNPC）
    let entity = getEntityByName(currentNpcKey_OR);

    // エンティティの image プロパティを使用（存在しなければプレースホルダー）
    let imageFile = (entity && entity.image) ? entity.image : 'placeholder.png';
    console.log(entity.image);
    const avatar = document.createElement('img');
    avatar.src = `Images/${imageFile}`;
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
    // 画像読み込み失敗時のフォールバック（プレースホルダー）
    avatar.onerror = function() { 
        this.src = 'Images/placeholder.png'; 
    };
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
        <span style="line-height:1.5;">${cleanText.replace(/\n/g, '<br>')}</span>
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



// === 新規追加: Gemini TTS設定（openrouter.jsのファイル先頭付近、既存のconst OPENROUTER_API_BASEなどの後に追加） ===
let geminiApiKey = localStorage.getItem('geminiApiKey') || '';
// テスト用に直接ここにAPIキーを貼り付け可能（例: geminiApiKey = 'your-gemini-api-key-here';）

const GEMINI_MODEL = 'gemini-2.5-flash-preview-tts'; // 高速・高品質（必要に応じてgemini-2.5-pro-preview-ttsに変更可能）
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// 声のペルソナ定義（子供・ティーン・大人 × 男女）
const voicePersonas = {
    child_girl: "a cute little girl around 8-10 years old with a very high-pitched, innocent, playful and super adorable voice",
    teenage_girl: "a cheerful teenage girl around 15-17 years old with a lively, energetic, youthful and slightly cute voice",
    adult_girl: "a mature woman around 28-35 years old with a warm, elegant, calm and soothing voice",

    child_boy: "a cute little boy around 8-10 years old with a high-pitched, playful, innocent and energetic voice",
    teenage_boy: "an energetic teenage boy around 15-17 years old with a bright, confident and youthful voice",
    adult_boy: "a mature man around 30-40 years old with a deep, calm, reliable and authoritative voice"
};



// PCM → WAV変換関数（Gemini TTSは生PCMを返すため必須）
function pcmToWav(pcmData) {
    const sampleRate = 24000;
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * bitsPerSample / 8;
    const blockAlign = numChannels * bitsPerSample / 8;
    const dataSize = pcmData.byteLength;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const uint8 = new Uint8Array(buffer);

    const writeString = (offset, str) => {
        for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    uint8.set(new Uint8Array(pcmData), 44);
    return new Blob([buffer], { type: 'audio/wav' });
}

// Gemini TTS音声生成関数（非同期）
// 修正された generateNpcVoice 関数（トーンタグ対応 + 表示用クリーン処理）
// 更新された generateNpcVoice（オブジェクト対応 + チャイルド風スタイルプロンプト統合）
async function generateNpcVoice(rawText, voiceConfig) {
    if (!geminiApiKey || !voiceConfig || !rawText.trim()) return null;

    // 1. トーンタグを抽出・除去
    const toneMatches = [...rawText.matchAll(/<tone=([^>]+)>(.*?)<\/tone>/gi)];
    
    // 表示用クリーンテキスト（タグ完全除去）
    const cleanText = rawText.replace(/<tone=[^>]+>(.*?)<\/tone>/gi, '$1').trim();

    // 2. ボイス設定を処理（文字列 = プリビルドのみ、オブジェクト = プリビルド + スタイルプロンプト）
    let prebuiltVoice = null;
    let stylePrompt = null;

    if (typeof voiceConfig === 'string') {
        prebuiltVoice = voiceConfig.charAt(0).toUpperCase() + voiceConfig.slice(1).toLowerCase();
    } else if (typeof voiceConfig === 'object' && voiceConfig.prebuilt) {
        prebuiltVoice = voiceConfig.prebuilt.charAt(0).toUpperCase() + voiceConfig.prebuilt.slice(1).toLowerCase();
        stylePrompt = voiceConfig.stylePrompt;  // 例: 'in a cute, high-pitched... teenage girl'
    }

    // 3. TTS用プロンプト構築
    let ttsPrompt = '';
    if (toneMatches.length > 0) {
        for (const match of toneMatches) {
            let tone = match[1].trim();
            const segment = match[2].trim();

            // トーン + スタイルプロンプトを統合（スタイルがあれば追加）
            let fullTone = tone;
            if (stylePrompt) {
                fullTone += ` and ${stylePrompt}`;
            }
            ttsPrompt += `Speak ${fullTone}: ${segment} `;
        }
    } else {
        // タグなしの場合
        ttsPrompt = stylePrompt ? `Speak ${stylePrompt}: ${cleanText}` : cleanText;
    }

    try {
        const body = {
            contents: [{ parts: [{ text: ttsPrompt }] }],
            generationConfig: {
                responseModalities: ["AUDIO"]
            }
        };

        // プリビルドボイスがあれば追加
        if (prebuiltVoice) {
            body.generationConfig.speechConfig = {
                voiceConfig: {
                    prebuiltVoiceConfig: {
                        voiceName: prebuiltVoice
                    }
                }
            };
        }

        const response = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.warn('Gemini TTS API error:', errorText);
            return null;
        }

        const data = await response.json();
        const audioBase64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!audioBase64) return null;

        const pcmBytes = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
        const wavBlob = pcmToWav(pcmBytes.buffer);
        return {
            audioURL: URL.createObjectURL(wavBlob),
            cleanText: cleanText
        };
    } catch (err) {
        console.error('Gemini TTS error:', err);
        return null;
    }
}