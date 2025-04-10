// import Phaser from "phaser";
// import DialogueManager from "../../utils/DialogueManager";
// import EffectManager from "../../utils/EffectManager";

// export default class Scene5 extends Phaser.Scene {
//     constructor() {
//         super({ key: "Chapter1Scene5" });
//     }

//     create() {
//         // 背景画像
//         const BG_X = this.scale.width / 2;
//         const BG_Y = this.scale.height / 2;
//         const bgImage = this.add.image(BG_X, BG_Y, "truck");

//         const dialogues: string[] = [
//             "「やばい、間に合わない…！\n死ぬのか…！？ こんなとこで！」",
//         ];
//         const dialogueManager = new DialogueManager(this, dialogues, 20);

//         // ズームアニメーションを追加
//         this.tweens.add({
//             targets: bgImage,
//             scaleX: 2, // 2倍にズーム
//             scaleY: 2, // 2倍にズーム
//             duration: 1000, // ズーム時間（ミリ秒）
//             ease: "Power2", // イージング関数
//             onComplete: () => {
//                 // ズームが終わったら白いフラッシュアウトを開始
//                 EffectManager.flashOut(this);
//             },
//         });

//         this.input.keyboard?.on("keydown-SPACE", () => {
//             if (dialogueManager?.getIsLastDialogue()) {
//                 // 最後のセリフ後にスペースを押すと次のシーンに進む
//                 this.scene.start("Chapter1Scene6"); // 次のシーンへ遷移
//             } else {
//                 dialogueManager?.skipDialogue(); // まだセリフが表示中ならスキップ
//             }
//         });
//     }
// }
