import { postRunnable } from '../../../utils';
import { BgStrategyAbstract } from './bg-strategy-abstract';

export class UpdateItemsBgStrategy extends BgStrategyAbstract {
    private _target: PIXI.DisplayObject;

    public destroy(): void {
        void 0;
    }

    public onWheel(event: WheelEvent): void {
        if (!this._target) {
            return;
        }

        const scale = event.deltaY / Math.abs(event.deltaY);

        const { x, y } = this._target.scale;
        this._target.scale.set(x + 0.1 * (scale ? scale : 1), y + 0.1 * (scale ? scale : 1));
    }

    public onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'Escape':
                this._removeTarget();
                break;
        }
    }

    public onToolsetItemClick(itemKey: string): void {
        void itemKey;
    }

    public onPointerMove(event: PIXI.InteractionEvent): void {
        if (!this._target) {
            return;
        }

        this._target.position.copyFrom(this._calculateItemPosition(event, this._target));
    }

    public onPointerUp(event: PIXI.InteractionEvent): void {
        this._removeTarget();

        void event;
    }

    public onItemUp(event: PIXI.InteractionEvent): void {
        if (this._target) {
            return;
        }

        postRunnable(() => {
            this._target = event.target;
            this.onPointerMove(event);
        });
    }

    public onItemDown(event: PIXI.InteractionEvent): void {
        void event;
    }

    private _removeTarget(): void {
        this._target && (this._target = null);
    }

    private _calculateItemPosition(event: PIXI.InteractionEvent, target: PIXI.DisplayObject): PIXI.Point {
        const pos = event.data.getLocalPosition(target.parent);

        return new PIXI.Point(Math.floor(pos.x), Math.floor(pos.y));
    }
}
