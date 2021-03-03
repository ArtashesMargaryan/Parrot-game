import { ObservableModel } from '../observable-model';

export enum FinishLineState {
    unknown = 'unknown',
    idle = 'idle',
    reached = 'reached',
}

export class FinishLineModel extends ObservableModel {
    private _state: FinishLineState = FinishLineState.unknown;

    public constructor(private _distance: number) {
        super('FinishLineModel');
        this.makeObservable();
    }

    public get state(): FinishLineState {
        return this._state;
    }

    public set state(value: FinishLineState) {
        this._state = value;
    }

    public get distance(): number {
        return this._distance;
    }

    public initialize(): void {
        this._state = FinishLineState.idle;
    }
}
