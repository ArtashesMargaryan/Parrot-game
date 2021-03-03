import { bgItemClasses } from '../bg-config';
import { BgDebugger } from '../bg-debugger';
import { BgStrategyAbstract } from './bg-strategy-abstract';

export class AddItemsBgStrategy extends BgStrategyAbstract {
    private _target: PIXI.DisplayObject;

    public constructor(content: BgDebugger) {
        super(content);
    }

    public destroy(): void {
        this._cancelItemAddition();
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
                this._cancelItemAddition();
                break;
        }
    }

    public onToolsetItemClick(itemKey: string): void {
        this._startItemAddition(itemKey);
    }

    public onPointerMove(event: PIXI.InteractionEvent): void {
        if (!this._target) {
            return;
        }

        this._target.position.copyFrom(this._calculateItemPosition(event, this._target));
    }

    public onPointerUp(event: PIXI.InteractionEvent): void {
        if (!this._target) {
            return;
        }

        const copyTarget = this._copyTarget(this._target);
        this.content.addItem(copyTarget);
        this._target.position.copyFrom(this._calculateItemPosition(event, this._target));
    }

    public onItemUp(event: PIXI.InteractionEvent): void {
        void event;
    }

    public onItemDown(event: PIXI.InteractionEvent): void {
        void event;
    }

    private _startItemAddition(itemKey: string): void {
        this._target = new bgItemClasses[itemKey]();
        this.content.view.addChild(this._target);

        this.content.toolset.disableInputs();
    }

    private _cancelItemAddition(): void {
        if (this._target) {
            this._target.destroy();
            this._target = null;
        }

        this.content.toolset.enableInputs();
    }

    private _calculateItemPosition(event: PIXI.InteractionEvent, target: PIXI.DisplayObject): PIXI.Point {
        const pos = event.data.getLocalPosition(target.parent);

        return new PIXI.Point(Math.floor(pos.x), Math.floor(pos.y));
    }

    private _copyTarget(target: PIXI.DisplayObject): PIXI.DisplayObject {
        const itemKey = Object.keys(bgItemClasses).find((itemKey) => {
            if (target instanceof bgItemClasses[itemKey]) return itemKey;
        });

        const copyTarget = new bgItemClasses[itemKey]();
        copyTarget.position.copyFrom(target.position);
        copyTarget.scale.copyFrom(target.scale);

        return copyTarget;
    }
}
