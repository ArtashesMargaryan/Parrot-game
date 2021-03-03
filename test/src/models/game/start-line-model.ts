import { ObservableModel } from '../observable-model';

export class StartLineModel extends ObservableModel {
    public constructor(private _distance: number) {
        super('StartLineModel');
    }

    public get distance(): number {
        return this._distance;
    }
}
