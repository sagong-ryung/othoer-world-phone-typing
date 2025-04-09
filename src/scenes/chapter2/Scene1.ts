import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: "Chapter2Scene1" });
    }

    preload() {
        this.load.image("background", "assets/images/chapter1/background.jpg");
    }

    create() {
        // 背景画像
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "background");

        // セリフ
        const dialogues: string[] = [
            "主人公: 「やっとおつかい終わったな、\n早く帰らないとお母さんが心配する。」",
            "主人公: 「あれ、何か忘れてる気がする。。。\nやべっ、ほうれん草買い忘れてる！急いで戻らなきゃ」",
            "スーパーに急いで戻る",
        ];
        const dialogueManager = new DialogueManager(this, dialogues);

        this.input.keyboard?.on("keydown-SPACE", () => {
            if (dialogueManager?.getIsLastDialogue()) {
                // 最後のセリフ後にスペースを押すと次のシーンに進む
                this.scene.start("Chapter2Scene2"); // 次のシーンへ遷移
            } else {
                dialogueManager?.skipDialogue(); // まだセリフが表示中ならスキップ
            }
        });
    }
}
