import Phaser from "phaser";

export type ChapterData = {
    chapterNum: number;
    title: string;
    subTitle: string;
};

export default class ChapterSelectScene extends Phaser.Scene {
    private chapters: Phaser.GameObjects.Text[] = [];
    private selectedIndex: number = 0;
    // 表示する章の名称（ここでは日本語表示）
    private ChapterDatas: ChapterData[] = [
        { chapterNum: 1, title: "第1章", subTitle: "帰り道" },
        { chapterNum: 2, title: "第2章", subTitle: "境界線" },
        { chapterNum: 3, title: "第3章", subTitle: "？？？" },
        { chapterNum: 4, title: "第4章", subTitle: "？？？" },
        { chapterNum: 5, title: "第5章", subTitle: "？？？" },
    ];

    constructor() {
        super({ key: "ChapterSelectScene" });
    }

    init() {
        this.chapters = [];
    }

    create() {
        // 背景色を暗く設定（ホラー感を演出）
        this.cameras.main.setBackgroundColor(0x000000);

        // シーンタイトル（中央上部）
        this.add
            .text(400, 100, "章選択", {
                fontSize: "48px",
                color: "#FFF",
                fontFamily: "Arial",
            })
            .setOrigin(0.5);

        // 各章のテキストを作成（縦に並べる）
        const startY = 200;
        const spacing = 60; // 各テキスト間の間隔
        this.ChapterDatas.forEach((data, index) => {
            let chapterText = this.add
                .text(400, startY + index * spacing, data.title, {
                    fontSize: "32px",
                    color: "#FFF",
                    fontFamily: "Arial",
                })
                .setOrigin(0.5);
            this.chapters.push(chapterText);
        });

        // 初期選択状態の更新（最初の章をハイライト）
        this.updateSelection();

        // 矢印キーで選択肢を移動
        this.input.keyboard?.on("keydown-UP", () => {
            // 配列の先頭に戻るようにラップ
            this.selectedIndex = Phaser.Math.Wrap(
                this.selectedIndex - 1,
                0,
                this.chapters.length
            );
            this.updateSelection();
        });

        this.input.keyboard?.on("keydown-DOWN", () => {
            // 配列の末尾を超えたら先頭へ
            this.selectedIndex = Phaser.Math.Wrap(
                this.selectedIndex + 1,
                0,
                this.chapters.length
            );
            this.updateSelection();
        });

        // エンターキーもスペースキーも決定キーとする
        const confirmSelection = () => {
            this.scene.start("ChapterTitleScene", {
                chapterNum: this.selectedIndex + 1,
                title: this.ChapterDatas[this.selectedIndex].title,
                subTitle: this.ChapterDatas[this.selectedIndex].subTitle,
            });
        };

        this.input.keyboard?.on("keydown-SPACE", confirmSelection);
        this.input.keyboard?.on("keydown-ENTER", confirmSelection);
    }

    private updateSelection() {
        // 選択状態に応じたハイライト（例：選択中は赤色）
        this.chapters.forEach((chapterText, index) => {
            if (index === this.selectedIndex) {
                chapterText.setStyle({ color: "#F00" }); // ハイライト（赤色）
            } else {
                chapterText.setStyle({ color: "#FFF" }); // 通常時は白色
            }
        });
    }
}
