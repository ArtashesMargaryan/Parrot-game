import { SKEW_ANGLE } from '../../constants/constants';
import { CarActorView } from '../actors/car-actor-view';

const SCALE_MIN = 0.005;
class CameraDebugger extends PIXI.utils.EventEmitter {
    private _enabled = false;
    private _zoomMode = false;
    private _view: PIXI.DisplayObject;
    private _moveInterval: NodeJS.Timeout;
    private _zoomInterval: NodeJS.Timeout;
    private _actorView: CarActorView;

    public constructor() {
        super();

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'd') {
                this.enabled = !this._enabled;
            }
        });
    }

    public set enabled(value: boolean) {
        this._enabled = value;
        value ? this._enabledDebugger() : this._disabledDebugger();
    }

    public initialize(view: PIXI.Container, actorView: CarActorView): void {
        this._view = view;
        this._actorView = actorView;
    }

    private _enabledDebugger(): void {
        // this._actorView.removeMoveListeners();
        this._setListeners();
    }

    private _disabledDebugger(): void {
        // this._actorView.setMoveListeners();
        this._removeListeners();
        this._resetTransform();
    }

    private _setListeners(): void {
        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('keyup', this._onKeyUp);
    }

    private _removeListeners(): void {
        document.removeEventListener('keydown', this._onKeyDown);
        document.removeEventListener('keyup', this._onKeyUp);
    }

    private _resetTransform(): void {
        this._view.scale.set(1);
        this._view.y = superApp.app.appBounds.height / 2;
    }

    private _onKeyDown = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowRight':
                this._moveX(-5);
                break;
            case 'ArrowLeft':
                this._moveX(5);
                break;
            case 'ArrowUp':
                this._zoomMode ? this._zoom(0.005) : this._moveY(5);
                break;
            case 'ArrowDown':
                this._zoomMode ? this._zoom(-0.005) : this._moveY(-5);
                break;
            case 'z':
                this._zoomMode = !this._zoomMode;
                break;
        }
    };

    private _onKeyUp = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                clearInterval(this._moveInterval);
                clearInterval(this._zoomInterval);
                break;
            case 'z':
                this._zoomMode = false;
                break;
        }
    };

    private _moveX(value: number): void {
        clearInterval(this._moveInterval);
        this._moveInterval = setInterval(() => {
            this._view.pivot.x -= value;
        }, 0);
    }

    private _moveY(value: number): void {
        clearInterval(this._moveInterval);
        this._moveInterval = setInterval(() => {
            this._view.pivot.y -= value * Math.cos(SKEW_ANGLE);
            this._view.pivot.x -= value * Math.sin(SKEW_ANGLE);
        }, 0);
    }

    private _zoom(value: number): void {
        clearInterval(this._zoomInterval);
        this._zoomInterval = setInterval(() => {
            let { x, y } = this._view.scale;
            x = Math.max(x + value, SCALE_MIN);
            y = Math.max(y + value, SCALE_MIN);
            this._view.scale.set(x, y);
        }, 0);
    }
}

export const cameraDebugger = new CameraDebugger();
