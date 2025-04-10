import LoadingScene from "./LoadingScene";
import ChapterSelectScene from "./ChapterSelectScene";
import StartScene from "./StartScene";
import GameOverScene from "./GameOverScene";
import * as Chapter1 from "./chapter1";
import * as Chapter2 from "./chapter2";

export const Scene = [
    LoadingScene,
    StartScene,
    ChapterSelectScene,
    GameOverScene,
    ...Object.values(Chapter1),
    ...Object.values(Chapter2),
];
