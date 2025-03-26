import Phaser from "phaser";

export default class Scene4 extends Phaser.Scene {

    constructor() {
        super({ key: "Chapter1Scene4" });
    }

    preload() {
        this.load.image("truck", "assets/images/chapter1/truck.jpg");
    }

    create() {
        // 背景画像
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "truck");

        this.add
            .text(200, 300, "テスト成功", {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置
    }
}
