import Phaser from "phaser";

type animationTarget =
    | Phaser.GameObjects.Image
    | Phaser.GameObjects.Sprite
    | Phaser.GameObjects.Container;

export class AnimationManager {
    private scene: Phaser.Scene;
    private currentTween?: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public play(
        animationType: string,
        target?: animationTarget
    ): Promise<void> {
        // 先に止める（多重再生防止）
        stop();

        switch (animationType) {
            case "blackIn":
                return this.blackIn();
            case "blackOut":
                return this.blackOut();
            case "flashOut":
                return this.flashOut();
            case "zoomIn":
                return this.ZoomIn(target);
            case "heartBeat":
                return this.HeartBeat(target);
            default:
                throw new Error(
                    `指定したアニメーションがないです。：${animationType}`
                );
        }
    }

    // public stop() {
    //     if (this.currentTween) {
    //         this.currentTween.stop();
    //         this.currentTween = undefined;
    //     }
    // }

    private blackIn(duration: number = 4000): Promise<void> {
        return new Promise((resolve) => {
            const blackOverlay = this.scene.add.graphics();
            blackOverlay.fillStyle(0x000000, 1);
            blackOverlay.fillRect(
                0,
                0,
                this.scene.scale.width,
                this.scene.scale.height
            );
            blackOverlay.setAlpha(1);

            this.currentTween = this.scene.tweens.add({
                targets: blackOverlay,
                alpha: 0,
                duration: duration,
                ease: "Power2",
                onComplete: () => {
                    blackOverlay.destroy();
                    resolve();
                },
            });
        });
    }

    private blackOut(duration: number = 4000): Promise<void> {
        return new Promise((resolve) => {
            const blackOverlay = this.scene.add.graphics();
            blackOverlay.fillStyle(0x000000, 1);
            blackOverlay.fillRect(
                0,
                0,
                this.scene.scale.width,
                this.scene.scale.height
            );
            blackOverlay.setAlpha(0);

            this.currentTween = this.scene.tweens.add({
                targets: blackOverlay,
                alpha: 1, // 完全に黒くなる
                duration: duration,
                ease: "Power2",
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    private flashOut(duration: number = 1000): Promise<void> {
        return new Promise((resolve) => {
            const flash = this.scene.add.graphics();
            flash.fillStyle(0xffffff, 1);
            flash.fillRect(
                0,
                0,
                this.scene.scale.width,
                this.scene.scale.height
            );
            flash.setAlpha(1);

            this.currentTween = this.scene.tweens.add({
                targets: flash,
                alpha: 1, // 光ったままにする
                duration: duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    private ZoomIn(target?: animationTarget): Promise<void> {
        return new Promise((resolve) => {
            this.currentTween = this.scene.tweens.add({
                targets: target,
                scaleX: 2,
                scaleY: 2,
                duration: 1000,
                ease: "Power2",
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    private HeartBeat(target?: animationTarget): Promise<void> {
        return new Promise((resolve) => {
            this.currentTween = this.scene.tweens.add({
                targets: target,
                scaleX: 1.02,
                scaleY: 1.02,
                duration: 500,
                ease: "Power2",
                yoyo: true,
                repeat: -1,
                // onComplete: () => {
                //     resolve();
                // },
            });
            resolve();
        });
    }
}
