import { lego } from '@armathai/lego';
import { ObstacleState } from '../../models/game/obstacle-model';
import { ObservablePoint } from '../../utils/observable-point';
import { BgView } from '../bg-view';

export abstract class ObstacleViewAbstract extends PIXI.Container {
    public position: ObservablePoint;
    private _shape: PIXI.Polygon;

    public constructor(public uuid: ObstacleID, protected config: ObstacleContentConfig) {
        super();
    }

    public get shape(): PIXI.Polygon {
        return this._shape;
    }

    public destroy(option?: ContainerDestroyOptions): void {
        lego.event.removeListenersOf(this);
        super.destroy(option);
    }

    public initialize(): void {
        const { position, area } = this.config;

        this.zIndex = position.z;
        this._shape = area.clone();
        this.position = new ObservablePoint(this._onPositionChange, this);
        this.position.set(position.x, BgView.centerY + position.y);

        this.build();

        const gr = new PIXI.Graphics();
        gr.beginFill(0x009127);
        gr.drawShape(area);
        gr.endFill();
        this.addChild(gr);
    }

    private _onPositionChange(x: number, y: number): void {
        super.position.set(x, y);

        this.shape.points.forEach((pt, i) => {
            this.shape.points[i] = this.config.area.points[i];

            if (i % 2 === 0) {
                this.shape.points[i] += this.x;
            } else {
                this.shape.points[i] += this.y;
            }
        });
    }

    public abstract setState(newState: ObstacleState, oldState: ObstacleState): void;

    protected abstract build(): void;
}
