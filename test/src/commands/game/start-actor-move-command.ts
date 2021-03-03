import { ActorID } from '../../models/game/actor-model';
import { store } from '../../models/store';

export const startActorMoveCommand = (actorID: ActorID): void => {
    store.game.actorset.getActor(actorID).startMove();
};
