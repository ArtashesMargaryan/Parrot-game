import * as PIXI from 'pixi.js';
export class Game extends PIXI.Application {
  constructor() {
    super();
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    this._loader();
    this._viewControler();
    document.body.appendChild(app.view);
  }

  _loader() {
    this.loader.add('title', 'assets/logo.png');
  }

  _viewControler() {
    if (this.pageWidth >= this.pageWidth) {
      this.builds('album');
    } else {
      this.builds('book');
    }
  }
}
