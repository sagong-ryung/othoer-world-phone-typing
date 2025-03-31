import Phaser from "phaser";

export default class EffectManager {
    static blackIn(scene: Phaser.Scene, duration: number = 4000) {
        const blackOverlay = scene.add.graphics();
        blackOverlay.fillStyle(0x000000, 1);
        blackOverlay.fillRect(0, 0, scene.scale.width, scene.scale.height);
        blackOverlay.setAlpha(1);

        scene.tweens.add({
            targets: blackOverlay,
            alpha: 0,
            duration: duration,
            ease: "Power2",
            onComplete: () => {
                blackOverlay.destroy();
            },
        });
    }

    static blackOut(scene: Phaser.Scene, duration: number = 4000) {
        const blackOverlay = scene.add.graphics();
        blackOverlay.fillStyle(0x000000, 1);
        blackOverlay.fillRect(0, 0, scene.scale.width, scene.scale.height);
        blackOverlay.setAlpha(0);

        scene.tweens.add({
            targets: blackOverlay,
            alpha: 1, // 完全に黒くなる
            duration: duration,
            ease: "Power2",
        });
    }

    static flashOut(scene: Phaser.Scene, duration: number = 1000) {
        const flash = scene.add.graphics();
        flash.fillStyle(0xffffff, 1);
        flash.fillRect(0, 0, scene.scale.width, scene.scale.height);
        flash.setAlpha(1);

        scene.tweens.add({
            targets: flash,
            alpha: 1, // 光ったままにする
            duration: duration,
        });
    }
}
