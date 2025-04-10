import { Timeline } from "../type/Timeline";
import { Choice } from "../type/Choice";
import { DialogBox } from "./DialogBox";
import { TypingChallenge } from "./TypingChallenge";

export class TimelinePlayer {
    private backgroundLayer: Phaser.GameObjects.Container;
    private foregroundLayer: Phaser.GameObjects.Container;
    private uiLayer: Phaser.GameObjects.Container;

    private timeline?: Timeline;
    private timelineIndex = 0;
    // タイピングチャレンジ中かを示すフラグ
    private typingChallengeActive: boolean = false;

    constructor(
        private scene: Phaser.Scene,
        private dialogBox: DialogBox,
        private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {}
    ) {
        // 背景レイヤー・前景レイヤー・UIレイヤーをコンテナを使って表現
        this.backgroundLayer = this.scene.add.container(0, 0);
        this.foregroundLayer = this.scene.add.container(0, 0);
        this.scene.add.existing(this.dialogBox); // ダイアログボックスは前景レイヤーとUIレイヤーの間に配置
        this.uiLayer = this.scene.add.container(0, 0);

        // スペースキーで next() を実行（ただし、タイピングチャレンジ中は無視）
        this.scene.input.keyboard?.on("keydown-SPACE", () => {
            if (!this.typingChallengeActive) {
                this.next();
            }
        });
    }

    // タイムラインの再生を開始
    public start(timeline: Timeline) {
        this.timeline = timeline;
        this.next();
    }

    // 背景画像をセット
    private setBackground(x: number, y: number, texture: string) {
        this.backgroundLayer.removeAll();
        const backgroundImage = new Phaser.GameObjects.Image(
            this.scene,
            x,
            y,
            texture
        ).setDepth(-1);
        this.backgroundLayer.add(backgroundImage);
    }

    // 前景画像を追加
    private addForeground(x: number, y: number, texture: string) {
        const foregroundImage = new Phaser.GameObjects.Image(
            this.scene,
            x,
            y,
            texture
        );
        this.foregroundLayer.add(foregroundImage);
    }

    // 前景をクリア
    private clearForeground() {
        this.foregroundLayer.removeAll();
    }

    // TODO 選択肢ボタンをセット  クリックじゃなく矢印で決めるようにしたい
    private setChoiceButtons(choices: Choice[]) {
        if (choices.length === 0) {
            return;
        }

        const buttonHeight = 40,
            buttonMargin = 40;
        const { width, height } = this.scene.game.canvas;
        const buttonGroupHeight =
            buttonHeight * choices.length + buttonMargin * (choices.length - 1);
        const buttonGroupOriginY = height / 2 - buttonGroupHeight / 2;

        const buttons: Phaser.GameObjects.Rectangle[] = [];
        const buttonTexts: Phaser.GameObjects.Text[] = [];

        let selectedIndex = 0;

        const updateSelection = () => {
            buttons.forEach((button, index) => {
                if (index === selectedIndex) {
                    button.setFillStyle(0x555555); // 選択中の色
                } else {
                    button.setFillStyle(0x000000); // 通常の色
                }
            });
        };

        choices.forEach((choice, index) => {
            const y =
                buttonGroupOriginY +
                buttonHeight * (index + 0.5) +
                buttonMargin * index;

            const button = new Phaser.GameObjects.Rectangle(
                this.scene,
                width / 2,
                y,
                width - buttonMargin * 2,
                buttonHeight,
                0x000000
            ).setStrokeStyle(1, 0xffffff);

            const buttonText = new Phaser.GameObjects.Text(
                this.scene,
                width / 2,
                y,
                choice.text,
                this.textStyle
            ).setOrigin(0.5);

            this.uiLayer.add(button);
            this.uiLayer.add(buttonText);

            buttons.push(button);
            buttonTexts.push(buttonText);
        });

        updateSelection();

        this.scene.input.keyboard?.on("keydown-UP", () => {
            selectedIndex =
                (selectedIndex - 1 + choices.length) % choices.length;
            updateSelection();
        });

        this.scene.input.keyboard?.on("keydown-DOWN", () => {
            selectedIndex = (selectedIndex + 1) % choices.length;
            updateSelection();
        });

        this.scene.input.keyboard?.on("keydown-ENTER", () => {
            const selectedChoice = choices[selectedIndex];
            this.scene.scene.restart({ timelineID: selectedChoice.timelineID });
        });
    }

    // 次のタイムラインを実行
    private next() {
        if (!this.timeline) {
            return;
        }
        if (this.timelineIndex >= this.timeline.length) {
            return;
        }

        // タイムラインのイベントを取得してから、timelineIndexをインクリメント
        const timelineEvent = this.timeline[this.timelineIndex++];

        switch (timelineEvent.type) {
            case "dialog": // ダイアログイベント
                if (timelineEvent.actorName) {
                    // actorNameが設定されていたら名前を表示
                    this.dialogBox.setActorNameText(timelineEvent.actorName);
                } else {
                    // actorNameが設定されていなかったら名前を非表示
                    this.dialogBox.clearActorNameText();
                }
                this.dialogBox.setText(timelineEvent.text);
                break;

            case "setBackground": // 背景設定イベント
                this.setBackground(
                    this.scene.game.canvas.width / 2,
                    this.scene.game.canvas.height / 2,
                    timelineEvent.key
                );
                this.next(); // すぐに次のタイムラインを実行する
                break;

            case "addForeground": // 前景追加イベント
                this.addForeground(
                    timelineEvent.x,
                    timelineEvent.y,
                    timelineEvent.key
                );
                this.next(); // すぐに次のタイムラインを実行する
                break;

            case "clearForeground": // 前景クリアイベント
                this.clearForeground();
                this.next(); // すぐに次のタイムラインを実行する
                break;

            case "timelineTransition": // タイムライン遷移イベント
                // シーンをリスタートし、指定のタイムラインを実行する
                // restart()の引数がシーンのinit()の引数に渡される
                this.scene.scene.restart({
                    timelineID: timelineEvent.timelineID,
                });
                break;

            case "sceneTransition": // シーン遷移イベント
                // 指定のシーンに遷移する
                // start()の第2引数がシーンのinit()の引数に渡される
                this.scene.scene.start(timelineEvent.key, timelineEvent.data);
                break;

            case "choice": // 選択肢イベント
                this.setChoiceButtons(timelineEvent.choices);
                break;

            case "typingChallenge":
                // console.log("typingChallenge");
                // challenges プロパティにチャレンジ情報の配列が入っている前提です
                const challengesData = timelineEvent.typings as {
                    text: string;
                    x: number;
                    y: number;
                }[];
                this.typingChallengeActive = true;

                // 順次実行する関数を定義
                const runChallengeSequentially = (index: number) => {
                    // すべてのチャレンジが完了したら、次のタイムラインイベントへ進む
                    if (index >= challengesData.length) {
                        this.typingChallengeActive = false;
                        this.next();
                        return;
                    }

                    const challengeData = challengesData[index];
                    // TypingChallenge クラスを利用してチャレンジを開始
                    const typingChallenge = new TypingChallenge(
                        this.scene,
                        challengeData.x,
                        challengeData.y,
                        challengeData.text,
                        challengeData.displayText
                        () => {
                            // チャレンジ完了後、オブジェクトを破棄して次のチャレンジを開始
                            typingChallenge.destroy();
                            runChallengeSequentially(index + 1);
                        }
                    );
                    this.uiLayer.add(typingChallenge);
                };

                runChallengeSequentially(0);
                break;

            default:
                break;
        }
    }
}
