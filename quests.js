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
            trigger: { type: "payment", amount: 200 },  // 秘密販売200G支払い
            guidance: "秘密販売で200G受け取ったら、必ず誕生日サプライズのヒントを出す。「ふふっ、特別に教えてあげる。最近ルナとカイトが夜遅くに私の酒場でこそこそ会議してたわ。{player}の誕生日パーティーを計画中みたいよ。キーワードは『誕生日パーティー』。絶対内緒にしてね♪」",
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
            keywordToDiscover: null,  // すでにキーワード持ってるはず
            nextStage: 4
        },
        {
            npc: "酒場主人",
            trigger: { 
                type: "keyword_and_item", 
                keywords: ["パーティーのワイン", "ワイン", "持ってきた", "ワイン持ってきた", "これでパーティー"], 
                requiredItem: { name: "酒場のワイン", qty: 1 }  // または "上等なエール" に拡張可能（複数item対応は別途コード調整）
            },
            guidance: "プレイヤーがキーワードを言い且つ『酒場のワイン』を渡したら「まぁ、完璧なワインね！これでパーティーが本格始動よ！」と大喜び。すぐにサプライズパーティーシーンを発動。ワインを受け取ったらバッグに追加可能（オプション）。",
            keywordToDiscover: null,
            onComplete: {
                rewards: [
                    { type: "friendliness", targets: ["ルナ", "カイト", "酒場主人"], delta: 30 },  // ワイン持参でボーナス+10
                    { type: "item", name: "誕生日ケーキ", qty: 1, details: { type: "potion", restore: "hp", amount: 700, description: "ワインのおかげで特別豪華なケーキ！" } },  // ボーナス効果UP
                    { type: "item", name: "パーティーの思い出写真", qty: 1, details: { description: "みんなとの絆の証（コレクションアイテム）" } }
                ],
                scene: "birthday_party"
            }
        }
    ]
},
    // === 例: アイテムトリガー付きクエスト ===
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
                npc: "任何",  // どのNPCでもOK（ワイルドカード）
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

// トリガー一致判定
function triggerMatches(trigger, message = "", isGift = false, giftedGold = 0, giftedItems = []) {
    if (!trigger) return false;

    switch (trigger.type) {
        case "keyword":
            return trigger.keywords.some(kw => message.toLowerCase().includes(kw.toLowerCase()));
        case "keyword_and_item":
            const hasKeyword = trigger.keywords.some(kw => message.toLowerCase().includes(kw.toLowerCase()));
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

    // キーワード発見通知（クエスト専用スタイルに変更）
    if (stage.keywordToDiscover) {
        qState.discoveredKeywords.push(stage.keywordToDiscover);
        better_alert(`キーワード発見: 「${stage.keywordToDiscover}」`, 'quest');
        // TODO: ジャーナルUI追加（別途実装推奨）
    }

    // ステージ進行時（nextStageがある場合）の通知
    if (stage.nextStage !== undefined) {
        qState.currentStage = stage.nextStage;

        // 次のステージ番号（1ベースで表示してわかりやすく）
        const nextStageNum = stage.nextStage + 1;
        better_alert(`クエスト「${def.name}」\nステージ${nextStageNum}へ進行！`, 'quest');

        return;
    }

    // 完了処理（onCompleteがある場合）
    if (stage.onComplete) {
        // 報酬処理（個別通知をクエストスタイルに統一）
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
                let item = gameState.inventory.find(i => i.name === reward.name);
                const qty = reward.qty || 1;
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

        // 専用シーン（誕生日パーティーなど）
        if (stage.onComplete.scene === "birthday_party") {
            queueBirthdayParty();
        }

        // クエスト完了通知（大達成感でlevelupスタイルを維持、またはquestでもOK）
        better_alert(`クエスト「${def.name}」完了！\nおめでとう！`, 'levelup');

        delete gameState.activeQuests[questId];
    }
}

// メイン進行チェック（外部から呼び出し）
function checkQuestProgress(message = "", isGift = false, giftedGold = 0, giftedItems = []) {
    // 潜在クエスト（ステージ0）の自動活性化
    questDefinitions.forEach(def => {
        if (gameState.activeQuests[def.id]) return;

        const stage0 = def.stages[0];
        if (!stage0 || (stage0.npc !== currentNpcKey && stage0.npc !== "任何")) return;

        if (triggerMatches(stage0.trigger, message, isGift, giftedGold, giftedItems)) {
            gameState.activeQuests[def.id] = { currentStage: 0, discoveredKeywords: [] };
            better_alert(`新クエスト開始: ${def.name}`, 'success');
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

        if (triggerMatches(stage.trigger, message, isGift, giftedGold, giftedItems)) {
            progressQuestStage(questId, stage, def);
        }
    });
}

// NPC特化プロンプト注入文字列生成（100クエストでも超軽量）
function getQuestGuidance() {
    let guidance = "";
    questDefinitions.forEach(def => {
        // 活性クエスト: 現在ステージがこのNPC関連
        if (gameState.activeQuests[def.id]) {
            const qState = gameState.activeQuests[def.id];
            const stage = def.stages[qState.currentStage];
            if (stage && (stage.npc === currentNpcKey || stage.npc === "任何") && stage.guidance) {
                guidance += `[${def.name}進行中: ${stage.guidance.replace("{player}", gameState.playerName || "あなた")}] `;
            }
        }
        // 潜在ステージ0: このNPCで開始可能ならヒント出しやすく注入
        else if (def.stages[0] && (def.stages[0].npc === currentNpcKey || def.stages[0].npc === "任何") && def.stages[0].guidance) {
            guidance += `[潜在クエスト${def.name}: ${def.stages[0].guidance.replace("{player}", gameState.playerName || "あなた")}] `;
        }
    });
    return guidance;
}

