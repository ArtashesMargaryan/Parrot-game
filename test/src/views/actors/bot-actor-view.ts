import { lego } from '@armathai/lego';
import { ActorViewEvent } from '../../events/view';
import { ActorID, ActorState } from '../../models/game/actor-model';
import { ActorViewAbstract } from './actor-view-abstract';

export class BotActorView extends ActorViewAbstract {
    public name = 'BotActorView';

    public constructor(uuid: ActorID, config: ActorContentConfig) {
        super(uuid, config);
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
        this.position.posX = value;
    }

    protected build(): void {
        // build car component
    }

    private _setInitialState(): void {
        //
    }

    private _setIdleState(): void {
        lego.event.emit(ActorViewEvent.moveRequest, this.uuid);
    }

    private _startMoveState(): void {
        //
    }

    private _setFailState(): void {
        //
    }

    private _setSuccessState(): void {
        //
    }
}
