import { Typewriter } from "./Typewriter"; // Typewriter クラスのインポート

export class DialogueManager {
    private typewriter: Typewriter;
    private dialogues: string[];
    private dialogueIndex: number = 0;
    private typingSpeed: number;
    private waitTime: number;
    private scene: Phaser.Scene;
    private isLastDialogue: boolean = false; // 最後のセリフかどうかのフラグ

    constructor(
        scene: Phaser.Scene,
        dialogues: string[],
        typingSpeed: number = 50,  // デフォルトのタイプ速度
        waitTime: number = 1500   // セリフの後の待機時間
    ) {
        this.scene = scene;
        this.dialogues = dialogues;
        this.typingSpeed = typingSpeed;
        this.waitTime = waitTime;
        this.typewriter = new Typewriter(scene, 50, 100, "Arial", "24px");
    }

    // セリフを次々に表示する関数
    public showNextDialogue() {
        if (this.dialogueIndex >= this.dialogues.length) {
            this.isLastDialogue = true; // 最後のセリフが表示された
            return; // 親ファイルにシーン遷移を任せる
        }

        const currentText = this.dialogues[this.dialogueIndex];
        this.typewriter.init(currentText);
        this.typewriter.start(this.typingSpeed);

        // セリフが終わったら一定時間待って次のセリフへ
        const totalDelay = currentText.length * this.typingSpeed + this.waitTime;
        this.scene.time.delayedCall(totalDelay, () => {
            this.dialogueIndex++;
            this.showNextDialogue();
        });
    }

    // スペースキーでスキップ
    public skipDialogue() {
        this.dialogueIndex++
        this.showNextDialogue(); // 次のセリフへ進む
    }

    // 最後のセリフが表示されているかを確認
    public getIsLastDialogue(): boolean {
        return this.isLastDialogue;
    }
}
