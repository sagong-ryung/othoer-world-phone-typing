import Phaser from "phaser";
import StartScene from "./scenes/StartScene";
import GameOverScene from "./scenes/GameOverScene";
import * as Chapter1 from "./scenes/chapter1";
import * as Chapter2 from "./scenes/chapter2";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        StartScene, GameOverScene,
        ...Object.values(Chapter1),
        ...Object.values(Chapter2)

    ],
};

new Phaser.Game(config);
