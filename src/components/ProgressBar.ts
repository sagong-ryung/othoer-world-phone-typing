import Phaser from "phaser";

export default class ProgressBar {
    private scene: Phaser.Scene;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private progress: number;
    private progressBar: Phaser.GameObjects.Graphics;
    
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.progress = 0;

        // プログレスバーの描画
        this.progressBar = this.scene.add.graphics();
        this.updateProgress(0); // 初期状態で更新
    }

    /**
     * プログレスバーを更新する
     * @param progress 進行度 (0 - 1)
     */
    public updateProgress(progress: number) {
        this.progress = Phaser.Math.Clamp(progress, 0, 1);

        // プログレスバーの描画
        this.progressBar.clear();
        this.progressBar.fillStyle(0x00ff00, 1); // 緑色
        this.progressBar.fillRect(this.x, this.y, this.width * this.progress, this.height);
    }

    /**
     * プログレスバーを削除する
     */
    public destroy() {
        this.progressBar.destroy();
    }
}
