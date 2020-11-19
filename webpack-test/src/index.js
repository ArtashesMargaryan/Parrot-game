import * as PIXI from 'pixi.js';
import { Box } from './box';

export class Game extends PIXI.Application {
    constructor() {
        super({
            backgroundColor: 0xcdcdcd,
            width: 800,
            height: 800,
        })


        document.body.appendChild(this.view);
        this.loadAssets()

    }

    loadAssets() {
        this.loader.add('box', 'assets/circle.png').load((loader, resources) => {
            this.createBox()
        });
    }

    createBox() {
        // this.textureButton = PIXI.Texture.fromImage('assets/button_disable.png');
        // this.button = new PIXI.Sprite(textureButton);
        // this.button.buttonMode = true;
        this.box = new Box(this)
        this.stage.addChild(this.box)
    }
}

new Game();


