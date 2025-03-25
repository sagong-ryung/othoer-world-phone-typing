import Phaser from "phaser";
import { Typewriter } from "../../utils/Typewriter";

export default class Chapter1Scene1 extends Phaser.Scene {
    private typewriter?: Typewriter;
    private nextButton?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "Chapter1Scene1" });
    }

    preload() {
        this.load.image("background", "assets/images/road_background.jpg");
    }

    create() {
        // 固定値の定義
        const BG_X = 400;
        const BG_Y = 300;

        const TEXT_X = 50;
        const TEXT_Y = 100;
        // const TEXT_WIDTH = 700;
        const FONT_FAMILY = "Arial";
        const FONT_SIZE = "24px";
        // const TEXT_COLOR = "#fff";

        const BUTTON_X = 400;
        const BUTTON_Y = 500;
        const BUTTON_FONT_SIZE = "32px";
        const BUTTON_BG_COLOR = "#000";

        // 背景画像
        this.add.image(BG_X, BG_Y, "background");

        // セリフのテキストオブジェクト
        // const textObject = this.add.text(TEXT_X, TEXT_Y, "", {
        //     fontSize: FONT_SIZE,
        //     color: TEXT_COLOR,
        //     fontFamily: FONT_FAMILY,
        //     wordWrap: { width: TEXT_WIDTH },
        // });

        // Typewriterのインスタンスを作成
        const dialogue =
            "主人公: 「やっとおつかい終わったな、\n早く帰らないとお母さんが心配する。」";
        this.typewriter = new Typewriter(
            this,
            TEXT_X,
            TEXT_Y,
            FONT_FAMILY,
            FONT_SIZE
        );
        this.typewriter.init(dialogue);

        // 進むボタンの作成（初めは非表示）
        this.nextButton = this.add
            .text(BUTTON_X, BUTTON_Y, "次へ", {
                fontSize: BUTTON_FONT_SIZE,
                color: "#fff",
                fontFamily: FONT_FAMILY,
                backgroundColor: BUTTON_BG_COLOR,
                padding: { x: 20, y: 10 },
            })
            .setOrigin(0.5)
            .setInteractive()
            .setVisible(false);

        // タイピング開始
        const typingSpeed = 50; // 文字表示の間隔 (ms)
        this.typewriter.start(typingSpeed);

        // Typewriterがnullでないことを確認してボタンを表示
        const textLength = this.typewriter ? dialogue.length : 0;
        this.time.delayedCall(textLength * typingSpeed, () => {
            this.nextButton?.setVisible(true);
        });

        // ボタンが押されたら次のシーンへ
        this.nextButton.on("pointerdown", () => {
            this.scene.start("Chapter1Scene2");
        });
    }
}
