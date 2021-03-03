import { lego } from '@armathai/lego';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { ObservablePoint } from '../../utils/observable-point';
import { BgView } from '../bg-view';

export abstract class ActorViewAbstract extends PIXI.Container {
    public position: ObservablePoint;
    private _shape: PIXI.Circle;

    public constructor(public uuid: ActorID, private _config: ActorContentConfig) {
        super();
    }

    public get shape(): PIXI.Circle {
        return this._shape;
    }

    public get config(): ActorContentConfig {
        return this._config;
    }

    public destroy(option?: ContainerDestroyOptions): void {
        lego.event.removeListenersOf(this);
        super.destroy(option);
    }

    public initialize(): void {
        const { position, area } = this.config;

        this.zIndex = position.z;
        this._shape = area.clone();
        this.position = new ObservablePoint(this.onPositionChange, this, 0, position.y + BgView.centerY);

        this.build();

        const gr = new PIXI.Graphics();
        gr.beginFill(0xff0000);
        gr.drawShape(area);
        gr.endFill();
        this.addChild(gr);
    }

    protected onPositionChange(x: number, y: number): void {
        super.position.set(x, y);

        this._shape.x = this.x + this.config.area.x;
        this._shape.y = this.y + this.config.area.y;
    }

    public abstract setState(newState: ActorState, oldState: ActorState): void;

    public abstract onPosXUpdate(value: number): void;

    protected abstract build(): void;
}
