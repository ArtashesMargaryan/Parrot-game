import { lego } from "@armathai/lego";
import { ISO_ANGLE } from "../constants/constants";
import { ActorsetView } from "./actorset-view";
import { BgView } from "./bg-view";
import { CameraView } from "./camera-view";
import { HintView } from "./hint-view";
import { ObstaclesetView } from "./obstacleset-view";
import { StartLineView } from "./start-line-view";

export class GameView extends PIXI.Container {
  public name = "GameView";
  private _hint: HintView;
  private _actorset: ActorsetView;
  private _obstacleset: ObstaclesetView;
  private _bgView: BgView;
  private _cameraActorView: CameraView;
  private _startLineView: StartLineView;
  private _finishLineView: FinishLineView;

  public constructor() {
    super();

    this.rotation = ISO_ANGLE;
    this.parentGroup = superApp.app.stage.game;
    this._build();
    lego.event;
    //   .on(GameModelEvent.stateUpdate, this._onGameStateUpdate, this)
    //   .on(GameModelEvent.hintUpdate, this._onHintUpdate, this)
    //   .on(GameModelEvent.actorsetUpdate, this._onActorsetUpdate, this)
    //   .on(GameModelEvent.obstaclesetUpdate, this._onObstaclesUpdate, this)
    //   .on(GameModelEvent.startLineUpdate, this._onStartLineUpdate, this);
  }

  //   public get actors(): ActorViewAbstract[] {
  //     return this._actorset.actors;
  //   }

  //   //   public get obstacles(): ObstacleViewAbstract[] {
  //   //     // return this._obstacleset.obstacles;
  //   //   }

  //   public getActor(actorID: ActorID): ActorViewAbstract {
  //     return this.actors.find((actor) => actor.uuid === actorID);
  //   }

  //   //   public getObstacle(obstacleID: ObstacleID): ObstacleViewAbstract {
  //   //     return this.obstacles.find((obstacle) => obstacle.uuid === obstacleID);
  //   //   }

  //   public destroy(option?: ContainerDestroyOptions): void {
  //     lego.event.removeListenersOf(this);
  //     super.destroy(option);
  //   }

  //   private _onHintUpdate(hint: unknown): void {
  //     hint ? this._buildHint() : this._destroyHint();
  //   }

  //   private _buildHint(): void {
  //     return;
  //     this.addChild((this._hint = new HintView()));
  //   }

  //   private _destroyHint(): void {
  //     this._hint.destroy({ children: true });
  //   }

  //   private _onActorsetUpdate(actorset: ActorsetModel): void {
  //     actorset ? (this._actorset = new ActorsetView(this)) : this._actorset.destroy();
  //   }

  //   private _onObstaclesUpdate(obstacleset: ObstaclesetModel): void {
  //     obstacleset ? (this._obstacleset = new ObstaclesetView(this)) : this._obstacleset.destroy();
  //   }

  //   private _onStartLineUpdate(startLine: StartLineModel): void {
  //     this.addChild((this._startLineView = new StartLineView(startLine.distance)));
  //   }

  //   private _onGameStateUpdate(state: GameState): void {
  //     switch (state) {
  //       case GameState.idle:
  //         this._build();
  //         break;
  //     }
  //     this._obstacleset = new ObstaclesetView(this);
  //   }

  private _build(): void {
    this._bgView = new BgView();

    this.addChildAt(this._bgView, 0);
  }
}
