import { onResultStateUpdateCommand } from '../../commands/result/on-result-state-update-command';
import { ActorModelEvent, ResultModelEvent } from '../../events/model';

export const legoLoggerConfig = Object.freeze({ excludedEvents: [ActorModelEvent.posXUpdate] });
export const gameCommands = Object.freeze([
    {
        event: ResultModelEvent.stateUpdate,
        command: onResultStateUpdateCommand,
    },

    // ACTOR
    // {
    //     event: ActorModelEvent.stateUpdate,
    //     command: onActorStateUpdateCommand,
    // },
    // {
    //     event: ActorViewEvent.moveRequest,
    //     command: onActorViewMoveRequestCommand,
    // },
    // {
    //     event: ActorViewEvent.moveCancel,
    //     command: onActorViewMoveCancelCommand,
    // },
]);
