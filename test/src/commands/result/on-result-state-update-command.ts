import { lego } from '@armathai/lego';
import { ResultState } from '../../models/app/result-model';
import { ActorID } from '../../models/game/actor-model';
import { startCompletionTimerCommand } from '../app/start-completion-timer-command';
import { stopActorMoveCommand } from '../game/stop-actor-move-command';
import { unmapGameCommandsCommand } from '../lego/unmap-game-commands-command';

export const onResultStateUpdateCommand = (state: ResultState): void => {
    switch (state) {
        case ResultState.success:
        case ResultState.fail:
            lego.command
                //
                .execute(unmapGameCommandsCommand)

                .execute(startCompletionTimerCommand)

                .payload(ActorID.car)
                .execute(stopActorMoveCommand);
            break;
    }
};
