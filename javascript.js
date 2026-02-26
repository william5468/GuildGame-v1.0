let CurrentQuestType = "None";
/* === ローディング画面用プリロード機能 === */
let loadedCount = 0;
let currentGuildQuestType = 'main';
let currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
let currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
let currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
let currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;
let playerName = "";
let audioPlayed = false;
let currentQuestAdventurers = [];


// プレイヤー（ギルドマスター）の画像を性別に応じて切り替え
function getPlayerImage() {
    if (!gameState.playerGender) return 'Images/main_char_M.png'; // フォールバック
    return gameState.playerGender === 'F' 
        ? 'Images/main_char_F.png' 
        : 'Images/main_char_M.png';
}

// === 拡張された特性リスト（表示名付き、多様な好み対応）===
// 各特性に displayName を追加（キャラクターシートで表示用）
// type で分類:
// - gender: 性別好み
// - primary: 主ステータス好み（STR=0, WIS=1, DEX=2, LUC=3）
// - level: レベル比較好み（higher/lower）
// - stat_compare: 自分とのステ比較好み（higher/lower + 対象ステ）
// - action_preference: 行動傾向（特定の行動を優先、weight_bonus で確率ブースト用）

const possibleTraits = [
    // === 性別好み ===
    { type: 'gender', preference: 'M', delta: 12, translationKey: "trait.likes_men" },
    { type: 'gender', preference: 'F', delta: 12, translationKey: "trait.likes_women" },
    { type: 'gender', preference: 'M', delta: -12, translationKey: "trait.dislikes_men" },
    { type: 'gender', preference: 'F', delta: -12, translationKey: "trait.dislikes_women" },

    // === 主ステータス好み ===
    { type: 'primary', preference: 0, delta: 12, translationKey: "trait.likes_strength" },      // STR
    { type: 'primary', preference: 1, delta: 12, translationKey: "trait.likes_wisdom" },        // WIS
    { type: 'primary', preference: 2, delta: 12, translationKey: "trait.likes_dexterity" },    // DEX
    { type: 'primary', preference: 3, delta: 12, translationKey: "trait.likes_luck" },         // LUC
    { type: 'primary', preference: 0, delta: -10, translationKey: "trait.dislikes_strength" },
    { type: 'primary', preference: 1, delta: -10, translationKey: "trait.dislikes_wisdom" },
    { type: 'primary', preference: 2, delta: -10, translationKey: "trait.dislikes_dexterity" },
    { type: 'primary', preference: 3, delta: -10, translationKey: "trait.dislikes_luck" },

    // === レベル比較好み ===
    { type: 'level', preference: 'higher', delta: 15, translationKey: "trait.likes_seniors" },
    { type: 'level', preference: 'lower', delta: 15, translationKey: "trait.likes_juniors" },
    { type: 'level', preference: 'higher', delta: -12, translationKey: "trait.dislikes_seniors" },
    { type: 'level', preference: 'lower', delta: -12, translationKey: "trait.dislikes_juniors" },

    // === 自分とのステ比較好み ===
    { type: 'stat_compare', stat: 0, preference: 'higher', delta: 12, translationKey: "trait.respects_stronger" },
    { type: 'stat_compare', stat: 1, preference: 'higher', delta: 12, translationKey: "trait.respects_wiser" },
    { type: 'stat_compare', stat: 2, preference: 'higher', delta: 12, translationKey: "trait.respects_more_dexterous" },
    { type: 'stat_compare', stat: 3, preference: 'higher', delta: 12, translationKey: "trait.envies_luckier" },
    { type: 'stat_compare', stat: 0, preference: 'lower', delta: -10, translationKey: "trait.despises_weaker" },
    { type: 'stat_compare', stat: 1, preference: 'lower', delta: -10, translationKey: "trait.despises_dumber" },
    { type: 'stat_compare', stat: 2, preference: 'lower', delta: -10, translationKey: "trait.despises_less_dexterous" },
    { type: 'stat_compare', stat: 3, preference: 'lower', delta: -10, translationKey: "trait.despises_less_lucky" },

    // === 行動傾向 ===
    { type: 'action_preference', action: 'tavern', weight_bonus: 20, translationKey: "trait.likes_tavern" },
    { type: 'action_preference', action: 'tavern', weight_bonus: -15, translationKey: "trait.teetotaler" },
    { type: 'action_preference', action: 'blacksmith', weight_bonus: 15, translationKey: "trait.likes_blacksmith" },
    { type: 'action_preference', action: 'alchemy', weight_bonus: 15, translationKey: "trait.likes_alchemy" },
    { type: 'action_preference', action: 'hunting', weight_bonus: 20, translationKey: "trait.likes_hunting" },
    { type: 'action_preference', action: 'hunting', weight_bonus: -20, translationKey: "trait.pacifist" },
    { type: 'action_preference', action: 'gather', weight_bonus: 15, translationKey: "trait.likes_gathering" },
    { type: 'action_preference', action: 'guild_stay', weight_bonus: 20, translationKey: "trait.reclusive" },
    { type: 'action_preference', action: 'guild_stay', weight_bonus: -15, translationKey: "trait.active" },
    { type: 'action_preference', action: 'street_walk', weight_bonus: 15, translationKey: "trait.likes_street_walking" },

    // === 初期ステータスボーナス ===
    { type: 'initial_bonus', target: 'strength', delta: 20, translationKey: "trait.super_strength" },
    { type: 'initial_bonus', target: 'strength', delta: -10, translationKey: "trait.feeble" },
    { type: 'initial_bonus', target: 'wisdom', delta: 20, translationKey: "trait.genius" },
    { type: 'initial_bonus', target: 'wisdom', delta: -10, translationKey: "trait.dimwitted" },
    { type: 'initial_bonus', target: 'dexterity', delta: 20, translationKey: "trait.godly_dexterity" },
    { type: 'initial_bonus', target: 'dexterity', delta: -10, translationKey: "trait.clumsy" },
    { type: 'initial_bonus', target: 'luck', delta: 20, translationKey: "trait.very_lucky" },
    { type: 'initial_bonus', target: 'luck', delta: -10, translationKey: "trait.unlucky" },
    { type: 'initial_bonus', target: 'defense', delta: 20, translationKey: "trait.tough" },
    { type: 'initial_bonus', target: 'defense', delta: -10, translationKey: "trait.fragile" },
    { type: 'initial_bonus', target: 'maxHp', delta: 100, translationKey: "trait.robust" },
    { type: 'initial_bonus', target: 'maxHp', delta: -50, translationKey: "trait.frail" },
    { type: 'initial_bonus', target: 'maxMp', delta: 50, translationKey: "trait.mana_abundant" },
    { type: 'initial_bonus', target: 'maxMp', delta: -25, translationKey: "trait.mana_poor" },

    // === パーセントボーナス ===
    { type: 'percent_bonus', target: 'strength', delta: 20, translationKey: "trait.blessing_of_strength" },
    { type: 'percent_bonus', target: 'strength', delta: -10, translationKey: "trait.curse_of_strength" },
    { type: 'percent_bonus', target: 'wisdom', delta: 20, translationKey: "trait.blessing_of_wisdom" },
    { type: 'percent_bonus', target: 'wisdom', delta: -10, translationKey: "trait.curse_of_wisdom" },
    { type: 'percent_bonus', target: 'dexterity', delta: 20, translationKey: "trait.blessing_of_dexterity" },
    { type: 'percent_bonus', target: 'dexterity', delta: -10, translationKey: "trait.curse_of_dexterity" },
    { type: 'percent_bonus', target: 'luck', delta: 20, translationKey: "trait.blessing_of_luck" },
    { type: 'percent_bonus', target: 'luck', delta: -10, translationKey: "trait.curse_of_luck" },
    { type: 'percent_bonus', target: 'defense', delta: 20, translationKey: "trait.blessing_of_defense" },
    { type: 'percent_bonus', target: 'defense', delta: -10, translationKey: "trait.curse_of_defense" }
];
// 初期好感度計算（拡張特性対応版、全ステータス小文字キー対応 + 数値/文字列両対応）
const statMap = {
    0: 'strength',
    1: 'wisdom',
    2: 'dexterity',
    3: 'luck'
};


// 特性による好感度ボーナス計算（現在の条件でボーナス合計を返す）
function calculateTraitBonus(self, target) {
    let bonus = 0;

    if (!self.traits || self.traits.length === 0) {
        return bonus;
    }

    self.traits.forEach(trait => {
        // deltaがない特性（行動傾向など）は好感度に影響しない
        if (trait.delta === undefined) return;

        if (trait.type === 'gender' && target.gender === trait.preference) {
            bonus += trait.delta;
        } 
        else if (trait.type === 'primary' && target.primary === trait.preference) {
            bonus += trait.delta;
        } 
        else if (trait.type === 'level') {
            if (trait.preference === 'higher' && target.level > self.level) {
                bonus += trait.delta;
            } else if (trait.preference === 'lower' && target.level < self.level) {
                bonus += trait.delta;
            }
        } 
        else if (trait.type === 'stat_compare') {
            let statKey;
            if (typeof trait.stat === 'number') {
                statKey = statMap[trait.stat];
            } else if (typeof trait.stat === 'string') {
                statKey = trait.stat.toLowerCase();
            }
            if (!statKey || !['strength', 'wisdom', 'dexterity', 'luck'].includes(statKey)) return;

            const selfStat = self[statKey];
            const targetStat = target[statKey];

            if (selfStat === undefined || targetStat === undefined) return;

            if (trait.preference === 'higher' && targetStat > selfStat) {
                bonus += trait.delta;
            } else if (trait.preference === 'lower' && targetStat < selfStat) {
                bonus += trait.delta;
            }
        }
    });

    return bonus;
}

function calculateInitialFriendliness(self, target) {
    let val = 50;

    if (!self.traits || self.traits.length === 0) {
        return val;
    }

    self.traits.forEach(trait => {
        // deltaがない特性（行動傾向など）は好感度に影響しない
        if (trait.delta === undefined) return;

        if (trait.type === 'gender' && target.gender === trait.preference) {
            val += trait.delta;
        } 
        else if (trait.type === 'primary' && target.primary === trait.preference) {
            val += trait.delta;
        } 
        else if (trait.type === 'level') {
            if (trait.preference === 'higher' && target.level > self.level) {
                val += trait.delta;
            } else if (trait.preference === 'lower' && target.level < self.level) {
                val += trait.delta;
            }
        } 
        else if (trait.type === 'stat_compare') {
            let statKey;
            if (typeof trait.stat === 'number') {
                statKey = statMap[trait.stat];
            } else if (typeof trait.stat === 'string') {
                statKey = trait.stat.toLowerCase();
            }
            if (!statKey || !['strength', 'wisdom', 'dexterity', 'luck'].includes(statKey)) return;

            const selfStat = self[statKey];
            const targetStat = target[statKey];

            if (selfStat === undefined || targetStat === undefined) return;

            if (trait.preference === 'higher' && targetStat > selfStat) {
                val += trait.delta;
            } else if (trait.preference === 'lower' && targetStat < selfStat) {
                val += trait.delta;
            }
        }
    });

    return Math.max(0, Math.min(100, val));
}

// 交流時の説明テンプレート（日本語）
const interactionTemplates = {
  positive_mutual: [
    "{a}と{b}は楽しく会話した",
    "{a}と{b}は一緒に笑い合った",
    "{a}と{b}は良い時間を過ごした"
  ],
  negative_mutual: [
    "{a}と{b}は少し意見が対立した",
    "{a}と{b}は軽い口論になった",
    "{a}と{b}はちょっとした誤解が生まれた"
  ],
  positive_uni: [
    "{a}は{b}の強さに感心した",
    "{a}は{b}の知恵に尊敬の念を抱いた",
    "{a}は{b}の器用さに驚いた"
  ],
  negative_uni: [
    "{a}は{b}の態度に少しイラついた",
    "{a}は{b}の行動に不満を感じた",
    "{a}は{b}の話に退屈した"
  ]
};


/**
 * better_alert(message, type = "basic")
 * 
 * Shows a Toastify toast notification.
 * Falls back to native window.alert() if Toastify is unavailable or fails (e.g., script didn't load, JS error).
 * This ensures your alerts always work, even in edge cases.
 */
function better_alert(message, type = "basic", extra = {}) {
    let prefix = '';
    let background = '#1a1a1a';
    let textColor = '#ffffff';

    // Play levelup sound for training and levelup (feels rewarding!)
    if ((type === "levelup" || type === "quest" || type === "training") && typeof levelupSound !== 'undefined') {
        levelupSound.currentTime = 0;
        levelupSound.play().catch(err => {
            console.warn('Level up / Quest / Training sound could not play:', err);
        });
    }

    // Type-specific designs with gradients, emojis, and better contrast
    if (type === "success") {
        prefix = '✅ ';
        background = 'linear-gradient(to right, #11998e, #38ef7d)';
    } else if (type === "error" || type === "failure") {
        prefix = '❌ ';
        background = 'linear-gradient(to right, #ff0844, #ffb199)';
    } else if (type === "warning") {
        prefix = '⚠️ ';
        background = 'linear-gradient(to right, #fc4a1a, #f7b733)';
        textColor = '#000000';
    } else if (type === "levelup") {
        prefix = '🌟 ';
        background = 'linear-gradient(to right, #ffe259, #ffa751)';
        textColor = '#000000';
    } else if (type === "death") {
        prefix = '☠️ ';
        background = 'linear-gradient(to right, #0f0f0f, #2a2a2a)';
        textColor = '#ffffff';
    } else if (type === "friendliness") {
        const delta = extra.delta || 0;
        if (delta > 0) {
            prefix = '💖 ';
            background = 'linear-gradient(to right, #ff9a9e, #fad0c4)';
            textColor = '#800080';
        } else if (delta < 0) {
            prefix = '💔 ';
            background = 'linear-gradient(to right, #8b0000, #4b0000)';
            textColor = '#ffffff';
        } else {
            prefix = '❤️ ';
            background = 'linear-gradient(to right, #d63384, #ff8e53)';
        }
    } else if (type === "quest") {
        prefix = '📜 ';
        background = 'linear-gradient(to right, #8e44ad, #9b59b6, #bb8fce)';
        textColor = '#ffffff';
    } 
    // === NEW: Training Result Alert (Muscular/Strength Theme) ===
    else if (type === "training") {
        prefix = '💪 '; // Flexed bicep emoji – perfect for training gains
        // Energetic orange → fiery red gradient (power, energy, growth feel)
        background = 'linear-gradient(to right, #ff6b35, #f7931e, #ff9d00)';
        textColor = '#ffffff';
    } 
    else if (type === "basic") {
        prefix = '';
        background = 'linear-gradient(to right, #f12711, #f5af19)';
    }

    const toastConfig = {
        text: prefix + message,
        duration: 5000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: background,
            color: textColor,
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '600',
            minWidth: '320px',
            maxWidth: '480px',
            border: 'none',
            backdropFilter: 'blur(10px)',
            zIndex: '999999'
        },
        className: 'game-toast',
        close: true,
        clickToClose: true,
        escapeMarkup: true
    };

    // Special enhancements for levelup
    if (type === "levelup") {
        toastConfig.duration = 7000;
        toastConfig.style.boxShadow = '0 12px 50px rgba(255, 165, 0, 0.7)';
        toastConfig.style.border = '3px solid #FFD700';
        toastConfig.style.fontSize = '18px';
        toastConfig.style.fontWeight = '700';
        toastConfig.style.padding = '20px 30px';
    }

    // Special enhancements for death
    if (type === "death") {
        toastConfig.duration = 10000;
        toastConfig.gravity = "bottom";
        toastConfig.position = "center";
        toastConfig.style.boxShadow = '0 12px 50px rgba(0, 0, 0, 0.8)';
        toastConfig.style.border = '3px solid #444444';
        toastConfig.style.fontSize = '20px';
        toastConfig.style.fontWeight = '800';
        toastConfig.style.padding = '28px 40px';
        toastConfig.style.minWidth = '380px';
        toastConfig.style.backdropFilter = 'blur(16px)';
    }

    // Friendliness-specific enhancements
    if (type === "friendliness") {
        toastConfig.duration = 6000;
        toastConfig.style.fontSize = '18px';
        toastConfig.style.fontWeight = '700';
        toastConfig.style.padding = '20px 30px';
        toastConfig.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    }

    // Quest-specific enhancements
    if (type === "quest") {
        toastConfig.duration = 6500;
        toastConfig.style.boxShadow = '0 12px 40px rgba(142, 68, 173, 0.6)';
        toastConfig.style.border = '2px solid #bb8fce';
        toastConfig.style.fontSize = '18px';
        toastConfig.style.fontWeight = '700';
        toastConfig.style.padding = '20px 30px';
        toastConfig.style.backdropFilter = 'blur(14px)';
    }

    // === NEW: Training-specific enhancements (energetic, powerful feel) ===
    if (type === "training") {
        toastConfig.duration = 6000;
        toastConfig.style.boxShadow = '0 10px 35px rgba(255, 107, 53, 0.6)'; // Orange glow
        toastConfig.style.border = '2px solid #ff9d00';
        toastConfig.style.fontSize = '18px';
        toastConfig.style.fontWeight = '700';
        toastConfig.style.padding = '20px 30px';
        toastConfig.style.backdropFilter = 'blur(12px)';
    }

    // === TOAST WITH FALLBACK ===
    if (typeof Toastify === 'function') {
        try {
            Toastify(toastConfig).showToast();
            return;
        } catch (error) {
            console.warn('Toastify failed to show toast:', error);
        }
    } else {
        console.warn('Toastify is not available – falling back to native alert');
    }

    // === FALLBACK: Native alert() ===
    alert((prefix ? prefix + ' ' : '') + message);
}
function openTradeForm(cityId) {
    const city = gameState.tradeCityStates.find(c => c.id === cityId);
    if (!city) return;

    let html = `
    <h3 style="text-align:center; margin:20px 0; font-size:1.6em; color:#ffd700; text-shadow:0 0 10px rgba(0,0,0,0.8);">${t('trade_form_title', {city: city.name})}</h3>
    
    <!-- 戻るボタン（透明周辺） -->
    <div style="text-align:center; margin-bottom:30px; background:transparent;">
        <button onclick="showTradeQuest()" style="padding:10px 30px; font-size:1.1em; background:#555; border:none; border-radius:8px; cursor:pointer; color:#fff;">
            ${t('trade_back_to_board')}
        </button>
    </div>

    <div style="max-width:900px; margin:0 auto; background: transparent;">
        <!-- テーブル（完全透明背景） -->
        <table style="width:100%; border-collapse:collapse; background:transparent; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.4); border:2px solid rgba(85,85,85,0.6);">
            <thead>
                <tr style="background:rgba(68,68,68,0.6); color:#fff;">
                    <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_resource')}</th>
                    <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_stock')}</th>
                    <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_sell_qty')}</th>
                    <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_sell_price')}</th>
                    <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_buy_qty')}</th>
                    <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_buy_price')}</th>
                </tr>
            </thead>
            <tbody>`;

    resources.forEach(r => {
        const stock = (gameState.inventory.find(i => i.name === r && i.type === 'material') || {qty: 0}).qty;
        const sellPrice = getSellPrice(city, r);
        const buyPrice = getBuyPrice(city, r);

        const isSpecialty = city.specialty === r;
        const rowStyle = isSpecialty ? 'background:rgba(0,100,0,0.2); font-weight:bold;' : '';

        html += `
        <tr style="${rowStyle}">
            <td style="padding:12px; text-align:center; color:#fff; text-shadow:0 0 8px rgba(0,0,0,0.8);">${r}${isSpecialty ? t('trade_specialty_marker') : ''}</td>
            <td style="padding:12px; text-align:center; color:#aaa; text-shadow:0 0 6px rgba(0,0,0,0.8);">${stock}</td>
            <td style="padding:12px; text-align:center;">
                <input type="number" id="sell_${r}" min="0" max="${stock}" value="0" 
                       style="width:80px; padding:6px; text-align:center; background:rgba(0,0,0,0.4); color:#fff; border:1px solid #666; border-radius:4px;">
            </td>
            <td style="padding:12px; text-align:center; color:#8f8; text-shadow:0 0 6px rgba(0,0,0,0.8);">${sellPrice}${t('gold_unit')}</td>
            <td style="padding:12px; text-align:center;">
                <input type="number" id="buy_${r}" min="0" value="0" 
                       style="width:80px; padding:6px; text-align:center; background:rgba(0,0,0,0.4); color:#fff; border:1px solid #666; border-radius:4px;">
            </td>
            <td style="padding:12px; text-align:center; color:#ff8; text-shadow:0 0 6px rgba(0,0,0,0.8);">${buyPrice}${t('gold_unit')}</td>
        </tr>`;
    });

    html += `
            </tbody>
        </table>

        <!-- 計算ボタン（透明周辺） -->
        <div style="text-align:center; margin:30px 0; background:transparent;">
            <button onclick="calcTrade('${cityId}')" style="padding:10px 30px; font-size:1.2em; background:#3498db; border:none; border-radius:8px; cursor:pointer;">
                ${t('trade_calc_button')}
            </button>
        </div>

        <!-- 計算結果（透明背景、枠線で視認性） -->
        <div id="calcResult" style="background:transparent; border:2px solid rgba(85,85,85,0.6); padding:20px; border-radius:12px; margin:20px 0; min-height:100px; text-align:center; color:#fff; text-shadow:0 0 8px rgba(0,0,0,0.8);"></div>

        <!-- 投稿ボタン（透明周辺） -->
        <div style="text-align:center; background:transparent;">
            <button onclick="postTrade('${cityId}')" id="postTradeBtn" disabled 
                    style="padding:12px 40px; font-size:1.3em; background:#27ae60; border:none; border-radius:8px; cursor:pointer;">
                ${t('trade_post_button')}
            </button>
        </div>
    </div>`;

    const content = document.getElementById('guildQuestsContent');
    content.innerHTML = html;

    // フォームを開いたらコンテンツを最上部にスクロール
    content.scrollTop = 0;
}

function calcTrade(cityId) {
    const city = gameState.tradeCityStates.find(c => c.id === cityId);
    const sell = {}, buy = {};
    let outLoad = 0, inLoad = 0, revenue = 0, cost = 0;

    resources.forEach(r => {
        sell[r] = parseInt(document.getElementById(`sell_${r}`).value) || 0;
        buy[r] = parseInt(document.getElementById(`buy_${r}`).value) || 0;
        outLoad += sell[r];
        inLoad += buy[r];
        revenue += sell[r] * getSellPrice(city, r);
        cost += buy[r] * getBuyPrice(city, r);
    });

    const unit = t('gold_unit');

    if (outLoad > 100 || inLoad > 100) {
        document.getElementById('calcResult').innerHTML = `<p style="color:red;">${t('trade_load_exceed')}</p>`;
        document.getElementById('postTradeBtn').disabled = true;
        return;
    }

    const goingDays = Math.ceil(2 + 8 * (outLoad / 100));
    const returnDays = Math.ceil(2 + 8 * (inLoad / 100));
    const totalDays = goingDays + returnDays;
    const net = revenue - cost;

    let result = `<p>${t('trade_outbound_load', {out: outLoad, days: goingDays})}　${t('trade_return_load', {in: inLoad, days: returnDays})}</p>`;
    result += `<p>${t('trade_total_days', {days: totalDays})}</p>`;
    result += `<p>${t('trade_revenue')}${revenue}${unit}　${t('trade_cost')}${cost}${unit}</p>`;

    if (net >= 0) {
        result += `<p style="color:gold;">${t('trade_profit')}${net}${unit}${t('trade_profit_note')}</p>`;
    } else {
        result += `<p>${t('trade_required_gold')}${ -net }${unit}${t('trade_deduct_note')}</p>`;
        if (gameState.gold < -net) {
            result += `<p style="color:red;">${t('trade_gold_insufficient')}</p>`;
        }
    }

    document.getElementById('calcResult').innerHTML = result;
    document.getElementById('postTradeBtn').disabled = (net < 0 && gameState.gold < -net);

    window.tempTradeData = {cityId, sell, buy, revenue, cost, totalDays, outLoad, inLoad};
}
function postTrade(cityId) {
    const data = window.tempTradeData;
    if (!data || data.cityId !== cityId) return;

    // リソースの正規キー一覧（言語に依存しない内部識別子）
    const resourceKeys = ['iron_ore', 'medicinal_herb', 'spice', 'gem'];

    // 在庫チェック＆売却素材扣除
    let hasStockIssue = false;

    resourceKeys.forEach(key => {
        // 現在の言語での表示名（エラー表示用）
        const currentName = translations[currentLang][`resource_${key}`] || key;

        // このセッションで選択された売却数（data.sell のキーは現在の言語での名前）
        const qtyToSell = data.sell[currentName] || 0;
        if (qtyToSell === 0) return;

        // 全ての言語での可能名称を集める（言語変更後にリロードしても、古い名前でもマッチするように）
        const possibleNames = [];
        Object.keys(translations).forEach(lang => {
            const name = translations[lang][`resource_${key}`];
            if (name) possibleNames.push(name);
        });

        // インベントリからマッチするアイテムを探す
        const item = gameState.inventory.find(i => 
            possibleNames.includes(i.name) && i.type === 'material'
        );

        const stock = item ? item.qty : 0;

        if (qtyToSell > stock) {
            better_alert(t('trade_insufficient_stock', { item: currentName }), "error");
            hasStockIssue = true;
            return;
        }

        // 在庫十分なら即座に扣除
        if (item) {
            item.qty -= qtyToSell;
        }
    });

    // 在庫不足があった場合はここで終了（金銭扣除は行わない）
    if (hasStockIssue) return;

    // 購入コストを事前に全額扣除
    if (gameState.gold < data.cost) {
        better_alert(t('trade_insufficient_gold', {
            cost: data.cost,
            current: gameState.gold
        }), "error");

        // 売却素材を元に戻す（巻き戻し）
        resourceKeys.forEach(key => {
            const currentName = translations[currentLang][`resource_${key}`] || key;
            const qtyToReturn = data.sell[currentName] || 0;
            if (qtyToReturn === 0) return;

            const possibleNames = [];
            Object.keys(translations).forEach(lang => {
                const name = translations[lang][`resource_${key}`];
                if (name) possibleNames.push(name);
            });

            const item = gameState.inventory.find(i => 
                possibleNames.includes(i.name) && i.type === 'material'
            );

            if (item) {
                item.qty += qtyToReturn;
            }
        });

        return;
    }

    // コスト扣除
    gameState.gold -= data.cost;

    const city = gameState.tradeCityStates.find(c => c.id === cityId);

    const outLoad = Object.values(data.sell).reduce((a, b) => a + b, 0);
    const inLoad = Object.values(data.buy).reduce((a, b) => a + b, 0);

    const difficulty = Math.floor(data.totalDays * 10);

    const quest = {
        id: gameState.nextId++,
        desc: t('trade_quest_description', {
            cityName: city.name,
            outLoad: outLoad,
            inLoad: inLoad,
            totalDays: data.totalDays
        }),
        difficulty: 1,
        rank: t('trade_rank'),
        minStrength: 0,
        minWisdom: 0,
        minDexterity: 0,
        minLuck: 0,
        focusStat: 'luck',
        minFocus: 0,
        type: 'trade',
        item: null,
        npcIdx: null,
        daysLeft: data.totalDays + 5,
        reward: data.revenue,
        assigned: [],
        inProgress: false,
        questType: questTypeClasses.indexOf('trade'),
        questStoryindex: 0,
        // 貿易内部データ（完了処理用）
        sell: data.sell,
        buy: data.buy,
        outLoad: outLoad,
        inLoad: inLoad,
        tradeRemainingDays: data.totalDays,
        cityName: city.name,
        totalDaysRecorded: data.totalDays,
        buyCost: data.cost,
    };

    gameState.quests.push(quest);
    better_alert(t('trade_post_success'), "success");
    showMainSelection();
    updateDisplays();
}
// updateProgress() の完全版（テキスト充填に完全対応）
function updateProgress() {
    const percent = Math.round((loadedCount / totalAssets) * 100);

    // パーセントテキスト更新
    const progressTextEl = document.getElementById('loadProgress');
    if (progressTextEl) {
        progressTextEl.textContent = percent + '%';
    }

    // 輝く文字の充填幅更新（左から右へスムーズに広がる）
    const loadingFillContainer = document.getElementById('loadingFillContainer');
    if (loadingFillContainer) {
        loadingFillContainer.style.width = percent + '%';
    }

    // 100% 到達時の処理
    if (loadedCount >= totalAssets) {
        // 「NOW LOADING...」とパーセント全体をフェードアウト
        const loadingBottom = document.querySelector('.loading-bottom');
        if (loadingBottom) {
            loadingBottom.style.opacity = '0';
            loadingBottom.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                loadingBottom.style.display = 'none';
            }, 800);
        }

        // ボタン類をフェードイン
        const loadingButtons = document.querySelector('.loading-buttons');
        if (loadingButtons) {
            loadingButtons.style.opacity = '0';
            loadingButtons.style.display = 'flex';
            loadingButtons.style.flexDirection = 'column';
            loadingButtons.style.alignItems = 'center';
            setTimeout(() => {
                loadingButtons.style.opacity = '1';
                loadingButtons.style.transition = 'opacity 1s ease';
            }, 200);
        }

        // 個別ボタン表示（互換性確保）
        const readyBtn = document.getElementById('readyBtn');
        if (readyBtn) readyBtn.style.display = 'block';
        const skipIntroBtn = document.getElementById('skipIntroBtn');
        if (skipIntroBtn) skipIntroBtn.style.display = 'block';

    }
}
function preloadAssets() {
    if (totalAssets === 0) {
        updateProgress();
        return;
    }

    assetsToLoad.forEach(url => {
        if (url.match(/\.(mp3|ogg|wav)$/i)) {
            const audio = new Audio();
            audio.src = url;
            audio.addEventListener('canplaythrough', () => {
                loadedCount++;
                updateProgress();
            });
            audio.addEventListener('error', () => {
                // エラーでもカウントを進めてブロックしない
                loadedCount++;
                updateProgress();
            });
            audio.load();
        } else {
            const img = new Image();
            img.src = url;
            img.addEventListener('load', () => {
                loadedCount++;
                updateProgress();
            });
            img.addEventListener('error', () => {
                loadedCount++;
                updateProgress();
            });
        }
    });
}

function Render_Mainadventurer() {
    const names = mainCharacterNames[currentLang] || mainCharacterNames.ja;  // Fallback to ja

    // カイト (STR/DEX 特化の二刀流騎士) - 女性好き + 魔法使い（WISタイプ）好き
    const Kaito = {
        id: gameState.nextId++,
        name: names.Kaito,
        gender: 'M',
        image: 'カイト.png',
        strength: 30,
        wisdom: 10,
        dexterity: 25,
        luck: 10,
        defense: 2,
        level: 1,
        exp: 0,
        hp: 100,
        maxHp: 100,
        mp: 130,
        maxMp: 130,
        equipment: [],
        buffs: [],
        temp: false,
        busy: false,
        critChance: 10,
        primary: 0,                    // STRタイプ
        Friendliness: 70,
        traits: [                      // 特性追加（翻訳キー対応）
            { type: 'primary', preference: 1, delta: 12, translationKey: "trait.likes_wisdom" }  // WISタイプ好き
        ],
        friendliness: {},              // 初期化
        hunger: 0.8,
        prohibitedActions:[],
        rank: 'F',
        bag: {
            gold: 150,
            items: [
                { name: "鉄の短剣", qty: 2 },
                { name: "HPポーション（小）", qty: 5, type: "potion", restore: "hp", amount: 50 },
                { name: "冒険者の地図", qty: 1 }
            ]
        }
    };

    // ルナ (WIS 特化の魔法使い) - 男性好き + STRタイプ好き
    const Luna = {
        id: gameState.nextId++,
        name: names.Luna,
        gender: 'F',
        image: 'ルナ.png',
        strength: 10,
        wisdom: 30,
        dexterity: 10,
        luck: 25,
        defense: 2,
        level: 1,
        exp: 0,
        hp: 100,
        maxHp: 100,
        mp: 130,
        maxMp: 130,
        equipment: [],
        buffs: [],
        temp: false,
        busy: false,
        critChance: 10,
        primary: 1,                    // WISタイプ
        Friendliness: 70,
        traits: [                      // 特性追加（翻訳キー対応）
            { type: 'primary', preference: 0, delta: 12, translationKey: "trait.likes_strength" }  // STRタイプ好き
        ],
        friendliness: {},              // 初期化
        hunger: 0.8,
        prohibitedActions:[],
        rank: 'F',
        bag: {
            gold: 200,
            items: [
                { name: "古いアミュレット", qty: 1 },
                { name: "魔力の結晶（小）", qty: 8 },
                { name: "MPポーション（小）", qty: 6, type: "potion", restore: "mp", amount: 60 },
                { name: "魔法の書", qty: 1 }
            ]
        }
    };

    // 両方をpush
    gameState.adventurers.push(Kaito);
    gameState.adventurers.push(Luna);

    // === メイン冒険者間の初期好感度を計算・設定 ===
    // Kaito → Luna
    Kaito.friendliness[Luna.id] = 50;
    // Luna → Kaito
    Luna.friendliness[Kaito.id] = 50;

    // 将来的に他の初期冒険者が追加された場合も対応（全ペア相互設定）
    // 例: const mains = [Kaito, Luna];
    // for (let i = 0; i < mains.length; i++) {
    //     for (let j = i + 1; j < mains.length; j++) {
    //         const a = mains[i];
    //         const b = mains[j];
    //         a.friendliness[b.id] = calculateInitialFriendliness(a, b);
    //         b.friendliness[a.id] = calculateInitialFriendliness(b, a);
    //     }
    // }
}


// javascript.js の startGame() と skipIntro() を以下に置き換え

function startGame() {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    const introModal = document.getElementById('introModal');
    if (introModal) {
        introModal.style.display = 'flex';
        introModal.classList.add('visible');  // フェードイン開始
    }    
    // Default fees (player can change them later)
    if (!gameState.facilityFees) {
        gameState.facilityFees = {
            tavern: 10,
            alchemy: 20,
            blacksmith: 15
        };
    }

    // ローディングオーバーレイをフェードアウト開始
    overlay.classList.add('fade-out');

    // フェードアウト完了後にイントロモーダルをフェードイン表示 + 初期化処理
    overlay.addEventListener('transitionend', function handler() {
        overlay.style.display = 'none';  // 完全に非表示
        overlay.removeEventListener('transitionend', handler);



        // ゲーム初期化処理（ここで実行して問題なし）
        Render_Mainadventurer();
        updateDisplays();

        if (!gameState.dungeonCooldowns) {
            gameState.dungeonCooldowns = {}; // { floor: nextAvailableDay }
        }
        console.log("CurrentLang is:" + currentLang);
        currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
        currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
        currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
        currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;

        gameState.tradeCityStates = tradeCities.map(city => ({
            ...city,
            event: getRandomEvent(),
            variances: resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {})
        }));

        gameState.homeVariances = resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {});
        gameState.materialPrices = {};
    });
}

function skipIntro() {
            // セーブデータ読み込み + 表示更新
        loadGame(1);
        updateDisplays();
        audioPlayed = true;
        crossfadeTo('bgm', 7000);
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;

    // ローディングオーバーレイをフェードアウト開始
    overlay.classList.add('fade-out');

    // フェードアウト完了後にゲームシーンをフェードイン表示
    overlay.addEventListener('transitionend', function handler() {
        overlay.style.display = 'none';
        overlay.removeEventListener('transitionend', handler);

        // イントロモーダルを確実に非表示（スキップなので）
        const introModal = document.getElementById('introModal');
        if (introModal) {
            introModal.style.display = 'none';
        }

        // ゲーム本体をフェードイン表示
        document.body.classList.add('game-visible');

        console.log("CurrentLang is:" + currentLang);


    });
}

/* ページ読み込み後すぐにプリロード開始 */
preloadAssets();
const strLightSound = new Audio('Audio/STR_lightAttack.mp3');
const strHeavySound = new Audio('Audio/STR_heavyAttack.mp3');
const strProtectSound = new Audio('Audio/STR_protect.mp3');

const wisLightSound = new Audio('Audio/WIS_lightAttack.mp3');
const wisHeavySound = new Audio('Audio/WIS_heavyAttack.mp3');
const wisExplosionSound = new Audio('Audio/WIS_Explosion.mp3');

const dexLightSound = new Audio('Audio/DEX_lightAttack.mp3');
const dexHeavySound = new Audio('Audio/DEX_heavyAttack.mp3');
const dexStunningSound = new Audio('Audio/DEX_Stunning.mp3');

const lucLightSound = new Audio('Audio/LUC_lightAttack.mp3');
const lucFortuneSound = new Audio('Audio/LUC_fortunestrike.mp3');
const lucEvadeSound = new Audio('Audio/LUC_Evade.mp3');
const lucBlessingSound = new Audio('Audio/LUC_Blessing.mp3');

// Add these Audio declarations (with other Audio objects like strSound, wisSound etc.)
const defenseMSound = new Audio('Audio/Defense_M.mp3');
const defenseFSound = new Audio('Audio/Defense_F.mp3');
const counterMSound = new Audio('Audio/CounterAttack_M.mp3');
const counterFSound = new Audio('Audio/CounterAttack_F.mp3');
const counterTriggerSound = new Audio('Audio/CounterAttack_trigger.mp3');

const levelupSound = new Audio('Audio/levelup.mp3');
const buttonClickSound = new Audio('Audio/Button_Click.mp3');
buttonClickSound.volume = 0.3; // 0.0 ~ 1.0（例: 50%）

let currentCharIndex = 0;
let selectedMix1 = null;
let selectedMix2 = null;
let currentBattle = null;
let currentSelectingAdvId = null;
let draggedAdvId = null;  // ← Add this line
let currentNPCIndex = 0;
let currentQuestIndex = 0;

let currentFacility = null;  // null = 街の通り、それ以外 = 選択中の施設




// 修正版錬金レシピ：全outputに minPrice/maxPrice を追加（sellPrice削除）
// 計算基準：元sellPriceの平均値として min=avg*0.78, max=avg*1.22（fetchクエストspread~50-60%に一致）
// 手動微調整でnice number化（例:45→35-55, 80→60-100）
// ゲームsell logic: random(min, max) で変動売却（fetchアイテムと統一）
// チェイン利益: 低→高で1.5-2x 増加（クエスト報酬回転→爆益）




let gameState = {
    day: 1,
    gold: 1000,
    reputation: 20,
    adventurers: [],
    quests: [],
    inventory: [],
    sellables: [],
    recruitPending: [],
    eventHistory: [],
    nextId: 1,
    maxPermanentSlots: 4,
    gameOver: false,
    discoveredNPCs: [],
    receivedNPCs: [],
    discoveryMultiplier: 10,
    facilities: {blacksmith: 0, tavern: 0, alchemy: 0},
    dailyPrices: {},
    mainProgress: 0,
    dailyMaterials: [],
    // 新規追加：クエスト完了ダイアログの既視フラグ（同じ内容は1回だけ再生）
    seenCompletionDialogues: new Set(),
    facilityFees: {
        tavern: 10,
        alchemy: 20,
        blacksmith: 15
    },
};

// gameState の定義直後（let gameState = { ... }; の次）に以下のコードを挿入
// 新規ゲーム開始時のみ開始永久冒険者を追加（ロード時はスキップ）





// Updated initial adventurer creation code (in javascript.js or wherever the block is)




function getQuestRank(difficulty) {
    if (difficulty <= 10) return 'F';
    if (difficulty <= 20) return 'F+';
    if (difficulty <= 30) return 'D';
    if (difficulty <= 40) return 'D+';
    if (difficulty <= 50) return 'C';
    if (difficulty <= 60) return 'C+';
    if (difficulty <= 70) return 'B';
    if (difficulty <= 80) return 'B+';
    if (difficulty <= 90) return 'A';
    if (difficulty <= 100) return 'A+';
    return 'S';
}

// === javascript.js に新関数追加（価格計算） ===
// === 更新された getMarketPrice 関数（keyToDisplayのみ使用、表示名から内部キーを逆引き） ===
function getMarketPrice(cityState, resource, isHome = false) {
    // 表示名（resource）から内部キーを逆引き（keyToDisplayのみ使用）
    const internalKey = Object.keys(keyToDisplay).find(key => keyToDisplay[key] === resource) || resource; // フォールバック

    // variance と baseMarketPrices は表示名キー前提（既存互換）
    const variance = isHome 
        ? (gameState.homeVariances?.[resource] ?? 1) 
        : (cityState?.variances?.[resource] ?? 1);
    
    let price = baseMarketPrices[resource] * variance;
    
    // specialty は内部キー比較
    if (!isHome && cityState?.specialty === internalKey) {
        price *= specialtyMultiplier;
    }
    
    // イベント乗算：内部キー（internalKey）でアクセス
    if (!isHome && cityState?.event?.multipliers?.[internalKey] !== undefined) {
        const multiplier = cityState.event.multipliers[internalKey];
        price *= multiplier;
        console.log(`Event multiplier applied: ${multiplier} to resource "${resource}" (internal key: "${internalKey}"), city: ${cityState.name}, new price: ${price}`);
    }
    
    return Math.round(price / 5) * 5; // 5g単位に丸め
}

function getBuyPrice(cityState, resource, isHome = false) {
    return Math.round(getMarketPrice(cityState, resource, isHome) * (1 + priceSpread) / 5) * 5;
}

function getSellPrice(cityState, resource, isHome = false) {
    return Math.round(getMarketPrice(cityState, resource, isHome) * (1 - priceSpread) / 5) * 5;
}

function updateDailyPrices() {
    // ホーム（ギルドショップ）価格更新
    resources.forEach(r => {
        gameState.homeVariances[r] = 0.8 + Math.random() * 0.4;
        gameState.materialPrices[r] = getBuyPrice(null, r, true); // ショップ購入価格に同期
    });

    // 貿易都市価格・イベント更新
    gameState.tradeCityStates.forEach(city => {
        resources.forEach(r => city.variances[r] = 0.8 + Math.random() * 0.4);
        if (city.event) {
            city.event.daysLeft--;
            if (city.event.daysLeft <= 0) city.event = getRandomEvent();
        } else {
            city.event = getRandomEvent();
        }
    });
}






function cleanupAdventurers() {
    gameState.adventurers = gameState.adventurers.filter(a => !(a.temp && !a.busy && a.generatedDay < gameState.day));
    gameState.quests.forEach(q => {
        q.assigned = q.assigned.filter(id => {
            const adv = findAdv(id);
            if (!adv) return false;
            if (adv.temp && !adv.busy && adv.generatedDay < gameState.day) {
                const idx = gameState.adventurers.findIndex(a => a.id === id);
                if (idx > -1) gameState.adventurers.splice(idx, 1);
                return false;
            }
            return true;
        });
    });
    gameState.recruitPending = gameState.recruitPending.filter(adv => adv.generatedDay >= gameState.day - 2);
}

// === セーブ時にタイムスタンプを追加 ===
function saveGame(slot = 1) {
    if (slot < 1 || slot > 4) {
        better_alert(t('invalid_save_slot'), "error");
        return;
    }

    const savableState = {
        ...gameState,
        seenCompletionDialogues: Array.from(gameState.seenCompletionDialogues || new Set()),
        dailyRejectedPairs: Array.from(gameState.dailyRejectedPairs || new Set()), // ← 新規追加: Set → Array変換で保存互換性確保
        saveTimestamp: new Date().toLocaleString(currentLang === 'ja' ? 'ja-JP' : 
                                                   currentLang === 'en' ? 'en-US' : 
                                                   currentLang === 'zh' ? 'zh-TW' : 'en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    const key = `guildMasterSave${slot}`;
    localStorage.setItem(key, JSON.stringify(savableState));
    better_alert(t('game_saved_success', { slot: slot }), "success");
    
    // メニューが開いている場合は即時更新
    if (document.getElementById('save-load-modal')) {
        openSlotMenu(currentMode); // 再描画
    }
}

// === スロット情報の取得（表示用）===
function getSlotSummary(slot) {
    const key = `guildMasterSave${slot}`;
    const saved = localStorage.getItem(key);
    
    if (!saved) {
        return { empty: true };
    }
    
    try {
        const data = JSON.parse(saved);
        
        // プレイヤー名（セーブにplayernameまたはplayerNameで保存されている可能性を考慮）
        // 旧セーブ互換性 + カスタム名なし時の言語別デフォルト
        const defaultPlayerName = {
            ja: '冒険者',
            en: 'Adventurer',
            zh: '冒險者'
        }[currentLang] || 'Adventurer';
        
        const playerName = data.playername || data.playerName || defaultPlayerName;
        
        let highestLevel = 1;
        let advCount = 0;
        if (Array.isArray(data.adventurers)) {
            advCount = data.adventurers.length;
            if (advCount > 0) {
                highestLevel = Math.max(...data.adventurers.map(a => a.level || 1));
            }
        }
        
        return {
            empty: false,
            time: data.saveTimestamp || '古いセーブ',
            day: `Day ${data.day || 1}`,
            gold: data.gold || 0,
            highestLevel,
            advCount,
            playerName  // スロットプレビューでプレイヤー名を表示するために返す
        };
    } catch (e) {
        console.warn(`スロット ${slot} のデータが破損しています`);
        return { empty: true, corrupted: true };
    }
}
// === 現在のモードを保持 ===
let currentMode = null; // 'save' または 'load'

// === セーブ/ロードメニューを表示（エクスポート機能追加版）===
function openSlotMenu(mode) {
    currentMode = mode;
    
    // 既存のモーダルがあれば削除
    closeSlotMenu();
    
    const modal = document.createElement('div');
    modal.id = 'save-load-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.75)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    
    // 背景クリックで閉じる
    modal.onclick = (e) => {
        if (e.target === modal) closeSlotMenu();
    };
    
    const content = document.createElement('div');
    content.style.background = '#1a1a1a';
    content.style.color = '#ffffff';
    content.style.padding = '30px';
    content.style.borderRadius = '15px';
    content.style.maxWidth = '700px';
    content.style.width = '90%';
    content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    
    const title = document.createElement('h2');
    title.textContent = mode === 'save' ? t('save_slot_select_title') : t('load_slot_select_title');
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.fontSize = '24px';
    content.appendChild(title);
    
    for (let i = 1; i <= 4; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.style.padding = '16px';
        slotDiv.style.margin = '12px 0';
        slotDiv.style.background = '#2d2d2d';
        slotDiv.style.borderRadius = '10px';
        slotDiv.style.cursor = 'pointer';
        slotDiv.style.transition = 'background 0.2s';
        slotDiv.style.fontSize = '18px';
        
        slotDiv.onmouseover = () => { slotDiv.style.background = '#3d3d3d'; };
        slotDiv.onmouseout = () => { slotDiv.style.background = '#2d2d2d'; };
        
        const info = getSlotSummary(i);
        let text = t('slot_label', { slot: i }) + ' : ';
        
        if (info.empty) {
            text += info.corrupted ? t('slot_corrupted') : t('slot_empty');
            slotDiv.style.opacity = '0.6';
            slotDiv.innerHTML = text;
        } else {
            text += `${info.time}<br>${t('player_label')}: ${info.playerName} | ${info.day} | ${info.gold} ${t('gold_unit')} | ${t('level_label')}: ${info.highestLevel}`;
            slotDiv.innerHTML = text;
        }
        
        slotDiv.onclick = (e) => {
            e.stopPropagation(); // 背景クリック防止
            
            if (mode === 'save') {
                if (!info.empty && !confirm(t('overwrite_confirm', { slot: i }))) {
                    return;
                }
                saveGame(i);
                closeSlotMenu();
            } else { // load
                if (info.empty) {
                    better_alert(t('slot_empty_alert'), "warning");
                    return;
                }
                if (confirm(t('load_confirm', { slot: i }))) {
                    loadGame(i);
                    closeSlotMenu();
                }
            }
        };
        
        content.appendChild(slotDiv);
    }
    
    // === セーブモードの場合、テキストエクスポートオプション ===
    if (mode === 'save') {
        const exportDiv = document.createElement('div');
        exportDiv.style.padding = '20px';
        exportDiv.style.margin = '20px 0 10px';
        exportDiv.style.background = '#7c2d12';
        exportDiv.style.borderRadius = '10px';
        exportDiv.style.cursor = 'pointer';
        exportDiv.style.transition = 'background 0.2s';
        exportDiv.style.fontSize = '18px';
        exportDiv.style.textAlign = 'center';
        exportDiv.style.border = '2px dashed #fb923c';
        
        exportDiv.onmouseover = () => { exportDiv.style.background = '#9a3412'; };
        exportDiv.onmouseout = () => { exportDiv.style.background = '#7c2d12'; };
        
        exportDiv.innerHTML = `<strong>📄 ${t('export_text_title')}</strong><br><small>${t('export_text_desc')}</small>`;
        
        exportDiv.onclick = (e) => {
            e.stopPropagation();
            closeSlotMenu();
            openTextExportModal();
        };
        
        content.appendChild(exportDiv);
    }
    
    // === ロードモードの場合、テキストインポートオプション ===
    if (mode === 'load') {
        const importDiv = document.createElement('div');
        importDiv.style.padding = '20px';
        importDiv.style.margin = '20px 0 10px';
        importDiv.style.background = '#1e40af';
        importDiv.style.borderRadius = '10px';
        importDiv.style.cursor = 'pointer';
        importDiv.style.transition = 'background 0.2s';
        importDiv.style.fontSize = '18px';
        importDiv.style.textAlign = 'center';
        importDiv.style.border = '2px dashed #60a5fa';
        
        importDiv.onmouseover = () => { importDiv.style.background = '#2563eb'; };
        importDiv.onmouseout = () => { importDiv.style.background = '#1e40af'; };
        
        importDiv.innerHTML = `<strong>📄 ${t('import_text_title')}</strong><br><small>${t('import_text_desc')}</small>`;
        
        importDiv.onclick = (e) => {
            e.stopPropagation();
            closeSlotMenu();
            openTextImportModal();
        };
        
        content.appendChild(importDiv);
    }
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = t('cancel_button');
    cancelBtn.style.display = 'block';
    cancelBtn.style.margin = '20px auto 0';
    cancelBtn.style.padding = '12px 30px';
    cancelBtn.style.fontSize = '18px';
    cancelBtn.style.background = '#f44336';
    cancelBtn.style.color = '#fff';
    cancelBtn.style.border = 'none';
    cancelBtn.style.borderRadius = '8px';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.onclick = (e) => {
        e.stopPropagation();
        closeSlotMenu();
    };
    content.appendChild(cancelBtn);
    
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// === 現在のゲームをテキストにエクスポートする専用モーダル ===
function openTextExportModal() {
    // 現在のゲーム状態をセーブ形式で準備（タイムスタンプ付き）
    const savableState = {
        ...gameState,
        seenCompletionDialogues: Array.from(gameState.seenCompletionDialogues || new Set()),
        saveTimestamp: new Date().toLocaleString(currentLang === 'ja' ? 'ja-JP' : 
                                                   currentLang === 'en' ? 'en-US' : 
                                                   currentLang === 'zh' ? 'zh-TW' : 'en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    const jsonString = JSON.stringify(savableState);
    const encodedData = btoa(unescape(encodeURIComponent(jsonString))); // UTF-8対応Base64

    const modal = document.createElement('div');
    modal.id = 'text-export-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.75)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1100';
    modal.onclick = (e) => { if (e.target === modal) closeTextExportModal(); };

    const content = document.createElement('div');
    content.style.background = '#1a1a1a';
    content.style.color = '#ffffff';
    content.style.padding = '30px';
    content.style.borderRadius = '15px';
    content.style.maxWidth = '800px';
    content.style.width = '90%';
    content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';

    const title = document.createElement('h2');
    title.textContent = t('export_text_modal_title');
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    content.appendChild(title);

    const info = document.createElement('p');
    info.textContent = t('export_text_modal_info');
    info.style.marginBottom = '20px';
    content.appendChild(info);

    const textarea = document.createElement('textarea');
    textarea.value = encodedData;
    textarea.style.width = '100%';
    textarea.style.height = '300px';
    textarea.style.background = '#2d2d2d';
    textarea.style.color = '#ffffff';
    textarea.style.padding = '12px';
    textarea.style.borderRadius = '8px';
    textarea.style.fontSize = '14px';
    textarea.style.resize = 'vertical';
    textarea.readOnly = true;
    content.appendChild(textarea);

    const copyBtn = document.createElement('button');
    copyBtn.textContent = t('copy_to_clipboard_button');
    copyBtn.style.display = 'block';
    copyBtn.style.margin = '20px auto';
    copyBtn.style.padding = '12px 30px';
    copyBtn.style.background = '#f97316'; // オレンジでエクスポートらしい
    copyBtn.style.color = '#fff';
    copyBtn.style.border = 'none';
    copyBtn.style.borderRadius = '8px';
    copyBtn.style.cursor = 'pointer';
    copyBtn.onclick = async () => {
        try {
            await navigator.clipboard.writeText(encodedData);
            better_alert(t('copy_success'), "success");
        } catch (err) {
            textarea.select();
            document.execCommand('copy');
            better_alert(t('copy_success_fallback'), "success");
        }
    };
    content.appendChild(copyBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = t('close_button');
    closeBtn.style.display = 'block';
    closeBtn.style.margin = '10px auto 0';
    closeBtn.style.padding = '10px 24px';
    closeBtn.style.background = '#f44336';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '8px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => closeTextExportModal();
    content.appendChild(closeBtn);

    modal.appendChild(content);
    document.body.appendChild(modal);
}

// === テキストエクスポートモーダルを閉じる ===
function closeTextExportModal() {
    const modal = document.getElementById('text-export-modal');
    if (modal) modal.remove();
}

function openTextImportModal() {
    const modal = document.createElement('div');
    modal.id = 'text-import-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.75)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1100';
    modal.onclick = (e) => { if (e.target === modal) closeTextImportModal(); };

    const content = document.createElement('div');
    content.style.background = '#1a1a1a';
    content.style.color = '#ffffff';
    content.style.padding = '30px';
    content.style.borderRadius = '15px';
    content.style.maxWidth = '800px';
    content.style.width = '90%';
    content.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';

    const title = document.createElement('h2');
    title.textContent = t('import_text_modal_title');
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    content.appendChild(title);

    const info = document.createElement('p');
    info.textContent = t('import_text_modal_info');
    info.style.marginBottom = '20px';
    content.appendChild(info);

    const textarea = document.createElement('textarea');
    textarea.placeholder = t('import_text_placeholder');
    textarea.style.width = '100%';
    textarea.style.height = '300px';
    textarea.style.background = '#2d2d2d';
    textarea.style.color = '#ffffff';
    textarea.style.padding = '12px';
    textarea.style.borderRadius = '8px';
    textarea.style.fontSize = '14px';
    textarea.style.resize = 'vertical';
    content.appendChild(textarea);

    const loadBtn = document.createElement('button');
    loadBtn.textContent = t('import_load_button');
    loadBtn.style.display = 'block';
    loadBtn.style.margin = '20px auto';
    loadBtn.style.padding = '12px 30px';
    loadBtn.style.background = '#10b981'; // エメラルドグリーンでロードらしい
    loadBtn.style.color = '#fff';
    loadBtn.style.border = 'none';
    loadBtn.style.borderRadius = '8px';
    loadBtn.style.cursor = 'pointer';
    loadBtn.onclick = () => {
        const text = textarea.value.trim();
        if (!text) {
            better_alert(t('import_empty_text'), "error");
            return;
        }

        let decoded;
        try {
            decoded = decodeURIComponent(escape(atob(text)));
        } catch (e) {
            better_alert(t('import_invalid_format'), "error");
            return;
        }

        let loadedState;
        try {
            loadedState = JSON.parse(decoded);
        } catch (e) {
            better_alert(t('import_corrupted_data'), "error");
            return;
        }

        // === 初期化（loadGameと同じ）===
        gameState.tradeCityStates = tradeCities.map(city => ({
            ...city,
            event: getRandomEvent(),
            variances: resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {})
        }));

        gameState.homeVariances = resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {});
        gameState.materialPrices = {};

        if (!gameState.dungeonCooldowns) {
            gameState.dungeonCooldowns = {};
        }

        currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
        currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
        currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
        currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;

        // === ロード処理（loadGameと同じ）===
        Object.assign(gameState, loadedState);

        if (!gameState.facilities) gameState.facilities = {blacksmith: 0, tavern: 0, alchemy: 0};
        if (!gameState.dailyPrices) gameState.dailyPrices = {};
        if (gameState.mainProgress === undefined) gameState.mainProgress = 0;

        if (Array.isArray(gameState.seenCompletionDialogues)) {
            gameState.seenCompletionDialogues = new Set(gameState.seenCompletionDialogues);
        } else if (!gameState.seenCompletionDialogues) {
            gameState.seenCompletionDialogues = new Set();
        }

        // dailyRejectedPairs 復元（必要に応じて追加）
        if (Array.isArray(gameState.dailyRejectedPairs)) {
            gameState.dailyRejectedPairs = new Set(gameState.dailyRejectedPairs);
        } else if (!gameState.dailyRejectedPairs) {
            gameState.dailyRejectedPairs = new Set();
        }

        gameState.adventurers.forEach(a => {
            if (!a.buffs) a.buffs = [];
        });

        // === アイテム名言語変換（省略せず完全コピー）===
        const itemMap = {};

        const fetchRanks = Object.keys(fetchQuestsByRank.ja);
        fetchRanks.forEach(rank => {
            const currentQuests = fetchQuestsByRank[currentLang][rank] || fetchQuestsByRank.ja[rank];
            ['ja', 'en', 'zh'].forEach(lang => {
                if (lang === currentLang) return;
                const oldQuests = fetchQuestsByRank[lang][rank];
                if (oldQuests && oldQuests.length === currentQuests.length) {
                    oldQuests.forEach((q, i) => {
                        if (currentQuests[i]) {
                            itemMap[q.itemName] = currentQuests[i].itemName;
                        }
                    });
                }
            });
        });

        const alchemyLangs = ['ja', 'en', 'zh'];
        const currentAlchemy = alchemyRecipes[currentLang];
        alchemyLangs.forEach(lang => {
            if (lang === currentLang) return;
            const oldAlchemy = alchemyRecipes[lang];
            if (oldAlchemy && oldAlchemy.length === currentAlchemy.length) {
                oldAlchemy.forEach((rec, i) => {
                    const curRec = currentAlchemy[i];
                    rec.inputs.forEach((inp, j) => {
                        if (curRec.inputs[j]) {
                            itemMap[inp] = curRec.inputs[j];
                        }
                    });
                    itemMap[rec.output.name] = curRec.output.name;
                });
            }
        });

        const tavernLangs = ['ja', 'en', 'zh'];
        const currentTavern = tavernRecipes[currentLang];
        tavernLangs.forEach(lang => {
            if (lang === currentLang) return;
            const oldTavern = tavernRecipes[lang];
            if (oldTavern && oldTavern.length === currentTavern.length) {
                oldTavern.forEach((rec, i) => {
                    const curRec = currentTavern[i];
                    rec.materials.forEach((mat, j) => {
                        const curMat = curRec.materials[j];
                        if (curMat) {
                            itemMap[mat.name] = curMat.name;
                        }
                    });
                    itemMap[rec.name] = curRec.name;
                });
            }
        });

        const blacksmithLangs = ['ja', 'en', 'zh'];
        const currentBlacksmith = blacksmithRecipes[currentLang];
        blacksmithLangs.forEach(lang => {
            if (lang === currentLang) return;
            const oldBlacksmith = blacksmithRecipes[lang];
            if (oldBlacksmith && oldBlacksmith.length === currentBlacksmith.length) {
                oldBlacksmith.forEach((rec, i) => {
                    const curRec = currentBlacksmith[i];
                    rec.materials.forEach((mat, j) => {
                        const curMat = curRec.materials[j];
                        if (curMat) {
                            itemMap[mat.name] = curMat.name;
                        }
                    });
                    itemMap[rec.name] = curRec.name;
                });
            }
        });

        gameState.inventory = gameState.inventory.map(item => {
            if (itemMap[item.name]) {
                return { ...item, name: itemMap[item.name] };
            }
            return item;
        });

        gameState.adventurers.forEach(adv => {
            if (adv.equipment && adv.equipment.length > 0) {
                adv.equipment = adv.equipment.map(eq => {
                    if (itemMap[eq.name]) {
                        return { ...eq, name: itemMap[eq.name] };
                    }
                    return eq;
                });
            }
        });

        cleanupAdventurers();
        checkGameOver();
        updateDisplays();
        ensureTrainingQuest();
        
        better_alert(t('import_success'), "success");
        closeTextImportModal();
    };
    content.appendChild(loadBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = t('cancel_button');
    closeBtn.style.display = 'block';
    closeBtn.style.margin = '10px auto 0';
    closeBtn.style.padding = '10px 24px';
    closeBtn.style.background = '#f44336';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '8px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => closeTextImportModal();
    content.appendChild(closeBtn);

    modal.appendChild(content);
    document.body.appendChild(modal);
}

// === テキストインポートモーダルを閉じる ===
function closeTextImportModal() {
    const modal = document.getElementById('text-import-modal');
    if (modal) modal.remove();
}


// === メニューを閉じる ===
function closeSlotMenu() {
    const modal = document.getElementById('save-load-modal');
    if (modal) {
        modal.remove();
    }
    currentMode = null;
}

// スロット番号（1～4）を指定して読み込み
function loadGame(slot) {
    if (slot < 1 || slot > 4) {
        better_alert(t('save_invalid_slot'), "error");
        return;
    }

    const key = `guildMasterSave${slot}`;

    const saved = localStorage.getItem(key);
    console.log("Current Lang is" + currentLang);

    if (saved) {
        let loadedState;
        try {
            loadedState = JSON.parse(saved);
        } catch (e) {
            better_alert(t('save_corrupted', { slot }), "error");
            console.warn('Save data parse error:', e);
            return;
        }

        // === 初期化（新規ゲーム相当のデフォルト値 – セーブにないプロパティを補完）===
        // これらはロード後も上書きされないよう、loadedStateにない場合のみ設定
        if (!loadedState.tradeCityStates) {
            gameState.tradeCityStates = tradeCities.map(city => ({
                ...city,
                event: getRandomEvent(),
                variances: resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {})
            }));
        }

        if (!loadedState.homeVariances) {
            gameState.homeVariances = resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {});
        }

        if (!loadedState.materialPrices) {
            gameState.materialPrices = {};
        }

        if (!loadedState.dungeonCooldowns) {
            gameState.dungeonCooldowns = {};
        }

        if (!loadedState.facilityFees) {
            gameState.facilityFees = {
                tavern: 10,
                alchemy: 20,
                blacksmith: 15
            };
        }

        // 現在の言語に応じたレシピをグローバルに設定（ロード時も最新言語に更新）
        currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
        currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
        currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
        currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;

        // 既存の gameState にマージ
        Object.assign(gameState, loadedState);

        // 旧セーブ互換性 & 初期化
        if (!gameState.facilities) gameState.facilities = {blacksmith: 0, tavern: 0, alchemy: 0};
        if (!gameState.dailyPrices) gameState.dailyPrices = {};
        if (gameState.mainProgress === undefined) gameState.mainProgress = 0;

        // seenCompletionDialogues を Array → Set に復元
        if (Array.isArray(gameState.seenCompletionDialogues)) {
            gameState.seenCompletionDialogues = new Set(gameState.seenCompletionDialogues);
        } else if (!gameState.seenCompletionDialogues) {
            gameState.seenCompletionDialogues = new Set();
        }

        // dailyRejectedPairs を Array → Set に復元（セーブ互換性対応）
        if (Array.isArray(gameState.dailyRejectedPairs)) {
            gameState.dailyRejectedPairs = new Set(gameState.dailyRejectedPairs);
        } else if (!gameState.dailyRejectedPairs) {
            gameState.dailyRejectedPairs = new Set();
        }

        // 冒険者関連の後方互換処理
        gameState.adventurers.forEach(a => {
            if (!a.buffs) a.buffs = [];
        });

        // === アイテム名言語変換（セーブが古い言語の場合に対応）===
        const itemMap = {};

        // 1. Fetchクエスト素材
        const fetchRanks = Object.keys(fetchQuestsByRank.ja);
        fetchRanks.forEach(rank => {
            const currentQuests = fetchQuestsByRank[currentLang][rank] || fetchQuestsByRank.ja[rank];
            ['ja', 'en', 'zh'].forEach(lang => {
                if (lang === currentLang) return;
                const oldQuests = fetchQuestsByRank[lang][rank];
                if (oldQuests && oldQuests.length === currentQuests.length) {
                    oldQuests.forEach((q, i) => {
                        if (currentQuests[i]) {
                            itemMap[q.itemName] = currentQuests[i].itemName;
                        }
                    });
                }
            });
        });

        // 2. Alchemyレシピ
        const alchemyLangs = ['ja', 'en', 'zh'];
        const currentAlchemy = alchemyRecipes[currentLang];
        alchemyLangs.forEach(lang => {
            if (lang === currentLang) return;
            const oldAlchemy = alchemyRecipes[lang];
            if (oldAlchemy && oldAlchemy.length === currentAlchemy.length) {
                oldAlchemy.forEach((rec, i) => {
                    const curRec = currentAlchemy[i];
                    rec.inputs.forEach((inp, j) => {
                        if (curRec.inputs[j]) {
                            itemMap[inp] = curRec.inputs[j];
                        }
                    });
                    itemMap[rec.output.name] = curRec.output.name;
                });
            }
        });

        // 3. Tavernレシピ
        const tavernLangs = ['ja', 'en', 'zh'];
        const currentTavern = tavernRecipes[currentLang];
        tavernLangs.forEach(lang => {
            if (lang === currentLang) return;
            const oldTavern = tavernRecipes[lang];
            if (oldTavern && oldTavern.length === currentTavern.length) {
                oldTavern.forEach((rec, i) => {
                    const curRec = currentTavern[i];
                    rec.materials.forEach((mat, j) => {
                        const curMat = curRec.materials[j];
                        if (curMat) {
                            itemMap[mat.name] = curMat.name;
                        }
                    });
                    itemMap[rec.name] = curRec.name;
                });
            }
        });

        // 4. Blacksmithレシピ
        const blacksmithLangs = ['ja', 'en', 'zh'];
        const currentBlacksmith = blacksmithRecipes[currentLang];
        blacksmithLangs.forEach(lang => {
            if (lang === currentLang) return;
            const oldBlacksmith = blacksmithRecipes[lang];
            if (oldBlacksmith && oldBlacksmith.length === currentBlacksmith.length) {
                oldBlacksmith.forEach((rec, i) => {
                    const curRec = currentBlacksmith[i];
                    rec.materials.forEach((mat, j) => {
                        const curMat = curRec.materials[j];
                        if (curMat) {
                            itemMap[mat.name] = curMat.name;
                        }
                    });
                    itemMap[rec.name] = curRec.name;
                });
            }
        });

        // === インベントリに適用 ===
        gameState.inventory = gameState.inventory.map(item => {
            if (itemMap[item.name]) {
                return { ...item, name: itemMap[item.name] };
            }
            return item;
        });

        // === 冒険者の装備に適用 ===
        gameState.adventurers.forEach(adv => {
            if (adv.equipment && adv.equipment.length > 0) {
                adv.equipment = adv.equipment.map(eq => {
                    if (itemMap[eq.name]) {
                        return { ...eq, name: itemMap[eq.name] };
                    }
                    return eq;
                });
            }
        });

        cleanupAdventurers();
        checkGameOver();
        updateDisplays();
        ensureTrainingQuest();
        better_alert(t('save_loaded', { slot }), "success");
    } else {
        // セーブがない場合：新規ゲーム相当の初期化を実行
        gameState.tradeCityStates = tradeCities.map(city => ({
            ...city,
            event: getRandomEvent(),
            variances: resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {})
        }));

        gameState.homeVariances = resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {});
        gameState.materialPrices = {};
        gameState.dungeonCooldowns = {};
        gameState.facilityFees = {
            tavern: 10,
            alchemy: 20,
            blacksmith: 15
        };

        better_alert(t('save_no_data', { slot }), "warning");
        updateDisplays();
    }
}

// Counts total quantity of an item by name (handles stacks)
function countItem(name) {
    const stack = gameState.inventory.find(i => i.name === name);
    return stack ? (stack.qty || 0) : 0;
}

// Removes up to `count` from stack by name
function removeItems(name, count) {
    const stackIdx = gameState.inventory.findIndex(i => i.name === name);
    if (stackIdx === -1) return 0;
    const avail = gameState.inventory[stackIdx].qty || 0;
    const consume = Math.min(avail, count);
    gameState.inventory[stackIdx].qty -= consume;
    if (gameState.inventory[stackIdx].qty <= 0) {
        gameState.inventory.splice(stackIdx, 1);
    }
    return consume;
}

// Adds `qty` of item, stacking if identical name (stacks consumables/materials; individual for equip if qty>1)
function addToInventory(template, qty = 1) {
    if (qty <= 0) return;
    const name = template.name;

    if (template.stat) {
        // Equipment: add individually (each gets a unique ID, no stacking)
        // 修正点: 各装備品に qty: 1 を明示的に追加（インベントリ表示用）
        // これにより renderInventory() の filter(item => item.qty > 0) が装備品も通過する
        for (let i = 0; i < qty; i++) {
            const newItem = { ...template, id: gameState.nextId++, qty: 1 };
            gameState.inventory.push(newItem);
        }
    } else {
        // Stackables (potions, materials, consumables): stack by name（変更なし）
        let stack = gameState.inventory.find(i => i.name === name);
        if (stack) {
            // Existing stack – just increase the quantity
            stack.qty = (stack.qty || 1) + qty;
        } else {
            // No existing stack – create a new stacked item
            const newItem = { ...template, id: gameState.nextId++, qty: qty };
            gameState.inventory.push(newItem);
        }
    }
}

function spendGold(amount) {
    if (gameState.gold < amount) {
        better_alert(t('insufficient_gold'), "error");
        return false;
    }
    gameState.gold -= amount;
    checkGameOver();
    return true;
}

function addBattleLog(msg) {
    const log = document.getElementById('battleLog');
    if (log) {
        const line = document.createElement('div');
        line.textContent = msg;
        log.appendChild(line);
        log.scrollTop = log.scrollHeight;  // Auto-scroll to bottom
    } else {
        console.warn('battleLog not found - cannot add:', msg);
    }
}



function corrupt() {
    if (gameState.reputation < 10) {
        better_alert(t("corrupt_insufficient_rep"),"error");
        return;
    }

    const repLoss = Math.floor(Math.random() * 11) + 5;     // 5 ~ 15
    const goldGain = Math.floor(Math.random() * 201) + 100; // 100 ~ 300

    gameState.reputation -= repLoss;
    if (gameState.reputation < 0) gameState.reputation = 0;

    gameState.gold += goldGain;

    better_alert(t('corrupt_success', {gold: goldGain, rep: gameState.reputation}), "success");

    checkGameOver();
    updateDisplays();
}
function checkGameOver() {
    if (gameState.gameOver || gameState.pendingGameOver) return true;

    // Luna と Kaito を image で特定（固定）
    const Luna = gameState.adventurers.find(a => a.image === 'ルナ.png');
    const Kaito = gameState.adventurers.find(a => a.image === 'カイト.png');

    // HPクランプ（存在する場合のみ、負値防止）
    if (Luna) {
        Luna.hp = Math.max(0, Luna.hp);
    }
    if (Kaito) {
        Kaito.hp = Math.max(0, Kaito.hp);
    }

    // 金・Reputationもクランプ
    gameState.gold = Math.max(0, gameState.gold);
    gameState.reputation = Math.max(0, gameState.reputation);

    // 死亡状態の判定（オブジェクト不存在 OR HP <= 0）
    const isLunaDead = !Luna || (Luna && Luna.hp <= 0);
    const isKaitoDead = !Kaito || (Kaito && Kaito.hp <= 0);

    let reason = null;

    // 優先順位:
    // 1. 両方死亡 → lunaKaitoDeath
    // 2. Lunaのみ死亡 → lunaDeath
    // 3. Kaitoのみ死亡 → kaitoDeath
    // 4. 金欠 → gold
    // 5. Reputationゼロ → rep
    if (isLunaDead && isKaitoDead) {
        reason = 'lunaKaitoDeath';
    } else if (isLunaDead) {
        reason = 'lunaDeath';
    } else if (isKaitoDead) {
        reason = 'kaitoDeath';
    } else if (gameState.gold <= 0) {
        reason = 'gold';
    } else if (gameState.reputation <= 0) {
        reason = 'rep';
    }

    if (reason) {
        const seq = getGameOverSequence(reason);
        queueGameOverDialogue(seq);
        gameState.gameOver = true;

        // === NEW: ゲームオーバー専用の終了フラグを設定（ダイアログ終了時に使用） ===
        gameState.isFinalGameOver = true;

        updateDay();
        return true;
    }
    return false;
}

function buyExpansion() {
    const current = gameState.maxPermanentSlots;
    if (current >= 12) {
        better_alert(t('max_expansion_reached'), "error");
        return;
    }
    const next = current + 1;
    const level = next - 4; // 拡張レベル（5スロット目からレベル1）
    const cost = 500 + 250 * (level - 1);

    if (!spendGold(cost)) return;

    gameState.maxPermanentSlots = next;

    // 成功時の翻訳可能アラート（拡張レベルとコストを表示）
    better_alert(t('expansion_purchased', { slots: next, cost: cost }), "success");

    updateDisplays();
}

function randomName(gender) {  // gender: 'male' or 'female' (string, lowercase)
    const names = adventurerNames[currentLang] || adventurerNames.ja;  // fallback to ja
    const pool = names[gender] || names.female;  // default to female if invalid
    return pool[Math.floor(Math.random() * pool.length)];
}

// generateQuest 関数を以下のものに完全に置き換え
function generateQuest(){
    // 新しい難易度計算：Reputationに基づく範囲（平均 ≈ reputation / 10）
    const baseDiff = Math.max(0, Math.floor(gameState.reputation / 10));
    const minDiff = Math.max(1, baseDiff - 5);
    const maxDiff = Math.min(150, baseDiff + 5);
    const difficulty = minDiff + Math.floor(Math.random() * (maxDiff - minDiff + 1));
    const rank = getQuestRank(difficulty);
    let storyindex = 0;

    const primary = Math.floor(Math.random()*4);
    let minStrength=0, minWisdom=0, minDexterity=0, minLuck=0;
    if(primary===0){ // STR - kill
        minStrength = Math.floor(Math.random()*10 + difficulty*5);
        minWisdom   = Math.floor(Math.random()*5  + difficulty*2);
        minDexterity= Math.floor(Math.random()*5  + difficulty*2);
        minLuck     = Math.floor(Math.random()*3  + difficulty);
    }
    else if(primary===1){ // WIS - discovery
        minWisdom    = Math.floor(Math.random()*10 + difficulty*5);
        minStrength  = Math.floor(Math.random()*5  + difficulty*2);
        minDexterity = Math.floor(Math.random()*5  + difficulty*2);
        minLuck      = Math.floor(Math.random()*3  + difficulty);
    }
    else if(primary===2){ // DEX - escort
        minDexterity = Math.floor(Math.random()*10 + difficulty*5);
        minStrength  = Math.floor(Math.random()*5  + difficulty*2);
        minWisdom    = Math.floor(Math.random()*5  + difficulty*2);
        minLuck      = Math.floor(Math.random()*3  + difficulty);
    }
    else { // LUC - fetch
        minLuck      = Math.floor(Math.random()*10 + difficulty*5);
        minStrength  = Math.floor(Math.random()*3  + difficulty);
        minWisdom    = Math.floor(Math.random()*3  + difficulty);
        minDexterity = Math.floor(Math.random()*5  + difficulty*2);
    }

    let desc, item = null, npcIdx = null;
    let qType = 5; // default fallback

    if (primary === 0) { // kill (STR)
        const descs = killDescsByRank[currentLang] || killDescsByRank.ja;
        const pool = descs[rank] || descs['F'];
        qType = 0;
        storyindex = Math.floor(Math.random() * pool.length); 
        desc = pool[storyindex];
    } 
    else if (primary === 1) { // discovery (WIS)
        const descs = discoveryDescsByRank[currentLang] || discoveryDescsByRank.ja;
        const pool = descs[rank] || descs['F'];
        

        qType = 1;
        const selectedIndex = Math.floor(Math.random() * pool.length);
        const selectedDesc = pool[selectedIndex];
        desc = selectedDesc;


        storyindex = selectedIndex;

    } 
    else if (primary === 2) { // escort (DEX)
        const descs = escortDescsByRank[currentLang] || escortDescsByRank.ja;
        const pool = descs[rank] || descs['F'];
        qType = 2;
        storyindex = Math.floor(Math.random() * pool.length); 
        desc = pool[storyindex];
    } 
    else { // fetch (LUC)
        const quests = fetchQuestsByRank[currentLang] || fetchQuestsByRank.ja;
        const pool = quests[rank] || quests['F'];
        qType = 3;
        storyindex = Math.floor(Math.random() * pool.length); 
        const entry = pool[storyindex];
        const qty = Math.floor(Math.random() * 3) + 1;
        desc = entry.desc.replace('{qty}', qty);
        item = {name: entry.itemName, minPrice: entry.minPrice, maxPrice: entry.maxPrice};
    }

    const focusStat = ['strength', 'wisdom', 'dexterity', 'luck'][primary];
    const minFocus = primary === 0 ? minStrength : primary === 1 ? minWisdom : primary === 2 ? minDexterity : minLuck;

    // Base gold reward (same as before)
    let baseReward = difficulty * 50;

    // Apply quest-type gold multiplier
    let goldMultiplier = 1.0;
    if (qType === 2) {          // escort
        goldMultiplier = 1.2;
    } else if (qType === 3) {   // fetch
        goldMultiplier = 0.5;
    } 
    // kill (0) and discovery (1) keep 1.0×

    const finalReward = Math.round(baseReward * goldMultiplier);

    return {
        id: gameState.nextId++,
        desc: desc,
        difficulty,
        minStrength, minWisdom, minDexterity, minLuck,
        focusStat: focusStat,
        minFocus: minFocus,
        type: primary,
        item: item,
        npcIdx: npcIdx,
        daysLeft: 7 + Math.floor(Math.random() * 8),
        reward: finalReward,           // ← modified here
        assigned: [],
        inProgress: false,
        questType: qType,
        questStoryindex: storyindex,
        rank: rank,
    };
}
let currentDayEvents = [];
let currentPage = 0;

function showModal(day) {
    currentDayEvents = gameState.eventHistory.filter(e => e.day === day);
    if (currentDayEvents.length === 0) {
        startDay();
        return;
    }
    currentPage = 0;
    document.getElementById('eventModal').style.display = 'flex';
    updateModal();
}








function updateAlchemyPreview() {
    const ing1 = document.getElementById('alchemyIng1')?.value || '';
    const ing2 = document.getElementById('alchemyIng2')?.value || '';
    const qtySel = document.getElementById('alchemyQty');
    const qty = parseInt(qtySel?.value) || 1;
    const preview = document.getElementById('alchemyPreview');
    if (!preview) return;

    if (!ing1 || !ing2 || ing1 === ing2) {
        preview.innerHTML = '';
        return;
    }

    const sortedInputs = [ing1, ing2].sort();
    const recipe = currentAlchemyRecipes.find(r => {
        const rInputs = [...r.inputs].sort();
        return rInputs[0] === sortedInputs[0] && rInputs[1] === sortedInputs[1];
    });

    if (!recipe) {
        preview.innerHTML = '<span style="color: red;">有効なレシピがありません</span>';
        return;
    }

    const cnt1 = countItem(ing1);
    const cnt2 = countItem(ing2);
    const color1 = cnt1 >= qty ? 'green' : 'red';
    const color2 = cnt2 >= qty ? 'green' : 'red';

    preview.innerHTML = `
        <strong>出力:</strong> ${recipe.output.name} × ${qty}<br>
        <strong>必要:</strong><br>
        ${ing1} × ${qty} <span style="color:${color1};">(在庫 ${cnt1})</span><br>
        ${ing2} × ${qty} <span style="color:${color2};">(在庫 ${cnt2})</span>
    `;
}



function updateModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (currentDayEvents.length === 0) {
        closeModal();
        return;
    }
    modalContent.innerHTML = `<p><strong>${currentDayEvents[currentPage].message}</strong></p>`;
    pageInfo.innerHTML = `ページ ${currentPage + 1} / ${currentDayEvents.length}`;
    prevBtn.style.display = currentPage > 0 ? 'inline-block' : 'none';
    nextBtn.style.display = currentPage < currentDayEvents.length - 1 ? 'inline-block' : 'none';
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateModal();
    }
}

function nextPage() {
    if (currentPage < currentDayEvents.length - 1) {
        currentPage++;
        updateModal();
    }
}

function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
    if (!gameState.gameOver) {
        startDay();
    }
}

function generateDefenseQuest() {
    const difficulty = 1;
    let minDexterity = Math.floor(Math.random() * 10 + difficulty * 5);
    const desc = defenseDescs[Math.floor(Math.random() * defenseDescs.length)];
    const numEnemies = 1 + Math.floor(Math.random() * 4);
    return {
        id: gameState.nextId++,
        desc: desc,
        difficulty: difficulty,
        minStrength: 0, minWisdom: 0, minDexterity: minDexterity, minLuck: 0,
        focusStat: 'dexterity',
        minFocus: minDexterity,
        type: 4,
        daysLeft: 1,
        reward: 0,
        assigned: [],
        inProgress: false,
        defense: true,
        numEnemies: numEnemies,
        enemies: []
    };
}

function generateTrainingQuest() {
    return {
        id: gameState.nextId++,
        desc: t('training_quest_name'),
        difficulty: 1,
        minStrength: 0,
        minWisdom: 0,
        minDexterity: 0,
        minLuck: 0,
        focusStat: 'strength',
        minFocus: 0,
        type: 5,
        training: true,
        daysLeft: 99999,
        reward: 0,
        assigned: [],
        inProgress: false
    };
}

function ensureTrainingQuest() {
    if (!gameState.quests.some(q => q.training)) {
        const tq = generateTrainingQuest();
        gameState.quests.unshift(tq);
    }
}
ensureTrainingQuest()



const sideQuestCompletionDialogue = [
    // 0: 地図の賢者 エルドリン - discovery (永遠の航路図)
    [
        {speaker: "冒険者", text: "失われた「永遠の航路図」の断片をすべて集め、正確な地図を完成させました。……古代の道標が、忘れられた大陸を示していました。"},
        {speaker: "ギルドマスター", text: "よくやった。エルドリン、この地図が我々の故郷を襲った軍勢の起源に繋がるかもしれない。"},
        {speaker: "エルドリン", text: "……この航路は、深淵の彼方から来る者たちの古い道だ。黒い鎧の軍勢が通った痕跡が、ここに残っている。君たちの村が狙われた理由……おそらく、封印の鍵がそこにあったのだろう。本当に感謝する。この地図が、真実への一歩となる。"},
        {speaker: "ギルドマスター", text: "EXPオーブだ。これで力を蓄え、深淵に立ち向かおう。"}
    ],
    // 1: 歴史の語り部 タリア - fetch (古の石碑拓本)
    [
        {speaker: "冒険者", text: "忘れられた時代の「古の石碑の拓本」を5枚すべて集めてきました。……石碑の文字が、闇の王の名を繰り返していました。"},
        {speaker: "ギルドマスター", text: "タリア、これがヴォルガスの復活に関する記録か？"},
        {speaker: "タリア", text: "……そうだ。この石碑は、かつて深淵の王ヴォルガスを封じた者たちの警告だ。黒い鎧の軍勢は、彼の先兵に違いない。君たちの故郷は、封印の守りの要だったのかもしれない。私の語りが、君たちの復讐に力を貸すことになるだろう。心から感謝する。"},
        {speaker: "ギルドマスター", text: "EXPオーブを受け取ってくれ。真実が近づいている。"}
    ],
    // 2: 深海の探求者 コルバト - discovery (アビス・クリスタル洞窟)
    [
        {speaker: "冒険者", text: "深海の「アビス・クリスタル」の洞窟を発見し、潜水ルートを記録しました。……洞窟の壁に、黒い鎧の軍勢の紋章が刻まれていました。"},
        {speaker: "ギルドマスター", text: "深海にまで……コルバト、これは何を意味する？"},
        {speaker: "コルバト", text: "アビスクリスタルは深淵のエネルギーを吸収する……この洞窟は、ヴォルガスの力が地上に漏れ出る通路だったのかもしれない。あの軍勢は、海底から上陸した可能性がある。君たちの村が最初の標的だった理由が、少し見えてきた。本当にありがとう。この発見が、希望の光となる。"},
        {speaker: "ギルドマスター", text: "EXPオーブだ。深淵の脅威に備えよう。"}
    ],
    // 3: 反響の予見者 シララ - discovery (エコー・チャンバー)
    [
        {speaker: "冒険者", text: "「エコー・チャンバー」の隠された場所を探し出しました。……響く声が、ヴォルガスの復活を告げていました。"},
        {speaker: "ギルドマスター", text: "シララ、予言の詳細を教えてくれ。"},
        {speaker: "シララ", text: "……『黒い鎧が村を焼き、封印の鍵を奪うとき、王は目覚める』。君たちの故郷が鍵だったのだ。あの夜の襲撃は、ヴォルガスの復活の始まり……だが、君たちが生き延びたことも、予言の一部だ。希望はまだ残っている。本当に感謝する。この声が、君たちを導くだろう。"},
        {speaker: "ギルドマスター", text: "EXPオーブを受け取ってくれ。予言に抗う力を。"}
    ],
    // 4: 星の観測者 アストリッド - discovery (スターフォール高原観測点)
    [
        {speaker: "冒険者", text: "「スターフォール高原」の隠された観測点を特定しました。……星の配列が、深淵の門の開く日を示していました。"},
        {speaker: "ギルドマスター", text: "アストリッド、いつだ？"},
        {speaker: "アストリッド", text: "星は告げている……ヴォルガスの完全復活は近い。あの黒い軍勢は、門を開くための布石だった。君たちの村が破壊されたのは、守りの結界を壊すためだ。だが、星はまた、希望の光も示している。君たちがその光だ。本当にありがとう。この観測が、運命を変える鍵となる。"},
        {speaker: "ギルドマスター", text: "EXPオーブだ。星の導きに従おう。"}
    ],
    // 5: 森のドルイド リオラ - kill (毒のマンドラゴラ)
    [
        {speaker: "冒険者", text: "森を腐敗させる「毒のマンドラゴラ」の群れを根絶やしにしました。……根の奥に、深淵の魔力が残っていました。"},
        {speaker: "ギルドマスター", text: "リオラ、これはヴォルガスの影響か？"},
        {speaker: "リオラ", text: "……そうだ。深淵の腐敗が、自然にまで広がっていた。君たちの村が襲われたのも、同じ力の仕業だろう。森を浄化してくれてありがとう。この勝利が、大地全体の希望となる。自然は君たちを祝福する。"},
        {speaker: "ギルドマスター", text: "EXPオーブを受け取ってくれ。腐敗に負けない力を。"}
    ],
    // 6: 灰の学者 ボルカン - fetch (エターナル・アッシュ)
    [
        {speaker: "冒険者", text: "火山地帯から「エターナル・アッシュ」を8個集めてきました。……灰の中に、闇の炎が混じっていました。"},
        {speaker: "ギルドマスター", text: "ボルカン、これは何を意味する？"},
        {speaker: "ボルカン", text: "エターナル・アッシュに闇の炎……ヴォルガスの力が、地底から噴出しようとしている。あの黒い軍勢は、火山の道を通って地上に出たのかもしれない。君たちの故郷が最初だった理由が、少しわかる。本当に感謝する。この灰が、対抗の鍵となるだろう。"},
        {speaker: "ギルドマスター", text: "EXPオーブだ。炎に焼かれぬ力を。"}
    ],
    // 7: 幻の舞姫 ザラ - escort (呪われた劇場)
    [
        {speaker: "冒険者", text: "ザラを呪われた劇場まで無事に護衛しました。……舞の最中、幻影がヴォルガスの姿を見せました。"},
        {speaker: "ギルドマスター", text: "ザラ、その幻影は何を語った？"},
        {speaker: "ザラ", text: "私の舞が、幻影を呼び出した……ヴォルガスの復活が近いこと、そして封印の鍵が君たちの故郷にあったこと。あの襲撃は、鍵を奪うためのものだったわ。君たちが生き延びたのは、運命だ。本当にありがとう。この舞が、君たちの復讐を祝福する。"},
        {speaker: "ギルドマスター", text: "EXPオーブを受け取ってくれ。幻に惑わされぬ力を。"}
    ],
    // 8: 宝石の彫刻師 トーン - fetch (スターレム・ジェム)
    [
        {speaker: "冒険者", text: "「スターレム・ジェム」を6個集めてきました。……宝石の中に、闇の影が映っていました。"},
        {speaker: "ギルドマスター", text: "トーン、これはヴォルガスの力か？"},
        {speaker: "トーン", text: "スターレム・ジェムは光を映す……だが今は闇を映している。ヴォルガスの復活が近い証だ。あの黒い軍勢は、光を奪うために動いたのだろう。君たちの村が標的だったのは、純粋な光を守っていたからだ。本当に感謝する。この宝石が、闇を打ち砕く武器となる。"},
        {speaker: "ギルドマスター", text: "EXPオーブだ。光を守る力を。"}
    ],
    // 9: 永遠の守護者 フェイ - kill (シャドウ・タイタン)
    [
        {speaker: "冒険者", text: "「シャドウ・タイタン」を討伐しました。……その核に、ヴォルガスの刻印がありました。"},
        {speaker: "ギルドマスター", text: "フェイ、これは……"},
        {speaker: "フェイ", text: "シャドウ・タイタンは、ヴォルガスの分身の一つ……私の守護の領域まで侵食していた。あの黒い軍勢は、彼の意志そのものだ。君たちの故郷が破壊されたのは、永遠の守護を弱めるためだったのだろう。君たちがここにいるのは、運命の反撃だ。本当に、心から感謝する。この勝利が、永遠の均衡を取り戻す。"},
        {speaker: "ギルドマスター", text: "EXPオーブを受け取ってくれ。永遠の守りを破らぬ力を。"}
    ]
];

function generateSideQuest(npcIdx) {
    if (npcIdx < 0 || npcIdx >= sideQuestData.length) {
        console.error('Invalid NPC index for side quest');
        return null;
    }

    const data = sideQuestData[npcIdx];

    // 既存の同じNPCのサイドクエストが進行中なら生成しない（1人1クエスト限定）
    const existing = gameState.quests.find(q => q.side && q.npcIdx === npcIdx);
    if (existing) {
        return null; // またはalertで通知（呼び出し側で処理）
    }

    return {
        id: gameState.nextId++,
        desc: data.desc,
        difficulty: data.difficulty,
        rank: data.rank,
        minStrength: data.minStrength || 0,
        minWisdom: data.minWisdom || 0,
        minDexterity: data.minDexterity || 0,
        minLuck: data.minLuck || 0,
        focusStat: data.focusStat,
        minFocus: data.minFocus,
        type: data.type, // 0:kill, 1:discovery, 2:escort, 3:fetch
        item: data.item || null, // fetchの場合のみ
        npcIdx: npcIdx,
        daysLeft: data.daysLeft,
        reward: data.reward,
        assigned: [],
        inProgress: false,
        side: true,
        // 特別報酬：EXP Orb（レベル+5）
        specialReward: { name: 'EXP Orb', type: 'consumable', effect: 'level_up', amount: 5 }
    };
}

function generateTempAdventurer(){
    const primary = Math.floor(Math.random()*4);
    
    let s = 10, w = 10, d = 10, l = 10;
    if(primary===0) s = 20;
    else if(primary===1) w = 20;
    else if(primary===2) d = 20;
    else l = 20;
    
    const gender = Math.random() < 0.5 ? 'M' : 'F';
    const name = randomName(gender);
    const statAbbr = ['STR','WIS','DEX','LUC'][primary];
    
    // 新しい画像命名規則に合わせて、ランダムにバリアント（1または2）を選択
    const variant = Math.floor(Math.random() * 2) + 1; // 1 または 2
    const image = `${statAbbr}_${gender}${variant}.png`;
    
    let adv = {
        id: gameState.nextId++,
        name: name,
        gender: gender,
        level: 1,
        exp: 0,
        strength: s,
        wisdom: w,
        dexterity: d,
        luck: l,
        defense: 2,
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        equipment: [],
        buffs: [],
        image: image,
        temp: true,
        busy: false,
        generatedDay: 0,
        primary: primary,
        critChance: 10,
        traits: [],                     
        friendliness: {},               
        Friendliness: 50,               
        bag: {gold: 300, items: []},
        hunger: 0.6,
        prohibitedActions:[],
    };

    // === 特性キー生成ヘルパー（重複防止用）===
    function getTraitKey(trait) {
        if (trait.type === 'gender') return `gender_${trait.preference}`;  // 正負関係なく同じ性別は1つだけ
        else if (trait.type === 'primary') return `primary_${trait.preference}`;  // 同じ主ステは好き/嫌いどちらか一方
        else if (trait.type === 'level') return `level_${trait.preference}`;  // 先輩/後輩どちらか一方
        else if (trait.type === 'stat_compare') return `statcmp_${trait.stat}_${trait.preference}`;  // 同じステのhigher/lowerどちらか一方
        else if (trait.type === 'action_preference') return `action_${trait.action}`;
        else if (trait.type === 'initial_bonus') return `initbonus_${trait.target}`;
        else if (trait.type === 'percent_bonus') return `percentbonus_${trait.target}`;
        else return JSON.stringify(trait);
    }

    // === 特性プールをポジティブ/ネガティブに分離 ===
    const positiveTraits = possibleTraits.filter(t => 
        (t.delta ?? 0) > 0 || (t.weight_bonus ?? 0) > 0
    );
    const negativeTraits = possibleTraits.filter(t => 
        (t.delta ?? 0) < 0 || (t.weight_bonus ?? 0) < 0
    );

    const usedKeys = new Set();
    adv.traits = [];

    // === ステップ1: 最低1つの「好き」（positive）と1つの「嫌い」（negative）を保証 ===
    if (positiveTraits.length > 0) {
        let trait, key;
        do {
            trait = positiveTraits[Math.floor(Math.random() * positiveTraits.length)];
            key = getTraitKey(trait);
        } while (usedKeys.has(key));
        usedKeys.add(key);
        adv.traits.push(trait);
    }

    if (negativeTraits.length > 0) {
        let trait, key;
        do {
            trait = negativeTraits[Math.floor(Math.random() * negativeTraits.length)];
            key = getTraitKey(trait);
        } while (usedKeys.has(key));
        usedKeys.add(key);
        adv.traits.push(trait);
    }

    // === ステップ2: 合計特性数を2～4に決定し、追加特性をランダム付与 ===
    const totalTraits = Math.floor(Math.random() * 3) + 2; // 2～4個
    const additionalTraits = totalTraits - adv.traits.length;

    for (let i = 0; i < additionalTraits; i++) {
        let trait, key;
        do {
            trait = possibleTraits[Math.floor(Math.random() * possibleTraits.length)];
            key = getTraitKey(trait);
        } while (usedKeys.has(key));

        usedKeys.add(key);
        adv.traits.push(trait);
    }

    // === 初期ボーナス特性の適用 ===
    adv.traits.forEach(trait => {
        if (trait.type === 'initial_bonus') {
            const delta = trait.delta;
            switch (trait.target) {
                case 'strength': adv.strength += delta; break;
                case 'wisdom': adv.wisdom += delta; break;
                case 'dexterity': adv.dexterity += delta; break;
                case 'luck': adv.luck += delta; break;
                case 'defense': adv.defense += delta; break;
                case 'maxHp':
                    adv.maxHp += delta;
                    adv.hp += delta;
                    break;
                case 'maxMp':
                    adv.maxMp += delta;
                    adv.mp += delta;
                    break;
            }
            adv.hp = Math.max(1, adv.hp);
            adv.mp = Math.max(0, adv.mp);
            adv.strength = Math.max(1, adv.strength);
            adv.wisdom = Math.max(1, adv.wisdom);
            adv.dexterity = Math.max(1, adv.dexterity);
            adv.luck = Math.max(1, adv.luck);
            adv.defense = Math.max(0, adv.defense);
        }
    });
    
    const targetLevel = Math.max(1, Math.floor(gameState.reputation / 20));
    levelUp(adv, targetLevel - 1);
    
    const total = adv.strength + adv.wisdom + adv.dexterity + adv.luck;
    adv.hiringCost = Math.floor(20 + total);
    adv.recruitingCost = Math.floor(100 + total * 3);
    
    return adv;
}

function showQuestCompletionStory(story) {
    let page = 0;
    const total = story.length;

    const renderPage = () => {
        const line = story[page];
        let html = '';

        if (line.image) {
            html += `<img src="${line.image}" alt="${line.speaker}" style="float:left; margin:0 20px 20px 0; width:160px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.4);">`;
        }

        html += `<div style="overflow:hidden;">`;
        html += `<p style="font-size:1.5em; margin:0 0 10px;"><strong>${line.speaker}:</strong></p>`;
        html += `<p style="font-size:1.3em; line-height:1.7;">${line.text.replace(/{player}/g, playerName || 'あなた')}</p>`;
        html += `</div>`;

        document.getElementById('modalContent').innerHTML = html;
        document.getElementById('modalTitle').innerText = 'クエスト完了 — 特別な一幕';
        document.getElementById('pageInfo').innerText = `${page + 1} / ${total}`;

        document.getElementById('prevBtn').style.display = page > 0 ? 'inline-block' : 'none';
        document.getElementById('nextBtn').style.display = page < total - 1 ? 'inline-block' : 'none';
    };

    document.getElementById('prevBtn').onclick = () => { page--; renderPage(); };
    document.getElementById('nextBtn').onclick = () => { page++; renderPage(); };

    renderPage();
    document.getElementById('eventModal').style.display = 'flex';
}

// Use 1 potion from stack on character
function usePotionOnChar(charIdx, potionName) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[charIdx];
    if (!adv) return;
    const stackIdx = gameState.inventory.findIndex(i => i.name === potionName);
    if (stackIdx === -1) {
        better_alert('ポーションが見つかりません',"error");
        return;
    }
    const potion = gameState.inventory[stackIdx];
    if ((potion.qty || 1) <= 0) {
        gameState.inventory.splice(stackIdx, 1);
        return;
    }
    if (potion.restore === 'hp') {
        adv.hp = Math.min(adv.maxHp, adv.hp + potion.amount);
    } else if (potion.restore === 'mp') {
        adv.mp = Math.min(adv.maxMp, adv.mp + potion.amount);
    }
    potion.qty--;
    if (potion.qty <= 0) {
        gameState.inventory.splice(stackIdx, 1);
    }
    renderCurrentCharacter();
    updateDisplays();
    
}



function generateKillRecruit(difficulty) {
    const primary = Math.floor(Math.random()*4);
    const repFactor = Math.max(0.1, (gameState.reputation + difficulty * 20 + 50) / 100);
    let s = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor)), 
        w = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor)), 
        d = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor)), 
        l = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor));
    if (primary === 0) s = Math.floor(5 * repFactor + Math.random() * (5 * repFactor)) + Math.floor(gameState.reputation / 20) + Math.floor(difficulty / 2);
    else if (primary === 1) w = Math.floor(5 * repFactor + Math.random() * (5 * repFactor)) + Math.floor(gameState.reputation / 20) + Math.floor(difficulty / 2);
    else if (primary === 2) d = Math.floor(5 * repFactor + Math.random() * (5 * repFactor)) + Math.floor(gameState.reputation / 20) + Math.floor(difficulty / 2);
    else l = Math.floor(5 * repFactor + Math.random() * (5 * repFactor)) + Math.floor(gameState.reputation / 20) + Math.floor(difficulty / 2);
    const gender = Math.random() < 0.5 ? 'M' : 'F';
    const name = randomName(gender);
    const statAbbr = ['STR','WIS','DEX','LUC'][primary];
    const image = `${statAbbr}_${gender}.png`;
    let adv = {
        id: gameState.nextId++,
        name: name,
        level: 1, 
        exp: 0,
        strength: s, 
        wisdom: w, 
        dexterity: d, 
        luck: l,
        defense: 2,
        hp: 100, 
        maxHp: 100, 
        mp: 50, 
        maxMp: 50,
        equipment: [],
        buffs: [],
        image: image,
        busy: false,
        primary: primary,
        // === 新規追加: AIチャット対応属性 ===
        Friendliness: 50,                    // 初期好感度（村人NPCと同じ）
        bag: {                               // バッグ初期化
            gold: Math.floor(difficulty * 5 + 50),  // 少しGold持たせる（難易度依存）
            items: []                        // 初期アイテムなし（後でcraft/give可能）
        }
    };
    const startLevel = Math.max(1, Math.floor(difficulty / 2));
    for (let lv = 1; lv < startLevel; lv++) {
        const r = Math.random();
        let sb = 1, wb = 1, db = 1, lb = 1;
        if (r < 0.4) wb += 1;
        else if (r < 0.6) sb += 1;
        else if (r < 0.8) db += 1;
        else lb += 1;
        adv.strength += sb;
        adv.wisdom += wb;
        adv.dexterity += db;
        adv.luck += lb;
        adv.maxHp += 20;
        adv.maxMp += 10;
    }
    adv.level = startLevel;
    adv.defense = startLevel * 2;
    adv.hp = adv.maxHp;
    adv.mp = adv.maxMp;
    adv.exp = 0;

    // === 好感度微調整（難易度/Reputationが高いほど初期好感度アップ） ===
    adv.Friendliness = Math.min(100, 70 + Math.floor(difficulty / 5) + Math.floor(gameState.reputation / 20));

    return adv;
}

function generateEnemies(q) {
    q.enemies = [];

    // List of possible gendered enemy images
    const possibleEnemyImages = [
        "Images/Assassin(F)_enemy.png",
        "Images/Assassin(M)_enemy.png",
        "Images/Hunter(F)_enemy.png",
        "Images/Hunter(M)_enemy.png"
    ];

    // Map image filename to base Japanese name (without gender)
    const imageToJaName = {
        "Assassin(F)_enemy.png": "暗殺者",
        "Assassin(M)_enemy.png": "暗殺者",
        "Hunter(F)_enemy.png": "ハンター",
        "Hunter(M)_enemy.png": "ハンター"
    };

    for (let i = 0; i < q.numEnemies; i++) {
        const baseStat = Math.floor((Math.floor(gameState.reputation) + 1) * 0.6 + Math.random() * 10);

        // Randomly choose an image from the list
        const imagePath = possibleEnemyImages[Math.floor(Math.random() * possibleEnemyImages.length)];

        // Derive sex from the image name
        const match = imagePath.match(/\((M|F)\)/);
        const sex = match ? match[1] : 'N'; // 'M', 'F', or 'N' if no match

        // Get base Japanese name from map
        const baseJaName = imageToJaName[imagePath.split('/').pop()] || "敵";

        const e = {
            id: `enemy_${q.id}_${i}`,
            name: baseJaName + ` ${i + 1}`,
            image: imagePath,
            sex: sex, // 'M', 'F', or 'N'
            hp: Math.floor(60 + baseStat * 1.5 + Math.random() * 30),
            maxHp: 0,
            mp: Math.floor(20 + baseStat * 0.5 + Math.random() * 10),
            maxMp: 0,
            strength: Math.max(1, Math.floor(baseStat * 0.8 + Math.random() * 5)),
            wisdom: Math.max(1, Math.floor(baseStat * 0.8 + Math.random() * 5)),
            dexterity: Math.max(1, Math.floor(baseStat * 0.8 + Math.random() * 5)),
            luck: Math.max(1, Math.floor(baseStat * 0.5 + Math.random() * 3)),
            defense:2,
            defending: false,
            action: null,
            target: null
        };
        e.maxHp = e.hp;
        e.maxMp = e.mp;
        q.enemies.push(e);
    }
}
function rollStat(adv, statName) {
    if (!adv) return 0;
    const base = getEffectiveStat(adv, statName);
    const variance = 0.25;
    const minMod = base * (1 - variance);
    const maxMod = base * (1 + variance);
    const final = Math.max(Math.round(minMod + Math.random() * (maxMod - minMod)), 1);
    return final;
}

function getEffectiveStat(obj, stat) {
    if (!obj) return 0;
    const base = obj[stat] || 0;

    // スロット初期化（安全策）
    initializeSlots(obj);

    // === 装備ボーナス（%扱い）===
    let percentFromEquip = 0;

    // === 装備ボーナス（絶対値：enhancement）===
    let absoluteFromEquip = 0;

    // 全てのスロットを走査（ロックされた左手を除外）
    Object.keys(obj.slots).forEach(slotKey => {
        const slotItem = obj.slots[slotKey];
        if (!slotItem || (slotItem.locked)) return; // ロックされた左手はスキップ

        if (slotItem.stat === stat) {
            percentFromEquip += (slotItem.bonus || 0);
            absoluteFromEquip += (slotItem.enhancement || 0);
        }
    });

    // === バフボーナス（%扱い）===
    let percentFromBuff = 0;
    if (obj.buffs) {
        obj.buffs.forEach(b => {
            if (b.stat === stat && b.percent) { // %バフのみ（絶対値バフは別途処理可能なら追加）
                percentFromBuff += (b.bonus || 0);
            }
        });
    }

    // === 特性によるパーセントボーナス ===
    let percentFromTraits = 0;
    if (obj.traits) {
        obj.traits.forEach(t => {
            if (t.type === 'percent_bonus' && t.target === stat) {
                percentFromTraits += (t.delta || 0);
            }
        });
    }

    // MP比率によるパーセンテージ補正（-20% ～ +20%）
    const mpPct = obj && typeof obj.mp === 'number' && typeof obj.maxMp === 'number' && obj.maxMp > 0 
        ? obj.mp / obj.maxMp : 1;
    let mpPercent = (mpPct >= 0.5) 
        ? 20 * (mpPct - 0.5) / 0.5 
        : -20 * (0.5 - mpPct) / 0.5;

    // 合計%ボーナス（装備% + バフ% + 特性% + MP%）
    let totalPercent = percentFromEquip + percentFromBuff + percentFromTraits + mpPercent;

    // %適用後（小数切り捨て）
    let afterPercent = Math.floor(base * (1 + totalPercent / 100));

    // 絶対値ボーナス加算（enhancement）
    let total = afterPercent + absoluteFromEquip;

    return Math.max(1, total);
}
function calcSumStats(adv){
    return ['strength','wisdom','dexterity','luck'].reduce((sum, st) => sum + getEffectiveStat(adv, st), 0);
}

function levelUp(adv, forceLevels = 0) {
    let levelsGained = forceLevels;
    
    // Normal EXP-based leveling (only if no forceLevels)
    if (forceLevels === 0) {
        while (adv.exp >= adv.level * 100) {
            adv.exp -= adv.level * 100;
            levelsGained++;
        }
    }

    // Apply growth for each level gained
    for (let i = 0; i < levelsGained; i++) {
        adv.level++;

        // Compute current stats before growth
        const currentStats = {
            strength: adv.strength,
            wisdom: adv.wisdom,
            dexterity: adv.dexterity,
            luck: adv.luck
        };

        // Find max stat value
        const maxStatValue = Math.max(...Object.values(currentStats));

        // Find all stats that match the max value
        const highestStats = Object.keys(currentStats).filter(key => currentStats[key] === maxStatValue);

        // Weighted selection: base 1 for all, +4 bonus for each highest stat
        const weights = {
            strength: 1,
            wisdom: 1,
            dexterity: 1,
            luck: 1
        };
        highestStats.forEach(stat => {
            weights[stat] += 4;
        });

        // Total weight
        const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

        // Pick weighted random stat for big boost
        const rand = Math.random() * totalWeight;
        let cumulative = 0;
        let chosenStat = null;
        for (let stat in weights) {
            cumulative += weights[stat];
            if (rand <= cumulative) {
                chosenStat = stat;
                break;
            }
        }

        // Apply +1 to all, +4 extra to chosen
        let sb = 1, wb = 1, db = 1, lb = 1;
        switch (chosenStat) {
            case 'strength':
                sb += 4;
                break;
            case 'wisdom':
                wb += 4;
                break;
            case 'dexterity':
                db += 4;
                break;
            case 'luck':
                lb += 4;
                break;
        }

        adv.strength += sb;
        adv.wisdom += wb;
        adv.dexterity += db;
        adv.luck += lb;

        adv.maxHp += 20;
        adv.maxMp += 10;
        adv.defense +=2;
        adv.hp = adv.maxHp;  // Full heal on each level up
        adv.mp = adv.maxMp;
    }

    // === LEVEL UP CELEBRATION (only for natural EXP-based levels, never for forceLevels) ===
    if (forceLevels === 0 && levelsGained > 0) {
        let message = adv.name+" Level Up! (Level: "+adv.level+")";
        better_alert(message, "levelup");
        // Sound is automatically played inside better_alert when type === "levelup"
    }
}
function findAdv(id){return gameState.adventurers.find(a=>a.id===id);}

function assign(questId, advId){
    const q=gameState.quests.find(q=>q.id===questId);
    if(!q) return;
    if (q.inProgress && !q.training && q.type !== 8) {
        better_alert(t('quest_in_progress_no_add'),"error");
        return;
    }
    const maxSlots = q.training ? 2 : 4;
    if(q.assigned.length >= maxSlots){
        better_alert(q.training ? t('training_max_2') : t('quest_full'),"error");
        return;
    }
    const adv=findAdv(advId);
    if(!adv) return;
    if(adv.mp <= 0){ 
        better_alert(t('no_mp', {name: adv.name}),"error"); 
        return; 
    }

    // === 貿易クエスト：一時冒険者（temp）は参加不可 ===
    if ((q.type === 8 || q.type === 'trade') && adv.temp) {
        better_alert(t('temp_cannot_join_trade', {name: adv.name}), "error");
        return;
    }

    // === ランク不足チェック（クエストにrankがあれば）===
    if (q.rank && adv.rank) {
        const ranks = ['F', 'F+', 'E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+'];
        const advIndex = ranks.indexOf(adv.rank);
        const questIndex = ranks.indexOf(q.rank);

        if (advIndex !== -1 && questIndex !== -1 && advIndex < questIndex) {
            // Using the variables to fill the requested phrase
            const errorMessage = `${adv.name}的等級${adv.rank}不足以參加此任務（需要${q.rank}以上）`;
            
            better_alert(errorMessage, "error");
            return;
        }
    }
    // === 今日すでに拒否されたペアは割り当て不可 ===
    if (q.assigned.length > 0) {
        for (let memberId of q.assigned) {
            const member = findAdv(memberId);
            if (!member) continue;

            const pairKey = [adv.id, member.id].sort((a,b) => a - b).join('-');
            if (gameState.dailyRejectedPairs.has(pairKey)) {
                better_alert(t('daily_rejected_pair', {name1: adv.name, name2: member.name}),"error");
                return;
            }
        }
    }

    // === 双方向相性拒否チェック（恒久冒険者のみ適用、tempは無条件参加）===
    if (q.assigned.length > 0) {
        console.log(`[割り当てデバッグ] ${adv.name} をクエストに追加しようとしています (temp: ${adv.temp})`);

        let rejectReason = null;
        let rejectedPairs = new Set();  // 今日拒否されたペアを記録（悪い関係のペアのみ）

        // 1. 新規参加者（adv）の視点：既存メンバーに対する最終好感度
        if (!adv.temp) {
            let lowestFromAdv = 100;
            let lowPairsFromAdv = [];  // 好感度<40のメンバー（拒否対象）

            q.assigned.forEach(memberId => {
                const member = findAdv(memberId);
                if (!member) return;

                let baseVal = adv.friendliness?.[member.id] ?? 50;
                let bonus = 0;
                adv.traits.forEach(trait => {
                    let delta = 0;
                    if (trait.type === 'gender' && trait.preference === member.gender) delta = trait.delta ?? 0;
                    else if (trait.type === 'primary' && trait.preference === member.primary) delta = trait.delta ?? 0;
                    else if (trait.type === 'level') {
                        const levelDiff = member.level - adv.level;
                        if ((trait.preference === 'higher' && levelDiff > 0) || (trait.preference === 'lower' && levelDiff < 0)) {
                            delta = trait.delta ?? 0;
                        }
                    } else if (trait.type === 'stat_compare') {
                        const stats = ['strength', 'wisdom', 'dexterity', 'luck'];
                        const myStat = adv[stats[trait.stat]];
                        const otherStat = member[stats[trait.stat]];
                        if ((trait.preference === 'higher' && otherStat > myStat) || (trait.preference === 'lower' && otherStat < myStat)) {
                            delta = trait.delta ?? 0;
                        }
                    }
                    bonus += delta;
                });

                const finalVal = baseVal + bonus;
                lowestFromAdv = Math.min(lowestFromAdv, finalVal);

                if (finalVal < 40) {
                    lowPairsFromAdv.push(member);
                }
            });

            let rejectChance = 0;
            if (lowestFromAdv < 20) rejectChance = 100;
            else if (lowestFromAdv < 40) rejectChance = (40 - lowestFromAdv) * 5;

            console.log(`[adv視点] 最低好感度: ${lowestFromAdv} → 拒否確率: ${rejectChance}%`);

            if (Math.random() * 100 < rejectChance) {
                rejectReason = t('self_reject_low_friendliness', {
                    name: adv.name,
                    lowest: lowestFromAdv,
                    chance: rejectChance
                });

                // 好感度<40のペアのみブロック（中立のKaitoとはブロックしない）
                lowPairsFromAdv.forEach(member => {
                    const pairKey = [adv.id, member.id].sort((a,b) => a - b).join('-');
                    rejectedPairs.add(pairKey);
                });
            }
        } else {
            console.log(`[adv視点] temp冒険者のため拒否チェックスキップ`);
        }

        // 2. 既存メンバー（恒久のみ）の視点：新規参加者に対する最終好感度
        if (!rejectReason) {
            for (let memberId of q.assigned) {
                const member = findAdv(memberId);
                if (!member || member.temp) {
                    console.log(`[member視点] ${member?.name || '不明'} はtempのため拒否チェックスキップ`);
                    continue;
                }

                let baseVal = member.friendliness?.[adv.id] ?? 50;
                let bonus = 0;
                member.traits.forEach(trait => {
                    let delta = 0;
                    if (trait.type === 'gender' && trait.preference === adv.gender) delta = trait.delta ?? 0;
                    else if (trait.type === 'primary' && trait.preference === adv.primary) delta = trait.delta ?? 0;
                    else if (trait.type === 'level') {
                        const levelDiff = adv.level - member.level;
                        if ((trait.preference === 'higher' && levelDiff > 0) || (trait.preference === 'lower' && levelDiff < 0)) {
                            delta = trait.delta ?? 0;
                        }
                    } else if (trait.type === 'stat_compare') {
                        const stats = ['strength', 'wisdom', 'dexterity', 'luck'];
                        const myStat = member[stats[trait.stat]];
                        const otherStat = adv[stats[trait.stat]];
                        if ((trait.preference === 'higher' && otherStat > myStat) || (trait.preference === 'lower' && otherStat < myStat)) {
                            delta = trait.delta ?? 0;
                        }
                    }
                    bonus += delta;
                });

                const finalVal = baseVal + bonus;

                let rejectChance = 0;
                if (finalVal < 20) rejectChance = 100;
                else if (finalVal < 40) rejectChance = (40 - finalVal) * 5;

                console.log(`[member視点] ${member.name} → ${adv.name}: ベース${baseVal} + ボーナス${bonus} = 最終${finalVal} → 拒否確率: ${rejectChance}%`);

                if (Math.random() * 100 < rejectChance) {
                    rejectReason = t('rejected_by_member', {
                        name: adv.name,
                        member: member.name,
                        final: finalVal,
                        chance: rejectChance
                    });

                    const pairKey = [adv.id, member.id].sort((a,b) => a - b).join('-');
                    rejectedPairs.add(pairKey);
                    break;
                }
            }
        }

        if (rejectReason) {
            better_alert(rejectReason, "error");
            console.log(`[拒否発生] ${rejectReason}`);

            // 拒否されたペアのみ記録（中立ペアはブロックしない）
            rejectedPairs.forEach(pair => gameState.dailyRejectedPairs.add(pair));

            return;
        } else {
            console.log(`[割り当て成功] 拒否なし - ${adv.name} をクエストに追加`);
        }
    }

    // === 雇用コスト処理（拒否されなかった場合のみ）===
    const cost = adv.temp ? adv.hiringCost : 0;
    if (cost > 0) {
        if (gameState.gold < cost) {
            better_alert(t('insufficient_gold'),"error");
            return;
        }
        gameState.gold -= cost;
        console.log(`[雇用] ${adv.name} の雇用コスト ${cost}G 消費`);
    }

    // === 割り当て実行 ===
    q.assigned.push(advId);
    adv.busy = true;
    updateDisplays();
}
function unassign(questId, advId){
    const q=gameState.quests.find(q=>q.id===questId);
    if(!q || q.inProgress) return;
    const idx = q.assigned.indexOf(advId);
    if(idx === -1) return;
    q.assigned.splice(idx, 1);
    const adv = findAdv(advId);
    if(adv){
        adv.busy = false;
        if(adv.temp){
            gameState.gold += adv.hiringCost;
        }
    }
    updateDisplays();
}

function rejectQuest(qId) {
    const q = gameState.quests.find(qq => qq.id === qId);
    if (!q) return;
    if (q.assigned.length > 0 || q.inProgress || q.defense || q.training || q.playerPosted) return;
    const penalty = 0.1 * q.difficulty;
    gameState.reputation -= penalty;
    const idx = gameState.quests.findIndex(qq => qq.id === qId);
    if (idx !== -1) {
        gameState.quests.splice(idx, 1);
    }
    better_alert(`クエストを拒否しました！Reputation -${penalty.toFixed(1)}`,"error");
    updateDisplays();
}

function buy(i, qty) {
    const it = shopItems[i];
    const totalcost = it.cost * qty;
    if (!spendGold(totalcost)) {
        return;
    } 
    
    addToInventory(it, qty);
    better_alert(
        t('shop_purchase_success', {
            name: it.name,
            qty: qty,
            total: totalcost,
            gold: gameState.gold
        }),
        "success"
    );
    updateDisplays();
}



function recruit(i){
    const numPerms = gameState.adventurers.filter(a => !a.temp).length;
    if(numPerms >= gameState.maxPermanentSlots){
        better_alert('ギルドは満杯です！拡張を購入してさらに募集してください。',"error");
        return;
    }
    const adv=gameState.recruitPending[i];
    if(!spendGold(adv.recruitingCost)) return;

    // 深いコピーして正規メンバー化
    const newAdv = JSON.parse(JSON.stringify(adv));
    delete newAdv.temp;
    delete newAdv.generatedDay;
    newAdv.hp = newAdv.maxHp;
    newAdv.mp = newAdv.maxMp;
    newAdv.busy = false;
    newAdv.buffs = [];

    // === 好感度初期化（新規追加）===
    newAdv.friendliness = {};                     // 自分から他者への好感度
    newAdv.traits = newAdv.traits || [];          // generateTempAdventurerで付与済みのはず
    newAdv.rank = 'F',

    // 既存メンバー全員との好感度を設定
    gameState.adventurers.forEach(other => {
        if (!other.friendliness) other.friendliness = {};

        // 新メンバー → 既存メンバー
        newAdv.friendliness[other.id] = 50;

        // 既存メンバー → 新メンバー
        other.friendliness[newAdv.id] = 50;
    });

    // ゲーム状態に追加
    gameState.adventurers.push(newAdv);
    gameState.recruitPending.splice(i,1);

    better_alert(t('adventurer_joined', {name: adv.name}), "success");
    updateDisplays();
}

function firePerm(pIdx){
    const perms=gameState.adventurers.filter(a=>!a.temp);
    const adv=perms[pIdx];
    if (!adv) return;
    if (adv.busy) {
        better_alert("現在クエスト中の冒険者を解雇できません！","error");
        return;
    }
    if(confirm(`${adv.name}を解雇しますか？取り消せません。`)){
        gameState.quests.forEach(q => {
            const idx = q.assigned.indexOf(adv.id);
            if (idx > -1) {
                q.assigned.splice(idx, 1);
            }
        });
        const idx = gameState.adventurers.findIndex(a=>a.id===adv.id);
        if(idx > -1){
            gameState.adventurers.splice(idx,1);
        }
        currentCharIndex = Math.max(0, currentCharIndex - 1);
        renderCurrentCharacter();
        updateDisplays();
    }
}

function initializeSlots(adv) {
    if (!adv.slots) {
        adv.slots = {
            head: null,
            body: null,
            legs: null,
            feet: null,
            accessory: null,
            leftHand: null,
            rightHand: null,
            gloves: null,
            cape: null,
        };

        // 既存のequipment配列（旧システム）からの移行（後方互換）
        if (Array.isArray(adv.equipment) && adv.equipment.length > 0) {
            adv.equipment.forEach(item => {
                // 旧システムは最大2個の武器のみ想定 → One Handとして自動割り当て
                if (!adv.slots.rightHand) {
                    adv.slots.rightHand = item;
                } else if (!adv.slots.leftHand) {
                    adv.slots.leftHand = item;
                }
            });
            delete adv.equipment; // 移行後削除（クリーンアップ）
        }
    }
}

// === 装備関数（カテゴリベースのスロット割り当て）===
function equipToChar(pIdx, itemId) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    if (!adv) return;

    const itemIdx = gameState.inventory.findIndex(it => it.id === itemId);
    if (itemIdx === -1) return;
    const item = gameState.inventory[itemIdx];
    if (!item || !item.stat || !item.category) {
        better_alert('装備できないアイテムです', "error");
        return;
    }

    initializeSlots(adv);

    let targetSlot = null;
    let requiresBothHands = false;

    switch (item.category) {
        case 'Head':
            targetSlot = 'head';
            break;
        case 'Body':
            targetSlot = 'body';
            break;
        case 'Legs':
            targetSlot = 'legs';
            break;
        case 'Feet':
            targetSlot = 'feet';
            break;
        case 'Accessory':
            targetSlot = 'accessory';
            break;
        case 'Gloves':
            targetSlot = 'gloves';
            break;
        case 'Cape':
            targetSlot = 'cape';
            break;            
        case 'Both Hands':
            requiresBothHands = true;
            targetSlot = 'rightHand';
            break;
        case 'One Hand':
        default:
            // 片手武器：右優先 → 左
            if (!adv.slots.rightHand) {
                targetSlot = 'rightHand';
            } else if (!adv.slots.leftHand) {
                // 追加チェック：右が両手武器なら左はロックされているはずだが、念のため
                if (adv.slots.rightHand && adv.slots.rightHand.category === 'Both Hands') {
                    better_alert('両手武器装備中は左手スロットを使用できません', "error");
                    return;
                }
                targetSlot = 'leftHand';
            }
            break;
    }

    // スロット占有チェック（強化版）
    if (requiresBothHands) {
        if (adv.slots.leftHand || adv.slots.rightHand) {
            better_alert('両手が空いていません（両手武器装備用）', "error");
            return;
        }
    } else if (targetSlot) {
        if (adv.slots[targetSlot]) {
            // 左手をターゲットした場合、右が両手武器なら専用メッセージ
            if (targetSlot === 'leftHand' && adv.slots.rightHand && adv.slots.rightHand.category === 'Both Hands') {
                better_alert('両手武器装備中は左手スロットを使用できません', "error");
                return;
            }
            better_alert('そのスロットは既に占有されています', "error");
            return;
        }
    } else {
        better_alert('手スロットが満杯です', "error");
        return;
    }

    // 装備実行
    if (requiresBothHands) {
        adv.slots.leftHand = { locked: true }; // 明確にロック
    }
    adv.slots[targetSlot] = item;

    // インベントリから削除
    gameState.inventory.splice(itemIdx, 1);

    renderCurrentCharacter();
}

// === 解除関数（スロット指定）===
function removeFromSlot(pIdx, slotKey) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    if (!adv || !adv.slots) return;

    // 冒険者のbagを初期化（Goldとitemsを確保）
    initializeEntityBag(adv);

    let itemToUnequip = null; // 買取対象のアイテム

    if (slotKey === 'leftHand' && adv.slots.leftHand && adv.slots.leftHand.locked) {
        // 両手武器解除：右手のアイテムを買取対象
        itemToUnequip = adv.slots.rightHand;
    } else if (adv.slots[slotKey] && !adv.slots[slotKey].locked) {
        // 通常スロット：そのスロットのアイテムを買取対象
        itemToUnequip = adv.slots[slotKey];
    }

    // 買取ロジック（アイテムが存在する場合のみ）
    if (itemToUnequip) {
        // コスト取得（アイテムにcostがあれば優先、なければshopItemsからnameで検索）
        let cost = itemToUnequip.cost || 0;
        if (cost === 0) {
            const shopItem = shopItems.find(si => si.name === itemToUnequip.name);
            if (shopItem && shopItem.cost !== undefined) {
                cost = shopItem.cost;
            }
        }

        if (cost === 0) {
            // コスト不明：無料解除
            better_alert(`${adv.name}の「${itemToUnequip.name}」を無料で解除しました（コスト不明）`, "basic");
        } else {
            // 買取額 = コスト × 1.2（端数切り捨て）
            const payback = Math.floor(cost * 1.2);

            // Gold不足チェック
            if (gameState.gold < payback) {
                better_alert(t('insufficient_gold') || "Goldが不足しています", "error");
                return; // 解除キャンセル
            }

            // 買取処理：ギルドGold減少、冒険者bag.gold増加
            gameState.gold -= payback;
            adv.bag.gold += payback;

            // 買取通知
            better_alert(
                t('equipment_buyback', { name: adv.name, item: itemToUnequip.name, amount: payback }) ||
                `${adv.name}に${payback}Gを支払い、「${itemToUnequip.name}」を解除しました`,
                "success"
            );
        }

        // インベントリに戻す
        addToInventory(itemToUnequip, 1);
    }

    // スロットクリア処理
    if (slotKey === 'leftHand' && adv.slots.leftHand && adv.slots.leftHand.locked) {
        // 両手武器：両スロットクリア
        adv.slots.rightHand = null;
        adv.slots.leftHand = null;
    } else if (adv.slots[slotKey] && !adv.slots[slotKey].locked) {
        // 通常スロット：そのスロットのみクリア
        adv.slots[slotKey] = null;

        // 右手解除時、左手のロックも解除（片手武器ケースの安全策）
        if (slotKey === 'rightHand' && adv.slots.leftHand && adv.slots.leftHand.locked) {
            adv.slots.leftHand = null;
        }
    }

    renderCurrentCharacter();
    updateDisplays();
}

function removeFromChar(pIdx, eqIdx) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    if (!adv) return;

    const item = adv.equipment[eqIdx];
    if (!item) return;

    // 冒険者のbagを初期化（Goldとitemsを確保）
    initializeEntityBag(adv);

    // コスト取得（アイテムにcostがあれば優先、なければshopItemsからnameで検索）
    let cost = item.cost || 0;
    if (cost === 0) {
        const shopItem = shopItems.find(si => si.name === item.name);
        if (shopItem && shopItem.cost !== undefined) {
            cost = shopItem.cost;
        }
    }

    // コストが不明な場合は無料解除
    if (cost === 0) {
        adv.equipment.splice(eqIdx, 1);
        addToInventory(item, 1);
        better_alert(`${adv.name}の「${item.name}」を無料で解除しました（コスト不明）`, "basic");
        renderCurrentCharacter();
        return;
    }

    // 買取額 = コスト × 1.2（端数切り捨て）
    const payback = Math.floor(cost * 1.2);

    // Gold不足チェック
    if (gameState.gold < payback) {
        better_alert(t('insufficient_gold') || "Goldが不足しています", "error");
        return;
    }

    // 買取処理：ギルドのGoldを減らし、冒険者のbag.goldを増やす
    gameState.gold -= payback;
    adv.bag.gold += payback;

    // 買取通知
    better_alert(
        t('equipment_buyback', { name: adv.name, item: item.name, amount: payback }) ||
        `${adv.name}に${payback}Gを支払い、「${item.name}」を解除しました`,
        "success"
    );

    // 装備解除＆インベントリに戻す
    adv.equipment.splice(eqIdx, 1);
    addToInventory(item, 1);

    renderCurrentCharacter();
}



function useConsumable(pIdx, itemId) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    if (!adv) return;
    const itemIdx = gameState.inventory.findIndex(it => it.id === itemId);
    if (itemIdx === -1) return;
    const item = gameState.inventory[itemIdx];
    if (!item || !item.buff) return;
    adv.buffs = adv.buffs || [];
    adv.buffs.push({
        stat: item.buff.stat,
        bonus: item.buff.bonus,
        daysLeft: item.buff.days,
        percent: item.buff.percent || false,
        type: item.buff.type
    });
    gameState.inventory.splice(itemIdx, 1);
    renderCurrentCharacter();
}

function buyMaterial(idx) {
    if (idx >= gameState.dailyMaterials.length) return;
    const mat = gameState.dailyMaterials[idx];
    if (!spendGold(mat.price)) return;
    addToInventory(mat, 1);
    gameState.dailyMaterials.splice(idx, 1);
    document.getElementById('shopContent').innerHTML = renderCurrentShopPage();
    updateDisplays();
}

let currentShopPage = 0;


// Updated shopSections (use keys instead of hardcoded titles)
const shopSections = [
    { key: 'shop_purchase', render: renderShopPurchase },
    { key: 'daily_materials', render: renderDailyMaterials },
    { key: 'guild_expansion', render: renderGuildExpansion },
    { key: 'corrupt_merchant', render: renderCorruption },
    { key: 'sell_items', render: renderSellItems }
];

if (!gameState.loans) {
    gameState.loans = [];
}

/* 毎日実行される handleLoans 関数（playDay() 内で gameState.day++ の直後に呼び出す想定） */
function handleLoans() {
    if (!gameState.loans || gameState.loans.length === 0) return;

    gameState.loans = gameState.loans.filter(loan => {
        const daysPassed = gameState.day - loan.startDay;

        // 28日を超過したら即ゲームオーバー（債務不履行）
        if (daysPassed > 28) {
            queueGameOverDialogue(getGameOverSequence('gold'));
            return false;
        }

        // 7日毎の支払い日（7,14,21,28日目）
        if (daysPassed > 0 && daysPassed % 7 === 0 && daysPassed <= 28) {
            const interest = Math.round(loan.principal * 0.1);
            let payment = interest;
            let isFinal = (daysPassed === 28);

            if (isFinal) {
                payment += loan.principal; // 最終日は元本も返済
            }

            if (gameState.gold < payment) {
                queueGameOverDialogue(getGameOverSequence('gold'));
                return false;
            }

            gameState.gold -= payment;
            better_alert(
                isFinal
                    ? t('loan_final_payment', { payment: payment, principal: loan.principal })
                    : t('loan_interest_payment', { payment: interest }),
                "warning"
            );

            if (isFinal) {
                return false; // 完済したローンは削除
            }
        }
        return true;
    });

    updateDisplays();
}

/* 借金ページのレンダー関数 */
function renderBorrowPage() {
    // 名声を切り捨てて整数化（浮動小数点誤差を完全に排除 + 保守的に丸め下げ）
    const reputationFloor = Math.floor(gameState.reputation);
    const maxBorrowTotal = reputationFloor * 100;
    const currentBorrowed = gameState.loans.reduce((sum, loan) => sum + loan.principal, 0);
    const available = Math.max(0, maxBorrowTotal - currentBorrowed);

    // 全体を白文字にするラッパー（背景が暗いため視認性向上）
    let html = `<div style="line-height:1.7; font-size:1.05em;">`;

    html += `<p>${t('borrow_explanation')}</p>`;
    html += `<p>${t('current_reputation')}: <strong style="color:#ffd700;">${reputationFloor}</strong></p>`;
    html += `<p>${t('max_borrow_limit')}: <strong style="color:#ffd700;">${maxBorrowTotal}G</strong> 
             (${t('currently_borrowed')}: <strong style="color:#ffaa66;">${currentBorrowed}G</strong> / 
             ${t('available')}: <strong style="color:#88ff88;">${available}G</strong>)</p>`;

    // 現在の借金一覧
    if (gameState.loans.length > 0) {
        html += `<h3 style="margin-top:30px; color:#ffd700;">${t('current_loans')}</h3>
                 <ul style="margin:20px 0; padding-left:25px; list-style-type:disc;">`;
        gameState.loans.forEach(loan => {
            const interest = Math.round(loan.principal * 0.1);
            const daysPassed = gameState.day - loan.startDay;
            const periodsPassed = Math.floor(daysPassed / 7);
            const nextPaymentDay = loan.startDay + (periodsPassed + 1) * 7;
            const finalDay = loan.startDay + 28;

            html += `<li style="margin:15px 0;">
                • ${t('principal')}: <strong style="color:#ffd700;">${loan.principal}G</strong> 
                  (${t('borrowed_on_day')}: ${loan.startDay})<br>
                ${t('weekly_interest')}: <strong style="color:#ffaa66;">${interest}G</strong><br>
                ${t('next_payment_day')}: <strong style="color:#ffdd77;">${nextPaymentDay}</strong> 
                    ${periodsPassed < 4 ? `(${t('interest_only')})` : `(<strong style="color:#ff6666;">${t('final_with_principal')}</strong>)`}<br>
                ${t('final_due_day')}: <strong style="color:#ff6666;">${finalDay}</strong>
            </li>`;
        });
        html += `</ul>`;
    }

    // 借入フォーム（残り枠があれば表示）
    if (available > 0) {
        html += `<div style="margin-top:30px; padding:20px; background:rgba(40,40,40,0.7); border-radius:12px; border:1px solid #555;">
            <label style="display:block; margin-bottom:12px; font-size:1.15em;">
                ${t('borrow_amount')} ${t('borrow_input_note', {available: available})}:
            </label>
            <input type="number" id="borrowAmount" min="100" step="100" max="${available}" value="0" 
                   style="width:220px; padding:10px; font-size:1.1em; background:#333; color:#fff; border:1px solid #666; border-radius:6px;">
            <button onclick="borrowGold()" 
                    style="margin-left:15px; padding:10px 30px; font-size:1.15em; background:#e67e22; color:#ffffff; border:none; border-radius:8px; cursor:pointer;">
                ${t('borrow_button')}
            </button>
        </div>`;
    } else {
        html += `<p style="margin-top:30px; color:#e74c3c; font-weight:bold; font-size:1.2em;">${t('borrow_max_reached')}</p>`;
    }

    html += `</div>`; // ラッパー閉じ

    return html;
}

/* 実際に借入を実行する関数 */
/* borrowGold() も同じ切り捨て計算に統一（表示とチェックを完全に一致させる） */
function borrowGold() {
    const input = document.getElementById('borrowAmount');
    if (!input) return;

    const amount = parseInt(input.value);

    if (isNaN(amount) || amount < 100 || amount % 100 !== 0) {
        better_alert(t('borrow_invalid_amount'), "error");
        return;
    }

    // 表示と同じ切り捨て計算を使用
    const reputationFloor = Math.floor(gameState.reputation);
    const maxTotal = reputationFloor * 100;
    const currentTotal = gameState.loans.reduce((sum, loan) => sum + loan.principal, 0);

    if (currentTotal + amount > maxTotal) {
        better_alert(t('borrow_exceeds_limit'), "error");
        return;
    }

    gameState.loans.push({
        principal: amount,
        startDay: gameState.day
    });

    gameState.gold += amount;
    better_alert(t('borrow_success', { amount: amount }), "success");
    updateDisplays();
    renderCurrentShopPage(); // ページ再描画
}

/* shopSections に借金ページを追加（最後のページとして） */
shopSections.push({
    key: 'shop_borrow_gold',
    render: renderBorrowPage
});


let currentShopFilter = 'all';

function getShopListHtml() {
    const groupOrder = {
        potions: 0,
        'One Hand': 1,
        'Both Hands': 2,
        Head: 3,
        Body: 4,
        Legs: 5,
        Feet: 6,
        Gloves: 7,
        Cape: 8,
        Accessory: 9
    };

    const groupNames = {
        potions: 'Potions',
        'One Hand': 'One Hand Weapons',
        'Both Hands': 'Both Hands Weapons',
        Head: 'Head',
        Body: 'Body',
        Legs: 'Legs',
        Feet: 'Feet',
        Gloves: 'Gloves',
        Cape: 'Cape',
        Accessory: 'Accessories'
    };

    // Filter items
    let indices = shopItems.map((_, i) => i);

    indices = indices.filter(i => {
        const it = shopItems[i];
        if (currentShopFilter === 'all') return true;
        if (currentShopFilter === 'potions') return it.type === 'potion';
        return it.category === currentShopFilter;
    });

    // Sort: All = group order → price, single category = price only
    indices.sort((ia, ib) => {
        const a = shopItems[ia];
        const b = shopItems[ib];

        if (currentShopFilter === 'all') {
            const ga = a.type === 'potion' ? 'potions' : (a.category || 'other');
            const gb = b.type === 'potion' ? 'potions' : (b.category || 'other');
            const oa = groupOrder[ga] ?? 99;
            const ob = groupOrder[gb] ?? 99;
            if (oa !== ob) return oa - ob;
        }

        return a.cost - b.cost;
    });

    // Generate list HTML
    let listHtml = '';
    let currentGroup = '';

    if (indices.length === 0) {
        listHtml = '<p style="text-align:center; color:#aaa; padding:40px 0;">No items in this category.</p>';
        return listHtml;
    }

    indices.forEach(i => {
        const it = shopItems[i];
        const group = it.type === 'potion' ? 'potions' : (it.category || 'other');

        if (group !== currentGroup) {
            if (currentGroup !== '') listHtml += '</ul>';
            const groupTitle = groupNames[group] || group;
            listHtml += `
                <div style=" background: transparent; margin:30px 0 12px; font-size:1.5em; font-weight:bold; color:#ffd700; text-shadow:0 0 10px rgba(0,0,0,0.8); text-align:center; style="text-align:center; margin-bottom:30px;">
                    ${groupTitle}
                </div>
                <ul class="shop-list">`;
            currentGroup = group;
        }

        listHtml += `<li class="shop-item">
            <strong>${it.name}</strong> - ${it.cost}G`;

        if (it.stat) {
            const statName = t(`stat_${it.stat}`) || it.stat.charAt(0).toUpperCase() + it.stat.slice(1);
            let bonusText = `+${it.bonus}% ${statName}`;
            if (it.enhancement > 0) {
                const absoluteSymbol = t('absolute_symbol') || '';
                bonusText += ` +${it.enhancement}${absoluteSymbol}`;
            }
            listHtml += ` <span class="bonus">(${bonusText})</span>`;
        }

        if (it.type === 'potion') {
            const restoreUpper = it.restore.toUpperCase();
            listHtml += ` <span class="bonus">(${restoreUpper} +${it.amount})</span>`;
        }

        const buyText = t('buy_button') || 'Buy';
        const buy10Text = t('buy_10_button') || 'Buy 10';

        listHtml += `
            <button class="buy-btn" onclick="buy(${i},1)">${buyText}</button>
            <button class="buy-btn" onclick="buy(${i},10)">${buy10Text}</button>
        </li>`;
    });

    if (currentGroup !== '') listHtml += '</ul>';

    return listHtml;
}

function renderShopPurchase() {
    const options = [
        {value: 'all', label: 'All Items'},
        {value: 'potions', label: 'Potions'},
        {value: 'One Hand', label: 'One Hand Weapons'},
        {value: 'Both Hands', label: 'Both Hands Weapons'},
        {value: 'Head', label: 'Head'},
        {value: 'Body', label: 'Body'},
        {value: 'Legs', label: 'Legs'},
        {value: 'Feet', label: 'Feet'},
        {value: 'Gloves', label: 'Gloves'},
        {value: 'Cape', label: 'Cape'},
        {value: 'Accessory', label: 'Accessories'}
    ];

    let selectHtml = `
        <div style="text-align:center; margin-bottom:30px; background: transparent;">
            <select id="shopFilterSelect" onchange="currentShopFilter = this.value; document.getElementById('shopListContainer').innerHTML = getShopListHtml();"
                    style="padding:12px 20px; font-size:1.2em; background:#222; color:#ffd700; border:2px solid #666; border-radius:8px; cursor:pointer;">
    `;

    options.forEach(opt => {
        const selected = (currentShopFilter === opt.value) ? 'selected' : '';
        selectHtml += `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
    });

    selectHtml += `</select></div>`;

    const html = selectHtml + `<div id="shopListContainer" style="background: transparent;">${getShopListHtml()}</div>`;

    return html;
}
function renderDailyMaterials() {
    if (gameState.dailyMaterials && gameState.dailyMaterials.length > 0) {
        let html = `<ul class="shop-list">`;
        gameState.dailyMaterials.forEach((mat, i) => {
            html += `<li class="shop-item">`;
            html += `<strong>${mat.name}</strong> - ${mat.price}G`;
            html += ` <button class="buy-btn" onclick="buyMaterial(${i})">${t('buy_button')}</button>`;
            html += `</li>`;
        });
        html += '</ul>';
        return html;
    }
    return `<p class="empty-msg">${t('daily_materials_empty')}</p>`;
}

function renderGuildExpansion() {
    const currentSlots = gameState.maxPermanentSlots || 4;
    if (currentSlots < 12) {
        const nextSlots = currentSlots + 1;
        const level = nextSlots - 4;
        const cost = 500 + 250 * (level - 1);
        return `<div class="expansion-section">
            <p>${t('guild_slots_current')} <strong>${currentSlots}</strong></p>
            <p>${t('guild_slots_next', {next: nextSlots, cost: cost})}</p>
            <button class="buy-btn large" onclick="buyExpansion()">${t('guild_expansion_button')}</button>
        </div>`;
    }
    return `<p class="empty-msg">${t('guild_max_expanded')}</p>`;
}

function renderCorruption() {
    return `<div class="corruption-section">
        <p>${t('corrupt_description')}</p>
        <button class="buy-btn warn" onclick="corrupt()">${t('corrupt_button')}</button>
    </div>`;
}

function renderSellItems() {
    let html = '';
    const allItems = [];

    // sellables から有効なアイテムのみ追加（qty > 0 または qty 未定義のユニークアイテム）
    if (gameState.sellables) {
        gameState.sellables.forEach(item => {
            const qty = item.qty !== undefined ? item.qty : 1;
            if (qty > 0) {
                allItems.push({...item});  // source/index 不要に変更
            }
        });
    }

    // inventory から有効なアイテムのみ追加
    gameState.inventory.forEach(item => {
        const qty = item.qty !== undefined ? item.qty : 1;
        if (qty > 0) {
            allItems.push({...item});
        }
    });

    if (allItems.length === 0) {
        return `<p class="empty-msg">${t('sell_no_items')}</p>`;
    }

    // 名前でグループ化（同じ名前のアイテムをまとめる）
    const grouped = {};
    allItems.forEach(copiedItem => {
        const key = copiedItem.name;
        if (!grouped[key]) {
            // 初回アイテムから共通プロパティをコピー（同じ名前のアイテムはプロパティが同一と仮定）
            grouped[key] = {
                name: key,
                stat: copiedItem.stat,
                type: copiedItem.type,
                bonus: copiedItem.bonus,
                amount: copiedItem.amount,
                restore: copiedItem.restore,
                buff: copiedItem.buff,
                minPrice: copiedItem.minPrice,
                maxPrice: copiedItem.maxPrice,
                items: []
            };
        }
        grouped[key].items.push(copiedItem);
    });

    html += '<ul class="shop-list sell-list">';
    Object.values(grouped).forEach(group => {
        // 合計数量を正確に計算
        let count = 0;
        group.items.forEach(copiedItem => {
            if (copiedItem.type === 'material' || copiedItem.type === 'potion' || copiedItem.type === 'consumable') {
                // スタック可能アイテム（素材・ポーション・消費バフ）→ qty 未定義なら 0 扱い（幻の1防止）
                count += (copiedItem.qty ?? 0);
            } else {
                // ユニーク装備など → qty 未定義なら 1
                count += (copiedItem.qty ?? 1);
            }
        });

        // 数量が 0 なら表示しない（これで在庫0の香料などが幻で表示されるバグ修正）
        if (count <= 0) return;

        const randMinMax = getDailyRandomFraction(group.name);
        const randVariance = getDailyRandomFraction(group.name + 'var');

        let basePrice = 0;
        if (group.stat) basePrice = Math.floor((shopItems.find(s => s.name === group.name)?.cost || 100) * 0.7);
        else if (group.type === 'potion') basePrice = Math.floor((shopItems.find(s => s.name === group.name)?.cost || 30) * 0.5);
        else if (group.type === 'consumable') basePrice = Math.floor((group.buff?.bonus || 100) * 5);
        else if (group.minPrice !== undefined && group.maxPrice !== undefined) {
            basePrice = Math.floor(group.minPrice + randMinMax * (group.maxPrice - group.minPrice + 1));
        } else {
            basePrice = 5;
        }

        const variance = Math.floor(basePrice * 0.4);
        const singlePrice = Math.max(5, basePrice + Math.floor(randVariance * (variance * 2 + 1) - variance));
        const totalPrice = singlePrice * count;

        html += `<li class="shop-item">`;
        html += `<strong>${group.name}</strong>`;

        // 装備ボーナス表示
        if (group.stat) {
            const statText = t(`stat_${group.stat}`);
            html += ` <span class="bonus">(${t('sell_equip_bonus', {bonus: group.bonus, stat: statText})})</span>`;
        }

        // ポーション効果表示
        if (group.type === 'potion') {
            const restoreText = t(`potion_${group.restore}`);
            html += ` <span class="bonus">(${restoreText} +${group.amount})</span>`;
        }

        // 価格・数量表示
        html += ` <em>${t('sell_quantity', {count})}</em> - ${t('sell_price_each', {price: singlePrice, unit: t('gold_unit')})} (${t('sell_price_total', {total: totalPrice, unit: t('gold_unit')})})`;

        // 売却ボタン
        if (count === 1) {
            html += ` <button class="sell-btn" onclick="sellStackedItem('${group.name}', 1)">${t('sell_button')}</button>`;
        } else {
            html += ` <button class="sell-btn" onclick="sellStackedItem('${group.name}', 1)">${t('sell_one_button')}</button>`;
            html += ` <button class="sell-btn all" onclick="sellStackedItem('${group.name}', ${count})">${t('sell_all_button')}</button>`;
        }
        html += `</li>`;
    });
    html += '</ul>';
    return html;
}

// Updated renderCurrentShopPage() and navigation functions
// Updated renderCurrentShopPage() and navigation functions
function renderCurrentShopPage() {
    const section = shopSections[currentShopPage];
    
    // Use translated title from key
    let html = `<h2 class="shop-title">${t(section.key)}</h2>`;
    
    // Shop navigation with translatable buttons and page counter
    html += `<div class="char-nav shop-nav">`;
    html += `<button onclick="prevShopPage()">${t('shop_prev')}</button>`;
    html += `<span class="page-counter">${t('shop_page_counter', { 
        current: currentShopPage + 1, 
        total: shopSections.length 
    })}</span>`;
    html += `<button onclick="nextShopPage()">${t('shop_next')}</button>`;
    html += `</div>`;
    
    // Render the current section content
    html += section.render();  // Each render function returns a string
    
    // Directly update the DOM
    const contentElement = document.getElementById('shopContent');
    if (contentElement) {
        contentElement.innerHTML = html;
    }
    
    // Return html for flexibility
    return html;
}

function prevShopPage() {
    currentShopPage = (currentShopPage - 1 + shopSections.length) % shopSections.length;
    renderCurrentShopPage();
}

function nextShopPage() {
    currentShopPage = (currentShopPage + 1) % shopSections.length;
    renderCurrentShopPage();
}
function toggleShop() {
    const modal = document.getElementById('shopModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        currentShopPage = 0;
        renderCurrentShopPage();
        modal.style.display = 'block';
    }
}

function sellStackedItem(name, amount) {
    let remaining = amount;
    let totalGold = 0;

    // サンプルアイテムを探す
    const sampleItem = gameState.inventory.find(i => i.name === name) ||
                       (gameState.sellables ? gameState.sellables.find(i => i.name === name) : null);

    if (!sampleItem) {
        better_alert('売却するアイテムが見つかりません。',"error");
        return;
    }

    // 日付固定の擬似乱数を取得（表示価格と完全に一致させるため）
    const randMinMax   = getDailyRandomFraction(name);           // minPrice/maxPrice 用
    const randVariance = getDailyRandomFraction(name + 'var');   // 変動幅用

    let basePrice = 0;
    if (sampleItem.stat) {  // 装備品
        basePrice = Math.floor((shopItems.find(s => s.name === name)?.cost || 100) * 0.7);
    } else if (sampleItem.type === 'potion') {  // ポーション（固定価格）
        basePrice = Math.floor((shopItems.find(s => s.name === name)?.cost || 30) * 0.5);
    } else if (sampleItem.type === 'consumable') {
        basePrice = Math.floor((sampleItem.buff?.bonus || 100) * 5);
    } else if (sampleItem.minPrice !== undefined && sampleItem.maxPrice !== undefined) {
        // 日固定乱数で価格決定（ショップ表示と一致）
        basePrice = Math.floor(sampleItem.minPrice + randMinMax * (sampleItem.maxPrice - sampleItem.minPrice + 1));
    } else {
       
        basePrice = 5;
    }

    const variance = Math.floor(basePrice * 0.4);
    // 日固定乱数で変動幅を決定（ショップ表示と一致）
    const singlePrice = Math.max(5, basePrice + Math.floor(randVariance * (variance * 2 + 1) - variance));

    // inventoryから売却
    for (let i = gameState.inventory.length - 1; i >= 0 && remaining > 0; i--) {
        const item = gameState.inventory[i];
        if (item.name === name) {
            const available = item.qty || 1;
            const sellNow = Math.min(remaining, available);

            if (item.qty) {  // スタックアイテム（ポーション・素材など）
                item.qty -= sellNow;
                if (item.qty <= 0) {
                    gameState.inventory.splice(i, 1);
                }
            } else {  // 個別アイテム（装備品など）
                gameState.inventory.splice(i, 1);
            }

            remaining -= sellNow;
            totalGold += singlePrice * sellNow;
        }
    }

    // sellablesからも売却（必要に応じて）
    if (gameState.sellables && remaining > 0) {
        for (let i = gameState.sellables.length - 1; i >= 0 && remaining > 0; i--) {
            const item = gameState.sellables[i];
            if (item.name === name) {
                gameState.sellables.splice(i, 1);
                remaining--;
                totalGold += singlePrice;
            }
        }
    }

    if (remaining > 0) {
        better_alert('在庫が不足しています。',"error");
        return;
    }

    gameState.gold += totalGold;
    better_alert(`${name} を ${amount}個 売却しました！ +${totalGold}G`,"success");

    // ショップモーダルを更新（価格が日固定なので再計算しても同じ値になる）
    document.getElementById('shopContent').innerHTML = renderCurrentShopPage();

    // 他の表示も更新
    updateDisplays();
}

// この関数をコードのどこかに追加してください（他の関数の外、グローバルスコープに）
function getDailyRandomFraction(str) {
    let hash = gameState.day * 7919;  // 日付をシードに
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) & 0xFFFFFFFF;
    }
    // 0.0 ~ 1.0 の範囲の擬似乱数（同じ日・同じ文字列なら常に同じ値）
    return ((hash >>> 0) % 1000000) / 1000000;
}

function getRecruitsHtml(){
    const numPerms = gameState.adventurers.filter(a => !a.temp).length;
    const full = numPerms >= gameState.maxPermanentSlots;
    if(!gameState.recruitPending.length) return '';
    let html='';
    gameState.recruitPending.forEach((adv,i)=>{
        const baseStr = adv.strength;
        const baseWis = adv.wisdom;
        const baseDex = adv.dexterity;
        const baseLuk = adv.luck;
        const effStr = getEffectiveStat(adv, 'strength');
        const effWis = getEffectiveStat(adv, 'wisdom');
        const effDex = getEffectiveStat(adv, 'dexterity');
        const effLuk = getEffectiveStat(adv, 'luck');
        const equipStr = effStr - baseStr;
        const equipWis = effWis - baseWis;
        const equipDex = effDex - baseDex;
        const equipLuk = effLuk - baseLuk;
        const stats=`Lv ${adv.level} | <img src="Images/STR.png" class="stat-icon" title="筋力"> STR ${effStr} (${baseStr}+${equipStr}) <img src="Images/WIS.png" class="stat-icon" title="知恵"> WIS ${effWis} (${baseWis}+${equipWis}) <img src="Images/DEX.png" class="stat-icon" title="敏捷"> DEX ${effDex} (${baseDex}+${equipDex}) <img src="Images/LUC.png" class="stat-icon" title="運"> LUC ${effLuk} (${baseLuk}+${equipLuk})`;
        const expNeeded = adv.level * 100;
        const expPct = Math.min(100, (adv.exp / expNeeded) * 100);
        const img=`<img src="Images/${adv.image}" class="adventurer-img" alt="${adv.name}">`;
        const nameHtml = getNameHtml(adv);
        const btnHtml = full ? '<button disabled>ギルド満杯</button>' : `<button onclick="recruit(${i})">募集する</button>`;
        html+=`<div class="adventurer-card" draggable="true" data-adv-id="${adv.id}">
            ${img}${nameHtml}<br><small class="stats">${stats}</small><br>
            <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div> 経験値 ${adv.exp}/${expNeeded}<br>
            Cost: ${adv.recruitingCost}G ${btnHtml}
        </div>`;
    });
    return html;
}

function getAvailableHtml(){
    const avail=gameState.adventurers.filter(a=>!a.busy);
    let html='';
    avail.forEach(adv=>{
        const baseStr = adv.strength;
        const baseWis = adv.wisdom;
        const baseDex = adv.dexterity;
        const baseLuk = adv.luck;
        const effStr = getEffectiveStat(adv, 'strength');
        const effWis = getEffectiveStat(adv, 'wisdom');
        const effDex = getEffectiveStat(adv, 'dexterity');
        const effLuk = getEffectiveStat(adv, 'luck');
        const equipStr = effStr - baseStr;
        const equipWis = effWis - baseWis;
        const equipDex = effDex - baseDex;
        const equipLuk = effLuk - baseLuk;

        const stats=`Lv ${adv.level} | 
                     <img src="Images/STR.png" class="stat-icon" title="筋力"> STR ${effStr} (${baseStr}+${equipStr}) 
                     <img src="Images/WIS.png" class="stat-icon" title="知恵"> WIS ${effWis} (${baseWis}+${equipWis}) 
                     <img src="Images/DEX.png" class="stat-icon" title="敏捷"> DEX ${effDex} (${baseDex}+${equipDex}) 
                     <img src="Images/LUC.png" class="stat-icon" title="運"> LUC ${effLuk} (${baseLuk}+${equipLuk})`;

        const expNeeded = adv.level * 100;
        const expPct = Math.min(100, (adv.exp / expNeeded) * 100);
        const hpPct = adv && typeof adv.hp === 'number' && typeof adv.maxHp === 'number' && adv.maxHp > 0 ? Math.max(0, Math.min(100, (adv.hp / adv.maxHp) * 100)) : 0;
        const mpPct = adv && typeof adv.mp === 'number' && typeof adv.maxMp === 'number' && adv.maxMp > 0 ? Math.max(0, Math.min(100, (adv.mp / adv.maxMp) * 100)) : 0;
        const hpDisplay = Number(adv.hp) || 0;
        const maxHpDisplay = Number(adv.maxHp) || 0;
        const mpDisplay = Number(adv.mp) || 0;
        const maxMpDisplay = Number(adv.maxMp) || 0;
        const img=`<img src="Images/${adv.image}" class="adventurer-img" alt="${adv.name}">`;
        const nameHtml = getNameHtml(adv);

        // === 下部の表示：tempなら雇用コスト、permanentならランクを直接表示 ===
        const bottomDisplay = adv.temp 
            ? t('hiring_cost_display', {cost: adv.hiringCost || 0})
            : (adv.rank 
                ? t('guild_rank_display', {rank: adv.rank})  // 例: "Rank F+" または "F+ランク"
                : t('permanent_member'));  // rankがないpermanentはフォールバックで従来の表示

        html+=`<div class="adventurer-card" draggable="true" data-adv-id="${adv.id}">
            ${img}${nameHtml}<br>
            <small class="stats">${stats}</small><br>
            <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div> 経験値 ${adv.exp}/${expNeeded}<br>
            <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div> HP ${hpDisplay}/${maxHpDisplay}<br>
            <div class="progress-bar"><div class="progress-fill mp-fill" style="width:${mpPct}%"></div></div> MP ${mpDisplay}/${maxMpDisplay}<br>
            ${bottomDisplay}
            
        </div>`;
    });
    if(!avail.length) html+='<p>'+t('no_available_adventurers')+'</p>';
    return html;
}


function calcTradeRequiredDays(avgDex, avgLuc) {
    const avgStat = (avgDex + avgLuc) / 2;
    return Math.max(1, Math.ceil(80 / avgStat));
}

function updateDay(){
    const current_week = Math.floor((gameState.day - 1) / 7);
    const next_tax_day = (current_week + 1) * 7 + 1;
    const daysUntilTax = next_tax_day - gameState.day;

    const estimatedTax = Math.floor((next_tax_day - 1) * 10);

    const ranks = ['F', 'F+', 'E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+'];
    let estimatedSalary = 0;

    gameState.adventurers.forEach(adv => {
        if (adv.temp) return;

        const index = ranks.indexOf(adv.rank || 'F');
        const salary = 50 + 50 * index * (index + 1) / 2;
        estimatedSalary += salary;
    });

    const estimatedTotal = estimatedTax + estimatedSalary;

    // === 借金情報：超過 or 明日支払いがある場合のみ表示 ===
    let debtDisplay = '';
    if (gameState.loans && gameState.loans.length > 0) {
        let tomorrowInterest = 0;
        let tomorrowPrincipal = 0;
        let hasOverdue = false;
        let overdueCount = 0;

        gameState.loans.forEach(loan => {
            const daysPassed = gameState.day - loan.startDay;

            let daysToNextInterest = 7 - (daysPassed % 7);
            if (daysToNextInterest === 7) daysToNextInterest = 0;

            const daysToFinal = 28 - daysPassed;

            const interest = Math.floor(loan.principal * 0.1);

            if (daysToFinal <= 0) {
                hasOverdue = true;
                overdueCount++;
                return;
            }

            if (daysToNextInterest === 1) {
                tomorrowInterest += interest;
            }

            if (daysToFinal === 1) {
                tomorrowPrincipal += loan.principal + interest; // 満期は本金+最終利息
            }
        });

        let debtText = '';
        let debtColor = '#ffaa66'; // 明日注意オレンジ

        if (hasOverdue) {
            debtText = t('debt_overdue_simple', { count: overdueCount });
            debtColor = '#ff4444';
        } else if (tomorrowInterest > 0 || tomorrowPrincipal > 0) {
            const totalTomorrow = tomorrowInterest + tomorrowPrincipal;
            if (tomorrowPrincipal > 0) {
                debtText = t('debt_tomorrow_final', { amount: totalTomorrow });
            } else {
                debtText = t('debt_tomorrow_interest', { amount: totalTomorrow });
            }
        }

        if (debtText) {
            debtDisplay = `<p style="margin:4px 0 0; font-size:0.95em; color:${debtColor};">
                ${debtText}
            </p>`;
        }
    }

    // === 税・給与支払い情報（7日以内の場合のみ）===
    let paymentDisplay = '';
    if (daysUntilTax <= 7) {
        let paymentText;
        let paymentColor = '#ffd700';

        if (daysUntilTax <= 0) {
            paymentText = t('payment_today_warning', { total: estimatedTotal, tax: estimatedTax, salary: estimatedSalary });
            paymentColor = '#ff6666';
        }  else {
            paymentText = t('payment_in_days', { days: daysUntilTax, total: estimatedTotal, tax: estimatedTax, salary: estimatedSalary });
        }

        paymentDisplay = `<p style="margin:4px 0 0; font-size:0.95em; color:${paymentColor};">
            ${paymentText}
        </p>`;
    }

    let status = '';
    if (gameState.gameOver) {
        status = ` | <span style="color:red; font-weight:bold;">${t('game_over_text')}</span>`;
    }

    const dayPart = t('day_format', {day: gameState.day});
    const goldPart = `${t('gold_label')} ${Math.floor(gameState.gold)}`;
    const repPart = `${t('reputation_label')} ${Math.max(0, gameState.reputation.toFixed(0))}`;

    document.getElementById('day').innerHTML = 
        `<div style="text-align:center; background: transparent">
            <h2 style="margin:0;">${dayPart} | ${goldPart} | ${repPart}${status}</h2>
            ${paymentDisplay}
            ${debtDisplay}
        </div>`;
}
function updateDisplays(){
    updateDay();
    document.getElementById('recruits').innerHTML=getRecruitsHtml();
    document.getElementById('availableAdvs').innerHTML=getAvailableHtml();
    renderQuests();
    const shopModal = document.getElementById('shopModal');
    if(shopModal && shopModal.style.display === 'flex'){
        document.getElementById('shopContent').innerHTML = renderCurrentShopPage();
    }
    const npcsModal = document.getElementById('npcsModal');
    if (npcsModal && npcsModal.style.display === 'flex') {
        document.getElementById('npcsContent').innerHTML = getNPCsContent();
    }

    const guildQuestsModal = document.getElementById('guildQuestsModal');
    if (guildQuestsModal && guildQuestsModal.style.display === 'flex') {
        showMainSelection();
    }
}

function startDay(){
    gameState.dailyRejectedPairs = new Set();
    if (gameState.gameOver) {
        updateDisplays();
        return;
    }
    cleanupAdventurers();

    // バフの持続日数を減少（毎日実行）
    gameState.adventurers.forEach(a => {
        if (a.buffs && a.buffs.length > 0) {
            a.buffs.forEach(b => {
                if (b.daysLeft > 0) {
                    b.daysLeft--;
                }
            });
            a.buffs = a.buffs.filter(b => b.daysLeft > 0);
        }
    });

    gameState.dailyMaterials = [];
    const numMaterialsToday = Math.floor(Math.random() * 3);
    const shuffled = [...materialShop].sort(() => 0.5 - Math.random());
    for (let i = 0; i < numMaterialsToday; i++) {
        const mat = shuffled[i];
        const price = Math.floor(mat.basePrice * (2 + Math.random() * mat.variance));
        gameState.dailyMaterials.push({name: mat.name, price: price});
    }
    cities.forEach(c => {
        if (c.guild) return;
        gameState.dailyPrices[c.name] = gameState.dailyPrices[c.name] || {};
        c.items.forEach(it => {
            gameState.dailyPrices[c.name][it.name] = Math.floor(it.minPrice + Math.random() * (it.maxPrice - it.minPrice + 1));
        });
    });

    // Quest limit: max 4 non-training quests
    let nonTrainingCount = gameState.quests.filter(q => !q.training).length;
    let availableSlots = 4 - nonTrainingCount;

    // On day 1, guarantee at least 1 non-training quest if none exist yet
    let generateProb = 0.8;
    if (gameState.day === 1 && nonTrainingCount === 0) {
        generateProb = 1.0; // 100% chance → always add the first one on day 1
    }

    if (availableSlots > 0 && Math.random() < generateProb) {
        let q = generateQuest(); 
        gameState.quests.push(q);
    }

    if (gameState.day > 30 && Math.random() < 0.07 && !gameState.quests.some(q => q.defense)) {
        const dq = generateDefenseQuest();
        gameState.quests.push(dq);
    }

    let nt;
    if (gameState.reputation < 0) {
        nt = 0;
    } else {
        const repFactor = Math.max(0, gameState.reputation / 50);
        const maxNt = Math.min(5, 2 + Math.floor(repFactor));
        nt = Math.floor(Math.random() * maxNt) + 1;
    }
    for(let i=0;i<nt;i++){
        let a=generateTempAdventurer(); a.generatedDay=gameState.day; gameState.adventurers.push(a);
    }
    updateDisplays();
    ensureTrainingQuest();
}

function isPartyWiped(q) {
    if (!q || !q.assigned || q.assigned.length === 0) return false;
    return q.assigned.every(id => {
        const adv = findAdv(id);
        return !adv || adv.hp <= 0;
    });
}

function playTutorialDialogue(){
    // Use the language-specific tutorial dialogue at runtime
    const currentTutorial = tutorialDialogues[currentLang] || tutorialDialogues.ja;
    queueQuestCompletionDialogue(currentTutorial);
}


let currentQuestParticipants = [];
function processQuestOutcome(q, eventDay, success, lowStatusFail, goldOverride = null) {
    const isSmallScreen = window.innerWidth < 1200;

    if (q.type === 8 || q.type === 'trade') {
        if (q.tradeRemainingDays > 0) {
            const repLoss = 15 + Math.floor(q.difficulty * 0.3);
            gameState.reputation -= repLoss;

            q.assigned.forEach(id => {
                const adv = findAdv(id);
                if (adv) adv.busy = false;
            });

            const failTitle = t("quest_trade_failure_title");
            const failDesc = `${q.desc}<br><br>${t("quest_trade_failure_desc1")}<br>${t("quest_trade_failure_desc2")}<br>${t("quest_trade_failure_desc3")}`;

            const failMessageHTML = `
            <div class="quest-scroll quest-scroll-fail">
                <div class="scroll-content">
                    <br><br>
                    <div style="text-align: center;">
                        <div style="font-size: 20px; color: darkred; margin-bottom: 40px;">${failTitle}</div>
                        <div style="font-size: 15px; color: darkred;">
                            ${t("reputation_loss", {repLoss})}
                        </div>
                        <div style="font-size: 12px; margin: 40px 0; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%;">
                            ${failDesc}
                        </div>
                    </div>
                </div>
            </div>`;

            const failTextPlain = `${failTitle}\n${t("reputation_loss", {repLoss})}\n\n${q.desc}\n\n${t("quest_trade_failure_desc1")}\n${t("quest_trade_failure_desc2")}\n${t("quest_trade_failure_desc3")}`;

            if (isSmallScreen) {
                better_alert(failTextPlain, "failure");
                const historyMsg = failTextPlain.replace(/\n/g, '<br>');
                gameState.eventHistory.unshift({day: eventDay, message: `<div style="padding:20px; text-align:center; color:#fff;">${historyMsg}</div>`});
            } else {
                gameState.eventHistory.unshift({day: eventDay, message: failMessageHTML});
            }
            return;
        }

        // === SUCCESS + BANDIT ENCOUNTER LOGIC ===
        let survivingAdvs = [];
        const expGain = q.difficulty * 20;
        q.assigned.forEach(id => {
            const adv = findAdv(id);
            if (adv) {
                adv.exp += expGain;
                levelUp(adv);
                adv.busy = false;
                survivingAdvs.push(adv);
            }
        });
        currentQuestAdventurers = survivingAdvs;
        let repGain = q.difficulty * 0.5;
        gameState.reputation += repGain;

        // === Bandit/Thief Encounter ===
        let encounterMsg = '';
        let extraRepLoss = 0;

        const totalValue = q.reward + (q.buyCost || 0);
        const teamLuk = q.assigned.reduce((sum, id) => sum + getEffectiveStat(findAdv(id), 'luck'), 0);
        const teamDex = q.assigned.reduce((sum, id) => sum + getEffectiveStat(findAdv(id), 'dexterity'), 0);

        let lossPercent = 0;

        if (q.assigned.length === 0) {
            lossPercent = 0.8;
            extraRepLoss = 10;
            gameState.reputation -= extraRepLoss;

            q.reward = Math.floor(q.reward * (1 - lossPercent));
            if (q.buy) {
                Object.keys(q.buy).forEach(r => {
                    q.buy[r] = Math.floor(q.buy[r] * (1 - lossPercent));
                });
            }

            encounterMsg = t("trade_no_guard_bandit");
        } else {
            let baseChance = 0.1 + (totalValue / 30000);
            baseChance = Math.min(0.7, baseChance);
            const baseChancePercent = Math.round(baseChance * 100);

            const lukReductionPercent = Math.round(teamLuk * 0.01);
            const encounterChancePercent = Math.max(0, baseChancePercent - lukReductionPercent);

            if (Math.random() * 100 < encounterChancePercent) {
                const baseLoss = 0.3 + Math.random() * 0.5;
                const dexReductionPercent = Math.round(teamDex * 0.01);
                lossPercent = Math.max(0, baseLoss - (dexReductionPercent / 100));

                const lostGold = Math.floor(q.reward * lossPercent);
                q.reward -= lostGold;

                let lostItemsDetails = [];
                if (q.buy) {
                    Object.keys(q.buy).forEach(r => {
                        if (q.buy[r] > 0) {
                            const lostQty = Math.floor(q.buy[r] * lossPercent);
                            q.buy[r] -= lostQty;
                            if (lostQty > 0) lostItemsDetails.push(`${r} ×${lostQty}`);
                        }
                    });
                }

                encounterMsg = t("trade_bandit_attack") + "\n" +
                               t("trade_bandit_lost_gold", {lostGold}) + "\n";
                if (lostItemsDetails.length > 0) {
                    encounterMsg += t("trade_bandit_lost_items", {items: lostItemsDetails.join(', ')}) + "\n";
                }
                encounterMsg += t("trade_bandit_loss_rate", {rate: Math.round(lossPercent * 100)});
            }
        }

        if (encounterMsg !== "") {
            better_alert(encounterMsg, "failure");
        }

        // Add bought items (possibly reduced)
        if (q.buy) {
            // リソースの内部キー（言語非依存）
            const resourceKeys = ['iron_ore', 'medicinal_herb', 'spice', 'gem'];

            resourceKeys.forEach(key => {
                // 現在の言語での表示名（エラー表示用やキーマッチ用）
                const currentName = translations[currentLang][`resource_${key}`] || key;

                // q.buy のキーは投稿時の言語での名前なので、現在の言語名でqtyを取得
                const qty = q.buy[currentName] || 0;
                if (qty === 0) return;

                // 言語変更後もマッチさせるため、全言語の可能名称を集める
                const possibleNames = [];
                Object.keys(translations).forEach(lang => {
                    const name = translations[lang][`resource_${key}`];
                    if (name) possibleNames.push(name);
                });

                // インベントリからマッチするアイテムを探す
                let item = gameState.inventory.find(i => 
                    possibleNames.includes(i.name) && i.type === 'material'
                );

                if (!item) {
                    // 存在しない場合は現在の言語名で新規作成
                    item = { name: currentName, qty: 0, type: 'material' };
                    gameState.inventory.push(item);
                }

                item.qty += qty;

                // 古い言語名のアイテムが残っていたら統合（安全策）
                const oldItems = gameState.inventory.filter(i => 
                    i !== item && possibleNames.includes(i.name) && i.type === 'material'
                );
                oldItems.forEach(old => {
                    item.qty += old.qty;
                    gameState.inventory = gameState.inventory.filter(it => it !== old);
                });
            });
        }

        gameState.gold += q.reward;

        // 購入素材テキスト
        let boughtText = '';
        if (q.buy) {
            const boughtItems = Object.keys(q.buy).filter(r => (q.buy[r] || 0) > 0);
            if (boughtItems.length > 0) {
                boughtText = boughtItems.map(r => `${r} ×${q.buy[r]}`).join(', ');
            }
        }

        const daysText = t("days_taken", {days: q.totalDaysRecorded || t("multiple_days")});

        // 大画面用HTML
        let additionalItemHTML = '';
        if (boughtText) {
            additionalItemHTML = `<div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">
                                    ${t("trade_purchased_materials", {materials: boughtText})}
                                  </div>`;
        }

        let leftHTML = `
            <div style="text-align: center;">
                <div style="font-size: 15px; margin-bottom: 40px;">
                    ${t("reputation_gain", {repGain})}
                </div>
                <div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">
                    ${t("trade_gold_reward", {reward: q.reward})}
                </div>
                ${additionalItemHTML}
            </div>`;

        let rightHTML = survivingAdvs.length > 0 ? `
            <div style="text-align: center;">
                <div style="font-size: 12px; margin-bottom: 0px; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">${q.desc}</div>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0px;">
                    ${survivingAdvs.map(adv => `
                    <div style="text-align: center;">
                        <img class="adventurer-img" src="Images/${adv.image}" alt="${adv.name}">
                        <div style="margin-top: 0px; font-size: 15px;">${adv.name}</div>
                        <div style="font-size: 15px; font-weight: bold; color: #2e5c2e;">+${expGain} ${t("exp_short")}</div>
                    </div>
                    `).join('')}
                </div>
                <div style="font-size: 12px; font-weight: bold; margin: 0px 0; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">
                    ${daysText}
                </div>
            </div>` : `
            <div style="font-size: 50px; color: darkred;">${t("no_one_returned")}</div>`;

        const messageHTML = `
        <div class="quest-scroll quest-scroll-success">
            <div class="scroll-content">
                <br><br>
                <div style="display: flex; justify-content: center; align-items: flex-start; gap: 0px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;">
                    ${rightHTML}
                    ${leftHTML}
                </div>
            </div>
        </div>`;

        // 小画面用プレーンテキスト
        const survivorsPlain = survivingAdvs.length > 0
            ? survivingAdvs.map(adv => `${adv.name} (+${expGain} ${t("exp_short")})`).join('\n')
            : t("no_one_returned");

        const tradeSuccessPlain = `${t("quest_trade_success_title")}\n\n${q.desc}\n\n${t("reputation_gain", {repGain})}\n${t("trade_gold_reward", {reward: q.reward})}\n${boughtText ? t("trade_purchased_materials", {materials: boughtText}) : ''}\n\n${survivorsPlain}\n\n${daysText}`;

        if (isSmallScreen) {
            better_alert(tradeSuccessPlain, "success");

            let historyMsg = `<strong>${t("quest_trade_success_title")}</strong><br><br>`
                + `${q.desc.replace(/\n/g, '<br>')}<br><br>`
                + `${t("reputation_gain", {repGain})}<br>`
                + `${t("trade_gold_reward", {reward: q.reward})}<br>`
                + (boughtText ? `${t("trade_purchased_materials", {materials: boughtText})}<br>` : '')
                + `<br>`
                + (survivingAdvs.length > 0 
                    ? survivingAdvs.map(adv => `${adv.name} (+${expGain} ${t("exp_short")})<br>`).join('') 
                    : `${t("no_one_returned")}<br>`)
                + `${daysText}`;

            gameState.eventHistory.unshift({day: eventDay, message: `<div style="padding:20px; text-align:left; color:#000000;">${historyMsg}</div>`});
        } else {
            gameState.eventHistory.unshift({day: eventDay, message: messageHTML});
        }

        return;
    }

    // === 通常クエスト（非貿易）===
    if (q.training) {
        if (q.assigned.length === 0) return;
        let assignedAdvs = q.assigned.map(id => findAdv(id)).filter(a => a);
        if (assignedAdvs.length === 0) { q.assigned = []; return; }
        let levels = assignedAdvs.map(a => a.level || 1);
        let maxLv = Math.max(...levels);
        let expGains = {};
        let lowLevelBonus = false;
        assignedAdvs.forEach(adv => {
            let expGain = 0;
            if (assignedAdvs.length > 1 && adv.level < maxLv) {
                expGain = maxLv * 20;
                lowLevelBonus = true;
            }
            expGains[adv.id] = expGain;
            adv.exp += expGain;
            levelUp(adv);
            adv.busy = true;
        });

        let trainingMessage = `${assignedAdvs.map(adv => `${adv.name}(+${expGains[adv.id]}${t("exp_short")}) `).join('')}`;
        better_alert(trainingMessage, "training");
        return;
    }

    let teamRolled = {strength: 0, wisdom: 0, dexterity: 0, luck: 0};
    let survivingAdvs = [];
    let permanentCount = 0;
    const difficulty = q.difficulty;
    const damageMultiplier = success ? 1 : (lowStatusFail ? 1.5 : 2);

    for (let i = 0; i < q.assigned.length; i++) {
        const adventurerId = q.assigned[i];
        const adventurer = findAdv(adventurerId);
        if (!adventurer) {
            q.assigned.splice(i, 1);
            i--;
            continue;
        }

        const rolls = {
            strength: rollStat(adventurer, 'strength'),
            wisdom: rollStat(adventurer, 'wisdom'),
            dexterity: rollStat(adventurer, 'dexterity'),
            luck: rollStat(adventurer, 'luck')
        };
        teamRolled.strength += rolls.strength;
        teamRolled.wisdom += rolls.wisdom;
        teamRolled.dexterity += rolls.dexterity;
        teamRolled.luck += rolls.luck;

        if (success) {
            adventurer.exp += (q.type === 7) ? q.floor * 500 : q.difficulty * 20;
            levelUp(adventurer);
        }

        const levelDiff = Math.max(0, q.difficulty - adventurer.level);
        const extraDamageFactor = 1 + levelDiff * 0.1;
        const hpDamage = difficulty * 5 * damageMultiplier * extraDamageFactor;
        const mpDamage = difficulty * 3 * damageMultiplier * extraDamageFactor;
        const effectiveHpDamage = Math.floor(hpDamage);
        const effectiveMpDamage = Math.floor(mpDamage);

        adventurer.hp = Math.max(0, (adventurer.hp || 0) - effectiveHpDamage);
        adventurer.mp = Math.max(0, (adventurer.mp || 0) - effectiveMpDamage);
        adventurer.busy = false;

        if (adventurer.hp <= 0) {
            const isPerm = !adventurer.temp;
            if (isPerm) {
                gameState.reputation = Math.max(-100, gameState.reputation - 10);
            }
            const deathMsg = t("adventurer_death", {
                name: adventurer.name,
                quest: q.desc,
                repPenalty: isPerm ? ` ${t("reputation_loss", {repLoss: 10})}` : ""
            });
            better_alert(deathMsg, "death");

            const mainIdx = gameState.adventurers.findIndex(a => a.id === adventurerId);
            if (mainIdx > -1) gameState.adventurers.splice(mainIdx, 1);
            const pendingIdx = gameState.recruitPending.findIndex(a => a.id === adventurerId);
            if (pendingIdx > -1) gameState.recruitPending.splice(pendingIdx, 1);
            q.assigned.splice(i, 1);
            i--;
            continue;
        }

        survivingAdvs.push(adventurer);
        if (!adventurer.temp) {
            const gold_to_adventurer = 0.2 * q.reward;
            adventurer.bag.gold += gold_to_adventurer;
            permanentCount++;
        }

        if (adventurer.temp && success) {
            const recruitCopy = JSON.parse(JSON.stringify(adventurer));
            recruitCopy.recruitingCost = adventurer.recruitingCost;
            recruitCopy.generatedDay = eventDay + 1;
            recruitCopy.buffs = [];
            gameState.recruitPending.push(recruitCopy);
            const mainIdx = gameState.adventurers.findIndex(a => a.id === adventurerId);
            if (mainIdx > -1) gameState.adventurers.splice(mainIdx, 1);
        }
    }

    let extraMsg = '';
    let additionalItemHTML = '';
    let extraTextPlain = '';

    // Set current quest participants to surviving adventurers (the actual ones that returned)
    currentQuestAdventurers = survivingAdvs;

    if (success) {
        let payout = permanentCount * 0.2 * q.reward;
        let rewardGold = q.reward;
        if (goldOverride !== null) {
            rewardGold = goldOverride;
            payout = permanentCount * 0.2 * goldOverride;
        }
        let netGold = rewardGold - payout;
        gameState.gold += netGold;

        let repGain = q.difficulty * 0.2;
        gameState.reputation += repGain;

        if (q.defense) {
            const rep = Math.floor(gameState.reputation);
            const effectiveRep = Math.max(0, rep);
            let orbQty = 1;
            const extraChance = Math.min(1, effectiveRep / 100);
            for (let i = 0; i < 2; i++) {
                if (Math.random() < extraChance) {
                    orbQty++;
                }
            }
            for (let i = 0; i < orbQty; i++) {
                addToInventory({ name: t("exp_orb_small"), type: 'consumable', effect: 'level_up', amount: 1, id: gameState.nextId++ }, 1);
            }
            extraMsg += `<br>${t("defense_orb_bonus", {qty: orbQty})}`;
            extraTextPlain += `\n${t("defense_orb_bonus", {qty: orbQty})}`;
        }

        if (q.type === 6) {
            const currentProgress = gameState.mainProgress;
            const storyRepBonus = 30 * Math.pow(3, currentProgress);
            gameState.reputation += storyRepBonus;
            repGain += storyRepBonus;
            gameState.mainProgress++;
        } else if (q.type === 7) {
            let treasureGold = q.floor * 300;
            gameState.gold += treasureGold;
            extraMsg += `<br>${t("dungeon_treasure_gold", {floor: q.floor, gold: treasureGold})}`;
            extraTextPlain += `\n${t("dungeon_treasure_gold", {floor: q.floor, gold: treasureGold})}`;

            let roll = Math.random();
            if (roll < 0.9) {
                let crystalQty = 2 + Math.floor(q.floor / 2);
                let crystalName = t("enhancement_crystal");
                addToInventory({name: crystalName, id: gameState.nextId++, consumable: true}, crystalQty);
                const crystalMsg = crystalQty > 1 ? t("item_found_qty", {name: crystalName, qty: crystalQty}) : t("item_found", {name: crystalName});
                extraMsg += `<br>${crystalMsg}`;
                extraTextPlain += `\n${crystalMsg}`;
            } else {
                let rareStat = ['strength','wisdom','dexterity','luck'][Math.floor(Math.random()*4)];
                let rareStatFull = t(`stat_${rareStat}`);
                let rareBonus = 5 + q.floor * 5;
                let rareItemName = t("dungeon_ring", {floor: q.floor, stat: rareStatFull});
                addToInventory({name: rareItemName, stat: rareStat, bonus: rareBonus, enhancement: rareBonus, category: "Accessory", id: gameState.nextId++}, 1);
                extraMsg += `<br>${t("item_found", {name: rareItemName})}${t("rare_indicator")}`;
                extraTextPlain += `\n${t("item_found", {name: rareItemName})}${t("rare_indicator")}`;
            }

            if (q.floor === 1) {
                let cursedRoll = Math.random();
                if (cursedRoll < 0.6) {
                    const cursedItemName = t("cursed_mana_fragment");
                    addToInventory({name: cursedItemName, id: gameState.nextId++}, 1);
                    extraMsg += `<br>${t("item_found", {name: cursedItemName})} ${t("collection_item")}`;
                    extraTextPlain += `\n${t("item_found", {name: cursedItemName})} ${t("collection_item")}`;
                }
            }
            if (q.floor === 2) {
                let Roll = Math.random();
                if (Roll < 0.4) {
                    const floor2Item1 = t("cursed_goblin_guard");
                    addToInventory({name: floor2Item1, id: gameState.nextId++}, 1);
                    extraMsg += `<br>${t("item_found", {name: floor2Item1})} ${t("collection_item")}`;
                    extraTextPlain += `\n${t("item_found", {name: floor2Item1})} ${t("collection_item")}`;
                }
                Roll = Math.random();
                if (Roll < 0.4) {
                    const floor2Item2 = t("carnivorous_flower_tooth");
                    addToInventory({name: floor2Item2, id: gameState.nextId++}, 1);
                    extraMsg += `<br>${t("item_found", {name: floor2Item2})} ${t("collection_item")}`;
                    extraTextPlain += `\n${t("item_found", {name: floor2Item2})} ${t("collection_item")}`;
                }
            }
        } else if (q.type === 2) {
            const repChance = Math.min(0.8, 0.15 + q.difficulty * 0.0065);
            if (Math.random() < repChance) {
                const extraRep = q.difficulty * 0.6;
                gameState.reputation += extraRep;
                extraMsg += `<br>${t("grateful_client_rep", {extraRep: extraRep.toFixed(1)})}`;
                extraTextPlain += `\n${t("grateful_client_rep", {extraRep: extraRep.toFixed(1)})}`;
            }
        }
        if (q.type === 1) {
            if (Math.random() < 1 && q.npcIdx !== null && !gameState.discoveredNPCs.includes(q.npcIdx)) {
                gameState.discoveredNPCs.push(q.npcIdx);
                const npcName = discoveryNPCs[q.npcIdx];
                extraMsg += `<br>${t("npc_discovered", {npc: npcName})}`;
                extraTextPlain += `\n${t("npc_discovered", {npc: npcName})}`;
            }
        }
        if (q.side) {
            const expOrb = { name: t("exp_orb"), type: 'consumable', effect: 'level_up', amount: 10, id: gameState.nextId++ };
            addToInventory(expOrb, 1);
            extraMsg += `<br>${t("side_quest_exp_orb")}`;
            extraTextPlain += `\n${t("side_quest_exp_orb")}`;
        }
        if (q.type === 3 && q.item) {
            const quantity = Math.floor(Math.random() * 5) + 1;
            for (let k = 0; k < quantity; k++) {
                addToInventory({...q.item, id: gameState.nextId++}, 1);
            }
            additionalItemHTML = `<div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">${t("fetch_item_reward", {qty: quantity, name: q.item.name})}</div>`;
            extraTextPlain += `\n${t("fetch_item_reward", {qty: quantity, name: q.item.name})}`;
        }

        // 完了ダイアログ処理
        if (q.side) {
            if (sideQuestCompletionDialogue[q.npcIdx]) {
                const key = `side-${q.npcIdx}`;
                if (!gameState.seenCompletionDialogues.has(key)) {
                    const dialogue = sideQuestCompletionDialogue[q.npcIdx];
                    queueQuestCompletionDialogue(dialogue);
                    gameState.seenCompletionDialogues.add(key);
                }
            }
        } else if (currentQuestCompletionDialogue[q.questType]?.[q.rank]?.[q.questStoryindex]) {
            const key = `${q.questType}-${q.rank}-${q.questStoryindex}`;
            if (!gameState.seenCompletionDialogues.has(key)) {
                const dialogue = currentQuestCompletionDialogue[q.questType][q.rank][q.questStoryindex];
                queueQuestCompletionDialogue(dialogue);
                gameState.seenCompletionDialogues.add(key);

                const unlockKey = `${q.questType}-${q.rank}-${q.questStoryindex}`;
                const npcToUnlock = questCompletionNPCUnlocks[unlockKey];
                if (npcToUnlock) {
                    const npcs = Array.isArray(npcToUnlock) ? npcToUnlock : [npcToUnlock];
                    for (const npcKey of npcs) {
                        unlockQuestNPC(npcKey);
                    }
                }
            }
        }

        // 成功メッセージ構築
        const expPerAdv = (q.type === 7) ? q.floor * 500 : q.difficulty * 20;

        const survivorsPlain = survivingAdvs.length > 0
            ? survivingAdvs.map(adv => `${adv.name} (+${expPerAdv} ${t("exp_short")})`).join('\n')
            : t("no_one_returned");

        const successPlain = `${t("quest_success_title")}\n\n${q.desc}\n\n${t("reputation_gain", {repGain: repGain.toFixed(1)})}\n${t("gold_reward", {gold: netGold.toFixed(0)})}${payout > 0 ? t("adventurer_payout", {payout: payout.toFixed(0)}) : ''}\n${extraTextPlain}\n\n${survivorsPlain}`;

        // 大画面HTML（元の構造を維持しつつ翻訳キー使用）
        let leftHTML = `
            <div style="text-align: center;">
                <div style="font-size: 15px; margin-bottom: 40px;">${t("reputation_gain", {repGain: repGain.toFixed(1)})}</div>
                <div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">
                    ${t("gold_reward", {gold: netGold.toFixed(0)})}${payout > 0 ? ` <br><span style="font-size: 10px;">[${t("adventurer_payout_note", {payout: payout.toFixed(0)})}]</span>` : ''}
                </div>
                ${additionalItemHTML}
            </div>`;

        let rightHTML = survivingAdvs.length > 0 ? `
            <div style="text-align: center;">
                <div style="font-size: 12px; margin-bottom: 0px; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">${q.desc}</div>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0px;">
                    ${survivingAdvs.map(adv => `
                    <div style="text-align: center;">
                        <img class="adventurer-img" src="Images/${adv.image}" alt="${adv.name}">
                        <div style="margin-top: 10px; font-size: 15px;">${adv.name}</div>
                        <div style="font-size: 15px; font-weight: bold; color: #2e5c2e;">+${expPerAdv} ${t("exp_short")}</div>
                    </div>
                    `).join('')}
                </div>
                <div style="font-size: 12px; font-weight: bold; margin: 20px 0; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">
                    ${extraMsg}
                </div>
            </div>` : `
            <div style="font-size: 50px; color: darkred;">${t("no_one_returned")}</div>`;

        const messageHTML = `
        <div class="quest-scroll quest-scroll-success">
            <div class="scroll-content">
                <br><br>
                <div style="display: flex; justify-content: center; align-items: flex-start; gap: 0px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;">
                    ${rightHTML}
                    ${leftHTML}
                </div>
            </div>
        </div>`;

        if (isSmallScreen) {
            better_alert(successPlain, "success");

            let historyMsg = `<strong>${t("quest_success_title")}</strong><br><br>`
                + `${q.desc.replace(/\n/g, '<br>')}<br><br>`
                + `${t("reputation_gain", {repGain: repGain.toFixed(1)})}<br>`
                + `${t("gold_reward", {gold: netGold.toFixed(0)})}${payout > 0 ? ` (${t("adventurer_payout", {payout: payout.toFixed(0)})})` : ''}<br>`
                + (additionalItemHTML ? additionalItemHTML.replace(/<[^>]*>/g, '').trim() + '<br>' : '')
                + `<br>`
                + (survivingAdvs.length > 0 
                    ? survivingAdvs.map(adv => `${adv.name} (+${expPerAdv} ${t("exp_short")})<br>`).join('')
                    : `${t("no_one_returned")}<br>`)
                + (extraTextPlain ? extraTextPlain.replace(/\n/g, '<br>') : '');

            gameState.eventHistory.unshift({day: eventDay, message: `<div style="padding:20px; text-align:left; color:#000000;">${historyMsg}</div>`});
        } else {
            gameState.eventHistory.unshift({day: eventDay, message: messageHTML});
        }
    } else {
        // Failure handling
        const repLoss = q.difficulty * 2;
        gameState.reputation -= repLoss;

        const survivorsPlain = survivingAdvs.length > 0
            ? survivingAdvs.map(adv => adv.name).join('\n')
            : t("no_one_returned");

        const failurePlain = `${t("quest_failure_title")}\n\n${t("reputation_loss", {repLoss})}\n\n${q.desc}\n\n${survivorsPlain}`;

        let leftHTML = `
            <div style="text-align: center;">
                <div style="font-size: 20px; color: darkred; margin-bottom: 40px;">${t("quest_failure_title")}</div>
                <div style="font-size: 15px; color: darkred;">${t("reputation_loss", {repLoss})}</div>
            </div>`;

        let rightHTML = survivingAdvs.length > 0 ? `
            <div style="text-align: center;">
                <div style="font-size: 12px; margin-bottom: 0px; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">${q.desc}</div>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0px;">
                    ${survivingAdvs.map(adv => `
                    <div style="text-align: center; opacity: 0.7;">
                        <img class="adventurer-img" src="Images/${adv.image}" alt="${adv.name}">
                        <div style="margin-top: 10px; font-size: 15px;">${adv.name}</div>
                    </div>
                    `).join('')}
                </div>
            </div>` : `
            <div style="font-size: 20px; color: darkred;">${t("no_one_returned")}</div>`;

        const messageHTML = `
        <div class="quest-scroll quest-scroll-fail">
            <div class="scroll-content">
                <br><br>
                <div style="display: flex; justify-content: center; align-items: flex-start; gap: 0px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;">
                    ${rightHTML}
                    ${leftHTML}
                </div>
            </div>
        </div>`;

        if (isSmallScreen) {
            better_alert(failurePlain, "failure");

            let historyMsg = `<strong style="color:darkred;">${t("quest_failure_title")}</strong><br><br>`
                + `${t("reputation_loss", {repLoss})}<br><br>`
                + `${q.desc.replace(/\n/g, '<br>')}<br><br>`
                + (survivingAdvs.length > 0 
                    ? survivingAdvs.map(adv => `${adv.name}<br>`).join('')
                    : t("no_one_returned"));

            gameState.eventHistory.unshift({day: eventDay, message: `<div style="padding:20px; text-align:left; color:#000000;">${historyMsg}</div>`});
        } else {
            gameState.eventHistory.unshift({day: eventDay, message: messageHTML});
        }
    }
}

function generateDungeonEnemies(q) {
    q.enemies = [];

    const MONSTER_FOLDER = "Images/Dungeon_Monster/";

    // ダンジョンモンスターリスト（日本語名修正済み）
    const dungeonMonsters = [
        { file: "slime.png",                 name: "スライム",             level: 1,  type: "STR" },
        { file: "snake.png",                 name: "毒蛇",                 level: 1,  type: "DEX" },
        { file: "goblin.png",                name: "ゴブリン",             level: 2,  type: "STR" },
        { file: "plant.png",                 name: "キラープラント",       level: 2,  type: "WIS" },
        { file: "bat.png",                   name: "ヴァンパイアバット",   level: 3,  type: "DEX" },
        { file: "spider.png",                name: "ジャイアントスパイダー", level: 3, type: "STR" },
        { file: "wolf.png",                  name: "ダイアウルフ",         level: 4,  type: "STR" },
        { file: "raven.png",                 name: "ヘルレイヴン",         level: 4,  type: "DEX" },
        { file: "troll.png",                 name: "トロール",             level: 5,  type: "STR" },
        { file: "treant.png",                name: "トレント",             level: 5,  type: "WIS" },
        { file: "skeleton swordfighter.png", name: "スケルトン剣士",       level: 6,  type: "STR" },
        { file: "skeleton rogue.png",        name: "スケルトンローグ",     level: 6,  type: "DEX" },
        { file: "skeleton mage.png",         name: "スケルトンメイジ",     level: 7,  type: "WIS" },
        { file: "skeleton archer.png",       name: "スケルトンアーチャー", level: 7,  type: "DEX" },
        { file: "skeleton mage.png",         name: "上級スケルトンメイジ", level: 8,  type: "WIS" },
        { file: "skeleton archer.png",       name: "上級スケルトンアーチャー", level: 8, type: "DEX" },
        { file: "armor.png",                 name: "リビングアーマー",     level: 9,  type: "STR" },
        { file: "golem.png",                 name: "ストーンゴーレム",     level: 9,  type: "STR" },
        { file: "dragon.png",                name: "ヤングドラゴン",       level: 10, type: "STR" },
        { file: "red imp.png",               name: "レッダインプ",         level: 10, type: "DEX" },
        { file: "black imp.png",             name: "ブラックインプ",       level: 10, type: "WIS" },
        { file: "shadow.png",                name: "シャドウ",             level: 10, type: "LUC" }
    ];

    // 敵の数: 1〜4体（階層が深いほど平均的に多くなる）
    const numEnemies = Math.min(4, Math.floor(Math.random() * 4) + 1 + Math.floor(q.floor / 5));

    // 出現可能なモンスターをフィルタリング
    let availableMonsters;
    if (q.floor > 10) {
        // 階層11以上: level === 10 のモンスターのみ（見た目はレベル10固定）
        availableMonsters = dungeonMonsters.filter(m => m.level === 10);
    } else {
        // 階層1〜10: ちょうどその階層のモンスターのみ出現（level === q.floor）
        availableMonsters = dungeonMonsters.filter(m => m.level === q.floor);
    }

    // 安全策: 該当するモンスターがいない場合（ありえないが）
    if (availableMonsters.length === 0) {
        // 階層10以上の場合はレベル10をフォールバック、それ以外はレベル1
        availableMonsters = dungeonMonsters.filter(m => m.level === (q.floor > 10 ? 10 : 1));
    }

    // 基礎ステータス（階層に比例して無制限に強くなる）
    const baseStatMultiplier = q.floor * 15;
    const randomBonus = Math.random() * 40 + q.floor * 5;

    for (let i = 0; i < numEnemies; i++) {
        const monsterData = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];

        const baseStat = baseStatMultiplier + randomBonus;

        // typeに応じてステータス特化
        let strength = Math.floor(baseStat * 0.8);
        let wisdom   = Math.floor(baseStat * 0.8);
        let dexterity = Math.floor(baseStat * 0.8);
        let luck     = Math.floor(baseStat * 0.6);

        switch (monsterData.type) {
            case "STR":
                strength = Math.floor(baseStat * 1.8 + Math.random() * 25);
                wisdom   = Math.floor(baseStat * 0.6);
                dexterity = Math.floor(baseStat * 0.6);
                luck     = Math.floor(baseStat * 0.5);
                break;
            case "DEX":
                dexterity = Math.floor(baseStat * 1.8 + Math.random() * 25);
                strength = Math.floor(baseStat * 0.6);
                wisdom   = Math.floor(baseStat * 0.6);
                luck     = Math.floor(baseStat * 0.5);
                break;
            case "WIS":
                wisdom = Math.floor(baseStat * 1.8 + Math.random() * 25);
                strength = Math.floor(baseStat * 0.6);
                dexterity = Math.floor(baseStat * 0.6);
                luck     = Math.floor(baseStat * 0.5);
                break;
            case "LUC":
                luck = Math.floor(baseStat * 1.8 + Math.random() * 25);
                strength = Math.floor(baseStat * 0.7);
                wisdom   = Math.floor(baseStat * 0.7);
                dexterity = Math.floor(baseStat * 0.7);
                break;
        }

        const e = {
            id: `dungeon_enemy_${q.id}_${i}`,
            name: monsterData.name + (numEnemies > 1 ? ` ${i + 1}` : ""),
            image: `${MONSTER_FOLDER}${monsterData.file}`,
            sex: 'N',
            hp: Math.floor(100 + baseStat * 2.8 + Math.random() * 80),
            maxHp: 0,
            mp: Math.floor(20 + baseStat * 0.9 + Math.random() * 30),
            maxMp: 0,
            strength: Math.max(5, strength + Math.floor(Math.random() * 15)),
            wisdom:   Math.max(3, wisdom + Math.floor(Math.random() * 10)),
            dexterity: Math.max(5, dexterity + Math.floor(Math.random() * 15)),
            luck:     Math.max(3, luck + Math.floor(Math.random() * 10)),
            defense: q.floor*10,
            defending: false,
            action: null,
            target: null,
            primary: monsterData.type
        };
        e.maxHp = e.hp;
        e.maxMp = e.mp;
        q.enemies.push(e);
    }
}

// === ストーリークエスト専用ボス定義（進行度ごとに固定、独自のprimary type） ===
const storyBosses = [
    // progress 0: 盗賊団団長 - DEX特化（素早さ・回避・クリティカル重視）
    { name: "盗賊団団長", image: "Images/Assassin(M)_enemy.png", primary: "STR" },
    // progress 1: 森の守護者トレント - WIS特化（魔法・回復・範囲攻撃）
    { name: "遺跡の守護者トレント", image: "Images/遺跡の守護者トレント.jpg", primary: "WIS" },
    // progress 2: 闇の魔導士 - WIS特化（強力魔法・デバフ）
    { name: "闇の魔導士", image: "Images/dark_mage.png", primary: "WIS" },
    // progress 3: 古代ドラゴン - STR特化（物理火力・ブレス）
    { name: "古代ドラゴン", image: "Images/ancient_dragon.png", primary: "STR" },
    // progress 4: 魔王の分身 - LUC特化（運頼みの高ダメージ・状態異常）
    { name: "魔王の分身", image: "Images/demon_lord_avatar.png", primary: "LUC" }
];

// === ボス対応レベル（5つのストーリークエスト = level 20,40,60,80,100） ===
const bossLevels = [20, 40, 60, 80, 100];

// === ストーリークエスト用雑魚テーマ（進行度ごとに固定のモンスター種、ダンジョンと共有） ===
const storyMinionThemes = [
    // progress 0: 盗賊団テーマ
    ["Hunter(M)_enemy.png", "Hunter(F)_enemy.png"],
    // progress 1: 森テーマ
    ["plant.png", "wolf.png", "spider.png"],
    // progress 2: 闇テーマ
    ["skeleton swordfighter.png", "skeleton rogue.png", "skeleton mage.png", "shadow.png"],
    // progress 3: ドラゴン配下
    ["troll.png", "golem.png", "dragon.png"],
    // progress 4: 魔王軍
    ["red imp.png", "black imp.png", "armor.png", "skeleton archer.png"]
];

// === 新関数: ストーリークエスト用敵生成（レベルベースステータス、ボスは1.5倍強化） ===
function generateStoryEnemies(q) {
    q.enemies = [];

    const MONSTER_FOLDER = "Images/Dungeon_Monster/";

    // ダンジョンモンスターリスト（generateDungeonEnemies と完全共有）
    const dungeonMonsters = [
        { file: "Hunter(M)_enemy.png",                 name: "ハンター（M)",             level: 1,  type: "STR" },
        { file: "Hunter(F)_enemy.png",                 name: "ハンター（F)",             level: 1,  type: "STR" },
        { file: "slime.png",                 name: "スライム",             level: 1,  type: "STR" },
        { file: "snake.png",                 name: "毒蛇",                 level: 1,  type: "DEX" },
        { file: "goblin.png",                name: "ゴブリン",             level: 2,  type: "STR" },
        { file: "plant.png",                 name: "キラープラント",       level: 2,  type: "WIS" },
        { file: "bat.png",                   name: "ヴァンパイアバット",   level: 3,  type: "DEX" },
        { file: "spider.png",                name: "ジャイアントスパイダー", level: 3, type: "STR" },
        { file: "wolf.png",                  name: "ダイアウルフ",         level: 4,  type: "STR" },
        { file: "raven.png",                 name: "ヘルレイヴン",         level: 4,  type: "DEX" },
        { file: "troll.png",                 name: "トロール",             level: 5,  type: "STR" },
        { file: "treant.png",                name: "トレント",             level: 5,  type: "WIS" },
        { file: "skeleton swordfighter.png", name: "スケルトン剣士",       level: 6,  type: "STR" },
        { file: "skeleton rogue.png",        name: "スケルトンローグ",     level: 6,  type: "DEX" },
        { file: "skeleton mage.png",         name: "スケルトンメイジ",     level: 7,  type: "WIS" },
        { file: "skeleton archer.png",       name: "スケルトンアーチャー", level: 7,  type: "DEX" },
        { file: "skeleton mage.png",         name: "上級スケルトンメイジ", level: 8,  type: "WIS" },
        { file: "skeleton archer.png",       name: "上級スケルトンアーチャー", level: 8, type: "DEX" },
        { file: "armor.png",                 name: "リビングアーマー",     level: 9,  type: "STR" },
        { file: "golem.png",                 name: "ストーンゴーレム",     level: 9,  type: "STR" },
        { file: "dragon.png",                name: "ヤングドラゴン",       level: 10, type: "STR" },
        { file: "red imp.png",               name: "レッダインプ",         level: 10, type: "DEX" },
        { file: "black imp.png",             name: "ブラックインプ",       level: 10, type: "WIS" },
        { file: "shadow.png",                name: "シャドウ",             level: 10, type: "LUC" }
    ];

    const progress = gameState.mainProgress;

    // --- ボス生成（固定レベル・primary、ステータス1.5倍強化） ---
    const boss_level = bossLevels[progress] || 100;
    const bossData = storyBosses[progress] || { name: "強大な敵", image: "Images/default_boss.png", primary: "STR" };

    const total_status_point = 40 + boss_level * 5;

    let strength = 0;
    let wisdom   = 0;
    let dexterity = 0;
    let luck     = 0;

    // primary type 特化（ボスはprimaryに60%、次に高いステに20%、残り10%×2）
    switch (bossData.primary) {
        case "STR":
            strength  = Math.floor(total_status_point * 0.6);
            dexterity = Math.floor(total_status_point * 0.2);
            wisdom    = Math.floor(total_status_point * 0.1);
            luck      = Math.floor(total_status_point * 0.1);
            break;
        case "DEX":
            dexterity = Math.floor(total_status_point * 0.6);
            strength  = Math.floor(total_status_point * 0.2);
            wisdom    = Math.floor(total_status_point * 0.1);
            luck      = Math.floor(total_status_point * 0.1);
            break;
        case "WIS":
            wisdom    = Math.floor(total_status_point * 0.6);
            luck      = Math.floor(total_status_point * 0.2); // WISボスはLUCをサブに（魔法+運要素）
            strength  = Math.floor(total_status_point * 0.1);
            dexterity = Math.floor(total_status_point * 0.1);
            break;
        case "LUC":
            luck      = Math.floor(total_status_point * 0.6);
            wisdom    = Math.floor(total_status_point * 0.2); // LUCボスはWISをサブに（運+状態異常）
            strength  = Math.floor(total_status_point * 0.1);
            dexterity = Math.floor(total_status_point * 0.1);
            break;
    }

    // ボス基本ステータス（レベルベース、冒険者と同等成長）
    let bossHp       = Math.floor(boss_level * 100);
    let bossMp       = Math.floor(boss_level * 40);
    let bossDefense  = Math.floor(boss_level * 2);

    const boss = {
        id: 'story_boss_' + gameState.nextId++,
        name: bossData.name,
        image: bossData.image,
        sex: 'N',
        hp: bossHp,
        maxHp: 0,
        mp: bossMp,
        maxMp: 0,
        strength: strength,
        wisdom:   wisdom,
        dexterity: dexterity,
        luck:     luck,
        defense: bossDefense,
        defending: false,
        action: null,
        target: null,
        primary: bossData.primary,
        isBoss: true,
        level: boss_level
    };
    boss.maxHp = boss.hp;
    boss.maxMp = boss.mp;
    q.enemies.push(boss);

    // --- 雑魚生成（ボスと同じレベルベースステータス計算、テーマ固定） ---
    const minionCount = 3; // 進行度で1〜3体
    const minion_level = Math.floor(boss_level / 2); // ボスの半分レベル

    const total_minion_status_point = 40 + minion_level * 5;

    const themeFiles = storyMinionThemes[progress] || ["slime.png", "goblin.png"];
    const themeMonsters = themeFiles.map(file => dungeonMonsters.find(m => m.file === file)).filter(Boolean);
    if (themeMonsters.length === 0) themeMonsters.push(dungeonMonsters[0]);

    for (let i = 0; i < minionCount; i++) {
        const monsterData = themeMonsters[Math.floor(Math.random() * themeMonsters.length)];

        let minion_strength = 0;
        let minion_wisdom   = 0;
        let minion_dexterity = 0;
        let minion_luck     = 0;

        // 雑魚もprimary typeで特化（ダンジョンと同等）
        switch (monsterData.type) {
            case "STR":
                minion_strength  = Math.floor(total_minion_status_point * 0.6);
                minion_dexterity = Math.floor(total_minion_status_point * 0.2);
                minion_wisdom    = Math.floor(total_minion_status_point * 0.1);
                minion_luck      = Math.floor(total_minion_status_point * 0.1);
                break;
            case "DEX":
                minion_dexterity = Math.floor(total_minion_status_point * 0.6);
                minion_strength  = Math.floor(total_minion_status_point * 0.2);
                minion_wisdom    = Math.floor(total_minion_status_point * 0.1);
                minion_luck      = Math.floor(total_minion_status_point * 0.1);
                break;
            case "WIS":
                minion_wisdom    = Math.floor(total_minion_status_point * 0.6);
                minion_luck      = Math.floor(total_minion_status_point * 0.2);
                minion_strength  = Math.floor(total_minion_status_point * 0.1);
                minion_dexterity = Math.floor(total_minion_status_point * 0.1);
                break;
            case "LUC":
                minion_luck      = Math.floor(total_minion_status_point * 0.6);
                minion_wisdom    = Math.floor(total_minion_status_point * 0.2);
                minion_strength  = Math.floor(total_minion_status_point * 0.1);
                minion_dexterity = Math.floor(total_minion_status_point * 0.1);
                break;
        }

        // 雑魚基本ステータス（レベルベース）
        let minionHp      = Math.floor(minion_level * 100);
        let minionMp      = Math.floor(minion_level * 40);
        let minionDefense = Math.floor(minion_level * 2);

        const e = {
            id: `story_minion_${q.id}_${i}`,
            name: monsterData.name + (minionCount > 1 ? ` ${i + 1}` : ""),
            image: `${MONSTER_FOLDER}${monsterData.file}`,
            sex: 'N',
            hp: minionHp,
            maxHp: 0,
            mp: minionMp,
            maxMp: 0,
            strength: minion_strength,
            wisdom:   minion_wisdom,
            dexterity: minion_dexterity,
            luck:     minion_luck,
            defense: minionDefense,
            defending: false,
            action: null,
            target: null,
            primary: monsterData.type,
            isBoss: false,
            level: minion_level
        };
        e.maxHp = e.hp;
        e.maxMp = e.mp;
        q.enemies.push(e);
    }
}


// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者が現在どのクエストにも割り当てられていないかを判定するヘルパー関数
function isAdventurerOnQuest(adv) {
    if (!adv || !adv.id) return false;
    
    // gameState.quests の .assigned にこの冒険者のIDが含まれているか確認
    // これが最も確実（assignedQuestフラグが残っていたり消え忘れても対応可能）
    return gameState.quests.some(quest => 
        quest.assigned && Array.isArray(quest.assigned) && quest.assigned.includes(adv.id)
    );
}

// 施設が利用可能（レベル1以上）かどうかを判定
function isFacilityUsable(facilityName) {
    return gameState.facilities?.[facilityName] >= 1;
}
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者が現在どのクエストにも割り当てられていないかを判定
function isAdventurerOnQuest(adv) {
    if (!adv || !adv.id) return false;
    return gameState.quests.some(quest => 
        quest.assigned && Array.isArray(quest.assigned) && quest.assigned.includes(adv.id)
    );
}

// 施設が利用可能（レベル1以上）かどうかを判定
function isFacilityUsable(facilityName) {
    return gameState.facilities?.[facilityName] >= 1;
}

// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// 冒険者の1日の自由行動を処理（playDay() から呼び出し）
// === 場所別交流バリエーション（翻訳キー対応版）===
// descKeyA / descKeyB に翻訳キー文字列を指定（{a} {b} プレースホルダー使用）
// mutual の場合 descKeyA = descKeyB でOK（名前置換で自動反転）
// unilateral の場合別キー

const interactionsByAction = {
    tavern: [
        { type: 'mutual', positive: true, descKeyA: 'int_tavern_mutual_laugh', descKeyB: 'int_tavern_mutual_laugh', deltaA: +3, deltaB: +3 },
        { type: 'mutual', positive: true, descKeyA: 'int_tavern_mutual_food', descKeyB: 'int_tavern_mutual_food', deltaA: +2, deltaB: +2 },
        { type: 'mutual', positive: true, descKeyA: 'int_tavern_mutual_sing', descKeyB: 'int_tavern_mutual_sing', deltaA: +4, deltaB: +4 },
        { type: 'mutual', positive: false, descKeyA: 'int_tavern_mutual_gamble_lose', descKeyB: 'int_tavern_mutual_gamble_lose', deltaA: -3, deltaB: -3 },
        { type: 'mutual', positive: false, descKeyA: 'int_tavern_mutual_drink_argue', descKeyB: 'int_tavern_mutual_drink_argue', deltaA: -2, deltaB: -2 },
        { type: 'unilateral', positive: true, descKeyA: 'int_tavern_uni_treat', descKeyB: 'int_tavern_uni_treated', deltaA: +2, deltaB: +3 },
        { type: 'unilateral', positive: false, descKeyA: 'int_tavern_uni_rude_drink', descKeyB: 'int_tavern_uni_criticized', deltaA: -3, deltaB: +1 },
        { type: 'unilateral', positive: true, descKeyA: 'int_tavern_uni_funny_story', descKeyB: 'int_tavern_uni_listened', deltaA: +3, deltaB: +1 }
    ],

    blacksmith: [
        { type: 'mutual', positive: true, descKeyA: 'int_blacksmith_mutual_polish', descKeyB: 'int_blacksmith_mutual_polish', deltaA: +2, deltaB: +2 },
        { type: 'mutual', positive: true, descKeyA: 'int_blacksmith_mutual_success', descKeyB: 'int_blacksmith_mutual_success', deltaA: +3, deltaB: +3 },
        { type: 'mutual', positive: false, descKeyA: 'int_blacksmith_mutual_failure', descKeyB: 'int_blacksmith_mutual_failure', deltaA: -2, deltaB: -2 },
        { type: 'mutual', positive: false, descKeyA: 'int_blacksmith_mutual_technique_argue', descKeyB: 'int_blacksmith_mutual_technique_argue', deltaA: -3, deltaB: -3 },
        { type: 'unilateral', positive: true, descKeyA: 'int_blacksmith_uni_tip_learned', descKeyB: 'int_blacksmith_uni_tip_taught', deltaA: +3, deltaB: +1 },
        { type: 'unilateral', positive: true, descKeyA: 'int_blacksmith_uni_admire_tech', descKeyB: 'int_blacksmith_uni_praised', deltaA: +3, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_blacksmith_uni_hammer_noise', descKeyB: 'int_blacksmith_uni_annoyed', deltaA: -2, deltaB: +1 }
    ],

    alchemy: [
        { type: 'mutual', positive: true, descKeyA: 'int_alchemy_mutual_share_materials', descKeyB: 'int_alchemy_mutual_share_materials', deltaA: +3, deltaB: +3 },
        { type: 'mutual', positive: true, descKeyA: 'int_alchemy_mutual_new_recipe', descKeyB: 'int_alchemy_mutual_new_recipe', deltaA: +2, deltaB: +2 },
        { type: 'mutual', positive: false, descKeyA: 'int_alchemy_mutual_failure', descKeyB: 'int_alchemy_mutual_failure', deltaA: -2, deltaB: -2 },
        { type: 'unilateral', positive: true, descKeyA: 'int_alchemy_uni_rare_material', descKeyB: 'int_alchemy_uni_gave_material', deltaA: +3, deltaB: +1 },
        { type: 'unilateral', positive: true, descKeyA: 'int_alchemy_uni_help_experiment', descKeyB: 'int_alchemy_uni_helped', deltaA: +2, deltaB: +2 },
        { type: 'unilateral', positive: false, descKeyA: 'int_alchemy_uni_bad_smell', descKeyB: 'int_alchemy_uni_smell_complaint', deltaA: -3, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_alchemy_uni_blame_mistake', descKeyB: 'int_alchemy_uni_blamed', deltaA: -3, deltaB: -2 }
    ],

    gather: [
        { type: 'mutual', positive: true, descKeyA: 'int_gather_mutual_rare_herb', descKeyB: 'int_gather_mutual_rare_herb', deltaA: +3, deltaB: +3 },
        { type: 'mutual', positive: true, descKeyA: 'int_gather_mutual_help', descKeyB: 'int_gather_mutual_help', deltaA: +2, deltaB: +2 },
        { type: 'mutual', positive: false, descKeyA: 'int_gather_mutual_spot_argue', descKeyB: 'int_gather_mutual_spot_argue', deltaA: -3, deltaB: -3 },
        { type: 'unilateral', positive: true, descKeyA: 'int_gather_uni_tip_learned', descKeyB: 'int_gather_uni_tip_taught', deltaA: +3, deltaB: +1 },
        { type: 'unilateral', positive: true, descKeyA: 'int_gather_uni_admire_amount', descKeyB: 'int_gather_uni_praised_amount', deltaA: +2, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_gather_uni_noise', descKeyB: 'int_gather_uni_annoyed', deltaA: -2, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_gather_uni_spot_taken', descKeyB: 'int_gather_uni_spot_misunderstanding', deltaA: -3, deltaB: 0 }
    ],

    hunting: [
        { type: 'mutual', positive: true, descKeyA: 'int_hunting_mutual_big_preys', descKeyB: 'int_hunting_mutual_big_preys', deltaA: +4, deltaB: +4 },
        { type: 'mutual', positive: true, descKeyA: 'int_hunting_mutual_treat_wounds', descKeyB: 'int_hunting_mutual_treat_wounds', deltaA: +3, deltaB: +3 },
        { type: 'mutual', positive: false, descKeyA: 'int_hunting_mutual_preys_argue', descKeyB: 'int_hunting_mutual_preys_argue', deltaA: -3, deltaB: -3 },
        { type: 'unilateral', positive: true, descKeyA: 'int_hunting_uni_saved_life', descKeyB: 'int_hunting_uni_saved', deltaA: +4, deltaB: +2 },
        { type: 'unilateral', positive: true, descKeyA: 'int_hunting_uni_reliable', descKeyB: 'int_hunting_uni_relied_on', deltaA: +3, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_hunting_uni_reckless', descKeyB: 'int_hunting_uni_worried', deltaA: -3, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_hunting_uni_scary_noise', descKeyB: 'int_hunting_uni_surprised', deltaA: -2, deltaB: 0 }
    ],

    default: [
        { type: 'mutual', positive: true, descKeyA: 'int_default_mutual_quiet_talk', descKeyB: 'int_default_mutual_quiet_talk', deltaA: +2, deltaB: +2 },
        { type: 'mutual', positive: true, descKeyA: 'int_default_mutual_guild_future', descKeyB: 'int_default_mutual_guild_future', deltaA: +3, deltaB: +3 },
        { type: 'mutual', positive: false, descKeyA: 'int_default_mutual_distance', descKeyB: 'int_default_mutual_distance', deltaA: -2, deltaB: -2 },
        { type: 'unilateral', positive: true, descKeyA: 'int_default_uni_relieved', descKeyB: 'int_default_uni_presence', deltaA: +2, deltaB: +1 },
        { type: 'unilateral', positive: false, descKeyA: 'int_default_uni_silence_bother', descKeyB: 'int_default_uni_ignored', deltaA: -2, deltaB: -1 },
        { type: 'unilateral', positive: true, descKeyA: 'int_default_uni_light_talk', descKeyB: 'int_default_uni_talked_to', deltaA: +1, deltaB: +2 }
    ]
};


function processAdventurerDailyActions() {
    let totalGuildGain = 0;

    // Groups adventurers by their chosen action to handle social interactions later
    const actionGroups = {};       
    const metPairs = new Set();    

    gameState.adventurers.forEach(adv => {
        // --- 1. Basic Status & Safety Checks ---
        if (isAdventurerOnQuest(adv) || adv.temp) return;

        if (!adv.bag) {
            adv.bag = { gold: Math.floor(Math.random() * 100 + 50), items: [] };
        }

        if (!adv.actionHistory) adv.actionHistory = [];
        if (!adv.friendliness) adv.friendliness = {};   
        if (!adv.prohibitedActions) adv.prohibitedActions = [];
        if (adv.hunger === undefined) adv.hunger = 1.0;
        
        // Ensure the new slot system is initialized for the adventurer
        if (!adv.slots) {
            adv.slots = {
                weapon: null,
                subWeapon: null,
                head: null,
                body: null,
                accessory1: null,
                accessory2: null
            };
        }

        const maxHp = adv.maxHp || 100;
        const maxMp = adv.maxMp || 100;

        // --- 2. Automated Recovery Item Usage (1 per day) ---
        let recoveryItemUsed = null;
        let recoveryDescription = '';

        // Priority: HP Recovery if below 50%
        if (adv.hp / maxHp < 0.5) {
            const hpRecoveryItems = adv.bag.items.filter(item => 
                (item.qty || 1) >= 1 &&
                (item.restore === 'hp' ||  
                 (!item.restore && /hp|heal|health|life|活力|回復|治癒|ヒール|ライフ|ヘルス/i.test(item.name)))
            );

            if (hpRecoveryItems.length > 0) {
                hpRecoveryItems.sort((a, b) => (a.amount || 0) - (b.amount || 0));
                const item = hpRecoveryItems[0];
                const usedAmount = item.amount || 50;
                adv.hp = Math.min(maxHp, adv.hp + usedAmount);
                removeItemFromBag(adv.bag, item.name, 1);
                recoveryItemUsed = 'hp';
                recoveryDescription = t('recovery_hp_used', {item: item.name, amount: usedAmount}) || `${item.name}を使用してHPを${usedAmount}回復した`;
            }
        }

        // MP Recovery if HP wasn't needed and MP is below 50%
        if (!recoveryItemUsed && adv.mp / maxMp < 0.5) {
            const mpRecoveryItems = adv.bag.items.filter(item => 
                (item.qty || 1) >= 1 &&
                (item.restore === 'mp' || 
                 (!item.restore && /mp|mana|magic|魔力|マナ/i.test(item.name)))
            );

            if (mpRecoveryItems.length > 0) {
                mpRecoveryItems.sort((a, b) => (a.amount || 0) - (b.amount || 0));
                const item = mpRecoveryItems[0];
                const usedAmount = item.amount || 50;
                adv.mp = Math.min(maxMp, adv.mp + usedAmount);
                removeItemFromBag(adv.bag, item.name, 1);
                recoveryItemUsed = 'mp';
                recoveryDescription = t('recovery_mp_used', {item: item.name, amount: usedAmount}) || `${item.name}を使用してMPを${usedAmount}回復した`;
            }
        }

        // --- 3. Action Selection Logic ---
        const hpRatio = adv.hp / maxHp;
        const mpRatio = adv.mp / maxMp;
        const hungerRatio = adv.hunger;

        // Thresholds for forced or preferred actions
        const isLow = hpRatio < 0.5 || mpRatio < 0.5 || hungerRatio <= 0.3;
        const isHigh = hpRatio > 0.6 && mpRatio > 0.6;

        let description = '';
        let success = true;
        let adventurerChange = 0;
        let guildGain = 0;
        let action;

        // If resources are critically low, they MUST go to the Tavern if allowed
        if (isLow && isFacilityUsable('tavern') && !adv.prohibitedActions.includes('tavern')) {
            action = 'tavern';
        } else {
            const availableFacilities = [];
            
            // Tavern Check
            if (isFacilityUsable('tavern') && !adv.prohibitedActions.includes('tavern')) {
                availableFacilities.push('tavern');
            }
            
            // Alchemy Check (Requires materials in their bag)
            if (isFacilityUsable('alchemy') && !adv.prohibitedActions.includes('alchemy')) {
                const alchemyRecipes = [
                    { name: '花の霊薬', ingredients: [{name:'花', qty:1}, {name:'普通の薬草', qty:1}] },
                    { name: 'キノコ回復薬', ingredients: [{name:'キノコ', qty:1}, {name:'薬草', qty:1}] }
                ];
                const canAlchemy = alchemyRecipes.some(r => 
                    r.ingredients.every(ing => hasItemInBag(adv.bag, ing.name, ing.qty))
                );
                if (canAlchemy) availableFacilities.push('alchemy');
            }
            
            // Blacksmith Check (Uses the new SLOTS system)
            const equippedItems = Object.values(adv.slots).filter(item => item && !item.locked && item.stat);
            if (isFacilityUsable('blacksmith') && !adv.prohibitedActions.includes('blacksmith') && equippedItems.length > 0) {
                availableFacilities.push('blacksmith');
            }

            // Probability Weights (100 Slots Method)
            const slots = [];
            for (let i = 0; i < 20; i++) slots.push('guild_stay'); // Base rest

            if (!adv.prohibitedActions.includes('street_walk')) {
                for (let i = 0; i < 20; i++) slots.push('street_walk');
            }
            if (!adv.prohibitedActions.includes('gather')) {
                for (let i = 0; i < 20; i++) slots.push('gather');
            }
            if (isHigh && !adv.prohibitedActions.includes('hunting')) {
                for (let i = 0; i < 15; i++) slots.push('hunting');
            }

            // Facilities get 10 tickets each if available
            availableFacilities.forEach(fac => {
                for (let i = 0; i < 10; i++) slots.push(fac);
            });

            // Trait-based adjustments
            if (adv.traits) {
                adv.traits.forEach(trait => {
                    if (trait.type === 'action_preference' && trait.weight_bonus > 0) {
                        if (slots.includes(trait.action) && !adv.prohibitedActions.includes(trait.action)) {
                            for (let i = 0; i < trait.weight_bonus; i++) slots.push(trait.action);
                        }
                    }
                });
            }

            action = slots[Math.floor(Math.random() * slots.length)];
        }

        // Safety: If somehow a prohibited action was picked
        if (adv.prohibitedActions.includes(action) && action !== 'guild_stay') {
            description = t('action_prohibited_general') || "禁止された行動のため、ギルドで休憩した";
            action = 'guild_stay';
        }

        // --- 4. Facility Fee Processing ---
        const facilityActions = ['tavern', 'blacksmith', 'alchemy'];
        if (facilityActions.includes(action)) {
            const facilityFee = gameState.facilityFees?.[action] || 0;

            if (facilityFee > 0 && adv.bag.gold > 0) {
                const feeRatio = (facilityFee / adv.bag.gold) * 100;
                // If fee is more than 10% of their gold, they might give up
                if (feeRatio >= 10 || Math.random() < feeRatio / 10) {
                    action = 'street_walk';
                    description = t('action_fee_give_up') || "施設の使用料が高すぎて諦め、街に出た";
                    success = false;
                } else {
                    adv.bag.gold -= facilityFee;
                    gameState.gold += facilityFee;
                    adventurerChange -= facilityFee;
                    guildGain += facilityFee;
                }
            } else if (facilityFee > 0 && adv.bag.gold < facilityFee) {
                action = 'guild_stay';
                description = "所持金が足りず施設を利用できなかった。";
                success = false;
            }
        }

        // Store daily choice for social processing
        adv.dailyAction = action;
        if (!actionGroups[action]) actionGroups[action] = [];
        actionGroups[action].push(adv);

        // --- 5. Main Action Execution ---
        if (description === '') {
            switch (action) {
                case 'gather': {
                    const items = ['キノコ', '薬草', '花', '普通の薬草'];
                    const item = items[Math.floor(Math.random() * items.length)];
                    const qty = Math.floor(Math.random() * 3) + 1;
                    addItemToBag(adv.bag, item, qty);
                    description = t('gather_success', {item: item, qty: qty}) || `採取で${item}を${qty}個入手した`;
                    break;
                }

                case 'hunting': {
                    const dmgMod = 0.1 + Math.random() * 0.4;
                    const hpLoss = Math.floor(maxHp * dmgMod);
                    const mpLoss = Math.floor(maxMp * dmgMod);
                    adv.hp = Math.max(1, adv.hp - hpLoss);
                    adv.mp = Math.max(0, adv.mp - mpLoss);

                    const expNeeded = adv.level * 100;
                    const expGain = Math.floor(expNeeded * 0.15);
                    adv.exp += expGain;

                    let rawGold = adv.level * 25;
                    rawGold = Math.max(20, Math.min(5000, rawGold));
                    const guildFee = Math.floor(rawGold * 0.1);
                    const netGold = rawGold - guildFee;

                    adv.bag.gold += netGold;
                    gameState.gold += guildFee;
                    adventurerChange += netGold;
                    guildGain += guildFee;

                    description = t('hunting_report', {
                        hpLoss: hpLoss,
                        mpLoss: mpLoss,
                        expGain: expGain,
                        goldGain: netGold,
                        guildFee: guildFee
                    }) || `狩りでHP-${hpLoss} MP-${mpLoss}、EXP+${expGain}、Gold+${netGold}（ギルド手数料${guildFee}G）`;

                    if (adv.exp >= expNeeded) {
                        adv.level += 1;
                        adv.exp -= expNeeded;
                        description += t('hunting_level_up', {level: adv.level}) || ` レベルアップ！ Lv${adv.level}`;
                    }
                    break;
                }

                case 'guild_stay': {
                    description = t('guild_stay_idle') || "ギルドで休憩した";
                    adv.hp = Math.min(maxHp, adv.hp + Math.floor(maxHp * 0.1));
                    break;
                }

                case 'street_walk': {
                    description = t('street_walk_idle') || "街を散策した";
                    if (Math.random() < 0.3) {
                        const foundGold = Math.floor(Math.random() * 50) + 10;
                        adv.bag.gold += foundGold;
                        adventurerChange += foundGold;
                        description += t('street_walk_found_gold', {amount: foundGold}) || ` 道端で小銭を見つけた！ +${foundGold}G`;
                    }
                    break;
                }

                case 'tavern': {
                    // Base Recovery
                    adv.hp = Math.min(maxHp, adv.hp + Math.floor(maxHp * 0.3));
                    adv.mp = Math.min(maxMp, adv.mp + Math.floor(maxMp * 0.3));
                    description = t('tavern_rest') || "酒場で休息した";

                    const tavernSubRandom = Math.random();
                    const orderChance = (adv.hunger >= 1.0) ? 0 : (adv.hunger <= 0.3 ? 1.0 : 0.4);

                    if (tavernSubRandom < orderChance) {
                        // Food Logic
                        const tavernLevel = gameState.facilities.tavern || 0;
                        if (!gameState.tavernStock) gameState.tavernStock = {};

                        const maxFoodSpend = Math.floor(adv.bag.gold * 0.5);
                        let paidAvailable = [];
                        let rationIdx = -1;

                        currentTavernRecipes.forEach((r, idx) => {
                            if (r.level > tavernLevel) return;
                            const qty = gameState.tavernStock[idx] || 0;
                            if (qty <= 0) return;

                            if (r.isRation) {
                                rationIdx = idx;
                            } else {
                                const sellPrice = Math.floor((r.cost || 250) * 1.2);
                                if (sellPrice <= maxFoodSpend) {
                                    paidAvailable.push({recipe: r, idx, price: sellPrice});
                                }
                            }
                        });

                        let foodOrdered = false;
                        if (paidAvailable.length > 0) {
                            const chosen = paidAvailable[Math.floor(Math.random() * paidAvailable.length)];
                            adv.bag.gold -= chosen.price;
                            gameState.gold += chosen.price;
                            adventurerChange -= chosen.price;
                            guildGain += chosen.price;
                            gameState.tavernStock[chosen.idx]--;
                            if (gameState.tavernStock[chosen.idx] <= 0) delete gameState.tavernStock[chosen.idx];

                            if (chosen.recipe.buff) {
                                if (!adv.buffs) adv.buffs = [];
                                const bCopy = JSON.parse(JSON.stringify(chosen.recipe.buff));
                                bCopy.daysLeft = bCopy.days;
                                adv.buffs.push(bCopy);
                            }
                            adv.hunger = Math.min(1, adv.hunger + (chosen.recipe.hunger_recover || 0.4));
                            description += t('tavern_food_order', {food: chosen.recipe.name, cost: chosen.price}) || ` ${chosen.recipe.name}を注文した（${chosen.price}G）`;
                            foodOrdered = true;
                        } else if (rationIdx !== -1) {
                            // Fallback to Guild Ration
                            gameState.tavernStock[rationIdx]--;
                            if (gameState.tavernStock[rationIdx] <= 0) delete gameState.tavernStock[rationIdx];
                            adv.hunger = 1.0;
                            adv.friendliness = adv.friendliness || {};
                            // Decrease friendliness with Guild Master
                            description += t('tavern_ration_message') || ' 「ギルド配給食」を渋々食べた。好感度-10';
                        }
                    } else if (tavernSubRandom < orderChance + 0.15) {
                        // Gambling Logic
                        if (adv.bag.gold > 20 && gameState.gold > 20) {
                            const bet = Math.min(Math.floor(adv.bag.gold * 0.2), gameState.gold);
                            if (Math.random() < 0.45) {
                                adv.bag.gold += bet;
                                gameState.gold -= bet;
                                adventurerChange += bet;
                                guildGain -= bet;
                                description += ` ギャンブルで勝利！ +${bet}G`;
                            } else {
                                adv.bag.gold -= bet;
                                gameState.gold += bet;
                                adventurerChange -= bet;
                                guildGain += bet;
                                description += ` ギャンブルで負けた… -${bet}G`;
                            }
                        }
                    }
                    break;
                }

                case 'blacksmith': {
                    // Logic updated for Slots system
                    const equipList = Object.values(adv.slots).filter(i => i && !i.locked && i.stat);
                    if (equipList.length === 0) {
                        success = false;
                        description = t('blacksmith_no_equip') || "装備がなく鍛冶を利用できなかった";
                    } else if (Math.random() < 0.5) {
                        const targetItem = equipList[Math.floor(Math.random() * equipList.length)];
                        const oldEnh = targetItem.enhancement || 0;
                        targetItem.enhancement = oldEnh + 1;
                        description = t('blacksmith_success', {
                            equip: targetItem.name, 
                            old: oldEnh, 
                            new: targetItem.enhancement
                        }) || `${targetItem.name}の強化に成功！ +1 (${oldEnh} → ${targetItem.enhancement})`;
                    } else {
                        success = false;
                        description = t('blacksmith_failure') || "強化に失敗した…";
                    }
                    break;
                }

                case 'alchemy': {
                    const recipes = [
                        { name: '花の霊薬', ingredients: [{name:'花', qty:1}, {name:'普通の薬草', qty:1}] },
                        { name: 'キノコ回復薬', ingredients: [{name:'キノコ', qty:1}, {name:'薬草', qty:1}] }
                    ];
                    const possible = recipes.filter(r => 
                        r.ingredients.every(ing => hasItemInBag(adv.bag, ing.name, ing.qty))
                    );
                    if (possible.length === 0) {
                        success = false;
                        description = t('alchemy_no_materials') || "材料が足りず錬金できなかった";
                    } else {
                        const recipe = possible[Math.floor(Math.random() * possible.length)];
                        recipe.ingredients.forEach(ing => removeItemFromBag(adv.bag, ing.name, ing.qty));
                        addItemToBag(adv.bag, recipe.name, 1);
                        description = t('alchemy_success', {recipe: recipe.name}) || `${recipe.name}を調合した`;
                    }
                    break;
                }
            }
        }

        totalGuildGain += guildGain;

        const finalDescription = recoveryDescription 
            ? (recoveryDescription + ' ' + description)
            : description;

        adv.actionHistory.push({
            day: gameState.day - 1,
            action: action,
            description: finalDescription,
            adventurerChange: adventurerChange,
            guildGain: guildGain,
            success: success,
            recoveryItemUsed: recoveryItemUsed
        });

        if (adv.actionHistory.length > 30) adv.actionHistory.shift();
    });

    // --- 6. Interaction / Social Processing ---
    for (const actionKey in actionGroups) {
        const group = actionGroups[actionKey];
        if (group.length < 2) continue;

        group.forEach(adv => {
            const others = group.filter(o => o.id !== adv.id);
            if (others.length === 0) return;

            const partner = others[Math.floor(Math.random() * others.length)];
            const pairKey = `${Math.min(adv.id, partner.id)}-${Math.max(adv.id, partner.id)}`;
            
            if (metPairs.has(pairKey)) return;
            metPairs.add(pairKey);

            // Calculate social affinity
            const currentAffinity = ((adv.friendliness[partner.id] ?? 50) + (partner.friendliness[adv.id] ?? 50)) / 2;
            const isPositiveChance = currentAffinity > 50 ? 0.8 : 0.3;

            let pool = (interactionsByAction[actionKey] || interactionsByAction.default);
            pool = pool.filter(v => Math.random() < isPositiveChance ? v.positive : !v.positive);
            
            if (pool.length > 0) {
                const choice = pool[Math.floor(Math.random() * pool.length)];

                // Update friendliness
                adv.friendliness[partner.id] = Math.max(0, Math.min(100, (adv.friendliness[partner.id] ?? 50) + choice.deltaA));
                partner.friendliness[adv.id] = Math.max(0, Math.min(100, (partner.friendliness[adv.id] ?? 50) + choice.deltaB));

                // Update descriptions in history
                const deltaAStr = choice.deltaA >= 0 ? `+${choice.deltaA}` : choice.deltaA;
                const deltaBStr = choice.deltaB >= 0 ? `+${choice.deltaB}` : choice.deltaB;

                const msgA = t(choice.descKeyA, {a: adv.name, b: partner.name}) + ` [${partner.name}${deltaAStr}]`;
                const msgB = t(choice.descKeyB || choice.descKeyA, {a: partner.name, b: adv.name}) + ` [${adv.name}${deltaBStr}]`;

                const entryA = adv.actionHistory.find(e => e.day === gameState.day - 1);
                if (entryA) entryA.description += ` (${msgA})`;

                const entryB = partner.actionHistory.find(e => e.day === gameState.day - 1);
                if (entryB) entryB.description += ` (${msgB})`;
            }
        });
    }

    // Cleanup temporary daily data
    gameState.adventurers.forEach(adv => delete adv.dailyAction);

    // Final Report
    if (totalGuildGain !== 0) {
        const alertType = totalGuildGain > 0 ? "success" : "warning";
        const alertMsg = totalGuildGain > 0 
            ? (t('daily_guild_gain_positive', {amount: totalGuildGain}) || `今日のギルド収入: +${totalGuildGain}G`)
            : (t('daily_guild_gain_negative', {amount: totalGuildGain}) || `今日のギルド収支: ${totalGuildGain}G`);
        better_alert(alertMsg, alertType);
    }
}
// 補助関数：行動名を日本語で返す
// === 行動名の翻訳対応ヘルパー関数（新規追加）===
function getActionName(action) {
    const keys = {
        gather: 'action_gather',          // 採取
        alchemy: 'action_alchemy',        // 錬金
        blacksmith: 'action_blacksmith',  // 鍛冶
        tavern: 'action_tavern',          // 酒場
        hunting: 'action_hunting',        // 狩り
        guild_stay: 'action_guild_stay',  // ギルド滞在
        street_walk: 'action_street_walk',// 街散策
        none: 'action_none'               // （将来の保険用）
    };
    const key = keys[action];
    if (key) {
        return t(key) || action; // 翻訳キー未定義時もaction名でフォールバック
    }
    // 未知のactionが来た場合の安全策
    return action;
}


// === playDay() の更新版（ストーリークエストを戦闘レンダリングに統合） ===
function playDay(){
    const unassignedDefense = gameState.quests.find(q => q.defense && q.assigned.length === 0);
    if (unassignedDefense) {
        better_alert(t('guild_defense_no_adventurer'),"warning");
        return;
    }

    if (gameState.gameOver) return;

    if (gameState.isAdvancingDay) {
        better_alert(t('advancing_day_wait'), "warning");
        return;
    }
    gameState.isAdvancingDay = true;

    const evDay = gameState.day;
    gameState.day++;

// === 新規追加: 常駐冒険者の hunger を日初めに減少（クエスト中か否かで差分） + 飢餓死処理 ===
    const deadAdventurers = [];

    gameState.adventurers.forEach(adv => {
        if (adv.temp) return; // 一時的な冒険者は除外
        if (adv.hunger === undefined) adv.hunger = 1.0;

        // 減少量：クエスト中なら6%、クエスト中でなければ3%
        const hungerLoss = isAdventurerOnQuest(adv) ? 0.06 : 0.03;
        adv.hunger = Math.max(0, adv.hunger - hungerLoss);

        // hunger が0になったら死亡リストに追加
        if (adv.hunger <= 0) {
            deadAdventurers.push(adv);
        }
    });

    // 飢餓死処理（減少後にまとめて実行）
    if (deadAdventurers.length > 0) {
        let totalRepPenalty = 0;

        deadAdventurers.forEach(adv => {
            // リストから削除
            gameState.adventurers = gameState.adventurers.filter(a => a.id !== adv.id);

            // 死亡メッセージ
            better_alert(t('adventurer_starved_to_death', {name: adv.name}), "error");

            // Reputation ペナルティ（1人あたり -10）
            gameState.reputation = Math.max(0, gameState.reputation - 10);
            totalRepPenalty += 10;
        });

        // 複数死亡時のまとめメッセージ（Reputationペナルティも表示）
        if (deadAdventurers.length > 1) {
            better_alert(t('multiple_adventurers_starved', {count: deadAdventurers.length, penalty: totalRepPenalty}), "error");
        }
    }

    // === 新規追加: ギルドマスターへの好感度 < 30 の常駐冒険者の離脱処理（毎日10%確率）===
    const leavingAdventurers = [];
    let totalLeaveRepPenalty = 0;

    gameState.adventurers.forEach(adv => {
        if (adv.temp) return; // 一時冒険者は対象外

        // ギルドマスターへの好感度（playerFriendliness が未定義時は50と仮定）
        const playerFriendliness = adv.Friendliness ?? 50;

        if (playerFriendliness < 30 && Math.random() < 0.3) {
            leavingAdventurers.push(adv);
        }
    });

    if (leavingAdventurers.length > 0) {
        leavingAdventurers.forEach(adv => {
            // リストから削除
            gameState.adventurers = gameState.adventurers.filter(a => a.id !== adv.id);

            // 個別離脱メッセージ
            better_alert(t('adventurer_left_low_friendliness', {name: adv.name}), "warning");

            // Reputation ペナルティ（1人あたり -5）
            gameState.reputation = Math.max(0, gameState.reputation - 5);
            totalLeaveRepPenalty += 5;
        });

        // 複数離脱時のまとめメッセージ
        if (leavingAdventurers.length > 1) {
            better_alert(t('multiple_adventurers_left', {count: leavingAdventurers.length, penalty: totalLeaveRepPenalty}), "warning");
        }
    }

    handleLoans();

    // === 7日ごとの税金＋給与支払い処理 ===
    if (evDay % 7 === 0) {
        const tax = Math.floor((gameState.day - 1) * 10);

        // 常駐冒険者の給与計算
        const ranks = ['F', 'F+', 'E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+'];
        let totalSalary = 0;

        gameState.adventurers.forEach(adv => {
            if (adv.temp) return; // 一時冒険者は給与なし

            const index = ranks.indexOf(adv.rank || 'F');
            const salary = 50 + 50 * index * (index + 1) / 2;
            totalSalary += salary;
        });

        // 扣除 + アラート（税金と給与は別々に表示）
        if (tax > 0) {
            gameState.gold -= tax;
            better_alert(t('tax_day', { tax }), "warning");
        }

        if (totalSalary > 0) {
            gameState.gold -= totalSalary;
            better_alert(t('weekly_salary_paid', { amount: totalSalary }), "warning");
        }

        checkGameOver();
    }

    // 以下は変更なし（省略せずそのまま残す）
    for (let i = gameState.quests.length - 1; i >= 0; i--) {
        const q = gameState.quests[i];
        if (q.defense || q.type === 7 || q.type === 6) continue;

        if (q.type === 8 || q.type === 'trade') {
            if (q.assigned.length > 0) {
                if (!q.inProgress) q.inProgress = true;
                q.tradeRemainingDays--;
                if (q.tradeRemainingDays <= 0) {
                    processQuestOutcome(q, evDay, true, false);
                    gameState.quests.splice(i, 1);
                }
            } else {
                q.inProgress = false;
            }
            continue;
        }

        if (q.assigned.length > 0) {
            const teamStr = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'strength'), 0);
            const teamWis = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'wisdom'), 0);
            const teamDex = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'dexterity'), 0);
            const teamLuk = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'luck'), 0);
            const meetsAll = teamStr >= q.minStrength && teamWis >= q.minWisdom && teamDex >= q.minDexterity && teamLuk >= q.minLuck;
            if (!meetsAll) {
                processQuestOutcome(q, evDay, false, true);
                if (!q.training && !q.playerPosted) gameState.quests.splice(i, 1);
                continue;
            }
            let teamFocus = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), q.focusStat), 0);
            const excess = (teamFocus / q.minFocus) - 1;
            const prob = Math.min(0.8, 0.1 + Math.max(0, excess) * 0.2);
            let successToday = Math.random() < prob;
            if (q.training && q.assigned.length > 0) successToday = true;
            if (successToday) {
                processQuestOutcome(q, evDay, true, false);
                if (!q.training) gameState.quests.splice(i, 1);
            } else {
                if (!q.training) q.inProgress = true;
            }
        }
    }

    updateDailyPrices();
    gameState.quests.forEach(q => {
        if (!q.training && !q.playerPosted && q.type !== 8 && !q.defense && q.type !== 7 && q.type !== 6) q.daysLeft--;
    });
    for (let i = gameState.quests.length - 1; i >= 0; i--) {
        const q = gameState.quests[i];
        if (q.defense || q.training || q.playerPosted || q.type === 8 || q.type === 7 || q.type === 6) continue;
        if (q.daysLeft <= 0) {
            if (q.assigned.length > 0) {
                processQuestOutcome(q, evDay, false, false);
            } else {
                const penalty = 0.5 * q.difficulty;
                gameState.reputation -= penalty;
                better_alert(t('quest_expired', { desc: q.desc, penalty }), "error");
            }
            gameState.quests.splice(i, 1);
        }
    }

    const unassignedNonDefenseBattle = gameState.quests.filter(q => (q.type === 7 || q.type === 6) && q.assigned.length === 0);
    unassignedNonDefenseBattle.forEach(q => {
        processQuestOutcome(q, evDay, false, false);
        gameState.quests = gameState.quests.filter(quest => quest !== q);
    });

    let assignedBattleQuests = gameState.quests.filter(q => (q.defense || q.type === 7 || q.type === 6) && q.assigned.length > 0);

    if (assignedBattleQuests.length > 0) {
        gameState.quests = gameState.quests.filter(q => !(q.defense || q.type === 7 || q.type === 6));

        assignedBattleQuests.sort((a, b) => {
            if (a.defense && !b.defense) return -1;
            if (!a.defense && b.defense) return 1;
            if (a.type === 6 && b.type !== 6) return -1;
            if (b.type === 6 && a.type !== 6) return 1;
            return 0;
        });

        gameState.pendingBattles = assignedBattleQuests.slice(1);
        const currentQ = assignedBattleQuests[0];

        let titleText;
        if (currentQ.defense) {
            generateEnemies(currentQ);
            CurrentQuestType = 'defense';
            titleText = t('defense_battle_title', { desc: currentQ.desc });
        } else if (currentQ.type === 7) {
            generateDungeonEnemies(currentQ);
            CurrentQuestType = 'dungeon';
            titleText = t('dungeon_exploration_title', { floor: currentQ.floor });
        } else if (currentQ.type === 6) {
            generateStoryEnemies(currentQ);
            CurrentQuestType = 'story';
            const boss = currentQ.enemies[0];
            titleText = t('boss_battle_title', { boss: boss.name });
        }

        const team = currentQ.assigned.map(id => {
            const adv = findAdv(id);
            return adv ? {...adv} : null;
        }).filter(a => a);

        currentBattle = {
            quest: currentQ,
            day: evDay,
            team: team,
            enemies: currentQ.enemies.map(e => ({...e})),
            round: 0,
            actions: {},
            phase: 'setup',
            actionIndex: 0,
            combatants: []
        };

        document.getElementById('battleTitle').innerHTML = titleText;
        document.getElementById('battleModal').style.display = 'flex';
        renderBattle();
        startRound();
        if (CurrentQuestType === 'dungeon') {
            renderBattlebgm(CurrentQuestType, currentQ.floor);
        } else if (CurrentQuestType === 'story') {
            renderBattlebgm('boss');
        } else {
            renderBattlebgm(CurrentQuestType);
        }
        return;
    }

    if (!assignedBattleQuests.length) {
        processAdventurerDailyActions();
    }

    const overlay = document.getElementById('dayTransitionOverlay');
    const info = document.getElementById('transitionDayInfo');

    info.style.fontSize = '5.5em';
    info.style.fontWeight = 'bold';
    info.style.letterSpacing = '0.2em';
    info.style.textShadow = '0 0 20px rgba(255, 255, 255, 1)';
    info.style.transition = 'opacity 0.5s ease-in-out';
    info.innerText = t('day_label', { day: gameState.day });
    info.style.opacity = '0';

    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });

    setTimeout(() => {
        info.style.opacity = '1';

        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 600);

        setTimeout(() => {
            overlay.style.display = 'none';
            checkGameOver();
            showModal(evDay);

            gameState.isAdvancingDay = false;
            if (endDayBtn) {
                endDayBtn.disabled = false;
                endDayBtn.querySelector('span').innerText = endDayBtn.dataset.originalText || t('end_day_button');
                delete endDayBtn.dataset.originalText;
            }
        }, 1100);
    }, 500);
}

// ヘルパー関数（バッグ操作）
function addItemToBag(bag, name, qty) {
    const item = bag.items.find(i => i.name === name);
    if (item) item.qty += qty;
    else bag.items.push({name, qty});
}

function removeItemFromBag(bag, name, qty) {
    const item = bag.items.find(i => i.name === name);
    if (item) {
        item.qty -= qty;
        if (item.qty <= 0) bag.items = bag.items.filter(i => i.name !== name);
    }
}

function hasItemInBag(bag, name, qty) {
    const item = bag.items.find(i => i.name === name);
    return item && item.qty >= qty;
}



function renderBattlebgm(QuestType,floor=0){
        if (QuestType=="dungeon"){
            if(floor>=3){
        crossfadeTo('battleBgm2', 1500);
            }else{
                crossfadeTo('battleBgm', 1500);
            }
        }
        else if(QuestType=='boss'){
        crossfadeTo('storyBgm', 1500);
        }
        else{
        crossfadeTo('battleBgm', 1500);
        }

}


// === renderBattle() の更新版（ストーリー対応） ===
function renderBattle() {
    if (!currentBattle) {
        // ===== 追加: 戦闘終了時（currentBattle === null）のクリーンアップ =====
        const tooltip = document.getElementById('statusTooltip');
        if (tooltip) tooltip.style.display = 'none';
        return;
    }

    // ===== 背景画像を #battleModal 自体に適用（外側オーバーレイに設定）=====
    const battleModal = document.getElementById('battleModal');
    if (battleModal) {
        const backgrounds = {
            defense: 'Images/Street.jpg',
            dungeon: 'Images/DungeonQuest_Background.jpg',
            story: 'Images/Street.jpg'
        };
        const bgUrl = backgrounds[CurrentQuestType] || backgrounds.defense;

        battleModal.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bgUrl}')`;
        battleModal.style.backgroundSize = 'cover';
        battleModal.style.backgroundPosition = 'center';
        battleModal.style.backgroundRepeat = 'no-repeat';

        battleModal.style.position = 'fixed';
        battleModal.style.inset = '0';

        // ===== 追加: モバイルでのテキスト選択・コンテキストメニュー完全無効化 =====
        battleModal.style.userSelect = 'none';
        battleModal.style.webkitUserSelect = 'none';
        battleModal.style.msUserSelect = 'none';
        battleModal.style.MozUserSelect = 'none';
        battleModal.style.webkitTouchCallout = 'none';
        battleModal.oncontextmenu = () => false;
    }

    const modalContent = document.querySelector('#battleModal .modal-content');
    if (modalContent) {
        modalContent.style.background = 'transparent';
        modalContent.style.border = 'none';
        modalContent.style.boxShadow = 'none';
    }

    if (!currentBattle.log) currentBattle.log = [];
    if (!currentBattle.round) currentBattle.round = 1;
    if (!currentBattle.phase) currentBattle.phase = 'executing';

    let topHtml = '<div class="battle-top"><div id="battleLog">';
    currentBattle.log.forEach(log => topHtml += '<p>' + log + '</p>');
    topHtml += '</div></div>';

    let enemiesHtml = '<div class="battle-section"><div class="battle-enemies">';

    currentBattle.enemies.forEach(e => {
        const isDead = e.hp <= 0;
        const hpPct = isDead ? 0 : (e.hp / e.maxHp) * 100;
        const apPct = isDead ? 0 : ((e.currentAp || 0) / 5) * 100;

        const selectableClass = !isDead && currentBattle.selecting && currentBattle.selecting.mode === 'enemy' ? 'selectable-target' : '';
        const isCurrent = currentBattle.currentActor && currentBattle.currentActor.id === e.id;
        const highlightClass = isCurrent ? 'current-enemy' : '';

        const imgFilter = isDead ? 'grayscale(100%) opacity(0.6)' : 'none';
        const deadOverlay = isDead ? '<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:3em; pointer-events:none; text-shadow:0 0 10px black;">☠️</div>' : '';

        enemiesHtml += `
            <div class="battle-enemy ${selectableClass} ${highlightClass}" id="div_${e.id}" data-id="${e.id}" 
                 ${selectableClass ? `onclick="selectTarget('${e.id}')"` : ''} 
                 style="position:relative; ${isDead ? 'opacity:0.7;' : ''}">
                <img src="${e.image}" class="enemy-img" alt="${e.name}" style="filter:${imgFilter};" draggable="false">
                ${deadOverlay}
                ${e.name}
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                HP ${Math.floor(e.hp)}/${e.maxHp}
                ${!isDead ? `
                <div class="progress-bar"><div class="progress-fill ap-fill" style="width:${apPct}%"></div></div>
                AP ${e.currentAp || 0}/5
                ` : ''}
            </div>
        `;
    });
    enemiesHtml += '</div></div>';

    let teamHtml = '<div class="battle-section"><div class="battle-team">';

    currentBattle.team.forEach(adv => {
        const isDead = adv.hp <= 0;
        const hpPct = isDead ? 0 : (adv.hp / adv.maxHp) * 100;
        const apPct = isDead ? 0 : ((adv.currentAp || 0) / 5) * 100;

        const selectableClass = !isDead && currentBattle.selecting && currentBattle.selecting.mode === 'ally' ? 'selectable-target' : '';
        const isCurrent = currentBattle.currentActor && currentBattle.currentActor.id === adv.id && !isDead;
        const highlightClass = isCurrent ? 'current-actor' : '';

        const imgFilter = isDead ? 'grayscale(100%) opacity(0.6)' : 'none';
        const deadOverlay = isDead ? '<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:3em; pointer-events:none; text-shadow:0 0 10px black;">☠️</div>' : '';

        let actionHtml = '';
        if (isCurrent && !adv.isEnemy && currentBattle.phase === 'executing') {
            actionHtml = getActionButtonsHtml(adv);
        }

        teamHtml += `
            <div class="battle-ally ${selectableClass} ${highlightClass}" id="div_${adv.id}" data-id="${adv.id}" 
                 ${selectableClass ? `onclick="selectTarget('${adv.id}')"` : ''} 
                 style="position:relative; ${isDead ? 'opacity:0.7;' : ''}">
                <img src="Images/${adv.image}" class="adventurer-img" alt="${adv.name}" style="filter:${imgFilter};" draggable="false">
                ${deadOverlay}
                ${getNameHtml(adv)}
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                HP ${Math.floor(adv.hp)}/${adv.maxHp}
                ${!isDead ? `
                <div class="progress-bar"><div class="progress-fill ap-fill" style="width:${apPct}%"></div></div>
                AP ${adv.currentAp || 0}/5
                ` : '<div style="color:#ff4444; font-weight:bold; margin-top:8px;">Dead</div>'}
                ${actionHtml ? `<div class="ally-actions">${actionHtml}</div>` : ''}
            </div>
        `;
    });
    teamHtml += '</div></div>';

    const battleContent = document.getElementById('battleContent');
    battleContent.innerHTML = enemiesHtml + teamHtml;

    battleContent.style.background = 'transparent';
    battleContent.style.pointerEvents = 'auto';

    // ===== 敵ターン時のクリックハンドラー（連打防止はそのまま）=====
    if (currentBattle.phase === 'executing' && currentBattle.currentActor && currentBattle.currentActor.isEnemy) {
        battleContent.style.cursor = 'pointer';
        battleContent.onclick = null;
        battleContent.onclick = function(e) {
            e.stopPropagation();
            battleContent.onclick = null;
            battleContent.style.cursor = '';
            skipTurn();
        };
    } else {
        battleContent.style.cursor = '';
        battleContent.onclick = null;
    }

    // ===== Status Tooltip: 高速化 & カーソル直近表示 =====
    let tooltip = document.getElementById('statusTooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'statusTooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(20, 20, 40, 0.92)';
        tooltip.style.color = '#ffffff';
        tooltip.style.padding = '10px 14px';
        tooltip.style.borderRadius = '10px';
        tooltip.style.border = '2px solid #ffd700';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '10000';
        tooltip.style.display = 'none';
        tooltip.style.fontSize = '13px';
        tooltip.style.fontWeight = '600';
        tooltip.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.8)';
        tooltip.style.maxWidth = '280px';
        tooltip.style.textAlign = 'left';
        tooltip.style.backdropFilter = 'blur(4px)';
        tooltip.style.lineHeight = '1.4';
        battleModal.appendChild(tooltip);
    } else {
        if (tooltip.parentNode !== battleModal) {
            battleModal.appendChild(tooltip);
        }
    }

    // Add listeners only once
    if (!battleContent.dataset.tooltipListenersAdded) {
        battleContent.dataset.tooltipListenersAdded = 'true';

        let hoverTimer = null;
        let holdTimer = null;
        let currentHoverTarget = null;
        let currentHoldTarget = null;
        let holdStartX = 0;
        let holdStartY = 0;

        const showTooltip = (e, target) => {
            if (!target || !target.dataset.id) return;
            const id = target.dataset.id;
            const actor = [...currentBattle.team, ...currentBattle.enemies].find(a => a.id.toString() === id);
            if (!actor) return;

            const getStat = (stat) => {
                if (!actor.isEnemy && typeof getEffectiveStat === 'function') {
                    return getEffectiveStat(actor, stat);
                }
                return actor[stat] || 0;
            };

            const str = getStat('strength');
            const wis = getStat('wisdom');
            const dex = getStat('dexterity');
            const luc = getStat('luck');
            const def = actor.defense || 0;
            const crit = actor.critChance || 0;

            const evasion = !actor.isEnemy 
                ? Math.min(80, Math.floor(luc / 10) + (actor.activeEvadeBonus ? 15 : 0))
                : 'N/A';

            let activeEffects = actor.activeEffects ? [...actor.activeEffects] : [];

            if (actor.buffs && Array.isArray(actor.buffs)) {
                actor.buffs.forEach(buff => {
                    const name = buff.name || 'Unknown Buff';
                    const type = buff.type || 'neutral';
                    if (!activeEffects.some(e => e.name === name)) {
                        activeEffects.push({ name, type });
                    }
                });
            }

            if (!actor.isEnemy && currentBattle.activeEffects && Array.isArray(currentBattle.activeEffects)) {
                currentBattle.activeEffects.forEach(globalEffect => {
                    if (globalEffect.global && !activeEffects.some(e => e.name === globalEffect.name)) {
                        activeEffects.push(globalEffect);
                    }
                });
            }

            let html = `
                <div style="text-align:center; margin-bottom:6px; font-size:14px; color:#ffd700;">${actor.name}</div>
                STR: ${str}<br>
                WIS: ${wis}<br>
                DEX: ${dex}<br>
                LUC: ${luc}<br>
                Defense: ${def}<br>
                Crit %: ${crit}%<br>
                Evade %: ${evasion}
            `;

            if (activeEffects.length > 0 || actor.stunnedRounds > 0 || currentBattle.protectRounds > 0) {
                html += `<div style="margin-top:8px; font-weight:bold; color:#ffd700;">Active Effects:</div>`;

                activeEffects.forEach(effect => {
                    let displayName = effect.name;
                    let suffix = '';

                    const noCountNames = [
                        'Defense Up (25% damage reduction)',
                        'Counter Ready',
                        'Evade Bonus (+15%)'
                    ];
                    if (noCountNames.includes(effect.name)) {
                        // No suffix
                    } 
                    else if (effect.name.includes('Team Protected')) {
                        if (currentBattle.protectRounds > 0) {
                            suffix = ` (${currentBattle.protectRounds} round${currentBattle.protectRounds > 1 ? 's' : ''} left)`;
                        }
                    }
                    else if (effect.duration > 0) {
                        suffix = ` (${effect.duration} turn${effect.duration > 1 ? 's' : ''} left)`;
                    }

                    displayName += suffix;

                    const color = effect.type === 'positive' ? '#8fff8f' :
                                  effect.type === 'negative' ? '#ff8888' : '#cccccc';
                    html += `<div style="color:${color}; margin-left:8px;">• ${displayName}</div>`;
                });

                if (actor.stunnedRounds > 0) {
                    const color = '#ff8888';
                    html += `<div style="color:${color}; margin-left:8px;">• Stunned (${actor.stunnedRounds} turn${actor.stunnedRounds > 1 ? 's' : ''} left)</div>`;
                }
            }

            tooltip.innerHTML = html;

            // ===== 変更: カーソル直近に配置（右20px、上10pxオフセット）=====
            let baseX, baseY;
            if (e && e.pageX !== undefined) {
                baseX = e.pageX;
                baseY = e.pageY;
            } else {
                baseX = holdStartX;
                baseY = holdStartY;
            }

            tooltip.style.left = (baseX + 20) + 'px';
            tooltip.style.top = (baseY -300) + 'px';
            tooltip.style.display = 'block';
        };

        const hideTooltip = () => {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
                hoverTimer = null;
            }
            if (holdTimer) {
                clearTimeout(holdTimer);
                holdTimer = null;
            }
            tooltip.style.display = 'none';
            currentHoverTarget = null;
            currentHoldTarget = null;
        };

        // Hover (PC) - 遅延を500msに短縮
        battleContent.addEventListener('mouseover', (e) => {
            if (e.pointerType === 'mouse' || !e.pointerType) {
                const target = e.target.closest('.battle-ally, .battle-enemy');
                if (target && target !== currentHoverTarget) {
                    currentHoverTarget = target;
                    if (hoverTimer) clearTimeout(hoverTimer);
                    hoverTimer = setTimeout(() => {
                        if (currentHoverTarget === target) {
                            showTooltip(e, target);
                        }
                    }, 500);  // ← 1000ms → 500ms
                }
            }
        });

        // マウス移動時にツールチップ追従（同じオフセット）
        battleContent.addEventListener('mousemove', (e) => {
            if ((e.pointerType === 'mouse' || !e.pointerType) && tooltip.style.display === 'block') {
                tooltip.style.left = (e.pageX + 20) + 'px';
                tooltip.style.top = (e.pageY - 300) + 'px';
            }
        });

        battleContent.addEventListener('mouseout', (e) => {
            if (e.pointerType === 'mouse' || !e.pointerType) {
                const related = e.relatedTarget;
                if (!related || !related.closest('.battle-ally, .battle-enemy')) {
                    hideTooltip();
                }
            }
        });

        // Long press (touch) - 遅延を400msに短縮 + preventDefault継続
        battleContent.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'touch') {
                e.preventDefault();

                const target = e.target.closest('.battle-ally, .battle-enemy');
                if (!target) return;

                currentHoldTarget = target;
                holdStartX = e.pageX;
                holdStartY = e.pageY;

                holdTimer = setTimeout(() => {
                    if (currentHoldTarget === target) {
                        showTooltip(null, target);
                    }
                }, 400);  // ← 500ms → 400ms
            }
        });

        battleContent.addEventListener('pointermove', (e) => {
            if (holdTimer && e.pointerType === 'touch') {
                const dx = e.pageX - holdStartX;
                const dy = e.pageY - holdStartY;
                if (Math.sqrt(dx * dx + dy * dy) > 30) {
                    clearTimeout(holdTimer);
                    holdTimer = null;
                    currentHoldTarget = null;
                }
            }
        });

        battleContent.addEventListener('pointerup', hideTooltip);
        battleContent.addEventListener('pointercancel', hideTooltip);
        battleContent.addEventListener('pointerleave', hideTooltip);
    }
}


function getCharType(adv) {
    // Specific character name overrides (priority: name > image prefix > stats)
    if (adv.name) {
        const nameLower = adv.name.toLowerCase().trim();
        const nameExact = adv.name.trim();

        if (nameLower === 'Luna' || nameExact === 'ルナ') {
            return 'WIS';
        }
        if (nameLower === 'Kaito' || nameExact === 'カイト') {
            return 'STR';
        }
    }

    // Image filename prefix checks (case-insensitive)
    const img = (adv.image || '').toLowerCase();
    if (img.includes('str_')) return 'STR';
    if (img.includes('wis_')) return 'WIS';
    if (img.includes('dex_')) return 'DEX';
    if (img.includes('luc_')) return 'LUC';

    // Fallback: highest stat (with tie-breaker preferring STR > WIS > DEX > LUC)
    const stats = {
        strength: getEffectiveStat(adv, 'strength'),
        wisdom: getEffectiveStat(adv, 'wisdom'),
        dexterity: getEffectiveStat(adv, 'dexterity'),
        luck: getEffectiveStat(adv, 'luck')
    };

    let max = -1;
    let type = 'STR';

    if (stats.strength > max) {
        max = stats.strength;
        type = 'STR';
    }
    if (stats.wisdom > max) {
        max = stats.wisdom;
        type = 'WIS';
    }
    if (stats.dexterity > max) {
        max = stats.dexterity;
        type = 'DEX';
    }
    if (stats.luck > max) {
        max = stats.luck;       // Fixed: was missing max update
        type = 'LUC';
    }

    return type;
}

function getActionButtonsHtml(adv) {
    const type = getCharType(adv);
    const canAfford = (cost) => cost <= 0 || (adv.currentAp || 0) >= cost;

    const skills = [];

    if (type === 'LUC') {
        skills.push({ action: 'luc_light', icon: 'LUC_lightattack_icon.jpg', desc: 'Light Attack (1 AP, deals 25% LUC damage)', cost: 1 });
        skills.push({ action: 'blessing', icon: 'LUC_Blessing_icon.jpg', desc: 'Fortune’s Blessing (3 AP, Critical chance +40%)', cost: 3 }); // Assume you have this or fallback
        skills.push({ action: 'evade', icon: 'LUC_Evade_icon.jpg', desc: 'Evade with Luck (0 AP, Evade chance +15%)', cost: 0 }); // Assume
        skills.push({ action: 'fortune', icon: 'LUC_heavyattack_icon.jpg', desc: 'Fortune’s Strike (5 AP, 50% chance deals 300% LUC damage)', cost: 5 });
    } else {
        skills.push({ action: 'light', icon: `${type}_lightattack_icon.jpg`, desc: 'Light Attack (1 AP, deals 100% STR/WIS damage, 50% DEX damage)', cost: 1 });
        skills.push({ action: 'heavy', icon: `${type}_heavyattack_icon.jpg`, desc: 'Heavy Attack (3 AP, deals 300% STR/WIS damage, 150% DEX damage)', cost: 3 });
        skills.push({ action: 'defense', icon: 'Defense_icon.jpg', desc: 'Defense (+1 AP, block 25% damage)', cost: -1 });
        skills.push({ action: 'counter', icon: 'Counter_icon.jpg', desc: 'Counter Attack (2 AP, evade next attack, deals damage back to attacker)', cost: 2 }); // Assume Counter_icon.jpg or add

        if (type === 'STR') {
            skills.push({ action: 'protect', icon: 'STR_protection_icon.jpg', desc: 'Protect (3 AP, block 50% damage for whole team [2 rounds])', cost: 3 });
        } else if (type === 'WIS') {
            skills.push({ action: 'explosion', icon: 'WIS_explosion_icon.jpg', desc: 'Explosion (5 AP, deals 150% WIS damage to all enemies)', cost: 5 });
        } else if (type === 'DEX') {
            skills.push({ action: 'stunning', icon: 'DEX_stunning_icon.png', desc: 'Stunning Strike (3 AP), deal 100% DEX damage, stun enemy for 1 round', cost: 3 }); // Assume you add this
        }
    }

    // Horizontal row of square icon buttons
    let html = '<div class="skill-grid">';

    skills.forEach(skill => {
        const disabled = !canAfford(skill.cost);
        html += `
            <button class="skill-btn" 
                    title="${skill.desc}" 
                    ${disabled ? 'disabled' : ''} 
                    onclick="${disabled ? '' : `chooseAction('${skill.action}')`}">
                <img src="Images/${skill.icon}" alt="${skill.desc}">
            </button>
        `;
    });

    html += '</div>';

    return html;
}

function chooseAction(actionType) {
    const actor = currentBattle.currentActor;
    if (!actor || actor.isEnemy) return;

    const costs = {
        light: 1, heavy: 3, defense: -1, counter: 2,
        protect: 3, explosion: 5, stunning: 3,
        luc_light: 1, blessing: 3, evade: 0, fortune: 5
    };
    const cost = costs[actionType] || 0;
    if (cost > 0 && (actor.currentAp || 0) < cost) return;

    const needsTarget = ['light', 'heavy', 'stunning', 'fortune'].includes(actionType);
    const needsAllyTarget = actionType === 'blessing';
    const noTarget = ['defense', 'counter', 'protect', 'explosion', 'evade'];

    if (noTarget.includes(actionType)) {
        executeActorAction(actor, { type: actionType });
    } else {
        currentBattle.selecting = {
            action: actionType,
            mode: needsAllyTarget ? 'ally' : 'enemy',
            isHeavy: ['heavy', 'fortune'].includes(actionType)
        };
        renderBattle();
    }
}

function selectTarget(targetId) {
    // Do NOT force parseInt - enemy IDs are strings like "enemy_22_0"
    // Use loose equality (==) in find() to match both string and number IDs safely

    // Store currentBattle locally to avoid mid-function changes
    const battle = currentBattle;
    
    // Check if battle and selecting exist
    if (!battle || !battle.selecting) {
        console.warn(`selectTarget: Aborted - battle=${battle}, selecting=${battle?.selecting}`);
        return;
    }

    const actor = battle.currentActor;
    const actionType = battle.selecting.action;
    let target = null;

    // Find target based on mode - use loose equality (==) to handle string/number mismatch
    if (battle.selecting.mode === 'enemy') {
        target = battle.enemies.find(e => e.id == targetId && e.hp > 0);
    } else if (battle.selecting.mode === 'ally') {
        target = battle.team.find(a => a.id == targetId && a.hp > 0);
    }

    if (!target) {
        console.warn(`selectTarget: No valid target found for targetId=${targetId}`);
        // Clear selecting to allow next turn
        battle.selecting = null;
        // Trigger render to update UI
        renderBattle();
        return;
    }

    try {
        // Execute action
        executeActorAction(actor, { type: actionType, target: target });

        // Only clear selecting if battle still exists and hasn't been reset
        if (currentBattle === battle && battle.selecting) {
            battle.selecting = null;
        } else {
            console.warn(`selectTarget: Battle state changed during execution (currentBattle=${currentBattle})`);
        }
    } catch (error) {
        console.error(`selectTarget: Error in executeActorAction - ${error.message}`, error);
        // Clear selecting to prevent lockup
        if (currentBattle === battle && battle.selecting) {
            battle.selecting = null;
        }
        // Trigger render to recover UI
        renderBattle();
    }

    // Update UI after action

}

function executeActorAction(actor, action) {
    const costs = {
        light: 1, heavy: 3, defense: -1, counter: 2,
        protect: 3, explosion: 5, stunning: 3,
        luc_light: 1, blessing: 3, evade: 0, fortune: 5
    };
    const cost = costs[action.type] || 0;

    actor.currentAp = (actor.currentAp || 0) - cost;
    actor.currentAp = Math.min(5, Math.max(0, actor.currentAp));

    let log = `${actor.name} uses ${action.type.replace('_', ' ')}`;
    console.log(log);
    // Collect all popup infos from this action
    const popupInfos = [];

    // Initialize activeEffects arrays if missing
    if (!actor.activeEffects) actor.activeEffects = [];
    if (!currentBattle.activeEffects) currentBattle.activeEffects = [];

    // Helper to add/replace an effect on a target (actor or enemy)
    const addEffect = (target, name, effectType, duration = null) => {
        if (!target.activeEffects) target.activeEffects = [];
        // Remove any existing effect with the same name
        target.activeEffects = target.activeEffects.filter(e => e.name !== name);
        target.activeEffects.push({ name, type: effectType, duration });
    };

    // Helper for global (battle-wide) effects
    const addGlobalEffect = (name, effectType, duration = null) => {
        currentBattle.activeEffects = currentBattle.activeEffects.filter(e => e.name !== name);
        currentBattle.activeEffects.push({ name, type: effectType, duration, global: true });
    };

    // Determine character type and gender for sound selection
    const charType = getCharType(actor);
    const sex = actor.sex || (function() {
        if (actor.name === 'カイト') return 'M';
        if (actor.name === 'ルナ') return 'F';
        if (actor.gender === 'male') return 'M';
        if (actor.gender === 'female') return 'F';
        const imgLower = (actor.image || '').toLowerCase();
        if (imgLower.includes('(f)') || imgLower.includes('_f')) return 'F';
        if (imgLower.includes('(m)') || imgLower.includes('_m')) return 'M';
        return 'N';
    })();

    // Play sound based on action and gender/type
    let soundToPlay = null;

    switch (action.type) {
        case 'defense':
            addEffect(actor, 'Defense Up (25% damage reduction)', 'positive', 1);
            actor.activeDefense = true;
            log += '! (25% damage reduction until next turn)';
            if (sex === 'F') soundToPlay = defenseFSound;
            else if (sex === 'M') soundToPlay = defenseMSound;
            break;

        case 'counter':
            addEffect(actor, 'Counter Ready', 'positive', 1);
            actor.activeCounter = true;
            log += '! (ready to counter)';
            if (sex === 'F') soundToPlay = counterFSound;
            else if (sex === 'M') soundToPlay = counterMSound;
            break;

        case 'evade':
            addEffect(actor, 'Evade Bonus (+15%)', 'positive', 1);
            actor.activeEvadeBonus = true;
            log += '! (+15% evasion until next turn)';
            soundToPlay = lucEvadeSound;
            break;

        case 'protect':
            addGlobalEffect('Team Protected (50% damage reduction)', 'positive', 2);
            currentBattle.protectRounds = 2;
            log += '! (team 50% damage reduction for 2 rounds)';
            soundToPlay = strProtectSound;
            break;

        case 'blessing':
            if (action.target) {
                addEffect(action.target, 'Blessing (Crit +40%)', 'positive'); // No duration (lasts until battle end or cleared elsewhere)
                action.target.critChance = Math.min(50, (action.target.critChance || 0) + 40);
                log += ` on ${action.target.name}! (crit +40%, total ${action.target.critChance}%)`;
            } else {
                log += ' but no target was selected!';
            }
            soundToPlay = lucBlessingSound;
            break;

        case 'explosion':
            log += '!';
            soundToPlay = wisExplosionSound;

            // AoEダメージ適用 + 各ターゲットに爆発エフェクト
            currentBattle.enemies.filter(e => e.hp > 0).forEach(e => {
                const infos = calculateAndApplyDamage(actor, e, { basePercent: 150, isWis: true, isAoE: true });
                popupInfos.push(...infos);

                // ダメージが入ったターゲットに即エフェクト（ポップアップと同期）
                setTimeout(() => {
                    const div = document.getElementById(`div_${e.id}`);
                    if (div && infos.some(i => !i.miss && typeof i.dmg === 'number' && i.dmg > 0)) {
                        playExplosionEffect(div);
                    }
                }, 0);
            });
            break;

        default:
            if (!action.target) {
                log += ' but has no target!';
                break;
            }
            let basePercent = 100;
            let isHeavy = false;
            let isLuc = false;

            if (action.type === 'heavy') basePercent = 300, isHeavy = true;
            if (action.type === 'stunning') basePercent = 200;
            if (action.type === 'luc_light') basePercent = 25, isLuc = true;
            if (action.type === 'fortune') {
                if (Math.random() < 0.5) {
                    basePercent = 300;
                    isLuc = true;
                } else {
                    addBattleLog(`${actor.name}'s Fortune’s Strike misses completely!`);
                    basePercent = 0;
                }
            }

            const infos = calculateAndApplyDamage(actor, action.target, { basePercent, isHeavy, isLuc });
            popupInfos.push(...infos);

            if (action.type === 'stunning' && action.target.hp > 0) {
                addEffect(action.target, 'Stunned', 'negative', 1);
                action.target.stunnedRounds = 1;
                addBattleLog(`${action.target.name} is stunned for 1 turn!`);
            }

            if (action.type === 'luc_light' && Math.random() < 0.5) {
                actor.currentAp = Math.min(5, actor.currentAp + 2);
                addBattleLog(`${actor.name} gets lucky and refunds 2 AP! (AP: ${actor.currentAp})`);
            }

            // Sound selection for attacks
            if (action.type === 'light' || action.type === 'luc_light') {
                if (charType === 'STR') soundToPlay = strLightSound;
                else if (charType === 'WIS') soundToPlay = wisLightSound;
                else if (charType === 'DEX') soundToPlay = dexLightSound;
                else if (charType === 'LUC') soundToPlay = lucLightSound;
            } else if (action.type === 'heavy') {
                if (charType === 'STR') soundToPlay = strHeavySound;
                else if (charType === 'WIS') soundToPlay = wisHeavySound;
                else if (charType === 'DEX') soundToPlay = dexHeavySound;
                else if (charType === 'LUC') soundToPlay = lucHeavySound;
            } else if (action.type === 'stunning') {
                soundToPlay = dexStunningSound;
            } else if (action.type === 'fortune') {
                soundToPlay = lucFortuneSound;
            }

            break;
    }

    // Play the selected sound if any
    if (soundToPlay) {
        soundToPlay.currentTime = 0;
        soundToPlay.play().catch(e => console.log('Audio play error:', e));
    }

    addBattleLog(log);

setTimeout(() => {
        popupInfos.forEach(info => {
            const div = document.getElementById(`div_${info.targetId}`);
            if (div) {
                if (action.type !== 'explosion' && !info.miss && typeof info.dmg === 'number' && info.dmg > 0) {
                                    playSlashEffect(div, actor);
                                }
                showDamagePopup(div, info.dmg, info.miss, info.crit);
            }
        });
    }, 0);
    const delay = popupInfos.length > 0 ? 1000 : 0;

    setTimeout(() => {
        nextTurn();
    }, delay);
}

/* ==================================================
   修正版: playSlashEffect（z-index競合解消 + 表示確認強化）
   ================================================== */
/* ==================================================
   デバッグ強化版: playSlashEffect（問題特定用）
   - console.log を追加して実行フローを追跡
   - 一時的に赤半透明背景 + ボーダー追加（overlayが作成・表示されているか視覚確認）
   - 初回フレームで静止表示テスト（アニメーション前に1フレーム目が確実に見える）
   - 画像読み込みエラーを検知（background-image適用後にcomputedStyleで確認）
   - アニメーション終了時にログ出力
   ================================================== */
/* ==================================================
   さらなるデバッグ強化版: playSlashEffect（画像読み込み問題特定 + 代替画像テスト）
   - 既知の正常画像（例: ルナの画像）でテスト可能に切り替えスイッチ追加
   - Imageオブジェクトでプリロード + onload/onerrorログ
   - computedStyleチェックを複数回（タイミングずれ対策）
   - 赤デバッグ背景を維持（overlay存在確認）
   ================================================== */
/* ==================================================
   最終修正版: playSlashEffect（!important で強制適用 + デバッグログ簡略化）
   - background-image/background-size/background-position を !important で設定
     → ゲームのCSSがbackgroundを上書きしている可能性を完全排除
   - 画像プリロード維持（ロード成功確認）
   - デバッグ赤背景削除（本番用クリーン）
   - computedStyleチェック維持（適用確認）
   ================================================== */
/* ==================================================
   最終版: playSlashEffect（ピクセル位置指定 + 中央配置 + スケールアップ）
   - background-size をピクセル指定（正確なフレーム切り抜き）
   - background-position を calc(50% - halfFrame - offset) で中央配置
   - スラッシュを大きく見せるため 200% スケール（調整可能）
   - !important 維持（上書き対策）
   - 画像ロード成功後のみアニメ開始
   ================================================== */
function playSlashEffect(parentElement, attacker) {
    if (!parentElement || !attacker) return;

    // 既存オーバーレイ完全削除
    parentElement.querySelectorAll('.slash-overlay').forEach(el => el.remove());

    const img = parentElement.querySelector('img.enemy-img, img.adventurer-img');
    if (!img) return;

    // 画像の相対位置・サイズ取得（親relative前提）
    const rect = img.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();
    const relativeTop = rect.top - parentRect.top;
    const relativeLeft = rect.left - parentRect.left;
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    const overlay = document.createElement('div');
    overlay.className = 'slash-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = `${relativeTop}px`;
    overlay.style.left = `${relativeLeft}px`;
    overlay.style.width = `${imgWidth}px`;
    overlay.style.height = `${imgHeight}px`;
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1002';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.15s ease';

    parentElement.appendChild(overlay);

    // 攻撃者タイプ固定色
    const charType = getCharType(attacker) || 'STR';
    const rowMap = {
        'STR': 7,  // 赤系
        'WIS': 1,  // 青/紫系
        'DEX': 3,  // 緑系
        'LUC': 0   // 黄/オレンジ系
    };
    const selectedRow = rowMap[charType] ?? 0;

    const frameW = 64;
    const frameH = 64;
    const sweepFactor = 1.8;  // スウィープ幅（1.8で画像幅の1.8倍、派手）
    const scale = imgWidth / frameW * sweepFactor;
    const sheetW = 896 * scale;
    const sheetH = 576 * scale;

    const imageUrl = 'Images/slash_effects.png';

    const preloadImg = new Image();
    preloadImg.onload = () => {
        overlay.style.setProperty('background-image', `url('${imageUrl}')`, 'important');
        overlay.style.setProperty('background-size', `${sheetW}px ${sheetH}px`, 'important');

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            startAnimation(selectedRow, scale);
        });
    };
    preloadImg.onerror = () => console.error('[Slash] Load failed');
    preloadImg.src = imageUrl;

    function startAnimation(row, scale) {
        const totalFrames = 14;
        const frameTime = 38;  // 高速キレ良く
        let currentFrame = 0;
        const offsetY = row * frameH * scale;

        // 中央基準オフセット
        const centerX = imgWidth / 2;
        const centerY = imgHeight / 2;
        const halfSlashW = frameW * scale / 2;
        const halfSlashH = frameH * scale / 2;

        const animate = () => {
            const offsetX = currentFrame * frameW * scale;
            const posX = centerX - halfSlashW - offsetX;  // 左から右へスウィープ
            const posY = centerY - halfSlashH - offsetY;

            overlay.style.setProperty('background-position', `${posX}px ${posY}px`, 'important');

            currentFrame++;
            if (currentFrame < totalFrames) {
                setTimeout(animate, frameTime);
            } else {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        };

        animate();
    }
}

/* ==================================================
   playExplosionEffect（slash構造完全模倣 + 爆発専用中央固定アニメ）
   - slashと同じ計算式/ループ使用（動作安定）
   - offsetX削除 → 中央固定でフレーム拡散（静止/フラッシュ解消）
   - scale上げで派手爆発
   ================================================== */
/* ==================================================
   playExplosionEffect（slash構造模倣 + 中央拡散アニメーション修正）
   - slashと同じoffsetXシフト追加（フレーム変化でアニメ）
   - posX = centerX - halfFrameW - offsetX で中央固定拡散
   - scale上げで派手爆発
   - 静止問題完全解消（フレームシフトでアニメーション発生）
   ================================================== */
function playExplosionEffect(parentElement) {
    if (!parentElement) return;

    // 既存オーバーレイ完全削除
    parentElement.querySelectorAll('.explosion-overlay').forEach(el => el.remove());

    const img = parentElement.querySelector('img.enemy-img, img.adventurer-img');
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();
    const relativeTop = rect.top - parentRect.top;
    const relativeLeft = rect.left - parentRect.left;
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    const overlay = document.createElement('div');
    overlay.className = 'explosion-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = `${relativeTop}px`;
    overlay.style.left = `${relativeLeft}px`;
    overlay.style.width = `${imgWidth}px`;
    overlay.style.height = `${imgHeight}px`;
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1002';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.15s ease';

    parentElement.appendChild(overlay);

    const row = 0;  // 固定最初の行
    const frameW = 64;
    const frameH = 64;
    const sweepFactor = 1.5;  // 爆発専用: 超派手サイズ
    const scale = imgWidth / frameW * sweepFactor;
    const sheetW = 704 * scale;
    const sheetH = 576 * scale;

    const imageUrl = 'Images/explosion_effects.png';

    const preloadImg = new Image();
    preloadImg.onload = () => {
        overlay.style.setProperty('background-image', `url('${imageUrl}')`, 'important');
        overlay.style.setProperty('background-size', `${sheetW}px ${sheetH}px`, 'important');

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            startAnimation(row, scale);
        });
    };
    preloadImg.onerror = () => console.error('[Explosion] Load failed');
    preloadImg.src = imageUrl;

    function startAnimation(row, scale) {
        const totalFrames = 11;
        const frameTime = 50;  // ゆったり拡散
        let currentFrame = 0;
        const offsetY = row * frameH * scale;

        const centerX = imgWidth / 2;
        const centerY = imgHeight / 2;
        const halfFrameW = frameW * scale / 2;
        const halfFrameH = frameH * scale / 2;

        const animate = () => {
            const offsetX = currentFrame * frameW * scale;
            // slash模倣 + 中央固定拡散: offsetXフルシフトでフレーム変化（アニメ発生）
            const posX = centerX - halfFrameW - offsetX;
            const posY = centerY - halfFrameH - offsetY;

            overlay.style.setProperty('background-position', `${posX}px ${posY}px`, 'important');

            currentFrame++;
            if (currentFrame < totalFrames) {
                setTimeout(animate, frameTime);
            } else {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        };

        animate();
    }
}
// New helper function: calculates damage, applies it, and returns popup info
function calculateAndApplyDamage(attacker, target, opts) {
    if (target.hp <= 0) return [];

    let str = getEffectiveStat(attacker, 'strength');
    let wis = getEffectiveStat(attacker, 'wisdom');
    let dex = getEffectiveStat(attacker, 'dexterity');
    let luc = getEffectiveStat(attacker, 'luck');

    let baseStat;

    if (opts.isLuc) {
        baseStat = luc;
    } else if (opts.isWis) {
        baseStat = wis;
    } else {
        // 通常攻撃（STR/WISベース）の場合
        let primaryBase = Math.max(str, wis);

        // DEXが最強ステータスの場合、baseStatをDEXの50%に設定（弱めつつダメージ確保）
        if (dex > primaryBase) {
            baseStat = Math.floor(dex * 0.5);
        } else {
            baseStat = primaryBase;
        }
    }

    let dmg = baseStat * opts.basePercent / 100;
    if (dmg === 0) {
        addBattleLog(`${attacker.name}'s attack has no effect on ${target.name}!`);
        return [{ targetId: target.id, dmg: 0, miss: true, crit: false }];
    }

    dmg *= (0.9 + Math.random() * 0.2);
    console.log("damage before calculating def"+dmg);
    dmg -= getEffectiveStat(target, 'defense');
    console.log("damage after calculating def"+dmg);   
    const popupInfos = [];

    /* === カウンターを最優先でチェック === */
    if (target.activeCounter && !opts.isAoE && opts.basePercent > 0) {
        addBattleLog(`${target.name} counters the attack!`);
        counterTriggerSound.currentTime = 0;
        counterTriggerSound.play().catch(e => console.log('Audio play error:', e));

        // メイン攻撃は完全にブロック（ダメージ0、クリティカルも発生しない）
        popupInfos.push({ targetId: target.id, dmg: 'Counter!', miss: true, crit: false });

        // 反撃ダメージ計算（カウンターはクリティカルなし、元のコード通り）
        let retDmg = Math.max(getEffectiveStat(target, 'strength'), getEffectiveStat(target, 'wisdom')) * (opts.isHeavy ? 300 : 100) / 100;
        retDmg = Math.floor(retDmg * (0.9 + Math.random() * 0.2));

        attacker.hp = Math.max(0, attacker.hp - retDmg);
        addBattleLog(`${target.name} retaliates for ${retDmg} damage!`);
        popupInfos.push({ targetId: attacker.id, dmg: retDmg, miss: false, crit: false });

        target.activeCounter = false;

        // カウンター発生時はメイン攻撃のダメージ適用・クリティカル・回避判定をすべてスキップして即返却
        return popupInfos;
    }

    /* === カウンターがなかった場合のみ以降の処理 === */

    // クリティカル判定（カウンターでブロックされた場合はここに来ないので安全）
    let crit = false;
    if (Math.random() < ((attacker.critChance || 0) / 100)) {
        dmg *= 3;
        crit = true;
        addBattleLog('Critical hit!');
    }

    // 回避判定
    const baseEv = Math.floor(getEffectiveStat(target, 'luck') / 10);
    const evasion = Math.min(80, baseEv + (target.activeEvadeBonus ? 15 : 0));
    console.log(attacker.primary );
    // DEX攻撃 (primary===2 または "DEX") は回避を無視して必ず命中
    if (Math.random() * 100 < evasion && attacker.primary !== 2 && attacker.primary !== "DEX") {
        addBattleLog(`${target.name} evades the attack!`);
        popupInfos.push({ targetId: target.id, dmg: 'Evade', miss: true, crit: false });
        return popupInfos;
    }

    // 防御・プロテクトによる軽減
    if (target.activeDefense) {
        dmg *= 0.75;
        console.log(`${target.name}'s defense reduces the damage!`);
        strProtectSound.currentTime = 0;
        strProtectSound.play().catch(e => console.log('Audio play error:', e));
    }
    if (attacker.isEnemy && currentBattle.protectRounds > 0) {
        dmg *= 0.5;
        console.log('Protect reduces the damage!');
        strProtectSound.currentTime = 0;
        strProtectSound.play().catch(e => console.log('Audio play error:', e));
    }

    dmg = Math.floor(dmg);
    const actualDmg = dmg > 0 ? dmg : 0;

    if (actualDmg > 0) {
        target.hp = Math.max(0, target.hp - actualDmg);
        addBattleLog(`${attacker.name} deals ${actualDmg} damage to ${target.name}!${crit ? ' (Critical)' : ''}`);
    } else {
        addBattleLog(`${attacker.name}'s attack has no effect on ${target.name}!`);
    }

    popupInfos.push({ targetId: target.id, dmg: actualDmg, miss: actualDmg === 0, crit });

    return popupInfos;
}


function showDamagePopup(parentElement, amount, isMiss = false, isCritical = false) {
    if (!parentElement) return;

    const popup = document.createElement('div');
    popup.className = 'damage-popup';

    if (isMiss) {
        if (amount === 'Counter!') {
            popup.textContent = 'Counter!';
            popup.style.color = '#ff00ff'; // Magenta for counter
            popup.style.fontSize = '40px';
        } else if (amount === 'Evade') {
            popup.textContent = 'Evade!';
            popup.style.color = '#00ffff'; // Cyan for evade
            popup.style.fontSize = '40px';
        } else {
            popup.textContent = 'Miss';
            popup.style.color = '#ffffff';
        }
    } else {
        popup.textContent = `-${amount}`;

        if (isCritical) popup.style.fontSize = '80px';
    }

    // Relative positioning for accurate placement
    popup.style.position = 'absolute';
    popup.style.top = '0%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';

    parentElement.style.position = 'relative'; // Ensure parent can contain absolute popup
    parentElement.appendChild(popup);

    setTimeout(() => {
        if (popup.parentNode) popup.remove();
    }, 600);
}

function aiChooseAndExecute(actor) {
    const alivePlayers = currentBattle.team.filter(a => a.hp > 0);
    if (alivePlayers.length === 0) return;

    let actionType = 'light';
    let cost = 1;

    const ap = actor.currentAp || 0;
    if (ap >= 3 && Math.random() < 0.7) {
        actionType = 'heavy';
        cost = 3;
    } else if (ap >= 2 && actor.hp / actor.maxHp < 0.5 && Math.random() < 0.5) {
        actionType = 'counter';
        cost = 2;
    } else if (actor.hp / actor.maxHp < 0.4) {
        actionType = 'defense';
        cost = -1;
    }

    actor.currentAp = Math.min(5, Math.max(0, ap - cost));

    const action = { type: actionType };
    if (actionType !== 'defense' && actionType !== 'counter') {
        action.target = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    }

    addBattleLog(`${actor.name} uses ${actionType}${action.target ? ' on ' + action.target.name : ''}!`);
    executeActorAction(actor, action);
}

function roundStartPopup() {
    // Create a full-screen overlay popup that is not affected by renderBattle() overwriting battleContent
    const popup = document.createElement('div');
    
    popup.textContent = `ROUND ${currentBattle.round}`;
    
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.fontSize = '80px';
    popup.style.fontWeight = 'bold';
    popup.style.color = '#ffd700'; // Gold for festive/important feel
    popup.style.textShadow = '0 0 15px #000000, 0 0 30px #ffff00';
    popup.style.zIndex = '1000';
    popup.style.pointerEvents = 'none';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    popup.style.background =  'transparent';
    
    document.body.appendChild(popup);
    
    // Fade in + slight scale up
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1.2)';
    }, 100);
    
    // Fade out + scale up more then remove
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }, 1000);
    
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 1500);
}

function nextTurn() {

    // Increment and handle round wrap
    currentBattle.currentActorIndex++;

    if (currentBattle.currentActorIndex >= currentBattle.combatants.length) {
        // ===== Round-end / New round start processing =====
        currentBattle.protectRounds = Math.max(0, currentBattle.protectRounds - 1);

        // Remove Team Protected display if expired
        if (currentBattle.protectRounds <= 0 && currentBattle.activeEffects) {
            currentBattle.activeEffects = currentBattle.activeEffects.filter(e => 
                e.name !== 'Team Protected (50% damage reduction)'
            );
        }

        updateAliveCombatants();

        if (checkBattleEnd()) return;

        currentBattle.round++;
        currentBattle.log = [];
        addBattleLog(`--- Round ${currentBattle.round} starts ---`);
        roundStartPopup();

        // Grant 1 AP to all alive combatants
        currentBattle.team.filter(c => c.hp > 0).forEach(c => {
            c.currentAp = Math.min(5, (c.currentAp || 0) + 1);
        });
        currentBattle.enemies.filter(e => e.hp > 0).forEach(e => {
            e.currentAp = Math.min(5, (e.currentAp || 0) + 1);
        });

        currentBattle.currentActorIndex = 0;
    }

    // Get the candidate actor
    let actor = currentBattle.combatants[currentBattle.currentActorIndex];

    // Skip invalid actors (dead or stunned), with early round advance if needed
    while (actor && (actor.hp <= 0 || actor.stunnedRounds > 0)) {
        if (actor.stunnedRounds > 0) {
            addBattleLog(`${actor.name} is stunned and skips the turn!`);
            actor.stunnedRounds--;

            // Remove Stunned display if expired
            if (actor.stunnedRounds <= 0 && actor.activeEffects) {
                actor.activeEffects = actor.activeEffects.filter(e => 
                    e.name !== 'Stunned'
                );
            }
        } // dead are skipped silently

        currentBattle.currentActorIndex++;

        if (currentBattle.currentActorIndex >= currentBattle.combatants.length) {
            // All remaining actors this round were invalid → advance round early
            currentBattle.protectRounds = Math.max(0, currentBattle.protectRounds - 1);

            if (currentBattle.protectRounds <= 0 && currentBattle.activeEffects) {
                currentBattle.activeEffects = currentBattle.activeEffects.filter(e => 
                    e.name !== 'Team Protected (50% damage reduction)'
                );
            }

            updateAliveCombatants();

            if (checkBattleEnd()) return;

            currentBattle.round++;
            currentBattle.log = [];
            addBattleLog(`--- Round ${currentBattle.round} starts ---`);
            roundStartPopup();

            currentBattle.team.filter(c => c.hp > 0).forEach(c => {
                c.currentAp = Math.min(5, (c.currentAp || 0) + 1);
            });
            currentBattle.enemies.filter(e => e.hp > 0).forEach(e => {
                e.currentAp = Math.min(5, (e.currentAp || 0) + 1);
            });

            currentBattle.currentActorIndex = 0;
            renderBattle();
        }

        actor = currentBattle.combatants[currentBattle.currentActorIndex];
    }

    // At this point, actor should always be valid (alive and not stunned)
    // If somehow not (e.g., no combatants left), end battle
    if (!actor) {
        checkBattleEnd();
        return;
    }

    // Clear per-turn personal effect displays (Defense, Counter, Evade Bonus)
    // These effects expire exactly at the start of the character's next turn
    if (actor.activeEffects) {
        actor.activeEffects = actor.activeEffects.filter(e => 
            !['Defense Up (25% damage reduction)', 'Counter Ready', 'Evade Bonus (+15%)'].includes(e.name)
        );
    }

    // Clear temporary per-turn mechanic flags (for actual game logic)
    actor.activeDefense = false;
    actor.activeCounter = false;
    actor.activeEvadeBonus = false;

    currentBattle.currentActor = actor;

    if (actor.isEnemy) {
        renderBattle(); // Shows enemy turn (click to proceed)
    } else {
        currentBattle.selecting = null;
        renderBattle(); // Shows action buttons for player
    }

    checkBattleEnd();
}

function skipTurn() {
    const actor = currentBattle.currentActor;
    if (!actor) return;

    if (actor.isEnemy) {
        // Execute enemy action when "Next" is clicked
        aiChooseAndExecute(actor);

    } else {
        // Skip player turn
        addBattleLog(`${actor.name} skips their turn.`);
        actor.currentAp = Math.min(5, (actor.currentAp || 0) + 1);
        nextTurn();
    }
    
}

function updateAliveCombatants() {
    currentBattle.combatants = [...currentBattle.team.filter(c => c.hp > 0), ...currentBattle.enemies.filter(c => c.hp > 0)];
    currentBattle.combatants.sort((a, b) => getEffectiveStat(b, 'dexterity') - getEffectiveStat(a, 'dexterity'));
    console.log(currentBattle.combatants)
}

function checkBattleEnd() {
    const aliveTeam = currentBattle.team.filter(a => a.hp > 0).length;
    const aliveEnemies = currentBattle.enemies.filter(e => e.hp > 0).length;

    if (aliveTeam === 0) {
        endBattle(false);
        gameState.isAdvancingDay = false;
        return true;
    }
    if (aliveEnemies === 0) {
        endBattle(true);
        gameState.isAdvancingDay = false;
        return true;
    }
    return false;
}

function startRound() {
    currentBattle.log = [];
    currentBattle.round = 1;
    currentBattle.phase = 'executing';
    currentBattle.protectRounds = 0;
    currentBattle.selecting = null;

    currentBattle.team.forEach(a => {
        a.currentAp = 2;
        a.critChance = a.critChance || 0;
        a.activeDefense = false;
        a.activeCounter = false;
        a.activeEvadeBonus = false;
        a.stunnedRounds = 0;
    });
    currentBattle.enemies.forEach(e => {
        e.currentAp = 2;
        e.critChance = 0;
        e.activeDefense = false;
        e.activeCounter = false;
        e.activeEvadeBonus = false;
        e.stunnedRounds = 0;
        e.isEnemy = true;
    });

    updateAliveCombatants();

    addBattleLog('Defense battle begins!');

    currentBattle.currentActorIndex = -1;
    nextTurn();
}

function endBattle(win) {
    document.getElementById('battleModal').style.display = 'none';

    const q = currentBattle.quest;
    const day = currentBattle.day;

    // Sync HP and handle deaths from battle (applies to both defense and dungeon)
    currentBattle.team.forEach(battleAdv => {
        const origAdv = findAdv(battleAdv.id);
        if (origAdv) {
            origAdv.hp = battleAdv.hp;
            if (battleAdv.hp <= 0) {
                // Permanent adventurers dying always costs reputation (same for defense/dungeon)
                if (!battleAdv.temp) {
                    gameState.reputation = Math.max(-100, gameState.reputation - 10);
                    better_alert(`${battleAdv.name} が戦闘で死亡しました！ Reputation -10。`,"death");
                    
                    const idx = gameState.adventurers.findIndex(a => a.id === battleAdv.id);
                    if (idx > -1) gameState.adventurers.splice(idx, 1);
                } 
            }
        }
    });

    if (win) {
        // Victory processing
        if (q.defense) {
            // Defense-specific gold reward based on reputation
            const rep = Math.floor(gameState.reputation);
            const effectiveRep = Math.max(0, rep);
            const goldReward = Math.floor((effectiveRep + 100));
            processQuestOutcome(q, day, true, false, goldReward);
        } else {
            // Dungeon victory: use normal rewards (treasure + ring, no gold override)
            processQuestOutcome(q, day, true, false);
        }
    } else {
        // Defeat processing
        if (q.defense) {
            // Only defense defeat causes game over
            better_alert('防衛戦失敗！ギルドは崩壊しました。ゲームオーバー！','failure');

            gameState.gameOver = true;
        } else {
            // Dungeon defeat: normal failure (reputation loss, etc.)
            processQuestOutcome(q, day, false, false);
        }
    }

    // Clear current battle
    currentBattle = null;

    // Check for queued battles (multiple same-day battles)
    if (gameState.pendingBattles && gameState.pendingBattles.length > 0) {
        // Start the next queued battle
        const nextQ = gameState.pendingBattles.shift();

        // Generate enemies
        if (nextQ.defense) {
            generateEnemies(nextQ);
        } else {
            generateDungeonEnemies(nextQ);
        }

        const team = nextQ.assigned.map(id => {
            const adv = findAdv(id);
            return adv ? {...adv} : null;
        }).filter(a => a);

        currentBattle = {
            quest: nextQ,
            day: day,
            team: team,
            enemies: nextQ.enemies.map(e => ({...e})),
            round: 0,
            actions: {},
            phase: 'setup',
            actionIndex: 0,
            combatants: []
        };

        const titleText = nextQ.defense ? `防衛戦: ${nextQ.desc}` : `ダンジョン${nextQ.floor}階探索: ${nextQ.desc}`;

        document.getElementById('battleTitle').innerHTML = titleText;
        document.getElementById('battleModal').style.display = 'flex';
        renderBattle();
        startRound();
        CurrentQuestType = currentQ.defense ? 'defense' : 'dungeon';
        if (CurrentQuestType="dungeon"){
            renderBattlebgm(CurrentQuestType,currentQ.floor);
        }
        else{
           renderBattlebgm(CurrentQuestType); 
        }

        // If no more pending, clean up
        if (gameState.pendingBattles.length === 0) {
            delete gameState.pendingBattles;
        }
    } else {
        // No more battles today
        delete gameState.pendingBattles;
        showModal(day);
        updateDisplays();
    }
    if (!checkGameOver()){
    crossfadeTo('bgm', 2000);
    }
}

function addBattleLog(text) {
    currentBattle.log = currentBattle.log || [];
    currentBattle.log.push(text);
    if (currentBattle.log.length > 30) currentBattle.log.shift();
}






function selectMix(slot, idx) {
    if (slot === 1) selectedMix1 = idx;
    else selectedMix2 = idx;
    document.getElementById('mix1').innerHTML = selectedMix1 !== null ? gameState.inventory[selectedMix1].name : 'なし';
    document.getElementById('mix2').innerHTML = selectedMix2 !== null ? gameState.inventory[selectedMix2].name : 'なし';
    document.getElementById('mixBtn').disabled = selectedMix1 === null || selectedMix2 === null || selectedMix1 === selectedMix2;
}



function produce(fac, rid) {
    const recipes = fac === 'blacksmith' ? currentBlacksmithRecipes : currentTavernRecipes;
    const r = recipes[rid];
    if (!spendGold(r.cost)) return;
    if (r.materials) {
        r.materials.forEach(m => {
            for (let k = gameState.inventory.length - 1; k >= 0; k--) {
                if (gameState.inventory[k].name === m.name && m.qty > 0) {
                    gameState.inventory.splice(k, 1);
                    m.qty--;
                }
            }
        });
    }
    let item = {name: r.name, id: gameState.nextId++};
    if (r.stat) {
        item.stat = r.stat;
        item.bonus = r.bonus;
    } else {
        item.type = 'consumable';
        item.buff = r.buff;
    }
    addToInventory(item,1);
    getFacilitiesContent();
    updateDisplays();
}

function toggleGuildQuests() {
    document.getElementById('guildQuestsModal').style.display = 'flex';
    showMainSelection();
}

function closeGuildQuests() {
    document.getElementById('guildQuestsModal').style.display = 'none';
}



function showMainSelection() {
    currentGuildQuestType = 'main';
    const content = document.getElementById('guildQuestsContent');
    content.style.backgroundImage = "url('Images/GuildQuest_Background.jpg')";
    content.innerHTML = `
        <div class="quest-type-selection">
            <button class="quest-type-btn" onclick="showStoryQuest()">${t('guild_quests_story_main')}</button>
            <button class="quest-type-btn" onclick="showDungeonQuest()">${t('guild_quests_dungeon')}</button>
            <button class="quest-type-btn" onclick="showTradeQuest()">${t('guild_quests_trade')}</button>
        </div>
    `;
}

function showStoryQuest() {
    currentGuildQuestType = 'story';
    const content = document.getElementById('guildQuestsContent');
    content.style.backgroundImage = "url('Images/StoryQuest_Background.jpg')";

    let html = `<div class="gq-panel">
                    <button class="back-btn" onclick="showMainSelection()">${t('back_button')}</button>`;

    if (gameState.mainProgress >= mainQuests.length) {
        html += `<p><strong>${t('story_all_completed_title')}</strong><br>${t('story_all_completed_desc')}</p>`;
    } else {
        let mq = mainQuests[gameState.mainProgress];
        const requiredRep = mq.repRequired || 0;
        const hasActiveMain = gameState.quests.some(q => q.type === 6);
        const canPost = gameState.reputation >= requiredRep && !hasActiveMain;

        html += `<h4>${t('story_current_title')}</h4>
                 <p>${mq.desc}</p>
                 <p>${t('story_difficulty_reward', {difficulty: mq.difficulty, reward: mq.reward})}</p>
                 <p>${t('story_rep_required', {required: requiredRep, current: gameState.reputation})}</p>`;

        if (hasActiveMain) {
            html += `<p style="color:orange;">${t('story_already_active')}</p>`;
        } else if (gameState.reputation < requiredRep) {
            html += `<p style="color:red;">${t('story_rep_insufficient')}</p>`;
        }

        if (canPost) {
            html += `<div class="form-buttons">
                        <button class="post-btn" onclick="postGuildQuest()">${t('story_post_button')}</button>
                     </div>`;
        }
    }

    html += `</div>`;
    content.innerHTML = html;
}

function showDungeonQuest() {
    currentGuildQuestType = 'dungeon';
    const content = document.getElementById('guildQuestsContent');
    content.style.backgroundImage = "url('Images/DungeonQuest_Background.jpg')";

    let html = `<div class="gq-panel">
                <button class="back-btn" onclick="showMainSelection()">${t('back_button')}</button>
                    <label>階層: <input type="number" id="dungeonFloor" min="1" value="1" onchange="updateDungeonCooldown()"></label>
                    <div id="dungeonCooldownMsg" style="margin:15px 0; min-height:30px;"></div>
                    <div class="form-buttons">
                        <button class="post-btn" onclick="postGuildQuest()">投稿</button>
                    </div>
                </div>`;
    content.innerHTML = html;

    // 初回表示時にクールダウン状況を更新
    updateDungeonCooldown();
}

function updateDungeonCooldown() {
    const floorInput = document.getElementById('dungeonFloor');
    let floor = Number(floorInput.value);
    if (isNaN(floor) || floor < 1) {
        floorInput.value = 1;
        floor = 1;
    }

    const nextAvail = gameState.dungeonCooldowns[floor];
    const msgEl = document.getElementById('dungeonCooldownMsg');
    const postBtn = document.querySelector('.post-btn');

    if (nextAvail && gameState.day < nextAvail) {
        const remaining = nextAvail - gameState.day;
        msgEl.innerHTML = `<p style="color:#ff6b6b; font-size:1.3em; font-weight:bold;">
                              ${t('dungeon_cooldown_remaining', {floor, remaining})}
                           </p>`;
        postBtn.disabled = true;
        postBtn.style.opacity = '0.5';
    } else {
        msgEl.innerHTML = `<p style="color:#aaffaa; font-size:1.2em;">
                              ${t('dungeon_post_available')}
                           </p>`;
        postBtn.disabled = false;
        postBtn.style.opacity = '1';
    }
}

function showTradeQuest() {
    currentGuildQuestType = 'trade';

    const content = document.getElementById('guildQuestsContent');
    let html = `
    <h3 style="text-align:center; margin:30px 0; font-size:1.8em; color:#f0d080;">${t('trade_board_title')}</h3>
    
    <!-- 共通の戻るボタン（常に上部に表示） -->
    <div style="text-align:center; margin-bottom:30px; background:transparent;">
        <button onclick="showMainSelection()" style="padding:10px 30px; font-size:1.1em; background:#555; border:none; border-radius:8px; cursor:pointer; color:#fff;">
            ${t('trade_back_to_main')}
        </button>
    </div>`;

    const activeTrade = gameState.quests.find(q => q.type === 'trade');
    if (activeTrade) {
        html += `
        <div style="text-align:center; padding:20px; background:transparent; border:2px solid rgba(255,160,0,0.3); border-radius:12px; margin:20px auto; max-width:800px;">
            <p style="font-size:1.4em; color:orange;">${t('trade_active_title')}</p>
            <p style="font-size:1.2em;">${activeTrade.cityName}（${t('trade_remaining_days', {days: activeTrade.daysLeft})}）</p>
            <p style="font-size:1.1em; color:#aaa; margin-top:15px;">${t('trade_active_note')}</p>
        </div>`;
    } else {
        // 全都市（ホーム含む）を統一テーブル形式で表示
        const allCities = [
            ...gameState.tradeCityStates.map(c => ({id: c.id, name: c.name, cityObj: c}))
        ];

        allCities.forEach(cityInfo => {
            const isHome = cityInfo.id === 'home';
            const cityState = isHome ? null : cityInfo.cityObj;
            const cityName = cityInfo.name;

            html += `
            <div class="city-trade" style="background:transparent; border:2px solid rgba(85,85,85,0.6); border-radius:16px; padding:20px; margin:30px auto; max-width:900px; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
                <h4 style="text-align:center; font-size:1.6em; margin-bottom:20px; color:#ffd700; text-shadow:0 0 10px rgba(0,0,0,0.8);">
                    ${cityName}
                    ${!isHome && cityInfo.cityObj?.event ? `
                    <span style="display:block; font-size:0.8em; color:#ff0; margin-top:8px; text-shadow:0 0 8px rgba(0,0,0,0.8);">
                        ${t('trade_event_label')} ${cityInfo.cityObj.event.name}: ${cityInfo.cityObj.event.desc}（${t('trade_event_days_left', {days: cityInfo.cityObj.event.daysLeft})}）
                    </span>` : ''}
                </h4>
                <table style="width:100%; border-collapse:collapse; background:transparent; border-radius:12px; overflow:hidden;">
                    <thead>
                        <tr style="background:rgba(68,68,68,0.6); color:#fff;">
                            <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_resource')}</th>
                            <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_player_sell_price')}</th>
                            <th style="padding:12px; border-bottom:3px solid rgba(102,102,102,0.8);">${t('trade_table_player_buy_price')}</th>
                        </tr>
                    </thead>
                    <tbody>`;

            resources.forEach(r => {
                const playerSellPrice = isHome ? getSellPrice(null, r, true) : getSellPrice(cityState, r); // プレイヤー売却価格（都市買い値）
                const playerBuyPrice = isHome ? getBuyPrice(null, r, true) : getBuyPrice(cityState, r);  // プレイヤー購入価格（都市売り値）

                const isSpecialty = !isHome && keyToDisplay[cityState?.specialty] === r;
                const rowStyle = isSpecialty ? 'background:rgba(0,100,0,0.2); font-weight:bold;' : '';

                html += `
                <tr style="${rowStyle}">
                    <td style="padding:12px; text-align:center; border-bottom:1px solid rgba(85,85,85,0.6); color:#fff; text-shadow:0 0 8px rgba(0,0,0,0.8);">${r}${isSpecialty ? t('trade_specialty_marker') : ''}</td>
                    <td style="padding:12px; text-align:center; color:#8f8; border-bottom:1px solid rgba(85,85,85,0.6); text-shadow:0 0 6px rgba(0,0,0,0.8);">${playerSellPrice}${t('gold_unit')}</td>
                    <td style="padding:12px; text-align:center; color:#ff8; border-bottom:1px solid rgba(85,85,85,0.6); text-shadow:0 0 6px rgba(0,0,0,0.8);">${playerBuyPrice}${t('gold_unit')}</td>
                </tr>`;
            });

            html += `
                    </tbody>
                </table>`;

            if (!isHome) {
                html += `
                <div style="text-align:center; margin-top:20px; background:transparent;">
                    <button onclick="openTradeForm('${cityInfo.id}')" style="padding:8px 16px; font-size:1em; background:#27ae60; border:none; border-radius:6px; cursor:pointer;">
                        ${t('trade_start_button')}
                    </button>
                </div>`;
            }

            html += `</div>`;
        });
    }

    content.innerHTML = html;
}

/* 既存の updateTradeInfo はそのまま使用可能（変更なし） */
function updateTradeInfo() {
    let cityName = document.getElementById('tradeCity').value;
    let city = cities.find(c => c.name === cityName);
    let info = '';
    if (city && city.items[0]) {
        let it = city.items[0];
        info += `アイテム: ${it.name}<br>価格範囲: ${it.minPrice}~${it.maxPrice}G`;
        let curr = gameState.dailyPrices[cityName] ? gameState.dailyPrices[cityName][it.name] : 'N/A';
        info += `<br>今日の価格: ${curr}G`;
        document.getElementById('tradeMaxPrice').value = it.maxPrice;
    }
    document.getElementById('tradeInfo').innerHTML = info;
}

function toggleFacilities() {
    currentFacility = null;
    document.getElementById('facilitiesModal').style.display = 'flex';
    renderFacilities();
}

function closeFacilities() {
    document.getElementById('facilitiesModal').style.display = 'none';
}



function toggleFacilities() {
    currentFacility = null;
    document.getElementById('facilitiesModal').style.display = 'flex';
    renderFacilities();
}

function closeFacilities() {
    document.getElementById('facilitiesModal').style.display = 'none';
}

function selectFacility(fac) {
    currentFacility = fac;
    renderFacilities();
}

function getAlchemyMaterialOptions() {
    const materials = [
        // 元の基本素材
        '薬草', '鉄鉱石', 'スパイス', '宝石', '活力の粉', '鋼のインゴット', '炎の粉', '魔法の結晶',
        
        // fetchクエスト生素材（全ランク）
        'キノコ', '花', '普通の薬草', '川魚', '鉄の欠片',
        '狼の毛皮', '魔力の結晶（小）',
        'オークの牙', '古代の巻物断片', '希少スパイス',
        'グリフォンの羽', 'ヒドラの毒袋', '聖水',
        'ユニコーンの角', '禁断の魔導書頁', 'フェニックスの灰',
        '星の欠片', '天使の羽', 'デーモンの心臓',
        '古代ドラゴンの鱗', 'エーテルの結晶', '神の涙',
        'タイタンの骨', '永遠の炎', '神聖な遺物',
        'エルダードラゴンの心臓', '深淵の核', '光の神器の欠片',
        '世界の源石', '創世の欠片', '滅びの結晶',
        
        // 新規クラフト素材（チェイン用）
        '鉄草合金粉', '森のエキス',
        '精鉄インゴット', '獣皮エキス',
        '牙鋼インゴット', '古魔導粉', '希少活力粉',
        '風翼結晶', '聖魔導結晶',
        '禁断魔導晶', '不死鳥炎粉',
        '龍鋼装甲材', 'エーテル魔晶',
        '巨神骨鋼', '永劫炎粉', '神聖遺晶',
        '古龍心鋼', '深淵エーテル晶', '光神器晶', '終焉破壊粉',
        '滅び深淵晶'
    ].sort((a, b) => a.localeCompare(b, 'ja')); // 五十音順ソートでUIを整理
    
    let html = '<option value="">-- 選択 --</option>';
    materials.forEach(mat => {
        const qty = countItem(mat);
        if (qty > 0) {
            html += `<option value="${mat}">${mat} (${qty}個)</option>`;
        }
    });
    return html;
}



function performAlchemy() {
    const ing1 = document.getElementById('alchemyIng1').value;
    const ing2 = document.getElementById('alchemyIng2').value;
    const qty = parseInt(document.getElementById('alchemyQty').value) || 1;

    if (!ing1 || !ing2 || ing1 === ing2) {
        better_alert('異なる有効な材料を2つ選択してください。',"error");
        return;
    }

    const sortedInputs = [ing1, ing2].sort();
    const recipe = alchemyRecipes.find(r => {
        const rInputs = [...r.inputs].sort();
        return rInputs[0] === sortedInputs[0] && rInputs[1] === sortedInputs[1];
    });

    if (!recipe) {
        better_alert('この組み合わせにはレシピがありません。',"error");
        return;
    }

    if (countItem(ing1) < qty || countItem(ing2) < qty) {
        better_alert('材料が不足しています！',"error");
        return;
    }

    removeItems(ing1, qty);
    removeItems(ing2, qty);
    addToInventory(recipe.output, qty);

    const optionsHtml = getAlchemyMaterialOptions();
    document.getElementById('alchemyIng1').innerHTML = optionsHtml;
    document.getElementById('alchemyIng2').innerHTML = optionsHtml;
    updateAlchemyPreview();

    better_alert(`${recipe.output.name} を ${qty}個 作成しました！`,"success");
    renderFacilities(); // 在庫更新のため再描画
}

function orderTavernItem(recipeIdx) {
    const r = currentTavernRecipes[recipeIdx];
    if (gameState.gold < r.cost) {
        better_alert('Goldが不足しています',"error");
        return;
    }

    // 素材チェック（あれば）
    if (r.materials) {
        for (let m of r.materials) {
            if (countItem(m.name) < (m.qty || 1)) {
                better_alert('素材が不足しています',"error");
                return;
            }
        }
    }

    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) {
        better_alert('永久冒険者がいないため適用できません',"error");
        return;
    }

    let selectHtml = `<div style="margin:40px 0; padding:30px; background:rgba(255,255,255,0.15); border-radius:16px;">
        <p style="font-size:1.4em; margin-bottom:25px; text-align:center;"><strong>${r.name}</strong> を注文（${r.cost}g）<br>
        適用する冒険者を選択してください</p>
        <div style="display:grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap:30px; 
                    justify-items:center; 
                    max-width:900px; 
                    margin:0 auto;">
    `;

    perms.forEach(adv => {
        selectHtml += `<div style="text-align:center; padding:15px; background:rgba(255,255,255,0.1); border-radius:12px; width:100%; max-width:380px;">
            <!-- レスポンシブ円形ポートレート（画像サイズ追従 + 最大380px） -->
            <div style="width:100%; max-width:320px; aspect-ratio:1/1; border-radius:25%; overflow:hidden; margin:0 auto 12px; box-shadow:0 4px 12px rgba(0,0,0,0.4); border:2px solid rgba(255,255,255,0.3);">
                <img src="Images/${adv.image}" 
                    style="width:100%; height:100%; object-fit:cover; object-position:center top;"
                    onload="this.parentNode.style.aspectRatio = (this.naturalWidth / this.naturalHeight) || '1/1';">
            </div>
            <strong style="font-size:1.2em; display:block; margin-bottom:8px;">${adv.name}</strong>
            <button onclick="applyTavernBuff(${recipeIdx}, ${adv.id})" style="padding:10px 24px; background:#27ae60; font-size:1.1em; border:none; border-radius:8px;">適用</button>
        </div>`;
    });

    selectHtml += `</div></div>`;
    selectHtml += `</div>
        <div style="text-align:center; margin-top:30px;">
            <button onclick="renderFacilities()" style="padding:10px 24px; background:#e74c3c; font-size:1.1em; border:none; border-radius:8px;">キャンセル</button>
        </div>
    </div>`;

    document.querySelector('.facility-panel').insertAdjacentHTML('beforeend', selectHtml);

    updateDisplays();
}
function applyTavernBuff(recipeIdx, advId) {
    const r = currentTavernRecipes[recipeIdx];
    const adv = findAdv(advId);
    if (!adv || adv.temp) return;

    // 消費（レーションでも通常食事でも共通）
    gameState.gold -= r.cost;
    if (r.materials) {
        for (let m of r.materials) {
            removeItems(m.name, m.qty || 1);
        }
    }

    const isRation = r.isRation === true;

    if (isRation) {
        // レーション: バフなし、好感度-10
        if (adv.Friendliness !== undefined) {
            adv.Friendliness = Math.max(0, adv.Friendliness - 10);
        }
        better_alert(`${adv.name}は${r.name}を食べたが、味が悪く不機嫌になった（Friendliness -10）`, "friendliness", {delta: -10 });
    } else {
        // 通常食事: バフ適用
        const buffCopy = JSON.parse(JSON.stringify(r.buff));
        buffCopy.daysLeft = buffCopy.days;
        adv.buffs.push(buffCopy);
        better_alert(`${adv.name} に ${r.name} を適用しました！（${buffCopy.days}日間有効）`, "success");
    }


// 空腹度回復（レーションでも回復する前提） - パーセント表示に変更
    const hungerRecover = r.hunger_recover || 0.4;
    const hungerPercent = Math.round(hungerRecover * 100);
    adv.hunger = Math.min(1, adv.hunger + hungerRecover);
    better_alert(`${adv.name}の空腹度が${hungerPercent}%回復。`, "success");

    renderFacilities();
    if (typeof updateGold === 'function') updateGold();
}


// enhanceEquipment の安全強化版（itemIdが文字列の場合も対応 + デバッグログ改善）
function enhanceEquipment(advId, itemId) {
    const adv = gameState.adventurers.find(a => a.id === advId);
    console.log("The adventurer is: " + (adv ? adv.name : 'Not found (ID: ' + advId + ')'));

    if (!adv) return;

    // itemIdが文字列の場合、数値に変換（onclickでクォートなしなら数値のまま）
    const numericItemId = Number(itemId);

    // --- UPDATED: Search for the item in the new slots system first ---
    let item = null;
    if (adv.slots) {
        // Extract all valid items from the slots object
        const equippedItems = Object.values(adv.slots).filter(slot => slot !== null && slot !== undefined);
        item = equippedItems.find(i => i.id === numericItemId || String(i.id) === String(itemId));
    }

    // --- Fallback: Check old equipment array for older save files ---
    if (!item && adv.equipment) {
        item = adv.equipment.find(i => i.id === numericItemId || String(i.id) === String(itemId));
    }

    console.log("The item is: " + (item ? item.name + ' (ID: ' + item.id + ')' : 'Not found (searched ID: ' + numericItemId + ')'));

    // Safety check: Stop here if the item still isn't found to prevent crashes
    if (!item) {
        console.error("Item not found for enhancement! Aborting.");
        return; 
    }

    const crystalName = t('enhancement_crystal');

    // クリスタル消費（スタック対応）
    let consumed = false;
    for (let i = gameState.inventory.length - 1; i >= 0; i--) {
        const inv = gameState.inventory[i];
        if (inv.name === crystalName) {
            const currentQty = inv.qty || 1;
            if (currentQty >= 1) {
                if (currentQty > 1) {
                    inv.qty -= 1;
                } else {
                    gameState.inventory.splice(i, 1);
                }
                consumed = true;
                break;
            }
        }
    }

    if (!consumed) {
        better_alert(t('blacksmith_insufficient_crystals'),"error");
        return;
    }

    // 強化実行（絶対値+1）
    item.enhancement = (item.enhancement || 0) + 1;

    const statFull = t(`stat_${item.stat}`) || t(`stat_${item.stat}`);
    better_alert(t('blacksmith_enhance_success', {
        item: item.name,
        bonus: item.bonus,
        enhancement: item.enhancement,
        stat: statFull
    }),"success");

    // UI更新
    renderFacilities();
}

function produceBlacksmith(recipeIdx) {
    const r = currentBlacksmithRecipes[recipeIdx];
    if (gameState.gold < r.cost) {
        better_alert('Goldが不足しています',"error");
        return;
    }
    if (r.materials) {
        for (let m of r.materials) {
            if (countItem(m.name) < (m.qty || 1)) {
                better_alert('素材が不足しています',"error");
                return;
            }
        }
    }

    gameState.gold -= r.cost;
    if (r.materials) {
        for (let m of r.materials) {
            removeItems(m.name, m.qty || 1);
        }
    }

    // 完全なアイテムオブジェクトを作成（レシピの全プロパティを継承）
    const newItem = {
        name: r.name,
        stat: r.stat,
        bonus: r.bonus,
        enhancement: r.enhancement || 0,  // enhancementが存在すれば使用、なければ0
        category: r.category,             // カテゴリ必須
        cost: r.cost,                     // 買取額計算用にcostも保持（任意だが便利）
        description: r.description || '', // 説明があれば
        qty: 1                            // 初期数量1
    };

    addToInventory(newItem, 1);

    better_alert(`${r.name} を製作しました！`,"success");
    renderFacilities();
    if (typeof updateGold === 'function') updateGold();
    updateDisplays();
}

function produceAndStock(recipeIndex) {
    const r = currentTavernRecipes[recipeIndex];
    if (!r) return;

    const cost = r.cost || 0;
    if (gameState.gold < cost) return;

    const materials = r.materials || [];

    // Check materials
    for (const mat of materials) {
        const owned = countItem(mat.name); // your existing count function (player inventory)
        if (owned < mat.qty) return;
    }

    // Consume gold
    gameState.gold -= cost;

    // Consume materials from player inventory
    for (const mat of materials) {
        let item = gameState.inventory.find(i => i.name === mat.name);
        if (item) {
            item.qty -= mat.qty;
            if (item.qty <= 0) {
                gameState.inventory = gameState.inventory.filter(i => i.name !== mat.name);
            }
        }
    }

    // Add to stock
    if (!gameState.tavernStock) gameState.tavernStock = {};
    gameState.tavernStock[recipeIndex] = (gameState.tavernStock[recipeIndex] || 0) + 1;

    renderFacilities(); // refresh UI
    better_alert(`${r.name}を生産して在庫に加えました`, "success");
    updateDisplays();
}

function renderFacilities() {
    const content = document.getElementById('facilitiesContent');
    const modalContent = document.querySelector('#facilitiesModal .modal-content');

    if (currentFacility === null) {
        modalContent.style.backgroundImage = "url('Images/Street.jpg')";
        content.innerHTML = `
            <div id="renderedfacilitiesContent" style="text-align:center; padding:60px;">
                <h2>${t('facilities_street_title')}</h2>
                <h2 style="font-size:1.6em; margin:40px 0;">${t('facilities_select_prompt')}</h2>
                

                <div class="buttons" style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <button onclick="selectFacility('blacksmith')" style="padding: 40px 40px; font-size: 1.4em; background: rgba(231,76,60,0.9);">
                        ${t('facilities_blacksmith')}
                    </button>
                    <button onclick="selectFacility('tavern')" style="padding: 40px 40px; font-size: 1.4em; background: rgba(52,152,219,0.9);">
                        ${t('facilities_tavern')}
                    </button>
                    <button onclick="selectFacility('alchemy')" style="padding: 40px 40px; font-size: 1.4em; background: rgba(46,204,113,0.9);">
                        ${t('facilities_alchemy')}
                    </button>
                </div>
            </div>
        `;
    } else {
        let bgFile = '';
        let titleKey = '';
        let recipes = [];

        if (currentFacility === 'blacksmith') {
            bgFile = '鍛冶屋.jpg';
            titleKey = 'facilities_blacksmith';
            recipes = currentBlacksmithRecipes;
        } else if (currentFacility === 'tavern') {
            bgFile = '酒場.jpg';
            titleKey = 'facilities_tavern';
            recipes = currentTavernRecipes;
        } else if (currentFacility === 'alchemy') {
            bgFile = '錬金工房.jpg';
            titleKey = 'facilities_alchemy';
            recipes = currentAlchemyRecipes;
        }

        modalContent.style.backgroundImage = `url('Images/${bgFile}')`;

        const level = gameState.facilities[currentFacility];
        const title = t(titleKey);

        // Current fee for this facility
        const currentFee = (gameState.facilityFees && gameState.facilityFees[currentFacility]) || 0;

        let html = `<div class="facility-panel">
            <h2>${t('facilities_level_title', {title, level})}</h2>
            
            <div style="text-align:center; margin:20px 0; padding:12px; background:rgba(0,0,0,0.4); border-radius:10px;">
                <p style="font-size:1.4em; margin:0; color:#ffd700;">
                    現在の使用料: <strong>${currentFee} G / 回</strong>
                </p>
            </div>

            <div style="text-align:center; margin:30px 0;">
                <button onclick="openFacilityFeeModal('${currentFacility}')" 
                        style="padding:12px 32px; font-size:1.2em; background:#9b59b6; color:white; border:none; border-radius:8px; cursor:pointer;">
                    使用料を変更する
                </button>
            </div>

            <div style="text-align:center; margin:30px 0;">
                <button onclick="currentFacility=null; renderFacilities()" style="padding:14px 36px; background:#87878777; font-size:1em;">
                    ${t('facilities_back_to_street')}
                </button>
            </div>`;

        // Upgrade Section
        const maxLevel = facilityMaxLevels[currentFacility] || 4;
        if (level < maxLevel) {
            const nextCost = facilityUpgradeCosts[currentFacility][level];
            html += `
                <div style="text-align:center; margin:30px 0;">
                    <p style="font-size:1.4em;">
                        ${t('facilities_upgrade_cost', {level, next: level + 1, cost: nextCost})}
                    </p>
                    <button onclick="upgradeFacility('${currentFacility}')" 
                            ${gameState.gold < nextCost ? 'disabled style="background:#777;"' : ''} 
                            style="padding:14px 40px; font-size:1.4em;">
                        ${t('facilities_upgrade_button')}
                    </button>
                </div>`;
        } else {
            html += `
                <div style="text-align:center; margin:30px 0;">
                    <p style="font-size:1.6em; color:#ffd700;">
                        ${t('facilities_max_level', {max: maxLevel})}
                    </p>
                </div>`;
        }

        // Blacksmith Enhancement Section
        if (currentFacility === 'blacksmith') {
            const crystalName = t('enhancement_crystal');
            const crystalCount = countItem(crystalName);

            html += `
                <h3 style="text-align:center; margin-top:60px;">${t('blacksmith_enhancement_title')}</h3>
                <p style="text-align:center; font-size:1.3em; margin:20px 0;">
                    ${t('blacksmith_enhancement_desc')}<br>
                    <strong>${crystalName}: ${crystalCount}</strong>
                </p>`;

            if (crystalCount === 0) {
                html += `<p style="text-align:center; color:#ff6b6b;">${t('blacksmith_no_crystals')}</p>`;
            } else {
                let hasEnhanceable = false;
                html += `<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-top:30px;">`;

                gameState.adventurers.forEach(adv => {
                    // --- UPDATED EQUIPMENT EXTRACTION LOGIC ---
                    let enhanceableItems = [];
                    
                    // 1. Pull from the new slots system
                    if (adv.slots) {
                        Object.values(adv.slots).forEach(item => {
                            // Ensure it's a real item, not locked (prevents 2H weapon duplicates), and is enhanceable
                            if (item && !item.locked && item.stat && typeof item.bonus === 'number') {
                                // Double check to avoid pushing the same item ID twice
                                if (!enhanceableItems.some(i => i.id === item.id)) {
                                    enhanceableItems.push(item);
                                }
                            }
                        });
                    } 
                    
                    // 2. Fallback for older saves that still use adv.equipment array
                    if (enhanceableItems.length === 0 && adv.equipment) {
                        enhanceableItems = adv.equipment.filter(item => item.stat && typeof item.bonus === 'number');
                    }

                    if (enhanceableItems.length > 0) {
                        hasEnhanceable = true;
                        html += `
                            <div class="enhancement-group" style="background:rgba(0,0,0,0.25); padding:15px; border-radius:12px;">
                                <h4 style="text-align:center; margin-bottom:15px; font-size:1.1em;">${adv.name} ${t('equipment_title')}</h4>`;

                        enhanceableItems.forEach(item => {
                            const statFull = t(`stat_${item.stat}`) || item.stat;
                            const currentEnh = item.enhancement || 0;
                            // Add category to display if it exists
                            const categoryText = item.category ? ` [${item.category}]` : '';

                            html += `
                                <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:10px; margin:8px 0; display:flex; justify-content:space-between; align-items:center; font-size:0.95em;">
                                    <div>
                                        <p style="margin:0; font-weight:bold;">${item.name}${categoryText}</p>
                                        <p style="margin:4px 0 0; color:#ffeb3b;">
                                            ${statFull} +${item.bonus}${t('percent_symbol')}
                                            ${currentEnh > 0 ? ` +${currentEnh}${t('absolute_symbol')}` : ''}
                                        </p>
                                    </div>
                                    <button onclick="enhanceEquipment(${adv.id}, '${item.id}')"
                                            style="padding:8px 14px; font-size:0.95em; white-space:nowrap;">
                                        ${t('blacksmith_enhance_button')}
                                    </button>
                                </div>`;
                        });

                        html += `</div>`;
                    }
                });

                if (!hasEnhanceable) {
                    html += `<p style="grid-column:1/-1; text-align:center; color:#aaa;">${t('blacksmith_no_equipment')}</p>`;
                }

                html += `</div>`;
            }
        }

        // Crafting / Production Section
        if (level > 0 && recipes.length > 0) {
            html += `<h3 style="text-align:center; margin-top:60px;">${t('facilities_craftable_items')}</h3>
                     <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px; margin-top:30px;">`;

            let hasItems = false;

            recipes.forEach((r, originalIndex) => {
                if (r.level > level) return;

                hasItems = true;

                const cost = r.cost || 0;
                let canMake = gameState.gold >= cost;

                const materials = currentFacility === 'alchemy' 
                    ? r.inputs.map(name => ({name, qty: 1}))
                    : (r.materials || []);

                let matHtml = `<p style="margin:12px 0 4px; font-size:0.9em;"><strong>${t('facilities_required_materials')}</strong></p>`;
                if (materials.length > 0) {
                    materials.forEach(m => {
                        const have = countItem(m.name);
                        canMake = canMake && have >= m.qty;
                        const color = have >= m.qty ? '#ffffff' : '#ff6b6b';
                        matHtml += `<p style="color:${color}; margin:2px 0; font-size:0.9em;">・${m.name} ×${m.qty} (${t('facilities_owned', {have})})</p>`;
                    });
                } else {
                    matHtml += `<p style="color:#aaaaaa; margin:2px 0; font-size:0.9em;">・${t('facilities_none')}</p>`;
                }

                const itemName = currentFacility === 'alchemy' 
                    ? `${r.inputs.join(' + ')} → ${r.output.name}`
                    : r.name;

                // === Enhanced effect display for blacksmith ===
                let effectHtml = '';
                if (currentFacility === 'blacksmith') {
                    const statFull = t(`stat_${r.stat}`) || r.stat;
                    const bonusText = ` +${r.bonus}${t('percent_symbol')}`;
                    let enhText = '';
                    if (r.enhancement > 0) {
                        enhText = `+${r.enhancement}${t('absolute_symbol')}`;
                    }
                    effectHtml = `<p style="margin:10px 0; color:#ffeb3b; font-weight:bold; font-size:1em;">
                                    ${statFull} ${bonusText}${enhText}
                                  </p>`;
                } else if (currentFacility === 'tavern') {
                    if (r.buff.stat) {
                        const statText = t(`stat_${r.buff.stat}`);
                        const percent = r.buff.percent ? '%' : '';
                        effectHtml = `<p style="margin:10px 0; color:#81ff81; font-weight:bold; font-size:1em;">
                                        ${t('facilities_buff_effect', {stat: statText, bonus: r.buff.bonus, percent})}<br>
                                        <span style="font-size:0.9em;">${t('facilities_buff_duration', {days: r.buff.days})}</span>
                                      </p>`;
                    } else if (r.buff.type) {
                        const typeText = r.buff.type === 'hpRegen' ? t('buff_hp_regen') : t('buff_mp_regen');
                        effectHtml = `<p style="margin:10px 0; color:#81ff81; font-weight:bold; font-size:1em;">
                                        ${t('facilities_buff_effect_type', {type: typeText, bonus: r.buff.bonus})}<br>
                                        <span style="font-size:0.9em;">${t('facilities_buff_duration', {days: r.buff.days})}</span>
                                      </p>`;
                    }
                } else if (currentFacility === 'alchemy' && r.output.type === 'potion') {
                    const restoreText = r.output.restore === 'hp' ? t('potion_hp') : t('potion_mp');
                    effectHtml = `<p style="margin:10px 0; color:#a0f7a0; font-weight:bold; font-size:1em;">
                                    ${t('facilities_potion_effect', {type: restoreText, amount: r.output.amount})}
                                  </p>`;
                }

                // Tavern stock display
                let stockHtml = '';
                let stockQty = 0;
                if (currentFacility === 'tavern') {
                    if (!gameState.tavernStock) gameState.tavernStock = {};
                    stockQty = gameState.tavernStock[originalIndex] || 0;
                    stockHtml = `<p style="margin:12px 0 6px; font-size:1.1em; color:#f39c12; font-weight:bold;">
                                    在庫: ${stockQty}個
                                 </p>`;
                }

                let craftButtonHtml = '';
                if (currentFacility === 'alchemy') {
                    const disabledAttr = !canMake ? 'disabled style="background:#777;"' : '';
                    craftButtonHtml = `
                        <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
                            <button onclick="craftAlchemyRecipe(${originalIndex},1)" 
                                    ${disabledAttr}
                                    style="padding:10px 20px; font-size:1.05em; flex:1; min-width:130px;">
                                ${t('facilities_craft_alchemy')}
                            </button>
                            <button onclick="craftAlchemyRecipe(${originalIndex},10)" 
                                    ${disabledAttr}
                                    style="padding:10px 20px; font-size:1.05em; flex:1; min-width:130px;">
                                ${t('facilities_craft_alchemy_10')}
                            </button>
                        </div>`;
                } else {
                    const disabledAttr = !canMake ? 'disabled style="background:#777;"' : '';
                    if (currentFacility === 'tavern') {
                        craftButtonHtml = `
                            <div style="margin-top:15px; display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                                <button onclick="produceAndStock(${originalIndex})"
                                        ${disabledAttr}
                                        style="padding:10px 20px; font-size:1.05em; background:#e67e22; flex:1; min-width:130px;">
                                    ${t('facilities_produce_and_stock')}
                                </button>
                                <button onclick="orderTavernItem(${originalIndex})"
                                        ${disabledAttr}
                                        style="padding:10px 20px; font-size:1.05em; flex:1; min-width:130px;">
                                    ${t('facilities_order_tavern')}
                                </button>
                            </div>`;
                    } else {
                        // blacksmith
                        const buttonText = t('facilities_produce_blacksmith');
                        const onclick = `produceBlacksmith(${originalIndex})`;
                        craftButtonHtml = `
                            <button onclick="${onclick}" 
                                    ${disabledAttr}
                                    style="margin-top:12px; padding:10px 24px; font-size:1.1em;">
                                ${buttonText}
                            </button>`;
                    }
                }

                html += `
                    <div class="facility-item" style="background:rgba(0,0,0,0.25); padding:15px; border-radius:12px; font-size:0.95em;">
                        <h3 style="margin:0 0 8px; font-size:1.15em;">${itemName}</h3>
                        ${effectHtml}
                        ${stockHtml}
                        <p style="margin:8px 0;">${t('facilities_cost', {cost})}</p>
                        ${matHtml}
                        ${craftButtonHtml}
                    </div>`;
            });

            if (!hasItems) {
                html += `<p style="grid-column:1/-1; text-align:center; font-size:1.4em;">${t('facilities_no_recipes_yet')}</p>`;
            }

            html += `</div>`;
        } else {
            html += `<p style="text-align:center; font-size:1.4em; margin-top:40px;">${t('facilities_upgrade_to_unlock')}</p>`;
        }

        html += `</div>`;
        content.innerHTML = html;
    }
}

// 在庫から指定数量を消費する関数（removeFromInventory）
// inventory → gameState.inventory に修正（ゲームの構造に合わせ）
function removeFromInventory(itemName, qtyToRemove) {
    if (qtyToRemove <= 0) return true;

    // gameState.inventory を使用（標準的なゲーム構造）
    if (!gameState.inventory || !Array.isArray(gameState.inventory)) {
        console.error('gameState.inventory が未定義または配列ではありません');
        return false;
    }

    let removed = 0;
    for (let i = gameState.inventory.length - 1; i >= 0; i--) {  // 逆順ループでsplice安全
        const item = gameState.inventory[i];
        if (item.name === itemName) {
            const canRemove = Math.min(qtyToRemove - removed, item.qty || 1);
            item.qty = (item.qty || 1) - canRemove;
            removed += canRemove;

            if (item.qty <= 0) {
                gameState.inventory.splice(i, 1);  // 0個になったら削除
            }

            if (removed >= qtyToRemove) {
                return true;  // 要求数量すべて消費
            }
        }
    }

    // 不足した場合
    console.warn(`在庫不足: ${itemName} (要求: ${qtyToRemove}, 消費できた: ${removed})`);
    return false;
}

function craftAlchemyRecipe(index, qty) {
    if (qty <= 0) {
        return;
    }

    const recipe = currentAlchemyRecipes[index];
    if (!recipe) {
        better_alert("無効なレシピです。","error");
        return;
    }

    // コストチェック（1回あたりcost × qty）
    const costPer = recipe.cost || 0;
    const totalCost = costPer * qty;
    if (gameState.gold < totalCost) {
        better_alert(`Goldが不足しています！ (必要: ${totalCost}G)`,"error");
        return;
    }

    // 必要素材量を計算（inputsに同じ素材が複数含まれる場合に対応）
    const required = {};
    for (const inputName of recipe.inputs) {
        required[inputName] = (required[inputName] || 0) + 1;
    }

    // 素材不足チェック（qty分必要）
    for (const [inputName, reqPer] of Object.entries(required)) {
        const needed = reqPer * qty;
        const have = countItem(inputName);
        if (have < needed) {
            better_alert(`素材不足: ${inputName} が ${needed} 個必要ですが、${have} 個しかありません！`,"error");
            return;
        }
    }

    // 消費処理
    if (totalCost > 0) {
        gameState.gold -= totalCost;
    }
    for (const inputName of recipe.inputs) {
        removeFromInventory(inputName, qty);
    }

    // 出力追加
    const output = recipe.output;
    let itemToAdd = {
        name: output.name,
        type: output.type  // 'material' or 'potion'
    };

    if (output.type === 'potion') {
        itemToAdd.restore = output.restore;
        itemToAdd.amount = output.amount;
    }

    if (output.minPrice !== undefined && output.maxPrice !== undefined) {
        itemToAdd.minPrice = output.minPrice;
        itemToAdd.maxPrice = output.maxPrice;
    }

    addToInventory(itemToAdd, qty);

    // 成功メッセージ（qtyに対応）
    const quantityText = qty > 1 ? `${qty}個の ` : '';
    let msg = `${quantityText}${output.name} を合成しました！`;
    if (output.type === 'potion') {
        const restoreText = output.restore === 'hp' ? 'HP' : 'MP';
        msg += ` (${restoreText} +${output.amount})`;
    }
    better_alert(msg,"success");

    // UI更新
    updateDisplays();
    renderFacilities();
}

const facilityMaxLevels = {
    alchemy: 4,
    blacksmith: 12,
    tavern: 12
};

const facilityUpgradeCosts = {
    alchemy: [
        600,    // Lv0 → Lv1 (序盤容易)
        2500,    // Lv1 → Lv2
        6000,
        10000     // Lv2 → Lv3 (Lv4はmax)
    ],
    blacksmith: [
        700,    // Lv0 → Lv1
        2000,    // Lv1 → Lv2
        4900,    // Lv2 → Lv3
        8800,    // Lv3 → Lv4
        15800,   // Lv4 → Lv5
        28400,   // Lv5 → Lv6
        51000,   // Lv6 → Lv7
        92000,   // Lv7 → Lv8
        165000,  // Lv8 → Lv9
        300000,  // Lv9 → Lv10
        540000,  // Lv10 → Lv11
        970000   // Lv11 → Lv12
    ],
    tavern: [
        500,    // Lv0 → Lv1 (酒場少し安め)
        1500,    // Lv1 → Lv2
        2500,    // Lv2 → Lv3
        5000,    // Lv3 → Lv4
        13000,   // Lv4 → Lv5
        23000,   // Lv5 → Lv6
        41000,   // Lv6 → Lv7
        74000,   // Lv7 → Lv8
        133000,  // Lv8 → Lv9
        240000,  // Lv9 → Lv10
        430000,  // Lv10 → Lv11
        770000   // Lv11 → Lv12
    ]
};

// 必要なら currentLang 対応のショートカット変数
let currentUpgradeDialogues = facilityUpgradeDialogues[currentLang] || facilityUpgradeDialogues.ja;

function upgradeFacility(fac) {
    const currentLevel = gameState.facilities[fac];
    const maxLevel = facilityMaxLevels[fac];

    if (currentLevel >= maxLevel) {
        better_alert('この施設はすでに最大レベルです', "warning");
        return;
    }

    const cost = facilityUpgradeCosts[fac][currentLevel];

    if (gameState.gold >= cost) {
        gameState.gold -= cost;
        gameState.facilities[fac]++;

        // ── ここからダイアログ追加 ──
        let dialogueKey = fac;                     // tavern, blacksmith, alchemy など
        let sequence = currentUpgradeDialogues[dialogueKey];

        // 定義がない場合は default を使う
        if (!sequence) {
            sequence = currentUpgradeDialogues.default || currentUpgradeDialogues.tavern; // fallback
        }

        // 必要ならレベルに応じてバリエーションを追加したい場合はここで分岐
        // 例: if (gameState.facilities[fac] >= 3) → もう少し感動的なセリフに…

        queueQuestCompletionDialogue(sequence);

        // ── 通常の処理 ──
        renderFacilities();
        if (typeof updateGold === 'function') updateGold();
        better_alert(`${fac} がレベル ${gameState.facilities[fac]} にアップグレードされました！`, "success");
    } else {
        better_alert('Goldが不足しています', "error");
    }

    updateDisplays();
}



let storyPostQueue = [];          // 専用キュー（completionQueueと分離して同時再生防止）
let isPlayingStoryPost = false;   // 再生中フラグ

function queueStoryPostDialogue(rawSequence, onComplete) {
    if (!rawSequence || rawSequence.length === 0) {
        if (onComplete) onComplete();
        return;
    }

    const defaultName = {
        ja: '冒険者',
        en: 'Adventurer',
        zh: '冒險者'
    }[currentLang] || 'Adventurer';

    const playerName = gameState.playerName || defaultName;

    const processedSequence = rawSequence.map(line => ({
        speaker: line.speaker.replace(/\{player\}/gi, playerName),
        text: line.text.replace(/\{player\}/gi, playerName),
        image: line.image || null
    }));

    storyPostQueue.push({ sequence: processedSequence, callback: onComplete });

    if (!isPlayingStoryPost) {
        crossfadeTo('storyBgm', 2000);
        setDialogueBackground('Images/quest_completion_bg.jpg');
        playNextStoryPostDialogue();
    }
}

function playNextStoryPostDialogue() {
    if (storyPostQueue.length === 0) {
        isPlayingStoryPost = false;
        crossfadeTo('bgm', 2000);
        const modal = document.getElementById('introModal');
        modal.style.display = 'none';

        const dialogueTextEl = document.getElementById('dialogueText');
        if (dialogueTextEl) dialogueTextEl.innerHTML = '';
        const speakerNameEl = document.getElementById('speakerName');
        if (speakerNameEl) speakerNameEl.textContent = '';
        const continueIndicator = document.getElementById('continueIndicator');
        if (continueIndicator) continueIndicator.style.opacity = '0';
        const charImg = document.getElementById('introCharacterImg');
        if (charImg) {
            charImg.src = '';
            charImg.style.opacity = '0';
        }
        return;
    }

    isPlayingStoryPost = true;
    const { sequence, callback } = storyPostQueue.shift();

    const modal = document.getElementById('introModal');
    const stepDialogue = document.getElementById('stepDialogue');
    modal.style.display = 'flex';

    const dialogueTextEl = document.getElementById('dialogueText');
    dialogueTextEl.innerHTML = '';
    document.getElementById('speakerName').textContent = '';
    document.getElementById('stepName').style.display = 'none';
    stepDialogue.style.display = 'block';

    const charImg = document.getElementById('introCharacterImg');

    const speakerImageCache = {};
    const playerName = gameState.playerName || 'マスター';

    let localIndex = 0;
    let typingInterval = null;

    function renderLine() {
        const current = sequence[localIndex];

        document.getElementById('speakerName').textContent = current.speaker + ":";

        document.getElementById('continueIndicator').style.opacity = '0';

        dialogueTextEl.innerHTML = '';

        let imageSrc = getPlayerImage();
        const speakerKey = current.speaker;
        console.log("current.speaker is:"+speakerKey);

        if (current.image) {
            imageSrc = current.image;
        } else if (speakerImageCache[speakerKey]) {
            imageSrc = speakerImageCache[speakerKey];
        } else {
            if (current.speaker.includes('カイト') || current.speaker.includes('Kaito')) {
                imageSrc = 'Images/カイト.png';
            } else if (current.speaker.includes('ルナ') || current.speaker.includes('Luna')) {
                imageSrc = 'Images/ルナ.png';
            } else if (current.speaker.includes('Narrator') || current.speaker.includes('ナレーター')) {
                imageSrc = 'Images/Narrator.png';
            } else if (current.speaker.includes('冒険者') || current.speaker.includes('Adventurer')) {
                const playerImages = [
                    'Images/STR_RankF_F.png', 'Images/STR_RankF_M.png',
                    'Images/DEX_RankF_F.png', 'Images/DEX_RankF_M.png',
                    'Images/WIS_RankF_F.png', 'Images/WIS_RankF_M.png',
                    'Images/LUC_RankF_F.png', 'Images/LUC_RankF_M.png'
                ];
                imageSrc = playerImages[Math.floor(Math.random() * playerImages.length)];
            } else if (current.speaker !== playerName) {
                imageSrc = 'Images/' + current.speaker + '.png';
            }
            speakerImageCache[speakerKey] = imageSrc;
        }

        function getImageKey(src) {
            if (!src) return null;
            let filename = src.split('/').pop().split('?')[0].split('#')[0];
            return decodeURIComponent(filename);
        }

        const currentKey = getImageKey(charImg.src);
        const newKey = getImageKey(imageSrc);

        // === 修正: 言語に応じたタイピング速度 ===
        function startTyping() {
            clearInterval(typingInterval);
            let charIndex = 0;

            // 英語の場合のみ高速（20ms）、それ以外は標準35ms
            const typingDelay = (currentLang === 'en') ? 20 : 35;

            typingInterval = setInterval(() => {
                if (charIndex < current.text.length) {
                    if (current.text.substr(charIndex, 4) === '<br>') {
                        dialogueTextEl.innerHTML += '<br>';
                        charIndex += 4;
                    } else {
                        dialogueTextEl.innerHTML += current.text[charIndex];
                        charIndex++;
                    }
                } else {
                    clearInterval(typingInterval);
                    typingInterval = null;
                    document.getElementById('continueIndicator').style.opacity = '1';
                }
            }, typingDelay);
        }
        // === 修正ここまで ===

        if (currentKey === newKey && currentKey !== null) {
            startTyping();
        } else {
            charImg.style.opacity = '0';

            const onFadeOutComplete = () => {
                const preloadImg = new Image();
                preloadImg.onload = preloadImg.onerror = () => {
                    charImg.src = imageSrc;
                    charImg.style.opacity = '1';

                    let typingStarted = false;
                    const onFadeInComplete = (e) => {
                        if (e.propertyName === 'opacity' && !typingStarted) {
                            typingStarted = true;
                            charImg.removeEventListener('transitionend', onFadeInComplete);
                            startTyping();
                        }
                    };
                    charImg.addEventListener('transitionend', onFadeInComplete);

                    setTimeout(() => {
                        if (!typingStarted) {
                            typingStarted = true;
                            charImg.removeEventListener('transitionend', onFadeInComplete);
                            startTyping();
                        }
                    }, 600);
                };
                preloadImg.src = imageSrc;
            };

            let fadeOutHandled = false;
            const onFadeOut = (e) => {
                if (e.propertyName === 'opacity' && !fadeOutHandled) {
                    fadeOutHandled = true;
                    charImg.removeEventListener('transitionend', onFadeOut);
                    onFadeOutComplete();
                }
            };
            charImg.addEventListener('transitionend', onFadeOut);

            setTimeout(() => {
                if (!fadeOutHandled) {
                    fadeOutHandled = true;
                    charImg.removeEventListener('transitionend', onFadeOut);
                    onFadeOutComplete();
                }
            }, 600);
        }

        stepDialogue.onclick = () => {
            if (typingInterval) {
                clearInterval(typingInterval);
                typingInterval = null;
                dialogueTextEl.innerHTML = current.text;
                document.getElementById('continueIndicator').style.opacity = '1';
            } else {
                localIndex++;
                if (localIndex < sequence.length) {
                    renderLine();
                } else {
                    if (callback) callback();
                    playNextStoryPostDialogue();
                }
            }
        };
    }

    renderLine();
}


function postGuildQuest() {
    // document.getElementById('gqType') を完全に削除 → エラーの原因を根絶
    // 代わりにグローバル変数 currentGuildQuestType を使用して種別を取得
    let type = currentGuildQuestType;

    let q = null;
    let alertMessage = 'ギルドクエストを投稿しました！';

    if (type === 'story') {
        if (gameState.mainProgress >= mainQuests.length) {
            better_alert('すべてのメインクエストを完了しました！',"success");
            return;
        }

        if (gameState.quests.some(q => q.type === 6)) {
            better_alert('既にメインクエストが進行中です。現在のメインクエストを完了してください。',"error");
            return;
        }

        let mq = mainQuests[gameState.mainProgress];
        if (gameState.reputation < (mq.repRequired || 0)) {
            better_alert(`Reputationが不足しています（必要: ${mq.repRequired || 0} / 現在: ${gameState.reputation}）。`,"error");
            return;
        }

        // 専用対話再生 → 終了後にクエスト投稿
                queueStoryPostDialogue(storyQuestDialogues[gameState.mainProgress], function() {
                    const q = {
                        id: gameState.nextId++,
                        desc: mq.desc,
                        difficulty: mq.difficulty,
                        rank: mq.rank,
                        minStrength: mq.minStrength,
                        minWisdom: mq.minWisdom,
                        minDexterity: mq.minDexterity,
                        minLuck: mq.minLuck,
                        focusStat: mq.focusStat,
                        minFocus: mq.minFocus,
                        type: 6,
                        reward: mq.reward,
                        playerPosted: true,
                        daysLeft: 999,
                        assigned: [],
                        inProgress: false
                    };

                    gameState.quests.push(q);
                    updateDisplays();
                    better_alert('メインクエストを投稿しました！クエストボードに表示されます。',"success");
                    closeGuildQuests();
                });

                return; // 対話中はここで終了
            
    } else if (type === 'dungeon') {
        let floorEl = document.getElementById('dungeonFloor');
        if (!floorEl) {
            better_alert('エラー: ダンジョン階層の入力が見つかりません。',"error");
            return;
        }
        let floor = parseInt(floorEl.value) || 1;
        estimated_difficulty = floor * 10;
        q = {
            id: gameState.nextId++,
            desc: `ダンジョン ${floor}階探索`,
            difficulty: 1,
            minStrength: 1,
            minWisdom: 1,
            minDexterity: 1,
            minLuck: 1,
            focusStat: "dexterity",
            minFocus: 1,
            type: 7,
            reward: floor * 300,
            playerPosted: true,
            floor: floor,
            daysLeft: 999,
            assigned: [],
            inProgress: false,
            rank: `Recommended >${estimated_difficulty}`,
        };
        gameState.dungeonCooldowns[floor] = gameState.day + 7;
    } else if (type === 'trade') {
        let cityEl = document.getElementById('tradeCity');
        let qtyEl = document.getElementById('tradeQty');
        let maxPriceEl = document.getElementById('tradeMaxPrice');
        if (!cityEl || !qtyEl || !maxPriceEl) {
            better_alert('エラー: トレード情報の入力が見つかりません。',"error");
            return;
        }
        let cityName = cityEl.value;
        let city = cities.find(c => c.name === cityName);
        let itemName = city.items[0].name;
        let qty = parseInt(qtyEl.value) || 1;
        let maxPrice = parseInt(maxPriceEl.value) || city.items[0].maxPrice;
        q = {
            id: gameState.nextId++,
            desc: `${cityName}で${itemName} ${qty}個購入 (最大${maxPrice}G/個)`,
            difficulty: 1,
            minDexterity: 5,
            minLuck: 5,
            focusStat: "trade",
            minFocus: 10,
            type: 8,
            reward: 0,
            playerPosted: true,
            tradeData: {city: cityName, item: itemName, qty: qty, maxPrice: maxPrice},
            daysLeft: 999,
            assigned: [],
            inProgress: false
        };
    }

    if (q) {
        gameState.quests.push(q);
        updateDisplays();
        better_alert(alertMessage,"success");
        closeGuildQuests();  // 投稿後にモーダルを閉じる
    }
}

function toggleShop() {
    const modal = document.getElementById('shopModal');
    modal.style.display = 'flex';
    document.getElementById('shopContent').innerHTML =renderCurrentShopPage();
}

function closeShop() {
    document.getElementById('shopModal').style.display = 'none';
}

function toggleCharacters() {
    document.getElementById('charactersModal').style.display = 'flex';
    currentCharIndex = 0;
    renderCurrentCharacter();
}

function closeCharacters() {
    document.getElementById('charactersModal').style.display = 'none';
}
function toggleNPCs() {
    const modal = document.getElementById('npcsModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        // リスト形式で全アンロックNPCを表示（カルーセル不要）
        renderNPCList();
        modal.style.display = 'block';
    }

}

function closeNPCs() {
    document.getElementById('npcsModal').style.display = 'none';
}



function useSpecificPotion(charIndex, itemId) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[charIndex];
    if (!adv) return;

    const idx = gameState.inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return;

    const potion = gameState.inventory[idx];
    if (potion.type !== 'potion') return;

    if (potion.restore === 'hp') {
        adv.hp = Math.min(adv.maxHp, adv.hp + potion.amount);
    } else if (potion.restore === 'mp') {
        adv.mp = Math.min(adv.maxMp, adv.mp + potion.amount);
    }

    gameState.inventory.splice(idx, 1);
    renderCurrentCharacter();
}

function receiveSideQuest(idx) {
    const existing = gameState.quests.find(q => q.side && q.npcIdx === idx);
    if (existing) {
        better_alert('このNPCのサイドクエストは既に受注中です。',"error");
        return;
    }
    const sq = generateSideQuest(idx);
    gameState.quests.push(sq);
    updateDisplays();
    better_alert(`${discoveryNPCs[idx]}からサイドクエストを受注しました！`,"success");
}

function getNameHtml(adv) {
    if (!adv || adv.primary === undefined) return adv.name;
    const colors = ['#ff0000', '#0000ff', '#00ff00', '#ffff00'];
    const color = colors[adv.primary];
    return `<span style="color:${color}; font-weight:bold;">${adv.name}</span>`;
}


function useExpOrbOnChar(charIndex, itemId) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (charIndex < 0 || charIndex >= perms.length) return;
    const adv = perms[charIndex];

    const itemIdx = gameState.inventory.findIndex(it => it.id === itemId);
    if (itemIdx === -1) return;

    const orb = gameState.inventory[itemIdx];

    // Must be a level-up item
    if (orb.effect !== 'level_up') {
        console.warn("useExpOrbOnChar called on non-exp-orb item", orb);
        return;
    }

    // Determine how many levels this orb gives
    let levelsToAdd = 1;  // default = small

    // Priority 1: use explicit .amount field (recommended)
    if (typeof orb.amount === 'number' && orb.amount > 0) {
        levelsToAdd = orb.amount;
    }
    // Priority 2: fallback name check (only if .amount not set)
    else if (orb.name === t('exp_orb_small') || orb.name === 'EXPオーブ (小)') {
        levelsToAdd = 1;
    }
    else {
        // large orb or unknown → 10
        levelsToAdd = 10;
    }

    // Prevent absurd values
    levelsToAdd = Math.max(1, Math.min(50, Math.floor(levelsToAdd)));

    // Apply level up
    levelUp(adv, levelsToAdd);

    // Consume one orb
    if ((orb.qty || 1) > 1) {
        orb.qty -= 1;
    } else {
        gameState.inventory.splice(itemIdx, 1);
    }

    // Feedback
    better_alert(
        `${adv.name} が ${orb.name} を使用！ レベルが ${levelsToAdd} 上がりました！`,
        "success"
    );

    renderCurrentCharacter();
    updateDisplays();
}


// === 完全に汎用化した生成関数：javascript.js に置き換えまたは追加してください ===
// 異なるスプライトシートサイズ・グリッドに対応（例: 5052×6240で5列×5行など）
// scaleFactorで余白確保（ポーズ変動隠蔽）調整可能、デフォルト0.95（5%縮小）
// === 完全に汎用化した最終版 generateBreathingAnimation関数 ===
// キャラクターごとにinnerHeightを指定可能（LUC用1350pxなど）
// innerHeightで表示高さを調整 → 脚切れ/頭切れ/他フレーム混入を防ぎ最適表示
// scaleFactorで背景変動隠蔽（余白確保）
// verticalOffsetで追加微調整可能
// === 更新された generateBreathingAnimation関数 ===
// アニメーションキャラクターの場合、最初からフォールバック（静止画）を隠し、直接アニメーション開始
// ロード失敗時のみフォールバック表示（onerrorで .animated 除去）
function generateBreathingAnimation(
  baseImage, 
  displayWidth = 220, 
  maxHeight = 400, 
  cycleDuration = 3.6,
  spritesheetSuffix = '_Breathing.png',
  rows = 3, 
  cols = 4, 
  frameW = 842, 
  frameH = 1248,
  scaleFactor = 0.95,
  innerHeight = null,
  innerWidth = null,
  verticalOffset = '0%'
) {
  const aspectRatio = frameH / frameW;

  let visibleWidth = displayWidth;
  let visibleHeight = visibleWidth * aspectRatio;
  if (visibleHeight > maxHeight) {
    visibleHeight = maxHeight;
    visibleWidth = visibleHeight / aspectRatio;
  }
  visibleWidth = Math.round(visibleWidth);
  visibleHeight = Math.round(visibleHeight);

  const displayInnerHeight = innerHeight !== null && innerHeight !== undefined ? innerHeight : frameH;
  const displayInnerWidth = innerWidth !== null && innerWidth !== undefined ? innerWidth : frameW;

  const normalScale = visibleWidth / frameW;
  const reducedScale = normalScale * scaleFactor;

  const spritesheet = baseImage.replace(/\.png$/i, spritesheetSuffix);

  const fallbackCss = baseImage ? `url('Images/${baseImage}')` : 'none';

  const divHtml = `<div class="sprite-wrapper animated" style="width:${visibleWidth}px; height:${visibleHeight}px; --fallback-img:${fallbackCss};">
    <div class="sprite-breathing"
      data-spritesheet="${spritesheet}"
      data-rows="${rows}"
      data-cols="${cols}"
      data-frame-width="${frameW}"
      data-frame-height="${frameH}"
      data-cycle-duration="${cycleDuration}"
      style="width:${displayInnerWidth}px; height:${displayInnerHeight}px; --scale:${reducedScale}; --vertical-offset:${verticalOffset};">
    </div>
  </div>`;

  return divHtml;
}

// 冒険者の行動履歴を表示するモーダル
function showActionHistory(charIndex) {
    const adv = gameState.adventurers[charIndex];
    if (!adv || !adv.actionHistory || adv.actionHistory.length === 0) {
        better_alert("このキャラクターの行動履歴はありません。", "basic");
        return;
    }

    let html = `
        <div id="historyModal" style="position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9999;
                                      display:flex; justify-content:center; align-items:center;">
            <div style="max-height:80vh; width:95%; max-width:1000px; overflow-y:auto; padding:25px; 
                        background:rgba(30,30,40,0.95); border-radius:16px; color:#ecf0f1; box-shadow:0 10px 40px rgba(0,0,0,0.7);">
                <h2 style="text-align:center; margin-bottom:25px; color:#ffd700;">${adv.name} の行動履歴</h2>
                <table style="width:100%; border-collapse:collapse; font-size:1.05em;">
                    <thead style="background:#2c3e50; position:sticky; top:0; z-index:1;">
                        <tr>
                            <th style="padding:12px; border:1px solid #555; text-align:center;">日</th>
                            <th style="padding:12px; border:1px solid #555;">行動</th>
                            <th style="padding:12px; border:1px solid #555;">詳細</th>
                            <th style="padding:12px; border:1px solid #555; text-align:right;">冒険者</th>
                            <th style="padding:12px; border:1px solid #555; text-align:right;">ギルド</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    // 新しい順（最新が上）
    [...adv.actionHistory].reverse().forEach(entry => {
        const feeText = entry.feePaid > 0 ? `${entry.feePaid}G` : '—';
        const gainText = entry.guildGain > 0 ? `+${entry.guildGain}G` : '—';
        const rowStyle = entry.success === false ? 'background:rgba(139,0,0,0.25);' : '';

        let actionLabel = getActionName(entry.action);
        html += `
<tr style="${rowStyle}">
    <td style="padding:12px; border:1px solid #555; text-align:center;">Day ${entry.day}</td>
    <td style="padding:12px; border:1px solid #555;">${actionLabel}</td>
    <td style="padding:12px; border:1px solid #555;">${entry.description}</td>
    <td style="padding:12px; border:1px solid #555; text-align:right; color:${entry.adventurerChange >= 0 ? '#2ecc71' : '#e74c3c'}; font-weight:bold;">
        ${entry.adventurerChange !== 0 ? (entry.adventurerChange > 0 ? '+' : '') + entry.adventurerChange + 'G' : '—'}
    </td>
    <td style="padding:12px; border:1px solid #555; text-align:right; color:${entry.guildGain > 0 ? '#2ecc71' : '#e74c3c'}; font-weight:bold;">
        ${entry.guildGain > 0 ? '+' + entry.guildGain + 'G' :  entry.guildGain + 'G'}
    </td>
</tr>
        `;
    });

    html += `
                    </tbody>
                </table>
                <div style="text-align:center; margin-top:30px;">
                    <button onclick="closeHistoryModal()" 
                            style="padding:14px 40px; background:#e74c3c; color:white; border:none; border-radius:10px; font-size:1.2em; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.5);">
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    `;

    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = html;
    document.body.appendChild(modalDiv.firstElementChild);

    const modal = document.getElementById('historyModal');
    modal.addEventListener('click', e => {
        if (e.target === modal) closeHistoryModal();
    });

    const escHandler = e => {
        if (e.key === 'Escape') {
            closeHistoryModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
    }
}

// === 新規追加: 関係性表示モーダル関数 ===
function showRelationships(charIndex) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0 || charIndex >= perms.length) return;

    const adv = perms[charIndex];

    // 評価テキストを取得するヘルパー（翻訳対応）
    function getEvaluation(val) {
        if (val >= 80) return { text: t('friendliness_love'), color: '#ff69b4' };
        if (val >= 70) return { text: t('friendliness_like'), color: '#ff1493' };
        if (val >= 60) return { text: t('friendliness_friendly'), color: '#ff8c00' };
        if (val >= 40) return { text: t('friendliness_normal'), color: '#ffffff' };
        if (val >= 30) return { text: t('friendliness_cold'), color: '#87cefa' };
        if (val >= 20) return { text: t('friendliness_dislike'), color: '#4682b4' };
        return { text: t('friendliness_hate'), color: '#00008b' };
    }

    // モーダル作成（すべて翻訳対応）
    let html = `
        <div id="relationshipModal" style="
            display: flex;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="
                background: #222;
                border-radius: 15px;
                padding: 25px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0,0,0,0.8);
                color: white;
            ">
                <h2 style="text-align:center; color:#ffd700; margin-bottom:20px;">
                    ${t('relationship_title', {name: adv.name})}
                </h2>
                <div style="margin-bottom:20px; background: transparent;">
    `;

    // 他の冒険者全員との好感度を表示（自分以外）
    const others = perms.filter(a => a.id !== adv.id);
    if (others.length === 0) {
        html += `<p style="text-align:center; color:#aaa;">${t('relationship_no_others')}</p>`;
    } else {
        html += `<table style="width:100%; border-collapse:collapse; table-layout:fixed;">
                    <thead>
                        <tr style="border-bottom:2px solid #444;">
                            <th style="width:25%; padding:12px; text-align:left;">${t('relationship_table_opponent')}</th>
                            <th style="width:15%; padding:12px; text-align:center;">${t('relationship_table_friendliness')}</th>
                            <th style="width:35%; padding:12px; text-align:left;">影響特性</th>
                            <th style="width:25%; padding:12px; text-align:center;">${t('relationship_table_evaluation')}</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        others.forEach(other => {
            let baseVal = adv.friendliness?.[other.id] ?? 50;
            let bonus = 0;
            let traitsList = [];

            // advの特性からotherに対するボーナスを計算し、影響特性を収集
            adv.traits.forEach(trait => {
                let delta = 0;
                if (trait.type === 'gender' && trait.preference === other.gender) {
                    delta = trait.delta ?? 0;
                } else if (trait.type === 'primary' && trait.preference === other.primary) {
                    delta = trait.delta ?? 0;
                } else if (trait.type === 'level') {
                    const levelDiff = other.level - adv.level;
                    if ((trait.preference === 'higher' && levelDiff > 0) || (trait.preference === 'lower' && levelDiff < 0)) {
                        delta = trait.delta ?? 0;
                    }
                } else if (trait.type === 'stat_compare') {
                    const stats = ['strength', 'wisdom', 'dexterity', 'luck'];
                    const myStat = adv[stats[trait.stat]];
                    const otherStat = other[stats[trait.stat]];
                    if ((trait.preference === 'higher' && otherStat > myStat) || (trait.preference === 'lower' && otherStat < myStat)) {
                        delta = trait.delta ?? 0;
                    }
                }

                if (delta !== 0) {
                    bonus += delta;
                    const sign = delta >= 0 ? "+" : "";
                    traitsList.push(`${t(trait.translationKey)} (${sign}${delta})`);
                }
            });

            const val = baseVal + bonus;
            const evaluation = getEvaluation(val);

            const traitDisplay = traitsList.length ? traitsList.join('<br>') : 'なし';

            html += `
                <tr style="border-bottom:1px solid #333;">
                    <td style="padding:12px; word-wrap:break-word;">${other.name}</td>
                    <td style="padding:12px; text-align:center; font-weight:bold;">${val}</td>
                    <td style="padding:12px; font-size:0.9em; color:#ffd700; line-height:1.4;">${traitDisplay}</td>
                    <td style="padding:12px; text-align:center; color:${evaluation.color};">${evaluation.text}</td>
                </tr>`;
        });
        
        html += `</tbody></table>`;
    }

    html += `
                </div>
                <div style="text-align:center; background: transparent;">
                    <button onclick="closeRelationshipModal()" style="
                        padding:12px 40px;
                        background:#c0392b;
                        color:white;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                        font-size:1.1em;
                    ">
                        ${t('close_button')}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
}

// モーダル閉じる補助関数
function closeRelationshipModal() {
    const modal = document.getElementById('relationshipModal');
    if (modal) modal.remove();
}

// === 特性を日本語で表示するヘルパー ===
// 新規追加関数：特性表示を詳細付きで生成
function getTraitsDisplay(adv) {
    if (!adv.traits || adv.traits.length === 0) {
        return t("trait.none") || "なし";
    }

    return adv.traits.map(trait => {
        const name = t(trait.translationKey);
        let detailed = "";

        // すべての数値で正しく + / - を表示
        const rawValue = trait.delta ?? trait.weight_bonus ?? 0;
        const sign = rawValue >= 0 ? "+" : "-";
        const displayedValue = Math.abs(rawValue);

        if (['gender', 'primary', 'level', 'stat_compare'].includes(trait.type)) {
            let target = "";

            if (trait.type === 'gender') {
                const genderKey = trait.preference === 'M' ? "trait.male_adventurers" : "trait.female_adventurers";
                target = t(genderKey);

            } else if (trait.type === 'primary') {
                const primaries = ["strength", "wisdom", "dexterity", "luck"];
                const pStat = t(`stat_${primaries[trait.preference]}`);
                target = pStat + t("trait.primary_suffix");

            } else if (trait.type === 'level') {
                const levelKey = trait.preference === 'higher' ? "trait.seniors" : "trait.juniors";
                target = t(levelKey);

            } else if (trait.type === 'stat_compare') {
                const stats = ["strength", "wisdom", "dexterity", "luck"];
                const sStat = t(`stat_${stats[trait.stat]}`);
                const comp = trait.preference === 'higher' ? t("trait.higher") : t("trait.lower");
                target = comp + sStat + t("trait.compare_suffix");
            }

            detailed = target + " " + t("trait.friendliness_prefix") + sign + displayedValue;

        } else if (trait.type === 'action_preference') {
            const actionName = t(`action_${trait.action}`) || trait.action;
            detailed = actionName + t("trait.action_priority_suffix") + sign + displayedValue;

        } else if (trait.type === 'initial_bonus') {
            let targetName = "";
            switch (trait.target) {
                case 'strength': targetName = t("stat_strength"); break;
                case 'wisdom': targetName = t("stat_wisdom"); break;
                case 'dexterity': targetName = t("stat_dexterity"); break;
                case 'luck': targetName = t("stat_luck"); break;
                case 'defense': targetName = t("stat_defense"); break;
                case 'maxHp': targetName = t("stat.max_hp"); break;
                case 'maxMp': targetName = t("stat.max_mp"); break;
            }
            detailed = t("trait.initial_prefix") + targetName + sign + displayedValue;

        } else if (trait.type === 'percent_bonus') {
            let targetName = "";
            switch (trait.target) {
                case 'strength': targetName = t("stat_strength"); break;
                case 'wisdom': targetName = t("stat_wisdom"); break;
                case 'dexterity': targetName = t("stat_dexterity"); break;
                case 'luck': targetName = t("stat_luck"); break;
                case 'defense': targetName = t("stat_defense"); break;
            }
            detailed = targetName + sign + displayedValue + "%";
        }

        return `${name} (${detailed})`;
    }).join("<br>");
}

// モーダル閉じる補助関数
function closeRelationshipModal() {
    const modal = document.getElementById('relationshipModal');
    if (modal) modal.remove();
}


// === 新規関数: 冒険者カード編集モーダル ===
// === 新規関数: 冒険者カード編集モーダル（動的作成 + 既存関数非依存）===
function openAdventurerCard(index) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[index];
    if (!adv) return;

    // === 安全初期化（セーブデータ互換性確保 + 型チェック）===
    if (!adv.rank) adv.rank = 'F';
    if (!Array.isArray(adv.prohibitedActions)) {
        adv.prohibitedActions = [];
    }

    // ランクリスト（F から S+ まで）
    const ranks = ['F', 'F+', 'E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+'];

    let rankOptions = '';
    ranks.forEach(r => {
        const selected = r === adv.rank ? 'selected' : '';
        rankOptions += `<option value="${r}" ${selected}>${r}</option>`;
    });

    // 給与計算関数
    const getSalary = (rank) => {
        const idx = ranks.indexOf(rank);
        return 50 + 50 * idx * (idx + 1) / 2;
    };

    const currentSalary = getSalary(adv.rank);

    // 禁止行動チェックボックス
    const actions = ['tavern', 'blacksmith', 'alchemy', 'guild_stay', 'street_walk','hunting','gather'];
    let prohibitChecks = '';
    actions.forEach(act => {
        const checked = adv.prohibitedActions.includes(act) ? 'checked' : '';
        const label = t(`action_${act}`) || act;
        prohibitChecks += `
            <label style="display:block; margin:8px 0;">
                <input type="checkbox" id="prohibit_${act}" ${checked}> ${label}
            </label>`;
    });

    // === モーダルを動的に作成 ===
    let modal = document.getElementById('cardModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cardModal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.8);
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
        `;

        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px; right: 20px;
            font-size: 40px;
            color: #ffd700;
            cursor: pointer;
            text-shadow: 0 0 10px black;
        `;
        closeBtn.onclick = () => closeAdventurerCard();

        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
    }

    let content = modal.querySelector('.modal-content');
    if (!content) {
        content = document.createElement('div');
        content.className = 'modal-content';
        modal.appendChild(content);
    }

    content.innerHTML = `
        <div style="max-width:600px; background:rgba(30,30,50,0.95); border-radius:16px; padding:30px; position:relative;">
            <h2 style="text-align:center; color:#ffd700; margin-bottom:30px;">
                ${t('edit_adventurer_card_title', { name: adv.name })}
            </h2>
            <div style="margin:20px 0;">
                <p><strong>${t('current_rank')}:</strong> ${adv.rank} 
                    <span style="color:#ffd700;">(${currentSalary}G / 7 days)</span>
                </p>
                <label><strong>${t('rank_change')}:</strong></label>
                <select id="cardRankSelect" style="width:100%; padding:10px; margin-top:8px; border-radius:8px; background:#333; color:white;">
                    ${rankOptions}
                </select>
                <p style="margin-top:12px;">
                    <strong>${t('preview_salary_label')}:</strong> 
                    <span id="previewSalary" style="color:#ffd700; font-weight:bold;">${currentSalary}G / 7 days</span>
                </p>
            </div>
            <div style="margin:20px 0;">
                <p><strong>${t('prohibited_actions_setting')}:</strong> 
                    ${t('prohibit_penalty_note')}
                </p>
                ${prohibitChecks}
            </div>
            <div style="text-align:center; margin-top:30px;">
                <button onclick="saveAdventurerCard(${index})" style="padding:12px 30px; background:#27ae60; color:white; border:none; border-radius:8px; font-size:1.2em; margin:0 10px;">
                    ${t('save_card')}
                </button>
                <button onclick="closeAdventurerCard()" style="padding:12px 30px; background:#95a5a6; color:white; border:none; border-radius:8px; font-size:1.2em; margin:0 10px;">
                    ${t('close')}
                </button>
            </div>
        </div>`;

    // モーダル表示後にプレビュー更新ロジックを追加
    modal.style.display = 'flex';

    const rankSelect = document.getElementById('cardRankSelect');
    const previewSalary = document.getElementById('previewSalary');

    if (rankSelect && previewSalary) {
        const updatePreview = () => {
            const selectedRank = rankSelect.value;
            const salary = getSalary(selectedRank);
            previewSalary.innerText = `${salary}G / 7 days`;
        };

        updatePreview(); // 初期表示
        rankSelect.addEventListener('change', updatePreview);
    }
}

// === カードモーダル閉じる関数 ===
function closeAdventurerCard() {
    const modal = document.getElementById('cardModal');
    if (modal) modal.style.display = 'none';
}

// === カード保存処理 ===
function saveAdventurerCard(index) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[index];
    if (!adv) return;

    // === 安全初期化（好感度フィールド）===
    if (adv.Friendliness === undefined) adv.Friendliness = 50;

    // 旧ランクを記録
    const oldRank = adv.rank || 'F';

    // 新ランク取得
    const newRank = document.getElementById('cardRankSelect').value;

    // === ランク変動による好感度処理 ===
    const rankValues = {
        'F': 0,
        'F+': 1,
        'E': 2,   // Eランクを追加（例の「F → E+ で +15」を再現するため）
        'E+': 3,
        'D': 4,
        'D+': 5,
        'C': 6,
        'C+': 7,
        'B': 8,
        'B+': 9,
        'A': 10,
        'A+': 11,
        'S': 12,
        'S+': 13
    };

    const oldValue = rankValues[oldRank] ?? 0;
    const newValue = rankValues[newRank] ?? 0;
    const deltaSteps = newValue - oldValue;

    if (deltaSteps !== 0) {
        let deltaFriend = 0;
        let message = '';

        if (deltaSteps > 0) {
            // 昇格：1ランクアップごとに好感度 +5
            deltaFriend = deltaSteps * 5;
            adv.Friendliness = Math.min(100, adv.Friendliness + deltaFriend);
            message = t('card_rank_promotion_bonus', {name: adv.name, old: oldRank, new: newRank, bonus: deltaFriend})
                      || `${adv.name}のランクが${oldRank}→${newRank}に昇格！ 好感度 +${deltaFriend}`;
        } else {
            // 降格：1ランクダウンごとに好感度 -20
            deltaFriend = deltaSteps * 20; // 負の値
            adv.Friendliness = Math.max(0, adv.Friendliness + deltaFriend);
            message = t('card_rank_demotion_penalty', {name: adv.name, old: oldRank, new: newRank, penalty: -deltaFriend})
                      || `${adv.name}のランクが${oldRank}→${newRank}に降格… 好感度 ${deltaFriend}`;
        }

        better_alert(message, "friendliness", {delta: deltaFriend});
    }

    // ランクを実際に更新
    adv.rank = newRank;

    // === 禁止行動更新（既存ロジックそのまま）===
    const actions = ['tavern', 'blacksmith', 'alchemy', 'guild_stay', 'street_walk', 'hunting', 'gather'];
    const newProhibited = [];
    actions.forEach(act => {
        if (document.getElementById(`prohibit_${act}`).checked) {
            newProhibited.push(act);
        }
    });

    // 旧禁止数（安全取得）
    const oldCount = Array.isArray(adv.prohibitedActions) ? adv.prohibitedActions.length : 0;
    const newCount = newProhibited.length;

    // 差分計算
    const difference = newCount - oldCount; // 正: 増加、負: 減少、0: 変化なし

    if (difference !== 0) {
        const changeAmount = Math.abs(difference) * 5;
        const changeAmount_increase = Math.abs(difference) * 2;

        if (difference > 0) {
            // 禁止増加 → 好感度減少
            adv.Friendliness = Math.max(0, adv.Friendliness - changeAmount);

            better_alert(t('card_prohibit_penalty', {name: adv.name, penalty: changeAmount}), "friendliness", {delta: -changeAmount});
        } else {
            // 禁止減少 → 好感度増加（上限100）
            adv.Friendliness = Math.min(100, adv.Friendliness + changeAmount_increase);

            better_alert(t('card_prohibit_reward', {name: adv.name, reward: changeAmount_increase}), "friendliness", {delta: changeAmount_increase});
        }
    }

    // 禁止リストを更新
    adv.prohibitedActions = newProhibited;

    // カード更新日記録（28日周期用）
    adv.cardLastRenewed = gameState.day;

    closeAdventurerCard();
    updateDisplays();
    renderCurrentCharacter();
    better_alert(t('card_updated', {name: adv.name}), "success");
}
// === 完全改修版 renderCurrentCharacter ===
function renderCurrentCharacter() {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) {
        document.getElementById('charactersContent').innerHTML = `<p>${t('no_permanent_adventurers')}</p>`;
        return;
    }
    if (currentCharIndex >= perms.length || currentCharIndex < 0) currentCharIndex = 0;
    const adv = perms[currentCharIndex];

    // スロットを初期化（後方互換対応 + 新スロット追加）
    initializeSlots(adv);

    const eff = {
        strength: getEffectiveStat(adv, 'strength'),
        wisdom: getEffectiveStat(adv, 'wisdom'),
        dexterity: getEffectiveStat(adv, 'dexterity'),
        luck: getEffectiveStat(adv, 'luck'),
        defense: getEffectiveStat(adv, 'defense'),
    };
    const expNeeded = adv.level * 100;
    const expPct = Math.min(100, (adv.exp / expNeeded) * 100 || 0);
    const hpPct = (adv.hp / adv.maxHp) * 100 || 0;
    const mpPct = (adv.mp / adv.maxMp) * 100 || 0;

    let html = `<div class="char-nav" style="margin-bottom:20px;">
        <button onclick="prevChar()">${t('prev_character')}</button>
        <span>${currentCharIndex + 1} / ${perms.length}</span>
        <button onclick="nextChar()">${t('next_character')}</button>
    </div>`;

    // メインコンテンツ：flexで左右配置
    html += `<div style="display:flex; align-items:flex-start; justify-content:center; gap:40px; flex-wrap:wrap;">`;

    // 左側：名前・ステータス・バー・バフ・装備・アイテム・ボタン
    html += `<div style="flex:1; min-width:300px; max-width:500px;">`;

    html += `<h3 style="margin:0 0 15px 0; text-align:center;">${getNameHtml(adv)} Lv ${adv.level}</h3>`;

    html += `<p style="margin:10px 0;"><strong>${t('status_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
    html += `<li>${t('stat_strength')}: ${eff.strength} (${t('base_stat_label')} ${adv.strength})</li>`;
    html += `<li>${t('stat_wisdom')}: ${eff.wisdom} (${t('base_stat_label')} ${adv.wisdom})</li>`;
    html += `<li>${t('stat_dexterity')}: ${eff.dexterity} (${t('base_stat_label')} ${adv.dexterity})</li>`;
    html += `<li>${t('stat_luck')}: ${eff.luck} (${t('base_stat_label')} ${adv.luck})</li>`;
    html += `<li>${t('stat_defense')}: ${eff.defense} (${t('base_stat_label')} ${adv.defense})</li>`;
    html += `</ul>`;

    // === 特性表示（Statusのすぐ下）===
    html += `<p style="margin:15px 0 10px 0;"><strong>特性</strong><br> ${getTraitsDisplay(adv)}</p>`;

    const hungerPct = Math.round((adv.hunger || 0) * 100);

    html += `<div style="margin:15px 0;">
                <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div>
                ${t('exp_bar_label', {exp: adv.exp, needed: expNeeded})}<br>
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                ${t('hp_bar_label', {hp: adv.hp, maxHp: adv.maxHp})}<br>
                <div class="progress-bar"><div class="progress-fill mp-fill" style="width:${mpPct}%"></div></div>
                ${t('mp_bar_label', {mp: adv.mp, maxMp: adv.maxMp})}<br>
                <div class="progress-bar"><div class="progress-fill hunger-fill" style="width:${hungerPct}%"></div></div>
                ${t('hunger_label')}: ${hungerPct}%
             </div>`;

    if (adv.buffs && adv.buffs.length > 0) {
        html += `<p style="margin:10px 0;"><strong>${t('active_buffs_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        adv.buffs.forEach(b => {
            const isPercent = !!b.percent;
            const bonus = isPercent ? `${b.bonus}%` : `+${b.bonus}`;
            const target = b.stat ? t(`stat_${b.stat}`) : (b.type || '?');
            html += `<li>${t('buff_line', {bonus: bonus, target: target, daysLeft: b.daysLeft ?? '?'})}</li>`;
        });
        html += `</ul>`;
    }

    // === 新しい装備スロット表示（グリッド：アイコンのみ、クリックで詳細）===
    html += `<p style="margin:15px 0 10px;"><strong>${t('equipment_title')}</strong></p>`;

    html += `<div class="equipment-grid" style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
        background: rgba(30,30,40,0.9);
        border-radius: 12px;
        max-width: 900px;
        margin: 0 auto;
    ">`;

    // 新規追加スロット対応 + 列配置最適化（3x3 = 9スロット）
    const slotConfig = [
        { key: 'leftHand', label: 'Left Hand' },
        { key: 'head', label: 'Head' },
        { key: 'cape', label: 'Cape' },

        { key: 'rightHand', label: 'Right Hand' },
        { key: 'body', label: 'Body' },
        { key: 'feet', label: 'Feet' },

        { key: 'gloves', label: 'Gloves' },
        { key: 'legs', label: 'Legs' },
        { key: 'accessory', label: 'Accessory' }
    ];

    slotConfig.forEach(conf => {
        let slotItem = adv.slots[conf.key];
        let isLocked = false;

        // 左手のロック処理（両手武器の場合、右のアイテムを参照）
        if (conf.key === 'leftHand' && slotItem && slotItem.locked) {
            slotItem = adv.slots.rightHand;
            isLocked = true;
        }

        const hasItem = slotItem && !slotItem.locked;

        const iconSize = 32;
        const iconHtml = hasItem || (slotItem && isLocked)
            ? getItemIconHtml(slotItem.name, iconSize)
            : `<div style="width:${iconSize}px; height:${iconSize}px; background:rgba(60,60,60,0.5); border:2px dashed #555; border-radius:8px; margin:0 auto;"></div>`;

        const clickable = hasItem || (slotItem && isLocked) ? `cursor:pointer;` : '';

        html += `
            <div style="
                background:rgba(40,40,50,0.8);
                padding:12px;
                border-radius:10px;
                text-align:center;
                border:1px solid #666;
                box-shadow:0 4px 12px rgba(0,0,0,0.4);
            ">
                <strong style="display:block; margin-bottom:8px; color:#ffd700;">${conf.label}</strong>
                <div onclick="${(hasItem || (slotItem && isLocked)) ? `showEquipmentDetail(${currentCharIndex}, '${conf.key}')` : ''}"
                     style="${clickable} margin:0 auto;">
                    ${iconHtml}
                </div>
                ${!isLocked && hasItem ? `
                    <button class="cancel-btn" style="margin-top:12px; padding:6px 12px;"
                            onclick="removeFromSlot(${currentCharIndex}, '${conf.key}')">
                        ${t('unequip_button')}
                    </button>
                ` : (isLocked ? `<div style="margin-top:8px; color:#888; font-style:italic;">Both Hands</div>` : '')}
            </div>
        `;
    });

    html += `</div>`; // grid end

    // === 装備可能アイテム（カテゴリ対応フィルタ）===
    const equippable = gameState.inventory.filter(it => {
        if (!it.stat || !it.category) return false;
        if ((it.qty || 1) <= 0) return false;

        let canEquip = false;
        switch (it.category) {
            case 'Head':
                canEquip = !adv.slots.head;
                break;
            case 'Body':
                canEquip = !adv.slots.body;
                break;
            case 'Legs':
                canEquip = !adv.slots.legs;
                break;
            case 'Feet':
                canEquip = !adv.slots.feet;
                break;
            case 'Accessory':
                canEquip = !adv.slots.accessory;
                break;
            case 'Gloves':
                canEquip = !adv.slots.gloves;
                break;
            case 'Cape':
                canEquip = !adv.slots.cape;
                break;
            case 'Both Hands':
                canEquip = !adv.slots.leftHand && !adv.slots.rightHand;
                break;
            case 'One Hand':
            default:
                canEquip = !adv.slots.rightHand || 
                          (!adv.slots.leftHand && (!adv.slots.rightHand || adv.slots.rightHand.category !== 'Both Hands'));
                break;
        }
        return canEquip;
    });

    if (equippable.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('equippable_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        equippable.forEach(it => {
            const equipment_icon = getItemIconHtml(it.name, 48);
            const statFull = t(`stat_${it.stat}`);
            const baseBonus = `+${it.bonus}% ${statFull}`;
            const enhBonus = (it.enhancement > 0) 
                ? ` +${it.enhancement}${t('absolute_symbol')}` 
                : '';

            const qtyText = (it.qty || 1) > 1 ? ` x${it.qty || 1}` : '';

            html += `<li style="
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 12px;
                border-radius: 6px;
                margin-bottom: 8px;
                list-style: none;
            ">
                ${equipment_icon}

                <div style="
                    flex: 1;
                    text-shadow: 1px 1px 2px black;
                ">
                    ${it.name}${qtyText} (${baseBonus}${enhBonus}) [${it.category}]
                </div>

                <button onclick="equipToChar(${currentCharIndex}, ${it.id})">
                    ${t('equip_button')}
                </button>
            </li>`;
        });
        html += `</ul>`;
    }

    // ポーション
    const potions = gameState.inventory.filter(it => it.type === 'potion' && (it.qty || 1) > 0);
    if (potions.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('potions_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        potions.forEach(it => {
            const effect = it.restore === 'hp' ? t('potion_hp', {amount: it.amount}) : t('potion_mp', {amount: it.amount});
            const safeName = it.name.replace(/'/g, "\\'");
            html += `<li>${it.name} x${it.qty || 1} (${effect} +${it.amount}) 
                     <button onclick="usePotionOnChar(${currentCharIndex}, '${safeName}')">${t('use_button')}</button></li>`;
        });
        html += `</ul>`;
    }

    // EXPオーブ（effect優先 + 名前フォールバック）
    const levelUpItems = gameState.inventory.filter(it => 
        (it.effect === 'level_up' ||
         it.name === t('exp_orb_small') || it.name === t('exp_orb') || 
         it.name === 'EXPオーブ (小)' || it.name === 'EXPオーブ') && (it.qty || 1) > 0
    );

    if (levelUpItems.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('level_up_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        levelUpItems.forEach(it => {
            let levels = 10; // default to large orb
            if (it.name === t('exp_orb_small') || it.name === 'EXPオーブ (小)') {
                levels = 1;
            }
            if (it.amount !== undefined) {
                levels = it.amount;
            }

            const qtyText = (it.qty || 1) > 1 ? ` x${it.qty || 1}` : '';

            html += `<li>${it.name}${qtyText} ${t('level_up_amount', {levels: levels})} 
                     <button onclick="useExpOrbOnChar(${currentCharIndex}, ${it.id})">${t('use_button')}</button></li>`;
        });
        html += `</ul>`;
    }

    // 消耗品（EXPオーブを確実に除外）
    const consumables = gameState.inventory.filter(it => 
        it.type === 'consumable' && 
        (it.qty || 1) > 0 &&
        it.effect !== 'level_up' &&
        it.name !== t('exp_orb_small') &&
        it.name !== t('exp_orb') &&
        it.name !== 'EXPオーブ (小)' &&
        it.name !== 'EXPオーブ'
    );
    if (consumables.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('consumables_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        consumables.forEach(it => {
            if (!it.buff) return;
            const bonus = it.buff.percent ? `${it.buff.bonus}%` : `+${it.buff.bonus}`;
            const target = it.buff.stat ? t(`stat_${it.buff.stat}`) : it.buff.type;
            html += `<li>${it.name} (${bonus} ${target} ${it.buff.days}${t('days_suffix')})
                     <button onclick="useConsumable(${currentCharIndex}, ${it.id})">${t('use_button')}</button></li>`;
        });
        html += `</ul>`;
    }

    html += `<hr style="margin:20px 0;">`;
    if (adv.busy) {
        html += `<p style="color:red; text-align:center;">${t('on_quest_cannot_fire')}</p>`;
    } else {
        html += `<div style="text-align:center;">
                    <button style="background:#e74c3c; color:white; padding:10px 20px; border:none; border-radius:4px; cursor:pointer;"
                            onclick="firePerm(${currentCharIndex})">${t('fire_adventurer_button')}</button>
                    <button style="background:#3498db; color:white; padding:10px 20px; border:none; border-radius:4px; cursor:pointer;"
                            onclick="openAdventurerCard(${currentCharIndex})">${t('edit_adventurer_card')}</button>
                 </div>`;
    }

    html += `</div>`; // 左側閉じ

    // 右側：画像・ボタン類
    html += `<div style="flex:0 0 auto; text-align:center;">`;

    // 呼吸アニメーション
    const baseKey = adv.image.replace(/\.png$/i, '');
    const settings = breathingAnimationSettings[baseKey] || defaultBreathingSettings;

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const primarySuffix = '_Breathing.png';
    const fallbackSuffix = '_breathing.png';

    let breathingDiv = generateBreathingAnimation(
        adv.image,
        220,
        400,
        settings.cycleDuration,
        primarySuffix,
        settings.rows,
        settings.cols,
        settings.frameW,
        settings.frameH,
        settings.scaleFactor,
        settings.innerHeight,
        settings.innerWidth,
    );

    const basePath = adv.image.replace(/\.png$/i, '');
    const primaryUrl = basePath + primarySuffix;
    const fallbackUrl = basePath + fallbackSuffix;

    const urlRegex = new RegExp(`(url\\(\\s*["']?${escapeRegExp(primaryUrl)}["']?\\s*\\))`, 'gi');
    breathingDiv = breathingDiv.replace(urlRegex, `$1, url("${fallbackUrl}")`);

    html += breathingDiv;

    html += `<p id="friendliness-${adv.name}" style="font-size:1.2em; color:#ffd700; margin-bottom:8px;">
                ${t('friendliness_label')} ${adv.Friendliness}
            </p>`;

    html += `<button onclick="openNpcChat('${adv.name}')" style="margin:20px auto; display:block; padding:12px 30px; background:#8f458f; color:white; border:none; border-radius:8px; font-size:1.2em; cursor:pointer;">
        ${t('talk_to_ai_button', {name: adv.name})}
    </button>`;

    html += `
        <button onclick="showActionHistory(${currentCharIndex})" 
                style="margin:20px auto; display:block; padding:12px 30px; background:#e67e22; color:white; border:none; border-radius:8px; font-size:1.2em; cursor:pointer;">
            ${t('view_action_history')}
        </button>
        
        <button onclick="showRelationships(${currentCharIndex})" 
                style="margin:20px auto; display:block; padding:12px 30px; background:#9b59b6; color:white; border:none; border-radius:8px; font-size:1.2em; cursor:pointer;">
            View Relationship
        </button>
    `;

    html += `</div>`;
    html += `</div>`; // flexコンテナ閉じ

    document.getElementById('charactersContent').innerHTML = html;
}

// === 装備詳細表示関数（クリック時に呼び出し）===
function showEquipmentDetail(pIdx, slotKey) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    if (!adv || !adv.slots) return;

    let item = adv.slots[slotKey];

    // 左手のロックの場合、右のアイテムを表示
    if (slotKey === 'leftHand' && item && item.locked) {
        item = adv.slots.rightHand;
    }

    if (!item) {
        better_alert(t('none_equipment') || "No equipment", "basic");
        return;
    }

    const statFull = t(`stat_${item.stat}_full`) || t(`stat_${item.stat}`) || item.stat;
    const baseBonus = `+${item.bonus}% ${statFull}`;
    const enhBonus = item.enhancement > 0 ? ` +${item.enhancement}${t('absolute_symbol') || ' (absolute)'}` : '';

    // コスト取得（item.cost優先 → shopItems検索）
    let cost = item.cost || 0;
    if (cost === 0) {
        const shopItem = shopItems.find(si => si.name === item.name);
        if (shopItem && shopItem.cost !== undefined) {
            cost = shopItem.cost;
        }
    }

    const categoryText = item.category ? item.category : 'Unknown';
    const costText = cost > 0 ? `${cost}G` : 'Unknown';
    const buybackText = cost > 0 ? `${Math.floor(cost * 1.2)}G` : 'Unknown';

    const message = `
        ${item.name}
        Category: ${categoryText}
        Effect: ${baseBonus}${enhBonus}
        Base Cost: ${costText}
        Buyback Value: ${buybackText}
        ${item.description ? `${item.description}` : ''}
    `;

    better_alert(message, "basic");
}




function getDisplayableQuests() {
    // 完了していないクエストを表示（プレイヤー投稿のメイン/ダンジョンなどは daysLeft:999 なので常に表示）
    return gameState.quests.filter(q => !q.completed);
}

// Updated renderQuests() with full translation support
function renderQuests() {
    const quests = getDisplayableQuests(); // !q.completed のクエスト
    const container = document.getElementById('quests');
    const counter = document.getElementById('questCounter');

    if (quests.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#ffffff; padding:60px; font-size:1.4em;">${t('no_available_quests')}</p>`;
        counter.textContent = '';
        return;
    }

    // インデックスを範囲内に収める
    if (currentQuestIndex >= quests.length) currentQuestIndex = 0;
    if (currentQuestIndex < 0) currentQuestIndex = quests.length - 1;

    const q = quests[currentQuestIndex];
    counter.textContent = t('quest_counter', {current: currentQuestIndex + 1, total: quests.length});

    // タイプクラス設定
    let typeClass = questTypeClasses[q.type] || '';
    if (q.side) typeClass += ' side';
    if (q.training) typeClass = 'training';
    if (q.playerPosted) {
        if (q.type === 6) typeClass = 'main';
        else if (q.type === 7) typeClass = 'dungeon';
        else if (q.type === 8) typeClass = 'trade';
    }

    // チーム有効ステータス合計
    const teamStr = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'strength'), 0);
    const teamWis = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'wisdom'), 0);
    const teamDex = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'dexterity'), 0);
    const teamLuk = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), 'luck'), 0);

    // 予想日数・成功確率計算
    let estDays = t('na');
    let chance = 0;
    let chanceSuffix = '%';
    const maxSlots = q.training ? 2 : 4;

    if (q.assigned.length > 0) {
        if (q.training) {
            estDays = t('training_days');
            chance = 100;
        } else if (q.defense) {
            estDays = t('defense_today');
            chance = t('tactical_combat');
            chanceSuffix = '';
        } else if (q.type === 8 || q.type === 'trade') {
            chance = 100; // 確定成功
            // estDays は貿易リスク情報内で表示するのでここでは空にしておく
            estDays = '';
        } else {
            const meetsAll = teamStr >= q.minStrength && teamWis >= q.minWisdom && 
                            teamDex >= q.minDexterity && teamLuk >= q.minLuck;
            if (!meetsAll) {
                estDays = t('failure');
                chance = 0;
            } else {
                let teamFocus = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), q.focusStat), 0);
                const excess = (teamFocus / q.minFocus) - 1;
                const prob = Math.min(0.8, 0.1 + Math.max(0, excess) * 0.2);
                chance = Math.round(prob * 100);
                const days = Math.max(1, Math.ceil(1 / prob));
                estDays = t('estimated_days', {days});
            }
        }
    }

    // 割り当て済み冒険者HTML
    let assignedHtml = '';
    q.assigned.forEach(id => {
        const a = findAdv(id);
        if (a) {
            const nameHtml = getNameHtml(a);
            if (q.inProgress) {
                assignedHtml += `<span class="assigned-adventurer"><img src="Images/${a.image}" class="adventurer-img">${nameHtml}</span>`;
            } else {
                assignedHtml += `<span class="assigned-adventurer clickable" onclick="unassign(${q.id}, ${id})">
                                    <img src="Images/${a.image}" class="adventurer-img">
                                    ${nameHtml}
                                 </span>`;
            }
        }
    });
    if (assignedHtml === '') {
        assignedHtml = `<span style="color:#aaa;">${t('no_assignment')}</span>`;
    }

    // 必要ステータスHTML（アイコン付き） - 貿易クエストでは表示しない
    let minHtml = '';
    if (!q.defense && !q.playerPosted && (q.type !== 8 && q.type !== 'trade')) {
        minHtml = `<p>${t('required_label')}: 
                     <img src="Images/STR.png" class="stat-icon" title="${t('stat_strength')}"> ${t('stat_strength')} ${q.minStrength || 0} | 
                     <img src="Images/WIS.png" class="stat-icon" title="${t('stat_wisdom')}"> ${t('stat_wisdom')} ${q.minWisdom || 0} | 
                     <img src="Images/DEX.png" class="stat-icon" title="${t('stat_dexterity')}"> ${t('stat_dexterity')} ${q.minDexterity || 0} | 
                     <img src="Images/LUC.png" class="stat-icon" title="${t('stat_luck')}"> ${t('stat_luck')} ${q.minLuck || 0}
                   </p>`;
    }

    const teamHtml = `<img src="Images/STR.png" class="stat-icon" title="${t('stat_strength')}"> ${t('stat_strength')} ${teamStr} | 
                      <img src="Images/WIS.png" class="stat-icon" title="${t('stat_wisdom')}"> ${t('stat_wisdom')} ${teamWis} | 
                      <img src="Images/DEX.png" class="stat-icon" title="${t('stat_dexterity')}"> ${t('stat_dexterity')} ${teamDex} | 
                      <img src="Images/LUC.png" class="stat-icon" title="${t('stat_luck')}"> ${t('stat_luck')} ${teamLuk}`;

    // === 貿易クエスト専用リスク情報（日数情報をここに集約）===
    let tradeRiskHtml = '';
    if (q.type === 8 || q.type === 'trade') {
        const totalValue = q.reward + (q.buyCost || 0);
        const totalDays = q.totalDaysRecorded || q.tradeRemainingDays || 0;
        const remainDays = q.inProgress ? q.tradeRemainingDays : totalDays;

        // 一時冒険者のチェック
        const hasTemp = q.assigned.some(id => {
            const adv = findAdv(id);
            return adv && adv.temp;
        });
        const tempWarning = hasTemp 
            ? `<p style="color:#ff5722; font-weight:bold; margin:8px 0;">※一時冒険者は貿易クエストに参加できません（解除してください）</p>`
            : '';

        let encounterChance = 0;
        let baseChancePercent = 0;
        let lukReductionPercent = 0;
        let lossInfo = '';

        if (q.assigned.length === 0) {
            encounterChance = 100;
            baseChancePercent = 100;
            lukReductionPercent = 0;
            lossInfo = '護衛なし: 80%損失確定';
        } else {
            let baseChance = 0.1 + (totalValue / 30000);
            baseChance = Math.min(0.7, baseChance);
            baseChancePercent = Math.round(baseChance * 100);

            lukReductionPercent = Math.round(teamLuk * 0.05);
            encounterChance = Math.max(0, baseChancePercent - lukReductionPercent);

            const dexReductionPercent = Math.round(teamDex * 0.05);
            const minLoss = Math.max(0, 30 - dexReductionPercent);
            const maxLoss = Math.max(0, 50 - dexReductionPercent);

            lossInfo = `遭遇時損失: ${minLoss}-${maxLoss}% (DEXで-${dexReductionPercent}%)`;
        }

        tradeRiskHtml = `
            <div style="margin-top:20px; padding:0px; background:rgba(255, 60, 60, 0.2); border:2px solid #ff5722; border-radius:12px;">
                <p style="margin:5px 0; color:#ffffff;">残り日数: <strong>${remainDays}日</strong></p>
                <p style="margin:5px 0; color:#ffffff;">
                    盗賊遭遇確率: <strong>${encounterChance}%</strong> (Item Worthで${baseChancePercent}%, LUKで-${lukReductionPercent}%軽減)
                </p>
                <p style="margin:5px 0; color:#ffffff;">
                    ${lossInfo}
                </p>
                ${tempWarning}
            </div>`;
    }

    // メインHTML構築
    let html = `
        <div class="quest-card ${typeClass}" 
             data-quest-id="${q.id}"
             ondrop="drop(event)" 
             ondragover="allowDrop(event)" 
             ondragleave="dragLeave(event)">
            <h3>${q.desc}</h3>`;

    if (q.training) {
        html += `<p><strong>${t('training_quest_title')}</strong></p>`;
        html += `<p>${t('training_quest_desc')}</p>`;
        html += `<p>${t('difficulty_label')}: ${q.difficulty} | ${t('required_stats')}: ${t('all_zero')}</p>`;
    } else {
        // 貿易クエストでは難易度行を完全にスキップ
        if (!(q.type === 8 || q.type === 'trade')) {
            html += `<p>${t('difficulty_label')}: ${q.difficulty} (${q.rank || ''}) | ${t('days_left_label')}: ${q.daysLeft} | ${t('reward_label')}: ${q.reward}G</p>`;
            if (q.defense) {
                html += `<p><strong style="color:red;">${t('defense_warning')}</strong></p>`;
            }
        }
        html += minHtml; // 貿易クエストでは空
    }

    // 貿易クエスト以外では予想日数を表示
    if (!(q.type === 8 || q.type === 'trade')) {
        html += `<p>${t('estimated_days_label')}: ${estDays}</p>`;
    }

    // チームステータスと成功確率（貿易クエストでも100%表示）
    html += `<p>${t('team_label')}: ${teamHtml} | ${t('success_rate_label')}: ${chance}${chanceSuffix}</p>
             ${tradeRiskHtml}
             <div style="margin-top:15px;">${t('assigned_label', {current: q.assigned.length, max: maxSlots})}: 
                 ${assignedHtml}
             </div>`;

    // 拒否ボタン（条件一致時のみ）
    if (q.assigned.length === 0 && !q.inProgress && !q.defense && !q.training && !q.playerPosted) {
        const rejectPenalty = (0.1 * q.difficulty).toFixed(1);
        html += `<p style="margin-top:15px;">
                    <button onclick="rejectQuest(${q.id})" 
                            style="background:#e74c3c; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
                        ${t('reject_button')} (${t('reputation_penalty')}-${rejectPenalty})
                    </button>
                 </p>`;
    }

    if (q.inProgress) {
        html += `<p class="in-progress" style="margin-top:15px;">${t('in_progress_message')}</p>`;
    }

    html += `</div>`; // .quest-card 閉じ

    container.innerHTML = html;
}

function prevQuest() {
    const quests = getDisplayableQuests();
    if (quests.length <= 1) return;
    currentQuestIndex--;
    if (currentQuestIndex < 0) currentQuestIndex = quests.length - 1;
    renderQuests();
}

function nextQuest() {
    const quests = getDisplayableQuests();
    if (quests.length <= 1) return;
    currentQuestIndex++;
    if (currentQuestIndex >= quests.length) currentQuestIndex = 0;
    renderQuests();
}

// Keyboard navigation: A/a = previous, D/d = next
document.addEventListener('keydown', (event) => {
    // Ignore if focus is on an input, textarea, or contenteditable element
    const activeTag = document.activeElement.tagName;
    const isEditable = document.activeElement.isContentEditable;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || isEditable) {
        return;
    }

    // Helper to check if a modal is visible
    const isModalVisible = (id) => {
        const el = document.getElementById(id);
        return el && window.getComputedStyle(el).display !== 'none';
    };

    // Modal visibility checks (cached for readability and minor perf gain)
    const isEventOpen          = isModalVisible('eventModal');
    const isShopOpen           = isModalVisible('shopModal');
    const isCharactersOpen     = isModalVisible('charactersModal');
    const isQuestCompletionOpen = isModalVisible('questCompletionModal');
    const isBattleOpen         = isModalVisible('battleModal');
    const isFacilitiesOpen     = isModalVisible('facilitiesModal');
    const isGuildQuestsOpen    = isModalVisible('guildQuestsModal');
    const isInventoryOpen      = isModalVisible('inventoryModal');
    const isNPCsOpen           = isModalVisible('npcsModal');

    const key = event.key.toLowerCase();

    // Left / Right navigation (A/D or arrow keys)
    if (key === 'a' || event.key === 'ArrowLeft') {
        if (isEventOpen) {
            prevPage();
        } else if (isCharactersOpen) {
            prevChar();
        } else if (isShopOpen) {
            prevShopPage();
        } else {
            prevQuest();
        }
    } else if (key === 'd' || event.key === 'ArrowRight') {
        if (isEventOpen) {
            nextPage();
        } else if (isCharactersOpen) {
            nextChar();
        } else if (isShopOpen) {
            nextShopPage();
        } else {
            nextQuest();
        }
    }
    // Unassign last adventurer from current quest with 'C'
    else if (key === 'c') {
        const questCard = document.querySelector('.quest-card');
        if (!questCard) return;

        const questId = parseInt(questCard.dataset.questId);
        if (isNaN(questId)) return;

        const q = gameState.quests.find(qq => qq.id === questId);
        if (!q || q.inProgress || q.assigned.length === 0) return;

        const advId = q.assigned[q.assigned.length - 1];
        unassign(questId, advId);
    }
    // Advance day with Enter (only when specific modals are closed)
    else if (event.key === 'Enter' && !isEventOpen && !isShopOpen && !isCharactersOpen && !isBattleOpen) {
        playDay();
    }
    // Close modals with Space (prevent page scroll)
    else if (event.key === ' ') {
        event.preventDefault();

        if (isEventOpen) {
            if (!isQuestCompletionOpen) {
                closeModal();
            }
        } else if (isShopOpen) {
            closeShop();
        } else if (isCharactersOpen) {
            closeCharacters();
        } else if (isFacilitiesOpen) {
            closeFacilities();
        } else if (isGuildQuestsOpen) {
            closeGuildQuests();
        } else if (isInventoryOpen) {
            closeInventory();
        } else if (isNPCsOpen) {
            closeNPCs();
        }
    }
});


function renderCurrentNPC() {
    const discoveredIndices = gameState.discoveredNPCs;
    const content = document.getElementById('npcsContent');
    if (discoveredIndices.length === 0) {
        content.innerHTML = '<div style="text-align:center; padding:40px; color:#6c757d;"><h3>発見したNPC</h3><p style="font-size:1.2em;">まだNPCを発見していません。<br>発見クエストを成功させてください。</p></div>';
        return;
    }
    const idx = discoveredIndices[currentNPCIndex];
    const name = discoveryNPCs[idx];
    let html = '<div style="max-width:500px; margin:0 auto; padding:40px; text-align:center;">';
    html += `<img src="Images/${name}.jpg" alt="${name}" class="npc-img" onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTQwIDE4MCI+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiM3NDc0NzQiLz48dGV4dCB4PSI3MCIgeT0iOTAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7nlLvlg4/jgarjgZc8L3RleHQ+PC9zdmc+\'; this.onerror=null;">`;
    html += `<h2 style="color:#2c3e50; margin:20px 0 10px;">${name}</h2>`;
    html += '<div style="background:#f8f9fa; padding:20px; border-radius:12px; margin:20px 0; font-size:1.1em; color:#495057;">';
    html += '<p>発見済みNPC</p>';
    html += '<div class="char-nav">';
    html += `<button onclick="prevNPC()" style="padding:10px 20px;">前</button>`;
    html += `<span style="font-size:1.2em; margin:0 20px;">${currentNPCIndex + 1} / ${discoveredIndices.length}</span>`;
    html += `<button onclick="nextNPC()" style="padding:10px 20px;">次</button>`;
    html += '</div>';
    html += '</div>';
    html += '<div>';
    html += `<button onclick="receiveSideQuest(${idx})" style="background:#27ae60; color:white; padding:15px 30px; font-size:1.2em; border:none; border-radius:8px; cursor:pointer;">サイドクエスト受注</button>`;
    html += `<button onclick="openNpcChat(${name})" style="background:#27ae60; color:white; padding:15px 30px; font-size:1.2em; border:none; border-radius:8px; cursor:pointer;">${name}と話す (AI)</button>`;
    html += '</div>';
    html += '</div>';

    content.innerHTML = html;
}

function prevNPC() {
    const len = gameState.discoveredNPCs.length;
    if (len === 0) return;
    currentNPCIndex = (currentNPCIndex - 1 + len) % len;
    renderCurrentNPC();
}

function nextNPC() {
    const len = gameState.discoveredNPCs.length;
    if (len === 0) return;
    currentNPCIndex = (currentNPCIndex + 1) % len;
    renderCurrentNPC();
}

function prevChar() {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) return;
    currentCharIndex = (currentCharIndex - 1 + perms.length) % perms.length;
    renderCurrentCharacter();
}

function nextChar() {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) return;
    currentCharIndex = (currentCharIndex + 1) % perms.length;
    renderCurrentCharacter();
}

function dragLeave(e){
    if(e.currentTarget.classList.contains('quest-card')){
        e.currentTarget.classList.remove('drag-over');
    }
}

function allowDrop(e) {
    e.preventDefault();
    if (e.currentTarget.classList.contains('quest-card')) {
        e.currentTarget.classList.add('drag-over');
    }
}

function dragLeave(e) {
    if (e.currentTarget.classList.contains('quest-card')) {
        e.currentTarget.classList.remove('drag-over');
    }
}

function drop(e) {
    e.preventDefault();
    if (e.currentTarget.classList.contains('quest-card')) {
        e.currentTarget.classList.remove('drag-over');
        const questId = parseInt(e.currentTarget.dataset.questId);
        if (draggedAdvId !== null && questId !== undefined) {
            assign(questId, parseInt(draggedAdvId));
        }
        draggedAdvId = null;
    }
}

document.addEventListener('click', (e) => {
    const card = e.target.closest('.adventurer-card');
    if (!card) return;

    // ボタン（例: recruitボタンや他のアクションボタン）上のクリックは割り当てを無視
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        return;
    }

    const advId = parseInt(card.dataset.advId);
    if (isNaN(advId)) return;

    // 現在表示されているクエストカードを取得（renderQuests() で1つだけ表示される前提）
    const questCard = document.querySelector('.quest-card');
    if (!questCard) return;

    const questId = parseInt(questCard.dataset.questId);
    if (isNaN(questId)) return;

    // 割り当て実行（assign() が内部で既に割り当て済みチェックやスロット制限をする前提）
    assign(questId, advId);

    // 変更を即時反映
    renderQuests();
    // 必要に応じて冒険者一覧も再描画（例: renderAdventurers();）
});
document.addEventListener('dragstart', e => {
    const card = e.target.closest('.adventurer-card');
    if (card) {
        draggedAdvId = card.dataset.advId;
        card.classList.add('dragging');
        // Optional: for better browser compatibility
        e.dataTransfer.setData('text/plain', draggedAdvId);
    }
});


// 新規追加：BGMクロスフェード共通関数（再利用可能）
function crossfadeTo(newBgmId, duration = 2000) {
    const newBgm = document.getElementById(newBgmId);
    const currentBgms = [
        document.getElementById('main_screen_bgm'),
        document.getElementById('bgm'),
        document.getElementById('introBgm'),
        document.getElementById('battleBgm'),
        document.getElementById('battleBgm2'),
        document.getElementById('dialogueBgm'),
        document.getElementById('QuestEndDialogueBgm'),
        document.getElementById('storyBgm'),
        document.getElementById('GameoverBgm')
    ].filter(b => b !== newBgm && !b.paused);

    // 現在再生中のBGMをすべてフェードアウト（複数対応安全策）
    // 新しいBGMをボリューム0で再生開始
    newBgm.currentTime = 0;
    newBgm.volume = 0;
    newBgm.play().catch(e => console.log('BGM再生エラー:', e));

    const targetVol = 0.2;
    const startTime = Date.now();

    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 現在鳴っているBGMをフェードアウト
        currentBgms.forEach(bgm => {
            bgm.volume = targetVol * (1 - progress);
        });

        // 新しいBGMをフェードイン
        newBgm.volume = targetVol * progress;

        if (progress >= 1) {
            clearInterval(interval);
            // 古いBGMを完全に停止・リセット
            currentBgms.forEach(bgm => {
                bgm.pause();
                bgm.currentTime = 0;
            });
            newBgm.volume = targetVol;
        }
    }, 50);
}

document.addEventListener('dragend', e => {
    const card = e.target.closest('.adventurer-card');
    if (card) {
        card.classList.remove('dragging');
    }
    draggedAdvId = null; // Reset on end
});

startDay();
document.getElementById('main_screen_bgm').volume = 0.2;
document.getElementById('bgm').volume = 0.2;
document.getElementById('introBgm').volume = 0.5;  // ← 新規追加
document.getElementById('battleBgm').volume = 0.3;
document.getElementById('battleBgm2').volume = 0.3;
document.getElementById('dialogueBgm').volume = 0.1;



// ページ全体のクリックを監視
document.addEventListener('click', function(event) {
    // skipIntroBtn（またはその子要素）がクリックされたかをチェック
    const isSkipBtn = event.target.id === 'skipIntroBtn' || 
                      event.target.closest('#skipIntroBtn');

    // 「続きから始める」ボタンがクリックされた場合 → BGMを再生しない
    if (isSkipBtn) {
        // 何もしない（BGM再生をスキップ）
        return;
    }

    // それ以外の場所がクリックされた場合 → まだBGM再生されていないなら再生
    if (!audioPlayed) {
        const bgm = document.getElementById('main_screen_bgm');
        bgm.play().catch(e => console.log('BGM再生エラー:', e));
        audioPlayed = true;
    }
});

// 横スクロール制御（利用可能冒険者） – 端近くで左クリック（ホールド）して3カードずつページングスクロール版
const scrollContainer = document.getElementById('availableAdvs');
let scrollInterval = null;
let scrollDirection = 0; // -1: 左, 1: 右, 0: 停止
const SCROLL_THRESHOLD = 100;    // 端からの感度範囲（px）
const PAGE_INTERVAL = 600;       // ホールド中の連続ページング間隔（ms） – 速めで快適（調整可能）
let stepAmount = 0;              // 動的に計算する3カード分のスクロール量

// カード幅 + gap を計算
function calculateStepAmount() {
    if (stepAmount > 0) return;

    const cards = scrollContainer.querySelectorAll('.adventurer-card');
    if (cards.length === 0) return;

    const card = cards[0];
    const cardWidth = card.offsetWidth;
    const style = getComputedStyle(scrollContainer);
    const gap = parseFloat(style.gap) || 0;

    stepAmount = cardWidth * 3 + gap * 2;
}

// ページングスクロール実行（1回）
function performPageScroll() {
    if (scrollDirection === 0 || stepAmount === 0) return;

    const currentLeft = scrollContainer.scrollLeft;
    const maxLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    let newLeft = currentLeft + (scrollDirection * stepAmount);

    if (newLeft < 0) {
        newLeft = 0;
        clearInterval(scrollInterval);
        scrollInterval = null;
        scrollDirection = 0;
    } else if (newLeft > maxLeft) {
        newLeft = maxLeft;
        clearInterval(scrollInterval);
        scrollInterval = null;
        scrollDirection = 0;
    }

    scrollContainer.scrollTo({
        left: newLeft,
        behavior: 'smooth'
    });
}

// マウスダウン（左クリック）で方向判定・連続開始
scrollContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // 左クリックのみ

    calculateStepAmount();

    const rect = scrollContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const width = rect.width;

    let newDirection = 0;

    if (mouseX < SCROLL_THRESHOLD) {
        newDirection = -1;
    } else if (mouseX > width - SCROLL_THRESHOLD) {
        newDirection = 1;
    }

    if (newDirection !== 0) {
        e.preventDefault(); // ドラッグ選択防止

        if (scrollInterval) {
            clearInterval(scrollInterval);
        }
        scrollDirection = newDirection;

        // 即時1回移動
        performPageScroll();

        // ホールドで連続ページング
        scrollInterval = setInterval(performPageScroll, PAGE_INTERVAL);
    }
});

// マウスアップ・マウス離脱で停止
document.addEventListener('mouseup', () => {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
    scrollDirection = 0;
});

scrollContainer.addEventListener('mouseleave', () => {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
    scrollDirection = 0;
});

// コンテキストメニュー防止（右クリック対策）
scrollContainer.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ホイールスクロール（従来通り）
scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollContainer.scrollBy({
        left: e.deltaY * 4,
        behavior: 'smooth'
    });
});

// カーソルで操作を示唆
scrollContainer.style.cursor = 'grab'; // つかめる感じでヒント

// 導入対話を管理する変数

let dialogueIndex = 0;



// startIntroDialogue 関数を以下のように修正
// startIntroDialogue() を更新（魅力的な新しいダイアログを言語対応で定義）
function startIntroDialogue() {
    // === 名前取得（空チェック）===
    let playerName = document.getElementById('playerNameInput').value.trim();
    if (playerName === "") {
        better_alert(t('enter_player_name'), "warning");
        return;
    }

    // === 性別取得（ラジオボタン）===
    const genderEl = document.querySelector('input[name="playerGender"]:checked');
    const playerGender = genderEl ? genderEl.value : 'M'; // デフォルトは男性

    // === gameState に保存 ===
    gameState.playerName = playerName;
    gameState.playerGender = playerGender;

    // === ステップ1 を非表示にして対話シーンへ ===
    document.getElementById('stepName').style.display = 'none';
    document.getElementById('stepDialogue').style.display = 'block';

    // 言語対応のイントロダイアログを取得
    const currentIntro = introDialogues[currentLang] || introDialogues.ja;

    // クエスト/ゲームオーバー/誕生日と同じ形式に統一処理（{PLAYER}置換 + image対応）
const processedSequence = currentIntro.map(line => ({
        speaker: line.speaker.replace(/\{PLAYER\}/gi, playerName),
        text: line.text.replace(/\{PLAYER\}/gi, playerName),
        image: line.image || null,
        jumptoline: line.jumptoline,  // ← Add this: preserve normal-line jumptoline
        choices: line.choices ? line.choices.map(choice => ({  // deep copy choices
            text: choice.text.replace(/\{PLAYER\}/gi, playerName),  // optional: replace in choice text too
            reward: choice.reward ? { ...choice.reward } : undefined,
            jumptoline: choice.jumptoline
        })) : undefined
    }));

    // キューに追加（他のダイアログと同じqueueシステムを使用）
    completionQueue.push(processedSequence);

    // 再生中でなければ即開始（イントロ専用BGMにクロスフェード）
    if (!isPlayingDialogue) {
        crossfadeTo('introBgm', 2000);
        setDialogueBackground('Images/intro_bg.jpg'); // 背景を明示的に設定（必要に応じて）
        playNextQuestDialogue();

        // イントロダイアログが完全に終了したらチュートリアル開始
        const waitForDialogueEnd = setInterval(() => {
            if (!isPlayingDialogue && completionQueue.length === 0) {
                clearInterval(waitForDialogueEnd);
                setTimeout(() => {
                    // イントロモーダルを完全に閉じる
                    const introModal = document.getElementById('introModal');
                    if (introModal) introModal.style.display = 'none';
                    // チュートリアル開始（初回のみ）
                    if (!gameState.tutorialCompleted) {
                        startTutorial();
                    }
                }, 800);
            }
        }, 300);
    }
}
let currentTypedText = '';

// renderCurrentDialogue() 更新（継続インジケーターにパルスアニメーション追加 + ログ追加でデバッグしやすく）
function renderCurrentDialogue() {
    console.log('renderCurrentDialogue called - index:', dialogueIndex);

    const current = dialogues[dialogueIndex];
    if (!current) {
        console.error('No dialogue at index', dialogueIndex);
        return;
    }

    const fullText = current.text.replace(/{player}/g, playerName);

    // 話者名
    document.getElementById('speakerName').textContent = current.speaker + ":";

    // キャラクター画像
    const charImg = document.getElementById('introCharacterImg');
    if (current.image) {
        charImg.src = current.image;
        charImg.style.display = 'block';
    } else {
        charImg.style.display = 'none';
    }

    // 継続インジケーター非表示（タイピング開始時）
    const continueIndicator = document.getElementById('continueIndicator');
    continueIndicator.style.opacity = '0';
    continueIndicator.style.animation = 'none';  // リセット

    // タイピングアニメーション
    const dialogueTextEl = document.getElementById('dialogueText');
    dialogueTextEl.innerHTML = '';
    currentTypedText = '';
    
    clearInterval(typingInterval);
    let charIndex = 0;
    typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
            if (fullText.substr(charIndex, 4) === '<br>') {
                currentTypedText += '<br>';
                charIndex += 4;
            } else {
                currentTypedText += fullText[charIndex];
                charIndex++;
            }
            dialogueTextEl.innerHTML = currentTypedText;
        } else {
            clearInterval(typingInterval);
            typingInterval = null;  // 明確にnullに
            // タイピング完了 → 継続インジケーター表示 + パルスアニメーション
            continueIndicator.style.opacity = '1';
            continueIndicator.style.animation = 'pulse 1.5s infinite ease-in-out';
            console.log('Typing finished for index', dialogueIndex);
        }
    }, 35);

    // クリックハンドラー（#stepDialogue 全体）
    const stepDialogue = document.getElementById('stepDialogue');
    stepDialogue.onclick = (e) => {
        console.log('Click detected on stepDialogue');

        if (typingInterval) {
            console.log('Typing in progress - skipping to full text');
            clearInterval(typingInterval);
            typingInterval = null;
            dialogueTextEl.innerHTML = fullText;
            continueIndicator.style.opacity = '1';
            continueIndicator.style.animation = 'pulse 1.5s infinite ease-in-out';
        } else {
            console.log('Typing finished - advancing to next dialogue');
            nextDialogue();
        }
    };
}

// nextDialogue() 更新（インクリメントを先に + 詳細ログ追加 + 安全性の向上）
function nextDialogue() {
    console.log('nextDialogue called - current index before increment:', dialogueIndex, 'total dialogues:', dialogues.length);

    dialogueIndex++;

    console.log('Index incremented to:', dialogueIndex);

    if (dialogueIndex >= dialogues.length) {
        console.log('End of dialogues reached - starting game');
        document.getElementById('introModal').style.display = 'none';

        // BGMクロスフェード（変更なし）
        const introBgm = document.getElementById('introBgm');
        const mainBgm = document.getElementById('bgm');
        mainBgm.currentTime = 0;
        mainBgm.volume = 0;
        mainBgm.play().catch(e => console.log('メインBGM再生エラー:', e));

        const fadeDuration = 2500;
        const introInitialVol = introBgm.volume;
        const targetVol = 0.3;
        const startTime = Date.now();

        const crossfadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / fadeDuration, 1);
            introBgm.volume = introInitialVol * (1 - progress);
            mainBgm.volume = targetVol * progress;
            if (progress >= 1) {
                clearInterval(crossfadeInterval);
                introBgm.pause();
                introBgm.currentTime = 0;
                mainBgm.volume = targetVol;
            }
        }, 50);

        audioPlayed = true;
        startDay();
    } else {
        console.log('Rendering next dialogue at index:', dialogueIndex);
        renderCurrentDialogue();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // イベント委任で全クリックを捕捉
    document.addEventListener('click', (e) => {
        const target = e.target;

        // 条件: クリックされた要素（またはその親）が .loading-buttons の中にある場合のみ
        if (target.closest('.loading-buttons')) {
            // 音声を最初から再生（連打対応）
            buttonClickSound.currentTime = 0;
            buttonClickSound.play().catch(err => {
                console.warn('Button click sound play failed (possibly autoplay policy):', err);
            });
        }
    });
});


// ゲームロード時に自動表示（例: ページ読み込み後やstartDay()の前に）
window.addEventListener('load', function() {


if (!gameState.activeQuests) {
    gameState.activeQuests = {};  
    
}
}

)
    
if (!gameState.completedQuestBranches) {
    gameState.completedQuestBranches = {};  // {questId: {completedStages: [indices]}}
}
if (!gameState.completedQuests) gameState.completedQuests = [];

// クエスト完了ダイアログ表示関数
// introのダイアログシステム（introModal, stepDialogue, dialogueBox, nextBtn）を再利用
// 単一ダイアログのみ表示 → 依頼主の感謝セリフとしてスタイル統一
// 画像はなし、speakerは「依頼主」で固定（Fランクはすべて村人/町の人系の依頼主なので自然）
// プレイヤー名置換は不要（完了ダイアログに{player}は入っていない）


let typingInterval = null;  // タイピング間隔のクリア用
let isTyping = false;       // タイピング中フラグ

let completionQueue = [];     // 完了ダイアログのキュー（複数同時完了対応）
let isPlayingDialogue = false; // 現在ダイアログ再生中フラグ



let questTypingInterval = null;


function queueQuestCompletionDialogue(rawSequence) {
    if (!rawSequence || rawSequence.length === 0) return;

    const defaultName = {
        ja: '冒険者',
        en: 'Adventurer',
        zh: '冒險者'
    }[currentLang] || 'Adventurer';

    const playerName = gameState.playerName || defaultName;

const processedSequence = rawSequence.map(line => ({
        speaker: line.speaker.replace(/\{PLAYER\}/gi, playerName),
        text: line.text.replace(/\{PLAYER\}/gi, playerName),
        image: line.image || null,
        jumptoline: line.jumptoline,  // ← Add this: preserve normal-line jumptoline
        choices: line.choices ? line.choices.map(choice => ({  // deep copy choices
            text: choice.text.replace(/\{PLAYER\}/gi, playerName),  // optional: replace in choice text too
            reward: choice.reward ? { ...choice.reward } : undefined,
            jumptoline: choice.jumptoline
        })) : undefined
    }));

    completionQueue.push(processedSequence);

    if (!isPlayingDialogue) {
        crossfadeTo('dialogueBgm', 2000); // クエスト完了もdialogueBgm使用（専用BGMがあれば変更）
        setDialogueBackground('Images/quest_completion_bg.jpg')
        playNextQuestDialogue();
    }
}

function setDialogueBackground(bg_url = 'Images/intro_bg.jpg') {
    const bgEl = document.getElementById('introBG'); // Match your HTML ID
    if (bgEl) {
        bgEl.style.backgroundImage = `url('${bg_url}')`;
        // Optional: ensure full styling (center, cover, no-repeat)
        bgEl.style.backgroundPosition = 'center';
        bgEl.style.backgroundSize = 'cover';
        bgEl.style.backgroundRepeat = 'no-repeat';
    }
}


// translations.js に追加（または constants.js に独立させる）

// 表示名（翻訳後）→ 画像ファイル名（英語固定）のマップ
// ユーザーがPNGファイルを英語名にリネームする前提
const npcImageFileMap = {
    // メインキャラクター
    'ルナ': 'Luna',
    'Luna': 'Luna',
    '露娜': 'Luna',

    'カイト': 'Kaito',
    'Kaito': 'Kaito',
    '凱特': 'Kaito',

    // その他のNPC（スペースはアンダースコアに統一推奨、ファイル名は安全のため）
    '農夫': 'Farmer',
    'Farmer': 'Farmer',
    '農夫': 'Farmer',  // zhも同じ

    '酒場主人': 'TavernOwner',
    'Tavern Owner': 'TavernOwner',
    '酒館老闆': 'TavernOwner',

    '錬金術師': 'Alchemist',
    'Alchemist': 'Alchemist',
    '鍊金術師': 'Alchemist',

    '料理人': 'Cook',
    'Cook': 'Cook',
    '廚師': 'Cook',

    '学者': 'Scholar',
    'Scholar': 'Scholar',
    '學者': 'Scholar',

    '村人': 'Villager',
    'Villager': 'Villager',
    '村民': 'Villager',

    '村長': 'VillageChief',
    'VillageChief': 'VillageChief',
    '村長': 'VillageChief',

    'おばあさん': 'Old Lady',
    'Old Lady': 'Old Lady',
    'Old Lady': 'Old Lady',
    '老奶奶': 'Old Lady',


    '親': 'Parent',
    'Parent': 'Parent',

    '商人': 'Merchant',
    'Merchant': 'Merchant',
    '露娜': 'Luna',
    // 他のNPCがあればここに追加
    // 例: 'Blacksmith': 'Blacksmith'
};

// スピーカー名から正しい画像ファイル名（英語）を取得するヘルパー
function getNpcImageFile(speaker) {
    if (!speaker) return 'placeholder';
    return npcImageFileMap[speaker] || 'placeholder'; // マップにない場合はプレースホルダー
}


function playNextQuestDialogue() {
    if (completionQueue.length === 0) {
        isPlayingDialogue = false;

        if (gameState.isFinalGameOver) {
            const overlay = document.getElementById('dayTransitionOverlay');
            const message = document.getElementById('transitionMessage');
            const info = document.getElementById('transitionDayInfo');

            const gameOverText = currentLang === 'ja' ? 'ゲームオーバー' :
                                 currentLang === 'zh' ? 'GAME OVER' :
                                 'GAME OVER';

            message.style.fontSize = '4.5em';
            message.style.color = '#ff3366';
            message.style.textShadow = '0 0 30px #000, 0 0 50px #ff0000';
            message.innerText = gameOverText;
            info.innerText = '';

            overlay.style.display = 'flex';
            overlay.style.opacity = '0';
            requestAnimationFrame(() => { overlay.style.opacity = '1'; });

            return;
        }

        crossfadeTo('bgm', 2000);
        const modal = document.getElementById('introModal');
        modal.style.display = 'none';

        const dialogueTextEl = document.getElementById('dialogueText');
        if (dialogueTextEl) dialogueTextEl.innerHTML = '';
        const speakerNameEl = document.getElementById('speakerName');
        if (speakerNameEl) speakerNameEl.textContent = '';
        const continueIndicator = document.getElementById('continueIndicator');
        if (continueIndicator) continueIndicator.style.opacity = '0';

        const charImg = document.getElementById('introCharacterImg');
        if (charImg) {
            charImg.src = '';
            charImg.style.opacity = '0';
        }

        const skipBtn = document.getElementById('dialogueSkipBtn');
        if (skipBtn) skipBtn.style.display = 'none';

        const choicesDiv = document.getElementById('dialogueChoices');
        if (choicesDiv) choicesDiv.style.display = 'none';

        return;
    }

    isPlayingDialogue = true;
    const sequence = completionQueue.shift();

    const modal = document.getElementById('introModal');
    const stepDialogue = document.getElementById('stepDialogue');
    modal.style.display = 'flex';
    stepDialogue.style.position = 'relative';

    const dialogueTextEl = document.getElementById('dialogueText');
    dialogueTextEl.innerHTML = '';
    document.getElementById('speakerName').textContent = '';

    document.getElementById('stepName').style.display = 'none';
    stepDialogue.style.display = 'block';

    const charImg = document.getElementById('introCharacterImg');

    const speakerImageCache = {};
    const playerName = gameState.playerName || defaultName;

    let localIndex = 0;
    let typingInterval = null;

    let skipBtn = document.getElementById('dialogueSkipBtn');
    if (!skipBtn) {
        skipBtn = document.createElement('button');
        skipBtn.id = 'dialogueSkipBtn';
        skipBtn.style.cssText = `
            position: absolute;
            top: 15px;
            left:30px;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.28);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1.2em;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            z-index: 100;
            transition: all 0.3s ease;
        `;
        skipBtn.onmouseover = () => skipBtn.style.background = 'rgba(255, 80, 120, 1)';
        skipBtn.onmouseout = () => skipBtn.style.background = 'rgba(255, 255, 255, 0.28)';
        stepDialogue.appendChild(skipBtn);
    }
    skipBtn.textContent = t('dialogue_skip');
    skipBtn.style.display = 'block';

    skipBtn.onclick = () => {
        clearInterval(typingInterval);
        typingInterval = null;
        localIndex = sequence.length;
        document.getElementById('continueIndicator').style.opacity = '0';
        dialogueTextEl.innerHTML = '';
        const choicesDiv = document.getElementById('dialogueChoices');
        if (choicesDiv) choicesDiv.style.display = 'none';
        playNextQuestDialogue();
    };

    let choicesDiv = document.getElementById('dialogueChoices');
    if (!choicesDiv) {
        choicesDiv = document.createElement('div');
        choicesDiv.id = 'dialogueChoices';
        choicesDiv.style.cssText = `
            display: none;
            flex-direction: column;
            gap: 20px;
            width: 90%;
            max-width: 800px;
            margin: 40px auto 20px auto;
            padding: 20px;
            background: rgba(20, 20, 40, 0.85);
            border-radius: 15px;
            border: 3px solid #ffd700;
            box-shadow: 0 8px 30px rgba(0,0,0,0.8);
            pointer-events: auto;
            align-items: center;
            position: relative;
            z-index: 99999;
        `;
        stepDialogue.appendChild(choicesDiv);
    }

    function showDialogueChoices(choices) {
        choicesDiv.innerHTML = '';
        choices.forEach((choice) => {
            const btn = document.createElement('button');
            btn.textContent = choice.text;
            btn.style.cssText = `
                width: 100%;
                max-width: 600px;
                padding: 18px 30px;
                background: #2c5282;
                color: #ffd700;
                border: 4px solid #ffd700;
                border-radius: 15px;
                font-size: 1.4em;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 8px 25px rgba(0,0,0,0.7);
                transition: all 0.3s ease;
                text-shadow: 2px 2px 4px black;
                position: relative;
                z-index: 99999;
            `;
            btn.onmouseover = () => {
                btn.style.background = '#4299e1';
                btn.style.transform = 'translateY(-5px)';
                btn.style.boxShadow = '0 12px 35px rgba(0,0,0,0.8)';
            };
            btn.onmouseout = () => {
                btn.style.background = '#2c5282';
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.7)';
            };
            btn.onclick = (e) => {
                e.stopPropagation();

                let alertMessages = [];

                if (choice.reward) {
                    let rewards = [];

                    if (Array.isArray(choice.reward)) {
                        rewards = choice.reward;
                    } else if (typeof choice.reward === 'object' && choice.reward !== null) {
                        rewards = Object.values(choice.reward);
                    }

                    console.log('Normalized rewards:', rewards);

                    rewards.forEach(r => {
                        if (r && r.type) {
                            console.log('Applying reward:', r.type, r.amount || r.qty || 'no amount');

                            if (r.type === 'gold') {
                                gameState.gold += r.amount || 0;
                                alertMessages.push(r.amount > 0 ? `+${r.amount}G` : `${r.amount}G`);
                            } else if (r.type === 'reputation') {
                                gameState.reputation += r.amount || 0;
                                alertMessages.push(r.amount > 0 ? `+${r.amount} Reputation` : `${r.amount} Reputation`);
                            } else if (r.type === 'item') {
    let template = shopItems.find(item => item.name === r.name);

    // If not found in shopItems, fallback to fetchQuestsByRank (gathering/material items)
    if (!template) {
        const lang = currentLang || 'ja';  // Assume currentLanguage is in scope (e.g., 'ja', 'en', 'zh')
        const fetchData = fetchQuestsByRank[lang] || fetchQuestsByRank.ja;  // Fallback to ja if language missing

        // Flatten all fetch quests across ranks to search for the itemName
        const allFetchQuests = Object.values(fetchData).flat();
        const fetchQuest = allFetchQuests.find(q => q.itemName === r.name);

        if (fetchQuest) {
            // Directly use the fetchQuest object as the template, just rename itemName to name for consistency
            template = {
                ...fetchQuest,
                name: fetchQuest.itemName
            };
            // No additional fields added - we just use what exists in fetchQuestsByRank
        }
    }

    if (template) {
        addToInventory(template, r.qty || 1);
        alertMessages.push(`+${r.qty || 1} ${r.name}`);
    } else {
        // Final fallback if item still not found
        console.warn(`Item template not found for: ${r.name}`);
        // Minimal placeholder to avoid breaking inventory
        addToInventory({
            name: r.name,
            type: 'unknown',
            description: 'Unknown gathered item',
            minPrice: 0,
            maxPrice: 0
        }, r.qty || 1);
        alertMessages.push(`+${r.qty || 1} ${r.name} (unknown)`);
    }
} else if (r.type === 'friendliness') {
    const amount = r.amount || 0;
    
    // Determine targets based on reward target
    let targets = gameState.adventurers;  // default: all adventurers
    let targetLabel = "(all)";
    let affectedNames = [];
    
    if (r.target === "participants") {
        let participants = currentQuestAdventurers;
        if (typeof participants !== "undefined" && Array.isArray(participants) && participants.length > 0) {
            targets = participants;
            targetLabel = "(participants)";
        }
        // If participants is not available, fall back to all (safe default)
    }
    
    targets.forEach(adv => {
        const oldFriendliness = adv.Friendliness || 50;
        const newFriendliness = Math.max(0, Math.min(100, oldFriendliness + amount));
        adv.Friendliness = newFriendliness;
        
        // Collect name (assume every adventurer has a .name property; fallback to ID or generic if not)
        const advName = adv.name || adv.id || 'Unnamed Adventurer';
        affectedNames.push(`${advName}: ${oldFriendliness} → ${newFriendliness}`);
    });
    
    // Summary alert (e.g., "+5 Friendliness (participants)")
    alertMessages.push(amount > 0 ? `+${amount} Friendliness ${targetLabel}` : `${amount} Friendliness ${targetLabel}`);
    
    // Detailed per-adventurer alerts (only if there are actual changes and a reasonable number)
    if (targets.length > 0 && targets.length <= 10) {  // avoid flooding if somehow applying to many
        affectedNames.forEach(detail => {
            alertMessages.push(detail);
        });
    } else if (targets.length > 10) {
        alertMessages.push(`Affected ${targets.length} adventurers (details hidden)`);
    }
    
    // Console logging for debugging / visibility
    console.log(`Friendliness reward applied: ${amount} to ${targetLabel}`);
    affectedNames.forEach(detail => console.log(detail));
}
                            // New: adventurer stat rewards (apply to all adventurers)
                            else if (['exp', 'strength', 'wisdom', 'dexterity', 'luck', 'defense', 'hp', 'maxHp', 'mp', 'maxMp', 'hunger'].includes(r.type)) {
                                const amount = r.amount || 0;
                                const statName = r.type;
                                gameState.adventurers.forEach(adv => {
                                    if (adv[statName] !== undefined) {
                                        adv[statName] += amount;
                                        // Optional clamps
                                        if (statName === 'hp') adv.hp = Math.min(adv.hp, adv.maxHp);
                                        if (statName === 'mp') adv.mp = Math.min(adv.mp, adv.maxMp);
                                        if (statName === 'hunger') adv.hunger = Math.max(0, Math.min(1, adv.hunger));
                                    }
                                });
                                alertMessages.push(amount > 0 ? `+${amount} ${statName} (all adventurers)` : `${amount} ${statName} (all adventurers)`);
                            }
                        }
                    });

                    if (alertMessages.length > 0) {
                        const isPositive = alertMessages.every(m => m.startsWith('+'));
                        better_alert(alertMessages.join('\n'), isPositive ? "success" : "warning");
                        updateDisplays();
                        renderInventory();
                    }
                }

                // Single jump to branch line
                localIndex = choice.jumptoline ? choice.jumptoline - 1 : localIndex + 1;

                choicesDiv.style.display = 'none';
                document.getElementById('continueIndicator').style.opacity = '0';

                // Clear any ongoing typing and text before jumping
                clearInterval(typingInterval);
                typingInterval = null;
                dialogueTextEl.innerHTML = '';

                if (localIndex >= sequence.length) {
                    playNextQuestDialogue();
                } else {
                    renderQuestDialogue();
                }
            };
            choicesDiv.appendChild(btn);
        });
        choicesDiv.style.display = 'flex';
    }

    function renderQuestDialogue() {
        console.log('renderQuestDialogue called - localIndex:', localIndex);
        console.log('currentQuestAdventurers:', currentQuestAdventurers ? currentQuestAdventurers.map(adv => adv ? adv.name : 'null') : 'undefined');

        const current = sequence[localIndex];

        console.log('Current line speaker raw:', current.speaker);

        let processedSpeaker = current.speaker.replace(/\{player\}/gi, playerName);
        let fullText = current.text.replace(/\{player\}/gi, playerName);

        // Handle {adv1}~{adv4} in speaker
        const speakerAdvMatch = processedSpeaker.match(/\{adv(\d+)\}/i);
        if (speakerAdvMatch && currentQuestAdventurers && currentQuestAdventurers.length > 0) {
            const advIndex = parseInt(speakerAdvMatch[1]) - 1;
            if (advIndex >= 0 && advIndex < currentQuestAdventurers.length) {
                const adv = currentQuestAdventurers[advIndex];
                processedSpeaker = adv.name;
            } else {
                processedSpeaker = processedSpeaker.replace(/\{adv\d+\}/gi, '?');
            }
        }

        // Handle {adv1}~{adv4} in text (independent of speaker)
        let textAdvMatch;
        while ((textAdvMatch = fullText.match(/\{adv(\d+)\}/i)) !== null) {
            const advIndex = parseInt(textAdvMatch[1]) - 1;
            if (advIndex >= 0 && advIndex < currentQuestAdventurers.length) {
                const adv = currentQuestAdventurers[advIndex];
                fullText = fullText.replace(new RegExp(`\\{adv${advIndex + 1}\\}`, 'gi'), adv.name);
            } else {
                fullText = fullText.replace(/\{adv\d+\}/gi, '?');
            }
        }

        document.getElementById('speakerName').textContent = processedSpeaker + ":";

        document.getElementById('continueIndicator').style.opacity = '0';
        choicesDiv.style.display = 'none';

        // Always clear text before new line
        dialogueTextEl.innerHTML = '';

        let imageSrc = getPlayerImage();
        const speakerKey = current.speaker;

        // Handle dynamic adventurer placeholders {adv1}, {adv2}, {adv3}, {adv4}
        const advMatch = current.speaker.match(/\{adv(\d+)\}/i);
        if (advMatch) {
            console.log('Detected {advX} placeholder:', advMatch[0], 'index:', advMatch[1]);
            const advIndex = parseInt(advMatch[1]) - 1;
            console.log('advIndex:', advIndex, 'currentQuestAdventurers length:', currentQuestAdventurers ? currentQuestAdventurers.length : 'undefined');
            if (currentQuestAdventurers && advIndex >= 0 && advIndex < currentQuestAdventurers.length) {
                const adv = currentQuestAdventurers[advIndex];
                console.log('Found adventurer:', adv ? adv.name + ' (image: ' + adv.image + ')' : 'undefined');
                if (adv) {
                    processedSpeaker = adv.name;
                    imageSrc = `Images/${adv.image || 'default_adventurer.png'}`;

                    const placeholder = new RegExp(`\\{adv${advIndex + 1}\\}`, 'gi');
                    fullText = fullText.replace(placeholder, adv.name);
                }
            } else {
                console.log('Adventurer not found for index', advIndex);
                processedSpeaker = current.speaker.replace(/\{adv\d+\}/gi, '?');
            }
        } else {
            console.log('No {advX} placeholder, using normal speaker logic');
            // Normal speaker image logic
            if (current.image) {
                imageSrc = current.image;
            } else if (speakerImageCache[speakerKey]) {
                imageSrc = speakerImageCache[speakerKey];
            } else {
                if (current.speaker.includes('カイト') || current.speaker.includes('Kaito')) {
                    imageSrc = 'Images/Kaito.png';
                } else if (current.speaker.includes('ルナ') || current.speaker.includes('Luna')) {
                    imageSrc = 'Images/Luna.png';
                } else if (current.speaker.includes('ナレーター') || current.speaker.includes('Narrator')) {
                    imageSrc = 'Images/narrator.png';
                } else if (current.speaker.includes('おばあさん') || current.speaker.includes('Grandmother')) {
                    imageSrc = 'Images/Grandmother.png';
                } else if (current.speaker.includes('冒険者') || current.speaker.includes('Adventurer')) {
                    const playerImages = [
                        'Images/STR_RankF_F.png',
                        'Images/STR_RankF_M.png',
                        'Images/DEX_RankF_F.png',
                        'Images/DEX_RankF_M.png',
                        'Images/WIS_RankF_F.png',
                        'Images/WIS_RankF_M.png',
                        'Images/LUC_RankF_F.png',
                        'Images/LUC_RankF_M.png'
                    ];
                    const randomIndex = Math.floor(Math.random() * playerImages.length);
                    imageSrc = playerImages[randomIndex];
                } else if (processedSpeaker !== playerName) {
                    const fileName = getNpcImageFile(current.speaker || processedSpeaker);
                    imageSrc = `Images/${fileName}.png`;
                }
                speakerImageCache[speakerKey] = imageSrc;
            }
        }

        console.log('Final processedSpeaker:', processedSpeaker);
        console.log('Final imageSrc:', imageSrc);
        console.log('Final fullText preview:', fullText.substring(0, 100));

        function getImageKey(src) {
            if (!src) return null;
            let filename = src.split('/').pop().split('?')[0].split('#')[0];
            return decodeURIComponent(filename);
        }

        const currentKey = getImageKey(charImg.src);
        const newKey = getImageKey(imageSrc);

        function startTyping() {
            clearInterval(typingInterval);
            // Clear text before starting typing
            dialogueTextEl.innerHTML = '';
            let charIndex = 0;
            const typingSpeed = (currentLang === 'en') ? 20 : 35;

            typingInterval = setInterval(() => {
                if (charIndex < fullText.length) {
                    if (fullText.substr(charIndex, 4) === '<br>') {
                        dialogueTextEl.innerHTML += '<br>';
                        charIndex += 4;
                    } else {
                        dialogueTextEl.innerHTML += fullText[charIndex];
                        charIndex++;
                    }
                } else {
                    clearInterval(typingInterval);
                    typingInterval = null;

                    if (current.choices && current.choices.length > 0) {
                        showDialogueChoices(current.choices);
                    } else {
                        document.getElementById('continueIndicator').style.opacity = '1';
                    }
                }
            }, typingSpeed);
        }

        if (currentKey === newKey && currentKey !== null) {
            startTyping();
        } else {
            charImg.style.opacity = '0';

            const onFadeOutComplete = () => {
                const preloadImg = new Image();
                preloadImg.onload = preloadImg.onerror = () => {
                    charImg.src = imageSrc;
                    charImg.style.opacity = '1';

                    let typingStarted = false;
                    const onFadeInComplete = (e) => {
                        if (e.propertyName === 'opacity' && !typingStarted) {
                            typingStarted = true;
                            charImg.removeEventListener('transitionend', onFadeInComplete);
                            startTyping();
                        }
                    };
                    charImg.addEventListener('transitionend', onFadeInComplete);

                    setTimeout(() => {
                        if (!typingStarted) {
                            typingStarted = true;
                            charImg.removeEventListener('transitionend', onFadeInComplete);
                            startTyping();
                        }
                    }, 600);
                };
                preloadImg.src = imageSrc;
            };

            let fadeOutHandled = false;
            const onFadeOut = (e) => {
                if (e.propertyName === 'opacity' && !fadeOutHandled) {
                    fadeOutHandled = true;
                    charImg.removeEventListener('transitionend', onFadeOut);
                    onFadeOutComplete();
                }
            };
            charImg.addEventListener('transitionend', onFadeOut);

            setTimeout(() => {
                if (!fadeOutHandled) {
                    fadeOutHandled = true;
                    charImg.removeEventListener('transitionend', onFadeOut);
                    onFadeOutComplete();
                }
            }, 600);
        }

        stepDialogue.onclick = (e) => {
            if (e.target === skipBtn) return;

            if (typingInterval) {
                clearInterval(typingInterval);
                typingInterval = null;
                dialogueTextEl.innerHTML = fullText;

                if (current.choices && current.choices.length > 0) {
                    showDialogueChoices(current.choices);
                } else {
                    document.getElementById('continueIndicator').style.opacity = '1';
                }
            } else if (!current.choices || current.choices.length === 0) {
                // Advance one line
                localIndex++;

                // If the line we just left had jumptoline, chain jump
                if (localIndex - 1 >= 0 && sequence[localIndex - 1].jumptoline !== undefined) {
                    localIndex = sequence[localIndex - 1].jumptoline - 1;

                    // Chain any further jumptoline
                    while (localIndex < sequence.length && sequence[localIndex].jumptoline !== undefined) {
                        localIndex = sequence[localIndex].jumptoline - 1;
                    }
                }

                if (localIndex < sequence.length) {
                    renderQuestDialogue();
                } else {
                    playNextQuestDialogue();
                }
            }
        };
    }

    renderQuestDialogue();
}
// 新規追加: ゲームオーバーダイアログシーケンス取得関数
function getGameOverSequence(reason) {
    const lang = currentLang;

    const playerSpeaker = gameState.playerName || {
        ja: '冒険者',
        en: 'Adventurer',
        zh: '冒險者'
    }[lang] || 'Adventurer';

    const narratorPlayer = playerSpeaker;

    const capitalizedNarratorPlayer = narratorPlayer.charAt(0).toUpperCase() + narratorPlayer.slice(1);

    const dialogues = {
        lunaKaitoDeath: {
    ja: [
        {speaker: 'ルナ', text: `${playerSpeaker}…ごめん…ね…もう…限界…`},
        {speaker: 'カイト', text: '相棒…すまねえ…俺も…もうダメだ…'},
        {speaker: playerSpeaker, text: 'ルナ！カイト！待ってくれ！回復魔法を掛ける！'},
        {speaker: playerSpeaker, text: '二人とも…これを飲め！まだ間に合う！'},
        {speaker: 'ルナ', text: '…遅いよ…傷が…深すぎて…'},
        {speaker: 'カイト', text: '…無駄だ…致命傷だぜ…'},
        {speaker: 'ルナ', text: `${playerSpeaker}に救われて…三人で冒険できて…本当に…幸せだった…`},
        {speaker: 'カイト', text: 'ああ…お前と一緒なら…どんな戦いも…楽しかった…'},
        {speaker: playerSpeaker, text: 'そんなこと言うな！二人とも死ぬなんて許さない！'},
        {speaker: 'ルナ', text: `${playerSpeaker}…ありがとう…大好き…だったよ…`},
        {speaker: 'カイト', text: 'お前は…絶対に…生きろよ…相棒…'},
        {speaker: playerSpeaker, text: 'やめろ…頼む…二人とも…'},
        {speaker: 'ルナ', text: `さよなら…${playerSpeaker}…`},
        {speaker: 'カイト', text: `じゃあな…${playerSpeaker}…`},
        {speaker: 'ナレーター', text: 'ルナとカイトの体から力が抜け、二人は同時に静かに息を引き取った。'},
        {speaker: playerSpeaker, text: 'ルナァァ…カイトォォォ！！！'},
        {speaker: playerSpeaker, text: '俺のせいだ…二人を守れなかった…全部俺のせいだ…'},
        {speaker: 'ナレーター', text: `最愛の仲間二人を同時に失った${playerSpeaker}は、心が完全に砕け散った。剣を握る気力すら失い、永遠に冒険の道を捨てた。物語は深い悲しみと絶望のうちに終わりを迎えた…`}
    ],
    en: [
        {speaker: 'Luna', text: `${playerSpeaker}... sorry... I\'ve... reached my limit...`},
        {speaker: 'Kaito', text: 'Buddy... damn it... I\'m done too...'},
        {speaker: playerSpeaker, text: 'Luna! Kaito! Hold on! I\'m casting healing magic!'},
        {speaker: playerSpeaker, text: 'Both of you—drink this! There\'s still time!'},
        {speaker: 'Luna', text: '...It\'s too late... the wounds... are too deep...'},
        {speaker: 'Kaito', text: '...No use... fatal wounds...'},
        {speaker: 'Luna', text: 'Being saved by you... adventuring together as three... I was truly... happy...'},
        {speaker: 'Kaito', text: 'Yeah... every battle with you... was the best...'},
        {speaker: playerSpeaker, text: 'Stop it! I wont let either of you die!'},
        {speaker: 'Luna', text: `${playerSpeaker}... thank you... I loved... you...`},
        {speaker: 'Kaito', text: 'You gotta... keep living... buddy...'},
        {speaker: playerSpeaker, text: 'No... please... both of you...'},
        {speaker: 'Luna', text: 'Goodbye... ${playerSpeaker}...'},
        {speaker: 'Kaito', text: 'See ya... ${playerSpeaker}...'},
        {speaker: 'Narrator', text: 'The strength left Luna and Kaito\'s bodies, and they quietly passed away at the same moment.'},
        {speaker: playerSpeaker, text: 'LUNAAAA... KAITOOOO!!!!'},
        {speaker: playerSpeaker, text: 'It\'s my fault... I couldn\'t protect either of them... it\'s all my fault...'},
        {speaker: 'Narrator', text: `Having lost both closest friends at once, ${playerSpeaker}\'s heart was utterly shattered. No longer able to even hold a sword, they abandoned the path of adventure forever. The story ended in profound sorrow and despair...`}
    ],
    zh: [
        {speaker: 'Luna', text: `${playerSpeaker}…對不起…我已經…到極限了…`},
        {speaker: 'Kaito', text: '夥伴…抱歉…我也…不行了…'},
        {speaker: playerSpeaker, text: 'Luna！Kaito！等等！我要施放治療魔法！'},
        {speaker: playerSpeaker, text: '你們兩個…喝這個！還有時間！'},
        {speaker: 'Luna', text: '…太遲了…傷口…太深…'},
        {speaker: 'Kaito', text: '…沒用了…致命傷…'},
        {speaker: 'Luna', text: '被你救出…三人一起冒險…真的…好幸福…'},
        {speaker: 'Kaito', text: '是啊…跟你一起的每場戰鬥…都超棒…'},
        {speaker: playerSpeaker, text: '別這樣說！你們兩個都不准死！'},
        {speaker: 'Luna', text: `${playerSpeaker}…謝謝…我好喜歡…你…`},
        {speaker: 'Kaito', text: '你要…好好活下去…夥伴…'},
        {speaker: playerSpeaker, text: '不要…求你們…兩個都…'},
        {speaker: 'Luna', text: `再見…${playerSpeaker}…`},
        {speaker: 'Kaito', text: `再見了…${playerSpeaker}…`},
        {speaker: 'Narrator', text: 'Luna與Kaito的身體失去力量，兩人同時安靜地離去了。'},
        {speaker: playerSpeaker, text: 'Luna啊啊…Kaito啊啊！！！'},
        {speaker: playerSpeaker, text: '都是我的錯…沒能保護他們兩個…全都是我的錯…'},
        {speaker: 'Narrator', text: `同時失去兩位最親密的夥伴，${playerSpeaker}的心完全碎裂。再也無法握劍，永遠放棄了冒險之路。故事在深刻的悲傷與絕望中結束…`}
    ]
},
        gold: {
            ja: [
                {speaker: '商人', text: 'おい！借金と利息がとんでもない額になってるぞ！今すぐ返せ、金が底をついたそうだな！'},
                {speaker: playerSpeaker, text: 'すみません…本当に一文無しで…'},
                {speaker: '商人', text: '謝って済むか！何ヶ月も逃げ回ってたじゃないか！'},
                {speaker: 'カイト', text: '待てよ、落ち着け！もう少し待ってくれよ！'},
                {speaker: '商人', text: '待つ？もう限界だ！お前ら、このリーダーを捕まえろ！'},
                {speaker: 'ルナ', text: `${playerSpeaker}に触らないでください！`},
                {speaker: 'カイト', text: '俺たちを倒してからにしろ！'},
                {speaker: '商人', text: 'はっ、面白い。全員捕まえてもいいぞ、リーダーだけは確実に連れてけ！'},
                {speaker: playerSpeaker, text: 'やめろ！カイト、ルナ、私の借金のせいで巻き込むな！'},
                {speaker: 'ルナ', text: `${playerSpeaker}…私たちは離れません…`},
                {speaker: 'カイト', text: 'そうだ！一緒に戦うんだ！'},
                {speaker: '商人', text: '感心な絆だな。だが借金は返してもらう。奴隷として一生働け！'},
                {speaker: playerSpeaker, text: '……わかりました。私だけなら…行きます。'},
                {speaker: 'カイト', text: 'ふざけんな！絶対に渡さない！'},
                {speaker: 'ナレーター', text: 'だが雇われた手下の数は圧倒的で、パーティーはあっさり制圧された。'},
                {speaker: 'ナレーター', text: `${playerSpeaker}は富豪の奴隷として売られ、カイトとルナは解放された。輝かしい冒険の日々は永遠に終わりを告げた…`}
            ],
            en: [
                {speaker: 'Moneylender', text: 'Hey! The debt and interest are insane now! Pay up—I heard you\'re completely broke!'},
                {speaker: playerSpeaker, text: 'I\'m sorry... I really don\'t have a single coin left...'},
                {speaker: 'Moneylender', text: 'You think sorry fixes this? You\'ve been dodging me for months!'},
                {speaker: 'Kaito', text: 'Hold on, calm down! Just give us a little more time!'},
                {speaker: 'Moneylender', text: 'Time? I\'ve waited long enough! You lot—grab the leader!'},
                {speaker: 'Luna', text: 'Don\'t touch Master!'},
                {speaker: 'Kaito', text: 'You\'ll have to get past us first!'},
                {speaker: 'Moneylender', text: 'Hah, amusing. Take them all if you have to—just make sure you bring me the leader!'},
                {speaker: playerSpeaker, text: 'Stop! Kaito, Luna, don\'t get involved because of my debt!'},
                {speaker: 'Luna', text: 'Master... we won\'t leave you...'},
                {speaker: 'Kaito', text: 'Yeah! We fight together!'},
                {speaker: 'Moneylender', text: 'What admirable loyalty. Too bad—debts must be paid. You\'ll work as a slave for life!'},
                {speaker: playerSpeaker, text: '...Fine. If it\'s just me... I\'ll go.'},
                {speaker: 'Kaito', text: 'Like hell! We\'re not handing you over!'},
                {speaker: 'Narrator', text: 'But the hired thugs outnumbered them overwhelmingly, and the party was quickly subdued.'},
                {speaker: 'Narrator', text: `${playerSpeaker} was sold into slavery to a wealthy lord, while Kaito and Luna were set free. The days of glorious adventure came to an eternal end...`}
            ],
            zh: [
                {speaker: '商人', text: '喂！債務和利息已經瘋狂累積了！馬上還錢—聽說你徹底破產了！'},
                {speaker: playerSpeaker, text: '對不起…我真的身無分文…'},
                {speaker: '商人', text: '道歉就想解決？你躲了我好幾個月！'},
                {speaker: 'Kaito', text: '等等，冷靜！再給我們一點時間！'},
                {speaker: '商人', text: '時間？我等夠了！你們—抓住那個領袖！'},
                {speaker: 'Luna', text: `不准碰${playerSpeaker}！`},
                {speaker: 'Kaito', text: '先打倒我們再說！'},
                {speaker: '商人', text: '哈，有趣。要抓就全抓，但領袖一定要帶走！'},
                {speaker: playerSpeaker, text: '住手！Kaito、Luna，別因為我的債務被牽連！'},
                {speaker: 'Luna', text: `${playerSpeaker}…我們不會離開你…`},
                {speaker: 'Kaito', text: '對！一起戰鬥！'},
                {speaker: '商人', text: '真感人的羈絆。可惜—債務必須償還。你要一輩子當奴隸！'},
                {speaker: playerSpeaker, text: '……好吧。如果只是我一個…我去。'},
                {speaker: 'Kaito', text: '開什麼玩笑！絕對不交出去！'},
                {speaker: 'Narrator', text: '然而雇來的打手人數壓倒性，隊伍很快被制伏。'},
                {speaker: 'Narrator', text: `${playerSpeaker}被賣給富豪當奴隸，Kaito和Luna被釋放。輝煌的冒險日子永遠結束了…`}
            ]
        },
        rep: {
            ja: [
                {speaker: '商人', text: 'このギルドのReputationが最低だ！もう絶対に取引しない！'},
                {speaker: '商人', text: '報酬の支払いが遅いし、クエストも怪しい！'},
                {speaker: '怒りの冒険者', text: 'そうだ！こんなゴミギルドは冒険者の名を汚すだけだ！'},
                {speaker: '別の冒険者', text: '解散しろ！王国に恥をかかせるな！'},
                {speaker: playerSpeaker, text: '待ってください！私たちは必死に頑張ってきたんです！'},
                {speaker: 'カイト', text: 'そうだよ！ちゃんと成功したクエストだってたくさんある！'},
                {speaker: 'ルナ', text: `どうか信じてください…${playerSpeaker}を…`},
                {speaker: '商人', text: '信じる？Reputationが地に落ちてるんだぞ！'},
                {speaker: '群衆', text: '解散だ！解散！逮捕しろ！'},
                {speaker: '群衆', text: 'ギルドを潰せ！'},
                {speaker: '王国衛兵', text: '王命により、このギルドを即時解散する！'},
                {speaker: '王国衛兵', text: 'ギルドマスターとその仲間二名を、王国の信用失墜罪で逮捕する！'},
                {speaker: playerSpeaker, text: 'そんな…これが終わりだなんて…'},
                {speaker: 'カイト', text: 'くそっ…どうしてこうなる…'},
                {speaker: 'ルナ', text: `${playerSpeaker}…私、怖いです…`},
                {speaker: 'ナレーター', text: '嘲笑と怒号の中、三人は鎖で繋がれ、王国牢獄へと連行された。かつての栄光は跡形もなく、物語は恥辱のうちに幕を閉じた…'}
            ],
            en: [
                {speaker: 'Merchant A', text: 'This guild\'s reputation is rock bottom! I\'m done doing business!'},
                {speaker: 'Merchant B', text: 'Same here! Payments are always late, and the quests are shady!'},
                {speaker: 'Angry Adventurer', text: 'Yeah! A garbage guild like this only stains the name of adventurers!'},
                {speaker: 'Another Adventurer', text: 'Disband it! Stop embarrassing the kingdom!'},
                {speaker: playerSpeaker, text: 'Please wait! We\'ve been working desperately hard!'},
                {speaker: 'Kaito', text: 'That\'s right! We\'ve successfully completed tons of quests too!'},
                {speaker: 'Luna', text: 'Please believe... believe in Master...'},
                {speaker: 'Merchant A', text: 'Believe? Your reputation is in the dirt!'},
                {speaker: 'Crowd', text: 'Disband it! Disband it! Arrest them!'},
                {speaker: 'Crowd', text: 'Shut down the guild!'},
                {speaker: 'Kingdom Guard', text: 'By order of the king, this guild is immediately disbanded!'},
                {speaker: 'Kingdom Guard', text: 'The guild master and his two companions are under arrest for discrediting the kingdom!'},
                {speaker: playerSpeaker, text: 'No... it can\'t end like this...'},
                {speaker: 'Kaito', text: 'Damn it... how did it come to this...'},
                {speaker: 'Luna', text: 'Master... I\'m scared...'},
                {speaker: 'Narrator', text: 'Amid jeers and shouts of anger, the three were chained and dragged to the kingdom prison. All traces of former glory vanished, and the story ended in disgrace...'}
            ],
            zh: [
                {speaker: '商人', text: '這個公會評價墊底！絕不再交易！'},
                {speaker: '商人', text: '我也是！報酬總是拖延，任務還可疑！'},
                {speaker: '憤怒的冒險者', text: '對！這種垃圾公會只會玷污冒險者名聲！'},
                {speaker: '另一冒險者', text: '解散！別給王國丟臉！'},
                {speaker: playerSpeaker, text: '請等一下！我們一直拼命努力啊！'},
                {speaker: 'Kaito', text: '沒錯！我們也成功完成了很多任務！'},
                {speaker: 'Luna', text: `請相信…相信${playerSpeaker}…`},
                {speaker: '商人', text: '相信？評價已經爛透了！'},
                {speaker: '群眾', text: '解散！解散！逮捕他們！'},
                {speaker: '群眾', text: '關閉公會！'},
                {speaker: '王國衛兵', text: '奉王命，即刻解散此公會！'},
                {speaker: '王國衛兵', text: '公會長及其兩名夥伴，以損害王國信譽罪逮捕！'},
                {speaker: playerSpeaker, text: '不…怎麼會這樣結束…'},
                {speaker: 'Kaito', text: '可惡…怎麼會變成這樣…'},
                {speaker: 'Luna', text: `${playerSpeaker}…我好怕…`},
                {speaker: 'Narrator', text: '在嘲笑與怒吼中，三人被鎖鏈捆綁，押往王國監獄。昔日的榮光蕩然無存，故事在恥辱中落幕…'}
            ]
        },
        lunaDeath: {
            ja: [
                {speaker: 'ルナ', text: `${playerSpeaker}…ごめんなさい…もう…力尽きて…`},
                {speaker: playerSpeaker, text: 'ルナ！しっかりしろ！回復魔法を掛ける！'},
                {speaker: 'カイト', text: '薬！回復薬はどこだ！'},
                {speaker: playerSpeaker, text: 'ルナ、これを飲め！'},
                {speaker: 'ルナ', text: '…遅いです…傷が…深すぎて…'},
                {speaker: 'ルナ', text: `${playerSpeaker}に救われて…一緒にいられて…本当に…幸せでした…`},
                {speaker: playerSpeaker, text: 'そんな最期の言葉を言うな！絶対に助ける！'},
                {speaker: 'カイト', text: 'ルナ！目を覚ませ！まだ終わってないんだ！'},
                {speaker: 'ルナ', text: 'カイト…あなたも…ありがとう…強くなって…'},
                {speaker: 'ルナ', text: `${playerSpeaker}…大好き…でした…`},
                {speaker: playerSpeaker, text: 'ルナ…やめろ…頼む…'},
                {speaker: 'ルナ', text: `さよなら…${playerSpeaker}…`},
                {speaker: 'ナレーター', text: 'ルナの体から力が抜け、静かに息を引き取った。'},
                {speaker: playerSpeaker, text: 'ルナァァァァ！！！'},
                {speaker: 'カイト', text: '嘘だろ…ルナ…'},
                {speaker: playerSpeaker, text: '俺が…守れなかった…俺のせいだ…'},
                {speaker: 'ナレーター', text: `深い絶望に沈んだ${playerSpeaker}は、もう剣を握る気力を失い、冒険の道を捨てた。物語は悲しみのうちに終わりを迎えた…`}
            ],
            en: [
                {speaker: 'Luna', text: `${playerSpeaker}... I\'m sorry... I\'ve... run out of strength...`},
                {speaker: playerSpeaker, text: 'Luna! Stay with me! I\'m casting healing magic!'},
                {speaker: 'Kaito', text: 'Potion! Where\'s the healing potion?!'},
                {speaker: playerSpeaker, text: 'Luna, drink this!'},
                {speaker: 'Luna', text: '...It\'s too late... the wound... is too deep...'},
                {speaker: 'Luna', text: 'Being saved by you... being together... I was truly... happy...'},
                {speaker: playerSpeaker, text: 'Don\'t say farewell words! I\'ll definitely save you!'},
                {speaker: 'Kaito', text: 'Luna! Wake up! It\'s not over yet!'},
                {speaker: 'Luna', text: 'Kaito... thank you too... get stronger...'},
                {speaker: 'Luna', text: `${playerSpeaker}... I loved... you...`},
                {speaker: playerSpeaker, text: 'Luna... stop... please...'},
                {speaker: 'Luna', text: `Goodbye... ${playerSpeaker}...`},
                {speaker: 'Narrator', text: 'The strength left Luna\'s body, and she quietly passed away.'},
                {speaker: playerSpeaker, text: 'LUNAAAAAAA!!!!'},
                {speaker: 'Kaito', text: 'No way... Luna...'},
                {speaker: playerSpeaker, text: 'I... couldn\'t protect her... it\'s my fault...'},
                {speaker: 'Narrator', text: `Sunk in deep despair, ${playerSpeaker} lost the will to hold a sword and abandoned the path of adventure. The story ended in sorrow...`}
            ],
            zh: [
                {speaker: 'Luna', text: `${playerSpeaker}…對不起…我已經…沒力氣了…`},
                {speaker: playerSpeaker, text: 'Luna！撐住！我要施放治療魔法！'},
                {speaker: 'Kaito', text: '藥水！治療藥水在哪！'},
                {speaker: playerSpeaker, text: 'Luna，喝這個！'},
                {speaker: 'Luna', text: '…太遲了…傷口…太深…'},
                {speaker: 'Luna', text: '被你救出…能在一起…真的…好幸福…'},
                {speaker: playerSpeaker, text: '別說遺言！ 我一定救你！'},
                {speaker: 'Kaito', text: 'Luna！醒醒！還沒結束啊！'},
                {speaker: 'Luna', text: 'Kaito…也謝謝你…要變強…'},
                {speaker: 'Luna', text: `${playerSpeaker}…我好喜歡…你…`},
                {speaker: playerSpeaker, text: 'Luna…別這樣…求你…'},
                {speaker: 'Luna', text: `再見…${playerSpeaker}…`},
                {speaker: 'Narrator', text: 'Luna身體失去力量，安靜地離去了。'},
                {speaker: playerSpeaker, text: 'Luna啊啊啊啊！！！'},
                {speaker: 'Kaito', text: '不會吧…Luna…'},
                {speaker: playerSpeaker, text: '我…沒能保護她…都是我的錯…'},
                {speaker: 'Narrator', text: `陷入深深絕望的${playerSpeaker}，再也沒有握劍的意志，放棄了冒險之路。故事在悲傷中結束…`}
            ]
        },
        kaitoDeath: {
            ja: [
                {speaker: 'カイト', text: '相棒…すまねえ…俺、もう…持たねえ…'},
                {speaker: playerSpeaker, text: 'カイト！目を覚ませ！今すぐ回復する！'},
                {speaker: 'ルナ', text: '回復薬！早く！'},
                {speaker: playerSpeaker, text: 'カイト、これを飲め！'},
                {speaker: 'カイト', text: '…無駄だよ…致命傷だ…'},
                {speaker: 'カイト', text: 'お前と冒険できて…最高だったぜ…'},
                {speaker: 'カイト', text: 'ルナ…お前も…よく頑張ったな…'},
                {speaker: playerSpeaker, text: '死ぬな！まだ一緒に戦うんだ！'},
                {speaker: 'ルナ', text: 'カイトさん！諦めないで！'},
                {speaker: 'カイト', text: 'お前ら…俺の分まで…幸せになれよ…'},
                {speaker: 'カイト', text: '約束だ…絶対に…強くなれ…'},
                {speaker: playerSpeaker, text: 'カイト…頼む…'},
                {speaker: 'カイト', text: 'じゃあな…相棒…'},
                {speaker: 'ナレーター', text: 'カイトは静かに目を閉じ、二度と開かなかった。'},
                {speaker: playerSpeaker, text: 'カイトォォォ！！！'},
                {speaker: 'ルナ', text: 'うそ…カイトさん…'},
                {speaker: playerSpeaker, text: '俺が弱いせいで…相棒を失った…'},
                {speaker: 'ナレーター', text: `親友を失った痛みに耐えきれず、${playerSpeaker}は冒険者の道を捨てた。物語は悲劇のまま終わった…`}
            ],
            en: [
                {speaker: 'Kaito', text: 'Buddy... sorry... I can\'t... hold on anymore...'},
                {speaker: playerSpeaker, text: 'Kaito! Stay awake! I\'m healing you now!'},
                {speaker: 'Luna', text: 'Healing potion! Hurry!'},
                {speaker: playerSpeaker, text: 'Kaito, drink this!'},
                {speaker: 'Kaito', text: '...It\'s no use... fatal wound...'},
                {speaker: 'Kaito', text: 'Adventuring with you... was the best...'},
                {speaker: 'Kaito', text: 'Luna... you did great too...'},
                {speaker: playerSpeaker, text: 'Don\'t die! We\'re still fighting together!'},
                {speaker: 'Luna', text: 'Kaito! Don\'t give up!'},
                {speaker: 'Kaito', text: 'You two... be happy... for my share too...'},
                {speaker: 'Kaito', text: 'Promise me... get stronger... no matter what...'},
                {speaker: playerSpeaker, text: 'Kaito... please...'},
                {speaker: 'Kaito', text: 'See ya... buddy...'},
                {speaker: 'Narrator', text: 'Kaito quietly closed his eyes, never to open them again.'},
                {speaker: playerSpeaker, text: 'KAITOOOO!!!!'},
                {speaker: 'Luna', text: 'No... Kaito...'},
                {speaker: playerSpeaker, text: 'Because I was weak... I lost my best friend...'},
                {speaker: 'Narrator', text: `Unable to bear the pain of losing his closest friend, ${playerSpeaker} abandoned the path of adventure. The story ended in tragedy...`}
            ],
            zh: [
                {speaker: 'Kaito', text: '夥伴…抱歉…我…撐不住了…'},
                {speaker: playerSpeaker, text: 'Kaito！醒醒！馬上治療你！'},
                {speaker: 'Luna', text: '治療藥水！快！'},
                {speaker: playerSpeaker, text: 'Kaito，喝這個！'},
                {speaker: 'Kaito', text: '…沒用了…致命傷…'},
                {speaker: 'Kaito', text: '和你冒險…最棒了…'},
                {speaker: 'Kaito', text: 'Luna…你也很努力…'},
                {speaker: playerSpeaker, text: '別死！我們還要一起戰鬥！'},
                {speaker: 'Luna', text: 'Kaito！別放棄！'},
                {speaker: 'Kaito', text: '你們…也要為我…幸福…'},
                {speaker: 'Kaito', text: '答應我…一定要…變強…'},
                {speaker: playerSpeaker, text: 'Kaito…求你…'},
                {speaker: 'Kaito', text: '再見…夥伴…'},
                {speaker: 'Narrator', text: 'Kaito靜靜閉上眼睛，再也沒睜開。'},
                {speaker: playerSpeaker, text: 'Kaito啊啊啊！！！'},
                {speaker: 'Luna', text: '不…Kaito…'},
                {speaker: playerSpeaker, text: '因為我太弱…失去了最好的朋友…'},
                {speaker: 'Narrator', text: `無法承受失去摯友的痛苦，${playerSpeaker}放棄了冒險之路。故事以悲劇結束…`}
            ]
        },
        
        
    };

    return dialogues[reason][lang] || dialogues[reason].ja; // フォールバック: 日本語
}

// 新規追加: ゲームオーバー専用ダイアログキュー関数（既存のcompletionQueueを再利用）
function queueGameOverDialogue(rawSequence) {
    if (!rawSequence || rawSequence.length === 0) return;

    // 即座に1日終了ボタンを無効化
    const endBtn = document.querySelector('button[onclick="playDay()"]');
    if (endBtn) endBtn.disabled = true;

    // ゲームオーバーpendingフラグを設定（複数トリガー防止）
    gameState.pendingGameOver = true;

    const playerName = gameState.playerName || ({
        ja: '冒険者',
        en: 'Adventurer',
        zh: '冒險者'
    }[currentLang] || 'Adventurer');

    const processedSequence = rawSequence.map(line => ({
        speaker: line.speaker.replace('{PLAYER}', playerName),
        text: line.text.replace(/{PLAYER}/g, playerName),
        image: line.image || null  // 必要に応じてimageフィールド対応
    }));

    completionQueue.push(processedSequence);

    // 再生中でなければ即開始（専用BGMへクロスフェード）
    if (!isPlayingDialogue) {
        crossfadeTo('GameoverBgm', 2000);
        setDialogueBackground('Images/Street.jpg')
        playNextQuestDialogue();
    }
}

function queueBirthdayParty() {
    const playerName = gameState.playerName || 'あなた';

    const rawSequence = [
        {speaker: 'ナレーター', text: '酒場に戻ると、突然灯りが消えて…暗闇の中から声が響く！'},
        {speaker: 'ルナ', text: 'サプライズ！！ お誕生日おめでとう、' + playerName + '！'},
        {speaker: 'カイト', text: 'へへ、ようやく気づいたか！ パーティーだぜ！'},
        {speaker: '酒場主人', text: 'ふふっ、みんなで何日も前から準備してたのよ。ケーキも特製よ♪'},
        {speaker: playerName, text: 'みんな…ありがとう！ 本当に嬉しいよ…！'},
        {speaker: 'ナレーター', text: '笑顔と祝福に包まれた温かい夜…。絆がさらに深まった。'}
    ];

    // 既存のquest完了ダイアログと同じ形式に統一（imageはnullでOK）
const processedSequence = rawSequence.map(line => ({
        speaker: line.speaker.replace(/\{PLAYER\}/gi, playerName),
        text: line.text.replace(/\{PLAYER\}/gi, playerName),
        image: line.image || null,
        jumptoline: line.jumptoline,  // ← Add this: preserve normal-line jumptoline
        choices: line.choices ? line.choices.map(choice => ({  // deep copy choices
            text: choice.text.replace(/\{PLAYER\}/gi, playerName),  // optional: replace in choice text too
            reward: choice.reward ? { ...choice.reward } : undefined,
            jumptoline: choice.jumptoline
        })) : undefined
    }));


    completionQueue.push(processedSequence);

    // 再生中でなければ即開始（専用BGMへクロスフェード）
    if (!isPlayingDialogue) {
        crossfadeTo('QuestEndDialogueBgm', 2000); 
        playNextQuestDialogue();
    }
}




function renderNPCList() {
    const content = document.getElementById('npcsContent');
    if (!content) return;

    const unlocked = gameState.unlockedNPCs || [];

    if (unlocked.length === 0) {
        content.innerHTML = `
            <div style="text-align:center; padding:60px; color:#6c757d;">
                <h3>${t('npcs_section_title')}</h3>
                <p style="font-size:1.2em;">${t('npcs_no_unlocked_desc')}</p>
            </div>`;
        return;
    }

    let html = `
        <div style="max-width:800px; margin:0 auto; padding:20px;">
            <h2 style="text-align:center; margin-bottom:30px; color:#ffd700; text-shadow:0 0 10px rgba(0,0,0,0.8);">
                ${t('npcs_section_title')} (${unlocked.length}${t('npcs_count_suffix')})
            </h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:20px;">`;

    unlocked.forEach(npcKey => {
        const entity = getEntityByName(npcKey);
        const friendliness = entity?.Friendliness ?? 70;

        const isDiscovery = discoveryNPCs.includes(npcKey);
        const idx = discoveryNPCs.indexOf(npcKey);
        console.log(`Images/${getNpcImageFile(npcKey)}.png`);

        html += `
            <div style="background:rgba(30,30,30,0.7); border-radius:12px; padding:20px; text-align:center; box-shadow:0 6px 20px rgba(0,0,0,0.6);">
                <!-- 画像を固定高さコンテナで中央寄せ・完全収納 -->
                <div style="height:220px; display:flex; align-items:center; justify-content:center; overflow:hidden; border-radius:8px; margin-bottom:15px; background:#222;">
                    <img src="Images/${getNpcImageFile(npcKey)}.png" alt="${npcKey}"
                         style="max-width:100%; max-height:100%; object-fit:contain;"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTQwIDE4MCI+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiM3NDc0NzQiLz48dGV4dCB4PSI3MCIgeT0iOTAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7nlLvlg4/jgarjgZc8L3RleHQ+PC9zdmc+'; this.onerror=null;">
                </div>
                <h3 style="color:#ffd700; margin:10px 0;">${npcKey}</h3>
                <!-- 好感度表示 -->
                <div style="color:#ff6b6b; font-size:1.1em; margin:10px 0;">
                    ${t('friendliness_label')} ${friendliness}/100
                </div>
                <div style="margin:15px 0;">
                    <button onclick="openNpcChat('${npcKey}')" 
                            style="background:#3498db; color:white; padding:12px 24px; font-size:1.1em; border:none; border-radius:8px; cursor:pointer; margin:5px;">
                        ${t('talk_to_ai_button', { name: npcKey })}
                    </button>`;

        if (isDiscovery && idx !== -1) {
            html += `
                    <button onclick="receiveSideQuest(${idx})" 
                            style="background:#27ae60; color:white; padding:12px 24px; font-size:1.1em; border:none; border-radius:8px; cursor:pointer; margin:5px;">
                        ${t('side_quest_accept_button')}
                    </button>`;
        }

        html += `
                </div>
            </div>`;
    });

    html += `
            </div>
        </div>`;

    content.innerHTML = html;
}


// === unlockQuestNPC を拡張（villageNPCsにデータ作成） ===
async function unlockQuestNPC(npcKey) {
    console.log("unlockQuestNPC:"+npcKey);
    if (!gameState.unlockedNPCs) gameState.unlockedNPCs = [];
    if (gameState.unlockedNPCs.includes(npcKey)) return;

    gameState.unlockedNPCs.push(npcKey);

    if (!gameState.villageNPCs) gameState.villageNPCs = {};

    // NPCデータ初期化
    gameState.villageNPCs[npcKey] = {
        name: npcKey,
        Friendliness: 50, // 初期好感度（酒場主人など恩がある場合は80など調整）
        bag: { gold: 300, items: [] }, // 初期Gold（酒販売用に少し持たせる）
        image: `${getNpcImageFile(npcKey)}.png`, 
    };

// 個別初期設定があれば適用（なければデフォルトのまま）
    const setup = initialVillageNpcBags[npcKey];
    if (setup) {
        gameState.villageNPCs[npcKey].bag.gold = setup.gold;
        gameState.villageNPCs[npcKey].bag.items.push(...setup.items);
    }

    if (document.getElementById('npcsContent')) {
        renderNPCList();
    }
}


// === アイコンシート関数（1-based index）===
// === 修正されたアイコンシート関数（位置とスケーリングを正しく処理）===
// === さらに改善されたアイコンシート関数（はみ出し完全解消版）===
function getIconHtml(row, col, size = 64) {
    const iconSize = 24;                  // オリジナルアイコンのサイズ（24×24px）
    const sheetCols = 16;                 // 列数（固定）
    const sheetRows = 33;                 // 行数（固定）
    const sheetWidthOriginal = sheetCols * iconSize;   // 384px（ぴったり）
    const sheetHeightOriginal = sheetRows * iconSize;  // 792px（有効領域のみ。796pxの余白4pxを除外）

    row -= 1;  // 1-based → 0-based
    col -= 1;

    const scale = size / iconSize;         // 例: 64 → ≈2.6667

    // オフセットを拡大サイズで計算（これで位置は正確）
    const bgX = -col * size;
    const bgY = -row * size *0.996;

    // シート全体を拡大（有効領域792pxのみ使用 → 下部の余白を排除）
    const scaledSheetWidth = sheetWidthOriginal * scale;
    const scaledSheetHeight = sheetHeightOriginal * scale;

    return `<div style="
        width: ${size}px;
        height: ${size}px;
        background: url('Images/rpg_icon.png') ${bgX}px ${bgY}px / ${scaledSheetWidth}px ${scaledSheetHeight}px no-repeat;
        image-rendering: pixelated;
        margin: 0 auto;
        flex-shrink: 0;
        overflow: hidden;
        /* 追加: レンダリング誤差による1pxはみ出しを強制的にクリップ */
        clip-path: inset(0px round 0px);
        box-sizing: border-box;
    "></div>`;
}

// === アイテム名 → アイコン位置マップ（ここを埋めてください）===


function getItemIconHtml(itemName, size = 64) {
    const pos = itemIconPositions[itemName] || itemIconPositions['default'];
    return getIconHtml(pos.row, pos.col, size);
}

// === インベントリ表示関数 ===
function renderInventory() {
    let html = '';

    const items = gameState.inventory.filter(item => (item.qty ?? 1) > 0);
    const maxSlots = 64;
    const gridColumns = 8;

    // 名前順ソート
    items.sort((a, b) => a.name.localeCompare(b.name));

    html += `<div style="
        display: grid;
        grid-template-columns: repeat(${gridColumns}, 1fr);
        gap: 8px;
        justify-items: center;
        background: transparent;
    ">`;

    // Simplified stacking logic: one slot per unique item
    // Consumables (potions) can stack → show quantity on the icon
    // Equipment items each take one slot (no stacking) → no quantity text
    for (let i = 0; i < maxSlots; i++) {
        const item = items[i] || null;

        if (item) {
            const icon = getItemIconHtml(item.name, 48);
            const displayQty = item.qty ?? 1;
            const qtyText = item.qty > 1 ? `${item.qty}` : '';

            // Build multi-line tooltip
            const tooltipLines = [item.name];

            if (item.qty > 1) {
                tooltipLines.push(`(x${item.qty})`);
            }

            if (item.description) {
                tooltipLines.push('');
                tooltipLines.push(item.description);
            }

            tooltipLines.push(''); // separator

            if (item.type === 'potion') {
                // Consumable-specific info
                tooltipLines.push('Type: Potion');
                tooltipLines.push(`Restores: ${item.amount} ${item.restore.toUpperCase()}`);
            } else if (item.stat) {
                // Equipment-specific info
                const statName = item.stat.charAt(0).toUpperCase() + item.stat.slice(1);
                tooltipLines.push(`${statName} Bonus: +${item.bonus}%`);
                tooltipLines.push(`${statName} Enhancement: +${item.enhancement}`);
            }

            const tooltipText = tooltipLines.join('\n');
            const escapedTooltip = tooltipText.replace(/"/g, '&quot;');

            html += `
                <div style="
                    width: 64px;
                    height: 64px;
                    background: rgba(40,40,40,0.8);
                    border: 2px solid #555;
                    border-radius: 6px;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.6);
                    transition: all 0.2s;
                "
                title="${escapedTooltip}"
                onmouseover="this.style.borderColor='#ffd700'; this.style.transform='scale(1.1)'"
                onmouseout="this.style.borderColor='#555'; this.style.transform='scale(1)'">
                    ${icon}
                    ${qtyText ? `<span style="
                        position: absolute;
                        bottom: 2px;
                        right: 4px;
                        color: white;
                        font-size: 0.8em;
                        font-weight: bold;
                        text-shadow: 1px 1px 2px black;
                    ">${qtyText}</span>` : ''}
                </div>`;
        } else {
            // Empty slot
            html += `
                <div style="
                    width: 64px;
                    height: 64px;
                    background: rgba(20,20,20,0.6);
                    border: 2px dashed #333;
                    border-radius: 6px;
                "></div>`;
        }
    }

    html += `</div>`;

    document.getElementById('inventoryContent').innerHTML = html;
}

// === モーダル開閉関数 ===
function toggleInventory() {
    const modal = document.getElementById('inventoryModal');
    if (modal.style.display === 'flex' || modal.style.display === '') {
        modal.style.display = 'none';
    } else {
        renderInventory();
        modal.style.display = 'flex';  // flexで中央配置を有効化
        // スクロール位置をトップに（モーダル内コンテンツ用）
        const content = document.getElementById('inventoryContent');
        if (content) content.scrollTop = 0;
    }
}

function closeInventory() {
    document.getElementById('inventoryModal').style.display = 'none';
}

/* javascript.js に追加（メイン機能） */
function openQuestLog() {
    console.log("openQuestLog called");
    const modal = document.getElementById('questLogModal');
    if (!modal) return;
    console.log("openQuestLog after return");
    const content = document.getElementById('questLogContent');
    content.innerHTML = '';

    // questDefinitionsをIDでマップ（検索高速化）
    const questMap = {};
    const quests = questDefinitions[currentLang] || questDefinitions.ja;
    quests.forEach(def => {
        questMap[def.id] = def;
    });

    // 全てのクエストを処理（完了 → 進行中 → 未発見の順）
    const completed = [];
    const active = [];
    const undiscovered = [];

    quests.forEach(def => {
        const id = def.id;
        const name = def.name || '不明なクエスト';

        if (gameState.completedQuests.includes(id)) {
            completed.push({ id, name, def });
        } else if (gameState.activeQuests[id]) {
            active.push({ id, name, def });
        } else {
            undiscovered.push({ id, name, def });
        }
    });

    const addEntry = (quest, status) => {
        const div = document.createElement('div');
        div.className = 'quest-entry';

        const nameSpan = document.createElement('div');
        nameSpan.className = 'quest-name';

        // quest.name を直接使用（安全 + フォールバック）
        const questName = quest.name || '不明なクエスト';

        if (status === 'completed') {
            nameSpan.classList.add('quest-completed');
            nameSpan.textContent = `${questName} ${t('quest_completed')}`;
        } else if (status === 'active') {
            nameSpan.classList.add('quest-active');
            nameSpan.textContent = `${questName} ${t('quest_in_progress')}`;
        } else {
            nameSpan.classList.add('quest-undiscovered');
            nameSpan.textContent = '???';

            // ヒント: 最初のステージのNPC
            if (quest.def.stages && quest.def.stages[0] && quest.def.stages[0].npc) {
                const firstNpc = quest.def.stages[0].npc;
                const hint = document.createElement('div');
                hint.className = 'quest-hint';
                hint.textContent = t('talk_to_hint', { npc: firstNpc });
                div.appendChild(hint);
            }
        }

        div.appendChild(nameSpan);
        content.appendChild(div);
    };

    // 順番: 完了 → 進行中 → 未発見
    completed.forEach(q => addEntry(q, 'completed'));
    active.forEach(q => addEntry(q, 'active'));
    undiscovered.forEach(q => addEntry(q, 'undiscovered'));

    modal.style.display = 'flex';
}

function closeQuestLog() {
    const modal = document.getElementById('questLogModal');
    if (modal) {
        modal.style.opacity = '0'; /* 閉じる時フェードアウト */
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '1'; /* 次回用リセット */
        }, 300);
    }
}


// 1施設だけの使用料設定モーダルを開く
function openFacilityFeeModal(facility) {
    const modal = document.getElementById('feeSettingModal');
    if (!modal) return;

    // まずモーダルを閉じて完全にリセット（以前の表示状態をクリア）
    closeFeeSettingModal();

    // タイトル更新
    const titleEl = modal.querySelector('h2');
    if (titleEl) {
        titleEl.textContent = `${t(`facilities_${facility}`)} の使用料設定`;
    }

    // 全ての入力セクションを非表示にする（inputの親divを対象）
    ['tavern', 'alchemy', 'blacksmith'].forEach(f => {
        const input = document.getElementById(`fee_${f}`);
        if (input) {
            const section = input.parentElement; // 直接の親div（label + input + small を含むdiv）
            if (section) {
                section.style.display = 'none';
            }
        }
    });

    // 対象施設のセクションだけ表示
    const targetInput = document.getElementById(`fee_${facility}`);
    if (targetInput) {
        const targetSection = targetInput.parentElement;
        if (targetSection) {
            targetSection.style.display = 'block';
            targetInput.value = gameState.facilityFees?.[facility] || 0;
        }
    }

    // 保存ボタンを専用関数に切り替え
    const saveBtn = modal.querySelector('button[onclick*="save"]');
    if (saveBtn) {
        saveBtn.setAttribute('onclick', `saveSingleFacilityFee('${facility}')`);
        saveBtn.textContent = 'この施設を保存';
    }

    // モーダル表示
    modal.style.display = 'flex';
}
// 1施設だけ保存
function saveSingleFacilityFee(facility) {
    const input = document.getElementById(`fee_${facility}`);
    if (!input) return;

    const value = parseInt(input.value) || 0;

    if (!gameState.facilityFees) gameState.facilityFees = {};
    gameState.facilityFees[facility] = value;

    better_alert(`${t(`facilities_${facility}`)} の使用料を ${value}G に更新しました`, "success");

    closeFeeSettingModal();
    renderFacilities(); // 現在の施設画面を更新
}

// モーダル閉じる（共通）
function closeFeeSettingModal() {
    document.getElementById('feeSettingModal').style.display = 'none';
}

function saveFacilityFees() {
    const tavern     = parseInt(document.getElementById('fee_tavern').value)     || 0;
    const alchemy    = parseInt(document.getElementById('fee_alchemy').value)    || 0;
    const blacksmith = parseInt(document.getElementById('fee_blacksmith').value) || 0;

    gameState.facilityFees = {
        tavern,
        alchemy,
        blacksmith
    };

    better_alert("施設使用料を更新しました", "success");

    closeFeeSettingModal();
    toggleFacilities(); // refresh to show new fee values
}

// === 新規関数: Guild Card 表示モーダル ===
function openGuildCard(advId) {
    const adv = findAdv(advId);
    if (!adv) return;

    // 安全初期化
    if (!adv.rank) adv.rank = 'F';

    // Primary Type 翻訳（多言語対応）
    const typeKeys = ['strength_type', 'magic_type', 'dexterity_type', 'luck_type'];
    const typeText = t(typeKeys[adv.primary || 1]) || 'UNKNOWN TYPE';

    // 効果ステータス取得
    const effStr = getEffectiveStat(adv, 'strength');
    const effWis = getEffectiveStat(adv, 'wisdom');
    const effDex = getEffectiveStat(adv, 'dexterity');
    const effLuk = getEffectiveStat(adv, 'luck');

    // 禁止行動リスト（翻訳済み、なしなら「なし」）
    let prohibitedText = '';
    if (adv.prohibitedActions && adv.prohibitedActions.length > 0) {
        prohibitedText = adv.prohibitedActions
            .map(act => t(`action_${act}`) || act)
            .join(', ') + t('prohibited_suffix');
    } else {
        prohibitedText = t('no_prohibited_actions');
    }

    // === モーダル動的作成（cardModalと同様）===
    let modal = document.getElementById('guildCardModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'guildCardModal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            justify-content: center;
            align-items: center;
            z-index: 10001;
            backdrop-filter: blur(8px);
        `;

        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px; right: 30px;
            font-size: 50px;
            color: #ffd700;
            cursor: pointer;
            text-shadow: 0 0 15px black;
        `;
        closeBtn.onclick = () => closeGuildCard();

        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
    }

    let content = modal.querySelector('.modal-content');
    if (!content) {
        content = document.createElement('div');
        content.className = 'modal-content';
        modal.appendChild(content);
    }

    content.innerHTML = `
        <div style="
            width: 480px;
            height: 720px;
            background: url('Images/guild_card_template.png') center/cover no-repeat; /* テンプレート画像を背景に */
            position: relative;
            border: 8px solid #d4af37;
            border-radius: 20px;
            box-shadow: 0 0 40px rgba(255,215,0,0.6);
            overflow: hidden;
        ">
            <!-- Rank Circle (Top Left) -->
            <div style="
                position: absolute;
                top: 30px; left: 30px;
                width: 90px; height: 90px;
                background: radial-gradient(circle, #1a1a1a, #000);
                border: 6px solid #d4af37;
                border-radius: 50%;
                text-align: center;
                color: white;
                padding-top: 12px;
                font-weight: bold;
                box-shadow: 0 0 20px rgba(255,215,0,0.8);
            ">
                <div style="font-size: 14px;">${t('rank_label')}</div>
                <div style="font-size: 42px; margin-top: -8px;">${adv.rank}</div>
            </div>

            <!-- Adventurer Name (Big Title) -->
            <div style="
                position: absolute;
                top: 40px; left: 140px; right: 40px;
                text-align: center;
                color: #ffd700;
                font-size: 36px;
                font-weight: bold;
                text-shadow: 3px 3px 8px black;
                letter-spacing: 2px;
            ">
                ${adv.name}
            </div>

            <!-- Character Image -->
            <div style="
                position: absolute;
                top: 140px; left: 50%;
                transform: translateX(-50%);
                width: 320px; height: 320px;
                overflow: hidden;
                border-radius: 20px;
                border: 4px solid #d4af37;
            ">
                <img src="Images/${adv.image}" alt="${adv.name}"
                     style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <!-- HP / MP (Right Side) -->
            <div style="
                position: absolute;
                top: 180px; right: 40px;
                color: white;
                font-size: 20px;
                text-align: right;
                text-shadow: 2px 2px 4px black;
            ">
                <div>HP ${adv.hp || 0}/${adv.maxHp || 0}</div>
                <div style="margin-top: 10px;">MP ${adv.mp || 0}/${adv.maxMp || 0}</div>
            </div>

            <!-- Type Badge -->
            <div style="
                position: absolute;
                bottom: 280px; left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(to bottom, #4a148c, #7b1fa2);
                color: white;
                padding: 10px 40px;
                border-radius: 30px;
                font-size: 24px;
                font-weight: bold;
                border: 4px solid #d4af37;
                box-shadow: 0 0 15px rgba(123,31,162,0.8);
            ">
                ${typeText}
            </div>

            <!-- Level & DEF -->
            <div style="
                position: absolute;
                bottom: 180px; left: 40px;
                color: white;
                font-size: 20px;
                text-shadow: 2px 2px 4px black;
            ">
                <div>${t('level_label')} ${adv.level}</div>
                <div style="margin-top: 10px;">DEF ${adv.defense || 0}</div>
            </div>

            <!-- Stats Row -->
            <div style="
                position: absolute;
                bottom: 120px; left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 30px;
                color: white;
                font-size: 22px;
                font-weight: bold;
                text-shadow: 2px 2px 4px black;
            ">
                <div>STR ${effStr}</div>
                <div>WIS ${effWis}</div>
                <div>DEX ${effDex}</div>
                <div>LUK ${effLuk}</div>
            </div>

            <!-- Prohibited Actions (Parchment Area) -->
            <div style="
                position: absolute;
                bottom: 30px; left: 40px; right: 40px;
                background: rgba(220,200,160,0.85);
                border-radius: 20px;
                padding: 20px;
                color: #3c2f00;
                font-size: 18px;
                text-align: center;
                min-height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 3px solid #d4af37;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
            ">
                ${prohibitedText}
            </div>
        </div>`;

    modal.style.display = 'flex';
}

function closeGuildCard() {
    const modal = document.getElementById('guildCardModal');
    if (modal) modal.style.display = 'none';
}


/* === TUTORIAL SYSTEM (RELATIVE ARROW - PERFECTLY ATTACHED) === */
let currentTutorialStep = 0;
let currentTarget = null; // To restore original style later

const tutorialSteps = [
    {
        description: {
            en: "Use the « Previous and Next » buttons to browse and select a quest you want to assign adventurers to.",
            ja: "« 前のクエスト » と « 次のクエスト » ボタンを使って、冒険者に割り当てたいクエストを選択してください。",
            zh: "使用 « 上一個 » 和 « 下一個 » 按鈕來瀏覽並選擇您要指派冒險者的任務。"
        },
        targetSelectors: ['button[onclick="prevQuest()"]', 'button[onclick="nextQuest()"]'],
        highlightSelector: 'button[onclick="nextQuest()"]',
        multiple: false
    },
    {
        description: {
            en: "Click on any adventurer card to assign that adventurer to the currently selected quest. You can assign multiple adventurers if needed.",
            ja: "任意の冒険者カードをクリックして、現在選択中のクエストにその冒険者を割り当ててください。複数人割り当ても可能です。",
            zh: "點擊任何冒險者卡片，將該冒險者指派到目前選中的任務。您可以指派多位冒險者。"
        },
        targetSelectors: ['.adventurer-card'],
        highlightSelector: '.adventurer-card',
        multiple: true
    },
    {
        description: {
            en: "When the quest success rate looks good, click this button to end the day and resolve all quests.",
            ja: "クエストの成功率が十分に高くなったと思ったら、このボタンをクリックして1日を終了し、クエストを解決してください。",
            zh: "當任務成功率看起來足夠高時，點擊此按鈕結束一天並解決所有任務。"
        },
        targetSelectors: ['button[onclick="playDay()"]'],
        highlightSelector: 'button[onclick="playDay()"]',
        multiple: false
    },
    {
        description: {
            en: "Click this button to open the Guild Facilities menu.",
            ja: "ギルド施設メニューを開くためにこのボタンをクリックしてください。",
            zh: "點擊此按鈕開啟公會設施選單。"
        },
        targetSelectors: ['button[onclick="toggleFacilities()"]'],
        highlightSelector: 'button[onclick="toggleFacilities()"]',
        multiple: false
    },
    {
        description: {
            en: "Inside the facilities menu, click the Tavern button to manage it.",
            ja: "施設メニュー内で、酒場ボタンをクリックして酒場を管理してください。",
            zh: "在設施選單內，點擊酒館按鈕來管理它。"
        },
        targetSelectors: ['button[onclick="selectFacility(\'tavern\')"]'],
        highlightSelector: 'button[onclick="selectFacility(\'tavern\')"]',
        multiple: false
    },
    {
        description: {
            en: "Click the Upgrade button to improve the tavern (it may be disabled until you have enough gold/reputation). Upgraded taverns let idle adventurers rest and recover better.",
            ja: "アップグレードボタンをクリックして酒場を強化してください（金や評判が不足していると無効です）。強化された酒場ではクエストに出ていない冒険者がより良く休息・回復できます。",
            zh: "點擊升級按鈕來改善酒館（如果金幣或聲望不足可能會禁用）。升級後的酒館能讓閒置的冒險者更好地休息和恢復。"
        },
        targetSelectors: ['button[onclick="upgradeFacility(\'tavern\')"]'],
        highlightSelector: 'button[onclick="upgradeFacility(\'tavern\')"]',
        multiple: false
    },
    {
        description: {
            en: "Click 'Produce and Stock' to make food. Stocked food lets adventurers eat at the tavern and prevents hunger penalties.",
            ja: "「生産して在庫に追加」ボタンをクリックして食べ物を作成してください。在庫がある食べ物は冒険者が酒場で注文・消費でき、空腹ペナルティを防ぎます。",
            zh: "點擊「生產並入庫」來製作食物。有庫存的食物能讓冒險者在酒館訂購並食用，防止飢餓懲罰。"
        },
        targetSelectors: ['button[onclick="produceAndStock(0)"]'],
        highlightSelector: 'button[onclick="produceAndStock(0)"]',
        multiple: false
    }
];

function startTutorial() {
    if (gameState.tutorialCompleted) return;
    injectTutorialStyles();  // ← Add this line
    currentTutorialStep = 0;
    showTutorialStep();
}

function showTutorialStep() {
    removeTutorialElements();

    if (currentTutorialStep >= tutorialSteps.length) {
        endTutorial();
        return;
    }

    const step = tutorialSteps[currentTutorialStep];

    // Show description box
    createTutorialDescription(step);

    // Highlight target
    let highlightElem = null;
    if (step.highlightSelector) {
        highlightElem = document.querySelector(step.highlightSelector);
    }
    if (highlightElem) {
        highlightTarget(highlightElem);
        currentTarget = highlightElem; // remember for cleanup
    }

    // Click-to-advance logic
    let targetElems = [];
    step.targetSelectors.forEach(sel => {
        if (step.multiple) {
            document.querySelectorAll(sel).forEach(el => targetElems.push(el));
        } else {
            const el = document.querySelector(sel);
            if (el) targetElems.push(el);
        }
    });

    if (targetElems.length > 0) {
        targetElems.forEach(el => {
            el.addEventListener('click', advanceTutorial, { once: true });
        });
    } else {
        setTimeout(advanceTutorial, 3000);
    }
}

function advanceTutorial() {
    currentTutorialStep++;
    showTutorialStep();
}

function removeTutorialElements() {
    // Remove highlight
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

    // Remove and clean up arrow

    // Restore original position style if we modified it
    if (currentTarget) {
        const saved = currentTarget.dataset.originalPosition;
        if (saved !== undefined) {
            currentTarget.style.position = saved === 'none' ? '' : saved;
            delete currentTarget.dataset.originalPosition;
        }
        currentTarget = null;
    }

    // Remove description
    const desc = document.getElementById('tutorialDescription');
    if (desc) desc.remove();
}

function highlightTarget(elem) {
    elem.classList.add('tutorial-highlight');
}

function createTutorialDescription(step) {
    // Select the correct language text with safe fallback
    const descText = step.description[currentLang] 
        || step.description.en 
        || step.description.ja 
        || step.description.zh 
        || "Tutorial step description missing";

    let desc = document.getElementById('tutorialDescription');
    if (!desc) {
        desc = document.createElement('div');
        desc.id = 'tutorialDescription';
        document.body.appendChild(desc);
    }
    desc.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 100%;
        padding: 10px;
        background: rgba(0,0,0,0.85);
        color: #ffd700;
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        border: 4px solid #ffd700;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0,0,0,0.8);
        z-index: 10001;
        pointer-events: none;
        line-height: 1.5;
        white-space: pre-wrap; /* Preserves line breaks if needed in translations */
    `;
    desc.innerHTML = descText;
}



function endTutorial() {
    removeTutorialElements();
    better_alert("Tutorial complete! Now explore the game and manage your guild on your own. Good luck!", "success");
    gameState.tutorialCompleted = true;
}

function injectTutorialStyles() {
    if (document.getElementById('tutorialAnimStyle')) return; // Already injected

    const style = document.createElement('style');
    style.id = 'tutorialAnimStyle';
    style.innerHTML = `
        .tutorial-highlight {
            box-shadow: 0 0 30px 8px gold !important;
            animation: tutorialGlow 2s infinite alternate;
            z-index: 9999 !important;
        }
        @keyframes tutorialGlow {
            from { box-shadow: 0 0 20px 5px gold; }
            to { box-shadow: 0 0 40px 15px orange; }
        }
    `;
    document.head.appendChild(style);
}