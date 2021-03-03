export enum AppModelEvent {
  stateUpdate = "AppModelStateUpdate",
  resultUpdate = "AppModelResultUpdate",
  pausedUpdate = "AppModelPausedUpdate",
  mutedUpdate = "AppModelMutedUpdate",
  retriesUpdate = "AppModelRetriesUpdate",
}

export enum ResultModelEvent {
  stateUpdate = "ResultModelStateUpdate",
  delayUpdate = "ResultModelDelayUpdate",
}

export enum SuperAppModelEvent {
  pausedUpdate = "SuperAppModelPausedUpdate",
  mutedUpdate = "SuperAppModelMutedUpdate",
}

export enum ActorModelEvent {
  configUpdate = "ActorModelConfigUpdate",
  stateUpdate = "ActorModelStateUpdate",
  posXUpdate = "ActorModelPosXUpdate",
  failReasonUpdate = "ActorModelFailReasonUpdate",
}

export enum ActorsetModelEvent {
  actorsUpdate = "ActorsetModelActorsUpdate",
}

export enum FinishLineModelEvent {
  stateUpdate = "FinishLineModelStateUpdate",
  distanceUpdate = "FinishLineModelDistanceUpdate",
}

export enum GameModelEvent {
  hintUpdate = "GameModelHintUpdate",
  configUpdate = "GameModelConfigUpdate",
  stateUpdate = "GameModelStateUpdate",
  actorsetUpdate = "GameModelActorsetUpdate",
  obstaclesetUpdate = "GameModelObstaclesetUpdate",
  startLineUpdate = "GameModelStartLineUpdate",
}

export enum HintModelEvent {
  visibleUpdate = "HintModelVisibleUpdate",
}

export enum MetrixModelEvent {
  startUpdate = "MetrixModelStartUpdate",
  finishUpdate = "MetrixModelFinishUpdate",
}

export enum ObstacleModelEvent {
  configUpdate = "ObstacleModelConfigUpdate",
  stateUpdate = "ObstacleModelStateUpdate",
}

export enum ObstaclesetModelEvent {
  obstaclesUpdate = "ObstaclesetModelObstaclesUpdate",
}

export enum StartLineModelEvent {
  distanceUpdate = "StartLineModelDistanceUpdate",
}

export enum ObservableModelEvent {
  uuidUpdate = "ObservableModelUuidUpdate",
}

export enum StoreEvent {
  superAppUpdate = "StoreSuperAppUpdate",
  appUpdate = "StoreAppUpdate",
  gameUpdate = "StoreGameUpdate",
}
