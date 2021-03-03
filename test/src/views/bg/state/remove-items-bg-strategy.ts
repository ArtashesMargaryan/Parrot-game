import { BgDebugger } from '../bg-debugger';
import { BgStrategyAbstract } from './bg-strategy-abstract';

export class RemoveItemsBgStrategy extends BgStrategyAbstract {
    public constructor(content: BgDebugger) {
        super(content);
    }

    public destroy(): void {
        void 0;
    }

    public onWheel(event: WheelEvent): void {
        void event;
    }

    public onKeyDown(event: KeyboardEvent): void {
        void event;
    }

    public onToolsetItemClick(itemKey: string): void {
        void itemKey;
    }

    public onPointerMove(event: PIXI.InteractionEvent): void {
        void event;
    }

    public onPointerUp(event: PIXI.InteractionEvent): void {
        void event;
    }

    public onItemUp(event: PIXI.InteractionEvent): void {
        this.content.removeItem(event.target);
    }

    public onItemDown(event: PIXI.InteractionEvent): void {
        void event;
    }
}
