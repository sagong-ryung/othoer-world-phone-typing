import Phaser from "phaser";
import PressSpaceText from "../components/PressSpaceText";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" }); // シーン識別キー
    }

    create() {
        // タイトルテキスト
        this.add
            .text(400, 250, "異世界からの電話", {
                fontSize: "48px",
                color: "#FFF",
                fontFamily: "Arial",
            })
            .setOrigin(0.5);

        new PressSpaceText(this, 400, 500);

        // ボタンをクリックした時のイベント
        // this.input?.keyboard?.on("keydown-SPACE", () => {
        //     this.scene.start("Chapter1Scene0");
        // });

        // テスト用
        this.input?.keyboard?.on("keydown-SPACE", () => {
            this.scene.start("Chapter1Scene6");
        });
    }
}
