import { lego } from '@armathai/lego';
import { HintModelEvent } from '../events/model';
import { getDisplayObjectByProperty } from '../utils';
import { HandComponent } from './components/hand-component';
import { GameView } from './game-view';

export class HintView extends HandComponent {
    public constructor() {
        super();

        this.visible = false;
        lego.event.on(HintModelEvent.visibleUpdate, this._onHintVisibleUpdate, this);
    }

    public destroy(option?: ContainerDestroyOptions): void {
        lego.event.removeListenersOf(this);
        super.destroy(option);
    }

    private _show(): void {
        const gameView = getDisplayObjectByProperty('name', 'GameView') as GameView;
        this.visible = true;
        this.position.copyFrom(gameView.pivot);
        this.play();
    }

    private _hide(): void {
        this.stop();
        this.visible = false;
    }

    private _onHintVisibleUpdate(visible: boolean): void {
        visible ? this._show() : this._hide();
    }
}
