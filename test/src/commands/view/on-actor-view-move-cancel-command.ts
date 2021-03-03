import { lego } from '@armathai/lego';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { setActorStateCommand } from '../game/set-actor-state-command';

export const onActorViewMoveCancelCommand = (actorID: ActorID): void => {
    lego.command
        //
        .payload(actorID, ActorState.idle)
        .execute(setActorStateCommand);
};
