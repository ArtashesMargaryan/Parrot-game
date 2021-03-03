import { ObservableModel } from '../observable-model';

export class MetrixModel extends ObservableModel {
    public constructor(private _config: MetrixConfig) {
        super('MetrixModel');
    }

    public get start(): number {
        return this._config.start;
    }

    public get finish(): number {
        return this._config.finish;
    }
}
