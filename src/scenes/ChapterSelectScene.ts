import Phaser from "phaser";

export default class ChapterSelectScene extends Phaser.Scene {
    private chapters: Phaser.GameObjects.Text[] = [];
    private selectedIndex: number = 0;
    // 表示する章の名称（ここでは日本語表示）
    private chapterNames: string[] = [
        "第1章",
        "第2章",
        "第3章",
        "第4章",
        "第5章",
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
        this.chapterNames.forEach((name, index) => {
            let chapterText = this.add
                .text(400, startY + index * spacing, name, {
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
            const chapterSceneKey = `Chapter${this.selectedIndex + 1}Scene0`;
            this.scene.start(chapterSceneKey);
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
