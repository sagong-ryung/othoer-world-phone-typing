import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";

export default class Scene5 extends Phaser.Scene {
    private dialogueManager?: DialogueManager;

    constructor() {
        super({ key: "Chapter1Scene5" });
    }

    preload() {
        this.load.image("truck", "assets/images/chapter1/truck.jpg");
    }

    create() {
        // 背景画像
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        const bgImage = this.add.image(BG_X, BG_Y, "truck");

        const dialogues: string[] = [
            "「やばい、間に合わない…！\n死ぬのか…！？ こんなとこで！」",
        ];
        this.dialogueManager = new DialogueManager(this, dialogues, 20);

        // ズームアニメーションを追加
        this.tweens.add({
            targets: bgImage,
            scaleX: 2, // 2倍にズーム
            scaleY: 2, // 2倍にズーム
            duration: 1000, // ズーム時間（ミリ秒）
            ease: "Power2", // イージング関数
            onComplete: () => {
                // ズームが終わったら白いフラッシュアウトを開始
                this.flashOut();
            },
        });

        this.input.keyboard?.on("keydown-SPACE", () => {
            if (this.dialogueManager?.getIsLastDialogue()) {
                // 最後のセリフ後にスペースを押すと次のシーンに進む
                this.scene.start("Chapter1Scene6"); // 次のシーンへ遷移
            } else {
                this.dialogueManager?.skipDialogue(); // まだセリフが表示中ならスキップ
            }
        });
    }

    flashOut() {
        // 白い矩形を画面全体に追加（フラッシュ効果）
        const flash = this.add.graphics();
        flash.fillStyle(0xffffff, 1); // 白色で塗りつぶす
        flash.fillRect(0, 0, this.scale.width, this.scale.height);

        // フラッシュがそのまま続くようにアニメーションで透明度を設定
        this.tweens.add({
            targets: flash,
            alpha: 1, // 光ったままにする
            duration: 1000, // フラッシュの保持時間
        });
    }
}
