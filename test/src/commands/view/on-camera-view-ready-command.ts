import { lego } from '@armathai/lego';
import { resultUnknownGuard } from '../../guards/result-unknown-guard';
import { ActorState } from '../../models/game/actor-model';
import { setActorsStateCommand } from '../game/set-actors-state-command';
import { setHintVisibleCommand } from '../hint/set-hint-visible-command';

export const onCameraViewReadyCommand = (): void => {
    lego.command
        //

        .payload(true)
        .execute(setHintVisibleCommand)

        .payload(ActorState.idle)
        .guard(resultUnknownGuard)
        .execute(setActorsStateCommand);
};
