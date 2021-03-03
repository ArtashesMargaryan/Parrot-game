import { ObservableModel } from "../observable-model";
import { ActorsetModel } from "./actorset-model";
import { FinishLineModel } from "./finish-line-model";
import { HintModel } from "./hint-model";
import { ObstaclesetModel } from "./obstacleset-model";
import { StartLineModel } from "./start-line-model";

export enum GameState {
  unknown = "unknown",
  idle = "idle",
  reject = "reject",
  resolve = "resolve",
}

export class GameModel extends ObservableModel {
  private _hint: HintModel = null;
  private _state: GameState = GameState.unknown;
  private _actorset: ActorsetModel = null;
  private _obstacleset: ObstaclesetModel = null;
  private _finishLine: FinishLineModel = null;
  private _startLine: StartLineModel = null;

  public constructor(private _config: GameConfig) {
    super("GameModel");

    this.makeObservable();
  }

  public get hint(): HintModel {
    return this._hint;
  }

  public get config(): GameConfig {
    return this._config;
  }

  public get state(): GameState {
    return this._state;
  }

  public set state(value: GameState) {
    this._state = value;
  }

  public get actorset(): ActorsetModel {
    return this._actorset;
  }

  public get obstacleset(): ObstaclesetModel {
    return this._obstacleset;
  }

  public get startLine(): StartLineModel {
    return this._startLine;
  }

  public initialize(): void {
    // this._actorset = new ActorsetModel(this._config.actorset);
    // this._actorset.initialize();
    // this._obstacleset = new ObstaclesetModel(this._config.obstacleset);
    // this._obstacleset.initialize();
    // this._startLine = new StartLineModel(this.config.metrix.start);
    // this._startLine.initialize();
    // this._state = GameState.idle;
  }

  public destroy(): void {
    // this._actorset.destroy();
    // this._actorset = null;
    // this._obstacleset.destroy();
    // this._obstacleset = null;
  }

  public initializeHintModel(): void {
    // this._hint = new HintModel();
    // this._hint.initialize();
  }

  public destroyHintModel(): void {
    // this._hint.destroy();
    // this._hint = null;
  }
}
