import items from './items-config.json';
import { BgItem01 } from './items/bg-item-01';
import { BgItem02 } from './items/bg-item-02';
import { BgItem03 } from './items/bg-item-03';

export const bgItemClasses: Record<string, new () => PIXI.DisplayObject> = {
    'item-01': BgItem01,
    'item-02': BgItem02,
    'item-03': BgItem03,
    'item-04': BgItem01,
    'item-05': BgItem02,
    'item-06': BgItem03,
};

export const getBgConfig = (): BgConfig => {
    return {
        tiles: {
            'bg-tile': [{ x: -490, y: 0, width: 3000, height: 1390, skew: { x: 0, y: 0 } }],
            'road-tile': [{ x: -490, y: 594, width: 3000, height: 203, skew: { x: 0, y: 0 } }],
        },
        items,
    };
};
