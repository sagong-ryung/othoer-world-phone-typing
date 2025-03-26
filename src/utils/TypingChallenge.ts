import Phaser from "phaser";
import ProgressBar from "../components/ProgressBar";

export default class TypingChallenge {
    private scene: Phaser.Scene;
    private targetWord: string;
    private inputText: string = "";
    private progressBar!: ProgressBar;
    private timeLimit: number;
    private timeRemaining!: number;
    private timerEvent?: Phaser.Time.TimerEvent;
    private isComplete: boolean = false;
    private successState: boolean = false;
    private resolveChallenge?: (success: boolean) => void;

    constructor(scene: Phaser.Scene, targetWord: string, timeLimit: number) {
        this.scene = scene;
        this.targetWord = targetWord;
        this.timeLimit = timeLimit;
    }

    public startTyping(): Promise<boolean> {
        return new Promise((resolve) => {
            this.isComplete = false;
            this.successState = false;
            this.timeRemaining = this.timeLimit;
            this.resolveChallenge = resolve;

            // プログレスバーの作成
            this.progressBar = new ProgressBar(this.scene, 100, 50, 300, 20);
            this.progressBar.updateProgress(1);

            // タイマー開始
            this.startTimer();

            // 入力監視
            this.scene.input.keyboard?.on("keydown", this.handleKeyInput, this);
        });
    }

    private startTimer() {
        this.timerEvent = this.scene.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.timeRemaining -= 0.1;
                this.progressBar.updateProgress(this.timeRemaining / this.timeLimit);

                if (this.timeRemaining <= 0) {
                    this.endChallenge(false);
                }
            }
        });
    }

    private handleKeyInput(event: KeyboardEvent) {
        if (this.isComplete) return;

        if (event.key.length === 1) {
            this.inputText += event.key;
        } else if (event.key === "Backspace") {
            this.inputText = this.inputText.slice(0, -1);
        }

        if (this.inputText === this.targetWord) {
            this.endChallenge(true);
        }
    }

    private endChallenge(success: boolean) {
        if (this.isComplete) return;

        this.isComplete = true;
        this.successState = success;
        this.timerEvent?.destroy();
        this.progressBar.destroy();
        this.scene.input.keyboard?.off("keydown", this.handleKeyInput, this);

        if (this.resolveChallenge) {
            this.resolveChallenge(success);
        }
    }
}
