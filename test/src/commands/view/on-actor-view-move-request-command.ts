import { lego } from '@armathai/lego';
import { hintModelGuard } from '../../guards/hint-model-guard';
import { mainActorGuard } from '../../guards/main-actor-guard';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { setActorStateCommand } from '../game/set-actor-state-command';
import { destroyHintModelCommand } from '../hint/destroy-hint-model-command';

export const onActorViewMoveRequestCommand = (actorID: ActorID): void => {
    lego.command
        //
        .payload(actorID)
        .guard(mainActorGuard, hintModelGuard)
        .execute(destroyHintModelCommand)

        .payload(actorID, ActorState.move)
        .execute(setActorStateCommand);
};
