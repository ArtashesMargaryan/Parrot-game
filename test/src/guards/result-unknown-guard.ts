import { ResultState } from '../models/app/result-model';
import { store } from '../models/store';

export function resultUnknownGuard(): boolean {
    return store.app.result.state === ResultState.unknown;
}
