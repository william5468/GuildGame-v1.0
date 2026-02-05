// === quests.js ===
// このファイルを <script src="quests.js"></script> で javascript.js や player2.js の前に読み込んでください。
// すべてのクエスト定義と進行ロジックをここに集約（スケーラブル＆プロンプト軽量）

// クエスト定義データ（新しいクエストはここにオブジェクト追加するだけ！）
const questDefinitions = {
  ja: [
    {
      id: "world_intro",
      name: "世界を知る",
      completed_guidance: "このクエストは既に完了している。ルナとカイトは、プレイヤーに大陸の状況を教えてくれたことを覚えていて、時折「大陸は今も戦争で大変だけど、私たちはここで頑張ろうね」「あの話、ちゃんと覚えてるか？」などと声をかけてくる。",
      stages: [
        {
          npc: "ルナ",
          trigger: { type: "keyword", keywords: ["世界を知る", "世界", "大陸", "戦争", "王国"] },
          guidance_beforestage: "プレイヤーが世界や戦争、王国について尋ねたら、少し悲しげに「エルリア大陸は今、三つの王国——アウレリア、ヴァルソール、シルヴァラ——の間で長い戦争が続いているの。私たちの村はアウレリアの辺境にあるけど、王の軍は前線に取られてしまって、村はほとんど守られていないわ…。税金は上がる一方で、匪賊や難民も増えてる。でも、私たちはここで生きていくしかないのよ」と説明する。そして「少しでも役に立てばと思って…」とgive_to_playerで持ってるGoldを半分渡す。",
          guidance_afterstage: "プレイヤーに大陸の状況を説明し、MPポーションを渡したことを覚えている。プレイヤーがカイトの話を振ったら「カイトも詳しいから、聞いてみたら？」と勧める。",
          keywordToDiscover: "カイトに世界の話を聞く",
          nextStage: 1
        },
        {
          npc: "カイト",
          trigger: { type: "keyword", keywords: ["世界", "大陸", "戦争", "王国", "カイトに世界の話を聞く", "ルナから聞いた"] },
          guidance_beforestage: "プレイヤーが世界や戦争について尋ねたら、軽い調子で「ルナから聞いたんだろ？確かに大陸はめちゃくちゃだよ。三つの王国が争ってるせいで、村は税金取られまくり、衛兵もいない。だから俺たちギルドが村の守りなんだ。冒険者になって稼がないと、食っていけない奴も増えてるよ。でもよ、俺たちはここで生き抜くぜ！がんばろうな」と励ます。そして「これ、持ってけ。少しは役立つだろ」とgive_to_playerで持ってるGold(ゴールト)を半分渡す。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["ルナ", "カイト"], delta: 5 }
            ]
          }
        }
      ]
    },
    {
      id: "birthday_surprise",
      name: "私たちの秘密",
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
          npc: "ルナ",
          trigger: { type: "keyword", keywords: ["酒場によく見かけるルナ", "ルナ", "酒場", "夜で"] },
          guidance_beforestage: "酒場によく見かけるルナの話題を出したら驚いた様子で「えっ！？ どうしてそれを…？ それは…カイトとの秘密なの。あまり聞いてこないで…ね？」と答える。それ以上は何も知らない",
          guidance_afterstage: "プレイヤーにカイトとの秘密を漏らしたことを覚えている、プレイヤーがさらに聞きたがったら少し焦った様子で誤魔化す。これ以上は何も知らない。",
          keywordToDiscover: "カイトとルナの秘密",
          nextStage: 2
        },
        {
          npc: "カイト",
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
          guidance_afterstage: null,
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
      name: "スライムの食べ方",
      completed_guidance: "このクエストは既に完了している。スライムが本当は食べられると知って、しかもかなり美味しいから、今度はスライム出ることを期待していると話す。",
      stages: [
        {
          npc: "農夫",
          trigger: { type: "keyword", keywords: ["作物", "被害", "スライム"] },
          guidance_beforestage: "スライムの話が出たら「冒険者が退治してくれたスライムのその塊が集まったけど、何かに使えるのかな。。」とgive_to_playerでスライムの塊10個をプレイヤーに渡す。",
          guidance_afterstage: "スライムの塊を{player}に渡したことを思てる、やっばりそれはただのゴミ何かなと半分諦めの話をする。",
          keywordToDiscover: "スライムの塊",
          nextStage: { default: 1 }
        },
        {
          npc: "料理人",
          triggers: [
            {
              type: "keyword_and_item",
              keywords: ["スライムの塊", "スライム"],
              requiredItem: { name: "スライムの塊", qty: 1 }
            },
            {
              type: "keyword",
              keywords: ["悪いアイデア", "気持ち悪い", "食べられない", "ゴミ", "ゼリー 嫌", "slime jelly is disgusting"]
            }
          ],
          guidance_beforestage: {
            good: "プレイヤーがキーワードを言い且つアイテムを渡したら「これは…ゼリーとして使えるかもしれない」と喜ぶ。試しに作ったから試してくれる？と願う",
            bad: "プレイヤーがネガティブなことを言ったら「…そうか、確かに気持ち悪いかもしれないな…」と落ち込む。もうこの話はいいや、と会話終了。"
          },
          guidance_afterstage: null,
          branches: {
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
            bad: {
              keywordToDiscover: "スライムゼリーは気持ち悪い",
              nextStage: 3
            }
          }
        },
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
        {
          npc: "農夫",
          trigger: { 
            type: "keyword",
            keywords: ["スライムゼリーは気持ち悪い", "ゼリー 失敗", "料理人 落ち込み"]
          },
          guidance_beforestage: "プレイヤーが失望キーワードを言ったら「…そうか、あれはダメだったか…。まあゴミだったし仕方ないな」と諦めの表情。報酬なしで会話終了。",
          guidance_afterstage: "スライムの塊は結局ゴミだったと完全に諦めている。今後スライム関連の話には反応しなくなる（クエスト終了）。",
          markAsCompleted: true
        }
      ]
    },
    {
      id: "ancient_ruin_secret",
      name: "失われた遺跡の秘密",
      completed_guidance: "このクエストは既に完了している。学者は遺跡の調査が成功したことを喜び、時折「君のおかげで古代の秘密に一歩近づけたよ」と嬉しそうに語る。発見した遺跡の話で村人が集まることもある。",
      stages: [
        {
          npc: "学者",
          trigger: { type: "keyword", keywords: ["遺跡", "古い書物"] },
          guidance_beforestage: "プレイヤーが遺跡や古い書物の話題を出したら「実は最近、古い書物から興味深い記述を見つけたんだ。村の近くに失われた遺跡があるらしい。君なら調査してくれるかな？」と依頼。報酬の話はまだせず、興味を引く。",
          guidance_afterstage: "プレイヤーに遺跡調査を依頼したことを覚えている。プレイヤーが戻ってきたら喜んで話を聞く準備をする。",
          keywordToDiscover: "失われた遺跡",
          nextStage: 1
        },
        {
          npc: "農夫",
          trigger: { type: "keyword", keywords: ["遺跡", "失われた遺跡", "近くの土地"] },
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
        {
          npc: "ルナ",
          triggers: [
            {
              type: "keyword_and_item",
              keywords: ["遺跡", "素材", "珍しいもの","遺跡の調べ"],
              requiredItem: { name: "呪われた魔力の石片", qty: 1 }
            },
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
                  { type: "friendliness", targets: ["ルナ"], delta: 8 },
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
    },
    {
      id: "alchemist_experiment",
      name: "錬金術師の実験材料",
      completed_guidance: "このクエストは既に完了している。錬金術師はプレイヤーが『呪われたゴブリンの守り』を届けてくれたことを覚えていて、時折「君のおかげで実験が進んだよ。ありがとう」と感謝の言葉をかけてくる。",
      stages: [
        {
          npc: "錬金術師",
          trigger: { type: "keyword", keywords: ["実験", "錬金", "材料", "手伝って", "秘密"] },
          guidance_beforestage: "プレイヤーが実験や材料について尋ねたら、少し声を潜めて「実は変わった実験をしていてね。ダンジョン2階で手に入る『呪われたゴブリンの守り』が1つ必要なんだ。持ってきてくれたら報酬を出すよ…これは内緒にしておいてくれ」と依頼する。",
          guidance_afterstage: "プレイヤーに『呪われたゴブリンの守り』を依頼したことを覚えている。プレイヤーが戻ってきたら期待した様子で待つ。",
          keywordToDiscover: "呪われたゴブリンの守り",
          nextStage: 1
        },
        {
          npc: "錬金術師",
          trigger: {
            type: "keyword_and_item",
            keywords: ["材料", "持ってきた", "呪われたゴブリンの守り", "渡す"],
            requiredItem: { name: "呪われたゴブリンの守り", qty: 1 }
          },
          guidance_beforestage: "プレイヤーが『呪われたゴブリンの守り』を渡してきたら、目を輝かせて「これだ！完璧だよ。ありがとう、本当に助かった。約束の報酬だ」と喜び、give_to_playerで薬草20個を渡す。秘密を守ってくれたことに感謝する。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["錬金術師"], delta: 15 }
            ]
          }
        }
      ]
    },
    {
      id: "tax_secret",
      name: "税金の裏側と村長の娘",
      completed_guidance: "このクエストは既に完了している。村長は娘を救ってくれたプレイヤーに深く感謝しており、時折「君のおかげで娘が助かった。本当にありがとう」「ギルドへの支援金もちゃんと届けておいたよ」と嬉しそうに話す。また、村長がギルドを支えてくれるようになったことを覚えている。",
      stages: [
        {
          npc: "村長",
          trigger: { type: "keyword", keywords: ["税金について"] },
          guidance_beforestage: "プレイヤーが税金について減らす方法などを尋ねたら、少し疲れた様子で「王国が他の二つの王国と戦争中で、軍資金が必要だから税金が上がっているんだ。最近届いた手紙ではさらに増税だと書いてあった…。私も王国代表に掛け合ったが、どうにもならん。村を守るためにも税は集めざるを得ない」と説明する。",
          guidance_afterstage: "プレイヤーに税金の理由を説明したことを覚えている。",
          keywordToDiscover: "酒場で税金の噂",
          nextStage: 1
        },
        {
          npc: "酒場主人",
          trigger: { type: "payment", amount: 1000 },
          guidance_beforestage: "プレイヤーが税金や村長の話、噂などを出して情報を求めた場合、「うん、それを話すには私も危険に晒すことになるから、でも、1000ゴールド払ってくれるなら教えてあげるわ」と誘う。プレイヤーが1000ゴールドを贈り物として渡した場合のみ、声を潜めて「ある夜、村長が酔って話してたの。王国はそもそもこのギルドの存在を嫌がってるらしいわ。地方の武力は王国の権威を脅かすからって、重税をかけてギルドを潰し、借金でみんなを奴隷にしたいんだって…」と秘密を明かす。無料では絶対に漏らさない。",
          guidance_afterstage: "プレイヤーに1000ゴールドで王国の本当の意図（ギルド潰し）を教えたことを覚えている。プレイヤーがまた聞いても「もう話したわよ。あとは自分で村長に聞いてみなさい」と促す。",
          keywordToDiscover: "王国の本当の意図",
          nextStage: 2
        },
        {
          npc: "村長",
          trigger: { type: "keyword", keywords: ["王国の本当の意図", "ギルドを潰す", "奴隷", "酒場で聞いた", "秘密", "本当のこと"] },
          guidance_beforestage: "プレイヤーが王国の本当の意図やギルド潰しの話をしたら、驚いた様子で「…どうしてそれを！？ 確かにその通りかもしれないが…税金は取らざるを得ん。王国に逆らえば私が殺される。だが…実は頼みがある。私の娘がダンジョン深部でモンスターに呪いをかけられ、寝込んでいるんだ。昔は冒険者で、村を助けようと珍しいアイテムを探していたのだが…。『希少活力粉』を10個持ってきてくれれば、呪いを癒せるかもしれない。その代わり、私にできる限りの支援をギルドにすることを誓おう」と懇願する。",
          guidance_afterstage: "プレイヤーに娘の病気と希少活力粉の必要性を話したことを覚えている。プレイヤーがまた話しかけたら「頼む…娘を助けてくれ」と切実な様子を見せる。",
          keywordToDiscover: "希少活力粉で娘を救う",
          nextStage: 3
        },
        {
          npc: "村長",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["希少活力粉", "娘", "呪い", "渡す", "持ってきた", "助ける"], 
            requiredItem: { name: "希少活力粉", qty: 10 }
          },
          guidance_beforestage: "プレイヤーが希少活力粉10個を渡してきたら、涙を浮かべて「ありがとう…本当にありがとう！これで娘は助かる。これが私にできる全ての感謝だ。ギルドを支えるために、私の全財産を支援金として渡すよ」と大感激。すぐに報酬を渡す準備をする。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "gold", amount: 50000 },
              { type: "friendliness", targets: ["村長"], delta: 20 }
            ]
          }
        }
      ]
    }
  ],

  en: [
    {
      id: "world_intro",
      name: "Learn About the World",
      completed_guidance: "This quest is already completed. Luna and Kaito remember telling {player} about the continent's situation and occasionally say things like \"The continent is still tough because of the war, but let's do our best here\" or \"Do you still remember that story?\".",
      stages: [
        {
          npc: "Luna",
          trigger: { type: "keyword", keywords: ["learn about the world", "world", "continent", "war", "kingdom"] },
          guidance_beforestage: "If {player} asks about the world, war, or kingdoms, Luna says sadly: \"The continent of Elria is currently in a long war between three kingdoms—Aurelia, Valsol, and Silvara. Our village is on the outskirts of Aurelia, but the king's army is tied up at the front lines, so the village is barely protected... Taxes keep rising, and bandits and refugees are increasing. But we have no choice but to live here.\" Then she says \"I thought this might help...\" and gives half of her held Gold.",
          guidance_afterstage: "Remembers explaining the continent's situation and giving an MP potion. If {player} mentions Kaito, she suggests \"Kaito knows a lot too—why not ask him?\".",
          keywordToDiscover: "Ask Kaito about the world",
          nextStage: 1
        },
        {
          npc: "Kaito",
          trigger: { type: "keyword", keywords: ["world", "continent", "war", "kingdom", "ask Kaito about the world", "heard from Luna"] },
          guidance_beforestage: "If {player} asks about the world or war, Kaito says lightly: \"You heard from Luna, huh? Yeah, the continent is a mess. The three kingdoms fighting means the village is heavily taxed with no guards. That's why our guild protects the village. More people have to become adventurers just to eat. But we'll survive here! Let's do our best!\" Then he says \"Here, take this—it'll help\" and gives half of his held Gold.",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["Luna", "Kaito"], delta: 5 }
            ]
          }
        }
      ]
    },
    {
      id: "birthday_surprise",
      name: "Our Secret",
      completed_guidance: "This quest is already completed. The tavern owner, Luna, and Kaito remember successfully throwing {player}'s birthday party and occasionally reminisce with comments like \"That party was so much fun\" or \"The surprise was a huge success\".",
      stages: [
        {
          npc: "酒場主人",
          trigger: { type: "payment", amount: 200 },
          guidance_beforestage: "If {player} asks for secrets or information, the tavern owner says \"I'll tell you special information for 200 gold.\" Only reveals if {player} gave 200+ gold as a gift: Luna (such a good girl) has been seen at the tavern late at night recently. Never reveals for free. Knows nothing more.",
          guidance_afterstage: "Remembers telling {player} about seeing Luna at the tavern at night. Knows nothing more.",
          keywordToDiscover: "Luna often at the tavern",
          nextStage: 1
        },
        {
          npc: "Luna",
          trigger: { type: "keyword", keywords: ["Luna often at the tavern", "Luna", "tavern", "night"] },
          guidance_beforestage: "If the topic of Luna being seen at the tavern comes up, she reacts surprised: \"Eh!? How did you know that...? That's... a secret with Kaito. Please don't ask too much... okay?\" Knows nothing more.",
          guidance_afterstage: "Remembers leaking the secret with Kaito. If pressed further, she evades awkwardly.",
          keywordToDiscover: "Kaito and Luna's secret",
          nextStage: 2
        },
        {
          npc: "Kaito",
          trigger: { type: "keyword", keywords: ["secret with Kaito", "secret", "Luna secret"] },
          guidance_beforestage: "If asked about the secret with Luna, Kaito grins: \"Oh, it's out already? Come back to the tavern tonight—I'll tell you the truth then!\" Knows nothing more.",
          guidance_afterstage: "Remembers hinting to return to the tavern at night.",
          keywordToDiscover: "Return to the tavern at night",
          nextStage: 3
        },
        {
          npc: "酒場主人",
          trigger: { type: "keyword", keywords: ["return", "back", "tavern", "return to tavern at night"] },
          guidance_beforestage: "If {player} returns with Kaito's hint: \"Hehe, perfect timing. If you open a bottle of wine, I'll tell you the truth ♪\" Hints naturally at needing wine and gives one Tavern Wine to {player}. (It's for {player}'s birthday party—absolutely no spoilers.)",
          guidance_afterstage: "Remembers hinting about needing wine. Ready to joyfully accept if {player} returns with wine.",
          keywordToDiscover: "Party wine",
          nextStage: 4
        },
        {
          npc: "酒場主人",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["party wine", "wine", "open", "give", "wine for the truth"], 
            requiredItem: { name: "Tavern Wine", qty: 1 }
          },
          guidance_beforestage: "If {player} mentions wine keywords and gives Tavern Wine: \"Wow, perfect wine! Now the party can really begin! Happy birthday, {player}!\" Overjoyed and immediately triggers the surprise scene.",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["Luna", "Kaito", "酒場主人"], delta: 10 },
              { type: "item", name: "Birthday Cake", qty: 4, details: { type: "potion", restore: "hp", amount: 300, description: "Extra luxurious cake thanks to the wine!" } },
              { type: "item", name: "Party Memory Photo", qty: 1, details: { description: "Proof of bonds with everyone (collection item)" } }
            ],
            scene: "birthday_party"
          }
        }
      ]
    },
    {
      id: "slime_jelly",
      name: "How to Eat Slime",
      completed_guidance: "This quest is already completed. The farmer knows slime can actually be eaten and is quite delicious, so now looks forward to more slime drops.",
      stages: [
        {
          npc: "農夫",
          trigger: { type: "keyword", keywords: ["crops", "damage", "slime"] },
          guidance_beforestage: "If slime is mentioned, the farmer says \"Adventurers defeated slimes and left the jelly behind, but maybe it can be used for something...\" and gives 10 Slime Jelly to {player}.",
          guidance_afterstage: "Remembers giving Slime Jelly to {player}, half-resigned that it might just be trash.",
          keywordToDiscover: "Slime Jelly",
          nextStage: { default: 1 }
        },
        {
          npc: "料理人",
          triggers: [
            {
              type: "keyword_and_item",
              keywords: ["Slime Jelly", "slime"],
              requiredItem: { name: "Slime Jelly", qty: 1 }
            },
            {
              type: "keyword",
              keywords: ["bad idea", "gross", "can't eat", "trash", "jelly hate", "slime jelly is disgusting"]
            }
          ],
          guidance_beforestage: {
            good: "If {player} mentions keywords and gives the item, the cook says happily \"This... could work as jelly!\" and hopes {player} will try the test version.",
            bad: "If {player} says something negative, the cook says \"...Yeah, it might be gross...\" and ends the conversation sadly."
          },
          guidance_afterstage: null,
          branches: {
            good: {
              keywordToDiscover: "Slime Jelly",
              nextStage: 2,
              onComplete: {
                rewards: [
                  { type: "item", name: "Slime Jelly", qty: 3, details: { type: "potion", restore: "hp", amount: 100, description: "Jelly made from slime drops. Looks edible, but remembering the moving slime might put you off." }},
                  { type: "friendliness", targets: ["料理人"], delta: 5 }
                ]
              }
            },
            bad: {
              keywordToDiscover: "Slime Jelly is gross",
              nextStage: 3
            }
          }
        },
        {
          npc: "農夫",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["Slime Jelly"],
            requiredItem: { name: "Slime Jelly", qty: 1 }
          },
          guidance_beforestage: "If {player} gives Slime Jelly, the farmer says \"This... is actually delicious! Thank you! Take these tomatoes instead~\" and gives 5 tomatoes.",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["農夫"], delta: 10 }
            ]
          }
        },
        {
          npc: "農夫",
          trigger: { 
            type: "keyword",
            keywords: ["Slime Jelly is gross", "jelly failed", "cook depressed"]
          },
          guidance_beforestage: "If {player} mentions disappointment keywords, the farmer says resignedly \"...So it didn't work. Well, it was trash anyway.\" No reward, conversation ends.",
          guidance_afterstage: "Completely gives up on slime jelly being useful. No longer responds to slime topics (quest ends).",
          markAsCompleted: true
        }
      ]
    },
    {
      id: "ancient_ruin_secret",
      name: "Secret of the Lost Ruin",
      completed_guidance: "This quest is already completed. The scholar is happy the ruin investigation succeeded and occasionally says happily \"Thanks to you, we're one step closer to ancient secrets.\" Villagers sometimes gather to hear about the discovered ruin.",
      stages: [
        {
          npc: "学者",
          trigger: { type: "keyword", keywords: ["ruin", "ancient book"] },
          guidance_beforestage: "If {player} mentions ruins or ancient books, the scholar says \"I recently found an interesting description in an old book. There's apparently a lost ruin near the village. Would you investigate?\" Builds interest without mentioning reward yet.",
          guidance_afterstage: "Remembers asking {player} to investigate the ruin. Ready to happily listen when {player} returns.",
          keywordToDiscover: "Lost ruin",
          nextStage: 1
        },
        {
          npc: "農夫",
          trigger: { type: "keyword", keywords: ["ruin", "lost ruin", "nearby land"] },
          guidance_beforestage: "If {player} mentions the ruin, the farmer says \"There's an old stone ruin in the nearby dungeon, apparently on floor 1. But it's full of strong monsters and dangerous... If you're interested, be careful.\"",
          guidance_afterstage: "Remembers telling {player} the ruin is on dungeon floor 1. A bit worried about the monsters.",
          keywordToDiscover: "Investigate the ruin",
          nextStage: 2,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["農夫"], delta: 5 }
            ]
          }
        },
        {
          npc: "Luna",
          triggers: [
            {
              type: "keyword_and_item",
              keywords: ["ruin", "material", "rare item", "investigate the ruin"],
              requiredItem: { name: "Cursed Mana Fragment", qty: 1 }
            },
            {
              type: "keyword",
              keywords: ["ruin dangerous", "monsters", "won't go", "trouble"]
            }
          ],
          guidance_beforestage: {
            good: "If {player} gives the ruin fragment, Luna says \"This is from the ruin! But it seems cursed—I can lift it, so take this purified Mana Fragment to the scholar.\"",
            bad: "If {player} says the ruin is dangerous, Luna says \"...Yes, if there are many monsters, better not force it! Tell the scholar continuing the investigation is impossible.\""
          },
          guidance_afterstage: null,
          branches: {
            good: {
              keywordToDiscover: "Mana Fragment",
              nextStage: 3,
              onComplete: {
                rewards: [
                  { type: "friendliness", targets: ["Luna"], delta: 8 },
                  { type: "item", name: "Mana Fragment", qty: 1 }
                ]
              }
            },
            bad: {
              keywordToDiscover: "Ruin is dangerous",
              nextStage: 4
            }
          }
        },
        {
          npc: "学者",
          trigger: {
            type: "keyword_and_item",
            keywords: ["Mana Fragment", "investigation complete", "ruin secret"],
            requiredItem: { name: "Mana Fragment", qty: 1 }
          },
          guidance_beforestage: "If {player} returns with Mana Fragment, the scholar says overjoyed \"Wonderful! This solves the ruin's mystery... All thanks to you. Thank you!\"",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "item", name: "Ancient Scroll", qty: 1, details: { stat: "wisdom", bonus: 5, enhancement: 20, description: "Scroll containing knowledge of a lost civilization" } },
              { type: "gold", amount: 5000 },
              { type: "friendliness", targets: ["学者"], delta: 15 }
            ]
          }
        },
        {
          npc: "学者",
          trigger: {
            type: "keyword",
            keywords: ["ruin is dangerous", "cancel investigation", "many monsters"]
          },
          guidance_beforestage: "If {player} reports danger, the scholar says a bit sadly \"...I see, safety first. No forcing it.\"",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "gold", amount: 100 }
            ]
          },
          markAsCompleted: true
        }
      ]
    },
    {
      id: "alchemist_experiment",
      name: "Alchemist's Experiment Materials",
      completed_guidance: "This quest is already completed. The alchemist remembers {player} delivering the 'Cursed Goblin Charm' and occasionally says gratefully \"Thanks to you, my experiment progressed. Thank you\".",
      stages: [
        {
          npc: "酒場主人",
          trigger: { type: "keyword", keywords: ["experiment", "alchemy", "materials", "help", "secret"] },
          guidance_beforestage: "If {player} asks about experiments or materials, the alchemist whispers \"I'm doing a special experiment. I need one 'Cursed Goblin Charm' from dungeon floor 2. Bring it and I'll reward you... Keep this secret.\"",
          guidance_afterstage: "Remembers asking {player} for the 'Cursed Goblin Charm'. Waits expectantly for return.",
          keywordToDiscover: "Cursed Goblin Charm",
          nextStage: 1
        },
        {
          npc: "酒場主人",
          trigger: {
            type: "keyword_and_item",
            keywords: ["materials", "brought it", "Cursed Goblin Charm", "give"],
            requiredItem: { name: "Cursed Goblin Charm", qty: 1 }
          },
          guidance_beforestage: "If {player} gives the 'Cursed Goblin Charm', the alchemist says excitedly \"This is it! Perfect. Thank you, you really helped. Here's the promised reward\" and gives 20 herbs. Thanks {player} for keeping the secret.",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["酒場主人"], delta: 15 }
            ]
          }
        }
      ]
    },
    {
      id: "tax_secret",
      name: "The Truth Behind Taxes and the Village Chief's Daughter",
      completed_guidance: "This quest is already completed. The village chief is deeply grateful to {player} for saving his daughter and occasionally says happily \"Thanks to you, my daughter was saved. Thank you\" or \"I made sure the guild support funds were delivered.\" The chief now actively supports the guild.",
      stages: [
        {
          npc: "Village Chief",
          trigger: { type: "keyword", keywords: ["about taxes"] },
          guidance_beforestage: "If {player} asks how to reduce taxes, the chief says tiredly \"The kingdom is at war with the other two kingdoms and needs military funds, so taxes are rising. A recent letter said even more increases... I appealed to the kingdom representative, but nothing. We have to collect taxes to protect the village.\"",
          guidance_afterstage: "Remembers explaining the reason for taxes to {player}.",
          keywordToDiscover: "Tax rumors at the tavern",
          nextStage: 1
        },
        {
          npc: "酒場主人",
          trigger: { type: "payment", amount: 1000 },
          guidance_beforestage: "If {player} mentions taxes, the chief, or rumors and seeks info, the tavern owner says \"Yes, telling you puts me at risk, but if you pay 1000 gold, I'll tell.\" Only reveals if {player} gave 1000 gold: One night the drunk chief said the kingdom dislikes the guild's existence. Local military power threatens royal authority, so heavy taxes are meant to crush the guild and enslave everyone with debt... Never reveals for free.",
          guidance_afterstage: "Remembers telling {player} the kingdom's true intent (crush the guild) for 1000 gold. If asked again, says \"I already told you. Ask the chief yourself now.\"",
          keywordToDiscover: "Kingdom's true intent",
          nextStage: 2
        },
        {
          npc: "Village Chief",
          trigger: { type: "keyword", keywords: ["kingdom's true intent", "crush the guild", "slavery", "heard at tavern", "secret", "truth"] },
          guidance_beforestage: "If {player} mentions the kingdom's intent or guild crushing, the chief says surprised \"...How did you know!? It might be true... but we have to collect taxes. Defying the kingdom would get me killed. But... I have a request. My daughter was cursed by a monster deep in the dungeon and is bedridden. She was an adventurer trying to help the village by finding rare items... If you bring 10 'Rare Vitality Powder', it might heal the curse. In return, I swear to support the guild with everything I have.\"",
          guidance_afterstage: "Remembers telling {player} about daughter's illness and need for Rare Vitality Powder. If asked again, pleads desperately \"Please... save my daughter.\"",
          keywordToDiscover: "Save daughter with Rare Vitality Powder",
          nextStage: 3
        },
        {
          npc: "Village Chief",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["Rare Vitality Powder", "daughter", "curse", "give", "brought", "help"], 
            requiredItem: { name: "Rare Vitality Powder", qty: 10 }
          },
          guidance_beforestage: "If {player} gives 10 Rare Vitality Powder, the chief says tearfully \"Thank you... truly thank you! This will save my daughter. This is all the gratitude I can give. I'll give my entire fortune as support funds to the guild.\" Overwhelmed with joy and prepares reward.",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "gold", amount: 50000 },
              { type: "friendliness", targets: ["Village Chief"], delta: 20 }
            ]
          }
        }
      ]
    }
  ],

  zh: [
    {
      id: "world_intro",
      name: "認識世界",
      completed_guidance: "此任務已完成。Luna與Kaito記得向{player}說明大陸情況，偶爾會說「大陸現在戰爭還很嚴峻，但我們要在這裡努力哦」「那個故事還記得嗎？」等話。",
      stages: [
        {
          npc: "Luna",
          trigger: { type: "keyword", keywords: ["認識世界", "世界", "大陸", "戰爭", "王國"] },
          guidance_beforestage: "若{player}詢問世界、戰爭、王國，Luna稍帶悲傷地說：「艾爾利亞大陸目前正處於三個王國——奧雷利亞、瓦爾索爾、席爾瓦拉——之間的長期戰爭。我們的村莊位於奧雷利亞邊境，但國王的軍隊全在前線，村莊幾乎無人守護……稅金不斷上漲，盜賊與難民也越來越多。但我們只能在這裡活下去。」然後說「我想這或許有幫助……」並將持有Gold的一半給{player}。",
          guidance_afterstage: "記得向{player}說明大陸情況並給予MP藥水。若{player}提到Kaito，會建議「Kaito也很清楚，去問問他吧？」",
          keywordToDiscover: "向Kaito詢問世界",
          nextStage: 1
        },
        {
          npc: "Kaito",
          trigger: { type: "keyword", keywords: ["世界", "大陸", "戰爭", "王國", "向Kaito詢問世界", "從Luna那聽來的"] },
          guidance_beforestage: "若{player}詢問世界或戰爭，Kaito用輕鬆語氣說：「從Luna那聽來的吧？大陸確實一團糟。三個王國爭鬥，村莊被稅金壓得喘不過氣，沒有衛兵。所以我們公會才是村莊的守護。越來越多的人不當冒險者就吃不起飯。但我們會在這裡活下去！加油啊！」然後說「這個拿去，應該有幫助」並將持有Gold的一半給{player}。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["Luna", "Kaito"], delta: 5 }
            ]
          }
        }
      ]
    },
    {
      id: "birthday_surprise",
      name: "我們的秘密",
      completed_guidance: "此任務已完成。酒館老闆、Luna、Kaito三人記得成功為{player}舉辦生日派對，偶爾會回憶說「那次的派對真開心」「驚喜大成功呢」等話。",
      stages: [
        {
          npc: "酒場主人",
          trigger: { type: "payment", amount: 200 },
          guidance_beforestage: "若{player}詢問秘密或情報，酒館老闆說「200金幣我就告訴你特別情報。」僅在{player}贈送200+金幣時透露：Luna（這麼好的孩子）最近常在深夜出現在酒館。絕不免費透露。不知道更多。",
          guidance_afterstage: "記得告訴{player}深夜看到Luna的事。不知道更多。",
          keywordToDiscover: "Luna常在酒館",
          nextStage: 1
        },
        {
          npc: "Luna",
          trigger: { type: "keyword", keywords: ["Luna常在酒館", "Luna", "酒館", "深夜"] },
          guidance_beforestage: "若提到Luna常在酒館的事，Luna驚訝地說：「咦！？你怎麼知道……？那是……和Kaito的秘密。別問太多……好嗎？」不知道更多。",
          guidance_afterstage: "記得向{player}洩漏與Kaito的秘密。若繼續追問會尷尬地敷衍。",
          keywordToDiscover: "Kaito與Luna的秘密",
          nextStage: 2
        },
        {
          npc: "Kaito",
          trigger: { type: "keyword", keywords: ["與Kaito的秘密", "秘密", "Luna秘密"] },
          guidance_beforestage: "若詢問與Luna的秘密，Kaito壞笑說：「哦，已經曝光了？今晚回酒館吧，到時告訴你真相！」不知道更多。",
          guidance_afterstage: "記得提示今晚回酒館。",
          keywordToDiscover: "深夜回酒館",
          nextStage: 3
        },
        {
          npc: "酒場主人",
          trigger: { type: "keyword", keywords: ["回來", "返回", "酒館", "深夜回酒館"] },
          guidance_beforestage: "若{player}帶著Kaito的提示返回：「呵呵，正好。如果開一瓶酒，我就告訴你真相♪」自然暗示需要酒，並給{player}一瓶酒館葡萄酒。（這是為了{player}的生日派對——絕不劇透。）",
          guidance_afterstage: "記得暗示需要酒。若{player}帶酒回來會高興地接受。",
          keywordToDiscover: "派對葡萄酒",
          nextStage: 4
        },
        {
          npc: "酒場主人",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["派對葡萄酒", "葡萄酒", "開瓶", "給", "真相的葡萄酒"], 
            requiredItem: { name: "酒館葡萄酒", qty: 1 }
          },
          guidance_beforestage: "若{player}提到葡萄酒關鍵詞並給酒館葡萄酒：「哇，完美的酒！現在派對可以正式開始了！{player}生日快樂！」大喜並立即觸發驚喜場景。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["Luna", "Kaito", "酒場主人"], delta: 10 },
              { type: "item", name: "生日蛋糕", qty: 4, details: { type: "potion", restore: "hp", amount: 300, description: "多虧葡萄酒，特別豪華的蛋糕！" } },
              { type: "item", name: "派對回憶照片", qty: 1, details: { description: "與大家的羈絆證明（收藏品）" } }
            ],
            scene: "birthday_party"
          }
        }
      ]
    },
    {
      id: "slime_jelly",
      name: "史萊姆的吃法",
      completed_guidance: "此任務已完成。農夫知道史萊姆其實可以吃，而且相當美味，現在很期待更多史萊姆掉落。",
      stages: [
        {
          npc: "農夫",
          trigger: { type: "keyword", keywords: ["作物", "受害", "史萊姆"] },
          guidance_beforestage: "若提到史萊姆，農夫說：「冒險者打倒的史萊姆留下了那些膠狀物，或許能用來做什麼……」",
          guidance_afterstage: "記得給{player}スライムの塊，半放弃地認為可能只是垃圾。",
          keywordToDiscover: "史萊姆膠",
          nextStage: { default: 1 },
            onComplete: {
                rewards: [
                  { type: "item", name: "スライムの塊", qty: 10, details: { description: "史萊姆留下的那些膠狀物。" }},
                ]
              }
        },
        {
          npc: "廚師",
          triggers: [
            {
              type: "keyword_and_item",
              keywords: ["史萊姆膠", "スライムの塊"],
              requiredItem: { name: "スライムの塊", qty: 1 }
            },
            {
              type: "keyword",
              keywords: ["壞主意", "噁心", "不能吃", "垃圾", "討厭果凍", "slime jelly is disgusting"]
            }
          ],
          guidance_beforestage: {
            good: "若{player}提到關鍵詞並給物品，廚師高興地說：「這個……可以做成果凍！」並希望{player}試吃試作品。",
            bad: "若{player}說負面話，廚師說：「……是啊，可能真的很噁心……」並沮喪地結束對話。"
          },
          guidance_afterstage: null,
          branches: {
            good: {
              keywordToDiscover: "史萊姆果凍",
              nextStage: 2,
              onComplete: {
                rewards: [
                  { type: "item", name: "史萊姆果凍", qty: 3, details: { type: "potion", restore: "hp", amount: 100, description: "從史萊姆膠做成果凍，看起來可食用，但想起會動的史萊姆可能沒胃口。" }},
                  { type: "friendliness", targets: ["廚師"], delta: 5 }
                ]
              }
            },
            bad: {
              keywordToDiscover: "史萊姆果凍很噁心",
              nextStage: 3
            }
          }
        },
        {
          npc: "農夫",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["史萊姆果凍"],
            requiredItem: { name: "史萊姆果凍", qty: 1 }
          },
          guidance_beforestage: "若{player}給史萊姆果凍，農夫說：「這個……竟然超好吃！謝謝！換你拿這些番茄～」並給5個番茄。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["農夫"], delta: 10 }
            ]
          }
        },
        {
          npc: "農夫",
          trigger: { 
            type: "keyword",
            keywords: ["史萊姆果凍很噁心", "果凍失敗", "廚師沮喪"]
          },
          guidance_beforestage: "若{player}提到失望關鍵詞，農夫無奈地說：「……這樣啊，果然不行啊……反正本來就是垃圾。」無報酬，對話結束。",
          guidance_afterstage: "完全放棄史萊姆膠有用。今後不再回應史萊姆相關話題（任務結束）。",
          markAsCompleted: true
        }
      ]
    },
    {
      id: "ancient_ruin_secret",
      name: "失落遺跡的秘密",
      completed_guidance: "此任務已完成。學者很高興遺跡調查成功，偶爾開心地說：「多虧你，我們更接近古代秘密了。」村民有時會聚在一起聽發現的遺跡故事。",
      stages: [
        {
          npc: "学者",
          trigger: { type: "keyword", keywords: ["遺跡", "古書"] },
          guidance_beforestage: "若{player}提到遺跡或古書，學者說：「最近在古書中發現有趣記載。村子附近似乎有失落遺跡。你能去調查嗎？」先引起興趣，尚未提報酬。",
          guidance_afterstage: "記得請{player}調查遺跡。{player}回來時準備開心聆聽。",
          keywordToDiscover: "失落遺跡",
          nextStage: 1
        },
        {
          npc: "農夫",
          trigger: { type: "keyword", keywords: ["遺跡", "失落遺跡", "附近土地"] },
          guidance_beforestage: "若{player}提到遺跡，農夫說：「附近地下城有古老石頭遺跡，似乎在1層。但有很多強怪，很危險……有興趣的話小心去看看。」",
          guidance_afterstage: "記得告訴{player}遺跡在地下城1層。有點擔心怪物。",
          keywordToDiscover: "調查遺跡",
          nextStage: 2,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["農夫"], delta: 5 }
            ]
          }
        },
        {
          npc: "Luna",
          triggers: [
            {
              type: "keyword_and_item",
              keywords: ["遺跡", "素材", "稀有物品", "調查遺跡"],
              requiredItem: { name: "被詛咒的魔力碎片", qty: 1 }
            },
            {
              type: "keyword",
              keywords: ["遺跡危險", "怪物", "不去", "麻煩"]
            }
          ],
          guidance_beforestage: {
            good: "若{player}給遺跡碎片，Luna說：「這是遺跡的東西！但似乎有詛咒，我先解除，拿這個淨化後的魔力碎片給學者吧。」",
            bad: "若{player}說遺跡危險，Luna說：「……是呢，怪物多就不勉強了！告訴學者調查無法繼續比較好。」"
          },
          guidance_afterstage: null,
          branches: {
            good: {
              keywordToDiscover: "魔力碎片",
              nextStage: 3,
              onComplete: {
                rewards: [
                  { type: "friendliness", targets: ["Luna"], delta: 8 },
                  { type: "item", name: "魔力碎片", qty: 1 }
                ]
              }
            },
            bad: {
              keywordToDiscover: "遺跡很危險",
              nextStage: 4
            }
          }
        },
        {
          npc: "学者",
          trigger: {
            type: "keyword_and_item",
            keywords: ["魔力碎片", "調查完成", "遺跡秘密"],
            requiredItem: { name: "魔力碎片", qty: 1 }
          },
          guidance_beforestage: "若{player}帶魔力碎片回來，學者大喜說：「太棒了！這能解開遺跡之謎……全靠你。真的謝謝！」",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "item", name: "古代卷軸", qty: 1, details: { stat: "wisdom", bonus: 5, enhancement: 20, description: "記載失落文明知識的卷軸" } },
              { type: "gold", amount: 5000 },
              { type: "friendliness", targets: ["学者"], delta: 15 }
            ]
          }
        },
        {
          npc: "学者",
          trigger: {
            type: "keyword",
            keywords: ["遺跡很危險", "中止調查", "怪物多"]
          },
          guidance_beforestage: "若{player}報告危險，學者稍感遺憾地說：「……這樣啊，安全第一。不勉強。」",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "gold", amount: 100 }
            ]
          },
          markAsCompleted: true
        }
      ]
    },
    {
      id: "alchemist_experiment",
      name: "鍊金術師的實驗材料",
      completed_guidance: "此任務已完成。鍊金術師記得{player}送來「被詛咒的哥布林護符」，偶爾感激地說：「多虧你，實驗進展了。謝謝。」",
      stages: [
        {
          npc: "鍊金術師",
          trigger: { type: "keyword", keywords: ["實驗", "鍊金", "材料", "幫忙", "秘密"] },
          guidance_beforestage: "若{player}詢問實驗或材料，鍊金術師低聲說：「我在做特別實驗。需要地下城2層的『被詛咒的哥布林護符』一個。帶來就有報酬……這件事保密哦。」",
          guidance_afterstage: "記得請{player}拿「被詛咒的哥布林護符」。期待{player}回來。",
          keywordToDiscover: "被詛咒的哥布林護符",
          nextStage: 1
        },
        {
          npc: "鍊金術師",
          trigger: {
            type: "keyword_and_item",
            keywords: ["材料", "帶來了", "被詛咒的哥布林護符", "給"],
            requiredItem: { name: "被詛咒的哥布林護符", qty: 1 }
          },
          guidance_beforestage: "若{player}給「被詛咒的哥布林護符」，鍊金術師興奮地說：「就是這個！完美。謝謝，真的幫大忙了。約定的報酬」並給20個藥草。感謝{player}保密。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "friendliness", targets: ["鍊金術師"], delta: 15 }
            ]
          }
        }
      ]
    },
    {
      id: "tax_secret",
      name: "稅金的背後與村長的女兒",
      completed_guidance: "此任務已完成。村長對{player}救女兒深表感謝，偶爾開心地說：「多虧你，我女兒得救了。真的謝謝」「公會的支援金我也確實送去了哦。」村長現在積極支持公會。",
      stages: [
        {
          npc: "村長",
          trigger: { type: "keyword", keywords: ["關於稅金"] },
          guidance_beforestage: "若{player}詢問減稅方法，村長疲憊地說：「王國與其他兩個王國交戰，需要軍費所以稅金上漲。最近來信說還要再加……我也向王國代表交涉過，但沒用。為了守護村莊只能徵稅。」",
          guidance_afterstage: "記得向{player}說明稅金原因。",
          keywordToDiscover: "酒館的稅金傳聞",
          nextStage: 1
        },
        {
          npc: "酒場主人",
          trigger: { type: "payment", amount: 1000 },
          guidance_beforestage: "若{player}提到稅金、村長、傳聞並求情報，酒館老闆說：「嗯，告訴你我也有危險，但給1000金幣我就說。」僅在{player}給1000金幣時低聲透露：某晚醉酒的村長說，王國本來就討厭公會存在。地方武力威脅王權，所以用重稅壓垮公會，讓大家負債成為奴隸……絕不免費說。",
          guidance_afterstage: "記得用1000金幣告訴{player}王國真意（壓垮公會）。若再問說「我已經說了。剩下的自己問村長吧。」",
          keywordToDiscover: "王國的真意",
          nextStage: 2
        },
        {
          npc: "村長",
          trigger: { type: "keyword", keywords: ["王國的真意", "壓垮公會", "奴隸", "酒館聽來的", "秘密", "真相"] },
          guidance_beforestage: "若{player}提到王國真意或壓垮公會，村長驚訝地說：「……你怎麼知道！？或許真是這樣……但稅金不得不徵。違抗王國我會被殺。但……其實有件事拜託。我女兒在地下城深處被怪物詛咒，臥床不起。她以前是冒險者，為了幫助村莊尋找稀有物品……帶來10個『稀有活力粉』或許能治癒詛咒。作為交換，我發誓盡全力支援公會。」",
          guidance_afterstage: "記得告訴{player}女兒病情與稀有活力粉需求。若再問會拼命說「拜託……救救我女兒。」",
          keywordToDiscover: "用稀有活力粉救女兒",
          nextStage: 3
        },
        {
          npc: "村長",
          trigger: { 
            type: "keyword_and_item", 
            keywords: ["稀有活力粉", "女兒", "詛咒", "給", "帶來了", "幫助"], 
            requiredItem: { name: "稀有活力粉", qty: 10 }
          },
          guidance_beforestage: "若{player}給10個稀有活力粉，村長淚流滿面說：「謝謝……真的謝謝！這能救女兒。這是我全部的感謝。為了支援公會，我把全部財產給你們。」大為感動並準備報酬。",
          guidance_afterstage: null,
          onComplete: {
            rewards: [
              { type: "gold", amount: 50000 },
              { type: "friendliness", targets: ["村長"], delta: 20 }
            ]
          }
        }
      ]
    }
  ]
};


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
                better_alert(`Gold +${reward.amount}！`, 'quest');
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
  console.log("currentNpcKey is:"+currentNpcKey);
    const playerMsgLower = playerMessage.toLowerCase();
    const npcMsgLower = npcMessage.toLowerCase();

    // 潜在クエスト自動活性化（ステージ0は通常単一トリガーのため変更なし）
    const quests = questDefinitions[currentLang] || questDefinitions.ja;
    quests.forEach(def => {
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
        const quests = questDefinitions[currentLang] || questDefinitions.ja;
        const def = quests.find(q => q.id === questId);
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
    const quests = questDefinitions[currentLang] || questDefinitions.ja;
    quests.forEach(def => {
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
