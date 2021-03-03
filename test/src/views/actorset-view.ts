import { lego } from '@armathai/lego';
import { ActorModelEvent, ActorsetModelEvent } from '../events/model';
import { ActorID, ActorModel, ActorState } from '../models/game/actor-model';
import { ActorViewAbstract } from './actors/actor-view-abstract';

export class ActorsetView {
    private _actors: ActorViewAbstract[];
    private _onPosXUpdate: (newValue: number, oldValue: number, uuid: ActorID) => void;

    public constructor(private _parent: PIXI.Container) {
        lego.event
            .on(ActorsetModelEvent.actorsUpdate, this._onActorsUpdate, this)
            .on(ActorModelEvent.stateUpdate, this._onActorStateUpdate, this)
            .on(ActorModelEvent.posXUpdate, this._onActorPosXUpdate, this);
    }

    public get actors(): ActorViewAbstract[] {
        return this._actors;
    }

    public destroy(): void {
        lego.event.removeListenersOf(this);
        this._actors.forEach((actor) => actor.destroy({ children: true }));
    }

    private _onActorsUpdate(newValue: ActorModel[]): void {
        this._actors = newValue.map((actor) => {
            const { view } = actor.config;
            const actorView = new view.content(actor.uuid, view.config);
            actorView.initialize();

            return this._parent.addChild(actorView);
        });

        this._parent.sortChildren();

        this._initializePosXUpdateFunction();
    }

    private _initializePosXUpdateFunction(): void {
        this._onPosXUpdate =
            this._actors.length > 1
                ? (newValue: number, oldValue: number, uuid: ActorID) => {
                      this._getActor(uuid).onPosXUpdate(newValue);
                  }
                : (newValue: number) => {
                      this._actors[0].onPosXUpdate(newValue);
                  };
    }

    private _onActorStateUpdate(newValue: ActorState, oldValue: ActorState, uuid: ActorID): void {
        this._getActor(uuid).setState(newValue, oldValue);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private _onActorPosXUpdate(newValue: number, oldValue: number, uuid: ActorID): void {
        this._onPosXUpdate(newValue, oldValue, uuid);
    }

    private _getActor(uuid: ActorID): ActorViewAbstract {
        return this._actors.find((actor) => actor.uuid === uuid);
    }
}
