import { ActorID } from '../../../models/game/actor-model';
import { CarActorView } from '../../../views/actors/car-actor-view';
import { CommonObstacleView } from '../../../views/obstacles/common-obstacle-view';

export const getGameConfig = (): GameConfig => {
    return {
        metrix: {
            start: 100,
            finish: 1400,
        },

        actorset: {
            actors: [
                {
                    model: {
                        id: ActorID.car,
                        timing: {
                            revive: 1,
                        },
                    },
                    view: {
                        content: CarActorView,
                        config: {
                            speed: 10,
                            position: { x: 0, y: 0, z: 0 },
                            area: new PIXI.Circle(0, 0, 50),
                        },
                    },
                },
                /*  {
                    model: {
                        id: ActorID.bot1,
                        timing: {
                            revive: 1,
                        },
                    },
                    view: {
                        content: BotActorView,
                        config: {
                            speed: 4,
                            position: { x: 0, y: -120, z: 0 },
                            area: new PIXI.Circle(0, 0, 50),
                        },
                    },
                },
                {
                    model: {
                        id: ActorID.bot2,
                        timing: {
                            revive: 1,
                        },
                    },
                    view: {
                        content: BotActorView,
                        config: {
                            speed: 9,
                            position: { x: 0, y: 120, z: 0 },
                            area: new PIXI.Circle(0, 0, 50),
                        },
                    },
                }, */
            ],
        },

        obstacleset: {
            obstacles: [
                {
                    model: {
                        reviveOffset: -300,
                    },
                    view: {
                        content: CommonObstacleView,
                        config: {
                            position: { x: 400, y: -150, z: 0 },
                            area: new PIXI.Polygon([
                                new PIXI.Point(0, 0),
                                new PIXI.Point(100, 100),
                                new PIXI.Point(100, 200),
                                new PIXI.Point(0, 300),
                                new PIXI.Point(-100, 200),
                                new PIXI.Point(-100, 100),
                            ]),
                        },
                    },
                },

                {
                    model: {
                        reviveOffset: -300,
                    },
                    view: {
                        content: CommonObstacleView,
                        config: {
                            position: { x: 1000, y: -100, z: 0 },
                            area: new PIXI.Polygon([
                                new PIXI.Point(0, 0),
                                new PIXI.Point(100, 200),
                                new PIXI.Point(-100, 200),
                            ]),
                        },
                    },
                },
            ],
        },
    };
};
