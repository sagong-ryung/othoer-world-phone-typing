import Phaser from "phaser";
import { Scene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-app",
    scene: Scene,
};

new Phaser.Game(config);
