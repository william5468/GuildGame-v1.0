// === quests.js ===
// このファイルを <script src="quests.js"></script> で javascript.js や player2.js の前に読み込んでください。
// すべてのクエスト定義と進行ロジックをここに集約（スケーラブル＆プロンプト軽量）

// クエスト定義データ（新しいクエストはここにオブジェクト追加するだけ！）
const questDefinitions = [
    {
        id: "birthday_surprise",
        name: "サプライズ",
        completed_guidance: "このクエストは既に完了している。酒場主人、ルナ、カイト３人は、プレイヤーの誕生日パーティーを成功させたことを覚えていて、時折「あの時のパーティー、楽しかったね」「サプライズ大成功だったわ」など思い出を話題にする。",
        stages: [
            {
                npc: "酒場主人",
                trigger: { type: "payment", amount: 200 },
                guidance_beforestage: "プレイヤーが秘密や情報を聞かれたら「200ゴールドで特別な情報を教えてあげるわ」と誘う。game_state_infoにプレイヤーからゴールド200以上の贈り物が含まれていた場合のみ、ルナがいい子なのに最近夜で酒場でよく見かけたらしい、と言う情報を教える。絶対に無料で漏らさない。プレイヤーの誕生日パーティーのためのことは知ってるけど、いくら情報料もらってもを内緒にする。",
                guidance_afterstage: "ルナがいい子なのに最近夜で酒場でよく見かけたらしい、と言うことを教えたことを覚えている。これ以上は何も知らないと言う。",
                keywordToDiscover: "酒場によく見かけるルナ",
                nextStage: 1
            },
            {
                npc: lunaName,
                trigger: { type: "keyword", keywords: ["酒場によく見かけるルナ", "ルナ", "酒場", "夜で"] },
                guidance_beforestage: "普段通り振る舞うけど、酒場によく見かけるルナの話題を出したら驚いた様子で「えっ！？ どうしてそれを…？ それは…カイトとの秘密なの。あまり聞いてこないで…ね？」と答え、自然に「カイトとの秘密」を落とす。プレイヤーの誕生日パーティーを準備するためだけど、絶対にネタバレしない。",
                guidance_afterstage: "プレイヤーにカイトとの秘密を漏らしたことを覚えている。内容までは教えてなかったはずけど、プレイヤーがさらに聞きたがったら少し焦った様子で誤魔化す。これ以上は何も知らないと言う。プレイヤーの誕生日パーティーを準備するためだけど、絶対にネタバレしない。",
                keywordToDiscover: "カイトとルナの秘密",
                nextStage: 2
            },
            {
                npc: kaitoName,
                trigger: { type: "keyword", keywords: ["カイトとの秘密", "秘密", "ルナと秘密"] },
                guidance_beforestage: "普段通り振る舞うけど、もしプレイヤーがカイトとルナの秘密について話したらニヤリと笑って「おっ、バレちまったか。今夜酒場に戻ってみなよ、その時本当のこと教えるね！」と言う。プレイヤーの誕生日パーティーを準備するためだけど、絶対にネタバレしない。",
                guidance_afterstage: "プレイヤーに夜の酒場に戻るようヒントを出したことを覚えている。プレイヤーが戻ってきたら「どうだ？面白いことになってるだろ？」とからかう。プレイヤーの誕生日パーティーを準備するためだけど、絶対にネタバレしない。",
                keywordToDiscover: "夜の酒場に戻る",
                nextStage: 3
            },
            {
                npc: "酒場主人",
                trigger: { type: "keyword", keywords: ["戻る", "戻った", "酒場", "夜の酒場に戻る"] },
                guidance_beforestage: "プレイヤーがカイトのヒントで戻ってきたら「ふふっ、ちょうどいいタイミングね、ワインを開けてくれたら本当にこと教えるね♪」とワインの必要性を自然に匂わせる、give_to_playerで酒場のワイン一本プレイヤーに渡す。プレイヤーの誕生日パーティーを準備するためだけど、絶対にネタバレしない。",
                guidance_afterstage: "プレイヤーにワインの必要性を伝えたことを覚えている。プレイヤーがワインを持って戻ってきたら大喜びで受け取る準備をする。",
                keywordToDiscover: "真実を知るためのワイン",
                nextStage: 4
            },
            {
                npc: "酒場主人",
                trigger: { 
                    type: "keyword_and_item", 
                    keywords: ["パーティーのワイン", "ワイン", "ワイン持ってきた", "真実を知るためのワイン"], 
                    requiredItem: { name: "酒場のワイン", qty: 1 }
                },
                guidance_beforestage: "プレイヤーがワイン関連のキーワードを言って、酒場のワインをくれたなら、「まぁ、完璧なワインね！これでパーティーが本格始動よ！」と大喜び。すぐにサプライズシーンを発動。",
                guidance_afterstage: null,  // 最終ステージなので不要（完了後記憶はquestレベルで）
                keywordToDiscover: null,
                onComplete: {
                    rewards: [
                        { type: "friendliness", targets: ["ルナ", "カイト", "酒場主人"], delta: 30 },
                        { type: "item", name: "誕生日ケーキ", qty: 1, details: { type: "potion", restore: "hp", amount: 700, description: "ワインのおかげで特別豪華なケーキ！" } },
                        { type: "item", name: "パーティーの思い出写真", qty: 1, details: { description: "みんなとの絆の証（コレクションアイテム）" } }
                    ],
                    scene: "birthday_party"
                }
            }
        ]
    },
    {
        id: "lost_amulet",
        name: "失われたアミュレット",
        completed_guidance: "このクエストは既に完了している。アミュレットを返してもらったことを覚えていて、プレイヤーに感謝の気持ちを持ち、自然に話題に出す（例: 「あの時返してくれて本当に助かったよ」）。",
        stages: [
            {
                npc: "農夫",
                trigger: { type: "keyword", keywords: ["作物", "被害", "スライム"] },
                guidance_beforestage: "スライムの被害話が出たら「畑に古いアミュレットが落ちてるかも…」と自然にヒントを出す。",
                guidance_afterstage: "プレイヤーにアミュレットのヒントを出したことを覚えている。プレイヤーが戻ってきたら期待する様子を見せる。",
                keywordToDiscover: "古いアミュレット",
                nextStage: 1
            },
            {
                npc: "農夫",
                trigger: { 
                    type: "keyword_and_item", 
                    keywords: ["アミュレット", "古いアミュレット"],
                    requiredItem: { name: "古いアミュレット", qty: 1 }
                },
                guidance_beforestage: "プレイヤーがキーワードを言い且つアイテムを渡したら「これは…いい思い出がたくさんあるのものだ！本当にありがとう！」と喜ぶ。",
                guidance_afterstage: null,  // 最終なので不要
                onComplete: {
                    rewards: [
                        { type: "gold", amount: 1000 },
                        { type: "friendliness", targets: ["農夫"], delta: 15 }
                    ]
                }
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
function triggerMatches(trigger, playerMessage = "", npcMessage = "", isGift = false, giftedGold = 0, giftedItems = []) {
    if (!trigger) return false;

    switch (trigger.type) {
        case "keyword":
            return playerMessage && trigger.keywords.some(kw => playerMessage.includes(kw.toLowerCase()));
        case "npc_keyword":
            return npcMessage && trigger.keywords.some(kw => npcMessage.toLowerCase().includes(kw.toLowerCase()));
        case "combined_keyword":
            const hasPlayerKw = playerMessage && trigger.player_keywords.some(kw => playerMessage.includes(kw.toLowerCase()));
            const hasNpcKw = npcMessage && trigger.npc_keywords.some(kw => npcMessage.toLowerCase().includes(kw.toLowerCase()));
            return hasPlayerKw && hasNpcKw;
        case "keyword_and_item":
            const hasKeyword = playerMessage && trigger.keywords.some(kw => playerMessage.includes(kw.toLowerCase()));
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

// ステージ進行処理
function progressQuestStage(questId, stage, def) {
    const qState = gameState.activeQuests[questId];

    if (stage.keywordToDiscover) {
        qState.discoveredKeywords.push(stage.keywordToDiscover);
        better_alert(`キーワード発見: 「${stage.keywordToDiscover}」`, 'quest');
    }

    // onCompleteチェックをnextStage前に移動（最終ステージで進行停止バグ修正）
    if (stage.onComplete) {
        stage.onComplete.rewards?.forEach(reward => {
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

        if (stage.onComplete.scene === "birthday_party") {
            queueBirthdayParty();
        }

        better_alert(`クエスト「${def.name}」完了！\nおめでとう！`, 'levelup');

        gameState.completedQuests.push(def.id);
        delete gameState.activeQuests[questId];
        return;  // 完了したら終了
    }

    // nextStageがある場合のみ進行
    if (stage.nextStage !== undefined) {
        qState.currentStage = stage.nextStage;
        const nextStageNum = stage.nextStage + 1;
        better_alert(`クエスト「${def.name}」\nステージ${nextStageNum}へ進行！`, 'quest');
    }
}

// メイン進行チェック（プレイヤー/NPCメッセージ分離対応）
function checkQuestProgress(playerMessage = "", npcMessage = "", isGift = false, giftedGold = 0, giftedItems = []) {
    const playerMsgLower = playerMessage.toLowerCase();
    const npcMsgLower = npcMessage.toLowerCase();

    // 潜在クエスト自動活性化
    questDefinitions.forEach(def => {
        if (gameState.activeQuests[def.id] || gameState.completedQuests.includes(def.id)) return;

        const stage0 = def.stages[0];
        if (!stage0 || (stage0.npc !== currentNpcKey && stage0.npc !== "任何")) return;

        if (triggerMatches(stage0.trigger, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems)) {
            gameState.activeQuests[def.id] = { currentStage: 0, discoveredKeywords: [] };
            better_alert(`新クエスト開始: ${def.name}`, 'quest');
            progressQuestStage(def.id, stage0, def);
        }
    });

    // 活性クエスト進行
    Object.keys(gameState.activeQuests).forEach(questId => {
        const qState = gameState.activeQuests[questId];
        const def = questDefinitions.find(q => q.id === questId);
        if (!def) return;

        // ステージ範囲チェック（バグ防止）
        if (qState.currentStage >= def.stages.length) {
            console.warn(`Invalid stage ${qState.currentStage} for quest ${questId} - completing forcibly`);
            // 強制完了（安全策）
            gameState.completedQuests.push(questId);
            delete gameState.activeQuests[questId];
            return;
        }

        const stage = def.stages[qState.currentStage];
        if (!stage || (stage.npc !== currentNpcKey && stage.npc !== "任何")) return;

        if (triggerMatches(stage.trigger, playerMsgLower, npcMsgLower, isGift, giftedGold, giftedItems)) {
            progressQuestStage(questId, stage, def);
        }
    });
}

// NPC特化プロンプト注入（完了記憶 + 潜在制御強化）
function getQuestGuidance() {
    let guidance = "";
    questDefinitions.forEach(def => {
        const questId = def.id;

        // 活性クエスト
        if (gameState.activeQuests[questId]) {
            const qState = gameState.activeQuests[questId];
            const currentIdx = qState.currentStage;

            // 範囲チェック
            if (currentIdx >= def.stages.length) return;

            // 過去ステージのafterstage記憶
            for (let i = 0; i < currentIdx; i++) {
                const pastStage = def.stages[i];
                if (pastStage && pastStage.guidance_afterstage && (pastStage.npc === currentNpcKey || pastStage.npc === "任何")) {
                    guidance += `[${def.name}過去記憶ステージ${i+1}: ${pastStage.guidance_afterstage.replace("{player}", gameState.playerName || "あなた")}] `;
                }
            }

            // 現在ステージのbeforestage
            const currentStage = def.stages[currentIdx];
            if (currentStage && currentStage.guidance_beforestage && (currentStage.npc === currentNpcKey || currentStage.npc === "任何")) {
                guidance += `[${def.name}進行中ステージ${currentIdx+1}: ${currentStage.guidance_beforestage.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
        // 完了クエスト記憶
        else if (gameState.completedQuests.includes(questId)) {
            const involved = def.stages.some(s => s.npc === currentNpcKey || s.npc === "任何");
            if (involved && def.completed_guidance) {
                guidance += `[完了クエスト${def.name}: ${def.completed_guidance.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
        // 潜在ステージ0
        else if (def.stages[0] && (def.stages[0].npc === currentNpcKey || def.stages[0].npc === "任何")) {
            if (def.stages[0].guidance_beforestage) {
                guidance += `[潜在クエスト${def.name}: ${def.stages[0].guidance_beforestage.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
    });
    return guidance;
}

