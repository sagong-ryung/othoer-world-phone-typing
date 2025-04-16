import Phaser from "phaser";
import { DialogBox, DialogBoxConfig } from "../../utils/DialogBox";
import { Timeline } from "../../type/Timeline";
import { TimelinePlayer } from "../../utils/TimelinePlayer";
import { chapterDatas } from "../../data";

export default class ChapterPlayScene extends Phaser.Scene {
    private timeline?: Timeline;

    constructor() {
        super({ key: "ChapterPlayScene" });
    }

    init(data: any) {
        const timelineID = data.timelineID;

        if (!(timelineID in chapterDatas)) {
            console.log(typeof timelineID);
            console.error(`[ERROR] タイムラインID[${timelineID}]は登録されていません`);
            // 登録されていないタイムラインIDが指定されていたらタイトルシーンに遷移する
            this.scene.start("StartScene");
            return;
        }

        this.timeline = chapterDatas[timelineID];

        // デバッグ用
        // this.timeline = chapter1Data["chapter1_scene1_5"];
    }

    create() {
        if (!this.timeline) {
            return;
        }

        const { width } = this.game.canvas;

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
