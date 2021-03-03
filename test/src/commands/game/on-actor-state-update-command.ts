import { lego } from '@armathai/lego';
import { mainActorGuard } from '../../guards/main-actor-guard';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { reviveActorCommand } from './revive-actor-command';
import { startActorMoveCommand } from './start-actor-move-command';
import { stopActorMoveCommand } from './stop-actor-move-command';
import { successGameCommand } from './success-game-command';

export const onActorStateUpdateCommand = (newState: ActorState, oldState: ActorState, actorID: ActorID): void => {
    switch (newState) {
        case ActorState.initial:
            break;

        case ActorState.idle:
            lego.command
                //
                .payload(actorID)
                .execute(stopActorMoveCommand);
            break;

        case ActorState.move:
            lego.command
                //
                .payload(actorID)
                .execute(startActorMoveCommand);
            break;

        case ActorState.success:
            lego.command
                //
                .payload(actorID)
                .guard(mainActorGuard)
                .execute(successGameCommand)

                .payload(actorID)
                .execute(stopActorMoveCommand);
            break;

        case ActorState.fail:
            lego.command
                //
                .payload(actorID)
                .execute(stopActorMoveCommand)

                .payload(actorID)
                .execute(reviveActorCommand);
            break;
    }
};
