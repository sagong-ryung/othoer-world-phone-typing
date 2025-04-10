// import Phaser from "phaser";
// import DialogueManager from "../../utils/DialogueManager";
// import EffectManager from "../../utils/EffectManager";

// export default class Scene8 extends Phaser.Scene {
//     constructor() {
//         super({ key: "Chapter1Scene8" });
//     }

//     create() {
//         // 背景画像の位置を中央に設定
//         const BG_X = this.scale.width / 2;
//         const BG_Y = this.scale.height / 2;
//         const bgImage = this.add.image(BG_X, BG_Y, "forest");

//         const dialogues: string[] = [
//             "主人公:「ふぅ…落ち着いた。」",
//             "主人公:「ええい！考えても無駄だ！とにかく進んでみよう」",
//         ];
//         const dialogueManager = new DialogueManager(this, dialogues, 20);

//         this.input.keyboard?.on("keydown-SPACE", () => {
//             if (dialogueManager?.getIsLastDialogue()) {
//                 this.tweens.add({
//                     targets: bgImage,
//                     scaleX: 2, // 2倍にズーム
//                     scaleY: 2, // 2倍にズーム
//                     duration: 1000, // ズーム時間（ミリ秒）
//                     ease: "Power2", // イージング関数
//                     onComplete: () => {
//                         EffectManager.blackOut(this);
//                         this.scene.start("Chapter1Scene9");
//                     },
//                 });
//             } else {
//                 dialogueManager?.skipDialogue();
//             }
//         });
//     }
// }
