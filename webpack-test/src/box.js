import * as PIXI from 'pixi.js';

export class Box extends PIXI.Sprite {
    constructor(game) {
        super(PIXI.Texture.from('box'))

        this.screen = game.renderer.screen
        this.anchor.set(0.5, 0.5)
        this.x = game.renderer.width / 2
        this.y = game.renderer.height / 2

        this.activeRotation = Math.PI * 0.75
        this.moveSpeed = 10

        this.startMovement()
    }

    startMovement() {
        this.moveInterval = setInterval(this.moveBox.bind(this, this.activeRotation), 1000 / 60)
    }

    moveBox() {
        this.x += Math.cos(this.activeRotation) * this.moveSpeed
        this.y += Math.sin(this.activeRotation) * this.moveSpeed

        this.checkForCollision()

    }

    checkForCollision() {
        if (this.x > this.screen.width + this.screen.x - this.width / 2) {
            this.activeRotation = (Math.PI - this.activeRotation);
        } if (this.x < this.screen.x + (this.width / 2)) {
            this.activeRotation = Math.PI - this.activeRotation;
        } if (this.y > this.screen.height + this.screen.y - this.width / 2) {
            this.activeRotation = -this.activeRotation
        } if (this.y < this.screen.y + (this.height / 2)) {
            this.activeRotation = -this.activeRotation;
        }
    }
}

