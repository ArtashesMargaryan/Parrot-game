import { lego } from '@armathai/lego';
import { AppEvent } from '../../events/app';
import { ActorModelEvent, AppModelEvent, SuperAppModelEvent } from '../../events/model';
import { SuperAppEvent } from '../../events/super-app';
import { ActorViewEvent, CameraViewEvent, CollisionEvent, MainViewEvent } from '../../events/view';
import { WindowEvent } from '../../events/window';
import { initializeAppModelCommand } from '../app/initialize-app-model-command';
import { onAppReadyCommand } from '../app/on-app-ready-command';
import { onAppResizeCommand } from '../app/on-app-resize-command';
import { onAppStateUpdateCommand } from '../app/on-app-state-update-command';
import { onAppVisibilityChangeCommand } from '../app/on-app-visibility-change-command';
import { onActorStateUpdateCommand } from '../game/on-actor-state-update-command';
import { onFinishIntersectCommand } from '../game/on-finish-intersect-command';
import { onObstacleIntersectCommand } from '../game/on-obstacle-intersect-command';
import { initializeSuperAppModelCommand } from '../superapp/initialize-super-app-model-command';
import { onSuperAppMuteCommand } from '../superapp/on-super-app-mute-command';
import { onSuperAppMutedUpdateCommand } from '../superapp/on-super-app-muted-update-command';
import { onSuperAppPauseCommand } from '../superapp/on-super-app-pause-command';
import { onSuperAppPausedUpdateCommand } from '../superapp/on-super-app-paused-update-command';
import { onSuperAppResumeCommand } from '../superapp/on-super-app-resume-command';
import { onSuperAppUnmuteCommand } from '../superapp/on-super-app-unmute-command';
import { onActorViewMoveCancelCommand } from '../view/on-actor-view-move-cancel-command';
import { onActorViewMoveRequestCommand } from '../view/on-actor-view-move-request-command';
import { onCameraViewReadyCommand } from '../view/on-camera-view-ready-command';
import { onMainViewCurtainCommand } from '../view/on-main-view-curtain-command';
import { createObservancesCommand } from './create-observances-command';

export const onAppInitCommand = (): void => {
    lego.command
        //
        .once(AppEvent.ready, onAppReadyCommand)
        .on(AppEvent.resize, onAppResizeCommand)

        .on(SuperAppEvent.pause, onSuperAppPauseCommand)
        .on(SuperAppEvent.resume, onSuperAppResumeCommand)
        .on(SuperAppEvent.mute, onSuperAppMuteCommand)
        .on(SuperAppEvent.unmute, onSuperAppUnmuteCommand)
        .on(SuperAppModelEvent.pausedUpdate, onSuperAppPausedUpdateCommand)
        .on(SuperAppModelEvent.mutedUpdate, onSuperAppMutedUpdateCommand)

        .on(AppModelEvent.stateUpdate, onAppStateUpdateCommand)

        .on(MainViewEvent.curtainComplete, onMainViewCurtainCommand)
        .on(WindowEvent.visibilityChange, onAppVisibilityChangeCommand)

        .on(CollisionEvent.obstacleIntersect, onObstacleIntersectCommand)
        .on(CollisionEvent.finishIntersect, onFinishIntersectCommand)
        .on(ActorModelEvent.stateUpdate, onActorStateUpdateCommand)
        .on(ActorViewEvent.moveRequest, onActorViewMoveRequestCommand)
        .on(ActorViewEvent.moveCancel, onActorViewMoveCancelCommand)
        .on(CameraViewEvent.ready, onCameraViewReadyCommand)

        .execute(initializeSuperAppModelCommand)
        .execute(createObservancesCommand)
        .execute(initializeAppModelCommand);
};
