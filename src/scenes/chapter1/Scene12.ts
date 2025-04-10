// import Phaser from "phaser";
// import DialogueManager from "../../utils/DialogueManager";
// import EffectManager from "../../utils/EffectManager";

// export default class Scene12 extends Phaser.Scene {
//     constructor() {
//         super({ key: "Chapter1Scene12" });
//     }

//     create() {
//         // 背景画像の位置を中央に設定
//         const BG_X = this.scale.width / 2;
//         const BG_Y = this.scale.height / 2;
//         this.add.image(BG_X, BG_Y, "phone_hand");

//         const dialogues: string[] = [
//             "ゆっくりと受話器を手に取り、恐る恐る耳に当てる。",
//             "主人公:「。。。」",
//             "？？？:「……しぃ……か……い……かえ……し……けぇ……」",
//             "（受話器の向こうから、低くてこもった声が聞こえてくる。）",
//             "（しかし、その声は言葉になっていないように感じる）",
//             "主人公:「……えっ？なんて言ってるんだろう……」",
//             "？？？:「……す………め……」",
//         ];
//         const dialogueManager = new DialogueManager(this, dialogues, 40);

//         dialogueManager.onDialogueChange = (index: number) => {
//             if (index === 6) {
//                 EffectManager.blackOut(this);
//             }
//         };
//         this.input.keyboard?.on("keydown-SPACE", () => {
//             if (dialogueManager?.getIsLastDialogue()) {
//                 this.scene.start("Chapter2Scene0");
//             } else {
//                 dialogueManager?.skipDialogue();
//             }
//         });
//     }
// }
