import Phaser from "phaser";
import TypingChallenge from "../../utils/TypingChallenge";

export default class Scene7 extends Phaser.Scene {
    private typingChallenge?: TypingChallenge;

    constructor() {
        super({ key: "Chapter1Scene7" });
    }

    preload() {
        // 背景画像を読み込み
        this.load.image("forest", "assets/images/chapter1/forest.png");
    }

    create() {
        // 背景画像の位置を中央に設定
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        const bgImage = this.add.image(BG_X, BG_Y, "forest");

        // ズームアニメーションを追加
        this.tweens.add({
            targets: bgImage,
            scaleX: 1.02,
            scaleY: 1.02,
            duration: 500,
            ease: "Power2",
            yoyo: true,
            repeat: -1,
        });

        this.typingChallenge = new TypingChallenge(
            this,
            BG_X,
            400,
            "深呼吸をする",
            "shinkokyuuwosuru",
            32,
            4
        );
        this.typingChallenge.startTyping().then((success) => {
            if (success) {
                this.scene.start("Chapter1Scene8");
            } else {
                this.scene.start("GameOverScene");
            }
        });
    }
}
