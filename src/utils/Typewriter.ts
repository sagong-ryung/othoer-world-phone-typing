export default class Typewriter {
    private text?: string;
    private index: number;
    private textObject: Phaser.GameObjects.Text;
    private timer: Phaser.Time.TimerEvent | null = null;
    private isTypingFlag: boolean = false; // 文字表示中かどうかのフラグ

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        fontFamily: string,
        fontSize: string
    ) {
        this.textObject = scene.add.text(x, y, "", {
            fontFamily: fontFamily,
            fontSize: fontSize,
            wordWrap: { width: 700 },
        });
        this.index = 0;
    }

    public init(text: string) {
        this.text = text;
        this.index = 0;
        this.textObject.setText("");
    }

    public start(speed: number) {
        if (!this.text) return;
        this.isTypingFlag = true; // タイピング開始

        if (this.timer) {
            this.timer.remove();
        }

        this.timer = this.textObject.scene.time.addEvent({
            delay: speed,
            loop: true,
            callback: () => {
                if (this.index < this.text!.length) {
                    this.textObject.setText(
                        this.textObject.text + this.text![this.index]
                    );
                    this.index++;
                } else {
                    this.timer?.destroy();
                    this.timer = null;
                    this.isTypingFlag = false; // タイピング完了
                }
            },
        });
    }

    // 現在タイピング中かどうかを判定
    public isTyping(): boolean {
        return this.isTypingFlag;
    }

    // タイピングをスキップして全文を即表示
    public skip() {
        this.isTypingFlag = false; // タイピング完了
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }
        if (this.text) {
            this.textObject.setText(this.text); // 全文表示
        }
    }
}
