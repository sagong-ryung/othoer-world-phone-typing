import Phaser from "phaser";

export default class PressSpaceText extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "press space", {
            fontSize: "24px",
            fontFamily: "Arial",
            color: "#ffffff", // 白色
        });

        this.setOrigin(0.5); // 中央配置
        scene.add.existing(this); // シーンに追加
    }
}
