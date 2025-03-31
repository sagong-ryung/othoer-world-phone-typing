import Phaser from "phaser";
import TypingChallenge from "../../utils/TypingChallenge";

export default class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: "Chapter1Scene3" });
    }

    preload() {
        this.load.image("truck", "assets/images/chapter1/truck.jpg");
    }

    create() {
        // 背景画像
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "truck");

        const challengeTime = 5;
        const typingChallenge = new TypingChallenge(
            this,
            BG_X,
            400,
            "立ち上がる",
            "tachiagaru",
            32,
            challengeTime
        );
        typingChallenge.startTyping().then((success) => {
            if (success) {
                this.scene.start("Chapter1Scene4");
            } else {
                this.scene.start("GameOverScene");
            }
        });
    }
}
