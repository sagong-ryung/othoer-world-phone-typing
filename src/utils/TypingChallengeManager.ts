import Phaser from "phaser";
import TypingChallenge from "./TypingChallenge";

export default class TypingChallengeManager {
    private scene: Phaser.Scene;
    private wordList: string[];
    private currentIndex: number = 0;
    private timeLimit: number;
    private onComplete: (success: boolean) => void;
    private currentChallenge?: TypingChallenge;
    
    constructor(scene: Phaser.Scene, wordList: string[], timeLimit: number, onComplete: (success: boolean) => void) {
        this.scene = scene;
        this.wordList = wordList;
        this.timeLimit = timeLimit;
        this.onComplete = onComplete;

        this.startNextChallenge();
    }
    
    private startNextChallenge() {
        if (this.currentIndex >= this.wordList.length) {
            this.onComplete(true);
            return;
        }
        
        const word = this.wordList[this.currentIndex];
        this.currentChallenge = new TypingChallenge(this.scene, word, this.timeLimit, (success) => {
            if (success) {
                this.currentIndex++;
                this.startNextChallenge();
            } else {
                this.onComplete(false);
            }
        });
    }
}
