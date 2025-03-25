import Phaser from "phaser";
import StartScene from "./scenes/StartScene";
import StartChapter1 from "./scenes/chapter1/StartChapter1";
import Chapter1Scene1 from "./scenes/chapter1/Scene1";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [StartScene, StartChapter1, Chapter1Scene1],
};

new Phaser.Game(config);
