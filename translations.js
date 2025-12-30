// translations.js

const translations = {
  ja: {
    page_title: "ギルドマスターゲーム",
    game_title: "ギルドマスター v1.0",
    tutorial: "説明",
    save: "保存",
    load: "読み込み",
    shop: "店",
    characters: "キャラクター",
    npcs: "NPC",
    facilities: "ギルド周辺",
    guild_quests: "ギルドクエスト投稿",
    end_day: "日終了",
    quests_title: "クエスト&nbsp;&nbsp;&nbsp;",
    prev_quest: "‹ 前",
    next_quest: "次 ›",
    available_adventurers: "利用可能冒険者",
    recruiting_adventurers: "募集冒険者",
    shop_title: "店",
    characters_title: "キャラクター",
    npcs_title: "NPC",
    battle_title: "防衛戦",
    facilities_title: "ギルド周辺",
    guild_quests_title: "ギルドクエスト投稿",
    close: "閉じる",
    prev_page: "前",
    next_page: "次",
    day_format: "日 {day}",
    gold_label: "ゴールド:",
    reputation_label: "評判:",
    tax_today_prefix: "今日の税金:",
    tax_later_prefix: "{days}日後の税金:",
    game_over_text: "ゲームオーバー",    
    tutorial_speaker: "ギルドマスター",
    next_button: "次へ",
    start_game_button: "ゲーム開始",
    intro_title: "目覚め",
    intro_description: "あなたは記憶を失った状態で目を覚ました。<br>ルナとカイトという二人が、あなたの幼なじみだと名乗り、<br>あなたの名前や過去を教えてくれようとしています。<br><br>ゲーム内で使用するあなたの名前を入力してください。",
    intro_name_placeholder: "名前を入力...",
    intro_decide_button: "決定",
    loading_header: "ギルドマスター v1.0<br>読み込み中...",
    new_game_button: "最初から始める",
    continue_button: "続きから始める",
    shop_prev: "前",
    shop_next: "次",
    shop_page_counter: "{current} / {total}",
    shop_purchase: "アイテム購入",
    daily_materials: "今日の素材",
    guild_expansion: "ギルド拡張",
    corrupt_merchant: "商人を脅す",
    sell_items: "アイテム売却",
    available_quests_header: "利用可能クエスト",
    training_quest_title: "常時利用可能なトレーニングクエスト（最大2人）",
    training_quest_desc: "低いレベルの冒険者はペアの高いレベル相当のEXPを獲得。リスクなし、報酬なし。",
    difficulty_label: "難易度",
    fixed: "（固定）",
    required_stats: "必要ステータス",
    all_zero: "全て0",
    days_left_label: "残り日数",
    reward_label: "報酬",
    defense_warning: "防衛クエスト - 1-4人の防衛者を割り当てなければゲームオーバー！",
    required_label: "必要",
    estimated_days_label: "予想日数",
    team_label: "チーム",
    success_rate_label: "成功確率",
    assigned_label: "割り当て済み ({current}/{max})",
    reject_button: "クエスト拒否",
    reputation_penalty: "評判 ",
    in_progress_message: "進行中 - 冒険者の割り当て解除不可",
    na: "N/A",
    failure: "失敗",
    training_days: "1日",
    defense_today: "Today: Battle",
    tactical_combat: "Tactical Combat",
    trade_failure: "失敗 (DEX/LUC不足)",
    trade_remaining_days: "{days}日残り (確定成功)",
    trade_days: "{days}日 (確定成功)",
    estimated_days: "{days}日",

    stat_strength: "筋力",
    stat_wisdom: "知恵",
    stat_dexterity: "敏捷",
    stat_luck: "運",
    no_available_quests: "利用可能なクエストはありません。",
    quest_counter: "{current} / {total}",

    no_assignment: "未割り当て",
    training_quest_name: "トレーニングクエスト"


  },
  en: {
    page_title: "Guild Master Game",
    game_title: "Guild Master v1.0",
    tutorial: "Tutorial",
    save: "Save",
    load: "Load",
    shop: "Shop",
    characters: "Characters",
    npcs: "NPCs",
    facilities: "Guild Facilities",
    guild_quests: "Post Guild Quests",
    end_day: "End Day",
    quests_title: "Quests&nbsp;&nbsp;&nbsp;",
    prev_quest: "‹ Previous",
    next_quest: "Next ›",
    available_adventurers: "Available Adventurers",
    recruiting_adventurers: "Recruit Adventurers",
    shop_title: "Shop",
    characters_title: "Characters",
    npcs_title: "NPCs",
    battle_title: "Defense Battle",
    facilities_title: "Guild Facilities",
    guild_quests_title: "Post Guild Quests",
    close: "Close",
    prev_page: "Previous",
    next_page: "Next",
    day_format: "Day {day}",
    gold_label: "Gold:",
    reputation_label: "Reputation:",
    tax_today_prefix: "Today's Tax:",
    tax_later_prefix: "Tax in {days} days:",
    game_over_text: "Game Over",
    tutorial_speaker: "Guild Master",
    next_button: "Next",
    start_game_button: "Start Game",    
    intro_title: "Awakening",
    intro_description: "You wake up having lost all your memories.<br>Two people named Luna and Kaito claim to be your childhood friends<br>and are about to tell you your name and past.<br><br>Please enter the name you wish to use in the game.",
    intro_name_placeholder: "Enter your name...",
    intro_decide_button: "Confirm",
    loading_header: "Guild Master v1.0<br>Loading...",
    new_game_button: "Start from beginning",
    continue_button: "Start from previous",
    shop_prev: "Previous",
    shop_next: "Next",
    shop_page_counter: "{current} / {total}",
    shop_purchase: "Buy Items",
    daily_materials: "Today's Materials",
    guild_expansion: "Guild Expansion",
    corrupt_merchant: "Intimidate Merchant",
    sell_items: "Sell Items",
    available_quests_header: "Available Quests",
    training_quest_title: "Always Available Training Quest (Max 2)",
    training_quest_desc: "Lower-level adventurer gains EXP equivalent to the higher-level partner. No risk, no reward.",
    difficulty_label: "Difficulty",
    fixed: " (Fixed)",
    required_stats: "Required Stats",
    all_zero: "All 0",
    days_left_label: "Days Left",
    reward_label: "Reward",
    defense_warning: "Defense Quest - Assign 1-4 defenders or Game Over!",
    required_label: "Required",
    estimated_days_label: "Estimated Days",
    team_label: "Team",
    success_rate_label: "Success Rate",
    assigned_label: "Assigned ({current}/{max})",
    reject_button: "Reject Quest",
    reputation_penalty: "Reputation ",
    in_progress_message: "In Progress - Cannot Unassign Adventurers",
    na: "N/A",
    failure: "Failure",
    training_days: "1 Day",
    defense_today: "Today: Battle",
    tactical_combat: "Tactical Combat",
    trade_failure: "Failure (Insufficient DEX/LUC)",
    trade_remaining_days: "{days} days remaining (Guaranteed Success)",
    trade_days: "{days} days (Guaranteed Success)",
    estimated_days: "{days} days",

    stat_strength: "Strength",
    stat_wisdom: "Wisdom",
    stat_dexterity: "Dexterity",
    stat_luck: "Luck",
    no_available_quests: "No available quests.",
    quest_counter: "{current} / {total}",

    no_assignment: "None assigned",
    training_quest_name: "Training Quest"
  },
  zh: {  // Traditional Chinese (繁體中文 - Taiwan/HK style)
    page_title: "公會大師遊戲",
    game_title: "公會大師 v1.0",
    tutorial: "教學",
    save: "儲存",
    load: "讀取",
    shop: "商店",
    characters: "角色",
    npcs: "NPC",
    facilities: "公會設施",
    guild_quests: "發布公會任務",
    end_day: "結束一天",
    quests_title: "任務&nbsp;&nbsp;&nbsp;",
    prev_quest: "‹ 上一個",
    next_quest: "下一個 ›",
    available_adventurers: "可用冒險者",
    recruiting_adventurers: "招募冒險者",
    shop_title: "商店",
    characters_title: "角色",
    npcs_title: "NPC",
    battle_title: "防衛戰",
    facilities_title: "公會設施",
    guild_quests_title: "發布公會任務",
    close: "關閉",
    prev_page: "上一頁",
    next_page: "下一頁",
    day_format: "第{day}天",
    gold_label: "金幣:",
    reputation_label: "聲望:",
    tax_today_prefix: "今日稅金:",
    tax_later_prefix: "{days}天後稅金:",
    game_over_text: "遊戲結束",
    tutorial_speaker: "公會大師",    
    next_button: "下一頁",
    start_game_button: "開始遊戲",
    intro_title: "甦醒",
    intro_description: "你在失憶的狀態下醒來。<br>名為露娜與凱托的兩人，自稱是你的青梅竹馬，<br>並準備告訴你你的名字與過去。<br><br>請輸入遊戲中要使用的名字。",
    intro_name_placeholder: "輸入名字...",
    intro_decide_button: "確定",
    loading_header: "公會大師 v1.0<br>載入中...",
    new_game_button: "從頭開始",
    continue_button: "從上次繼續",
    shop_prev: "上一頁",
    shop_next: "下一頁",
    shop_page_counter: "{current} / {total}",
    shop_purchase: "購買物品",
    daily_materials: "今日素材",
    guild_expansion: "公會擴建",
    corrupt_merchant: "威脅商人",
    sell_items: "出售物品",
    available_quests_header: "可用任務",
    training_quest_title: "隨時可用的訓練任務（最多2人）",
    training_quest_desc: "低等級冒險者獲得相當於高等級夥伴的EXP。無風險、無報酬。",
    difficulty_label: "難度",
    fixed: "（固定）",
    required_stats: "必要屬性",
    all_zero: "全部0",
    days_left_label: "剩餘天數",
    reward_label: "報酬",
    defense_warning: "防衛任務 - 未分配1-4名防衛者將遊戲結束！",
    required_label: "必要",
    estimated_days_label: "預計天數",
    team_label: "隊伍",
    success_rate_label: "成功率",
    assigned_label: "已分配 ({current}/{max})",
    reject_button: "拒絕任務",
    reputation_penalty: "聲望 ",
    in_progress_message: "進行中 - 無法解除冒險者分配",
    na: "N/A",
    failure: "失敗",
    training_days: "1天",
    defense_today: "今日：戰鬥",
    tactical_combat: "戰術戰鬥",
    trade_failure: "失敗 (DEX/LUC不足)",
    trade_remaining_days: "{days}天剩餘 (確定成功)",
    trade_days: "{days}天 (確定成功)",
    estimated_days: "{days}天",

    stat_strength: "力量",
    stat_wisdom: "智慧",
    stat_dexterity: "敏捷",
    stat_luck: "運氣",
    no_available_quests: "沒有可用任務。",
    quest_counter: "{current} / {total}",

    no_assignment: "尚未分配",
    training_quest_name: "訓練任務"

  }
};

// Add this to translations.js (near adventurerNames or introDialogues)

const mainCharacterNames = {
  ja: {
    kaito: 'カイト',
    luna: 'ルナ'
  },
  en: {
    kaito: 'Kaito',
    luna: 'Luna'
  },
  zh: {  // Traditional Chinese (matches intro dialogue translations)
    kaito: 'Kaito',
    luna: 'Luna'
  }
};

const adventurerNames = {
  ja: {
    male: [
      'アキラ', 'ハルト', 'ケン', 'リュウ', 'ソラ',
      'タイチ', 'ユウト', 'カズキ', 'リョウ', 'ショウ',
      'トモヤ', 'ダイキ', 'ヒロ', 'マサト', 'ナオキ',
      'ユウキ', 'レイ', 'セイジ', 'タカシ', 'ノブ',
      'ミナト', 'レン', 'アオト', 'リク', 'ソウタ',
      'ユイト', 'ハヤト', 'ショウタ', 'コウタ', 'タクミ',
      'ヒロト', 'レオ', 'イオリ', 'アサヒ', 'ヤマト',
      'エイジ', 'トア', 'ユウマ',
      'ラン', 'ジン', 'シン', 'トウヤ', 'ケント',
      'ハルキ', 'ソウスケ', 'リョウタ', 'ナツメ', 'コウキ',
      'タイガ', 'リュウセイ', 'カケル', 'テツヤ', 'マヒロ'
    ],
    female: [
      'アヤカ', 'ハルカ', 'ミカ', 'サクラ', 'ユイ',
      'リナ', 'モモ', 'ナナ', 'ユナ', 'アカリ',
      'ヒナタ', 'ソラ', 'ミユ', 'リコ', 'サヤ',
      'マユ', 'ノゾミ', 'エマ', 'キラ',
      'ツムギ', 'ミオ', 'スイ', 'リン', 'ヒマリ',
      'エイ', 'ユイナ', 'アオイ', 'メイ', 'ハナ',
      'リオ', 'チヒロ', 'アイ', 'ミズキ', 'カナ',
      'サキ', 'ホノカ', 'アミ', 'レナ', 'マオ',
      'ユズキ', 'コハル', 'スズ', 'ミナ', 'ヒカリ',
      'ナツキ', 'サトミ', 'ユカリ', 'レイナ', 'ミサキ',
      'アンナ', 'ハナカ', 'サナ', 'マナ'
    ]
  },
  en: {
    male: [
      'Arthur', 'Blake', 'Connor', 'Drake', 'Ethan',
      'Finn', 'Gavin', 'Hunter', 'Ian', 'Jack',
      'Kyle', 'Liam', 'Mason', 'Nolan', 'Owen',
      'Parker', 'Quinn', 'Ryan', 'Sean', 'Tyler',
      'Victor', 'Wyatt', 'Zane', 'Brock', 'Cole',
      'Dean', 'Evan', 'Ford', 'Grant', 'Heath',
      'Joel', 'Knox', 'Lance', 'Miles', 'Nash',
      'Pierce', 'Reed', 'Seth', 'Trent', 'Vance',
      'Wade', 'York', 'Cade', 'Jace', 'Rhys',
      'Silas', 'Tate', 'Zane', 'Brody', 'Gage'
    ],
    female: [
      'Alice', 'Bella', 'Clara', 'Daisy', 'Emma',
      'Fiona', 'Grace', 'Harper', 'Isla', 'Jade',
      'Kira', 'Lily', 'Mia', 'Nora', 'Olivia',
      'Piper', 'Quinn', 'Rose', 'Sophia', 'Tara',
      'Uma', 'Violet', 'Willow', 'Zoe', 'Brooke',
      'Chloe', 'Delia', 'Eve', 'Faith', 'Gemma',
      'Hazel', 'Iris', 'Jolie', 'Kayla', 'Lana',
      'Mabel', 'Nova', 'Opal', 'Paige', 'Ruby',
      'Skye', 'Tessa', 'Una', 'Vera', 'Aria',
      'Elara', 'Freya', 'Gwen', 'Liora', 'Mira',
      'Selene', 'Thalia', 'Vesper', 'Yara'
    ]
  },
  zh: {  // Now uses the same English fantasy names as 'en' for better immersion in fantasy setting
    male: [
      'Arthur', 'Blake', 'Connor', 'Drake', 'Ethan',
      'Finn', 'Gavin', 'Hunter', 'Ian', 'Jack',
      'Kyle', 'Liam', 'Mason', 'Nolan', 'Owen',
      'Parker', 'Quinn', 'Ryan', 'Sean', 'Tyler',
      'Victor', 'Wyatt', 'Zane', 'Brock', 'Cole',
      'Dean', 'Evan', 'Ford', 'Grant', 'Heath',
      'Joel', 'Knox', 'Lance', 'Miles', 'Nash',
      'Pierce', 'Reed', 'Seth', 'Trent', 'Vance',
      'Wade', 'York', 'Cade', 'Jace', 'Rhys',
      'Silas', 'Tate', 'Zane', 'Brody', 'Gage'
    ],
    female: [
      'Alice', 'Bella', 'Clara', 'Daisy', 'Emma',
      'Fiona', 'Grace', 'Harper', 'Isla', 'Jade',
      'Kira', 'Lily', 'Mia', 'Nora', 'Olivia',
      'Piper', 'Quinn', 'Rose', 'Sophia', 'Tara',
      'Uma', 'Violet', 'Willow', 'Zoe', 'Brooke',
      'Chloe', 'Delia', 'Eve', 'Faith', 'Gemma',
      'Hazel', 'Iris', 'Jolie', 'Kayla', 'Lana',
      'Mabel', 'Nova', 'Opal', 'Paige', 'Ruby',
      'Skye', 'Tessa', 'Una', 'Vera', 'Aria',
      'Elara', 'Freya', 'Gwen', 'Liora', 'Mira',
      'Selene', 'Thalia', 'Vesper', 'Yara'
    ]
  }
};


// In translations.js (add this near other quest/tutorial data)

// In translations.js (add this near fetchQuestsByRank or other quest data)

// In translations.js (single consolidated discoveryDescsByRank with all ranks fully defined)

// In translations.js (add this near other quest data like discoveryDescsByRank, escortDescsByRank, etc.)

const killDescsByRank = {
  ja: {
    'F': [
        '村の周辺をうろつくスライム5匹を討伐せよ。作物が溶けている。',
        '酒場の地下室に巣食う巨大ネズミをすべて退治せよ。',
        '農場を襲う野犬3匹を倒せ。家畜が危ない。'
    ],
    'F+': [
        '街道で待ち伏せするゴブリン8匹を討伐せよ。',
        '森に隠れる山賊5人を排除せよ。',
        '洞窟に潜む巨大蜘蛛1匹を殺せ。'
    ],
    'D': [
        '村を脅かすオークの群れ10体を倒せ。',
        '橋を占拠するトロル1体を討伐せよ。',
        '森の奥にいる狼王とその群れを狩れ。'
    ],
    'D+': [
        '盗賊団の拠点を襲撃し、盗賊15人を殺せ。',
        '古代迷宮に潜むミノタウロスを倒せ。',
        '山に巣食うワイバーン1匹を討伐せよ。'
    ],
    'C': [
        'オーク部族の戦士20体を壊滅せよ。',
        '巨人のサイクロプス1体を倒せ。',
        '空を飛ぶグリフォン1匹を討伐せよ。'
    ],
    'C+': [
        '沼地に潜むヒドラを倒せ。すべての頭を焼却せよ。',
        '呪われたバンシーを鎮めよ。',
        'ケンタウロスの軍勢12体を撃破せよ。'
    ],
    'B': [
        '下級デーモンを召喚するカルト指導者を討伐せよ。',
        '暴走した古代ゴーレムを破壊せよ。',
        'リッチの墓を守るアンデッド軍を一掃せよ。'
    ],
    'B+': [
        'ヴァンパイア貴族を倒せ。夜の脅威を終わらせよ。',
        '再生するフェニックスを狩れ。',
        '大地を揺るがすビヒーモスを討伐せよ。'
    ],
    'A': [
        '大デーモン（アークデーモン）を地獄から引きずり出して倒せ。',
        '古代ドラゴン1体を討伐せよ。',
        'タイタンの巨人を撃破せよ。'
    ],
    'A+': [
        'ドラゴンの王を討伐せよ。',
        'リッチキングとその不死軍を壊滅せよ。',
        '堕落した天使を倒せ。'
    ],
    'S': [
        '深淵から現れた古の悪神を討伐せよ。',
        '世界を焼き尽くすエルダードラゴンを倒せ。',
        '神話の海獣レヴィアタンを討伐せよ。'
    ]
  },
  en: {
    'F': [
        'Defeat 5 slimes wandering around the village. They\'re melting the crops.',
        'Exterminate all the giant rats infesting the tavern\'s basement.',
        'Take down 3 wild dogs attacking the farm. The livestock is in danger.'
    ],
    'F+': [
        'Eliminate 8 goblins ambushing travelers on the highway.',
        'Wipe out 5 bandits hiding in the forest.',
        'Kill the giant spider lurking in the cave.'
    ],
    'D': [
        'Defeat a pack of 10 orcs threatening the village.',
        'Slay the troll occupying the bridge.',
        'Hunt the wolf king and its pack deep in the forest.'
    ],
    'D+': [
        'Raid the bandit gang\'s hideout and kill 15 bandits.',
        'Defeat the minotaur lurking in the ancient labyrinth.',
        'Slay the wyvern nesting in the mountains.'
    ],
    'C': [
        'Annihilate 20 orc tribe warriors.',
        'Defeat the cyclops giant.',
        'Take down the griffon soaring in the skies.'
    ],
    'C+': [
        'Slay the hydra lurking in the swamp. Burn all its heads.',
        'Put the cursed banshee to rest.',
        'Defeat 12 centaur warriors.'
    ],
    'B': [
        'Eliminate the cult leader summoning lesser demons.',
        'Destroy the rampaging ancient golem.',
        'Sweep away the undead army guarding the lich\'s tomb.'
    ],
    'B+': [
        'Defeat the vampire noble. End the terror of the night.',
        'Hunt the regenerating phoenix.',
        'Slay the behemoth shaking the earth.'
    ],
    'A': [
        'Drag the archdemon from hell and defeat it.',
        'Slay an ancient dragon.',
        'Defeat the titan giant.'
    ],
    'A+': [
        'Slay the dragon king.',
        'Annihilate the lich king and its undead army.',
        'Defeat the fallen angel.'
    ],
    'S': [
        'Defeat the ancient evil god emerging from the abyss.',
        'Slay the elder dragon that scorches the world.',
        'Defeat the mythical sea beast Leviathan.'
    ]
  },
  zh: {  // Traditional Chinese
    'F': [
        '討伐在村莊周圍遊蕩的5隻史萊姆。農作物正在被溶化。',
        '消滅酒館地下室所有巨大的老鼠。',
        '擊倒襲擊農場的3隻野狗。家畜有危險。'
    ],
    'F+': [
        '討伐在街道埋伏的8隻哥布林。',
        '消滅隱藏在森林中的5名山賊。',
        '殺死潛伏在洞窟中的巨大蜘蛛。'
    ],
    'D': [
        '擊倒威脅村莊的10隻獸人群。',
        '討伐佔據橋樑的食人妖。',
        '狩獵森林深處的狼王及其族群。'
    ],
    'D+': [
        '突襲盜賊團據點並殺死15名盜賊。',
        '擊倒潛伏在古代迷宮中的米諾陶洛斯。',
        '討伐棲息在山中的雙足飛龍。'
    ],
    'C': [
        '殲滅20名獸人部落戰士。',
        '擊倒獨眼巨人。',
        '討伐翱翔天空的獅鷲。'
    ],
    'C+': [
        '擊倒潛伏在沼澤中的九頭蛇。燒毀所有頭部。',
        '鎮壓被詛咒的女妖。',
        '擊破12名半人馬戰士。'
    ],
    'B': [
        '討伐召喚下級惡魔的邪教領袖。',
        '破壞失控的古代魔像。',
        '掃蕩守護巫妖墓穴的不死軍團。'
    ],
    'B+': [
        '擊倒吸血鬼貴族。結束夜晚的恐怖。',
        '狩獵會再生的鳳凰。',
        '討伐震動大地的比希摩斯。'
    ],
    'A': [
        '從地獄拖出大惡魔並擊倒它。',
        '討伐一頭古代巨龍。',
        '擊破泰坦巨人。'
    ],
    'A+': [
        '討伐龍王。',
        '殲滅巫妖王及其不死軍團。',
        '擊倒墮落天使。'
    ],
    'S': [
        '討伐從深淵現身的古之邪神。',
        '擊倒焚燒世界的長老龍。',
        '討伐神話中的海獸利維坦。'
    ]
  }
};

const discoveryDescsByRank = {
  ja: {
    'F': [
        '町で失くされた大切なペンダントを探せ。',
        '近所の森に隠された小さな宝箱を発見せよ。',
        '古い井戸の底に隠された秘密を見つけよ。'
    ],
    'F+': [
        '森の奥に隠された滝の裏の洞窟を発見せよ。',
        '古い家の隠し地下室を探せ。',
        '川沿いの隠された小屋を見つけよ。'
    ],
    'D': [
        '近くの丘にある小さな遺跡の入り口を発見せよ。',
        '盗賊が使う隠しキャンプを探せ。',
        '行方不明のキャラバンの残骸を見つけよ。'
    ],
    'D+': [
        '埋もれた古代寺院の場所を発見せよ。',
        '山の隠された鉱脈を探せ。',
        '湖底に沈んだ村の痕跡を見つけよ。'
    ],
    'C': [
        '忘れられた城の秘密通路を発見せよ。',
        '魔法の泉の正確な位置をマッピングせよ。',
        '呪われた森の中心にある祠を探せ。'
    ],
    'C+': [
        '失われた文明の遺跡を発見せよ。',
        '雲の上に浮かぶ島への道を見つけよ。',
        '不安定な次元ポータルの場所を発見せよ。'
    ],
    'B': [
        '迷宮のような峡谷の隠された道を地図化せよ。伝説の宝の噂。',
        '砂漠の砂丘の失われた星の神殿を発掘せよ。星座に一致する。',
        'アジュール湖の下の沈んだ遺跡を見つけよ。古代の水生文明。'
    ],
    'B+': [
        'エコーケイブの秘密の間を発見せよ。ささやきが予言を明らかにする。',
        'クラウドピークの忘れられた天文台を位置づけよ。多宇宙を眺める。',
        'ウィスパリングウッドのハートツリーを探検せよ。すべての森の魔法の源。'
    ],
    'A': [
        'アッシェンウェイストの埋もれた天文台を発掘せよ。火山の異常。',
        'エンドレスサンドのミラージュオアシスを見つけよ。幻か現実か？'
    ],
    'A+': [
        'クリスタルカーブンの輝く鉱脈をチャートせよ。アーティファクトの力源。',
        'ソーンウォールメイズの隠されたグローブを発見せよ。永遠の若さが咲く。'
    ],
    'S': [
        '宇宙の果てに存在する禁断の神殿を発見せよ。',
        '世界の起源を記した究極の図書館を見つけよ。',
        '神々が会議を行う隠された領域を発見せよ。'
    ]
  },
  en: {
    'F': [
        'Search for a precious pendant lost in town.',
        'Discover a small treasure chest hidden in the nearby forest.',
        'Find the secret hidden at the bottom of an old well.'
    ],
    'F+': [
        'Discover the cave behind a hidden waterfall deep in the forest.',
        'Search for a concealed basement in an old house.',
        'Find a hidden cabin along the river.'
    ],
    'D': [
        'Discover the entrance to a small ruin on a nearby hill.',
        'Locate a bandits\' hidden camp.',
        'Find the remains of a missing caravan.'
    ],
    'D+': [
        'Discover the location of a buried ancient temple.',
        'Search for a hidden mineral vein in the mountains.',
        'Find traces of a village sunk at the bottom of a lake.'
    ],
    'C': [
        'Discover a secret passage in a forgotten castle.',
        'Map the exact location of a magical spring.',
        'Search for a shrine in the center of a cursed forest.'
    ],
    'C+': [
        'Discover the ruins of a lost civilization.',
        'Find the path to an island floating in the clouds.',
        'Discover the location of an unstable dimensional portal.'
    ],
    'B': [
        'Map the hidden paths of a labyrinthine canyon. Rumors of legendary treasure abound.',
        'Excavate the lost star temple buried in desert dunes. It aligns with the constellations.',
        'Discover the sunken ruins beneath Azure Lake. Remnants of an ancient aquatic civilization.'
    ],
    'B+': [
        'Find the secret chamber in Echo Cave. Whispers reveal prophecies.',
        'Locate the forgotten observatory on Cloud Peak. It gazes into the multiverse.',
        'Explore the Heart Tree in Whispering Woods. The source of all forest magic.'
    ],
    'A': [
        'Unearth the buried observatory in Ashen Wastes. Volcanic anomalies surround it.',
        'Find the Mirage Oasis in Endless Sands. Illusion or reality?'
    ],
    'A+': [
        'Chart the glowing veins in Crystal Cavern. Power source of ancient artifacts.',
        'Discover the hidden grove in Thornwall Maze. Eternal youth blooms there.'
    ],
    'S': [
        'Discover the forbidden temple existing at the edge of the universe.',
        'Find the ultimate library recording the origin of the world.',
        'Discover the hidden realm where gods hold their councils.'
    ]
  },
  zh: {  // Traditional Chinese
    'F': [
        '在城鎮中尋找遺失的重要項鍊。',
        '發現附近森林中隱藏的小寶箱。',
        '找到古老水井底部隱藏的秘密。'
    ],
    'F+': [
        '發現森林深處隱藏瀑布後方的洞窟。',
        '搜尋老房子中的隱藏地下室。',
        '找到河邊隱藏的小屋。'
    ],
    'D': [
        '發現附近山丘上小型遺跡的入口。',
        '找到盜賊使用的隱藏營地。',
        '找到失蹤商隊的殘骸。'
    ],
    'D+': [
        '發現被埋沒的古代寺院的所在位置。',
        '搜尋山中隱藏的礦脈。',
        '找到湖底沉沒村莊的痕跡。'
    ],
    'C': [
        '發現被遺忘城堡中的秘密通道。',
        '繪製魔法泉水的精確位置。',
        '搜尋被詛咒森林中心的神社。'
    ],
    'C+': [
        '發現失落文明的遺跡。',
        '找到通往雲上浮島的道路。',
        '發現不穩定的次元傳送門的位置。'
    ],
    'B': [
        '繪製迷宮般峽谷的隱藏道路。傳說中的寶藏傳聞。',
        '發掘沙漠沙丘中失落的星之神殿。與星座一致。',
        '發現蒼藍湖底的沉沒遺跡。古代水生文明的遺跡。'
    ],
    'B+': [
        '找到回音洞窟的秘密房間。低語會揭示預言。',
        '定位雲峰上被遺忘的天文台。可眺望多重宇宙。',
        '探索低語森林的心樹。所有森林魔法的源頭。'
    ],
    'A': [
        '發掘灰燼荒原中埋沒的天文台。周圍有火山異常。',
        '找到無盡沙地中的幻影綠洲。幻覺還是現實？'
    ],
    'A+': [
        '繪製水晶洞窟中發光的礦脈。古代神器的力量來源。',
        '發現荊棘迷牆中的隱藏林地。永恆青春在那裡綻放。'
    ],
    'S': [
        '發現宇宙盡頭存在的禁斷神殿。',
        '找到記載世界起源的終極圖書館。',
        '發現諸神舉行會議的隱藏領域。'
    ]
  }
};

const escortDescsByRank = {
  ja: {
    'F': [
        '農夫を近くの市場まで安全に護衛せよ。',
        '子供を危険な橋を渡って家まで送れ。',
        '村への手紙を届ける使者を守れ。'
    ],
    'F+': [
        '商人を次の町まで護衛せよ。ゴブリンが潜む道だ。',
        '旅行者のグループを森の道で守れ。',
        '荷物を運ぶキャラバンを盗賊から護衛せよ。'
    ],
    'D': [
        '貴族を隣町まで護衛せよ。暗殺者の噂がある。',
        '負傷した兵士を前線からキャンプまで送れ。',
        '学者を危険な遺跡まで護衛せよ。'
    ],
    'D+': [
        '外交官を敵の領土を抜けて護衛せよ。',
        '難民の家族を安全地帯までガイドせよ。',
        '珍しい魔獣と調教師を闘技場まで護衛せよ。'
    ],
    'C': [
        '王子を隣国まで護衛せよ。政略結婚のためだ。',
        '聖女を聖地まで守れ。異端者が狙っている。',
        '貴重な神器を運ぶ一行を護衛せよ。'
    ],
    'C+': [
        '将軍を戦場まで護衛せよ。敵のスパイが暗躍中。',
        '予言者を神託の場所まで送れ。',
        '最後のエルフ王女を隠れ里まで護衛せよ。'
    ],
    'B': [
        '古代の賢者を禁断の図書館まで護衛せよ。',
        'ドラゴンライダーを巣まで守れ。',
        '神の化身を神殿まで護衛せよ。'
    ],
    'B+': [
        '堕落した英雄を裁きの場まで護衛せよ。',
        '星の使者を天文台まで送れ。',
        '最後のユニコーンを聖域まで護衛せよ。'
    ],
    'A': [
        '王を亡命先まで護衛せよ。国が滅びようとしている。',
        '大魔導士を禁呪の儀式場まで守れ。',
        '神の遺児を運命の場所まで護衛せよ。'
    ],
    'A+': [
        '光の女神の巫女を最終聖域まで護衛せよ。',
        '最後の希望である預言者を世界の中心まで送れ。',
        '滅びゆく世界の救世主を神の座まで護衛せよ。'
    ],
    'S': [
        '世界の均衡を守る存在を深淵の門まで護衛せよ。',
        '時を司る神の使者を永遠の時計塔まで守れ。',
        '全ての命の源を最終決戦の場まで護衛せよ。'
    ]
  },
  en: {
    'F': [
        'Safely escort a farmer to the nearby market.',
        'Guide a child safely across a dangerous bridge to their home.',
        'Protect a messenger delivering a letter to the village.'
    ],
    'F+': [
        'Escort a merchant to the next town. Goblins lurk along the path.',
        'Guard a group of travelers through the forest road.',
        'Protect a caravan carrying goods from bandits.'
    ],
    'D': [
        'Escort a noble to the neighboring town. Rumors of assassins abound.',
        'Transport an injured soldier from the front lines to camp.',
        'Guard a scholar on their journey to a dangerous ruin.'
    ],
    'D+': [
        'Escort a diplomat through enemy territory.',
        'Guide a refugee family to a safe zone.',
        'Protect a rare magical beast and its trainer to the coliseum.'
    ],
    'C': [
        'Escort a prince to a neighboring kingdom for a political marriage.',
        'Protect a saintess on her pilgrimage to the holy land. Heretics are targeting her.',
        'Guard a party transporting a precious divine artifact.'
    ],
    'C+': [
        'Escort a general to the battlefield. Enemy spies are active.',
        'Guide a prophet to the site of divine revelation.',
        'Protect the last elf princess to her hidden sanctuary.'
    ],
    'B': [
        'Escort an ancient sage to the forbidden library.',
        'Guard a dragon rider to their nest.',
        'Protect a divine avatar on their journey to the temple.'
    ],
    'B+': [
        'Escort a fallen hero to the place of judgment.',
        'Guide a star messenger to the observatory.',
        'Protect the last unicorn to its sacred domain.'
    ],
    'A': [
        'Escort the king to exile as the kingdom falls.',
        'Guard the archmage to the site of a forbidden ritual.',
        'Protect the divine heir to their destined location.'
    ],
    'A+': [
        'Escort the priestess of the light goddess to the final sanctuary.',
        'Guide the prophet of last hope to the center of the world.',
        'Protect the savior of a dying world to the throne of the gods.'
    ],
    'S': [
        'Escort the guardian of world balance to the gates of the abyss.',
        'Protect the messenger of the god of time to the eternal clock tower.',
        'Guard the source of all life to the final battlefield.'
    ]
  },
  zh: {  // Traditional Chinese
    'F': [
        '安全護送農夫到附近的市場。',
        '引導孩子安全渡過危險的橋樑回家。',
        '保護送信到村莊的信使。'
    ],
    'F+': [
        '護送商人到下一個城鎮。路上潛伏著哥布林。',
        '守護旅行者團體穿越森林道路。',
        '保護運送貨物的商隊免遭盜賊襲擊。'
    ],
    'D': [
        '護送貴族到鄰鎮。暗殺者的傳聞四起。',
        '將負傷士兵從前線送回營地。',
        '守護學者前往危險遺跡。'
    ],
    'D+': [
        '護送外交官穿越敵方領土。',
        '引導難民家庭到安全地帶。',
        '保護稀有魔獸與馴獸師到競技場。'
    ],
    'C': [
        '護送王子到鄰國進行政治聯姻。',
        '守護聖女前往聖地。異端者正瞄準她。',
        '護衛運送珍貴神器的隊伍。'
    ],
    'C+': [
        '護送將軍到戰場。敵方間諜活躍中。',
        '引導預言者到神諭之地。',
        '保護最後的精靈公主到隱秘村落。'
    ],
    'B': [
        '護送古代賢者到禁斷圖書館。',
        '守護龍騎士到巢穴。',
        '護衛神之化身到神殿。'
    ],
    'B+': [
        '護送墮落英雄到審判之地。',
        '引導星之使者到天文台。',
        '保護最後的獨角獸到聖域。'
    ],
    'A': [
        '護送國王到亡命之地。王國即將滅亡。',
        '守護大魔導士到禁咒儀式場。',
        '護衛神之遺子到命運之地。'
    ],
    'A+': [
        '護送光之女神巫女到最終聖域。',
        '引導最後希望的預言者到世界中心。',
        '護衛瀕臨滅亡世界的救世主到神座。'
    ],
    'S': [
        '護送守護世界均衡的存在到深淵之門。',
        '守護掌管時間之神的使者到永恆鐘塔。',
        '護衛所有生命之源到最終決戰之地。'
    ]
  }
};



const fetchQuestsByRank = {
  ja: {
    'F': [
        {desc: '錬金術師のために野原から薬草を{qty}個集めてきてくれ。', itemName: '薬草', minPrice: 10, maxPrice: 30},
        {desc: '料理人に新鮮なキノコを{qty}個持ってきてほしい。', itemName: 'キノコ', minPrice: 15, maxPrice: 25},
        {desc: '村人にきれいな花を{qty}個届けてきて。', itemName: '花', minPrice: 5, maxPrice: 15}
    ],
    'F+': [
        {desc: '鍛冶屋のために鉄の欠片を{qty}個集めてきて。', itemName: '鉄の欠片', minPrice: 20, maxPrice: 40},
        {desc: '漁師に川魚を{qty}匹釣ってきてほしい。', itemName: '川魚', minPrice: 20, maxPrice: 35},
        {desc: '薬師のために普通の薬草を{qty}個持ってきて。', itemName: '普通の薬草', minPrice: 15, maxPrice: 30}
    ],
    'D': [
        {desc: '鉱夫のために良質の鉄鉱石を{qty}個採掘してきて。', itemName: '鉄鉱石', minPrice: 30, maxPrice: 60},
        {desc: 'ハンターに狼の毛皮を{qty}枚持ってきてほしい。', itemName: '狼の毛皮', minPrice: 40, maxPrice: 70},
        {desc: '魔術師に魔力の結晶（小）を{qty}個集めてきて。', itemName: '魔力の結晶（小）', minPrice: 50, maxPrice: 80}
    ],
    'D+': [
        {desc: '冒険者にオークの牙を{qty}個持ってきてほしい。', itemName: 'オークの牙', minPrice: 60, maxPrice: 100},
        {desc: '賢者に古代の巻物断片を{qty}個集めてきて。', itemName: '古代の巻物断片', minPrice: 80, maxPrice: 120},
        {desc: '商人に希少スパイスを{qty}個届けてきて。', itemName: '希少スパイス', minPrice: 70, maxPrice: 110}
    ],
    'C': [
        {desc: '貴族にグリフォンの羽を{qty}枚持ってきてほしい。', itemName: 'グリフォンの羽', minPrice: 150, maxPrice: 250},
        {desc: '大魔導士にヒドラの毒袋を{qty}個集めてきて。', itemName: 'ヒドラの毒袋', minPrice: 200, maxPrice: 300},
        {desc: '神殿に聖水を{qty}瓶届けてきて。', itemName: '聖水', minPrice: 180, maxPrice: 280}
    ],
    'C+': [
        {desc: '王宮にユニコーンの角を{qty}個持ってきてほしい。', itemName: 'ユニコーンの角', minPrice: 400, maxPrice: 600},
        {desc: '禁書庫に禁断の魔導書頁を{qty}枚集めてきて。', itemName: '禁断の魔導書頁', minPrice: 500, maxPrice: 700},
        {desc: '錬金大师にフェニックスの灰を{qty}握り持ってきて。', itemName: 'フェニックスの灰', minPrice: 450, maxPrice: 650}
    ],
    'B': [
        {desc: '大賢者に星の欠片を{qty}個集めてきてほしい。', itemName: '星の欠片', minPrice: 1000, maxPrice: 1500},
        {desc: '神官に天使の羽を{qty}枚持ってきて。', itemName: '天使の羽', minPrice: 1200, maxPrice: 1800},
        {desc: '闇市場にデーモンの心臓を{qty}個届けてきて。', itemName: 'デーモンの心臓', minPrice: 1100, maxPrice: 1600}
    ],
    'B+': [
        {desc: '王に古代ドラゴンの鱗を{qty}枚持ってきてほしい。', itemName: '古代ドラゴンの鱗', minPrice: 2000, maxPrice: 3000},
        {desc: '最高魔導士にエーテルの結晶を{qty}個集めてきて。', itemName: 'エーテルの結晶', minPrice: 2500, maxPrice: 3500},
        {desc: '神殿に神の涙を{qty}滴届けてきて。', itemName: '神の涙', minPrice: 2200, maxPrice: 3200}
    ],
    'A': [
        {desc: '伝説の英雄にタイタンの骨を{qty}本持ってきてほしい。', itemName: 'タイタンの骨', minPrice: 4000, maxPrice: 6000},
        {desc: '究極の錬金術師に永遠の炎を{qty}握り集めてきて。', itemName: '永遠の炎', minPrice: 4500, maxPrice: 6500},
        {desc: '神々に神聖な遺物を{qty}個届けてきて。', itemName: '神聖な遺物', minPrice: 4200, maxPrice: 6200}
    ],
    'A+': [
        {desc: '世界の守護者にエルダードラゴンの心臓を{qty}個持ってきてほしい。', itemName: 'エルダードラゴンの心臓', minPrice: 8000, maxPrice: 12000},
        {desc: '禁断の研究者に深淵の核を{qty}個集めてきて。', itemName: '深淵の核', minPrice: 9000, maxPrice: 13000},
        {desc: '最後の希望に光の神器の欠片を{qty}個届けてきて。', itemName: '光の神器の欠片', minPrice: 8500, maxPrice: 12500}
    ],
    'S': [
        {desc: '運命に世界の源石を{qty}個持ってきてほしい。', itemName: '世界の源石', minPrice: 15000, maxPrice: 25000},
        {desc: '神々に創世の欠片を{qty}個集めてきて。', itemName: '創世の欠片', minPrice: 20000, maxPrice: 30000},
        {desc: '終焉の使者に滅びの結晶を{qty}個届けてきて。', itemName: '滅びの結晶', minPrice: 18000, maxPrice: 28000}
    ]
  },
  en: {
    'F': [
        {desc: 'Gather {qty} herbs from the fields for the alchemist.', itemName: 'Herb', minPrice: 10, maxPrice: 30},
        {desc: 'Bring {qty} fresh mushrooms to the cook.', itemName: 'Mushroom', minPrice: 15, maxPrice: 25},
        {desc: 'Deliver {qty} beautiful flowers to the villager.', itemName: 'Flower', minPrice: 5, maxPrice: 15}
    ],
    'F+': [
        {desc: 'Collect {qty} iron scraps for the blacksmith.', itemName: 'Iron Scrap', minPrice: 20, maxPrice: 40},
        {desc: 'Catch {qty} river fish for the fisherman.', itemName: 'River Fish', minPrice: 20, maxPrice: 35},
        {desc: 'Bring {qty} common herbs to the apothecary.', itemName: 'Common Herb', minPrice: 15, maxPrice: 30}
    ],
    'D': [
        {desc: 'Mine {qty} quality iron ore for the miner.', itemName: 'Iron Ore', minPrice: 30, maxPrice: 60},
        {desc: 'Bring {qty} wolf pelts to the hunter.', itemName: 'Wolf Pelt', minPrice: 40, maxPrice: 70},
        {desc: 'Collect {qty} small mana crystals for the mage.', itemName: 'Small Mana Crystal', minPrice: 50, maxPrice: 80}
    ],
    'D+': [
        {desc: 'Bring {qty} orc tusks to the adventurer.', itemName: 'Orc Tusk', minPrice: 60, maxPrice: 100},
        {desc: 'Gather {qty} ancient scroll fragments for the sage.', itemName: 'Ancient Scroll Fragment', minPrice: 80, maxPrice: 120},
        {desc: 'Deliver {qty} rare spices to the merchant.', itemName: 'Rare Spice', minPrice: 70, maxPrice: 110}
    ],
    'C': [
        {desc: 'Bring {qty} griffon feathers to the noble.', itemName: 'Griffon Feather', minPrice: 150, maxPrice: 250},
        {desc: 'Collect {qty} hydra venom sacs for the archmage.', itemName: 'Hydra Venom Sac', minPrice: 200, maxPrice: 300},
        {desc: 'Deliver {qty} bottles of holy water to the temple.', itemName: 'Holy Water', minPrice: 180, maxPrice: 280}
    ],
    'C+': [
        {desc: 'Bring {qty} unicorn horns to the royal palace.', itemName: 'Unicorn Horn', minPrice: 400, maxPrice: 600},
        {desc: 'Gather {qty} pages of forbidden grimoires for the restricted library.', itemName: 'Forbidden Grimoire Page', minPrice: 500, maxPrice: 700},
        {desc: 'Bring {qty} handfuls of phoenix ashes to the master alchemist.', itemName: 'Phoenix Ash', minPrice: 450, maxPrice: 650}
    ],
    'B': [
        {desc: 'Collect {qty} star fragments for the great sage.', itemName: 'Star Fragment', minPrice: 1000, maxPrice: 1500},
        {desc: 'Bring {qty} angel feathers to the priest.', itemName: 'Angel Feather', minPrice: 1200, maxPrice: 1800},
        {desc: 'Deliver {qty} demon hearts to the black market.', itemName: 'Demon Heart', minPrice: 1100, maxPrice: 1600}
    ],
    'B+': [
        {desc: 'Bring {qty} ancient dragon scales to the king.', itemName: 'Ancient Dragon Scale', minPrice: 2000, maxPrice: 3000},
        {desc: 'Collect {qty} aether crystals for the supreme archmage.', itemName: 'Aether Crystal', minPrice: 2500, maxPrice: 3500},
        {desc: 'Deliver {qty} drops of divine tears to the temple.', itemName: 'Divine Tear', minPrice: 2200, maxPrice: 3200}
    ],
    'A': [
        {desc: 'Bring {qty} titan bones to the legendary hero.', itemName: 'Titan Bone', minPrice: 4000, maxPrice: 6000},
        {desc: 'Gather {qty} handfuls of eternal flame for the ultimate alchemist.', itemName: 'Eternal Flame', minPrice: 4500, maxPrice: 6500},
        {desc: 'Deliver {qty} sacred relics to the gods.', itemName: 'Sacred Relic', minPrice: 4200, maxPrice: 6200}
    ],
    'A+': [
        {desc: 'Bring {qty} elder dragon hearts to the world guardian.', itemName: 'Elder Dragon Heart', minPrice: 8000, maxPrice: 12000},
        {desc: 'Collect {qty} abyss cores for the forbidden researcher.', itemName: 'Abyss Core', minPrice: 9000, maxPrice: 13000},
        {desc: 'Deliver {qty} fragments of the light artifact to the last hope.', itemName: 'Light Artifact Fragment', minPrice: 8500, maxPrice: 12500}
    ],
    'S': [
        {desc: 'Bring {qty} world origin stones to fate itself.', itemName: 'World Origin Stone', minPrice: 15000, maxPrice: 25000},
        {desc: 'Collect {qty} creation fragments for the gods.', itemName: 'Creation Fragment', minPrice: 20000, maxPrice: 30000},
        {desc: 'Deliver {qty} crystals of destruction to the harbinger of the end.', itemName: 'Crystal of Destruction', minPrice: 18000, maxPrice: 28000}
    ]
  },
  zh: {  // Traditional Chinese
    'F': [
        {desc: '為鍊金術師從原野收集{qty}個藥草。', itemName: '藥草', minPrice: 10, maxPrice: 30},
        {desc: '為廚師帶來{qty}個新鮮蘑菇。', itemName: '蘑菇', minPrice: 15, maxPrice: 25},
        {desc: '為村民送去{qty}朵漂亮的花。', itemName: '花朵', minPrice: 5, maxPrice: 15}
    ],
    'F+': [
        {desc: '為鐵匠收集{qty}個鐵碎片。', itemName: '鐵碎片', minPrice: 20, maxPrice: 40},
        {desc: '為漁夫釣{qty}條河魚。', itemName: '河魚', minPrice: 20, maxPrice: 35},
        {desc: '為藥師帶來{qty}個普通藥草。', itemName: '普通藥草', minPrice: 15, maxPrice: 30}
    ],
    'D': [
        {desc: '為礦工採掘{qty}個優質鐵礦石。', itemName: '鐵礦石', minPrice: 30, maxPrice: 60},
        {desc: '為獵人帶來{qty}張狼皮。', itemName: '狼皮', minPrice: 40, maxPrice: 70},
        {desc: '為法師收集{qty}個小型魔力結晶。', itemName: '小型魔力結晶', minPrice: 50, maxPrice: 80}
    ],
    'D+': [
        {desc: '為冒險者帶來{qty}個獸人獠牙。', itemName: '獸人獠牙', minPrice: 60, maxPrice: 100},
        {desc: '為賢者收集{qty}個古代卷軸碎片。', itemName: '古代卷軸碎片', minPrice: 80, maxPrice: 120},
        {desc: '為商人送去{qty}個稀有香料。', itemName: '稀有香料', minPrice: 70, maxPrice: 110}
    ],
    'C': [
        {desc: '為貴族帶來{qty}片獅鷲羽毛。', itemName: '獅鷲羽毛', minPrice: 150, maxPrice: 250},
        {desc: '為大魔導士收集{qty}個九頭蛇毒囊。', itemName: '九頭蛇毒囊', minPrice: 200, maxPrice: 300},
        {desc: '為神殿送去{qty}瓶聖水。', itemName: '聖水', minPrice: 180, maxPrice: 280}
    ],
    'C+': [
        {desc: '為王宮帶來{qty}個獨角獸角。', itemName: '獨角獸角', minPrice: 400, maxPrice: 600},
        {desc: '為禁書庫收集{qty}頁禁斷魔導書。', itemName: '禁斷魔導書頁', minPrice: 500, maxPrice: 700},
        {desc: '為鍊金大師帶來{qty}把鳳凰灰燼。', itemName: '鳳凰灰燼', minPrice: 450, maxPrice: 650}
    ],
    'B': [
        {desc: '為大賢者收集{qty}個星之碎片。', itemName: '星之碎片', minPrice: 1000, maxPrice: 1500},
        {desc: '為神官帶來{qty}片天使羽毛。', itemName: '天使羽毛', minPrice: 1200, maxPrice: 1800},
        {desc: '為黑市送去{qty}個惡魔之心。', itemName: '惡魔之心', minPrice: 1100, maxPrice: 1600}
    ],
    'B+': [
        {desc: '為國王帶來{qty}片古代龍鱗。', itemName: '古代龍鱗', minPrice: 2000, maxPrice: 3000},
        {desc: '為最高魔導士收集{qty}個以太結晶。', itemName: '以太結晶', minPrice: 2500, maxPrice: 3500},
        {desc: '為神殿送去{qty}滴神之淚。', itemName: '神之淚', minPrice: 2200, maxPrice: 3200}
    ],
    'A': [
        {desc: '為傳說英雄帶來{qty}根泰坦骨頭。', itemName: '泰坦骨頭', minPrice: 4000, maxPrice: 6000},
        {desc: '為終極鍊金術師收集{qty}把永恆之焰。', itemName: '永恆之焰', minPrice: 4500, maxPrice: 6500},
        {desc: '為諸神送去{qty}個神聖遺物。', itemName: '神聖遺物', minPrice: 4200, maxPrice: 6200}
    ],
    'A+': [
        {desc: '為世界守護者帶來{qty}個長老龍之心。', itemName: '長老龍之心', minPrice: 8000, maxPrice: 12000},
        {desc: '為禁斷研究者收集{qty}個深淵核心。', itemName: '深淵核心', minPrice: 9000, maxPrice: 13000},
        {desc: '為最後的希望送去{qty}片光之神器碎片。', itemName: '光之神器碎片', minPrice: 8500, maxPrice: 12500}
    ],
    'S': [
        {desc: '為命運帶來{qty}個世界源石。', itemName: '世界源石', minPrice: 15000, maxPrice: 25000},
        {desc: '為諸神收集{qty}個創世碎片。', itemName: '創世碎片', minPrice: 20000, maxPrice: 30000},
        {desc: '為終結使者送去{qty}個滅亡結晶。', itemName: '滅亡結晶', minPrice: 18000, maxPrice: 28000}
    ]
  }
};

// === Tutorial Dialogue (fully translatable, per language) ===
const tutorialDialogues = {
  ja: [
    {speaker: translations.ja.tutorial_speaker, text: "ようこそ、新米ギルドマスター！\nこのゲームの基本操作と仕組みを簡単に説明するよ。"},
    {speaker: translations.ja.tutorial_speaker, text: "目的はギルドを運営してゴールドと評判を増やし、\n仲間を育てて真実を探ること。\nゴールドか評判がマイナスになるとゲームオーバーになるから注意だ。"},
    {speaker: translations.ja.tutorial_speaker, text: "左側がクエスト一覧だ。\n‹前 / 次›ボタンか、キーボードのA / Dキーでページを切り替えられる。"},
    {speaker: translations.ja.tutorial_speaker, text: "クエストは主に4種類ある。\n・討伐クエスト（STR重視）：モンスター退治。成功すると新しい冒険者が加入するチャンス！\n・探索クエスト（WIS重視）：未知の場所を探る。NPCを発見する可能性あり。\n・護衛クエスト（DEX重視）：対象を安全に送る。評判が少し多めに上がることがある。\n・収集クエスト（LUC重視）：アイテム集め。錬金素材や売却用アイテムが手に入るチャンス。"},
    {speaker: translations.ja.tutorial_speaker, text: "また、常に受けられる「トレーニングクエスト」もある。\n高レベル冒険者が低レベル冒険者に指導を行い、\n低レベル側に経験値を与えられる。\n育成に活用しよう！"},
    {speaker: translations.ja.tutorial_speaker, text: "右上は利用可能な冒険者一覧。\n横にスクロールして確認し、ドラッグ＆ドロップまたはクリックでクエストに配置しよう。"},
    {speaker: translations.ja.tutorial_speaker, text: "右下は募集中の冒険者。\nゴールドを払って雇用できる。\n強い仲間を増やしてクエスト成功率を上げよう。"},
    {speaker: translations.ja.tutorial_speaker, text: "配置が終わったら「日終了 & 冒険者派遣」ボタンを押すか、\nEnterキーを押して1日を進めよう。\n翌日に結果が返ってくる。"},
    {speaker: translations.ja.tutorial_speaker, text: "その他の便利な操作：\n・A / Dキー：クエスト、キャラクター、店のページ切り替え\n・スペースキー：店、キャラクター、イベントログを閉じる"},
    {speaker: translations.ja.tutorial_speaker, text: "施設アップグレードもあるぞ。\n「ギルド周辺」ボタンから鍛冶屋・酒場・錬金工房をゴールドで強化できる。"},
    {speaker: translations.ja.tutorial_speaker, text: "錬金工房ではポーションや素材を作れる。\n鍛冶屋の装備強化や酒場の料理にも必要だ。\n材料は収集クエストや交易クエストで手に入る。"},
    {speaker: translations.ja.tutorial_speaker, text: "「ギルドクエスト投稿」ボタンで自分でクエストを出せる。\nストーリークエスト・ダンジョンクエスト・交易クエストの3種類だ。\n報酬や内容を決めて冒険者を派遣しよう。"},
    {speaker: translations.ja.tutorial_speaker, text: "30日目以降は防衛戦が発生する。\n失敗するとゲームオーバーになるから、\nギルドの戦力をしっかり整えておけ。"},
    {speaker: translations.ja.tutorial_speaker, text: "戦闘はターン制で、DEXが高い冒険者から行動する。\n基本行動は軽攻撃・重攻撃・防御・カウンターだ。"},
    {speaker: translations.ja.tutorial_speaker, text: "軽攻撃：安定したダメージ\n重攻撃：大ダメージだが2APが必要\n防御：被ダメージ軽減\nカウンター：次の敵攻撃を反射\n状況に応じて使い分けよう。"},
    {speaker: translations.ja.tutorial_speaker, text: "これで基本は全部だ。\n分からないことがあればまた「説明」ボタンを押してくれ。\nがんばれ！"}
  ],
  en: [
    {speaker: translations.en.tutorial_speaker, text: "Welcome, novice Guild Master!\nI'll briefly explain the basic operations and mechanics of this game."},
    {speaker: translations.en.tutorial_speaker, text: "The goal is to manage your guild, increase gold and reputation,\nand develop your companions to uncover the truth.\nBe careful—if gold or reputation goes negative, it's game over."},
    {speaker: translations.en.tutorial_speaker, text: "The left side shows the quest list.\nUse the ‹ Previous / Next › buttons or A/D keys on the keyboard to switch pages."},
    {speaker: translations.en.tutorial_speaker, text: "There are mainly 4 types of quests:\n・Extermination (STR focus): Monster hunting. Success gives a chance for new adventurers to join!\n・Exploration (WIS focus): Scouting unknown areas. Chance to discover NPCs.\n・Escort (DEX focus): Safely transport a target. Slightly higher reputation gain.\n・Collection (LUC focus): Item gathering. Chance to obtain alchemy materials or sellable items."},
    {speaker: translations.en.tutorial_speaker, text: "There's also a constant \"Training Quest\" available.\nHigher-level adventurers can mentor lower-level ones,\ngiving EXP to the lower-level side.\nUse it for nurturing!"},
    {speaker: translations.en.tutorial_speaker, text: "Top-right is the list of available adventurers.\nScroll horizontally, then drag & drop or click to assign them to quests."},
    {speaker: translations.en.tutorial_speaker, text: "Bottom-right shows adventurers available for recruitment.\nPay gold to hire them.\nBuild a strong team to increase quest success rates."},
    {speaker: translations.en.tutorial_speaker, text: "When assignments are done, press the \"End Day & Dispatch Adventurers\" button\nor hit Enter to advance the day.\nResults will return the next day."},
    {speaker: translations.en.tutorial_speaker, text: "Other useful controls:\n・A / D keys: Switch pages in quests, characters, and shop\n・Space key: Close shop, characters, or event log"},
    {speaker: translations.en.tutorial_speaker, text: "You can also upgrade facilities.\nUse the \"Guild Facilities\" button to upgrade the blacksmith, tavern, or alchemy lab with gold."},
    {speaker: translations.en.tutorial_speaker, text: "The alchemy lab lets you craft potions and materials.\nThey're needed for blacksmith equipment upgrades and tavern cooking.\nMaterials come from collection or trade quests."},
    {speaker: translations.en.tutorial_speaker, text: "The \"Post Guild Quests\" button lets you create your own quests.\nThere are 3 types: Story, Dungeon, and Trade.\nSet rewards and details, then dispatch adventurers."},
    {speaker: translations.en.tutorial_speaker, text: "From day 30 onward, defense battles occur.\nFailure means game over,\nso prepare your guild's combat strength well."},
    {speaker: translations.en.tutorial_speaker, text: "Battles are turn-based, with higher DEX adventurers acting first.\nBasic actions are Light Attack, Heavy Attack, Defense, and Counter."},
    {speaker: translations.en.tutorial_speaker, text: "Light Attack: Stable damage\nHeavy Attack: High damage but costs 2 AP\nDefense: Reduces incoming damage\nCounter: Reflects the next enemy attack\nUse them situationally."},
    {speaker: translations.en.tutorial_speaker, text: "That's all the basics.\nIf you have questions, just press the \"Tutorial\" button again.\nGood luck!"}
  ],
  zh: [  // Traditional Chinese
    {speaker: translations.zh.tutorial_speaker, text: "歡迎，新手公會大師！\n我來簡單說明這個遊戲的基本操作和機制。"},
    {speaker: translations.zh.tutorial_speaker, text: "目標是經營公會，增加金幣和聲望，\n培養夥伴以探尋真相。\n金幣或聲望變成負數就會遊戲結束，注意哦。"},
    {speaker: translations.zh.tutorial_speaker, text: "左側是任務列表。\n使用‹ 前 / 次 ›按鈕，或鍵盤的A / D鍵來切換頁面。"},
    {speaker: translations.zh.tutorial_speaker, text: "任務主要有4種：\n・討伐任務（STR重視）：怪物退治。成功有機會招募新冒險者！\n・探索任務（WIS重視）：探查未知地點。有機會發現NPC。\n・護衛任務（DEX重視）：安全護送目標。聲望提升較多。\n・收集任務（LUC重視）：收集物品。有機會獲得鍊金素材或可出售物品。"},
    {speaker: translations.zh.tutorial_speaker, text: "另外還有隨時可接的「訓練任務」。\n高級冒險者指導低級冒險者，\n可給低級一方經驗值。\n好好利用來培養吧！"},
    {speaker: translations.zh.tutorial_speaker, text: "右上是可以使用的冒險者列表。\n水平滾動確認後，用拖曳或點擊分配到任務。"},
    {speaker: translations.zh.tutorial_speaker, text: "右下是招募中的冒險者。\n支付金幣即可雇用。\n增加強力夥伴來提高任務成功率吧。"},
    {speaker: translations.zh.tutorial_speaker, text: "分配完成後，按「結束一天 & 派遣冒險者」按鈕，\n或按Enter鍵前進一天。\n隔天就會回報結果。"},
    {speaker: translations.zh.tutorial_speaker, text: "其他便利操作：\n・A / D鍵：切換任務、角色、商店頁面\n・空白鍵：關閉商店、角色、事件記錄"},
    {speaker: translations.zh.tutorial_speaker, text: "還有設施升級哦。\n從「公會設施」按鈕用金幣強化鐵匠鋪、酒館、鍊金工房。"},
    {speaker: translations.zh.tutorial_speaker, text: "鍊金工房可以製作藥水和素材。\n鐵匠鋪的裝備強化和酒館的料理都需要。\n素材從收集任務或交易任務獲得。"},
    {speaker: translations.zh.tutorial_speaker, text: "「發布公會任務」按鈕可以自己發布任務。\n有故事任務、地下城任務、交易任務3種。\n設定報酬和內容後派遣冒險者吧。"},
    {speaker: translations.zh.tutorial_speaker, text: "第30天之後會發生防衛戰。\n失敗就會遊戲結束，\n請好好整頓公會戰力。"},
    {speaker: translations.zh.tutorial_speaker, text: "戰鬥是回合制，DEX高的冒險者先行動。\n基本行動有輕攻擊、重攻擊、防禦、反擊。"},
    {speaker: translations.zh.tutorial_speaker, text: "輕攻擊：穩定傷害\n重攻擊：高傷害但需要2AP\n防禦：減輕受到傷害\n反擊：反射下一次敵人攻擊\n根據情況靈活使用吧。"},
    {speaker: translations.zh.tutorial_speaker, text: "基本說明就到這裡。\n有不懂的地方再按「教學」按鈕吧。\n加油！"}
  ]
};


// === Intro Dialogue (fully translatable, per language) ===
const introDialogues = {
  ja: [
    {
        speaker: "ナレーター",
        text: "……薄暗い部屋で、あなたはゆっくりと目を覚ました。<br>頭が重く、痛みが走る。何も……何も思い出せない。<br>自分の名前さえ、ぼんやりとしか浮かんでこない。"
    },
    {
        speaker: "ナレーター",
        text: "扉が開き、二人の人影が入ってきた。<br>見知らぬ少女と少年——だが、彼らはあなたを見て安堵の表情を浮かべた。"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "{player}！ よかった、目が覚めたのね……！<br>ずっと心配してたのよ。本当に……本当に良かった……"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "おい、{player}。ようやく起きたか。<br>医者にも「いつ目覚めるかわからん」って言われてたんだぞ。<br>……まあ、無事で何よりだ。"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "あなたは{player}。この冒険者ギルドの前マスター……お父様の息子よ。<br>お父様は誰もが認める偉大なギルドマスターだったのに……<br>数年前の夜、何者かに突然殺されてしまったの。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "犯人の手がかりは一切なし。黒い影のような奴が一瞬で……<br>それ以来、冒険者たちは「信頼できるリーダーがいない」って、次々とギルドを去っていった。<br>今じゃ、俺たち三人しか残ってねえよ。"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "でも、あなたはもう16歳。お父様の後を継ぐ年齢になったわ。<br>私たち、ルナとカイトはあなたの幼なじみで、ずっと親友よ。<br>一緒にギルドを再建しましょう。そして、お父様の死の真相を突き止めましょう。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "ああ、俺たちはずっとお前のそばにいる。<br>お前がギルドマスターになるなら、全力で力を貸すぜ。<br>昔みたいに、三人でやっていこう。"
    },
    {
        speaker: "あなた",
        text: "……ありがとう。でも、正直……俺には何も思い出せない。<br>本当に、君たちが言うような俺なのか？"
    },
    {
        speaker: "ルナ",
        image: "Images/ルナ.png",
        text: "大丈夫よ、{player}。<br>記憶は少しずつ戻ってくるって医者も言ってた。<br>今は私たちが支えるから……一緒に、ギルドを昔のように偉大にしましょう。"
    },
    {
        speaker: "カイト",
        image: "Images/カイト.png",
        text: "決まりだな、{player}。<br>お前が新しいギルドマスターだ。<br>俺たちで、このギルドをもう一度盛り上げようぜ。"
    },
    {
        speaker: "ナレーター",
        text: "あなたはまだ記憶を失ったまま、戸惑いを抱えていた。<br>（本当に自分が彼らの言う「{player}」なのか……？）<br>それでも、今は前に進むしかない。父の遺志を継ぎ、ギルドを再興する道を選ぶことにした。"
    },
    {
        speaker: "ナレーター",
        text: "こうして、あなたはルナとカイトの助けを借り、<br>衰退した冒険者ギルドの再建に乗り出した。<br><br>父の死の真相を探りながら、ギルドを再び偉大にするために——"
    },
    {
        speaker: "ナレーター",
        text: "あなたたちの新たな冒険が、今始まる……"
    }
  ],
  en: [
    {
        speaker: "Narrator",
        text: "…In a dimly lit room, you slowly open your eyes.<br>Your head feels heavy, throbbing with pain. You remember… nothing.<br>Even your own name feels distant and hazy."
    },
    {
        speaker: "Narrator",
        text: "The door opens, and two figures enter.<br>A girl and a boy you don’t recognize—but their faces light up with relief upon seeing you."
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "{player}! Thank goodness, you’re awake…!<br>We’ve been so worried. Really… I’m so glad you’re okay…"
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "Hey, {player}. Finally awake, huh?<br>The doctor said there was no telling when you’d wake up.<br>…Well, the important thing is you’re safe."
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "You are {player}, son of the former master of this Adventurer’s Guild.<br>Your father was a legendary Guild Master respected by all…<br>But several years ago, on one fateful night, he was suddenly murdered by someone."
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "No clues, no traces. Just a shadowy figure that struck in an instant…<br>After that, adventurers left one by one, saying there was no leader they could trust.<br>Now, it’s just the three of us left."
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "But you’re already 16 years old—the age to succeed your father.<br>We, Luna and Kaito, are your childhood friends and have always been by your side.<br>Let’s rebuild the guild together. And let’s uncover the truth behind your father’s death."
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "Yeah, we’ll always have your back.<br>If you become Guild Master, we’ll give you everything we’ve got.<br>Just like old times—the three of us, together."
    },
    {
        speaker: "You",
        text: "…Thank you. But honestly… I don’t remember anything.<br>Am I really the person you say I am?"
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "It’s okay, {player}.<br>The doctor said your memories will come back little by little.<br>We’ll support you now… so let’s make this guild great again, together."
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "It’s settled, {player}.<br>You’re the new Guild Master.<br>Let’s bring this guild back to life—together."
    },
    {
        speaker: "Narrator",
        text: "You still had no memories and felt deep uncertainty.<br>(Am I really the “{player}” they describe…?) <br>Even so, there was no choice but to move forward. You chose to inherit your father’s will and revive the guild."
    },
    {
        speaker: "Narrator",
        text: "And so, with Luna and Kaito’s help,<br>you set out to rebuild the fallen Adventurer’s Guild.<br><br>Seeking the truth of your father’s death, while striving to make the guild great once more—"
    },
    {
        speaker: "Narrator",
        text: "Your new adventure begins now…"
    }
  ],
  zh: [  // Traditional Chinese
    {
        speaker: "旁白",
        text: "……在昏暗的房間裡，你緩緩睜開眼睛。<br>頭部沉重，隱隱作痛。你什麼也……什麼也想不起來。<br>連自己的名字都只模糊地浮現。"
    },
    {
        speaker: "旁白",
        text: "門被打開，兩個身影走了進來。<br>陌生的少女與少年——但他們看到你時，臉上露出安心表情。"
    },
    {
        speaker: "露娜",
        image: "Images/ルナ.png",
        text: "{player}！太好了，你醒了……！<br>我們一直很擔心。真的……真的太好了……"
    },
    {
        speaker: "凱托",
        image: "Images/カイト.png",
        text: "喂，{player}。終於醒了啊。<br>醫生也說「不知道什麼時候會醒」呢。<br>……總之，沒事就好。"
    },
    {
        speaker: "露娜",
        image: "Images/ルナ.png",
        text: "你是{player}，這間冒險者公會前任會長……你父親的兒子。<br>父親是人人敬重的偉大公會會長……<br>卻在幾年前的一個夜晚，被不知何人突然殺害了。"
    },
    {
        speaker: "凱托",
        image: "Images/カイト.png",
        text: "一點線索都沒有。只是像黑影一樣的傢伙一瞬間……<br>從那之後，冒險者們說「沒有值得信賴的領袖」，一個接一個離開公會。<br>現在只剩下我們三個人了。"
    },
    {
        speaker: "露娜",
        image: "Images/ルナ.png",
        text: "但你已經16歲了——可以繼承父親的年紀。<br>我們露娜和凱托是你的青梅竹馬，一直是最好的朋友。<br>一起重建公會吧。並且要查明父親之死的真相。"
    },
    {
        speaker: "凱托",
        image: "Images/カイト.png",
        text: "對，我們會一直陪在你身邊。<br>如果你成為公會會長，我們會全力幫助你。<br>就像以前一樣，我們三個人一起努力吧。"
    },
    {
        speaker: "你",
        text: "……謝謝。但老實說……我什麼都不記得了。<br>我真的是你們所說的那個人嗎？"
    },
    {
        speaker: "露娜",
        image: "Images/ルナ.png",
        text: "沒事的，{player}。<br>醫生說記憶會一點一點回來。<br>現在有我們支持你……一起讓公會恢復昔日的榮光吧。"
    },
    {
        speaker: "凱托",
        image: "Images/カイト.png",
        text: "就這麼定了，{player}。<br>你是新的公會會長。<br>我們一起把這個公會重新振興起來吧。"
    },
    {
        speaker: "旁白",
        text: "你仍舊失憶，心中充滿困惑。<br>（我真的是他們所說的「{player}」嗎……？）<br>即便如此，現在只能向前邁進。你選擇繼承父親的遺志，復興公會。"
    },
    {
        speaker: "旁白",
        text: "就這樣，在露娜與凱托的幫助下，<br>你開始重建沒落的冒險者公會。<br><br>一邊追查父親之死的真相，一邊讓公會再次偉大——"
    },
    {
        speaker: "旁白",
        text: "你們的新冒險，現在開始……"
    }
  ]
};

let currentLang = localStorage.getItem('gameLang') || 'ja';


// Helper function for dynamic translation with placeholders
function t(key, placeholders = {}) {
    let str = translations[currentLang][key] || translations.ja[key] || key;
    Object.keys(placeholders).forEach(p => {
        str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), placeholders[p]);
    });
    return str;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('gameLang', lang);
  applyTranslations();
  

  // Refresh dynamic parts (especially the day display)
  if (typeof updateDay === 'function') {
      updateDay();
  }
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('gameLang', lang);
  applyTranslations();
}

function applyTranslations() {
  // Page title
  document.title = translations[currentLang].page_title;

  // Main game title
  const mainTitle = document.querySelector('h2');
  if (mainTitle && mainTitle.hasAttribute('data-i18n')) {
    mainTitle.innerHTML = translations[currentLang][mainTitle.dataset.i18n];
  }

  // All elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = translations[currentLang][key];
    if (text !== undefined) {
      el.innerHTML = text;
    }
  });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const text = translations[currentLang][key];
            if (text !== undefined) {
                el.placeholder = text;
            }
        });
  // Sync dropdown
  const select = document.getElementById('langSelect');
  if (select) {
    select.value = currentLang;
    updateDisplays();
  }
  
}

// Apply on load
document.addEventListener('DOMContentLoaded', applyTranslations);