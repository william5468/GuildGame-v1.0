// translations.js

const translations = {
  ja: {
    "temp_cannot_join_trade": "{name} は一時冒険者なので貿易クエストに参加できません",
    "shop_purchase_success": "{name} x {qty}を購入した、合計：{total}G、残り：{gold}G",
    "buy_10_button":"10個購入",
    "equipment_buyback": "{name}に{amount}Gを支払い、「{item}」を解除しました",
    "card_rank_promotion_bonus": "{name}のランクが{old}→{new}に昇格した！ 好感度 +{bonus}",
    "card_rank_demotion_penalty": "{name}のランクが{old}→{new}に降格した… 好感度 -{penalty}",
    "debt_tomorrow_interest": "明日利息支払い：{amount}G",
"debt_tomorrow_final": "明日満期返済：{amount}G (本金+利息)",
"debt_overdue_simple": "借金満期超過（{count}件）！即時返済必要",
    "payment_today": "今日の支払い: {total}G（税金 {tax}G + 給与 {salary}G）",
"payment_in_days": "{days}日後に支払い: {total}G（税金 {tax}G + 給与 {salary}G）",
    "adventurer_left_low_friendliness": "{name} はギルドマスターへの好感度が低く、ギルドを去りました…",
"multiple_adventurers_left": "{count}人の冒険者が好感度不足でギルドを去りました…（Reputation -{penalty}）",
    "enter_player_name": "名前を入力してください！",
    "import_text_modal_title": "テキストからセーブデータをインポートしてロード",
"import_text_modal_info": "エクスポートされた文字列を以下に貼り付けてください。貼り付け後、「ロード実行」を押すとゲームが直接ロードされます（スロットは使用しません）。",
"import_text_placeholder": "ここにエクスポートされたテキストを貼り付け...",
"import_load_button": "ロード実行",
"import_empty_text": "テキストが空です！",
"import_invalid_format": "無効なデータ形式です（Base64デコード失敗）",
"import_corrupted_data": "データが壊れています（JSON解析失敗）",
"import_success": "テキストからゲームをロードしました！",
    "export_text_modal_title": "現在のゲームをテキストにエクスポート",
"export_text_modal_info": "以下の文字列をコピーして、他のPCやブラウザでインポートできます。この文字列は現在のゲーム状態を完全に表しています。",
"copy_to_clipboard_button": "クリップボードにコピー",
"copy_success": "クリップボードにコピーしました！",
"copy_success_fallback": "コピーしました（古いブラウザモード）",
"close_button": "閉じる",
    "save_slot_select_title": "セーブスロットを選択",
"load_slot_select_title": "ロードスロットを選択",
"slot_label": "スロット {slot}",
"slot_corrupted": "破損",
"slot_empty": "空",
"player_label": "Player",
"gold_unit": "G",
"level_label": "最高レベル",
"overwrite_confirm": "スロット {slot} を上書きしますか？",
"slot_empty_alert": "このスロットは空です！",
"load_confirm": "スロット {slot} からロードしますか？",
"export_text_title": "現在のゲームをテキストにエクスポート",
"export_text_desc": "現在のゲーム状態を文字列として出力（他のPCへ転送可能）",
"import_text_title": "テキストからインポートしてロード",
"import_text_desc": "エクスポートされた文字列を貼り付けて直接ゲームをロード",
"cancel_button": "キャンセル",
    "no_available_adventurers": "今日利用可能な冒険者なし。",
    "invalid_save_slot": "無効なスロット番号です（1～4）",
"game_saved_success": "スロット {slot} にゲームを保存しました！",
    "insufficient_gold": "Goldが不足しています",
    "max_expansion_reached": "最大拡張に達しました（12スロット）",
"expansion_purchased": "ギルドを拡張しました！常駐スロットが {slots} に増加（費用: {cost}G）",
    "guild_rank_display": "{rank}ランク",
    "edit_adventurer_card_title": "{name} のギルドカード編集",
"current_rank": "現在のランク",
"rank_change": "ランク変更",
"preview_salary_label": "選択中の給与プレビュー",
"prohibited_actions_setting": "行動禁止設定",
"prohibit_penalty_note": "（更新時に禁止数×-5の好感度ペナルティ）",
    "current_rank": "現在のランク",
"rank_change": "ランク変更",
"prohibited_actions_setting": "行動禁止設定",
"prohibit_penalty_note": "更新時に禁止数×-5の好感度ペナルティ",
"rank_with_salary": "{rank}ランク ({amount}G / 7 days)",
"rank_too_low_for_quest": "{name}のランク({adv_rank})ではこのクエストに参加できません（必要{quest_rank}以上）",
    "action_prohibited_general": "禁止された行動のため、ギルドで休憩した",
    "card_prohibit_reward": "{name}の禁止行動減少により好感度 +{reward}",
"edit_adventurer_card": "ギルドカード編集",
  "save_card": "保存",
  "card_updated": "{name}のギルドカードを更新しました",
  "card_prohibit_penalty": "{name}の禁止行動増加により好感度 -{penalty}",
  "weekly_salary_paid": "7日ごとの固定給与支払い: {amount}G",
  "card_renew_penalty": "{name}のカード更新により禁止行動{count}個で好感度ペナルティ",
  "rank_too_low_for_quest": "{name}のランク{rank}ではこのクエストに参加できません（必要{rank}以上）",
  "action_prohibited": "{action}は禁止されているためギルドで休憩した",
  "guild_friendliness_decrease_with_player": "ギルド配給食を食べた、{name}の{player}への好感度-{penalty}",
  "guild_master_default": "ギルドマスター", 
    // === translations.js に追加（すべて引用符付きキー）===
"hiring_cost_display": "雇用: {cost}g",
  "permanent_member": "ギルトメンバー",
    "quest_in_progress_no_add": "クエスト進行中は冒険者を追加できません",
  "training_max_2": "トレーニングクエストは最大2人までです。",
  "quest_full": "クエストは満員です",
  "no_mp": "{name}のMPがありません！ポーションで回復するか、回復を待ってください。",
  "daily_rejected_pair": "{name1}と{name2}は今日すでに協力拒否しているため、一緒にクエストに参加できません。",
  "self_reject_low_friendliness": "{name}はチームメンバーとの相性が悪く、自分からクエスト参加を拒否した。（最低好感度{lowest} → 拒否確率{chance}%）",
  "rejected_by_member": "{name}は{member}からクエスト参加を拒否された。（{member}の好感度{final} → 拒否確率{chance}%）",
  "insufficient_gold": "Goldが不足しています",
    "guild_full": "ギルドは満杯です！拡張を購入してさらに募集してください。",
  "adventurer_joined": "{name}が新しいメンバーになりました",
    "facilities_produce_and_stock": "生産して在庫に加える",
"adventurer_starved_to_death": "{name} は飢えで死にました…！",
  "multiple_adventurers_starved": "{count}人の冒険者が飢えで死にました…（Reputation -{penalty}）",
    "tavern_no_stock": "在庫の料理がなく注文できなかった",
  "tavern_food_too_expensive": "料理が高すぎて注文できなかった",
  "tavern_ration_message": " 「ギルド配給食」を渋々食べた（無料）。「まずいが…生きるためだ…」（ギルドマスターへの好感度 -{penalty}）",
  "tavern_no_food_at_all": " 何も食べられず、空腹のまま酒場を後にした…",
  
  "hunger_label": "満腹度",
    "trait.for_adventurers": "対",
"trait.primary_suffix": "主ステータスの冒険者",
"trait.compare_suffix": "の冒険者",
"trait.friendliness_prefix": "好感度",
"trait.action_priority_suffix": "行動優先度",
"trait.initial_prefix": "初期",
"trait.higher": "高い",
"trait.lower": "低い",
"trait.male_adventurers": "男性冒険者",
"trait.female_adventurers": "女性冒険者",
"trait.seniors": "レベルが高い冒険者",
"trait.juniors": "レベルが低い冒険者",
"trait.for_adventurers": "に対する",
"trait.for_actions": "の行動に対する優先度",
"trait.initial": "初期",
"trait.percent_bonus": "{stat} {sign}{value}%",
"trait.friendliness_detail": "好感度{sign}{value} {target}",
"trait.priority_detail": "優先度{sign}{value} {target}",
"trait.primary_adventurers": "{stat}主ステータスの冒険者",
"trait.level_adventurers": "{level_type}冒険者",
"trait.stat_compare_adventurers": "自分より{comp} {stat}の冒険者",
    // Add to translations.ja (inside the ja: { ... } object)
"trait.likes_men": "男性好き",
"trait.likes_women": "女性好き",
"trait.dislikes_men": "男性嫌い",
"trait.dislikes_women": "女性嫌い",
"trait.likes_strength": "力持ち好き",
"trait.likes_wisdom": "賢者好き",
"trait.likes_dexterity": "器用好き",
"trait.likes_luck": "幸運児好き",
"trait.dislikes_strength": "力持ち嫌い",
"trait.dislikes_wisdom": "賢者嫌い",
"trait.dislikes_dexterity": "器用嫌い",
"trait.dislikes_luck": "幸運児嫌い",
"trait.likes_seniors": "先輩好き",
"trait.likes_juniors": "後輩好き",
"trait.dislikes_seniors": "先輩嫌い",
"trait.dislikes_juniors": "後輩嫌い",
"trait.respects_stronger": "自分より強い人を尊敬",
"trait.respects_wiser": "自分より賢い人を尊敬",
"trait.respects_more_dexterous": "自分より器用な人を尊敬",
"trait.envies_luckier": "自分より運が良い人を羨む",
"trait.despises_weaker": "自分より弱い人を軽視",
"trait.despises_dumber": "自分より愚かな人を軽視",
"trait.despises_less_dexterous": "自分より不器用な人を軽視",
"trait.despises_less_lucky": "自分より不運な人を軽視",
"trait.likes_tavern": "酒場好き",
"trait.teetotaler": "下戸",
"trait.likes_blacksmith": "鍛冶好き",
"trait.likes_alchemy": "錬金好き",
"trait.likes_hunting": "狩り好き",
"trait.pacifist": "平和主義",
"trait.likes_gathering": "採取好き",
"trait.reclusive": "引きこもり気味",
"trait.active": "活動的",
"trait.likes_street_walking": "街歩き好き",
"trait.super_strength": "怪力",
"trait.feeble": "非力",
"trait.genius": "天才",
"trait.dimwitted": "愚鈍",
"trait.godly_dexterity": "神業",
"trait.clumsy": "ドジ",
"trait.very_lucky": "強運",
"trait.unlucky": "不運",
"trait.tough": "タフ",
"trait.fragile": "脆い",
"trait.robust": "頑健",
"trait.frail": "虚弱",
"trait.mana_abundant": "魔力豊富",
"trait.mana_poor": "魔力貧弱",
"trait.blessing_of_strength": "力の祝福",
"trait.curse_of_strength": "力の呪い",
"trait.blessing_of_wisdom": "知の祝福",
"trait.curse_of_wisdom": "知の呪い",
"trait.blessing_of_dexterity": "敏の祝福",
"trait.curse_of_dexterity": "敏の呪い",
"trait.blessing_of_luck": "運の祝福",
"trait.curse_of_luck": "運の呪い",
"trait.blessing_of_defense": "守の祝福",
"trait.curse_of_defense": "守の呪い",
"trait.none": "なし",
"trait.effect.friendliness": "好感度",
"trait.effect.priority": "優先度",
"stat.max_hp": "最大HP",
"stat.max_mp": "最大MP",
// Tavern (酒場)
    int_tavern_mutual_laugh: "{a}と{b}は酒を酌み交わしながら大笑いした",
    int_tavern_mutual_food: "{a}と{b}は美味しい料理を分け合った",
    int_tavern_mutual_sing: "{a}と{b}は一緒に歌を歌って盛り上がった",
    int_tavern_mutual_gamble_lose: "{a}と{b}はギャンブルで負けて不機嫌になった",
    int_tavern_mutual_drink_argue: "{a}と{b}は酒の飲み方で軽く言い合いした",
    int_tavern_uni_treat: "{a}は{b}にお酒をおごった",
    int_tavern_uni_treated: "{a}にお酒をおごられた",
    int_tavern_uni_rude_drink: "{a}は{b}の飲み方が下品だと思った",
    int_tavern_uni_criticized: "{a}に飲み方を批判された",
    int_tavern_uni_funny_story: "{a}は{b}の面白い話を聞いて癒された",
    int_tavern_uni_listened: "{a}が自分の話に夢中になってくれた",

    // Blacksmith (鍛冶場)
    int_blacksmith_mutual_polish: "{a}と{b}は互いの武器を磨き合った",
    int_blacksmith_mutual_success: "{a}と{b}は強化成功を一緒に喜んだ",
    int_blacksmith_mutual_failure: "{a}と{b}は強化失敗で落ち込んだ",
    int_blacksmith_mutual_technique_argue: "{a}と{b}は鍛冶の技術で意見が対立した",
    int_blacksmith_uni_tip_learned: "{a}は{b}に鍛冶のコツを教わった",
    int_blacksmith_uni_tip_taught: "{a}に鍛冶のコツを教えてあげた",
    int_blacksmith_uni_admire_tech: "{a}は{b}の鍛冶技術に感心した",
    int_blacksmith_uni_praised: "{a}が自分の技術を褒めてくれた",
    int_blacksmith_uni_hammer_noise: "{a}は{b}のハンマーの音がうるさいと思った",
    int_blacksmith_uni_annoyed: "{a}に迷惑をかけてしまった",

    // Alchemy (錬金)
    int_alchemy_mutual_share_materials: "{a}と{b}は材料を分け合って調合した",
    int_alchemy_mutual_new_recipe: "{a}と{b}は新しいレシピを一緒に考えた",
    int_alchemy_mutual_failure: "{a}と{b}は調合失敗で落ち込んだ",
    int_alchemy_uni_rare_material: "{a}は{b}に珍しい材料をもらった",
    int_alchemy_uni_gave_material: "{a}に珍しい材料をあげた",
    int_alchemy_uni_help_experiment: "{a}は{b}の実験を手伝って楽しんだ",
    int_alchemy_uni_helped: "{a}が実験を手伝ってくれた",
    int_alchemy_uni_bad_smell: "{a}は{b}の実験の匂いが嫌だった",
    int_alchemy_uni_smell_complaint: "{a}に実験の匂いを嫌がられた",
    int_alchemy_uni_blame_mistake: "{a}は{b}の調合ミスを責めた",
    int_alchemy_uni_blamed: "{a}に調合ミスを責められた",

    // Gather (採取)
    int_gather_mutual_rare_herb: "{a}と{b}は珍しい薬草を一緒に発見した",
    int_gather_mutual_help: "{a}と{b}は採取を手伝い合った",
    int_gather_mutual_spot_argue: "{a}と{b}は良い採取場所を奪い合った",
    int_gather_uni_tip_learned: "{a}は{b}に採取のコツを教わった",
    int_gather_uni_tip_taught: "{a}に採取のコツを教えてあげた",
    int_gather_uni_admire_amount: "{a}は{b}の採取量に感心した",
    int_gather_uni_praised_amount: "{a}が自分の採取量を褒めてくれた",
    int_gather_uni_noise: "{a}は{b}の採取の音がうるさいと思った",
    int_gather_uni_annoyed: "{a}に迷惑をかけた",
    int_gather_uni_spot_taken: "{a}は{b}に採取場所を取られた",
    int_gather_uni_spot_misunderstanding: "{a}に採取場所を譲ったつもりだった",

    // Hunting (狩り)
    int_hunting_mutual_big_preys: "{a}と{b}は連携して大きな獲物を倒した",
    int_hunting_mutual_treat_wounds: "{a}と{b}は戦闘後に傷を治療し合った",
    int_hunting_mutual_preys_argue: "{a}と{b}は獲物の分け方で揉めた",
    int_hunting_uni_saved_life: "{a}は{b}に命を救われた",
    int_hunting_uni_saved: "{a}を助けてあげた",
    int_hunting_uni_reliable: "{a}は{b}の戦闘力に頼もしさを感じた",
    int_hunting_uni_relied_on: "{a}に頼られている気がした",
    int_hunting_uni_reckless: "{a}は{b}の無謀な突撃に苛立った",
    int_hunting_uni_worried: "{a}に心配をかけてしまった",
    int_hunting_uni_scary_noise: "{a}は{b}の戦闘音が怖かった",
    int_hunting_uni_surprised: "{a}を驚かせてしまった",

    // Default (フォールバック)
    int_default_mutual_quiet_talk: "{a}と{b}は静かに休憩しながら話した",
    int_default_mutual_guild_future: "{a}と{b}はギルドの将来を語り合った",
    int_default_mutual_distance: "{a}と{b}は少し距離を置いた",
    int_default_uni_relieved: "{a}は{b}の存在に安心した",
    int_default_uni_presence: "{a}がそばにいてくれた",
    int_default_uni_silence_bother: "{a}は{b}の沈黙が気になった",
    int_default_uni_ignored: "{a}に無視された気がした",
    int_default_uni_light_talk: "{a}は{b}に軽く声をかけた",
    int_default_uni_talked_to: "{a}が声をかけてくれた",
    guild_stay_idle: "ギルドで休憩した",
    street_walk_idle: "街を散策した",
    street_walk_found_gold: "道端で小銭を見つけた！ +{amount}G",

    // 施設諦め時の専用メッセージ（action_fee_give_up に統合）
    action_fee_give_up: "施設の使用料が高すぎて諦め、街に出た",

    // 施設諦め時のバリエーション（必要に応じて分離）
    action_too_expensive: "施設の使用料が高すぎて諦めた（{percent}%も占める…）",
    action_fee_reluctant: "施設の使用料に渋って結局入らなかった",

    // View Relationship ボタン（UI用）
    view_relationship_button: "関係性を見る",

relationship_title: "{name} の関係性",
    relationship_no_others: "他のメンバーがいません",
    relationship_table_opponent: "相手",
    relationship_table_friendliness: "好感度",
    relationship_table_evaluation: "評価",
    friendliness_love: "大好き",
    friendliness_like: "好き",
    friendliness_friendly: "好意的",
    friendliness_normal: "普通",
    friendliness_cold: "やや冷淡",
    friendliness_dislike: "嫌い",
    friendliness_hate: "大嫌い",
    close_button: "閉じる",
    save_invalid_slot: "無効なスロット番号です（1～4）",
    save_corrupted: "スロット {slot} のセーブデータが破損しています！",
    save_loaded: "スロット {slot} からゲームを読み込みました！",
    save_no_data: "スロット {slot} にセーブデータがありません！",
    guild_defense_no_adventurer: "ギルトを防衛する冒険者は一人もいない！",
    advancing_day_wait: "日を進めています… しばらくお待ちください。",
    tax_day: "税金の日！{tax}G を徴収。",
    quest_expired: "無視されたクエスト \"{desc}\" が期限切れ。Reputation -{penalty}。",
    defense_battle_title: "防衛戦: {desc}",
    dungeon_exploration_title: "ダンジョン{floor}階探索",
    boss_battle_title: "{boss} との決戦",
    day_label: "第{day}日",
    end_day_button: "日終了 & 冒険者派遣",
    dialogue_skip: "スキップ",
    npc_farmer: "農夫 トマス",
    npc_farmer_short: "トマス",
    npc_farmer_desc: "村の農夫。お人よしで作物や家畜を大切にしている。以前、スライムや野犬の被害で困っていたが、ギルドに依頼して解決してもらった恩がある。誠実だが商売はしっかり。",

    // 酒場主人
    npc_tavern_owner: "酒場主人 エレナ",
    npc_tavern_owner_short: "エレナ",
    npc_tavern_owner_desc: "村の酒場の女主人。明るく気さくだが商売熱心で、情報や酒を金で売るタイプ。以前、地下室に巣食った巨大ネズミを退治してもらった恩があるが、ギルドとは距離を置いている。",

    // 錬金術師
    npc_alchemist: "錬金術師 アルベルト",
    npc_alchemist_short: "アルベルト",
    npc_alchemist_desc: "村の錬金術師。少し変わり者だが知識豊富。薬草集めクエストの恩あり。魔力関連実験熱心。",

    // 料理人
    npc_cook: "料理人 マリア",
    npc_cook_short: "マリア",
    npc_cook_desc: "村の料理人。明るく家庭的でキノコ料理得意。キノコ集めクエストの恩あり。豊作・宴会好き。",

    // 学者
    npc_scholar: "学者 セオドア",
    npc_scholar_short: "セオドア",
    npc_scholar_desc: "村の学者。古い書物や遺跡の研究に没頭する知的な老人。穏やかで物腰柔らかだが、知識のことになると熱く語り出す。以前、ギルドに古代文字の解読を依頼した恩がある。",
    chat_with_npc: "{npc}と会話",
    npc_luna: "ルナ",
    npc_kaito: "カイト",
    npc_farmer: "農夫",
    npc_tavern_owner: "酒場主人",
    npc_alchemist: "錬金術師",
    npc_cook: "料理人",
    npc_scholar: "学者",
    npc_villager: "村人",
    npc_village_chief: "村長",
    npc_grandma: "おばあさん",


    npcs_section_title: "チャット可能なNPC",
    npcs_no_unlocked_desc: "まだ話せるNPCがいません。<br>クエストをクリアしてNPCをアンロックしてください。",
    npcs_count_suffix: "人",
    side_quest_accept_button: "サイドクエスト受注",
    story_all_completed_title: "すべてのメインクエストを完了しました！",
    story_all_completed_desc: "深淵の王ヴォルガスは倒され、世界に平和が戻った。おめでとう！",

    story_current_title: "現在のストーリークエスト",
    story_difficulty_reward: "難易度 {difficulty} | 報酬 {reward}G",
    story_rep_required: "必要Reputation: {required} （現在 {current}）",
    story_already_active: "既にメインクエストが進行中です。完了するまで次の投稿はできません。",
    story_rep_insufficient: "Reputation不足です。サイドクエストなどでReputationを上げてください。",
    story_post_button: "このメインクエストを投稿する",

    main_quest_0_desc: "ギルドの名声を高める最初の試練 - 地域の盗賊団を壊滅せよ。近年、盗賊団の動きが異常に組織的だという噂がある。",
    main_quest_0_rank: "Recommended >20",

    main_quest_1_desc: "古代の遺跡を守る守護者が暴走し街に来た。守護者を倒し、彼は何を守ってるのかを明かそう。",
    main_quest_1_rank: "Recommended >40",

    main_quest_2_desc: "闇の魔導士が魂を集める為に街に来た、死者が出る前に彼女を止めましょう",
    main_quest_2_rank: "Recommended >60",

    main_quest_3_desc: "伝説のドラゴンが覚醒し、周辺を焼き払っている。ドラゴンを倒して、街の平和を守りましょう。",
    main_quest_3_rank: "Recommended >80",

    main_quest_4_desc: "闇のカルト集団が各地で儀式を行っている。彼らの指導者を捕らえ、深淵の王ヴォルガスの復活計画を暴け。",
    main_quest_4_rank: "Recommended >100",
    back_button: "戻る",
    inventory: "インベントリ",
    shop_borrow_gold: '商人から借金',
    borrow_explanation: '商人から金を借りることができます。最大借入額は名声×100Gです。28日後に全額返済が必要です。7日ごとに借入額の10%の利息を支払います（計40%）。',
    current_reputation: '現在の名声',
    max_borrow_limit: '借入上限',
    currently_borrowed: '既借入額',
    available: '残り可能額',
    current_loans: '現在の借金',
    principal: '元本',
    borrowed_on_day: '借入日',
    weekly_interest: '7日ごとの利息',
    next_payment_day: '次回支払日',
    interest_only: '利息のみ',
    final_with_principal: '利息＋元本',
    final_due_day: '最終返済日',
    borrow_amount: '借入希望額',
    borrow_button: '借入実行',
    borrow_max_reached: '名声上限に達しており、これ以上借りられません。',
    borrow_invalid_amount: '100G単位で入力してください。',
    borrow_exceeds_limit: '借入上限を超えています。',
    borrow_success: '{amount}G を借入しました。',
    loan_interest_payment: '{payment}G の利息を支払いました。',
    loan_final_payment: '{payment}G を支払い（うち元本 {principal}G）、借金を完済しました。',

    quest_log_title: "クエストログ",
    quest_log_button: "クエストログ",
    talk_to_hint: "{npc}に話しかける",
    quest_completed: "（完了）",
    quest_in_progress: "（進行中）",
    AI_setting_button: "AI設定",
    page_title: "失われし冒険の旅",
    game_title: "失われし<br>冒険の旅",
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
    gold_label: "Gold:",
    reputation_label: "Reputation:",
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
    reputation_penalty: "Reputation ",
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
    gold_unit: "G",

    // ポーション種別（既存のものと統一）
    potion_hp: "HP",
    potion_mp: "MP",
    enhancement_crystal: "強化クリスタル",
    dungeon_treasure_gold: "ダンジョン{floor}階の宝: +{gold}G",
    item_found: "{name}発見！",
    item_found_qty: "{name} x{qty}発見！",
    rare_indicator: " (レア！)",
    dungeon_ring: "ダンジョン{floor}階の{stat}リング",

    stat_strength_full: "筋力",
    stat_wisdom_full: "知恵",
    stat_dexterity_full: "敏捷",
    stat_luck_full: "運",
    percent_symbol: "%",
    absolute_symbol: " 絶対値",
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
    trade_insufficient_gold: "Gold不足: 購入コスト {cost}G 必要（現在: {current}g）",
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
    trade_required_gold: "必要Gold: ",
    trade_deduct_note: "（投稿時扣除）",
    trade_gold_insufficient: "Gold不足",
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
    daily_materials_today: "今日の素材",
    daily_materials_empty: "今日の素材はありません。",
    buy_button: "購入",

    guild_slots_current: "現在の恒久冒険者スロット:",
    guild_slots_next: "次のスロット: {next} - {cost}G でアップグレード",
    guild_expansion_button: "拡張購入",
    guild_max_expanded: "ギルドは最大まで拡張されています。",

    corrupt_description: "10 Reputationを消費して 100g を得る",
    corrupt_button: "商人を脅す",
    borrow_input_note: '(100G単位、最大 {available}G)',
    talk_to_ai_button: "{name}と話す (AI)",
    view_action_history: "行動履歴を見る",
    friendliness_label: "好感度:",
    recovery_hp_used: "{item} を使用 → HP +{amount}",
    recovery_mp_used: "{item} を使用 → MP +{amount}",

    action_too_expensive: "使用料が高すぎるため（所持金の{percent}%）、{action}を断念した",
    action_fee_reluctant: "使用料を払う気になれず、{action}を断念した",
    recovery_already_used_note: "（{recovery}は使用済み）",

    gather_success: "{item} を {qty}個 採取した",

    alchemy_no_materials: "材料不足で錬成に失敗した",
    alchemy_success: "{recipe} を錬成した",

    blacksmith_no_equip: "装備品がないため強化を断念した",
    blacksmith_success: "{equip} の強化に成功！ 絶対値 +1 ({old} → {new})",
    blacksmith_failure: "強化に失敗した",

    tavern_rest: "酒場で休息した",
    tavern_food_order: "、ついでに「{food}」を注文した ({cost}G)",
    tavern_food_too_expensive: "（食事は頼みたかったが、どれも高くて断念）",
    tavern_gamble_win: "、ギャンブルで勝ち！ {amount}Gの利益",
    tavern_gamble_loss: "、ギャンブルで負け！ {amount}Gを失った",

    hunting_report: "単独でモンスター狩りに行った（HP-{hpLoss}, MP-{mpLoss}, EXP+{expGain}, 金+{goldGain}G, ギルド手数料{guildFee}G）",
    hunting_level_up: " → レベルアップ！ Lv{level}",

    none_idle: "一日を特に何もせずに過ごした",
    none_donation: "一日を特に何もせずに過ごしたが、ギルドに{donation}G寄付した",

    recovery_then_action: "{recovery} → その後{action}",

    daily_guild_gain_positive: "冒険者たちの行動より +{amount}G",
    daily_guild_gain_negative: "冒険者たちの行動より {amount}G",
    action_gather: "採取",
    action_alchemy: "錬成",
    action_blacksmith: "鍛冶強化",
    action_tavern: "酒場休息",
    action_hunting: "狩り",
    action_guild_stay: "ギルド滞在",
    action_street_walk: "街散策",
    action_none: "なし",
    story_dialogue_0_0: "{player}！最近、地域で盗賊団が活発に動いているみたいです。しかも、動きがとても組織的だという噂が…。",
    story_dialogue_0_1: "ああ、ギルドの名を上げる絶好のチャンスだぜ！あいつらを壊滅させて、みんなに俺たちの実力を見せつけてやろう！",
    story_dialogue_0_2: "私たちも全力でサポートします！さあ、{player}、メインクエストを掲示しましょう！",
    story_dialogue_0_3: "あなたはギルドの名声を高める最初の試練として、盗賊団壊滅のメインクエストを投稿した。",

    story_dialogue_1_0: "大変です、{player}！古代遺跡を守っていた守護者が暴走して、街に近づいてきているそうです…！",
    story_dialogue_1_1: "守護者って何を守ってるんだろうな？倒して真相を確かめようぜ。面白そうだ！",
    story_dialogue_1_2: "危険ですが…ギルドの力を見せる時です！メインクエストを掲示しましょう！",
    story_dialogue_1_3: "あなたは暴走した古代守護者を討伐し、その秘密を解明するメインクエストを投稿した。",

    story_dialogue_2_0: "{player}…恐ろしい噂を聞きました。闇の魔導士が魂を集めているそうです。もう死者が出る前に止めないと…！",
    story_dialogue_2_1: "魂を集めるなんて許せねえ。魔導士を止めて、街を守ろう。俺たちの本気を見せてやる！",
    story_dialogue_2_2: "はい…！私たちも全力で支えます。メインクエストを掲示してください！",
    story_dialogue_2_3: "あなたは闇の魔導士を阻止する重要なメインクエストを投稿した。",

    story_dialogue_3_0: "大変です！伝説のドラゴンが覚醒して、周辺を焼き払っているそうです…！",
    story_dialogue_3_1: "ドラゴン退治か！これは伝説になるぜ、{player}！俺たちで倒して街の平和を取り戻そう！",
    story_dialogue_3_2: "本当に危険ですが…ギルドの名にかけて！メインクエストを掲示しましょう！",
    story_dialogue_3_3: "あなたは覚醒した伝説のドラゴンを討伐する偉大なメインクエストを投稿した。",

    story_dialogue_4_0: "{player}、各地で闇のカルト集団が儀式を行っているそうです。深淵の王ヴォルガスの復活を目論んでいるらしいです…！",
    story_dialogue_4_1: "カルトの指導者を捕まえて、計画を完全に潰そう。こんな邪悪なことは許さない！",
    story_dialogue_4_2: "私たちも全力でサポートします！メインクエストを掲示してください！",
    story_dialogue_4_3: "あなたは深淵の王復活を阻止する最終的なメインクエストを投稿した。",
  



  },
  en: {
    "temp_cannot_join_trade":"{name} is a temporary adventurer and cannot join trade quests",
    "shop_purchase_success": "Purchased {name} x {qty} for {total}G, remaining: {gold}G",
    "buy_10_button": "Buy 10",
    "equipment_buyback": "Paid {amount}G to {name} and unequipped \"{item}\"",
    "card_rank_promotion_bonus": "{name}'s rank promoted from {old} to {new}! Friendliness +{bonus}",
    "card_rank_demotion_penalty": "{name}'s rank demoted from {old} to {new}... Friendliness -{penalty}",
"debt_tomorrow_interest": "Tomorrow interest payment: {amount}G",
"debt_tomorrow_final": "Tomorrow final repayment: {amount}G (principal + interest)",
"debt_overdue_simple": "Loan overdue ({count} contracts)! Immediate repayment required",
    "payment_today": "Today's Payment: {total}G (Tax {tax}G + Salary {salary}G)",
"payment_in_days": "Payment in {days} days: {total}G (Tax {tax}G + Salary {salary}G)",
    "adventurer_left_low_friendliness": "{name} left the guild due to low friendliness toward the Guild Master...",
"multiple_adventurers_left": "{count} adventurers left the guild due to low friendliness (Reputation -{penalty})",
    "enter_player_name": "Please enter your name!",
    "import_text_modal_title": "Import and Load Save Data from Text",
"import_text_modal_info": "Paste the exported string below. After pasting, press \"Execute Load\" to load the game directly (no slot used).",
"import_text_placeholder": "Paste the exported text here...",
"import_load_button": "Execute Load",
"import_empty_text": "Text is empty!",
"import_invalid_format": "Invalid data format (Base64 decode failed)",
"import_corrupted_data": "Data is corrupted (JSON parse failed)",
"import_success": "Game loaded from text!",
    "export_text_modal_title": "Export Current Game to Text",
"export_text_modal_info": "Copy the string below to import on another PC or browser. This string fully represents the current game state.",
"copy_to_clipboard_button": "Copy to Clipboard",
"copy_success": "Copied to clipboard!",
"copy_success_fallback": "Copied (legacy browser mode)",
"close_button": "Close",
    "save_slot_select_title": "Select Save Slot",
"load_slot_select_title": "Select Load Slot",
"slot_label": "Slot {slot}",
"slot_corrupted": "Corrupted",
"slot_empty": "Empty",
"player_label": "Player",
"gold_unit": "G",
"level_label": "Highest Level",
"overwrite_confirm": "Overwrite slot {slot}?",
"slot_empty_alert": "This slot is empty!",
"load_confirm": "Load from slot {slot}?",
"export_text_title": "Export Current Game to Text",
"export_text_desc": "Output current game state as text (transferable to other devices)",
"import_text_title": "Import and Load from Text",
"import_text_desc": "Paste exported text to load the game directly",
"cancel_button": "Cancel",
    "no_available_adventurers": "No adventurers available today.",
    "invalid_save_slot": "Invalid slot number (1-4)",
"game_saved_success": "Game saved to slot {slot}!",
    "insufficient_gold": "Insufficient Gold",
    "max_expansion_reached": "Maximum expansion reached (12 slots)",
"expansion_purchased": "Guild expanded! Permanent slots increased to {slots} (Cost: {cost}G)",
    "guild_rank_display": "Rank {rank}",
    // translations.js の en オブジェクト内に追加（English）
"edit_adventurer_card_title": "{name}'s Guild Card Edit",
"current_rank": "Current Rank",
"rank_change": "Change Rank",
"preview_salary_label": "Preview of Selected Salary",
"prohibited_actions_setting": "Prohibited Actions",
"prohibit_penalty_note": "(On save: -5 friendliness per prohibited action)",
    "current_rank": "Current Rank",
"rank_change": "Change Rank",
"prohibited_actions_setting": "Prohibited Actions",
"prohibit_penalty_note": "Friendliness penalty of -5 per prohibited action on update",
"rank_with_salary": "{rank} Rank ({amount}G / 7 days)",
"rank_too_low_for_quest": "{name}'s rank ({adv_rank}) is too low for this quest (requires {quest_rank} or higher)",
    "action_prohibited_general": "Resting at the guild due to prohibited action",
    "card_prohibit_reward": "{name}'s friendliness increased due to reduced prohibited actions (+{reward})",
    // en 用（引用符付き）
    "edit_adventurer_card": "Edit Guild Card",
  "save_card": "Save",
  "card_updated": "{name}'s Guild Card has been updated",
  "card_prohibit_penalty": "{name}'s friendliness decreased due to increased prohibited actions (-{penalty})",
  "weekly_salary_paid": "Weekly fixed salary payment: {amount}G",
  "card_renew_penalty": "{name}'s card renewal applied friendliness penalty for {count} prohibited actions",
  "rank_too_low_for_quest": "{name}'s rank {rank} is too low for this quest (requires {rank} or higher)",
  "action_prohibited": "Resting at the guild because {action} is prohibited",
    "guild_friendliness_decrease_with_player": "Consumed Guild Ration, {name}'s friendliness toward {player}-{penalty}",
  "guild_master_default": "Guild Master",
"hiring_cost_display": "Hiring: {cost}g",
  "permanent_member": "Guild Member",
    "quest_in_progress_no_add": "Cannot add adventurers while the quest is in progress",
  "training_max_2": "Training quests allow a maximum of 2 participants.",
  "quest_full": "The quest is full",
  "no_mp": "{name} has no MP! Use a potion to recover or wait for recovery.",
  "daily_rejected_pair": "{name1} and {name2} have already refused to cooperate today, so they cannot join the same quest.",
  "self_reject_low_friendliness": "{name} refused to join the quest due to poor compatibility with team members. (Lowest friendliness: {lowest} → Rejection chance: {chance}%)",
  "rejected_by_member": "{name} was refused quest participation by {member}. ({member}'s friendliness: {final} → Rejection chance: {chance}%)",
  "insufficient_gold": "Insufficient Gold",
    "guild_full": "The guild is full! Purchase an expansion to recruit more adventurers.",
  "adventurer_joined": "{name} has joined as a new member!",
    "facilities_produce_and_stock": "Produce and Stock",
    "tavern_ration_message": " Reluctantly ate the \"Guild Ration\" (free). \"It tastes awful... but it's to stay alive...\" (Friendliness toward Guild Master -{penalty})",
  "tavern_no_food_at_all": " Left the tavern hungry, unable to eat anything...",
"adventurer_starved_to_death": "{name} starved to death...!",
  "multiple_adventurers_starved": "{count} adventurers starved to death... (Reputation -{penalty})",
    "tavern_no_stock": "There was no food in stock, so couldn't order",
  "tavern_food_too_expensive": "The food was too expensive, so couldn't order",
  "hunger_label": "Fullness",
    "trait.for_adventurers": "for",
"trait.primary_suffix": "-primary adventurers",
"trait.compare_suffix": " adventurers",
"trait.friendliness_prefix": "Friendliness",
"trait.action_priority_suffix": " priority",
"trait.initial_prefix": "Initial",
"trait.higher": "higher",
"trait.lower": "lower",
"trait.male_adventurers": "male adventurers",
"trait.female_adventurers": "female adventurers",
"trait.seniors": "higher-level adventurers",
"trait.juniors": "lower-level adventurers",
"trait.for_adventurers": "for",
"trait.for_actions": "priority for",
"trait.initial": "Initial",
"trait.percent_bonus": "{stat} {sign}{value}%",
"trait.friendliness_detail": "Friendliness {sign}{value} {target}",
"trait.priority_detail": "Priority {sign}{value} {target}",
"trait.primary_adventurers": "{stat}-primary adventurers",
"trait.level_adventurers": "{level_type} adventurers",
"trait.stat_compare_adventurers": "adventurers with {comp} {stat} than self",
    // Add to translations.en (inside the en: { ... } object)
"trait.likes_men": "Likes Men",
"trait.likes_women": "Likes Women",
"trait.dislikes_men": "Dislikes Men",
"trait.dislikes_women": "Dislikes Women",
"trait.likes_strength": "Likes Strong People",
"trait.likes_wisdom": "Likes Wise People",
"trait.likes_dexterity": "Likes Dexterous People",
"trait.likes_luck": "Likes Lucky People",
"trait.dislikes_strength": "Dislikes Strong People",
"trait.dislikes_wisdom": "Dislikes Wise People",
"trait.dislikes_dexterity": "Dislikes Dexterous People",
"trait.dislikes_luck": "Dislikes Lucky People",
"trait.likes_seniors": "Likes Seniors",
"trait.likes_juniors": "Likes Juniors",
"trait.dislikes_seniors": "Dislikes Seniors",
"trait.dislikes_juniors": "Dislikes Juniors",
"trait.respects_stronger": "Respects Stronger People",
"trait.respects_wiser": "Respects Wiser People",
"trait.respects_more_dexterous": "Respects More Dexterous People",
"trait.envies_luckier": "Envies Luckier People",
"trait.despises_weaker": "Despises Weaker People",
"trait.despises_dumber": "Despises Less Intelligent People",
"trait.despises_less_dexterous": "Despises Less Dexterous People",
"trait.despises_less_lucky": "Despises Less Lucky People",
"trait.likes_tavern": "Loves the Tavern",
"trait.teetotaler": "Teetotaler",
"trait.likes_blacksmith": "Loves Blacksmithing",
"trait.likes_alchemy": "Loves Alchemy",
"trait.likes_hunting": "Loves Hunting",
"trait.pacifist": "Pacifist",
"trait.likes_gathering": "Loves Gathering",
"trait.reclusive": "Reclusive",
"trait.active": "Active",
"trait.likes_street_walking": "Loves Walking the Streets",
"trait.super_strength": "Super Strength",
"trait.feeble": "Feeble",
"trait.genius": "Genius",
"trait.dimwitted": "Dimwitted",
"trait.godly_dexterity": "Godly Dexterity",
"trait.clumsy": "Clumsy",
"trait.very_lucky": "Very Lucky",
"trait.unlucky": "Unlucky",
"trait.tough": "Tough",
"trait.fragile": "Fragile",
"trait.robust": "Robust",
"trait.frail": "Frail",
"trait.mana_abundant": "Mana Abundant",
"trait.mana_poor": "Mana Poor",
"trait.blessing_of_strength": "Blessing of Strength",
"trait.curse_of_strength": "Curse of Strength",
"trait.blessing_of_wisdom": "Blessing of Wisdom",
"trait.curse_of_wisdom": "Curse of Wisdom",
"trait.blessing_of_dexterity": "Blessing of Dexterity",
"trait.curse_of_dexterity": "Curse of Dexterity",
"trait.blessing_of_luck": "Blessing of Luck",
"trait.curse_of_luck": "Curse of Luck",
"trait.blessing_of_defense": "Blessing of Defense",
"trait.curse_of_defense": "Curse of Defense",
"trait.none": "None",
"trait.effect.friendliness": "Friendliness",
"trait.effect.priority": "Priority",
"stat.max_hp": "Max HP",
"stat.max_mp": "Max MP",
    // Tavern
    int_tavern_mutual_laugh: "{a} and {b} laughed heartily while sharing drinks",
    int_tavern_mutual_food: "{a} and {b} shared delicious food",
    int_tavern_mutual_sing: "{a} and {b} sang together and got excited",
    int_tavern_mutual_gamble_lose: "{a} and {b} became grumpy after losing at gambling",
    int_tavern_mutual_drink_argue: "{a} and {b} had a light argument over drinking manners",
    int_tavern_uni_treat: "{a} treated {b} to a drink",
    int_tavern_uni_treated: "{a} was treated to a drink",
    int_tavern_uni_rude_drink: "{a} thought {b}'s drinking manners were crude",
    int_tavern_uni_criticized: "{a} was criticized for drinking manners",
    int_tavern_uni_funny_story: "{a} was healed by listening to {b}'s funny story",
    int_tavern_uni_listened: "{a} listened enthusiastically to the story",

    // Blacksmith
    int_blacksmith_mutual_polish: "{a} and {b} polished each other's weapons",
    int_blacksmith_mutual_success: "{a} and {b} celebrated a successful enhancement together",
    int_blacksmith_mutual_failure: "{a} and {b} were disappointed by an enhancement failure",
    int_blacksmith_mutual_technique_argue: "{a} and {b} argued over blacksmithing techniques",
    int_blacksmith_uni_tip_learned: "{a} learned a blacksmithing tip from {b}",
    int_blacksmith_uni_tip_taught: "{a} taught a blacksmithing tip",
    int_blacksmith_uni_admire_tech: "{a} admired {b}'s blacksmithing skills",
    int_blacksmith_uni_praised: "{a} was praised for their skills",
    int_blacksmith_uni_hammer_noise: "{a} thought {b}'s hammer noise was loud",
    int_blacksmith_uni_annoyed: "{a} annoyed someone",

    // Alchemy
    int_alchemy_mutual_share_materials: "{a} and {b} shared materials for alchemy",
    int_alchemy_mutual_new_recipe: "{a} and {b} thought of a new recipe together",
    int_alchemy_mutual_failure: "{a} and {b} were disappointed by an alchemy failure",
    int_alchemy_uni_rare_material: "{a} received a rare material from {b}",
    int_alchemy_uni_gave_material: "{a} gave a rare material",
    int_alchemy_uni_help_experiment: "{a} helped with {b}'s experiment and enjoyed it",
    int_alchemy_uni_helped: "{a} helped with the experiment",
    int_alchemy_uni_bad_smell: "{a} disliked the smell of {b}'s experiment",
    int_alchemy_uni_smell_complaint: "{a} was complained about the smell",
    int_alchemy_uni_blame_mistake: "{a} blamed {b} for an alchemy mistake",
    int_alchemy_uni_blamed: "{a} was blamed for a mistake",

    // Gather
    int_gather_mutual_rare_herb: "{a} and {b} discovered a rare herb together",
    int_gather_mutual_help: "{a} and {b} helped each other with gathering",
    int_gather_mutual_spot_argue: "{a} and {b} argued over a good gathering spot",
    int_gather_uni_tip_learned: "{a} learned a gathering tip from {b}",
    int_gather_uni_tip_taught: "{a} taught a gathering tip",
    int_gather_uni_admire_amount: "{a} admired {b}'s gathering amount",
    int_gather_uni_praised_amount: "{a} was praised for gathering amount",
    int_gather_uni_noise: "{a} thought {b}'s gathering noise was loud",
    int_gather_uni_annoyed: "{a} annoyed someone",
    int_gather_uni_spot_taken: "{a} had their gathering spot taken by {b}",
    int_gather_uni_spot_misunderstanding: "{a} thought they yielded the spot",

    // Hunting
    int_hunting_mutual_big_preys: "{a} and {b} teamed up to take down big prey",
    int_hunting_mutual_treat_wounds: "{a} and {b} treated each other's wounds after battle",
    int_hunting_mutual_preys_argue: "{a} and {b} argued over prey distribution",
    int_hunting_uni_saved_life: "{a} had their life saved by {b}",
    int_hunting_uni_saved: "{a} saved someone",
    int_hunting_uni_reliable: "{a} felt {b}'s combat strength was reliable",
    int_hunting_uni_relied_on: "{a} felt relied on",
    int_hunting_uni_reckless: "{a} was irritated by {b}'s reckless charge",
    int_hunting_uni_worried: "{a} worried someone",
    int_hunting_uni_scary_noise: "{a} was scared by {b}'s battle noise",
    int_hunting_uni_surprised: "{a} surprised someone",

    // Default
    int_default_mutual_quiet_talk: "{a} and {b} talked quietly while resting",
    int_default_mutual_guild_future: "{a} and {b} discussed the guild's future",
    int_default_mutual_distance: "{a} and {b} kept a little distance",
    int_default_uni_relieved: "{a} felt relieved by {b}'s presence",
    int_default_uni_presence: "{a} was there",
    int_default_uni_silence_bother: "{a} was bothered by {b}'s silence",
    int_default_uni_ignored: "{a} felt ignored",
    int_default_uni_light_talk: "{a} lightly spoke to {b}",
    int_default_uni_talked_to: "{a} was spoken to",
    action_guild_stay: "Staying at Guild",
    action_street_walk: "Walking around Streets",
    guild_stay_idle: "Resting at the guild",
    street_walk_idle: "Walking around the town",
    street_walk_found_gold: "Found some coins on the street! +{amount}G",
    action_fee_give_up: "Gave up on the facility due to high fee and went out to the street",
    action_too_expensive: "The facility fee was too high and gave up ({percent}% of gold...)",
    action_fee_reluctant: "Hesitated on the facility fee and didn't enter",
    view_relationship_button: "View Relationship",
relationship_title: "{name}'s Relationships",
    relationship_no_others: "No other members",
    relationship_table_opponent: "Opponent",
    relationship_table_friendliness: "Friendliness",
    relationship_table_evaluation: "Evaluation",
    friendliness_love: "Love",
    friendliness_like: "Like",
    friendliness_friendly: "Friendly",
    friendliness_normal: "Normal",
    friendliness_cold: "Somewhat Cold",
    friendliness_dislike: "Dislike",
    friendliness_hate: "Hate",
    close_button: "Close",
    save_invalid_slot: "Invalid slot number (1-4)",
    save_corrupted: "Save data in slot {slot} is corrupted!",
    save_loaded: "Game loaded from slot {slot}!",
    save_no_data: "No save data in slot {slot}!",
    guild_defense_no_adventurer: "No adventurers assigned to defend the guild!",
    advancing_day_wait: "Advancing day... Please wait.",
    tax_day: "Tax day! {tax}G collected.",
    quest_expired: "Ignored quest \"{desc}\" expired. Reputation -{penalty}.",
    defense_battle_title: "Defense Battle: {desc}",
    dungeon_exploration_title: "Dungeon Floor {floor} Exploration",
    boss_battle_title: "Decisive Battle with {boss}",
    day_label: "Day {day}",
    end_day_button: "End Day & Dispatch Adventurers",
    dialogue_skip: "Skip",
    npc_farmer: "Farmer Thomas",
    npc_farmer_short: "Thomas",
    npc_farmer_desc: "A kind-hearted village farmer who cherishes his crops and livestock. He owes the guild for resolving past slime and wild dog problems. Honest but firm in business.",

    npc_tavern_owner: "Tavern Owner Elena",
    npc_tavern_owner_short: "Elena",
    npc_tavern_owner_desc: "The cheerful and sociable owner of the village tavern. She's business-minded, selling information and drinks for gold. Owes the guild for clearing giant rats from the basement but keeps some distance.",

    npc_alchemist: "Alchemist Albert",
    npc_alchemist_short: "Albert",
    npc_alchemist_desc: "The village alchemist. A bit eccentric but knowledgeable. Owes the guild for herb gathering quests. Passionate about magic experiments.",

    npc_cook: "Cook Maria",
    npc_cook_short: "Maria",
    npc_cook_desc: "The village cook. Bright and motherly, specializes in mushroom dishes. Owes the guild for mushroom gathering quests. Loves bountiful harvests and feasts.",

    npc_scholar: "Scholar Theodore",
    npc_scholar_short: "Theodore",
    npc_scholar_desc: "The village scholar. An intellectual elder absorbed in ancient texts and ruins. Gentle and polite, but passionate when discussing knowledge. Owes the guild for deciphering ancient texts.",
    chat_with_npc: "Chat with {npc}",
    guild_quests_title: "Guild quest posting",
    npc_luna: "Luna",
    npc_kaito: "Kaito",
    npc_farmer: "Farmer",
    npc_tavern_owner: "Tavern Owner",
    npc_alchemist: "Alchemist",
    npc_cook: "Cook",
    npc_scholar: "Scholar",
    npc_villager: "Villager",
    npc_village_chief: "Village Chief",
    npc_grandma: "Old lady",
    npcs_section_title: "Available NPCs for Chat",
    npcs_no_unlocked_desc: "No NPCs available to chat with yet.<br>Clear quests to unlock NPCs.",
    npcs_count_suffix: "",
    side_quest_accept_button: "Accept Side Quest",
    story_dialogue_0_0: "{player}! Lately, there's been a lot of bandit activity in the region. And there are rumors that their movements are unusually organized...",
    story_dialogue_0_1: "Yeah, this is the perfect chance to raise the guild's reputation! Let's wipe them out and show everyone our strength!",
    story_dialogue_0_2: "We'll support you with everything we've got! Come on, {player}—post the main quest!",
    story_dialogue_0_3: "You posted the main quest to annihilate the bandits as the first trial to raise the guild's reputation.",

    story_dialogue_1_0: "This is terrible, {player}! The guardian that was protecting an ancient ruin has gone berserk and is approaching the town...!",
    story_dialogue_1_1: "I wonder what the guardian was protecting? Let's defeat it and find out the truth. Sounds exciting!",
    story_dialogue_1_2: "It's dangerous, but... this is the time to show the guild's power! Let's post the main quest!",
    story_dialogue_1_3: "You posted the main quest to defeat the rampaging ancient guardian and uncover its secret.",

    story_dialogue_2_0: "{player}... I heard a terrifying rumor. A dark sorceress is collecting souls. We have to stop her before anyone dies...!",
    story_dialogue_2_1: "Collecting souls? Unforgivable. Let's stop the sorceress and protect the town. We'll show them we're serious!",
    story_dialogue_2_2: "Yes...! We'll support you fully. Please post the main quest!",
    story_dialogue_2_3: "You posted an important main quest to stop the dark sorceress.",

    story_dialogue_3_0: "This is bad! A legendary dragon has awakened and is burning everything around it...!",
    story_dialogue_3_1: "Dragon slaying, huh? This will become legend, {player}! Let's defeat it together and restore peace to the town!",
    story_dialogue_3_2: "It's really dangerous, but... for the guild's honor! Let's post the main quest!",
    story_dialogue_3_3: "You posted a great main quest to defeat the awakened legendary dragon.",

    story_dialogue_4_0: "{player}, dark cult groups are performing rituals all over the place. It seems they're plotting to resurrect the Abyss King Volgas...!",
    story_dialogue_4_1: "Let's capture the cult leader and completely crush their plan. We won't allow such evil!",
    story_dialogue_4_2: "We'll support you with all our strength! Please post the main quest!",
    story_dialogue_4_3: "You posted the final main quest to prevent the resurrection of the Abyss King.",
    story_all_completed_title: "All Main Quests Completed!",
    story_all_completed_desc: "The Abyss King Volgas has been defeated, and peace has returned to the world. Congratulations!",

    story_current_title: "Current Story Quest",
    story_difficulty_reward: "Difficulty {difficulty} | Reward {reward}G",
    story_rep_required: "Required Reputation: {required} (Current: {current})",
    story_already_active: "A main quest is already in progress. You cannot post the next one until it is completed.",
    story_rep_insufficient: "Insufficient Reputation. Please raise your Reputation with side quests.",
    story_post_button: "Post This Main Quest",

    main_quest_0_desc: "Annihilate the local bandit group..",
    main_quest_0_rank: "Recommended >20",

    main_quest_1_desc: "Defeat the guardian of ancient ruin.",
    main_quest_1_rank: "Recommended >40",

    main_quest_2_desc: "Stop dark sorceress.",
    main_quest_2_rank: "Recommended >60",

    main_quest_3_desc: "Defeat legendary dragon.",
    main_quest_3_rank: "Recommended >80",

    main_quest_4_desc: "Stop the resurrection plan of the Abyss King Volgas.",
    main_quest_4_rank: "Recommended >100",
    back_button: "Back",
    inventory: "Inventory",
    quest_log_title: "Quest Log",
    quest_log_button: "Quest Log",
    talk_to_hint: "Talk to {npc}",
    quest_completed: "(Completed)",
    quest_in_progress: "(In Progress)",
    AI_setting_button: "AI Setting",
    page_title: "Journey of Lost Adventure",
    game_title: "Journey of<br> Lost Adventure",
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
    tutorial_speaker: "Narrator",
    next_button: "Next",
    start_game_button: "Start Game",    
    intro_title: "Awakening",
    intro_description: "You wake up having lost all your memories.<br>Two people named Luna and Kaito claim to be your childhood friends<br>and are about to tell you your name and past.<br><br>Please enter the name you wish to use in the game.",
    intro_name_placeholder: "Enter your name...",
    intro_decide_button: "Confirm",
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
    gold_unit: "G",

    potion_hp: "HP",
    potion_mp: "MP",
    enhancement_crystal: "Enhancement Crystal",
    dungeon_treasure_gold: "Dungeon Floor {floor} Treasure: +{gold}G",
    item_found: "Found {name}!",
    item_found_qty: "Found {name} x{qty}!",
    rare_indicator: " (Rare!) ",
    dungeon_ring: "Dungeon Floor {floor} {stat} Ring",

    stat_strength_full: "Strength",
    stat_wisdom_full: "Wisdom",
    stat_dexterity_full: "Dexterity",
    stat_luck_full: "Luck",
    percent_symbol: "%",
    absolute_symbol: " absolute",
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
    trade_insufficient_gold: "Insufficient gold: Purchase cost {cost}G required (current: {current}G)",
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
    shop_borrow_gold: 'Borrow from Merchant',
    borrow_explanation: 'You can borrow gold from the merchant. Maximum loan amount is Reputation × 100G. Full repayment is required after 28 days. Interest of 10% of the principal is paid every 7 days (total 40%).',
    current_reputation: 'Current Reputation',
    max_borrow_limit: 'Max Borrow Limit',
    currently_borrowed: 'Currently Borrowed',
    available: 'Available to Borrow',
    current_loans: 'Current Loans',
    principal: 'Principal',
    borrowed_on_day: 'Borrowed on Day',
    weekly_interest: 'Weekly Interest',
    next_payment_day: 'Next Payment Day',
    interest_only: 'Interest Only',
    final_with_principal: 'Interest + Principal',
    final_due_day: 'Final Repayment Day',
    borrow_amount: 'Borrow Amount',
    borrow_button: 'Borrow',
    borrow_max_reached: 'Reputation limit reached; cannot borrow more.',
    borrow_invalid_amount: 'Please enter in multiples of 100G.',
    borrow_exceeds_limit: 'Exceeds borrowing limit.',
    borrow_success: 'Borrowed {amount}G.',
    loan_interest_payment: 'Paid {payment}G in interest.',
    loan_final_payment: 'Paid {payment}G (including principal {principal}G) and cleared the loan.',
    daily_materials_today: "Today's Materials",
    daily_materials_empty: "No materials available today.",
    buy_button: "Buy",

    guild_slots_current: "Current Permanent Adventurer Slots:",
    guild_slots_next: "Next Slot: {next} - Upgrade for {cost}G",
    guild_expansion_button: "Purchase Expansion",
    guild_max_expanded: "The guild is fully expanded.",

    corrupt_description: "Spend 10 Reputation to gain 100g",
    corrupt_button: "Intimidate Merchant",
    borrow_input_note: '(in 100G increments, max {available}G)',
    talk_to_ai_button: "Talk to {name} (AI)",
    view_action_history: "View Action History",
    friendliness_label: "Affinity:",
    recovery_hp_used: "Used {item} → HP +{amount}",
    recovery_mp_used: "Used {item} → MP +{amount}",

    action_too_expensive: "Facility fee too high ({percent}% of held gold), gave up on {action}",
    action_fee_reluctant: "Didn't feel like paying the fee, gave up on {action}",
    recovery_already_used_note: "（{recovery} already used）",

    gather_success: "Gathered {qty} {item}(s)",

    alchemy_no_materials: "Failed alchemy due to insufficient materials",
    alchemy_success: "Successfully synthesized {recipe}",

    blacksmith_no_equip: "No equipment to enhance, gave up",
    blacksmith_success: "Successfully enhanced {equip}! Absolute value +1 ({old} → {new})",
    blacksmith_failure: "Enhancement failed",

    tavern_rest: "Rested at the tavern",
    tavern_food_order: ", and ordered \"{food}\" ({cost}G)",
    tavern_food_too_expensive: "(Wanted to order food but everything was too expensive)",
    tavern_gamble_win: ", won at gambling! +{amount}G profit",
    tavern_gamble_loss: ", lost at gambling! -{amount}G",

    hunting_report: "Went monster hunting alone (HP-{hpLoss}, MP-{mpLoss}, EXP+{expGain}, Gold +{goldGain}G, Guild fee {guildFee}G)",
    hunting_level_up: " → Level up! Lv{level}",

    none_idle: "Spent the day doing nothing in particular",
    none_donation: "Spent the day idly but donated {donation}G to the guild",

    recovery_then_action: "{recovery} → then {action}",

    daily_guild_gain_positive: "From adventurers' actions: +{amount}G",
    daily_guild_gain_negative: "From adventurers' actions: {amount}G",
    action_gather: "Gathering",
    action_alchemy: "Alchemy",
    action_blacksmith: "Blacksmith Enhancement",
    action_tavern: "Tavern Rest",
    action_hunting: "Hunting",
    action_none: "None",
  },
  zh: {  // Traditional Chinese (繁體中文 - Taiwan/HK style)
    // Add to translations.zh (inside the zh: { ... } object) – Traditional Chinese
    // zh 用（引用符付き）
    // translations.js の zh オブジェクト内に追加（Traditional Chinese）
    "temp_cannot_join_trade":"{name} 是臨時冒險者，無法參加貿易任務",
    "shop_purchase_success":"購買了{name} x {qty}，合計{total}G，剩餘{gold}G",
    "buy_10_button": "購買10個",
    "equipment_buyback":  "向{name}支付{amount}G並解除了「{item}」",
    "card_rank_promotion_bonus": "{name}的階級從{old}升至{new}！好感度 +{bonus}",
    "card_rank_demotion_penalty": "{name}的階級從{old}降至{new}…好感度 -{penalty}",
    "debt_tomorrow_interest": "明天利息支付：{amount}G",
"debt_tomorrow_final": "明天滿期還款：{amount}G (本金+利息)",
"debt_overdue_simple": "借款逾期（{count}件）！需立即還款",

    "payment_today": "今日支付：{total}G（稅金 {tax}G + 工資 {salary}G）",
"payment_in_days": "{days}天後支付：{total}G（稅金 {tax}G + 工資 {salary}G）",
    "adventurer_left_low_friendliness": "{name} 因對公會會長好感度過低而離開公會…",
"multiple_adventurers_left": "{count}名冒險者因好感度不足而離開公會…（聲望 -{penalty}）",
    "enter_player_name": "請輸入名字！",
    "import_text_modal_title": "從文字匯入並讀取存檔資料",
"import_text_modal_info": "請將匯出的字串貼到以下。貼上後，按「執行讀取」即可直接讀取遊戲（不使用槽位）。",
"import_text_placeholder": "在此貼上匯出的文字...",
"import_load_button": "執行讀取",
"import_empty_text": "文字為空！",
"import_invalid_format": "無效的資料格式（Base64解碼失敗）",
"import_corrupted_data": "資料損壞（JSON解析失敗）",
"import_success": "已從文字讀取遊戲！",
    "export_text_modal_title": "將目前遊戲匯出為文字",
"export_text_modal_info": "複製以下字串，即可在其他電腦或瀏覽器匯入。此字串完整代表目前的遊戲狀態。",
"copy_to_clipboard_button": "複製到剪貼簿",
"copy_success": "已複製到剪貼簿！",
"copy_success_fallback": "已複製（舊版瀏覽器模式）",
"close_button": "關閉",
    "save_slot_select_title": "選擇存檔槽位",
"load_slot_select_title": "選擇讀取槽位",
"slot_label": "槽位 {slot}",
"slot_corrupted": "損壞",
"slot_empty": "空",
"player_label": "玩家",
"gold_unit": "G",
"level_label": "最高等級",
"overwrite_confirm": "是否覆蓋槽位 {slot}？",
"slot_empty_alert": "此槽位為空！",
"load_confirm": "是否從槽位 {slot} 讀取？",
"export_text_title": "將目前遊戲匯出為文字",
"export_text_desc": "將目前遊戲狀態輸出為文字（可轉移至其他裝置）",
"import_text_title": "從文字匯入並讀取",
"import_text_desc": "貼上匯出的文字以直接讀取遊戲",
"cancel_button": "取消",
    "no_available_adventurers": "今日沒有可用的冒險者。",
    "invalid_save_slot": "無效的存檔槽位（1～4）",
"game_saved_success": "遊戲已儲存至槽位 {slot}！",
    "insufficient_gold": "Gold不足",
    "max_expansion_reached": "已達到最大擴展（12個槽位）",
"expansion_purchased": "公會擴建完成！常駐槽位增加至 {slots}（費用：{cost}G）",
    "guild_rank_display": "Rank {rank}",
    "edit_adventurer_card_title": "{name} 的公會卡片編輯",
"current_rank": "目前階級",
"rank_change": "階級變更",
"preview_salary_label": "選擇中的工資預覽",
"prohibited_actions_setting": "行動禁止設定",
"prohibit_penalty_note": "（更新時禁止數×-5的好感度懲罰）",
"current_rank": "目前的階級",
"rank_change": "階級變更",
"prohibited_actions_setting": "行動禁止設定",
"prohibit_penalty_note": "更新時禁止數×-5的好感度懲罰",
"rank_with_salary": "{rank}階級 ({amount}G / 7 天)",
"rank_too_low_for_quest": "{name}的階級({adv_rank})無法參加此任務（需要{quest_rank}以上）",
"weekly_salary_paid": "7日固定工資支付：{amount}G",
"tax_day": "稅金日！繳納 {tax}G。",
    "action_prohibited_general": "因禁止行動，因此在公會休息",
    "card_prohibit_reward": "{name}因禁止行動減少，好感度 +{reward}",
    "edit_adventurer_card": "編輯公會卡",
  "save_card": "保存",
  "card_updated": "{name}的公會卡已更新",
  "card_prohibit_penalty": "{name}因禁止行動增加，好感度 -{penalty}",
  "weekly_salary_paid": "每7天的固定薪資支付：{amount}G",
  "card_renew_penalty": "{name}的卡片更新，因{count}個禁止行動而觸發好感度懲罰",
  "rank_too_low_for_quest": "{name}的等級{rank}不足以參加此任務（需要{rank}以上）",
  "action_prohibited": "因{action}被禁止，因此在公會休息",
    "guild_friendliness_decrease_with_player": "吃了公會配給糧，{name}對{player}的好感度-{penalty}",
  "guild_master_default": "公會會長",
"hiring_cost_display": "雇用: {cost}g",
  "permanent_member": "正式成員",
    "quest_in_progress_no_add": "任務進行中無法追加冒險者",
  "training_max_2": "訓練任務最多2人。",
  "quest_full": "任務已滿員",
  "no_mp": "{name}的MP不足！請使用藥水恢復或等待恢復。",
  "daily_rejected_pair": "{name1}與{name2}今天已拒絕合作，因此無法一同參加任務。",
  "self_reject_low_friendliness": "{name}因與隊伍成員相性不佳，自行拒絕參加任務。（最低好感度{lowest} → 拒絕機率{chance}%）",
  "rejected_by_member": "{name}被{member}拒絕參加任務。（{member}的好感度{final} → 拒絕機率{chance}%）",
  "insufficient_gold": "Gold不足",
    "guild_full": "公會已滿員！請購買擴建來招募更多冒險者。",
  "adventurer_joined": "{name}成為了新的正式成員！",
    "facilities_produce_and_stock": "生產並加入庫存",
    "tavern_ration_message": " 不情願地吃了「公會配給糧」（免費）。「難吃死了…但為了活下去…」（對公會會長的好感度 -{penalty}）",
  "tavern_no_food_at_all": " 什麼都沒吃到，餓著肚子離開了酒館…",
"adventurer_starved_to_death": "{name} 因飢餓而死亡了…！",
  "multiple_adventurers_starved": "{count}名冒險者因飢餓而死亡…（Reputation -{penalty}）",
    "tavern_no_stock": "庫存中沒有料理，無法訂購",
  "tavern_food_too_expensive": "料理太貴了，無法訂購",
  "hunger_label": "飽食度",
    "trait.for_adventurers": "對",
"trait.primary_suffix": "主屬性冒險者",
"trait.compare_suffix": "的冒險者",
"trait.friendliness_prefix": "好感度",
"trait.action_priority_suffix": "行動優先度",
"trait.initial_prefix": "初始",
"trait.higher": "較高",
"trait.lower": "較低",
"trait.male_adventurers": "男性冒險者",
"trait.female_adventurers": "女性冒險者",
"trait.seniors": "等級較高的冒險者",
"trait.juniors": "等級較低的冒險者",
"trait.for_adventurers": "對",
"trait.for_actions": "行動優先度",
"trait.initial": "初始",
"trait.percent_bonus": "{stat} {sign}{value}%",
"trait.friendliness_detail": "好感度{sign}{value} {target}",
"trait.priority_detail": "優先度{sign}{value} {target}",
"trait.primary_adventurers": "{stat}主屬性冒險者",
"trait.level_adventurers": "{level_type}冒險者",
"trait.stat_compare_adventurers": "比自己{comp}{stat}的冒險者",
"trait.likes_men": "喜歡男性",
"trait.likes_women": "喜歡女性",
"trait.dislikes_men": "討厭男性",
"trait.dislikes_women": "討厭女性",
"trait.likes_strength": "喜歡力氣大的人",
"trait.likes_wisdom": "喜歡賢者",
"trait.likes_dexterity": "喜歡靈巧的人",
"trait.likes_luck": "喜歡幸運的人",
"trait.dislikes_strength": "討厭力氣大的人",
"trait.dislikes_wisdom": "討厭賢者",
"trait.dislikes_dexterity": "討厭靈巧的人",
"trait.dislikes_luck": "討厭幸運的人",
"trait.likes_seniors": "喜歡前輩",
"trait.likes_juniors": "喜歡後輩",
"trait.dislikes_seniors": "討厭前輩",
"trait.dislikes_juniors": "討厭後輩",
"trait.respects_stronger": "尊敬比自己強的人",
"trait.respects_wiser": "尊敬比自己聰明的人",
"trait.respects_more_dexterous": "尊敬比自己靈巧的人",
"trait.envies_luckier": "羨慕比自己幸運的人",
"trait.despises_weaker": "輕視比自己弱的人",
"trait.despises_dumber": "輕視比自己笨的人",
"trait.despises_less_dexterous": "輕視比自己笨拙的人",
"trait.despises_less_lucky": "輕視比自己不幸的人",
"trait.likes_tavern": "喜歡酒館",
"trait.teetotaler": "不擅喝酒",
"trait.likes_blacksmith": "喜歡鍛造",
"trait.likes_alchemy": "喜歡鍊金",
"trait.likes_hunting": "喜歡狩獵",
"trait.pacifist": "和平主義",
"trait.likes_gathering": "喜歡採集",
"trait.reclusive": "有点宅",
"trait.active": "活躍",
"trait.likes_street_walking": "喜歡逛街",
"trait.super_strength": "怪力",
"trait.feeble": "力氣弱",
"trait.genius": "天才",
"trait.dimwitted": "遲鈍",
"trait.godly_dexterity": "神技",
"trait.clumsy": "笨拙",
"trait.very_lucky": "強運",
"trait.unlucky": "倒霉",
"trait.tough": "堅韌",
"trait.fragile": "脆弱",
"trait.robust": "強健",
"trait.frail": "虛弱",
"trait.mana_abundant": "魔力豐富",
"trait.mana_poor": "魔力貧乏",
"trait.blessing_of_strength": "力量的祝福",
"trait.curse_of_strength": "力量的詛咒",
"trait.blessing_of_wisdom": "智慧的祝福",
"trait.curse_of_wisdom": "智慧的詛咒",
"trait.blessing_of_dexterity": "敏捷的祝福",
"trait.curse_of_dexterity": "敏捷的詛咒",
"trait.blessing_of_luck": "幸運的祝福",
"trait.curse_of_luck": "幸運的詛咒",
"trait.blessing_of_defense": "防禦的祝福",
"trait.curse_of_defense": "防禦的詛咒",
"trait.none": "無",
"trait.effect.friendliness": "好感度",
"trait.effect.priority": "優先度",
"stat.max_hp": "最大HP",
"stat.max_mp": "最大MP",
    // Tavern (酒館)
    int_tavern_mutual_laugh: "{a}和{b}一邊互相倒酒一邊大笑",
    int_tavern_mutual_food: "{a}和{b}一起分享了美味的料理",
    int_tavern_mutual_sing: "{a}和{b}一起唱歌玩得很開心",
    int_tavern_mutual_gamble_lose: "{a}和{b}在賭博輸了變得不高興",
    int_tavern_mutual_drink_argue: "{a}和{b}為喝酒方式小小爭執了一下",
    int_tavern_uni_treat: "{a}請{b}喝酒",
    int_tavern_uni_treated: "{a}被請喝酒",
    int_tavern_uni_rude_drink: "{a}覺得{b}的喝酒方式很粗魯",
    int_tavern_uni_criticized: "{a}被批評喝酒方式",
    int_tavern_uni_funny_story: "{a}聽{b}的有趣故事感到療癒",
    int_tavern_uni_listened: "{a}熱心地聽了自己的故事",

    // Blacksmith (鍛造)
    int_blacksmith_mutual_polish: "{a}和{b}互相幫對方磨武器",
    int_blacksmith_mutual_success: "{a}和{b}一起為強化成功感到高興",
    int_blacksmith_mutual_failure: "{a}和{b}因為強化失敗感到沮喪",
    int_blacksmith_mutual_technique_argue: "{a}和{b}為鍛造技術意見對立",
    int_blacksmith_uni_tip_learned: "{a}從{b}那學到了鍛造技巧",
    int_blacksmith_uni_tip_taught: "{a}教了鍛造技巧",
    int_blacksmith_uni_admire_tech: "{a}對{b}的鍛造技術感到佩服",
    int_blacksmith_uni_praised: "{a}被讚賞了技術",
    int_blacksmith_uni_hammer_noise: "{a}覺得{b}的錘子聲很吵",
    int_blacksmith_uni_annoyed: "{a}打擾到別人了",

    // Alchemy (煉金)
    int_alchemy_mutual_share_materials: "{a}和{b}互相分享材料進行調合",
    int_alchemy_mutual_new_recipe: "{a}和{b}一起思考新配方",
    int_alchemy_mutual_failure: "{a}和{b}因為調合失敗感到沮喪",
    int_alchemy_uni_rare_material: "{a}從{b}那得到了珍稀材料",
    int_alchemy_uni_gave_material: "{a}給了珍稀材料",
    int_alchemy_uni_help_experiment: "{a}幫{b}做實驗玩得很開心",
    int_alchemy_uni_helped: "{a}幫忙做了實驗",
    int_alchemy_uni_bad_smell: "{a}討厭{b}實驗的氣味",
    int_alchemy_uni_smell_complaint: "{a}被抱怨了實驗氣味",
    int_alchemy_uni_blame_mistake: "{a}責怪{b}調合失誤",
    int_alchemy_uni_blamed: "{a}被責怪調合失誤",

    // Gather (採集)
    int_gather_mutual_rare_herb: "{a}和{b}一起發現了珍稀藥草",
    int_gather_mutual_help: "{a}和{b}互相幫忙採集",
    int_gather_mutual_spot_argue: "{a}和{b}為好的採集地點爭執",
    int_gather_uni_tip_learned: "{a}從{b}那學到了採集技巧",
    int_gather_uni_tip_taught: "{a}教了採集技巧",
    int_gather_uni_admire_amount: "{a}對{b}的採集量感到佩服",
    int_gather_uni_praised_amount: "{a}被讚賞了採集量",
    int_gather_uni_noise: "{a}覺得{b}採集的聲音很吵",
    int_gather_uni_annoyed: "{a}打擾到別人了",
    int_gather_uni_spot_taken: "{a}的採集地點被{b}搶走了",
    int_gather_uni_spot_misunderstanding: "{a}以為自己讓出了地點",

    // Hunting (狩獵)
    int_hunting_mutual_big_preys: "{a}和{b}聯手打倒了大獵物",
    int_hunting_mutual_treat_wounds: "{a}和{b}戰鬥後互相治療傷口",
    int_hunting_mutual_preys_argue: "{a}和{b}為獵物分配爭執",
    int_hunting_uni_saved_life: "{a}被{b}救了一命",
    int_hunting_uni_saved: "{a}救了別人",
    int_hunting_uni_reliable: "{a}覺得{b}的戰鬥力很可靠",
    int_hunting_uni_relied_on: "{a}感覺被依賴了",
    int_hunting_uni_reckless: "{a}對{b}魯莽的突擊感到生氣",
    int_hunting_uni_worried: "{a}讓別人擔心了",
    int_hunting_uni_scary_noise: "{a}被{b}的戰鬥聲嚇到",
    int_hunting_uni_surprised: "{a}嚇到別人了",

    // Default
    int_default_mutual_quiet_talk: "{a}和{b}一邊安靜休息一邊聊天",
    int_default_mutual_guild_future: "{a}和{b}一起討論公會的未來",
    int_default_mutual_distance: "{a}和{b}稍微保持了距離",
    int_default_uni_relieved: "{a}因為{b}的存在感到安心",
    int_default_uni_presence: "{a}在身邊",
    int_default_uni_silence_bother: "{a}對{b}的沉默感到在意",
    int_default_uni_ignored: "{a}感覺被無視了",
    int_default_uni_light_talk: "{a}輕輕地對{b}搭話",
    int_default_uni_talked_to: "{a}被搭話了",
    action_guild_stay: "公會逗留",
    action_street_walk: "街上漫步",
    guild_stay_idle: "在公會休息",
    street_walk_idle: "在街上散步",
    street_walk_found_gold: "在路邊撿到小錢！ +{amount}G",
    action_fee_give_up: "設施費用太高放棄了，跑到街上",
    action_too_expensive: "設施費用太高而放棄（佔了{percent}%…）",
    action_fee_reluctant: "對設施費用猶豫，最終沒進去",
    view_relationship_button: "查看關係性",
relationship_title: "{name} 的關係性",
    relationship_no_others: "沒有其他成員",
    relationship_table_opponent: "對象",
    relationship_table_friendliness: "好感度",
    relationship_table_evaluation: "評價",
    friendliness_love: "大好き",
    friendliness_like: "喜歡",
    friendliness_friendly: "好感",
    friendliness_normal: "普通",
    friendliness_cold: "有些冷淡",
    friendliness_dislike: "討厭",
    friendliness_hate: "很討厭",
    close_button: "關閉",
    save_invalid_slot: "無效的存檔槽編號（1～4）",
    save_corrupted: "存檔槽 {slot} 的資料已損壞！",
    save_loaded: "從存檔槽 {slot} 讀取遊戲！",
    save_no_data: "存檔槽 {slot} 沒有存檔資料！",
    guild_defense_no_adventurer: "沒有冒險者防守公會！",
    advancing_day_wait: "正在推進日子… 請稍候。",
    tax_day: "稅金日！徵收{tax}G。",
    quest_expired: "被忽略的任務「{desc}」期限已過。聲望 -{penalty}。",
    defense_battle_title: "防衛戰: {desc}",
    dungeon_exploration_title: "地下城{floor}層探索",
    boss_battle_title: "與{boss}的決戰",
    day_label: "第{day}天",
    end_day_button: "結束一天 & 派遣冒險者",
    dialogue_skip: "跳過",
    npc_farmer: "農夫 湯瑪斯",
    npc_farmer_short: "湯瑪斯",
    npc_farmer_desc: "村裡的農夫。心地善良，珍惜作物與家畜。以前因史萊姆與野犬受害而困擾，託公會解決後心存感激。誠實但做生意很精明。",

    npc_tavern_owner: "酒館老闆娘 艾蕾娜",
    npc_tavern_owner_short: "艾蕾娜",
    npc_tavern_owner_desc: "村裡酒館的女老闆。開朗親切但精於算計，用金幣賣情報與酒。以前託公會清除地下室的巨大老鼠，心存恩情但與公會保持距離。",

    npc_alchemist: "鍊金術師 阿爾貝特",
    npc_alchemist_short: "阿爾貝特",
    npc_alchemist_desc: "村裡的鍊金術師。有點古怪但知識豐富。因藥草收集任務欠公會人情。熱衷魔力相關實驗。",

    npc_cook: "廚師 瑪麗亞",
    npc_cook_short: "瑪麗亞",
    npc_cook_desc: "村裡的廚師。開朗像媽媽一樣，擅長蘑菇料理。因蘑菇收集任務欠公會人情。喜歡豐收與宴會。",

    npc_scholar: "學者 西奧多",
    npc_scholar_short: "西奧多",
    npc_scholar_desc: "村裡的學者。沉迷於古籍與遺跡研究的知識老人。溫文爾雅，但談到知識時會熱情起來。以前託公會解讀古代文字，心存恩情。",
    chat_with_npc: "與{npc}對話",

    npc_luna: "Luna",
    npc_kaito: "Kaito",
    npc_farmer: "農夫",
    npc_tavern_owner: "酒館老闆",
    npc_alchemist: "鍊金術師",
    npc_cook: "廚師",
    npc_scholar: "學者",
    npc_villager: "村民",
    npc_village_chief: "村長",
    npc_grandma: "老奶奶",
    npcs_section_title: "可聊天的NPC",
    npcs_no_unlocked_desc: "還沒有可以聊天的NPC。<br>請完成任務來解鎖NPC。",
    npcs_count_suffix: "人",
    side_quest_accept_button: "接受支線任務",
    story_dialogue_0_0: "{player}！最近地區盜賊團活動頻繁。而且有傳聞說他們的行動異常有組織…。",
    story_dialogue_0_1: "對啊，這是提升公會名聲的絕佳機會！把他們殲滅，讓大家看看我們的實力！",
    story_dialogue_0_2: "我們也會全力支援！來吧，{player}，發布主線任務吧！",
    story_dialogue_0_3: "你發布了殲滅盜賊團的主線任務，作為提升公會名聲的首次試煉。",

    story_dialogue_1_0: "糟了，{player}！守護古代遺跡的守護者失控，正在接近城鎮…！",
    story_dialogue_1_1: "守護者在守護什麼呢？打倒它來確認真相吧。聽起來很有趣！",
    story_dialogue_1_2: "雖然危險…但這是展現公會力量的時候了！發布主線任務吧！",
    story_dialogue_1_3: "你發布了討伐失控古代守護者並揭開其秘密的主線任務。",

    story_dialogue_2_0: "{player}…聽到了可怕的傳聞。黑暗魔導士正在收集靈魂。必須在有人死亡前阻止她…！",
    story_dialogue_2_1: "收集靈魂什麼的絕對不能原諒。阻止魔導士，守護城鎮。我們要展現真正的實力！",
    story_dialogue_2_2: "是的…！我們會全力支援。請發布主線任務！",
    story_dialogue_2_3: "你發布了阻止黑暗魔導士的重要主線任務。",

    story_dialogue_3_0: "糟了！傳說中的巨龍甦醒，正在焚燒周邊地區…！",
    story_dialogue_3_1: "討伐巨龍嗎！這會成為傳說的，{player}！我們一起打倒它，恢復城鎮的和平吧！",
    story_dialogue_3_2: "真的很危險…但為了公會的名譽！發布主線任務吧！",
    story_dialogue_3_3: "你發布了討伐甦醒傳說巨龍的偉大主線任務。",

    story_dialogue_4_0: "{player}，各地都有黑暗邪教團在進行儀式。聽說他們在策劃復活深淵之王沃爾加斯…！",
    story_dialogue_4_1: "抓住邪教領袖，完全粉碎他們的計劃。這種邪惡絕對不能允許！",
    story_dialogue_4_2: "我們也會全力支援！請發布主線任務！",
    story_dialogue_4_3: "你發布了阻止深淵之王復活的最終主線任務。",
    story_all_completed_title: "所有主線任務已完成！",
    story_all_completed_desc: "深淵之王沃爾加斯已被擊敗，和平回到了世界。恭喜！",

    story_current_title: "目前的主線任務",
    story_difficulty_reward: "難度 {difficulty} | 報酬 {reward}G",
    story_rep_required: "必要聲望: {required} （目前 {current}）",
    story_already_active: "主線任務已在進行中。完成前無法發布下一個。",
    story_rep_insufficient: "聲望不足。請透過日常任務提升聲望。",
    story_post_button: "發布此主線任務",

    main_quest_0_desc: "提升公會名聲的首次試煉 - 殲滅地區盜賊團。最近有傳聞盜賊團的行動異常有組織。",
    main_quest_0_rank: "推薦 >20",

    main_quest_1_desc: "守護古代遺跡的守護者失控來到城鎮。擊敗守護者並揭露它守護的東西。",
    main_quest_1_rank: "推薦 >40",

    main_quest_2_desc: "黑暗魔導士來到城鎮收集靈魂。在有人死亡前阻止她。",
    main_quest_2_rank: "推薦 >60",

    main_quest_3_desc: "傳說中的巨龍甦醒，正在焚燒周邊地區。擊敗巨龍，守護城鎮的和平。",
    main_quest_3_rank: "推薦 >80",

    main_quest_4_desc: "黑暗邪教團在各地進行儀式。捕獲他們的領袖，揭露深淵之王沃爾加斯的復活計劃。",
    main_quest_4_rank: "推薦 >100",
    back_button: "返回",
    inventory: "庫存",
    quest_log_title: "任務日誌",
    quest_log_button: "任務日誌",
    talk_to_hint: "與{npc}對話",
    quest_completed: "（完成）",
    quest_in_progress: "（進行中）",
    shop_borrow_gold: '從商人借錢',
    borrow_explanation: '可以從商人借金。最大借入額為聲望×100G。28日後需全額償還。每7日支付借入額10%的利息（合計40%）。',
    current_reputation: '目前聲望',
    max_borrow_limit: '借入上限',
    currently_borrowed: '已借入額',
    available: '剩餘可借額',
    current_loans: '目前債務',
    principal: '本金',
    borrowed_on_day: '借入日',
    weekly_interest: '每7日利息',
    next_payment_day: '下次支付日',
    interest_only: '僅利息',
    final_with_principal: '利息＋本金',
    final_due_day: '最終償還日',
    borrow_amount: '希望借入額',
    borrow_button: '執行借入',
    borrow_max_reached: '聲望已達上限，無法再借。',
    borrow_invalid_amount: '請以100G為單位輸入。',
    borrow_exceeds_limit: '超過借入上限。',
    borrow_success: '借入了{amount}G。',
    loan_interest_payment: '支付了{payment}G的利息。',
    loan_final_payment: '支付了{payment}G（其中本金{principal}G），債務已清償。',
    AI_setting_button: "AI設定",
    page_title: "失落的冒險之旅",
    game_title: "失落的<br>冒險之旅",
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
    gold_label: "Gold:",
    reputation_label: "聲望:",
    tax_today_prefix: "今日稅金:",
    tax_later_prefix: "{days}天後稅金:",
    game_over_text: "遊戲結束",
    tutorial_speaker: "Narrator",    
    next_button: "下一頁",
    start_game_button: "開始遊戲",
    intro_title: "甦醒",
    intro_description: "你在失憶的狀態下醒來。<br>名為Luna與Kaito的兩人，自稱是你的青梅竹馬，<br>並準備告訴你你的名字與過去。<br><br>請輸入遊戲中要使用的名字。",
    intro_name_placeholder: "輸入名字...",
    intro_decide_button: "確定",
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

    facilities_upgrade_cost: "等級 {level} → {next}　升級費用：{cost} Gold",
    facilities_upgrade_button: "升級",
    facilities_max_level: "已達到最大等級 {max}！",

    facilities_craftable_items: "可製作物品",
    facilities_no_recipes_yet: "提升等級將解鎖新配方",
    facilities_upgrade_to_unlock: "升級設施以解鎖功能",

    facilities_required_materials: "必要素材：",
    facilities_none: "無",
    facilities_owned: "擁有：{have}個",
    facilities_cost: "成本：{cost} Gold",

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
    gold_label: "Gold：",
    sell_no_items: "沒有可賣出的物品。",
    sell_quantity: "x{count}",
    sell_price_each: "{price}{unit}/個",
    sell_price_total: "合計 {total}{unit}",
    sell_button: "賣出",
    sell_one_button: "賣出 1 個",
    sell_all_button: "全部賣出",
    sell_equip_bonus: "+{bonus} {stat}",
    gold_unit: "G",

    potion_hp: "HP",
    potion_mp: "MP",
    enhancement_crystal: "強化水晶",
    dungeon_treasure_gold: "地下城第{floor}層寶箱: +{gold}G",
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
    absolute_symbol: " 絕對值",
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
    trade_insufficient_gold: "Gold不足: 購買成本 {cost}Gold 必要（目前: {current}Gold）",
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
    trade_required_gold: "必要Gold: ",
    trade_deduct_note: "（投稿時扣除）",
    trade_gold_insufficient: "Gold不足",
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
    daily_materials_today: "今日素材",
    daily_materials_empty: "今日沒有素材。",
    buy_button: "購買",

    guild_slots_current: "目前恒久冒險者槽位:",
    guild_slots_next: "下一個槽位: {next} - 升級費用 {cost}G",
    guild_expansion_button: "購買擴建",
    guild_max_expanded: "公會已擴建至最大。",

    corrupt_description: "消耗10聲望獲得100g",
    corrupt_button: "威脅商人",
    borrow_input_note: '(100G單位、最大 {available}G)',
    talk_to_ai_button: "與{name}對話 (AI)",
    view_action_history: "查看行動履歷",
    friendliness_label: "好感度:",
    recovery_hp_used: "使用了{item} → HP +{amount}",
    recovery_mp_used: "使用了{item} → MP +{amount}",

    action_too_expensive: "使用費太高（佔所持金{percent}%），放棄了{action}",
    action_fee_reluctant: "不想支付使用費，放棄了{action}",
    recovery_already_used_note: "（{recovery}已使用）",

    gather_success: "採集了{qty}個{item}",

    alchemy_no_materials: "材料不足，鍊成失敗",
    alchemy_success: "成功鍊成了{recipe}",

    blacksmith_no_equip: "沒有裝備可強化，放棄了",
    blacksmith_success: "成功強化了{equip}！絕對值 +1 ({old} → {new})",
    blacksmith_failure: "強化失敗",

    tavern_rest: "在酒館休息了",
    tavern_food_order: "，順便點了「{food}」({cost}G)",
    tavern_food_too_expensive: "（想點餐但都太貴了，放棄）",
    tavern_gamble_win: "，賭博贏了！獲利{amount}G",
    tavern_gamble_loss: "，賭博輸了！損失{amount}G",

    hunting_report: "獨自去怪物狩獵（HP-{hpLoss}, MP-{mpLoss}, EXP+{expGain}, 金+{goldGain}G, 公會手續費{guildFee}G）",
    hunting_level_up: " → 等級提升！ Lv{level}",

    none_idle: "一天什麼也沒做就過去了",
    none_donation: "一天閒著沒事做，但向公會捐贈了{donation}G",

    recovery_then_action: "{recovery} → 之後{action}",

    daily_guild_gain_positive: "冒險者們的行動帶來 +{amount}G",
    daily_guild_gain_negative: "冒險者們的行動帶來 {amount}G",
    action_gather: "採集",
    action_alchemy: "鍊成",
    action_blacksmith: "鐵匠強化",
    action_tavern: "酒館休息",
    action_hunting: "狩獵",
    action_none: "無",
    

  }
};


function getNpcDisplayName(internalKey) {
    const keyMap = {
        'ルナ': 'npc_luna',
        'カイト': 'npc_kaito',
        '農夫': 'npc_farmer',
        '酒場主人': 'npc_tavern_owner',
        '錬金術師': 'npc_alchemist',
        '料理人': 'npc_cook',
        '学者': 'npc_scholar',
        '村人': 'npc_villager',
        '村長': 'npc_village_chief',
        'おばあさん': 'npc_grandma'
        // 必要に応じて追加
    };
    const translationKey = keyMap[internalKey];
    if (translationKey) {
        return t(translationKey);
    }
    return internalKey; // フォールバック
}

const tavernRecipes = {
  ja: [
    // === 既存レシピ ===
    {level: 1, name: "ギルド配給食", buff: {}, cost: 50, materials: [], hunger_recover: 1.0, isRation: true},
    {level: 1, name: "力のスープ", buff: {stat: "strength", percent: true, bonus: 20, days: 5}, cost: 250, materials: [], hunger_recover: 0.5},
    {level: 2, name: "巨人の煮込み", buff: {stat: "strength", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "活力の粉", qty: 2}], hunger_recover: 0.7},
    {level: 1, name: "知恵の茶", buff: {stat: "wisdom", percent: true, bonus: 20, days: 5}, cost: 250, materials: [], hunger_recover: 0.3},
    {level: 2, name: "予言者の飲料", buff: {stat: "wisdom", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "魔法の結晶", qty: 1}], hunger_recover: 0.3},
    {level: 1, name: "回復のパン", buff: {type: "hpRegen", bonus: 10, days: 14}, cost: 100, materials: [], hunger_recover: 0.4},

    // === STR料理 ===
    {level: 3, name: "獣肉の活力シチュー", buff: {stat: "strength", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "獣皮エキス", qty: 2}, {name: "狼の毛皮", qty: 1}], hunger_recover: 0.7},
    {level: 5, name: "牙鋼の力強煮込み", buff: {stat: "strength", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "牙鋼インゴット", qty: 2}, {name: "オークの牙", qty: 2}], hunger_recover: 0.8},
    {level: 7, name: "龍鋼の巨竜ステーキ", buff: {stat: "strength", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "龍鋼装甲材", qty: 3}, {name: "古代ドラゴンの鱗", qty: 2}], hunger_recover: 0.9},
    {level: 9, name: "巨神骨の力の饗宴", buff: {stat: "strength", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "巨神骨鋼", qty: 3}, {name: "タイタンの骨", qty: 2}], hunger_recover: 1.0},
    {level: 11, name: "古龍心の覇王料理", buff: {stat: "strength", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "古龍心鋼", qty: 4}, {name: "エルダードラゴンの心臓", qty: 1}], hunger_recover: 1.0},

    // === WIS料理 ===
    {level: 3, name: "森の霊薬ティー", buff: {stat: "wisdom", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "森のエキス", qty: 3}], hunger_recover: 0.3},
    {level: 5, name: "聖魔導の浄化茶", buff: {stat: "wisdom", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "聖魔導結晶", qty: 3}, {name: "聖水", qty: 2}], hunger_recover: 0.3},
    {level: 7, name: "禁断魔導の秘酒", buff: {stat: "wisdom", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "禁断魔導晶", qty: 3}, {name: "禁断の魔導書頁", qty: 2}], hunger_recover: 0.4},
    {level: 9, name: "エーテル魔晶の神酒", buff: {stat: "wisdom", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "エーテル魔晶", qty: 4}, {name: "エーテルの結晶", qty: 2}], hunger_recover: 0.5},
    {level: 11, name: "深淵の叡智スープ", buff: {stat: "wisdom", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "深淵エーテル晶", qty: 4}, {name: "深淵の核", qty: 1}], hunger_recover: 0.6},

    // === DEX料理 ===
    {level: 1, name: "川魚の軽やか焼き", buff: {stat: "dexterity", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "川魚", qty: 2}], hunger_recover: 0.4},
    {level: 3, name: "風翼の迅鳥シチュー", buff: {stat: "dexterity", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "風翼結晶", qty: 2}, {name: "グリフォンの羽", qty: 2}], hunger_recover: 0.7},
    {level: 5, name: "ユニコーンの敏捷サラダ", buff: {stat: "dexterity", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "ユニコーンの角", qty: 2}, {name: "花", qty: 3}], hunger_recover: 0.5},
    {level: 7, name: "天使の軽羽パイ", buff: {stat: "dexterity", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "天使の羽", qty: 3}, {name: "天空エキス", qty: 2}], hunger_recover: 0.5},
    {level: 9, name: "神聖迅撃の料理", buff: {stat: "dexterity", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖な遺物", qty: 2}], hunger_recover: 0.8},
    {level: 11, name: "創世の風神料理", buff: {stat: "dexterity", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "創世の欠片", qty: 2}, {name: "風翼結晶", qty: 4}], hunger_recover: 0.9},

    // === LUC料理 ===
    {level: 1, name: "希少スパイスの幸運煮", buff: {stat: "luck", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "希少スパイス", qty: 1}], hunger_recover: 0.6},
    {level: 3, name: "星の幸運デザート", buff: {stat: "luck", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "星の欠片", qty: 2}], hunger_recover: 0.5},
    {level: 5, name: "不死鳥の再生ケーキ", buff: {stat: "luck", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "フェニックスの灰", qty: 2}], hunger_recover: 0.6},
    {level: 7, name: "神涙の福運スープ", buff: {stat: "luck", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "神の涙", qty: 2}, {name: "永劫炎粉", qty: 2}], hunger_recover: 0.7},
    {level: 9, name: "終焉の幸運饗宴", buff: {stat: "luck", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "終焉破壊粉", qty: 3}, {name: "滅びの結晶", qty: 2}], hunger_recover: 1.0},
    {level: 11, name: "滅び深淵の神運料理", buff: {stat: "luck", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "滅び深淵晶", qty: 4}, {name: "世界の源石", qty: 1}], hunger_recover: 1.0},

    // === 回復/再生系 ===
    {level: 2, name: "キノコの活力パン", buff: {type: "hpRegen", bonus: 15, days: 14}, cost: 200, materials: [{name: "キノコ", qty: 3}], hunger_recover: 0.4},
    {level: 4, name: "解毒聖水の癒しスープ", buff: {type: "hpRegen", bonus: 20, days: 14}, cost: 300, materials: [{name: "解毒聖水", qty: 2}], hunger_recover: 0.5},
    {level: 6, name: "天使癒薬の神パン", buff: {type: "hpRegen", bonus: 25, days: 14}, cost: 400, materials: [{name: "天使癒薬", qty: 2}], hunger_recover: 0.5},
    {level: 8, name: "神涙神薬の至高スープ", buff: {type: "hpRegen", bonus: 30, days: 14}, cost: 500, materials: [{name: "神涙神薬", qty: 1}], hunger_recover: 0.6},
    {level: 10, name: "世界源神薬の永遠パン", buff: {type: "hpRegen", bonus: 35, days: 14}, cost: 600, materials: [{name: "世界源神薬", qty: 1}], hunger_recover: 0.6},

    {level: 3, name: "小魔力ポーションの魔茶", buff: {type: "mpRegen", bonus: 30, days: 8}, cost: 1500, materials: [{name: "小魔力ポーション", qty: 2}], hunger_recover: 0.3},
    {level: 6, name: "星風ポーションの星茶", buff: {type: "mpRegen", bonus: 80, days: 15}, cost: 5200, materials: [{name: "星風ポーション", qty: 2}], hunger_recover: 0.4},
    {level: 9, name: "創世魔力薬の神酒", buff: {type: "mpRegen", bonus: 150, days: 25}, cost: 11800, materials: [{name: "創世魔力薬", qty: 1}], hunger_recover: 0.5},

    // === 究極バフ料理 ===
    {level: 12, name: "創世源の神饗宴", buff: {stat: "strength", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世源ポーション", qty: 1}, {name: "古龍心鋼", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "世界源の叡智宴", buff: {stat: "wisdom", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神薬", qty: 1}, {name: "光神器晶", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "終焉の迅神料理", buff: {stat: "dexterity", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世魔力薬", qty: 1}, {name: "神聖遺晶", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "源石の永運饗宴", buff: {stat: "luck", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神薬", qty: 1}, {name: "滅び深淵晶", qty: 4}], hunger_recover: 1.0}
  ],
  en: [
    {level: 1, name: "Guild Ration", buff: {}, cost: 50, materials: [], hunger_recover: 1.0, isRation: true},
    {level: 1, name: "Strength Soup", buff: {stat: "strength", percent: true, bonus: 20, days: 5}, cost: 250, materials: [], hunger_recover: 0.5},
    {level: 2, name: "Giant's Stew", buff: {stat: "strength", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "Vitality Powder", qty: 2}], hunger_recover: 0.7},
    {level: 1, name: "Wisdom Tea", buff: {stat: "wisdom", percent: true, bonus: 20, days: 5}, cost: 250, materials: [], hunger_recover: 0.3},
    {level: 2, name: "Prophet's Elixir", buff: {stat: "wisdom", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "Magic Crystal", qty: 1}], hunger_recover: 0.3},
    {level: 1, name: "Healing Bread", buff: {type: "hpRegen", bonus: 10, days: 14}, cost: 100, materials: [], hunger_recover: 0.4},

    {level: 3, name: "Beast Vitality Stew", buff: {stat: "strength", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Beast Skin Extract", qty: 2}, {name: "Wolf Pelt", qty: 1}], hunger_recover: 0.7},
    {level: 5, name: "Fang-Steel Power Stew", buff: {stat: "strength", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Fang Steel Ingot", qty: 2}, {name: "Orc Tusk", qty: 2}], hunger_recover: 0.8},
    {level: 7, name: "Dragon-Steel Drake Steak", buff: {stat: "strength", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Dragon Steel Armor Material", qty: 3}, {name: "Ancient Dragon Scale", qty: 2}], hunger_recover: 0.9},
    {level: 9, name: "Titan's Power Banquet", buff: {stat: "strength", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Titan Bone Steel", qty: 3}, {name: "Titan Bone", qty: 2}], hunger_recover: 1.0},
    {level: 11, name: "Ancient Dragon Overlord Dish", buff: {stat: "strength", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Ancient Dragon Heart Steel", qty: 4}, {name: "Elder Dragon Heart", qty: 1}], hunger_recover: 1.0},

    {level: 3, name: "Forest Elixir Tea", buff: {stat: "wisdom", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Forest Extract", qty: 3}], hunger_recover: 0.3},
    {level: 5, name: "Holy Purification Tea", buff: {stat: "wisdom", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Holy Magic Crystal", qty: 3}, {name: "Holy Water", qty: 2}], hunger_recover: 0.3},
    {level: 7, name: "Forbidden Secret Wine", buff: {stat: "wisdom", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Forbidden Magic Crystal", qty: 3}, {name: "Forbidden Grimoire Page", qty: 2}], hunger_recover: 0.4},
    {level: 9, name: "Aether God Wine", buff: {stat: "wisdom", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Aether Magic Crystal", qty: 4}, {name: "Aether Crystal", qty: 2}], hunger_recover: 0.5},
    {level: 11, name: "Abyss Wisdom Soup", buff: {stat: "wisdom", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Abyss Aether Crystal", qty: 4}, {name: "Abyss Core", qty: 1}], hunger_recover: 0.6},

    {level: 1, name: "Light River Fish Grill", buff: {stat: "dexterity", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "River Fish", qty: 2}], hunger_recover: 0.4},
    {level: 3, name: "Wind-Wing Swift Stew", buff: {stat: "dexterity", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Wind Wing Crystal", qty: 2}, {name: "Griffon Feather", qty: 2}], hunger_recover: 0.7},
    {level: 5, name: "Unicorn Agility Salad", buff: {stat: "dexterity", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Unicorn Horn", qty: 2}, {name: "Flower", qty: 3}], hunger_recover: 0.5},
    {level: 7, name: "Angel Feather Pie", buff: {stat: "dexterity", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Angel Feather", qty: 3}, {name: "Sky Extract", qty: 2}], hunger_recover: 0.5},
    {level: 9, name: "Sacred Swift Dish", buff: {stat: "dexterity", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Sacred Relic Crystal", qty: 3}, {name: "Sacred Relic", qty: 2}], hunger_recover: 0.8},
    {level: 11, name: "Creation Wind God Dish", buff: {stat: "dexterity", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Creation Fragment", qty: 2}, {name: "Wind Wing Crystal", qty: 4}], hunger_recover: 0.9},

    {level: 1, name: "Rare Spice Luck Stew", buff: {stat: "luck", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "Rare Spice", qty: 1}], hunger_recover: 0.6},
    {level: 3, name: "Star Luck Dessert", buff: {stat: "luck", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "Star Fragment", qty: 2}], hunger_recover: 0.5},
    {level: 5, name: "Phoenix Regeneration Cake", buff: {stat: "luck", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "Phoenix Flame Powder", qty: 3}, {name: "Phoenix Ash", qty: 2}], hunger_recover: 0.6},
    {level: 7, name: "Divine Tear Fortune Soup", buff: {stat: "luck", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "Divine Tear", qty: 2}, {name: "Eternal Calamity Flame Powder", qty: 2}], hunger_recover: 0.7},
    {level: 9, name: "Apocalypse Luck Banquet", buff: {stat: "luck", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "Apocalypse Destruction Powder", qty: 3}, {name: "Crystal of Destruction", qty: 2}], hunger_recover: 1.0},
    {level: 11, name: "Abyss God Luck Dish", buff: {stat: "luck", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "Destruction Abyss Crystal", qty: 4}, {name: "World Origin Stone", qty: 1}], hunger_recover: 1.0},

    {level: 2, name: "Mushroom Vitality Bread", buff: {type: "hpRegen", bonus: 15, days: 14}, cost: 200, materials: [{name: "Mushroom", qty: 3}], hunger_recover: 0.4},
    {level: 4, name: "Detoxified Healing Soup", buff: {type: "hpRegen", bonus: 20, days: 14}, cost: 300, materials: [{name: "Detoxified Holy Water", qty: 2}], hunger_recover: 0.5},
    {level: 6, name: "Angel Divine Bread", buff: {type: "hpRegen", bonus: 25, days: 14}, cost: 400, materials: [{name: "Angel Healing Potion", qty: 2}], hunger_recover: 0.5},
    {level: 8, name: "Divine Tear Supreme Soup", buff: {type: "hpRegen", bonus: 30, days: 14}, cost: 500, materials: [{name: "Divine Tear Divine Potion", qty: 1}], hunger_recover: 0.6},
    {level: 10, name: "World Source Eternal Bread", buff: {type: "hpRegen", bonus: 35, days: 14}, cost: 600, materials: [{name: "World Source Divine Potion", qty: 1}], hunger_recover: 0.6},

    {level: 3, name: "Minor Mana Magic Tea", buff: {type: "mpRegen", bonus: 30, days: 8}, cost: 1500, materials: [{name: "Minor Mana Potion", qty: 2}], hunger_recover: 0.3},
    {level: 6, name: "Star Wind Tea", buff: {type: "mpRegen", bonus: 80, days: 15}, cost: 5200, materials: [{name: "Star Wind Potion", qty: 2}], hunger_recover: 0.4},
    {level: 9, name: "Creation God Wine", buff: {type: "mpRegen", bonus: 150, days: 25}, cost: 11800, materials: [{name: "Creation Mana Potion", qty: 1}], hunger_recover: 0.5},

    {level: 12, name: "Creation Source Divine Banquet", buff: {stat: "strength", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "Creation Source Potion", qty: 1}, {name: "Ancient Dragon Heart Steel", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "World Source Wisdom Banquet", buff: {stat: "wisdom", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Light Artifact Crystal", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "Apocalypse Swift God Dish", buff: {stat: "dexterity", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "Creation Mana Potion", qty: 1}, {name: "Sacred Relic Crystal", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "Source Stone Eternal Luck Banquet", buff: {stat: "luck", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Destruction Abyss Crystal", qty: 4}], hunger_recover: 1.0}
  ],
  zh: [
    {level: 1, name: "公會配給糧", buff: {}, cost: 50, materials: [], hunger_recover: 1.0, isRation: true},
    {level: 1, name: "力量湯", buff: {stat: "strength", percent: true, bonus: 20, days: 5}, cost: 250, materials: [], hunger_recover: 0.5},
    {level: 2, name: "巨人燉煮", buff: {stat: "strength", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "活力粉末", qty: 2}], hunger_recover: 0.7},
    {level: 1, name: "智慧茶", buff: {stat: "wisdom", percent: true, bonus: 20, days: 5}, cost: 250, materials: [], hunger_recover: 0.3},
    {level: 2, name: "預言者飲料", buff: {stat: "wisdom", percent: true, bonus: 40, days: 7}, cost: 800, materials: [{name: "魔法結晶", qty: 1}], hunger_recover: 0.3},
    {level: 1, name: "回復麵包", buff: {type: "hpRegen", bonus: 10, days: 14}, cost: 100, materials: [], hunger_recover: 0.4},

    {level: 3, name: "獸肉活力燉湯", buff: {stat: "strength", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "獸皮精華", qty: 2}, {name: "狼皮", qty: 1}], hunger_recover: 0.7},
    {level: 5, name: "牙鋼強力燉煮", buff: {stat: "strength", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "牙鋼錠", qty: 2}, {name: "獸人獠牙", qty: 2}], hunger_recover: 0.8},
    {level: 7, name: "龍鋼巨龍牛排", buff: {stat: "strength", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "龍鋼裝甲材", qty: 3}, {name: "古代龍鱗", qty: 2}], hunger_recover: 0.9},
    {level: 9, name: "巨神骨力量盛宴", buff: {stat: "strength", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "巨神骨鋼", qty: 3}, {name: "泰坦骨頭", qty: 2}], hunger_recover: 1.0},
    {level: 11, name: "古龍心霸王料理", buff: {stat: "strength", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "古龍心鋼", qty: 4}, {name: "長老龍之心", qty: 1}], hunger_recover: 1.0},

    {level: 3, name: "森林靈藥茶", buff: {stat: "wisdom", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "森林精華", qty: 3}], hunger_recover: 0.3},
    {level: 5, name: "聖魔導淨化茶", buff: {stat: "wisdom", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "聖魔導結晶", qty: 3}, {name: "聖水", qty: 2}], hunger_recover: 0.3},
    {level: 7, name: "禁斷魔導秘酒", buff: {stat: "wisdom", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "禁斷魔導晶", qty: 3}, {name: "禁斷魔導書頁", qty: 2}], hunger_recover: 0.4},
    {level: 9, name: "以太魔晶神酒", buff: {stat: "wisdom", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "以太魔晶", qty: 4}, {name: "以太結晶", qty: 2}], hunger_recover: 0.5},
    {level: 11, name: "深淵睿智湯", buff: {stat: "wisdom", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "深淵以太晶", qty: 4}, {name: "深淵核心", qty: 1}], hunger_recover: 0.6},

    {level: 1, name: "河魚輕盈烤", buff: {stat: "dexterity", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "河魚", qty: 2}], hunger_recover: 0.4},
    {level: 3, name: "風翼迅鳥燉湯", buff: {stat: "dexterity", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "風翼結晶", qty: 2}, {name: "獅鷲羽毛", qty: 2}], hunger_recover: 0.7},
    {level: 5, name: "獨角獸敏捷沙拉", buff: {stat: "dexterity", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "獨角獸角", qty: 2}, {name: "花朵", qty: 3}], hunger_recover: 0.5},
    {level: 7, name: "天使輕羽派", buff: {stat: "dexterity", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "天使羽毛", qty: 3}, {name: "天空精華", qty: 2}], hunger_recover: 0.5},
    {level: 9, name: "神聖迅擊料理", buff: {stat: "dexterity", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖遺物", qty: 2}], hunger_recover: 0.8},
    {level: 11, name: "創世風神料理", buff: {stat: "dexterity", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "創世碎片", qty: 2}, {name: "風翼結晶", qty: 4}], hunger_recover: 0.9},

    {level: 1, name: "稀有香料幸運煮", buff: {stat: "luck", percent: true, bonus: 20, days: 5}, cost: 250, materials: [{name: "稀有香料", qty: 1}], hunger_recover: 0.6},
    {level: 3, name: "星星幸運甜點", buff: {stat: "luck", percent: true, bonus: 60, days: 10}, cost: 1800, materials: [{name: "星之碎片", qty: 2}], hunger_recover: 0.5},
    {level: 5, name: "不死鳥再生蛋糕", buff: {stat: "luck", percent: true, bonus: 90, days: 14}, cost: 4200, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "鳳凰灰燼", qty: 2}], hunger_recover: 0.6},
    {level: 7, name: "神淚福運湯", buff: {stat: "luck", percent: true, bonus: 130, days: 20}, cost: 7800, materials: [{name: "神之淚", qty: 2}, {name: "永劫炎粉", qty: 2}], hunger_recover: 0.7},
    {level: 9, name: "終焉幸運盛宴", buff: {stat: "luck", percent: true, bonus: 180, days: 25}, cost: 12800, materials: [{name: "終焉破壞粉", qty: 3}, {name: "滅亡結晶", qty: 2}], hunger_recover: 1.0},
    {level: 11, name: "滅亡深淵神運料理", buff: {stat: "luck", percent: true, bonus: 260, days: 30}, cost: 24800, materials: [{name: "滅亡深淵晶", qty: 4}, {name: "世界源石", qty: 1}], hunger_recover: 1.0},

    {level: 2, name: "蘑菇活力麵包", buff: {type: "hpRegen", bonus: 15, days: 14}, cost: 200, materials: [{name: "蘑菇", qty: 3}], hunger_recover: 0.4},
    {level: 4, name: "解毒療癒湯", buff: {type: "hpRegen", bonus: 20, days: 14}, cost: 300, materials: [{name: "解毒聖水", qty: 2}], hunger_recover: 0.5},
    {level: 6, name: "天使神聖麵包", buff: {type: "hpRegen", bonus: 25, days: 14}, cost: 400, materials: [{name: "天使癒藥", qty: 2}], hunger_recover: 0.5},
    {level: 8, name: "神淚至高湯", buff: {type: "hpRegen", bonus: 30, days: 14}, cost: 500, materials: [{name: "神淚神藥", qty: 1}], hunger_recover: 0.6},
    {level: 10, name: "世界源永遠麵包", buff: {type: "hpRegen", bonus: 35, days: 14}, cost: 600, materials: [{name: "世界源神藥", qty: 1}], hunger_recover: 0.6},

    {level: 3, name: "小型魔力魔茶", buff: {type: "mpRegen", bonus: 30, days: 8}, cost: 1500, materials: [{name: "小型魔力藥劑", qty: 2}], hunger_recover: 0.3},
    {level: 6, name: "星風茶", buff: {type: "mpRegen", bonus: 80, days: 15}, cost: 5200, materials: [{name: "星風藥劑", qty: 2}], hunger_recover: 0.4},
    {level: 9, name: "創世神酒", buff: {type: "mpRegen", bonus: 150, days: 25}, cost: 11800, materials: [{name: "創世魔力藥", qty: 1}], hunger_recover: 0.5},

    {level: 12, name: "創世源神聖盛宴", buff: {stat: "strength", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世源藥劑", qty: 1}, {name: "古龍心鋼", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "世界源睿智盛宴", buff: {stat: "wisdom", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神藥", qty: 1}, {name: "光神器晶", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "終焉迅神料理", buff: {stat: "dexterity", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "創世魔力藥", qty: 1}, {name: "神聖遺晶", qty: 4}], hunger_recover: 1.0},
    {level: 12, name: "源石永運盛宴", buff: {stat: "luck", percent: true, bonus: 400, days: 60}, cost: 45000, materials: [{name: "世界源神藥", qty: 1}, {name: "滅亡深淵晶", qty: 4}], hunger_recover: 1.0}
  ]
};

const blacksmithRecipes = {
  ja: [
    // === One Hands (片手盾: 武器と併用可能、防御特化) ===
    {level: 1, name: "木製の小盾", stat: "defense", bonus: 15, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 3, name: "鉄の小盾", stat: "defense", bonus: 30, enhancement: 8, category: "One Hand", cost: 1800, materials: [{name: "鋼のインゴット", qty: 3}]},
    {level: 6, name: "龍鱗の小盾", stat: "defense", bonus: 60, enhancement: 12, category: "One Hand", cost: 6200, materials: [{name: "龍鋼装甲材", qty: 3}, {name: "古代ドラゴンの鱗", qty: 1}]},
    {level: 10, name: "古龍の小盾", stat: "defense", bonus: 130, enhancement: 18, category: "One Hand", cost: 18000, materials: [{name: "古龍心鋼", qty: 3}, {name: "エルダードラゴンの心臓", qty: 1}]},

    // === Both Handss (両手大盾: 両手占有、高防御・特殊効果) ===
    {level: 2, name: "木製の守護盾", stat: "defense", bonus: 25, enhancement: 8, category: "Both Hands", cost: 800, materials: []},
    {level: 4, name: "精鉄の守護盾", stat: "defense", bonus: 45, enhancement: 12, category: "Both Hands", cost: 3200, materials: [{name: "精鉄インゴット", qty: 4}]},
    {level: 7, name: "牙鋼の守護盾", stat: "defense", bonus: 85, enhancement: 16, category: "Both Hands", cost: 9800, materials: [{name: "牙鋼インゴット", qty: 4}, {name: "オークの牙", qty: 3}]},
    {level: 9, name: "巨神の守護盾", stat: "defense", bonus: 150, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "巨神骨鋼", qty: 3}, {name: "タイタンの骨", qty: 3}]},
    {level: 11, name: "創世源の守護神盾", stat: "defense", bonus: 280, enhancement: 30, category: "Both Hands", cost: 40000, materials: [{name: "創世源ポーション", qty: 1}, {name: "古龍心鋼", qty: 5}]},

    // === Head ===
    {level: 1, name: "革の帽子", stat: "defense", bonus: 10, enhancement: 5, category: "Head", cost: 400, materials: []},
    {level: 3, name: "鉄の兜", stat: "defense", bonus: 25, enhancement: 8, category: "Head", cost: 1800, materials: [{name: "鋼のインゴット", qty: 3}]},
    {level: 6, name: "龍鱗の兜", stat: "defense", bonus: 55, enhancement: 12, category: "Head", cost: 6200, materials: [{name: "龍鋼装甲材", qty: 3}, {name: "古代ドラゴンの鱗", qty: 1}]},
    {level: 10, name: "古龍の兜", stat: "defense", bonus: 120, enhancement: 18, category: "Head", cost: 18000, materials: [{name: "古龍心鋼", qty: 3}, {name: "エルダードラゴンの心臓", qty: 1}]},

    // === Body ===
    {level: 1, name: "革の鎧", stat: "defense", bonus: 15, enhancement: 8, category: "Body", cost: 600, materials: []},
    {level: 4, name: "鎖帷子", stat: "defense", bonus: 40, enhancement: 12, category: "Body", cost: 3200, materials: [{name: "精鉄インゴット", qty: 5}]},
    {level: 7, name: "牙鋼の鎧", stat: "defense", bonus: 80, enhancement: 16, category: "Body", cost: 9800, materials: [{name: "牙鋼インゴット", qty: 4}, {name: "オークの牙", qty: 3}]},
    {level: 11, name: "巨神の鎧", stat: "defense", bonus: 180, enhancement: 22, category: "Body", cost: 32000, materials: [{name: "巨神骨鋼", qty: 4}, {name: "タイタンの骨", qty: 3}]},

    // === Legs ===
    {level: 2, name: "革のズボン", stat: "dexterity", bonus: 12, enhancement: 6, category: "Legs", cost: 800, materials: [{name: "獣皮エキス", qty: 2}]},
    {level: 5, name: "鉄の脛当て", stat: "defense", bonus: 35, enhancement: 10, category: "Legs", cost: 4200, materials: [{name: "鋼のインゴット", qty: 4}]},
    {level: 8, name: "龍鋼の脛当て", stat: "defense", bonus: 70, enhancement: 15, category: "Legs", cost: 12000, materials: [{name: "龍鋼装甲材", qty: 3}]},

    // === Feet ===
    {level: 1, name: "革のブーツ", stat: "dexterity", bonus: 8, enhancement: 4, category: "Feet", cost: 400, materials: []},
    {level: 4, name: "エルフのブーツ", stat: "dexterity", bonus: 35, enhancement: 10, category: "Feet", cost: 3200, materials: [{name: "風翼結晶", qty: 2}, {name: "獣皮エキス", qty: 2}]},
    {level: 9, name: "天使の迅靴", stat: "dexterity", bonus: 90, enhancement: 18, category: "Feet", cost: 16000, materials: [{name: "天使の羽", qty: 3}, {name: "風翼結晶", qty: 3}]},

    // === Gloves ===
    {level: 2, name: "作業用手袋", stat: "strength", bonus: 12, enhancement: 6, category: "Gloves", cost: 800, materials: [{name: "獣皮エキス", qty: 2}]},
    {level: 5, name: "魔法の手袋", stat: "wisdom", bonus: 30, enhancement: 10, category: "Gloves", cost: 4000, materials: [{name: "魔法の結晶", qty: 3}]},
    {level: 8, name: "龍鋼の手甲", stat: "strength", bonus: 65, enhancement: 14, category: "Gloves", cost: 11000, materials: [{name: "龍鋼装甲材", qty: 2}, {name: "牙鋼インゴット", qty: 2}]},

    // === Cape ===
    {level: 3, name: "旅人のマント", stat: "luck", bonus: 15, enhancement: 7, category: "Cape", cost: 1200, materials: [{name: "希少活力粉", qty: 2}]},
    {level: 6, name: "神秘のマント", stat: "wisdom", bonus: 45, enhancement: 12, category: "Cape", cost: 6800, materials: [{name: "エーテル魔晶", qty: 2}, {name: "聖魔導結晶", qty: 2}]},
    {level: 10, name: "神聖のマント", stat: "luck", bonus: 110, enhancement: 20, category: "Cape", cost: 22000, materials: [{name: "神聖遺晶", qty: 3}, {name: "天使の羽", qty: 2}]},

    // === Accessory ===
    {level: 1, name: "幸運のコイン", stat: "luck", bonus: 10, enhancement: 5, category: "Accessory", cost: 400, materials: []},
    {level: 4, name: "四つ葉のクローバー", stat: "luck", bonus: 35, enhancement: 10, category: "Accessory", cost: 3000, materials: [{name: "希少活力粉", qty: 3}]},
    {level: 9, name: "神の涙の首飾り", stat: "luck", bonus: 100, enhancement: 18, category: "Accessory", cost: 15000, materials: [{name: "神の涙", qty: 2}, {name: "星の欠片", qty: 3}]},

    // === One Hand Weapons ===
    {level: 1, name: "上級の剣", stat: "strength", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 2, name: "鋼鉄の剣", stat: "strength", bonus: 25, enhancement: 8, category: "One Hand", cost: 1200, materials: [{name: "鋼のインゴット", qty: 3}]},
    {level: 4, name: "ドラゴンスレイヤー", stat: "strength", bonus: 45, enhancement: 12, category: "One Hand", cost: 3000, materials: [{name: "魔法の結晶", qty: 2}, {name: "鋼のインゴット", qty: 5}]},
    {level: 1, name: "賢者の杖", stat: "wisdom", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 2, name: "神秘の杖", stat: "wisdom", bonus: 25, enhancement: 8, category: "One Hand", cost: 1200, materials: [{name: "魔法の結晶", qty: 2}]},
    {level: 1, name: "獣皮の短剣", stat: "dexterity", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: [{name: "獣皮エキス", qty: 2}]},
    {level: 5, name: "ユニコーンのダガー", stat: "dexterity", bonus: 65, enhancement: 14, category: "One Hand", cost: 4800, materials: [{name: "ユニコーンの角", qty: 2}, {name: "獣皮エキス", qty: 3}]},
    {level: 1, name: "希少スパイスの短棍", stat: "luck", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: [{name: "希少活力粉", qty: 2}]},

    // === Both Hands Weapons ===
    {level: 3, name: "精鉄の大剣", stat: "strength", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "精鉄インゴット", qty: 4}]},
    {level: 5, name: "牙鋼の両手斧", stat: "strength", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "牙鋼インゴット", qty: 3}, {name: "オークの牙", qty: 2}]},
    {level: 7, name: "龍鋼の滅殺剣", stat: "strength", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "龍鋼装甲材", qty: 4}, {name: "古代ドラゴンの鱗", qty: 2}]},
    {level: 9, name: "巨神の戦斧", stat: "strength", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "巨神骨鋼", qty: 3}, {name: "タイタンの骨", qty: 3}]},
    {level: 11, name: "古龍心滅剣", stat: "strength", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "古龍心鋼", qty: 4}, {name: "エルダードラゴンの心臓", qty: 1}]},
    {level: 3, name: "聖魔導の杖", stat: "wisdom", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "聖魔導結晶", qty: 3}]},
    {level: 5, name: "禁断魔導のロッド", stat: "wisdom", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "禁断魔導晶", qty: 3}, {name: "禁断の魔導書頁", qty: 2}]},
    {level: 7, name: "エーテル魔晶杖", stat: "wisdom", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "エーテル魔晶", qty: 4}, {name: "エーテルの結晶", qty: 2}]},
    {level: 9, name: "深淵の魔導杖", stat: "wisdom", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "深淵エーテル晶", qty: 3}, {name: "深淵の核", qty: 2}]},
    {level: 11, name: "光神器の神杖", stat: "wisdom", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "光神器晶", qty: 4}, {name: "光の神器の欠片", qty: 1}]},
    {level: 3, name: "風翼の弓", stat: "dexterity", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "風翼結晶", qty: 3}, {name: "グリフォンの羽", qty: 2}]},
    {level: 7, name: "天使の迅弓", stat: "dexterity", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "天使の羽", qty: 3}, {name: "風翼結晶", qty: 2}]},
    {level: 9, name: "神聖迅撃短剣", stat: "dexterity", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖な遺物", qty: 2}]},
    {level: 11, name: "創世の神弓", stat: "dexterity", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "創世の欠片", qty: 2}, {name: "風翼結晶", qty: 4}]},
    {level: 3, name: "星の幸運棍", stat: "luck", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "星の欠片", qty: 2}]},
    {level: 5, name: "不死鳥の幸運斧", stat: "luck", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "フェニックスの灰", qty: 2}]},
    {level: 7, name: "神涙の福杖", stat: "luck", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "神の涙", qty: 2}, {name: "永劫炎粉", qty: 2}]},
    {level: 9, name: "終焉の幸運剣", stat: "luck", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "終焉破壊粉", qty: 3}, {name: "滅びの結晶", qty: 2}]},
    {level: 11, name: "滅び深淵の神器棍", stat: "luck", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "滅び深淵晶", qty: 4}, {name: "世界の源石", qty: 1}]},

    // === 最終装備（レベル12）===
    {level: 12, name: "創世源の神剣", stat: "strength", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "創世源ポーション", qty: 1}, {name: "古龍心鋼", qty: 5}]},
    {level: 12, name: "世界源の神杖", stat: "wisdom", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "世界源神薬", qty: 1}, {name: "光神器晶", qty: 5}]},
    {level: 12, name: "終焉の神弓", stat: "dexterity", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "創世魔力薬", qty: 1}, {name: "神聖遺晶", qty: 5}]},
    {level: 12, name: "源石の幸運神器", stat: "luck", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "世界源神薬", qty: 1}, {name: "滅び深淵晶", qty: 5}]}
  ],
  en: [
    // === One Hands ===
    {level: 1, name: "Small Wooden Shield", stat: "defense", bonus: 15, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 3, name: "Small Iron Shield", stat: "defense", bonus: 30, enhancement: 8, category: "One Hand", cost: 1800, materials: [{name: "Steel Ingot", qty: 3}]},
    {level: 6, name: "Small Dragon Scale Shield", stat: "defense", bonus: 60, enhancement: 12, category: "One Hand", cost: 6200, materials: [{name: "Dragon Steel Armor Material", qty: 3}, {name: "Ancient Dragon Scale", qty: 1}]},
    {level: 10, name: "Small Ancient Dragon Shield", stat: "defense", bonus: 130, enhancement: 18, category: "One Hand", cost: 18000, materials: [{name: "Ancient Dragon Heart Steel", qty: 3}, {name: "Elder Dragon Heart", qty: 1}]},

    // === Both Handss ===
    {level: 2, name: "Wooden Guardian Shield", stat: "defense", bonus: 25, enhancement: 8, category: "Both Hands", cost: 800, materials: []},
    {level: 4, name: "Refined Iron Guardian Shield", stat: "defense", bonus: 45, enhancement: 12, category: "Both Hands", cost: 3200, materials: [{name: "Refined Iron Ingot", qty: 4}]},
    {level: 7, name: "Fang-Steel Guardian Shield", stat: "defense", bonus: 85, enhancement: 16, category: "Both Hands", cost: 9800, materials: [{name: "Fang Steel Ingot", qty: 4}, {name: "Orc Tusk", qty: 3}]},
    {level: 9, name: "Titan Guardian Shield", stat: "defense", bonus: 150, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "Titan Bone Steel", qty: 3}, {name: "Titan Bone", qty: 3}]},
    {level: 11, name: "Creation Source Guardian God Shield", stat: "defense", bonus: 280, enhancement: 30, category: "Both Hands", cost: 40000, materials: [{name: "Creation Source Potion", qty: 1}, {name: "Ancient Dragon Heart Steel", qty: 5}]},

    // === Head ===
    {level: 1, name: "Leather Cap", stat: "defense", bonus: 10, enhancement: 5, category: "Head", cost: 400, materials: []},
    {level: 3, name: "Iron Helmet", stat: "defense", bonus: 25, enhancement: 8, category: "Head", cost: 1800, materials: [{name: "Steel Ingot", qty: 3}]},
    {level: 6, name: "Dragon Scale Helm", stat: "defense", bonus: 55, enhancement: 12, category: "Head", cost: 6200, materials: [{name: "Dragon Steel Armor Material", qty: 3}, {name: "Ancient Dragon Scale", qty: 1}]},
    {level: 10, name: "Ancient Dragon Helm", stat: "defense", bonus: 120, enhancement: 18, category: "Head", cost: 18000, materials: [{name: "Ancient Dragon Heart Steel", qty: 3}, {name: "Elder Dragon Heart", qty: 1}]},

    // === Body ===
    {level: 1, name: "Leather Armor", stat: "defense", bonus: 15, enhancement: 8, category: "Body", cost: 600, materials: []},
    {level: 4, name: "Chain Mail", stat: "defense", bonus: 40, enhancement: 12, category: "Body", cost: 3200, materials: [{name: "Refined Iron Ingot", qty: 5}]},
    {level: 7, name: "Fang-Steel Armor", stat: "defense", bonus: 80, enhancement: 16, category: "Body", cost: 9800, materials: [{name: "Fang Steel Ingot", qty: 4}, {name: "Orc Tusk", qty: 3}]},
    {level: 11, name: "Titan Armor", stat: "defense", bonus: 180, enhancement: 22, category: "Body", cost: 32000, materials: [{name: "Titan Bone Steel", qty: 4}, {name: "Titan Bone", qty: 3}]},

    // === Legs ===
    {level: 2, name: "Leather Pants", stat: "dexterity", bonus: 12, enhancement: 6, category: "Legs", cost: 800, materials: [{name: "Beast Skin Extract", qty: 2}]},
    {level: 5, name: "Iron Greaves", stat: "defense", bonus: 35, enhancement: 10, category: "Legs", cost: 4200, materials: [{name: "Steel Ingot", qty: 4}]},
    {level: 8, name: "Dragon Steel Greaves", stat: "defense", bonus: 70, enhancement: 15, category: "Legs", cost: 12000, materials: [{name: "Dragon Steel Armor Material", qty: 3}]},

    // === Feet ===
    {level: 1, name: "Leather Boots", stat: "dexterity", bonus: 8, enhancement: 4, category: "Feet", cost: 400, materials: []},
    {level: 4, name: "Elf Boots", stat: "dexterity", bonus: 35, enhancement: 10, category: "Feet", cost: 3200, materials: [{name: "Wind Wing Crystal", qty: 2}, {name: "Beast Skin Extract", qty: 2}]},
    {level: 9, name: "Angel Swift Boots", stat: "dexterity", bonus: 90, enhancement: 18, category: "Feet", cost: 16000, materials: [{name: "Angel Feather", qty: 3}, {name: "Wind Wing Crystal", qty: 3}]},

    // === Gloves ===
    {level: 2, name: "Work Gloves", stat: "strength", bonus: 12, enhancement: 6, category: "Gloves", cost: 800, materials: [{name: "Beast Skin Extract", qty: 2}]},
    {level: 5, name: "Magic Gauntlets", stat: "wisdom", bonus: 30, enhancement: 10, category: "Gloves", cost: 4000, materials: [{name: "Magic Crystal", qty: 3}]},
    {level: 8, name: "Dragon Steel Gauntlets", stat: "strength", bonus: 65, enhancement: 14, category: "Gloves", cost: 11000, materials: [{name: "Dragon Steel Armor Material", qty: 2}, {name: "Fang Steel Ingot", qty: 2}]},

    // === Cape ===
    {level: 3, name: "Traveler's Cloak", stat: "luck", bonus: 15, enhancement: 7, category: "Cape", cost: 1200, materials: [{name: "Rare Vitality Powder", qty: 2}]},
    {level: 6, name: "Mystic Cape", stat: "wisdom", bonus: 45, enhancement: 12, category: "Cape", cost: 6800, materials: [{name: "Aether Magic Crystal", qty: 2}, {name: "Holy Magic Crystal", qty: 2}]},
    {level: 10, name: "Sacred Cape", stat: "luck", bonus: 110, enhancement: 20, category: "Cape", cost: 22000, materials: [{name: "Sacred Relic Crystal", qty: 3}, {name: "Angel Feather", qty: 2}]},

    // === Accessory ===
    {level: 1, name: "Lucky Coin", stat: "luck", bonus: 10, enhancement: 5, category: "Accessory", cost: 400, materials: []},
    {level: 4, name: "Four-Leaf Clover", stat: "luck", bonus: 35, enhancement: 10, category: "Accessory", cost: 3000, materials: [{name: "Rare Vitality Powder", qty: 3}]},
    {level: 9, name: "Divine Tear Necklace", stat: "luck", bonus: 100, enhancement: 18, category: "Accessory", cost: 15000, materials: [{name: "Divine Tear", qty: 2}, {name: "Star Fragment", qty: 3}]},

    // === One Hand Weapons ===
    {level: 1, name: "Advanced Sword", stat: "strength", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 2, name: "Steel Sword", stat: "strength", bonus: 25, enhancement: 8, category: "One Hand", cost: 1200, materials: [{name: "Steel Ingot", qty: 3}]},
    {level: 4, name: "Dragon Slayer", stat: "strength", bonus: 45, enhancement: 12, category: "One Hand", cost: 3000, materials: [{name: "Magic Crystal", qty: 2}, {name: "Steel Ingot", qty: 5}]},
    {level: 1, name: "Sage's Staff", stat: "wisdom", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 2, name: "Mystic Staff", stat: "wisdom", bonus: 25, enhancement: 8, category: "One Hand", cost: 1200, materials: [{name: "Magic Crystal", qty: 2}]},
    {level: 1, name: "Beast Skin Dagger", stat: "dexterity", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: [{name: "Beast Skin Extract", qty: 2}]},
    {level: 5, name: "Unicorn Dagger", stat: "dexterity", bonus: 65, enhancement: 14, category: "One Hand", cost: 4800, materials: [{name: "Unicorn Horn", qty: 2}, {name: "Beast Skin Extract", qty: 3}]},
    {level: 1, name: "Rare Spice Club", stat: "luck", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: [{name: "Rare Vitality Powder", qty: 2}]},

    // === Both Hands Weapons ===
    {level: 3, name: "Refined Iron Greatsword", stat: "strength", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "Refined Iron Ingot", qty: 4}]},
    {level: 5, name: "Fang-Steel Greataxe", stat: "strength", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "Fang Steel Ingot", qty: 3}, {name: "Orc Tusk", qty: 2}]},
    {level: 7, name: "Dragon-Steel Slayer Sword", stat: "strength", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "Dragon Steel Armor Material", qty: 4}, {name: "Ancient Dragon Scale", qty: 2}]},
    {level: 9, name: "Titan War Axe", stat: "strength", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "Titan Bone Steel", qty: 3}, {name: "Titan Bone", qty: 3}]},
    {level: 11, name: "Ancient Dragon Heart Slayer", stat: "strength", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "Ancient Dragon Heart Steel", qty: 4}, {name: "Elder Dragon Heart", qty: 1}]},
    {level: 3, name: "Holy Magic Staff", stat: "wisdom", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "Holy Magic Crystal", qty: 3}]},
    {level: 5, name: "Forbidden Magic Rod", stat: "wisdom", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "Forbidden Magic Crystal", qty: 3}, {name: "Forbidden Grimoire Page", qty: 2}]},
    {level: 7, name: "Aether Crystal Staff", stat: "wisdom", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "Aether Magic Crystal", qty: 4}, {name: "Aether Crystal", qty: 2}]},
    {level: 9, name: "Abyss Magic Staff", stat: "wisdom", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "Abyss Aether Crystal", qty: 3}, {name: "Abyss Core", qty: 2}]},
    {level: 11, name: "Light Artifact God Staff", stat: "wisdom", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "Light Artifact Crystal", qty: 4}, {name: "Light Artifact Fragment", qty: 1}]},
    {level: 3, name: "Wind Wing Bow", stat: "dexterity", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "Wind Wing Crystal", qty: 3}, {name: "Griffon Feather", qty: 2}]},
    {level: 7, name: "Angel Swift Bow", stat: "dexterity", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "Angel Feather", qty: 3}, {name: "Wind Wing Crystal", qty: 2}]},
    {level: 9, name: "Sacred Swift Dagger", stat: "dexterity", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "Sacred Relic Crystal", qty: 3}, {name: "Sacred Relic", qty: 2}]},
    {level: 11, name: "Creation God Bow", stat: "dexterity", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "Creation Fragment", qty: 2}, {name: "Wind Wing Crystal", qty: 4}]},
    {level: 3, name: "Star Luck Club", stat: "luck", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "Star Fragment", qty: 2}]},
    {level: 5, name: "Phoenix Luck Axe", stat: "luck", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "Phoenix Flame Powder", qty: 3}, {name: "Phoenix Ash", qty: 2}]},
    {level: 7, name: "Divine Tear Fortune Staff", stat: "luck", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "Divine Tear", qty: 2}, {name: "Eternal Calamity Flame Powder", qty: 2}]},
    {level: 9, name: "Apocalypse Luck Sword", stat: "luck", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "Apocalypse Destruction Powder", qty: 3}, {name: "Crystal of Destruction", qty: 2}]},
    {level: 11, name: "Abyss God Artifact Club", stat: "luck", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "Destruction Abyss Crystal", qty: 4}, {name: "World Origin Stone", qty: 1}]},

    // === Ultimate Equipment ===
    {level: 12, name: "Creation Source God Sword", stat: "strength", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "Creation Source Potion", qty: 1}, {name: "Ancient Dragon Heart Steel", qty: 5}]},
    {level: 12, name: "World Source God Staff", stat: "wisdom", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Light Artifact Crystal", qty: 5}]},
    {level: 12, name: "Apocalypse God Bow", stat: "dexterity", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "Creation Mana Potion", qty: 1}, {name: "Sacred Relic Crystal", qty: 5}]},
    {level: 12, name: "Source Stone Luck God Artifact", stat: "luck", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "World Source Divine Potion", qty: 1}, {name: "Destruction Abyss Crystal", qty: 5}]}
  ],
  zh: [
    // === 片手盾 ===
    {level: 1, name: "小型木盾", stat: "defense", bonus: 15, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 3, name: "小型鐵盾", stat: "defense", bonus: 30, enhancement: 8, category: "One Hand", cost: 1800, materials: [{name: "鋼錠", qty: 3}]},
    {level: 6, name: "小型龍鱗盾", stat: "defense", bonus: 60, enhancement: 12, category: "One Hand", cost: 6200, materials: [{name: "龍鋼裝甲材", qty: 3}, {name: "古代龍鱗", qty: 1}]},
    {level: 10, name: "小型古龍盾", stat: "defense", bonus: 130, enhancement: 18, category: "One Hand", cost: 18000, materials: [{name: "古龍心鋼", qty: 3}, {name: "長老龍之心", qty: 1}]},

    // === 雙手大盾 ===
    {level: 2, name: "木製守護盾", stat: "defense", bonus: 25, enhancement: 8, category: "Both Hands", cost: 800, materials: []},
    {level: 4, name: "精鐵守護盾", stat: "defense", bonus: 45, enhancement: 12, category: "Both Hands", cost: 3200, materials: [{name: "精鐵錠", qty: 4}]},
    {level: 7, name: "牙鋼守護盾", stat: "defense", bonus: 85, enhancement: 16, category: "Both Hands", cost: 9800, materials: [{name: "牙鋼錠", qty: 4}, {name: "獸人獠牙", qty: 3}]},
    {level: 9, name: "泰坦守護盾", stat: "defense", bonus: 150, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "泰坦骨鋼", qty: 3}, {name: "泰坦骨頭", qty: 3}]},
    {level: 11, name: "創世源守護神盾", stat: "defense", bonus: 280, enhancement: 30, category: "Both Hands", cost: 40000, materials: [{name: "創世源藥劑", qty: 1}, {name: "古龍心鋼", qty: 5}]},

    // === 頭部 ===
    {level: 1, name: "皮帽", stat: "defense", bonus: 10, enhancement: 5, category: "Head", cost: 400, materials: [], description: 'A simple leather cap offering basic head protection.' },
    {level: 3, name: "鐵頭盔", stat: "defense", bonus: 25, enhancement: 8, category: "Head", cost: 1800, materials: [{name: "鋼錠", qty: 3}]},
    {level: 6, name: "龍鱗頭盔", stat: "defense", bonus: 55, enhancement: 12, category: "Head", cost: 6200, materials: [{name: "龍鋼裝甲材", qty: 3}, {name: "古代龍鱗", qty: 1}]},
    {level: 10, name: "古龍頭盔", stat: "defense", bonus: 120, enhancement: 18, category: "Head", cost: 18000, materials: [{name: "古龍心鋼", qty: 3}, {name: "長老龍之心", qty: 1}]},

    // === 胴體 ===
    {level: 1, name: "皮甲", stat: "defense", bonus: 15, enhancement: 8, category: "Body", cost: 600, materials: []},
    {level: 4, name: "鎖甲", stat: "defense", bonus: 40, enhancement: 12, category: "Body", cost: 3200, materials: [{name: "精鐵錠", qty: 5}]},
    {level: 7, name: "牙鋼鎧甲", stat: "defense", bonus: 80, enhancement: 16, category: "Body", cost: 9800, materials: [{name: "牙鋼錠", qty: 4}, {name: "獸人獠牙", qty: 3}]},
    {level: 11, name: "泰坦鎧甲", stat: "defense", bonus: 180, enhancement: 22, category: "Body", cost: 32000, materials: [{name: "泰坦骨鋼", qty: 4}, {name: "泰坦骨頭", qty: 3}]},

    // === 腿部 ===
    {level: 2, name: "皮褲", stat: "dexterity", bonus: 12, enhancement: 6, category: "Legs", cost: 800, materials: [{name: "獸皮精華", qty: 2}]},
    {level: 5, name: "鐵護脛", stat: "defense", bonus: 35, enhancement: 10, category: "Legs", cost: 4200, materials: [{name: "鋼錠", qty: 4}]},
    {level: 8, name: "龍鋼護脛", stat: "defense", bonus: 70, enhancement: 15, category: "Legs", cost: 12000, materials: [{name: "龍鋼裝甲材", qty: 3}]},

    // === 腳部 ===
    {level: 1, name: "皮靴", stat: "dexterity", bonus: 8, enhancement: 4, category: "Feet", cost: 400, materials: []},
    {level: 4, name: "精靈之靴", stat: "dexterity", bonus: 35, enhancement: 10, category: "Feet", cost: 3200, materials: [{name: "風翼結晶", qty: 2}, {name: "獸皮精華", qty: 2}]},
    {level: 9, name: "天使迅靴", stat: "dexterity", bonus: 90, enhancement: 18, category: "Feet", cost: 16000, materials: [{name: "天使羽毛", qty: 3}, {name: "風翼結晶", qty: 3}]},

    // === 手套 ===
    {level: 2, name: "工作手套", stat: "strength", bonus: 12, enhancement: 6, category: "Gloves", cost: 800, materials: [{name: "獸皮精華", qty: 2}]},
    {level: 5, name: "魔法手套", stat: "wisdom", bonus: 30, enhancement: 10, category: "Gloves", cost: 4000, materials: [{name: "魔法結晶", qty: 3}]},
    {level: 8, name: "龍鋼手甲", stat: "strength", bonus: 65, enhancement: 14, category: "Gloves", cost: 11000, materials: [{name: "龍鋼裝甲材", qty: 2}, {name: "牙鋼錠", qty: 2}]},

    // === 披風 ===
    {level: 3, name: "旅人披風", stat: "luck", bonus: 15, enhancement: 7, category: "Cape", cost: 1200, materials: [{name: "稀有活力粉末", qty: 2}]},
    {level: 6, name: "神秘披風", stat: "wisdom", bonus: 45, enhancement: 12, category: "Cape", cost: 6800, materials: [{name: "以太魔晶", qty: 2}, {name: "聖魔導結晶", qty: 2}]},
    {level: 10, name: "神聖披風", stat: "luck", bonus: 110, enhancement: 20, category: "Cape", cost: 22000, materials: [{name: "神聖遺晶", qty: 3}, {name: "天使羽毛", qty: 2}]},

    // === 飾品 ===
    {level: 1, name: "幸運硬幣", stat: "luck", bonus: 10, enhancement: 5, category: "Accessory", cost: 400, materials: []},
    {level: 4, name: "四葉幸運草", stat: "luck", bonus: 35, enhancement: 10, category: "Accessory", cost: 3000, materials: [{name: "稀有活力粉末", qty: 3}]},
    {level: 9, name: "神淚項鍊", stat: "luck", bonus: 100, enhancement: 18, category: "Accessory", cost: 15000, materials: [{name: "神之淚", qty: 2}, {name: "星之碎片", qty: 3}]},

    // === 單手武器 ===
    {level: 1, name: "上級之劍", stat: "strength", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 2, name: "鋼鐵之劍", stat: "strength", bonus: 25, enhancement: 8, category: "One Hand", cost: 1200, materials: [{name: "鋼錠", qty: 3}]},
    {level: 4, name: "屠龍劍", stat: "strength", bonus: 45, enhancement: 12, category: "One Hand", cost: 3000, materials: [{name: "魔法結晶", qty: 2}, {name: "鋼錠", qty: 5}]},
    {level: 1, name: "賢者之杖", stat: "wisdom", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: []},
    {level: 2, name: "神秘之杖", stat: "wisdom", bonus: 25, enhancement: 8, category: "One Hand", cost: 1200, materials: [{name: "魔法結晶", qty: 2}]},
    {level: 1, name: "獸皮短劍", stat: "dexterity", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: [{name: "獸皮精華", qty: 2}]},
    {level: 5, name: "獨角獸匕首", stat: "dexterity", bonus: 65, enhancement: 14, category: "One Hand", cost: 4800, materials: [{name: "獨角獸角", qty: 2}, {name: "獸皮精華", qty: 3}]},
    {level: 1, name: "稀有香料短棍", stat: "luck", bonus: 12, enhancement: 5, category: "One Hand", cost: 400, materials: [{name: "稀有活力粉末", qty: 2}]},

    // === 雙手武器 ===
    {level: 3, name: "精鐵大劍", stat: "strength", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "精鐵錠", qty: 4}]},
    {level: 5, name: "牙鋼雙手斧", stat: "strength", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "牙鋼錠", qty: 3}, {name: "獸人獠牙", qty: 2}]},
    {level: 7, name: "龍鋼滅殺劍", stat: "strength", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "龍鋼裝甲材", qty: 4}, {name: "古代龍鱗", qty: 2}]},
    {level: 9, name: "泰坦戰斧", stat: "strength", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "泰坦骨鋼", qty: 3}, {name: "泰坦骨頭", qty: 3}]},
    {level: 11, name: "古龍心滅劍", stat: "strength", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "古龍心鋼", qty: 4}, {name: "長老龍之心", qty: 1}]},
    {level: 3, name: "聖魔導之杖", stat: "wisdom", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "聖魔導結晶", qty: 3}]},
    {level: 5, name: "禁斷魔導魔棒", stat: "wisdom", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "禁斷魔導晶", qty: 3}, {name: "禁斷魔導書頁", qty: 2}]},
    {level: 7, name: "以太魔晶杖", stat: "wisdom", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "以太魔晶", qty: 4}, {name: "以太結晶", qty: 2}]},
    {level: 9, name: "深淵魔導杖", stat: "wisdom", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "深淵以太晶", qty: 3}, {name: "深淵核心", qty: 2}]},
    {level: 11, name: "光神器神杖", stat: "wisdom", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "光神器晶", qty: 4}, {name: "光之神器碎片", qty: 1}]},
    {level: 3, name: "風翼之弓", stat: "dexterity", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "風翼結晶", qty: 3}, {name: "獅鷲羽毛", qty: 2}]},
    {level: 7, name: "天使迅弓", stat: "dexterity", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "天使羽毛", qty: 3}, {name: "風翼結晶", qty: 2}]},
    {level: 9, name: "神聖迅擊短劍", stat: "dexterity", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "神聖遺晶", qty: 3}, {name: "神聖遺物", qty: 2}]},
    {level: 11, name: "創世神弓", stat: "dexterity", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "創世碎片", qty: 2}, {name: "風翼結晶", qty: 4}]},
    {level: 3, name: "星星幸運棍", stat: "luck", bonus: 38, enhancement: 10, category: "Both Hands", cost: 2200, materials: [{name: "星之碎片", qty: 2}]},
    {level: 5, name: "不死鳥幸運斧", stat: "luck", bonus: 65, enhancement: 14, category: "Both Hands", cost: 4800, materials: [{name: "不死鳥炎粉", qty: 3}, {name: "鳳凰灰燼", qty: 2}]},
    {level: 7, name: "神淚福運杖", stat: "luck", bonus: 95, enhancement: 18, category: "Both Hands", cost: 8500, materials: [{name: "神之淚", qty: 2}, {name: "永劫炎粉", qty: 2}]},
    {level: 9, name: "終焉幸運劍", stat: "luck", bonus: 140, enhancement: 22, category: "Both Hands", cost: 14500, materials: [{name: "終焉破壞粉", qty: 3}, {name: "滅亡結晶", qty: 2}]},
    {level: 11, name: "深淵神器棍", stat: "luck", bonus: 220, enhancement: 28, category: "Both Hands", cost: 28500, materials: [{name: "滅亡深淵晶", qty: 4}, {name: "世界源石", qty: 1}]},

    // === 終極裝備 ===
    {level: 12, name: "創世源神劍", stat: "strength", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "創世源藥劑", qty: 1}, {name: "古龍心鋼", qty: 5}]},
    {level: 12, name: "世界源神杖", stat: "wisdom", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "世界源神藥", qty: 1}, {name: "光神器晶", qty: 5}]},
    {level: 12, name: "終焉神弓", stat: "dexterity", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "創世魔力藥", qty: 1}, {name: "神聖遺晶", qty: 5}]},
    {level: 12, name: "源石幸運神器", stat: "luck", bonus: 350, enhancement: 35, category: "Both Hands", cost: 50000, materials: [{name: "世界源神藥", qty: 1}, {name: "滅亡深淵晶", qty: 5}]}
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
        {desc: '為鍊金術師帶來{qty}把鳳凰灰燼。', itemName: '鳳凰灰燼', minPrice: 450, maxPrice: 650}
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
    {speaker: "ナレーター", text: "ようこそ、{player}。\nこの世界へようこそ戻ってきたね。\nまずはこのゲームの基本を、私が説明してあげるよ。"},
    {speaker: '{player}', text: "……あなたは？ どこから声が……？"},
    {speaker: "ナレーター", text: "ふふ、気にしないで。\n今はゲームの説明を聞いてほしい。\n目的はギルドを運営してGoldとReputationを増やし、\n仲間を育てて真実を探ることだよ。\nGoldかReputationがマイナスになるとゲームオーバーだから注意してね。"},
    {speaker: "ナレーター", text: "左側がクエスト一覧。\n‹前 / 次›ボタンか、キーボードのA / Dキーでページを切り替えられるよ。"},
    {speaker: "ナレーター", text: "クエストは主に4種類ある。\n・討伐クエスト（STR重視）：モンスター退治。\n・探索クエスト（WIS重視）：未知の場所を探る。\n・護衛クエスト（DEX重視）：対象を安全に送る。\n・収集クエスト（LUC重視）：アイテム集め。"},
    {speaker: "ナレーター", text: "また、常に受けられる「トレーニングクエスト」もあるよ。\n高レベル冒険者が低レベル冒険者に指導を行い、\n低レベル側に経験値を与えられる。\n育成に活用しよう！"},
    {speaker: "ナレーター", text: "ギルドを強化するためには施設のアップグレードが重要よ。\n「ギルド周辺」ボタンから酒場、鍛冶屋、錬金工房をGoldで強化できる。\n強化すると新しい効果が得られ、冒険者たちの能力も向上するわ。\nあなた自身もこれらの施設を使えるから、積極的に活用してね。"},
    {speaker: "ナレーター", text: "クエストに割り当てられていない冒険者は、\n自分で行動するようになる。\n街を散策したり、ギルドで休憩したり、素材採取したり、狩りをしたりするわ。\n酒場では食事やギャンブル、鍛冶屋や錬金工房も使えるよ。"},
    {speaker: "ナレーター", text: "新しい冒険者は、クエストを成功させて一時メンバーとして迎えた後で、\n正式に雇用できるわ。"},
    {speaker: "ナレーター", text: "冒険者にはあなた——ギルドマスターへの好感度があるの。\n好感度が30を下回ると、毎日10%の確率でギルドを去ってしまうかも……気をつけてね。\nまた、冒険者同士にも好感度があって、特性によって変わるわ。\n同じ行動を取ると交流が発生して好感度が変わるの。\n好感度が40未満だと一緒にクエストを拒否される可能性が出て、好感度が低いほど拒否率は高くなるわ。"},
    {speaker: "ナレーター", text: "Gold管理も大事よ。\n商人との取引は「ショップ」ボタンからできるわ。\nいくつかのページがあるから、順番に説明するね。"},
    {speaker: "ナレーター", text: "「アイテム購入」ページでは、\n冒険者用のポーションや基本的な装備を購入できる。\nHP/MP回復やステータス強化に便利だよ。"},
    {speaker: "ナレーター", text: "「今日の素材」ページでは、\n今日の在庫素材を直接買えるわ。\n交易クエストのように数日待つ必要はないけど、\n価格は少し高め。急いで素材が必要な時に使ってね。"},
    {speaker: "ナレーター", text: "「ギルド拡張」ページでは、\nGoldを使ってギルドの最大冒険者スロットを増やせる。\n仲間を増やしたい時はここで拡張を購入しよう。"},
    {speaker: "ナレーター", text: "「出售物品」ページでは、\nインベントリのアイテムを商人に売却できる。\nただ、買取価格はかなり安いから、\n本当に必要な時だけにしておこう。"},
    {speaker: "ナレーター", text: "Goldが足りない時は「商人から借金」ページで借金できる。\nReputationに応じた金額まで借りられて、\n7日ごとに10%利息、28日後に全額返済が必要。\n返せないと破産でゲームオーバーだから慎重にね。"},
    {speaker: "ナレーター", text: "最後に「商人を脅す」ページは……危険な選択肢よ。\n商人を脅してGoldを手に入れられるけど、\nReputationが大きく下がるリスクがある。\n本当に困った時の最終手段として考えて。"},
    {speaker: "ナレーター", text: "右上は利用可能な冒険者一覧。\n横にスクロールして確認し、ドラッグ＆ドロップまたはクリックでクエストに配置しよう。"},
    {speaker: "ナレーター", text: "配置が終わったら「日終了 & 冒険者派遣」ボタンを押すか、\nEnterキーを押して1日を進めよう。\n翌日に結果が返ってくるよ。"},
    {speaker: "ナレーター", text: "その他の便利な操作：\n・A / Dキー：クエスト、キャラクター、店のページ切り替え\n・スペースキー：店、キャラクター、イベントログを閉じる"},
    {speaker: "ナレーター", text: "「ギルドクエスト」ボタンで自分でクエストを出せる。\nストーリークエスト・ダンジョンクエスト・交易クエストの3種類だ。\n報酬や内容を決めて冒険者を派遣しよう。"},
    {speaker: "ナレーター", text: "30日目以降は防衛戦が発生する。\n失敗するとゲームオーバーになるから、\nギルドの戦力をしっかり整えておいてね。"},
    {speaker: "ナレーター", text: "戦闘はターン制で、DEXが高い冒険者から行動する。\n基本行動は軽攻撃・重攻撃・防御・カウンターだよ。"},
    {speaker: "ナレーター", text: "軽攻撃：安定したダメージ\n重攻撃：大ダメージだが2APが必要\n防御：被ダメージ軽減\nカウンター：次の敵攻撃を反射\n状況に応じて使い分けよう。"},
    {speaker: "ナレーター", text: "これで基本は全部だよ。\n分からないことがあればまた「説明」ボタンを押してね。"},
    {speaker: '{player}', text: "……ありがとう。ところで、あなたは一体誰なの？"},
    {speaker: "ナレーター", text: "ふふ……いつか思い出す日が来るよ。\nでも、今はまだその時じゃない。\nさあ、{player}。君の冒険を始めよう。"}
  ],
  en: [
    {speaker: "Narrator", text: "Welcome back to this world, {player}.\nLet me explain the basics of this game."},
    {speaker: '{player}', text: "...Who are you? Where is this voice coming from?"},
    {speaker: "Narrator", text: "Hehe, don't mind that.\nFor now, listen to the explanation.\nThe goal is to manage your guild, increase gold and reputation,\nand develop companions to uncover the truth.\nIf gold or reputation goes negative, it's game over—be careful."},
    {speaker: "Narrator", text: "The left side shows the quest list.\nUse ‹ Previous / Next › buttons or A/D keys to switch pages."},
    {speaker: "Narrator", text: "There are mainly 4 types of quests:\n・Extermination (STR focus): Monster hunting.\n・Exploration (WIS focus): Scouting unknown areas.\n・Escort (DEX focus): Safely transport a target.\n・Collection (LUC focus): Item gathering."},
    {speaker: "Narrator", text: "There's also a constant \"Training Quest\" available.\nHigher-level adventurers can mentor lower-level ones,\ngiving EXP to the lower-level side.\nUse it for nurturing!"},
    {speaker: "Narrator", text: "To strengthen the guild, upgrading facilities is essential.\nUse the \"Guild Facilities\" button to upgrade the tavern, blacksmith, and alchemy workshop with gold.\nUpgrading unlocks new effects and improves adventurers' abilities.\nYou, as Guild Master, can use these facilities too."},
    {speaker: "Narrator", text: "Adventurers not assigned to quests will act independently.\nThey may walk the streets, rest at the guild, gather materials, or go hunting.\nThey can also use the tavern (order food or gamble), blacksmith, or alchemy workshop."},
    {speaker: "Narrator", text: "New adventurers can only be permanently recruited\nafter successfully completing a quest as temporary members."},
    {speaker: "Narrator", text: "Adventurers have friendliness toward you—the Guild Master.\nIf it drops below 30, there's a 10% chance each day they might leave the guild… be careful.\nThey also have friendliness toward each other, influenced by their traits.\nWhen doing the same daily activity, interactions occur that change friendliness.\nIf friendliness is below 40%, they may refuse to party for quests—and the lower it is, the higher the refusal chance."},
    {speaker: "Narrator", text: "Gold management is crucial.\nYou can conduct various transactions with the merchant in the \"Shop\".\nThere are several pages—let me explain them in order."},
    {speaker: "Narrator", text: "\"Buy Items\" page:\nPurchase potions and basic equipment for adventurers.\nUseful for HP/MP recovery and stat boosts."},
    {speaker: "Narrator", text: "\"Today's Materials\" page:\nBuy materials directly from today's stock.\nNo waiting like trade quests, but prices are higher.\nGreat when you need materials urgently."},
    {speaker: "Narrator", text: "\"Guild Expansion\" page:\nSpend gold to increase maximum adventurer slots.\nBuy expansions here when you want more companions."},
    {speaker: "Narrator", text: "\"Sell Items\" page:\nSell inventory items to the merchant.\nBuyback prices are quite low,\nso use only when necessary."},
    {speaker: "Narrator", text: "When short on gold, use \"Borrow from Merchant\" page.\nBorrow up to Reputation × 100G.\n10% interest every 7 days, full repayment on day 28.\nFailure causes bankruptcy and game over—be careful!"},
    {speaker: "Narrator", text: "\"Intimidate Merchant\" page is a risky option.\nIntimidate to get gold quickly,\nbut Reputation may drop significantly depending on success.\nLast resort when desperate."},
    {speaker: "Narrator", text: "Top-right is the list of available adventurers.\nScroll horizontally, then drag & drop or click to assign them to quests."},
    {speaker: "Narrator", text: "When assignments are done, press the \"End Day & Dispatch Adventurers\" button\nor hit Enter to advance the day.\nResults will return the next day."},
    {speaker: "Narrator", text: "Other useful controls:\n・A / D keys: Switch pages in quests, characters, and shop\n・Space key: Close shop, characters, or event log"},
    {speaker: "Narrator", text: "The \"Guild Quests\" button lets you create your own quests.\nThere are 3 types: Story, Dungeon, and Trade.\nSet rewards and details, then dispatch adventurers."},
    {speaker: "Narrator", text: "From day 30 onward, defense battles occur.\nFailure means game over,\nso prepare your guild's combat strength well."},
    {speaker: "Narrator", text: "Battles are turn-based, with higher DEX adventurers acting first.\nBasic actions are Light Attack, Heavy Attack, Defense, and Counter."},
    {speaker: "Narrator", text: "Light Attack: Stable damage\nHeavy Attack: High damage but costs 2 AP\nDefense: Reduces incoming damage\nCounter: Reflects the next enemy attack\nUse them situationally."},
    {speaker: "Narrator", text: "That's all the basics.\nIf you have questions, just press the \"Tutorial\" button again."},
    {speaker: '{player}', text: "...Thank you. By the way, who are you really?"},
    {speaker: "Narrator", text: "Hehe... You'll remember me one day.\nBut now is not the time.\nNow, {player}—begin your adventure."}
  ],
  zh: [
    {speaker: "Narrator", text: "歡迎回到這個世界，{player}。\n讓我來為你說明遊戲的基本規則吧。"},
    {speaker: '{player}', text: "……你是誰？這聲音從哪裡傳來的……？"},
    {speaker: "Narrator", text: "呵呵，別在意。\n現在先聽我說明吧。\n目標是經營公會，增加Gold和聲望，\n培養夥伴以探尋真相。\nGold或聲望變成負數就會遊戲結束，要小心哦。"},
    {speaker: "Narrator", text: "左側是任務列表。\n使用‹ 前 / 次 ›按鈕，或鍵盤的A / D鍵來切換頁面。"},
    {speaker: "Narrator", text: "任務主要有4種：\n・討伐任務（STR重視）：怪物退治。\n・探索任務（WIS重視）：探查未知地點。\n・護衛任務（DEX重視）：安全護送目標。\n・收集任務（LUC重視）：收集物品。"},
    {speaker: "Narrator", text: "另外還有隨時可接的「訓練任務」。\n高級冒險者指導低級冒險者，\n可給低級一方經驗值。\n好好利用來培養吧！"},
    {speaker: "Narrator", text: "為了強化公會，設施升級非常重要。\n從「公會設施」按鈕用Gold強化酒館、鐵匠鋪、鍊金工房。\n升級後會解鎖新效果，提升冒險者能力。\n你作為公會會長，也能使用這些設施。"},
    {speaker: "Narrator", text: "未被分配任務的冒險者會自行行動。\n他們可能在街上散步、在公會休息、收集素材、或是去狩獵。\n也能使用酒館（點餐或賭博）、鐵匠鋪、鍊金工房。"},
    {speaker: "Narrator", text: "新冒險者必須先在任務中作為臨時成員成功完成任務，\n之後才能正式雇用。"},
    {speaker: "Narrator", text: "冒險者對你——公會會長有好感度。\n好感度低於30時，每天有10%的機率離開公會……要小心。\n冒險者之間也有好感度，受特性影響。\n進行相同日常行動時會發生交流，改變好感度。\n好感度低於40%時，可能拒絕一起執行任務，好感度越低拒絕機率越高。"},
    {speaker: "Narrator", text: "Gold管理也很重要。\n「商店」按鈕可以和商人進行各種交易。\n有幾個頁面，讓我順序說明吧。"},
    {speaker: "Narrator", text: "「購買物品」頁面：\n購買冒險者用的藥水和基本裝備。\nHP/MP恢復和屬性強化很有用。"},
    {speaker: "Narrator", text: "「今日素材」頁面：\n直接購買今天的庫存素材。\n不像交易任務需要等幾天，但價格較高。\n急需素材時很方便。"},
    {speaker: "Narrator", text: "「公會擴建」頁面：\n用Gold增加公會的最大冒險者槽位。\n想增加夥伴時來這裡購買擴建。"},
    {speaker: "Narrator", text: "「出售物品」頁面：\n將庫存物品賣給商人。\n不過回收價格很低，\n建議只在必要時使用。"},
    {speaker: "Narrator", text: "Gold不足時，用「從商人借錢」頁面借錢。\n最多聲望×100G。7天利息10%，第28天全額歸還。\n還不出來會破產遊戲結束，要小心！"},
    {speaker: "Narrator", text: "「威脅商人」頁面是危險選擇。\n威脅商人快速獲得Gold，\n但聲望可能大幅下降。\n真的缺錢時的最後手段。"},
    {speaker: "Narrator", text: "右上是可以使用的冒險者列表。\n水平滾動確認後，用拖曳或點擊分配到任務。"},
    {speaker: "Narrator", text: "分配完成後，按「結束一天 & 派遣冒險者」按鈕，\n或按Enter鍵前進一天。\n隔天就會回報結果。"},
    {speaker: "Narrator", text: "其他便利操作：\n・A / D鍵：切換任務、角色、商店頁面\n・空白鍵：關閉商店、角色、事件記錄"},
    {speaker: "Narrator", text: "「發布公會任務」按鈕可以自己發布任務。\n有故事任務、地下城任務、交易任務3種。\n設定報酬和內容後派遣冒險者吧。"},
    {speaker: "Narrator", text: "第30天之後會發生防衛戰。\n失敗就會遊戲結束，\n請好好整頓公會戰力。"},
    {speaker: "Narrator", text: "戰鬥是回合制，DEX高的冒險者先行動。\n基本行動有輕攻擊、重攻擊、防禦、反擊。"},
    {speaker: "Narrator", text: "輕攻擊：穩定傷害\n重攻擊：高傷害但需要2AP\n防禦：減輕受到傷害\n反擊：反射下一次敵人攻擊\n根據情況靈活使用吧。"},
    {speaker: "Narrator", text: "基本說明就到這裡。\n有不懂的地方再按「教學」按鈕吧。"},
    {speaker: '{player}', text: "……謝謝。順便問一下，你到底是誰？"},
    {speaker: "Narrator", text: "呵呵……總有一天你會想起我的。\n但現在還不是時候。\n來吧，{player}。開始你的冒險吧。"}
  ]
};


// facilityUpgradeDialogues.js または javascript.js のどこかに追加
const facilityUpgradeDialogues = {
    ja: {
        tavern: [
            { speaker: '酒場主人', text: 'おお、{PLAYER}！ また投資してくれたんだな！' },
            { speaker: '酒場主人', text: 'これで冒険者たちがもっと快適に休めるぜ。使用料もギルドに還元されるから、投資した甲斐があるだろ？' },
            { speaker: '酒場主人', text: 'あと、冒険者たちが食事注文すると、その代金の10%がギルドに入るんだ。' },
            { speaker: '酒場主人', text: 'ただよ、たまにギャンブルに熱くなって大損することもあるから、気をつけて見ててくれよな…。' },
            { speaker: 'ナレーター', text: '酒場がレベルアップ！ 冒険者たちは休息でき、使用料がギルド収入に。食事注文で追加10%収入、ギャンブル発生（損失リスクあり）。' }
        ],
        alchemy: [
            { speaker: '錬金術師', text: 'ふふ、{PLAYER}の投資ありがとう。これで工房がさらに充実するわ。' },
            { speaker: '錬金術師', text: '冒険者たちが集めた素材でポーションを合成できるようになるの。これはとても大事よ – ポーションがあれば、冒険者たちが危機を乗り越えられるわ。' },
            { speaker: 'ナレーター', text: '錬金工房がレベルアップ！ 冒険者たちは素材を使ってポーションを自動合成可能に。冒険者の生存率が向上！' }
        ],
        blacksmith: [
            { speaker: '鍛冶屋', text: '{PLAYER}、また金入れてくれたか！ ありがてえ！' },
            { speaker: '鍛冶屋', text: 'これで冒険者たちが装備を強化できるぜ。成功率は運次第だが、使用料はギルドに全額還元されるから、投資の価値ありだな。' },
            { speaker: 'ナレーター', text: '鍛冶屋がレベルアップ！ 冒険者たちは装備を強化可能（成功率50%）。使用料は全額ギルド収入に。' }
        ]
    },
    en: {
        tavern: [
            { speaker: 'Tavern Owner', text: 'Hey, {PLAYER}! Another investment!' },
            { speaker: 'Tavern Owner', text: 'Adventurers can rest better now. Usage fees come back to the guild too!' },
            { speaker: 'Tavern Owner', text: 'When they order food, the guild gets 10% of the price.' },
            { speaker: 'Tavern Owner', text: 'But sometimes they gamble and lose big — keep an eye on them!' },
            { speaker: 'Narrator', text: 'Tavern upgraded! Adventurers rest, fees return to guild. 10% from food orders, gambling possible (risk of loss).' }
        ],
        alchemy: [
            { speaker: 'Alchemist', text: 'Thanks for the investment, {PLAYER}.' },
            { speaker: 'Alchemist', text: 'Adventurers can now synthesize potions from gathered materials. This is crucial — potions save lives!' },
            { speaker: 'Narrator', text: 'Alchemy workshop upgraded! Adventurers auto-synthesize potions from ingredients. Survival rate improved!' }
        ],
        blacksmith: [
            { speaker: 'Blacksmith', text: '{PLAYER}, more investment! Thanks!' },
            { speaker: 'Blacksmith', text: 'Adventurers can enhance equipment (50% success). Fees fully return to guild.' },
            { speaker: 'Narrator', text: 'Blacksmith upgraded! Equipment enhancement available. Fees fully to guild.' }
        ]
    },
    zh: {
        tavern: [
            { speaker: '酒場主人', text: '哦，{PLAYER}！又投資了啊！' },
            { speaker: '酒場主人', text: '冒險者們可以更好地休息了。使用費也會返還給公會！' },
            { speaker: '酒場主人', text: '他們點餐時，公會能拿到10%的收入。' },
            { speaker: '酒場主人', text: '不過有時他們會賭博輸大錢，要注意看著點啊…' },
            { speaker: 'Narrator', text: '酒館升級！冒險者休息，使用費返還公會。點餐收入10%，賭博可能（有損失風險）。' }
        ],
        alchemy: [
            { speaker: '煉金術師', text: '呵呵，謝謝{PLAYER}的投資。' },
            { speaker: '煉金術師', text: '冒險者們可以用收集的素材合成藥水。這很重要 — 藥水能救命！' },
            { speaker: 'Narrator', text: '煉金工房升級！冒險者自動用素材合成藥水。生存率提升！' }
        ],
        blacksmith: [
            { speaker: '鐵匠', text: '{PLAYER}，又投資了！謝了！' },
            { speaker: '鐵匠', text: '冒險者們可以強化裝備了（成功率看運）。使用費全額返還公會。' },
            { speaker: 'Narrator', text: '鐵匠鋪升級！裝備強化可用。使用費全額公會收入。' }
        ]
    }
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
        speaker: "{player}",
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

  // Force full page reload to ensure ALL content (including dynamically generated dialogues, quests, etc.) is re-evaluated with the new language
  location.reload();
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