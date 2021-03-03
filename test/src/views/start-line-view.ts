import { lego } from '@armathai/lego';
import { SKEW_ANGLE } from '../constants/constants';
import { AppEvent } from '../events/app';
import { BgView } from './bg-view';

export class StartLineView extends PIXI.Container {
    private _tween: gsap.core.Timeline;
    public constructor(distance: number) {
        super();
        lego.event.on(AppEvent.resize, this._onResize, this);

        this.rotation = -SKEW_ANGLE;
        this.position.set(distance, BgView.centerY);

        this._build();
    }

    public animation(): void {
        this._tween = PIXI.tween.timeline({ universal: true }).add([
            PIXI.tween.to(this, {
                pixi: { pivotX: this.pivot.x - 100 },
                delay: 2,
                duration: 2,
                ease: PIXI.tween.easeSineInOut,
                onComplete: () => {
                    // this.pivot.x -= 100;
                },
            }),
        ]);
    }

    public destroy(option?: ContainerDestroyOptions): void {
        lego.event.removeListenersOf(this);
        super.destroy(option);
    }

    private _onResize(): void {
        setTimeout(() => {
            this._tween.pause();
            // console.warn(this._tween.getChildren()[0].vars.pixi.pivotX);
            // console.warn(this.pivot);
            // this.pivot.x = this._tween.getChildren()[0].vars.pixi.pivotX;
            this.animation();
        }, 18);
    }

    private _build(): void {
        const gr = new PIXI.Graphics();
        gr.beginFill(0xffffff);
        gr.drawRect(-5, -150, 10, 300);
        gr.endFill();
        this.addChild(gr);
        this.animation();
    }
}
