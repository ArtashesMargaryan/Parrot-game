import { ObservableModel } from '../observable-model';

export enum ObstacleState {
    unknown = 'unknown',
    idle = 'idle',
}

export class ObstacleModel extends ObservableModel {
    private _state: ObstacleState = ObstacleState.unknown;

    public constructor(private _config: ObstacleConfig) {
        super('ObstacleModel');
        this.makeObservable();
    }

    public get config(): ObstacleConfig {
        return this._config;
    }

    public get state(): ObstacleState {
        return this._state;
    }

    public set state(value: ObstacleState) {
        this._state = value;
    }

    public initialize(): void {
        this._state = ObstacleState.idle;
    }
}
