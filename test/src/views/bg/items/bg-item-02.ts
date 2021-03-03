import { Images } from '../../../assets';

export class BgItem02 extends PIXI.Sprite {
    public constructor() {
        super(PIXI.Texture.from(Images['tree-02']));
    }
}
