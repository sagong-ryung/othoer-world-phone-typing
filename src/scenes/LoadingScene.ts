export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    preload() {
        // キャラ
        this.load.image("hotaru1", "assets/foreground/hotaru1.png");
        this.load.image("hotaru2", "assets/foreground/hotaru2.png");
        this.load.image("town_human", "assets/foreground/town_human.png");
        this.load.image("town_human2", "assets/foreground/town_human2.png");
        this.load.image("mysterious_girl", "assets/foreground/mysterious_girl.png");
        this.load.image("mysterious_person", "assets/foreground/mysterious_person.png");
        this.load.image("final_person", "assets/foreground/final_person.png");

        // 第一章
        this.load.image("turn_home", "assets/background/turn_home.jpg");
        this.load.image("truck", "assets/background/truck.jpg");
        this.load.image("forest", "assets/background/forest.png");
        this.load.image("forest_phone", "assets/background/forest_phone.jpg");
        this.load.image("phone", "assets/background/phone.png");
        this.load.image("call_phone", "assets/background/call_phone.png");
        this.load.image("phone_hand", "assets/background/phone_hand.png");

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

        // 第三章
        this.load.image("chapter3_img1", "assets/background/chapter3_img1.webp");
        this.load.image("chapter3_img2", "assets/background/chapter3_img2.webp");
        this.load.image("chapter3_img3", "assets/background/chapter3_img3.webp");
        this.load.image("chapter3_img4", "assets/background/chapter3_img4.webp");
        this.load.image("chapter3_img5", "assets/background/chapter3_img5.webp");

        // 第四章
        this.load.image("chapter4_img1", "assets/background/chapter4_img1.webp");
        this.load.image("chapter4_img2", "assets/background/chapter4_img2.webp");
        this.load.image("chapter4_img3", "assets/background/chapter4_img3.webp");
        this.load.image("chapter4_img4", "assets/background/chapter4_img4.webp");
        this.load.image("chapter4_img5", "assets/background/chapter4_img5.webp");

        // 第五章
        this.load.image("chapter5_img1", "assets/background/chapter5_img1.webp");
        this.load.image("chapter5_img2", "assets/background/chapter5_img2.webp");
        this.load.image("chapter5_img3", "assets/background/chapter5_img3.webp");
        this.load.image("chapter5_img4", "assets/background/chapter5_img4.webp");
        this.load.image("chapter5_img5", "assets/background/chapter5_img5.webp");
        this.load.image("chapter5_img6", "assets/background/chapter5_img6.webp");
    }

    create() {
        // ゲームキャンバスの幅と高さを取得
        const { width, height } = this.cameras.main;

        // 中央に "Loading..." テキストを表示
        const loadingText = this.add.text(width / 2, height / 2, "Loading...", {
            fontSize: "32px",
            color: "#ffffff",
        }).setOrigin(0.5);

        // 点滅アニメーション（透明度を変える）
        this.tweens.add({
            targets: loadingText,
            alpha: { from: 1, to: 0.3 },
            duration: 800,
            yoyo: true,
            repeat: -1,
        });

        // アセットのロードが完了したらTitleSceneに遷移
        this.load.on("complete", () => {
            this.scene.start("StartScene");
        });

        // アセットのロードを開始（preload外でロードを行う場合はこのメソッドを呼ぶ必要がある）
        this.load.start();
    }
}
