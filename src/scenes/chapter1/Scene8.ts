import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";

export default class Scene8 extends Phaser.Scene {
    private dialogueManager?: DialogueManager;

    constructor() {
        super({ key: "Chapter1Scene8" });
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

        const dialogues: string[] = [
            "主人公:「ふぅ…落ち着いた。」",
            "主人公:「ええい！考えても無駄だ！とにかく進んでみよう」",
        ];
        this.dialogueManager = new DialogueManager(this, dialogues, 20);

        this.input.keyboard?.on("keydown-SPACE", () => {
            if (this.dialogueManager?.getIsLastDialogue()) {
                this.scene.start("Chapter1Scene9");
            } else {
                this.dialogueManager?.skipDialogue();
            }
        });
    }
}
