import { Timelines } from "../type/Timelines";

export const chapter4Data: Timelines = {
    chapter4_scene1: [
        { type: "startAnimation", animationType: "blackIn" },
        { type: "setBackground", key: "chapter4_img1" },
        {
            type: "dialog",
            text: "「ここが、あの境界……？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「全てが変わる瞬間、いよいよ来たな…」",
            actorName: "主人公",
        },
        {
            type: "addForeground",
            x: 400,
            y: 250,
            key: "mysterious_person",
            scale: 0.4,
        },
        {
            type: "dialog",
            text: "「お待ちしておりました、目覚める者よ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「あなたの運命は、ここから始まる。」",
            actorName: "謎の人物",
        },
        { type: "timelineTransition", timelineID: "chapter4_scene2" },
    ],
    chapter4_scene2: [
        { type: "setBackground", key: "chapter4_img2" },
        {
            type: "dialog",
            text: "「ここから先には試練が待ち構えている。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「私の力を借りなければ、進むことはできない。」",
            actorName: "謎の人物",
        },
        { type: "timelineTransition", timelineID: "chapter4_trial1" },
    ],
    chapter4_trial1: [
        { type: "setBackground", key: "chapter4_img3" },
        {
            type: "dialog",
            text: "「これは“意志の試練”だ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「試練を通過し、あなたの真の意志を示せ。」",
            actorName: "謎の人物",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "自分の決意を固める",
                    typeText: "jibunnoketuiwokatameru",
                    x: 400,
                    y: 300,
                    challengeTime: 6,
                    fontSize: 32,
                },
                {
                    displayText: "未来に向かって進む",
                    typeText: "mirainimukattesusumu",
                    x: 400,
                    y: 360,
                    challengeTime: 6,
                    fontSize: 28,
                },
            ],
        },
        { type: "timelineTransition", timelineID: "chapter4_trial2" },
    ],
    chapter4_trial2: [
        { type: "setBackground", key: "chapter4_img4" },
        {
            type: "dialog",
            text: "「次は“心の試練”だ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「君の感情が試される。」",
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
                    challengeTime: 6,
                    fontSize: 30,
                },
                {
                    displayText: "信念を貫く",
                    typeText: "sinnenwoturanuku",
                    x: 400,
                    y: 360,
                    challengeTime: 6,
                    fontSize: 28,
                },
            ],
        },
        { type: "timelineTransition", timelineID: "chapter4_trial3" },
    ],
    chapter4_trial3: [
        { type: "setBackground", key: "chapter4_img5" },
        {
            type: "dialog",
            text: "「最後の試練は、選択。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「君はどの道を選ぶ？」",
            actorName: "謎の人物",
        },
        {
            type: "choice",
            choices: [
                { text: "進むべき道を選ぶ", timelineID: "chapter4_end1" },
                { text: "道を選ばずに立ち止まる", timelineID: "chapter4_end2" },
            ],
        },
    ],
    chapter4_end1: [
        { type: "setBackground", key: "chapter4_img6" },
        {
            type: "dialog",
            text: "「君は選び、運命を切り開いた。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「次の章で、さらなる試練が待つ。」",
            actorName: "謎の人物",
        },
        { type: "completedChapter", completedChapterNum: 4 },
        { type: "sceneTransition", key: "ChapterSelectScene" },
    ],
    chapter4_end2: [
        { type: "setBackground", key: "chapter4_img6" },
        {
            type: "dialog",
            text: "「選ばなかった道に迷い、君は立ちすくんだ。」",
            actorName: "謎の人物",
        },
        {
            type: "dialog",
            text: "「次の章では、その選択が試される。」",
            actorName: "謎の人物",
        },
        { type: "completedChapter", completedChapterNum: 4 },
        { type: "sceneTransition", key: "ChapterSelectScene" },
    ],
};
