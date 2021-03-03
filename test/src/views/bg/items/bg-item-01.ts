import { Images } from '../../../assets';

export class BgItem01 extends PIXI.Sprite {
    public constructor() {
        super(PIXI.Texture.from(Images['tree-01']));
    }
}
