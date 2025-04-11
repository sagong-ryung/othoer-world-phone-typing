import { Timelines } from "../type/Timelines";

export const chapter2Data: Timelines = {
    chapter2_scene1: [
        { type: "setBackground", key: "turn_home" },
        {
            type: "dialog",
            text: "「これはにしょうだ。」",
            actorName: "主人公",
        },
        { type: "dialog", text: "ああああああ" },
        // {
        //     type: "typingChallenge",
        //     typings: [
        //         {
        //             displayText: "スーパーに急いで戻る",
        //             typeText: "su-pa-niisoidemodoru",
        //             x: 400,
        //             y: 300,
        //             challengeTime: 5,
        //             fontSize: 32,
        //         },
        //     ],
        // },
        { type: "timelineTransition", timelineID: "chapter1_scene1_2" },
    ],
};
