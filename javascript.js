/* === ローディング画面用プリロード機能 === */
let loadedCount = 0;
let currentGuildQuestType = 'main';


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
function startGame() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}

function skipIntro(){
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
    document.getElementById('introModal').style.display = 'none';

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
    seenCompletionDialogues: new Set()
};

// gameState の定義直後（let gameState = { ... }; の次）に以下のコードを挿入
// 新規ゲーム開始時のみ開始永久冒険者を追加（ロード時はスキップ）





if (gameState.adventurers.length === 0 && gameState.day === 1) {
    // カイト (STR/DEX 特化の二刀流騎士)
    const kaito = {
        id: gameState.nextId++,
        name: 'カイト',
        gender: 'male',
        image: 'カイト.png',
        strength: 30,
        wisdom: 10,
        dexterity: 25,
        luck: 10,
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
    };

    gameState.adventurers.push(kaito);

    // ルナ (WIS 特化の魔法使い)
    const luna = {
        id: gameState.nextId++,
        name: 'ルナ',
        gender: 'female',
        image: 'ルナ.png',
        strength: 10,
        wisdom: 30,
        dexterity: 10,
        luck: 25,
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
        critChance: 10
    };

    gameState.adventurers.push(luna);
}


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

function saveGame() {
    // Set は JSON に直接シリアライズできないので、Array に変換したコピーを作成
    const savableState = {
        ...gameState,
        seenCompletionDialogues: Array.from(gameState.seenCompletionDialogues || new Set())
    };

    localStorage.setItem('guildMasterSave', JSON.stringify(savableState));
    alert('ゲームを保存しました！');
}

function loadGame() {
    const saved = localStorage.getItem('guildMasterSave');
    if (saved) {
        const loadedState = JSON.parse(saved);

        // 既存の gameState にマージ
        Object.assign(gameState, loadedState);

        // 旧セーブ互換性 & 初期化
        if (!gameState.facilities) gameState.facilities = {blacksmith: 0, tavern: 0, alchemy: 0};
        if (!gameState.dailyPrices) gameState.dailyPrices = {};
        if (gameState.mainProgress === undefined) gameState.mainProgress = 0;

        // seenCompletionDialogues を Array → Set に復元（旧セーブでは undefined もあり得る）
        if (Array.isArray(gameState.seenCompletionDialogues)) {
            gameState.seenCompletionDialogues = new Set(gameState.seenCompletionDialogues);
        } else if (!gameState.seenCompletionDialogues) {
            gameState.seenCompletionDialogues = new Set();
        }

        // 冒険者関連の後方互換処理（既存のまま）
        gameState.adventurers.forEach(a => {
            if (!a.buffs) a.buffs = [];
        });

        cleanupAdventurers();
        checkGameOver();
        updateDisplays();
        ensureTrainingQuest();
        alert('ゲームを読み込みました！');
    } else {
        alert('セーブデータが見つかりません！');
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
        alert("ゴールドが不足しています");
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
        alert("評判が不足しています");
        return;
    }
    gameState.reputation -= 10;
    gameState.gold += 100;
    checkGameOver();
    updateDisplays();
}

function checkGameOver() {
    if (gameState.gameOver) return;
    if (gameState.gold <= 0 || gameState.reputation <= 0) {
        const reason = gameState.gold <= 0 ? "資金不足" : "評判ゼロ";
        alert(`ゲームオーバー！ギルドは${reason}により崩壊しました。`);
        gameState.gameOver = true;
        const endBtn = document.querySelector('button[onclick="playDay()"]');
        if (endBtn) endBtn.disabled = true;
        updateDisplays();
    }
}

function buyExpansion() {
    const current = gameState.maxPermanentSlots;
    if (current >= 12) {
        alert('最大拡張に達しました');
        return;
    }
    const next = current + 1;
    const level = next - 4;
    const cost = 500 + 250 * (level - 1);
    if (!spendGold(cost)) return;
    gameState.maxPermanentSlots = next;
    updateDisplays();
}

function randomName(gender){
    const names = gender === 'M' ? maleNames : femaleNames;
    return names[Math.floor(Math.random()*names.length)];
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
        const pool = killDescsByRank[rank];
        qType = 0;
        storyindex = Math.floor(Math.random() * pool.length); 
        desc = pool[storyindex];
    } else if (primary === 1) { // discovery (WIS)
    let pool = discoveryDescsByRank[rank] || discoveryDescsByRank['F']; // 通常ランクは通常プール
    let useEpic = false;

    // Bランク以上はepic discoveryDescsを使用（NPC発見可能）
    if (['B','B+','A','A+','S'].includes(rank)) {
        useEpic = true;
        if (rank === 'B') pool = discoveryDescs.slice(0, 3);
        else if (rank === 'B+') pool = discoveryDescs.slice(3, 6);
        else if (rank === 'A') pool = discoveryDescs.slice(6, 8);
        else if (rank === 'A+') pool = discoveryDescs.slice(8, 10);
        else pool = discoveryDescsByRank['S']; // Sランクは専用
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
        const pool = escortDescsByRank[rank];
        qType = 2;
        storyindex = Math.floor(Math.random() * pool.length); 
        desc = pool[storyindex];
    } else { // fetch (LUC)
        const pool = fetchQuestsByRank[rank];
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





const allAlchemyMaterials = [
    // === 元の生素材 + クラフト素材（8種） ===
    "鉄鉱石", "薬草", "スパイス", "宝石",
    "鋼のインゴット", "活力の粉", "炎の粉", "魔法の結晶",

    // === fetch生素材（recipesで使用される全種） ===
    // F/F+
    "キノコ", "花", "普通の薬草", "川魚", "鉄の欠片",

    // D/D+
    "狼の毛皮", "魔力の結晶（小）",

    // D+/C
    "オークの牙", "古代の巻物断片", "希少スパイス",

    // C/C+
    "グリフォンの羽", "ヒドラの毒袋", "聖水",

    // C+/B
    "ユニコーンの角", "禁断の魔導書頁", "フェニックスの灰",
    "星の欠片", "天使の羽", "デーモンの心臓",

    // B+/A
    "古代ドラゴンの鱗", "エーテルの結晶", "神の涙",
    "タイタンの骨", "永遠の炎", "神聖な遺物",

    // A+/S
    "エルダードラゴンの心臓", "深淵の核", "光の神器の欠片",
    "世界の源石", "創世の欠片", "滅びの結晶",

    // === 新規クラフト素材（チェイン用、30種） ===
    "鉄草合金粉", "森のエキス",
    "精鉄インゴット", "獣皮エキス",
    "牙鋼インゴット", "古魔導粉", "希少活力粉",
    "風翼結晶", "聖魔導結晶",
    "禁断魔導晶", "不死鳥炎粉",
    "龍鋼装甲材", "エーテル魔晶",
    "巨神骨鋼", "永劫炎粉", "神聖遺晶",
    "古龍心鋼", "深淵エーテル晶", "光神器晶", "終焉破壊粉",
    "滅び深淵晶"
]

function getAlchemyMaterialOptions() {
    let html = '<option value="">材料を選択</option>';
    allAlchemyMaterials.forEach(mat => {
        const cnt = countItem(mat);
        if (cnt > 0) {
            html += `<option value="${mat}">${mat} (在庫: ${cnt})</option>`;
        }
    });
    return html;
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
    const recipe = alchemyRecipes.find(r => {
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
        desc: 'トレーニングクエスト',
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
    const repFactor = Math.max(0.1, (gameState.reputation + 50) / 100);
    const primary = Math.floor(Math.random()*4);
    let s=Math.max(1, Math.floor((1+Math.random()*5) * repFactor)), w=Math.max(1, Math.floor((1+Math.random()*5) * repFactor)), d=Math.max(1, Math.floor((1+Math.random()*5) * repFactor)), l=Math.max(1, Math.floor((1+Math.random()*5) * repFactor));
    if(primary===0) s=Math.floor(20 * repFactor + Math.random()*(20 * repFactor)) + Math.floor(gameState.reputation / 20);
    else if(primary===1) w=Math.floor(20 * repFactor + Math.random()*(20 * repFactor)) + Math.floor(gameState.reputation / 20);
    else if(primary===2) d=Math.floor(20 * repFactor + Math.random()*(20 * repFactor)) + Math.floor(gameState.reputation / 20);
    else l=Math.floor(20 * repFactor + Math.random()*(20 * repFactor)) + Math.floor(gameState.reputation / 20);
    const total = s+w+d+l;
    const gender = Math.random() < 0.5 ? 'M' : 'F';
    const name = randomName(gender);
    const statAbbr = ['STR','WIS','DEX','LUC'][primary];
    const image = `${statAbbr}_${gender}.png`;
    return {
        id: gameState.nextId++,
        name: name,
        level:1, exp:0,
        strength:s, wisdom:w, dexterity:d, luck:l,
        hp:100, maxHp:100, mp:50, maxMp:50,
        equipment:[],
        buffs: [],
        image: image,
        hiringCost:Math.floor(20+total),
        recruitingCost:Math.floor(100+total*3),
        temp:true, busy:false, generatedDay:0,
        primary: primary,
        critChance:10,
    };
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
        alert('ポーションが見つかりません');
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
        strength: s, wisdom: w, dexterity: d, luck: l,
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
    const base = obj[stat];
    let equipmentBonus = obj.equipment ? obj.equipment.reduce((sum, e) => e.stat === stat ? sum + e.bonus : sum, 0) : 0;
    let buffBonus = 0;
    if (obj.buffs) {
        obj.buffs.forEach(b => {
            if (b.stat === stat) buffBonus += b.bonus;
        });
    }
    const mpPct = obj && typeof obj.mp === 'number' && typeof obj.maxMp === 'number' && obj.maxMp > 0 ? obj.mp / obj.maxMp : 1;
    let mpBonus;
    if (mpPct >= 0.5) {
        mpBonus = 0.20 * (mpPct - 0.5) / 0.5;
    } else {
        mpBonus = -0.20 * (0.5 - mpPct) / 0.5;
    }
    const totalPctBonus = equipmentBonus + buffBonus + (mpBonus * 100);
    return Math.max(1, Math.floor(base * (1 + totalPctBonus / 100)));
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
        adv.hp = adv.maxHp;  // Full heal on each level up
        adv.mp = adv.maxMp;
    }
}
function findAdv(id){return gameState.adventurers.find(a=>a.id===id);}

function assign(questId, advId){
    const q=gameState.quests.find(q=>q.id===questId);
    if(!q) return;
    if (q.inProgress && !q.training && q.type !== 8) {
        alert("クエスト進行中は冒険者を追加できません");
        return;
    }
    const maxSlots = q.training ? 2 : 4;
    if(q.assigned.length >= maxSlots){
        alert(q.training ? "トレーニングクエストは最大2人までです。" : "クエストは満員です");
        return;
    }
    const adv=findAdv(advId);
    if(!adv) return;
    if(adv.mp <= 0){ alert(`${adv.name}のMPがありません！ポーションで回復するか、回復を待ってください。`); return; }
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
    alert(`クエストを拒否しました！評判 -${penalty.toFixed(1)}`);
    updateDisplays();
}

function buy(i,qty){
    const it=shopItems[i];
    const totalcost = it.cost * qty;
    if(!spendGold(totalcost)) return;
    addToInventory(it, qty);
    updateDisplays();
}



function recruit(i){
    const numPerms = gameState.adventurers.filter(a => !a.temp).length;
    if(numPerms >= gameState.maxPermanentSlots){
        alert('ギルドは満杯です！拡張を購入してさらに募集してください。');
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
    updateDisplays();
}

function firePerm(pIdx){
    const perms=gameState.adventurers.filter(a=>!a.temp);
    const adv=perms[pIdx];
    if (!adv) return;
    if (adv.busy) {
        alert("現在クエスト中の冒険者を解雇できません！");
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
        alert('最大2つまで装備可能です');
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

const shopSections = [
    { title: "アイテム購入", render: renderShopPurchase },
    { title: "今日の素材", render: renderDailyMaterials },
    { title: "ギルド拡張", render: renderGuildExpansion },
    { title: "商人を脅す", render: renderCorruption },
    { title: "アイテム売却", render: renderSellItems }
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
        return '<p class="empty-msg">売却可能なアイテムがありません。</p>';
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
        } else {
            const materialBases = { "鉄鉱石": 30, "薬草": 20, "スパイス": 55, "宝石": 115, "鋼のインゴット": 80, "活力の粉": 60, "魔法の結晶": 150, "炎の粉": 70 };
            basePrice = materialBases[group.name] || 50;
        }

        const variance = Math.floor(basePrice * 0.4);
        const singlePrice = Math.max(5, basePrice + Math.floor(randVariance * (variance * 2 + 1) - variance));
        const totalPrice = singlePrice * count;

        html += `<li class="shop-item">`;
        html += `<strong>${group.name}</strong>`;
        if (group.stat) html += ` <span class="bonus">(+${group.bonus} ${statFull[group.stat]})</span>`;
        if (group.type === 'potion') html += ` <span class="bonus">(${group.restore?.toUpperCase()} +${group.amount})</span>`;
        html += ` <em>x${count}</em> - ${singlePrice}g/個 (合計 ${totalPrice}g)`;
        if (count === 1) {
            html += ` <button class="sell-btn" onclick="sellStackedItem('${group.name}', 1)">売却</button>`;
        } else {
            html += ` <button class="sell-btn" onclick="sellStackedItem('${group.name}', 1)">1つ売却</button>`;
            html += ` <button class="sell-btn all" onclick="sellStackedItem('${group.name}', ${count})">すべて売却</button>`;
        }
        html += `</li>`;
    });
    html += '</ul>';
    return html;
}

function renderCurrentShopPage() {
    const section = shopSections[currentShopPage];
    let html = `<h2 class="shop-title">${section.title}</h2>`;
    html += `<div class="char-nav shop-nav">`;
    html += `<button onclick="prevShopPage()">前</button>`;
    html += `<span class="page-counter">${currentShopPage + 1} / ${shopSections.length}</span>`;
    html += `<button onclick="nextShopPage()">次</button>`;
    html += `</div>`;
    html += section.render();  // Each render function returns a string
    
    // Directly update the DOM
    const contentElement = document.getElementById('shopContent');
    if (contentElement) {
        contentElement.innerHTML = html;
    }
    
    // Also return the html for flexibility (in case any old code expects it)
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
        alert('売却するアイテムが見つかりません。');
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
        const materialBases = { "鉄鉱石": 30, "薬草": 20, "スパイス": 55, "宝石": 115, "鋼のインゴット": 80, "活力の粉": 60, "魔法の結晶": 150, "炎の粉": 70 };
        basePrice = materialBases[name] || 50;
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
        alert('在庫が不足しています。');
        return;
    }

    gameState.gold += totalGold;
    alert(`${name} を ${amount}個 売却しました！ +${totalGold}g`);

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
    if(!gameState.recruitPending.length) return '<h3>募集保留</h3><p>なし</p>';
    let html='<h3>募集保留</h3>';
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

function getQuestsHtml(){
    let html='<h3>利用可能クエスト</h3>';
    gameState.quests.forEach(q=>{
        let typeClass = questTypeClasses[q.type] || '';
        if (q.side) typeClass += ' side';
        if (q.training) typeClass = 'training';
        if (q.playerPosted) {
            if (q.type === 6) typeClass = 'main';
            else if (q.type === 7) typeClass = 'dungeon';
            else if (q.type === 8) typeClass = 'trade';
        }
        const teamStr=q.assigned.reduce((s,id)=>s + getEffectiveStat(findAdv(id), 'strength'), 0);
        const teamWis=q.assigned.reduce((s,id)=>s + getEffectiveStat(findAdv(id), 'wisdom'), 0);
        const teamDex=q.assigned.reduce((s,id)=>s + getEffectiveStat(findAdv(id), 'dexterity'), 0);
        const teamLuk=q.assigned.reduce((s,id)=>s + getEffectiveStat(findAdv(id), 'luck'), 0);
        let estDays = 'N/A';
        let chance = 0;
        const maxSlots = q.training ? 2 : 4;
        if (q.assigned.length > 0) {
            if (q.training) {
                estDays = '1日';
                chance = 100;
            } else if (q.defense) {
                estDays = 'Today: Battle';
                chance = 'Tactical Combat';
            } else if (q.type === 8) {
                const meetsAll = teamDex >= q.minDexterity && teamLuk >= q.minLuck;
                if (!meetsAll) {
                    estDays = '失敗 (DEX/LUC不足)';
                    chance = 0;
                } else {
                    let days;
                    if (q.inProgress && q.tradeRemainingDays !== undefined && q.tradeRemainingDays > 0) {
                        days = q.tradeRemainingDays;
                        estDays = `${days}日残り (確定成功)`;
                    } else {
                        const avgDex = teamDex / q.assigned.length || 1;
                        const avgLuc = teamLuk / q.assigned.length || 1;
                        days = calcTradeRequiredDays(avgDex, avgLuc);
                        estDays = q.inProgress ? `${days}日残り (確定成功)` : `${days}日 (確定成功)`;
                    }
                    chance = 100;
                }
            } else {
                const meetsAll = teamStr >= q.minStrength && teamWis >= q.minWisdom && teamDex >= q.minDexterity && teamLuk >= q.minLuck;
                if (!meetsAll) {
                    estDays = '失敗';
                    chance = 0;
                } else {
                    let teamFocus = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), q.focusStat), 0);
                    const excess = (teamFocus / q.minFocus) - 1;
                    const prob = Math.min(0.5, 0.1 + Math.max(0, excess) * 0.2);
                    chance = Math.round(prob * 100);
                    estDays = Math.max(1, Math.ceil(1 / prob));
                }
            }
        }
        let assignedHtml = '';
        q.assigned.forEach(id=>{
            const a=findAdv(id);
            if(a){
                if(q.inProgress){
                    const nameHtml = getNameHtml(a);
                    assignedHtml += `<span class="assigned-adventurer"><img src="${a.image}" class="adventurer-img">${nameHtml}</span>`;
                } else {
                    const nameHtml = getNameHtml(a);
                    assignedHtml += `<span class="assigned-adventurer"><img src="${a.image}" class="adventurer-img">${nameHtml} <button class="cancel-btn" onclick="unassign(${q.id}, ${id})">X</button></span>`;
                }
            }
        });
        const minHtml = `<img src="Images/STR.png" class="stat-icon" title="筋力"> 筋力 ${q.minStrength} | <img src="Images/WIS.png" class="stat-icon" title="知恵"> 知恵 ${q.minWisdom} | <img src="Images/DEX.png" class="stat-icon" title="敏捷"> 敏捷 ${q.minDexterity} | <img src="Images/LUC.png" class="stat-icon" title="運"> 運 ${q.minLuck}`;
        const teamHtml = `<img src="Images/STR.png" class="stat-icon" title="筋力"> 筋力 ${teamStr} | <img src="Images/WIS.png" class="stat-icon" title="知恵"> 知恵 ${teamWis} | <img src="Images/DEX.png" class="stat-icon" title="敏捷"> 敏捷 ${teamDex} | <img src="Images/LUC.png" class="stat-icon" title="運"> 運 ${teamLuk}`;
        html+=`<div class="quest-card ${typeClass}" data-quest-id="${q.id}"
                 ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="dragLeave(event)">
            <h3>${q.desc}</h3>`;
        if (q.training) {
            html += `<p><strong>常時利用可能なトレーニングクエスト（最大2人）</strong></p>`;
            html += `<p>低いレベルの冒険者はペアの高いレベル相当のEXPを獲得。リスクなし、報酬なし。</p>`;
            html += `<p>難易度: ${q.difficulty}（固定） | 必要ステータス: 全て0</p>`;
        } else {
            html += `<p>難易度: ${q.difficulty} | 残り日数: ${q.daysLeft} | 報酬: ${q.reward}g</p>`;
            if (q.defense) {
                html += `<p><strong style="color:red;">防衛クエスト - 1-4人の防衛者を割り当てなければゲームオーバー！</strong></p>`;
            }
            if (!q.defense && !q.playerPosted) {
                html += `<p>必要: ${minHtml}</p>`;
            }
        }
        html += `<p>予想日数: ${estDays}</p>
            <p>チーム: ${teamHtml} | 成功確率: ${chance}%</p>
            <div>割り当て済み (${q.assigned.length}/${maxSlots}): ${assignedHtml}</div>`;
        if(q.assigned.length === 0 && !q.inProgress && !q.defense && !q.training && !q.playerPosted){
            const rejectPenalty = (0.1 * q.difficulty).toFixed(1);
            html += `<p><button onclick="rejectQuest(${q.id})" style="background:#e74c3c; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">クエスト拒否 (評判 -${rejectPenalty})</button></p>`;
        }
        if(q.inProgress){
            html += `<p class="in-progress">進行中 - 冒険者の割り当て解除不可</p>`;
        }
        html += `</div>`;
    });
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
    const estimatedTax = Math.floor(Math.floor((next_tax_day) * 10));
    let taxDisplay;
    if (daysUntilTax === 0) {
        taxDisplay = `今日の税金: ${estimatedTax}g`;
    } else {
        taxDisplay = `${daysUntilTax}日後の税金: ${estimatedTax}g`;
    }
    let status = '';
    if (gameState.gameOver) {
        status = ' | <span style="color:red; font-weight:bold;">ゲームオーバー</span>';
    }
    document.getElementById('day').innerHTML=`<h2>日 ${gameState.day} | ゴールド: ${gameState.gold} | 評判: ${Math.max(0, gameState.reputation.toFixed(0))} | ${taxDisplay}${status}</h2>`;
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
    gameState.adventurers.forEach(a=>{
        if(!a.temp && !a.busy){
            a.hp=Math.min(a.maxHp, (a.hp || 0) + Math.floor(a.maxHp*0.1));
            a.mp=Math.min(a.maxMp, (a.mp || 0) + Math.floor(a.maxMp*0.1));
        }
        if (a.buffs) {
            a.buffs = a.buffs.filter(b => b.daysLeft > 1);
            a.buffs.forEach(b => b.daysLeft--);
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

    if (gameState.day > 30 && Math.random() < 0.1 && !gameState.quests.some(q => q.defense)) {
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
    queueQuestCompletionDialogue(TutorialDialogue);
}

function processQuestOutcome(q, eventDay, success, lowStatusFail, goldOverride = null) {

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
            gameState.eventHistory.unshift({day: eventDay, message: deathMsg});
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
            for (let i = 0; i < 4; i++) {
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
            extraMsg += `<br>ダンジョン${q.floor}階の宝: +${treasureGold}g`;
            let rareStat = ['strength','wisdom','dexterity','luck'][Math.floor(Math.random()*4)];
            let rareBonus = 5 + q.floor * 5;
            let rareItemName = `ダンジョン${q.floor}階の${statFull[rareStat]}リング`;
            addToInventory({name: rareItemName, stat: rareStat, bonus: rareBonus, id: gameState.nextId++},1);
            extraMsg += `<br>${rareItemName}発見！`;
        } else if (q.type === 8) {
            let td = q.tradeData;
            let cityItem = cities.find(c => c.name === td.city)?.items[0];
            if (!cityItem) {
                extraMsg += `<br>都市データエラー。`;
            } else {
                const currentPrice = gameState.dailyPrices[td.city][cityItem.name];
                const tradeSuccess = currentPrice <= td.maxPrice;
                const qty = td.qty;
                const actualCost = tradeSuccess ? currentPrice * qty : 0;
                const refund = td.deductedGold - actualCost;
                gameState.gold += refund;
                if (tradeSuccess) {
                    for (let k = 0; k < qty; k++) {
                        addToInventory({
                            name: td.item,
                            minPrice: Math.floor(currentPrice * 1.2),
                            maxPrice: Math.floor(currentPrice * 1.5),
                            id: gameState.nextId++
                        },1);
                    }
                    extraMsg += `<br>${td.item} x${qty}個を${currentPrice}g/個で購入成功！返金${refund}g。`;
                } else {
                    extraMsg += `<br>価格${currentPrice}g > 最大${td.maxPrice}gで失敗。全額${td.deductedGold}g返金。`;
                }
            }
        } else if (q.type === 2) {
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
        } else if (QuestCompletionDialogue[q.questType]?.[q.rank]?.[q.questStoryindex]) {
            const key = `${q.questType}-${q.rank}-${q.questStoryindex}`;
            if (!gameState.seenCompletionDialogues.has(key)) {
                const dialogue = QuestCompletionDialogue[q.questType][q.rank][q.questStoryindex];
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
            defending: false,
            action: null,
            target: null
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
        gameState.eventHistory.unshift({day: evDay, message: `税金の日！${tax}g を徴収。`});
        checkGameOver();
    }

    // 通常クエスト処理（防衛・ダンジョンはスキップ）
    for (let i = gameState.quests.length - 1; i >= 0; i--) {
        const q = gameState.quests[i];
        if (q.defense || q.type === 7) continue;  // 戦闘クエストは後で特殊処理

        if (q.type === 8) {
            // 貿易処理（変更なし）
            if (q.assigned.length === 0) continue;
            if (!q.inProgress) {
                const teamDex = q.assigned.reduce((sum, id) => sum + getEffectiveStat(findAdv(id), 'dexterity'), 0);
                const teamLuk = q.assigned.reduce((sum, id) => sum + getEffectiveStat(findAdv(id), 'luck'), 0);
                if (teamDex < q.minDexterity || teamLuk < q.minLuck) {
                    q.assigned.forEach(id => {
                        const adv = findAdv(id);
                        if (adv) adv.busy = false;
                    });
                    q.assigned = [];
                    gameState.eventHistory.unshift({day: evDay, message: `貿易クエスト "${q.desc}" 開始失敗: DEXまたはLUC不足。`});
                    continue;
                }
                const qty = q.tradeData.qty;
                const maxPrice = q.tradeData.maxPrice;
                const neededGold = qty * maxPrice;
                if (gameState.gold < neededGold) {
                    q.assigned.forEach(id => {
                        const adv = findAdv(id);
                        if (adv) adv.busy = false;
                    });
                    q.assigned = [];
                    gameState.eventHistory.unshift({day: evDay, message: `貿易クエスト "${q.desc}" 開始失敗: 予算不足 (必要${neededGold}g)。`});
                    continue;
                }
                gameState.gold -= neededGold;
                q.inProgress = true;
                const avgDex = teamDex / q.assigned.length;
                const avgLuc = teamLuk / q.assigned.length;
                q.tradeRemainingDays = calcTradeRequiredDays(avgDex, avgLuc);
                q.deductedGold = neededGold;
                q.originalRequiredDays = q.tradeRemainingDays;
                gameState.eventHistory.unshift({day: evDay, message: `貿易クエスト開始: ${q.desc} (${q.tradeRemainingDays}日予定、予算${neededGold}g扣除)`});
            } else {
                q.tradeRemainingDays--;
                if (q.tradeRemainingDays <= 0) {
                    const city = q.tradeData.city;
                    const itemName = q.tradeData.item;
                    const qty = q.tradeData.qty;
                    const maxPrice = q.tradeData.maxPrice;
                    const currentPrice = gameState.dailyPrices[city][itemName];
                    const success = currentPrice <= maxPrice;
                    const actualCost = success ? currentPrice * qty : 0;
                    const refund = q.deductedGold - actualCost;
                    gameState.gold += refund;
                    let msg = success 
                        ? `貿易成功！${itemName} x${qty}を${currentPrice}g/個で購入（総${actualCost}g）。返金${refund}g。`
                        : `貿易失敗：価格${currentPrice}g > 最大${maxPrice}g。全額${q.deductedGold}g返金。`;
                    if (success) {
                        for (let k = 0; k < qty; k++) {
                            addToInventory({
                                name: itemName,
                                minPrice: Math.floor(currentPrice * 1.2),
                                maxPrice: Math.floor(currentPrice * 1.5),
                                id: gameState.nextId++
                            },1);
                        }
                        const expGain = 20 * q.originalRequiredDays;
                        q.assigned.forEach(id => {
                            const adv = findAdv(id);
                            if (adv) {
                                adv.exp += expGain;
                                levelUp(adv);
                                adv.busy = false;
                            }
                        });
                        msg += `<br>全員EXP +${expGain}獲得！`;
                    } else {
                        q.assigned.forEach(id => {
                            const adv = findAdv(id);
                            if (adv) adv.busy = false;
                        });
                    }
                    gameState.eventHistory.unshift({day: evDay, message: `貿易クエスト完了: ${q.desc}<br>${msg}`});
                    q.assigned = [];
                    gameState.quests.splice(i, 1);
                }
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
                gameState.eventHistory.unshift({day: evDay, message: `無視されたクエスト "${q.desc}" が期限切れ。評判 -${penalty}。`});
            }
            gameState.quests.splice(i, 1);
        }
    }

    // ===== 戦闘クエスト特殊処理 =====
    // まず割り当てなしの戦闘クエストを処理（防衛のみゲームオーバー）
    const unassignedDefense = gameState.quests.find(q => q.defense && q.assigned.length === 0);
    if (unassignedDefense) {
        gameState.eventHistory.unshift({day: evDay, message: `防衛クエスト失敗！誰も割り当てられず、ギルドは崩壊。ゲームオーバー！`});
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

        const titleText = currentQ.defense ? `防衛戦: ${currentQ.desc}` : `ダンジョン${currentQ.floor}階探索: ${currentQ.desc}`;

        document.getElementById('battleTitle').innerHTML = titleText;
        document.getElementById('battleModal').style.display = 'flex';
        renderBattle();

        crossfadeTo('battleBgm', 1500);

        return; // 戦闘中は日処理中断
    }

    // 戦闘クエストがなければ通常終了
    checkGameOver();
    showModal(evDay);
}

function renderBattle() {
    if (!currentBattle) return;
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
        teamHtml += `
            <div class="battle-ally ${selectableClass} ${highlightClass}" id="div_${adv.id}" data-id="${adv.id}" ${selectableClass ? `onclick="selectTarget('${adv.id}')"` : ''}>
                <img src="Images/${adv.image}" class="adventurer-img" alt="${adv.name}">
                ${getNameHtml(adv)}
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                HP ${Math.floor(adv.hp)}/${adv.maxHp}
                <div class="progress-bar"><div class="progress-fill ap-fill" style="width:${apPct}%"></div></div>
                AP ${adv.currentAp || 0}/5
                Crit Chance: ${adv.critChance || 0}%
                ${actionHtml ? `<div class="ally-actions">${actionHtml}</div>` : ''}
            </div>
        `;
    });
    teamHtml += '</div></div>';

    document.getElementById('battleContent').innerHTML = topHtml + enemiesHtml + teamHtml;
}
function getCharType(adv) {
    const img = (adv.image || '').toLowerCase();
    if (img.includes('str_')) return 'STR';
    if (img.includes('wis_')) return 'WIS';
    if (img.includes('dex_')) return 'DEX';
    if (img.includes('luc_')) return 'LUC';

    // Fallback: highest stat
    const stats = {
        strength: getEffectiveStat(adv, 'strength'),
        wisdom: getEffectiveStat(adv, 'wisdom'),
        dexterity: getEffectiveStat(adv, 'dexterity'),
        luck: getEffectiveStat(adv, 'luck')
    };
    let max = -1;
    let type = 'STR';
    if (stats.strength > max) { max = stats.strength; type = 'STR'; }
    if (stats.wisdom > max) { max = stats.wisdom; type = 'WIS'; }
    if (stats.dexterity > max) { max = stats.dexterity; type = 'DEX'; }
    if (stats.luck > max) type = 'LUC';
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
        skills.push({ action: 'light', icon: `${type}_lightattack_icon.jpg`, desc: 'Light Attack (1 AP, deals 100% STR/WIS damage)', cost: 1 });
        skills.push({ action: 'heavy', icon: `${type}_heavyattack_icon.jpg`, desc: 'Heavy Attack (3 AP, deals 350% STR/WIS damage)', cost: 3 });
        skills.push({ action: 'defense', icon: 'Defense_icon.jpg', desc: 'Defense (+1 AP, block 25% damage)', cost: -1 });
        skills.push({ action: 'counter', icon: 'Counter_icon.jpg', desc: 'Counter Attack (2 AP, evade next attack, deals damage back to attacker)', cost: 2 }); // Assume Counter_icon.jpg or add

        if (type === 'STR') {
            skills.push({ action: 'protect', icon: 'STR_protection_icon.jpg', desc: 'Protect (3 AP, block 50% damage for whole team [2 rounds])', cost: 3 });
        } else if (type === 'WIS') {
            skills.push({ action: 'explosion', icon: 'WIS_explosion_icon.jpg', desc: 'Explosion (5 AP, deals 150% WIS damage to all enemies)', cost: 5 });
        } else if (type === 'DEX') {
            skills.push({ action: 'stunning', icon: 'DEX_stunning_icon.png', desc: 'Stunning Strike (3 AP), deal 100% STR/WIS damage, stun enemy for 1 round', cost: 3 }); // Assume you add this
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
        if (maleNames.includes(actor.name)) {
            return 'M';
        }
        if (femaleNames.includes(actor.name)) {
            return 'F';
        }

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

            if (action.type === 'heavy') basePercent = 350, isHeavy = true;
            if (action.type === 'stunning') basePercent = 100;
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

    let baseStat = opts.isLuc ? getEffectiveStat(attacker, 'luck') :
                   opts.isWis ? getEffectiveStat(attacker, 'wisdom') :
                   Math.max(getEffectiveStat(attacker, 'strength'), getEffectiveStat(attacker, 'wisdom'));

    let dmg = baseStat * opts.basePercent / 100;
    if (dmg === 0) {
        addBattleLog(`${attacker.name}'s attack has no effect on ${target.name}!`);
        return [{ targetId: target.id, dmg: 0, miss: true, crit: false }];
    }

    dmg *= (0.9 + Math.random() * 0.2);

    const popupInfos = [];

    /* === カウンターを最優先でチェック === */
    if (target.activeCounter && !opts.isAoE && opts.basePercent > 0) {
        addBattleLog(`${target.name} counters the attack!`);
        counterTriggerSound.currentTime = 0;
        counterTriggerSound.play().catch(e => console.log('Audio play error:', e));

        // メイン攻撃は完全にブロック（ダメージ0、クリティカルも発生しない）
        popupInfos.push({ targetId: target.id, dmg: 'Counter!', miss: true, crit: false });

        // 反撃ダメージ計算（カウンターはクリティカルなし、元のコード通り）
        let retDmg = Math.max(getEffectiveStat(target, 'strength'), getEffectiveStat(target, 'wisdom')) * (opts.isHeavy ? 350 : 100) / 100;
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
    const evasion = Math.min(90, baseEv + (target.activeEvadeBonus ? 15 : 0));
    if (Math.random() * 100 < evasion) {
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
    crossfadeTo('bgm', 2000);

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
                    gameState.eventHistory.unshift({ 
                        day: day, 
                        message: `${battleAdv.name} が戦闘で死亡しました！ 評判 -10。` 
                    });
                    const idx = gameState.adventurers.findIndex(a => a.id === battleAdv.id);
                    if (idx > -1) gameState.adventurers.splice(idx, 1);
                } else {
                    gameState.eventHistory.unshift({ 
                        day: day, 
                        message: `${battleAdv.name} が戦闘で失われました。` 
                    });
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

        crossfadeTo('battleBgm', 1500);

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
                const recipes = f === 'blacksmith' ? blacksmithRecipes : tavernRecipes;
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
    const recipes = fac === 'blacksmith' ? blacksmithRecipes : tavernRecipes;
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
            <button class="quest-type-btn" onclick="showStoryQuest()">ストーリークエスト（メイン）</button>
            <button class="quest-type-btn" onclick="showDungeonQuest()">ダンジョンクエスト</button>
            <button class="quest-type-btn" onclick="showTradeQuest()">トレードクエスト</button>
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
                    <label>階層: <input type="number" id="dungeonFloor" min="1" value="1"></label>
                    <div class="form-buttons">
                        <button class="post-btn" onclick="postGuildQuest()">投稿</button>
                    </div>
                </div>`;
    content.innerHTML = html;
}

function showTradeQuest() {
    currentGuildQuestType = 'trade';

    const content = document.getElementById('guildQuestsContent');
    content.style.backgroundImage = "url('Images/TradingQuest_Background.jpg')";

    let html = `<div class="gq-panel">
                    <button class="back-btn" onclick="showMainSelection()">戻る</button>
                    <label>都市: <select id="tradeCity" onchange="updateTradeInfo()">`;
    cities.filter(c => !c.guild).forEach(c => html += `<option value="${c.name}">${c.name}</option>`);
    html += `</select></label>
            <div id="tradeInfo"></div>
            <label>数量: <input type="number" id="tradeQty" value="5" min="1"></label><br><br>
            <label>最大単価: <input type="number" id="tradeMaxPrice" value="0"></label>
            <div class="form-buttons">
                <button class="post-btn" onclick="postGuildQuest()">投稿</button>
            </div>
        </div>`;
    content.innerHTML = html;
    updateTradeInfo();
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

function updateAlchemyPreview() {
    const ing1 = document.getElementById('alchemyIng1')?.value;
    const ing2 = document.getElementById('alchemyIng2')?.value;
    const qty = parseInt(document.getElementById('alchemyQty')?.value) || 1;
    const preview = document.getElementById('alchemyPreview');
    if (!preview || !ing1 || !ing2 || ing1 === ing2) {
        preview.innerHTML = '<p style="color:#aaa;">異なる材料を2つ選択するとレシピが表示されます</p>';
        return;
    }

    const sorted = [ing1, ing2].sort();
    const recipe = alchemyRecipes.find(r => {
        const rSorted = [...r.inputs].sort();
        return rSorted[0] === sorted[0] && rSorted[1] === sorted[1];
    });

    if (!recipe) {
        preview.innerHTML = '<p style="color:#ff6b6b;">この組み合わせのレシピはありません</p>';
        return;
    }

    const have1 = countItem(ing1);
    const have2 = countItem(ing2);
    const canMake = have1 >= qty && have2 >= qty;

    preview.innerHTML = `
        <p><strong>出力:</strong> ${recipe.output.name} ×${qty}</p>
        <p><strong>必要材料:</strong></p>
        <p style="color:${have1 >= qty ? '#ffffff' : '#ff6b6b'};">・${ing1} ×${qty} (保有: ${have1}個)</p>
        <p style="color:${have2 >= qty ? '#ffffff' : '#ff6b6b'};">・${ing2} ×${qty} (保有: ${have2}個)</p>
        <p style="margin-top:15px; color:${canMake ? '#27ae60' : '#ff6b6b'};"><strong>${canMake ? '作成可能' : '材料不足'}</strong></p>
    `;
}

function performAlchemy() {
    const ing1 = document.getElementById('alchemyIng1').value;
    const ing2 = document.getElementById('alchemyIng2').value;
    const qty = parseInt(document.getElementById('alchemyQty').value) || 1;

    if (!ing1 || !ing2 || ing1 === ing2) {
        alert('異なる有効な材料を2つ選択してください。');
        return;
    }

    const sortedInputs = [ing1, ing2].sort();
    const recipe = alchemyRecipes.find(r => {
        const rInputs = [...r.inputs].sort();
        return rInputs[0] === sortedInputs[0] && rInputs[1] === sortedInputs[1];
    });

    if (!recipe) {
        alert('この組み合わせにはレシピがありません。');
        return;
    }

    if (countItem(ing1) < qty || countItem(ing2) < qty) {
        alert('材料が不足しています！');
        return;
    }

    removeItems(ing1, qty);
    removeItems(ing2, qty);
    addToInventory(recipe.output, qty);

    const optionsHtml = getAlchemyMaterialOptions();
    document.getElementById('alchemyIng1').innerHTML = optionsHtml;
    document.getElementById('alchemyIng2').innerHTML = optionsHtml;
    updateAlchemyPreview();

    alert(`${recipe.output.name} を ${qty}個 作成しました！`);
    renderFacilities(); // 在庫更新のため再描画
}

function orderTavernItem(recipeIdx) {
    const r = tavernRecipes[recipeIdx];
    if (gameState.gold < r.cost) {
        alert('ゴールドが不足しています');
        return;
    }

    // 素材チェック（あれば）
    if (r.materials) {
        for (let m of r.materials) {
            if (countItem(m.name) < (m.qty || 1)) {
                alert('素材が不足しています');
                return;
            }
        }
    }

    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) {
        alert('永久冒険者がいないため適用できません');
        return;
    }

    // 冒険者選択リスト（画像を小さめの円形で表示）
    let selectHtml = `<div style="margin:40px 0; padding:30px; background:rgba(255,255,255,0.15); border-radius:16px;">
        <p style="font-size:1.4em; margin-bottom:25px; text-align:center;"><strong>${r.name}</strong> を注文（${r.cost}g）<br>
        適用する冒険者を選択してください</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:20px;">`;

    perms.forEach(adv => {
        selectHtml += `<div style="text-align:center; padding:15px; background:rgba(255,255,255,0.1); border-radius:12px;">
            <!-- 小さめ（80px）の円形ポートレート（歪みなし、適切なクロップ） -->
            <div style="width:80px; height:80px; border-radius:50%; overflow:hidden; margin:0 auto 12px; box-shadow:0 4px 12px rgba(0,0,0,0.4); border:2px solid rgba(255,255,255,0.3);">
                <img src="${adv.image}" style="width:100%; height:100%; object-fit:cover; object-position:center top;">
            </div>
            <strong style="font-size:1.2em; display:block; margin-bottom:8px;">${adv.name}</strong>
            <button onclick="applyTavernBuff(${recipeIdx}, ${adv.id})" style="padding:10px 24px; background:#27ae60; font-size:1.1em; border:none; border-radius:8px;">適用</button>
        </div>`;
    });

    selectHtml += `</div>
        <div style="text-align:center; margin-top:30px;">
            <button onclick="renderFacilities()" style="padding:10px 24px; background:#e74c3c; font-size:1.1em; border:none; border-radius:8px;">キャンセル</button>
        </div>
    </div>`;

    document.querySelector('.facility-panel').insertAdjacentHTML('beforeend', selectHtml);
}
function applyTavernBuff(recipeIdx, advId) {
    const r = tavernRecipes[recipeIdx];
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

    alert(`${adv.name} に ${r.name} を適用しました！（${buffCopy.days}日間有効）`);
    renderFacilities();
    if (typeof updateGold === 'function') updateGold();
}

function produceBlacksmith(recipeIdx) {
    const r = blacksmithRecipes[recipeIdx];
    if (gameState.gold < r.cost) {
        alert('ゴールドが不足しています');
        return;
    }
    if (r.materials) {
        for (let m of r.materials) {
            if (countItem(m.name) < (m.qty || 1)) {
                alert('素材が不足しています');
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
    alert(`${r.name} を製作しました！`);
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
            <div id = "renderedfacilitiesContent" style="text-align:center; padding:60px;">
                <h2>街</h2>
                <h2 style="font-size:1.6em; margin:40px 0;">施設を選択してください</h2>
                <div class="buttons" style="gap:30px; flex-wrap:wrap;">
                    <button onclick="selectFacility('blacksmith')" style="padding:40px 40px; font-size:1.4em; background:rgba(231,76,60,0.9);">鍛冶屋</button>
                    <button onclick="selectFacility('tavern')" style="padding:40px 40px; font-size:1.4em; background:rgba(52,152,219,0.9);">酒場</button>
                    <button onclick="selectFacility('alchemy')" style="padding:40px 40px; font-size:1.4em; background:rgba(46,204,113,0.9);">錬金工房</button>
                </div>
            </div>
        `;
    } else {
        let bgFile = '';
        let title = '';
        let recipes = [];

        if (currentFacility === 'blacksmith') {
            bgFile = '鍛冶屋.jpg';
            title = '鍛冶屋';
            recipes = blacksmithRecipes;
        } else if (currentFacility === 'tavern') {
            bgFile = '酒場.jpg';
            title = '酒場';
            recipes = tavernRecipes;
        } else if (currentFacility === 'alchemy') {
            bgFile = '錬金工房.jpg';
            title = '錬金工房';
            recipes = alchemyRecipes;
        }

        modalContent.style.backgroundImage = `url('Images/${bgFile}')`;

        const level = gameState.facilities[currentFacility];
        let html = `<div class="facility-panel">
            <h2>${title}　レベル ${level}</h2>
            <div style="text-align:center; margin:30px 0;">
                <button onclick="currentFacility=null; renderFacilities()" style="padding:14px 36px; background:#87878777; font-size:1em;">街に戻る</button>
            </div>`;

        // アップグレード（施設ごとに最大レベル対応）
        const maxLevel = facilityMaxLevels[currentFacility] || 4;  // 安全策（未定義時は4）
        if (level < maxLevel) {
            const nextCost = facilityUpgradeCosts[currentFacility][level];
            html += `
                <div style="text-align:center; margin:30px 0;">
                    <p style="font-size:1.4em;">
                        レベル ${level} → ${level + 1} アップグレード費用：${nextCost} gold
                    </p>
                    <button onclick="upgradeFacility('${currentFacility}')" 
                            ${gameState.gold < nextCost ? 'disabled style="background:#777;"' : ''} 
                            style="padding:14px 40px; font-size:1.4em;">
                        アップグレード
                    </button>
                </div>`;
        } else {
            html += `
                <div style="text-align:center; margin:30px 0;">
                    <p style="font-size:1.6em; color:#ffd700;">
                        最大レベル ${maxLevel} に到達しました！
                    </p>
                </div>`;
        }

        if (level > 0 && recipes.length > 0) {
            html += `<h3 style="text-align:center; margin-top:40px;">製作可能アイテム</h3>
                     <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px; margin-top:30px;">`;

            let hasItems = false;

            recipes.forEach((r, originalIndex) => {
                if (r.level > level) return;  // レベル不足は非表示

                hasItems = true;

                const cost = r.cost || 0;
                let canMake = gameState.gold >= cost;

                // 必要素材取得（錬金はinputs、それ以外はmaterials）
                const materials = currentFacility === 'alchemy' 
                    ? r.inputs.map(name => ({name, qty: 1}))
                    : (r.materials || []);

                let matHtml = '<p style="margin:15px 0;"><strong>必要素材:</strong></p>';
                if (materials.length > 0) {
                    materials.forEach(m => {
                        const have = countItem(m.name);
                        canMake = canMake && have >= m.qty;
                        const color = have >= m.qty ? '#ffffff' : '#ff6b6b';
                        matHtml += `<p style="color:${color}; margin:5px 0;">・${m.name} ×${m.qty} (保有: ${have}個)</p>`;
                    });
                } else {
                    matHtml += '<p style="color:#aaaaaa; margin:5px 0;">・なし</p>';
                }

                // アイテム名表示（錬金は「A + B → 出力」形式）
                const itemName = currentFacility === 'alchemy' 
                    ? `${r.inputs.join(' + ')} → ${r.output.name}`
                    : r.name;

                // 効果表示
                let effectHtml = '';
                if (currentFacility === 'blacksmith') {
                    const statText = {
                        strength: 'STR',
                        wisdom: 'WIS',
                        dexterity: 'DEX',
                        luck: 'LUC'
                    }[r.stat] || r.stat.toUpperCase();
                    effectHtml = `<p style="margin:12px 0; color:#ffeb3b; font-weight:bold; font-size:1.1em;">
                                    装備効果: ${statText} +${r.bonus}%
                                  </p>`;
                } else if (currentFacility === 'tavern') {
                    if (r.buff.stat) {
                        const statText = {
                            strength: 'STR',
                            wisdom: 'WIS',
                            dexterity: 'DEX',
                            luck: 'LUC'
                        }[r.buff.stat] || r.buff.stat.toUpperCase();
                        const percent = r.buff.percent ? '%' : '';
                        effectHtml = `<p style="margin:12px 0; color:#81ff81; font-weight:bold; font-size:1.1em;">
                                        バフ効果: ${statText} +${r.buff.bonus}${percent}<br>
                                        持続: ${r.buff.days}日間
                                      </p>`;
                    } else if (r.buff.type) {
                        const typeText = r.buff.type === 'hpRegen' ? 'HP再生' : 'MP再生';
                        effectHtml = `<p style="margin:12px 0; color:#81ff81; font-weight:bold; font-size:1.1em;">
                                        バフ効果: ${typeText} +${r.buff.bonus}<br>
                                        持続: ${r.buff.days}日間
                                      </p>`;
                    }
                } else if (currentFacility === 'alchemy' && r.output.type === 'potion') {
                    const restoreText = r.output.restore === 'hp' ? 'HP回復' : 'MP回復';
                    effectHtml = `<p style="margin:12px 0; color:#a0f7a0; font-weight:bold; font-size:1.1em;">
                                    効果: ${restoreText} +${r.output.amount}
                                  </p>`;
                }

                // ボタン設定
                let buttonText, onclick;
                if (currentFacility === 'alchemy') {
                    buttonText = '合成';
                    onclick = `craftAlchemyRecipe(${originalIndex})`;
                } else if (currentFacility === 'tavern') {
                    buttonText = '注文（冒険者選択）';
                    onclick = `orderTavernItem(${originalIndex})`;
                } else {
                    buttonText = '製作';
                    onclick = `produceBlacksmith(${originalIndex})`;
                }

                html += `
                    <div class="facility-item">
                        <h3>${itemName}</h3>
                        ${effectHtml}
                        <p>コスト：${cost} gold</p>
                        ${matHtml}
                        <button onclick="${onclick}" 
                                ${!canMake ? 'disabled style="background:#777;"' : ''}
                                style="margin-top:15px; padding:12px 30px; font-size:1.2em;">
                            ${buttonText}
                        </button>
                    </div>`;
            });

            if (!hasItems) {
                html += `<p style="grid-column:1/-1; text-align:center; font-size:1.4em;">レベルを上げると新しいレシピが解放されます</p>`;
            }

            html += `</div>`;
        } else {
            html += `<p style="text-align:center; font-size:1.4em; margin-top:40px;">施設をアップグレードすると利用可能になります</p>`;
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

function craftAlchemyRecipe(index) {
    const recipe = alchemyRecipes[index];
    if (!recipe) {
        alert("無効なレシピです。");
        return;
    }

    // コストチェック（alchemyRecipesにcostがなければ0）
    const cost = recipe.cost || 0;
    if (gameState.gold < cost) {
        alert("ゴールドが不足しています！");
        return;
    }

    // 入力素材チェック（inputsは配列、qtyは常に1）
    for (const inputName of recipe.inputs) {
        const have = countItem(inputName);
        if (have < 1) {
            alert(`素材不足: ${inputName} が足りません！`);
            return;
        }
    }

    // 消費処理
    if (cost > 0) {
        gameState.gold -= cost;
    }
    for (const inputName of recipe.inputs) {
        removeFromInventory(inputName, 1);  // 1個消費（スタック対応関数を想定）
    }

    // 出力追加
    const output = recipe.output;
    let itemToAdd = {
        name: output.name,
        type: output.type  // 'material' or 'potion'
    };

    // ポーションの場合、restore/amount/minPrice/maxPriceを付与
    if (output.type === 'potion') {
        itemToAdd.restore = output.restore;
        itemToAdd.amount = output.amount;
    }

    // 売却価格（min/max）
    if (output.minPrice !== undefined && output.maxPrice !== undefined) {
        itemToAdd.minPrice = output.minPrice;
        itemToAdd.maxPrice = output.maxPrice;
    }

    addToInventory(itemToAdd, 1);

    // 成功メッセージ
    let msg = `${output.name} を合成しました！`;
    if (output.type === 'potion') {
        const restoreText = output.restore === 'hp' ? 'HP' : 'MP';
        msg += ` (${restoreText} +${output.amount})`;
    }
    alert(msg);

    // UI更新
    updateDisplays();
    renderFacilities();  // レシピリスト再描画（在庫変化反映）
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
        alert('この施設はすでに最大レベルです');
        return;
    }

    const cost = facilityUpgradeCosts[fac][currentLevel];

    if (gameState.gold >= cost) {
        gameState.gold -= cost;
        gameState.facilities[fac]++;
        renderFacilities();
        if (typeof updateGold === 'function') updateGold();
        alert(`${fac} がレベル ${gameState.facilities[fac]} にアップグレードされました！`);
    } else {
        alert('ゴールドが不足しています');
    }
    updateDisplays();
}




function craftFacilityItem(fac, recipeIdx) {
    const recipes = fac === 'blacksmith' ? blacksmithRecipes :
                    fac === 'tavern' ? tavernRecipes : alchemyRecipes;
    const r = recipes[recipeIdx];
    if (!r) return;

    const cost = r.cost || 0;
    if (gameState.gold < cost) { alert('ゴールド不足'); return; }

    // 素材チェック
    if (r.materials) {
        for (let m of r.materials) {
            if (countItem(m.name) < (m.qty || 1)) {
                alert('素材不足');
                return;
            }
        }
    }

    // 消費
    gameState.gold -= cost;
    if (r.materials) {
        for (let m of r.materials) {
            removeItems(m.name, m.qty || 1);
        }
    }

    // 生産
    if (fac === 'alchemy') {
        addToInventory(r.output);
        alert(`${r.output.name} を製作しました！`);
    } else if (fac === 'blacksmith') {
        addToInventory({name: r.name, stat: r.stat, bonus: r.bonus});
        alert(`${r.name} を製作しました！`);
    } else if (fac === 'tavern') {
        const perms = gameState.adventurers.filter(a => !a.temp);
        if (perms.length === 0) {
            alert('永久冒険者がいないため適用できません');
            gameState.gold += cost;  // 返金
            return;
        }
        const target = perms[Math.floor(Math.random() * perms.length)];
        const buffCopy = JSON.parse(JSON.stringify(r.buff));
        buffCopy.daysLeft = buffCopy.days;
        target.buffs.push(buffCopy);
        alert(`${target.name} に ${r.name} を適用しました！（${buffCopy.days}日間有効）`);
    }

    renderFacilities();
    if (typeof updateGold === 'function') updateGold();
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
            alert('すべてのメインクエストを完了しました！');
            return;
        }

        if (gameState.quests.some(q => q.type === 6)) {
            alert('既にメインクエストが進行中です。現在のメインクエストを完了してください。');
            return;
        }

        let mq = mainQuests[gameState.mainProgress];
        if (gameState.reputation < (mq.repRequired || 0)) {
            alert(`評判が不足しています（必要: ${mq.repRequired || 0} / 現在: ${gameState.reputation}）。`);
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
            alert('エラー: ダンジョン階層の入力が見つかりません。');
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
    } else if (type === 'trade') {
        let cityEl = document.getElementById('tradeCity');
        let qtyEl = document.getElementById('tradeQty');
        let maxPriceEl = document.getElementById('tradeMaxPrice');
        if (!cityEl || !qtyEl || !maxPriceEl) {
            alert('エラー: トレード情報の入力が見つかりません。');
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
        alert(alertMessage);
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
        alert('このNPCのサイドクエストは既に受注中です。');
        return;
    }
    const sq = generateSideQuest(idx);
    gameState.quests.push(sq);
    updateDisplays();
    alert(`${discoveryNPCs[idx]}からサイドクエストを受注しました！`);
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

    alert(`${adv.name} が${orb.name}を使用！レベルが${levelsToAdd}アップしました！`);

    renderCurrentCharacter();  // 即時反映
    updateDisplays();
}

function renderCurrentCharacter() {
    const perms = gameState.adventurers.filter(a => !a.temp);
    if (perms.length === 0) {
        document.getElementById('charactersContent').innerHTML = '<p>恒久的な冒険者がいません。</p>';
        return;
    }
    if (currentCharIndex >= perms.length || currentCharIndex < 0) currentCharIndex = 0;
    const adv = perms[currentCharIndex];
    const eff = {
        strength: getEffectiveStat(adv, 'strength'),
        wisdom: getEffectiveStat(adv, 'wisdom'),
        dexterity: getEffectiveStat(adv, 'dexterity'),
        luck: getEffectiveStat(adv, 'luck')
    };
    const expNeeded = adv.level * 100;
    const expPct = Math.min(100, (adv.exp / expNeeded) * 100 || 0);
    const hpPct = (adv.hp / adv.maxHp) * 100 || 0;
    const mpPct = (adv.mp / adv.maxMp) * 100 || 0;

    let html = `<div class="char-nav" style="margin-bottom:20px;">
        <button onclick="prevChar()">‹ 前</button>
        <span>${currentCharIndex + 1} / ${perms.length}</span>
        <button onclick="nextChar()">次 ›</button>
    </div>`;

    // メインコンテンツ：flexで左右配置
    html += `<div style="display:flex; align-items:flex-start; justify-content:center; gap:40px; flex-wrap:wrap;">`;

    // 左側：名前・ステータス・バー・バフ・装備・アイテム・ボタン
    html += `<div style="flex:1; min-width:300px; max-width:500px;">`;

    html += `<h3 style="margin:0 0 15px 0; text-align:center;">${getNameHtml(adv)} Lv ${adv.level}</h3>`;

    html += `<p style="margin:10px 0;"><strong>ステータス</strong></p><ul style="margin:0; padding-left:20px;">`;
    html += `<li>筋力: ${eff.strength} (ベース ${adv.strength})</li>`;
    html += `<li>知恵: ${eff.wisdom} (ベース ${adv.wisdom})</li>`;
    html += `<li>敏捷: ${eff.dexterity} (ベース ${adv.dexterity})</li>`;
    html += `<li>運: ${eff.luck} (ベース ${adv.luck})</li>`;
    html += `</ul>`;

    html += `<div style="margin:15px 0;">
                <div class="progress-bar"><div class="progress-fill exp-fill" style="width:${expPct}%"></div></div>
                EXP ${adv.exp}/${expNeeded}<br>
                <div class="progress-bar"><div class="progress-fill hp-fill" style="width:${hpPct}%"></div></div>
                HP ${adv.hp}/${adv.maxHp}<br>
                <div class="progress-bar"><div class="progress-fill mp-fill" style="width:${mpPct}%"></div></div>
                MP ${adv.mp}/${adv.maxMp}
             </div>`;

    if (adv.buffs && adv.buffs.length > 0) {
        html += `<p style="margin:10px 0;"><strong>アクティブバフ</strong></p><ul style="margin:0; padding-left:20px;">`;
        adv.buffs.forEach(b => {
            const bonus = b.percent ? `${b.bonus}%` : `+${b.bonus}`;
            const target = b.stat ? statFull[b.stat] : b.type;
            html += `<li>${bonus} ${target}（残り${b.daysLeft}日）</li>`;
        });
        html += `</ul>`;
    }

    html += `<p style="margin:15px 0 10px;"><strong>装備</strong></p><ul style="margin:0; padding-left:20px;">`;
    if (adv.equipment.length === 0) html += `<li>なし</li>`;
    adv.equipment.forEach((eq, i) => {
        html += `<li>${eq.name} (+${eq.bonus}% ${statFull[eq.stat]})
                 <button class="cancel-btn" onclick="removeFromChar(${currentCharIndex}, ${i})">解除</button></li>`;
    });
    html += `</ul>`;

    const equippable = gameState.inventory.filter(it => it.stat && adv.equipment.length < 2 && (it.qty || 1) > 0);
    if (equippable.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>装備可能アイテム</strong></p><ul style="margin:0; padding-left:20px;">`;
        equippable.forEach(it => {
            html += `<li>${it.name} x${it.qty || 1} (+${it.bonus}% ${statFull[it.stat]}) 
                     <button onclick="equipToChar(${currentCharIndex}, ${it.id})">装備</button></li>`;
        });
        html += `</ul>`;
    }

    const potions = gameState.inventory.filter(it => it.type === 'potion' && (it.qty || 1) > 0);
    if (potions.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>ポーション</strong></p><ul style="margin:0; padding-left:20px;">`;
        potions.forEach(it => {
            const target = it.restore === 'hp' ? `HP +${it.amount}` : `MP +${it.amount}`;
            const safeName = it.name.replace(/'/g, "\\'");
            html += `<li>${it.name} x${it.qty || 1} (${target}) 
                     <button onclick="usePotionOnChar(${currentCharIndex}, '${safeName}')">使用</button></li>`;
        });
        html += `</ul>`;
    }

    // 新規追加: EXPオーブ専用セクション（大・小両方対応）
    const expOrbs = gameState.inventory.filter(it => 
        (it.name === 'EXPオーブ' || it.name === 'EXPオーブ (小)') && (it.qty || 1) > 0
    );
    if (expOrbs.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>レベルアップアイテム</strong></p><ul style="margin:0; padding-left:20px;">`;
        expOrbs.forEach(it => {
            const levels = it.name === 'EXPオーブ (小)' ? 1 : 10;
            html += `<li>${it.name} x${it.qty || 1} (使用でレベル+${levels}) 
                     <button onclick="useExpOrbOnChar(${currentCharIndex}, ${it.id})">使用</button></li>`;
        });
        html += `</ul>`;
    }

    // 既存のバフ消費アイテムはそのまま（EXPオーブ大・小を除外）
    const consumables = gameState.inventory.filter(it => 
        it.type === 'consumable' && 
        it.name !== 'EXPオーブ' && 
        it.name !== 'EXPオーブ (小)'
    );
    if (consumables.length > 0) {
        html += `<p style="margin:15px 0 10px;"><strong>消費アイテム（バフ）</strong></p><ul style="margin:0; padding-left:20px;">`;
        consumables.forEach(it => {
            const bonus = it.buff.percent ? `${it.buff.bonus}%` : `+${it.buff.bonus}`;
            const target = it.buff.stat ? statFull[it.buff.stat] : it.buff.type;
            html += `<li>${it.name} (${bonus} ${target} ${it.buff.days}日)
                     <button onclick="useConsumable(${currentCharIndex}, ${it.id})">使用</button></li>`;
        });
        html += `</ul>`;
    }

    html += `<hr style="margin:20px 0;">`;
    if (adv.busy) {
        html += `<p style="color:red; text-align:center;">クエスト中 - 解雇不可</p>`;
    } else {
        html += `<div style="text-align:center;">
                    <button style="background:#e74c3c; color:white; padding:10px 20px; border:none; border-radius:4px; cursor:pointer;"
                            onclick="firePerm(${currentCharIndex})">この冒険者を解雇</button>
                 </div>`;
    }

    html += `</div>`; // 左側閉じ

    // 右側：画像（大きめ表示）
    html += `<div style="flex:0 0 auto; text-align:center;">`;
    html += `<img src="Images/${adv.image}" 
                 style="width:220px; height:auto; max-height:400px; object-fit:contain; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.2);"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMjIwIDQwMCI+PHJlY3Qgd2lkdGg9IjIyMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiM3NDc0NzQiLz48dGV4dCB4PSIxMTAiIHk9IjIwMCIgZm9udC1zaXplPSIzMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuOCpuODiOOBpzwvdGV4dD48L3N2Zz4=';">`;
    html += `</div>`;

    html += `</div>`; // flexコンテナ閉じ

    document.getElementById('charactersContent').innerHTML = html;
}


function getDisplayableQuests() {
    // 完了していないクエストを表示（プレイヤー投稿のメイン/ダンジョンなどは daysLeft:999 なので常に表示）
    return gameState.quests.filter(q => !q.completed);
}

function renderQuests() {
    const quests = getDisplayableQuests(); // !q.completed のクエスト
    const container = document.getElementById('quests');
    const counter = document.getElementById('questCounter');

    if (quests.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#ffffff; padding:60px; font-size:1.4em;">利用可能なクエストはありません。</p>';
        counter.textContent = '';
        return;
    }

    // インデックスを範囲内に収める
    if (currentQuestIndex >= quests.length) currentQuestIndex = 0;
    if (currentQuestIndex < 0) currentQuestIndex = quests.length - 1;

    const q = quests[currentQuestIndex];
    counter.textContent = `${currentQuestIndex + 1} / ${quests.length}`;

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
    let estDays = 'N/A';
    let chance = 0;
    const maxSlots = q.training ? 2 : 4;

    if (q.assigned.length > 0) {
        if (q.training) {
            estDays = '1日';
            chance = 100;
        } else if (q.defense) {
            estDays = 'Today: Battle';
            chance = 'Tactical Combat';
        } else if (q.type === 8) { // trade
            const meetsAll = teamDex >= q.minDexterity && teamLuk >= q.minLuck;
            if (!meetsAll) {
                estDays = '失敗 (DEX/LUC不足)';
                chance = 0;
            } else {
                let days;
                if (q.inProgress && q.tradeRemainingDays !== undefined && q.tradeRemainingDays > 0) {
                    days = q.tradeRemainingDays;
                    estDays = `${days}日残り (確定成功)`;
                } else {
                    const avgDex = teamDex / q.assigned.length || 1;
                    const avgLuc = teamLuk / q.assigned.length || 1;
                    days = calcTradeRequiredDays(avgDex, avgLuc);
                    estDays = q.inProgress ? `${days}日残り (確定成功)` : `${days}日 (確定成功)`;
                }
                chance = 100;
            }
        } else { // 通常クエスト
            const meetsAll = teamStr >= q.minStrength && teamWis >= q.minWisdom && 
                            teamDex >= q.minDexterity && teamLuk >= q.minLuck;
            if (!meetsAll) {
                estDays = '失敗';
                chance = 0;
            } else {
                let teamFocus = q.assigned.reduce((s, id) => s + getEffectiveStat(findAdv(id), q.focusStat), 0);
                const excess = (teamFocus / q.minFocus) - 1;
                const prob = Math.min(0.5, 0.1 + Math.max(0, excess) * 0.2);
                chance = Math.round(prob * 100);
                estDays = Math.max(1, Math.ceil(1 / prob));
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

    // 必要ステータスHTML（アイコン付き）
    const minHtml = `<img src="Images/STR.png" class="stat-icon" title="筋力"> 筋力 ${q.minStrength || 0} | 
                     <img src="Images/WIS.png" class="stat-icon" title="知恵"> 知恵 ${q.minWisdom || 0} | 
                     <img src="Images/DEX.png" class="stat-icon" title="敏捷"> 敏捷 ${q.minDexterity || 0} | 
                     <img src="Images/LUC.png" class="stat-icon" title="運"> 運 ${q.minLuck || 0}`;

    const teamHtml = `<img src="Images/STR.png" class="stat-icon" title="筋力"> 筋力 ${teamStr} | 
                      <img src="Images/WIS.png" class="stat-icon" title="知恵"> 知恵 ${teamWis} | 
                      <img src="Images/DEX.png" class="stat-icon" title="敏捷"> 敏捷 ${teamDex} | 
                      <img src="Images/LUC.png" class="stat-icon" title="運"> 運 ${teamLuk}`;

    // メインHTML構築
    let html = `
        <div class="quest-card ${typeClass}" 
             data-quest-id="${q.id}"
             ondrop="drop(event)" 
             ondragover="allowDrop(event)" 
             ondragleave="dragLeave(event)">
            <h3>${q.desc}</h3>`;

    if (q.training) {
        html += `<p><strong>常時利用可能なトレーニングクエスト（最大2人）</strong></p>`;
        html += `<p>低いレベルの冒険者はペアの高いレベル相当のEXPを獲得。リスクなし、報酬なし。</p>`;
        html += `<p>難易度: ${q.difficulty} | 必要ステータス: 全て0</p>`;
    } else {
        html += `<p>難易度: ${q.difficulty} (${q.rank}) | 残り日数: ${q.daysLeft} | 報酬: ${q.reward}g</p>`;
        if (q.defense) {
            html += `<p><strong style="color:red;">防衛クエスト - 1-4人の防衛者を割り当てなければゲームオーバー！</strong></p>`;
        }
        if (!q.defense && !q.playerPosted) {
            html += `<p>必要: ${minHtml}</p>`;
        }
    }

    html += `<p>予想日数: ${estDays}</p>
             <p>チーム: ${teamHtml} | 成功確率: ${chance}${chance === 'Tactical Combat' ? '' : '%'} </p>
             <div style="margin-top:15px;">割り当て済み (${q.assigned.length}/${maxSlots}): 
                 ${assignedHtml || '<span style="color:#aaa;">未割り当て</span>'}
             </div>`;

    // 拒否ボタン（条件一致時のみ）
    if (q.assigned.length === 0 && !q.inProgress && !q.defense && !q.training && !q.playerPosted) {
        const rejectPenalty = (0.1 * q.difficulty).toFixed(1);
        html += `<p style="margin-top:15px;">
                    <button onclick="rejectQuest(${q.id})" 
                            style="background:#e74c3c; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
                        クエスト拒否 (評判 -${rejectPenalty})
                    </button>
                 </p>`;
    }

    if (q.inProgress) {
        html += `<p class="in-progress" style="margin-top:15px;">進行中 - 冒険者の割り当て解除不可</p>`;
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
        document.getElementById('battleBgm')
    ].filter(b => b !== newBgm && !b.paused);

    // 現在再生中のBGMをすべてフェードアウト（複数対応安全策）
    // 新しいBGMをボリューム0で再生開始
    newBgm.currentTime = 0;
    newBgm.volume = 0;
    newBgm.play().catch(e => console.log('BGM再生エラー:', e));

    const targetVol = 0.3;
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

document.getElementById('bgm').volume = 0.3;
document.getElementById('introBgm').volume = 0.3;  // ← 新規追加
document.getElementById('battleBgm').volume = 0.3;
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
let playerName = "";
let dialogueIndex = 0;

const dialogues = [
    {
        speaker: "ナレーター",
        text: "……炎が空を赤く染めていた。あの夜、静かな村は突然の襲撃を受けた。<br>黒い鎧の軍勢——その正体も目的もわからないまま、すべてを焼き払い、奪い去っていった。"
    },
    {
        speaker: "ナレーター",
        text: "あなた、<strong>{player}</strong>は、幼なじみのカイトとルナと共に、必死に逃げ延びた。<br>家族も、家も、故郷も……すべてを失った。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "……よう、{player}。まだ起きてたのか。<br>ルナもさっきまで泣いてたけど、今は寝ちまったみたいだな。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "俺たち……本当にここまで来ちまったな。<br>あの村から逃げて、このセントラルシティまで……<br>家族も、友達も、みんな……"
    },
    {
        speaker: "あなた",
        text: "……ああ。でも、生きてる。俺たち三人だけでも。"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "……{player}、カイト……ごめん、起きちゃった。<br>夢を見たの。あの夜の夢……またみんなが……"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "ルナ……もう大丈夫だ。俺たちがいる。<br>でもよ、{player}。このままじゃダメだよな。<br>ただ逃げて、隠れて生きるだけじゃ……"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "うん……私も思う。あの軍勢の正体、なぜ村が狙われたのか……<br>知りたい。真実を知りたい。<br>そして、生きていくためにも……お金が必要よね。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "残ってる金は1000gだけだ。<br>でもよ、{player}。俺たちには力がある。<br>お前とルナと俺——三人なら、冒険者としてやっていけるはずだ。"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "だから……ギルドを作ろう。ここに。<br>私たちのギルド。小さくてもいい。<br>依頼を受けて、強くなって、真実を探すための力をつけるの。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "決まりだな、{player}。<br>俺たち三人で、この街に新しいギルドを立ち上げる。<br>名前は……お前が決めろよ。リーダーなんだから。"
    },
    {
        speaker: "ナレーター",
        text: "こうして、あなたたちは少ない所持金と、失われた故郷への想いを胸に——<br><strong>冒険者ギルド</strong>を設立した。<br><br>復讐と真実、そして新しい未来のために。"
    },
    {
        speaker: "ナレーター",
        text: "あなたたちの冒険が、今始まる……"
    }
];

// startIntroDialogue 関数を以下のように修正
function startIntroDialogue() {
    playerName = document.getElementById('playerNameInput').value.trim();
    if (playerName === "") {
        alert("名前を入力してください！");
        return;
    }
    
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
            nextBtn.textContent = "ゲーム開始";
        } else {
            nextBtn.textContent = "次へ";
        }
        nextBtn.onclick = nextDialogue;  // 常にnextDialogueを呼び出す
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

function queueQuestCompletionDialogue(sequence) {
    if (!sequence || sequence.length === 0) return;

    completionQueue.push(sequence);

    // 再生中でなければ即開始
    if (!isPlayingDialogue) {
        playNextDialogue();
    }
}

function playNextDialogue() {
    if (completionQueue.length === 0) {
        isPlayingDialogue = false;
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
        charImage.style.width = '220px';
        charImage.style.height = 'auto';
        charImage.style.maxHeight = '400px';
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
        nextBtn.textContent = '次へ';
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

        function typeText(targetText, speaker) {
            localTyping = true;
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.6';

            dialogueBox.innerHTML = `<p><strong>${speaker}:</strong><br><span id="typingText"></span></p>`;
            const typingText = document.getElementById('typingText');

            let i = 0;
            localInterval = setInterval(() => {
                if (i < targetText.length) {
                    typingText.innerHTML += targetText.charAt(i);
                    i++;
                } else {
                    clearInterval(localInterval);
                    localTyping = false;
                    nextBtn.disabled = false;
                    nextBtn.style.opacity = '1';

                    if (localIndex === seq.length - 1) {
                        nextBtn.textContent = '閉じる';
                    } else {
                        nextBtn.textContent = '次へ';
                    }
                }
            }, 30);
        }

        function renderCurrent() {
            const current = seq[localIndex];
            let imageSrc = 'Images/main_char.png'; 
            if (current.speaker === '冒険者') {
                const images = [
                    'Images/STR_M.png',
                    'Images/STR_F.png',
                    'Images/WIS_F.png',
                    'Images/DEX_M.png',
                    'Images/DEX_F.png',
                    'Images/LUC_M.png',
                    'Images/LUC_F.png'
                ];
                
                const randomIndex = Math.floor(Math.random() * images.length);
                imageSrc = images[randomIndex];
            }     
            if (current.speaker === 'カイト') {
                imageSrc = 'Images/カイト.png';
            } else if (current.speaker === 'ルナ') {
                imageSrc = 'Images/ルナ.png';
            }
            // それ以外の話者（冒険者、依頼主、ギルドマスターなど）でもペア画像のままにする
            charImage.src = imageSrc;
            charImage.style.display = 'block'; // 常に表示

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
                    nextBtn.textContent = '閉じる';
                } else {
                    nextBtn.textContent = '次へ';
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
