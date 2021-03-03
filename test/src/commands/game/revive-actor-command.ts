import { ActorID } from '../../models/game/actor-model';
import { store } from '../../models/store';

export const reviveActorCommand = (actorID: ActorID): void => {
    const { actorset, obstacleset } = store.game;

    const actor = actorset.getActor(actorID);
    const obstacle = obstacleset.getObstacle(actor.failReason.obstacle);

    let distance = 0;

    if (obstacleset.obstacles.indexOf(obstacle) === 0) {
        distance = actor.config.view.config.position.x;
    } else {
        distance = obstacle.config.view.config.position.x + obstacle.config.model.reviveOffset;
    }

    actor.revive(distance);
};
