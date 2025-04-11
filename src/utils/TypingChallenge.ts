import Phaser from "phaser";
import ProgressBar from "../components/ProgressBar";
import { Typing } from "../type/Typing";

export class TypingChallenge {
    private scene: Phaser.Scene;
    private x: number;
    private y: number;
    private displayTargetWord: string;
    private romajiWord: string;
    private fontSize: number = 32;
    private inputText: string = "";
    private stroke!: Phaser.GameObjects.Graphics;
    private progressBar!: ProgressBar;
    private timeLimit: number;
    private timeRemaining!: number;
    private timerEvent?: Phaser.Time.TimerEvent;
    private isComplete: boolean = false;
    private successState: boolean = false;
    private resolveChallenge?: (success: boolean) => void;
    private targetTextObject!: Phaser.GameObjects.Text;
    private romajiTextObjects: Phaser.GameObjects.Text[] = [];
    private isFocus: boolean = false;

    constructor(scene: Phaser.Scene, typingData: Typing) {
        this.scene = scene;
        this.x = typingData.x;
        this.y = typingData.y;
        this.displayTargetWord = typingData.displayText;
        this.fontSize = typingData.fontSize;
        this.romajiWord = typingData.typeText;
        this.timeLimit = typingData.challengeTime;
    }

    public startTyping(): Promise<boolean> {
        return new Promise((resolve) => {
            this.isComplete = false;
            this.successState = false;
            this.timeRemaining = this.timeLimit;
            this.resolveChallenge = resolve;

            // プログレスバーの作成
            this.progressBar = new ProgressBar(
                this.scene,
                this.x - 100,
                this.y - 60,
                300,
                20
            );
            this.progressBar.updateProgress(1);

            // ターゲット単語のテキスト表示
            this.targetTextObject = this.scene.add
                .text(this.x, this.y, this.displayTargetWord, {
                    fontSize: this.fontSize + "px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                })
                .setOrigin(0.5)
                .setDepth(1);

            // ローマ字単語のテキスト表示
            const totalRomajiWidth =
                this.romajiWord.length * (this.fontSize / 2); // ローマ字テキストの幅の合計
            const romajiStartX = this.x - totalRomajiWidth / 2; // 中央に揃えるためのX座標
            this.romajiTextObjects = this.createTextObjects(
                this.romajiWord,
                romajiStartX,
                this.y + 50,
                "#ffffff"
            );

            // ターゲット単語とローマ字単語のテキストの結合された境界を取得
            const targetTextBounds = this.targetTextObject.getBounds();
            // 例: romajiTextObjectsの幅を取得する

            let totalWidth = 0;
            this.romajiTextObjects.forEach((textObject) => {
                const bounds = textObject.getBounds();
                totalWidth += bounds.width; // 各テキストオブジェクトの幅を加算
            });
            const romajiTextBounds = this.romajiTextObjects[0].getBounds(); // ローマ字テキストの最初のオブジェクトの境界を取得
            const minX = Math.min(targetTextBounds.x, romajiTextBounds.x); // 両方のテキストで最小の幅を選択
            const minY = Math.min(targetTextBounds.y, romajiTextBounds.y); // 両方のテキストで最小の高さを選択

            // 両方のテキストの高さを合計
            const totalHeight =
                romajiTextBounds.y +
                romajiTextBounds.height -
                targetTextBounds.y;
            const maxWidth = Math.max(targetTextBounds.width, totalWidth); // 両方のテキストで最大の幅を選択

            // ターゲット単語とローマ字単語の両方を囲む枠を作成
            this.stroke = this.scene.add
                .graphics()
                .lineStyle(2, 0x808080) // グレーの枠線
                .fillStyle(0x000000)
                .fillRoundedRect(
                    minX - 20,
                    minY - 15,
                    maxWidth + 45,
                    totalHeight + 30,
                    5
                ) // 角を丸くした背景
                .strokeRoundedRect(
                    minX - 20,
                    minY - 15,
                    maxWidth + 45,
                    totalHeight + 30,
                    5
                ) // 角を丸くした枠線
                .setDepth(0);

            // タイマー開始
            this.startTimer();

            // 入力監視
            this.scene.input.keyboard?.on("keydown", this.handleKeyInput, this);
        });
    }

    private createTextObjects(
        word: string,
        x: number,
        y: number,
        color: string
    ): Phaser.GameObjects.Text[] {
        let textObjects: Phaser.GameObjects.Text[] = [];
        for (let i = 0; i < word.length; i++) {
            const textObject = this.scene.add
                .text(x + i * (this.fontSize / 2), y, word[i], {
                    fontSize: this.fontSize + "px",
                    fontFamily: "Arial",
                    color: color,
                })
                .setOrigin(0.5)
                .setDepth(1);
            textObjects.push(textObject);
        }
        return textObjects;
    }

    private startTimer() {
        this.timerEvent = this.scene.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.timeRemaining -= 0.1;
                this.progressBar.updateProgress(
                    this.timeRemaining / this.timeLimit
                );

                if (this.timeRemaining <= 0) {
                    this.endChallenge(false);
                }
            },
        });
    }

    private handleKeyInput(event: KeyboardEvent) {
        if (this.isComplete) return;

        if (event.key === "Backspace") {
            this.inputText = this.inputText.slice(0, -1);
            this.updateRomajiText();
            return;
        }

        // 期待する次の文字を取得
        const nextExpectedChar = this.romajiWord[this.inputText.length];

        // 入力が次の期待文字と一致しなければ無視
        if (event.key !== nextExpectedChar) return;

        if (event.key.length === 1) {
            this.inputText += event.key;
        }

        // ローマ字の色を更新
        this.updateRomajiText();

        if (this.inputText === this.romajiWord) {
            this.endChallenge(true);
        }
    }

    private updateRomajiText() {
        for (let i = 0; i < this.romajiWord.length; i++) {
            let color = "#ffffff"; // デフォルトは白

            if (
                i < this.inputText.length &&
                this.romajiWord[i] === this.inputText[i]
            ) {
                color = "#808080"; // 正しい入力なら灰色
            }

            // ローマ字の文字の色を更新
            this.romajiTextObjects[i].setColor(color);
        }
    }

    private endChallenge(success: boolean) {
        if (this.isComplete) return;

        this.isComplete = true;
        this.successState = success;
        this.timerEvent?.destroy();
        this.progressBar.destroy();

        // テキストオブジェクトを破棄
        this.targetTextObject.destroy();
        this.romajiTextObjects.forEach((textObject) => textObject.destroy());
        this.stroke.destroy();

        this.scene.input.keyboard?.off("keydown", this.handleKeyInput, this);

        if (this.resolveChallenge) {
            this.resolveChallenge(success);
        }
    }
}
