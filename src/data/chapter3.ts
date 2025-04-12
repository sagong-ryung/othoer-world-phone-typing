import { Timelines } from "../type/Timelines";

export const chapter3Data: Timelines = {
    chapter3_scene1: [
        { type: "startAnimation", animationType: "blackIn" },
        { type: "setBackground", key: "ruins_entrance" },
        {
            type: "dialog",
            text: "「やっと……町を抜けたと思ったら、今度は遺跡……？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「なんか…空気が変わった気がする」",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "静まり返った遺跡を進む",
                    typeText: "shizumarikaettaisekiwosusumu",
                    x: 400,
                    y: 300,
                    challengeTime: 6,
                    fontSize: 32,
                },
                {
                    displayText: "風の音しか聞こえない",
                    typeText: "kazenootoshikakikoenai",
                    x: 400,
                    y: 360,
                    challengeTime: 6,
                    fontSize: 28,
                },
            ],
        },
        {
            type: "addForeground",
            x: 300,
            y: 350,
            key: "mysterious_girl",
            scale: 0.35,
        },
        {
            type: "dialog",
            text: "「あなた…この場所に足を踏み入れたのね」",
            actorName: "謎の少女",
        },
        {
            type: "dialog",
            text: "「君は誰なんだ……？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「ここに入るには覚悟がいるわ。さもなくば道に迷う」",
            actorName: "謎の少女",
        },
        { type: "timelineTransition", timelineID: "chapter3_trial_intro" },
    ],

    chapter3_trial_intro: [
        { type: "setBackground", key: "ruins_hall" },
        {
            type: "dialog",
            text: "「この遺跡には三つの試練がある」",
            actorName: "謎の少女",
        },
        {
            type: "dialog",
            text: "「一つ目は記憶の試練。言葉を通してあなたの真実を見る」",
            actorName: "謎の少女",
        },
        { type: "timelineTransition", timelineID: "chapter3_trial1" },
    ],

    chapter3_trial1: [
        { type: "setBackground", key: "ruins_memory_chamber" },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "過去を振り返る力",
                    typeText: "kakowofurikaeruchikara",
                    x: 400,
                    y: 300,
                    challengeTime: 5,
                    fontSize: 32,
                },
                {
                    displayText: "思い出が蘇る",
                    typeText: "omoidegayomigaeru",
                    x: 400,
                    y: 360,
                    challengeTime: 5,
                    fontSize: 28,
                },
            ],
        },
        {
            type: "dialog",
            text: "（……この言葉、どこか懐かしい）",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「二つ目は心の試練。あなたの感情を試すわ」",
            actorName: "謎の少女",
        },
        { type: "timelineTransition", timelineID: "chapter3_trial2" },
    ],

    chapter3_trial2: [
        { type: "setBackground", key: "ruins_emotion_hall" },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "恐れを越える勇気",
                    typeText: "osorewokoeruyuuki",
                    x: 400,
                    y: 300,
                    challengeTime: 6,
                    fontSize: 30,
                },
                {
                    displayText: "悲しみを力に変える",
                    typeText: "kanashimiwochikaranikaeru",
                    x: 400,
                    y: 360,
                    challengeTime: 6,
                    fontSize: 28,
                },
            ],
        },
        {
            type: "dialog",
            text: "「最後の試練は……選択。あなた自身の道を選ぶの」",
            actorName: "謎の少女",
        },
        { type: "timelineTransition", timelineID: "chapter3_select1" },
    ],

    chapter3_select1: [
        { type: "setBackground", key: "ruins_three_paths" },
        {
            type: "dialog",
            text: "「この先に三つの道がある。どの道も正解になりうる。ただし…覚悟が問われる」",
            actorName: "謎の少女",
        },
        {
            type: "choice",
            choices: [
                { text: "中央の道を進む", timelineID: "chapter3_wrong1" },
                { text: "左の道を進む", timelineID: "chapter3_wrong2" },
                { text: "右の道を進む", timelineID: "chapter3_scene2" },
            ],
        },
    ],

    chapter3_wrong1: [
        { type: "setBackground", key: "ruins_trap" },
        {
            type: "dialog",
            text: "「わっ……床が崩れる！？」",
            actorName: "主人公",
        },
        { type: "startAnimation", animationType: "shake" },
        {
            type: "dialog",
            text: "（……気を取り直して、もう一度選ぼう）",
            actorName: "主人公",
        },
        { type: "timelineTransition", timelineID: "chapter3_select1" },
    ],

    chapter3_wrong2: [
        { type: "setBackground", key: "ruins_loop" },
        {
            type: "dialog",
            text: "（何度も同じ場所に戻ってる……）",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "抜け出すには冷静さが必要だ",
                    typeText: "nukedasunihareiseisagahitsuyouda",
                    x: 400,
                    y: 300,
                    challengeTime: 8,
                    fontSize: 28,
                },
            ],
        },
        { type: "timelineTransition", timelineID: "chapter3_select1" },
    ],

    chapter3_scene2: [
        { type: "setBackground", key: "ruins_chamber" },
        {
            type: "dialog",
            text: "「よくぞここまで辿り着いたわね」",
            actorName: "謎の少女",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "君は誰なんだ…？",
                    typeText: "kimihadanenanda",
                    x: 400,
                    y: 300,
                    challengeTime: 4,
                    fontSize: 30,
                },
                {
                    displayText: "なぜ試練を課したんだ？",
                    typeText: "nazesirenuokashitanda",
                    x: 400,
                    y: 360,
                    challengeTime: 5,
                    fontSize: 28,
                },
            ],
        },
        {
            type: "dialog",
            text: "「私は……この世界の“境界”を守る者」",
            actorName: "謎の少女",
        },
        {
            type: "dialog",
            text: "「そしてあなたは、“目覚める者”……」",
            actorName: "謎の少女",
        },
        {
            type: "dialog",
            text: "「……目覚める……？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「次の章で、あなたの運命が動き出す」",
            actorName: "謎の少女",
        },
        { type: "timelineTransition", timelineID: "chapter4_scene1" },
    ],
};
