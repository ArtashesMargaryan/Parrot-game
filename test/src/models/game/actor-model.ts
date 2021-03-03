import { SKEW_ANGLE } from '../../constants/constants';
import { delayRunnable, loopRunnable, removeRunnable } from '../../utils';
import { ObservableModel } from '../observable-model';

type ActorFailReason = { obstacle: ObstacleID };

export enum ActorState {
    unknown = 'unknown',
    initial = 'initial',
    idle = 'idle',
    move = 'move',
    success = 'success',
    fail = 'fail',
}

export enum ActorID {
    car = 'car',
    bot1 = 'bot-1',
    bot2 = 'bot-2',
}

export class ActorModel extends ObservableModel {
    private _state: ActorState = ActorState.unknown;
    private _speed: number = null;
    private _posX: number = null;
    private _moveRunnable: Runnable;
    private _reviveRunnable: Runnable;
    private _failReason: ActorFailReason = null;

    public constructor(private _config: ActorConfig) {
        super('ActorModel', _config.model.id);
        this.makeObservable();
    }

    public get config(): ActorConfig {
        return this._config;
    }

    public get state(): ActorState {
        return this._state;
    }

    public set state(value: ActorState) {
        this._state = value;
    }

    public set posX(value: number) {
        this._posX = value;
    }

    public get posX(): number {
        return this._posX;
    }

    public get failReason(): ActorFailReason {
        return this._failReason;
    }

    public initialize(): void {
        const { speed, position } = this.config.view.config;

        this._state = ActorState.initial;

        this._posX = position.x + position.y * Math.tan(SKEW_ANGLE);
        this._speed = speed;
    }

    public destroy(): void {
        removeRunnable(this._moveRunnable);
    }

    public setFailReason(reason: ActorFailReason): void {
        this._failReason = reason;
    }

    public revive(distance: number): void {
        this._reviveRunnable = delayRunnable(this._config.model.timing.revive, this._revive, this, distance);
    }

    public startMove(): void {
        this._moveRunnable = loopRunnable(0, this._move, this);
    }

    public stopMove(): void {
        removeRunnable(this._moveRunnable);
        removeRunnable(this._reviveRunnable);
    }

    private _move(): void {
        this.posX += this._speed;
    }

    private _revive(distance: number): void {
        this._posX = distance + this.config.view.config.position.y * Math.tan(SKEW_ANGLE);
        this._state = ActorState.idle;
    }
}
