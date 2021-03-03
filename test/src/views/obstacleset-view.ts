import { lego } from '@armathai/lego';
import { ObstacleModelEvent, ObstaclesetModelEvent } from '../events/model';
import { ObstacleModel, ObstacleState } from '../models/game/obstacle-model';
import { ObstacleViewAbstract } from './obstacles/obstacle-view-abstract';

export class ObstaclesetView {
    private _obstacles: ObstacleViewAbstract[] = [];

    public constructor(private _parent: PIXI.Container) {
        lego.event
            .on(ObstaclesetModelEvent.obstaclesUpdate, this._onObstaclesUpdate, this)
            .on(ObstacleModelEvent.stateUpdate, this._onObstacleStateUpdate, this);
    }

    public get obstacles(): ObstacleViewAbstract[] {
        return this._obstacles;
    }

    public destroy(): void {
        this._obstacles.forEach((obstacle) => obstacle.destroy({ children: true }));
        lego.event.removeListenersOf(this);
    }

    private _onObstaclesUpdate(newValue: ObstacleModel[]): void {
        this._obstacles = newValue.map((obstacle) => {
            const { view } = obstacle.config;
            const obstacleView = new view.content(obstacle.uuid, view.config);
            obstacleView.initialize();
            return this._parent.addChild(obstacleView);
        });
        this._parent.sortChildren();
    }

    private _onObstacleStateUpdate(newState: ObstacleState, oldState: ObstacleState, uuid: ObstacleID): void {
        this._getObstacle(uuid).setState(newState, oldState);
    }

    private _getObstacle(uuid: ObstacleID): ObstacleViewAbstract {
        return this._obstacles.find((obstacle) => obstacle.uuid === uuid);
    }
}
