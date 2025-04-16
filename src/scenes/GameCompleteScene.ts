import Phaser from "phaser";

export default class GameCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameCompleteScene" });
    }

    create() {
        const { width, height } = this.scale;

        // 背景
        this.add.rectangle(0, 0, width * 2, height * 2, 0x000000).setOrigin(0);

        // ゲームクリアメッセージ
        this.add
            .text(width / 2, 80, "🎉 Congratulations! 🎉", {
                fontSize: "48px",
                color: "#ffffff",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        // エンドロールテキストを作成
        const creditsText = [
            "Game Complete",
            "",
            "Developed by: Your Name",
            "Design: Your Design Team",
            "Programming: Your Dev Team",
            "Music: Royalty Free BGM",
            "Special Thanks: Phaser Community",
            "",
            "Thank you for playing!",
        ];

        const credits = this.add.text(width / 2, height, creditsText.join("\n"), {
            fontSize: "24px",
            color: "#ffffff",
            align: "center",
        });
        credits.setOrigin(0.5, 0);

        // スクロール速度
        const scrollSpeed = 0.5;

        this.tweens.add({
            targets: credits,
            y: -credits.height,
            duration: (height + credits.height) / scrollSpeed,
            ease: "Linear",
        });

        // タイトルに戻るボタン（下部に表示）
        const returnText = this.add
            .text(width / 2, height - 50, "Back to Title", {
                fontSize: "24px",
                color: "#ffffff",
                backgroundColor: "#333",
                padding: { x: 10, y: 5 },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        returnText.on("pointerdown", () => {
            this.scene.start("StartScene");
        });
    }
}
