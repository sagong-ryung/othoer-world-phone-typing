import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" }); // シーン識別キー
    }

    create() {
        // タイトルテキスト
        this.add
            .text(300, 200, "異世界からの電話", {
                fontSize: "48px",
                color: "#FFF",
                fontFamily: "Arial",
            })
            .setOrigin(0.5);

        // 「始める」ボタン
        const startButton = this.add
            .text(400, 350, "始める", {
                fontSize: "32px",
                color: "#FFF",
                fontFamily: "Arial",
                backgroundColor: "#000",
                padding: { x: 20, y: 10 },
            })
            .setOrigin(0.5)
            .setInteractive();

        // ボタンをクリックした時のイベント
        startButton.on("pointerdown", () => {
            this.scene.start("StartChapter1");
        });
    }
}
