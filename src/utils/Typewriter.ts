export class Typewriter {
    private text?: string; // undefined を許容
    private index: number;
    private textObject: Phaser.GameObjects.Text;
    private timer: Phaser.Time.TimerEvent | null = null;

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
            wordWrap: { width: 300 },
        });
        this.index = 0;
    }

    public init(text: string) {
        this.text = text;
        this.index = 0;
        this.textObject.setText("");
    }

    public start(speed: number) {
        if (!this.text) return; // undefined の場合は処理しない

        if (this.timer) {
            this.timer.remove();
        }

        this.timer = this.textObject.scene.time.addEvent({
            delay: speed,
            loop: true,
            callback: () => {
                if (this.index < (this.text?.length ?? 0)) {
                    // 安全にアクセス
                    this.textObject.setText(
                        this.textObject.text + this.text![this.index]
                    );
                    this.index++;
                } else {
                    this.timer?.destroy();
                    this.timer = null;
                }
            },
        });
    }
}
