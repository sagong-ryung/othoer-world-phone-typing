import Phaser from "phaser";
import { DialogBox, DialogBoxConfig } from "../../utils/DialogBox";
import { Timeline } from "../../type/Timeline";
import { TimelinePlayer } from "../../utils/TimelinePlayer";
import { chapter1Data } from "../../data/chapter1";

export default class Scene1 extends Phaser.Scene {
    private timeline?: Timeline;

    constructor() {
        super({ key: "Chapter1Scene1" });
    }

    init(data: any) {
        const timelineID = data.timelineID || "start";

        if (!(timelineID in chapter1Data)) {
            console.error(
                `[ERROR] タイムラインID[${timelineID}]は登録されていません`
            );
            // 登録されていないタイムラインIDが指定されていたらタイトルシーンに遷移する
            this.scene.start("StartScene");
            return;
        }

        this.timeline = chapter1Data[timelineID];
    }

    create() {
        if (!this.timeline) {
            return;
        }

        const { width, height } = this.game.canvas;

        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily:
                '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
            fontSize: "24px",
        };

        // dialog box
        const dialogBoxHeight = 150;
        const dialogBoxMargin = 20;
        const dialogBoxConfig: DialogBoxConfig = {
            x: width / 2 + dialogBoxMargin,
            y: dialogBoxHeight + dialogBoxMargin,
            width: width - dialogBoxMargin * 2,
            height: dialogBoxHeight,
            padding: 10,
            margin: dialogBoxMargin,
            textStyle: textStyle,
        };

        // DialogBoxの作成
        const dialogBox = new DialogBox(this, dialogBoxConfig);

        // タイムラインプレイヤーの作成
        const timelinePlayer = new TimelinePlayer(this, dialogBox, textStyle);

        // タイムラインの再生開始
        timelinePlayer.start(this.timeline);
    }
}
