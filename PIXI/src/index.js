// Import Application class that is the main part of our PIXI project
import * as PIXI from 'pixi.js'

export class Game extends PIXI.Application {
	constructor() {
		super({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x1099bb,
		})
		this.view.interactive = true;
		this.width = window.screen.width;
		this.height = window.screen.height;

		document.body.appendChild(this.view)
		this.loadAssets()
	}

	loadAssets() {
		this.loader
		//.add("tankSpriate", '/assets/tank.png')
		this.loader.load(() => {
			this.creatElements()
			this.stvolMove()
			this.tankMove()
		})
	}

	creatElements() {
		this.contanierTank = new PIXI.Container()
		this.contanierTank.position.set(350, 350)

		this.body = new PIXI.Graphics();
		this.body.lineStyle(4, 0xff3300, 1);
		this.body.beginFill(0xFFCC5A, 1)
		this.body.drawRect(-40, -70, 80, 140);

		const circle = new PIXI.Graphics();
		circle.lineStyle(4, 0x22ff88, 1)
		circle.beginFill(0x35CC5A)
		circle.drawCircle(0, 0, 25)

		this.stvol = new PIXI.Graphics();
		this.stvol.lineStyle(4, 0xaa3300, 1);
		this.stvol.beginFill(0xFF3300)
		this.stvol.drawRect(-5, -80, 10, 80);

		this.contanierTank.addChild(this.body);
		this.contanierTank.addChild(this.stvol);
		this.contanierTank.addChild(circle);

		this.stage.addChild(this.contanierTank);
	}

	stvolMove() {
		const direction = 1
		this.view.addEventListener('mousemove', e => {
			let a = e.clientX;
			console.warn(this.stvol.parent);
			let b = e.clientY;
			this.stvol.rotation += Math.PI / 8

		})
	}
	tankMove() {
		let stv = 1
		window.addEventListener('keydown', key => {
			//console.warn(key.code);
			let keypress = key.code;
			if ((key.code == 'KeyW') || (keypress == 'ArrowUp')) {
				if (stv == 3) {
					this.contanierTank.rotation += Math.PI
					stv = 1
				} else if (stv == 2) {
					stv = 1
					this.contanierTank.rotation -= Math.PI / 2
				} else if (stv == 4) {
					stv = 1
					this.contanierTank.rotation += Math.PI / 2
				}
				this.contanierTank.y -= 5
			}
			if ((keypress == 'KeyS') || (keypress == 'ArrowDown')) {
				this.contanierTank.y += 5
				if (stv == 1) {
					this.contanierTank.rotation += Math.PI
					stv = 3
				} else if (stv == 2) {
					this.contanierTank.rotation += Math.PI / 2
					stv = 3
				} else if (stv == 4) {
					this.contanierTank.rotation -= Math.PI / 2
					stv = 3
				}
			}
			if ((keypress == 'KeyA') || (keypress == 'ArrowLeft')) {
				if (stv == 1) {
					this.contanierTank.rotation -= Math.PI / 2
					stv = 4
				} else if (stv == 2) {
					this.contanierTank.rotation += Math.PI
					stv = 4
				} else if (stv == 3) {
					this.contanierTank.rotation += Math.PI / 2
					stv = 4
				}
				this.contanierTank.x -= 5
			}
			if ((keypress == 'KeyD') || (keypress == 'ArrowRight')) {
				if (stv == 3) {
					this.contanierTank.rotation -= Math.PI / 2
					stv = 2
				} else if (stv == 1) {
					this.contanierTank.rotation += Math.PI / 2
					stv = 2
				} else if (stv == 4) {
					this.contanierTank.rotation -= Math.PI
					stv = 2
				}
				this.contanierTank.x += 10
			}
		})
	}
}



new Game();























































































// // Load the logo
// app.loader.add('Basketball', './assets/basketball.png')
// app.loader.add('logo', './assets/logo.png')
// app.loader.load(() => {
// 	const spriteLogo = PIXI.Sprite.from('logo');
// 	const spriteBasketball = PIXI.Sprite.from('Basketball');


// 	spriteLogo.anchor.set(0.5) // We want to rotate our spriteLogo relative to the center, so 0.5
// 	//app.stage.addChild(spriteLogo)
// 	app.stage.addChild(spriteBasketball)


// 	// Position the spriteLogo at the center of the stage
// 	spriteLogo.x = app.screen.width * 0.5
// 	spriteLogo.y = app.screen.height * 0.5

// 	// Put the rotating function into the update loop
// 	app.ticker.add(delta => {
// 		spriteLogo.rotation += 0.005 * delta
// 	})
// })