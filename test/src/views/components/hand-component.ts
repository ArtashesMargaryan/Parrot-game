import { getHandSpriteConfig } from '../../constants/configs/sprite-configs';

export class HandComponent extends PIXI.Sprite {
    public constructor() {
        super(PIXI.Texture.from(getHandSpriteConfig().texture));
    }

    public play(): void {
        this.scale.set(1.1);
        PIXI.tween
            .timeline({ universal: true, repeat: -1, delay: 0.5, repeatDelay: 2 })
            .add([
                PIXI.tween.from(this, { pixi: { alpha: 0 }, duration: 0.6 }),
                PIXI.tween.to(this, { pixi: { scale: 0.8 }, duration: 0.6 }),
            ])
            .add([PIXI.tween.to(this, { pixi: { alpha: 0 }, delay: 1, duration: 0.4 })]);
    }

    public stop(): void {
        PIXI.tween.killTweensOf(this);
        this.scale.set(1.1);
    }

    public destroy(options?: ContainerDestroyOptions): void {
        this.stop();
        super.destroy(options);
    }
}
