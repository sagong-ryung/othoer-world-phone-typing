import Phaser from "phaser";

export type ChapterData = {
    chapterNum: number;
    title: string;
    subTitle: string;
};

export default class ChapterSelectScene extends Phaser.Scene {
    private chapters: Phaser.GameObjects.Text[] = [];
    private selectedIndex: number = 0;
    private completedChapterNum: number = 0;
    private ChapterDatas: ChapterData[] = [
        { chapterNum: 1, title: "第1章", subTitle: "帰り道" },
        { chapterNum: 2, title: "第2章", subTitle: "境界線" },
        { chapterNum: 3, title: "第3章", subTitle: "心の試練" },
        { chapterNum: 4, title: "第4章", subTitle: "境界を越えて" },
        { chapterNum: 5, title: "第5章", subTitle: "終焉、そして始まり" },
    ];

    constructor() {
        super({ key: "ChapterSelectScene" });
    }

    init() {
        this.chapters = [];
        this.selectedIndex = 0;

        // ローカルストレージから読み込み（なければ0）
        const stored = localStorage.getItem("completedChapterNum");
        this.completedChapterNum = stored ? parseInt(stored) : 0;
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.add
            .text(400, 100, "章選択", {
                fontSize: "48px",
                color: "#FFF",
                fontFamily: "Arial",
            })
            .setOrigin(0.5);

        const startY = 200;
        const spacing = 60;

        this.ChapterDatas.forEach((data, index) => {
            const isUnlocked = data.chapterNum <= this.completedChapterNum + 1;
            const textColor = isUnlocked ? "#FFF" : "#666";

            let chapterText = this.add
                .text(400, startY + index * spacing, data.title, {
                    fontSize: "32px",
                    color: textColor,
                    fontFamily: "Arial",
                })
                .setOrigin(0.5);

            this.chapters.push(chapterText);
        });

        // 最初に選択可能な章にカーソルを合わせる
        this.selectedIndex = this.getFirstUnlockedIndex();
        this.updateSelection();

        this.input.keyboard?.on("keydown-UP", () => {
            this.moveSelection(-1);
        });

        this.input.keyboard?.on("keydown-DOWN", () => {
            this.moveSelection(1);
        });

        const confirmSelection = () => {
            const chapterData = this.ChapterDatas[this.selectedIndex];
            const isUnlocked = chapterData.chapterNum <= this.completedChapterNum + 1;
            if (isUnlocked) {
                this.scene.start("ChapterTitleScene", {
                    chapterNum: chapterData.chapterNum,
                    title: chapterData.title,
                    subTitle: chapterData.subTitle,
                });
            }
        };

        this.input.keyboard?.on("keydown-SPACE", confirmSelection);
        this.input.keyboard?.on("keydown-ENTER", confirmSelection);
    }

    private updateSelection() {
        this.chapters.forEach((chapterText, index) => {
            const isUnlocked = this.ChapterDatas[index].chapterNum <= this.completedChapterNum + 1;
            if (index === this.selectedIndex && isUnlocked) {
                chapterText.setStyle({ color: "#F00" }); // ハイライト
            } else if (!isUnlocked) {
                chapterText.setStyle({ color: "#666" }); // ロック表示
            } else {
                chapterText.setStyle({ color: "#FFF" });
            }
        });
    }

    private moveSelection(direction: number) {
        let nextIndex = this.selectedIndex;

        do {
            nextIndex = Phaser.Math.Wrap(nextIndex + direction, 0, this.chapters.length);
        } while (this.ChapterDatas[nextIndex].chapterNum > this.completedChapterNum + 1);

        this.selectedIndex = nextIndex;
        this.updateSelection();
    }

    private getFirstUnlockedIndex(): number {
        return this.ChapterDatas.findIndex(
            (data) => data.chapterNum <= this.completedChapterNum + 1
        );
    }
}
