import { ActorModel, ActorState } from '../../models/game/actor-model';
import { store } from '../../models/store';

export const setActorsStateCommand = (state: ActorState): void => {
    store.game.actorset.actors.forEach((actor: ActorModel) => {
        actor.state = state;
    });
};
