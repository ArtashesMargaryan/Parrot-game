import { ObservableModel } from '../observable-model';
import { ActorID, ActorModel, ActorState } from './actor-model';

export class ActorsetModel extends ObservableModel {
    private _actors: ActorModel[] = null;

    public constructor(private _config: ActorsetConfig) {
        super('ActorsetModel');
        this.makeObservable();
    }

    public get actors(): ActorModel[] {
        return this._actors;
    }

    public initialize(): void {
        this._createActors();
    }

    public destroy(): void {
        this._actors.forEach((actor) => actor.destroy());
    }

    public setActorState(uuid: ActorID, state: ActorState): void {
        this.getActor(uuid).state = state;
    }

    public getActor(uuid: ActorID): ActorModel {
        return this._actors.find((actor) => actor.uuid === uuid);
    }

    private _createActors(): void {
        this._actors = this._config.actors.map((config) => new ActorModel(config));
        this._actors.forEach((actor) => actor.initialize());
    }
}
