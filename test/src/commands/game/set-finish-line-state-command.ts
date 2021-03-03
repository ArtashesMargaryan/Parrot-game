import { FinishLineState } from '../../models/game/finish-line-model';
import { store } from '../../models/store';

export const setFinishLineStateCommand = (state: FinishLineState): void => {
    store.game.finishLine.state = state;
};
