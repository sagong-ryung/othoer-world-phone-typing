import { Choice } from "./Choice";
import { Typing } from "./Typing";

// ダイアログ表示イベント
type DialogEvent = {
    type: "dialog";
    text: string;
    actorName?: string;
};

// 背景設定イベント
type SetBackgroundEvent = {
    type: "setBackground";
    // x: number;
    // y: number;
    key: string;
};

// 共通のプロパティを定義
export type ForegroundProps = {
    x: number;
    y: number;
    key: string;
    scale?: number;
};

// それを使ってイベント型を定義
export type AddForegroundEvent = {
    type: "addForeground";
} & ForegroundProps;

// 前景クリアイベント
type ClearForegroundEvent = {
    type: "clearForeground";
};

type startAnimation = {
    type: "startAnimation";
    animationType: string;
};

type stopAnimation = {
    type: "stopAnimation";
    animationType: string;
};

// タイムライン遷移イベント
type TimelineTransitionEvent = {
    type: "timelineTransition";
    timelineID: string;
};

// シーン遷移イベント
type SceneTransitionEvent = {
    type: "sceneTransition";
    key: string;
    data?: object;
};

// 選択肢イベント
type ChoiceEvent = {
    type: "choice";
    choices: Choice[];
};

type TypingchallengeEvent = {
    type: "typingChallenge";
    typings: Typing[];
};

type CompletedChapterEvent = {
    type: "completedChapter";
    completedChapterNum: number;
};

// Timelineはイベントの配列
export type Timeline = (
    | DialogEvent
    | SetBackgroundEvent
    | AddForegroundEvent
    | ClearForegroundEvent
    | startAnimation
    | stopAnimation
    | TimelineTransitionEvent
    | SceneTransitionEvent
    | ChoiceEvent
    | TypingchallengeEvent
    | CompletedChapterEvent
)[];
