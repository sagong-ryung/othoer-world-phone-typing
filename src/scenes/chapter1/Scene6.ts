import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";

export default class Scene6 extends Phaser.Scene {
    private dialogueManager?: DialogueManager;

    constructor() {
        super({ key: "Chapter1Scene6" });
    }

    preload() {
        // 背景画像を読み込み
        this.load.image("forest", "assets/images/chapter1/forest.png");
    }

    create() {
        // 背景画像の位置を中央に設定
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        const bgImage = this.add.image(BG_X, BG_Y, "forest");

        this.blackIn();

        // ダイアログの内容
        const dialogues: string[] = [
            "主人公:「うっ、い、痛くな…い…？どうして生きてるんだ…？」",
            "(目を開けると、周りはうす暗い森。静寂が支配している)",
            "主人公: 「ここは……どこだ？ 夢……？\nそれとももう死んでるとか…うす暗くて、気味悪いな……」\n(周囲の静けさが不気味で、心臓の鼓動が耳に響く)",
            "主人公: 「誰か…誰かいるのか？ こんなところで一人なんて、、」",
        ];
        this.dialogueManager = new DialogueManager(this, dialogues, 20);

        // ズームアニメーションを追加
        this.tweens.add({
            targets: bgImage,
            scaleX: 1.02,
            scaleY: 1.02,
            duration: 500,
            ease: "Power2",
            yoyo: true,
            repeat: -1,
        });

        this.input.keyboard?.on("keydown-SPACE", () => {
            if (this.dialogueManager?.getIsLastDialogue()) {
                this.scene.start("Chapter1Scene7");
            } else {
                this.dialogueManager?.skipDialogue();
            }
        });
    }

    // 黒いオーバーレイを使ってフェードイン効果を実現
    blackIn() {
        // 画面全体を覆う黒い矩形を作成
        const blackOverlay = this.add.graphics();
        blackOverlay.fillStyle(0x000000, 1); // 黒色で塗りつぶし
        blackOverlay.fillRect(0, 0, this.scale.width, this.scale.height);

        // 黒いオーバーレイをフェードインさせるアニメーション
        this.tweens.add({
            targets: blackOverlay,
            alpha: 0, // 透明にフェードアウト
            duration: 4000, // フェードインの時間
            ease: "Power2",
            onComplete: () => {
                // フェードインが完了した後、オーバーレイを削除
                blackOverlay.destroy();
            },
        });
    }
}
