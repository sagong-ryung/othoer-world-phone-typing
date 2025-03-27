import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";
import TypingChallenge from "../../utils/TypingChallenge";

export default class Scene11 extends Phaser.Scene {
    private dialogueManager?: DialogueManager;
    private typingChallenge1?: TypingChallenge;
    private typingChallenge2?: TypingChallenge;

    constructor() {
        super({ key: "Chapter1Scene11" });
    }

    preload() {
        // 背景画像とホタルの画像を読み込み
        this.load.image("phone", "assets/images/chapter1/phone.png");
    }

    create() {
        // 背景画像の位置を中央に設定
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "phone");

        const dialogues: string[] = [
            "主人公:「こんなところに公衆電話があるなんて……\n（自分の息遣いだけが響く）」",
            "その瞬間、「ちりりりーん！」",
            "主人公:「うわっ！」\n（思わず肩をビクッと震わせ、心臓が飛び跳ねる。。）",
            "辺りが静まり返っていて、余計にその音が響き渡る。",
            "どうしよう……取るべきか、、、？",
        ];
        this.dialogueManager = new DialogueManager(this, dialogues, 20);

        this.typingChallenge1 = new TypingChallenge(
            this,
            200,
            400,
            "受話器を取る",
            "juwakiwotoru",
            24,
            5
        );
        this.typingChallenge1.startTyping().then((success) => {
            if (success) {
                this.scene.start("Chapter1Scene10");
            } else {
                this.scene.start("GameOverScene");
            }
        });

        this.typingChallenge2 = new TypingChallenge(
            this,
            500,
            400,
            "受話器を取らない",
            "juwakiwotoranai",
            24,
            5
        );
        this.typingChallenge2.startTyping().then((success) => {
            if (success) {
                this.scene.start("Chapter1Scene10");
            } else {
                this.scene.start("GameOverScene");
            }
        });
    }
}
