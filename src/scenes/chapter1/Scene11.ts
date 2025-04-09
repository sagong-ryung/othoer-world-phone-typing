import Phaser from "phaser";
import DialogueManager from "../../utils/DialogueManager";
import TypingChallenge from "../../utils/TypingChallenge";

export default class Scene11 extends Phaser.Scene {
    constructor() {
        super({ key: "Chapter1Scene11" });
    }

    preload() {
        this.load.image("phone", "assets/images/chapter1/phone.png");
        this.load.image("call_phone", "assets/images/chapter1/call_phone.png");
    }

    create() {
        // 背景画像の位置を中央に設定
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        const background  = this.add.image(BG_X, BG_Y, "phone");

        const dialogues: string[] = [
            "主人公:「こんなところに公衆電話があるなんて……\n（自分の息遣いだけが響く）」",
            "その瞬間、「ちりりりーん！」",
            "主人公:「うわっ！」\n（思わず肩をビクッと震わせ、心臓が飛び跳ねる。。）",
            "辺りが静まり返っていて、余計にその音が響き渡る。",
            "（どうしよう……取るべきか、、、？）",
        ];
        const dialogueManager = new DialogueManager(this, dialogues, 20);

        // ダイアログが進むたびに画像を変更
        dialogueManager.onDialogueChange = (index: number) => {
            if (index === 1) {
                const callPhoneImage = background?.setTexture("call_phone"); // 画像を変更

                // 震えるエフェクト (回転 + 微振動)
                this.tweens.add({
                    targets: callPhoneImage,
                    angle: { from: -2, to: 2 }, // -2度から2度に揺れる
                    yoyo: true, // 元に戻る
                    repeat: 4,
                    duration: 100, // 100msごとに振動
                    ease: "Sine.easeInOut",
                });
            } else if (index === 4) {
                const typingChallenge1 = new TypingChallenge(
                    this,
                    200,
                    400,
                    "受話器を取る",
                    "juwakiwotoru",
                    24,
                    5
                );
                typingChallenge1.startTyping().then((success) => {
                    if (success) {
                        this.scene.start("Chapter1Scene12");
                    } else {
                        this.scene.start("GameOverScene");
                    }
                });

                const typingChallenge2 = new TypingChallenge(
                    this,
                    500,
                    400,
                    "受話器を取らない",
                    "juwakiwotoranai",
                    24,
                    5
                );
                typingChallenge2.startTyping().then((success) => {
                    if (success) {
                        this.scene.start("Chapter1Scene9");
                    } else {
                        this.scene.start("GameOverScene");
                    }
                });

            }
        };

        this.input.keyboard?.on("keydown-SPACE", () => {
            if (dialogueManager?.getIsLastDialogue()) {
                this.scene.start("Chapter1Scene12");
            } else {
                dialogueManager?.skipDialogue();
            }
        });
    }
}
