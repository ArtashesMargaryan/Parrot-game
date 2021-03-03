import { ObservableModel } from '../observable-model';
import { ObstacleModel } from './obstacle-model';

export class ObstaclesetModel extends ObservableModel {
    private _obstacles: ObstacleModel[] = null;

    public constructor(private _config: ObstaclesetConfig) {
        super('ObstaclesetModel');
        this.makeObservable();
    }

    public get obstacles(): ObstacleModel[] {
        return this._obstacles;
    }

    public initialize(): void {
        this._createObstacles();
    }

    public getObstacle(uuid: ObstacleID): ObstacleModel {
        return this._obstacles.find((obstacle) => obstacle.uuid === uuid);
    }

    private _createObstacles(): void {
        this._obstacles = this._config.obstacles.map((config) => new ObstacleModel(config));
        this._obstacles.forEach((obstacle) => obstacle.initialize());
    }
}
