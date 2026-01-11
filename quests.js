// === quests.js ===
// このファイルを <script src="quests.js"></script> で javascript.js や player2.js の前に読み込んでください。
// すべてのクエスト定義と進行ロジックをここに集約（スケーラブル＆プロンプト軽量）

// クエスト定義データ（新しいクエストはここにオブジェクト追加するだけ！）
const questDefinitions = [
    {
        id: "birthday_surprise",
        name: "サプライズ誕生日パーティー",
        stages: [
            {
                npc: "酒場主人",
                trigger: { type: "payment", amount: 200 },
                guidance: "game_state_infoにプレイヤーからゴールド200以上の贈り物が含まれていた場合のみ、必ず指定の誕生日サプライズヒントを出す：「ふふっ、特別に教えてあげる。最近ルナとカイトが夜遅くに私の酒場でこそこそ会議してたわ。{player}の誕生日パーティーを計画中みたいよ。キーワードは『誕生日パーティー』。絶対内緒にしてね♪」。贈り物がなければ「200ゴールドで特別な情報を教えてあげるわ」と誘うだけ。絶対に無料でヒントや内容を漏らさない。",
                keywordToDiscover: "誕生日パーティー",
                nextStage: 1
            },
            {
                npc: "ルナ",
                trigger: { type: "keyword", keywords: ["誕生日パーティー", "誕生日", "パーティー", "サプライズ"] },
                guidance: "プレイヤーが『誕生日パーティー』をmentionしたら驚いた様子で「えっ！？ どうしてそれを…？ それは…カイトとの秘密なの。あまり聞いてこないで…ね？」と答え、自然に「カイトとの秘密」を落とす。絶対にネタバレしない。",
                keywordToDiscover: "カイトとの秘密",
                nextStage: 2
            },
            {
                npc: "カイト",
                trigger: { type: "keyword", keywords: ["カイトとの秘密", "秘密", "ルナと秘密"] },
                guidance: "プレイヤーが秘密をmentionしたらニヤリと笑って「おっ、バレちまったか。酒場に戻ってみなよ。でも、いいワイン（酒場のワインか上等なエール）を持ってきてくれたら、もっと盛り上がるぜ！」と言う。自然にワインのヒントを出し、キーワード『パーティーのワイン』を落とす。ネタバレ絶対NG。",
                keywordToDiscover: "パーティーのワイン",
                nextStage: 3
            },
            {
                npc: "酒場主人",
                trigger: { type: "keyword", keywords: ["戻る", "戻った", "面白いこと", "酒場", "パーティー"] },
                guidance: "プレイヤーがカイトのヒントで戻ってきたら「ふふっ、ちょうどいいタイミングね。パーティーの準備は進んでるけど、みんなで飲むいいワインがあればもっと豪華になるわよ♪」と自然にワインの必要性を匂わせる。（プレイヤーがまだワインを持ってない場合のフォロー）",
                keywordToDiscover: null,
                nextStage: 4
            },
            {
                npc: "酒場主人",
                trigger: { 
                    type: "keyword_and_item", 
                    keywords: ["パーティーのワイン", "ワイン", "持ってきた", "ワイン持ってきた", "これでパーティー"], 
                    requiredItem: { name: "酒場のワイン", qty: 1 }
                },
                guidance: "プレイヤーがキーワードを言い且つ『酒場のワイン』を渡したら「まぁ、完璧なワインね！これでパーティーが本格始動よ！」と大喜び。すぐにサプライズパーティーシーンを発動。ワインを受け取ったらバッグに追加可能（オプション）。",
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
        stages: [
            {
                npc: "農夫",
                trigger: { type: "keyword", keywords: ["作物", "被害", "スライム"] },
                guidance: "スライムの被害話が出たら「畑に古いアミュレットが落ちてるかも…」と自然にヒントを出す。",
                keywordToDiscover: "古いアミュレット",
                nextStage: 1
            },
            {
                npc: "任何",
                trigger: { 
                    type: "keyword_and_item", 
                    keywords: ["アミュレット", "古いアミュレット"],
                    requiredItem: { name: "古いアミュレット", qty: 1 }
                },
                guidance: "プレイヤーがキーワードを言い且つアイテムを渡したら「これは…昔のギルドのものだ！本当にありがとう！」と喜ぶ。",
                onComplete: {
                    rewards: [
                        { type: "gold", amount: 300 },
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

    // キーワード発見通知
    if (stage.keywordToDiscover) {
        qState.discoveredKeywords.push(stage.keywordToDiscover);
        better_alert(`キーワード発見: 「${stage.keywordToDiscover}」`, 'quest');
    }

    // ステージ進行通知
    if (stage.nextStage !== undefined) {
        qState.currentStage = stage.nextStage;
        const nextStageNum = stage.nextStage + 1;
        better_alert(`クエスト「${def.name}」\nステージ${nextStageNum}へ進行！`, 'quest');
        return;
    }

    // 完了処理
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

        // 完了リストに追加 + 活性削除
        gameState.completedQuests.push(def.id);
        delete gameState.activeQuests[questId];
    }
}

// メイン進行チェック（プレイヤー/NPCメッセージ分離対応）
function checkQuestProgress(playerMessage = "", npcMessage = "", isGift = false, giftedGold = 0, giftedItems = []) {
    const playerMsgLower = playerMessage.toLowerCase();
    const npcMsgLower = npcMessage.toLowerCase();

    // 潜在クエスト自動活性化（完了済み除外）
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
        // 活性クエスト
        if (gameState.activeQuests[def.id]) {
            const qState = gameState.activeQuests[def.id];
            const stage = def.stages[qState.currentStage];
            if (stage && (stage.npc === currentNpcKey || stage.npc === "任何") && stage.guidance) {
                guidance += `[${def.name}進行中: ${stage.guidance.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
        // 完了クエスト記憶（関わったNPCのみ）
        else if (gameState.completedQuests.includes(def.id)) {
            const involved = def.stages.some(s => s.npc === currentNpcKey || s.npc === "任何");
            if (involved) {
                guidance += `[完了クエスト記憶${def.name}: このクエストは既に完了している。プレイヤーと一緒に${def.name}を達成したことを覚えていて、時折感謝や関連話題を自然に出す（例: 「あの時のパーティー、楽しかったね」など）。詳細は明かさない。] `;
            }
        }
        // 潜在ステージ0（paymentは誘いのみ）
        else if (def.stages[0] && (def.stages[0].npc === currentNpcKey || def.stages[0].npc === "任何")) {
            if (def.stages[0].trigger.type !== "payment" && def.stages[0].guidance) {
                guidance += `[潜在クエスト${def.name}: ${def.stages[0].guidance.replace("{player}", gameState.playerName || "あなた")}] `;
            } else if (def.stages[0].trigger.type === "payment") {
                guidance += `[潜在クエスト${def.name}: プレイヤーが秘密や情報を聞かれたら「200ゴールドで特別な情報を教えてあげるわ」と誘う。絶対に無料で内容を漏らさない。] `;
            }
        }
    });
    return guidance;
}

// 誕生日パーティーシーン（javascript.jsに移動推奨だが一時的にここに）
function queueBirthdayParty() {
    const playerSpeaker = gameState.playerName || 'あなた';
    const sequence = [
        {speaker: 'ナレーター', text: '酒場に戻ると、突然灯りが消えて…暗闇の中から声が響く！'},
        {speaker: 'ルナ', text: 'サプライズ！！ お誕生日おめでとう、' + playerSpeaker + '！'},
        {speaker: 'カイト', text: 'へへ、ようやく気づいたか！ パーティーだぜ！'},
        {speaker: '酒場主人', text: 'ふふっ、みんなで何日も前から準備してたのよ。ケーキも特製よ♪'},
        {speaker: playerSpeaker, text: 'みんな…ありがとう！ 本当に嬉しいよ…！'},
        {speaker: 'ナレーター', text: '笑顔と祝福に包まれた温かい夜…。絆がさらに深まった。'}
    ];
    completionQueue.push(sequence);
    if (!isPlayingDialogue) {
        playNextDialogue();
    }
}