import { lego } from "@armathai/lego";
import { AppEvent } from "../events/app";
import { CameraViewEvent } from "../events/view";
import { getDisplayObjectByProperty, lp } from "../utils";
import { CarActorView } from "./actors/car-actor-view";
import { BgView } from "./bg-view";

export class CameraView extends PIXI.Container {
  private _gameView: PIXI.DisplayObject;
  private _actorView: CarActorView;
  private _offset = new PIXI.Point(lp(200, 400), 0);
  private _tween: gsap.core.Timeline;
  private _finshPivot = new PIXI.Point();

  public constructor() {
    super();

    this._build();
    lego.event.on(AppEvent.resize, this._onResize, this);
  }

  private _build(): void {
    this._gameView = getDisplayObjectByProperty("name", "GameView");
    this._actorView = getDisplayObjectByProperty("name", "CarActorView") as CarActorView;
    this._actorView.on(CarActorView.moveEvent, this._followActor, this);
    this._onResize(superApp.app.appBounds);
    this._followActor();
    this._startZoomOut();
    this._finshPivot = this._gameView.pivot;
    if (process.env.NODE_ENV !== "production") {
      const { cameraDebugger } = require("./camera/camera-debugger");
      cameraDebugger.initialize(this._gameView, this._actorView);
    }
  }

  private _followActor(): void {
    this._gameView.pivot.set(this._actorView.x + this._offset.x, BgView.centerY + this._offset.y);
  }

  private _onResize(bounds: PIXI.Rectangle): void {
    if (this._tween) {
      this._tween.pause();
      // this._tween.restart();
      this._startZoomOut();

      //     console.warn(this._gameView.pivot.x);

      //     this._followActor();
      // this._startZoomOut(this._gameView.pivot.x);
    }
    // else {
    this._gameView.position.set(bounds.width / 2, bounds.height / 2);
    // this._followActor();
    // }
  }

  private _startZoomOut(startPivot = 0): void {
    const distance = 200;
    console.warn(this._gameView.pivot.x);
    console.warn(distance);
    if (startPivot === 0) {
      this._gameView.pivot.x = distance;
    } else {
      this._gameView.pivot.x;
    }
    this._tween = PIXI.tween
      .timeline({ universal: true })
      .add([
        // PIXI.tween.from(this._gameView, {
        //     pixi: { scale: 1.6 },
        //     duration: 0.8,
        //     ease: PIXI.tween.easePower1Out,
        // }),
        PIXI.tween.to(this._gameView, {
          pixi: { pivotX: this._finshPivot.x },
          duration: Math.abs(distance) * 0.001,
          delay: 0.5,
          ease: PIXI.tween.easeSineInOut,
        }),
      ])
      .addLabel("ready", "+=0.5")
      .add(() => {
        // this._followActor();
        lego.event.emit(CameraViewEvent.ready);
      }, "ready");
    // .progress(0.9);
  }
}
