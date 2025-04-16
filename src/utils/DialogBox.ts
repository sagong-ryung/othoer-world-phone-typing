// import Typewriter from "./Typewriter"; // Typewriter クラスのインポート

export type DialogBoxConfig = {
    x: number;
    y: number;
    width: number;
    height: number;
    padding?: number;
    margin?: number;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

// Phaser.GameObjects.Containerを継承してDialogBoxを作成
export class DialogBox extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text;
    private actorNameText: Phaser.GameObjects.Text;

    constructor(
        public scene: Phaser.Scene,
        { x, y, width, height, padding = 10, margin = 10, textStyle = {} }: DialogBoxConfig
    ) {
        // Phaser.GameObjects.Containerのコンストラクタ
        super(scene, 0, 0);

        // wordWrap（折り返し設定）を追加した会話テキスト用のTextStyleを作成
        const dialogBoxTextStyle = {
            ...textStyle,
            wordWrap: { width: width - padding * 2, useAdvancedWrap: true }, // useAdvancedWrapをtrueにすることで日本語の折り返しが有効になる
        };

        // 会話テキスト用のTextを作成
        this.text = new Phaser.GameObjects.Text(
            this.scene,
            x - width / 2 + padding,
            y - height / 2 + padding,
            "",
            dialogBoxTextStyle
        );
        this.add(this.text); // Containerへの追加

        // 名前テキスト用のTextを作成
        this.actorNameText = new Phaser.GameObjects.Text(
            this.scene,
            x - width / 2 + padding,
            y - height / 2 - margin - 20,
            "",
            textStyle
        );
        this.actorNameText.setOrigin(0, 0.5); // 原点を左中に設定
        this.actorNameText.setVisible(false); // 初期状態では非表示
        this.add(this.actorNameText); // Containerへの追加
    }

    // 会話テキストのセット
    public setText(text: string) {
        this.text.setText(text);
    }

    // 名前テキストのセット
    public setActorNameText(name: string) {
        this.actorNameText.setText(name);
        this.actorNameText.setVisible(true);
    }

    // 名前のクリア（非表示）
    public clearActorNameText() {
        this.actorNameText.setVisible(false);
    }
}
