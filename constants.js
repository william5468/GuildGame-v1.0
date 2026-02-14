


const itemIconPositions = {
    // 例（ユーザーが挙げた potion の例）

    'Gold Coin': { row: 23, col: 10 },  // ゴールド用（適宜変更）
    'HP Potion': { row: 13, col: 1 },
    'MP Potion':{ row: 13, col: 2 },
    'Small Knife':{ row: 25, col: 1 },
    'Iron Sword':{ row: 25, col: 3 },      
    'Beginner Scroll':{ row: 15, col: 9 },     
    'Magician Scroll':{ row: 15, col: 15 },   
    'Leather Gloves':{ row: 31, col: 2 },   
    'Elf Boots':{ row: 30, col: 9 },  
    'Lucky Coin':{ row: 23, col: 10},  
    'Four-leaf Clover':{ row: 13, col: 11 },  
    '鉄鉱石':{ row: 22, col: 15 },  
    '薬草':{ row: 20, col: 6 },  
    '藥草':{ row: 20, col: 6 }, 
    'スパイス':{ row: 23, col: 14 },  
    '宝石':{ row: 23, col: 7 }, 
    'Herb':{ row: 20, col: 6 },  
    
    'キノコ':{ row: 19, col: 6 },  
    'Mushroom':{ row: 19, col: 6 },  
    '蘑菇':{ row: 19, col: 6 },
    '花':{ row: 13, col: 14 },  
    'Flower':{ row: 13, col: 14 },  
    '花朵':{ row: 13, col: 14 },  
    '鉄の欠片':{ row: 17, col: 2 },  
    'Iron Scrap':{ row: 17, col: 2 },  
    '鐵碎片':{ row: 17, col: 2 }, 
    '川魚':{ row: 19, col: 5 },  
    'River Fish':{ row: 19, col: 5  },  
    '白い花':{ row: 20, col: 10  },  
    'White flower':{ row: 20, col: 10   },  
    '白色的花':{ row: 20, col: 10  },  
    '酒場のワイン':{row: 20, col: 5   },  
    '上等なエール':{row: 20, col: 5   },  
    'にんじん':{row: 19, col: 1  },  
    'じゃがいも':{row: 19, col: 3  },  
    'トマト':{row: 20, col: 14  },  
    'ぶどう':{row: 19, col: 9 },  
    'りんご':{row: 19, col: 10 },  
    'スライムの塊':{row: 22, col: 5  },  
    '魔力の結晶（小）':{row: 22, col: 8},  
    '焼きキノコ':{row: 19, col: 6},  
    'キノコの乾燥粉末':{ row: 23, col: 14 },  
    '強化クリスタル':{ row: 22, col: 10}, 
    '呪われた魔力の石片':{ row: 17, col: 1 },
    '魔力の石片':{ row: 17, col: 1},
    '古代の巻物':{ row: 15, col: 15},

    // デフォルト（マップにない場合は左上のアイコンを使用）
    'default': { row: 1, col: 1 }
};



// === constants.js に追加（既存のmaterialShopの下あたりに） ===
const resources = [
    t('resource_iron_ore'),
    t('resource_medicinal_herb'),
    t('resource_spice'),
    t('resource_gem')
];



// baseMarketPrices も翻訳された表示名をキーにする
const baseMarketPrices = {
    [resources[0]]: 30,
    [resources[1]]: 20,
    [resources[2]]: 55,
    [resources[3]]: 115
};

// tradeCities（都市名を翻訳キー化、specialty は内部キー）
const tradeCities = [
    {id: "dragora", name: t('city_dragora'), specialty: "iron_ore"},
    {id: "herbria", name: t('city_herbria'), specialty: "medicinal_herb"},
    {id: "spaisis", name: t('city_spaisis'), specialty: "spice"},
    {id: "gemheart", name: t('city_gemheart'), specialty: "gem"},
];

const keyToDisplay = {
    iron_ore: t('resource_iron_ore'),
    medicinal_herb: t('resource_medicinal_herb'),
    spice: t('resource_spice'),
    gem: t('resource_gem')
};

const specialtyMultiplier = 0.5; // 専門都市では市場価格50%安（大幅安）
const priceSpread = 0.1;         // 購入価 +10%、売却価 -10%

// === 市場イベント（既存の多言語対応を維持しつつ、multipliers を内部英語キー化）===
const eventTypes = [
    { key: "production_boom",      multipliers: {iron_ore: 0.7, medicinal_herb: 0.7, spice: 0.7, gem: 0.7} },
    { key: "resource_shortage",    multipliers: {iron_ore: 1.6, medicinal_herb: 1.6, spice: 1.6, gem: 1.6} },
    { key: "new_mine",             multipliers: {iron_ore: 0.5} },
    { key: "herb_boom",            multipliers: {medicinal_herb: 0.5} },
    { key: "spice_festival",       multipliers: {spice: 1.7} },
    { key: "gem_exhibition",       multipliers: {gem: 1.8} },
    { key: "mine_accident",        multipliers: {iron_ore: 1.7} },
    { key: "epidemic",             multipliers: {medicinal_herb: 1.8} },
    { key: "spice_embargo",        multipliers: {spice: 1.6} },
    { key: "gem_theft",            multipliers: {gem: 1.5} },
    { key: "capital_construction", multipliers: {iron_ore: 1.4, gem: 1.4} },
    { key: "frontier_herbs",       multipliers: {medicinal_herb: 0.6, spice: 0.7} },
    { key: "adventurer_boom",      multipliers: {iron_ore: 1.3, medicinal_herb: 1.4, spice: 1.2, gem: 1.3} },
    { key: "poor_harvest",         multipliers: {medicinal_herb: 1.5, spice: 1.5} },
    { key: "mining_boom",          multipliers: {iron_ore: 0.6, gem: 0.7} },
    { key: "peaceful_trade",       multipliers: {iron_ore: 0.8, medicinal_herb: 0.8, spice: 0.8, gem: 0.8} },
    { key: "war_outbreak",         multipliers: {iron_ore: 1.8} },
    { key: "noble_weddings",       multipliers: {gem: 1.7, spice: 1.5} },
    { key: "healing_festival",     multipliers: {medicinal_herb: 1.7} },
    { key: "sea_route_open",       multipliers: {spice: 0.6, gem: 0.7} }
];

function getRandomEvent() {
    if (Math.random() < 0.4) { // 40%の確率でイベント発生
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        return {
            name: t(`market_event_${type.key}_name`),
            desc: t(`market_event_${type.key}_desc`),
            multipliers: type.multipliers,
            daysLeft: 7 + Math.floor(Math.random() * 8) // 7〜14日
        };
    }
    return null;
}


// === キャラクターごとの呼吸アニメ設定を一元管理（javascript.js の上部やconstants.jsなどに追加） ===
const breathingAnimationSettings = {
  // キー: baseImageのファイル名（拡張子なし、例: 'LUC_RankF_F'）
  // 値: generateBreathingAnimation用のパラメータオブジェクト
  'LUC_RankF_F': {
    rows: 3,
    cols: 4,
    frameW: 944,
    frameH: 1400,
    cycleDuration: 2.2,
    scaleFactor: 1,  // 背景変動隠蔽用縮小率（必要に応じて0.92〜0.98で調整）
    innerHeight: 1370,       // ← ここで指定：最適表示高さ
    innerWidth: 900,

  },
  'ルナ': {
    rows: 5,
    cols: 6,
    frameW: 842,
    frameH: 1248,
    cycleDuration: 3.6,
    scaleFactor: 1,  // 背景変動隠蔽用縮小率（必要に応じて0.92〜0.98で調整）
    innerHeight: 1210,       // ← ここで指定：最適表示高さ
    innerWidth: 850,

  },
    'カイト': {
    rows: 3,
    cols: 4,
    frameW: 842,
    frameH: 1248,
    cycleDuration: 2.5,
    scaleFactor: 1,  // 背景変動隠蔽用縮小率（必要に応じて0.92〜0.98で調整）
    innerHeight: 1210,       // ← ここで指定：最適表示高さ
    innerWidth: 780,

  },
      'WIS_RankF_F': {
    rows: 4,
    cols: 5,
    frameW: 842,
    frameH: 1248,
    cycleDuration: 3,
    scaleFactor: 1,  // 背景変動隠蔽用縮小率（必要に応じて0.92〜0.98で調整）
    innerHeight: 1210,       // ← ここで指定：最適表示高さ
    innerWidth: 780,

  },
};

// === デフォルト設定（設定がないキャラクター用） ===
const defaultBreathingSettings = {
  rows: 3,
  cols: 4,
  frameW: 842,
  frameH: 1248,
  cycleDuration: 3.6,
  scaleFactor: 0.95
};

const assetsToLoad = [
    "Images/LUC_RankF_F_Breathing.png",
    "Images/ルナ_breathing.png",
    "Images/カイト_Breathing.png",
    "Images/WIS_RankF_F_Breathing.png",
    // Images folder (all images)
    "Images/Guild_bg.jpg",
    "Images/Shop_bg.jpg",
    "Images/Character_bg.jpg",
    "Images/npc_bg.jpg",
    "Images/Street.jpg",
    "Images/Card.png",
    "Images/カイト.png",
    "Images/ルナ.png",
    "Images/main_char.png",
    "Images/STR_M.png",
    "Images/STR_F.png",
    "Images/WIS_F.png",
    "Images/DEX_M.png",
    "Images/DEX_F.png",
    "Images/LUC_M.png",
    "Images/LUC_F.png",
    "Images/Assassin(F)_enemy.png",
    "Images/Assassin(M)_enemy.png",
    "Images/Hunter(F)_enemy.png",
    "Images/Hunter(M)_enemy.png",
    
    // === 新規追加：ダンジョンモンスター画像プリロード ===
    "Images/Dungeon_Monster/slime.png",
    "Images/Dungeon_Monster/snake.png",
    "Images/Dungeon_Monster/goblin.png",
    "Images/Dungeon_Monster/plant.png",
    "Images/Dungeon_Monster/bat.png",
    "Images/Dungeon_Monster/spider.png",
    "Images/Dungeon_Monster/wolf.png",
    "Images/Dungeon_Monster/raven.png",
    "Images/Dungeon_Monster/troll.png",
    "Images/Dungeon_Monster/treant.png",
    "Images/Dungeon_Monster/skeleton swordfighter.png",
    "Images/Dungeon_Monster/skeleton rogue.png",
    "Images/Dungeon_Monster/skeleton mage.png",
    "Images/Dungeon_Monster/skeleton archer.png",
    "Images/Dungeon_Monster/armor.png",
    "Images/Dungeon_Monster/golem.png",
    "Images/Dungeon_Monster/dragon.png",
    "Images/Dungeon_Monster/red imp.png",
    "Images/Dungeon_Monster/black imp.png",
    "Images/Dungeon_Monster/shadow.png",
    // =====================================
    // === 新規追加：アクションアイコン ===
    "Images/STR_lightattack_icon.jpg",
    "Images/STR_heavyattack_icon.jpg",
    "Images/WIS_lightattack_icon.jpg",
    "Images/WIS_heavyattack_icon.jpg",
    "Images/DEX_lightattack_icon.jpg",
    "Images/DEX_heavyattack_icon.jpg",
    "Images/LUC_lightattack_icon.jpg",
    "Images/WIS_explosion_icon.jpg",
    "Images/STR_protection_icon.jpg",
    "Images/Defense_icon.jpg",
    // =====================================
    //skill effect spritesheet
    "Images/slash_effects.png",

    // Audio folder (all audio)
    "Audio/main_screen_bgm.mp3",
    "Audio/bgm.mp3",
    "Audio/yume.mp3",
    "Audio/battle.mp3",
    "Audio/battle2.mp3",
    "Audio/dialogue_bgm.mp3",
    "Audio/QuestEndDialogue_bgm.mp3",
    "Audio/levelup.mp3",
    "Audio/Gameover.mp3",
    "Audio/STR_lightAttack.mp3",
    "Audio/WIS_lightAttack.mp3",
    "Audio/DEX_lightAttack.mp3",
    "Audio/LUC_lightAttack.mp3",
    "Audio/STR_heavyAttack.mp3",
    "Audio/WIS_heavyAttack.mp3",
    "Audio/DEX_heavyAttack.mp3",
    "Audio/STR_protect.mp3",    
    "Audio/DEX_Stunning.mp3",
    "Audio/WIS_Explosion.mp3",
    "Audio/LUC_fortunestrike.mp3",
    "Audio/LUC_Evade.mp3",
    "Audio/LUC_Blessing.mp3",
    "Audio/Defense_F.mp3",
    "Audio/Defense_M.mp3",    
    "Audio/CounterAttack_F.mp3",
    "Audio/CounterAttack_M.mp3",
    "Audio/CounterAttack_trigger.mp3",
    'Audio/Button_Click.mp3'
];
const totalAssets = assetsToLoad.length;


const QuestCompletionDialogue = {
    ja: [
    // 0: STR - kill quests
    {
        'F': [
            // 0: スライム5匹討伐（依頼主: 農夫）
            [
                // Line 1 (index 0)
                {speaker: '{adv1}', text: 'ただいま戻りました。村周辺のスライム5匹、すべて討伐完了です！'},
                // Line 2 (index 1)
                {speaker: '{adv2}', text: 'スライム退治か…跳ねまくって厄介だったろ？あのプニプニした感触、忘れられねえな。'},
                // Line 3 (index 2)
                {speaker: '{adv1}', text: '確かに疲れました…体中スライム液まみれで、服がベトベトです…'},
                // Line 4 (index 3)
                {speaker: '{PLAYER}', text: 'お疲れ様。よくやってくれた。依頼主の農夫さんが待ってるぞ。'},
                // Line 5 (index 4)
                {speaker: '{adv2}', text: 'へへ、俺も行きたかったな。スライム汁でみんな滑りまくる姿、面白かっただろうに！'},
                // Line 6 (index 5)
                {speaker: '{adv1}', text: `{PLAYER}、ありがとうございます。さっそく農夫さんに報告に行きましょう。`},
                // Line 7 (index 6)
                {speaker: '農夫', text: 'おお、冒険者さん！スライムを全部倒してくれたんだね！作物が溶けずに済んで本当に助かったよ！'},
                // Line 8 (index 7)
                {speaker: '農夫', text: 'あのゼリーみたいなスライム…食べ物じゃないよね？怖い怖い！本当にありがとう！'},
                // Line 9 (index 8)
                {speaker: '農夫', text: 'これで作物が安心だよ！報酬を受け取ってくれよ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：スライム退治の後、どう対応する？）'},
                // Line 11 (index 10) - Choices object
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '農夫にスライム対策のアドバイスをする（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を褒めて信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'スライム液を採取して売る（+200 Gold、参加冒険者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 200},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '追加でスライムを狩らせて鍛える（参加冒険者STR +3、好感度 -10）',
                            reward: [
                                {type: "strength", amount: 3, target: "participants"},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Advice (+2 Reputation)
                // Line 12 (index 11)
                {speaker: '{PLAYER}', text: 'スライムは湿った場所を好むから、畑の水はけを良くすると減るかもしれないぞ。'},
                // Line 13 (index 12)
                {speaker: '農夫', text: 'なるほど！早速試してみるよ！これで安心だ、ありがとう！'},
                // Line 14 (index 13)
                {speaker: '農夫', text: '冒険者さんみたいな人がいてくれて、本当に助かるよ！', jumptoline: 27},
                // Branch 2: Praise (+5 Friendliness participants)
                // Line 15 (index 14)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。スライム液まみれで大変だったろ？本当に頼りになる。'},
                // Line 16 (index 15)
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                // Line 17 (index 16)
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が活躍する番だぜ！'},
                // Line 18 (index 17)
                {speaker: '{PLAYER}', text: 'ああ、次も期待してるよ。', jumptoline: 27},
                // Branch 3: Harvest slime gel (+200G, -5 Friendliness participants)
                // Line 19 (index 18)
                {speaker: '{PLAYER}', text: 'このスライム液、錬金素材として売れる。少し採取してギルド資金にしよう。'},
                // Line 20 (index 19)
                {speaker: '{adv1}', text: '……確かに価値はあるけど、ちょっと汚いかも…ベトベトが取れない…'},
                // Line 21 (index 20)
                {speaker: '{adv2}', text: '金のためなら我慢だぜ！でも次は俺に洗わせろよな！'},
                // Line 22 (index 21)
                {speaker: '{PLAYER}', text: 'はは、任せた。', jumptoline: 27},
                // Branch 4: Extra hunting (STR +3, -10 Friendliness participants)
                // Line 23 (index 22)
                {speaker: '{PLAYER}', text: 'せっかくだからもう少しスライムを狩って鍛えてこい。強くなれば次が楽になる。'},
                // Line 24 (index 23)
                {speaker: '{adv1}', text: '……まだやるんですか？疲れましたけど…わかりました。強くなりたいです。'},
                // Line 25 (index 24)
                {speaker: '{adv2}', text: 'おいおい、休ませてくれよ…でも強くなるならやるか。負けねえぞ！'},
                // Line 26 (index 25)
                {speaker: '{PLAYER}', text: 'その意気だ。', jumptoline: 27},
                // Convergence
                // Line 27 (index 26)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って報酬を受け取ろう。'}
            ],
            // 1: 巨大ネズミ退治（依頼主: 酒場主人）
            [
                // Line 1 (index 0)
                {speaker: '{adv1}', text: '酒場の地下室にいた巨大ネズミ、すべて退治しました。'},
                // Line 2 (index 1)
                {speaker: '{adv2}', text: '巨大ネズミ！？どれくらいデカかったんだ？もっとぶった斬りたかったぜ！'},
                // Line 3 (index 2)
                {speaker: '{adv1}', text: 'かなり大きくて…噛まれそうで本当に怖かったです…'},
                // Line 4 (index 3)
                {speaker: '{PLAYER}', text: 'よくやったな。無事でよかった。お前がいると酒場が血まみれになるぞ。'},
                // Line 5 (index 4)
                {speaker: '{adv2}', text: 'それがいいんじゃないか！派手でカッコいいだろ！みんなビビるぜ！'},
                // Line 6 (index 5)
                {speaker: '{adv1}', text: `{PLAYER}、ありがとうございます。酒場主人に報告しましょう。`},
                // Line 7 (index 6)
                {speaker: '酒場主人', text: 'おお！巨大ネズミを全部片付けてくれたのか！これで地下室がまた使えるよ！'},
                // Line 8 (index 7)
                {speaker: '酒場主人', text: '一杯おごるぜ…って、血の海は遠慮したいがな！本当に助かった、ありがとう！'},
                // Line 9 (index 8)
                {speaker: '酒場主人', text: 'よかったぜ！報酬を受け取ってくれ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：ネズミ退治の後、どう対応する？）'},
                // Line 11 (index 10) - Choices object
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '酒場主人にネズミ対策を提案する（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を褒めて信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'ネズミの尾を採取して売る（+200 Gold、参加冒険者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 200},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '追加でネズミを狩らせて鍛える（参加冒険者STR +3、好感度 -10）',
                            reward: [
                                {type: "strength", amount: 3, target: "participants"},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Advice (+2 Reputation)
                // Line 12 (index 11)
                {speaker: '{PLAYER}', text: 'ネズミは食べ物を狙うから、地下室の食料管理を厳しくすると減るかもしれないぞ。'},
                // Line 13 (index 12)
                {speaker: '酒場主人', text: 'なるほど！早速やってみるよ！これで安心して商売できる！ありがとう！'},
                // Line 14 (index 13)
                {speaker: '酒場主人', text: 'また何かあったら頼むぜ！一杯サービスだ！', jumptoline: 24},
                // Branch 2: Praise (+5 Friendliness participants)
                // Line 15 (index 14)
                {speaker: '{PLAYER}', text: 'みんな、巨大ネズミ相手に怖かったろ？本当にありがとう。頼りになるよ。'},
                // Line 16 (index 15)
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                // Line 17 (index 16)
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が主役だぜ！', jumptoline: 24},
                // Branch 3: Harvest rat tails (+200G, -5 Friendliness participants)
                // Line 18 (index 17)
                {speaker: '{PLAYER}', text: 'このネズミの尾、素材として売れる。少し採取してギルド資金にしよう。'},
                // Line 19 (index 18)
                {speaker: '{adv1}', text: '……確かに価値はあるけど、ちょっと気持ち悪いかも…'},
                // Line 20 (index 19)
                {speaker: '{adv2}', text: '金のためなら我慢だぜ！でも次は俺にやらせろよ！', jumptoline: 24},
                // Branch 4: Extra hunting (STR +3, -10 Friendliness participants)
                // Line 21 (index 20)
                {speaker: '{PLAYER}', text: 'せっかくだからもう少しネズミを狩って鍛えてこい。強くなれば次が楽になる。'},
                // Line 22 (index 21)
                {speaker: '{adv1}', text: '……まだやるんですか？怖かったですけど…わかりました。'},
                // Line 23 (index 22)
                {speaker: '{adv2}', text: 'おいおい、休ませてくれよ…でも強くなるならやるか。負けねえぞ！', jumptoline: 24},
                // Convergence
                // Line 27 (index 26)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って報酬を受け取ろう。'}
            ],
            // 2: 野犬3匹討伐（依頼主: 農夫）
            [
                // Line 1 (index 0)
                {speaker: '{adv1}', text: '農場を襲っていた野犬3匹、すべて倒してきました。家畜は無事です。'},
                // Line 2 (index 1)
                {speaker: '{adv2}', text: '野犬か！追いかけっこして斬りまくりたかったぜ！もっと派手にやりたかったな！'},
                // Line 3 (index 2)
                {speaker: '{adv1}', text: '速くて…本当に危なかったです…'},
                // Line 4 (index 3)
                {speaker: '{PLAYER}', text: 'お疲れ。家畜が無事でよかったな。お前がいると家畜まで追いかけそうだ。'},
                // Line 5 (index 4)
                {speaker: '{adv2}', text: 'ははっ！それも楽しそうだろ！犬も家畜も大運動会だ！'},
                // Line 6 (index 5)
                {speaker: '{adv1}', text: `{PLAYER}、ありがとうございます。農夫さんに報告に行きましょう。`},
                // Line 7 (index 6)
                {speaker: '農夫', text: '野犬を全部倒してくれたんだね！家畜が無事でみんな安心だよ！'},
                // Line 8 (index 7)
                {speaker: '農夫', text: '追いかけっこって…遊びじゃないよね？怖いなあ、本当にありがとう！'},
                // Line 9 (index 8)
                {speaker: '農夫', text: 'これで家畜が安心だよ！報酬を受け取ってくれよ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：野犬退治の後、どう対応する？）'},
                // Line 11 (index 10) - Choices object
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '農夫に野犬対策を提案する（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を褒めて信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '野犬の牙を採取して売る（+200 Gold、参加冒険者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 200},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '追加で野犬を狩らせて鍛える（参加冒険者STR +3、好感度 -10）',
                            reward: [
                                {type: "strength", amount: 3, target: "participants"},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Advice (+2 Reputation)
                // Line 12 (index 11)
                {speaker: '{PLAYER}', text: '野犬は群れで来るから、柵を強化するか犬除けの薬草を植えるといいかもしれないぞ。'},
                // Line 13 (index 12)
                {speaker: '農夫', text: 'なるほど！早速やってみるよ！これで安心して家畜を育てられる！ありがとう！'},
                // Line 14 (index 13)
                {speaker: '農夫', text: '冒険者さんみたいな人がいてくれて、本当に助かるよ！', jumptoline: 24},
                // Branch 2: Praise (+5 Friendliness participants)
                // Line 15 (index 14)
                {speaker: '{PLAYER}', text: 'みんな、速い野犬相手に大変だったろ？本当にありがとう。頼りになるよ。'},
                // Line 16 (index 15)
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                // Line 17 (index 16)
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が活躍する番だぜ！', jumptoline: 24},
                // Branch 3: Harvest dog fangs (+200G, -5 Friendliness participants)
                // Line 18 (index 17)
                {speaker: '{PLAYER}', text: 'この野犬の牙、武器素材として売れる。少し採取してギルド資金にしよう。'},
                // Line 19 (index 18)
                {speaker: '{adv1}', text: '……確かに価値はあるけど、ちょっと怖いかも…'},
                // Line 20 (index 19)
                {speaker: '{adv2}', text: '金のためなら我慢だぜ！でも次は俺にやらせろよ！', jumptoline: 24},
                // Branch 4: Extra hunting (STR +3, -10 Friendliness participants)
                // Line 21 (index 20)
                {speaker: '{PLAYER}', text: 'せっかくだからもう少し野犬を狩って鍛えてこい。強くなれば次が楽になる。'},
                // Line 22 (index 21)
                {speaker: '{adv1}', text: '……まだやるんですか？怖かったですけど…わかりました。'},
                // Line 23 (index 22)
                {speaker: '{adv2}', text: 'おいおい、休ませてくれよ…でも強くなるならやるか。負けねえぞ！', jumptoline: 24},
                // Convergence
                // Line 27 (index 26)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って報酬を受け取ろう。'}
            ]
        ],
        
        'F+': [
            // 0: ゴブリン8匹討伐（依頼主: 街道の衛兵）
            [
                {speaker: "冒険者", text: "街道で待ち伏せしていたゴブリン8匹をすべて討伐しました。……結構しつこくて疲れましたよ。"},
                {speaker: "カイト", text: "ゴブリン8匹！？いいじゃん、俺なら10匹でも余裕でぶった斬ってたぜ！次は絶対連れてけよ！"},
                {speaker: "ギルドマスター", text: "カイト、興奮しすぎ。衛兵に報告だ。"},
                {speaker: "衛兵", text: "ゴブリンを8匹も倒してくれたのか！これで街道が安全になったよ。……って、10匹は自慢しすぎだろ？ありがとう冒険者さん！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。カイト、次は本当に連れてくから準備しとけ。"}
            ],
            // 1: 山賊5人排除（依頼主: 商人）
            [
                {speaker: "冒険者", text: "森に隠れていた山賊5人を排除しました。……人間相手はちょっと緊張しました。"},
                {speaker: "カイト", text: "山賊！？人間だろうが関係ねえ、俺の剣で一掃してやるぜ！次は俺の出番だな！"},
                {speaker: "ルナ", text: "カイト、ちょっと怖いわよ……でも確かに厄介よね。"},
                {speaker: "ギルドマスター", text: "二人とも静かに。商人に報告しよう。"},
                {speaker: "商人", text: "山賊5人を排除してくれたんだ！これで商売が安心してできるよ。本当に助かった、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイト、次は本当に怖がらせないでくれよ。"}
            ],
            // 2: 巨大蜘蛛1匹討伐（依頼主: 村人）
            [
                {speaker: "冒険者", text: "洞窟に潜む巨大蜘蛛を倒してきました。……糸が絡まって最悪でした。"},
                {speaker: "カイト", text: "巨大蜘蛛！？でかくて強そうだな！俺の剣で串刺しにしてやりたかったぜ！"},
                {speaker: "ルナ", text: "蜘蛛の糸は魔法素材になるのに……もったいないわね。"},
                {speaker: "ギルドマスター", text: "ルナ、素材は後で考えろ。村人に報告だ。"},
                {speaker: "村人", text: "巨大蜘蛛を倒してくれたんだ！もう洞窟が怖くなくなったよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は蜘蛛の糸回収も頼むか？"}
            ]
        ],
        'D': [
            // 0: オークの群れ10体（依頼主: 村長）
            [
                {speaker: "冒険者", text: "村を脅かしていたオークの群れ10体を倒してきました。……臭いがキツくて鼻が曲がりそうです。"},
                {speaker: "カイト", text: "オーク10体！？最高じゃん！俺の剣が鳴ってたぜ！次は俺を連れてけよ！"},
                {speaker: "ルナ", text: "カイト、オークの臭いは魔法でも消せないわよ……。"},
                {speaker: "ギルドマスター", text: "二人とも黙って。村長に報告だ。"},
                {speaker: "村長", text: "オークの群れを壊滅させてくれたのか！村が救われたよ……って、臭いは我慢するから大丈夫！本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイトも連れてったら村中がオーク臭になるかもな。"}
            ],
            // 1: トロル1体（依頼主: 橋の番人）
            [
                {speaker: "冒険者", text: "橋を占拠していたトロルを討伐しました。……再生が早くて斬り甲斐ありました。"},
                {speaker: "カイト", text: "トロル！？再生する奴か！俺なら火で焼き払ってたぜ！次は俺の番だ！"},
                {speaker: "ギルドマスター", text: "カイト、火を使ったら橋も燃える。番人に報告だ。"},
                {speaker: "橋の番人", text: "トロルを倒してくれたのか！これで橋が安全になったよ……って、火は勘弁してくれ！ありがとう冒険者さん！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は火を使わない方法でな。"}
            ],
            // 2: 狼王とその群れ（依頼主: ハンター）
            [
                {speaker: "冒険者", text: "森の奥にいる狼王とその群れを狩ってきました。……遠吠えが耳に残ってます。"},
                {speaker: "カイト", text: "狼王！？かっこいい！俺も群れと一緒に戦いたかったぜ！"},
                {speaker: "ルナ", text: "カイト、狼に噛まれたら大変よ。"},
                {speaker: "ギルドマスター", text: "二人とも静かに。ハンターに報告しよう。"},
                {speaker: "ハンター", text: "狼王と群れを狩ってくれたのか！これで森が平和になったよ。本当に感謝だ、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイトを連れてったら狼の遠吠え合唱になるかもな。"}
            ]
        ],
        'D+': [
            // 0: 盗賊15人（依頼主: 貴族）
            [
                {speaker: "冒険者", text: "盗賊団の拠点を襲撃し、15人を倒してきました。……隠し金庫まで見つけましたよ。"},
                {speaker: "カイト", text: "盗賊15人！？大乱闘じゃん！俺なら全員まとめてぶった斬ってたぜ！"},
                {speaker: "ルナ", text: "カイト、隠し金庫は私が見つけたいわ～。"},
                {speaker: "ギルドマスター", text: "二人とも欲が出てるな。貴族に報告だ。"},
                {speaker: "貴族", text: "盗賊15人を倒してくれたのか！領地が安全になったよ……金庫はもちろん没収ね！ありがとう冒険者さん！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。隠し金庫は貴族のおかげで空っぽだ。"}
            ],
            // 1: ミノタウロス（依頼主: 迷宮の管理者）
            [
                {speaker: "冒険者", text: "古代迷宮のミノタウロスを倒してきました。……角が危なかったです。"},
                {speaker: "カイト", text: "ミノタウロス！？角で突き刺す奴か！俺の剣で角をへし折ってやりたかったぜ！"},
                {speaker: "ルナ", text: "角は良い素材になるのに……もったいないわ。"},
                {speaker: "ギルドマスター", text: "ルナ、素材は後で。管理者に報告だ。"},
                {speaker: "迷宮管理者", text: "ミノタウロスを倒してくれたのか！迷宮がまた探索可能になったよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は角を回収してこい。"}
            ],
            // 2: ワイバーン1匹（依頼主: 山村の長老）
            [
                {speaker: "冒険者", text: "山に巣食うワイバーンを討伐しました。……空を飛ばれて苦戦しました。"},
                {speaker: "カイト", text: "ワイバーン！？空飛ぶドラゴンみたいな奴か！俺なら飛びついて首チョンパだぜ！"},
                {speaker: "ルナ", text: "カイト、落ちたら死ぬわよ……。"},
                {speaker: "ギルドマスター", text: "二人とも現実を見ろ。長老に報告だ。"},
                {speaker: "山村長老", text: "ワイバーンを倒してくれたのか！山が平和になったよ。本当に助かった、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はカイトが落ちないよう祈っとく。"}
            ]
        ],
        'C': [
            // 0: オーク戦士20体（依頼主: 要塞司令官）
            [
                {speaker: "冒険者", text: "オーク部族の戦士20体を壊滅させました。……斧が重くて肩が痛いです。"},
                {speaker: "カイト", text: "オーク戦士20体！？最高の大乱戦じゃん！俺の剣が血に染まってたはずだぜ！"},
                {speaker: "ルナ", text: "カイト、血まみれは嫌よ……。"},
                {speaker: "ギルドマスター", text: "二人とも騒がしい。要塞司令官に報告だ。"},
                {speaker: "要塞司令官", text: "オーク戦士20体を壊滅させたのか！前線が持ちこたえられたよ。本当に感謝する、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイト、次は本当に血まみれになるぞ。"}
            ],
            // 1: サイクロプス1体（依頼主: 鉱山主）
            [
                {speaker: "冒険者", text: "巨人のサイクロプスを倒してきました。……一撃が来たら終わりでした。"},
                {speaker: "カイト", text: "サイクロプス！？でかい奴か！俺なら目ん玉をぶった斬ってたぜ！"},
                {speaker: "ルナ", text: "目玉は魔法素材になるのに……もったいないわね。"},
                {speaker: "ギルドマスター", text: "ルナ、また素材か。鉱山主に報告だ。"},
                {speaker: "鉱山主", text: "サイクロプスを倒してくれたのか！鉱山が再開できるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は目玉持って帰ってこい。"}
            ],
            // 2: グリフォン1匹（依頼主: 王都の貴族）
            [
                {speaker: "冒険者", text: "空を飛ぶグリフォンを討伐しました。……爪が鋭くて怖かったです。"},
                {speaker: "カイト", text: "グリフォン！？羽根生えたライオンか！俺なら飛び乗って首を落としてたぜ！"},
                {speaker: "ルナ", text: "グリフォンの羽根は飛翔魔法に使えるのに……惜しいわ。"},
                {speaker: "ギルドマスター", text: "二人とも欲深いな。王都の貴族に報告だ。"},
                {speaker: "王都貴族", text: "グリフォンを倒してくれたのか！空の脅威が消えたよ。本当に感謝する、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は羽根を回収してルナを飛ばすか？"}
            ]
        ],
'C+': [
        // 0: ヒドラ（依頼主: 沼地守護者）
        [
            {speaker: "冒険者", text: "沼地に潜むヒドラを倒しました。すべての頭を焼却……火傷だらけです。"},
            {speaker: "カイト", text: "ヒドラ！？頭が何個あっても俺の剣で一掃だぜ！次は俺が焼いてやる！"},
            {speaker: "ルナ", text: "頭の再生毒は貴重なのに……全部焼いちゃったの？もったいないわ！"},
            {speaker: "ギルドマスター", text: "二人とも後でな。沼地守護者に報告だ。"},
            {speaker: "沼地守護者", text: "ヒドラを完全に倒してくれたのか！沼が浄化されたよ……火傷は治してやる。本当にありがとう！"},
            {speaker: "ギルドマスター", text: "報酬だ。次はカイトの火遊び禁止な。"}
        ],
        // 1: バンシー（依頼主: 聖職者）
        [
            {speaker: "冒険者", text: "呪われたバンシーを鎮めました。……叫び声が耳に残ってます。"},
            {speaker: "カイト", text: "バンシー！？幽霊か！俺の剣で魂ごとぶった斬ってたぜ！"},
            {speaker: "ルナ", text: "バンシーの叫びは呪文の源……封印して研究したかったわ。"},
            {speaker: "ギルドマスター", text: "ルナ、耳栓しろ。聖職者に報告だ。"},
            {speaker: "聖職者", text: "バンシーを鎮めてくれたのか！静寂が戻ったよ。本当に感謝する、ありがとう！"},
            {speaker: "ギルドマスター", text: "報酬を受け取れ。次は叫び声耐性つけとけ。"}
        ],
        // 2: ケンタウロス軍勢12体（依頼主: 平原の将軍）
        [
            {speaker: "冒険者", text: "ケンタウロスの軍勢12体を撃破しました。……馬の蹄が地響きでした。"},
            {speaker: "カイト", text: "ケンタウロス！？馬半分人間半分か！俺なら騎乗して突撃だぜ！"},
            {speaker: "ギルドマスター", text: "カイト、お前が乗ったら暴走だ。将軍に報告だ。"},
            {speaker: "平原の将軍", text: "軍勢12体を撃破してくれたのか！平原が守られたよ。本当に頼もしい、ありがとう！"},
            {speaker: "ギルドマスター", text: "報酬だ。カイトの騎馬隊は夢のまた夢な。"}
        ]
    ],
    'B': [
        // 0: カルト指導者（依頼主: 聖堂騎士団長）
        [
            {speaker: "冒険者", text: "下級デーモンを召喚するカルト指導者を討伐しました。……儀式の魔力がヤバかったです。"},
            {speaker: "カイト", text: "デーモン召喚！？俺なら儀式中に乱入して全員ぶった斬りだぜ！"},
            {speaker: "ルナ", text: "召喚陣の知識……私の本に追加したいわ！"},
            {speaker: "ギルドマスター", text: "ルナ、悪魔本は作るな。騎士団長に報告だ。"},
            {speaker: "聖堂騎士団長", text: "カルト指導者を討伐してくれたのか！闇の脅威が去ったよ。本当にありがとう！"},
            {speaker: "ギルドマスター", text: "報酬を受け取れ。次は召喚陣で遊ぶなよ。"}
        ],
        // 1: 古代ゴーレム（依頼主: 古代遺跡守護者）
        [
            {speaker: "冒険者", text: "暴走した古代ゴーレムを破壊しました。……岩が硬すぎて武器が欠けました。"},
            {speaker: "カイト", text: "ゴーレム！？俺の剣で粉々にしてたぜ！次は俺だ！"},
            {speaker: "ルナ", text: "ゴーレムの核は魔力源……回収してほしかったわ。"},
            {speaker: "ギルドマスター", text: "ルナ、核爆発するぞ。守護者に報告だ。"},
            {speaker: "古代遺跡守護者", text: "ゴーレムを破壊してくれたのか！遺跡が安全になったよ。本当に感謝する！"},
            {speaker: "ギルドマスター", text: "報酬だ。カイトの剣は修理代出せ。"}
        ],
        // 2: アンデッド軍（依頼主: ネクロマンサー狩りの賞金首）
        [
            {speaker: "冒険者", text: "リッチの墓を守るアンデッド軍を一掃しました。……ゾンビ臭が染みつきました。"},
            {speaker: "カイト", text: "アンデッド軍！？俺なら聖剣で一網打尽だぜ！"},
            {speaker: "ルナ", text: "リッチの墓……禁断の知識が眠ってるのに！"},
            {speaker: "ギルドマスター", text: "ルナ、蘇生しないで。賞金首に報告だ。"},
            {speaker: "賞金首", text: "アンデッド軍を一掃してくれたのか！墓が浄化されたよ。本当にありがとう！"},
            {speaker: "ギルドマスター", text: "報酬だ。風呂入ってこい。"}
        ]
    ],'B+': [
        // 0: ヴァンパイア貴族（依頼主: ヴァンパイアハンター）
        [
            {speaker: "冒険者", text: "ヴァンパイア貴族を倒しました。夜の脅威が……日光で弱ってました。"},
            {speaker: "カイト", text: "ヴァンパイア！？俺なら杭で心臓貫通だぜ！血の海にしてた！"},
            {speaker: "ルナ", text: "貴族の血は永遠の命の秘薬かも……もったいないわ。"},
            {speaker: "ギルドマスター", text: "ルナ、吸血鬼になるな。ハンターに報告だ。"},
            {speaker: "ヴァンパイアハンター", text: "ヴァンパイア貴族を倒してくれたのか！夜が安全になったよ。本当に感謝する！"},
            {speaker: "ギルドマスター", text: "報酬だ。日光浴しとけ。"}
        ],
        // 1: フェニックス（依頼主: 鳳凰の守護者）
        [
            {speaker: "冒険者", text: "再生するフェニックスを狩りました。……灰から何度も蘇って疲れました。"},
            {speaker: "カイト", text: "フェニックス！？燃え上がる鳥か！俺なら炎ごとぶった斬りだぜ！"},
            {speaker: "ルナ", text: "再生の灰は不死の秘薬！全部集めた？"},
            {speaker: "ギルドマスター", text: "ルナ、不死は危ない。守護者に報告だ。"},
            {speaker: "鳳凰守護者", text: "フェニックスを狩ってくれたのか！均衡が保たれたよ。本当にありがとう！"},
            {speaker: "ギルドマスター", text: "報酬だ。灰は燃やしとけ。"}
        ],
        // 2: ビヒーモス（依頼主: 大地の守護者）
        [
            {speaker: "冒険者", text: "大地を揺るがすビヒーモスを討伐しました。……地響きで耳がキーンです。"},
            {speaker: "カイト", text: "ビヒーモス！？でかい獣か！俺なら一騎打ちでぶっ倒してたぜ！"},
            {speaker: "ルナ", text: "ビヒーモスの角や皮は最強の防具素材……回収してほしかったわ！"},
            {speaker: "ギルドマスター", text: "ルナ、重すぎて運べないだろ。大地の守護者に報告だ。"},
            {speaker: "大地の守護者", text: "ビヒーモスを討伐してくれたのか！大地の震えが止まったよ。本当に助かった、ありがとう！"},
            {speaker: "ギルドマスター", text: "報酬だ。次はカイトがビヒーモスに乗って暴れそうだな。"}
        ]
    ],
    'A': [
        // 0: 大デーモン（アークデーモン）（依頼主: 大聖堂総主教）
        [
            {speaker: "冒険者", text: "大デーモン、アークデーモンを地獄から引きずり出し、討伐しました。……その咆哮が、ヴォルガスの名を叫んでいました。"},
            {speaker: "ギルドマスター", text: "アークデーモンがヴォルガスの名を……これは彼の配下か。"},
            {speaker: "大聖堂総主教", text: "アークデーモンを倒してくれたのか……その名を聞いたというなら、深淵の王の復活がより近い。黒い鎧の軍勢は、彼の先兵に過ぎなかったのだ。君たちの故郷が破壊されたのは、封印を弱めるためだったのだろう。本当に感謝する。この勝利が、神の光を保つ。"},
            {speaker: "ギルドマスター", text: "報酬だ。深淵に挑む力を蓄えよう。"}
        ],
        // 1: 古代ドラゴン（依頼主: 竜殺しの伝説の騎士）
        [
            {speaker: "冒険者", text: "古代ドラゴンを討伐しました。……その息吹に、深淵の腐敗が混じっていました。"},
            {speaker: "ギルドマスター", text: "ドラゴンが腐敗……ヴォルガスの影響か。"},
            {speaker: "竜殺しの伝説の騎士", text: "古代ドラゴンを倒してくれたのか……その腐敗は、ヴォルガスの闇が古の竜すら蝕んでいた証だ。あの黒い軍勢は、竜の力を利用しようとしたのかもしれない。君たちの村が最初の標的だったのは、竜の守護がそこにあったからか。本当に感謝する。この剣が、君たちの復讐を支える。"},
            {speaker: "ギルドマスター", text: "報酬だ。竜に負けぬ力を。"}
        ],
        // 2: タイタンの巨人（依頼主: 大地の王）
        [
            {speaker: "冒険者", text: "タイタンの巨人を撃破しました。……その体に、ヴォルガスの刻印が刻まれていました。"},
            {speaker: "ギルドマスター", text: "タイタンにまで刻印……深淵の支配が広がっている。"},
            {speaker: "大地の王", text: "タイタンを倒してくれたのか……刻印は、ヴォルガスが古の巨人を操っていた証だ。あの軍勢は、大地の力を奪うために動いていた。君たちの故郷が破壊されたのは、大地の守りがそこにあったからだろう。本当に感謝する。この大地が、君たちを守る。"},
            {speaker: "ギルドマスター", text: "報酬だ。大地のように揺るがぬ力を。"}
        ]
    ],
    'A+': [
        // 0: ドラゴンの王（依頼主: 竜の盟約者）
        [
            {speaker: "冒険者", text: "ドラゴンの王を討伐しました。……その最期の言葉が、ヴォルガスの復活を喜んでいました。"},
            {speaker: "ギルドマスター", text: "ドラゴンの王がヴォルガスを……完全に支配されていたのか。"},
            {speaker: "竜の盟約者", text: "ドラゴンの王を倒してくれたのか……その喜びは、ヴォルガスの闇が竜の誇りを蝕んだ結果だ。あの黒い軍勢は、竜の軍を呼び寄せるためのものだったのかもしれない。君たちの村が狙われたのは、竜の盟約を断つためか。本当に感謝する。この翼が、君たちを支える。"},
            {speaker: "ギルドマスター", text: "報酬だ。王に挑む力を。"}
        ],
        // 1: リッチキングと不死軍（依頼主: 不死狩りの聖者）
        [
            {speaker: "冒険者", text: "リッチキングとその不死軍を壊滅させました。……王の魂が、ヴォルガスの名を呟いていました。"},
            {speaker: "ギルドマスター", text: "リッチキングがヴォルガスに……不死の軍勢が彼のものか。"},
            {speaker: "不死狩りの聖者", text: "リッチキングを壊滅させてくれたのか……その呟きは、ヴォルガスが不死を操っていた証だ。あの軍勢は、不死の軍を呼び起こすためのものだった。君たちの故郷が破壊されたのは、生の守りを弱めるためだろう。本当に感謝する。この聖なる光が、君たちを守る。"},
            {speaker: "ギルドマスター", text: "報酬だ。不死に抗う力を。"}
        ],
        // 2: 堕落した天使（依頼主: 天界の使者）
        [
            {speaker: "冒険者", text: "堕落した天使を倒しました。……その翼から、深淵の闇が滴り落ちていました。"},
            {speaker: "ギルドマスター", text: "天使が堕落……ヴォルガスの力が天にまで及んでいるのか。"},
            {speaker: "天界の使者", text: "堕落した天使を倒してくれたのか……その闇は、ヴォルガスが天界を蝕んでいた証だ。あの黒い軍勢は、天の守りを崩すためのものだった。君たちの村が狙われたのは、光の血統がそこにあったからか。本当に感謝する。この翼が、君たちを導く。"},
            {speaker: "ギルドマスター", text: "報酬だ。堕落に染まらぬ力を。"}
        ]
    ],
    'S': [
        // 0: 古の悪神（依頼主: 世界の守護者）
        [
            {speaker: "冒険者", text: "深淵から現れた古の悪神を討伐しました。……その存在が、世界を歪めていました。"},
            {speaker: "ギルドマスター", text: "古の悪神……ヴォルガスの本体の片鱗か。"},
            {speaker: "世界の守護者", text: "古の悪神を討伐してくれたのか……それはヴォルガスの分身の一つだ。あの黒い軍勢は、彼の復活のための儀式だった。君たちの故郷が破壊されたのは、世界の均衡を崩すため……だが、君たちがここにいるのは、均衡の反撃だ。本当に感謝する。この世界が、君たちに味方する。"},
            {speaker: "ギルドマスター", text: "報酬だ。世界を守る力を。"}
        ],
        // 1: エルダードラゴン（依頼主: 時を超えた賢者）
        [
            {speaker: "冒険者", text: "世界を焼き尽くすエルダードラゴンを倒しました。……その炎が、深淵の門を開こうとしていました。"},
            {speaker: "ギルドマスター", text: "エルダードラゴンが門を……ヴォルガスの最終段階か。"},
            {speaker: "時を超えた賢者", text: "エルダードラゴンを倒してくれたのか……その炎は、ヴォルガスの復活を加速させるものだった。あの軍勢は、ドラゴンを目覚めさせるためのもの。君たちの村が最初の犠牲だったのは、時の守りがそこにあったからだ。本当に感謝する。この時が、君たちを待っていた。"},
            {speaker: "ギルドマスター", text: "報酬だ。時を超える力を。"}
        ],
        // 2: レヴィアタン（依頼主: 海の女神）
        [
            {speaker: "冒険者", text: "神話の海獣レヴィアタンを討伐しました。……その咆哮が、海を深淵に変えようとしていました。"},
            {speaker: "ギルドマスター", text: "レヴィアタンが……ヴォルガスの海の化身か。"},
            {speaker: "海の女神", text: "レヴィアタンを討伐してくれたのか……それはヴォルガスの海を支配する力だった。あの軍勢は、海から上陸するためのもの。君たちの故郷が狙われたのは、海の守りがそこにあったからだ。本当に感謝する。この海が、君たちを支える。"},
            {speaker: "ギルドマスター", text: "報酬だ。海のように深い力を。"}
        ]
    ]

    },
    // 1: WIS - discovery quests
    {
        'F': [
            // 0: ペンダント探索（依頼主: おばあさん）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '町で失くされたおばあさんのペンダント、無事に見つけました！路地裏の石の下に落ちてました。'},
                {speaker: '{adv2}', text: 'へっ、そんな小さいもん俺なら一瞬で見つけてたぜ！ただの運だろ？'},
                {speaker: '{adv1}', text: 'ちゃんと探さないと見つかりませんよ…ふふ。'},
                {speaker: '{adv2}', text: 'この彫刻…なんか見たことあるな。昔のギルドマスターのものに似てる気が…'},
                {speaker: '{adv1}', text: 'しっ！今はダメです！{PLAYER}、早くおばあさんに返しましょう。'},
                {speaker: '{PLAYER}', text: 'ギルドマスターの…？まあいい、後で聞くよ。'},
                // Line 7-8 (index 6-7)
                {speaker: 'おばあさん', text: 'ああ、私の大事なペンダント…！この彫刻は昔の収穫祭でもらったものなの。平和な頃の思い出よ…'},
                {speaker: 'おばあさん', text: '最近また国境で兵が動いてるって聞いて心配だったわ。本当にありがとう、涙が出ちゃう…'},
                // Line 9 (index 8) - Reward line by quest giver
                {speaker: 'おばあさん', text: '無事で見つかってよかった。これが報酬だよ。大事にしてくださいね。'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：発見後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: 'ペンダントについてさらに洞察を与える（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '発見情報を酒場主人に売って追加金を得る（+150 Gold、参加冒険者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'マナを使ってさらに調査させ賢さを鍛える（参加冒険者 MP -50、WIS +3）',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: 'この彫刻、昔の収穫祭のシンボルに似てますね。平和な時代のものだ。大事に保管した方がいいかも。'},
                {speaker: 'おばあさん', text: 'そうね…教えてくれてありがとう。少し安心したわ。'},
                {speaker: 'おばあさん', text: '冒険者さんみたいな人がいてくれて本当に助かるよ！', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。小さなペンダントをしっかり見つけてくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が大活躍する番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: 'このペンダントの詳細、酒場主人に話せば情報料もらえるぞ。ギルド資金にしよう。'},
                {speaker: '{adv1}', text: '……確かに価値はあるけど、ちょっとずるいかも…'},
                {speaker: '{adv2}', text: '金のためなら我慢だぜ！でも次は俺にやらせろよな！'},
                {speaker: '{PLAYER}', text: 'はは、任せた。', jumptoline: 27},
                // Branch 4: Mana investigation (elaborated discovery)
                {speaker: '{PLAYER}', text: 'せっかくだからマナを使ってさらに調べてみろ。賢くなるいい鍛錬だ。'},
                {speaker: '{adv1}', text: '…マナを消費してペンダントを調べました。微弱な保護魔力が反応して…昔の平和を祈る呪いがかけられていたようです。今はほとんど力が残ってないけど…'},
                {speaker: '{adv2}', text: '平和の呪いかよ…国境が騒がしい今じゃ、なんか胸にくるな！'},
                {speaker: '{PLAYER}', text: '確かに興味深い。その調子だ。', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ],
            // 1: 隠し宝箱発見（依頼主: 村人）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '森の隠し宝箱、見つけてきました！木の根元に埋まってました。'},
                {speaker: '{adv2}', text: '隠し宝箱だぜ！…って、中身金貨3枚だけかよ！？期待してたのに！'},
                {speaker: '{adv1}', text: '見つけただけで十分ですよ。この古銭、昔の王政時代のものですね。珍しいです。'},
                {speaker: '{adv2}', text: 'この場所…なんか見たことあるな。昔のギルドマスターが{PLAYER}と遊んでた場所に似てる…'},
                {speaker: '{adv1}', text: 'しっ！余計なこと言わないで！{PLAYER}、村人に報告しましょう。'},
                {speaker: '{PLAYER}', text: '昔のギルドマスターと…？まあいい、後で聞くよ。'},
                // Line 7-8 (index 6-7)
                {speaker: '村人', text: '本当に隠し宝箱を見つけてくれたのか！子供の頃聞いた伝説が本当だったんだ。'},
                {speaker: '村人', text: 'この古銭、王政時代のだ。最近王族の血筋がどうのって噂があって、みんなざわついてるよ。'},
                // Line 9 (index 8)
                {speaker: '村人', text: '中身は報酬として受け取ってくれ！本当に助かった、ありがとう！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：発見後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '宝箱についてさらに洞察を与える（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '発見情報を酒場主人に売って追加金を得る（+150 Gold、参加冒険者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'マナを使ってさらに調査させ賢さを鍛える（参加冒険者 MP -50、WIS +3）',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: 'この古銭、王政時代の珍しいものだ。場所を記録しておけば他にも見つかるかもしれないぞ。'},
                {speaker: '村人', text: 'なるほど！早速やってみるよ！これで安心だ、ありがとう！'},
                {speaker: '村人', text: '冒険者さんみたいな人がいてくれて、本当に助かるよ！', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。伝説の宝箱を見つけるなんてすごいぞ。頼りになる。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が大活躍する番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: 'この宝箱の詳細、酒場主人に話せば情報料もらえるぞ。ギルド資金にしよう。'},
                {speaker: '{adv1}', text: '……確かに価値はあるけど、ちょっとずるいかも…'},
                {speaker: '{adv2}', text: '金のためなら我慢だぜ！でも次は俺にやらせろよな！'},
                {speaker: '{PLAYER}', text: 'はは、任せた。', jumptoline: 27},
                // Branch 4: Mana investigation (elaborated discovery)
                {speaker: '{PLAYER}', text: 'せっかくだからマナを使ってさらに調べてみろ。賢くなるいい鍛錬だ。'},
                {speaker: '{adv1}', text: 'マナを流してみました…この場所の土に隠された魔法の印が浮かび上がりました。他の隠し場所を示すネットワークみたいです。王政時代の秘密がまだ残ってる…'},
                {speaker: '{adv2}', text: 'おお！もっと宝が眠ってるってことか！？冒険が広がるぜ！'},
                {speaker: '{PLAYER}', text: '面白い発見だ。その調子だ。', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ],
            // 2: 井戸の秘密（依頼主: 学者）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '古い井戸の底の秘密、発見しました！苔の下に古代の魔法陣が光ってました。'},
                {speaker: '{adv2}', text: '魔法陣！？すげえ！俺も飛び込んでみたかったぜ、冒険っぽいだろ！'},
                {speaker: '{adv1}', text: '落ちたら死にますよ…しっかり調査しないと。'},
                {speaker: '{adv2}', text: 'この魔法陣…なんか見たことある感じがする。昔のギルドマスターが{PLAYER}と関係あるような…'},
                {speaker: '{adv1}', text: 'しっ！今はダメです！{PLAYER}、学者さんに報告しましょう。'},
                {speaker: '{PLAYER}', text: 'ギルドマスターと…？まあいい、後で聞くよ。'},
                // Line 7-8 (index 6-7)
                {speaker: '学者', text: '井戸の魔法陣を暴いてくれたのか！素晴らしい！古代の封印陣だよ、大発見だ！'},
                {speaker: '学者', text: '最近首都でも似た陣が反応してるって報告があってね。魔力の大きな異変が起きているのかもしれない…'},
                // Line 9 (index 8)
                {speaker: '学者', text: '本当に助かった！これが報酬だ。研究を続けさせてくれ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：発見後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '魔法陣についてさらに洞察を与える（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '発見情報を酒場主人に売って追加金を得る（+150 Gold、参加冒険者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'マナを使ってさらに調査させ賢さを鍛える（参加冒険者 MP -50、WIS +3）',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: 'この魔法陣、古代の封印ですね。定期的に魔力をチェックすると異変に気づきやすいかも。'},
                {speaker: '学者', text: 'その通り！早速やってみるよ！これで安心だ、ありがとう！'},
                {speaker: '学者', text: '冒険者さんみたいな人がいてくれて、本当に助かるよ！', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。古代の魔法陣を見つけるなんてすごいぞ。頼りになる。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が大活躍する番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: 'この魔法陣の詳細、酒場主人に話せば情報料もらえるぞ。ギルド資金にしよう。'},
                {speaker: '{adv1}', text: '……確かに価値はあるけど、ちょっとずるいかも…'},
                {speaker: '{adv2}', text: '金のためなら我慢だぜ！でも次は俺にやらせろよな！'},
                {speaker: '{PLAYER}', text: 'はは、任せた。', jumptoline: 27},
                // Branch 4: Mana investigation (elaborated discovery)
                {speaker: '{PLAYER}', text: 'せっかくだからマナを使ってさらに調べてみろ。賢くなるいい鍛錬だ。'},
                {speaker: '{adv1}', text: '魔法陣にマナを注いでみました…陣が共鳴して、首都の方角に弱い反応が…この異変、複数の封印陣で連鎖してる可能性があります。'},
                {speaker: '{adv2}', text: 'やばいなそれ！大きな魔力の波が来てるってことか！？熱いぜ！'},
                {speaker: '{PLAYER}', text: '注意が必要だ。その調子だ。', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ]
        ],
        'F+': [
            // 0: 滝の裏の洞窟発見（依頼主: 探検家）
            [
                {speaker: "冒険者", text: "森の奥の滝の裏に隠された洞窟を発見しました。……水しぶきでびしょ濡れです。"},
                {speaker: "ルナ", text: "滝の裏！？ロマンチックね～。きっと隠された遺跡よ！"},
                {speaker: "カイト", text: "水がかかるなら俺はパスだな……濡れるの嫌いだし。"},
                {speaker: "ギルドマスター", text: "二人とも黙ってろ。探検家に報告だ。"},
                {speaker: "探検家", text: "滝の裏の洞窟を見つけてくれたんだ！これで新しい冒険が始められるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はカイトも濡れ覚悟で連れてくか。"}
            ],
            // 1: 古い家の隠し地下室（依頼主: 家主）
            [
                {speaker: "冒険者", text: "古い家の隠し地下室を探し当てました。……埃まみれでくしゃみ止まりません。"},
                {speaker: "ルナ", text: "隠し地下室！？きっと秘密の書庫か宝物庫ね！私の推理が当たってるわ！"},
                {speaker: "ギルドマスター", text: "ルナ、埃で本が傷まないよう気をつけろ。家主に報告しよう。"},
                {speaker: "家主", text: "隠し地下室を見つけてくれたのか！先祖の秘密がようやく解けるよ。ありがとう冒険者さん！"},
                {speaker: "ギルドマスター", text: "報酬だ。ルナ、次は掃除当番な。"}
            ],
            // 2: 川沿いの隠された小屋（依頼主: 漁師）
            [
                {speaker: "冒険者", text: "川沿いに隠された小屋を見つけました。……虫が多くて大変でした。"},
                {speaker: "ルナ", text: "隠された小屋……もしかして密輸の隠れ家？面白そう！"},
                {speaker: "カイト", text: "虫！？俺なら全部踏み潰してたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも想像しすぎ。漁師に報告だ。"},
                {speaker: "漁師", text: "川沿いの隠された小屋を見つけてくれたんだ！昔の道具がまだ使えるよ。本当に助かる、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は虫除け持ってけ。"}
            ]
        ],


        'D': [
            // 0: 小さな遺跡の入り口（依頼主: 考古学者）
            [
                {speaker: "冒険者", text: "近くの丘にある小さな遺跡の入り口を発見しました。……罠が多かったです。"},
                {speaker: "ルナ", text: "遺跡の入り口！？私の本に載ってた模様ね！絶対に古代魔法よ！"},
                {speaker: "カイト", text: "罠か……俺なら全部ぶっ壊してたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも落ち着け。考古学者に報告だ。"},
                {speaker: "考古学者", text: "小さな遺跡の入り口を見つけてくれたのか！新たな発見が待ってるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はルナの魔法で罠を解除するか。"}
            ],
            // 1: 隠しキャンプ（依頼主: 衛兵隊長）
            [
                {speaker: "冒険者", text: "盗賊が使う隠しキャンプを探し当てました。……警戒が厳しかったです。"},
                {speaker: "ルナ", text: "隠しキャンプの位置……地形から推理してた通りね！"},
                {speaker: "ギルドマスター", text: "ルナ、自慢は後にしろ。衛兵隊長に報告だ。"},
                {speaker: "衛兵隊長", text: "盗賊の隠しキャンプを見つけてくれたのか！これで一網打尽にできるよ。ありがとう冒険者さん！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナの推理で敵を全滅か？"}
            ],
            // 2: キャラバンの残骸（依頼主: 商会長）
            [
                {speaker: "冒険者", text: "行方不明のキャラバンの残骸を見つけました。……悲しい現場でした。"},
                {speaker: "ルナ", text: "キャラバンの残骸……荷物は無事？商会の記録が欲しいわ。"},
                {speaker: "ギルドマスター", text: "ルナ、遺族の気持ちも考えろ。商会長に報告だ。"},
                {speaker: "商会長", text: "キャラバンの残骸を見つけてくれたのか……真相がわかるよ。本当にありがとう。"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。少しは心が癒えるといいな。"}
            ]
        ],
        'D+': [
            // 0: 古代寺院（依頼主: 神官）
            [
                {speaker: "冒険者", text: "埋もれた古代寺院の場所を発見しました。……神聖な空気が漂ってました。"},
                {speaker: "ルナ", text: "古代寺院！？私の研究にぴったり！神聖魔法の痕跡ね！"},
                {speaker: "ギルドマスター", text: "ルナ、興奮しすぎ。神官に報告だ。"},
                {speaker: "神官", text: "古代寺院を見つけてくれたのか！信仰が復活するよ。本当に感謝する、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナも祈りに行け。"}
            ],
            // 1: 隠された鉱脈（依頼主: 鉱夫頭）
            [
                {speaker: "冒険者", text: "山の隠された鉱脈を探し当てました。……崩落が怖かったです。"},
                {speaker: "ルナ", text: "鉱脈の成分は……魔力結晶かも！研究したいわ～。"},
                {speaker: "カイト", text: "鉱脈なら俺が掘りまくってたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも静かに。鉱夫頭に報告だ。"},
                {speaker: "鉱夫頭", text: "隠された鉱脈を見つけてくれたのか！これで村が潤うよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は二人で採掘作業か？"}
            ],
            // 2: 湖底の村の痕跡（依頼主: 歴史家）
            [
                {speaker: "冒険者", text: "湖底に沈んだ村の痕跡を見つけました。……水中で息が苦しかったです。"},
                {speaker: "ルナ", text: "沈んだ村！？水没の呪いかも……興味深いわ！"},
                {speaker: "ギルドマスター", text: "ルナ、呪いはやめろ。歴史家に報告だ。"},
                {speaker: "歴史家", text: "湖底の村の痕跡を見つけてくれたのか！失われた歴史が蘇るよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナが水没しないよう祈っとく。"}
            ]
        ],
        'C': [
            // 0: 忘れられた城の秘密通路（依頼主: 王国騎士）
            [
                {speaker: "冒険者", text: "忘れられた城の秘密通路を発見しました。……幽霊が出そうで怖かったです。"},
                {speaker: "ルナ", text: "秘密通路！？城の隠し財宝か王族の逃げ道ね！私の推理が当たってるわ！"},
                {speaker: "カイト", text: "幽霊なら俺がぶった斬ってやるぜ！"},
                {speaker: "ギルドマスター", text: "二人とも落ち着け。王国騎士に報告だ。"},
                {speaker: "王国騎士", text: "忘れられた城の秘密通路を見つけてくれたのか！戦略が変わるよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は幽霊退治も頼むか？"}
            ],
            // 1: 魔法の泉（依頼主: 大魔導士）
            [
                {speaker: "冒険者", text: "魔法の泉の正確な位置をマッピングしました。……魔力が強すぎて頭がクラクラします。"},
                {speaker: "ルナ", text: "魔法の泉！？私が行きたかったわ～！魔力補給し放題ね！"},
                {speaker: "ギルドマスター", text: "ルナ、飲みすぎるな。大魔導士に報告だ。"},
                {speaker: "大魔導士", text: "魔法の泉の位置を特定してくれたのか！研究が捗るよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナを連れてったら泉が空になるかも。"}
            ],
            // 2: 呪われた森の祠（依頼主: 浄化師）
            [
                {speaker: "冒険者", text: "呪われた森の中心にある祠を探し出しました。……呪いが染みついてます。"},
                {speaker: "ルナ", text: "祠の呪い……古代の封印ね！解呪したいわ！"},
                {speaker: "ギルドマスター", text: "ルナ、呪われたら困る。浄化師に報告だ。"},
                {speaker: "浄化師", text: "呪われた森の祠を見つけてくれたのか！浄化が可能になったよ。本当に助かった！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はルナが呪われないよう見張っとく。"}
            ]

            
        ],
        'C+': [
            // 0: 失われた文明の遺跡（依頼主: 古代史学者）
            [
                {speaker: "冒険者", text: "失われた文明の遺跡を発見しました。……壁画が美しくて見とれてました。"},
                {speaker: "ルナ", text: "失われた文明！？私の本にない文字がいっぱいね！早く解読させて～！"},
                {speaker: "カイト", text: "遺跡なら宝物だろ！俺も掘りに行きたかったぜ！"},
                {speaker: "ギルドマスター", text: "二人とも遺跡を壊すな。古代史学者に報告だ。"},
                {speaker: "古代史学者", text: "失われた文明の遺跡を見つけてくれたのか！歴史が書き換えられるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。ルナの解読は夜通しになりそうだな。"}
            ],
            // 1: 雲の上に浮かぶ島（依頼主: 空の探検家）
            [
                {speaker: "冒険者", text: "雲の上に浮かぶ島への道を見つけました。……高所恐怖症が治りそうです。"},
                {speaker: "ルナ", text: "浮かぶ島！？重力魔法の極致ね！私も飛んで行きたかったわ～！"},
                {speaker: "カイト", text: "雲の上か！俺なら飛び乗って冒険だぜ！落ちても気合いで！"},
                {speaker: "ギルドマスター", text: "カイト、気合いで落ちるな。空の探検家に報告だ。"},
                {speaker: "空の探検家", text: "浮かぶ島への道を見つけてくれたのか！空の秘境が開かれたよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は二人でパラシュート持ってけ。"}
            ],
            // 2: 不安定な次元ポータル（依頼主: 次元魔導士）
            [
                {speaker: "冒険者", text: "不安定な次元ポータルの場所を発見しました。……空間が歪んで吐きそうでした。"},
                {speaker: "ルナ", text: "次元ポータル！？異世界の魔力が感じられるわ！私が行きたかった～！"},
                {speaker: "カイト", text: "異世界か！俺の剣で征服してくるぜ！"},
                {speaker: "ギルドマスター", text: "二人とも異世界で迷子になるな。次元魔導士に報告だ。"},
                {speaker: "次元魔導士", text: "次元ポータルの場所を見つけてくれたのか！新たな研究が始まるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナが異世界に飛ばされないよう祈っとく。"}
            ]
        ],
        'B': [
            // 0: 迷宮のような峡谷の隠された道（依頼主: 地図の賢者 エルドリン ※NPC関連）
            [
                {speaker: "冒険者", text: "迷宮のような峡谷の隠された道を地図化しました。……方向音痴になりかけました。"},
                {speaker: "ルナ", text: "峡谷の隠し道！？伝説の宝への近道ね！エルドリンさん喜ぶわ！"},
                {speaker: "カイト", text: "迷宮か！俺なら壁ぶち破って最短ルート作ってたぜ！"},
                {speaker: "ギルドマスター", text: "カイト、地図が台無しだ。エルドリンに報告だ。"},
                {speaker: "エルドリン", text: "峡谷の隠された道を地図化してくれたのか！私の地図が完成に近づいたよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は壁壊さないでな。"}
            ],
            // 1: 砂漠の砂丘の失われた星の神殿（依頼主: 星の観測者 アストリッド ※NPC関連）
            [
                {speaker: "冒険者", text: "砂漠の砂丘に失われた星の神殿を発掘しました。……砂嵐で目が開けられませんでした。"},
                {speaker: "ルナ", text: "星の神殿！？星座の秘密が解けるわ！アストリッドさん大興奮ね！"},
                {speaker: "カイト", text: "砂漠か！熱いけど俺なら剣で砂切り開いてたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも砂漠で遊ぶな。アストリッドに報告だ。"},
                {speaker: "アストリッド", text: "失われた星の神殿を発掘してくれたのか！星の謎が解けるよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は熱中症対策を。"}
            ],
            // 2: アジュール湖の下の沈んだ遺跡（依頼主: 深海の探求者 コルバト ※NPC関連）
            [
                {speaker: "冒険者", text: "アジュール湖の下の沈んだ遺跡を見つけました。……水圧で耳が痛かったです。"},
                {speaker: "ルナ", text: "沈んだ遺跡！？水文明の魔法が眠ってるわ！コルバトさん待ってるわね！"},
                {speaker: "カイト", text: "水中か！俺なら息止めて潜ってたぜ！"},
                {speaker: "ギルドマスター", text: "カイト、溺れるな。コルバトに報告だ。"},
                {speaker: "コルバト", text: "湖底の沈んだ遺跡を見つけてくれたのか！深海の謎に光が当たるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は酸素ボンベ持ってけ。"}
            ]
        ],
        'B+': [
            // 0: エコーケイブの秘密の間（依頼主: 反響の予見者 シララ ※NPC関連）
            [
                {speaker: "冒険者", text: "エコーケイブの秘密の間を発見しました。……ささやきが予言みたいで怖かったです。"},
                {speaker: "ルナ", text: "エコーの秘密の間！？予言の声が聞けるわ！シララさん大喜びね！"},
                {speaker: "カイト", text: "ささやき！？大声で叫んで反響楽しんでたぜ！"},
                {speaker: "ギルドマスター", text: "カイト、予言が台無しだ。シララに報告だ。"},
                {speaker: "シララ", text: "秘密の間を見つけてくれたのか！予言が鮮明になったよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は静かにしろよ。"}
            ],
            // 1: クラウドピークの忘れられた天文台（依頼主: 星の観測者 アストリッド ※重複だがOK）
            [
                {speaker: "冒険者", text: "クラウドピークの忘れられた天文台を位置づけました。……雲で視界ゼロでした。"},
                {speaker: "ルナ", text: "忘れられた天文台！？多宇宙が見えるかも！アストリッドさん興奮ね！"},
                {speaker: "カイト", text: "雲の上か！俺なら雲蹴散らしてたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも天文台壊すな。アストリッドに報告だ。"},
                {speaker: "アストリッド", text: "忘れられた天文台を見つけてくれたのか！宇宙の秘密が解けるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は雲を蹴るな。"}
            ],
            // 2: ウィスパリングウッドのハートツリー（依頼主: 森のドルイド リオラ ※NPC関連）
            [
                {speaker: "冒険者", text: "ウィスパリングウッドのハートツリーを探検しました。……木がささやいてました。"},
                {speaker: "ルナ", text: "森のハートツリー！？自然魔法の源ね！リオラさん待ってるわ！"},
                {speaker: "カイト", text: "木が喋る！？俺なら剣で会話してたぜ！"},
                {speaker: "ギルドマスター", text: "カイト、木を斬るな。リオラに報告だ。"},
                {speaker: "リオラ", text: "ハートツリーを見つけてくれたのか！森の力が蘇るよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。木との会話は控えめに。"}
            ]
        ],        'A': [
            // 0: アッシェンウェイストの埋もれた天文台を発掘せよ。火山の異常。（依頼主: 火山の観測者ヴォルカノス）
            [
                {speaker: "冒険者", text: "アッシェンウェイストの埋もれた天文台を発掘しました。……火山の異常活動が、深淵の魔力で引き起こされていました。"},
                {speaker: "ルナ", text: "深淵の魔力……ヴォルガスの仕業ね。星の動きまで歪めようとしてるなんて……。"},
                {speaker: "ギルドマスター", text: "ヴォルガスが火山の力を利用しようとしているのか。"},
                {speaker: "ヴォルカノス", text: "その天文台を……異常はヴォルガスが炎と破壊の領域を支配するための儀式だった。あの黒い軍勢は、火山のエネルギーを奪う先兵に過ぎない。君たちの故郷が狙われたのは、火の守護の血が流れていたからだろう。本当に感謝する。この炎が、君たちの復讐を燃やす。"},
                {speaker: "ギルドマスター", text: "報酬だ。炎のように燃える力を。"
                }
            ],
            // 1: エンドレスサンドのミラージュオアシスを見つけよ。幻か現実か？（依頼主: 幻影の賢者ミラージュ）
            [
                {speaker: "冒険者", text: "エンドレスサンドのミラージュオアシスを発見しました。……幻のオアシスは、ヴォルガスの幻惑魔法で作り出されたものでした。"},
                {speaker: "ルナ", text: "幻惑魔法の規模が凄すぎる……これ、私の魔法じゃ太刀打ちできないわ。"},
                {speaker: "ギルドマスター", text: "ヴォルガスが人心を操る力を持っているのか……。"},
                {speaker: "ミラージュ", text: "ミラージュオアシスを……それはヴォルガスが旅人を惑わせ、軍勢を無血で増やすための罠だった。あの軍勢は幻で数を増やし、実体で襲う策略。君たちの村が最初に狙われたのは、真実を見抜く清らかな心がそこにあったからだ。本当に感謝する。この幻が、君たちを惑わせぬよう祈る。"},
                {speaker: "ギルドマスター", text: "報酬だ。幻に惑われぬ力を。"
                }
            ],
            // 2: クリスタルカーブンの輝く鉱脈をチャートせよ。アーティファクトの力源。（依頼主: 結晶の守護者クリスタリア）
            [
                {speaker: "冒険者", text: "クリスタルカーブンの輝く鉱脈を完全にマッピングしました。……その魔力の源が、ヴォルガスの闇の結晶として汚染されていました。"},
                {speaker: "ルナ", text: "闇の結晶……あれほどの魔力濃度、私の研究でも見たことないわ。ヴォルガスの力の源の一つね……。"},
                {speaker: "ギルドマスター", text: "ヴォルガスがこんな力の源を複数持っているのか……。"},
                {speaker: "クリスタリア", text: "輝く鉱脈を……それはヴォルガスが無限の魔力を得るための鍵だった。あの黒い軍勢は結晶を奪い、永遠の支配を築くためのもの。君たちの故郷が破壊されたのは、純粋な光の結晶がそこに眠っていたからだ。本当に感謝する。この結晶の光が、君たちを導く。"},
                {speaker: "ギルドマスター", text: "報酬だ。結晶のように揺るがぬ力を。"
                }
            ]
        ],
        'A+': [
            // 0: ソーンウォールメイズの隠されたグローブを発見せよ。永遠の若さが咲く。（依頼主: 永遠の庭師エテルナ）
            [
                {speaker: "冒険者", text: "ソーンウォールメイズの隠されたグローブを発見しました。……永遠の若さの木が、ヴォルガスの不死の呪いで完全に支配されていました。"},
                {speaker: "ルナ", text: "不死の呪い……あれはヴォルガスが究極の目的とするものね。私たちも気をつけないと……。"},
                {speaker: "ギルドマスター", text: "ヴォルガス自身が不死を求めているのか……。"},
                {speaker: "エテルナ", text: "隠されたグローブを……それはヴォルガスが肉体を超えた永遠の存在になるための最後の鍵だった。あの軍勢は生命の源を奪い、不死の軍勢を築くため。君たちの村が最初の標的だったのは、生命の種——純粋な魂がそこにあったからだ。本当に感謝する。この生命の木が、君たちに新たな未来を与える。"},
                {speaker: "ギルドマスター", text: "報酬だ。不死に抗う、生の力を。"
                }
            ]
        ],
        'S': [
        // 0: 宇宙の果てに存在する禁断の神殿（S専用1）
        [
            {speaker: "冒険者", text: "宇宙の果ての禁断の神殿を発見しました。……神殿の中心に、ヴォルガスの真の姿が封じられていました。"},
            {speaker: "ギルドマスター", text: "真の姿……これがすべてのはじまりか。"},
            {speaker: "宇宙の観測者", text: "禁断の神殿を……ここにヴォルガスの本体が封じられている。あの黒い軍勢は、本体を解放するためのものだった。君たちの故郷が破壊されたのは、最後の封印がそこにあったからだ。本当に感謝する。この発見が、世界の終わりを防ぐ。"},
            {speaker: "ギルドマスター", text: "報酬だ。宇宙の終わりを止める力を。"}
        ],
        // 1: 世界の起源を記した究極の図書館（S専用2）
        [
            {speaker: "冒険者", text: "世界の起源を記した究極の図書館を見つけました。……起源の書に、ヴォルガスが世界の闇そのものであると記されていました。"},
            {speaker: "ギルドマスター", text: "世界の闇そのもの……我々の戦いは起源にまで及ぶのか。"},
            {speaker: "起源の守護者", text: "究極の図書館を……ヴォルガスは起源から存在する闇だ。あの軍勢は、起源を闇に染めるためのものだった。君たちの村が最初の標的だったのは、起源の光が生まれた場所だから。本当に感謝する。この起源が、新たな世界を生む。"},
            {speaker: "ギルドマスター", text: "報酬だ。起源を塗り替える力を。"}
        ],
        // 2: 神々が会議を行う隠された領域（S専用3）
        [
            {speaker: "冒険者", text: "神々が会議を行う隠された領域を発見しました。……神々は、ヴォルガスとの最終決戦を予見していました。"},
            {speaker: "ギルドマスター", text: "最終決戦……我々がその鍵か。"},
            {speaker: "神界の使者", text: "隠された領域を……神々は、ヴォルガスが神界を滅ぼすと恐れていた。あの軍勢は、神の力を弱めるためのものだった。君たちの故郷が破壊されたのは、神の意志がそこに宿っていたからだ。本当に感謝する。この神々が、君たちを選んだ。"},
            {speaker: "ギルドマスター", text: "報酬だ。神々に選ばれた力を。"}
        ]
    ]
    },
    // 2: DEX - escort quests
    {
        'F': [
            // 0: 農夫護衛（依頼主: 農夫）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: '農夫さんを市場まで無事護衛完了！道中何も起きなくて超つまんねえ旅だったぜ！'},
                {speaker: '{PLAYER}', text: '無事で何よりだ。平和が一番だろ。'},
                {speaker: '{adv1}', text: '事件が起きなくてよかったですよ。{adv2}さんが暴れ出したら農夫さんが怖がりますもの。'},
                {speaker: '{adv2}', text: 'おいおい、俺の活躍見たかっただろ農夫さん！…あれ？この道、昔前のギルドマスターが商隊護衛してた…'},
                {speaker: '{adv1}', text: 'しっ！今は黙ってて！{PLAYER}、農夫さんに報告しましょう。'},
                {speaker: '{PLAYER}', text: '商隊護衛…？まあ後で聞くよ。農夫さん、無事着きましたね。'},
                // Line 7-8 (index 6-7)
                {speaker: '農夫', text: '本当にありがとう！最近交易路で盗賊が増えて怖くて一人じゃ行けなかったんだ。市場で高く売れたよ！'},
                {speaker: '農夫', text: '国境で税金も上がってるって噂で、物価高騰しそう…君たちのおかげで助かった！'},
                // Line 9 (index 8)
                {speaker: '農夫', text: '無事でよかった。これが報酬だ。本当にありがとう！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：護衛後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '道中で何か特別なものを見なかったか聞く（+1 Lucky Coin）',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '世界が危ない今、追加報酬を要求する（+300 Gold、参加冒険者好感度 -10）',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'もう少し依頼主を護衛させて敏捷性を鍛える（参加冒険者 HP -50、DEX +3）',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '道中で何か特別なものを見なかったか？変わったものとか。'},
                {speaker: '{adv1}', text: 'そういえば、道端で古びた幸運のコインを見つけました。特別な感じがしたので持ってました。'},
                {speaker: '農夫', text: 'おお、それは幸運のコインだ！お礼に差し上げますよ。ありがとう！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。無事に護衛してくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が派手にやる番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '最近世界が危ないから、追加で報酬をいただけないか？護衛も大変だった。'},
                {speaker: '農夫', text: '…確かに危ない時代だね。仕方ない、追加で300G出すよ。ありがとう。'},
                {speaker: '{adv1}', text: '……ちょっと強引でしたね…'},
                {speaker: '{adv2}', text: '金は嬉しいけどよ…次は俺に任せろよな！', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'せっかくだからもう少し農夫さんを護衛してこい。敏捷性のいい鍛錬になる。'},
                {speaker: '{adv1}', text: '…まだ続けるんですか？わかりました、気を引き締めます。'},
                {speaker: '{adv2}', text: 'おいおい、休ませてくれよ…でもやるなら本気だぜ！'},
                {speaker: '{adv1}', text: '…帰り道で小規模な盗賊に襲われました。軽い傷を負いましたが、素早い動きで切り抜けました！'},
                {speaker: '{adv2}', text: 'くそ、ちょっと痛えけどよ…避ける動きが上手くなった気がするぜ！'},
                {speaker: '{PLAYER}', text: 'その意気だ。よく耐えた。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ],
            // 1: 子供送迎（依頼主: 親）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '危険な橋を渡って子供を無事家まで送りました！途中で手をつないであげましたよ～。'},
                {speaker: '{PLAYER}', text: '優しいな。子供も安心しただろう。よくやった。'},
                {speaker: '{adv2}', text: '橋渡りだけかよ！俺なら子供に木剣渡して魔物退治ごっこしたのに！'},
                {speaker: '{adv1}', text: 'それは危ないです！子供が怖がります…あ、この橋、昔前のギルドマスターが{PLAYER}を…'},
                {speaker: '{adv2}', text: 'そうだよな！抱えて渡ったんだぜ！…あ、言っちゃった！'},
                {speaker: '{PLAYER}', text: '俺を抱えて…？まあ後で聞くよ。親御さん、子供を無事送りました。'},
                // Line 7-8 (index 6-7)
                {speaker: '親', text: '子供が無事帰ってきた！あの崩落しそうな橋、一人じゃ怖くて…本当にありがとう！'},
                {speaker: '親', text: '最近事故も増えてるし、魔物が近づいてきてるって村で話題だよ。君たちに頼んで正解だった！'},
                // Line 9 (index 8)
                {speaker: '親', text: '無事でよかった。これが報酬だ。本当に助かった！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：護衛後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '道中で何か特別なものを見なかったか聞く（+1 Lucky Coin）',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '世界が危ない今、追加報酬を要求する（+300 Gold、参加冒険者好感度 -10）',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'もう少し依頼主を護衛させて敏捷性を鍛える（参加冒険者 HP -50、DEX +3）',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '道中で何か特別なものを見なかったか？変わったものとか。'},
                {speaker: '{adv2}', text: '橋の近くで古びた幸運のコインが落ちてたぜ。なんか縁起良さそうだから拾っといた！'},
                {speaker: '親', text: 'それは幸運のコインね！お礼にどうぞ。ありがとう！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。子供を優しく護衛してくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が派手にやる番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '最近世界が危ないから、追加で報酬をいただけないか？護衛も大変だった。'},
                {speaker: '親', text: '…確かに怖い時代だね。仕方ない、追加で300G出すよ。ありがとう。'},
                {speaker: '{adv1}', text: '……ちょっと強引でしたね…'},
                {speaker: '{adv2}', text: '金は嬉しいけどよ…次は俺に任せろよな！', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'せっかくだからもう少し子供を護衛してこい。敏捷性のいい鍛錬になる。'},
                {speaker: '{adv1}', text: '…まだ続けるんですか？わかりました、気を引き締めます。'},
                {speaker: '{adv2}', text: 'おいおい、休ませてくれよ…でもやるなら本気だぜ！'},
                {speaker: '{adv2}', text: '…帰りに橋近くで小型魔物に襲われた！軽い傷負ったけど、素早い回避で守りきったぜ！'},
                {speaker: '{adv1}', text: '痛いですけど…動きが良くなった気がします。'},
                {speaker: '{PLAYER}', text: 'その意気だ。よく耐えた。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ],
            // 2: 使者護衛（依頼主: 村長）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: '使者の手紙護衛完了！スパイ一匹も出てこねえでガッカリだぜ！'},
                {speaker: '{PLAYER}', text: '無事に届いてよかった。平和が一番だ。'},
                {speaker: '{adv1}', text: '{adv2}さん、妄想しすぎです。使者さんもホッとしてましたよ。'},
                {speaker: '{adv2}', text: 'スパイ出てきたら俺が一閃だろ！…この道、昔前のギルドマスターが大事な手紙運んだ…'},
                {speaker: '{adv1}', text: 'しっ！今言うことじゃないです！{PLAYER}、村長さんに報告を。'},
                {speaker: '{PLAYER}', text: '大事な手紙…？まあ後で聞くよ。村長、無事届きました。'},
                // Line 7-8 (index 6-7)
                {speaker: '村長', text: '使者が無事で手紙届いたよ！これで村の同盟が決まるんだ。本当に感謝だ！'},
                {speaker: '村長', text: '王都で政変の噂もある中、こんな重要な書状を守ってくれて…君たちのギルドは頼りになる！'},
                // Line 9 (index 8)
                {speaker: '村長', text: '無事でよかった。これが報酬だ。お疲れ様！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：護衛後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '道中で何か特別なものを見なかったか聞く（+1 Lucky Coin）',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '世界が危ない今、追加報酬を要求する（+300 Gold、参加冒険者好感度 -10）',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'もう少し依頼主を護衛させて敏捷性を鍛える（参加冒険者 HP -50、DEX +3）',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '道中で何か特別なものを見なかったか？変わったものとか。'},
                {speaker: '{adv2}', text: '道端で古びた幸運のコインが落ちてたぜ。なんかいい感じだったから拾っといた！'},
                {speaker: '村長', text: 'それは幸運のコインだ！お礼に差し上げよう。ありがとう！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。重要な手紙を無事護衛してくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が派手にやる番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '最近世界が危ないから、追加で報酬をいただけないか？護衛も大変だった。'},
                {speaker: '村長', text: '…確かに不安定な情勢だ。仕方ない、追加で300G出すよ。ありがとう。'},
                {speaker: '{adv1}', text: '……ちょっと強引でしたね…'},
                {speaker: '{adv2}', text: '金は嬉しいけどよ…次は俺に任せろよな！', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'せっかくだからもう少し使者を護衛してこい。敏捷性のいい鍛錬になる。'},
                {speaker: '{adv1}', text: '…まだ続けるんですか？わかりました、気を引き締めます。'},
                {speaker: '{adv2}', text: 'おいおい、休ませてくれよ…でもやるなら本気だぜ！'},
                {speaker: '{adv2}', text: '…帰り道で怪しい盗賊に襲われた！軽い傷負ったけど、素早い動きで守りきったぜ！'},
                {speaker: '{adv1}', text: '痛いですけど…回避が上手くなった気がします。'},
                {speaker: '{PLAYER}', text: 'その意気だ。よく耐えた。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ]
        ],
        'F+': [
            // 0: 商人護衛（ゴブリン潜む道）
            [
                {speaker: "冒険者", text: "商人を次の町まで護衛しました。ゴブリンが潜む道でしたが無事です。"},
                {speaker: "カイト", text: "ゴブリンが出たなら俺の出番だったのに！なんで連れてってくれねえんだよ！"},
                {speaker: "ルナ", text: "カイトが行ったら商人が怖がって逃げちゃうわよ。"},
                {speaker: "ギルドマスター", text: "二人とも騒がしいな。商人に感想を聞こう。"},
                {speaker: "商人", text: "ゴブリンの潜む道を無事に通れたよ！本当に頼りになった、ありがとう冒険者さん！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はカイトも連れてったら商人が値上げしそうだ。"}
            ],
            // 1: 旅行者グループ護衛
            [
                {speaker: "冒険者", text: "旅行者のグループを森の道で無事に守りました。"},
                {speaker: "ルナ", text: "旅行者さんたち、楽しそうだった？お土産話聞きたかったわ～。"},
                {speaker: "カイト", text: "森なら俺の守りで鉄壁だったぜ！次は絶対呼べよ！"},
                {speaker: "ギルドマスター", text: "お前ら、護衛じゃなくて観光客だろ。旅行者に報告だ。"},
                {speaker: "旅行者代表", text: "森の道を無事に通らせてくれてありがとう！怖かったけど君のおかげで楽しめたよ！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は観光ガイドも兼ねるか？"}
            ],
            // 2: キャラバン護衛
            [
                {speaker: "冒険者", text: "荷物を運ぶキャラバンを盗賊から無事に護衛しました。"},
                {speaker: "カイト", text: "盗賊が出たのか！？俺なら一網打尽にしてたのに！悔しいぜ！"},
                {speaker: "ルナ", text: "カイト、荷物が壊れたら大変よ。無事で何よりね。"},
                {speaker: "ギルドマスター", text: "二人とも静かに。キャラバン主に報告しよう。"},
                {speaker: "キャラバン主", text: "盗賊から荷物を守ってくれて本当に助かった！これで商売が続けられるよ、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。カイト、次は本当に盗賊狩りだ。"}
            ]
        ],
        'D': [
            // 0: 貴族護衛（依頼主: 貴族）
            [
                {speaker: "冒険者", text: "貴族を隣町まで無事に護衛しました。……暗殺者の気配があって緊張しっぱなしでした。"},
                {speaker: "カイト", text: "暗殺者！？出てきたら俺が一瞬でぶった斬ってたぜ！次は絶対連れてけよ！"},
                {speaker: "ルナ", text: "カイトが行ったら貴族様が怖がって逃げちゃうわよ……。"},
                {speaker: "ギルドマスター", text: "二人とも静かに。貴族に感想を聞こう。"},
                {speaker: "貴族", text: "無事に隣町まで着けたよ。暗殺者の噂があったのに怖い思いせずに済んだ。本当に感謝する、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はカイトも連れてったら貴族が値下げ交渉しそうだ。"}
            ],
            // 1: 負傷兵士送還（依頼主: 軍医）
            [
                {speaker: "冒険者", text: "負傷した兵士を前線からキャンプまで送りました。……戦場の空気が重かったです。"},
                {speaker: "ルナ", text: "負傷兵……回復魔法をかけたかったわ。私も行けばよかったかも。"},
                {speaker: "カイト", text: "戦場か！俺なら敵を全部蹴散らしてたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも状況をわきまえろ。軍医に報告だ。"},
                {speaker: "軍医", text: "負傷兵を無事に送ってくれたのか！命が救われたよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナの魔法で全員完治か？"}
            ],
            // 2: 学者遺跡護衛（依頼主: 学者）
            [
                {speaker: "冒険者", text: "学者を危険な遺跡まで護衛しました。……罠が多すぎてヒヤヒヤしました。"},
                {speaker: "ルナ", text: "遺跡の罠！？私なら全部解除してたわ～。学者さんも喜んでたでしょ？"},
                {speaker: "カイト", text: "罠なら俺が壊して進むぜ！"},
                {speaker: "ギルドマスター", text: "二人とも学者を踏みつぶすな。学者に感想を聞こう。"},
                {speaker: "学者", text: "遺跡まで無事に着けたよ。君の護衛がなければ無理だった。本当に助かった、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はルナとカイトで遺跡崩壊しそうだ。"}
            ]
        ],
        'D+': [
            // 0: 外交官護衛（依頼主: 外交官）
            [
                {speaker: "冒険者", text: "外交官を敵の領土を抜けて無事に護衛しました。……スパイが多かったです。"},
                {speaker: "カイト", text: "スパイ！？全員捕まえてぶん殴ってたぜ！次は俺の出番だろ！"},
                {speaker: "ルナ", text: "カイト、外交官が怖がって交渉できなくなるわよ。"},
                {speaker: "ギルドマスター", text: "二人とも国際問題起こすな。外交官に報告だ。"},
                {speaker: "外交官", text: "敵領を無事に抜けられたよ。君のおかげで和平が保てた。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイト連れてったら戦争になるかもな。"}
            ],
            // 1: 難民家族ガイド（依頼主: 難民代表）
            [
                {speaker: "冒険者", text: "難民の家族を安全地帯までガイドしました。……子供たちが可愛かったです。"},
                {speaker: "ルナ", text: "子供たち！？私もお菓子持って行きたかったわ～。みんな無事でよかった！"},
                {speaker: "カイト", text: "難民か……俺なら敵を全部蹴散らして道を作ってたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも優しさと暴力のバランス取れ。難民代表に感想を。"},
                {speaker: "難民代表", text: "家族を無事に安全地帯まで導いてくれた。本当に命の恩人だ、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。心が温まるな。"}
            ],
            // 2: 魔獣調教師護衛（依頼主: 調教師）
            [
                {speaker: "冒険者", text: "珍しい魔獣と調教師を闘技場まで護衛しました。……魔獣が暴れそうで怖かったです。"},
                {speaker: "カイト", text: "魔獣！？俺なら一緒に戦ってたぜ！闘技場で対決したい！"},
                {speaker: "ルナ", text: "魔獣の生態……研究したいわ～。暴れないでくれてよかった。"},
                {speaker: "ギルドマスター", text: "二人とも魔獣を刺激するな。調教師に報告だ。"},
                {speaker: "調教師", text: "魔獣を無事に闘技場まで連れてこれたよ。君の護衛がなければ無理だった。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイトと魔獣で対決か？"}
            ]
        ],
        'C': [
            // 0: 王子護衛（依頼主: 王子）
            [
                {speaker: "冒険者", text: "王子を隣国まで無事に護衛しました。……政略結婚の重圧が伝わってきました。"},
                {speaker: "ルナ", text: "王子様の政略結婚……ロマンチックだけど切ないわね。"},
                {speaker: "カイト", text: "王子か！俺なら敵国に乗り込んで戦争止めてたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも王族の前で失礼だぞ。王子に感想を。"},
                {speaker: "王子", text: "隣国まで無事に着けたよ。君の護衛がなければ危なかった。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイト連れてったら結婚破談になるかも。"}
            ],
            // 1: 聖女護衛（依頼主: 聖女）
            [
                {speaker: "冒険者", text: "聖女を聖地まで守り抜きました。……異端者が執拗に狙ってきました。"},
                {speaker: "ルナ", text: "聖女様！？神聖魔法を近くで見てみたかったわ～。"},
                {speaker: "カイト", text: "異端者！？全員ぶった斬って聖地まで突っ走ってたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも聖女の前で控えめに。王子に報告だ。"},
                {speaker: "聖女", text: "聖地まで無事に着けたよ。異端者の脅威から守ってくれて本当にありがとう。神のご加護を。"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。神のご加護はカイトには効かなそうだ。"}
            ],
            // 2: 神器運搬護衛（依頼主: 大司祭）
            [
                {speaker: "冒険者", text: "貴重な神器を運ぶ一行を無事に護衛しました。……盗賊団が狙ってきて大変でした。"},
                {speaker: "カイト", text: "神器か！俺なら盗賊全員まとめて蹴散らしてたぜ！"},
                {speaker: "ルナ", text: "神器……魔力がすごそう！私も触ってみたかったわ。"},
                {speaker: "ギルドマスター", text: "二人とも神器を壊すな。大司祭に報告だ。"},
                {speaker: "大司祭", text: "神器を無事に運べたよ。君の護衛がなければ失われていた。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナが神器で実験しそうだ。"}
            ]
        ],
        'C+': [
            // 0: 将軍護衛（依頼主: 将軍）
            [
                {speaker: "冒険者", text: "将軍を戦場まで無事に護衛しました。……敵のスパイがうじゃうじゃで緊張しました。"},
                {speaker: "カイト", text: "戦場護衛！？スパイなら俺が全員捕まえて拷問だぜ！次は俺を連れてけ！"},
                {speaker: "ルナ", text: "カイト、拷問は国際問題よ……将軍様も怖がるわ。"},
                {speaker: "ギルドマスター", text: "二人とも戦争起こすな。将軍に感想を聞こう。"},
                {speaker: "将軍", text: "戦場まで無事に着けたよ。スパイの脅威から守ってくれて本当に助かった。感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はカイト連れてったら敵が降伏しそうだ。"}
            ],
            // 1: 予言者護衛（依頼主: 予言者）
            [
                {speaker: "冒険者", text: "予言者を神託の場所まで送りました。……未来のビジョンがチラチラ見えて混乱しました。"},
                {speaker: "ルナ", text: "神託の場所！？予言を近くで聞きたかったわ～。私も護衛したかった！"},
                {speaker: "カイト", text: "予言か！俺の未来は最強の剣士だろ！教えてくれよ！"},
                {speaker: "ギルドマスター", text: "二人とも予言者を疲れさせるな。予言者に報告だ。"},
                {speaker: "予言者", text: "神託の場所まで無事に着けたよ。君の護衛がなければ道半ばだった。本当にありがとう。"},
                {speaker: "ギルドマスター", text: "報酬だ。カイトの未来は留守番かもな。"}
            ],
            // 2: エルフ王女護衛（依頼主: エルフ王女）
            [
                {speaker: "冒険者", text: "最後のエルフ王女を隠れ里まで護衛しました。……森の精霊が味方してくれて助かりました。"},
                {speaker: "ルナ", text: "エルフ王女！？優雅で美しいわよね～。私もお茶会したかったわ！"},
                {speaker: "カイト", text: "エルフか！弓が上手いんだろ？俺と勝負したいぜ！"},
                {speaker: "ギルドマスター", text: "二人とも王女を疲れさせるな。王女に感想を。"},
                {speaker: "エルフ王女", text: "隠れ里まで無事に着けたわ。君の護衛がなければ捕らわれていた。本当に感謝する。"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はルナがお茶会、カイトが決闘か？"}
            ]
        ],
        'B': [
            // 0: 古代の賢者護衛（依頼主: 古代の賢者）
            [
                {speaker: "冒険者", text: "古代の賢者を禁断の図書館まで護衛しました。……知識の重みが肩にのしかかりました。"},
                {speaker: "ルナ", text: "禁断の図書館！？私の夢の場所よ！賢者様と一緒に本読みたかったわ～！"},
                {speaker: "カイト", text: "本ばっかりか！俺なら図書館の守護モンスターぶった斬ってたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも図書館で騒ぐな。賢者に報告だ。"},
                {speaker: "古代の賢者", text: "禁断の図書館まで無事に着けたよ。君の護衛がなければ知識は失われていた。本当にありがとう。"},
                {speaker: "ギルドマスター", text: "報酬だ。ルナの本読みは制限付きな。"}
            ],
            // 1: ドラゴンライダー護衛（依頼主: ドラゴンライダー）
            [
                {speaker: "冒険者", text: "ドラゴンライダーを巣まで守りました。……ドラゴンが近くて迫力ありすぎです。"},
                {speaker: "カイト", text: "ドラゴンライダー！？俺も乗りたかったぜ！ドラゴンと一緒に戦うんだろ！"},
                {speaker: "ルナ", text: "ドラゴンの生態……近くで観察したかったわ～。鱗触りたかった！"},
                {speaker: "ギルドマスター", text: "二人ともドラゴンを刺激するな。ライダーに感想を。"},
                {speaker: "ドラゴンライダー", text: "巣まで無事に着けたよ。君の護衛がなければドラゴンが暴れてた。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はカイトがドラゴンに乗ったら墜落だ。"}
            ],
            // 2: 神の化身護衛（依頼主: 神の化身）
            [
                {speaker: "冒険者", text: "神の化身を神殿まで護衛しました。……神聖オーラで目がくらみました。"},
                {speaker: "ルナ", text: "神の化身！？神聖魔法を間近で感じたかったわ～。奇跡見せてほしかった！"},
                {speaker: "カイト", text: "神か！俺の剣で神の試練受けてやるぜ！"},
                {speaker: "ギルドマスター", text: "二人とも神を試すな。化身に報告だ。"},
                {speaker: "神の化身", text: "神殿まで無事に着けたよ。君の護衛がなければ道を外れていた。本当にありがとう。"},
                {speaker: "ギルドマスター", text: "報酬だ。神のご加護はカイトには届かなそうだ。"}
            ]
        ],
        'B+': [
            // 0: 堕落した英雄護衛（依頼主: 堕落した英雄）
            [
                {speaker: "冒険者", text: "堕落した英雄を裁きの場まで護衛しました。……闇の力が重かったです。"},
                {speaker: "カイト", text: "堕落した英雄！？俺なら浄化の一撃だぜ！次は戦わせろ！"},
                {speaker: "ルナ", text: "堕落の原因……闇魔法の研究になるわ！興味深い～。"},
                {speaker: "ギルドマスター", text: "二人とも英雄を刺激するな。英雄に感想を。"},
                {speaker: "堕落した英雄", text: "裁きの場まで無事に着けたよ。君の護衛がなければ逃げていた。本当に感謝する……かもしれない。"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイトが英雄と決闘しそうだ。"}
            ],
            // 1: 星の使者護衛（依頼主: 星の使者）
            [
                {speaker: "冒険者", text: "星の使者を天文台まで送りました。……星の力が体に染みました。"},
                {speaker: "ルナ", text: "星の使者！？宇宙の秘密を聞きたかったわ～。私も同行したかった！"},
                {speaker: "カイト", text: "星か！俺の剣で流星みたいに斬ってやるぜ！"},
                {speaker: "ギルドマスター", text: "二人とも宇宙を壊すな。使者に報告だ。"},
                {speaker: "星の使者", text: "天文台まで無事に着けたよ。星の導きが君にあった。本当にありがとう。"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。ルナの星読みは次回に。"}
            ],
            // 2: ユニコーン護衛（依頼主: 最後のユニコーン）
            [
                {speaker: "冒険者", text: "最後のユニコーンを聖域まで護衛しました。……純粋な光がまぶしかったです。"},
                {speaker: "ルナ", text: "ユニコーン！？角の魔法がすごいわ！触りたかった～！"},
                {speaker: "カイト", text: "ユニコーンか！俺なら騎乗して突撃だぜ！"},
                {speaker: "ギルドマスター", text: "カイト、ユニコーンが逃げるぞ。ユニコーンに感想を……って、喋らないか。"},
                {speaker: "ユニコーン守護者", text: "ユニコーンを聖域まで守ってくれたのか！純粋さが保たれたよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイトが角で突かれないよう祈っとく。"}
            ]
        ],
        'A': [
        // 0: 王を亡命先まで護衛（依頼主: 王国の忠臣）
        [
            {speaker: "冒険者", text: "王を亡命先まで無事に護衛しました。……敵の追手が、王の血を求めていました。"},
            {speaker: "ギルドマスター", text: "王の血……ヴォルガスの儀式に必要だったのか。"},
            {speaker: "王国の忠臣", text: "王を無事に亡命させてくれたのか……国が滅びようとしているのは、ヴォルガスの復活のためだ。王の血統は、封印の最後の鍵だった。あの黒い軍勢は、王を捕らえて儀式を完成させるつもりだったのだろう。君たちの故郷が破壊されたのも、同じ理由か。本当に感謝する。この王が、復権の旗印となる。"},
            {speaker: "ギルドマスター", text: "報酬だ。王国を再興する力を。"}
        ],
        // 1: 大魔導士を禁呪の儀式場まで護衛（依頼主: 大魔導士の弟子）
        [
            {speaker: "冒険者", text: "大魔導士を禁呪の儀式場まで守りました。……闇の刺客が、儀式を妨げようとしていました。"},
            {speaker: "ギルドマスター", text: "禁呪……ヴォルガス封じの最後の手段か。"},
            {speaker: "大魔導士の弟子", text: "師を儀式場まで無事に導いてくれたのか……この禁呪は、ヴォルガスを再び封じるためのものだ。あの軍勢は、儀式を阻止するために動いていた。君たちの村が狙われたのは、魔導の血がそこにあったからかもしれない。本当に感謝する。この禁呪が、闇を封じる。"},
            {speaker: "ギルドマスター", text: "報酬だ。禁呪に耐える力を。"}
        ],
        // 2: 神の遺児を運命の場所まで護衛（依頼主: 神殿の預言者）
        [
            {speaker: "冒険者", text: "神の遺児を運命の場所まで護衛しました。……遺児の周りに、深淵の影が集まっていました。"},
            {speaker: "ギルドマスター", text: "神の遺児……ヴォルガスが最も恐れる存在か。"},
            {speaker: "神殿の預言者", text: "神の遺児を運命の場所まで守ってくれたのか……遺児は、ヴォルガスを滅ぼす運命の子だ。あの軍勢は、遺児を殺すために送られた。君たちの故郷が破壊されたのは、神の血がそこに流れていたから。本当に感謝する。この遺児が、闇を終わらせる。"},
            {speaker: "ギルドマスター", text: "報酬だ。運命を変える力を。"}
        ]
    ],
    'A+': [
        // 0: 光の女神の巫女を最終聖域まで護衛（依頼主: 女神の声）
        [
            {speaker: "冒険者", text: "光の女神の巫女を最終聖域まで護衛しました。……闇の軍勢が、巫女の光を消そうとしていました。"},
            {speaker: "ギルドマスター", text: "女神の巫女……ヴォルガスの最大の脅威か。"},
            {speaker: "女神の声", text: "巫女を聖域まで無事に導いてくれたのか……巫女の光は、ヴォルガスを浄化する唯一の力だ。あの黒い軍勢は、光を永遠に消すために動いていた。君たちの村が最初の標的だったのは、光の女神の加護がそこにあったから。本当に感謝する。この光が、君たちを照らす。"},
            {speaker: "ギルドマスター", text: "報酬だ。女神の光を宿す力を。"}
        ],
        // 1: 最後の希望である預言者を世界の中心まで護衛（依頼主: 預言者の守護霊）
        [
            {speaker: "冒険者", text: "最後の希望である預言者を世界の中心まで送りました。……預言者の言葉が、ヴォルガスの終わりを告げていました。"},
            {speaker: "ギルドマスター", text: "最後の希望……我々がそれを守ったのか。"},
            {speaker: "預言者の守護霊", text: "預言者を世界の中心まで守ってくれたのか……預言者は、ヴォルガスの終焉を予見している。あの軍勢は、希望を絶つために送られた。君たちの故郷が破壊されたのは、希望の種がそこに植えられていたからだ。本当に感謝する。この希望が、世界を救う。"},
            {speaker: "ギルドマスター", text: "報酬だ。最後の希望を叶える力を。"}
        ],
        // 2: 滅びゆく世界の救世主を神の座まで護衛（依頼主: 古の神々）
        [
            {speaker: "冒険者", text: "滅びゆく世界の救世主を神の座まで護衛しました。……深淵の軍勢が、全力で阻もうとしていました。"},
            {speaker: "ギルドマスター", text: "救世主……ヴォルガスとの最終決戦か。"},
            {speaker: "古の神々", text: "救世主を神の座まで守ってくれたのか……救世主は、ヴォルガスを滅ぼす存在だ。あの黒い軍勢は、神の座を汚すために来た。君たちの村が狙われたのは、救世主の血がそこにあったから。本当に感謝する。この神々が、君たちに力を貸す。"},
            {speaker: "ギルドマスター", text: "報酬だ。世界を救う力を。"}
        ]
    ],
    'S': [
        // 0: 世界の均衡を守る存在を深淵の門まで護衛（依頼主: 均衡の守護神）
        [
            {speaker: "冒険者", text: "世界の均衡を守る存在を深淵の門まで護衛しました。……門の向こうから、ヴォルガスの本体が睨んでいました。"},
            {speaker: "ギルドマスター", text: "深淵の門まで……これが最終局面だ。"},
            {speaker: "均衡の守護神", text: "均衡の存在を門まで守ってくれたのか……この存在は、ヴォルガスを永遠に封じる鍵だ。あの軍勢は、均衡を崩すためにすべてを破壊した。君たちの故郷が最初の犠牲だったのは、均衡の力がそこに宿っていたから。本当に感謝する。この均衡が、君たちを勝利に導く。"},
            {speaker: "ギルドマスター", text: "報酬だ。均衡を保つ力を。"}
        ],
        // 1: 時を司る神の使者を永遠の時計塔まで護衛（依頼主: 時の神）
        [
            {speaker: "冒険者", text: "時を司る神の使者を永遠の時計塔まで守りました。……時間が歪み、過去の惨劇が蘇りました。"},
            {speaker: "ギルドマスター", text: "時間が歪む……ヴォルガスが時すら操ろうとしているのか。"},
            {speaker: "時の神", text: "使者を時計塔まで無事に導いてくれたのか……この使者は、ヴォルガスの復活の時を止める存在だ。あの軍勢は、時間を改竄するために動いていた。君たちの故郷が破壊された瞬間を、永遠に繰り返すつもりだったのだろう。本当に感謝する。この時が、君たちに味方する。"},
            {speaker: "ギルドマスター", text: "報酬だ。時を超える力を。"}
        ],
        // 2: 全ての命の源を最終決戦の場まで護衛（依頼主: 命の母神）
        [
            {speaker: "冒険者", text: "全ての命の源を最終決戦の場まで護衛しました。……源の光が、ヴォルガスの闇を焼き払おうとしていました。"},
            {speaker: "ギルドマスター", text: "命の源……これがヴォルガスを滅ぼす最終の鍵か。"},
            {speaker: "命の母神", text: "命の源を決戦の場まで守ってくれたのか……この源は、ヴォルガスを生み出した闇を浄化する光だ。あの軍勢は、すべての命を闇に染めるために来た。君たちの故郷が狙われたのは、命の源の守りがそこにあったから。本当に感謝する。この命が、君たちと共に戦う。"},
            {speaker: "ギルドマスター", text: "報酬だ。すべての命を繋ぐ力を。"}
        ]
    ]
        
    },
    // 3: LUC - fetch quests
    {
        'F': [
            // 0: 薬草集め（依頼主: 錬金術師）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '錬金術師さん依頼の薬草、指定通り全部集めてきました！新鮮ですよ～。'},
                {speaker: '{PLAYER}', text: 'よくやった。森の奥まで行ったんだろ？お疲れ。'},
                {speaker: '{adv2}', text: '薬草かあ。俺なら踏み潰してたかもな！でもポーション作れるなら悪くねえぜ。'},
                {speaker: '{adv1}', text: 'これで強力な回復ポーションが作れます！最近魔力が薄れてるから、貴重なんですよ。'},
                {speaker: '{PLAYER}', text: '魔力薄い？最近魔物も弱ってるって話は聞いてたけど…。'},
                {speaker: '{adv2}', text: 'じゃあこの薬草で魔力増幅ポーションとか作れねえかな？俺の剣に塗ったら最強だろ！'},
                // Line 7-8 (index 6-7)
                {speaker: '錬金術師', text: 'おお、完璧な薬草だ！これで通常の回復ポーションが20個は作れるよ。最近魔力枯渇で材料が高騰しててね…助かる！'},
                {speaker: '錬金術師', text: '魔力増幅剤？いいアイデアだね！失敗したら大爆発だけど、成功したら武器強化に革命だよ。実験してみる価値ありだ！'},
                // Line 9 (index 8)
                {speaker: '錬金術師', text: '本当に助かった。これが報酬だ。楽しみにしててくれよ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：集め後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '依頼主に集めた薬草を少し分けてもらう（+1 薬草）',
                            reward: [{type: "item", name: "薬草", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '冒険者に依頼主を脅させて追加金を要求する（+400 Gold、参加冒険者好感度 -15、LUC -3）',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '報酬の一部を依頼主に返す（-200 Gold、参加冒険者 LUC +3）',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '薬草がたくさんあるなら、少し分けてもらえないか？ギルドでも使えそうだ。'},
                {speaker: '{adv1}', text: '確かに余裕がありそうですね。お願いしてみましょう。'},
                {speaker: '錬金術師', text: 'いいよ！お礼に1つあげる。これからもよろしくな！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。新鮮な薬草をしっかり集めてくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が大活躍する番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 29},
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '世界が危ない今、もっと報酬をいただけないか？少し脅してみてくれ。'},
                {speaker: '{adv2}', text: 'おいおい、マジかよ…仕方ねえ、やってやるぜ！'},
                {speaker: '錬金術師', text: 'ひ、ひどいよ…わかった、追加で400G出すからこれで許して…。'},
                {speaker: '{adv1}', text: '……やりすぎでした…', jumptoline: 29},
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '報酬の一部を返そう。200Gでいいか？親切にしてもらったし。'},
                {speaker: '{adv1}', text: '優しいですね…きっと運が良くなりますよ。'},
                {speaker: '{adv2}', text: 'おいおい、金減るのかよ…でもまあ、いいことした気分だぜ。'},
                {speaker: '錬金術師', text: 'そんな…ありがとう！本当にいい人たちだね。'},
                {speaker: '{adv1}', text: '心が温かくなりました。きっと良いことがありますよ。'},
                {speaker: '{PLAYER}', text: 'そうだと良いな。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ],
            // 1: キノコ集め（依頼主: 料理人）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: '料理人依頼の新鮮キノコ、大量に集めてきたぜ！今夜はキノコ祭りだろ！？'},
                {speaker: '{PLAYER}', text: '大量すぎるだろ。よくそんなに採れたな。お疲れ。'},
                {speaker: '{adv1}', text: 'このキノコ、香りが最高です！普通のスープがごちそうになりますよ～。'},
                {speaker: '{adv2}', text: '俺は焼きキノコがいいぜ！冒険者のHPを250も回復できるやつ！'},
                {speaker: '{adv1}', text: 'この年の豊作でキノコがいっぱいだから、保存食にも最適です。'},
                {speaker: '{PLAYER}', text: '豊作の年か。最近村が賑わってるのはそれか…祭りの準備も進んでるみたいだな。'},
                // Line 7-8 (index 6-7)
                {speaker: '料理人', text: '素晴らしいキノコだ！今夜の宴会メニューが決まったよ。この豊作でみんな腹いっぱい食える！'},
                {speaker: '料理人', text: 'スタミナ料理のアイデア？冒険者向けに開発してみるか！キノコの乾燥粉末で長期保存もできるし、交易品にもなるよ。'},
                // Line 9 (index 8)
                {speaker: '料理人', text: '本当に助かった。これが報酬だ。宴会楽しみにしててくれ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：集め後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '依頼主に集めたキノコを少し分けてもらう（+1 キノコ）',
                            reward: [{type: "item", name: "キノコ", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '冒険者に依頼主を脅させて追加金を要求する（+400 Gold、参加冒険者好感度 -15、LUC -3）',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '報酬の一部を依頼主に返す（-200 Gold、参加冒険者 LUC +3）',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'キノコがたくさんあるなら、少し分けてもらえないか？ギルドでも使えそうだ。'},
                {speaker: '{adv1}', text: '確かに余裕がありそうですね。お願いしてみましょう。'},
                {speaker: '料理人', text: 'いいよ！お礼に1つあげる。これからもよろしくな！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。新鮮なキノコをしっかり集めてくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が大活躍する番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 29},
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '世界が危ない今、もっと報酬をいただけないか？少し脅してみてくれ。'},
                {speaker: '{adv2}', text: 'おいおい、マジかよ…仕方ねえ、やってやるぜ！'},
                {speaker: '料理人', text: 'ひ、ひどいよ…わかった、追加で400G出すからこれで許して…。'},
                {speaker: '{adv1}', text: '……やりすぎでした…', jumptoline: 29},
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '報酬の一部を返そう。200Gでいいか？親切にしてもらったし。'},
                {speaker: '{adv1}', text: '優しいですね…きっと運が良くなりますよ。'},
                {speaker: '{adv2}', text: 'おいおい、金減るのかよ…でもまあ、いいことした気分だぜ。'},
                {speaker: '料理人', text: 'そんな…ありがとう！本当にいい人たちだね。'},
                {speaker: '{adv1}', text: '心が温かくなりました。きっと良いことがありますよ。'},
                {speaker: '{PLAYER}', text: 'そうだと良いな。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ],
            // 2: 花集め（依頼主: 村人）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '村人さん依頼のきれいな花、たくさん集めてきました！香りが素晴らしいです～。'},
                {speaker: '{PLAYER}', text: 'いい匂いだな。ギルドに飾ったら癒されそうだ。よく採れたな。'},
                {speaker: '{adv2}', text: '花かあ…俺なら踏んづけてたかも。って、{adv1}に殺されるから黙っとく！'},
                {speaker: '{adv1}', text: 'この花、染料にもなるんですよ！服が鮮やかになってみんな喜びます。'},
                {speaker: '{PLAYER}', text: '染料か。最近結婚式が多いって聞いたけど、花の季節だからか？'},
                {speaker: '{adv2}', text: '結婚式！？花束投げで俺がキャッチしたら次は俺の番だぜ！…って冗談だよ。'},
                // Line 7-8 (index 6-7)
                {speaker: '村人', text: '美しい花をありがとう！村の広場が花畑みたいになるよ。最近結婚ラッシュでちょうど欲しかったんだ！'},
                {speaker: '村人', text: '香り袋や癒しのお茶にも使えるね。花粉症の薬草と混ぜたら今年の需要に応えられるよ。みんな助かる！'},
                // Line 9 (index 8)
                {speaker: '村人', text: '本当に助かった。これが報酬だ。村が華やかになるよ！'},
                // Line 10 (index 9)
                {speaker: 'ナレーター', text: '（選択肢：集め後、どう対応する？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'ナレーター',
                    text: '',
                    choices: [
                        {
                            text: '依頼主に集めた花を少し分けてもらう（+1 花）',
                            reward: [{type: "item", name: "花", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '冒険者を称賛して信頼を深める（参加冒険者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '冒険者に依頼主を脅させて追加金を要求する（+400 Gold、参加冒険者好感度 -15、LUC -3）',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '報酬の一部を依頼主に返す（-200 Gold、参加冒険者 LUC +3）',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '花がたくさんあるなら、少し分けてもらえないか？ギルドでも使えそうだ。'},
                {speaker: '{adv1}', text: '確かに余裕がありそうですね。お願いしてみましょう。'},
                {speaker: '村人', text: 'いいよ！お礼に1つあげる。これからもよろしくな！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'みんな、よくやったな。きれいな花をしっかり集めてくれて頼りになるよ。'},
                {speaker: '{adv1}', text: '{PLAYER}にそう言ってもらえると嬉しいです！もっと頑張ります！'},
                {speaker: '{adv2}', text: 'へへ、もっと褒めてくれよ！次は俺が大活躍する番だぜ！'},
                {speaker: '{PLAYER}', text: 'ああ、次も期待してる。', jumptoline: 29},
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '世界が危ない今、もっと報酬をいただけないか？少し脅してみてくれ。'},
                {speaker: '{adv2}', text: 'おいおい、マジかよ…仕方ねえ、やってやるぜ！'},
                {speaker: '村人', text: 'ひ、ひどいよ…わかった、追加で400G出すからこれで許して…。'},
                {speaker: '{adv1}', text: '……やりすぎでした…', jumptoline: 29},
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '報酬の一部を返そう。200Gでいいか？親切にしてもらったし。'},
                {speaker: '{adv1}', text: '優しいですね…きっと運が良くなりますよ。'},
                {speaker: '{adv2}', text: 'おいおい、金減るのかよ…でもまあ、いいことした気分だぜ。'},
                {speaker: '村人', text: 'そんな…ありがとう！本当にいい人たちだね。'},
                {speaker: '{adv1}', text: '心が温かくなりました。きっと良いことがありますよ。'},
                {speaker: '{PLAYER}', text: 'そうだと良いな。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'クエスト完了だ。ギルドに戻って休もう。'}
            ]
        ],
        'F+': [
            // 0: 鉄の欠片集め（依頼主: 鍛冶屋）
            [
                {speaker: "冒険者", text: "鍛冶屋のために鉄の欠片をしっかり集めてきました。……重かったです。"},
                {speaker: "カイト", text: "鉄！？いいねえ、俺の新しい剣作れるじゃん！少し分けてくれよ！"},
                {speaker: "ルナ", text: "カイト、また剣ばっかり……でも確かに良い素材ね。"},
                {speaker: "ギルドマスター", text: "二人とも後で分け前やるから我慢しろ。鍛冶屋に渡そう。"},
                {speaker: "鍛冶屋", text: "鉄の欠片をこんなに集めてくれたのか！これで良い武器が作れるよ。本当に助かる、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイトの新剣はまた今度な。"}
            ],
            // 1: 川魚釣り（依頼主: 漁師）
            [
                {speaker: "冒険者", text: "漁師に頼まれた川魚を釣ってきました。……結構時間がかかりました。"},
                {speaker: "カイト", text: "魚！？今夜は焼き魚だろ！俺、10匹はいけるぜ！"},
                {speaker: "ルナ", text: "カイト、食べすぎ注意よ。でも新鮮そうで美味しそうね～。"},
                {speaker: "ギルドマスター", text: "二人とも夕飯の話ばっかりだな。漁師に渡そう。"},
                {speaker: "漁師", text: "川魚をこんなに釣ってきてくれたのか！今夜の食卓が豪華になるよ。感謝だ、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。……今夜は魚尽くしか。"}
            ],
            // 2: 普通の薬草集め（依頼主: 薬師）
            [
                {speaker: "冒険者", text: "薬師のために普通の薬草をたくさん集めてきました。"},
                {speaker: "ルナ", text: "普通の薬草でも調合次第で強力な薬になるのよ！私も研究したいわ～。"},
                {speaker: "カイト", text: "薬草より肉が欲しいぜ……って、ルナに睨まれた。"},
                {speaker: "ギルドマスター", text: "二人とも欲丸出しだな。薬師に見せてやろう。"},
                {speaker: "薬師", text: "普通の薬草をこんなに集めてくれたね！これで村の薬が十分になるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。ルナの実験台はカイトでいいな。"}
            ]
        ],
        'D': [
            // 0: 鉄鉱石（依頼主: 鉱夫）
            [
                {speaker: "冒険者", text: "鉱夫のために良質の鉄鉱石をたくさん採掘してきました。……腰が痛いです。"},
                {speaker: "カイト", text: "鉄鉱石！？俺なら岩ごとぶっ壊して全部持って帰ってたぜ！"},
                {speaker: "ルナ", text: "良質の鉱石なら魔法武器に使えるのに……少し欲しいわ。"},
                {speaker: "ギルドマスター", text: "二人とも後で分けてやる。鉱夫に渡そう。"},
                {speaker: "鉱夫", text: "良質の鉄鉱石をこんなに！これで村が潤うよ。本当に助かる、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイトの破壊力は次回に取っとけ。"}
            ],
            // 1: 狼の毛皮（依頼主: ハンター）
            [
                {speaker: "冒険者", text: "ハンターに狼の毛皮をたくさん持ってきました。……狩りが大変でした。"},
                {speaker: "カイト", text: "狼の毛皮！？俺なら群れ全部狩って毛皮の山作ってたぜ！"},
                {speaker: "ルナ", text: "毛皮は防寒具に最適ね。私も一枚欲しいわ～。"},
                {speaker: "ギルドマスター", text: "二人とも欲深いな。ハンターに渡そう。"},
                {speaker: "ハンター", text: "狼の毛皮をこんなに！最高の防寒具が作れるよ。感謝だ、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は毛皮のコートでも作るか。"}
            ],
            // 2: 魔力の結晶（小）（依頼主: 魔術師）
            [
                {speaker: "冒険者", text: "魔術師に魔力の結晶（小）を集めてきました。……魔物が守ってて危なかったです。"},
                {speaker: "ルナ", text: "魔力の結晶！？私の魔法研究にぴったり！少し分けて～。"},
                {speaker: "カイト", text: "魔物なら俺が全部ぶった斬って結晶独り占めだぜ！"},
                {speaker: "ギルドマスター", text: "二人とも我慢しろ。魔術師に見せてやろう。"},
                {speaker: "魔術師", text: "魔力の結晶をこんなに集めてくれたのか！新しい魔法が開発できるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。ルナの実験はまた今度な。"}
            ]
        ],
        'D+': [
            // 0: オークの牙（依頼主: 武器商人）
            [
                {speaker: "冒険者", text: "オークの牙をたくさん持ってきました。……戦いが激しくて疲れました。"},
                {speaker: "カイト", text: "オークの牙！？俺なら全部引き抜いてトロフィーにしてたぜ！"},
                {speaker: "ルナ", text: "牙は毒抜きに使えるわ……研究したいわね。"},
                {speaker: "ギルドマスター", text: "二人とも後でな。武器商人に渡そう。"},
                {speaker: "武器商人", text: "オークの牙をこんなに！強力な武器が作れるよ。本当に助かる、ありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイトのトロフィーは次回に。"}
            ],
            // 1: 古代の巻物断片（依頼主: 賢者）
            [
                {speaker: "冒険者", text: "古代の巻物断片を集めてきました。……遺跡の罠が厄介でした。"},
                {speaker: "ルナ", text: "古代巻物！？私の本にない知識かも！早く見せて～！"},
                {speaker: "ギルドマスター", text: "ルナ、興奮しすぎ。賢者に渡そう。"},
                {speaker: "賢者", text: "古代の巻物断片をこんなに！失われた知識が蘇るよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。ルナの読書会はまた今度。"}
            ],
            // 2: 希少スパイス（依頼主: 美食家）
            [
                {speaker: "冒険者", text: "希少スパイスを届けてきました。……遠くまで行って疲れました。"},
                {speaker: "カイト", text: "スパイス！？今夜は激辛料理だろ！俺、20皿いけるぜ！"},
                {speaker: "ルナ", text: "カイト、食べすぎて火を噴くわよ。でも香りが良さそうね。"},
                {speaker: "ギルドマスター", text: "二人とも夕飯の話ばっかり。美食家に渡そう。"},
                {speaker: "美食家", text: "希少スパイスを持ってきてくれたのか！究極の料理が作れるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。……今夜は辛い夕飯になりそうだ。"}
            ]
        ],
        'C': [
            // 0: グリフォンの羽（依頼主: 貴族）
            [
                {speaker: "冒険者", text: "グリフォンの羽をたくさん持ってきました。……空戦が怖かったです。"},
                {speaker: "ルナ", text: "グリフォンの羽！？飛翔魔法の素材に最高ね！私も欲しいわ～。"},
                {speaker: "カイト", text: "グリフォンか！俺なら乗りこなしてたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも落ち着け。貴族に渡そう。"},
                {speaker: "貴族", text: "グリフォンの羽をこんなに！豪華な装飾が作れるよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はルナが飛ぶかもな。"}
            ],
            // 1: ヒドラの毒袋（依頼主: 大魔導士）
            [
                {speaker: "冒険者", text: "ヒドラの毒袋を集めてきました。……再生が早くて大変でした。"},
                {speaker: "ルナ", text: "ヒドラの毒！？強力な毒薬が作れるわ！研究させて～。"},
                {speaker: "カイト", text: "ヒドラか！俺なら全部の頭をぶった斬ってたぜ！"},
                {speaker: "ギルドマスター", text: "二人とも毒は扱うな。大魔導士に渡そう。"},
                {speaker: "大魔導士", text: "ヒドラの毒袋をこんなに！禁断の魔法薬が完成するよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。毒実験はルナ禁止な。"}
            ],
            // 2: 聖水（依頼主: 神殿長）
            [
                {speaker: "冒険者", text: "神殿に聖水をたくさん届けてきました。……聖地が遠かったです。"},
                {speaker: "ルナ", text: "聖水！？浄化魔法に最適ね。私も少し欲しいわ～。"},
                {speaker: "カイト", text: "聖水なら俺の剣を聖剣にできるだろ！かけてくれよ！"},
                {speaker: "ギルドマスター", text: "二人とも神聖なものを遊び道具にするな。神殿長に渡そう。"},
                {speaker: "神殿長", text: "聖水をこんなに届けてくれたのか！神殿が救われたよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイトの剣は普通のままでいい。"}
            ]
        ],
            // 3: LUC - fetch quests (C+ to B+)
    
        'C+': [
            // 0: ユニコーンの角（依頼主: 王宮錬金術師）
            [
                {speaker: "冒険者", text: "王宮のためにユニコーンの角を{qty}個持ってきました。……純粋な光がまぶしかったです。"},
                {speaker: "ルナ", text: "ユニコーンの角！？最強の浄化素材ね！私も少し欲しいわ～！"},
                {speaker: "カイト", text: "角か！俺なら剣の柄に使って最強の剣作るぜ！"},
                {speaker: "ギルドマスター", text: "二人とも角を欲しがるな。王宮錬金術師に渡そう。"},
                {speaker: "王宮錬金術師", text: "ユニコーンの角をこんなに集めてくれたのか！究極の薬が作れるよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は角で二人を突き刺さないでくれ。"}
            ],
            // 1: 禁断の魔導書頁（依頼主: 禁書庫管理人）
            [
                {speaker: "冒険者", text: "禁書庫に禁断の魔導書頁を{qty}枚集めてきました。……呪いが染みついて怖かったです。"},
                {speaker: "ルナ", text: "禁断の頁！？私の研究にぴったり！早く読ませて～！"},
                {speaker: "カイト", text: "禁断の本か！俺なら剣でページめくってたぜ！"},
                {speaker: "ギルドマスター", text: "ルナ、呪われるな。カイト、本は斬るな。管理人に渡そう。"},
                {speaker: "禁書庫管理人", text: "禁断の頁をこんなに！失われた知識が戻るよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次はルナの禁書読書は監視付きな。"}
            ],
            // 2: フェニックスの灰（依頼主: 錬金大师）
            [
                {speaker: "冒険者", text: "錬金大师にフェニックスの灰を{qty}握り持ってきました。……熱くて火傷しそうです。"},
                {speaker: "ルナ", text: "フェニックスの灰！？不死の秘薬の材料ね！研究させて～！"},
                {speaker: "カイト", text: "灰か！俺なら剣に塗って炎の剣作るぜ！"},
                {speaker: "ギルドマスター", text: "二人とも灰を遊び道具にするな。大师に渡そう。"},
                {speaker: "錬金大师", text: "フェニックスの灰をこんなに集めてくれたのか！伝説の錬金が完成するよ。本当に助かった！"},
                {speaker: "ギルドマスター", text: "報酬だ。次は火傷しないよう気をつけろ。"}
            ]
        ],
        'B': [
            // 0: 星の欠片（依頼主: 大賢者）
            [
                {speaker: "冒険者", text: "大賢者に星の欠片を{qty}個集めてきました。……星の力が体に染みました。"},
                {speaker: "ルナ", text: "星の欠片！？宇宙魔法の究極素材ね！私も触りたかったわ～！"},
                {speaker: "カイト", text: "星か！俺なら剣に埋めて星斬りだぜ！"},
                {speaker: "ギルドマスター", text: "二人とも星を壊すな。大賢者に渡そう。"},
                {speaker: "大賢者", text: "星の欠片をこんなに！星の叡智が蘇るよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は星を剣に埋めないでくれ。"}
            ],
            // 1: 天使の羽（依頼主: 神官）
            [
                {speaker: "冒険者", text: "神官に天使の羽を{qty}枚持ってきました。……神聖な光がまぶしかったです。"},
                {speaker: "ルナ", text: "天使の羽！？飛翔と浄化の両方ね！研究したいわ～！"},
                {speaker: "カイト", text: "羽か！俺なら背中に付けて空飛ぶぜ！"},
                {speaker: "ギルドマスター", text: "カイト、天使じゃないだろ。神官に渡そう。"},
                {speaker: "神官", text: "天使の羽をこんなに集めてくれたのか！神の奇跡が近づくよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬だ。次はカイトが飛ばないよう祈っとく。"}
            ],
            // 2: デーモンの心臓（依頼主: 闇市場の取引人）
            [
                {speaker: "冒険者", text: "闇市場にデーモンの心臓を{qty}個届けてきました。……闇の脈動が怖かったです。"},
                {speaker: "ルナ", text: "デーモンの心臓！？闇魔法の究極源ね！少しだけ研究させて……。"},
                {speaker: "カイト", text: "心臓か！俺なら剣で貫いて止めてたぜ！"},
                {speaker: "ギルドマスター", text: "ルナ、闇に染まるな。取引人に渡そう。"},
                {speaker: "闇市場取引人", text: "デーモンの心臓をこんなに！闇の取引が成立するよ。本当に助かった……ふふふ。"},
                {speaker: "ギルドマスター", text: "報酬だ。次は闇市場は控えめに。"}
            ]
        ],
        'B+': [
            // 0: 古代ドラゴンの鱗（依頼主: 王国鍛冶師）
            [
                {speaker: "冒険者", text: "王に古代ドラゴンの鱗を{qty}枚持ってきました。……硬くて運ぶの大変でした。"},
                {speaker: "カイト", text: "ドラゴンの鱗！？俺の剣より硬いのか！？次は俺が剥ぎ取るぜ！"},
                {speaker: "ルナ", text: "古代鱗は最強の防具素材ね！私も少し欲しいわ～。"},
                {speaker: "ギルドマスター", text: "二人とも鱗を欲しがるな。王国鍛冶師に渡そう。"},
                {speaker: "王国鍛冶師", text: "古代ドラゴンの鱗をこんなに！伝説の鎧が作れるよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。カイトの新鎧はまた今度な。"}
            ],
            // 1: エーテルの結晶（依頼主: 最高魔導士）
            [
                {speaker: "冒険者", text: "最高魔導士にエーテルの結晶を{qty}個集めてきました。……純粋な魔力が溢れてました。"},
                {speaker: "ルナ", text: "エーテルの結晶！？究極の魔力源ね！私の魔法が100倍になるわ～！"},
                {speaker: "カイト", text: "結晶か！俺なら剣に埋めて魔剣作るぜ！"},
                {speaker: "ギルドマスター", text: "二人とも結晶を私物化するな。最高魔導士に渡そう。"},
                {speaker: "最高魔導士", text: "エーテルの結晶をこんなに！禁断の魔法が解禁されるよ。本当にありがとう！"},
                {speaker: "ギルドマスター", text: "報酬を受け取れ。次は禁断魔法は禁止な。"}
            ],
            // 2: 神の涙（依頼主: 神殿大司教）
            [
                {speaker: "冒険者", text: "神殿に神の涙を{qty}滴届けてきました。……奇跡の力が感じられました。"},
                {speaker: "ルナ", text: "神の涙！？究極の浄化と再生ね！研究させてほしいわ～！"},
                {speaker: "カイト", text: "涙か！俺なら剣に塗って聖剣だぜ！"},
                {speaker: "ギルドマスター", text: "二人とも神聖なものを遊び道具にするな。大司教に渡そう。"},
                {speaker: "神殿大司教", text: "神の涙をこんなに届けてくれたのか！神の奇跡が降臨するよ。本当に感謝する！"},
                {speaker: "ギルドマスター", text: "報酬だ。神の涙で剣を洗うなよ。"}
            ]
        ],
        'A': [
        // 0: タイタンの骨（依頼主: 大地の古王）
        [
            {speaker: "冒険者", text: "伝説の英雄のためにタイタンの骨を{qty}本持ってきました。……骨に刻まれた呪文が、ヴォルガスの名を呪っていました。"},
            {speaker: "ギルドマスター", text: "タイタンの骨がヴォルガスを呪う……古の巨人が彼を知っていたのか。"},
            {speaker: "大地の古王", text: "タイタンの骨を……この骨は、ヴォルガスを封じた古の戦いの遺物だ。あの黒い軍勢は、大地の力を奪うために巨人を操っていた。君たちの故郷が破壊されたのは、大地の古き守りがそこにあったからだろう。本当に感謝する。この骨が、英雄の武器となり、闇を砕く。"},
            {speaker: "ギルドマスター", text: "報酬だ。大地のように不動の力を。"}
        ],
        // 1: 永遠の炎（依頼主: 炎の永遠なる守護者）
        [
            {speaker: "冒険者", text: "究極の錬金術師に永遠の炎を{qty}握り集めてきました。……炎の中に、深淵の影が揺らめいていました。"},
            {speaker: "ギルドマスター", text: "永遠の炎に影……ヴォルガスが炎すら蝕もうとしているのか。"},
            {speaker: "炎の永遠なる守護者", text: "永遠の炎を……この炎は、ヴォルガスの闇を焼く唯一の火だ。あの軍勢は、炎を消すために世界を焼き払おうとした。君たちの村が最初の炎の守りだったのかもしれない。本当に感謝する。この炎が、君たちの復讐を燃やす。"},
            {speaker: "ギルドマスター", text: "報酬だ。永遠に燃える力を。"}
        ],
        // 2: 神聖な遺物（依頼主: 神々の代弁者）
        [
            {speaker: "冒険者", text: "神々に神聖な遺物を{qty}個届けてきました。……遺物が、ヴォルガスの闇を拒絶していました。"},
            {speaker: "ギルドマスター", text: "神聖な遺物が闇を拒絶……神々がまだ戦っている証か。"},
            {speaker: "神々の代弁者", text: "神聖な遺物を……これは、ヴォルガスを封じた神々の力の欠片だ。あの軍勢は、神の遺物を破壊するために動いていた。君たちの故郷が狙われたのは、神の遺児の守りがそこにあったから。本当に感謝する。この遺物が、神々の意志を君たちに託す。"},
            {speaker: "ギルドマスター", text: "報酬だ。神々に選ばれた力を。"}
        ]
    ],
    'A+': [
        // 0: エルダードラゴンの心臓（依頼主: 世界の守護者）
        [
            {speaker: "冒険者", text: "世界の守護者にエルダードラゴンの心臓を{qty}個持ってきました。……心臓が、ヴォルガスの闇で脈打っていました。"},
            {speaker: "ギルドマスター", text: "エルダードラゴンの心臓が闇で……ヴォルガスが最古の竜すら支配したのか。"},
            {speaker: "世界の守護者", text: "エルダードラゴンの心臓を……この心臓は、ヴォルガスの闇を宿す最強の力だ。あの軍勢は、心臓を集めて完全復活を果たすつもりだった。君たちの村が破壊されたのは、心臓の守りの結界がそこにあったから。本当に感謝する。この心臓が、闇を滅ぼす鍵となる。"},
            {speaker: "ギルドマスター", text: "報酬だ。世界を守る力を。"}
        ],
        // 1: 深淵の核（依頼主: 禁断の研究者）
        [
            {speaker: "冒険者", text: "禁断の研究者に深淵の核を{qty}個集めてきました。……核が、ヴォルガスの本体の欠片のように感じられました。"},
            {speaker: "ギルドマスター", text: "深淵の核が本体の一部……これが復活の核心か。"},
            {speaker: "禁断の研究者", text: "深淵の核を……これは、ヴォルガス自身の欠片だ。あの軍勢は、核を集めて本体を再構築しようとしていた。君たちの故郷が最初の標的だったのは、核の封印がそこにあったから。本当に感謝する。この核が、ヴォルガスを内側から崩す。"},
            {speaker: "ギルドマスター", text: "報酬だ。深淵を内側から破壊する力を。"}
        ],
        // 2: 光の神器の欠片（依頼主: 最後の希望の守護者）
        [
            {speaker: "冒険者", text: "最後の希望に光の神器の欠片を{qty}個届けてきました。……欠片が、ヴォルガスの闇を浄化しようと輝いていました。"},
            {speaker: "ギルドマスター", text: "光の神器……これがヴォルガスを滅ぼす最終の武器か。"},
            {speaker: "最後の希望の守護者", text: "光の神器の欠片を……これは、ヴォルガスを永遠に封じる神器の欠片だ。あの軍勢は、神器を破壊するためにすべてを焼き払った。君たちの村が狙われたのは、神器の守りがそこにあったから。本当に感謝する。この欠片が、希望を再び灯す。"},
            {speaker: "ギルドマスター", text: "報酬だ。最後の希望を叶える力を。"}
        ]
    ],
    'S': [
        // 0: 世界の源石（依頼主: 運命の織り手）
        [
            {speaker: "冒険者", text: "運命に世界の源石を{qty}個持ってきました。……源石が、世界の終わりを予感させていました。"},
            {speaker: "ギルドマスター", text: "世界の源石……これがヴォルガスの起源か。"},
            {speaker: "運命の織り手", text: "世界の源石を……これは、ヴォルガスが生まれた世界の根源だ。あの軍勢は、源石を集めて世界を闇に染めようとした。君たちの故郷が破壊されたのは、源石の守りの糸がそこに紡がれていたから。本当に感謝する。この源石が、運命を書き換える。"},
            {speaker: "ギルドマスター", text: "報酬だ。運命を織り直す力を。"}
        ],
        // 1: 創世の欠片（依頼主: 神々に創世の守護者）
        [
            {speaker: "冒険者", text: "神々に創世の欠片を{qty}個集めてきました。……欠片が、ヴォルガスの闇を生んだ瞬間を映していました。"},
            {speaker: "ギルドマスター", text: "創世の欠片が闇を生んだ……すべてはここから始まったのか。"},
            {speaker: "創世の守護者", text: "創世の欠片を……これは、神々が世界を生んだ欠片であり、ヴォルガスが生まれた闇の欠片でもある。あの軍勢は、欠片を集めて創世を闇に塗り替えるつもりだった。君たちの村が最初の光だったから狙われた。本当に感謝する。この欠片が、新たな創世を始める。"},
            {speaker: "ギルドマスター", text: "報酬だ。創世を新たにする力を。"}
        ],
        // 2: 滅びの結晶（依頼主: 終焉の使者）
        [
            {speaker: "冒険者", text: "終焉の使者に滅びの結晶を{qty}個届けてきました。……結晶が、ヴォルガスの最終形態を示していました。"},
            {speaker: "ギルドマスター", text: "滅びの結晶……これがヴォルガスの終焉か、我々の終焉か。"},
            {speaker: "終焉の使者", text: "滅びの結晶を……これは、ヴォルガスがもたらす世界の終わりを結晶化したものだ。あの軍勢は、結晶を集めて終焉を早めようとした。君たちの村が破壊されたのは、終焉を遅らせる希望がそこにあったから。本当に感謝する。この結晶が、終焉をヴォルガス自身に返す。"},
            {speaker: "ギルドマスター", text: "報酬だ。終焉を終わらせる力を。"}
        ]
    ]
    
        
    }
],
    en: [

        {
        'F': [
            // 0: Slime Extermination (Client: Farmer)
            [
                {speaker: '{adv1}', text: 'We\'re back. We exterminated all 5 slimes around the village!' },
                {speaker: '{adv2}', text: 'Slime hunting, huh… Must\'ve been tough with them bouncing everywhere? That squishy feeling is unforgettable.' },
                {speaker: '{adv1}', text: 'It was exhausting… My whole body is covered in slime gel, and my clothes are sticky…' },
                {speaker: '{PLAYER}', text: 'Good work. Well done. The client, the farmer, is waiting.' },
                {speaker: '{adv2}', text: 'Hehe, I wanted to go too. Everyone slipping on slime juice would\'ve been hilarious!' },
                {speaker: '{adv1}', text: '{PLAYER}, thank you. Let\'s report to the farmer right away.' },
                {speaker: 'Farmer', text: 'Oh, adventurers! You took care of all the slimes! The crops are saved from dissolving—I\'m truly grateful!' },
                {speaker: 'Farmer', text: 'Those jelly-like slimes… they\'re not food, right? Scary, scary! Thank you so much!' },
                {speaker: 'Farmer', text: 'Now the crops are safe! Please take the reward!' },
                {speaker: 'Narrator', text: '(Choices: How to handle the situation after the slime quest?)' },
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        { text: 'Give the farmer advice on preventing slimes (+2 Reputation)', reward: [{type: "reputation", amount: 2}], jumptoline: 12 },
                        { text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)', reward: [{type: "friendliness", amount: 5, target: "participants"}], jumptoline: 15 },
                        { text: 'Collect slime gel to sell (+200 Gold, participating adventurers friendliness -5)', reward: [{type: "gold", amount: 200}, {type: "friendliness", amount: -5, target: "participants"}], jumptoline: 19 },
                        { text: 'Have them hunt extra slimes for training (Participating adventurers STR +3, friendliness -10)', reward: [{type: "strength", amount: 3, target: "participants"}, {type: "friendliness", amount: -10, target: "participants"}], jumptoline: 23 }
                    ]
                },
                {speaker: '{PLAYER}', text: 'Slimes like damp places, so improving drainage in the fields might reduce them.' },
                {speaker: 'Farmer', text: 'I see! I\'ll try it right away! Now I can rest easy—thank you!' },
                {speaker: 'Farmer', text: 'I\'m truly grateful for adventurers like you!', jumptoline: 27 },
                {speaker: '{PLAYER}', text: 'Everyone, you did great. Getting covered in slime gel must\'ve been rough. You\'re really reliable.' },
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work even harder!' },
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time it\'s my turn to shine!' },
                {speaker: '{PLAYER}', text: 'Yeah, I\'m counting on it.', jumptoline: 27 },
                {speaker: '{PLAYER}', text: 'This slime gel sells as alchemy material. Let\'s collect some for guild funds.' },
                {speaker: '{adv1}', text: '…It\'s valuable, but kind of gross… The stickiness won\'t come off…' },
                {speaker: '{adv2}', text: 'For money, I can tough it out! But next time let me handle the washing!' },
                {speaker: '{PLAYER}', text: 'Haha, I\'ll leave it to you.', jumptoline: 27 },
                {speaker: '{PLAYER}', text: 'Since we\'re here, hunt a few more slimes for training. Getting stronger will make the next quest easier.' },
                {speaker: '{adv1}', text: '…We\'re doing more? I\'m tired, but… okay. I want to get stronger.' },
                {speaker: '{adv2}', text: 'Hey, give us a break… But if it makes us stronger, I\'ll do it. I won\'t lose!' },
                {speaker: '{PLAYER}', text: 'That\'s the spirit.', jumptoline: 27 },
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and receive the reward.' }
            ],
            // 1: Giant Rat Extermination (Client: Tavern Owner)
            [
                {speaker: '{adv1}', text: 'We exterminated all the giant rats in the tavern basement.' },
                {speaker: '{adv2}', text: 'Giant rats!? How big were they? I wanted to slash more!' },
                {speaker: '{adv1}', text: 'They were pretty big… It was terrifying—I almost got bitten…' },
                {speaker: '{PLAYER}', text: 'Good work. Glad you\'re safe. If you\'d been there, the tavern would\'ve been a bloodbath.' },
                {speaker: '{adv2}', text: 'That would\'ve been awesome! Flashy and cool—everyone would freak out!' },
                {speaker: '{adv1}', text: '{PLAYER}, thank you. Let\'s report to the tavern owner.' },
                {speaker: 'Tavern Owner', text: 'Oh! You cleared out all the giant rats! I can use the basement again!' },
                {speaker: 'Tavern Owner', text: 'I\'ll treat you to a drink… but no sea of blood, please! Really saved me—thank you!' },
                {speaker: 'Tavern Owner', text: 'Great! Please take the reward!' },
                {speaker: 'Narrator', text: '(Choices: How to handle the situation after the rat quest?)' },
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        { text: 'Suggest rat prevention to the tavern owner (+2 Reputation)', reward: [{type: "reputation", amount: 2}], jumptoline: 12 },
                        { text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)', reward: [{type: "friendliness", amount: 5, target: "participants"}], jumptoline: 15 },
                        { text: 'Collect rat tails to sell (+200 Gold, participating adventurers friendliness -5)', reward: [{type: "gold", amount: 200}, {type: "friendliness", amount: -5, target: "participants"}], jumptoline: 19 },
                        { text: 'Have them hunt extra rats for training (Participating adventurers STR +3, friendliness -10)', reward: [{type: "strength", amount: 3, target: "participants"}, {type: "friendliness", amount: -10, target: "participants"}], jumptoline: 23 }
                    ]
                },
                {speaker: '{PLAYER}', text: 'Rats go for food, so strict food storage in the basement might reduce them.' },
                {speaker: 'Tavern Owner', text: 'Got it! I\'ll do it right away! Now I can run the place in peace—thank you!' },
                {speaker: 'Tavern Owner', text: 'Come back anytime—drinks on the house!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'Everyone, giant rats must\'ve been scary. Thank you—you\'re reliable.' },
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!' },
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll be the star!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'These rat tails sell as material. Let\'s collect some for guild funds.' },
                {speaker: '{adv1}', text: '…Valuable, but kind of gross…' },
                {speaker: '{adv2}', text: 'For money, I can handle it! But next time let me do it!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'Since we\'re here, hunt a few more rats for training. Strength makes the next quest easier.' },
                {speaker: '{adv1}', text: '…More? It was scary, but… okay.' },
                {speaker: '{adv2}', text: 'Hey, give us a break… But if it makes us stronger, I\'ll do it. I won\'t lose!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and receive the reward.' }
            ],
            // 2: Wild Dog Extermination (Client: Farmer)
            [
                {speaker: '{adv1}', text: 'We defeated all 3 wild dogs attacking the farm. The livestock is safe.' },
                {speaker: '{adv2}', text: 'Wild dogs! I wanted to chase and slash them—wanted to be flashier!' },
                {speaker: '{adv1}', text: 'They were fast… It was really dangerous…' },
                {speaker: '{PLAYER}', text: 'Good work. Livestock safe is the best outcome. If you\'d been there, the livestock would\'ve been chased too.' },
                {speaker: '{adv2}', text: 'Haha! That would\'ve been fun! A big race for dogs and livestock!' },
                {speaker: '{adv1}', text: '{PLAYER}, thank you. Let\'s report to the farmer.' },
                {speaker: 'Farmer', text: 'You took care of all the wild dogs! Everyone\'s relieved the livestock is safe!' },
                {speaker: 'Farmer', text: 'All that chasing… it\'s not a game, right? Scary—really thank you!' },
                {speaker: 'Farmer', text: 'Now the livestock is safe! Please take the reward!' },
                {speaker: 'Narrator', text: '(Choices: How to handle the situation after the wild dog quest?)' },
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        { text: 'Give the farmer advice on preventing wild dogs (+2 Reputation)', reward: [{type: "reputation", amount: 2}], jumptoline: 12 },
                        { text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)', reward: [{type: "friendliness", amount: 5, target: "participants"}], jumptoline: 15 },
                        { text: 'Collect wild dog fangs to sell (+200 Gold, participating adventurers friendliness -5)', reward: [{type: "gold", amount: 200}, {type: "friendliness", amount: -5, target: "participants"}], jumptoline: 19 },
                        { text: 'Have them hunt extra wild dogs for training (Participating adventurers STR +3, friendliness -10)', reward: [{type: "strength", amount: 3, target: "participants"}, {type: "friendliness", amount: -10, target: "participants"}], jumptoline: 23 }
                    ]
                },
                {speaker: '{PLAYER}', text: 'Wild dogs travel in packs, so reinforcing fences or planting repellent herbs might help.' },
                {speaker: 'Farmer', text: 'I see! I\'ll try it right away! Now I can raise livestock in peace—thank you!' },
                {speaker: 'Farmer', text: 'I\'m truly grateful for adventurers like you!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'Everyone, fast wild dogs must\'ve been tough. Thank you—you\'re reliable.' },
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!' },
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time it\'s my turn to shine!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'These wild dog fangs sell as weapon material. Let\'s collect some for guild funds.' },
                {speaker: '{adv1}', text: '…Valuable, but a bit scary…' },
                {speaker: '{adv2}', text: 'For money, I can handle it! But next time let me do it!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'Since we\'re here, hunt a few more wild dogs for training. Strength makes the next quest easier.' },
                {speaker: '{adv1}', text: '…More? It was scary, but… okay.' },
                {speaker: '{adv2}', text: 'Hey, give us a break… But if it makes us stronger, I\'ll do it. I won\'t lose!', jumptoline: 24 },
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and receive the reward.' }
            ]
        ],
      'F+': [
        // 0: Kill 8 Goblins (Client: Road Guard)
        [
          {speaker: "Adventurer", text: "I eliminated all 8 goblins ambushing on the road... They were pretty persistent and tiring."},
          {speaker: "Kaito", text: "8 goblins!? Nice! I'd have cut down 10 easy! Take me next time, no excuses!"},
          {speaker: '{PLAYER}', text: "Kaito, cool it. Let's report to the guard."},
          {speaker: "Guard", text: "You took out 8 goblins! The road is safe now... Bragging about 10 is a bit much, huh? Thanks, adventurer!"},
          {speaker: '{PLAYER}', text: "Take your reward. Kaito, get ready—I really will bring you next time."}
        ],
        // 1: Eliminate 5 Bandits (Client: Merchant)
        [
          {speaker: "Adventurer", text: "I took out the 5 bandits hiding in the forest... Fighting humans made me tense."},
          {speaker: "Kaito", text: "Bandits!? Human or not, my sword doesn't care—I'd wipe them all out! My turn next!"},
          {speaker: "Luna", text: "Kaito, that's a bit scary... But yeah, they're trouble."},
          {speaker: '{PLAYER}', text: "Both of you, quiet. Let's report to the merchant."},
          {speaker: "Merchant", text: "You eliminated all 5 bandits! Business can be safe again. I'm truly grateful, thank you!"},
          {speaker: '{PLAYER}', text: "Here's the reward. Kaito, try not to scare anyone next time."}
        ],
        // 2: Kill 1 Giant Spider (Client: Villager)
        [
          {speaker: "Adventurer", text: "I defeated the giant spider lurking in the cave... Getting tangled in webs was the worst."},
          {speaker: "Kaito", text: "Giant spider!? Sounds strong! I'd have skewered it with my sword!"},
          {speaker: "Luna", text: "Spider silk is great magic material... What a waste."},
          {speaker: '{PLAYER}', text: "Luna, think about materials later. Let's tell the villager."},
          {speaker: "Villager", text: "You beat the giant spider! The cave isn't scary anymore. Thank you so much!"},
          {speaker: '{PLAYER}', text: "Take your reward. Maybe next time collect some silk?"}
        ]
      ],
      'D': [
        // 0: Kill 10 Orcs (Client: Village Chief)
        [
          {speaker: "Adventurer", text: "I wiped out the 10 orcs threatening the village... The stench was awful."},
          {speaker: "Kaito", text: "10 orcs!? Awesome! My sword would be singing! Take me next time!"},
          {speaker: "Luna", text: "Kaito, orc smell can't be removed even with magic..."},
          {speaker: '{PLAYER}', text: "Both quiet. Report to the chief."},
          {speaker: "Village Chief", text: "You destroyed the orc pack! The village is saved... I'll endure the smell! Thank you so much!"},
          {speaker: '{PLAYER}', text: "Reward. Bringing Kaito next might make the whole village smell like orc."}
        ],
        // 1: Kill 1 Troll (Client: Bridge Keeper)
        [
          {speaker: "Adventurer", text: "I defeated the troll occupying the bridge... Its regeneration made it tough."},
          {speaker: "Kaito", text: "A troll!? The regenerating kind! I'd have burned it to ash! My turn next!"},
          {speaker: '{PLAYER}', text: "Kaito, fire would burn the bridge too. Report to the keeper."},
          {speaker: "Bridge Keeper", text: "You killed the troll! The bridge is safe... but no fire, please! Thank you, adventurer!"},
          {speaker: '{PLAYER}', text: "Reward. Next time, no fire."}
        ],
        // 2: Kill Wolf King + Pack (Client: Hunter)
        [
          {speaker: "Adventurer", text: "I hunted the wolf king and its pack deep in the forest... The howling still rings in my ears."},
          {speaker: "Kaito", text: "Wolf king!? Cool! I wanted to fight the whole pack!"},
          {speaker: "Luna", text: "Kaito, getting bitten would be bad."},
          {speaker: '{PLAYER}', text: "Quiet, you two. Report to the hunter."},
          {speaker: "Hunter", text: "You took down the wolf king and pack! The forest is at peace. Thank you so much!"},
          {speaker: '{PLAYER}', text: "Reward. Taking Kaito next might turn it into a howling concert."}
        ]
      ]},{
        'F': [
            // 0: Pendant Search (Client: Old Lady)
            [
                // Lines 0-5
                {speaker: '{adv1}', text: 'We found the old lady\'s lost pendant! It was under a stone in the alley.'},
                {speaker: '{adv2}', text: 'Heh, something that small? I would\'ve sniffed it out in a second! Just luck, right?'},
                {speaker: '{adv1}', text: 'You have to search carefully to find it… hehe.'},
                {speaker: '{adv2}', text: 'This engraving… feels familiar. Looks like something the old guild master had…'},
                {speaker: '{adv1}', text: 'Shh! Not now! {PLAYER}, let\'s return it to the old lady quickly.'},
                {speaker: '{PLAYER}', text: 'The old guild master\'s…? Never mind, I\'ll ask later.'},
                // Lines 6-7
                {speaker: 'Old Lady', text: 'Oh, my precious pendant…! This engraving is from a harvest festival long ago. A memory from peaceful times…'},
                {speaker: 'Old Lady', text: 'I\'ve been worried hearing soldiers are moving at the border again. Thank you so much—I\'m tearing up…'},
                // Line 8 - Reward by quest giver
                {speaker: 'Old Lady', text: 'I\'m so glad it was found safe. Here\'s your reward. Please treasure it.'},
                // Line 9
                {speaker: 'Narrator', text: '(Choices: What to do after the discovery?)'},
                // Line 10 - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Give further insight about the pendant (+2 Reputation)',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Sell the discovery details to the tavern owner for extra gold (+150 Gold, participating adventurers friendliness -5)',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Have them use mana to investigate further and train wisdom (Participating adventurers MP -50, WIS +3)',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: 'This engraving resembles harvest festival symbols from peaceful times. It might be best to keep it stored safely.'},
                {speaker: 'Old Lady', text: 'You\'re right… Thank you for telling me. That puts my mind at ease.'},
                {speaker: 'Old Lady', text: 'I\'m truly grateful for adventurers like you!', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: 'Good work, everyone. Finding such a small pendant shows you\'re reliable.'},
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work even harder!'},
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll be the star!'},
                {speaker: '{PLAYER}', text: 'Yeah, I\'m counting on it.', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: 'We can get information money by telling the tavern owner about the pendant details. Let\'s add it to guild funds.'},
                {speaker: '{adv1}', text: '…It does have value, but it feels a bit shady…'},
                {speaker: '{adv2}', text: 'For gold, I can deal! But next time let me do it!'},
                {speaker: '{PLAYER}', text: 'Haha, sure thing.', jumptoline: 27},
                // Branch 4: Mana investigation (elaborated)
                {speaker: '{PLAYER}', text: 'Since we\'re here, use mana to investigate further. It\'s good wisdom training.'},
                {speaker: '{adv1}', text: '…I channeled mana into the pendant. A faint protective magic reacted—it seems an old spell praying for peace was cast on it. Almost no power left now…'},
                {speaker: '{adv2}', text: 'A peace spell, huh… Hits hard with the border getting noisy again!'},
                {speaker: '{PLAYER}', text: 'Interesting find. Keep it up.', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.'}
            ],
            // 1: Hidden Treasure Chest Discovery (Client: Villager)
            [
                // Lines 0-5
                {speaker: '{adv1}', text: 'We found the hidden treasure chest in the forest! It was buried under tree roots.'},
                {speaker: '{adv2}', text: 'Hidden treasure chest! …Only 3 old gold coins inside!? I was expecting more!'},
                {speaker: '{adv1}', text: 'Finding it is already impressive. These coins are from the old royal era—quite rare.'},
                {speaker: '{adv2}', text: 'This spot… feels familiar. Like where the old guild master played with {PLAYER}…'},
                {speaker: '{adv1}', text: 'Shh! Don\'t say unnecessary things! {PLAYER}, let\'s report to the villager.'},
                {speaker: '{PLAYER}', text: 'Played with the old guild master…? Never mind, later.'},
                // Lines 6-7
                {speaker: 'Villager', text: 'You really found the hidden treasure chest! The legend I heard as a kid was true.'},
                {speaker: 'Villager', text: 'These old coins are from the royal era. Lately there\'s been rumors about royal bloodlines, and everyone\'s buzzing.'},
                // Line 8
                {speaker: 'Villager', text: 'Take the contents as your reward! Really saved us—thank you!'},
                // Line 9
                {speaker: 'Narrator', text: '(Choices: What to do after the discovery?)'},
                // Line 10 - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Give further insight about the treasure chest (+2 Reputation)',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Sell the discovery details to the tavern owner for extra gold (+150 Gold, participating adventurers friendliness -5)',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Have them use mana to investigate further and train wisdom (Participating adventurers MP -50, WIS +3)',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight
                {speaker: '{PLAYER}', text: 'These old coins are rare from the royal era. Recording the location might lead to more finds.'},
                {speaker: 'Villager', text: 'Good idea! I\'ll do that right away! Now I feel safer—thank you!'},
                {speaker: 'Villager', text: 'I\'m truly grateful for adventurers like you!', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: 'Great job, everyone. Finding a legendary treasure chest is impressive. You\'re reliable.'},
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work even harder!'},
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll be the star!'},
                {speaker: '{PLAYER}', text: 'Yeah, I\'m counting on it.', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: 'We can get information money by telling the tavern owner about the chest details. Let\'s add it to guild funds.'},
                {speaker: '{adv1}', text: '…It does have value, but it feels a bit shady…'},
                {speaker: '{adv2}', text: 'For gold, I can deal! But next time let me do it!'},
                {speaker: '{PLAYER}', text: 'Haha, sure thing.', jumptoline: 27},
                // Branch 4: Mana investigation
                {speaker: '{PLAYER}', text: 'Since we\'re here, use mana to investigate further. It\'s good wisdom training.'},
                {speaker: '{adv1}', text: 'I channeled mana… A hidden magic mark appeared in the soil. It looks like a network pointing to other hidden locations—royal era secrets still remain…'},
                {speaker: '{adv2}', text: 'Whoa! That means more treasure!? The adventure just got bigger!'},
                {speaker: '{PLAYER}', text: 'Interesting discovery. Keep it up.', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.'}
            ],
            // 2: Well\'s Secret (Client: Scholar)
            [
                // Lines 0-5
                {speaker: '{adv1}', text: 'We discovered the secret at the bottom of the old well! An ancient magic circle was glowing under the moss.'},
                {speaker: '{adv2}', text: 'Magic circle!? Awesome! I wanted to dive in too—feels adventurous!'},
                {speaker: '{adv1}', text: 'You\'d die if you fell… We have to investigate carefully.'},
                {speaker: '{adv2}', text: 'This magic circle… feels familiar. Like it\'s connected to the old guild master and {PLAYER}…'},
                {speaker: '{adv1}', text: 'Shh! Not now! {PLAYER}, let\'s report to the scholar.'},
                {speaker: '{PLAYER}', text: 'Connected to the guild master…? Never mind, later.'},
                // Lines 6-7
                {speaker: 'Scholar', text: 'You uncovered the well\'s magic circle! Wonderful! It\'s an ancient sealing array—a major discovery!'},
                {speaker: 'Scholar', text: 'Recently similar arrays have been reacting in the capital too. A large magical anomaly might be occurring…'},
                // Line 8
                {speaker: 'Scholar', text: 'You really helped! Here\'s your reward. Let me continue the research!'},
                // Line 9
                {speaker: 'Narrator', text: '(Choices: What to do after the discovery?)'},
                // Line 10 - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Give further insight about the magic circle (+2 Reputation)',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Sell the discovery details to the tavern owner for extra gold (+150 Gold, participating adventurers friendliness -5)',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Have them use mana to investigate further and train wisdom (Participating adventurers MP -50, WIS +3)',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight
                {speaker: '{PLAYER}', text: 'This is an ancient sealing array. Regularly checking its mana might help detect anomalies early.'},
                {speaker: 'Scholar', text: 'Exactly! I\'ll start right away! Now I feel safer—thank you!'},
                {speaker: 'Scholar', text: 'I\'m truly grateful for adventurers like you!', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: 'Great job, everyone. Finding an ancient magic circle is impressive. You\'re reliable.'},
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work even harder!'},
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll be the star!'},
                {speaker: '{PLAYER}', text: 'Yeah, I\'m counting on it.', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: 'We can get information money by telling the tavern owner about the circle details. Let\'s add it to guild funds.'},
                {speaker: '{adv1}', text: '…It does have value, but it feels a bit shady…'},
                {speaker: '{adv2}', text: 'For gold, I can deal! But next time let me do it!'},
                {speaker: '{PLAYER}', text: 'Haha, sure thing.', jumptoline: 27},
                // Branch 4: Mana investigation
                {speaker: '{PLAYER}', text: 'Since we\'re here, use mana to investigate further. It\'s good wisdom training.'},
                {speaker: '{adv1}', text: 'I infused mana into the array… It resonated, showing a weak reaction toward the capital. This anomaly might be a chain across multiple sealing arrays.'},
                {speaker: '{adv2}', text: 'Whoa, that\'s bad! A big magical wave coming!? This is getting exciting!'},
                {speaker: '{PLAYER}', text: 'We need to stay alert. Keep it up.', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.'}
            ]
        ],
      'F+': [
        // 0: Cave Behind Waterfall (Client: Explorer)
        [
          {speaker: "Adventurer", text: "I found the hidden cave behind the forest waterfall... Got completely soaked from the spray."},
          {speaker: "Luna", text: "Behind a waterfall!? So romantic~ Must be a hidden ruin!"},
          {speaker: "Kaito", text: "Water? Pass—I hate getting wet."},
          {speaker: '{PLAYER}', text: "Quiet, you two. Report to the explorer."},
          {speaker: "Explorer", text: "You found the cave behind the waterfall! New adventures can begin. Thank you so much!"},
          {speaker: '{PLAYER}', text: "Reward. Next time, Kaito gets wet too."}
        ],
        // 1: Hidden Basement in Old House (Client: Homeowner)
        [
          {speaker: "Adventurer", text: "I located the hidden basement in the old house... Covered in dust, can't stop sneezing."},
          {speaker: "Luna", text: "Hidden basement!? Secret library or treasure vault—my deduction was spot on!"},
          {speaker: '{PLAYER}', text: "Luna, brag later. Report to the homeowner."},
          {speaker: "Homeowner", text: "You found the hidden basement! My ancestors' secrets can finally be uncovered. Thank you, adventurer!"},
          {speaker: '{PLAYER}', text: "Reward. Luna, cleaning duty next."}
        ],
        // 2: Hidden Hut Along River (Client: Fisherman)
        [
          {speaker: "Adventurer", text: "I found the hidden hut along the river... So many bugs, it was rough."},
          {speaker: "Luna", text: "Hidden hut... Maybe a smuggler's hideout? Sounds interesting!"},
          {speaker: "Kaito", text: "Bugs!? I'd have crushed them all!"},
          {speaker: '{PLAYER}', text: "You two overthinking. Report to the fisherman."},
          {speaker: "Fisherman", text: "You found my old hidden hut by the river! The tools inside are still usable. Really helps—thanks!"},
          {speaker: '{PLAYER}', text: "Reward. Bring bug repellent next time."}
        ]
      ],
      'D': [
        // 0: Small Ruin Entrance (Client: Archaeologist)
        [
          {speaker: "Adventurer", text: "I discovered the entrance to a small ruin on the nearby hill... Lots of traps."},
          {speaker: "Luna", text: "Ruin entrance!? The patterns match my book—definitely ancient magic!"},
          {speaker: "Kaito", text: "Traps... I'd have smashed them all!"},
          {speaker: '{PLAYER}', text: "Calm down, both. Report to the archaeologist."},
          {speaker: "Archaeologist", text: "You found the small ruin entrance! New discoveries await. Thank you so much!"},
          {speaker: '{PLAYER}', text: "Reward. Next time, Luna disarms traps with magic."}
        ],
        // 1: Hidden Bandit Camp (Client: Guard Captain)
        [
          {speaker: "Adventurer", text: "I located the bandits' hidden camp... Security was tight."},
          {speaker: "Luna", text: "Camp location... Just as I deduced from the terrain!"},
          {speaker: '{PLAYER}', text: "Luna, brag later. Report to the captain."},
          {speaker: "Guard Captain", text: "You found the bandits' hidden camp! We can wipe them out now. Thank you, adventurer!"},
          {speaker: '{PLAYER}', text: "Reward. Next time, Luna's deduction wipes them out?"}
        ],
        // 2: Missing Caravan Wreckage (Client: Merchant Guild Leader)
        [
          {speaker: "Adventurer", text: "I found the wreckage of the missing caravan... It was a sad sight."},
          {speaker: "Luna", text: "Caravan wreckage... Are the goods intact? I want the merchant records."},
          {speaker: '{PLAYER}', text: "Luna, think of the bereaved. Report to the guild leader."},
          {speaker: "Merchant Guild Leader", text: "You found the caravan wreckage... Now we know the truth. Thank you so much."},
          {speaker: '{PLAYER}', text: "Reward. Hope it brings some closure."}
        ]
      ]
      // Higher ranks to be added later
    },// 2: DEX - escort quests (English - only F, F+, D ranks)
    {
        'F': [
            // 0: Farmer Escort (Client: Farmer)
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: 'We safely escorted the farmer to the market! Nothing happened on the way—it was a super boring trip!'},
                {speaker: '{PLAYER}', text: 'Safe is best. Peace is what matters most.'},
                {speaker: '{adv1}', text: 'I\'m glad nothing happened. If {adv2} started rampaging, the farmer would\'ve been terrified.'},
                {speaker: '{adv2}', text: 'Hey, the farmer wanted to see me in action, right!? …Wait, this road… feels like where the old guild master escorted a caravan…'},
                {speaker: '{adv1}', text: 'Shh! Not now! {PLAYER}, let\'s report to the farmer.'},
                {speaker: '{PLAYER}', text: 'Caravan escort…? I\'ll ask later. Farmer, we arrived safely.'},
                // Line 7-8 (index 6-7)
                {speaker: 'Farmer', text: 'Thank you so much! Lately bandits have increased on the trade road—I was too scared to go alone. Sold everything at a good price!'},
                {speaker: 'Farmer', text: 'I heard taxes are rising at the border too—prices might skyrocket… You really saved me!'},
                // Line 9 (index 8)
                {speaker: 'Farmer', text: 'Glad we made it safe. Here\'s your reward. Thank you!'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '(Choices: What to do after the escort?)'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Ask if they saw anything special on the way (+1 Lucky Coin)',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Demand extra reward since the world is dangerous now (+300 Gold, participating adventurers friendliness -10)',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Have them protect the client a bit longer to train dexterity (Participating adventurers HP -50, DEX +3)',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'Did you notice anything special on the way? Something unusual?'},
                {speaker: '{adv1}', text: 'Now that you mention it, I found an old lucky coin on the roadside. It felt special, so I kept it.'},
                {speaker: 'Farmer', text: 'Oh, that\'s a lucky coin! Take it as thanks. Thank you!', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'Good work, everyone. You escorted safely—you\'re reliable.'},
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!'},
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll shine big!'},
                {speaker: '{PLAYER}', text: 'Yeah, counting on it.', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: 'The world is dangerous lately—could we get some extra reward? Escorting was tough.'},
                {speaker: 'Farmer', text: '…True, times are tough. Fine, here\'s an extra 300G. Thank you.'},
                {speaker: '{adv1}', text: '…That was a bit pushy…'},
                {speaker: '{adv2}', text: 'Money\'s nice, but… let me handle next time!', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'Since we\'re here, protect the farmer a bit longer. Good dexterity training.'},
                {speaker: '{adv1}', text: '…Still more? Understood, I\'ll stay alert.'},
                {speaker: '{adv2}', text: 'Hey, give us a break… but if we\'re doing it, I\'m serious!'},
                {speaker: '{adv1}', text: '…On the way back, small-time bandits attacked. We took minor injuries but slipped through with quick moves!'},
                {speaker: '{adv2}', text: 'Damn, it hurts a bit… but my dodging feels sharper!'},
                {speaker: '{PLAYER}', text: 'That\'s the spirit. You held up well.', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.'}
            ],
            // 1: Child Escort (Client: Parent)
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: 'We safely escorted the child across the dangerous bridge and home! I even held their hand~.'},
                {speaker: '{PLAYER}', text: 'That\'s kind. The child must\'ve felt safe. Good work.'},
                {speaker: '{adv2}', text: 'Just crossing a bridge!? I would\'ve given the kid a wooden sword for monster-slaying pretend play!'},
                {speaker: '{adv1}', text: 'That\'s dangerous! The child would be scared… Wait, this bridge—the old guild master carried {PLAYER} across…'},
                {speaker: '{adv2}', text: 'Yeah! Carried you over! …Oops, slipped out!'},
                {speaker: '{PLAYER}', text: 'Carried me…? I\'ll ask later. Parent, we delivered the child safely.'},
                // Line 7-8 (index 6-7)
                {speaker: 'Parent', text: 'The child is home safe! That crumbling bridge—I was too scared to cross alone… Thank you so much!'},
                {speaker: 'Parent', text: 'Accidents have increased lately, and monsters are getting closer—everyone\'s talking about it. Good thing I asked you!'},
                // Line 9 (index 8)
                {speaker: 'Parent', text: 'Glad we made it safe. Here\'s your reward. Really helped!'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '(Choices: What to do after the escort?)'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Ask if they saw anything special on the way (+1 Lucky Coin)',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Demand extra reward since the world is dangerous now (+300 Gold, participating adventurers friendliness -10)',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Have them protect the client a bit longer to train dexterity (Participating adventurers HP -50, DEX +3)',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'Did you notice anything special on the way? Something unusual?'},
                {speaker: '{adv2}', text: 'Found an old lucky coin near the bridge. Felt lucky, so I picked it up!'},
                {speaker: 'Parent', text: 'That\'s a lucky coin! Take it as thanks. Thank you!', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'Good work, everyone. You protected the child gently—you\'re reliable.'},
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!'},
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll shine big!'},
                {speaker: '{PLAYER}', text: 'Yeah, counting on it.', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: 'The world is dangerous lately—could we get some extra reward? Escorting was tough.'},
                {speaker: 'Parent', text: '…True, scary times. Fine, here\'s an extra 300G. Thank you.'},
                {speaker: '{adv1}', text: '…That was a bit pushy…'},
                {speaker: '{adv2}', text: 'Money\'s nice, but… let me handle next time!', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'Since we\'re here, protect the child a bit longer. Good dexterity training.'},
                {speaker: '{adv1}', text: '…Still more? Understood, I\'ll stay alert.'},
                {speaker: '{adv2}', text: 'Hey, give us a break… but if we\'re doing it, I\'m serious!'},
                {speaker: '{adv2}', text: '…On the way back, small monsters attacked near the bridge! Took minor injuries but dodged and protected perfectly!'},
                {speaker: '{adv1}', text: 'It hurts, but… my movement feels better.'},
                {speaker: '{PLAYER}', text: 'That\'s the spirit. You held up well.', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.'}
            ],
            // 2: Messenger Escort (Client: Village Chief)
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: 'Messenger letter escort complete! No spies showed up—total letdown!'},
                {speaker: '{PLAYER}', text: 'Delivered safely. Peace is best.'},
                {speaker: '{adv1}', text: '{adv2}, too much imagination. The messenger looked relieved.'},
                {speaker: '{adv2}', text: 'If a spy appeared, I\'d cut them down in one slash! …This road—the old guild master carried important letters…'},
                {speaker: '{adv1}', text: 'Shh! Wrong timing! {PLAYER}, let\'s report to the village chief.'},
                {speaker: '{PLAYER}', text: 'Important letters…? I\'ll ask later. Village chief, delivered safely.'},
                // Line 7-8 (index 6-7)
                {speaker: 'Village Chief', text: 'The messenger arrived safe and the letter too! This seals the village alliance. Truly grateful!'},
                {speaker: 'Village Chief', text: 'Amid rumors of political change in the capital, protecting such an important letter… Your guild is reliable!'},
                // Line 9 (index 8)
                {speaker: 'Village Chief', text: 'Glad we made it safe. Here\'s your reward. Good work!'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '(Choices: What to do after the escort?)'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Ask if they saw anything special on the way (+1 Lucky Coin)',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Demand extra reward since the world is dangerous now (+300 Gold, participating adventurers friendliness -10)',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Have them protect the client a bit longer to train dexterity (Participating adventurers HP -50, DEX +3)',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'Did you notice anything special on the way? Something unusual?'},
                {speaker: '{adv2}', text: 'Found an old lucky coin on the roadside. Felt good, so I picked it up!'},
                {speaker: 'Village Chief', text: 'That\'s a lucky coin! Take it as thanks. Thank you!', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'Good work, everyone. You protected an important letter safely—you\'re reliable.'},
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!'},
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll shine big!'},
                {speaker: '{PLAYER}', text: 'Yeah, counting on it.', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: 'The world is dangerous lately—could we get some extra reward? Escorting was tough.'},
                {speaker: 'Village Chief', text: '…True, unstable times. Fine, here\'s an extra 300G. Thank you.'},
                {speaker: '{adv1}', text: '…That was a bit pushy…'},
                {speaker: '{adv2}', text: 'Money\'s nice, but… let me handle next time!', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'Since we\'re here, protect the messenger a bit longer. Good dexterity training.'},
                {speaker: '{adv1}', text: '…Still more? Understood, I\'ll stay alert.'},
                {speaker: '{adv2}', text: 'Hey, give us a break… but if we\'re doing it, I\'m serious!'},
                {speaker: '{adv2}', text: '…On the way back, suspicious bandits attacked! Took minor injuries but guarded with quick moves!'},
                {speaker: '{adv1}', text: 'It hurts, but… my evasion feels better.'},
                {speaker: '{PLAYER}', text: 'That\'s the spirit. You held up well.', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.'}
            ]
        ],
      'F+': [
        // 0: Escort Merchant (Goblin Road)
        [
          {speaker: "Adventurer", text: "I escorted the merchant to the next town. Goblin road, but safe."},
          {speaker: "Kaito", text: "Goblins showed up and you didn't call me!? Next time, no excuses!"},
          {speaker: "Luna", text: "If Kaito went, the merchant would run in fear."},
          {speaker: '{PLAYER}', text: "Both noisy. Merchant, your thoughts?"},
          {speaker: "Merchant", text: "We passed the goblin road safely! You were reliable—thank you, adventurer!"},
          {speaker: '{PLAYER}', text: "Reward. Taking Kaito next might lead to price hikes."}
        ],
        // 1: Escort Traveler Group
        [
          {speaker: "Adventurer", text: "I safely guarded the traveler group through the forest road."},
          {speaker: "Luna", text: "The travelers seemed to enjoy it? I wanted souvenir stories~"},
          {speaker: "Kaito", text: "Forest? I'd have made an iron defense! Call me next!"},
          {speaker: '{PLAYER}', text: "You're tourists yourselves. Report to the group leader."},
          {speaker: "Traveler Leader", text: "You got us safely through the forest! It was scary but fun thanks to you!"},
          {speaker: '{PLAYER}', text: "Reward. Next time, tour guide duty?"}
        ],
        // 2: Escort Caravan
        [
          {speaker: "Adventurer", text: "I safely protected the cargo caravan from bandits."},
          {speaker: "Kaito", text: "Bandits appeared!? I'd have wiped them all—damn, missed it!"},
          {speaker: "Luna", text: "Kaito, damaged cargo would be bad. Safe is best."},
          {speaker: '{PLAYER}', text: "Quiet. Report to the caravan leader."},
          {speaker: "Caravan Leader", text: "You protected the cargo from bandits! Business can continue—thank you!"},
          {speaker: '{PLAYER}', text: "Reward. Kaito, next bandit hunt is yours."}
        ]
      ],
      'D': [
        // 0: Escort Noble (Client: Noble)
        [
          {speaker: "Adventurer", text: "I safely escorted the noble to the neighboring town... Assassin vibes kept me on edge."},
          {speaker: "Kaito", text: "Assassins!? If they showed, I'd have cut them down instantly! Take me next!"},
          {speaker: "Luna", text: "Kaito would scare the noble into fleeing..."},
          {speaker: '{PLAYER}', text: "Quiet. Noble, how was the trip?"},
          {speaker: "Noble", text: "I arrived safely in the next town. Assassin rumors, but no fear thanks to you. Grateful!"},
          {speaker: '{PLAYER}', text: "Reward. Taking Kaito next might cause... negotiations."}
        ],
        // 1: Return Injured Soldier (Client: Medic)
        [
          {speaker: "Adventurer", text: "I escorted the injured soldier from the front line to camp... Battlefield air was heavy."},
          {speaker: "Luna", text: "Injured soldier... I wanted to cast healing magic. Should have gone."},
          {speaker: "Kaito", text: "Battlefield!? I'd have cleared all enemies!"},
          {speaker: '{PLAYER}', text: "Read the room. Report to the medic."},
          {speaker: "Medic", text: "You safely brought the injured soldier! A life saved—thank you!"},
          {speaker: '{PLAYER}', text: "Reward. Luna's magic could heal everyone next time?"}
        ],
        // 2: Escort Scholar to Ruin (Client: Scholar)
        [
          {speaker: "Adventurer", text: "I escorted the scholar to the dangerous ruin... Too many traps, nerve-wracking."},
          {speaker: "Luna", text: "Ruin traps!? I'd have disarmed them all~ Scholar must be thrilled."},
          {speaker: "Kaito", text: "Traps? I'd smash through!"},
          {speaker: '{PLAYER}', text: "Don't crush the scholar. Scholar, impressions?"},
          {speaker: "Scholar", text: "We reached the ruin safely. Impossible without your guard. Thank you!"},
          {speaker: '{PLAYER}', text: "Reward. Taking you two next might collapse the ruin."}
        ]
      ]
      // Higher ranks to be added later
    },// 3: LUC - fetch quests (English - only F, F+, D ranks)
    {
        'F': [
            // 0: Medicinal Herb Gathering (Client: Alchemist)
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: 'We gathered all the medicinal herbs the alchemist requested! They\'re fresh!' },
                {speaker: '{PLAYER}', text: 'Good work. You went deep into the forest, right? Well done.' },
                {speaker: '{adv2}', text: 'Herbs, huh. I might\'ve trampled them! But if they make potions, not bad.' },
                {speaker: '{adv1}', text: 'These can make powerful healing potions! With magic thinning lately, they\'re precious.' },
                {speaker: '{PLAYER}', text: 'Magic thinning? I\'ve heard monsters are weaker lately too…' },
                {speaker: '{adv2}', text: 'Then can we make a magic amplification potion? Coat my sword and I\'d be unstoppable!' },
                // Line 7-8 (index 6-7)
                {speaker: 'Alchemist', text: 'Perfect herbs! I can make at least 20 regular healing potions. With magic depletion lately, materials are expensive—really helped!' },
                {speaker: 'Alchemist', text: 'Magic amplifier? Great idea! Could explode if it fails, but success would revolutionize weapon enhancement. Worth experimenting!' },
                // Line 9 (index 8)
                {speaker: 'Alchemist', text: 'You really saved me. Here\'s your reward. Looking forward to the results!' },
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '(Choices: What to do after gathering?)' },
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Ask the client to share some gathered herbs (+1 Medicinal Herb)',
                            reward: [{type: "item", name: "Medicinal Herb", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Have adventurers threaten the client for more gold (+400 Gold, participating adventurers friendliness -15, LUC -3)',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Return some reward gold to the client (-200 Gold, participating adventurers LUC +3)',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'You have plenty of herbs—could we have one? Useful for the guild too.' },
                {speaker: '{adv1}', text: 'Looks like there\'s extra. Let\'s ask.' },
                {speaker: 'Alchemist', text: 'Sure! Take one as thanks. Hope we work together again!', jumptoline: 29 },
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'Good work, everyone. Gathering fresh herbs—you\'re reliable.' },
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!' },
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll shine big!' },
                {speaker: '{PLAYER}', text: 'Yeah, counting on it.', jumptoline: 29 },
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: 'The world is dangerous—could we get more reward? Intimidate a bit.' },
                {speaker: '{adv2}', text: 'Hey, seriously…? Fine, I\'ll do it.' },
                {speaker: 'Alchemist', text: 'T-that\'s awful… Fine, extra 400G—just let it go…' },
                {speaker: '{adv1}', text: '…That was too much…', jumptoline: 29 },
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'Let\'s return some reward. 200G okay? They were kind.' },
                {speaker: '{adv1}', text: 'So kind… This will bring good luck.' },
                {speaker: '{adv2}', text: 'Hey, less money…? Well, feels good doing something nice.' },
                {speaker: 'Alchemist', text: 'Really…? Thank you! You\'re good people.' },
                {speaker: '{adv1}', text: 'My heart feels warm. Good things will happen.' },
                {speaker: '{PLAYER}', text: 'Hope so.', jumptoline: 29 },
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.' }
            ],
            // 1: Mushroom Gathering (Client: Cook)
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: 'Gathered tons of fresh mushrooms for the cook! Mushroom festival tonight!?' },
                {speaker: '{PLAYER}', text: 'Way too many. How\'d you gather so much? Good work.' },
                {speaker: '{adv1}', text: 'These mushrooms smell amazing! Turn ordinary soup into a feast~.' },
                {speaker: '{adv2}', text: 'I want grilled mushrooms! The kind that heal adventurer HP by 250!' },
                {speaker: '{adv1}', text: 'With this year\'s bumper crop, perfect for preserved food too.' },
                {speaker: '{PLAYER}', text: 'Bumper crop year? That explains the lively village… Festival prep too.' },
                // Line 7-8 (index 6-7)
                {speaker: 'Cook', text: 'Wonderful mushrooms! Tonight\'s banquet menu is set. With this harvest, everyone eats well!' },
                {speaker: 'Cook', text: 'Stamina dishes? I\'ll develop adventurer versions! Dried mushroom powder for long storage—and trade goods.' },
                // Line 9 (index 8)
                {speaker: 'Cook', text: 'Really helped. Here\'s your reward. Looking forward to the banquet!' },
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '(Choices: What to do after gathering?)' },
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Ask the client to share some gathered mushrooms (+1 Mushroom)',
                            reward: [{type: "item", name: "Mushroom", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Have adventurers threaten the client for more gold (+400 Gold, participating adventurers friendliness -15, LUC -3)',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Return some reward gold to the client (-200 Gold, participating adventurers LUC +3)',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'You have plenty of mushrooms—could we have one? Useful for the guild too.' },
                {speaker: '{adv1}', text: 'Looks like there\'s extra. Let\'s ask.' },
                {speaker: 'Cook', text: 'Sure! Take one as thanks. Hope we work together again!', jumptoline: 29 },
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'Good work, everyone. Gathering fresh mushrooms—you\'re reliable.' },
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!' },
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll shine big!' },
                {speaker: '{PLAYER}', text: 'Yeah, counting on it.', jumptoline: 29 },
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: 'The world is dangerous—could we get more reward? Intimidate a bit.' },
                {speaker: '{adv2}', text: 'Hey, seriously…? Fine, I\'ll do it.' },
                {speaker: 'Cook', text: 'T-that\'s awful… Fine, extra 400G—just let it go…' },
                {speaker: '{adv1}', text: '…That was too much…', jumptoline: 29 },
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'Let\'s return some reward. 200G okay? They were kind.' },
                {speaker: '{adv1}', text: 'So kind… This will bring good luck.' },
                {speaker: '{adv2}', text: 'Hey, less money…? Well, feels good doing something nice.' },
                {speaker: 'Cook', text: 'Really…? Thank you! You\'re good people.' },
                {speaker: '{adv1}', text: 'My heart feels warm. Good things will happen.' },
                {speaker: '{PLAYER}', text: 'Hope so.', jumptoline: 29 },
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.' }
            ],
            // 2: Flower Gathering (Client: Villager)
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: 'Gathered lots of beautiful flowers for the villager! The scent is wonderful~.' },
                {speaker: '{PLAYER}', text: 'Nice smell. Would heal just decorating the guild. Good work.' },
                {speaker: '{adv2}', text: 'Flowers…? I might\'ve stepped on them. Staying quiet before {adv1} kills me!' },
                {speaker: '{adv1}', text: 'These flowers make dye too! Bright clothes make everyone happy.' },
                {speaker: '{PLAYER}', text: 'Dye? Heard lots of weddings lately—flower season?' },
                {speaker: '{adv2}', text: 'Weddings!? If I catch the bouquet, I\'m next! …Kidding.' },
                // Line 7-8 (index 6-7)
                {speaker: 'Villager', text: 'Thank you for the beautiful flowers! The village square will be like a flower field. Perfect with the wedding rush!' },
                {speaker: 'Villager', text: 'Good for scent bags or healing tea. Mix with anti-allergy herbs and meet this year\'s demand. Everyone\'s saved!' },
                // Line 9 (index 8)
                {speaker: 'Villager', text: 'Really helped. Here\'s your reward. The village will be bright!' },
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '(Choices: What to do after gathering?)' },
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: 'Ask the client to share some gathered flowers (+1 Flower)',
                            reward: [{type: "item", name: "Flower", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: 'Praise the adventurers to build trust (Participating adventurers friendliness +5)',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: 'Have adventurers threaten the client for more gold (+400 Gold, participating adventurers friendliness -15, LUC -3)',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: 'Return some reward gold to the client (-200 Gold, participating adventurers LUC +3)',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: 'You have plenty of flowers—could we have one? Useful for the guild too.' },
                {speaker: '{adv1}', text: 'Looks like there\'s extra. Let\'s ask.' },
                {speaker: 'Villager', text: 'Sure! Take one as thanks. Hope we work together again!', jumptoline: 29 },
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: 'Good work, everyone. Gathering beautiful flowers—you\'re reliable.' },
                {speaker: '{adv1}', text: 'Hearing that from {PLAYER} makes me happy! I\'ll work harder!' },
                {speaker: '{adv2}', text: 'Hehe, praise me more! Next time I\'ll shine big!' },
                {speaker: '{PLAYER}', text: 'Yeah, counting on it.', jumptoline: 29 },
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: 'The world is dangerous—could we get more reward? Intimidate a bit.' },
                {speaker: '{adv2}', text: 'Hey, seriously…? Fine, I\'ll do it.' },
                {speaker: 'Villager', text: 'T-that\'s awful… Fine, extra 400G—just let it go…' },
                {speaker: '{adv1}', text: '…That was too much…', jumptoline: 29 },
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: 'Let\'s return some reward. 200G okay? They were kind.' },
                {speaker: '{adv1}', text: 'So kind… This will bring good luck.' },
                {speaker: '{adv2}', text: 'Hey, less money…? Well, feels good doing something nice.' },
                {speaker: 'Villager', text: 'Really…? Thank you! You\'re good people.' },
                {speaker: '{adv1}', text: 'My heart feels warm. Good things will happen.' },
                {speaker: '{PLAYER}', text: 'Hope so.', jumptoline: 29 },
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: 'Quest complete. Let\'s return to the guild and rest.' }
            ]
        ],
      'F+': [
        // 0: Collect Iron Scraps (Client: Blacksmith)
        [
          {speaker: "Adventurer", text: "I gathered plenty of iron scraps for the blacksmith... Heavy."},
          {speaker: "Kaito", text: "Iron!? Perfect for my new sword! Give me some!"},
          {speaker: "Luna", text: "Kaito, always swords... But good material."},
          {speaker: '{PLAYER}', text: "You'll get shares later. Give to the blacksmith."},
          {speaker: "Blacksmith", text: "So many iron scraps! I can make great weapons now. Really helps—thanks!"},
          {speaker: '{PLAYER}', text: "Reward. Kaito's new sword later."}
        ],
        // 1: Catch River Fish (Client: Fisherman)
        [
          {speaker: "Adventurer", text: "I caught the river fish requested by the fisherman... Took time."},
          {speaker: "Kaito", text: "Fish!? Grilled fish tonight! I can eat 10!"},
          {speaker: "Luna", text: "Kaito, moderation. But they look fresh and tasty~"},
          {speaker: '{PLAYER}', text: "Food again... Give to the fisherman."},
          {speaker: "Fisherman", text: "You caught this many fish! Tonight's table will be lavish. Thanks!"},
          {speaker: '{PLAYER}', text: "Reward... Fish feast tonight."}
        ],
        // 2: Collect Common Herbs (Client: Apothecary)
        [
          {speaker: "Adventurer", text: "I gathered lots of common herbs for the apothecary."},
          {speaker: "Luna", text: "Common herbs can make strong medicine with the right mix! I want to research~"},
          {speaker: "Kaito", text: "Herbs over meat... Luna's glaring again."},
          {speaker: '{PLAYER}', text: "You two are greedy. Show the apothecary."},
          {speaker: "Apothecary", text: "So many common herbs! Village medicine stock is secure now. Thank you so much!"},
          {speaker: '{PLAYER}', text: "Reward. Kaito, you're Luna's test subject."}
        ]
      ],
      'D': [
        // 0: Iron Ore (Client: Miner)
        [
          {speaker: "Adventurer", text: "I mined plenty of quality iron ore for the miner... Back hurts."},
          {speaker: "Kaito", text: "Iron ore!? I'd have smashed rocks and brought it all!"},
          {speaker: "Luna", text: "Quality ore could be for magic weapons... I want some."},
          {speaker: '{PLAYER}', text: "Shares later. Give to the miner."},
          {speaker: "Miner", text: "This much quality ore! The village will prosper. Really helps—thanks!"},
          {speaker: '{PLAYER}', text: "Reward. Save Kaito's destruction for next time."}
        ],
        // 1: Wolf Pelts (Client: Hunter)
        [
          {speaker: "Adventurer", text: "I brought lots of wolf pelts for the hunter... Hunting was tough."},
          {speaker: "Kaito", text: "Wolf pelts!? I'd have hunted the whole pack and made a mountain!"},
          {speaker: "Luna", text: "Pelts are perfect for cold protection. I want one~"},
          {speaker: '{PLAYER}', text: "Greedy pair. Give to the hunter."},
          {speaker: "Hunter", text: "This many wolf pelts! Best cold gear ever. Thanks!"},
          {speaker: '{PLAYER}', text: "Reward. Pelt coats next?"}
        ],
        // 2: Small Mana Crystals (Client: Mage)
        [
          {speaker: "Adventurer", text: "I collected small mana crystals for the mage... Monsters guarded them—close call."},
          {speaker: "Luna", text: "Mana crystals!? Perfect for my magic research! Share some~"},
          {speaker: "Kaito", text: "Monsters? I'd have slashed them all and monopolized the crystals!"},
          {speaker: '{PLAYER}', text: "No monopolies. Show the mage."},
          {speaker: "Mage", text: "This many mana crystals! New spells possible now. Thank you so much!"},
          {speaker: '{PLAYER}', text: "Reward. Luna's experiments later."}
        ]
      ]
      // Higher ranks to be added later
    }
    ]
    , zh: [
    // 0: STR - kill quests
    {
        'F': [
            // 0: 史萊姆5隻討伐（委託人：農夫）
            [
                // Line 1 (index 0)
                {speaker: '{adv1}', text: '我們回來了。村莊周邊的5隻史萊姆，全都討伐完了！'},
                // Line 2 (index 1)
                {speaker: '{adv2}', text: '史萊姆退治啊……到處亂跳很麻煩吧？那種普尼普尼的觸感，忘不了呢。'},
                // Line 3 (index 2)
                {speaker: '{adv1}', text: '確實很累……全身都是史萊姆液，衣服黏黏的……'},
                // Line 4 (index 3)
                {speaker: '{PLAYER}', text: '辛苦了。幹得很好。委託人農夫在等著喔。'},
                // Line 5 (index 4)
                {speaker: '{adv2}', text: '嘿嘿，我也想去啊。大家在史萊姆汁上滑來滑去的樣子，一定超好笑！'},
                // Line 6 (index 5)
                {speaker: '{adv1}', text: `{PLAYER}，謝謝。馬上向農夫報告吧。`},
                // Line 7 (index 6)
                {speaker: '農夫', text: '哦，冒險者們！把史萊姆全部消滅了啊！作物沒被溶解，真是太感謝了！'},
                // Line 8 (index 7)
                {speaker: '農夫', text: '那些果凍般的史萊姆……不是食物吧？好可怕好可怕！真的謝謝！'},
                // Line 9 (index 8) - Reward line (now spoken by quest giver)
                {speaker: '農夫', text: '現在作物安全了！請收下報酬吧！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：史萊姆退治後，如何應對？）'},
                // Line 11 (index 10) - Choices object
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '給農夫史萊姆對策的建議（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '收集史萊姆液出售（+200 Gold、參加冒險者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 200},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '追加狩獵史萊姆進行鍛鍊（參加冒險者STR +3、好感度 -10）',
                            reward: [
                                {type: "strength", amount: 3, target: "participants"},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Advice (+2 Reputation)
                // Line 12 (index 11)
                {speaker: '{PLAYER}', text: '史萊姆喜歡潮濕的地方，改善田地的排水可能會減少它們。'},
                // Line 13 (index 12)
                {speaker: '農夫', text: '原來如此！馬上試試看！這樣就安心了，謝謝！'},
                // Line 14 (index 13)
                {speaker: '農夫', text: '有像你們這樣的冒險者，真是幫大忙了！', jumptoline: 27},
                // Branch 2: Praise (+5 Friendliness participants)
                // Line 15 (index 14)
                {speaker: '{PLAYER}', text: '大家，幹得很好。全身史萊姆液一定很辛苦吧？真的很可靠。'},
                // Line 16 (index 15)
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                // Line 17 (index 16)
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我活躍了！'},
                // Line 18 (index 17)
                {speaker: '{PLAYER}', text: '嗯，下次也期待哦。', jumptoline: 27},
                // Branch 3: Harvest slime gel (+200G, -5 Friendliness participants)
                // Line 19 (index 18)
                {speaker: '{PLAYER}', text: '這史萊姆液可以作為煉金材料賣掉。收集一點作為公會資金吧。'},
                // Line 20 (index 19)
                {speaker: '{adv1}', text: '……雖然有價值，但有點髒……黏黏的洗不掉……'},
                // Line 21 (index 20)
                {speaker: '{adv2}', text: '為了錢就忍了！但下次讓我來洗哦！'},
                // Line 22 (index 21)
                {speaker: '{PLAYER}', text: '哈哈，交給你了。', jumptoline: 27},
                // Branch 4: Extra hunting (STR +3, -10 Friendliness participants)
                // Line 23 (index 22)
                {speaker: '{PLAYER}', text: '趁現在，多狩獵一些史萊姆來鍛鍊吧。變強了下次就輕鬆了。'},
                // Line 24 (index 23)
                {speaker: '{adv1}', text: '……還要繼續嗎？雖然累了……明白了。想變強。'},
                // Line 25 (index 24)
                {speaker: '{adv2}', text: '喂喂，讓我們休息吧……但為了變強就做吧。不會輸的！'},
                // Line 26 (index 25)
                {speaker: '{PLAYER}', text: '就是這股氣勢。', jumptoline: 27},
                // Convergence
                // Line 27 (index 26)
                {speaker: '{PLAYER}', text: '任務完成了。回公會領取報酬吧。'}
            ],
            // 1: 巨大老鼠退治（委託人：酒場主人）
            [
                // Line 1 (index 0)
                {speaker: '{adv1}', text: '酒場地下室裡的巨大老鼠，全都退治完了。'},
                // Line 2 (index 1)
                {speaker: '{adv2}', text: '巨大老鼠！？到底有多大啊？真想多砍幾刀！'},
                // Line 3 (index 2)
                {speaker: '{adv1}', text: '真的很大……差點被咬到，好可怕……'},
                // Line 4 (index 3)
                {speaker: '{PLAYER}', text: '幹得很好。沒事就好。你要是去了，酒場會變成血海的。'},
                // Line 5 (index 4)
                {speaker: '{adv2}', text: '那樣才帥啊！華麗又酷，大家都會嚇一跳！'},
                // Line 6 (index 5)
                {speaker: '{adv1}', text: `{PLAYER}，謝謝。向酒場主人報告吧。`},
                // Line 7 (index 6)
                {speaker: '酒場主人', text: '哦！你們把巨大老鼠全部解決了啊！地下室又能用了！'},
                // Line 8 (index 7)
                {speaker: '酒場主人', text: '請你們喝一杯……不過別搞成血海啊！真的幫大忙了，謝謝！'},
                // Line 9 (index 8) - Reward line (now spoken by quest giver)
                {speaker: '酒場主人', text: '太好了！請收下報酬吧！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：老鼠退治後，如何應對？）'},
                // Line 11 (index 10) - Choices object
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '向酒場主人建議老鼠防治措施（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '收集老鼠尾巴出售（+200 Gold、參加冒險者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 200},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '追加狩獵老鼠進行鍛鍊（參加冒險者STR +3、好感度 -10）',
                            reward: [
                                {type: "strength", amount: 3, target: "participants"},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Advice (+2 Reputation)
                // Line 12 (index 11)
                {speaker: '{PLAYER}', text: '老鼠會被食物吸引，嚴格管理地下室的食物可能會減少它們。'},
                // Line 13 (index 12)
                {speaker: '酒場主人', text: '原來如此！馬上試試看！這樣就能安心做生意了！謝謝！'},
                // Line 14 (index 13)
                {speaker: '酒場主人', text: '有事再拜託你們！請你們喝一杯！', jumptoline: 24},
                // Branch 2: Praise (+5 Friendliness participants)
                // Line 15 (index 14)
                {speaker: '{PLAYER}', text: '大家，面對巨大老鼠一定很可怕吧？謝謝你們，真的很可靠。'},
                // Line 16 (index 15)
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                // Line 17 (index 16)
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次我當主角！', jumptoline: 24},
                // Branch 3: Harvest rat tails (+200G, -5 Friendliness participants)
                // Line 18 (index 17)
                {speaker: '{PLAYER}', text: '這些老鼠尾巴可以當材料賣掉。收集一點作為公會資金吧。'},
                // Line 19 (index 18)
                {speaker: '{adv1}', text: '……雖然有價值，但有點噁心……'},
                // Line 20 (index 19)
                {speaker: '{adv2}', text: '為了錢就忍了！下次讓我來做！', jumptoline: 24},
                // Branch 4: Extra hunting (STR +3, -10 Friendliness participants)
                // Line 21 (index 20)
                {speaker: '{PLAYER}', text: '趁現在，多狩獵一些老鼠來鍛鍊吧。變強了下次就輕鬆了。'},
                // Line 22 (index 21)
                {speaker: '{adv1}', text: '……還要繼續嗎？雖然很可怕……明白了。'},
                // Line 23 (index 22)
                {speaker: '{adv2}', text: '喂喂，讓我們休息吧……但為了變強就做吧。不會輸的！', jumptoline: 24},
                // Convergence
                // Line 24 (index 23, but labeled as 27 in original comment - structure matches)
                {speaker: '{PLAYER}', text: '任務完成了。回公會領取報酬吧。'}
            ],
            // 2: 野犬3隻討伐（委託人：農夫）
            [
                // Line 1 (index 0)
                {speaker: '{adv1}', text: '襲擊農場的3隻野犬，全都打倒了。家畜平安無事。'},
                // Line 2 (index 1)
                {speaker: '{adv2}', text: '野犬啊！真想追著砍個痛快！想更華麗地幹啊！'},
                // Line 3 (index 2)
                {speaker: '{adv1}', text: '速度很快……真的很危險……'},
                // Line 4 (index 3)
                {speaker: '{PLAYER}', text: '辛苦了。家畜平安真是太好了。你要是去了，家畜也會被追著跑。'},
                // Line 5 (index 4)
                {speaker: '{adv2}', text: '哈哈！那樣也很歡樂啊！犬跟家畜的大運動會！'},
                // Line 6 (index 5)
                {speaker: '{adv1}', text: `{PLAYER}，謝謝。向農夫報告吧。`},
                // Line 7 (index 6)
                {speaker: '農夫', text: '野犬全部打倒了啊！家畜平安，大家都安心了！'},
                // Line 8 (index 7)
                {speaker: '農夫', text: '追來追去……不是在玩吧？好可怕，真的謝謝！'},
                // Line 9 (index 8) - Reward line (now spoken by quest giver)
                {speaker: '農夫', text: '現在家畜安全了！請收下報酬吧！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：野犬退治後，如何應對？）'},
                // Line 11 (index 10) - Choices object
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '給農夫野犬防治建議（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '收集野犬牙齒出售（+200 Gold、參加冒險者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 200},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '追加狩獵野犬進行鍛鍊（參加冒險者STR +3、好感度 -10）',
                            reward: [
                                {type: "strength", amount: 3, target: "participants"},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Advice (+2 Reputation)
                // Line 12 (index 11)
                {speaker: '{PLAYER}', text: '野犬是成群行動的，強化柵欄或種驅犬藥草可能會有幫助。'},
                // Line 13 (index 12)
                {speaker: '農夫', text: '原來如此！馬上試試看！這樣就能安心養家畜了！謝謝！'},
                // Line 14 (index 13)
                {speaker: '農夫', text: '有像你們這樣的冒險者，真是幫大忙了！', jumptoline: 24},
                // Branch 2: Praise (+5 Friendliness participants)
                // Line 15 (index 14)
                {speaker: '{PLAYER}', text: '大家，面對速度很快的野犬一定很辛苦吧？謝謝你們，真的很可靠。'},
                // Line 16 (index 15)
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                // Line 17 (index 16)
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我活躍了！', jumptoline: 24},
                // Branch 3: Harvest dog fangs (+200G, -5 Friendliness participants)
                // Line 18 (index 17)
                {speaker: '{PLAYER}', text: '這些野犬的牙齒可以當武器材料賣掉。收集一點作為公會資金吧。'},
                // Line 19 (index 18)
                {speaker: '{adv1}', text: '……雖然有價值，但有點可怕……'},
                // Line 20 (index 19)
                {speaker: '{adv2}', text: '為了錢就忍了！下次讓我來做！', jumptoline: 24},
                // Branch 4: Extra hunting (STR +3, -10 Friendliness participants)
                // Line 21 (index 20)
                {speaker: '{PLAYER}', text: '趁現在，多狩獵一些野犬來鍛鍊吧。變強了下次就輕鬆了。'},
                // Line 22 (index 21)
                {speaker: '{adv1}', text: '……還要繼續嗎？雖然很可怕……明白了。'},
                // Line 23 (index 22)
                {speaker: '{adv2}', text: '喂喂，讓我們休息吧……但為了變強就做吧。不會輸的！', jumptoline: 24},
                // Convergence
                {speaker: '{PLAYER}', text: '任務完成了。回公會領取報酬吧。'}
            ]
        ],
    },
    // 1: WIS - discovery quests
    {
        'F': [
            // 0: 吊墜探索（委託人：老奶奶）
            [
                // Line 0-5
                {speaker: '{adv1}', text: '城鎮裡丟失的老奶奶的吊墜，順利找到了！掉在巷子裡的石頭下面。'},
                {speaker: '{adv2}', text: '嘿，這麼小的東西？我一下子就能找到！只是運氣吧？'},
                {speaker: '{adv1}', text: '要好好找才找得到哦…呵呵。'},
                {speaker: '{adv2}', text: '這個雕刻…感覺見過。好像跟以前的公會會長的東西很像…'},
                {speaker: '{adv1}', text: '噓！現在不行！{PLAYER}，快點還給老奶奶吧。'},
                {speaker: '{PLAYER}', text: '公會會長的…？算了，之後再問。'},
                // Line 6-7
                {speaker: '老奶奶', text: '啊啊，我的重要吊墜…！這個雕刻是很久以前豐收祭拿到的東西。和平時代的回憶啊…'},
                {speaker: '老奶奶', text: '最近又聽說邊境有士兵在動，我很擔心。真的謝謝你們，我都要哭了…'},
                // Line 8 - 報酬由委託人說
                {speaker: '老奶奶', text: '平安找回來真是太好了。這是報酬，請收下。要好好珍惜哦。'},
                // Line 9
                {speaker: 'Narrator', text: '（選擇肢：發現後，如何應對？）'},
                // Line 10 - 選擇肢
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '提供吊墜的進一步洞察（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '把發現情報賣給酒館老闆賺取額外金幣（+150 Gold、參加冒險者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '使用魔力進一步調查來鍛鍊智慧（參加冒險者 MP -50、WIS +3）',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: '這個雕刻很像和平時代的豐收祭符號。最好好好保管。'},
                {speaker: '老奶奶', text: '是呢…謝謝你告訴我。我安心多了。'},
                {speaker: '老奶奶', text: '有你們這樣的冒險者真的幫大忙了！', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: '大家幹得很好。這麼小的吊墜都能確實找到，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，下次也期待哦。', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: '把吊墜的詳細情報告訴酒館老闆就能拿到情報費。作為公會資金吧。'},
                {speaker: '{adv1}', text: '……雖然有價值，但有點狡猾的感覺…'},
                {speaker: '{adv2}', text: '為了錢就忍了！下次讓我來做！'},
                {speaker: '{PLAYER}', text: '哈哈，交給你了。', jumptoline: 27},
                // Branch 4: Mana investigation (詳細化)
                {speaker: '{PLAYER}', text: '趁現在，用魔力再調查一下吧。是很好的智慧鍛鍊。'},
                {speaker: '{adv1}', text: '…我注入魔力調查吊墜。微弱的保護魔力有反應…好像以前施加了祈求和平的咒語。現在幾乎沒剩什麼力量了…'},
                {speaker: '{adv2}', text: '祈求和平的咒語啊…現在邊境又鬧騰起來，感覺真沉重！'},
                {speaker: '{PLAYER}', text: '很有意思的發現。繼續加油。', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ],
            // 1: 隱藏寶箱發現（委託人：村民）
            [
                // Line 0-5
                {speaker: '{adv1}', text: '森林裡的隱藏寶箱，找到了！埋在樹根下面。'},
                {speaker: '{adv2}', text: '隱藏寶箱啊！…裡面只有3枚古金幣！？我期待更多啊！'},
                {speaker: '{adv1}', text: '能找到就很厲害了。這些古幣是王政時代的東西，很稀有哦。'},
                {speaker: '{adv2}', text: '這個地方…感覺見過。好像以前公會會長跟{PLAYER}玩耍的地方…'},
                {speaker: '{adv1}', text: '噓！別說多餘的話！{PLAYER}，向村民報告吧。'},
                {speaker: '{PLAYER}', text: '以前公會會長跟…？算了，之後再問。'},
                // Line 6-7
                {speaker: '村民', text: '真的找到隱藏寶箱了！小時候聽的傳說是真的啊。'},
                {speaker: '村民', text: '這些古幣是王政時代的。最近有關王族血脈的傳言，大家都很躁動。'},
                // Line 8
                {speaker: '村民', text: '裡面的東西就當報酬收下吧！真的幫大忙了，謝謝！'},
                // Line 9
                {speaker: 'Narrator', text: '（選擇肢：發現後，如何應對？）'},
                // Line 10 - 選擇肢
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '提供寶箱的進一步洞察（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '把發現情報賣給酒館老闆賺取額外金幣（+150 Gold、參加冒險者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '使用魔力進一步調查來鍛鍊智慧（參加冒險者 MP -50、WIS +3）',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: '這些古幣是王政時代的稀有物品。記錄位置的話，也許能找到更多。'},
                {speaker: '村民', text: '原來如此！馬上試試看！這樣就安心了，謝謝！'},
                {speaker: '村民', text: '有你們這樣的冒險者真的幫大忙了！', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: '大家幹得很好。找到傳說中的寶箱真是厲害。真可靠。587'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，下次也期待哦。', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: '把寶箱的詳細情報告訴酒館老闆就能拿到情報費。作為公會資金吧。'},
                {speaker: '{adv1}', text: '……雖然有價值，但有點狡猾的感覺…'},
                {speaker: '{adv2}', text: '為了錢就忍了！下次讓我來做！'},
                {speaker: '{PLAYER}', text: '哈哈，交給你了。', jumptoline: 27},
                // Branch 4: Mana investigation (詳細化)
                {speaker: '{PLAYER}', text: '趁現在，用魔力再調查一下吧。是很好的智慧鍛鍊。'},
                {speaker: '{adv1}', text: '我注入魔力…土壤裡浮現隱藏的魔法印記。像是指向其他隱藏地點的網絡…王政時代的秘密還殘留著…'},
                {speaker: '{adv2}', text: '哇！意思是還有更多寶藏！？冒險越來越大了！'},
                {speaker: '{PLAYER}', text: '有趣的發現。繼續加油。', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ],
            // 2: 井戶的秘密（委託人：學者）
            [
                // Line 0-5
                {speaker: '{adv1}', text: '古老井戶底部的秘密，發現了！苔蘚下面有古代魔法陣在發光。'},
                {speaker: '{adv2}', text: '魔法陣！？超讚！我也想跳下去啊，超有冒險感！'},
                {speaker: '{adv1}', text: '掉下去會死的…要好好調查才行。'},
                {speaker: '{adv2}', text: '這個魔法陣…感覺見過。好像跟以前的公會會長和{PLAYER}有關…'},
                {speaker: '{adv1}', text: '噓！現在不行！{PLAYER}，向學者報告吧。'},
                {speaker: '{PLAYER}', text: '跟公會會長有關…？算了，之後再問。'},
                // Line 6-7
                {speaker: '學者', text: '你們揭開了井戶的魔法陣！太棒了！是古代封印陣，大發現啊！'},
                {speaker: '學者', text: '最近首都也有類似陣在反應。可能正在發生大規模魔力異變…'},
                // Line 8
                {speaker: '學者', text: '真的幫大忙了！這是報酬。讓我繼續研究吧！'},
                // Line 9
                {speaker: 'Narrator', text: '（選擇肢：發現後，如何應對？）'},
                // Line 10 - 選擇肢
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '提供魔法陣的進一步洞察（+2 Reputation）',
                            reward: [{type: "reputation", amount: 2}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '把發現情報賣給酒館老闆賺取額外金幣（+150 Gold、參加冒險者好感度 -5）',
                            reward: [
                                {type: "gold", amount: 150},
                                {type: "friendliness", amount: -5, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '使用魔力進一步調查來鍛鍊智慧（參加冒險者 MP -50、WIS +3）',
                            reward: [
                                {type: "mp", amount: -50, target: "participants"},
                                {type: "wisdom", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Insight (+2 Reputation)
                {speaker: '{PLAYER}', text: '這是古代封印陣。定期檢查魔力的話，也許能早點發現異變。'},
                {speaker: '學者', text: '沒錯！馬上開始做！這樣就安心了，謝謝！'},
                {speaker: '學者', text: '有你們這樣的冒險者真的幫大忙了！', jumptoline: 27},
                // Branch 2: Praise
                {speaker: '{PLAYER}', text: '大家幹得很好。找到古代魔法陣真是厲害。真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，下次也期待哦。', jumptoline: 27},
                // Branch 3: Sell info
                {speaker: '{PLAYER}', text: '把魔法陣的詳細情報告訴酒館老闆就能拿到情報費。作為公會資金吧。'},
                {speaker: '{adv1}', text: '……雖然有價值，但有點狡猾的感覺…'},
                {speaker: '{adv2}', text: '為了錢就忍了！下次讓我來做！'},
                {speaker: '{PLAYER}', text: '哈哈，交給你了。', jumptoline: 27},
                // Branch 4: Mana investigation (詳細化)
                {speaker: '{PLAYER}', text: '趁現在，用魔力再調查一下吧。是很好的智慧鍛鍊。'},
                {speaker: '{adv1}', text: '我向魔法陣注入魔力…陣產生共鳴，朝首都方向有微弱反應…這個異變，可能在多個封印陣之間連鎖…'},
                {speaker: '{adv2}', text: '糟糕啊！意思是有大規模魔力波要來了！？超熱血！'},
                {speaker: '{PLAYER}', text: '要小心了。繼續加油。', jumptoline: 27},
                // Convergence
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ]
        ],
    },
    // 2: DEX - escort quests
    {
        'F': [
            // 0: 農夫護衛（委託人：農夫）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: '順利護衛農夫到市場！路上什麼事都沒發生，超無聊的旅程啊！'},
                {speaker: '{PLAYER}', text: '平安就好。和平才是最重要的。'},
                {speaker: '{adv1}', text: '沒發生事件真是太好了。如果{adv2}亂來，農夫會害怕的。'},
                {speaker: '{adv2}', text: '喂喂，農夫一定想看我活躍吧！…等等，這條路，感覺以前舊公會會長護衛商隊走過…'},
                {speaker: '{adv1}', text: '噓！現在別說！{PLAYER}，向農夫報告吧。'},
                {speaker: '{PLAYER}', text: '護衛商隊…？之後再問。農夫，我們平安到了。'},
                // Line 7-8 (index 6-7)
                {speaker: '農夫', text: '真的謝謝！最近交易路上盜賊增加，我一個人不敢去。東西賣了好價錢！'},
                {speaker: '農夫', text: '聽說邊境稅金也上漲了，物價可能要暴漲…多虧你們幫大忙！'},
                // Line 9 (index 8)
                {speaker: '農夫', text: '平安就好。這是報酬。真的謝謝！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：護衛後，如何應對？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '問路上有沒有看到特別的東西（+1 幸運硬幣）',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '現在世界危險，要求追加報酬（+300 Gold、參加冒險者好感度 -10）',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '讓他們再護衛委託人一陣子鍛鍊敏捷（參加冒險者 HP -50、DEX +3）',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '路上有沒有看到什麼特別的東西？不尋常的之類。'},
                {speaker: '{adv1}', text: '說起來，路邊撿到一枚古舊的幸運硬幣。感覺很特別，就留著了。'},
                {speaker: '農夫', text: '哦，那是幸運硬幣！當作謝禮送你們吧。謝謝！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: '大家幹得很好。平安護衛，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，期待哦。', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '最近世界很危險，能不能追加報酬？護衛也很辛苦。'},
                {speaker: '農夫', text: '…確實是危險的時代。沒辦法，追加300G吧。謝謝。'},
                {speaker: '{adv1}', text: '……有點強人所難呢…'},
                {speaker: '{adv2}', text: '錢是開心，但…下次讓我來！', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '趁現在，再護衛農夫一陣子吧。是很好的敏捷鍛鍊。'},
                {speaker: '{adv1}', text: '…還要繼續嗎？明白了，會提高警戒。'},
                {speaker: '{adv2}', text: '喂喂，讓我們休息吧…但要做就認真啊！'},
                {speaker: '{adv1}', text: '…回去路上被小規模盜賊襲擊了。受了輕傷，但用敏捷動作脫險了！'},
                {speaker: '{adv2}', text: '可惡，有點痛啊…但閃避動作變熟練了！'},
                {speaker: '{PLAYER}', text: '就是這股氣勢。撐得很好。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ],
            // 1: 孩子護送（委託人：父母）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '順利護送孩子穿過危險的橋到家了！途中還牽手了哦～。'},
                {speaker: '{PLAYER}', text: '真溫柔。孩子一定很安心。幹得很好。'},
                {speaker: '{adv2}', text: '只是過橋而已嗎！我要給孩子木劍一起玩魔物討伐遊戲！'},
                {speaker: '{adv1}', text: '那太危險了！孩子會害怕的…啊，這座橋，以前舊公會會長抱著{PLAYER}…'},
                {speaker: '{adv2}', text: '對啊！抱著過橋的！…啊，說溜嘴了！'},
                {speaker: '{PLAYER}', text: '抱著我…？之後再問。父母，孩子平安送到了。'},
                // Line 7-8 (index 6-7)
                {speaker: '父母', text: '孩子平安回家了！那座快塌的橋，我一個人不敢過…真的謝謝！'},
                {speaker: '父母', text: '最近事故增加，魔物也靠近了，大家都在討論。多虧找你們才對！'},
                // Line 9 (index 8)
                {speaker: '父母', text: '平安就好。這是報酬。真的幫大忙了！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：護衛後，如何應對？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '問路上有沒有看到特別的東西（+1 幸運硬幣）',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '現在世界危險，要求追加報酬（+300 Gold、參加冒險者好感度 -10）',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '讓他們再護衛委託人一陣子鍛鍊敏捷（參加冒險者 HP -50、DEX +3）',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '路上有沒有看到什麼特別的東西？不尋常的之類。'},
                {speaker: '{adv2}', text: '橋附近撿到一枚古舊的幸運硬幣。感覺運氣好就撿起來了！'},
                {speaker: '父母', text: '那是幸運硬幣呢！當作謝禮送你們吧。謝謝！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: '大家幹得很好。溫柔護衛孩子，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，期待哦。', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '最近世界很危險，能不能追加報酬？護衛也很辛苦。'},
                {speaker: '父母', text: '…確實是可怕的時代。沒辦法，追加300G吧。謝謝。'},
                {speaker: '{adv1}', text: '……有點強人所難呢…'},
                {speaker: '{adv2}', text: '錢是開心，但…下次讓我來！', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '趁現在，再護衛孩子一陣子吧。是很好的敏捷鍛鍊。'},
                {speaker: '{adv1}', text: '…還要繼續嗎？明白了，會提高警戒。'},
                {speaker: '{adv2}', text: '喂喂，讓我們休息吧…但要做就認真啊！'},
                {speaker: '{adv2}', text: '…回去路上橋附近被小型魔物襲擊！受了輕傷，但用敏捷閃避守住了！'},
                {speaker: '{adv1}', text: '痛痛的…但動作變好了感覺。'},
                {speaker: '{PLAYER}', text: '就是這股氣勢。撐得很好。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ],
            // 2: 使者護衛（委託人：村長）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: '使者信件護衛完成！連一個間諜都沒出現，太失望了！'},
                {speaker: '{PLAYER}', text: '平安送到就好。和平才是最好的。'},
                {speaker: '{adv1}', text: '{adv2}，想像力太豐富了。使者看起來很放心哦。'},
                {speaker: '{adv2}', text: '間諜出現我就一刀解決！…這條路，以前舊公會會長運送重要信件…'},
                {speaker: '{adv1}', text: '噓！現在不是說的時候！{PLAYER}，向村長報告吧。'},
                {speaker: '{PLAYER}', text: '重要信件…？之後再問。村長，平安送到了。'},
                // Line 7-8 (index 6-7)
                {speaker: '村長', text: '使者平安，信件也到了！這樣村子的聯盟就定了。真的感謝！'},
                {speaker: '村長', text: '王都政變傳聞中，守護這麼重要的書信…你們公會真可靠！'},
                // Line 9 (index 8)
                {speaker: '村長', text: '平安就好。這是報酬。辛苦了！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：護衛後，如何應對？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '問路上有沒有看到特別的東西（+1 幸運硬幣）',
                            reward: [{type: "item", name: "Lucky Coin", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '現在世界危險，要求追加報酬（+300 Gold、參加冒險者好感度 -10）',
                            reward: [
                                {type: "gold", amount: 300},
                                {type: "friendliness", amount: -10, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '讓他們再護衛委託人一陣子鍛鍊敏捷（參加冒險者 HP -50、DEX +3）',
                            reward: [
                                {type: "hp", amount: -50, target: "participants"},
                                {type: "dexterity", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask about special find - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '路上有沒有看到什麼特別的東西？不尋常的之類。'},
                {speaker: '{adv2}', text: '路邊撿到一枚古舊的幸運硬幣。感覺不錯就撿起來了！'},
                {speaker: '村長', text: '那是幸運硬幣！當作謝禮送你們吧。謝謝！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: '大家幹得很好。平安護衛重要信件，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，期待哦。', jumptoline: 29},
                // Branch 3: Demand more reward - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '最近世界很危險，能不能追加報酬？護衛也很辛苦。'},
                {speaker: '村長', text: '…確實局勢不穩。沒辦法，追加300G吧。謝謝。'},
                {speaker: '{adv1}', text: '……有點強人所難呢…'},
                {speaker: '{adv2}', text: '錢是開心，但…下次讓我來！', jumptoline: 29},
                // Branch 4: Extra protection - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '趁現在，再護衛使者一陣子吧。是很好的敏捷鍛鍊。'},
                {speaker: '{adv1}', text: '…還要繼續嗎？明白了，會提高警戒。'},
                {speaker: '{adv2}', text: '喂喂，讓我們休息吧…但要做就認真啊！'},
                {speaker: '{adv2}', text: '…回去路上被可疑盜賊襲擊！受了輕傷，但用敏捷動作守住了！'},
                {speaker: '{adv1}', text: '痛痛的…但閃避變好了感覺。'},
                {speaker: '{PLAYER}', text: '就是這股氣勢。撐得很好。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ]
        ],
    },
    // 3: LUC - fetch quests
    {
        'F': [
            // 0: 藥草採集（委託人：錬金術師）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '錬金術師委託的藥草，按照指定全部採集完成了！很新鮮哦～。'},
                {speaker: '{PLAYER}', text: '幹得很好。去了森林深處吧？辛苦了。'},
                {speaker: '{adv2}', text: '藥草啊。我可能會踩爛吧！但能做藥水也不錯。'},
                {speaker: '{adv1}', text: '這些能做強力回復藥水！最近魔力變薄，很珍貴哦。'},
                {speaker: '{PLAYER}', text: '魔力變薄？最近聽說魔物也變弱了…。'},
                {speaker: '{adv2}', text: '那用這些藥草做魔力增幅藥水怎麼樣？塗在我的劍上就無敵了吧！'},
                // Line 7-8 (index 6-7)
                {speaker: '錬金術師', text: '哦，完美的藥草！能做至少20個普通回復藥水。最近魔力枯渇材料漲價…真的幫大忙！'},
                {speaker: '錬金術師', text: '魔力增幅劑？好主意！失敗會大爆炸，但成功就能革新武器強化。值得試試！'},
                // Line 9 (index 8)
                {speaker: '錬金術師', text: '真的幫大忙了。這是報酬。期待結果哦！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：採集後，如何應對？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '請委託人分一些採集的藥草（+1 藥草）',
                            reward: [{type: "item", name: "藥草", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '讓冒險者威脅委託人要求追加金錢（+400 Gold、參加冒險者好感度 -15、LUC -3）',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '把一部分報酬金還給委託人（-200 Gold、參加冒險者 LUC +3）',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '藥草很多，能不能分一個？公會也能用。'},
                {speaker: '{adv1}', text: '看起來有多餘呢。來問問吧。'},
                {speaker: '錬金術師', text: '好啊！當作謝禮送一個。以後也多多關照！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: '大家幹得很好。新鮮藥草確實採集，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，期待哦。', jumptoline: 29},
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '現在世界危險，能不能多給報酬？稍微威脅一下。'},
                {speaker: '{adv2}', text: '喂喂，真的嗎…沒辦法，做吧！'},
                {speaker: '錬金術師', text: '太、太過分了…明白了，追加400G，這次饒了我…。'},
                {speaker: '{adv1}', text: '……做得太過了…', jumptoline: 29},
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '把一部分報酬還回去吧。200G可以吧？對方很親切。'},
                {speaker: '{adv1}', text: '真溫柔…一定會有好運的哦。'},
                {speaker: '{adv2}', text: '喂喂，金錢減少啊…但做好事感覺不錯。'},
                {speaker: '錬金術師', text: '怎麼這樣…謝謝！真的是好人呢。'},
                {speaker: '{adv1}', text: '心裡暖暖的。一定會有好事發生哦。'},
                {speaker: '{PLAYER}', text: '希望如此。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ],
            // 1: 蘑菇採集（委託人：料理人）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv2}', text: '料理人委託的新鮮蘑菇，大量採集來了！今晚是蘑菇祭嗎！？'},
                {speaker: '{PLAYER}', text: '太多了吧。怎麼採這麼多。辛苦了。'},
                {speaker: '{adv1}', text: '這些蘑菇香氣超棒！普通湯變成大餐哦～。'},
                {speaker: '{adv2}', text: '我要烤蘑菇！冒險者HP回復250的那種！'},
                {speaker: '{adv1}', text: '今年豐收蘑菇超多，很適合做保存食。'},
                {speaker: '{PLAYER}', text: '豐收年啊。最近村子熱鬧是因為這個…祭典準備也進行中呢。'},
                // Line 7-8 (index 6-7)
                {speaker: '料理人', text: '超棒的蘑菇！今晚宴會菜單定了。今年豐收大家都能吃飽！'},
                {speaker: '料理人', text: '耐力料理？來開發冒險者專用吧！乾燥蘑菇粉能長期保存，還能當交易品。'},
                // Line 9 (index 8)
                {speaker: '料理人', text: '真的幫大忙了。這是報酬。宴會期待哦！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：採集後，如何應對？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '請委託人分一些採集的蘑菇（+1 蘑菇）',
                            reward: [{type: "item", name: "蘑菇", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '讓冒險者威脅委託人要求追加金錢（+400 Gold、參加冒險者好感度 -15、LUC -3）',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '把一部分報酬金還給委託人（-200 Gold、參加冒險者 LUC +3）',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '蘑菇很多，能不能分一個？公會也能用。'},
                {speaker: '{adv1}', text: '看起來有多餘呢。來問問吧。'},
                {speaker: '料理人', text: '好啊！當作謝禮送一個。以後也多多關照！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: '大家幹得很好。新鮮蘑菇確實採集，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，期待哦。', jumptoline: 29},
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '現在世界危險，能不能多給報酬？稍微威脅一下。'},
                {speaker: '{adv2}', text: '喂喂，真的嗎…沒辦法，做吧！'},
                {speaker: '料理人', text: '太、太過分了…明白了，追加400G，這次饒了我…。'},
                {speaker: '{adv1}', text: '……做得太過了…', jumptoline: 29},
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '把一部分報酬還回去吧。200G可以吧？對方很親切。'},
                {speaker: '{adv1}', text: '真溫柔…一定會有好運的哦。'},
                {speaker: '{adv2}', text: '喂喂，金錢減少啊…但做好事感覺不錯。'},
                {speaker: '料理人', text: '怎麼這樣…謝謝！真的是好人呢。'},
                {speaker: '{adv1}', text: '心裡暖暖的。一定會有好事發生哦。'},
                {speaker: '{PLAYER}', text: '希望如此。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ],
            // 2: 花朵採集（委託人：村人）
            [
                // Line 1-6 (index 0-5)
                {speaker: '{adv1}', text: '村人委託的漂亮花朵，大量採集來了！香氣超棒～。'},
                {speaker: '{PLAYER}', text: '好香啊。放在公會就能療癒。幹得很好。'},
                {speaker: '{adv2}', text: '花啊…我可能會踩爛。{adv1}會殺了我所以閉嘴！'},
                {speaker: '{adv1}', text: '這些花能做染料哦！衣服變鮮豔大家會開心。'},
                {speaker: '{PLAYER}', text: '染料啊。最近聽說結婚典禮很多，是花季嗎？'},
                {speaker: '{adv2}', text: '結婚典禮！？接住花束就輪到我了！…開玩笑的。'},
                // Line 7-8 (index 6-7)
                {speaker: '村人', text: '謝謝漂亮的花！村子廣場會變成花田。最近結婚熱潮，正好需要！'},
                {speaker: '村人', text: '能做香袋或療癒茶。混花粉症藥草就能應付今年需求。大家都得救了！'},
                // Line 9 (index 8)
                {speaker: '村人', text: '真的幫大忙了。這是報酬。村子會變華麗哦！'},
                // Line 10 (index 9)
                {speaker: 'Narrator', text: '（選擇肢：採集後，如何應對？）'},
                // Line 11 (index 10) - Choices
                {
                    speaker: 'Narrator',
                    text: '',
                    choices: [
                        {
                            text: '請委託人分一些採集的花朵（+1 花）',
                            reward: [{type: "item", name: "花", qty: 1}],
                            jumptoline: 12
                        },
                        {
                            text: '稱讚冒險者加深信任（參加冒險者好感度 +5）',
                            reward: [{type: "friendliness", amount: 5, target: "participants"}],
                            jumptoline: 15
                        },
                        {
                            text: '讓冒險者威脅委託人要求追加金錢（+400 Gold、參加冒險者好感度 -15、LUC -3）',
                            reward: [
                                {type: "gold", amount: 400},
                                {type: "friendliness", amount: -15, target: "participants"},
                                {type: "luck", amount: -3, target: "participants"}
                            ],
                            jumptoline: 19
                        },
                        {
                            text: '把一部分報酬金還給委託人（-200 Gold、參加冒險者 LUC +3）',
                            reward: [
                                {type: "gold", amount: -200},
                                {type: "luck", amount: 3, target: "participants"}
                            ],
                            jumptoline: 23
                        }
                    ]
                },
                // Branch 1: Ask for some item back - Line 12-14 (index 11-13)
                {speaker: '{PLAYER}', text: '花很多，能不能分一個？公會也能用。'},
                {speaker: '{adv1}', text: '看起來有多餘呢。來問問吧。'},
                {speaker: '村人', text: '好啊！當作謝禮送一個。以後也多多關照！', jumptoline: 29},
                // Branch 2: Praise - Line 15-18 (index 14-17)
                {speaker: '{PLAYER}', text: '大家幹得很好。漂亮花朵確實採集，真可靠。'},
                {speaker: '{adv1}', text: '被{PLAYER}這麼說很高興！會更努力的！'},
                {speaker: '{adv2}', text: '嘿嘿，多讚美我啊！下次輪到我大活躍了！'},
                {speaker: '{PLAYER}', text: '嗯，期待哦。', jumptoline: 29},
                // Branch 3: Threaten for more gold - Line 19-22 (index 18-21)
                {speaker: '{PLAYER}', text: '現在世界危險，能不能多給報酬？稍微威脅一下。'},
                {speaker: '{adv2}', text: '喂喂，真的嗎…沒辦法，做吧！'},
                {speaker: '村人', text: '太、太過分了…明白了，追加400G，這次饒了我…。'},
                {speaker: '{adv1}', text: '……做得太過了…', jumptoline: 29},
                // Branch 4: Give back some gold - Line 23-28 (index 22-27)
                {speaker: '{PLAYER}', text: '把一部分報酬還回去吧。200G可以吧？對方很親切。'},
                {speaker: '{adv1}', text: '真溫柔…一定會有好運的哦。'},
                {speaker: '{adv2}', text: '喂喂，金錢減少啊…但做好事感覺不錯。'},
                {speaker: '村人', text: '怎麼這樣…謝謝！真的是好人呢。'},
                {speaker: '{adv1}', text: '心裡暖暖的。一定會有好事發生哦。'},
                {speaker: '{PLAYER}', text: '希望如此。', jumptoline: 29},
                // Convergence - Line 29 (index 28)
                {speaker: '{PLAYER}', text: '任務完成了。回公會休息吧。'}
            ]
        ],
    }
]
}
const cities = [
    {name: "セントラルシティ", guild: true},
    {name: "鉱山の街ドラゴラ", items: [{name: "鉄鉱石", minPrice: 10, maxPrice: 20}]},
    {name: "農村エルグリーン", items: [{name: "薬草", minPrice: 5, maxPrice: 10}]},
    {name: "商人の街バザリア", items: [{name: "スパイス", minPrice: 7, maxPrice: 14}]},
    {name: "宝石の街クリスタリス", items: [{name: "宝石", minPrice: 15, maxPrice: 30}]}
];




// storyQuestDialogues を翻訳キー対応に変更
const storyQuestDialogues = [
    // 0: 盗賊団クエスト
    [
        { speaker: "Luna", text: t('story_dialogue_0_0') },
        { speaker: "Kaito",  text: t('story_dialogue_0_1') },
        { speaker: "Luna", text: t('story_dialogue_0_2') },
        { speaker: "Narrator", text: t('story_dialogue_0_3') }
    ],
    // 1: 古代遺跡の守護者
    [
        { speaker: "Luna", text: t('story_dialogue_1_0') },
        { speaker: "Kaito",  text: t('story_dialogue_1_1') },
        { speaker: "Luna", text: t('story_dialogue_1_2') },
        { speaker: "Narrator", text: t('story_dialogue_1_3') }
    ],
    // 2: 闇の魔導士
    [
        { speaker: "Luna", text: t('story_dialogue_2_0') },
        { speaker: "Kaito",  text: t('story_dialogue_2_1') },
        { speaker: "Luna", text: t('story_dialogue_2_2') },
        { speaker: "Narrator", text: t('story_dialogue_2_3') }
    ],
    // 3: 伝説のドラゴン
    [
        { speaker: "Luna", text: t('story_dialogue_3_0') },
        { speaker: "Kaito",  text: t('story_dialogue_3_1') },
        { speaker: "Luna", text: t('story_dialogue_3_2') },
        { speaker: "Narrator", text: t('story_dialogue_3_3') }
    ],
    // 4: 闇のカルト集団
    [
        { speaker: "Luna", text: t('story_dialogue_4_0') },
        { speaker: "Kaito",  text: t('story_dialogue_4_1') },
        { speaker: "Luna", text: t('story_dialogue_4_2') },
        { speaker: "Narrator", text: t('story_dialogue_4_3') }
    ]
];

const mainQuests = [
    {
        desc: t('main_quest_0_desc'),
        difficulty: 1,
        reward: 5000,
        minStrength: 1, minWisdom: 1, minDexterity: 1, minLuck: 1,
        focusStat: "strength",
        minFocus: 1,
        repRequired: 100,
        rank: t('main_quest_0_rank'),
    },
    {
        desc: t('main_quest_1_desc'),
        difficulty: 1,
        reward: 20000,
        minStrength: 1, minWisdom: 1, minDexterity: 1, minLuck: 1,
        focusStat: "wisdom",
        minFocus: 1,
        repRequired: 200,
        rank: t('main_quest_1_rank'),
    },
    {
        desc: t('main_quest_2_desc'),
        difficulty: 120,
        reward: 40000,
        minStrength: 1, minWisdom: 1, minDexterity: 1, minLuck: 1,
        focusStat: "wisdom",
        minFocus: 1,
        repRequired: 300,
        rank: t('main_quest_2_rank'),
    },
    {
        desc: t('main_quest_3_desc'),
        difficulty: 1,
        reward: 80000,
        minStrength: 1, minWisdom: 1, minDexterity: 1, minLuck: 1,
        focusStat: "strength",
        minFocus: 1,
        repRequired: 400,
        rank: t('main_quest_3_rank'),
    },
    {
        desc: t('main_quest_4_desc'),
        difficulty: 1,
        reward: 30000,
        minStrength: 1, minWisdom: 1, minDexterity: 1, minLuck: 1,
        focusStat: "luck",
        minFocus: 1,
        repRequired: 500,
        rank: t('main_quest_4_rank'),
    },
];

const statIcons = {
    strength: 'STR',
    wisdom: 'WIS',
    dexterity: 'DEX',
    luck: 'LUC'
};

const statFull = {
    strength: '筋力',
    wisdom: '知恵',
    dexterity: '敏捷',
    luck: '運'
};

const statColors = {
    0: '#ff0000',
    1: '#0000ff',
    2: '#00ff00',
    3: '#ffff00'
};



const discoveryNPCs = [
    '地図の賢者 エルドリン',
    '歴史の語り部 タリア',
    '深海の探求者 コルバト',
    '反響の予見者 シララ',
    '星の観測者 アストリッド',
    '森のドルイド リオラ',
    '灰の学者 ボルカン',
    '幻の舞姫 ザラ',
    '宝石の彫刻師 トーン',
    '永遠の守護者 フェイ'
];

const enemyConfigs = [
    {ja: '暗殺者（男）', en: 'Assassin(M)'},
    {ja: '暗殺者（女）', en: 'Assassin(F)'},
    {ja: 'ハンター（男）', en: 'Hunter(M)'},
    {ja: 'ハンター（女）', en: 'Hunter(F)'}
];












const defenseDescs = [
    'ギルドが謎の侵略者に襲われています！急いで防衛を！',
    '敵の軍勢がギルドの門を叩いています。冒険者たちよ、立ち上がれ！',
    '闇の勢力がギルドを包囲。防衛戦が始まる！',
    'スパイと暗殺者がギルドに侵入。迎え撃て！'
];


const questTypeDescs = [killDescsByRank, discoveryDescsByRank, escortDescsByRank, fetchQuestsByRank];
const questTypeClasses = ['kill', 'discovery', 'escort', 'fetch', 'defense', 'training', 'main', 'dungeon', 'trade'];

const shopItems = [

    {name: 'HP Potion', cost: 100, type: 'potion', restore: 'hp', amount: 30, description: 'A small red vial that instantly heals wounds.'},
    {name: 'MP Potion', cost: 150, type: 'potion', restore: 'mp', amount: 30, description: 'A glowing blue vial that replenishes magical energy.'},

    // === One Hand Weapons ===
    {name: 'Small Knife', cost: 200, stat: 'strength', bonus: 3, enhancement: 5, category: 'One Hand', description: 'A basic dagger suitable for beginners.'},
    {name: 'Beginner Scroll', cost: 200, stat: 'wisdom', bonus: 3, enhancement: 5, category: 'One Hand', description: 'A simple scroll containing introductory magical knowledge.'},

    // === Both Hands Weapons ===
    {name: 'Iron Sword', cost: 400, stat: 'strength', bonus: 6, enhancement: 10, category: 'Both Hands', description: 'A sturdy iron blade favored by seasoned fighters.'},
    {name: 'Magician Scroll', cost: 400, stat: 'wisdom', bonus: 6, enhancement: 10, category: 'Both Hands', description: 'An advanced scroll filled with powerful arcane secrets (requires both hands).'},

    // === Head ===
    {name: 'Leather Cap', cost: 200, stat: 'defense', bonus: 3, enhancement: 5, category: 'Head', description: 'A simple leather cap offering basic head protection.'},
    {name: 'Iron Helmet', cost: 400, stat: 'defense', bonus: 6, enhancement: 10, category: 'Head', description: 'A sturdy iron helmet for improved protection.'},

    // === Body ===
    {name: 'Leather Armor', cost: 300, stat: 'defense', bonus: 5, enhancement: 8, category: 'Body', description: 'Light leather armor providing moderate protection.'},
    {name: 'Chain Mail', cost: 600, stat: 'defense', bonus: 10, enhancement: 15, category: 'Body', description: 'Heavy chain mail for superior defense.'},

    // === Legs ===
    {name: 'Leather Pants', cost: 200, stat: 'dexterity', bonus: 3, enhancement: 5, category: 'Legs', description: 'Flexible leather pants that improve mobility.'},
    {name: 'Greaves', cost: 400, stat: 'defense', bonus: 5, enhancement: 10, category: 'Legs', description: 'Metal greaves protecting the legs.'},

    // === Feet ===
    {name: 'Leather Boots', cost: 200, stat: 'dexterity', bonus: 3, enhancement: 5, category: 'Feet', description: 'Comfortable leather boots for better movement.'},
    {name: 'Elf Boots', cost: 400, stat: 'dexterity', bonus: 6, enhancement: 10, category: 'Feet', description: 'Elegant elven footwear that enhances agility.'},

    // === Gloves ===
    {name: 'Work Gloves', cost: 200, stat: 'strength', bonus: 3, enhancement: 5, category: 'Gloves', description: 'Sturdy gloves that improve grip and strength.'},
    {name: 'Enchanted Gauntlets', cost: 400, stat: 'strength', bonus: 6, enhancement: 10, category: 'Gloves', description: 'Magically enhanced gauntlets for greater power.'},

    // === Cape ===
    {name: 'Traveler\'s Cloak', cost: 200, stat: 'luck', bonus: 3, enhancement: 5, category: 'Cape', description: 'A simple cloak said to bring good fortune on journeys.'},
    {name: 'Mystic Cape', cost: 400, stat: 'wisdom', bonus: 6, enhancement: 10, category: 'Cape', description: 'A flowing cape imbued with magical energy.'},

    // === Accessory ===
    {name: 'Lucky Coin', cost: 200, stat: 'luck', bonus: 3, enhancement: 5, category: 'Accessory', description: 'An old coin said to bring good fortune.'},
    {name: 'Four-Leaf Clover', cost: 400, stat: 'luck', bonus: 6, enhancement: 10, category: 'Accessory', description: 'A rare clover that significantly boosts luck.'},

];
const materialShop = [
    {name: "鉄鉱石", basePrice: 30, variance: 1.5},
    {name: "薬草", basePrice: 20, variance: 1.5},
    {name: "スパイス", basePrice: 55, variance: 1.8},
    {name: "宝石", basePrice: 115, variance: 2.0}
];

// NPC固有のサイドクエストデータ（discoveryNPCsの順番に厳密対応）
const sideQuestData = [
    // 0: 地図の賢者 エルドリン - discovery (WIS重点、地図関連の探索)
    {
        desc: '失われた「永遠の航路図」の断片が散らばっている古代遺跡を探し、正確な位置を地図化せよ。',
        type: 6, // discovery
        focusStat: 'wisdom',
        difficulty: 80,
        rank: 'B+',
        minWisdom: 800,
        minStrength: 30,
        minDexterity: 40,
        minLuck: 30,
        minFocus: 110,
        reward: 8000,
        daysLeft: 40
    },
    // 1: 歴史の語り部 タリア - fetch (LUC重点、歴史資料集め)
    {
        desc: '忘れられた時代を記した「古の石碑の拓本」を各地の遺跡から5枚集めてきてほしい。',
        type: 3, // fetch
        focusStat: 'luck',
        difficulty: 75,
        rank: 'B+',
        item: { name: '古の石碑拓本', qty: 5 },
        minLuck: 700,
        minStrength: 25,
        minWisdom: 45,
        minDexterity: 35,
        minFocus: 100,
        reward: 7500,
        daysLeft: 35
    },
    // 2: 深海の探求者 コルバト - discovery (DEX重点、深海探査)
    {
        desc: '深海に沈む「アビス・クリスタル」の輝く洞窟を発見し、安全な潜水ルートを記録せよ。',
        type: 1, // discovery
        focusStat: 'dexterity',
        difficulty: 85,
        rank: 'A',
        minDexterity: 850,
        minStrength: 40,
        minWisdom: 35,
        minLuck: 30,
        minFocus: 115,
        reward: 8500,
        daysLeft: 45
    },
    // 3: 反響の予見者 シララ - discovery (WIS重点、予言関連)
    {
        desc: '響き渡る予言の声が聞こえる「エコー・チャンバー」の隠された場所を探し出せ。',
        type: 1, // discovery
        focusStat: 'wisdom',
        difficulty: 90,
        rank: 'A',
        minWisdom: 1000,
        minStrength: 25,
        minDexterity: 35,
        minLuck: 40,
        minFocus: 125,
        reward: 9000,
        daysLeft: 40
    },
    // 4: 星の観測者 アストリッド - discovery (WIS重点、天文関連)
    {
        desc: '星の運行が異常を示す「スターフォール高原」の隠された観測点を特定せよ。',
        type: 1, // discovery
        focusStat: 'wisdom',
        difficulty: 95,
        rank: 'A+',
        minWisdom: 1100,
        minStrength: 20,
        minDexterity: 30,
        minLuck: 45,
        minFocus: 130,
        reward: 9500,
        daysLeft: 50
    },
    // 5: 森のドルイド リオラ - kill (STR重点、森の脅威除去)
    {
        desc: '森を腐敗させる「毒のマンドラゴラ」の群れを根絶やしにせよ。',
        type: 0, // kill
        focusStat: 'strength',
        difficulty: 80,
        rank: 'B+',
        minStrength: 1000,
        minWisdom: 40,
        minDexterity: 35,
        minLuck: 25,
        minFocus: 120,
        reward: 8000,
        daysLeft: 35
    },
    // 6: 灰の学者 ボルカン - fetch (LUC重点、火山素材)
    {
        desc: '火山地帯から「エターナル・アッシュ」を8個集めてきてくれ。',
        type: 3, // fetch
        focusStat: 'luck',
        difficulty: 85,
        rank: 'A',
        item: { name: 'エターナル・アッシュ', qty: 8 },
        minLuck: 9,
        minStrength: 40,
        minWisdom: 35,
        minDexterity: 45,
        minFocus: 110,
        reward: 8500,
        daysLeft: 40
    },
    // 7: 幻の舞姫 ザラ - escort (DEX重点、舞姫護衛)
    {
        desc: '幻の舞を披露するザラを、呪われた劇場まで安全に護衛せよ。',
        type: 2, // escort
        focusStat: 'dexterity',
        difficulty: 90,
        rank: 'A',
        minDexterity: 1000,
        minStrength: 35,
        minWisdom: 30,
        minLuck: 40,
        minFocus: 125,
        reward: 9000,
        daysLeft: 30
    },
    // 8: 宝石の彫刻師 トーン - fetch (LUC重点、宝石集め)
    {
        desc: '完璧な彫刻のための「スターレム・ジェム」を6個集めてきてほしい。',
        type: 3, // fetch
        focusStat: 'luck',
        difficulty: 80,
        rank: 'B+',
        item: { name: 'スターレム・ジェム', qty: 6 },
        minLuck: 950,
        minStrength: 30,
        minWisdom: 40,
        minDexterity: 35,
        minFocus: 115,
        reward: 8000,
        daysLeft: 45
    },
    // 9: 永遠の守護者 フェイ - kill (STR重点、強敵討伐)
    {
        desc: '永遠の領域を脅かす「シャドウ・タイタン」を討伐せよ。',
        type: 0, // kill
        focusStat: 'strength',
        difficulty: 100,
        rank: 'A+',
        minStrength: 1200,
        minWisdom: 45,
        minDexterity: 50,
        minLuck: 35,
        minFocus: 140,
        reward: 12000,
        daysLeft: 50
    }
];