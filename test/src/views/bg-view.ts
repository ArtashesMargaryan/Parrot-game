import { Images } from "../assets";
import { ISO_ANGLE, SKEW_ANGLE } from "../constants/constants";
import { TilingSprite } from "../utils/tiling-sprite";
import { bgItemClasses, getBgConfig } from "./bg/bg-config";
import { RoomComponent } from "./components/room-component";

const roomsConfigs = [
  { position: new PIXI.Point(-600, 100) },
  { position: new PIXI.Point(-400, 100) },
  { position: new PIXI.Point(-100, 100) },
  { position: new PIXI.Point(300, 100) },
  { position: new PIXI.Point(600, 100) },
  { position: new PIXI.Point(800, 100) },
  { position: new PIXI.Point(800, 100) },
];
export class BgView extends PIXI.Container {
  private _config: BgConfig = getBgConfig();
  private _tiles: TilingSprite[] = [];
  private _items: PIXI.DisplayObject[] = [];

  public constructor() {
    super();
    console.warn("hasa");

    this._build();
  }

  public static get centerY(): number {
    return (Math.cos(SKEW_ANGLE) * 1390) / 2;
  }

  private _build(): void {
    // return;

    this._buildbox();
  }

  private _buildbox(): void {
    roomsConfigs.forEach((roomConfig, index) => {
      const box = new RoomComponent();
      box.position.set(120 * index + 80, 110);
      this.addChild(box);
    });
  }

  // BUILD
  private _buildTiles(): void {
    const { tiles: tilesConfig } = this._config;

    Object.keys(tilesConfig).forEach((key) => {
      const tiles = tilesConfig[key];
      tiles.forEach((tileConfig) => {
        const tile = this._createTile(key, tileConfig);
        this.addChild(tile);
      });
    });
  }

  private _buildItems(): void {
    const { items: itemsConfig } = this._config;
    Object.keys(itemsConfig).forEach((key) => {
      const items = itemsConfig[key];
      items.forEach((itemConfig) => {
        const item = this._createItem(key, itemConfig);
        this._items.push(item);
      });
    });

    this._sortItems();
  }

  private _createTile(tileKey: string, tileConfig: BgTileConfig): TilingSprite {
    const { x, y, width, height, skew } = tileConfig;
    const tile = new TilingSprite(PIXI.Texture.from(Images[tileKey as keyof typeof Images]), width, height);
    tile.skew.set(SKEW_ANGLE + skew.x, skew.y);
    tile.y = y * Math.cos(SKEW_ANGLE);
    tile.x = x + tile.y * Math.tan(SKEW_ANGLE);
    return tile;
  }

  private _createItem(itemKey: string, itemConfig: BgItemConfig): PIXI.DisplayObject {
    const { x = 0, y = 0, scale = { x: 1, y: 1 } } = itemConfig;
    const itemObj = new bgItemClasses[itemKey]();

    itemObj.position.set(x, y);
    itemObj.scale.set(scale.x, scale.y);

    return itemObj;
  }

  private _sortItems(): void {
    const sorted = this._items.sort((a, b) => {
      const distanceB = b.x * Math.sin(ISO_ANGLE) + b.y * Math.cos(ISO_ANGLE);
      const distanceA = a.x * Math.sin(ISO_ANGLE) + a.y * Math.cos(ISO_ANGLE);
      return (distanceA - distanceB) / Math.abs(distanceA - distanceB);
    });
    sorted.forEach((el) => this.addChild(el));
  }
}
