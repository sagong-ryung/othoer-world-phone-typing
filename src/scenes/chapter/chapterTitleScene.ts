import Phaser from "phaser";
import PressSpaceText from "../../components/PressSpaceText";
import { ChapterData } from "../ChapterSelectScene";

export default class ChapterTitleScene extends Phaser.Scene {
    private chapterNum: number = 1;
    private title: string = "テスト章";
    private subTitle: string = "テスト";

    constructor() {
        super({ key: "ChapterTitleScene" });
    }

    init(chapterData: ChapterData) {
        this.chapterNum = chapterData.chapterNum;
        this.title = chapterData.title;
        this.subTitle = chapterData.subTitle;
    }

    create() {
        const initial_X: number = 400;
        const initial_Y = 200;

        this.add
            .text(initial_X, initial_Y, this.title, {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置

        this.add
            .text(initial_X, initial_Y + 100, `- ${this.subTitle} -`, {
                fontSize: "48px",
                fontFamily: "Arial",
                color: "#fff", // 白色で表示
            })
            .setOrigin(0.5); // 中央に配置

        new PressSpaceText(this, 400, 500);

        // SPACEキーを押すイベントを設定
        this.input?.keyboard?.on("keydown-SPACE", () => {
            this.scene.start(`ChapterPlayScene`, {
                timelineID: `chapter${this.chapterNum}_scene1`,
            }); // 次のシーンに進む
        });
    }
}
