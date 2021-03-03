type ButtonConfig = {
    input?: ButtonInputConfig;
    states?: ButtonStatesConfig;
};

type ButtonInputConfig = {
    name?: string;
    area?: PIXI.IHitArea;
};

type ButtonStatesConfig = {
    up?: ButtonStateConfig;
    down?: ButtonStateConfig;
    disable?: ButtonStateConfig;
};

type ButtonStateConfig = {
    bg?: SpriteConfig | NineSliceConfig;
    label?: SpriteConfig;
};

type ButtonState = PIXI.Container;

type ButtonStateKey = 'up' | 'down' | 'disable';

type ButtonStates = {
    up: ButtonState;
    down: ButtonState;
    disable: ButtonState;
};

type SpriteConfig = {
    texture: string;
    tint?: number;
    scale?: PIXI.Point;
    anchor?: PIXI.Point;
    position?: PIXI.Point;
};

type NineSliceConfig = {
    texture: string;
    data: number[];
    width: number;
    height: number;
    tint?: number;
    scale?: PIXI.Point;
    pivot?: PIXI.Point;
    position?: PIXI.Point;
};

type TextConfig = {
    text: string;
    anchor?: PIXI.Point;
    style?: PIXI.TextStyle;
    position?: PIXI.Point;
};

type BitmapTextConfig = {
    basepath: string;
    spacing: number;
};

type ParticleConfig = {
    data: PIXI.particles.core.ParticleEffectConfig;
    scale?: PIXI.Point;
    position?: PIXI.Point;
};

type AnimationConfig = {
    frames: string[];
    speed?: number;
    loop?: boolean;
    scale?: PIXI.Point;
    anchor?: PIXI.Point;
    position?: PIXI.Point;
};

type SpineConfig =
    | PIXI.spine.core.SkeletonData
    | {
          skeleton: PIXI.spine.core.SkeletonData;
          position?: PIXI.Point;
          scale?: PIXI.Point;
          speed?: number;
      };

type TweenConfig = PIXI.tween.TweenVars;

type GameConfig = {
    actorset: ActorsetConfig;
    obstacleset: ObstaclesetConfig;
    metrix: MetrixConfig;
};

// ACTORS
type ActorsetConfig = {
    actors: ActorConfig[];
};

type ActorConfig = {
    model: ActorModelConfig;
    view: ActorViewConfig;
};

type ActorModelConfig = {
    id: import('../../models/game/actor-model').ActorID;
    timing: {
        revive: number;
    };
};

type ActorViewConfig = {
    content: new (
        uuid: string,
        config: ActorContentConfig,
    ) => import('../../views/actors/actor-view-abstract').ActorViewAbstract;
    config: ActorContentConfig;
};

// OBSTACLES
type ObstaclesetConfig = {
    obstacles: ObstacleConfig[];
};

type ObstacleConfig = {
    model: ObstacleModelConfig;
    view: ObstacleViewConfig;
};

type ObstacleModelConfig = {
    reviveOffset: number;
};

type ObstacleViewConfig = {
    content: new (
        uuid: string,
        config: ObstacleContentConfig,
    ) => import('../../views/obstacles/obstacle-view-abstract').ObstacleViewAbstract;
    config: ObstacleContentConfig;
};

type ObstacleContentConfig = {
    position: { x: number; y: number; z: number };
    area: PIXI.Polygon;
};

type ActorContentConfig = {
    position: { x: number; y: number; z: number };
    area: PIXI.Circle;
    speed: number;
};

// METRIX
type MetrixConfig = {
    start: number;
    finish: number;
};

type ObstacleID = string;
