import Phaser from "phaser";
import type { Typing } from "../type/Typing";

// ひらがなをローマ字に変換する簡易的な関数
function convertHiraganaToRomaji(hiragana: string): string {
    const table: { [key: string]: string } = {
        // 複数文字の組み合わせを先に処理
        きゃ: "kya",
        きゅ: "kyu",
        きょ: "kyo",
        しゃ: "sha",
        しゅ: "shu",
        しょ: "sho",
        ちゃ: "cha",
        ちゅ: "chu",
        ちょ: "cho",
        // 単体のひらがな
        あ: "a",
        い: "i",
        う: "u",
        え: "e",
        お: "o",
        か: "ka",
        き: "ki",
        く: "ku",
        け: "ke",
        こ: "ko",
        さ: "sa",
        し: "shi",
        す: "su",
        せ: "se",
        そ: "so",
        た: "ta",
        ち: "chi",
        つ: "tsu",
        て: "te",
        と: "to",
        な: "na",
        に: "ni",
        ぬ: "nu",
        ね: "ne",
        の: "no",
        は: "ha",
        ひ: "hi",
        ふ: "fu",
        へ: "he",
        ほ: "ho",
        ま: "ma",
        み: "mi",
        む: "mu",
        め: "me",
        も: "mo",
        や: "ya",
        ゆ: "yu",
        よ: "yo",
        ら: "ra",
        り: "ri",
        る: "ru",
        れ: "re",
        ろ: "ro",
        わ: "wa",
        を: "wo",
        ん: "n",
    };

    let result = "";
    let i = 0;
    while (i < hiragana.length) {
        let matchFound = false;
        // まず2文字分のマッチを試す
        if (i + 1 < hiragana.length) {
            const twoChar = hiragana.substring(i, i + 2);
            if (table[twoChar]) {
                result += table[twoChar];
                i += 2;
                matchFound = true;
                continue;
            }
        }
        // 1文字分のマッチ
        const oneChar = hiragana.charAt(i);
        if (table[oneChar]) {
            result += table[oneChar];
        } else {
            // マッチしなければそのまま追加
            result += oneChar;
        }
        i++;
    }
    return result;
}

export class TypingChallenge extends Phaser.GameObjects.Container {
    private challengeText: Phaser.GameObjects.Text;
    private inputText: Phaser.GameObjects.Text;
    // 期待されるローマ字の文字列（ひらがなから変換）
    private expectedInput: string;
    // ユーザーがキーボードから入力した文字列（ローマ字）
    private currentInput: string = "";
    private onCompleteCallback?: () => void;

    constructor(
        scene: Phaser.Scene,
        typingData: Typing,
        onComplete?: () => void
    ) {
        // コンテナは (typingData.x, typingData.y) に配置
        super(scene, typingData.x, typingData.y);
        // 正解となるひらがな（typingData.text）をローマ字に変換
        this.expectedInput = convertHiraganaToRomaji(typingData.text);
        this.onCompleteCallback = onComplete;

        // 表示用のテキスト（displayText は漢字などを含む見た目用）
        this.challengeText = scene.add.text(0, 0, typingData.displayText, {
            fontSize: "32px",
            color: "#FFF",
            fontFamily: "Arial",
        });
        // ユーザーの入力状況を表示するテキスト
        this.inputText = scene.add.text(0, 50, "", {
            fontSize: "32px",
            color: "#0F0",
            fontFamily: "Arial",
        });

        this.add(this.challengeText);
        this.add(this.inputText);
        scene.add.existing(this);

        // キーボード入力のリスナーを登録
        scene.input.keyboard?.on("keydown", this.handleKey, this);
    }

    private handleKey(event: KeyboardEvent) {
        if (event.key.length === 1) {
            // 入力されたキーをそのまま連結（ローマ字入力とする）
            this.currentInput += event.key;
        } else if (event.key === "Backspace") {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        // 入力内容の更新表示
        this.inputText.setText(this.currentInput);

        // 現在のローマ字入力が、期待されるローマ字入力と一致したかチェックする
        if (this.currentInput === this.expectedInput) {
            // キー入力のリスナーを解除し、完了時のコールバックを呼び出す
            this.scene.input.keyboard?.off("keydown", this.handleKey, this);
            if (this.onCompleteCallback) {
                this.onCompleteCallback();
            }
        }
    }
}
