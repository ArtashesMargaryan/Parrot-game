import { lego } from '@armathai/lego';
import { ResultState } from '../../models/app/result-model';
import { setResultStateCommand } from '../result/set-result-state-command';

export const failGameCommand = (): void => {
    lego.command
        //
        .payload(ResultState.fail)
        .execute(setResultStateCommand);
};
