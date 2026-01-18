// translations.js

const translations = {
  ja: {
    page_title: "失われし冒険の旅",
    game_title: "失われし冒険の旅 v1.0",
    tutorial: "説明",
    save: "保存",
    load: "読み込み",
    shop: "店",
    characters: "キャラクター",
    npcs: "NPC",
    facilities: "ギルド周辺",
    guild_quests: "ギルドクエスト",
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
    guild_quests_title: "ギルドクエスト",
    close: "閉じる",
    prev_page: "前",
    next_page: "次",
    day_format: "日 {day}",
    gold_label: "ゴールド:",
    reputation_label: "評判:",
    tax_today_prefix: "今日の税金:",
    tax_later_prefix: "{days}日後の税金:",
    game_over_text: "ゲームオーバー",    
    tutorial_speaker: "ナレーター",
    next_button: "次へ",
    start_game_button: "ゲーム開始",
    intro_title: "目覚め",
    intro_description: "あなたは記憶を失った状態で目を覚ました。<br>ルナとカイトという二人が、あなたの幼なじみだと名乗り、<br>あなたの名前や過去を教えてくれようとしています。<br><br>ゲーム内で使用するあなたの名前を入力してください。",
    intro_name_placeholder: "名前を入力...",
    intro_decide_button: "決定",
    loading_header: "失われし冒険の旅 v1.0<br>読み込み中...",
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
    stat_defense: "防御",
    no_available_quests: "利用可能なクエストはありません。",
    quest_counter: "{current} / {total}",

    no_assignment: "未割り当て",
    training_quest_name: "トレーニングクエスト",
    no_permanent_adventurers: "恒久的な冒険者がいません。",
    prev_character: "‹ 前",
    next_character: "次 ›",
    status_title: "ステータス",
    base_stat_label: "ベース",
    exp_bar_label: "EXP {exp}/{needed}",
    hp_bar_label: "HP {hp}/{maxHp}",
    mp_bar_label: "MP {mp}/{maxMp}",
    active_buffs_title: "アクティブバフ",
    buff_line: "{bonus} {target}（残り{daysLeft}日）",
    equipment_title: "装備",
    none_equipment: "なし",
    unequip_button: "解除",
    equippable_title: "装備可能アイテム",
    equip_button: "装備",
    potions_title: "ポーション",
    potion_hp: "HP +{amount}",
    potion_mp: "MP +{amount}",
    use_button: "使用",
    level_up_title: "レベルアップアイテム",
    level_up_amount: "（使用でレベル+{levels}）",
    consumables_title: "消費アイテム（バフ）",
    days_suffix: "日",
    on_quest_cannot_fire: "クエスト中 - 解雇不可",
    fire_adventurer_button: "この冒険者を解雇",
    // Tavern Recipes (酒場料理・バフアイテム)
    tavern_strength_soup: "力のスープ",
    tavern_giant_stew: "巨人の煮込み",
    tavern_wisdom_tea: "知恵の茶",
    tavern_prophet_drink: "予言者の飲料",
    tavern_recovery_bread: "回復のパン",
    tavern_beast_vitality_stew: "獣肉の活力シチュー",
    tavern_fang_steel_power_stew: "牙鋼の力強煮込み",
    tavern_dragon_steel_steak: "龍鋼の巨竜ステーキ",
    tavern_titan_power_banquet: "巨神骨の力の饗宴",
    tavern_ancient_dragon_overlord: "古龍心の覇王料理",
    tavern_forest_elixir_tea: "森の霊薬ティー",
    tavern_holy_purification_tea: "聖魔導の浄化茶",
    tavern_forbidden_secret_wine: "禁断魔導の秘酒",
    tavern_ether_god_wine: "エーテル魔晶の神酒",
    tavern_abyss_wisdom_soup: "深淵の叡智スープ",
    tavern_river_fish_grill: "川魚の軽やか焼き",
    tavern_wind_swift_stew: "風翼の迅鳥シチュー",
    tavern_unicorn_agility_salad: "ユニコーンの敏捷サラダ",
    tavern_angel_feather_pie: "天使の軽羽パイ",
    tavern_sacred_swift_dish: "神聖迅撃の料理",
    tavern_creation_wind_god: "創世の風神料理",
    tavern_rare_spice_luck_boil: "希少スパイスの幸運煮",
    tavern_star_luck_dessert: "星の幸運デザート",
    tavern_phoenix_regen_cake: "不死鳥の再生ケーキ",
    tavern_god_tear_fortune_soup: "神涙の福運スープ",
    tavern_end_luck_banquet: "終焉の幸運饗宴",
    tavern_abyss_god_luck: "滅び深淵の神運料理",
    tavern_mushroom_vitality_bread: "キノコの活力パン",
    tavern_detox_healing_soup: "解毒聖水の癒しスープ",
    tavern_angel_divine_bread: "天使癒薬の神パン",
    tavern_god_tear_supreme_soup: "神涙神薬の至高スープ",
    tavern_world_eternal_bread: "世界源神薬の永遠パン",
    tavern_small_mp_magic_tea: "小魔力ポーションの魔茶",
    tavern_star_wind_tea: "星風ポーションの星茶",
    tavern_creation_god_wine: "創世魔力薬の神酒",
    tavern_ultimate_creation_str: "創世源の神饗宴",
    tavern_ultimate_world_wis: "世界源の叡智宴",
    tavern_ultimate_end_dex: "終焉の迅神料理",
    tavern_ultimate_source_luc: "源石の永運饗宴",

    // Blacksmith Recipes (鍛冶屋装備)
    blacksmith_advanced_sword: "上級の剣",
    blacksmith_steel_sword: "鋼鉄の剣",
    blacksmith_dragon_slayer: "ドラゴンスレイヤー",
    blacksmith_sage_staff: "賢者の杖",
    blacksmith_mystic_staff: "神秘の杖",
    blacksmith_refined_greatsword: "精鉄の大剣",
    blacksmith_fang_steel_axe: "牙鋼の両手斧",
    blacksmith_dragon_extermination_sword: "龍鋼の滅殺剣",
    blacksmith_titan_war_axe: "巨神の戦斧",
    blacksmith_ancient_dragon_sword: "古龍心滅剣",
    blacksmith_holy_magic_staff: "聖魔導の杖",
    blacksmith_forbidden_rod: "禁断魔導のロッド",
    blacksmith_ether_staff: "エーテル魔晶杖",
    blacksmith_abyss_staff: "深淵の魔導杖",
    blacksmith_light_god_staff: "光神器の神杖",
    blacksmith_beast_skin_dagger: "獣皮の短剣",
    blacksmith_wind_wing_bow: "風翼の弓",
    blacksmith_unicorn_dagger: "ユニコーンのダガー",
    blacksmith_angel_swift_bow: "天使の迅弓",
    blacksmith_sacred_swift_dagger: "神聖迅撃短剣",
    blacksmith_creation_god_bow: "創世の神弓",
    blacksmith_rare_spice_club: "希少スパイスの短棍",
    blacksmith_star_luck_club: "星の幸運棍",
    blacksmith_phoenix_luck_axe: "不死鳥の幸運斧",
    blacksmith_god_tear_fortune_staff: "神涙の福杖",
    blacksmith_end_luck_sword: "終焉の幸運剣",
    blacksmith_abyss_god_artifact_club: "滅び深淵の神器棍",
    blacksmith_ultimate_creation_sword: "創世源の神剣",
    blacksmith_ultimate_world_staff: "世界源の神杖",
    blacksmith_ultimate_end_bow: "終焉の神弓",
    blacksmith_ultimate_source_artifact: "源石の幸運神器",
    dialogue_next: "次へ",
    dialogue_close: "閉じる",
    facilities_street_title: "街",
    facilities_select_prompt: "施設を選択してください",
    facilities_blacksmith: "鍛冶屋",
    facilities_tavern: "酒場",
    facilities_alchemy: "錬金工房",
    facilities_level_title: "{title}　レベル {level}",
    facilities_back_to_street: "街に戻る",
    facilities_upgrade_cost: "レベル {level} → {next} アップグレード費用：{cost} gold",
    facilities_upgrade_button: "アップグレード",
    facilities_max_level: "最大レベル {max} に到達しました！",
    facilities_craftable_items: "製作可能アイテム",
    facilities_no_recipes_yet: "レベルを上げると新しいレシピが解放されます",
    facilities_upgrade_to_unlock: "施設をアップグレードすると利用可能になります",
    facilities_required_materials: "必要素材:",
    facilities_none: "なし",
    facilities_owned: "保有: {have}個",
    facilities_cost: "コスト：{cost} gold",
    facilities_craft_alchemy: "合成",
    facilities_craft_alchemy_10: "10回合成",
    facilities_order_tavern: "注文（冒険者選択）",
    facilities_produce_blacksmith: "製作",
    


    // 効果関連
    facilities_equip_effect: "装備効果: {stat} +{bonus}%",
    facilities_buff_effect: "バフ効果: {stat} +{bonus}{percent}",
    facilities_buff_effect_type: "バフ効果: {type} +{bonus}",
    facilities_buff_duration: "持続: {days}日間",
    facilities_potion_effect: "効果: {type} +{amount}",

    // 補助（必要に応じて）
    potion_hp: "HP回復",
    potion_mp: "MP回復",
    buff_hp_regen: "HP再生",
    buff_mp_regen: "MP再生",
    sell_no_items: "売却可能なアイテムがありません。",
    sell_quantity: "x{count}",
    sell_price_each: "{price}{unit}/個",
    sell_price_total: "合計 {total}{unit}",
    sell_button: "売却",
    sell_one_button: "1つ売却",
    sell_all_button: "すべて売却",
    sell_equip_bonus: "+{bonus} {stat}",
    gold_unit: "g",

    // ポーション種別（既存のものと統一）
    potion_hp: "HP",
    potion_mp: "MP",
    enhancement_crystal: "強化クリスタル",
    dungeon_treasure_gold: "ダンジョン{floor}階の宝: +{gold}g",
    item_found: "{name}発見！",
    item_found_qty: "{name} x{qty}発見！",
    rare_indicator: " (レア！)",
    dungeon_ring: "ダンジョン{floor}階の{stat}リング",

    stat_strength_full: "筋力",
    stat_wisdom_full: "知恵",
    stat_dexterity_full: "敏捷",
    stat_luck_full: "運",
    percent_symbol: "%",
    absolute_symbol: "（絶対値）",
    blacksmith_enhancement_desc: "強化クリスタルを使用して装備のステータスボーナスを永久に+1（絶対値）できます。<br>元の%ボーナスは維持され、%計算後に絶対値が加算されます。",
    blacksmith_enhance_button: "強化",
    blacksmith_enhance_success: "{item}を強化しました！ {stat} +{bonus}% + {enhancement}（絶対値）",

    blacksmith_enhancement_title: "装備強化",

    blacksmith_insufficient_crystals: "強化クリスタルが不足しています。",
    blacksmith_no_crystals: "強化クリスタルがありません。",
    blacksmith_no_equipment: "強化可能な装備がありません。",
    dungeon_cooldown_remaining: "{floor}階ダンジョンクエストはあと{remaining}日投稿できません。",
    dungeon_post_available: "この階層は投稿可能です。",
    trade_insufficient_stock: "在庫不足: {item}",
    trade_insufficient_gold: "ゴールド不足: 購入コスト {cost}g 必要（現在: {current}g）",
    trade_quest_description: "貿易クエスト: {cityName}（往路{outLoad}/100・復路{inLoad}/100・所要{totalDays}日）",
    trade_rank: "交易",
    trade_post_success: "貿易クエストを投稿しました！冒険者を最低1人割り当てて派遣してください（確定成功）。",
    trade_form_title: "{city} への貿易",
    trade_back_to_board: "← 掲示板に戻る",
    trade_table_resource: "資源",
    trade_table_stock: "所持数",
    trade_table_sell_qty: "売却数",
    trade_table_sell_price: "売却単価",
    trade_table_buy_qty: "購入数",
    trade_table_buy_price: "購入単価",
    trade_specialty_marker: " ★",
    trade_calc_button: "計算",
    trade_post_button: "貿易クエスト投稿",
    trade_load_exceed: "負荷超過（最大100単位/方向）",
    trade_outbound_load: "往路負荷: {out}/100（{days}日）",
    trade_return_load: "復路負荷: {in}/100（{days}日）",
    trade_total_days: "合計所要日数: {days}日（確定成功）",
    trade_revenue: "売却収益: ",
    trade_cost: "購入コスト: ",
    trade_profit: "予想純利益: ",
    trade_profit_note: "（完了時加算）",
    trade_required_gold: "必要ゴールド: ",
    trade_deduct_note: "（投稿時扣除）",
    trade_gold_insufficient: "ゴールド不足",
    trade_board_title: "貿易掲示板",
    trade_back_to_main: "戻る",
    trade_active_title: "進行中の貿易クエスト",
    trade_remaining_days: "残り{days}日",
    trade_active_note: "（上部のボタンでメニューに戻れます）",
    trade_home_city: "ギルドの街",
    trade_event_label: "[イベント]",
    trade_event_days_left: "残り{days}日",
    trade_table_player_sell_price: "買う",     // プレイヤー視点：売却価格（都市が買う価格）
    trade_table_player_buy_price: "売る",      // プレイヤー視点：購入価格（都市が売る価格）
    trade_start_button: "Trade",
    // 市場イベント名
    market_event_production_boom_name: "増産ブーム",
    market_event_resource_shortage_name: "資源不足",
    market_event_new_mine_name: "新鉱山発見",
    market_event_herb_boom_name: "薬草豊作",
    market_event_spice_festival_name: "スパイス祭",
    market_event_gem_exhibition_name: "宝石展",
    market_event_mine_accident_name: "鉱山事故",
    market_event_epidemic_name: "疫病流行",
    market_event_spice_embargo_name: "香辛料禁輸",
    market_event_gem_theft_name: "宝石盗難事件",
    market_event_capital_construction_name: "王都の大工事",
    market_event_frontier_herbs_name: "辺境の薬草園開拓",
    market_event_adventurer_boom_name: "冒険者ブーム",
    market_event_poor_harvest_name: "不作の年",
    market_event_mining_boom_name: "鉱山開発ブーム",
    market_event_peaceful_trade_name: "交易路の平和",
    market_event_war_outbreak_name: "戦争勃発",
    market_event_noble_weddings_name: "貴族の結婚式ラッシュ",
    market_event_healing_festival_name: "大規模治癒祭",
    market_event_sea_route_open_name: "海路開通",

    // 市場イベント説明
    market_event_production_boom_desc: "全資源が増産され安価",
    market_event_resource_shortage_desc: "全資源が不足し高騰",
    market_event_new_mine_desc: "鉄鉱石が激安",
    market_event_herb_boom_desc: "薬草が激安",
    market_event_spice_festival_desc: "スパイス需要増で高騰",
    market_event_gem_exhibition_desc: "宝石需要増で高騰",
    market_event_mine_accident_desc: "鉄鉱石供給減で高騰",
    market_event_epidemic_desc: "薬草需要急増で高騰",
    market_event_spice_embargo_desc: "スパイスが不足し高騰",
    market_event_gem_theft_desc: "宝石供給減で高騰",
    market_event_capital_construction_desc: "鉄鉱石と宝石需要増",
    market_event_frontier_herbs_desc: "薬草とスパイスが安価",
    market_event_adventurer_boom_desc: "全資源需要増でやや高騰",
    market_event_poor_harvest_desc: "薬草とスパイスが不足",
    market_event_mining_boom_desc: "鉄鉱石と宝石が安価",
    market_event_peaceful_trade_desc: "全資源が安定して安価",
    market_event_war_outbreak_desc: "鉄鉱石需要急増",
    market_event_noble_weddings_desc: "宝石とスパイスが高騰",
    market_event_healing_festival_desc: "薬草需要増で高騰",
    market_event_sea_route_open_desc: "スパイスと宝石が安価に",
    guild_quests_story_main: "ストーリークエスト（メイン）",
    guild_quests_dungeon: "ダンジョンクエスト",
    guild_quests_trade: "トレードクエスト",
    resource_iron_ore: "鉄鉱石",
    resource_medicinal_herb: "薬草",
    resource_spice: "スパイス",
    resource_gem: "宝石",
    city_dragora: "鉱山の街ドラゴラ",
    city_herbria: "緑の里ハーブリア",
    city_spaisis: "香辛の港スパイシス",
    city_gemheart: "輝きの都ジェムハート",
  



  },
  en: {
    page_title: "Journey of the Lost Adventure",
    game_title: "Journey of the Lost Adventure v1.0",
    tutorial: "Tutorial",
    save: "Save",
    load: "Load",
    shop: "Shop",
    characters: "Characters",
    npcs: "NPCs",
    facilities: "Guild Facilities",
    guild_quests: "Guild Quests",
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
    close: "Close",
    prev_page: "Previous",
    next_page: "Next",
    day_format: "Day {day}",
    gold_label: "Gold:",
    reputation_label: "Reputation:",
    tax_today_prefix: "Today's Tax:",
    tax_later_prefix: "Tax in {days} days:",
    game_over_text: "Game Over",
    tutorial_speaker: "narrator",
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
    stat_defense: "Defense",
    no_available_quests: "No available quests.",
    quest_counter: "{current} / {total}",

    no_assignment: "None assigned",
    training_quest_name: "Training Quest",
    no_permanent_adventurers: "No permanent adventurers.",
    prev_character: "‹ Previous",
    next_character: "Next ›",
    status_title: "Status",
    base_stat_label: "Base",
    exp_bar_label: "EXP {exp}/{needed}",
    hp_bar_label: "HP {hp}/{maxHp}",
    mp_bar_label: "MP {mp}/{maxMp}",
    active_buffs_title: "Active Buffs",
    buff_line: "{bonus} {target} ({daysLeft} days left)",
    equipment_title: "Equipment",
    none_equipment: "None",
    unequip_button: "Unequip",
    equippable_title: "Equippable Items",
    equip_button: "Equip",
    potions_title: "Potions",
    potion_hp: "HP +{amount}",
    potion_mp: "MP +{amount}",
    use_button: "Use",
    level_up_title: "Level Up Items",
    level_up_amount: "(+{levels} levels on use)",
    consumables_title: "Consumable Items (Buffs)",
    days_suffix: " days",
    on_quest_cannot_fire: "On Quest - Cannot Dismiss",
    fire_adventurer_button: "Dismiss this Adventurer",
    tavern_strength_soup: "Strength Soup",
    tavern_giant_stew: "Giant's Stew",
    tavern_wisdom_tea: "Wisdom Tea",
    tavern_prophet_drink: "Prophet's Elixir",
    tavern_recovery_bread: "Healing Bread",
    tavern_beast_vitality_stew: "Beast Vitality Stew",
    tavern_fang_steel_power_stew: "Fang-Steel Power Stew",
    tavern_dragon_steel_steak: "Dragon-Steel Drake Steak",
    tavern_titan_power_banquet: "Titan's Power Banquet",
    tavern_ancient_dragon_overlord: "Ancient Dragon Overlord Dish",
    tavern_forest_elixir_tea: "Forest Elixir Tea",
    tavern_holy_purification_tea: "Holy Purification Tea",
    tavern_forbidden_secret_wine: "Forbidden Secret Wine",
    tavern_ether_god_wine: "Ether God Wine",
    tavern_abyss_wisdom_soup: "Abyss Wisdom Soup",
    tavern_river_fish_grill: "Light River Fish Grill",
    tavern_wind_swift_stew: "Wind-Wing Swift Stew",
    tavern_unicorn_agility_salad: "Unicorn Agility Salad",
    tavern_angel_feather_pie: "Angel Feather Pie",
    tavern_sacred_swift_dish: "Sacred Swift Dish",
    tavern_creation_wind_god: "Creation Wind God Dish",
    tavern_rare_spice_luck_boil: "Rare Spice Luck Stew",
    tavern_star_luck_dessert: "Star Luck Dessert",
    tavern_phoenix_regen_cake: "Phoenix Regeneration Cake",
    tavern_god_tear_fortune_soup: "God Tear Fortune Soup",
    tavern_end_luck_banquet: "Apocalypse Luck Banquet",
    tavern_abyss_god_luck: "Abyss God Luck Dish",
    tavern_mushroom_vitality_bread: "Mushroom Vitality Bread",
    tavern_detox_healing_soup: "Detox Healing Soup",
    tavern_angel_divine_bread: "Angel Divine Bread",
    tavern_god_tear_supreme_soup: "God Tear Supreme Soup",
    tavern_world_eternal_bread: "World Source Eternal Bread",
    tavern_small_mp_magic_tea: "Minor Mana Magic Tea",
    tavern_star_wind_tea: "Star Wind Tea",
    tavern_creation_god_wine: "Creation God Wine",
    tavern_ultimate_creation_str: "Creation Source Divine Banquet",
    tavern_ultimate_world_wis: "World Source Wisdom Banquet",
    tavern_ultimate_end_dex: "Apocalypse Swift God Dish",
    tavern_ultimate_source_luc: "Source Stone Eternal Luck Banquet",

    blacksmith_advanced_sword: "Advanced Sword",
    blacksmith_steel_sword: "Steel Sword",
    blacksmith_dragon_slayer: "Dragon Slayer",
    blacksmith_sage_staff: "Sage's Staff",
    blacksmith_mystic_staff: "Mystic Staff",
    blacksmith_refined_greatsword: "Refined Iron Greatsword",
    blacksmith_fang_steel_axe: "Fang-Steel Greataxe",
    blacksmith_dragon_extermination_sword: "Dragon-Steel Slayer Sword",
    blacksmith_titan_war_axe: "Titan War Axe",
    blacksmith_ancient_dragon_sword: "Ancient Dragon Heart Slayer",
    blacksmith_holy_magic_staff: "Holy Magic Staff",
    blacksmith_forbidden_rod: "Forbidden Magic Rod",
    blacksmith_ether_staff: "Ether Crystal Staff",
    blacksmith_abyss_staff: "Abyss Magic Staff",
    blacksmith_light_god_staff: "Light Artifact God Staff",
    blacksmith_beast_skin_dagger: "Beast Skin Dagger",
    blacksmith_wind_wing_bow: "Wind Wing Bow",
    blacksmith_unicorn_dagger: "Unicorn Dagger",
    blacksmith_angel_swift_bow: "Angel Swift Bow",
    blacksmith_sacred_swift_dagger: "Sacred Swift Dagger",
    blacksmith_creation_god_bow: "Creation God Bow",
    blacksmith_rare_spice_club: "Rare Spice Club",
    blacksmith_star_luck_club: "Star Luck Club",
    blacksmith_phoenix_luck_axe: "Phoenix Luck Axe",
    blacksmith_god_tear_fortune_staff: "God Tear Fortune Staff",
    blacksmith_end_luck_sword: "Apocalypse Luck Sword",
    blacksmith_abyss_god_artifact_club: "Abyss God Artifact Club",
    blacksmith_ultimate_creation_sword: "Creation Source God Sword",
    blacksmith_ultimate_world_staff: "World Source God Staff",
    blacksmith_ultimate_end_bow: "Apocalypse God Bow",
    blacksmith_ultimate_source_artifact: "Source Stone Luck God Artifact",
    dialogue_next: "Next",
    dialogue_close: "Close",
    facilities_street_title: "Town",
    facilities_select_prompt: "Please select a facility",
    facilities_blacksmith: "Blacksmith",
    facilities_tavern: "Tavern",
    facilities_alchemy: "Alchemy Workshop",
    facilities_level_title: "{title} - Level {level}",
    facilities_back_to_street: "Back to Town",
    facilities_upgrade_cost: "Upgrade Level {level} → {next} Cost: {cost} gold",
    facilities_upgrade_button: "Upgrade",
    facilities_max_level: "Reached maximum level {max}!",
    facilities_craftable_items: "Craftable Items",
    facilities_no_recipes_yet: "New recipes will unlock as you level up",
    facilities_upgrade_to_unlock: "Upgrade the facility to unlock features",
    facilities_required_materials: "Required Materials:",
    facilities_none: "None",
    facilities_owned: "Owned: {have}",
    facilities_cost: "Cost: {cost} gold",
    facilities_craft_alchemy: "Synthesize",
    facilities_craft_alchemy_10: "Synthesize 10 times",
    facilities_order_tavern: "Order (Select Adventurer)",
    facilities_produce_blacksmith: "Craft",

    facilities_equip_effect: "Equip Effect: {stat} +{bonus}%",
    facilities_buff_effect: "Buff Effect: {stat} +{bonus}{percent}",
    facilities_buff_effect_type: "Buff Effect: {type} +{bonus}",
    facilities_buff_duration: "Duration: {days} days",
    facilities_potion_effect: "Effect: {type} +{amount}",

    potion_hp: "HP Recovery",
    potion_mp: "MP Recovery",
    buff_hp_regen: "HP Regen",
    buff_mp_regen: "MP Regen",
    sell_no_items: "No items available for sale.",
    sell_quantity: "x{count}",
    sell_price_each: "{price}{unit} each",
    sell_price_total: "total {total}{unit}",
    sell_button: "Sell",
    sell_one_button: "Sell 1",
    sell_all_button: "Sell All",
    sell_equip_bonus: "+{bonus} {stat}",
    gold_unit: "g",

    potion_hp: "HP",
    potion_mp: "MP",
    enhancement_crystal: "Enhancement Crystal",
    dungeon_treasure_gold: "Dungeon Floor {floor} Treasure: +{gold}g",
    item_found: "Found {name}!",
    item_found_qty: "Found {name} x{qty}!",
    rare_indicator: " (Rare!) ",
    dungeon_ring: "Dungeon Floor {floor} {stat} Ring",

    stat_strength_full: "Strength",
    stat_wisdom_full: "Wisdom",
    stat_dexterity_full: "Dexterity",
    stat_luck_full: "Luck",
    percent_symbol: "%",
    absolute_symbol: " (absolute)",
    blacksmith_enhancement_desc: "Use an Enhancement Crystal to permanently increase an equipment's stat bonus by +1 (absolute).<br>The original % bonus is preserved and applied first, followed by the absolute bonus.",
    blacksmith_enhance_button: "Enhance",
    blacksmith_enhance_success: "Enhanced {item}! {stat} +{bonus}% + {enhancement} (absolute)",

    blacksmith_enhancement_title: "Equipment Enhancement",
    blacksmith_insufficient_crystals: "Not enough Enhancement Crystals.",
    blacksmith_no_crystals: "No Enhancement Crystals.",
    blacksmith_no_equipment: "No enhanceable equipment.",
    dungeon_cooldown_remaining: "Dungeon Floor {floor} quest cannot be posted for another {remaining} days.",
    dungeon_post_available: "This floor is available for posting.",
    trade_insufficient_stock: "Insufficient stock: {item}",
    trade_insufficient_gold: "Insufficient gold: Purchase cost {cost}g required (current: {current}g)",
    trade_quest_description: "Trade Quest: {cityName} (Outbound {outLoad}/100 · Return {inLoad}/100 · Duration {totalDays} days)",
    trade_rank: "Trading",
    trade_post_success: "Trade quest posted! Assign at least 1 adventurer and dispatch (guaranteed success).",
    trade_form_title: "Trade with {city}",
    trade_back_to_board: "← Back to Bulletin Board",
    trade_table_resource: "Resource",
    trade_table_stock: "Stock",
    trade_table_sell_qty: "Sell Qty",
    trade_table_sell_price: "Sell Price",
    trade_table_buy_qty: "Buy Qty",
    trade_table_buy_price: "Buy Price",
    trade_specialty_marker: " ★ (Specialty)",
    trade_calc_button: "Calculate",
    trade_post_button: "Post Trade Quest",
    trade_load_exceed: "Load Exceeded (Max 100 units per direction)",
    trade_outbound_load: "Outbound Load: {out}/100 ({days} days)",
    trade_return_load: "Return Load: {in}/100 ({days} days)",
    trade_total_days: "Total Duration: {days} days (Guaranteed Success)",
    trade_revenue: "Sales Revenue: ",
    trade_cost: "Purchase Cost: ",
    trade_profit: "Expected Net Profit: ",
    trade_profit_note: " (Added upon completion)",
    trade_required_gold: "Required Gold: ",
    trade_deduct_note: " (Deducted upon posting)",
    trade_gold_insufficient: "Insufficient Gold",
    trade_board_title: "Trade Bulletin Board",
    trade_back_to_main: "Back",
    trade_active_title: "Active Trade Quest",
    trade_remaining_days: "{days} days remaining",
    trade_active_note: "(Use the top button to return to the menu)",
    trade_home_city: "Guild Town",
    trade_event_label: "[Event]",
    trade_event_days_left: "{days} days left",
    trade_table_player_sell_price: "Bid", // Player's sell price to city
    trade_table_player_buy_price: "Ask",   // Player's buy price from city
    trade_start_button: "Trade",
    market_event_production_boom_name: "Production Boom",
    market_event_resource_shortage_name: "Resource Shortage",
    market_event_new_mine_name: "New Mine Discovery",
    market_event_herb_boom_name: "Herb Bountiful Harvest",
    market_event_spice_festival_name: "Spice Festival",
    market_event_gem_exhibition_name: "Gem Exhibition",
    market_event_mine_accident_name: "Mine Accident",
    market_event_epidemic_name: "Epidemic Outbreak",
    market_event_spice_embargo_name: "Spice Embargo",
    market_event_gem_theft_name: "Gem Theft Incident",
    market_event_capital_construction_name: "Capital Mega-Construction",
    market_event_frontier_herbs_name: "Frontier Herb Garden Development",
    market_event_adventurer_boom_name: "Adventurer Boom",
    market_event_poor_harvest_name: "Poor Harvest Year",
    market_event_mining_boom_name: "Mining Development Boom",
    market_event_peaceful_trade_name: "Peaceful Trade Routes",
    market_event_war_outbreak_name: "War Outbreak",
    market_event_noble_weddings_name: "Noble Wedding Rush",
    market_event_healing_festival_name: "Grand Healing Festival",
    market_event_sea_route_open_name: "New Sea Route Opened",

    market_event_production_boom_desc: "All resources are overproduced and cheap",
    market_event_resource_shortage_desc: "All resources are scarce and expensive",
    market_event_new_mine_desc: "Iron ore is extremely cheap",
    market_event_herb_boom_desc: "Medicinal herbs are extremely cheap",
    market_event_spice_festival_desc: "Spice demand surges → prices soar",
    market_event_gem_exhibition_desc: "Gem demand surges → prices soar",
    market_event_mine_accident_desc: "Iron ore supply drops → prices soar",
    market_event_epidemic_desc: "Herb demand skyrockets → prices soar",
    market_event_spice_embargo_desc: "Spice shortage → prices soar",
    market_event_gem_theft_desc: "Gem supply drops → prices soar",
    market_event_capital_construction_desc: "Iron ore and gems in high demand",
    market_event_frontier_herbs_desc: "Herbs and spices become cheaper",
    market_event_adventurer_boom_desc: "All resources slightly more expensive due to demand",
    market_event_poor_harvest_desc: "Herbs and spices in short supply",
    market_event_mining_boom_desc: "Iron ore and gems become cheaper",
    market_event_peaceful_trade_desc: "All resources stable and slightly cheaper",
    market_event_war_outbreak_desc: "Iron ore demand explodes",
    market_event_noble_weddings_desc: "Gems and spices surge in price",
    market_event_healing_festival_desc: "Herb demand surges → prices soar",
    market_event_sea_route_open_desc: "Spices and gems become cheaper",
    guild_quests_story_main: "Story Quests (Main)",
    guild_quests_dungeon: "Dungeon Quests",
    guild_quests_trade: "Trade Quests",
    resource_iron_ore: "Iron Ore",
    resource_medicinal_herb: "Medicinal Herb",
    resource_spice: "Spices",
    resource_gem: "Gems",
    city_dragora: "Mining Town Dragora",
    city_herbria: "Verdant Village Herbria",
    city_spaisis: "Spice Port Spaisis",
    city_gemheart: "Gem Capital Gemheart",
  },
  zh: {  // Traditional Chinese (繁體中文 - Taiwan/HK style)
    page_title: "失落的冒險之旅",
    game_title: "失落的冒險之旅 v1.0",
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
    tutorial_speaker: "narrator",    
    next_button: "下一頁",
    start_game_button: "開始遊戲",
    intro_title: "甦醒",
    intro_description: "你在失憶的狀態下醒來。<br>名為Luna與Kaito的兩人，自稱是你的青梅竹馬，<br>並準備告訴你你的名字與過去。<br><br>請輸入遊戲中要使用的名字。",
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
    stat_defense: "防御力",
    no_available_quests: "沒有可用任務。",
    quest_counter: "{current} / {total}",

    no_assignment: "尚未分配",
    training_quest_name: "訓練任務",
    no_permanent_adventurers: "沒有常駐冒險者。",
    prev_character: "‹ 上一個",
    next_character: "下一個 ›",
    status_title: "狀態",
    base_stat_label: "基礎",
    exp_bar_label: "EXP {exp}/{needed}",
    hp_bar_label: "HP {hp}/{maxHp}",
    mp_bar_label: "MP {mp}/{maxMp}",
    active_buffs_title: "活躍中的增益",
    buff_line: "{bonus} {target}（剩餘{daysLeft}天）",
    equipment_title: "裝備",
    none_equipment: "無",
    unequip_button: "解除",
    equippable_title: "可裝備物品",
    equip_button: "裝備",
    potions_title: "藥水",
    potion_hp: "HP +{amount}",
    potion_mp: "MP +{amount}",
    use_button: "使用",
    level_up_title: "升級物品",
    level_up_amount: "（使用後等級+{levels}）",
    consumables_title: "消耗品（增益）",
    days_suffix: "天",
    on_quest_cannot_fire: "任務中 - 無法解雇",
    fire_adventurer_button: "解雇此冒險者",
    tavern_strength_soup: "力量湯",
    tavern_giant_stew: "巨人燉煮",
    tavern_wisdom_tea: "智慧茶",
    tavern_prophet_drink: "預言者飲料",
    tavern_recovery_bread: "回復麵包",
    tavern_beast_vitality_stew: "獸肉活力燉湯",
    tavern_fang_steel_power_stew: "牙鋼強力燉煮",
    tavern_dragon_steel_steak: "龍鋼巨龍牛排",
    tavern_titan_power_banquet: "巨神骨力量盛宴",
    tavern_ancient_dragon_overlord: "古龍心霸王料理",
    tavern_forest_elixir_tea: "森林靈藥茶",
    tavern_holy_purification_tea: "聖魔導淨化茶",
    tavern_forbidden_secret_wine: "禁斷魔導秘酒",
    tavern_ether_god_wine: "以太魔晶神酒",
    tavern_abyss_wisdom_soup: "深淵睿智湯",
    tavern_river_fish_grill: "河魚輕盈烤",
    tavern_wind_swift_stew: "風翼迅鳥燉湯",
    tavern_unicorn_agility_salad: "獨角獸敏捷沙拉",
    tavern_angel_feather_pie: "天使輕羽派",
    tavern_sacred_swift_dish: "神聖迅擊料理",
    tavern_creation_wind_god: "創世風神料理",
    tavern_rare_spice_luck_boil: "稀有香料幸運煮",
    tavern_star_luck_dessert: "星星幸運甜點",
    tavern_phoenix_regen_cake: "不死鳥再生蛋糕",
    tavern_god_tear_fortune_soup: "神淚福運湯",
    tavern_end_luck_banquet: "終焉幸運盛宴",
    tavern_abyss_god_luck: "滅亡深淵神運料理",
    tavern_mushroom_vitality_bread: "蘑菇活力麵包",
    tavern_detox_healing_soup: "解毒療癒湯",
    tavern_angel_divine_bread: "天使神聖麵包",
    tavern_god_tear_supreme_soup: "神淚至高湯",
    tavern_world_eternal_bread: "世界源永遠麵包",
    tavern_small_mp_magic_tea: "小魔力魔茶",
    tavern_star_wind_tea: "星風茶",
    tavern_creation_god_wine: "創世神酒",
    tavern_ultimate_creation_str: "創世源神聖盛宴",
    tavern_ultimate_world_wis: "世界源睿智盛宴",
    tavern_ultimate_end_dex: "終焉迅神料理",
    tavern_ultimate_source_luc: "源石永運盛宴",

    blacksmith_advanced_sword: "上級之劍",
    blacksmith_steel_sword: "鋼鐵之劍",
    blacksmith_dragon_slayer: "屠龍劍",
    blacksmith_sage_staff: "賢者之杖",
    blacksmith_mystic_staff: "神秘之杖",
    blacksmith_refined_greatsword: "精鐵大劍",
    blacksmith_fang_steel_axe: "牙鋼雙手斧",
    blacksmith_dragon_extermination_sword: "龍鋼滅殺劍",
    blacksmith_titan_war_axe: "巨神戰斧",
    blacksmith_ancient_dragon_sword: "古龍心滅劍",
    blacksmith_holy_magic_staff: "聖魔導之杖",
    blacksmith_forbidden_rod: "禁斷魔導魔棒",
    blacksmith_ether_staff: "以太魔晶杖",
    blacksmith_abyss_staff: "深淵魔導杖",
    blacksmith_light_god_staff: "光神器神杖",
    blacksmith_beast_skin_dagger: "獸皮短劍",
    blacksmith_wind_wing_bow: "風翼之弓",
    blacksmith_unicorn_dagger: "獨角獸匕首",
    blacksmith_angel_swift_bow: "天使迅弓",
    blacksmith_sacred_swift_dagger: "神聖迅擊短劍",
    blacksmith_creation_god_bow: "創世神弓",
    blacksmith_rare_spice_club: "稀有香料短棍",
    blacksmith_star_luck_club: "星星幸運棍",
    blacksmith_phoenix_luck_axe: "不死鳥幸運斧",
    blacksmith_god_tear_fortune_staff: "神淚福運杖",
    blacksmith_end_luck_sword: "終焉幸運劍",
    blacksmith_abyss_god_artifact_club: "深淵神器棍",
    blacksmith_ultimate_creation_sword: "創世源神劍",
    blacksmith_ultimate_world_staff: "世界源神杖",
    blacksmith_ultimate_end_bow: "終焉神弓",
    blacksmith_ultimate_source_artifact: "源石幸運神器",
    dialogue_next: "下一頁",
    dialogue_close: "關閉",
    // 施設モーダル関連の完全翻訳（繁體中文）
    facilities_street_title: "街道",
    facilities_select_prompt: "請選擇設施",
    facilities_blacksmith: "鍛造屋",
    facilities_tavern: "酒館",
    facilities_alchemy: "煉金工房",

    facilities_level_title: "{title}　等級 {level}",
    facilities_back_to_street: "返回街道",

    facilities_upgrade_cost: "等級 {level} → {next}　升級費用：{cost} 金幣",
    facilities_upgrade_button: "升級",
    facilities_max_level: "已達到最大等級 {max}！",

    facilities_craftable_items: "可製作物品",
    facilities_no_recipes_yet: "提升等級將解鎖新配方",
    facilities_upgrade_to_unlock: "升級設施以解鎖功能",

    facilities_required_materials: "必要素材：",
    facilities_none: "無",
    facilities_owned: "擁有：{have}個",
    facilities_cost: "成本：{cost} 金幣",

    facilities_craft_alchemy: "合成",
    facilities_craft_alchemy_10: "合成10次",
    facilities_order_tavern: "訂購（選擇冒險者）",
    facilities_produce_blacksmith: "製作",

    // 効果関連
    facilities_equip_effect: "裝備效果：{stat} +{bonus}%",
    facilities_buff_effect: "增益效果：{stat} +{bonus}{percent}",
    facilities_buff_effect_type: "增益効果：{type} +{bonus}",
    facilities_buff_duration: "持續：{days}天",
    facilities_potion_effect: "效果：{type} +{amount}",

    // ポーション・バフ種別
    potion_hp: "HP恢復",
    potion_mp: "MP恢復",
    buff_hp_regen: "HP再生",
    buff_mp_regen: "MP再生",

    // ステータス名（施設内の効果表示で使用されるため必須）
    stat_strength: "力量",
    stat_wisdom: "智慧",
    stat_dexterity: "敏捷",
    stat_luck: "幸運",

    // その他、施設内で使う可能性のある補助キー（gold 表示など）
    gold_label: "金幣：",
    sell_no_items: "沒有可賣出的物品。",
    sell_quantity: "x{count}",
    sell_price_each: "{price}{unit}/個",
    sell_price_total: "合計 {total}{unit}",
    sell_button: "賣出",
    sell_one_button: "賣出 1 個",
    sell_all_button: "全部賣出",
    sell_equip_bonus: "+{bonus} {stat}",
    gold_unit: "金",

    potion_hp: "HP",
    potion_mp: "MP",
    enhancement_crystal: "強化水晶",
    dungeon_treasure_gold: "地下城第{floor}層寶箱: +{gold}g",
    item_found: "發現{name}！",
    item_found_qty: "發現{name} x{qty}！",
    rare_indicator: " (稀有！)",
    dungeon_ring: "地下城{floor}層的{stat}戒指",

    stat_strength_full: "力量",
    stat_wisdom_full: "智慧",
    stat_dexterity_full: "敏捷",
    stat_luck_full: "幸運",
    stat_luck_defense: "幸運",
    percent_symbol: "%",
    absolute_symbol: "（絕對值）",
    blacksmith_enhancement_desc: "使用強化水晶永久提升裝備的屬性加成+1（絕對值）。<br>原本的%加成保持不變，先計算%後再加上絕對值。",
    blacksmith_enhance_button: "強化",
    blacksmith_enhance_success: "強化了{item}！ {stat} +{bonus}% + {enhancement}（絕對值）",
    blacksmith_enhancement_title: "裝備強化",


    blacksmith_insufficient_crystals: "強化水晶不足。",
    blacksmith_no_crystals: "沒有強化水晶。",
    blacksmith_no_equipment: "沒有可強化的裝備。",
    dungeon_cooldown_remaining: "第{floor}層地下城任務還需{remaining}天後才能再次投稿。",
    dungeon_post_available: "此層可投稿。",
    trade_insufficient_stock: "庫存不足: {item}",
    trade_insufficient_gold: "金幣不足: 購買成本 {cost}金幣 必要（目前: {current}金幣）",
    trade_quest_description: "貿易任務: {cityName}（去程{outLoad}/100・回程{inLoad}/100・所需{totalDays}天）",
    trade_rank: "交易",
    trade_post_success: "已發布貿易任務！請至少分配1名冒險者並派遣（確定成功）。",
    trade_form_title: "{city} 的貿易",
    trade_back_to_board: "← 返回掲示板",
    trade_table_resource: "資源",
    trade_table_stock: "持有數",
    trade_table_sell_qty: "賣出數",
    trade_table_sell_price: "賣出單價",
    trade_table_buy_qty: "購入數",
    trade_table_buy_price: "購入單價",
    trade_specialty_marker: " ★（特產）",
    trade_calc_button: "計算",
    trade_post_button: "發布貿易任務",
    trade_load_exceed: "負荷超過（最大100單位/方向）",
    trade_outbound_load: "去程負荷: {out}/100（{days}天）",
    trade_return_load: "回程負荷: {in}/100（{days}天）",
    trade_total_days: "合計所需天數: {days}天（確定成功）",
    trade_revenue: "賣出收益: ",
    trade_cost: "購買成本: ",
    trade_profit: "預計純利益: ",
    trade_profit_note: "（完成時加算）",
    trade_required_gold: "必要金幣: ",
    trade_deduct_note: "（投稿時扣除）",
    trade_gold_insufficient: "金幣不足",
    trade_board_title: "貿易掲示板",
    trade_back_to_main: "返回",
    trade_active_title: "進行中的貿易任務",
    trade_remaining_days: "剩餘{days}天",
    trade_active_note: "（使用上方的按鈕返回選單）",
    trade_home_city: "公會城鎮",
    trade_event_label: "[事件]",
    trade_event_days_left: "剩餘{days}天",
    trade_table_player_sell_price: "買價",
    trade_table_player_buy_price: "賣價",
    trade_start_button: "Trade",
    market_event_production_boom_name: "增產熱潮",
    market_event_resource_shortage_name: "資源短缺",
    market_event_new_mine_name: "新礦山發現",
    market_event_herb_boom_name: "藥草豐收",
    market_event_spice_festival_name: "香料祭典",
    market_event_gem_exhibition_name: "寶石展覽",
    market_event_mine_accident_name: "礦山事故",
    market_event_epidemic_name: "疫病流行",
    market_event_spice_embargo_name: "香料禁運",
    market_event_gem_theft_name: "寶石盜竊事件",
    market_event_capital_construction_name: "王都大工程",
    market_event_frontier_herbs_name: "邊境藥草園開拓",
    market_event_adventurer_boom_name: "冒險者熱潮",
    market_event_poor_harvest_name: "歉收之年",
    market_event_mining_boom_name: "礦山開發熱潮",
    market_event_peaceful_trade_name: "交易路和平",
    market_event_war_outbreak_name: "戰爭爆發",
    market_event_noble_weddings_name: "貴族結婚熱潮",
    market_event_healing_festival_name: "大規模治癒祭",
    market_event_sea_route_open_name: "海路開通",

    market_event_production_boom_desc: "所有資源增產，價格低廉",
    market_event_resource_shortage_desc: "所有資源短缺，價格高漲",
    market_event_new_mine_desc: "鐵礦石極度便宜",
    market_event_herb_boom_desc: "藥草極度便宜",
    market_event_spice_festival_desc: "香料需求激增，價格暴漲",
    market_event_gem_exhibition_desc: "寶石需求激增，價格暴漲",
    market_event_mine_accident_desc: "鐵礦石供應減少，價格暴漲",
    market_event_epidemic_desc: "藥草需求急增，價格暴漲",
    market_event_spice_embargo_desc: "香料短缺，價格暴漲",
    market_event_gem_theft_desc: "寶石供應減少，價格暴漲",
    market_event_capital_construction_desc: "鐵礦石與寶石需求增加",
    market_event_frontier_herbs_desc: "藥草與香料價格下降",
    market_event_adventurer_boom_desc: "所有資源因需求略微上漲",
    market_event_poor_harvest_desc: "藥草與香料短缺",
    market_event_mining_boom_desc: "鐵礦石與寶石價格下降",
    market_event_peaceful_trade_desc: "所有資源穩定且略微便宜",
    market_event_war_outbreak_desc: "鐵礦石需求激增",
    market_event_noble_weddings_desc: "寶石與香料價格暴漲",
    market_event_healing_festival_desc: "藥草需求激增，價格暴漲",
    market_event_sea_route_open_desc: "香料與寶石價格下降",
    guild_quests_story_main: "故事任務（主線）",
    guild_quests_dungeon: "地下城任務",
    guild_quests_trade: "貿易任務",
    resource_iron_ore: "鐵礦石",
    resource_medicinal_herb: "藥草",
    resource_spice: "香料",
    resource_gem: "寶石",
    city_dragora: "礦山之街德拉戈拉",
    city_herbria: "綠之里赫布利亞",
    city_spaisis: "香辛港口斯帕伊西斯",
    city_gemheart: "輝耀之都傑姆哈特",
    

  }
};




const tavernRecipes = {
  ja: [
    // === 既存レシピ ===
    {level: 1, name: "力のスープ", buff: {stat: "strength", percent: true, bonus: 20, days: 5}, cost: 250, materials: []},
    {level: 2, name: "巨人の煮込み", buff: {stat: "strength", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "活力の粉", qty: 2}]},
    {level: 1, name: "知恵の茶", buff: {stat: "wisdom", percent: true, bonus: 20, days: 5}, cost: 250, materials: []},
    {level: 2, name: "予言者の飲料", buff: {stat: "wisdom", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "魔法の結晶", qty: 1}]},
    {level: 1, name: "回復のパン", buff: {type: "hpRegen", bonus: 10, days: 14}, cost: 100, materials: []},

    // === STR料理 ===
    {level: 3, name: "獣肉の活力シチュー", buff: {stat: "strength", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "獣皮エキス", qty: 2}, {name: "狼の毛皮", qty: 1}]},
    {level: 5, name: "牙鋼の力強煮込み", buff: {stat: "strength", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "牙鋼インゴット", qty: 2}, {name: "オークの牙", qty: 2}]},
    {level: 7, name: "龍鋼の巨竜ステーキ", buff: {stat: "strength", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "龍鋼装甲材", qty: 3}, {name: "古代ドラゴンの鱗", qty: 2}]},
    {level: 9, name: "巨神骨の力の饗宴", buff: {stat: "strength", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "巨神骨鋼", qty: 3}, {name: "タイタンの骨", qty: 2}]},
    {level: 11, name: "古龍心の覇王料理", buff: {stat: "strength", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "古龍心鋼", qty: 4}, {name: "エルダードラゴンの心臓", qty: 1}]},

    // === WIS料理 ===
    {level: 3, name: "森の霊薬ティー", buff: {stat: "wisdom", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "森のエキス", qty: 3}]},
    {level: 5, name: "聖魔導の浄化茶", buff: {stat: "wisdom", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "聖魔導結晶", qty: 3}, {name: "聖水", qty: 2}]},
    {level: 7, name: "禁断魔導の秘酒", buff: {stat: "wisdom", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "禁断魔導晶", qty: 3}, {name: "禁断の魔導書頁", qty: 2}]},
    {level: 9, name: "エーテル魔晶の神酒", buff: {stat: "wisdom", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "エーテル魔晶", qty: 4}, {name: "エーテルの結晶", qty: 2}]},
    {level: 11, name: "深淵の叡智スープ", buff: {stat: "wisdom", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "深淵エーテル晶", qty: 4}, {name: "深淵の核", qty: 1}]},

    // === DEX料理 ===
    {level: 1, name: "川魚の軽やか焼き", buff: {stat: "dexterity", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "川魚", qty: 2}]},
    {level: 3, name: "風翼の迅鳥シチュー", buff: {stat: "dexterity", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "風翼結晶", qty: 2}, {name: "グリフォンの羽", qty: 2}]},
    {level: 5, name: "ユニコーンの敏捷サラダ", buff: {stat: "dexterity", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "ユニコーンの角", qty: 2}, {name: "花", qty: 3}]},
    {level: 7, name: "天使の軽羽パイ", buff: {stat: "dexterity", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "天使の羽", qty: 3}, {name: "天空エキス", qty: 2}]},
    {level: 9, name: "神聖迅撃の料理", buff: {stat: "dexterity", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖な遺物", qty: 2}]},
    {level: 11, name: "創世の風神料理", buff: {stat: "dexterity", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "創世の欠片", qty: 2}, {name: "風翼結晶", qty: 4}]},

    // === LUC料理 ===
    {level: 1, name: "希少スパイスの幸運煮", buff: {stat: "luck", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "希少スパイス", qty: 1}]},
    {level: 3, name: "星の幸運デザート", buff: {stat: "luck", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "星の欠片", qty: 2}]},
    {level: 5, name: "不死鳥の再生ケーキ", buff: {stat: "luck", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "フェニックスの灰", qty: 2}]},
    {level: 7, name: "神涙の福運スープ", buff: {stat: "luck", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "神の涙", qty: 2}, {name: "永劫炎粉", qty: 2}]},
    {level: 9, name: "終焉の幸運饗宴", buff: {stat: "luck", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "終焉破壊粉", qty: 3}, {name: "滅びの結晶", qty: 2}]},
    {level: 11, name: "滅び深淵の神運料理", buff: {stat: "luck", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "滅び深淵晶", qty: 4}, {name: "世界の源石", qty: 1}]},

    // === 回復/再生系 ===
    {level: 2, name: "キノコの活力パン", buff: {type: "hpRegen", bonus: 15, days: 14}, cost: 200, materials: [{name: "キノコ", qty: 3}]},
    {level: 4, name: "解毒聖水の癒しスープ", buff: {type: "hpRegen", bonus: 20, days: 14}, cost: 300, materials: [{name: "解毒聖水", qty: 2}]},
    {level: 6, name: "天使癒薬の神パン", buff: {type: "hpRegen", bonus: 25, days: 14}, cost: 400, materials: [{name: "天使癒薬", qty: 2}]},
    {level: 8, name: "神涙神薬の至高スープ", buff: {type: "hpRegen", bonus: 30, days: 14}, cost: 500, materials: [{name: "神涙神薬", qty: 1}]},
    {level: 10, name: "世界源神薬の永遠パン", buff: {type: "hpRegen", bonus: 35, days: 14}, cost: 600, materials: [{name: "世界源神薬", qty: 1}]},

    {level: 3, name: "小魔力ポーションの魔茶", buff: {type: "mpRegen", bonus: 30, days: 8}, cost: 1500, materials: [{name: "小魔力ポーション", qty: 2}]},
    {level: 6, name: "星風ポーションの星茶", buff: {type: "mpRegen", bonus: 80, days: 15}, cost: 5200, materials: [{name: "星風ポーション", qty: 2}]},
    {level: 9, name: "創世魔力薬の神酒", buff: {type: "mpRegen", bonus: 150, days: 25}, cost: 11800, materials: [{name: "創世魔力薬", qty: 1}]},

    // === 究極バフ料理 ===
    {level: 12, name: "創世源の神饗宴", buff: {stat: "strength", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世源ポーション", qty: 1}, {name: "古龍心鋼", qty: 4}]},
    {level: 12, name: "世界源の叡智宴", buff: {stat: "wisdom", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神薬", qty: 1}, {name: "光神器晶", qty: 4}]},
    {level: 12, name: "終焉の迅神料理", buff: {stat: "dexterity", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世魔力薬", qty: 1}, {name: "神聖遺晶", qty: 4}]},
    {level: 12, name: "源石の永運饗宴", buff: {stat: "luck", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神薬", qty: 1}, {name: "滅び深淵晶", qty: 4}]}
  ],
  en: [
    {level: 1, name: "Strength Soup", buff: {stat: "strength", percent: true, bonus: 20, days: 5}, cost: 250, materials: []},
    {level: 2, name: "Giant's Stew", buff: {stat: "strength", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "Vitality Powder", qty: 2}]},
    {level: 1, name: "Wisdom Tea", buff: {stat: "wisdom", percent: true, bonus: 20, days: 5}, cost: 250, materials: []},
    {level: 2, name: "Prophet's Elixir", buff: {stat: "wisdom", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "Magic Crystal", qty: 1}]},
    {level: 1, name: "Healing Bread", buff: {type: "hpRegen", bonus: 10, days: 14}, cost: 100, materials: []},

    {level: 3, name: "Beast Vitality Stew", buff: {stat: "strength", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Beast Skin Extract", qty: 2}, {name: "Wolf Pelt", qty: 1}]},
    {level: 5, name: "Fang-Steel Power Stew", buff: {stat: "strength", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Fang Steel Ingot", qty: 2}, {name: "Orc Tusk", qty: 2}]},
    {level: 7, name: "Dragon-Steel Drake Steak", buff: {stat: "strength", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Dragon Steel Armor Material", qty: 3}, {name: "Ancient Dragon Scale", qty: 2}]},
    {level: 9, name: "Titan's Power Banquet", buff: {stat: "strength", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Titan Bone Steel", qty: 3}, {name: "Titan Bone", qty: 2}]},
    {level: 11, name: "Ancient Dragon Overlord Dish", buff: {stat: "strength", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Ancient Dragon Heart Steel", qty: 4}, {name: "Elder Dragon Heart", qty: 1}]},

    {level: 3, name: "Forest Elixir Tea", buff: {stat: "wisdom", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Forest Extract", qty: 3}]},
    {level: 5, name: "Holy Purification Tea", buff: {stat: "wisdom", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Holy Magic Crystal", qty: 3}, {name: "Holy Water", qty: 2}]},
    {level: 7, name: "Forbidden Secret Wine", buff: {stat: "wisdom", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Forbidden Magic Crystal", qty: 3}, {name: "Forbidden Grimoire Page", qty: 2}]},
    {level: 9, name: "Aether God Wine", buff: {stat: "wisdom", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Aether Magic Crystal", qty: 4}, {name: "Aether Crystal", qty: 2}]},
    {level: 11, name: "Abyss Wisdom Soup", buff: {stat: "wisdom", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Abyss Aether Crystal", qty: 4}, {name: "Abyss Core", qty: 1}]},

    {level: 1, name: "Light River Fish Grill", buff: {stat: "dexterity", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "River Fish", qty: 2}]},
    {level: 3, name: "Wind-Wing Swift Stew", buff: {stat: "dexterity", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Wind Wing Crystal", qty: 2}, {name: "Griffon Feather", qty: 2}]},
    {level: 5, name: "Unicorn Agility Salad", buff: {stat: "dexterity", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Unicorn Horn", qty: 2}, {name: "Flower", qty: 3}]},
    {level: 7, name: "Angel Feather Pie", buff: {stat: "dexterity", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Angel Feather", qty: 3}, {name: "Sky Extract", qty: 2}]},
    {level: 9, name: "Sacred Swift Dish", buff: {stat: "dexterity", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Sacred Relic Crystal", qty: 3}, {name: "Sacred Relic", qty: 2}]},
    {level: 11, name: "Creation Wind God Dish", buff: {stat: "dexterity", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Creation Fragment", qty: 2}, {name: "Wind Wing Crystal", qty: 4}]},

    {level: 1, name: "Rare Spice Luck Stew", buff: {stat: "luck", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "Rare Spice", qty: 1}]},
    {level: 3, name: "Star Luck Dessert", buff: {stat: "luck", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Star Fragment", qty: 2}]},
    {level: 5, name: "Phoenix Regeneration Cake", buff: {stat: "luck", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Phoenix Flame Powder", qty: 3}, {name: "Phoenix Ash", qty: 2}]},
    {level: 7, name: "Divine Tear Fortune Soup", buff: {stat: "luck", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Divine Tear", qty: 2}, {name: "Eternal Calamity Flame Powder", qty: 2}]},
    {level: 9, name: "Apocalypse Luck Banquet", buff: {stat: "luck", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Apocalypse Destruction Powder", qty: 3}, {name: "Crystal of Destruction", qty: 2}]},
    {level: 11, name: "Abyss God Luck Dish", buff: {stat: "luck", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Destruction Abyss Crystal", qty: 4}, {name: "World Origin Stone", qty: 1}]},

    {level: 2, name: "Mushroom Vitality Bread", buff: {type: "hpRegen", bonus: 15, days: 14}, cost: 200, materials: [{name: "Mushroom", qty: 3}]},
    {level: 4, name: "Detoxified Healing Soup", buff: {type: "hpRegen", bonus: 20, days: 14}, cost: 300, materials: [{name: "Detoxified Holy Water", qty: 2}]},
    {level: 6, name: "Angel Divine Bread", buff: {type: "hpRegen", bonus: 25, days: 14}, cost: 400, materials: [{name: "Angel Healing Potion", qty: 2}]},
    {level: 8, name: "Divine Tear Supreme Soup", buff: {type: "hpRegen", bonus: 30, days: 14}, cost: 500, materials: [{name: "Divine Tear Divine Potion", qty: 1}]},
    {level: 10, name: "World Source Eternal Bread", buff: {type: "hpRegen", bonus: 35, days: 14}, cost: 600, materials: [{name: "World Source Divine Potion", qty: 1}]},

    {level: 3, name: "Minor Mana Magic Tea", buff: {type: "mpRegen", bonus: 30, days: 8}, cost: 1500, materials: [{name: "Minor Mana Potion", qty: 2}]},
    {level: 6, name: "Star Wind Tea", buff: {type: "mpRegen", bonus: 80, days: 15}, cost: 5200, materials: [{name: "Star Wind Potion", qty: 2}]},
    {level: 9, name: "Creation God Wine", buff: {type: "mpRegen", bonus: 150, days: 25}, cost: 11800, materials: [{name: "Creation Mana Potion", qty: 1}]},

    {level: 12, name: "Creation Source Divine Banquet", buff: {stat: "strength", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "Creation Source Potion", qty: 1}, {name: "Ancient Dragon Heart Steel", qty: 4}]},
    {level: 12, name: "World Source Wisdom Banquet", buff: {stat: "wisdom", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Light Artifact Crystal", qty: 4}]},
    {level: 12, name: "Apocalypse Swift God Dish", buff: {stat: "dexterity", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "Creation Mana Potion", qty: 1}, {name: "Sacred Relic Crystal", qty: 4}]},
    {level: 12, name: "Source Stone Eternal Luck Banquet", buff: {stat: "luck", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Destruction Abyss Crystal", qty: 4}]}
  ],
  zh: [
    {level: 1, name: "力量湯", buff: {stat: "strength", percent: true, bonus: 20, days: 5}, cost: 250, materials: []},
    {level: 2, name: "巨人燉煮", buff: {stat: "strength", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "活力粉末", qty: 2}]},
    {level: 1, name: "智慧茶", buff: {stat: "wisdom", percent: true, bonus: 20, days: 5}, cost: 250, materials: []},
    {level: 2, name: "預言者飲料", buff: {stat: "wisdom", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "魔法結晶", qty: 1}]},
    {level: 1, name: "回復麵包", buff: {type: "hpRegen", bonus: 10, days: 14}, cost: 100, materials: []},

    {level: 3, name: "獸肉活力燉湯", buff: {stat: "strength", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "獸皮精華", qty: 2}, {name: "狼皮", qty: 1}]},
    {level: 5, name: "牙鋼強力燉煮", buff: {stat: "strength", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "牙鋼錠", qty: 2}, {name: "獸人獠牙", qty: 2}]},
    {level: 7, name: "龍鋼巨龍牛排", buff: {stat: "strength", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "龍鋼裝甲材", qty: 3}, {name: "古代龍鱗", qty: 2}]},
    {level: 9, name: "巨神骨力量盛宴", buff: {stat: "strength", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "巨神骨鋼", qty: 3}, {name: "泰坦骨頭", qty: 2}]},
    {level: 11, name: "古龍心霸王料理", buff: {stat: "strength", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "古龍心鋼", qty: 4}, {name: "長老龍之心", qty: 1}]},

    {level: 3, name: "森林靈藥茶", buff: {stat: "wisdom", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "森林精華", qty: 3}]},
    {level: 5, name: "聖魔導淨化茶", buff: {stat: "wisdom", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "聖魔導結晶", qty: 3}, {name: "聖水", qty: 2}]},
    {level: 7, name: "禁斷魔導秘酒", buff: {stat: "wisdom", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "禁斷魔導晶", qty: 3}, {name: "禁斷魔導書頁", qty: 2}]},
    {level: 9, name: "以太魔晶神酒", buff: {stat: "wisdom", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "以太魔晶", qty: 4}, {name: "以太結晶", qty: 2}]},
    {level: 11, name: "深淵睿智湯", buff: {stat: "wisdom", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "深淵以太晶", qty: 4}, {name: "深淵核心", qty: 1}]},

    {level: 1, name: "河魚輕盈烤", buff: {stat: "dexterity", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "河魚", qty: 2}]},
    {level: 3, name: "風翼迅鳥燉湯", buff: {stat: "dexterity", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "風翼結晶", qty: 2}, {name: "獅鷲羽毛", qty: 2}]},
    {level: 5, name: "獨角獸敏捷沙拉", buff: {stat: "dexterity", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "獨角獸角", qty: 2}, {name: "花朵", qty: 3}]},
    {level: 7, name: "天使輕羽派", buff: {stat: "dexterity", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "天使羽毛", qty: 3}, {name: "天空精華", qty: 2}]},
    {level: 9, name: "神聖迅擊料理", buff: {stat: "dexterity", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖遺物", qty: 2}]},
    {level: 11, name: "創世風神料理", buff: {stat: "dexterity", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "創世碎片", qty: 2}, {name: "風翼結晶", qty: 4}]},

    {level: 1, name: "稀有香料幸運煮", buff: {stat: "luck", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "稀有香料", qty: 1}]},
    {level: 3, name: "星星幸運甜點", buff: {stat: "luck", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "星之碎片", qty: 2}]},
    {level: 5, name: "不死鳥再生蛋糕", buff: {stat: "luck", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "鳳凰灰燼", qty: 2}]},
    {level: 7, name: "神淚福運湯", buff: {stat: "luck", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "神之淚", qty: 2}, {name: "永劫炎粉", qty: 2}]},
    {level: 9, name: "終焉幸運盛宴", buff: {stat: "luck", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "終焉破壞粉", qty: 3}, {name: "滅亡結晶", qty: 2}]},
    {level: 11, name: "滅亡深淵神運料理", buff: {stat: "luck", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "滅亡深淵晶", qty: 4}, {name: "世界源石", qty: 1}]},

    {level: 2, name: "蘑菇活力麵包", buff: {type: "hpRegen", bonus: 15, days: 14}, cost: 200, materials: [{name: "蘑菇", qty: 3}]},
    {level: 4, name: "解毒療癒湯", buff: {type: "hpRegen", bonus: 20, days: 14}, cost: 300, materials: [{name: "解毒聖水", qty: 2}]},
    {level: 6, name: "天使神聖麵包", buff: {type: "hpRegen", bonus: 25, days: 14}, cost: 400, materials: [{name: "天使癒藥", qty: 2}]},
    {level: 8, name: "神淚至高湯", buff: {type: "hpRegen", bonus: 30, days: 14}, cost: 500, materials: [{name: "神淚神藥", qty: 1}]},
    {level: 10, name: "世界源永遠麵包", buff: {type: "hpRegen", bonus: 35, days: 14}, cost: 600, materials: [{name: "世界源神藥", qty: 1}]},

    {level: 3, name: "小型魔力魔茶", buff: {type: "mpRegen", bonus: 30, days: 8}, cost: 1500, materials: [{name: "小型魔力藥劑", qty: 2}]},
    {level: 6, name: "星風茶", buff: {type: "mpRegen", bonus: 80, days: 15}, cost: 5200, materials: [{name: "星風藥劑", qty: 2}]},
    {level: 9, name: "創世神酒", buff: {type: "mpRegen", bonus: 150, days: 25}, cost: 11800, materials: [{name: "創世魔力藥", qty: 1}]},

    {level: 12, name: "創世源神聖盛宴", buff: {stat: "strength", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世源藥劑", qty: 1}, {name: "古龍心鋼", qty: 4}]},
    {level: 12, name: "世界源睿智盛宴", buff: {stat: "wisdom", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神藥", qty: 1}, {name: "光神器晶", qty: 4}]},
    {level: 12, name: "終焉迅神料理", buff: {stat: "dexterity", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世魔力藥", qty: 1}, {name: "神聖遺晶", qty: 4}]},
    {level: 12, name: "源石永運盛宴", buff: {stat: "luck", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神藥", qty: 1}, {name: "滅亡深淵晶", qty: 4}]}
  ]
};

const blacksmithRecipes = {
  ja: [
    {level: 1, name: "木製の盾", stat: "defense", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "鉄の盾", stat: "defense", bonus: 25, cost: 1200, materials: [{name: "鋼のインゴット", qty: 3}]},
    {level: 3, name: "精鉄の守護盾", stat: "defense", bonus: 38, cost: 2200, materials: [{name: "精鉄インゴット", qty: 4}]},
    {level: 5, name: "牙鋼の守護盾", stat: "defense", bonus: 65, cost: 4800, materials: [{name: "牙鋼インゴット", qty: 3}, {name: "オークの牙", qty: 2}]},
    {level: 7, name: "龍鋼の守護盾", stat: "defense", bonus: 95, cost: 8500, materials: [{name: "龍鋼装甲材", qty: 4}, {name: "古代ドラゴンの鱗", qty: 2}]},
    {level: 9, name: "巨神の守護盾", stat: "defense", bonus: 140, cost: 14500, materials: [{name: "巨神骨鋼", qty: 3}, {name: "タイタンの骨", qty: 3}]},
    {level: 11, name: "古龍心の守護盾", stat: "defense", bonus: 220, cost: 28500, materials: [{name: "古龍心鋼", qty: 4}, {name: "エルダードラゴンの心臓", qty: 1}]},
    {level: 12, name: "創世源の守護神盾", stat: "defense", bonus: 350, cost: 50000, materials: [{name: "創世源ポーション", qty: 1}, {name: "古龍心鋼", qty: 5}]},

    {level: 1, name: "上級の剣", stat: "strength", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "鋼鉄の剣", stat: "strength", bonus: 25, cost: 1200, materials: [{name: "鋼のインゴット", qty: 3}]},
    {level: 4, name: "ドラゴンスレイヤー", stat: "strength", bonus: 45, cost: 3000, materials: [{name: "魔法の結晶", qty: 2}, {name: "鋼のインゴット", qty: 5}]},
    {level: 1, name: "賢者の杖", stat: "wisdom", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "神秘の杖", stat: "wisdom", bonus: 25, cost: 1200, materials: [{name: "魔法の結晶", qty: 2}]},

    {level: 3, name: "精鉄の大剣", stat: "strength", bonus: 38, cost: 2200, materials: [{name: "精鉄インゴット", qty: 4}]},
    {level: 5, name: "牙鋼の両手斧", stat: "strength", bonus: 65, cost: 4800, materials: [{name: "牙鋼インゴット", qty: 3}, {name: "オークの牙", qty: 2}]},
    {level: 7, name: "龍鋼の滅殺剣", stat: "strength", bonus: 95, cost: 8500, materials: [{name: "龍鋼装甲材", qty: 4}, {name: "古代ドラゴンの鱗", qty: 2}]},
    {level: 9, name: "巨神の戦斧", stat: "strength", bonus: 140, cost: 14500, materials: [{name: "巨神骨鋼", qty: 3}, {name: "タイタンの骨", qty: 3}]},
    {level: 11, name: "古龍心滅剣", stat: "strength", bonus: 220, cost: 28500, materials: [{name: "古龍心鋼", qty: 4}, {name: "エルダードラゴンの心臓", qty: 1}]},

    {level: 3, name: "聖魔導の杖", stat: "wisdom", bonus: 38, cost: 2200, materials: [{name: "聖魔導結晶", qty: 3}]},
    {level: 5, name: "禁断魔導のロッド", stat: "wisdom", bonus: 65, cost: 4800, materials: [{name: "禁断魔導晶", qty: 3}, {name: "禁断の魔導書頁", qty: 2}]},
    {level: 7, name: "エーテル魔晶杖", stat: "wisdom", bonus: 95, cost: 8500, materials: [{name: "エーテル魔晶", qty: 4}, {name: "エーテルの結晶", qty: 2}]},
    {level: 9, name: "深淵の魔導杖", stat: "wisdom", bonus: 140, cost: 14500, materials: [{name: "深淵エーテル晶", qty: 3}, {name: "深淵の核", qty: 2}]},
    {level: 11, name: "光神器の神杖", stat: "wisdom", bonus: 220, cost: 28500, materials: [{name: "光神器晶", qty: 4}, {name: "光の神器の欠片", qty: 1}]},

    {level: 1, name: "獣皮の短剣", stat: "dexterity", bonus: 12, cost: 400, materials: [{name: "獣皮エキス", qty: 2}]},
    {level: 3, name: "風翼の弓", stat: "dexterity", bonus: 38, cost: 2200, materials: [{name: "風翼結晶", qty: 3}, {name: "グリフォンの羽", qty: 2}]},
    {level: 5, name: "ユニコーンのダガー", stat: "dexterity", bonus: 65, cost: 4800, materials: [{name: "ユニコーンの角", qty: 2}, {name: "獣皮エキス", qty: 3}]},
    {level: 7, name: "天使の迅弓", stat: "dexterity", bonus: 95, cost: 8500, materials: [{name: "天使の羽", qty: 3}, {name: "風翼結晶", qty: 2}]},
    {level: 9, name: "神聖迅撃短剣", stat: "dexterity", bonus: 140, cost: 14500, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖な遺物", qty: 2}]},
    {level: 11, name: "創世の神弓", stat: "dexterity", bonus: 220, cost: 28500, materials: [{name: "創世の欠片", qty: 2}, {name: "風翼結晶", qty: 4}]},

    {level: 1, name: "希少スパイスの短棍", stat: "luck", bonus: 12, cost: 400, materials: [{name: "希少活力粉", qty: 2}]},
    {level: 3, name: "星の幸運棍", stat: "luck", bonus: 38, cost: 2200, materials: [{name: "星の欠片", qty: 2}]},
    {level: 5, name: "不死鳥の幸運斧", stat: "luck", bonus: 65, cost: 4800, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "フェニックスの灰", qty: 2}]},
    {level: 7, name: "神涙の福杖", stat: "luck", bonus: 95, cost: 8500, materials: [{name: "神の涙", qty: 2}, {name: "永劫炎粉", qty: 2}]},
    {level: 9, name: "終焉の幸運剣", stat: "luck", bonus: 140, cost: 14500, materials: [{name: "終焉破壊粉", qty: 3}, {name: "滅びの結晶", qty: 2}]},
    {level: 11, name: "滅び深淵の神器棍", stat: "luck", bonus: 220, cost: 28500, materials: [{name: "滅び深淵晶", qty: 4}, {name: "世界の源石", qty: 1}]},

    {level: 12, name: "創世源の神剣", stat: "strength", bonus: 350, cost: 50000, materials: [{name: "創世源ポーション", qty: 1}, {name: "古龍心鋼", qty: 5}]},
    {level: 12, name: "世界源の神杖", stat: "wisdom", bonus: 350, cost: 50000, materials: [{name: "世界源神薬", qty: 1}, {name: "光神器晶", qty: 5}]},
    {level: 12, name: "終焉の神弓", stat: "dexterity", bonus: 350, cost: 50000, materials: [{name: "創世魔力薬", qty: 1}, {name: "神聖遺晶", qty: 5}]},
    {level: 12, name: "源石の幸運神器", stat: "luck", bonus: 350, cost: 50000, materials: [{name: "世界源神薬", qty: 1}, {name: "滅び深淵晶", qty: 5}]}
  ],
  en: [

    {level: 1, name: "Wooden Shield", stat: "defense", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "Iron Shield", stat: "defense", bonus: 25, cost: 1200, materials: [{name: "Steel Ingot", qty: 3}]},
    {level: 3, name: "Refined Iron Guardian Shield", stat: "defense", bonus: 38, cost: 2200, materials: [{name: "Refined Iron Ingot", qty: 4}]},
    {level: 5, name: "Fang-Steel Guardian Shield", stat: "defense", bonus: 65, cost: 4800, materials: [{name: "Fang Steel Ingot", qty: 3}, {name: "Orc Tusk", qty: 2}]},
    {level: 7, name: "Dragon-Steel Guardian Shield", stat: "defense", bonus: 95, cost: 8500, materials: [{name: "Dragon Steel Armor Material", qty: 4}, {name: "Ancient Dragon Scale", qty: 2}]},
    {level: 9, name: "Titan Guardian Shield", stat: "defense", bonus: 140, cost: 14500, materials: [{name: "Titan Bone Steel", qty: 3}, {name: "Titan Bone", qty: 3}]},
    {level: 11, name: "Ancient Dragon Heart Guardian Shield", stat: "defense", bonus: 220, cost: 28500, materials: [{name: "Ancient Dragon Heart Steel", qty: 4}, {name: "Elder Dragon Heart", qty: 1}]},
    {level: 12, name: "Creation Source Guardian God Shield", stat: "defense", bonus: 350, cost: 50000, materials: [{name: "Creation Source Potion", qty: 1}, {name: "Ancient Dragon Heart Steel", qty: 5}]},


    {level: 1, name: "Advanced Sword", stat: "strength", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "Steel Sword", stat: "strength", bonus: 25, cost: 1200, materials: [{name: "Steel Ingot", qty: 3}]},
    {level: 4, name: "Dragon Slayer", stat: "strength", bonus: 45, cost: 3000, materials: [{name: "Magic Crystal", qty: 2}, {name: "Steel Ingot", qty: 5}]},
    {level: 1, name: "Sage's Staff", stat: "wisdom", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "Mystic Staff", stat: "wisdom", bonus: 25, cost: 1200, materials: [{name: "Magic Crystal", qty: 2}]},

    {level: 3, name: "Refined Iron Greatsword", stat: "strength", bonus: 38, cost: 2200, materials: [{name: "Refined Iron Ingot", qty: 4}]},
    {level: 5, name: "Fang-Steel Greataxe", stat: "strength", bonus: 65, cost: 4800, materials: [{name: "Fang Steel Ingot", qty: 3}, {name: "Orc Tusk", qty: 2}]},
    {level: 7, name: "Dragon-Steel Slayer Sword", stat: "strength", bonus: 95, cost: 8500, materials: [{name: "Dragon Steel Armor Material", qty: 4}, {name: "Ancient Dragon Scale", qty: 2}]},
    {level: 9, name: "Titan War Axe", stat: "strength", bonus: 140, cost: 14500, materials: [{name: "Titan Bone Steel", qty: 3}, {name: "Titan Bone", qty: 3}]},
    {level: 11, name: "Ancient Dragon Heart Slayer", stat: "strength", bonus: 220, cost: 28500, materials: [{name: "Ancient Dragon Heart Steel", qty: 4}, {name: "Elder Dragon Heart", qty: 1}]},

    {level: 3, name: "Holy Magic Staff", stat: "wisdom", bonus: 38, cost: 2200, materials: [{name: "Holy Magic Crystal", qty: 3}]},
    {level: 5, name: "Forbidden Magic Rod", stat: "wisdom", bonus: 65, cost: 4800, materials: [{name: "Forbidden Magic Crystal", qty: 3}, {name: "Forbidden Grimoire Page", qty: 2}]},
    {level: 7, name: "Aether Crystal Staff", stat: "wisdom", bonus: 95, cost: 8500, materials: [{name: "Aether Magic Crystal", qty: 4}, {name: "Aether Crystal", qty: 2}]},
    {level: 9, name: "Abyss Magic Staff", stat: "wisdom", bonus: 140, cost: 14500, materials: [{name: "Abyss Aether Crystal", qty: 3}, {name: "Abyss Core", qty: 2}]},
    {level: 11, name: "Light Artifact God Staff", stat: "wisdom", bonus: 220, cost: 28500, materials: [{name: "Light Artifact Crystal", qty: 4}, {name: "Light Artifact Fragment", qty: 1}]},

    {level: 1, name: "Beast Skin Dagger", stat: "dexterity", bonus: 12, cost: 400, materials: [{name: "Beast Skin Extract", qty: 2}]},
    {level: 3, name: "Wind Wing Bow", stat: "dexterity", bonus: 38, cost: 2200, materials: [{name: "Wind Wing Crystal", qty: 3}, {name: "Griffon Feather", qty: 2}]},
    {level: 5, name: "Unicorn Dagger", stat: "dexterity", bonus: 65, cost: 4800, materials: [{name: "Unicorn Horn", qty: 2}, {name: "Beast Skin Extract", qty: 3}]},
    {level: 7, name: "Angel Swift Bow", stat: "dexterity", bonus: 95, cost: 8500, materials: [{name: "Angel Feather", qty: 3}, {name: "Wind Wing Crystal", qty: 2}]},
    {level: 9, name: "Sacred Swift Dagger", stat: "dexterity", bonus: 140, cost: 14500, materials: [{name: "Sacred Relic Crystal", qty: 3}, {name: "Sacred Relic", qty: 2}]},
    {level: 11, name: "Creation God Bow", stat: "dexterity", bonus: 220, cost: 28500, materials: [{name: "Creation Fragment", qty: 2}, {name: "Wind Wing Crystal", qty: 4}]},

    {level: 1, name: "Rare Spice Club", stat: "luck", bonus: 12, cost: 400, materials: [{name: "Rare Vitality Powder", qty: 2}]},
    {level: 3, name: "Star Luck Club", stat: "luck", bonus: 38, cost: 2200, materials: [{name: "Star Fragment", qty: 2}]},
    {level: 5, name: "Phoenix Luck Axe", stat: "luck", bonus: 65, cost: 4800, materials: [{name: "Phoenix Flame Powder", qty: 3}, {name: "Phoenix Ash", qty: 2}]},
    {level: 7, name: "Divine Tear Fortune Staff", stat: "luck", bonus: 95, cost: 8500, materials: [{name: "Divine Tear", qty: 2}, {name: "Eternal Calamity Flame Powder", qty: 2}]},
    {level: 9, name: "Apocalypse Luck Sword", stat: "luck", bonus: 140, cost: 14500, materials: [{name: "Apocalypse Destruction Powder", qty: 3}, {name: "Crystal of Destruction", qty: 2}]},
    {level: 11, name: "Abyss God Artifact Club", stat: "luck", bonus: 220, cost: 28500, materials: [{name: "Destruction Abyss Crystal", qty: 4}, {name: "World Origin Stone", qty: 1}]},

    {level: 12, name: "Creation Source God Sword", stat: "strength", bonus: 350, cost: 50000, materials: [{name: "Creation Source Potion", qty: 1}, {name: "Ancient Dragon Heart Steel", qty: 5}]},
    {level: 12, name: "World Source God Staff", stat: "wisdom", bonus: 350, cost: 50000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Light Artifact Crystal", qty: 5}]},
    {level: 12, name: "Apocalypse God Bow", stat: "dexterity", bonus: 350, cost: 50000, materials: [{name: "Creation Mana Potion", qty: 1}, {name: "Sacred Relic Crystal", qty: 5}]},
    {level: 12, name: "Source Stone Luck God Artifact", stat: "luck", bonus: 350, cost: 50000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Destruction Abyss Crystal", qty: 5}]}
  ],
  zh: [

    {level: 1, name: "木製之盾", stat: "defense", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "鐵之盾", stat: "defense", bonus: 25, cost: 1200, materials: [{name: "鋼錠", qty: 3}]},
    {level: 3, name: "精鐵守護盾", stat: "defense", bonus: 38, cost: 2200, materials: [{name: "精鐵錠", qty: 4}]},
    {level: 5, name: "牙鋼守護盾", stat: "defense", bonus: 65, cost: 4800, materials: [{name: "牙鋼錠", qty: 3}, {name: "獸人獠牙", qty: 2}]},
    {level: 7, name: "龍鋼守護盾", stat: "defense", bonus: 95, cost: 8500, materials: [{name: "龍鋼裝甲材", qty: 4}, {name: "古代龍鱗", qty: 2}]},
    {level: 9, name: "巨神守護盾", stat: "defense", bonus: 140, cost: 14500, materials: [{name: "巨神骨鋼", qty: 3}, {name: "泰坦骨頭", qty: 3}]},
    {level: 11, name: "古龍心守護盾", stat: "defense", bonus: 220, cost: 28500, materials: [{name: "古龍心鋼", qty: 4}, {name: "長老龍之心", qty: 1}]},
    {level: 12, name: "創世源守護神盾", stat: "defense", bonus: 350, cost: 50000, materials: [{name: "創世源藥劑", qty: 1}, {name: "古龍心鋼", qty: 5}]},
    
    
    {level: 1, name: "上級之劍", stat: "strength", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "鋼鐵之劍", stat: "strength", bonus: 25, cost: 1200, materials: [{name: "鋼錠", qty: 3}]},
    {level: 4, name: "屠龍劍", stat: "strength", bonus: 45, cost: 3000, materials: [{name: "魔法結晶", qty: 2}, {name: "鋼錠", qty: 5}]},
    {level: 1, name: "賢者之杖", stat: "wisdom", bonus: 12, cost: 400, materials: []},
    {level: 2, name: "神秘之杖", stat: "wisdom", bonus: 25, cost: 1200, materials: [{name: "魔法結晶", qty: 2}]},

    {level: 3, name: "精鐵大劍", stat: "strength", bonus: 38, cost: 2200, materials: [{name: "精鐵錠", qty: 4}]},
    {level: 5, name: "牙鋼雙手斧", stat: "strength", bonus: 65, cost: 4800, materials: [{name: "牙鋼錠", qty: 3}, {name: "獸人獠牙", qty: 2}]},
    {level: 7, name: "龍鋼滅殺劍", stat: "strength", bonus: 95, cost: 8500, materials: [{name: "龍鋼裝甲材", qty: 4}, {name: "古代龍鱗", qty: 2}]},
    {level: 9, name: "巨神戰斧", stat: "strength", bonus: 140, cost: 14500, materials: [{name: "巨神骨鋼", qty: 3}, {name: "泰坦骨頭", qty: 3}]},
    {level: 11, name: "古龍心滅劍", stat: "strength", bonus: 220, cost: 28500, materials: [{name: "古龍心鋼", qty: 4}, {name: "長老龍之心", qty: 1}]},

    {level: 3, name: "聖魔導之杖", stat: "wisdom", bonus: 38, cost: 2200, materials: [{name: "聖魔導結晶", qty: 3}]},
    {level: 5, name: "禁斷魔導魔棒", stat: "wisdom", bonus: 65, cost: 4800, materials: [{name: "禁斷魔導晶", qty: 3}, {name: "禁斷魔導書頁", qty: 2}]},
    {level: 7, name: "以太魔晶杖", stat: "wisdom", bonus: 95, cost: 8500, materials: [{name: "以太魔晶", qty: 4}, {name: "以太結晶", qty: 2}]},
    {level: 9, name: "深淵魔導杖", stat: "wisdom", bonus: 140, cost: 14500, materials: [{name: "深淵以太晶", qty: 3}, {name: "深淵核心", qty: 2}]},
    {level: 11, name: "光神器神杖", stat: "wisdom", bonus: 220, cost: 28500, materials: [{name: "光神器晶", qty: 4}, {name: "光之神器碎片", qty: 1}]},

    {level: 1, name: "獸皮短劍", stat: "dexterity", bonus: 12, cost: 400, materials: [{name: "獸皮精華", qty: 2}]},
    {level: 3, name: "風翼之弓", stat: "dexterity", bonus: 38, cost: 2200, materials: [{name: "風翼結晶", qty: 3}, {name: "獅鷲羽毛", qty: 2}]},
    {level: 5, name: "獨角獸匕首", stat: "dexterity", bonus: 65, cost: 4800, materials: [{name: "獨角獸角", qty: 2}, {name: "獸皮精華", qty: 3}]},
    {level: 7, name: "天使迅弓", stat: "dexterity", bonus: 95, cost: 8500, materials: [{name: "天使羽毛", qty: 3}, {name: "風翼結晶", qty: 2}]},
    {level: 9, name: "神聖迅擊短劍", stat: "dexterity", bonus: 140, cost: 14500, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖遺物", qty: 2}]},
    {level: 11, name: "創世神弓", stat: "dexterity", bonus: 220, cost: 28500, materials: [{name: "創世碎片", qty: 2}, {name: "風翼結晶", qty: 4}]},

    {level: 1, name: "稀有香料短棍", stat: "luck", bonus: 12, cost: 400, materials: [{name: "稀有活力粉末", qty: 2}]},
    {level: 3, name: "星星幸運棍", stat: "luck", bonus: 38, cost: 2200, materials: [{name: "星之碎片", qty: 2}]},
    {level: 5, name: "不死鳥幸運斧", stat: "luck", bonus: 65, cost: 4800, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "鳳凰灰燼", qty: 2}]},
    {level: 7, name: "神淚福運杖", stat: "luck", bonus: 95, cost: 8500, materials: [{name: "神之淚", qty: 2}, {name: "永劫炎粉", qty: 2}]},
    {level: 9, name: "終焉幸運劍", stat: "luck", bonus: 140, cost: 14500, materials: [{name: "終焉破壞粉", qty: 3}, {name: "滅亡結晶", qty: 2}]},
    {level: 11, name: "深淵神器棍", stat: "luck", bonus: 220, cost: 28500, materials: [{name: "滅亡深淵晶", qty: 4}, {name: "世界源石", qty: 1}]},

    {level: 12, name: "創世源神劍", stat: "strength", bonus: 350, cost: 50000, materials: [{name: "創世源藥劑", qty: 1}, {name: "古龍心鋼", qty: 5}]},
    {level: 12, name: "世界源神杖", stat: "wisdom", bonus: 350, cost: 50000, materials: [{name: "世界源神藥", qty: 1}, {name: "光神器晶", qty: 5}]},
    {level: 12, name: "終焉神弓", stat: "dexterity", bonus: 350, cost: 50000, materials: [{name: "創世魔力藥", qty: 1}, {name: "神聖遺晶", qty: 5}]},
    {level: 12, name: "源石幸運神器", stat: "luck", bonus: 350, cost: 50000, materials: [{name: "世界源神藥", qty: 1}, {name: "滅亡深淵晶", qty: 5}]}
  ]
};

const alchemyRecipes = {
  ja: [
    // === 既存 + F/F+ (レベル1: 序盤基本合成) ===
    {level: 1, inputs: ["薬草", "鉄鉱石"], output: {name: "鋼のインゴット", type: "material", minPrice: 60, maxPrice: 100}},
    {level: 1, inputs: ["スパイス", "薬草"], output: {name: "活力の粉", type: "material", minPrice: 35, maxPrice: 55}},
    {level: 1, inputs: ["宝石", "活力の粉"], output: {name: "魔法の結晶", type: "material", minPrice: 140, maxPrice: 220}},
    {level: 1, inputs: ["鉄鉱石", "スパイス"], output: {name: "炎の粉", type: "material", minPrice: 50, maxPrice: 80}},
    {level: 1, inputs: ["薬草", "活力の粉"], output: {name: "上級HPポーション", type: "potion", restore: "hp", amount: 60, minPrice: 120, maxPrice: 180}},
    {level: 1, inputs: ["魔法の結晶", "スパイス"], output: {name: "上級MPポーション", type: "potion", restore: "mp", amount: 120, minPrice: 95, maxPrice: 145}},

    {level: 1, inputs: ["キノコ", "薬草"], output: {name: "キノコ回復薬", type: "potion", restore: "hp", amount: 100, minPrice: 35, maxPrice: 55}},
    {level: 1, inputs: ["花", "普通の薬草"], output: {name: "花の霊薬", type: "potion", restore: "mp", amount: 60, minPrice: 25, maxPrice: 45}},
    {level: 1, inputs: ["川魚", "キノコ"], output: {name: "魚介滋養スープ", type: "potion", restore: "hp", amount: 150, minPrice: 50, maxPrice: 80}},
    {level: 1, inputs: ["鉄の欠片", "薬草"], output: {name: "鉄草合金粉", type: "material", minPrice: 40, maxPrice: 70}},
    {level: 1, inputs: ["花", "キノコ"], output: {name: "森のエキス", type: "material", minPrice: 25, maxPrice: 45}},

    // === D/D+ (レベル2: 中盤強化) ===
    {level: 2, inputs: ["狼の毛皮", "活力の粉"], output: {name: "獣活力軟膏", type: "potion", restore: "hp", amount: 200, minPrice: 85, maxPrice: 135}},
    {level: 2, inputs: ["魔力の結晶（小）", "花の霊薬"], output: {name: "小魔力ポーション", type: "potion", restore: "mp", amount: 80, minPrice: 75, maxPrice: 115}},
    {level: 2, inputs: ["鉄の欠片", "鉄鉱石"], output: {name: "精鉄インゴット", type: "material", minPrice: 75, maxPrice: 115}},
    {level: 2, inputs: ["狼の毛皮", "森のエキス"], output: {name: "獣皮エキス", type: "material", minPrice: 80, maxPrice: 130}},

    {level: 2, inputs: ["オークの牙", "鋼のインゴット"], output: {name: "牙鋼インゴット", type: "material", minPrice: 170, maxPrice: 270}},
    {level: 2, inputs: ["古代の巻物断片", "魔力の結晶（小）"], output: {name: "古魔導粉", type: "material", minPrice: 150, maxPrice: 240}},
    {level: 2, inputs: ["希少スパイス", "上級HPポーション"], output: {name: "スパイシー超HP薬", type: "potion", restore: "hp", amount: 300, minPrice: 250, maxPrice: 390}},
    {level: 2, inputs: ["希少スパイス", "薬草"], output: {name: "希少活力粉", type: "material", minPrice: 105, maxPrice: 165}},

    // === C/C+ (レベル3: 後半高級合成) ===
    {level: 3, inputs: ["グリフォンの羽", "魔法の結晶"], output: {name: "風翼結晶", type: "material", minPrice: 380, maxPrice: 580}},
    {level: 3, inputs: ["ヒドラの毒袋", "聖水"], output: {name: "解毒聖水", type: "potion", restore: "hp", amount: 400, minPrice: 460, maxPrice: 700}},
    {level: 3, inputs: ["聖水", "古魔導粉"], output: {name: "聖魔導結晶", type: "material", minPrice: 410, maxPrice: 630}},
    {level: 3, inputs: ["グリフォンの羽", "森のエキス"], output: {name: "天空エキス", type: "potion", restore: "mp", amount: 70, minPrice: 245, maxPrice: 375}},

    {level: 3, inputs: ["ユニコーンの角", "聖水"], output: {name: "ユニコーン浄化薬", type: "potion", restore: "hp", amount: 500, minPrice: 650, maxPrice: 990}},
    {level: 3, inputs: ["禁断の魔導書頁", "聖魔導結晶"], output: {name: "禁断魔導晶", type: "material", minPrice: 860, maxPrice: 1300}},
    {level: 3, inputs: ["フェニックスの灰", "炎の粉"], output: {name: "不死鳥炎粉", type: "material", minPrice: 620, maxPrice: 940}},
    {level: 3, inputs: ["星の欠片", "風翼結晶"], output: {name: "星風ポーション", type: "potion", restore: "mp", amount: 100, minPrice: 890, maxPrice: 1350}},
    {level: 3, inputs: ["天使の羽", "解毒聖水"], output: {name: "天使癒薬", type: "potion", restore: "hp", amount: 600, minPrice: 1020, maxPrice: 1540}},
    {level: 3, inputs: ["デーモンの心臓", "希少活力粉"], output: {name: "魔心活力剤", type: "potion", restore: "mp", amount: 110, minPrice: 780, maxPrice: 1180}},

    // === B+/A + A+/S + 究極 (レベル4: エンドコンテンツ至高合成) ===
    {level: 4, inputs: ["古代ドラゴンの鱗", "牙鋼インゴット"], output: {name: "龍鋼装甲材", type: "material", minPrice: 1580, maxPrice: 2380}},
    {level: 4, inputs: ["エーテルの結晶", "禁断魔導晶"], output: {name: "エーテル魔晶", type: "material", minPrice: 1980, maxPrice: 2980}},
    {level: 4, inputs: ["神の涙", "天使癒薬"], output: {name: "神涙神薬", type: "potion", restore: "hp", amount: 700, minPrice: 1900, maxPrice: 2860}},
    {level: 4, inputs: ["タイタンの骨", "精鉄インゴット"], output: {name: "巨神骨鋼", type: "material", minPrice: 1740, maxPrice: 2620}},
    {level: 4, inputs: ["永遠の炎", "不死鳥炎粉"], output: {name: "永劫炎粉", type: "material", minPrice: 1660, maxPrice: 2500}},
    {level: 4, inputs: ["神聖な遺物", "聖魔導結晶"], output: {name: "神聖遺晶", type: "material", minPrice: 1820, maxPrice: 2740}},

    {level: 4, inputs: ["エルダードラゴンの心臓", "龍鋼装甲材"], output: {name: "古龍心鋼", type: "material", minPrice: 3660, maxPrice: 5500}},
    {level: 4, inputs: ["深淵の核", "エーテル魔晶"], output: {name: "深淵エーテル晶", type: "material", minPrice: 4220, maxPrice: 6340}},
    {level: 4, inputs: ["光の神器の欠片", "神聖遺晶"], output: {name: "光神器晶", type: "material", minPrice: 3980, maxPrice: 5980}},
    {level: 4, inputs: ["世界の源石", "神涙神薬"], output: {name: "世界源神薬", type: "potion", restore: "hp", amount: 800, minPrice: 5580, maxPrice: 8380}},
    {level: 4, inputs: ["創世の欠片", "星風ポーション"], output: {name: "創世魔力薬", type: "potion", restore: "mp", amount: 400, minPrice: 5020, maxPrice: 7540}},
    {level: 4, inputs: ["滅びの結晶", "永劫炎粉"], output: {name: "終焉破壊粉", type: "material", minPrice: 4700, maxPrice: 7060}},

    {level: 4, inputs: ["世界の源石", "創世の欠片"], output: {name: "創世源ポーション", type: "potion", restore: "hp", amount: 1500, minPrice: 10240, maxPrice: 15360}},
    {level: 4, inputs: ["滅びの結晶", "深淵の核"], output: {name: "滅び深淵晶", type: "material", minPrice: 9440, maxPrice: 14160}}
  ],
  en: [
    // === Level 1: Early game basics ===
    {level: 1, inputs: ["Herb", "Iron Ore"], output: {name: "Steel Ingot", type: "material", minPrice: 60, maxPrice: 100}},
    {level: 1, inputs: ["Spice", "Herb"], output: {name: "Vitality Powder", type: "material", minPrice: 35, maxPrice: 55}},
    {level: 1, inputs: ["Gem", "Vitality Powder"], output: {name: "Magic Crystal", type: "material", minPrice: 140, maxPrice: 220}},
    {level: 1, inputs: ["Iron Ore", "Spice"], output: {name: "Flame Powder", type: "material", minPrice: 50, maxPrice: 80}},
    {level: 1, inputs: ["Herb", "Vitality Powder"], output: {name: "Advanced HP Potion", type: "potion", restore: "hp", amount: 60, minPrice: 120, maxPrice: 180}},
    {level: 1, inputs: ["Magic Crystal", "Spice"], output: {name: "Advanced MP Potion", type: "potion", restore: "mp", amount: 45, minPrice: 95, maxPrice: 145}},

    {level: 1, inputs: ["Mushroom", "Herb"], output: {name: "Mushroom Healing Potion", type: "potion", restore: "hp", amount: 100, minPrice: 35, maxPrice: 55}},
    {level: 1, inputs: ["Flower", "Common Herb"], output: {name: "Flower Elixir", type: "potion", restore: "mp", amount: 20, minPrice: 25, maxPrice: 45}},
    {level: 1, inputs: ["River Fish", "Mushroom"], output: {name: "Seafood Nourishing Soup", type: "potion", restore: "hp", amount: 150, minPrice: 50, maxPrice: 80}},
    {level: 1, inputs: ["Iron Scrap", "Herb"], output: {name: "Iron Herb Alloy Powder", type: "material", minPrice: 40, maxPrice: 70}},
    {level: 1, inputs: ["Flower", "Mushroom"], output: {name: "Forest Extract", type: "material", minPrice: 25, maxPrice: 45}},

    // === Level 2: Mid-game enhancements ===
    {level: 2, inputs: ["Wolf Pelt", "Vitality Powder"], output: {name: "Beast Vitality Ointment", type: "potion", restore: "hp", amount: 200, minPrice: 85, maxPrice: 135}},
    {level: 2, inputs: ["Small Mana Crystal", "Flower Elixir"], output: {name: "Minor Mana Potion", type: "potion", restore: "mp", amount: 35, minPrice: 75, maxPrice: 115}},
    {level: 2, inputs: ["Iron Scrap", "Iron Ore"], output: {name: "Refined Iron Ingot", type: "material", minPrice: 75, maxPrice: 115}},
    {level: 2, inputs: ["Wolf Pelt", "Forest Extract"], output: {name: "Beast Skin Extract", type: "material", minPrice: 80, maxPrice: 130}},

    {level: 2, inputs: ["Orc Tusk", "Steel Ingot"], output: {name: "Fang Steel Ingot", type: "material", minPrice: 170, maxPrice: 270}},
    {level: 2, inputs: ["Ancient Scroll Fragment", "Small Mana Crystal"], output: {name: "Ancient Magic Powder", type: "material", minPrice: 150, maxPrice: 240}},
    {level: 2, inputs: ["Rare Spice", "Advanced HP Potion"], output: {name: "Spicy Super HP Potion", type: "potion", restore: "hp", amount: 300, minPrice: 250, maxPrice: 390}},
    {level: 2, inputs: ["Rare Spice", "Herb"], output: {name: "Rare Vitality Powder", type: "material", minPrice: 105, maxPrice: 165}},

    // === Level 3: Late-game high-tier synthesis ===
    {level: 3, inputs: ["Griffon Feather", "Magic Crystal"], output: {name: "Wind Wing Crystal", type: "material", minPrice: 380, maxPrice: 580}},
    {level: 3, inputs: ["Hydra Venom Sac", "Holy Water"], output: {name: "Detoxified Holy Water", type: "potion", restore: "hp", amount: 400, minPrice: 460, maxPrice: 700}},
    {level: 3, inputs: ["Holy Water", "Ancient Magic Powder"], output: {name: "Holy Magic Crystal", type: "material", minPrice: 410, maxPrice: 630}},
    {level: 3, inputs: ["Griffon Feather", "Forest Extract"], output: {name: "Sky Extract", type: "potion", restore: "mp", amount: 70, minPrice: 245, maxPrice: 375}},

    {level: 3, inputs: ["Unicorn Horn", "Holy Water"], output: {name: "Unicorn Purification Potion", type: "potion", restore: "hp", amount: 500, minPrice: 650, maxPrice: 990}},
    {level: 3, inputs: ["Forbidden Grimoire Page", "Holy Magic Crystal"], output: {name: "Forbidden Magic Crystal", type: "material", minPrice: 860, maxPrice: 1300}},
    {level: 3, inputs: ["Phoenix Ash", "Flame Powder"], output: {name: "Phoenix Flame Powder", type: "material", minPrice: 620, maxPrice: 940}},
    {level: 3, inputs: ["Star Fragment", "Wind Wing Crystal"], output: {name: "Star Wind Potion", type: "potion", restore: "mp", amount: 100, minPrice: 890, maxPrice: 1350}},
    {level: 3, inputs: ["Angel Feather", "Detoxified Holy Water"], output: {name: "Angel Healing Potion", type: "potion", restore: "hp", amount: 600, minPrice: 1020, maxPrice: 1540}},
    {level: 3, inputs: ["Demon Heart", "Rare Vitality Powder"], output: {name: "Demon Heart Vitality Agent", type: "potion", restore: "mp", amount: 110, minPrice: 780, maxPrice: 1180}},

    // === Level 4: Endgame ultimate synthesis ===
    {level: 4, inputs: ["Ancient Dragon Scale", "Fang Steel Ingot"], output: {name: "Dragon Steel Armor Material", type: "material", minPrice: 1580, maxPrice: 2380}},
    {level: 4, inputs: ["Aether Crystal", "Forbidden Magic Crystal"], output: {name: "Aether Magic Crystal", type: "material", minPrice: 1980, maxPrice: 2980}},
    {level: 4, inputs: ["Divine Tear", "Angel Healing Potion"], output: {name: "Divine Tear Divine Potion", type: "potion", restore: "hp", amount: 700, minPrice: 1900, maxPrice: 2860}},
    {level: 4, inputs: ["Titan Bone", "Refined Iron Ingot"], output: {name: "Titan Bone Steel", type: "material", minPrice: 1740, maxPrice: 2620}},
    {level: 4, inputs: ["Eternal Flame", "Phoenix Flame Powder"], output: {name: "Eternal Calamity Flame Powder", type: "material", minPrice: 1660, maxPrice: 2500}},
    {level: 4, inputs: ["Sacred Relic", "Holy Magic Crystal"], output: {name: "Sacred Relic Crystal", type: "material", minPrice: 1820, maxPrice: 2740}},

    {level: 4, inputs: ["Elder Dragon Heart", "Dragon Steel Armor Material"], output: {name: "Ancient Dragon Heart Steel", type: "material", minPrice: 3660, maxPrice: 5500}},
    {level: 4, inputs: ["Abyss Core", "Aether Magic Crystal"], output: {name: "Abyss Aether Crystal", type: "material", minPrice: 4220, maxPrice: 6340}},
    {level: 4, inputs: ["Light Artifact Fragment", "Sacred Relic Crystal"], output: {name: "Light Artifact Crystal", type: "material", minPrice: 3980, maxPrice: 5980}},
    {level: 4, inputs: ["World Origin Stone", "Divine Tear Divine Potion"], output: {name: "World Source Divine Potion", type: "potion", restore: "hp", amount: 800, minPrice: 5580, maxPrice: 8380}},
    {level: 4, inputs: ["Creation Fragment", "Star Wind Potion"], output: {name: "Creation Mana Potion", type: "potion", restore: "mp", amount: 400, minPrice: 5020, maxPrice: 7540}},
    {level: 4, inputs: ["Crystal of Destruction", "Eternal Calamity Flame Powder"], output: {name: "Apocalypse Destruction Powder", type: "material", minPrice: 4700, maxPrice: 7060}},

    {level: 4, inputs: ["World Origin Stone", "Creation Fragment"], output: {name: "Creation Source Potion", type: "potion", restore: "hp", amount: 1500, minPrice: 10240, maxPrice: 15360}},
    {level: 4, inputs: ["Crystal of Destruction", "Abyss Core"], output: {name: "Destruction Abyss Crystal", type: "material", minPrice: 9440, maxPrice: 14160}}
  ],
  zh: [
    // === 等級1: 序盤基礎合成 ===
    {level: 1, inputs: ["藥草", "鐵礦石"], output: {name: "鋼錠", type: "material", minPrice: 60, maxPrice: 100}},
    {level: 1, inputs: ["香料", "藥草"], output: {name: "活力粉末", type: "material", minPrice: 35, maxPrice: 55}},
    {level: 1, inputs: ["寶石", "活力粉末"], output: {name: "魔法結晶", type: "material", minPrice: 140, maxPrice: 220}},
    {level: 1, inputs: ["鐵礦石", "香料"], output: {name: "炎之粉", type: "material", minPrice: 50, maxPrice: 80}},
    {level: 1, inputs: ["藥草", "活力粉末"], output: {name: "上級HP藥劑", type: "potion", restore: "hp", amount: 60, minPrice: 120, maxPrice: 180}},
    {level: 1, inputs: ["魔法結晶", "香料"], output: {name: "上級MP藥劑", type: "potion", restore: "mp", amount: 45, minPrice: 95, maxPrice: 145}},

    {level: 1, inputs: ["蘑菇", "藥草"], output: {name: "蘑菇回復藥", type: "potion", restore: "hp", amount: 100, minPrice: 35, maxPrice: 55}},
    {level: 1, inputs: ["花朵", "白色的花"], output: {name: "花之靈藥", type: "potion", restore: "mp", amount: 20, minPrice: 25, maxPrice: 45}},
    {level: 1, inputs: ["河魚", "蘑菇"], output: {name: "海鮮滋養湯", type: "potion", restore: "hp", amount: 150, minPrice: 50, maxPrice: 80}},
    {level: 1, inputs: ["鐵碎片", "藥草"], output: {name: "鐵草合金粉", type: "material", minPrice: 40, maxPrice: 70}},
    {level: 1, inputs: ["花朵", "蘑菇"], output: {name: "森林精華", type: "material", minPrice: 25, maxPrice: 45}},

    // === 等級2: 中盤強化 ===
    {level: 2, inputs: ["狼皮", "活力粉末"], output: {name: "獸類活力軟膏", type: "potion", restore: "hp", amount: 200, minPrice: 85, maxPrice: 135}},
    {level: 2, inputs: ["小型魔力結晶", "花之靈藥"], output: {name: "小型魔力藥劑", type: "potion", restore: "mp", amount: 35, minPrice: 75, maxPrice: 115}},
    {level: 2, inputs: ["鐵碎片", "鐵礦石"], output: {name: "精鐵錠", type: "material", minPrice: 75, maxPrice: 115}},
    {level: 2, inputs: ["狼皮", "森林精華"], output: {name: "獸皮精華", type: "material", minPrice: 80, maxPrice: 130}},

    {level: 2, inputs: ["獸人獠牙", "鋼錠"], output: {name: "牙鋼錠", type: "material", minPrice: 170, maxPrice: 270}},
    {level: 2, inputs: ["古代卷軸碎片", "小型魔力結晶"], output: {name: "古魔導粉", type: "material", minPrice: 150, maxPrice: 240}},
    {level: 2, inputs: ["稀有香料", "上級HP藥劑"], output: {name: "辣味超HP藥", type: "potion", restore: "hp", amount: 300, minPrice: 250, maxPrice: 390}},
    {level: 2, inputs: ["稀有香料", "藥草"], output: {name: "稀有活力粉末", type: "material", minPrice: 105, maxPrice: 165}},

    // === 等級3: 後半高級合成 ===
    {level: 3, inputs: ["獅鷲羽毛", "魔法結晶"], output: {name: "風翼結晶", type: "material", minPrice: 380, maxPrice: 580}},
    {level: 3, inputs: ["九頭蛇毒囊", "聖水"], output: {name: "解毒聖水", type: "potion", restore: "hp", amount: 400, minPrice: 460, maxPrice: 700}},
    {level: 3, inputs: ["聖水", "古魔導粉"], output: {name: "聖魔導結晶", type: "material", minPrice: 410, maxPrice: 630}},
    {level: 3, inputs: ["獅鷲羽毛", "森林精華"], output: {name: "天空精華", type: "potion", restore: "mp", amount: 70, minPrice: 245, maxPrice: 375}},

    {level: 3, inputs: ["獨角獸角", "聖水"], output: {name: "獨角獸淨化藥", type: "potion", restore: "hp", amount: 500, minPrice: 650, maxPrice: 990}},
    {level: 3, inputs: ["禁斷魔導書頁", "聖魔導結晶"], output: {name: "禁斷魔導晶", type: "material", minPrice: 860, maxPrice: 1300}},
    {level: 3, inputs: ["鳳凰灰燼", "炎之粉"], output: {name: "不死鳥炎粉", type: "material", minPrice: 620, maxPrice: 940}},
    {level: 3, inputs: ["星之碎片", "風翼結晶"], output: {name: "星風藥劑", type: "potion", restore: "mp", amount: 100, minPrice: 890, maxPrice: 1350}},
    {level: 3, inputs: ["天使羽毛", "解毒聖水"], output: {name: "天使癒藥", type: "potion", restore: "hp", amount: 600, minPrice: 1020, maxPrice: 1540}},
    {level: 3, inputs: ["惡魔之心", "稀有活力粉末"], output: {name: "魔心活力劑", type: "potion", restore: "mp", amount: 110, minPrice: 780, maxPrice: 1180}},

    // === 等級4: 終局至高合成 ===
    {level: 4, inputs: ["古代龍鱗", "牙鋼錠"], output: {name: "龍鋼裝甲材", type: "material", minPrice: 1580, maxPrice: 2380}},
    {level: 4, inputs: ["以太結晶", "禁斷魔導晶"], output: {name: "以太魔晶", type: "material", minPrice: 1980, maxPrice: 2980}},
    {level: 4, inputs: ["神之淚", "天使癒藥"], output: {name: "神淚神藥", type: "potion", restore: "hp", amount: 700, minPrice: 1900, maxPrice: 2860}},
    {level: 4, inputs: ["泰坦骨頭", "精鐵錠"], output: {name: "巨神骨鋼", type: "material", minPrice: 1740, maxPrice: 2620}},
    {level: 4, inputs: ["永恆之焰", "不死鳥炎粉"], output: {name: "永劫炎粉", type: "material", minPrice: 1660, maxPrice: 2500}},
    {level: 4, inputs: ["神聖遺物", "聖魔導結晶"], output: {name: "神聖遺晶", type: "material", minPrice: 1820, maxPrice: 2740}},

    {level: 4, inputs: ["長老龍之心", "龍鋼裝甲材"], output: {name: "古龍心鋼", type: "material", minPrice: 3660, maxPrice: 5500}},
    {level: 4, inputs: ["深淵核心", "以太魔晶"], output: {name: "深淵以太晶", type: "material", minPrice: 4220, maxPrice: 6340}},
    {level: 4, inputs: ["光之神器碎片", "神聖遺晶"], output: {name: "光神器晶", type: "material", minPrice: 3980, maxPrice: 5980}},
    {level: 4, inputs: ["世界源石", "神淚神藥"], output: {name: "世界源神藥", type: "potion", restore: "hp", amount: 800, minPrice: 5580, maxPrice: 8380}},
    {level: 4, inputs: ["創世碎片", "星風藥劑"], output: {name: "創世魔力藥", type: "potion", restore: "mp", amount: 400, minPrice: 5020, maxPrice: 7540}},
    {level: 4, inputs: ["滅亡結晶", "永劫炎粉"], output: {name: "終焉破壞粉", type: "material", minPrice: 4700, maxPrice: 7060}},

    {level: 4, inputs: ["世界源石", "創世碎片"], output: {name: "創世源藥劑", type: "potion", restore: "hp", amount: 1500, minPrice: 10240, maxPrice: 15360}},
    {level: 4, inputs: ["滅亡結晶", "深淵核心"], output: {name: "滅亡深淵晶", type: "material", minPrice: 9440, maxPrice: 14160}}
  ]
};

// Add this to translations.js (near adventurerNames or introDialogues)

const mainCharacterNames = {
  ja: {
    Kaito: 'カイト',
    Luna: 'ルナ'
  },
  en: {
    Kaito: 'Kaito',
    Luna: 'Luna'
  },
  zh: {  // Traditional Chinese (matches intro dialogue translations)
    Kaito: 'Kaito',
    Luna: 'Luna'
  }
};

const adventurerNames = {
  ja: {
    M: [
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
    F: [
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
    M: [
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
    F: [
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
    M: [
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
    F: [
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
        {desc: '薬師のために白い花を{qty}個持ってきて。', itemName: '白い花', minPrice: 15, maxPrice: 30}
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
        {desc: 'Bring {qty} white flower to the apothecary.', itemName: 'White flower', minPrice: 15, maxPrice: 30}
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
        {desc: '為藥師帶來{qty}個白色的花。', itemName: '白色的花', minPrice: 15, maxPrice: 30}
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
    {speaker: translations.ja.tutorial_speaker, text: "「ギルドクエスト」ボタンで自分でクエストを出せる。\nストーリークエスト・ダンジョンクエスト・交易クエストの3種類だ。\n報酬や内容を決めて冒険者を派遣しよう。"},
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
    {speaker: translations.en.tutorial_speaker, text: "The \"Guild Quests\" button lets you create your own quests.\nThere are 3 types: Story, Dungeon, and Trade.\nSet rewards and details, then dispatch adventurers."},
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
        speaker: "{player}",
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
        speaker: "Narrator",
        text: "……在昏暗的房間裡，你緩緩睜開眼睛。<br>頭部沉重，隱隱作痛。你什麼也……什麼也想不起來。<br>連自己的名字都只模糊地浮現。"
    },
    {
        speaker: "Narrator",
        text: "門被打開，兩個身影走了進來。<br>陌生的少女與少年——但他們看到你時，臉上露出安心表情。"
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "{player}！太好了，你醒了……！<br>我們一直很擔心。真的……真的太好了……"
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "喂，{player}。終於醒了啊。<br>醫生也說「不知道什麼時候會醒」呢。<br>……總之，沒事就好。"
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "你是{player}，這間冒險者公會前任會長……你父親的兒子。<br>父親是人人敬重的偉大公會會長……<br>卻在幾年前的一個夜晚，被不知何人突然殺害了。"
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "一點線索都沒有。只是像黑影一樣的傢伙一瞬間……<br>從那之後，冒險者們說「沒有值得信賴的領袖」，一個接一個離開公會。<br>現在只剩下我們三個人了。"
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "但你已經16歲了——可以繼承父親的年紀。<br>我們Luna和Kaito是你的青梅竹馬，一直是最好的朋友。<br>一起重建公會吧。並且要查明父親之死的真相。"
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "對，我們會一直陪在你身邊。<br>如果你成為公會會長，我們會全力幫助你。<br>就像以前一樣，我們三個人一起努力吧。"
    },
    {
        speaker: "{player}",
        text: "……謝謝。但老實說……我什麼都不記得了。<br>我真的是你們所說的那個人嗎？"
    },
    {
        speaker: "Luna",
        image: "Images/ルナ.png",
        text: "沒事的，{player}。<br>醫生說記憶會一點一點回來。<br>現在有我們支持你……一起讓公會恢復昔日的榮光吧。"
    },
    {
        speaker: "Kaito",
        image: "Images/カイト.png",
        text: "就這麼定了，{player}。<br>你是新的公會會長。<br>我們一起把這個公會重新振興起來吧。"
    },
    {
        speaker: "Narrator",
        text: "你仍舊失憶，心中充滿困惑。<br>（我真的是他們所說的「{player}」嗎……？）<br>即便如此，現在只能向前邁進。你選擇繼承父親的遺志，復興公會。"
    },
    {
        speaker: "Narrator",
        text: "就這樣，在Luna與Kaito的幫助下，<br>你開始重建沒落的冒險者公會。<br><br>一邊追查父親之死的真相，一邊讓公會再次偉大——"
    },
    {
        speaker: "Narrator",
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
  console.log("set language to:"+lang);
  applyTranslations();
  

  // Refresh dynamic parts (especially the day display)
  if (typeof updateDay === 'function') {
      updateDay();
  }
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