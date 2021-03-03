import { lego } from '@armathai/lego';
import { ResultModelEvent } from '../../events/model';
import { ActorViewEvent } from '../../events/view';
import { ResultState } from '../../models/app/result-model';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { ActorViewAbstract } from './actor-view-abstract';

type Interaction = PIXI.utils.EventEmitter;

export class CarActorView extends ActorViewAbstract {
    public static readonly moveEvent = 'moveEvent';
    public name = 'CarActorView';
    private _interaction: Interaction;

    public constructor(uuid: ActorID, config: ActorContentConfig) {
        super(uuid, config);

        lego.event.on(ResultModelEvent.stateUpdate, this._onResultStateUpdate, this);
    }

    public destroy(options?: ContainerDestroyOptions): void {
        lego.event.removeListenersOf(this);
        super.destroy(options);
    }

    public setState(newState: ActorState): void {
        switch (newState) {
            case ActorState.initial:
                this._setInitialState();
                break;
            case ActorState.idle:
                this._setIdleState();
                break;
            case ActorState.move:
                this._startMoveState();
                break;
            case ActorState.fail:
                this._setFailState();
                break;
            case ActorState.success:
                this._setSuccessState();
                break;
        }
    }

    public onPosXUpdate(value: number): void {
        this.position.set(value, this.y);
    }

    protected onPositionChange(x: number, y: number): void {
        super.onPositionChange(x, y);

        this.emit(CarActorView.moveEvent);
    }

    protected build(): void {
        this._interaction = superApp.app.renderer.plugins.interaction;
    }

    private _removeMoveListeners(): void {
        this._interaction.off('pointerdown', this._onDown, this);
        this._interaction.off('pointerup', this._onUp, this);
        this._interaction.off('pointerupoutside', this._onUp, this);
    }

    private _setMoveListeners(): void {
        this._removeMoveListeners();
        this._interaction.on('pointerdown', this._onDown, this);
        this._interaction.on('pointerup', this._onUp, this);
        this._interaction.on('pointerupoutside', this._onUp, this);
    }

    private _onResultStateUpdate(state: ResultState): void {
        switch (state) {
            case ResultState.success:
            case ResultState.fail:
                this._removeMoveListeners();
                break;
        }
    }

    private _setInitialState(): void {
        //
    }

    private _setIdleState(): void {
        this._setMoveListeners();
    }

    private _startMoveState(): void {
        //
    }

    private _setFailState(): void {
        this._removeMoveListeners();
    }

    private _setSuccessState(): void {
        this._removeMoveListeners();
    }

    private _onDown(): void {
        lego.event.emit(ActorViewEvent.moveRequest, this.uuid);
    }

    private _onUp(): void {
        lego.event.emit(ActorViewEvent.moveCancel, this.uuid);
    }
}
