import Phaser from "phaser";
import PressSpaceText from "../components/PressSpaceText";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" }); // シーン識別キー
    }

    create() {
        // 画面中央の座標
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // 背景を黒に
        this.cameras.main.setBackgroundColor("#000");

        // game overテキスト
        this.add
            .text(centerX, centerY - 50, "GAME OVER", {
                fontSize: "64px",
                color: "#FF0000", // 赤色
                fontFamily: "Arial",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        this.add
            .text(centerX, centerY + 200, "スペースでスタート画面に戻る", {
                fontSize: "24px",
                color: "#FFFFFF",
                fontFamily: "Arial",
            })
            .setOrigin(0.5);


        // SPACEキーを押したらタイトル画面へ
        this.input.keyboard?.on("keydown-SPACE", () => {
            this.scene.start("StartScene");
        });
    }
}
