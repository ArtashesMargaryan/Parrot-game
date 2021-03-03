export class RoomComponent extends PIXI.Container {
  public constructor() {
    super();
    this._build();
  }

  private _build(): void {
    const gr = new PIXI.Graphics();
    gr.beginFill(0x11aadd);
    gr.drawRect(0, 0, 100, 80);
    gr.endFill();
    this.addChild(gr);
    console.warn("hasa");
  }
}
