import Phaser from "phaser";
import TypingChallenge from "../../utils/TypingChallenge";
import { selectWords, TypeWord } from "../../utils/selectWords";

// 蛍に関する単語の配列
const TypeWords: TypeWord[] = [
    { word: "光", romaji: "hikari" },
    { word: "蛍", romaji: "hotaru" },
    { word: "夜", romaji: "yoru" },
    { word: "闇", romaji: "yami" },
    { word: "幻想", romaji: "gensou" },
    { word: "きらめき", romaji: "kirameki" },
    { word: "光源", romaji: "kougen" },
    { word: "舞う", romaji: "mau" },
    { word: "羽", romaji: "hane" },
    { word: "瞬き", romaji: "matataki" },
];

export default class Scene9 extends Phaser.Scene {
    private typingChallenge1?: TypingChallenge;
    private typingChallenge2?: TypingChallenge;

    constructor() {
        super({ key: "Chapter1Scene9" });
    }

    preload() {
        // 背景画像とホタルの画像を読み込み
        this.load.image(
            "forest_phone",
            "assets/images/chapter1/forest_phone.jpg"
        );
        this.load.image("hotaru1", "assets/images/chapter1/hotaru1.png");
        this.load.image("hotaru2", "assets/images/chapter1/hotaru2.png");
    }

    create() {
        // 背景画像の位置を中央に設定
        const BG_X = this.scale.width / 2;
        const BG_Y = this.scale.height / 2;
        this.add.image(BG_X, BG_Y, "forest_phone");

        const selectedWords = selectWords(TypeWords, 2);

        // ホタルを表示 (サイズ調整)
        const hotaru1 = this.add
            .image(BG_X - 100, BG_Y - 100, "hotaru1")
            .setScale(0.2);
        const hotaru2 = this.add
            .image(BG_X + 100, BG_Y - 100, "hotaru2")
            .setScale(0.2);

        // ホタルの飛び回るアニメーション
        this.tweens.add({
            targets: hotaru1,
            x: hotaru1.x + 30, // 30px 左右に移動
            y: hotaru1.y + 30, // 15px 上下に移動
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1, // 無限ループ
        });

        this.tweens.add({
            targets: hotaru2,
            x: hotaru2.x - 30, // 30px 左右に移動
            y: hotaru2.y + 30, // 15px 上下に移動
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
        });

        var successTypingFlg = 0;

        // TypingChallenge1 を hotaru1 の下に配置
        this.typingChallenge1 = new TypingChallenge(
            this,
            hotaru1.x,
            hotaru1.y + 60, // 60px 下に配置
            selectedWords[0].word,
            selectedWords[0].romaji,
            32,
            2
        );
        this.typingChallenge1.startTyping().then((success) => {
            if (success) {
                hotaru1.destroy();
                successTypingFlg++;
                if (successTypingFlg == 2) {
                    this.scene.start("Chapter1Scene10");
                }
            } else {
                this.scene.start("GameOverScene");
            }
        });

        // TypingChallenge2 を hotaru2 の下に配置
        this.typingChallenge2 = new TypingChallenge(
            this,
            hotaru2.x,
            hotaru2.y + 60, // 60px 下に配置
            selectedWords[1].word,
            selectedWords[1].romaji,
            32,
            2
        );
        this.typingChallenge2.startTyping().then((success) => {
            if (success) {
                hotaru2.destroy();
                successTypingFlg++;
                if (successTypingFlg == 2) {
                    this.scene.start("Chapter1Scene10");
                }
            } else {
                this.scene.start("GameOverScene");
            }
        });
    }
}
