export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    preload() {
        this.load.image("turn_home", "assets/images/turn_home.jpg");
        this.load.image("truck", "assets/images/truck.jpg");
        this.load.image("forest", "assets/images/forest.png");
        this.load.image("forest_phone", "assets/images/forest_phone.jpg");
        this.load.image("hotaru1", "assets/images/hotaru1.png");
        this.load.image("hotaru2", "assets/images/hotaru2.png");
        this.load.image("phone", "assets/images/phone.png");
        this.load.image("call_phone", "assets/images/call_phone.png");
        this.load.image("phone_hand", "assets/images/phone_hand.png");
    }

    create() {
        // 描画領域のサイズを取得
        // const { width, height } = this.game.canvas;

        // アセットのロードが完了したらTitleSceneに遷移
        this.load.on("complete", () => {
            this.scene.start("StartScene");
        });

        // アセットのロードを開始（preload外でロードを行う場合はこのメソッドを呼ぶ必要がある）
        this.load.start();
    }
}
