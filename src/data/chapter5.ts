import { Timelines } from "../type/Timelines";

export const chapter5Data: Timelines = {
    chapter5_scene1: [
        { type: "startAnimation", animationType: "blackIn" },
        { type: "setBackground", key: "chapter5_img1" },
        {
            type: "dialog",
            text: "「ついに、ここに辿り着いた。」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「運命の先には、果たして何が待っているのだろうか。」",
            actorName: "主人公",
        },
        {
            type: "addForeground",
            x: 400,
            y: 250,
            key: "final_person",
            scale: 0.5,
        },
        {
            type: "dialog",
            text: "「ようこそ、最終決戦の舞台へ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「君の選んだ道が、すべてを決める。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「この戦いで、全てが終わる。だが、何が始まるのか、それは君次第だ。」",
            actorName: "謎の人物",
        },
        {
            type: "timelineTransition",
            timelineID: "chapter5_typing_challenge1",
        },
    ],
    chapter5_typing_challenge1: [
        { type: "setBackground", key: "chapter5_img2" },
        {
            type: "dialog",
            text: "「最初の試練が始まる。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「君の意志を試すタイピングチャレンジだ。」",
            actorName: "謎の人物",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "君の覚悟を示せ",
                    typeText: "kiminokakugoosimesae",
                    x: 400,
                    y: 300,
                    challengeTime: 8,
                    fontSize: 32,
                },
                {
                    displayText: "全てを受け入れる",
                    typeText: "subetewoukeireru",
                    x: 400,
                    y: 360,
                    challengeTime: 8,
                    fontSize: 28,
                },
            ],
        },
        {
            type: "timelineTransition",
            timelineID: "chapter5_typing_challenge2",
        },
    ],
    chapter5_typing_challenge2: [
        { type: "setBackground", key: "chapter5_img3" },
        {
            type: "dialog",
            text: "「次は心の試練だ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「君の感情を試す言葉が現れる。」",
            actorName: "謎の人物",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "恐れを乗り越える",
                    typeText: "osorewonorikoeru",
                    x: 400,
                    y: 300,
                    challengeTime: 8,
                    fontSize: 30,
                },
                {
                    displayText: "信念を貫く",
                    typeText: "shinnenwoturanuku",
                    x: 400,
                    y: 360,
                    challengeTime: 8,
                    fontSize: 28,
                },
            ],
        },
        {
            type: "timelineTransition",
            timelineID: "chapter5_typing_challenge3",
        },
    ],
    chapter5_typing_challenge3: [
        { type: "setBackground", key: "chapter5_img4" },
        {
            type: "dialog",
            text: "「最後の試練は、選択だ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「君はどの道を選ぶ？」",
            actorName: "謎の人物",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "進むべき道を選ぶ",
                    typeText: "susumubekimichiwoerabu",
                    x: 400,
                    y: 300,
                    challengeTime: 8,
                    fontSize: 30,
                },
                {
                    displayText: "立ち止まる道を選ぶ",
                    typeText: "tachidomarumichiwoerabu",
                    x: 400,
                    y: 360,
                    challengeTime: 8,
                    fontSize: 28,
                },
            ],
        },
        { type: "timelineTransition", timelineID: "chapter5_end" },
    ],
    chapter5_end: [
        { type: "setBackground", key: "chapter5_img5" },
        {
            type: "dialog",
            text: "「君は選んだ道を進んだ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「そして、その先に新しい運命が待っている。」",
            actorName: "謎の人物",
        },
        { type: "timelineTransition", timelineID: "chapter5_finale" },
    ],
    chapter5_finale: [
        { type: "setBackground", key: "chapter5_img6" },
        {
            type: "dialog",
            text: "「君の運命は、君の手の中にある。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「そして、この物語の終わりが、新たな物語の始まりを意味する。」",
            actorName: "謎の人物",
        },
        { type: "completedChapter", completedChapterNum: 5 },
        { type: "sceneTransition", key: "GameCompleteScene" },
    ],
};
