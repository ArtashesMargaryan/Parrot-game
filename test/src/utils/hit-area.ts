export class HitArea implements PIXI.IHitArea {
    public constructor(private _rectangles: PIXI.Rectangle[] = []) {}

    public contains(x: number, y: number): boolean {
        return !!this._rectangles.find((rect) => rect.contains(x, y));
    }
}
