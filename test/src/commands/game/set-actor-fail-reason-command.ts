import { ActorID } from '../../models/game/actor-model';
import { store } from '../../models/store';

export const setActorFailReasonCommand = (actorID: ActorID, obstacleID: ObstacleID): void => {
    store.game.actorset.getActor(actorID).setFailReason({ obstacle: obstacleID });
};
