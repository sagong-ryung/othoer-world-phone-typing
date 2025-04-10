// import Phaser from "phaser";
// import DialogueManager from "../../utils/DialogueManager";
// import EffectManager from "../../utils/EffectManager";

// export default class Scene6 extends Phaser.Scene {
//     constructor() {
//         super({ key: "Chapter1Scene6" });
//     }

//     create() {
//         // 背景画像の位置を中央に設定
//         const BG_X = this.scale.width / 2;
//         const BG_Y = this.scale.height / 2;
//         const bgImage = this.add.image(BG_X, BG_Y, "forest");

//         EffectManager.blackIn(this);

//         // ダイアログの内容
//         const dialogues: string[] = [
//             "主人公:「うっ、い、痛くな…い…？どうして生きてるんだ…？」",
//             "(目を開けると、周りはうす暗い森。静寂が支配している)",
//             "主人公: 「ここは……どこだ？ 夢……？\nそれとももう死んでるとか…うす暗くて気味悪いな……」\n(周囲の静けさが不気味で、心臓の鼓動が耳に響く)",
//             "主人公: 「誰か…誰かいるのか？ こんなところで一人なんて、、」",
//         ];
//         const dialogueManager = new DialogueManager(this, dialogues, 40);

//         // ズームアニメーションを追加
//         this.tweens.add({
//             targets: bgImage,
//             scaleX: 1.02,
//             scaleY: 1.02,
//             duration: 500,
//             ease: "Power2",
//             yoyo: true,
//             repeat: -1,
//         });

//         this.input.keyboard?.on("keydown-SPACE", () => {
//             if (dialogueManager?.getIsLastDialogue()) {
//                 this.scene.start("Chapter1Scene7");
//             } else {
//                 dialogueManager?.skipDialogue();
//             }
//         });
//     }
// }
