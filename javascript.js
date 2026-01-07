let CurrentQuestType = "None";
/* === ローディング画面用プリロード機能 === */
let loadedCount = 0;
let currentGuildQuestType = 'main';
let currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
let currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
let currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
let currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;
let playerName = "";

/**
 * better_alert(message, type = "basic")
 * 
 * Shows a Toastify toast notification.
 * Falls back to native window.alert() if Toastify is unavailable or fails (e.g., script didn't load, JS error).
 * This ensures your alerts always work, even in edge cases.
 */
function better_alert(message, type = "basic") {
    let prefix = '';
    let background = '#1a1a1a';
    let textColor = '#ffffff';

    // Play levelup sound as early as possible (for both toast and fallback)
    if (type === "levelup" && typeof levelupSound !== 'undefined') {
        levelupSound.currentTime = 0; // Rewind in case it was played before
        levelupSound.play().catch(err => {
            console.warn('Level up sound could not play (autoplay policy or error):', err);
        });
    }

    // Type-specific designs with gradients, emojis, and better contrast
    if (type === "success") {
        prefix = '✅ ';
        background = 'linear-gradient(to right, #11998e, #38ef7d)'; // Vibrant teal → light green
    } else if (type === "error" || type === "failure") {
        prefix = '❌ ';
        background = 'linear-gradient(to right, #ff0844, #ffb199)'; // Deep red → soft coral
    } else if (type === "warning") {
        prefix = '⚠️ ';
        background = 'linear-gradient(to right, #fc4a1a, #f7b733)'; // Orange → warm yellow
        textColor = '#000000';
    } else if (type === "levelup") {
        prefix = '🌟 ';
        background = 'linear-gradient(to right, #ffe259, #ffa751)'; // Warm shiny golden-yellow gradient (celebratory feel)
        textColor = '#000000'; // Dark text for high contrast on bright yellow
    } else if (type === "death") {
        prefix = '☠️ ';
        background = 'linear-gradient(to right, #0f0f0f, #2a2a2a)'; // Deep black → dark grey for somber feel
        textColor = '#ffffff';
    } else if (type === "basic") {
        prefix = ''; 
        background = 'linear-gradient(to right, #f12711, #f5af19)'; // Intense red → bright orange
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
        },
        className: 'game-toast',
        close: true,
        clickToClose: true,
        escapeMarkup: true
    };

    // Special enhancements for levelup (longer display, glow, bigger text)
    if (type === "levelup") {
        toastConfig.duration = 7000;
        toastConfig.style.boxShadow = '0 12px 50px rgba(255, 165, 0, 0.7)'; // Strong warm yellow/orange glow
        toastConfig.style.border = '3px solid #FFD700'; // Golden border for extra shine
        toastConfig.style.fontSize = '18px';
        toastConfig.style.fontWeight = '700';
        toastConfig.style.padding = '20px 30px';
    }

    // Special enhancements for death (somber, prominent, lingering)
    if (type === "death") {
        toastConfig.duration = 10000; // Longer duration to let the sorrow sink in
        toastConfig.gravity = "bottom";
        toastConfig.position = "center";
        toastConfig.style.boxShadow = '0 12px 50px rgba(0, 0, 0, 0.8)'; // Deep dark shadow, no bright glow
        toastConfig.style.border = '3px solid #444444'; // Subtle dark border
        toastConfig.style.fontSize = '20px';
        toastConfig.style.fontWeight = '800';
        toastConfig.style.padding = '28px 40px';
        toastConfig.style.minWidth = '380px';
        toastConfig.style.backdropFilter = 'blur(16px)';
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

    // 在庫チェック＆売却素材扣除
    let hasStockIssue = false;
    resources.forEach(r => {
        const item = gameState.inventory.find(i => i.name === r && i.type === 'material');
        const stock = item ? item.qty : 0;
        if (data.sell[r] > stock) {
            better_alert(t('trade_insufficient_stock', { item: r }),"error");
            hasStockIssue = true;
        }
        if (data.sell[r] > 0 && item) {
            item.qty -= data.sell[r];
        }
    });
    if (hasStockIssue) return;

    // 購入コストを事前に全額扣除（資本が必要になる現実的な貿易に）
    if (gameState.gold < data.cost) {
        better_alert(t('trade_insufficient_gold', {
            cost: data.cost,
            current: gameState.gold
        }),"error");
        // 売却素材を戻す（扣除取り消し）
        resources.forEach(r => {
            const item = gameState.inventory.find(i => i.name === r && i.type === 'material');
            if (data.sell[r] > 0 && item) item.qty += data.sell[r];
        });
        return;
    }
    gameState.gold -= data.cost;

    const city = gameState.tradeCityStates.find(c => c.id === cityId);

    // generateQuestの返却形式に近づけた貿易クエストオブジェクト
    const outLoad = Object.values(data.sell).reduce((a, b) => a + b, 0);
    const inLoad = Object.values(data.buy).reduce((a, b) => a + b, 0);

    // 難易度を所要日数ベースに調整（ランク表示・EXP量に影響）
    const difficulty = Math.floor(data.totalDays * 10); // 例: 4日→40, 20日→200

    const quest = {
        id: gameState.nextId++,
        desc: t('trade_quest_description', {
            cityName: city.name,
            outLoad: outLoad,
            inLoad: inLoad,
            totalDays: data.totalDays
        }),
        difficulty: 1,
        rank: t('trade_rank'), // 翻訳可能にしたランク表示（必要に応じて調整）
        minStrength: 0,
        minWisdom: 0,
        minDexterity: 0,
        minLuck: 0,
        focusStat: 'luck',       // 貿易は運が重要という設定（表示用）
        minFocus: 0,             // 確定成功なので実質ステータス不要
        type: 'trade',           // 既存の 'trade' 文字列を維持（レンダリングで特殊扱い可能）
        item: null,
        npcIdx: null,
        daysLeft: data.totalDays + 5,
        reward: data.revenue,    // 完了時に売却収益を加算（購入コストは事前扣除済み → 純利益 = reward - cost）
        assigned: [],
        inProgress: false,
        questType: questTypeClasses.indexOf('trade'), // 'trade' のインデックス（例: 8）
        questStoryindex: 0,
        // 貿易内部データ（完了処理用）
        sell: data.sell,
        buy: data.buy,
        outLoad: outLoad,
        inLoad: inLoad,
        tradeRemainingDays: data.totalDays, // 進行管理用残り日数
        cityName: city.name,                // ← 完了メッセージで使用するため明示的に保存
        totalDaysRecorded: data.totalDays   // メッセージ表示用（所要日数表示）
    };

    gameState.quests.push(quest);
    better_alert(t('trade_post_success'),"success");
    showMainSelection();
    updateDisplays();
}
function updateProgress() {
    const percent = Math.round((loadedCount / totalAssets) * 100);
    const progressEl = document.getElementById('loadProgress');
    if (progressEl) {
        progressEl.textContent = percent + '%';
    }
    if (loadedCount >= totalAssets) {
        document.querySelector('.loader').style.display = 'none';
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

    // カイト (STR/DEX 特化の二刀流騎士)
    const Kaito = {
        id: gameState.nextId++,
        name: names.Kaito,
        gender: 'male',
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
        primary: 0
    };

    gameState.adventurers.push(Kaito);

    // ルナ (WIS 特化の魔法使い)
    const Luna = {
        id: gameState.nextId++,
        name: names.Luna,
        gender: 'female',
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
        primary: 1
    };

    gameState.adventurers.push(Luna);
}


function startGame() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
    Render_Mainadventurer();
    if (!gameState.dungeonCooldowns) {
    gameState.dungeonCooldowns = {}; // { floor: nextAvailableDay }
}
    console.log("CurrentLang is:"+currentLang);
    currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
    currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
    currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
    currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;
    // === javascript.js の gameState 初期化部分（startGame() 内や新ゲーム開始時に追加） ===
gameState.tradeCityStates = tradeCities.map(city => ({
    ...city,
    event: getRandomEvent(),
    variances: resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {}) // ±20%
}));

gameState.homeVariances = resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {});
gameState.materialPrices = {}; // ギルドショップ用（後述）

    
}

function skipIntro(){
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
    document.getElementById('introModal').style.display = 'none';
    console.log("CurrentLang is:"+currentLang);
    
    loadGame(1);
    updateDisplays();

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
        better_alert('無効なスロット番号です（1～4）',"error");
        return;
    }

    const savableState = {
        ...gameState,
        seenCompletionDialogues: Array.from(gameState.seenCompletionDialogues || new Set()),
        saveTimestamp: new Date().toLocaleString('ja-JP', {
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
    better_alert(`スロット ${slot} にゲームを保存しました！`,"success");
    
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
    title.textContent = mode === 'save' ? 'セーブスロットを選択' : 'ロードスロットを選択';
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
        let text = `スロット ${i} : `;
        
        if (info.empty) {
            text += info.corrupted ? '破損' : '空';
            slotDiv.style.opacity = '0.6';
        } else {
            text += `${info.time}<br>Player: ${info.playerName} | ${info.day} │ ${info.gold} G │ Level: ${info.highestLevel}`;
            slotDiv.innerHTML = text;
        }
        if (info.empty) slotDiv.innerHTML = text;
        
        slotDiv.onclick = (e) => {
            e.stopPropagation(); // 背景クリック防止
            
            if (mode === 'save') {
                if (!info.empty && !confirm(`スロット ${i} を上書きしますか？`)) {
                    return;
                }
                saveGame(i);
                closeSlotMenu();
            } else { // load
                if (info.empty) {
                    better_alert('このスロットは空です！',"warning");
                    return;
                }
                if (confirm(`スロット ${i} からロードしますか？`)) {
                    loadGame(i);
                    closeSlotMenu();
                }
            }
        };
        
        content.appendChild(slotDiv);
    }
    
    // === セーブモードの場合、5番目の「現在のゲームをテキストにエクスポート」オプションを追加 ===
    if (mode === 'save') {
        const exportDiv = document.createElement('div');
        exportDiv.style.padding = '20px';
        exportDiv.style.margin = '20px 0 10px';
        exportDiv.style.background = '#7c2d12'; // 暖かいオレンジブラウンでセーブらしい目立つ色
        exportDiv.style.borderRadius = '10px';
        exportDiv.style.cursor = 'pointer';
        exportDiv.style.transition = 'background 0.2s';
        exportDiv.style.fontSize = '18px';
        exportDiv.style.textAlign = 'center';
        exportDiv.style.border = '2px dashed #fb923c';
        
        exportDiv.onmouseover = () => { exportDiv.style.background = '#9a3412'; };
        exportDiv.onmouseout = () => { exportDiv.style.background = '#7c2d12'; };
        
        exportDiv.innerHTML = '<strong>📄 現在のゲームをテキストにエクスポート</strong><br><small>現在のゲーム状態を文字列として出力（他のPCへ転送可能）</small>';
        
        exportDiv.onclick = (e) => {
            e.stopPropagation();
            closeSlotMenu(); // メニューを閉じてエクスポートモーダルを開く
            openTextExportModal();
        };
        
        content.appendChild(exportDiv);
    }
    
    // === ロードモードの場合、5番目の「テキストからインポート」オプションを追加（既存）===
    if (mode === 'load') {
        const importDiv = document.createElement('div');
        importDiv.style.padding = '20px';
        importDiv.style.margin = '20px 0 10px';
        importDiv.style.background = '#1e40af'; // 青系
        importDiv.style.borderRadius = '10px';
        importDiv.style.cursor = 'pointer';
        importDiv.style.transition = 'background 0.2s';
        importDiv.style.fontSize = '18px';
        importDiv.style.textAlign = 'center';
        importDiv.style.border = '2px dashed #60a5fa';
        
        importDiv.onmouseover = () => { importDiv.style.background = '#2563eb'; };
        importDiv.onmouseout = () => { importDiv.style.background = '#1e40af'; };
        
        importDiv.innerHTML = '<strong>📄 テキストからインポートしてロード</strong><br><small>エクスポートされた文字列を貼り付けて直接ゲームをロード</small>';
        
        importDiv.onclick = (e) => {
            e.stopPropagation();
            closeSlotMenu();
            openTextImportModal();
        };
        
        content.appendChild(importDiv);
    }
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'キャンセル';
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
        saveTimestamp: new Date().toLocaleString('ja-JP', {
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
    title.textContent = '現在のゲームをテキストにエクスポート';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    content.appendChild(title);

    const info = document.createElement('p');
    info.textContent = '以下の文字列をコピーして、他のPCやブラウザでインポートできます。この文字列は現在のゲーム状態を完全に表しています。';
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
    copyBtn.textContent = 'クリップボードにコピー';
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
            better_alert('クリップボードにコピーしました！',"success");
        } catch (err) {
            textarea.select();
            document.execCommand('copy');
            better_alert('コピーしました（古いブラウザモード）',"success");
        }
    };
    content.appendChild(copyBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '閉じる';
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
    title.textContent = 'テキストからセーブデータをインポートしてロード';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    content.appendChild(title);

    const info = document.createElement('p');
    info.textContent = 'エクスポートされた文字列を以下に貼り付けてください。貼り付け後、「ロード実行」を押すとゲームが直接ロードされます（スロットは使用しません）。';
    info.style.marginBottom = '20px';
    content.appendChild(info);

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'ここにエクスポートされたテキストを貼り付け...';
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
    loadBtn.textContent = 'ロード実行';
    loadBtn.style.display = 'block';
    loadBtn.style.margin = '20px auto';
    loadBtn.style.padding = '12px 30px';
    loadBtn.style.background = '#10b981';
    loadBtn.style.color = '#fff';
    loadBtn.style.border = 'none';
    loadBtn.style.borderRadius = '8px';
    loadBtn.style.cursor = 'pointer';
    loadBtn.onclick = () => {
        const text = textarea.value.trim();
        if (!text) {
            better_alert('テキストが空です！',"error");
            return;
        }

        let decoded;
        try {
            decoded = decodeURIComponent(escape(atob(text)));
        } catch (e) {
            better_alert('無効なデータ形式です（Base64デコード失敗）',"error");
            return;
        }

        let loadedState;
        try {
            loadedState = JSON.parse(decoded);
        } catch (e) {
            better_alert('データが壊れています（JSON解析失敗）',"error");
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
        
        better_alert('テキストからゲームをロードしました！',"success");
        closeTextImportModal();
    };
    content.appendChild(loadBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'キャンセル';
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
        better_alert('無効なスロット番号です（1～4）',"error");
        return;
    }

    const key = `guildMasterSave${slot}`;

    // === 初期化（新規ゲーム時やセーブがない場合のデフォルト）===
    gameState.tradeCityStates = tradeCities.map(city => ({
        ...city,
        event: getRandomEvent(),
        variances: resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {}) // ±20%
    }));

    gameState.homeVariances = resources.reduce((acc, r) => ({...acc, [r]: 0.8 + Math.random() * 0.4}), {});
    gameState.materialPrices = {}; // ギルドショップ用

    if (!gameState.dungeonCooldowns) {
        gameState.dungeonCooldowns = {}; // { floor: nextAvailableDay }
    }

    // 現在の言語に応じたレシピをグローバルに設定
    currentAlchemyRecipes = alchemyRecipes[currentLang] || alchemyRecipes.ja;
    currentTavernRecipes = tavernRecipes[currentLang] || tavernRecipes.ja;
    currentBlacksmithRecipes = blacksmithRecipes[currentLang] || blacksmithRecipes.ja;
    currentQuestCompletionDialogue = QuestCompletionDialogue[currentLang] || QuestCompletionDialogue.ja;

    const saved = localStorage.getItem(key);
    console.log("Current Lang is" + currentLang);

    if (saved) {
        let loadedState;
        try {
            loadedState = JSON.parse(saved);
        } catch (e) {
            better_alert(`スロット ${slot} のセーブデータが破損しています！`,"error");
            console.warn('Save data parse error:', e);
            return;
        }

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
        better_alert(`スロット ${slot} からゲームを読み込みました！`,"success");
    } else {
        // この分岐は通常到達しない（メニューで空スロットをブロックしている）が、安全のため
        better_alert(`スロット ${slot} にセーブデータがありません！`,"warning");
        updateDisplays(); // 新規ゲーム相当の表示更新
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
        for (let i = 0; i < qty; i++) {
            const newItem = { ...template, id: gameState.nextId++ };
            gameState.inventory.push(newItem);
        }
    } else {
        // Stackables (potions, materials, consumables): stack by name
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
        better_alert("ゴールドが不足しています","error");
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
        better_alert("評判が不足しています","error");
        return;
    }
    gameState.reputation -= 10;
    gameState.gold += 100;
    better_alert("商人から100G貰ったけど、評判は"+gameState.reputation+"まで下がりました","success");
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

    // 金・評判もクランプ
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
    // 5. 評判ゼロ → rep
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
        updateDay();
        return true;
    }
    return false;
}

function buyExpansion() {
    const current = gameState.maxPermanentSlots;
    if (current >= 12) {
        better_alert('最大拡張に達しました',"error");
        return;
    }
    const next = current + 1;
    const level = next - 4;
    const cost = 500 + 250 * (level - 1);
    if (!spendGold(cost)) return;
    gameState.maxPermanentSlots = next;
    updateDisplays();
}

function randomName(gender) {  // gender: 'male' or 'female' (string, lowercase)
    const names = adventurerNames[currentLang] || adventurerNames.ja;  // fallback to ja
    const pool = names[gender] || names.female;  // default to female if invalid
    return pool[Math.floor(Math.random() * pool.length)];
}

// generateQuest 関数を以下のものに完全に置き換え
function generateQuest(){
    // 新しい難易度計算：評判に基づく範囲（平均 ≈ reputation / 10）
    const baseDiff = Math.max(0, Math.floor(gameState.reputation / 10));
    const minDiff = Math.max(1, baseDiff - 5);
    const maxDiff = Math.min(150, baseDiff + 5);  // 上限キャップは一旦外す（必要なら後で追加可能）
    const difficulty = minDiff + Math.floor(Math.random() * (maxDiff - minDiff + 1));
    const rank = getQuestRank(difficulty);
    let storyindex = 0;

    const primary = Math.floor(Math.random()*4);
    let minStrength=0,minWisdom=0,minDexterity=0,minLuck=0;
    if(primary===0){minStrength = Math.floor(Math.random()*10 + difficulty*5); minWisdom = Math.floor(Math.random()*5 + difficulty*2); minDexterity = Math.floor(Math.random()*5 + difficulty*2); minLuck = Math.floor(Math.random()*3 + difficulty);}
    else if(primary===1){minWisdom = Math.floor(Math.random()*10 + difficulty*5); minStrength = Math.floor(Math.random()*5 + difficulty*2); minDexterity = Math.floor(Math.random()*5 + difficulty*2); minLuck = Math.floor(Math.random()*3 + difficulty);}
    else if(primary===2){minDexterity = Math.floor(Math.random()*10 + difficulty*5); minStrength = Math.floor(Math.random()*5 + difficulty*2); minWisdom = Math.floor(Math.random()*5 + difficulty*2); minLuck = Math.floor(Math.random()*3 + difficulty);}
    else{minLuck = Math.floor(Math.random()*10 + difficulty*5); minStrength = Math.floor(Math.random()*3 + difficulty); minWisdom = Math.floor(Math.random()*3 + difficulty); minDexterity = Math.floor(Math.random()*5 + difficulty*2);}

    let desc, item = null, npcIdx = null;
    let qType = 5

    if (primary === 0) { // kill (STR)
        const descs = killDescsByRank[currentLang] || killDescsByRank.ja;
        const pool = descs[rank] || descs['F']; // fallback to F rank if invalid
        qType = 0;
        storyindex = Math.floor(Math.random() * pool.length); 
        desc = pool[storyindex];
    } else if (primary === 1) { // discovery (WIS)
    const descs = discoveryDescsByRank[currentLang] || discoveryDescsByRank.ja;
    const pool = descs[rank] || descs['F']; // fallback to F rank if invalid
    
    let useEpic = false;

    // Bランク以上はepic discoveryDescsを使用（NPC発見可能）
    if (['B','B+','A','A+','S'].includes(rank)) {
        useEpic = true;
    }

    qType = 1;
    const selectedIndex = Math.floor(Math.random() * pool.length);
    const selectedDesc = pool[selectedIndex];
    desc = selectedDesc;
    if (useEpic) {
        // epicプールの場合、discoveryDescs全体でのインデックスを取得してNPC発見に使用
        const originalIndex = discoveryDescs.indexOf(selectedDesc);
        if (originalIndex !== -1) {
            npcIdx = originalIndex;
        }
        // epicは通常のストーリー対話なし（NPC発見専用）なのでstoryindexは0のまま（必要なら後で別処理）
        storyindex = 0;
    } else {
        // 通常discoveryはstoryindexを使用
        storyindex = selectedIndex;
    }

    } else if (primary === 2) { // escort (DEX)
        const descs = escortDescsByRank[currentLang] || escortDescsByRank.ja;
        const pool = descs[rank] || descs['F']; // fallback to F rank if invalid
        qType = 2;
        storyindex = Math.floor(Math.random() * pool.length); 
        desc = pool[storyindex];
    } else { // fetch (LUC)
        const quests = fetchQuestsByRank[currentLang] || fetchQuestsByRank.ja;
        const pool = quests[rank] || quests['F']; // fallback to F rank if invalid
        qType = 3;
        storyindex = Math.floor(Math.random() * pool.length); 
        const entry = pool[storyindex];
        const qty = Math.floor(Math.random() * 3) + 1;
        desc = entry.desc.replace('{qty}', qty);
        item = {name: entry.itemName, minPrice: entry.minPrice, maxPrice: entry.maxPrice};
    }

    const focusStat = ['strength', 'wisdom', 'dexterity', 'luck'][primary];
    const minFocus = primary === 0 ? minStrength : primary === 1 ? minWisdom : primary === 2 ? minDexterity : minLuck;

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
        reward: difficulty*100,
        assigned:[],
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
    modalTitle.innerHTML = `日 ${currentDayEvents[0].day} のイベント`;
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
    
    let image;
    if (gameState.reputation <= 1000) {
        image = `${statAbbr}_RankF_${gender}.png`;
    } else {
        image = `${statAbbr}_${gender}.png`;
    }
    
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
        temp: true,
        busy: false,
        generatedDay: 0,
        primary: primary,
        critChance: 10,
    };
    
    // Target level = floor(reputation / 20), minimum 1 → matches (reputation / 10)/2
    const targetLevel = Math.max(1, Math.floor(gameState.reputation / 20));
    
    // Force level-ups from level 1 to targetLevel
    levelUp(adv, targetLevel - 1);
    
    // Costs are based on final total stats after all growth
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
    let s = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor)), w = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor)), d = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor)), l = Math.max(1, Math.floor((1 + Math.random() * 2) * repFactor));
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
        level: 1, exp: 0,
        strength: s, wisdom: w, dexterity: d, luck: l,defense:2,
        hp: 100, maxHp: 100, mp: 50, maxMp: 50,
        equipment: [],
        buffs: [],
        image: image,
        busy: false,
        primary: primary
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
    adv.defense = startLevel *2;
    adv.hp = adv.maxHp;
    adv.mp = adv.maxMp;
    adv.exp = 0;
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

    // 元の装備ボーナス（%扱い） - 該当ステータスの装備のみ加算
    let percentFromEquip = obj.equipment ? obj.equipment.reduce((sum, e) => 
        (e.stat === stat ? sum + (e.bonus || 0) : sum), 0) : 0;

    // バフボーナス（元コード通り%扱い）
    let percentFromBuff = 0;
    if (obj.buffs) {
        obj.buffs.forEach(b => {
            if (b.stat === stat) percentFromBuff += (b.bonus || 0);
        });
    }

    // MP比率によるパーセンテージ補正（-20% ～ +20%）
    const mpPct = obj && typeof obj.mp === 'number' && typeof obj.maxMp === 'number' && obj.maxMp > 0 
        ? obj.mp / obj.maxMp : 1;
    let mpPercent = (mpPct >= 0.5) 
        ? 20 * (mpPct - 0.5) / 0.5 
        : -20 * (0.5 - mpPct) / 0.5;

    // 合計%ボーナス（装備% + バフ% + MP%）
    let totalPercent = percentFromEquip + percentFromBuff + mpPercent;

    // %適用後
    let afterPercent = Math.floor(base * (1 + totalPercent / 100));

    // 新規：enhancementによる絶対値ボーナス（後から加算） - 該当ステータスの装備のみ加算
    let absoluteFromEquip = obj.equipment ? obj.equipment.reduce((sum, e) => 
        (e.stat === stat ? sum + (e.enhancement || 0) : sum), 0) : 0;

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
        better_alert("クエスト進行中は冒険者を追加できません","error");
        return;
    }
    const maxSlots = q.training ? 2 : 4;
    if(q.assigned.length >= maxSlots){
        better_alert(q.training ? "トレーニングクエストは最大2人までです。" : "クエストは満員です","error");
        return;
    }
    const adv=findAdv(advId);
    if(!adv) return;
    if(adv.mp <= 0){ better_alert(`${adv.name}のMPがありません！ポーションで回復するか、回復を待ってください。`,"error"); return; }
    const cost=adv.temp?adv.hiringCost:0;
    if(cost > 0 && !spendGold(cost)) return;
    q.assigned.push(advId);
    adv.busy=true;
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
    gameState.eventHistory.unshift({day: gameState.day, message: `クエスト "${q.desc}" を拒否。評判 -${penalty.toFixed(1)}。`});
    const idx = gameState.quests.findIndex(qq => qq.id === qId);
    if (idx !== -1) {
        gameState.quests.splice(idx, 1);
    }
    better_alert(`クエストを拒否しました！評判 -${penalty.toFixed(1)}`,"error");
    updateDisplays();
}

function buy(i,qty){
    const it=shopItems[i];
    const totalcost = it.cost * qty;
    if(!spendGold(totalcost)){
        return;
    } 
    
    addToInventory(it, qty);
    better_alert(it.name+" x "+qty+"を購入した、合計："+totalcost+"G、 残り："+gameState.gold+"G","success");
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
    const newAdv={...adv};
    delete newAdv.temp; delete newAdv.generatedDay;
    newAdv.hp = newAdv.maxHp;
    newAdv.mp = newAdv.maxMp;
    newAdv.busy=false;
    newAdv.buffs = [];
    gameState.adventurers.push(newAdv);
    gameState.recruitPending.splice(i,1);
    better_alert(adv.name+"が新しいメンバーになりました","success");
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

function equipToChar(pIdx, itemId) {
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    if (!adv) return;
    if (adv.equipment.length >= 2) {
        better_alert('最大2つまで装備可能です',"error");
        return;
    }
    const itemIdx = gameState.inventory.findIndex(it => it.id === itemId);
    if (itemIdx === -1) return;
    const item = gameState.inventory[itemIdx];
    if (!item || !item.stat) return;
    adv.equipment.push(item);
    gameState.inventory.splice(itemIdx, 1);
    renderCurrentCharacter();
}

function removeFromChar(pIdx, eqIdx){
    const perms = gameState.adventurers.filter(a => !a.temp);
    const adv = perms[pIdx];
    const item = adv.equipment[eqIdx];
    adv.equipment.splice(eqIdx,1);
    addToInventory(item,1);
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


function renderShopPurchase() {
    let html = '<ul class="shop-list">';
    shopItems.forEach((it, i) => {
        html += `<li class="shop-item">`;
        html += `<strong>${it.name}</strong> - ${it.cost}g`;
        if (it.stat) html += ` <span class="bonus">(+${it.bonus}% ${statFull[it.stat]})</span>`;
        if (it.type === 'potion') html += ` <span class="bonus">(${it.restore.toUpperCase()} +${it.amount})</span>`;
        html += ` <button class="buy-btn" onclick="buy(${i},1)">購入</button>`;
        html += ` <button class="buy-btn" onclick="buy(${i},10)">10個購入</button>`;
        html += `</li>`;
    });
    html += '</ul>';
    return html;
}

function renderDailyMaterials() {
    if (gameState.dailyMaterials && gameState.dailyMaterials.length > 0) {
        let html = '<ul class="shop-list">';
        gameState.dailyMaterials.forEach((mat, i) => {
            html += `<li class="shop-item">`;
            html += `<strong>${mat.name}</strong> - ${mat.price}g`;
            html += ` <button class="buy-btn" onclick="buyMaterial(${i})">購入</button>`;
            html += `</li>`;
        });
        html += '</ul>';
        return html;
    }
    return '<p class="empty-msg">今日の素材はありません。</p>';
}

function renderGuildExpansion() {
    const currentSlots = gameState.maxPermanentSlots || 4;
    if (currentSlots < 12) {
        const nextSlots = currentSlots + 1;
        const level = nextSlots - 4;
        const cost = 500 + 250 * (level - 1);
        return `<div class="expansion-section">
            <p>現在の恒久冒険者スロット: <strong>${currentSlots}</strong></p>
            <p>次のスロット: <strong>${nextSlots}</strong> - ${cost}g でアップグレード</p>
            <button class="buy-btn large" onclick="buyExpansion()">拡張購入</button>
        </div>`;
    }
    return '<p class="empty-msg">ギルドは最大まで拡張されています。</p>';
}

function renderCorruption() {
    return `<div class="corruption-section">
        <p>10 評判を消費して 100g を得る</p>
        <button class="buy-btn warn" onclick="corrupt()">商人を脅す</button>
    </div>`;
}

function renderSellItems() {
    let html = '';
    const allItems = [];
    if (gameState.sellables) {
        gameState.sellables.forEach(item => allItems.push({...item, source: 'sellables'}));
    }
    gameState.inventory.forEach(item => allItems.push({...item, source: 'inventory'}));

    if (allItems.length === 0) {
        return `<p class="empty-msg">${t('sell_no_items')}</p>`;
    }

    const grouped = {};
    allItems.forEach((item, origIndex) => {
        const key = item.name;
        if (!grouped[key]) {
            grouped[key] = { ...item, items: [] };
        }
        grouped[key].items.push({source: item.source, index: origIndex});
    });

    html += '<ul class="shop-list sell-list">';
    Object.values(grouped).forEach(group => {
        let count = 0;
        group.items.forEach(entry => {
            const actualItem = entry.source === 'inventory' 
                ? gameState.inventory[entry.index] 
                : gameState.sellables?.[entry.index];
            if (actualItem) count += (actualItem.qty || 1);
        });

        const randMinMax = getDailyRandomFraction(group.name);
        const randVariance = getDailyRandomFraction(group.name + 'var');

        let basePrice = 0;
        if (group.stat) basePrice = Math.floor((shopItems.find(s => s.name === group.name)?.cost || 100) * 0.7);
        else if (group.type === 'potion') basePrice = Math.floor((shopItems.find(s => s.name === group.name)?.cost || 30) * 0.5);
        else if (group.type === 'consumable') basePrice = Math.floor((group.buff?.bonus || 100) * 5);
        else if (group.minPrice !== undefined && group.maxPrice !== undefined) {
            basePrice = Math.floor(group.minPrice + randMinMax * (group.maxPrice - group.minPrice + 1));
            console.log(group.name+basePrice);
        } else {
            basePrice = 5;
            
            
        }

        const variance = Math.floor(basePrice * 0.4);
        const singlePrice = Math.max(5, basePrice + Math.floor(randVariance * (variance * 2 + 1) - variance));
        const totalPrice = singlePrice * count;

        html += `<li class="shop-item">`;
        html += `<strong>${group.name}</strong>`;

        // 装備ボーナス表示（翻訳対応）
        if (group.stat) {
            const statText = t(`stat_${group.stat}`);
            html += ` <span class="bonus">(${t('sell_equip_bonus', {bonus: group.bonus, stat: statText})})</span>`;
        }

        // ポーション効果表示（翻訳対応）
        if (group.type === 'potion') {
            const restoreText = t(`potion_${group.restore}`);
            html += ` <span class="bonus">(${restoreText} +${group.amount})</span>`;
        }

        // 価格・数量表示（翻訳対応）
        html += ` <em>${t('sell_quantity', {count})}</em> - ${t('sell_price_each', {price: singlePrice, unit: t('gold_unit')})} (${t('sell_price_total', {total: totalPrice, unit: t('gold_unit')})})`;

        // 売却ボタン（翻訳対応）
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
    better_alert(`${name} を ${amount}個 売却しました！ +${totalGold}g`,"success");

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
        const stats=`Lv ${adv.level} | <img src="Images/STR.png" class="stat-icon" title="筋力"> 筋力 ${effStr} (${baseStr}+${equipStr}) <img src="Images/WIS.png" class="stat-icon" title="知恵"> 知恵 ${effWis} (${baseWis}+${equipWis}) <img src="Images/DEX.png" class="stat-icon" title="敏捷"> 敏捷 ${effDex} (${baseDex}+${equipDex}) <img src="Images/LUC.png" class="stat-icon" title="運"> 運 ${effLuk} (${baseLuk}+${equipLuk})`;
        const expNeeded = adv.level * 100;
        const expPct = Math.min(100, (adv.exp / expNeeded) * 100);
        const img=`<img src="Images/${adv.image}" class="adventurer-img" alt="${adv.name}">`;
        const nameHtml = getNameHtml(adv);
        const btnHtml = full ? '<button disabled>ギルド満杯</button>' : `<button onclick="recruit(${i})">募集する</button>`;
        html+=`<div class="adventurer-card" draggable="true" data-adv-id="${adv.id}">
            ${img}${nameHtml}<br><small class="stats">${stats}</small><br>
            <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div> 経験値 ${adv.exp}/${expNeeded}<br>
            コスト: ${adv.recruitingCost}g ${btnHtml}
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
        const stats=`Lv ${adv.level} | <img src="Images/STR.png" class="stat-icon" title="筋力"> 筋力 ${effStr} (${baseStr}+${equipStr}) <img src="Images/WIS.png" class="stat-icon" title="知恵"> 知恵 ${effWis} (${baseWis}+${equipWis}) <img src="Images/DEX.png" class="stat-icon" title="敏捷"> 敏捷 ${effDex} (${baseDex}+${equipDex}) <img src="Images/LUC.png" class="stat-icon" title="運"> 運 ${effLuk} (${baseLuk}+${equipLuk})`;
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
        const cost=adv.temp?`雇用: ${adv.hiringCost}g`:'恒久的';
        html+=`<div class="adventurer-card" draggable="true" data-adv-id="${adv.id}">
            ${img}${nameHtml}<br>
            <small class="stats">${stats}</small><br>
            <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div> 経験値 ${adv.exp}/${expNeeded}<br>
            <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div> HP ${hpDisplay}/${maxHpDisplay}<br>
            <div class="progress-bar"><div class="progress-fill mp-fill" style="width:${mpPct}%"></div></div> MP ${mpDisplay}/${maxMpDisplay}<br>
            ${cost}
        </div>`;
    });
    if(!avail.length) html+='<p>今日利用可能な冒険者なし。</p>';
    return html;
}


function calcTradeRequiredDays(avgDex, avgLuc) {
    const avgStat = (avgDex + avgLuc) / 2;
    return Math.max(1, Math.ceil(80 / avgStat));
}

function updateDay(){
    const current_week = Math.floor((gameState.day - 1) / 7);
    const next_tax_day = (current_week + 1) * 7;
    const daysUntilTax = next_tax_day - gameState.day;
    const estimatedTax = Math.floor(next_tax_day * 10);  // Fixed minor redundancy in original

    let taxDisplay;
    if (daysUntilTax === 0) {
        taxDisplay = `${t('tax_today_prefix')} ${estimatedTax}g`;
    } else {
        taxDisplay = t('tax_later_prefix', {days: daysUntilTax}) + ` ${estimatedTax}g`;
    }

    let status = '';
    if (gameState.gameOver) {
        status = ` | <span style="color:red; font-weight:bold;">${t('game_over_text')}</span>`;
    }

    const dayPart = t('day_format', {day: gameState.day});
    const goldPart = `${t('gold_label')} ${Math.floor(gameState.gold)}`;
    const repPart = `${t('reputation_label')} ${Math.max(0, gameState.reputation.toFixed(0))}`;

    document.getElementById('day').innerHTML = 
        `<h2>${dayPart} | ${goldPart} | ${repPart} | ${taxDisplay}${status}</h2>`;

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
    if (gameState.gameOver) {
        updateDisplays();
        return;
    }
    cleanupAdventurers();
    gameState.adventurers.forEach(a => {
        // 基本回復量（10%）
        let hpRegenPercent = 10; // 基本10% + バフによる追加パーセントポイント
        let mpRegenPercent = 10; // MPも同様に基本10% + バフ追加

        if (a.buffs && a.buffs.length > 0) {
            a.buffs.forEach(b => {
                if (b.type === 'hpRegen' && b.bonus) {
                    hpRegenPercent += b.bonus;  // bonus:5 → +5%追加
                } else if (b.type === 'mpRegen' && b.bonus) {
                    mpRegenPercent += b.bonus;  // bonus:5 → MP回復に+5%追加
                }
            });
        }

        // 合計回復量（パーセント計算後、切り捨て）
        const totalHpRegen = Math.floor(a.maxHp * hpRegenPercent / 100);
        const totalMpRegen = Math.floor(a.maxMp * mpRegenPercent / 100);
        // 恒久冒険者かつクエスト中でない場合のみ日次回復適用
        if (!a.temp && !a.busy) {
            a.hp = Math.min(a.maxHp, (a.hp || 0) + totalHpRegen);
            a.mp = Math.min(a.maxMp, (a.mp || 0) + totalMpRegen);
        }

        // バフ効果適用後に持続日数を減少させ、終了したバフを削除
        // （バフ適用日を含めて正確に指定日数持続）
        if (a.buffs) {
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
    if (availableSlots > 0) {
        let nq = Math.min(Math.floor(Math.random() * 3) + 1, availableSlots);
        for(let i=0; i<nq; i++){
            let q=generateQuest(); 
            gameState.quests.push(q);
        }
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

function processQuestOutcome(q, eventDay, success, lowStatusFail, goldOverride = null) {
// processQuestOutcome() 内の貿易専用ブランチを以下に更新
if (q.type === 8 || q.type === 'trade') {
    // 貿易クエストの完了判定：tradeRemainingDaysが0以下なら成功、それ以外は失敗
    if (q.tradeRemainingDays > 0) {
        // === 失敗処理 ===
        const repLoss = 15 + Math.floor(q.difficulty * 0.3); // 規模に応じたペナルティ
        gameState.reputation -= repLoss;

        // 割り当て冒険者のbusy解放（帰還）
        q.assigned.forEach(id => {
            const adv = findAdv(id);
            if (adv) adv.busy = false;
        });

        // 失敗メッセージ（失敗スクロールレイアウトに準拠）
        const failMessage = `
        <div class="quest-scroll quest-scroll-fail">
            <div class="scroll-content">
                <br><br>
                <div style="text-align: center;">
                    <div style="font-size: 20px; color: darkred; margin-bottom: 40px;">貿易クエスト失敗！</div>
                    <div style="font-size: 15px; color: darkred;">
                        評判 -${repLoss}
                    </div>
                    <div style="font-size: 12px; margin: 40px 0; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%;">
                        ${q.desc}<br><br>
                        貿易キャラバンが期限内に目的地に到達できませんでした。<br>
                        冒険者の割り当てが不足または遅れたため、計画は失敗しました。<br>
                        事前に支払った購入コストは失われました。
                    </div>
                </div>
            </div>
        </div>`;

        gameState.eventHistory.unshift({day: eventDay, message: failMessage});

        return; // 処理終了
    }

    // === 成功処理（tradeRemainingDays <= 0 の場合） ===
// 貿易クエスト完了時の素材追加処理を修正（playDay() またはクエスト完了ハンドラ内の該当部分）
if (q.buy) {
    // 素材店・錬金レシピ（ja）と完全に一致させる固定名（日本語ハードコード名）
    const fixedResourceNames = ["鉄鉱石", "薬草", "スパイス", "宝石"];

    resources.forEach((currentDisplayedName, index) => {
        const qty = q.buy[currentDisplayedName] || 0;  // 投稿時の表示名でqtyを取得（言語同じなら必ずヒット）
        if (qty > 0) {
            const fixedName = fixedResourceNames[index];

            // 固定名でアイテムを探す（素材店購入分と完全に統合）
            let item = gameState.inventory.find(it => it.name === fixedName && it.type === 'material');
            if (!item) {
                item = { name: fixedName, qty: 0, type: 'material' };
                gameState.inventory.push(item);
            }
            item.qty += qty;

            // オプション: もし古い表示名で別アイテムが存在していたらマージ（言語変更ケース対策）
            const oldItem = gameState.inventory.find(it => it.name === currentDisplayedName && it.type === 'material' && it !== item);
            if (oldItem) {
                item.qty += oldItem.qty;
                gameState.inventory = gameState.inventory.filter(it => it !== oldItem);  // 古い方を削除
            }
        }
    });
}

    // 売却収益を加算
    gameState.gold += q.reward;

    // 割り当て冒険者にEXP付与・レベルアップ・busy解放
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

    // 評判ボーナス
    const repGain = q.difficulty * 0.5;
    gameState.reputation += repGain;

    // 追加アイテムHTML（購入素材）
    let additionalItemHTML = '';
    if (q.buy) {
        const boughtItems = Object.keys(q.buy).filter(r => q.buy[r] > 0);
        if (boughtItems.length > 0) {
            additionalItemHTML = `<div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">購入素材: ${boughtItems.map(r => `${r} ×${q.buy[r]}`).join(', ')}</div>`;
        }
    }

    // extraMsg
    let extraMsg = `所要日数: ${q.totalDaysRecorded || '複数'} 日（確定成功）`;

    // leftHTML
    let leftHTML = `
        <div style="text-align: center;">
            <div style="font-size: 15px; margin-bottom: 40px;">評判 +${repGain.toFixed(1)}</div>
            <div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">
                +${q.reward} ゴールド（売却収益）
            </div>
            ${additionalItemHTML}          
        </div>`;

    // rightHTML
    let rightHTML = survivingAdvs.length > 0 ? `
        <div style="text-align: center;">
            <div style="font-size: 12px; margin-bottom: 0px; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">${q.desc}</div>
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0px;">
                ${survivingAdvs.map(adv => `
                <div style="text-align: center;">
                    <img class="adventurer-img" src="Images/${adv.image}" alt="${adv.name}">
                    <div style="margin-top: 10px; font-size: 15px;">${adv.name}</div>
                    <div style="font-size: 15px; font-weight: bold; color: #2e5c2e;">+${expGain} Exp</div>
                </div>
                `).join('')}
            </div>
            <div style="font-size: 12px; font-weight: bold; margin: 20px 0; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">
                ${extraMsg}
            </div>                                
        </div>` : `
        <div style="font-size: 50px; color: darkred;">誰も帰還しませんでした…</div>`;

    // Unified success layout
    let messageHTML = `
    <div class="quest-scroll quest-scroll-success">
        <div class="scroll-content">
            <br><br>
            <div style="display: flex; justify-content: center; align-items: flex-start; gap: 0px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;">
                ${rightHTML}
                ${leftHTML}
            </div>
        </div>
    </div>`;

    gameState.eventHistory.unshift({day: eventDay, message: messageHTML});

    return;
}
    if (q.training) {
        if (q.assigned.length === 0) return;
        let assignedAdvs = q.assigned.map(id => findAdv(id)).filter(a => a);
        if (assignedAdvs.length === 0) { q.assigned = []; return; }
        let levels = assignedAdvs.map(a => a.level || 1);
        let maxLv = Math.max(...levels);
        let expGains = {};
        let lowLevelBonus = false;
        assignedAdvs.forEach(adv => {
            let expGain = q.difficulty * 20;
            if (assignedAdvs.length > 1 && adv.level < maxLv) {
                expGain = maxLv * 20;
                lowLevelBonus = true;
            }
            expGains[adv.id] = expGain;
            adv.exp += expGain;
            levelUp(adv);
            adv.busy = false;
        });
        q.assigned = [];

        let trainingMessage = `
        <div class="quest-scroll quest-scroll-success">
            <div class="scroll-content">
                <div style="text-align: center; width: 100%; margin-bottom: 20px;">
                    <h2 style="font-size: 36px; margin: 0;">トレーニング完了</h2>
                </div>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 60px;">
                    ${assignedAdvs.map(adv => `
                    <div style="text-align: center;">
                        <img class="adventurer-img" src="Images/${adv.image}" alt="${adv.name}">
                        <div style="margin-top: 20px; font-size: 15px;">${adv.name}</div>
                        <div style="font-size: 15px; font-weight: bold; color: #2e5c2e;">+${expGains[adv.id]} Exp</div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>`;

        gameState.eventHistory.unshift({day: eventDay, message: trainingMessage});
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
            adventurer.exp += difficulty * 20;
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
            let deathMsg = `${adventurer.name} が "${q.desc}" で${isPerm ? '死亡しました' : '失われました'}！${isPerm ? ' 評判 -10。' : ''}`;
            better_alert(deathMsg,"death");
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

    if (success) {
        let payout = permanentCount * 0.1 * q.reward;
        let rewardGold = q.reward;
        if (goldOverride !== null) {
            rewardGold = goldOverride;
            payout = permanentCount * 0.1 * goldOverride;
        }
        let netGold = rewardGold - payout;
        gameState.gold += netGold;

        let repGain = q.difficulty * 0.5;
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
                addToInventory({
                    name: 'EXPオーブ (小)',
                    type: 'consumable',
                    effect: 'level_up',
                    amount: 1,
                    id: gameState.nextId++
                }, 1);
            }

            extraMsg += `<br><strong>Reputation Bonus:</strong> ${orbQty} × EXPオーブ (小)${orbQty > 1 ? 's' : ''} を獲得!`;
        }
        if (q.type === 6) {
            gameState.mainProgress++;
            gameState.reputation += 30;
            extraMsg += `<br><strong>ストーリーが進行しました！</strong> 次のメインクエストがギルドクエストメニューで確認できるようになりました。`;
        } else if (q.type === 7) {
    let treasureGold = q.floor * 300;
    gameState.gold += treasureGold;
    extraMsg += `<br>${t('dungeon_treasure_gold', {floor: q.floor, gold: treasureGold})}`;
    
    let roll = Math.random();
    
    if (roll < 0.9) { // 90% chance - high chance for enhancement crystals
        let crystalQty = 2 + Math.floor(q.floor / 2);
        let crystalName = t('enhancement_crystal');
        addToInventory(
            {name: crystalName, id: gameState.nextId++, consumable: true}, // consumable: true を追加（鍛冶屋で消費するため）
            crystalQty
        );
        let crystalMsg = crystalQty > 1 
            ? t('item_found_qty', {name: crystalName, qty: crystalQty})
            : t('item_found', {name: crystalName});
        extraMsg += `<br>${crystalMsg}`;
    } else { // 10% chance - low chance for the original rare ring
        let rareStat = ['strength','wisdom','dexterity','luck'][Math.floor(Math.random()*4)];
        let rareStatFull = t(`stat_${rareStat}`);
        let rareBonus = 5 + q.floor * 5;
        let rareItemName = t('dungeon_ring', {floor: q.floor, stat: rareStatFull});
        addToInventory(
            {name: rareItemName, stat: rareStat, bonus: rareBonus, enhancement: 0, id: gameState.nextId++},
            1
        );
        extraMsg += `<br>${t('item_found', {name: rareItemName})}${t('rare_indicator')}`;
    }

        }else // === 貿易クエスト完了処理（日終了時のクエスト完了ループ内に追加） ===
 if (q.type === 2) {
            const repChance = Math.min(0.8, 0.15 + q.difficulty * 0.0065);
            if (Math.random() < repChance) {
                const extraRep = q.difficulty * 0.6;
                gameState.reputation += extraRep;
                extraMsg += `<br>感謝のクライアントが言葉を広め、+${extraRep.toFixed(1)} 評判！`;
            }
        }
        if (q.type === 1) {
            if (Math.random() < 1 && q.npcIdx !== null && !gameState.discoveredNPCs.includes(q.npcIdx)) {
                gameState.discoveredNPCs.push(q.npcIdx);
                const npcName = discoveryNPCs[q.npcIdx];
                extraMsg += `<br>${npcName}を発見！ NPCでサイドクエストを確認。`;
            }
        }
        if (q.side) {
            const expOrb = {
                name: 'EXPオーブ',
                type: 'consumable',
                effect: 'level_up',
                amount: 10,
                id: gameState.nextId++
            };
            addToInventory(expOrb, 1);
            extraMsg += `<br>EXPオーブを受け取りました！（使用で冒険者のレベル+10）`;
        }
        if (q.type === 3 && q.item) {
            const quantity = Math.floor(Math.random() * 5) + 1;
            for (let k = 0; k < quantity; k++) {
                addToInventory({...q.item, id: gameState.nextId++}, 1);
            }
            additionalItemHTML = `<div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">+${quantity} ${q.item.name}</div>`;
        }
        if (q.type === 0 && Math.random() < 0.8) {
            const numPerms = gameState.adventurers.filter(a => !a.temp).length;
            if (numPerms >= gameState.maxPermanentSlots) {
                extraMsg += `<br>感銘を受けた冒険者が加わりたがったが、ギルドは満杯です。`;
            } else {
                const newAdv = generateKillRecruit(q.difficulty);
                gameState.adventurers.push(newAdv);
                extraMsg += `<br>感銘を受けた冒険者${newAdv.name}があなたのギルドに加わることを決めました！`;
            }
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
            }
        }

        // Unified layout for success
        let leftHTML = `
            <div style="text-align: center;">
                <div style="font-size: 15px; margin-bottom: 40px;">評判 +${repGain.toFixed(1)}</div>
                <div style="font-size: 15px; font-weight: bold; margin-bottom: 20px;">
                    +${netGold.toFixed(0)} ゴールド${payout > 0 ? ` <br><span style="font-size: 10px;">[${payout.toFixed(0)} ゴールドは冒険者に分けた]</span>` : ''}
                </div>
                ${additionalItemHTML}          
            </div>`;

        let rightHTML = survivingAdvs.length > 0 ? `
            <div style="text-align: center;">
                <div style="font-size: 12px; margin-bottom: 0px; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">${q.desc}</div>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0px;">
                    ${survivingAdvs.map(adv => `
                    <div style="text-align: center;">
                        <img class = "adventurer-img"; src="Images/${adv.image}" alt="${adv.name}">
                        <div style="margin-top: 10px; font-size: 15px;">${adv.name}</div>
                        <div style="font-size: 15px; font-weight: bold; color: #2e5c2e;">+${difficulty * 20} Exp</div>
                    </div>
                    `).join('')}
                </div>
                <div style="font-size: 12px; font-weight: bold; margin: 20px 0; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">
                    ${extraMsg.replace(/<br>/g, '<br>')}
                </div>                                
            </div>` : `
            <div style="font-size: 50px; color: darkred;">誰も帰還しませんでした…</div>`;

        let messageHTML = `
        <div class="quest-scroll quest-scroll-success">
            <div class="scroll-content">
                <br><br>
                <div style="display: flex; justify-content: center; align-items: flex-start; gap: 0px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;">
                    ${rightHTML}
                    ${leftHTML}
                </div>
    
            </div>
        </div>`;

        gameState.eventHistory.unshift({day: eventDay, message: messageHTML});

    } else {
        const repLoss = q.difficulty * 2;
        gameState.reputation -= repLoss;

        let leftHTML = `
            <div style="text-align: center;">
                <div style="font-size: 20px; color: darkred; margin-bottom: 40px;">失敗！</div>
                <div style="font-size: 15px; color: darkred;">評判 -${repLoss}</div>
            </div>`;

        let rightHTML = survivingAdvs.length > 0 ? `
            <div style="text-align: center;">
                <div style="font-size: 12px; margin-bottom: 0px; word-break: break-word; overflow-wrap: anywhere; white-space: pre-line; max-width: 100%; width: 100%; line-height: 1.6; box-sizing: border-box;">${q.desc}</div>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0px;">
                    ${survivingAdvs.map(adv => `
                    <div style="text-align: center; opacity: 0.7;">
                        <img class = "adventurer-img"; src="Images/${adv.image}" alt="${adv.name}" >
                        <div style="margin-top: 10px; font-size: 15px;">${adv.name}</div>
                    </div>
                    `).join('')}
                </div>
            </div>` : `
            <div style="font-size: 20px; color: darkred;">誰も帰還しませんでした…</div>`;

        let messageHTML = `
        <div class="quest-scroll quest-scroll-fail">
            <div class="scroll-content">
                <br><br>
                <div style="display: flex; justify-content: center; align-items: flex-start; gap: 0px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;">
                    ${rightHTML}
                    ${leftHTML}
                </div>
            </div>
        </div>`;

        gameState.eventHistory.unshift({day: eventDay, message: messageHTML});
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

function playDay(){
    if (gameState.gameOver) return;

    // ===== 防衛クエスト未割り当て警告（防衛のみ） =====
    const defenseQuest = gameState.quests.find(q => q.defense);
    if (defenseQuest && defenseQuest.assigned.length === 0) {
        const confirmMessage = 
`${defenseQuest.desc}

警告：防衛クエストに誰も割り当てられていません！

このまま日を進めるとギルドが襲撃され、誰も防衛しないため即座にゲームオーバーになります。

本当に日を進めますか？（キャンセルで日進めを中止できます）`;

        if (!confirm(confirmMessage)) {
            return;
        }
    }
    // ===== 追加終わり =====

    const evDay = gameState.day; 
    gameState.day++;

    if (evDay % 7 === 0) {
        const tax = Math.floor((gameState.day-1) * 10);
        gameState.gold -= tax;
        better_alert(`税金の日！${tax}G を徴収。`,"warning");
        checkGameOver();
    }

    // playDay() の通常クエスト処理ループを以下に更新（貿易を特殊扱い）
    for (let i = gameState.quests.length - 1; i >= 0; i--) {
        const q = gameState.quests[i];
        if (q.defense || q.type === 7) continue;  // 戦闘クエストは後で特殊処理（貿易はここで処理）

        if (q.type === 8 || q.type === 'trade') {
            // === 貿易クエスト専用進行 ===
            if (q.assigned.length > 0) {
                if (!q.inProgress) {
                    q.inProgress = true;
                }
                q.tradeRemainingDays--; // 毎日減少
                console.log("tradeRemainingDays redeuced to: "+q.tradeRemainingDays);
                console.log("daysleft: "+ q.daysLeft);

                if (q.tradeRemainingDays <= 0) {
                    // 完了時のみ processQuestOutcome を呼び出し（success=true）
                    processQuestOutcome(q, evDay, true, false);
                    gameState.quests.splice(i, 1);
                }
                // 未完了の場合は進行中（busy は維持、EXP/ダメージなし）
            } else {
                // 割り当て0人の場合は進行停止（残り日数減少なし）
                q.inProgress = false; // 表示用にリセット（任意）
            }
            continue; // 通常処理スキップ
        }

        // === 通常クエスト処理（変更なし） ===
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
            const prob = Math.min(0.5, 0.1 + Math.max(0, excess) * 0.2);
            let successToday = Math.random() < prob;
            if (q.training && q.assigned.length > 0) {
                successToday = true;
            }
            if (successToday) {
                processQuestOutcome(q, evDay, true, false);
                if (!q.training) {
                    gameState.quests.splice(i, 1);
                }
            } else {
                if (!q.training) {
                    q.inProgress = true;
                }
            }
        }
    }

        // === 日終了処理（playDay() 内の日終了時に呼び出し） ===
    updateDailyPrices(); // 既存の日終了処理の最初か最後に追加
    // 期限切れ処理（戦闘クエスト除外）
    gameState.quests.forEach(q => {
        if (!q.training && !q.playerPosted && q.type !== 8 && !q.defense && q.type !== 7) q.daysLeft--;
    });
    for (let i = gameState.quests.length - 1; i >= 0; i--) {
        const q = gameState.quests[i];
        if (q.defense || q.training || q.playerPosted || q.type === 8 || q.type === 7) continue;
        if (q.daysLeft <= 0) {
            if (q.assigned.length > 0) {
                processQuestOutcome(q, evDay, false, false);
            } else {
                const penalty = 0.5 * q.difficulty;
                gameState.reputation -= penalty;
                better_alert(`無視されたクエスト "${q.desc}" が期限切れ。評判 -${penalty}。`,"error");
            }
            gameState.quests.splice(i, 1);
        }
    }

    // ===== 戦闘クエスト特殊処理 =====
    // まず割り当てなしの戦闘クエストを処理（防衛のみゲームオーバー）
    const unassignedDefense = gameState.quests.find(q => q.defense && q.assigned.length === 0);
    if (unassignedDefense) {
        better_alert(`防衛クエスト失敗！誰も割り当てられず、ギルドは崩壊。ゲームオーバー！`,"error");
        gameState.gameOver = true;
        showModal(evDay);
        updateDisplays();
        return;
    }

    const unassignedDungeon = gameState.quests.filter(q => q.type === 7 && q.assigned.length === 0);
    unassignedDungeon.forEach(q => {
        processQuestOutcome(q, evDay, false, false);
        gameState.quests = gameState.quests.filter(quest => quest !== q);
    });

    // 次に割り当てありの戦闘クエストを処理
    let assignedBattleQuests = gameState.quests.filter(q => (q.defense || q.type === 7) && q.assigned.length > 0);

    if (assignedBattleQuests.length > 0) {
        // クエストリストから戦闘クエストを一時削除
        gameState.quests = gameState.quests.filter(q => !(q.defense || q.type === 7));

        // 防衛を最優先にソート
        assignedBattleQuests.sort((a, b) => (b.defense ? 1 : 0) - (a.defense ? 1 : 0));

        // 残りをpendingキューに保存
        gameState.pendingBattles = assignedBattleQuests.slice(1);

        const currentQ = assignedBattleQuests[0];

        // 戦闘開始
        if (currentQ.defense) {
            generateEnemies(currentQ);
        } else {
            generateDungeonEnemies(currentQ);
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

        const titleText = currentQ.defense ? `防衛戦: ${currentQ.desc}` : `ダンジョン${currentQ.floor}階探索`;
        CurrentQuestType = currentQ.defense ? 'defense' : 'dungeon';
        console.log(CurrentQuestType);
        document.getElementById('battleTitle').innerHTML = titleText;
        document.getElementById('battleModal').style.display = 'flex';
        renderBattle();
        if (CurrentQuestType="dungeon"){
            renderBattlebgm(CurrentQuestType,currentQ.floor);
        }
        else{
           renderBattlebgm(CurrentQuestType); 
        }
        return; // 戦闘中は日処理中断
    }

    // 戦闘クエストがなければ通常終了
    checkGameOver();
    showModal(evDay);
}

function renderBattlebgm(QuestType,floor=0){
        if (QuestType="dungeon"){
            if(floor>=3){
        crossfadeTo('battleBgm2', 1500);
            }else{
                crossfadeTo('battleBgm', 1500);
            }
        }else{
        crossfadeTo('battleBgm', 1500);
        }

}


function renderBattle() {
    if (!currentBattle) return;

    // 戦闘タイプに応じてモーダルの背景画像を動的に変更
    const modalContent = document.querySelector('#battleModal');
    if (modalContent) {
        const backgrounds = {
            defense: 'Images/Street.jpg',                    // デフォルト（通常戦闘）
            dungeon: 'Images/DungeonQuest_Background.jpg',    // ダンジョン戦闘用（パスは適宜調整）
            // 必要に応じて追加してください
        };
        console.log(CurrentQuestType);
        const bgUrl = backgrounds[CurrentQuestType] || backgrounds.normal;
        modalContent.style.backgroundImage = `url('${bgUrl}')`;
        // CSSで既に設定されている場合も上書きされるようinline styleで指定
        modalContent.style.backgroundSize = 'cover';
        modalContent.style.backgroundPosition = 'center';
        modalContent.style.backgroundRepeat = 'no-repeat';
    }

    // Initialize defaults if missing
    if (!currentBattle.log) currentBattle.log = [];
    if (!currentBattle.round) currentBattle.round = 1;
    if (!currentBattle.phase) currentBattle.phase = 'setup';

    let topHtml = '<div class="battle-top"><div id="battleLog">';
    currentBattle.log.forEach(log => topHtml += '<p>' + log + '</p>');
    topHtml += '</div>';

    // Add Round Start button during setup, or Next/Skip during execution
    if (currentBattle.phase === 'setup') {
        topHtml += '<button onclick="startRound()">ラウンド開始</button>';
    } else if (currentBattle.currentActor) {
        const buttonText = currentBattle.currentActor.isEnemy ? '次へ' : '行動をスキップ';
        topHtml += `<button onclick="skipTurn()">${buttonText}</button>`;
    }
    topHtml += '</div>';

    let enemiesHtml = '<div class="battle-section"><div class="battle-enemies">';
    currentBattle.enemies.filter(e => e.hp > 0).forEach(e => {
        const hpPct = (e.hp / e.maxHp) * 100;
        const apPct = ((e.currentAp || 0) / 5) * 100;
        const selectableClass = currentBattle.selecting && currentBattle.selecting.mode === 'enemy' ? 'selectable-target' : '';
        const isCurrent = currentBattle.currentActor && currentBattle.currentActor.id === e.id;
        const highlightClass = isCurrent ? 'current-enemy' : '';
        enemiesHtml += `
            <div class="battle-enemy ${selectableClass} ${highlightClass}" id="div_${e.id}" data-id="${e.id}" ${selectableClass ? `onclick="selectTarget('${e.id}')"` : ''}>
                <img src="${e.image}" class="enemy-img" alt="${e.name}">
                ${e.name}
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                HP ${Math.floor(e.hp)}/${e.maxHp}
                <div class="progress-bar"><div class="progress-fill ap-fill" style="width:${apPct}%"></div></div>
                AP ${e.currentAp || 0}/5
            </div>
        `;
    });
    enemiesHtml += '</div></div>';

    let teamHtml = '<div class="battle-section"><div class="battle-team">';
    currentBattle.team.filter(adv => adv.hp > 0).forEach(adv => {
        const hpPct = (adv.hp / adv.maxHp) * 100;
        const apPct = ((adv.currentAp || 0) / 5) * 100;
        const isCurrent = currentBattle.currentActor && currentBattle.currentActor.id === adv.id;
        const highlightClass = isCurrent ? 'current-actor' : '';
        const selectableClass = currentBattle.selecting && currentBattle.selecting.mode === 'ally' ? 'selectable-target' : '';
        let actionHtml = '';
        if (isCurrent && !adv.isEnemy && currentBattle.phase === 'executing') {
            actionHtml = getActionButtonsHtml(adv);
        }
        const baseEv = Math.floor(getEffectiveStat(adv, 'luck') / 10);
        const evasion = Math.min(80, baseEv + (adv.activeEvadeBonus ? 15 : 0));
        teamHtml += `
            <div class="battle-ally ${selectableClass} ${highlightClass}" id="div_${adv.id}" data-id="${adv.id}" ${selectableClass ? `onclick="selectTarget('${adv.id}')"` : ''}>
                <img src="Images/${adv.image}" class="adventurer-img" alt="${adv.name}">
                ${getNameHtml(adv)}
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                HP ${Math.floor(adv.hp)}/${adv.maxHp}
                <div class="progress-bar"><div class="progress-fill ap-fill" style="width:${apPct}%"></div></div>
                AP ${adv.currentAp || 0}/5
                <div class="battle-stats">
                        Crit: ${adv.critChance}%<br>
                        Evade: ${evasion}%
                    </div>
                ${actionHtml ? `<div class="ally-actions">${actionHtml}</div>` : ''}
            </div>
        `;
    });
    teamHtml += '</div></div>';

    document.getElementById('battleContent').innerHTML = topHtml + enemiesHtml + teamHtml;
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

    // Determine character type and gender for sound selection
    const charType = getCharType(actor);
    const sex = actor.sex || (function() {
        if (actor.name === 'カイト') {
                return 'M';
            }
            if (actor.name === 'ルナ') {
                return 'F';
            }        
        // 名前リストで判定（男名優先 → 女名 → フォールバック）
        if (actor.gender === 'male') {
                return 'M';
            }
            if (actor.gender === 'female') {
                return 'F';
            }
            // Rare fallback for very old saves without gender fiel
   
        // 画像ファイル名で明示的に性別がわかる場合（両方の表記形式に対応）
        const imgLower = (actor.image || '').toLowerCase();
        if (imgLower.includes('(f)') || imgLower.includes('_f')) {
            return 'F';
        }
        if (imgLower.includes('(m)') || imgLower.includes('_m')) {
            return 'M';
        }

        // デフォルト（モンスターなど性別不明の場合）
        return 'N';
    })();

    // Play sound based on action and gender/type
    let soundToPlay = null;

    switch (action.type) {
        case 'defense':
            actor.activeDefense = true;
            log += '! (25% damage reduction until next turn)';
            // モンスター（sex === 'N'）は防御ボイスを再生しない
            if (sex === 'F') {
                soundToPlay = defenseFSound;
            } else if (sex === 'M') {
                soundToPlay = defenseMSound;
            }
            break;
        case 'counter':
            actor.activeCounter = true;
            log += '! (ready to counter)';
            // モンスター（sex === 'N'）はカウンターボイスを再生しない
            if (sex === 'F') {
                soundToPlay = counterFSound;
            } else if (sex === 'M') {
                soundToPlay = counterMSound;
            }
            break;
        case 'evade':
            actor.activeEvadeBonus = true;
            log += '! (+15% evasion until next turn)';
            soundToPlay = lucEvadeSound;
            break;
        case 'protect':
            currentBattle.protectRounds = 2;
            log += '! (team 50% damage reduction for 2 rounds)';
            soundToPlay = strProtectSound;
            break;
        case 'blessing':
            if (action.target) {
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
            currentBattle.enemies.filter(e => e.hp > 0).forEach(e => {
                const infos = calculateAndApplyDamage(actor, e, { basePercent: 150, isWis: true, isAoE: true });
                popupInfos.push(...infos);
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

    // Add all collected damage popups (use setTimeout 0 to queue after current renders)
    setTimeout(() => {
        popupInfos.forEach(info => {
            const div = document.getElementById(`div_${info.targetId}`);
            if (div) {
                showDamagePopup(div, info.dmg, info.miss, info.crit);
            }
        });
    }, 0);

    // Delay turn advance only if there were popups (to let animation finish)
    // 900ms = 800ms popup duration + small buffer
    const delay = popupInfos.length > 0 ? 1000 : 0;

    setTimeout(() => {
        nextTurn();
    }, delay);
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
        currentBattle.protectRounds = Math.max(0, currentBattle.protectRounds - 1);
        updateAliveCombatants();

        if (checkBattleEnd()) return;

        currentBattle.round++;
        currentBattle.log = [];
        addBattleLog(`--- Round ${currentBattle.round} starts ---`);
        roundStartPopup();  // <-- Add this line here
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
        } // dead are skipped silently

        currentBattle.currentActorIndex++;

        if (currentBattle.currentActorIndex >= currentBattle.combatants.length) {
            // All remaining actors this round were invalid → advance round early
            currentBattle.protectRounds = Math.max(0, currentBattle.protectRounds - 1);
            updateAliveCombatants();

            if (checkBattleEnd()) return;

            currentBattle.round++;
            currentBattle.log = [];
            addBattleLog(`--- Round ${currentBattle.round} starts ---`);

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

    // Clear temporary buffs/debuffs
    actor.activeDefense = false;
    actor.activeCounter = false;
    actor.activeEvadeBonus = false;

    currentBattle.currentActor = actor;

    if (actor.isEnemy) {
        renderBattle(); // Shows "次へ" button
    } else {
        currentBattle.selecting = null;
        renderBattle(); // Shows action buttons
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
        return true;
    }
    if (aliveEnemies === 0) {
        endBattle(true);
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
                    better_alert(`${battleAdv.name} が戦闘で死亡しました！ 評判 -10。`,"death");
                    
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
            gameState.eventHistory.unshift({ 
                day: day, 
                message: '防衛戦失敗！ギルドは崩壊しました。ゲームオーバー！' 
            });
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


function getFacilitiesContent() {
    let html = '';
    const names = {blacksmith: '鍛冶屋', tavern: '酒場', alchemy: '錬金工房'};
    for (let f in gameState.facilities) {
        let level = gameState.facilities[f];
        html += `<h3>${names[f]} レベル ${level}</h3>`;
        if (level < 4) {
            const nextCost = {blacksmith: [1500,4000,8000,15000], tavern: [1200,3500,7000,13000], alchemy: [2000,5000,10000,18000]};
            const cost = nextCost[f][level];
            if (cost > 0) html += `<button onclick="upgradeFacility('${f}')">アップグレード (${cost}g)</button><br><br>`;
        }
        if (level > 0) {
            if (f === 'alchemy') {
                html += `
                        <div class="facility-section">
                            <h3>錬金術 Lv${gameState.facilities.alchemy}</h3>
                            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                                <select id="alchemyIng1" onchange="updateAlchemyPreview()" style="flex: 1; min-width: 140px; padding: 5px;"></select>
                                <select id="alchemyIng2" onchange="updateAlchemyPreview()" style="flex: 1; min-width: 140px; padding: 5px;"></select>
                                <input type="number" id="alchemyQty" value="1" min="1" max="999" onchange="updateAlchemyPreview()" style="width: 80px; padding: 5px;">
                                <button onclick="performAlchemy()" style="padding: 8px 16px; background: #27ae60;">作成</button>
                            </div>
                            <div id="alchemyPreview" style="margin-top: 10px; padding: 12px; background: #e8f5e8; border-radius: 4px; border-left: 4px solid #27ae60; min-height: 60px;"></div>
                        </div>
                    `;
            } else {
                const recipes = f === 'blacksmith' ? currentBlacksmithRecipes : currentTavernRecipes;
                html += `<h4>${names[f]} 生産</h4><ul>`;
                recipes.forEach((r, j) => {
                    if (r.level > level) return;
                    let canMake = gameState.gold >= r.cost;
                    let matStr = '';
                    if (r.materials && r.materials.length > 0) {
                        r.materials.forEach(m => {
                            let have = gameState.inventory.filter(it => it.name === m.name).length;
                            matStr += `${m.name} x${m.qty} (保有${have}) `;
                            if (have < m.qty) canMake = false;
                        });
                    }
                    html += `<li>${r.name} - ${r.cost}g ${matStr}
                             <button onclick="produce('${f}', ${j})" ${canMake ? '' : 'disabled'}>生産</button></li>`;
                });
                html += `</ul>`;
            }
        }
    }
    document.getElementById('facilitiesContent').innerHTML = html;
    // Add this block at the very end of toggleFacilities(), after the innerHTML is set
    if (document.getElementById('alchemyIng1')) {
        const optionsHtml = getAlchemyMaterialOptions();
        document.getElementById('alchemyIng1').innerHTML = optionsHtml;
        document.getElementById('alchemyIng2').innerHTML = optionsHtml;
        updateAlchemyPreview();  // Show preview immediately (will be empty until selections made)
}

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
                    <button class="back-btn" onclick="showMainSelection()">戻る</button>`;

    if (gameState.mainProgress >= mainQuests.length) {
        html += `<p><strong>すべてのメインクエストを完了しました！</strong><br>深淵の王ヴォルガスは倒され、世界に平和が戻った。おめでとう！</p>`;
    } else {
        let mq = mainQuests[gameState.mainProgress];
        const requiredRep = mq.repRequired || 0;
        const hasActiveMain = gameState.quests.some(q => q.type === 6);
        const canPost = gameState.reputation >= requiredRep && !hasActiveMain;

        html += `<h4>現在のストーリークエスト</h4>
                 <p>${mq.desc}</p>
                 <p>難易度 ${mq.difficulty} | 報酬 ${mq.reward}g</p>
                 <p>必要評判: ${requiredRep} （現在 ${gameState.reputation}）</p>`;

        if (hasActiveMain) {
            html += `<p style="color:orange;">既にメインクエストが進行中です。完了するまで次の投稿はできません。</p>`;
        } else if (gameState.reputation < requiredRep) {
            html += `<p style="color:red;">評判不足です。サイドクエストなどで評判を上げてください。</p>`;
        }

        if (canPost) {
            html += `<div class="form-buttons">
                        <button class="post-btn" onclick="postGuildQuest()">このメインクエストを投稿する</button>
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
                    <button class="back-btn" onclick="showMainSelection()">戻る</button>
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
        info += `アイテム: ${it.name}<br>価格範囲: ${it.minPrice}~${it.maxPrice}g`;
        let curr = gameState.dailyPrices[cityName] ? gameState.dailyPrices[cityName][it.name] : 'N/A';
        info += `<br>今日の価格: ${curr}g`;
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
        better_alert('ゴールドが不足しています',"error");
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
}
function applyTavernBuff(recipeIdx, advId) {
    const r = currentTavernRecipes[recipeIdx];
    const adv = findAdv(advId);
    if (!adv || adv.temp) return;

    // 消費
    gameState.gold -= r.cost;
    if (r.materials) {
        for (let m of r.materials) {
            removeItems(m.name, m.qty || 1);
        }
    }

    // バフ適用
    const buffCopy = JSON.parse(JSON.stringify(r.buff));
    buffCopy.daysLeft = buffCopy.days;
    adv.buffs.push(buffCopy);

    better_alert(`${adv.name} に ${r.name} を適用しました！（${buffCopy.days}日間有効）`,"success");
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

    const item = adv.equipment.find(i => i.id === numericItemId);
    console.log("The item is: " + (item ? item.name + ' (ID: ' + item.id + ')' : 'Not found (searched ID: ' + numericItemId + ')'));

    if (!item || !item.stat || typeof item.bonus !== 'number') {
        console.warn("Invalid item or item not enhanceable");
        better_alert("強化対象のアイテムが見つかりません。画面を更新してください。","error");
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
        better_alert('ゴールドが不足しています',"error");
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

    addToInventory({name: r.name, stat: r.stat, bonus: r.bonus});
    better_alert(`${r.name} を製作しました！`,"success");
    renderFacilities();
    if (typeof updateGold === 'function') updateGold();
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
                <div class="buttons" style="gap:30px; flex-wrap:wrap;">
                    <button onclick="selectFacility('blacksmith')" style="padding:40px 40px; font-size:1.4em; background:rgba(231,76,60,0.9);">
                        ${t('facilities_blacksmith')}
                    </button>
                    <button onclick="selectFacility('tavern')" style="padding:40px 40px; font-size:1.4em; background:rgba(52,152,219,0.9);">
                        ${t('facilities_tavern')}
                    </button>
                    <button onclick="selectFacility('alchemy')" style="padding:40px 40px; font-size:1.4em; background:rgba(46,204,113,0.9);">
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
        let html = `<div class="facility-panel">
            <h2>${t('facilities_level_title', {title, level})}</h2>
            <div style="text-align:center; margin:30px 0;">
                <button onclick="currentFacility=null; renderFacilities()" style="padding:14px 36px; background:#87878777; font-size:1em;">
                    ${t('facilities_back_to_street')}
                </button>
            </div>`;

        // アップグレード
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

        // === 鍛冶屋専用の装備強化セクションをここに移動（アップグレード直後・合成リストの上）===
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
                html += `<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(400px, 1fr)); gap:30px; margin-top:30px;">`;

                gameState.adventurers.forEach(adv => {
                    const enhanceableItems = adv.equipment.filter(item => item.stat && typeof item.bonus === 'number');
                    if (enhanceableItems.length > 0) {
                        hasEnhanceable = true;
                        html += `
                            <div class="enhancement-group" style="background:rgba(0,0,0,0.25); padding:20px; border-radius:16px;">
                                <h4 style="text-align:center; margin-bottom:20px;">${adv.name} ${t('equipment_title')}</h4>`;

                        enhanceableItems.forEach(item => {
                            const statFull = t(`stat_${item.stat}`) || t(`stat_${item.stat}`);
                            const currentEnh = item.enhancement || 0;
                            html += `
                                <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px; margin:10px 0; display:flex; justify-content:space-between; align-items:center;">
                                    <div>
                                        <p style="margin:0; font-weight:bold;">${item.name}</p>
                                        <p style="margin:5px 0; color:#ffeb3b;">
                                            ${statFull} +${item.bonus}${t('percent_symbol')} 
                                            ${currentEnh > 0 ? ` + ${currentEnh}${t('absolute_symbol')}` : ''}
                                        </p>
                                    </div>
                                    <button onclick="enhanceEquipment(${adv.id}, ${item.id})"
                                            style="padding:10px 20px; font-size:1.1em;">
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

        if (level > 0 && recipes.length > 0) {
            html += `<h3 style="text-align:center; margin-top:60px;">${t('facilities_craftable_items')}</h3>
                     <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px; margin-top:30px;">`;

            let hasItems = false;

            recipes.forEach((r, originalIndex) => {
                if (r.level > level) return;

                hasItems = true;

                const cost = r.cost || 0;
                let canMake = gameState.gold >= cost;

                const materials = currentFacility === 'alchemy' 
                    ? r.inputs.map(name => ({name, qty: 1}))
                    : (r.materials || []);

                let matHtml = `<p style="margin:15px 0;"><strong>${t('facilities_required_materials')}</strong></p>`;
                if (materials.length > 0) {
                    materials.forEach(m => {
                        const have = countItem(m.name);
                        canMake = canMake && have >= m.qty;
                        const color = have >= m.qty ? '#ffffff' : '#ff6b6b';
                        matHtml += `<p style="color:${color}; margin:5px 0;">・${m.name} ×${m.qty} (${t('facilities_owned', {have})})</p>`;
                    });
                } else {
                    matHtml += `<p style="color:#aaaaaa; margin:5px 0;">・${t('facilities_none')}</p>`;
                }

                const itemName = currentFacility === 'alchemy' 
                    ? `${r.inputs.join(' + ')} → ${r.output.name}`
                    : r.name;

                let effectHtml = '';
                if (currentFacility === 'blacksmith') {
                    const statText = t(`stat_${r.stat}`);
                    effectHtml = `<p style="margin:12px 0; color:#ffeb3b; font-weight:bold; font-size:1.1em;">
                                    ${t('facilities_equip_effect', {stat: statText, bonus: r.bonus})}
                                  </p>`;
                } else if (currentFacility === 'tavern') {
                    if (r.buff.stat) {
                        const statText = t(`stat_${r.buff.stat}`);
                        const percent = r.buff.percent ? '%' : '';
                        effectHtml = `<p style="margin:12px 0; color:#81ff81; font-weight:bold; font-size:1.1em;">
                                        ${t('facilities_buff_effect', {stat: statText, bonus: r.buff.bonus, percent})}<br>
                                        ${t('facilities_buff_duration', {days: r.buff.days})}
                                      </p>`;
                    } else if (r.buff.type) {
                        const typeText = r.buff.type === 'hpRegen' ? t('buff_hp_regen') : t('buff_mp_regen');
                        effectHtml = `<p style="margin:12px 0; color:#81ff81; font-weight:bold; font-size:1.1em;">
                                        ${t('facilities_buff_effect_type', {type: typeText, bonus: r.buff.bonus})}<br>
                                        ${t('facilities_buff_duration', {days: r.buff.days})}
                                      </p>`;
                    }
                } else if (currentFacility === 'alchemy' && r.output.type === 'potion') {
                    const restoreText = r.output.restore === 'hp' ? t('potion_hp') : t('potion_mp');
                    effectHtml = `<p style="margin:12px 0; color:#a0f7a0; font-weight:bold; font-size:1.1em;">
                                    ${t('facilities_potion_effect', {type: restoreText, amount: r.output.amount})}
                                  </p>`;
                }

                let craftButtonHtml = '';
                if (currentFacility === 'alchemy') {
                    const disabledAttr = !canMake ? 'disabled style="background:#777;"' : '';
                    craftButtonHtml = `
                        <div style="margin-top:15px; display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                            <button onclick="craftAlchemyRecipe(${originalIndex},1)" 
                                    ${disabledAttr}
                                    style="padding:12px 30px; font-size:1.2em; flex:1; min-width:180px;">
                                ${t('facilities_craft_alchemy')}
                            </button>
                            <button onclick="craftAlchemyRecipe(${originalIndex},10)" 
                                    ${disabledAttr}
                                    style="padding:12px 30px; font-size:1.2em; flex:1; min-width:180px;">
                                ${t('facilities_craft_alchemy_10')}
                            </button>
                        </div>`;
                } else {
                    let buttonText, onclick;
                    if (currentFacility === 'tavern') {
                        buttonText = t('facilities_order_tavern');
                        onclick = `orderTavernItem(${originalIndex})`;
                    } else {
                        buttonText = t('facilities_produce_blacksmith');
                        onclick = `produceBlacksmith(${originalIndex})`;
                    }
                    const disabledAttr = !canMake ? 'disabled style="background:#777;"' : '';
                    craftButtonHtml = `
                        <button onclick="${onclick}" 
                                ${disabledAttr}
                                style="margin-top:15px; padding:12px 30px; font-size:1.2em;">
                            ${buttonText}
                        </button>`;
                }

                html += `
                    <div class="facility-item">
                        <h3>${itemName}</h3>
                        ${effectHtml}
                        <p>${t('facilities_cost', {cost})}</p>
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
        better_alert(`ゴールドが不足しています！ (必要: ${totalCost}G)`,"error");
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
        1000,    // Lv0 → Lv1 (序盤容易)
        2500,    // Lv1 → Lv2
        6000,
        10000     // Lv2 → Lv3 (Lv4はmax)
    ],
    blacksmith: [
        1500,    // Lv0 → Lv1
        2700,    // Lv1 → Lv2
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
        1200,    // Lv0 → Lv1 (酒場少し安め)
        2200,    // Lv1 → Lv2
        4000,    // Lv2 → Lv3
        7200,    // Lv3 → Lv4
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

function upgradeFacility(fac) {
    const currentLevel = gameState.facilities[fac];
    const maxLevel = facilityMaxLevels[fac];

    if (currentLevel >= maxLevel) {
        better_alert('この施設はすでに最大レベルです',"warning");
        return;
    }

    const cost = facilityUpgradeCosts[fac][currentLevel];

    if (gameState.gold >= cost) {
        gameState.gold -= cost;
        gameState.facilities[fac]++;
        renderFacilities();
        if (typeof updateGold === 'function') updateGold();
        better_alert(`${fac} がレベル ${gameState.facilities[fac]} にアップグレードされました！`,"success");
    } else {
        better_alert('ゴールドが不足しています',"error");
    }
    updateDisplays();
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
            better_alert(`評判が不足しています（必要: ${mq.repRequired || 0} / 現在: ${gameState.reputation}）。`,"error");
            return;
        }

        q = {
            id: gameState.nextId++,
            desc: mq.desc,
            difficulty: mq.difficulty,
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

        alertMessage = 'メインクエストを投稿しました！クエストボードに表示されます。';
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
            desc: `${cityName}で${itemName} ${qty}個購入 (最大${maxPrice}g/個)`,
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
        currentNPCIndex = 0;
        renderCurrentNPC();
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
    const adv = perms[charIndex];
    if (!adv) return;

    // IDだけで検索（名前チェック削除 → 大・小両対応）
    const itemIdx = gameState.inventory.findIndex(it => it.id === itemId);
    if (itemIdx === -1) return;

    const orb = gameState.inventory[itemIdx];

    // 大は+10、小は+1（amountがあっても名前で判定 → 確実）
    const levelsToAdd = orb.name === 'EXPオーブ (小)' ? 1 : 10;

    // EXP無視で直接レベルアップ（ステータス成長・HP/MP最大値増加・フルヒール）
    levelUp(adv, levelsToAdd);

    // オーブ消費（スタック対応）
    if ((orb.qty || 1) > 1) {
        orb.qty -= 1;
    } else {
        gameState.inventory.splice(itemIdx, 1);
    }

    better_alert(`${adv.name} が${orb.name}を使用！レベルが${levelsToAdd}アップしました！`,"success");

    renderCurrentCharacter();  // 即時反映
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
function renderCurrentCharacter() {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) {
        document.getElementById('charactersContent').innerHTML = `<p>${t('no_permanent_adventurers')}</p>`;
        return;
    }
    if (currentCharIndex >= perms.length || currentCharIndex < 0) currentCharIndex = 0;
    const adv = perms[currentCharIndex];
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

    html += `<div style="margin:15px 0;">
                <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div>
                ${t('exp_bar_label', {exp: adv.exp, needed: expNeeded})}<br>
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                ${t('hp_bar_label', {hp: adv.hp, maxHp: adv.maxHp})}<br>
                <div class="progress-bar"><div class="progress-fill mp-fill" style="width:${mpPct}%"></div></div>
                ${t('mp_bar_label', {mp: adv.mp, maxMp: adv.maxMp})}
             </div>`;

    if (adv.buffs && adv.buffs.length > 0) {
        html += `<p style="margin:10px 0;"><strong>${t('active_buffs_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        adv.buffs.forEach(b => {
            const bonus = b.percent ? `${b.bonus}%` : `+${b.bonus}`;
            const target = b.stat ? t(`stat_${b.stat}`) : b.type;
            html += `<li>${t('buff_line', {bonus: bonus, target: target, daysLeft: b.daysLeft})}</li>`;
        });
        html += `</ul>`;
    }

    html += `<p style="margin:15px 0 10px;"><strong>${t('equipment_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
    if (adv.equipment.length === 0) {
        html += `<li>${t('none_equipment')}</li>`;
    } else {
        adv.equipment.forEach((eq, i) => {
            const statFull = t(`stat_${eq.stat}`) || t(`stat_${eq.stat}`);
            const baseBonus = `+${eq.bonus}% ${statFull}`;
            const enhBonus = (eq.enhancement > 0) 
                ? ` + ${eq.enhancement}${t('absolute_symbol')}` 
                : '';
            html += `<li>${eq.name} (${baseBonus}${enhBonus})
                    <button class="cancel-btn" onclick="removeFromChar(${currentCharIndex}, ${i})">${t('unequip_button')}</button></li>`;
        });
    }
    html += `</ul>`;

    const equippable = gameState.inventory.filter(it => it.stat && adv.equipment.length < 2 && (it.qty || 1) > 0);
    if (equippable.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('equippable_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        equippable.forEach(it => {
            const baseBonus = `+${it.bonus}% ${t(`stat_${it.stat}`)}`;
            const enhBonus = (it.enhancement > 0) 
                ? ` + ${it.enhancement}${t('absolute_symbol')}` 
                : '';
            html += `<li>${it.name} x${it.qty || 1} (${baseBonus}${enhBonus}) 
                    <button onclick="equipToChar(${currentCharIndex}, ${it.id})">${t('equip_button')}</button></li>`;
        });
        html += `</ul>`;
    }

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

    const expOrbs = gameState.inventory.filter(it => 
        (it.name === 'EXPオーブ' || it.name === 'EXPオーブ (小)') && (it.qty || 1) > 0
    );
    if (expOrbs.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('level_up_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        expOrbs.forEach(it => {
            const levels = it.name === 'EXPオーブ (小)' ? 1 : 10;
            html += `<li>${it.name} x${it.qty || 1} ${t('level_up_amount', {levels: levels})} 
                     <button onclick="useExpOrbOnChar(${currentCharIndex}, ${it.id})">${t('use_button')}</button></li>`;
        });
        html += `</ul>`;
    }

    const consumables = gameState.inventory.filter(it => 
        it.type === 'consumable' && 
        it.name !== 'EXPオーブ' && 
        it.name !== 'EXPオーブ (小)' && 
        (it.qty || 1) > 0
    );
    if (consumables.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>${t('consumables_title')}</strong></p><ul style="margin:0; padding-left:20px;">`;
        consumables.forEach(it => {
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
                 </div>`;
    }

    html += `</div>`; // 左側閉じ
// === 更新された生成関数呼び出し例（元の呼び出し場所に置き換え） ===
    // 右側：画像（大きめ表示）
    html += `<div style="flex:0 0 auto; text-align:center;">`;

    // baseImageからキー作成（拡張子除去）
    const baseKey = adv.image.replace(/\.png$/i, '');

    // 設定取得（キャラクター専用があればそれ、なければデフォルト）
    const settings = breathingAnimationSettings[baseKey] || defaultBreathingSettings;

    // 汎用関数呼び出し（全パラメータ渡し）
// Add this helper if you don't have it already
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Your existing code with fallback added
    const primarySuffix = '_Breathing.png';
    const fallbackSuffix = '_breathing.png';

    // First, generate with the preferred (capital B) version
    let breathingDiv = generateBreathingAnimation(
        adv.image,                  // baseImage
        220,                        // displayWidth
        400,                        // maxHeight
        settings.cycleDuration,     // cycleDuration
        primarySuffix,              // suffix - try Breathing first
        settings.rows,
        settings.cols,
        settings.frameW,
        settings.frameH,
        settings.scaleFactor,
        settings.innerHeight,
        settings.innerWidth,
    );

    // Construct the expected sprite URLs (matches common pattern: base.png → base_Breathing.png)
    const basePath = adv.image.replace(/\.png$/i, '');
    const primaryUrl = basePath + primarySuffix;
    const fallbackUrl = basePath + fallbackSuffix;

    // Add CSS multi-background fallback: if Breathing sprite 404s → automatically show breathing sprite
    // Browser skips failed layers → perfect sync fallback, no async/preload needed
    const urlRegex = new RegExp(`(url\\(\\s*["']?${escapeRegExp(primaryUrl)}["']?\\s*\\))`, 'gi');
    breathingDiv = breathingDiv.replace(urlRegex, `$1, url("${fallbackUrl}")`);

    html += breathingDiv;

    html += `<button onclick="openNpcChat('${adv.name}')" style="margin:20px auto; display:block; padding:12px 30px; background:#8f458f; color:white; border:none; border-radius:8px; font-size:1.2em; cursor:pointer;">
        ${adv.name}と話す (AI)
    </button>`;
    html += `</div>`;
    html += `</div>`; // flexコンテナ閉じ
    document.getElementById('charactersContent').innerHTML = html;
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
            chanceSuffix = ''; // No % for tactical combat
        } else if (q.type === 8 || q.type === 'trade') { // trade（numeric typeを維持する場合） または q.type === 'trade'
    if (q.assigned.length === 0) {
        chance = 0;
        estDays = t('no_assignment'); // 「未割り当て」などの翻訳キー（既存にあれば活用）
    } else {
        chance = 100; // 確定成功

        let days = q.tradeRemainingDays; // 投稿時に設定した固定日数（残り日数）

        if (q.inProgress && q.tradeRemainingDays > 0) {
            estDays = t('trade_remaining_days', {days});
        } else {
            estDays = t('trade_days', {days});
        }
    }
} else { // 通常クエスト
            const meetsAll = teamStr >= q.minStrength && teamWis >= q.minWisdom && 
                            teamDex >= q.minDexterity && teamLuk >= q.minLuck;
            if (!meetsAll) {
                estDays = t('failure');
                chance = 0;
            } else {
                let teamFocus = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), q.focusStat), 0);
                const excess = (teamFocus / q.minFocus) - 1;
                const prob = Math.min(0.5, 0.1 + Math.max(0, excess) * 0.2);
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
                assignedHtml += `<span class="assigned-adventurer"><img src="Images/${a.image}" class="adventurer-img">${nameHtml} <button class="cancel-btn" onclick="unassign(${q.id}, ${id})">X</button></span>`;
            }
        }
    });
    if (assignedHtml === '') {
        assignedHtml = `<span style="color:#aaa;">${t('no_assignment')}</span>`;
    }

    // 必要ステータスHTML（アイコン付き）
    const minHtml = `<img src="Images/STR.png" class="stat-icon" title="${t('stat_strength')}"> ${t('stat_strength')} ${q.minStrength || 0} | 
                     <img src="Images/WIS.png" class="stat-icon" title="${t('stat_wisdom')}"> ${t('stat_wisdom')} ${q.minWisdom || 0} | 
                     <img src="Images/DEX.png" class="stat-icon" title="${t('stat_dexterity')}"> ${t('stat_dexterity')} ${q.minDexterity || 0} | 
                     <img src="Images/LUC.png" class="stat-icon" title="${t('stat_luck')}"> ${t('stat_luck')} ${q.minLuck || 0}`;

    const teamHtml = `<img src="Images/STR.png" class="stat-icon" title="${t('stat_strength')}"> ${t('stat_strength')} ${teamStr} | 
                      <img src="Images/WIS.png" class="stat-icon" title="${t('stat_wisdom')}"> ${t('stat_wisdom')} ${teamWis} | 
                      <img src="Images/DEX.png" class="stat-icon" title="${t('stat_dexterity')}"> ${t('stat_dexterity')} ${teamDex} | 
                      <img src="Images/LUC.png" class="stat-icon" title="${t('stat_luck')}"> ${t('stat_luck')} ${teamLuk}`;

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
        html += `<p>${t('difficulty_label')}: ${q.difficulty} (${q.rank || ''}) | ${t('days_left_label')}: ${q.daysLeft} | ${t('reward_label')}: ${q.reward}g</p>`;
        if (q.defense) {
            html += `<p><strong style="color:red;">${t('defense_warning')}</strong></p>`;
        }
        if (!q.defense && !q.playerPosted) {
            html += `<p>${t('required_label')}: ${minHtml}</p>`;
        }
    }

    html += `<p>${t('estimated_days_label')}: ${estDays}</p>
             <p>${t('team_label')}: ${teamHtml} | ${t('success_rate_label')}: ${chance}${chanceSuffix}</p>
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
    // Ignore if focus is on an input, textarea, or contenteditable element (e.g., when typing)
    const activeTag = document.activeElement.tagName;
    const isEditable = document.activeElement.isContentEditable;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || isEditable) {
        return;
    }

    const key = event.key.toLowerCase();
    const eventmodal = document.getElementById('eventModal');
    const event_modal_displaying = eventmodal && window.getComputedStyle(eventmodal).display !== 'none';
    const shopmodal = document.getElementById('shopModal');
    const shop_modal_displaying = shopmodal && window.getComputedStyle(shopmodal).display !== 'none';
    const charactersmodal = document.getElementById('charactersModal');
    const characters_modal_displaying = charactersmodal && window.getComputedStyle(charactersmodal).display !== 'none';
    const questCompletion_modal = document.getElementById('questCompletionModal');
    const questCompletion_modal_displaying = questCompletion_modal && window.getComputedStyle(questCompletion_modal).display !== 'none';   
    const battleModal_modal = document.getElementById('battleModal');
    const battleModal_modal_displaying = battleModal_modal && window.getComputedStyle(battleModal_modal).display !== 'none';     
    const facilitiesModal_modal = document.getElementById('facilitiesModal');
    const facilitiesModal_modal_displaying = battleModal_modal && window.getComputedStyle(facilitiesModal_modal).display !== 'none';    
    const guildQuestsModal_modal = document.getElementById('guildQuestsModal');
    const guildQuestsModal_modal_displaying = battleModal_modal && window.getComputedStyle(guildQuestsModal_modal).display !== 'none';                   
    console.log(event_modal_displaying);
    if (key === 'a' || event.key === 'ArrowLeft') {
        if (event_modal_displaying) {
            prevPage();
        }else if (characters_modal_displaying) {
            prevChar();
        }else if (shop_modal_displaying) {
            prevShopPage();
        }else{
            prevQuest();
        }
    } else if (key === 'd' || event.key === 'ArrowRight') {
        if (event_modal_displaying) {
            nextPage();
        }else if (characters_modal_displaying) {
            nextChar();
        }else if (shop_modal_displaying) {
            nextShopPage();
        }else{
            nextQuest();
        }
    } else if (key === 'c') {
        // 'c' で現在のクエストから割り当て済み冒険者を1人解除（いる場合のみ）
        const questCard = document.querySelector('.quest-card');
        if (!questCard) return;

        const questId = parseInt(questCard.dataset.questId);
        if (isNaN(questId)) return;

        const q = gameState.quests.find(qq => qq.id === questId);
        if (!q || q.inProgress || q.assigned.length === 0) return;

        const advId = q.assigned[q.assigned.length - 1];

        unassign(questId, advId);
    } else if (event.key === 'Enter' && !event_modal_displaying && !shop_modal_displaying && !characters_modal_displaying && !battleModal_modal_displaying) {
        playDay();
    } else if (event.key === ' ') {
    event.preventDefault(); // 常にページスクロールを防止（ゲーム中は不要）
    
    if (event_modal_displaying) {
        if(!questCompletion_modal_displaying){
            closeModal();
        }
    }else if (shop_modal_displaying) {
        closeShop();
    }else if (characters_modal_displaying) {
        closeCharacters();
    }else if (facilitiesModal_modal_displaying) {
        closeFacilities();
    }else if (guildQuestsModal_modal_displaying) {
        closeGuildQuests();
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
        document.getElementById('bgm'),
        document.getElementById('introBgm'),
        document.getElementById('battleBgm'),
        document.getElementById('battleBgm2'),
        document.getElementById('dialogueBgm'),
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

document.getElementById('bgm').volume = 0.2;
document.getElementById('introBgm').volume = 0.3;  // ← 新規追加
document.getElementById('battleBgm').volume = 0.3;
document.getElementById('battleBgm2').volume = 0.3;
document.getElementById('dialogueBgm').volume = 0.1;
let audioPlayed = false;
document.addEventListener('click', function() {
    if (!audioPlayed) {
        document.getElementById('bgm').play().catch(e => console.log('BGM再生エラー:', e));
        audioPlayed = true;
    }
}, { once: true });

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
function startIntroDialogue() {
    playerName = document.getElementById('playerNameInput').value.trim();
    if (playerName === "") {
        better_alert("名前を入力してください！","warning");
        return;
    }
    gameState.playerName = playerName;
    // Use language-specific intro
    const currentIntro = introDialogues[currentLang] || introDialogues.ja;
    dialogues = currentIntro;  // Temporarily assign to global dialogues variable used by render/next
    document.getElementById('stepName').style.display = 'none';
    document.getElementById('stepDialogue').style.display = 'block';
    
    dialogueIndex = 0;
    renderCurrentDialogue();

    // ← ここから追加：イントロBGM再生
    const mainBgm = document.getElementById('bgm');
    const introBgm = document.getElementById('introBgm');

    // もしメインBGMが再生中だったら止める（ほぼありえないが念のため）
    if (!mainBgm.paused) {
        mainBgm.pause();
    }

    // イントロBGMを最初から再生
    introBgm.currentTime = 0;
    introBgm.play().catch(e => console.log('イントロBGM再生エラー:', e));
    // ← ここまで追加
}

// renderCurrentDialogue 関数内の「ゲーム開始」ボタンの処理を以下のように修正
function renderCurrentDialogue() {
    const box = document.getElementById('dialogueBox');
    let current = dialogues[dialogueIndex];
    
    let text = current.text.replace(/{player}/g, playerName);
    
    let html = `<p><strong>${current.speaker}:</strong><br>${text}</p>`;
    
    if (current.image) {
        html = `<img src="${current.image}" style="width:120px; height:auto; float:left; margin-right:20px; border-radius:10px;">` + html;
    }
    
    box.innerHTML = html;

    // 次へ／ゲーム開始ボタンの処理（常にnextDialogueを紐づけ、テキストのみ変更）
    const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
        if (dialogueIndex === dialogues.length - 1) {
            nextBtn.textContent = t('start_game_button', {});  // We'll add this key below
        } else {
            nextBtn.textContent = t('next_button', {});
        }
        nextBtn.onclick = nextDialogue;
    

    }
}

function nextDialogue() {
    // 既にダイアログが終了している場合は何もしない（複数回実行防止）
    if (dialogueIndex >= dialogues.length) {
        return;
    }

    dialogueIndex++;

    if (dialogueIndex < dialogues.length) {
        renderCurrentDialogue();
    } else {
        // 最終ダイアログから進んだ場合 → ゲーム開始処理
        document.getElementById('introModal').style.display = 'none';

        // === クロスフェード処理（急なBGM切り替えを防止）===
        const introBgm = document.getElementById('introBgm');
        const mainBgm = document.getElementById('bgm');

        // メインBGMを巻き戻してボリューム0で再生開始
        mainBgm.currentTime = 0;
        mainBgm.volume = 0;
        mainBgm.play().catch(e => console.log('メインBGM再生エラー:', e));

        const fadeDuration = 2500;  // 2.5秒でクロスフェード（調整可能）
        const introInitialVol = introBgm.volume;  // 通常0.3
        const targetVol = 0.3;
        const startTime = Date.now();

        const crossfadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / fadeDuration, 1);

            // イントロをフェードアウト
            introBgm.volume = introInitialVol * (1 - progress);

            // メインをフェードイン
            mainBgm.volume = targetVol * progress;

            if (progress >= 1) {
                clearInterval(crossfadeInterval);
                // フェード完了後、イントロを停止・リセット
                introBgm.pause();
                introBgm.currentTime = 0;
                // メインはフルボリュームでループ継続
                mainBgm.volume = targetVol;
            }
        }, 50);  // 50msごとに更新（滑らかで負荷も軽い）

        audioPlayed = true;

        // ゲーム本編開始
        startDay();
    }
}

// ゲームロード時に自動表示（例: ページ読み込み後やstartDay()の前に）
window.addEventListener('load', function() {
    if (gameState.day === 1) { // 初回起動判定
        document.getElementById('introModal').style.display = 'flex';
    }})

// クエスト完了ダイアログ表示関数
// introのダイアログシステム（introModal, stepDialogue, dialogueBox, nextBtn）を再利用
// 単一ダイアログのみ表示 → 依頼主の感謝セリフとしてスタイル統一
// 画像はなし、speakerは「依頼主」で固定（Fランクはすべて村人/町の人系の依頼主なので自然）
// プレイヤー名置換は不要（完了ダイアログに{player}は入っていない）


let typingInterval = null;  // タイピング間隔のクリア用
let isTyping = false;       // タイピング中フラグ

let completionQueue = [];     // 完了ダイアログのキュー（複数同時完了対応）
let isPlayingDialogue = false; // 現在ダイアログ再生中フラグ

function queueQuestCompletionDialogue(rawSequence) {
    if (!rawSequence || rawSequence.length === 0) return;

    // プレースホルダー置換処理（constant.js が純粋定数のまま）
    const defaultName = {
        ja: '冒険者',
        en: 'Adventurer',
        zh: '冒險者'
    }[currentLang] || 'Adventurer';

    const playerName = gameState.playerName || defaultName;

    const processedSequence = rawSequence.map(line => ({
        speaker: line.speaker.replace('{PLAYER}', playerName),
        text: line.text.replace(/{PLAYER}/g, playerName)
    }));

    completionQueue.push(processedSequence);

    // 再生中でなければ即開始（ここで新しいダイアログセッション開始時にdialogueBgmへクロスフェード）
    if (!isPlayingDialogue) {
        crossfadeTo('dialogueBgm', 2000);  // 開始時は2000msでフェード（必要に応じて調整可能）
        playNextDialogue();
    }
}

function playNextDialogue() {
    if (completionQueue.length === 0) {
        isPlayingDialogue = false;
        // すべてのダイアログが完全に終了した時点でメインBGMに戻す
        crossfadeTo('bgm', 2000);
        return;
    }

    isPlayingDialogue = true;
    const sequence = completionQueue.shift();

    // 単一ダイアログ再生（すべてローカル変数化で競合防止）
    (function displaySingleDialogue(seq) {
        // 既存モーダル削除（安全策）
        const existing = document.getElementById('questCompletionModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'questCompletionModal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const content = document.createElement('div');
        content.style.backgroundColor = '#747474df';
        content.style.padding = '30px';
        content.style.borderRadius = '15px';
        content.style.maxWidth = '900px';
        content.style.width = '90%';
        content.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        content.style.display = 'flex';
        content.style.alignItems = 'flex-start';
        content.style.gap = '40px';
        content.style.fontFamily = '"Segoe UI", Arial, sans-serif';

        // === キャラ画像（話者に応じて切り替え、デフォルトはペア画像）===
        const charImage = document.createElement('img');
        charImage.style.width = '200px';
        charImage.style.height = 'auto';
        charImage.style.maxHeight = '440px';
        charImage.style.objectFit = 'contain';
        charImage.style.borderRadius = '12px';
        charImage.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        charImage.style.alignSelf = 'flex-start';
        charImage.onerror = function() { this.style.display = 'none'; };

        // === テキスト＋ボタンのコンテナ（右側）===
        const textContainer = document.createElement('div');
        textContainer.style.flex = '1';
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';
        textContainer.style.justifyContent = 'space-between';
        textContainer.style.minHeight = '200px';

        const dialogueBox = document.createElement('div');
        dialogueBox.id = 'questDialogueBox';
        dialogueBox.style.minHeight = '150px';
        dialogueBox.style.marginBottom = '30px';
        dialogueBox.style.fontSize = '1.2em';
        dialogueBox.style.lineHeight = '1.6';

        const nextBtn = document.createElement('button');
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.6';
        nextBtn.style.padding = '12px 30px';
        nextBtn.style.fontSize = '1.2em';
        nextBtn.style.backgroundColor = '#e94560';
        nextBtn.style.color = 'white';
        nextBtn.style.border = 'none';
        nextBtn.style.borderRadius = '8px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.alignSelf = 'center';

        textContainer.appendChild(dialogueBox);
        textContainer.appendChild(nextBtn);

        content.appendChild(charImage);
        content.appendChild(textContainer);
        modal.appendChild(content);
        document.body.appendChild(modal);

        // すべてローカル変数
        let localIndex = 0;
        let localTyping = false;
        let localInterval = null;

        // プレイヤー名（表示用に再取得）
        const playerName = gameState.playerName || {
            ja: '冒険者',
            en: 'Adventurer',
            zh: '冒險者'
        }[currentLang] || 'Adventurer';

        function typeText(targetText, speaker) {
            localTyping = true;
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.6';

            dialogueBox.innerHTML = `<p><strong>${speaker}:</strong><br><span id="typingText"></span></p>`;
            const typingText = document.getElementById('typingText');

            let i = 0;

            // 言語に応じたタイピング速度
            let delay = 30; // デフォルト
            if (currentLang === 'en') {
                delay = 15;
            } else if (currentLang === 'zh') {
                delay = 35;
            }

            localInterval = setInterval(() => {
                if (i < targetText.length) {
                    typingText.innerHTML += targetText.charAt(i);
                    i++;
                } else {
                    clearInterval(localInterval);
                    localTyping = false;
                    nextBtn.disabled = false;
                    nextBtn.style.opacity = '1';

                    // ボタンテキストを翻訳対応
                    if (localIndex === seq.length - 1) {
                        nextBtn.textContent = t('dialogue_close');
                    } else {
                        nextBtn.textContent = t('dialogue_next');
                    }
                }
            }, delay);
        }

        function renderCurrent() {
            const current = seq[localIndex];
            let imageSrc = 'Images/main_char.png'; // デフォルト（ペア画像やギルドシーンを想定）

            // プレイヤー（ギルドマスター）の場合：専用画像 or ランダム冒険者画像（カスタム名でも統一感を保つ）

            // Kaito
            if (current.speaker.includes('カイト') || current.speaker.includes('Kaito')) {
                imageSrc = 'Images/カイト.png';
            } 
            // Luna
            else if (current.speaker.includes('ルナ') || current.speaker.includes('Luna')) {
                imageSrc = 'Images/ルナ.png';
            }else if (current.speaker.includes('冒険者') || current.speaker.includes('Adventurer')) {
                const playerImages = [
                    'Images/STR_RankF_F.png',  // 必要に応じてギルドマスター専用画像に変更可能
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
            }else if (current.speaker != playerName){
                imageSrc = 'Images/'+current.speaker+'.png';
            }
            // その他（依頼主など）はデフォルトペア画像

            charImage.src = imageSrc;
            charImage.style.display = 'block';

            typeText(current.text, current.speaker);
        }

        nextBtn.onclick = function() {
            if (localTyping) {
                clearInterval(localInterval);
                const current = seq[localIndex];
                dialogueBox.innerHTML = `<p><strong>${current.speaker}:</strong><br>${current.text}</p>`;
                localTyping = false;
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';

                if (localIndex === seq.length - 1) {
                    nextBtn.textContent = t('dialogue_close');
                } else {
                    nextBtn.textContent = t('dialogue_next');
                }
            } else {
                localIndex++;
                if (localIndex < seq.length) {
                    renderCurrent();
                } else {
                    modal.remove();
                    playNextDialogue();
                }
            }
        };

        modal.onclick = function(e) {
            if (e.target === modal) {
                if (localInterval) clearInterval(localInterval);
                modal.remove();
                playNextDialogue();
            }
        };

        renderCurrent();
    })(sequence);
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
        {speaker: '敘述者', text: 'Luna與Kaito的身體失去力量，兩人同時安靜地離去了。'},
        {speaker: playerSpeaker, text: 'Luna啊啊…Kaito啊啊！！！'},
        {speaker: playerSpeaker, text: '都是我的錯…沒能保護他們兩個…全都是我的錯…'},
        {speaker: '敘述者', text: `同時失去兩位最親密的夥伴，${playerSpeaker}的心完全碎裂。再也無法握劍，永遠放棄了冒險之路。故事在深刻的悲傷與絕望中結束…`}
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
                {speaker: '敘述者', text: '然而雇來的打手人數壓倒性，隊伍很快被制伏。'},
                {speaker: '敘述者', text: `${playerSpeaker}被賣給富豪當奴隸，Kaito和Luna被釋放。輝煌的冒險日子永遠結束了…`}
            ]
        },
        rep: {
            ja: [
                {speaker: '商人A', text: 'このギルドの評判が最低だ！もう絶対に取引しない！'},
                {speaker: '商人B', text: '俺もだ！報酬の支払いが遅いし、クエストも怪しい！'},
                {speaker: '怒りの冒険者', text: 'そうだ！こんなゴミギルドは冒険者の名を汚すだけだ！'},
                {speaker: '別の冒険者', text: '解散しろ！王国に恥をかかせるな！'},
                {speaker: playerSpeaker, text: '待ってください！私たちは必死に頑張ってきたんです！'},
                {speaker: 'カイト', text: 'そうだよ！ちゃんと成功したクエストだってたくさんある！'},
                {speaker: 'ルナ', text: `どうか信じてください…${playerSpeaker}を…`},
                {speaker: '商人A', text: '信じる？評判が地に落ちてるんだぞ！'},
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
                {speaker: '商人A', text: '這個公會評價墊底！絕不再交易！'},
                {speaker: '商人B', text: '我也是！報酬總是拖延，任務還可疑！'},
                {speaker: '憤怒的冒險者', text: '對！這種垃圾公會只會玷污冒險者名聲！'},
                {speaker: '另一冒險者', text: '解散！別給王國丟臉！'},
                {speaker: playerSpeaker, text: '請等一下！我們一直拼命努力啊！'},
                {speaker: 'Kaito', text: '沒錯！我們也成功完成了很多任務！'},
                {speaker: 'Luna', text: `請相信…相信${playerSpeaker}…`},
                {speaker: '商人A', text: '相信？評價已經爛透了！'},
                {speaker: '群眾', text: '解散！解散！逮捕他們！'},
                {speaker: '群眾', text: '關閉公會！'},
                {speaker: '王國衛兵', text: '奉王命，即刻解散此公會！'},
                {speaker: '王國衛兵', text: '公會長及其兩名夥伴，以損害王國信譽罪逮捕！'},
                {speaker: playerSpeaker, text: '不…怎麼會這樣結束…'},
                {speaker: 'Kaito', text: '可惡…怎麼會變成這樣…'},
                {speaker: 'Luna', text: `${playerSpeaker}…我好怕…`},
                {speaker: '敘述者', text: '在嘲笑與怒吼中，三人被鎖鏈捆綁，押往王國監獄。昔日的榮光蕩然無存，故事在恥辱中落幕…'}
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
                {speaker: '敘述者', text: 'Luna身體失去力量，安靜地離去了。'},
                {speaker: playerSpeaker, text: 'Luna啊啊啊啊！！！'},
                {speaker: 'Kaito', text: '不會吧…Luna…'},
                {speaker: playerSpeaker, text: '我…沒能保護她…都是我的錯…'},
                {speaker: '敘述者', text: `陷入深深絕望的${playerSpeaker}，再也沒有握劍的意志，放棄了冒險之路。故事在悲傷中結束…`}
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
                {speaker: '敘述者', text: 'Kaito靜靜閉上眼睛，再也沒睜開。'},
                {speaker: playerSpeaker, text: 'Kaito啊啊啊！！！'},
                {speaker: 'Luna', text: '不…Kaito…'},
                {speaker: playerSpeaker, text: '因為我太弱…失去了最好的朋友…'},
                {speaker: '敘述者', text: `無法承受失去摯友的痛苦，${playerSpeaker}放棄了冒險之路。故事以悲劇結束…`}
            ]
        },
        
        
    };

    return dialogues[reason][lang] || dialogues[reason].ja; // フォールバック: 日本語
}

// 新規追加: ゲームオーバー専用ダイアログキュー関数（既存のcompletionQueueを再利用）
function queueGameOverDialogue(sequence) {
    if (!sequence || sequence.length === 0) return;

    // 即座に1日終了ボタンを無効化
    const endBtn = document.querySelector('button[onclick="playDay()"]');
    if (endBtn) endBtn.disabled = true;

    // ゲームオーバーpendingフラグを設定（複数トリガー防止）
    gameState.pendingGameOver = true;

    // 既存のcompletionQueueにpush（クエスト完了と混在OK、gameOver優先で後続処理なし）
    completionQueue.push(sequence);

    // 再生中でなければ即開始（dialogueBgmへクロスフェード）
    if (!isPlayingDialogue) {
        crossfadeTo('GameoverBgm', 2000);
        playNextDialogue();
    }
}