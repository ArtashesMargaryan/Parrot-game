import { lego } from '@armathai/lego';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { FinishLineState } from '../../models/game/finish-line-model';
import { setActorStateCommand } from './set-actor-state-command';
import { setFinishLineStateCommand } from './set-finish-line-state-command';

export const onFinishIntersectCommand = (actorID: ActorID): void => {
    lego.command
        //
        .payload(FinishLineState.reached, actorID)
        .execute(setFinishLineStateCommand)

        .payload(actorID, ActorState.success)
        .execute(setActorStateCommand);
};
