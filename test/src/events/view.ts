export enum MainViewEvent {
    curtainComplete = 'MainViewEventCurtainComplete',
}

export enum CloseViewEvent {
    closeBtnClick = 'CloseViewEventCloseBtnClick',
}

export enum WinViewEvent {
    screenClick = 'WinViewEventScreenClick',
    claimBtnClick = 'WinViewEventClaimBtnClick',
    idleTime = 'WinViewEventIdleTime',
}

export enum LoseViewEvent {
    hideComplete = 'LoseViewEventHideComplete',
    retryBtnClick = 'LoseViewEventRetryBtnClick',
}

export enum ToolViewEvent {
    click = 'ToolViewEventClick',
    actionComplete = 'ToolViewEventActionComplete',
    lockSrcComplete = 'ToolViewEventLockSrcComplete',
    lockSrcReachedDest = 'ToolViewEventLockSrcReachedDest',
}

export enum ActorViewEvent {
    moveRequest = 'ActorViewEventMoveRequest',
    moveCancel = 'ActorViewEventMoveCancel',
}

export enum CollisionEvent {
    obstacleIntersect = 'CollisionEventObstacleIntersect',
    finishIntersect = 'CollisionEventFinishIntersect',
}

export enum CameraViewEvent {
    ready = 'CameraViewEventReady',
}
