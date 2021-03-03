type BgConfig = {
    tiles: Record<string, BgTileConfig[]>;
    items: Record<string, BgItemConfig[]>;
};

type BgTileConfig = { x: number; y: number; width: number; height: number; skew: { x: number; y: number } };

type BgItemConfig = { x: number; y: number; scale?: { x: number; y: number } };

type BgItemClass = new () => PIXI.DisplayObject;
