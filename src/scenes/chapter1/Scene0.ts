import Phaser from "phaser";
import PressSpaceText from "../../components/PressSpaceText";

export default class Scene0 extends Phaser.Scene {
    constructor() {
        super({ key: "Chapter1Scene0" });
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
            .text(initial_X, initial_Y + 100, "- 帰り道 -", {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置

        new PressSpaceText(this, 400, 500);

        // SPACEキーを押すイベントを設定
        this.input?.keyboard?.on("keydown-SPACE", () => {
            this.scene.start("Chapter1Scene1", { timelineID: "start" }); // 次のシーンに進む
        });
    }
}
