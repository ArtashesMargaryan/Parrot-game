import { BgDebugger } from '../bg-debugger';

export abstract class BgStrategyAbstract {
    public constructor(protected content: BgDebugger) {
        //
    }

    public abstract destroy(): void;
    public abstract onWheel(event: WheelEvent): void;
    public abstract onKeyDown(event: KeyboardEvent): void;
    public abstract onToolsetItemClick(itemKey: string): void;
    public abstract onPointerMove(event: PIXI.InteractionEvent): void;
    public abstract onPointerUp(event: PIXI.InteractionEvent): void;
    public abstract onItemUp(event: PIXI.InteractionEvent): void;
    public abstract onItemDown(event: PIXI.InteractionEvent): void;
}
