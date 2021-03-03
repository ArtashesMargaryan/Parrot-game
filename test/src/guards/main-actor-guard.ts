import { ActorID } from '../models/game/actor-model';

export function mainActorGuard(actorID: ActorID): boolean {
    return actorID === ActorID.car;
}
