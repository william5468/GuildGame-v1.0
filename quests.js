// === quests.js ===
// このファイルを <script src="quests.js"></script> で javascript.js や player2.js の前に読み込んでください。
// すべてのクエスト定義と進行ロジックをここに集約（スケーラブル＆プロンプト軽量）

// クエスト定義データ（新しいクエストはここにオブジェクト追加するだけ！）
const questDefinitions = [
    {
        id: "birthday_surprise",
        name: "Our secret",
        completed_guidance: "このクエストは既に完了している。酒場主人、ルナ、カイト３人は、プレイヤーの誕生日パーティーを成功させたことを覚えていて、時折「あの時のパーティー、楽しかったね」「サプライズ大成功だったわ」など思い出を話題にする。",
        stages: [
            {
                npc: "酒場主人",
                trigger: { type: "payment", amount: 200 },
                guidance_beforestage: "プレイヤーが秘密や情報を聞かれたら「200ゴールドで特別な情報を教えてあげるわ」と誘う。game_state_infoにプレイヤーからゴールド200以上の贈り物が含まれていた場合のみ、ルナがいい子なのに最近夜で酒場でよく見かけたらしい、と言う情報を教える。絶対に無料で漏らさない。これ以上は本当に何も知らない。",
                guidance_afterstage: "ルナがいい子なのに最近夜で酒場でよく見かけたらしい、と言うことを教えたことを覚えている。これ以上は本当に何も知らない。",
                keywordToDiscover: "酒場によく見かけるルナ",
                nextStage: 1
            },
            {
                npc: lunaName,
                trigger: { type: "keyword", keywords: ["酒場によく見かけるルナ", "ルナ", "酒場", "夜で"] },
                guidance_beforestage: "酒場によく見かけるルナの話題を出したら驚いた様子で「えっ！？ どうしてそれを…？ それは…カイトとの秘密なの。あまり聞いてこないで…ね？」と答える。それ以上は何も知らない",
                guidance_afterstage: "プレイヤーにカイトとの秘密を漏らしたことを覚えている、プレイヤーがさらに聞きたがったら少し焦った様子で誤魔化す。これ以上は何も知らない。",
                keywordToDiscover: "カイトとルナの秘密",
                nextStage: 2
            },
            {
                npc: kaitoName,
                trigger: { type: "keyword", keywords: ["カイトとの秘密", "秘密", "ルナと秘密"] },
                guidance_beforestage: "もしプレイヤーがカイトとルナの秘密について話したらニヤリと笑って「おっ、バレちまったか。今夜酒場に戻ってみなよ、その時本当のこと教えるね！」と言う。これ以上は何も知らない。",
                guidance_afterstage: "プレイヤーに夜の酒場に戻るようヒントを出したことを覚えている。これ以上は何も知らない。",
                keywordToDiscover: "夜の酒場に戻る",
                nextStage: 3
            },
            {
                npc: "酒場主人",
                trigger: { type: "keyword", keywords: ["戻る", "戻った", "酒場", "夜の酒場に戻る"] },
                guidance_beforestage: "プレイヤーがカイトのヒントで戻ってきたら「ふふっ、ちょうどいいタイミングね、ワインを開けてくれたら本当にこと教えるね♪」とワインの必要性を自然に匂わせる、give_to_playerで酒場のワイン一本プレイヤーに渡す。プレイヤーの誕生日パーティーを準備するためだけど、絶対にネタバレしない。",
                guidance_afterstage: "プレイヤーにワインの必要性を伝えたことを覚えている。プレイヤーがワインを持って戻ってきたら大喜びで受け取る準備をする。",
                keywordToDiscover: "パーティーのワイン",
                nextStage: 4
            },
            {
                npc: "酒場主人",
                trigger: { 
                    type: "keyword_and_item", 
                    keywords: ["パーティーのワイン", "ワイン", "開けた", "渡す","真実を知るためのワイン"], 
                    requiredItem: { name: "酒場のワイン", qty: 1 }
                },
                guidance_beforestage: "プレイヤーがワイン関連のキーワードを言って、酒場のワインをくれたなら、「まぁ、完璧なワインね！これでパーティーが本格始動よ！{player}誕生日おめでとう！」と大喜び。すぐにサプライズシーンを発動。",
                guidance_afterstage: null,  // 最終ステージなので不要（完了後記憶はquestレベルで）
                keywordToDiscover: null,
                onComplete: {
                    rewards: [
                        { type: "friendliness", targets: ["ルナ", "カイト", "酒場主人"], delta: 10 },
                        { type: "item", name: "誕生日ケーキ", qty: 4, details: { type: "potion", restore: "hp", amount: 300, description: "ワインのおかげで特別豪華なケーキ！" } },
                        { type: "item", name: "パーティーの思い出写真", qty: 1, details: { description: "みんなとの絆の証（コレクションアイテム）" } }
                    ],
                    scene: "birthday_party"
                }
            }
        ]
    },
{
    id: "slime_jelly",
    name: "Slime jelly",
    completed_guidance: "このクエストは既に完了している。スライムが本当は食べられると知って、しかもかなり美味しいから、今度はスライム出ることを期待していると話す。",
    stages: [
        // Stage 0: 農夫からスライムの塊をもらう（スタート）
        {
            npc: "農夫",
            trigger: { type: "keyword", keywords: ["作物", "被害", "スライム"] },
            guidance_beforestage: "スライムの話が出たら「冒険者が退治してくれたスライムのその塊が集まったけど、何かに使えるのかな。。」とgive_to_playerでスライムの塊10個をプレイヤーに渡す。",
            guidance_afterstage: "スライムの塊を{player}に渡したことを思てる、やっばりそれはただのゴミ何かなと半分諦めの話をする。",
            keywordToDiscover: "スライムの塊",
            // 分岐なし → 必ず料理人ステージへ
            nextStage: {
                default: 1
            }
        },

        // Stage 1: 料理人との会話（ここでブランチ発生）
        {
            npc: "料理人",
            // 複数のトリガーを許可（配列） → プレイヤーの選択によって異なるトリガーが発火
            triggers: [
                // Good path: スライムの塊を渡す → 成功ルート
                {
                    type: "keyword_and_item",
                    keywords: ["スライムの塊", "スライム"],
                    requiredItem: { name: "スライムの塊", qty: 1 }
                },
                // Bad path: 「悪いアイデア」「気持ち悪い」などネガティブキーワードを言う
                {
                    type: "keyword",
                    keywords: ["悪いアイデア", "気持ち悪い", "食べられない", "ゴミ", "ゼリー 嫌", "slime jelly is disgusting"]
                }
            ],
            guidance_beforestage: {
                // Good path（アイテムを渡した場合）
                good: "プレイヤーがキーワードを言い且つアイテムを渡したら「これは…ゼリーとして使えるかもしれない」と喜ぶ。試しに作ったから試してくれる？と願う",
                // Bad path（ネガティブキーワードを言った場合）
                bad: "プレイヤーがネガティブなことを言ったら「…そうか、確かに気持ち悪いかもしれないな…」と落ち込む。もうこの話はいいや、と会話終了。"
            },
            guidance_afterstage: null,
            // 分岐に応じたキーワード発見と次のステージ
            branches: {
                // Good path → スライムゼリー発見 + 農夫フィードバックステージへ
                good: {
                    keywordToDiscover: "スライムゼリー",
                    nextStage: 2,
                    onComplete: {
                        rewards: [
                            { type: "item", name: "スライムゼリー", qty: 3, details: { type: "potion", restore: "hp", amount: 100, description: "スライムの塊から作ったゼリー、食べ物らしい姿にはなってるが、動いてたスライムを思い出すとあまり食べたいと思わないかもしれない。" }},
                            { type: "friendliness", targets: ["料理人"], delta: 5 }
                        ]
                    }
                },
                // Bad path → 失望キーワード発見 + 失望エンディングステージへ
                bad: {
                    keywordToDiscover: "スライムゼリーは気持ち悪い",
                    nextStage: 3
                }
            }
        },

        // Stage 2: 農夫にスライムゼリーを返す（Good ending）
        {
            npc: "農夫",
            trigger: { 
                type: "keyword_and_item", 
                keywords: ["スライムゼリー"],
                requiredItem: { name: "スライムゼリー", qty: 1 }
            },
            guidance_beforestage: "プレイヤーがスライムゼリーくれたら「これは…なんと、とても美味しい！ありがとう！代わりにトマト持ってくれ〜」と喜ぶ、そしてgive_to_playerでトマト5つプレイヤーに渡す",
            guidance_afterstage: null,
            onComplete: {
                rewards: [
                    { type: "friendliness", targets: ["農夫"], delta: 10 }
                ]
            }
        },

        // Stage 3: 新規追加 - 失望エンディング（Bad ending）
        {
            npc: "農夫",
            trigger: { 
                type: "keyword",
                keywords: ["スライムゼリーは気持ち悪い", "ゼリー 失敗", "料理人 落ち込み"]
            },
            guidance_beforestage: "プレイヤーが失望キーワードを言ったら「…そうか、あれはダメだったか…。まあゴミだったし仕方ないな」と諦めの表情。報酬なしで会話終了。",
            guidance_afterstage: "スライムの塊は結局ゴミだったと完全に諦めている。今後スライム関連の話には反応しなくなる（クエスト終了）。",
            // 報酬なし → onComplete なし
            markAsCompleted: true  // クエストを強制完了（失敗エンド）
        }
    ]
},

{    id: "ancient_ruin_secret",
    name: "失われた遺跡の秘密",
    completed_guidance: "このクエストは既に完了している。学者は遺跡の調査が成功したことを喜び、時折「君のおかげで古代の秘密に一歩近づけたよ」と嬉しそうに語る。発見した遺跡の話で村人が集まることもある。",
    stages: [
        // Stage 0: 学者 - 開始
        {
            npc: "学者",
            trigger: {
                type: "keyword",
                keywords: ["遺跡", "古い書物"]
            },
            guidance_beforestage: "プレイヤーが遺跡や古い書物の話題を出したら「実は最近、古い書物から興味深い記述を見つけたんだ。村の近くに失われた遺跡があるらしい。君なら調査してくれるかな？」と依頼。報酬の話はまだせず、興味を引く。",
            guidance_afterstage: "プレイヤーに遺跡調査を依頼したことを覚えている。プレイヤーが戻ってきたら喜んで話を聞く準備をする。",
            keywordToDiscover: "失われた遺跡",
            nextStage: 1
        },

        // Stage 1: 農夫 - 土地情報収集
        {
            npc: "農夫",
            trigger: {
                type: "keyword",
                keywords: ["遺跡", "失われた遺跡", "近くの土地"]
            },
            guidance_beforestage: "プレイヤーが遺跡の話題を出したら「村の近くのダンジョンに古い石の遺跡があるよ、１層にいるらしい。でも強いモンスターが沢山あって危ないんだ…。興味持ってるなら、気をつけて行ってみな」と情報を教える。",
            guidance_afterstage: "プレイヤーに遺跡の場所はダンジョンの１層にいるのことを教えたことを覚えている。モンスターの話で少し心配そう。",
            keywordToDiscover: "遺跡の調べ",
            nextStage: 2,
            onComplete: {
                rewards: [
                    { type: "friendliness", targets: ["農夫"], delta: 5 }
                ]
            }
        },

        // Stage 2: Luna 
        {
            npc: lunaName,
            triggers: [
                // Good path
                {
                    type: "keyword_and_item",
                    keywords: ["遺跡", "素材", "珍しいもの","遺跡の調べ"],
                    requiredItem: { name: "呪われた魔力の石片", qty: 1 }
                },
                // Bad path
                {
                    type: "keyword",
                    keywords: ["遺跡 危ない", "モンスター", "行かない", "面倒"]
                }
            ],
            guidance_beforestage: {
                good: "プレイヤーが遺跡の石片を渡してきたら「これは…遺跡のものね！でもそれに呪いがあるみたい、先私はそれを解けたから、この魔力の石片学者さんに持っていきなさい」と喜んで詳しく教えてくれる。",
                bad: "プレイヤーが遺跡を危ないと言ったら「…そうね、モンスターが多いなら無理しない方がいいわね！学者に調査の続きは無理と伝えたほうがいいと思う」と提案。"
            },
            guidance_afterstage: null,
            branches: {
                good: {
                    keywordToDiscover: "魔力の石片",
                    nextStage: 3,
                    onComplete: {
                        rewards: [
                            { type: "friendliness", targets: ["料理人"], delta: 8 },
                            { type: "item", name: "魔力の石片", qty: 1 }
                        ]
                    }
                },
                bad: {
                    keywordToDiscover: "遺跡は危険",
                    nextStage: 4
                }
            }
        },

        // Stage 3: 学者 - Goodエンド報告
        {
            npc: "学者",
            trigger: {
                type: "keyword_and_item",
                keywords: ["魔力の石片", "調査完了", "遺跡の秘密"],
                requiredItem: { name: "魔力の石片", qty: 1 }
            },
            guidance_beforestage: "プレイヤーが魔力の石片を持って戻ってきたら「素晴らしい！これで遺跡の謎が解ける…君のおかげだ。本当にありがとう！」と大喜び。",
            guidance_afterstage: null,
            onComplete: {
                rewards: [
                    { type: "item", name: "古代の巻物", qty: 1, details: { stat: "wisdom", bonus: 5, enhancement: 20, description: "失われた文明の知識が記された巻物" } },
                    { type: "gold", amount: 5000 },
                    { type: "friendliness", targets: ["学者"], delta: 15 }
                ]
            }
        },

        // Stage 4: 学者 - Badエンド報告
        {
            npc: "学者",
            trigger: {
                type: "keyword",
                keywords: ["遺跡は危険", "調査中止", "モンスター多い"]
            },
            guidance_beforestage: "プレイヤーが危険だと報告したら「…そうか、安全が第一だね。無理はしなかったよ」と少し残念そうに受け入れる。",
            guidance_afterstage: null,
            onComplete: {
                rewards: [
                    { type: "gold", amount: 100 }
                ]
            },
            markAsCompleted: true
        }
    ]
}
    // 新しいクエストを自由に追加...
];

// === クエスト進行ロジック ===
if (!gameState.activeQuests) {
    gameState.activeQuests = {};  // {questId: {currentStage: 0, discoveredKeywords: []}}
}
if (!gameState.completedQuests) {
    gameState.completedQuests = [];  // 永続化された完了クエストリスト
}



// トリガー一致判定（プレイヤーメッセージとNPCメッセージを区別）
// トリガーマッチ関数を拡張（複数トリガー対応 + 分岐キー返却）
function triggerMatches(stage, playerMessage = "", npcMessage = "", isGift = false, giftedGold = 0, giftedItems = []) {
    const playerMsgLower = playerMessage.toLowerCase();
    const npcMsgLower = npcMessage.toLowerCase();

    // 旧形式（単一trigger）の互換性維持
    if (stage.trigger) {
        return { matched: checkSingleTrigger(stage.trigger, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems), branchKey: 'default' };
    }

    // 新形式：triggers配列（複数可能）
    if (Array.isArray(stage.triggers)) {
        for (let i = 0; i < stage.triggers.length; i++) {
            const trig = stage.triggers[i];
            if (checkSingleTrigger(trig, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems)) {
                // 分岐キーをインデックス順ではなく、branchesオブジェクトのキー順で決める（安全）
                const branchKeys = stage.branches ? Object.keys(stage.branches) : [];
                const branchKey = branchKeys[i] || 'default';
                return { matched: true, branchKey, triggerIndex: i };
            }
        }
    }

    return { matched: false, branchKey: null };
}

// 単一トリガーのチェック（共通化）
function checkSingleTrigger(trigger, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems) {
    if (!trigger) return false;

    switch (trigger.type) {
        case "keyword":
            return playerMsgLower && trigger.keywords.some(kw => playerMsgLower.includes(kw.toLowerCase()));
        case "npc_keyword":
            return npcMsgLower && trigger.keywords.some(kw => npcMsgLower.includes(kw.toLowerCase()));
        case "combined_keyword":
            const hasPlayerKw = playerMsgLower && trigger.player_keywords.some(kw => playerMsgLower.includes(kw.toLowerCase()));
            const hasNpcKw = npcMsgLower && trigger.npc_keywords.some(kw => npcMsgLower.includes(kw.toLowerCase()));
            return hasPlayerKw && hasNpcKw;
        case "keyword_and_item":
            const hasKeyword = playerMsgLower && trigger.keywords.some(kw => playerMsgLower.includes(kw.toLowerCase()));
            const hasItem = isGift && giftedItems.some(it => 
                it.name === trigger.requiredItem.name && it.qty >= (trigger.requiredItem.qty || 1)
            );
            return hasKeyword && hasItem;
        case "payment":
            return isGift && giftedGold >= trigger.amount;
        case "return":
            return true;
        default:
            return false;
    }
}

// ステージ進行処理（分岐対応強化）
function progressQuestStage(questId, stage, def, branchKey = 'default') {
    const qState = gameState.activeQuests[questId];

    // 分岐ごとのデータ取得（branchesがあれば優先、なければstage本体）
    const branch = stage.branches ? stage.branches[branchKey] : stage;

    // キーワード発見
    if (branch.keywordToDiscover) {
        qState.discoveredKeywords.push(branch.keywordToDiscover);
        better_alert(`キーワード発見: 「${branch.keywordToDiscover}」`, 'quest');
    }

    // 報酬処理
    if (branch.onComplete && branch.onComplete.rewards) {
        branch.onComplete.rewards.forEach(reward => {
            if (reward.type === "friendliness") {
                reward.targets.forEach(t => {
                    const ent = getEntityByName(t);
                    if (ent) {
                        const oldFriendliness = ent.Friendliness || 70;
                        ent.Friendliness = Math.min(100, oldFriendliness + reward.delta);
                        const deltaSign = reward.delta > 0 ? '+' : '';
                        better_alert(`${t}との好感度 ${deltaSign}${reward.delta}（${oldFriendliness} → ${ent.Friendliness}）`, 'quest');
                    }
                });
            } else if (reward.type === "gold") {
                gameState.gold += reward.amount;
                better_alert(`ゴールド +${reward.amount}！`, 'quest');
            } else if (reward.type === "item") {
                const qty = reward.qty || 1;
                let item = gameState.inventory.find(i => i.name === reward.name);
                if (!item) {
                    gameState.inventory.push({
                        name: reward.name,
                        qty: qty,
                        id: gameState.nextId++,
                        ...reward.details
                    });
                } else {
                    item.qty += qty;
                }
                better_alert(`${reward.name} x${qty} を入手！`, 'quest');
            }
        });

        if (branch.onComplete.scene === "birthday_party") {
            queueBirthdayParty();
        }
    }

    // 次ステージ進行 or クエスト完了
    let nextStageNum = branch.nextStage;

    // nextStageが未定義 → 最終ステージ扱い（完了）
    if (nextStageNum === undefined) {
        better_alert(`クエスト「${def.name}」完了！\nおめでとう！`, 'quest');
        gameState.completedQuests.push(def.id);
        delete gameState.activeQuests[questId];
        return;
    }

    // nextStageがオブジェクトの場合（将来的な複数分岐拡張用）→ defaultを取る
    if (typeof nextStageNum === 'object' && nextStageNum.default !== undefined) {
        nextStageNum = nextStageNum.default;
    }

    // 通常進行
    qState.currentStage = nextStageNum;
    better_alert(`クエスト「${def.name}」\nステージ${nextStageNum + 1}へ進行！`, 'quest');

    // 強制完了フラグ（失敗エンドなど）
    if (branch.markAsCompleted) {
        better_alert(`クエスト「${def.name}」終了（特殊エンド）`, 'quest');
        gameState.completedQuests.push(def.id);
        delete gameState.activeQuests[questId];
    }
}

// メイン進行チェック（分岐対応）
function checkQuestProgress(playerMessage = "", npcMessage = "", isGift = false, giftedGold = 0, giftedItems = []) {
    const playerMsgLower = playerMessage.toLowerCase();
    const npcMsgLower = npcMessage.toLowerCase();

    // 潜在クエスト自動活性化（ステージ0は通常単一トリガーのため変更なし）
    questDefinitions.forEach(def => {
        if (gameState.activeQuests[def.id] || gameState.completedQuests.includes(def.id)) return;

        const stage0 = def.stages[0];
        if (!stage0 || (stage0.npc !== currentNpcKey && stage0.npc !== "任何")) return;

        const match = triggerMatches(stage0, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems);
        if (match.matched) {
            gameState.activeQuests[def.id] = { currentStage: 0, discoveredKeywords: [] };
            better_alert(`新クエスト開始: ${def.name}`, 'quest');
            progressQuestStage(def.id, stage0, def, match.branchKey);
        }
    });

    // 活性クエスト進行
    Object.keys(gameState.activeQuests).forEach(questId => {
        const qState = gameState.activeQuests[questId];
        const def = questDefinitions.find(q => q.id === questId);
        if (!def) return;

        if (qState.currentStage >= def.stages.length) {
            console.warn(`Invalid stage ${qState.currentStage} for quest ${questId}`);
            gameState.completedQuests.push(questId);
            delete gameState.activeQuests[questId];
            return;
        }

        const stage = def.stages[qState.currentStage];
        if (!stage || (stage.npc !== currentNpcKey && stage.npc !== "任何")) return;

        const match = triggerMatches(stage, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems);
        if (match.matched) {
            progressQuestStage(questId, stage, def, match.branchKey);
        }
    });
}

// NPC特化プロンプト注入（分岐対応強化）
function getQuestGuidance() {
    let guidance = "";
    questDefinitions.forEach(def => {
        const questId = def.id;

        if (gameState.activeQuests[questId]) {
            const qState = gameState.activeQuests[questId];
            const currentIdx = qState.currentStage;

            if (currentIdx >= def.stages.length) return;

            // 過去ステージ記憶
            for (let i = 0; i < currentIdx; i++) {
                const pastStage = def.stages[i];
                if (pastStage && pastStage.guidance_afterstage && (pastStage.npc === currentNpcKey || pastStage.npc === "任何")) {
                    guidance += `[${def.name}過去記憶ステージ${i+1}: ${pastStage.guidance_afterstage.replace("{player}", gameState.playerName || "あなた")}] `;
                }
            }

            // 現在ステージ（分岐がある場合もguidance_beforestageがオブジェクトなら対応）
            const currentStage = def.stages[currentIdx];
            if (currentStage && (currentStage.npc === currentNpcKey || currentStage.npc === "任何")) {
                let beforeText = currentStage.guidance_beforestage;
                if (typeof beforeText === 'object') {
                    // オブジェクトの場合、全分岐の可能性を軽く示唆（AIが状況判断しやすく）
                    const keys = Object.keys(beforeText);
                    beforeText = keys.map(k => beforeText[k]).join(" / または ");
                }
                if (beforeText) {
                    guidance += `[${def.name}進行中ステージ${currentIdx+1}: ${beforeText.replace("{player}", gameState.playerName || "あなた")}] `;
                }
            }
        }
        else if (gameState.completedQuests.includes(questId)) {
            const involved = def.stages.some(s => s.npc === currentNpcKey || s.npc === "任何");
            if (involved && def.completed_guidance) {
                guidance += `[完了クエスト${def.name}: ${def.completed_guidance.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
        else if (def.stages[0] && (def.stages[0].npc === currentNpcKey || def.stages[0].npc === "任何")) {
            if (def.stages[0].guidance_beforestage) {
                guidance += `[潜在クエスト${def.name}: ${def.stages[0].guidance_beforestage.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
    });
    return guidance;
}
