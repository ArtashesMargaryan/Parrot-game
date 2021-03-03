import { ActorID } from '../../models/game/actor-model';
import { store } from '../../models/store';

export const stopActorMoveCommand = (actorID: ActorID): void => {
    store.game.actorset.getActor(actorID).stopMove();
};
