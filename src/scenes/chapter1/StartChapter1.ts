import Phaser from "phaser";

export default class StartChapter1 extends Phaser.Scene {
    constructor() {
        super({ key: "StartChapter1" });
    }

    create() {
        const initial_X: number = 400;
        const initial_Y = 200;

        // 小タイトル「邂逅」を中央に表示
        this.add
            .text(initial_X, initial_Y, "第一章", {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置

        this.add
            .text(initial_X, initial_Y + 100, "- 邂逅 -", {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置

        // 「Press SPACE」をその下に表示
        this.add
            .text(initial_X, initial_Y + 250, "Press SPACE", {
                fontSize: "24px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置

        // SPACEキーを押すイベントを設定
        this.input?.keyboard?.on("keydown-SPACE", () => {
            this.scene.start("Chapter1Scene1"); // 次のシーンに進む
        });
    }
}
