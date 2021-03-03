import { lego } from '@armathai/lego';
import { ResultState } from '../../models/app/result-model';
import { setResultStateCommand } from '../result/set-result-state-command';

export const successGameCommand = (): void => {
    lego.command
        //
        .payload(ResultState.success)
        .execute(setResultStateCommand);
};
