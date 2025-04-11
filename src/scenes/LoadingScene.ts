export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    preload() {
        // 第一章
        this.load.image("turn_home", "assets/background/turn_home.jpg");
        this.load.image("truck", "assets/background/truck.jpg");
        this.load.image("forest", "assets/background/forest.png");
        this.load.image("forest_phone", "assets/background/forest_phone.jpg");
        this.load.image("phone", "assets/background/phone.png");
        this.load.image("call_phone", "assets/background/call_phone.png");
        this.load.image("phone_hand", "assets/background/phone_hand.png");
        this.load.image("hotaru1", "assets/foreground/hotaru1.png");
        this.load.image("hotaru2", "assets/foreground/hotaru2.png");

        // 第二章
        this.load.image("town", "assets/background/town.jpg");
        this.load.image("town2", "assets/background/town2.jpg");
        this.load.image("town3", "assets/background/town3.jpg");
        this.load.image("town_select1", "assets/background/town_select1.jpg");
        this.load.image("town_select2", "assets/background/town_select2.jpg");
        this.load.image("town_select3", "assets/background/town_select3.jpg");
        this.load.image("town_select4", "assets/background/town_select4.jpg");
        this.load.image("crook_load1", "assets/background/crook_load1.jpg");
        this.load.image("crook_load2", "assets/background/crook_load2.jpg");
        this.load.image("crook_load3", "assets/background/crook_load3.jpg");
        this.load.image("crook_load4", "assets/background/crook_load4.jpg");
        this.load.image("crook_load5", "assets/background/crook_load5.png");
        this.load.image("town_human", "assets/foreground/town_human.png");
        this.load.image("town_human2", "assets/foreground/town_human2.png");
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
