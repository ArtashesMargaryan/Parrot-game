export class ObservablePoint extends PIXI.Point {
    private _cb: () => void;
    private _scope: unknown;

    public constructor(cb: (...params: unknown[]) => void, scope: unknown, x?: number, y?: number) {
        super(x, y);
        this._cb = cb;
        this._scope = scope;
    }

    public set posX(value: number) {
        this.x = value;
        this._cb.call(this._scope, this.x, this.y);
    }

    public set posY(value: number) {
        this.y = value;
        this._cb.call(this._scope, this.x, this.y);
    }

    public set(x = 0, y = 0): this {
        super.set(x, y);
        this._cb.call(this._scope, x, y);

        return this;
    }
}
