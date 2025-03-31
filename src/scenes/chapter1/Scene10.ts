import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";

export default class Scene10 extends Phaser.Scene {
    constructor() {
        super({ key: "Chapter1Scene10" });
    }

    preload() {
        // 背景画像とホタルの画像を読み込み
        this.load.image(
            "forest_phone",
            "assets/images/chapter1/forest_phone.jpg"
        );
    }

    create() {
        // 背景画像の位置を中央に設定
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "forest_phone");

        const dialogues: string[] = [
            "主人公:「ふぅ…びっくりした……」",
            "主人公:「あれ！？右側になんかあるぞ…！？」",
        ];
        const dialogueManager = new DialogueManager(this, dialogues, 20);
        this.input.keyboard?.on("keydown-SPACE", () => {
            if (dialogueManager?.getIsLastDialogue()) {
                this.scene.start("Chapter1Scene11");
            } else {
                dialogueManager?.skipDialogue();
            }
        });
    }
}
