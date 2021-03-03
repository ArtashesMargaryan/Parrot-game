import { ActorID, ActorState } from '../../models/game/actor-model';
import { store } from '../../models/store';

export const setActorStateCommand = (uuid: ActorID, state: ActorState): void => {
    store.game.actorset.setActorState(uuid, state);
};
