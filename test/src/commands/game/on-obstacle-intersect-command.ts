import { lego } from '@armathai/lego';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { setActorFailReasonCommand } from './set-actor-fail-reason-command';
import { setActorStateCommand } from './set-actor-state-command';

export const onObstacleIntersectCommand = (actorID: ActorID, obstacleID: ObstacleID): void => {
    lego.command
        //
        .payload(actorID, obstacleID)
        .execute(setActorFailReasonCommand)

        .payload(actorID, ActorState.fail)
        .execute(setActorStateCommand);
};
