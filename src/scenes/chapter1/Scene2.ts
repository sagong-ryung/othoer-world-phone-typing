import Phaser from "phaser";
import { DialogueManager } from "../../utils/DialogueManager";

export default class Scene2 extends Phaser.Scene {
    private dialogueManager?: DialogueManager;

    constructor() {
        super({ key: "Chapter1Scene2" });
    }

    preload() {
        this.load.image("truck", "assets/images/chapter1/truck.jpg");
    }

    create() {
        // 背景画像
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "truck");

        // セリフ
        const dialogues: string[] = [
            "ブォォォォォン！！",
            "主人公: 「！？ えっ、うそっ！！」\n(ヘッドライトの光が視界を焼く。心臓が跳ね上がる。)",
            "主人公: (足がすくんで動けない。\nその瞬間――)"
        ];
        this.dialogueManager = new DialogueManager(this, dialogues)
        this.dialogueManager.showNextDialogue();
        
        this.input.keyboard?.on("keydown-SPACE", () => {
            if (this.dialogueManager?.getIsLastDialogue()) {
                // 最後のセリフ後にスペースを押すと次のシーンに進む
                this.scene.start("Chapter1Scene3"); // 次のシーンへ遷移
            } else {
                this.dialogueManager?.skipDialogue(); // まだセリフが表示中ならスキップ
            }
        });
    }
}
