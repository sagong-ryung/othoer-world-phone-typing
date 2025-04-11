import { Timelines } from "../type/Timelines";

export const chapter1Data: Timelines = {
    chapter1_scene1: [
        { type: "setBackground", key: "turn_home" },
        {
            type: "dialog",
            text: "「やっとおつかい終わったな、\n早く帰らないとお母さんが心配する。」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「あれ、何か忘れてる気がする。。。\nやべっ、ほうれん草買い忘れてる！急いで戻らなきゃ」",
            actorName: "主人公",
        },
        { type: "dialog", text: "スーパーに急いで戻る" },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "スーパーに急いで戻る",
                    typeText: "su-pa-niisoidemodoru",
                    x: 400,
                    y: 300,
                    challengeTime: 5,
                    fontSize: 32,
                },
            ],
        },
        { type: "timelineTransition", timelineID: "chapter1_scene2" },
    ],
    chapter1_scene2: [
        { type: "setBackground", key: "truck" },
        { type: "dialog", text: "ブォォォォォン！！" },
        {
            type: "dialog",
            text: "「！？ えっ、うそっ！！」\n(ヘッドライトの光が視界を焼く。心臓が跳ね上がる。)",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "(足がすくんで動けない。\nその瞬間――)",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "立ち上がる",
                    typeText: "tachiagaru",
                    x: 400,
                    y: 300,
                    challengeTime: 3,
                    fontSize: 32,
                },
                {
                    displayText: "避ける",
                    typeText: "yokeru",
                    x: 400,
                    y: 300,
                    challengeTime: 3,
                    fontSize: 32,
                },
            ],
        },
        {
            type: "dialog",
            text: "「やばい、間に合わない…！\n死ぬのか…！？ こんなとこで！」",
            actorName: "主人公",
        },
        // TODO トラックのブレーキ音
        { type: "startAnimation", animationType: "zoomIn" },
        { type: "startAnimation", animationType: "flashOut" },
        { type: "timelineTransition", timelineID: "chapter1_scene3" },
    ],
    chapter1_scene3: [
        { type: "setBackground", key: "forest" },
        { type: "startAnimation", animationType: "heartBeat" },
        { type: "startAnimation", animationType: "blackIn" },
        {
            type: "dialog",
            text: "「うっ、い、痛くな…い…？どうして生きてるんだ…？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "(目を開けると、周りはうす暗い森。静寂が支配している)",
        },
        {
            type: "dialog",
            text: "「ここは……どこだ？ 夢……？\nそれとももう死んでるとか…うす暗くて気味悪いな……」\n(周囲の静けさが不気味で、心臓の鼓動が耳に響く)",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「誰か…誰かいるのか？ こんなところで一人なんて、、」",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "深呼吸をする",
                    typeText: "shinkokyuuwosuru",
                    x: 400,
                    y: 300,
                    challengeTime: 5,
                    fontSize: 32,
                },
            ],
        },
        { type: "stopAnimation", animationType: "heartBeat" },
        {
            type: "dialog",
            text: "「ふぅ…落ち着いた。」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「ええい！考えても無駄だ！とにかく進んでみよう」",
            actorName: "主人公",
        },
        { type: "startAnimation", animationType: "zoomIn" },
        { type: "startAnimation", animationType: "blackOut" },
        { type: "timelineTransition", timelineID: "chapter1_scene4" },
    ],
    chapter1_scene4: [
        { type: "setBackground", key: "forest_phone" },
        { type: "addForeground", x: 200, y: 300, key: "hotaru1", scale: 0.2 },
        { type: "addForeground", x: 500, y: 300, key: "hotaru2", scale: 0.2 },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "きらめき",
                    typeText: "kirameki",
                    x: 200,
                    y: 400,
                    challengeTime: 3,
                    fontSize: 32,
                },
                {
                    displayText: "幻想",
                    typeText: "gensou",
                    x: 500,
                    y: 400,
                    challengeTime: 3,
                    fontSize: 32,
                },
            ],
        },
        { type: "clearForeground" },
        {
            type: "dialog",
            text: "「ふぅ…びっくりした……」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「あれ！？右側になんかあるぞ…！？」",
            actorName: "主人公",
        },
        // TODO 進むアニメーション
        { type: "timelineTransition", timelineID: "chapter1_scene5" },
    ],
    chapter1_scene5: [
        { type: "setBackground", key: "phone" },
        {
            type: "dialog",
            text: "「こんなところに公衆電話があるなんて……\n（自分の息遣いだけが響く）」",
            actorName: "主人公",
        },
        { type: "setBackground", key: "call_phone" },
        // TODO 震えるアニメーション
        {
            type: "dialog",
            text: "その瞬間、「ちりりりーん！」",
        },
        {
            type: "dialog",
            text: "「うわっ！」\n（思わず肩をビクッと震わせ、心臓が飛び跳ねる。。）",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "辺りが静まり返っていて、余計にその音が響き渡る。",
        },
        {
            type: "dialog",
            text: "（どうしよう……取るべきか、、、？）",
            actorName: "主人公",
        },
        {
            type: "choice",
            choices: [
                {
                    text: "受話器を取る",
                    timelineID: "chapter1_scene5_choice1",
                },
                {
                    text: "受話器を取らない",
                    timelineID: "chapter1_scene5_choice2",
                },
            ],
        },
    ],
    chapter1_scene5_choice1: [
        { type: "setBackground", key: "phone_hand" },
        {
            type: "dialog",
            text: "ゆっくりと受話器を手に取り、恐る恐る耳に当てる。",
        },
        {
            type: "dialog",
            text: "「。。。」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「……しぃ……か……い……かえ……し……けぇ……」",
            actorName: "？？？",
        },
        {
            type: "dialog",
            text: "（受話器の向こうから、低くてこもった声が聞こえてくる。）",
        },
        {
            type: "dialog",
            text: "（しかし、その声は言葉になっていないように感じる）",
        },
        {
            type: "dialog",
            text: "「……えっ？なんて言ってるんだろう……」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「……す………め……」",
            actorName: "？？？",
        },
        { type: "timelineTransition", timelineID: "chapter2_scene1" },
    ],
    chapter1_scene5_choice2: [
        { type: "sceneTransition", key: "GameOverScene" },
    ],
};
