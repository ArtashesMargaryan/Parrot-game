import { lego } from "@armathai/lego";
import { polygonCircle } from "intersects";
import { SKEW_ANGLE } from "../constants/constants";
import { ActorModelEvent, GameModelEvent } from "../events/model";
import { CollisionEvent } from "../events/view";
import { ActorID, ActorState } from "../models/game/actor-model";
import { GameState } from "../models/game/game-model";
import { getDisplayObjectByProperty, loopRunnable, removeRunnable } from "../utils";
import { ActorViewAbstract } from "../views/actors/actor-view-abstract";
import { GameView } from "../views/game-view";
import { ObstacleViewAbstract } from "../views/obstacles/obstacle-view-abstract";

export class CollisionObservant {
  private _finishLine: number;
  private _gameView: GameView;
  private _actors: ActorViewAbstract[] = [];
  private _obstacles: ObstacleViewAbstract[] = [];
  private _collisionRunnable: Runnable;

  public constructor() {
    lego.event.on(GameModelEvent.stateUpdate, this._onGameStateUpdate, this);
    lego.event.on(ActorModelEvent.stateUpdate, this._onActorStateUpdate, this);
  }

  private _onGameStateUpdate(state: GameState): void {
    switch (state) {
      case GameState.idle:
        this._setCollisionGroups();
        break;
    }
  }

  private _onActorStateUpdate(newState: ActorState, oldState: ActorState, actorID: ActorID): void {
    switch (newState) {
      case ActorState.idle:
        if (oldState !== ActorState.move) {
          this._enableActorCollision(actorID);
        }
        break;
      case ActorState.success:
      case ActorState.fail:
        this._disableActorCollision(actorID);
        break;
    }
  }

  private _disableActorCollision(actorID: ActorID): void {
    this._actors.splice(this._actors.indexOf(this._getActor(actorID)), 1);
  }

  private _enableActorCollision(actorID: ActorID): void {
    this._actors.push(this._gameView.getActor(actorID));
  }

  private _setCollisionGroups(): void {
    this._gameView = getDisplayObjectByProperty("name", "GameView") as GameView;
    this._obstacles = [...this._gameView.obstacles];

    removeRunnable(this._collisionRunnable);
    this._collisionRunnable = loopRunnable(0, this._checkCollision, this);
  }

  private _checkCollision(): void {
    for (let i = 0; i < this._actors.length; i++) {
      const actor = this._actors[i];
      const { x: ax, y: ay, radius: ar } = actor.shape;

      for (let j = 0; j < this._obstacles.length; j++) {
        const obstacle = this._obstacles[j];
        const { points } = obstacle.shape;

        if (polygonCircle(points, ax, ay, ar)) {
          lego.event.emit(CollisionEvent.obstacleIntersect, actor.uuid, obstacle.uuid);
          j = this._obstacles.length - 1;
        }
      }

      if (ax > this._finishLine + actor.config.position.y * Math.tan(SKEW_ANGLE)) {
        lego.event.emit(CollisionEvent.finishIntersect, actor.uuid);
      }
    }
  }

  private _getActor(actorID: ActorID): ActorViewAbstract {
    return this._actors.find((actor) => actor.uuid === actorID);
  }
}
