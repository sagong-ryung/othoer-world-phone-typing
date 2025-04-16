import { Timelines } from "../type/Timelines";

export const chapter2Data: Timelines = {
    chapter2_scene1: [
        // TODO 歩く音
        {
            type: "dialog",
            text: "「なんとなく森をずっと進んでるけど、ずっと同じ景色だなぁ」",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "森の中をずっと歩く",
                    typeText: "morinonakawozuttoaruku",
                    x: 400,
                    y: 300,
                    challengeTime: 5,
                    fontSize: 32,
                },
                {
                    displayText: "もう後戻りはできないので進むしかない",
                    typeText: "mouatomodorihadekinainodesusumusikanai",
                    x: 400,
                    y: 300,
                    challengeTime: 5,
                    fontSize: 32,
                },
            ],
        },
        {
            type: "dialog",
            text: "「お…！なんか見えてきたぞ……！」",
            actorName: "主人公",
        },
        { type: "setBackground", key: "town" },
        // { type: "startAnimation", animationType: "blackIn" },
        {
            type: "dialog",
            text: "「………なんだ……ここは…？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「……町？」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「でも…なんだろう、この感じ。\n町の人々がどこかおかしい。」",
            actorName: "主人公",
        },
        {
            type: "addForeground",
            x: 200,
            y: 350,
            key: "town_human",
            scale: 0.3,
        },
        { type: "startAnimation", animationType: "flash" },
        {
            type: "dialog",
            text: "「うわっ！！」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「おまえ、どこから入ってきた。。！」",
            actorName: "町の人",
        },
        {
            type: "dialog",
            text: "「いや、その、森の中に倒れてて、それで、、あの、、\n（びっくりして上手く話せない）」",
            actorName: "主人公",
        },
        { type: "clearForeground" },
        {
            type: "addForeground",
            x: 200,
            y: 350,
            key: "town_human2",
            scale: 0.3,
        },
        {
            type: "dialog",
            text: "「出ていけ！！」",
            actorName: "町の人",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "僕だって出ていけるもんなら出ていきたいよぉ",
                    typeText: "bokudattedeteikerumonnnaradeteikitaiyolo",
                    x: 400,
                    y: 300,
                    challengeTime: 7,
                    fontSize: 32,
                },
                {
                    displayText: "殴りかかってくる腕を掴む",
                    typeText: "nagurikakattekuruudewotukamu",
                    x: 400,
                    y: 300,
                    challengeTime: 5,
                    fontSize: 32,
                },
                {
                    displayText: "背負い投げ",
                    typeText: "seoinage",
                    x: 400,
                    y: 300,
                    challengeTime: 3,
                    fontSize: 32,
                },
                {
                    displayText: "その隙に逃げる",
                    typeText: "sonosukininigeru",
                    x: 400,
                    y: 300,
                    challengeTime: 4,
                    fontSize: 32,
                },
            ],
        },
        { type: "clearForeground" },
        { type: "timelineTransition", timelineID: "chapter2_scene2" },
    ],
    chapter2_scene2: [
        { type: "startAnimation", animationType: "blackIn" },
        { type: "setBackground", key: "town2" },
        // TODO 走る音
        {
            type: "dialog",
            text: "「はぁ……はぁ……気味が悪いな」",
            actorName: "主人公",
        },
        {
            type: "dialog",
            text: "「ずいぶん走ったけど、どこまで続くんだこの町」",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "とにかく進む",
                    typeText: "tonikakususumu",
                    x: 400,
                    y: 300,
                    challengeTime: 3,
                    fontSize: 32,
                },
            ],
        },
        { type: "startAnimation", animationType: "blackOut" },
        { type: "timelineTransition", timelineID: "chapter2_select1" },
    ],
    chapter2_select1: [
        { type: "setBackground", key: "town_select1" },
        {
            type: "dialog",
            text: "「おっと分かれ道だ」",
            actorName: "主人公",
        },
        {
            type: "choice",
            choices: [
                {
                    text: "左にいく",
                    timelineID: "chapter2_select2",
                },
                {
                    text: "右にいく",
                    timelineID: "chapter2_select3",
                },
            ],
        },
    ],
    chapter2_select2: [
        { type: "setBackground", key: "town_select2" },
        {
            type: "dialog",
            text: "「また分かれ道だ」",
            actorName: "主人公",
        },
        {
            type: "choice",
            choices: [
                {
                    text: "右にいく",
                    timelineID: "chapter2_select1",
                },
                {
                    text: "左にいく",
                    timelineID: "chapter2_select3",
                },
            ],
        },
    ],
    chapter2_select3: [
        { type: "setBackground", key: "town_select3" },
        {
            type: "dialog",
            text: "「またかよ、、」",
            actorName: "主人公",
        },
        {
            type: "choice",
            choices: [
                {
                    text: "左にいく",
                    timelineID: "chapter2_select4",
                },
                {
                    text: "右にいく",
                    timelineID: "chapter2_select1",
                },
            ],
        },
    ],
    chapter2_select4: [
        { type: "setBackground", key: "town_select4" },
        {
            type: "dialog",
            text: "「いつまで続くんだ」",
            actorName: "主人公",
        },
        {
            type: "choice",
            choices: [
                {
                    text: "右にいく",
                    timelineID: "chapter2_select2",
                },
                {
                    text: "左にいく",
                    timelineID: "chapter2_scene4",
                },
            ],
        },
    ],
    chapter2_scene4: [
        { type: "setBackground", key: "crook_load1" },
        {
            type: "dialog",
            text: "「やっと抜けた……！！……ってなんだこの道」",
            actorName: "主人公",
        },
        {
            type: "typingChallenge",
            typings: [
                {
                    displayText: "先に進む",
                    typeText: "先に進む",
                    x: 400,
                    y: 300,
                    challengeTime: 3,
                    fontSize: 32,
                },
            ],
        },
        { type: "startAnimation", animationType: "whiteOut" },
        { type: "completedChapter", completedChapterNum: 2 },
        { type: "sceneTransition", key: "ChapterSelectScene" },
    ],
};
