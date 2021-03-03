import { ObstacleState } from '../../models/game/obstacle-model';
import { ObstacleViewAbstract } from './obstacle-view-abstract';

export class CommonObstacleView extends ObstacleViewAbstract {
    private _moveTween: gsap.core.Tween;

    public setState(newState: ObstacleState): void {
        switch (newState) {
            case ObstacleState.idle:
                this._startMovement();
                break;
        }
    }

    public destroy(option?: ContainerDestroyOptions): void {
        this._moveTween.kill();
        super.destroy(option);
    }

    protected build(): void {
        //
    }

    private _startMovement(): void {
        const pos = this.position.clone();

        this._moveTween = PIXI.tween.to(pos, {
            universal: true,
            y: this.y - 500,
            delay: 1,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: PIXI.tween.easeLinearNone,
            onUpdate: () => {
                this.position.set(pos.x, pos.y);
            },
        });
    }
}
