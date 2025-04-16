import { Timeline, ForegroundProps } from "../type/Timeline";
import { Choice } from "../type/Choice";
import { DialogBox } from "./DialogBox";
import { TypingChallenge } from "./TypingChallenge";
import { Typing } from "../type/Typing";
import { AnimationManager } from "./AnimationManager";

export class TimelinePlayer {
    private backgroundLayer: Phaser.GameObjects.Container;
    private foregroundLayer: Phaser.GameObjects.Container;
    private uiLayer: Phaser.GameObjects.Container;

    private timeline?: Timeline;
    private timelineIndex = 0;
    // タイピングチャレンジ中かを示すフラグ
    private acceptSpaceInputFlag: boolean = true;

    private animationManager: AnimationManager;

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

        // animation
        this.animationManager = new AnimationManager(this.scene);

        // スペースキーで next() を実行（ただし、タイピングチャレンジ中は無視）
        this.scene.input.keyboard?.on("keydown-SPACE", () => {
            if (this.acceptSpaceInputFlag) {
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
        const backgroundImage = new Phaser.GameObjects.Image(this.scene, x, y, texture).setDepth(
            -1
        );
        this.backgroundLayer.add(backgroundImage);
    }

    // 前景画像を追加
    private addForeground(foregroundProps: ForegroundProps) {
        const { x, y, key, scale } = foregroundProps;
        const foregroundImage = new Phaser.GameObjects.Image(this.scene, x, y, key).setScale(scale);
        this.foregroundLayer.add(foregroundImage);
    }

    // 前景をクリア
    private clearForeground() {
        this.foregroundLayer.removeAll(true);
    }

    private startAnimation(animationType: string) {
        this.acceptSpaceInputFlag = false;
        if (this.backgroundLayer) {
            this.animationManager.play(animationType, this.backgroundLayer).then(() => {
                this.acceptSpaceInputFlag = true;
                this.next();
            });
        } else {
            this.animationManager.play(animationType);
            this.acceptSpaceInputFlag = true;
        }
    }

    // 選択肢ボタンをセット
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
            const y = buttonGroupOriginY + buttonHeight * (index + 0.5) + buttonMargin * index;

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
            selectedIndex = (selectedIndex - 1 + choices.length) % choices.length;
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

    private startTypingChallenge = (typings: Typing[]) => {
        this.acceptSpaceInputFlag = false;

        const runTypingChallenge = (index: number) => {
            if (index >= typings.length) {
                this.acceptSpaceInputFlag = true;
                this.next();
                return;
            }

            const typingData = typings[index];
            const typingChallenge = new TypingChallenge(this.scene, typingData);
            typingChallenge.startTyping().then((success) => {
                if (success) {
                    runTypingChallenge(index + 1);
                } else {
                    this.scene.scene.start("GameOverScene");
                }
            });
        };
        runTypingChallenge(0);
    };

    private completedChapter(completedChapterNum: number) {
        const stored = localStorage.getItem("completedChapterNum");
        const currentCompChapNum = stored ? parseInt(stored) : 0;

        // 現在のチャプターよりクリアしたチャプターが大きければlocalstrageを更新する
        if (currentCompChapNum < completedChapterNum) {
            localStorage.setItem("completedChapterNum", String(completedChapterNum));
        }
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
                this.addForeground(timelineEvent);
                this.next(); // すぐに次のタイムラインを実行する
                break;

            case "clearForeground": // 前景クリアイベント
                this.clearForeground();
                this.next(); // すぐに次のタイムラインを実行する
                break;

            case "startAnimation":
                this.startAnimation(timelineEvent.animationType);
                break;

            case "stopAnimation":
                this.scene.tweens.killTweensOf(this.backgroundLayer);
                this.next();
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
                this.startTypingChallenge(timelineEvent.typings);
                break;

            case "completedChapter":
                this.completedChapter(timelineEvent.completedChapterNum);
                this.next();
                break;

            default:
                break;
        }
    }
}
