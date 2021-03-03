import { getDisplayObjectByProperty } from '../../utils';
import { bgItemClasses } from './bg-config';
import { BgDebuggerToolset } from './bg-debugger-toolset';
import { AddItemsBgStrategy } from './state/add-items-bg-strategy';
import { BgStrategyAbstract } from './state/bg-strategy-abstract';
import { EmptyBgStrategy } from './state/empty-bg-strategy';
import { RemoveItemsBgStrategy } from './state/remove-items-bg-strategy';
import { UpdateItemsBgStrategy } from './state/update-items-bg-strategy';

export class BgDebugger {
    public view: PIXI.Container;
    public mainView: PIXI.DisplayObject;
    public items: PIXI.DisplayObject[];
    public toolset: BgDebuggerToolset;
    private _enabled = false;
    private _state: BgStrategyAbstract;

    public constructor() {
        this.mainView = getDisplayObjectByProperty('name', 'MainView');

        document.addEventListener('keydown', this._switchEnableKeydownHandler);
    }

    public set enabled(value: boolean) {
        this._enabled = value;
        value ? this._enabledDebugger() : this._disabledDebugger();
    }

    public set state(value: BgStrategyAbstract) {
        this._state && this._state.destroy();
        this._state = value;
    }

    public initialize(view: PIXI.Container, items: PIXI.DisplayObject[]): void {
        this.view = view;
        this.items = items;
    }

    public addItem(item: PIXI.DisplayObject): PIXI.DisplayObject {
        this.items.push(item);
        this.view.addChild(item);
        this._setItemListeners(item);

        return item;
    }

    public removeItem(item: PIXI.DisplayObject): void {
        this.items.splice(this.items.indexOf(item), 1);
        this.view.removeChild(item);
        this._removeItemListeners(item);
    }

    private _switchEnableKeydownHandler = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'd':
                this.enabled = !this._enabled;
                break;
        }
    };

    private _enabledDebugger(): void {
        this.state = new EmptyBgStrategy(this);
        this._buildToolset();
        this._setListeners();
    }

    private _disabledDebugger(): void {
        this.state = new EmptyBgStrategy(this);
        this._removeToolset();
        this._removeListeners();
    }

    private _setListeners(): void {
        document.addEventListener('wheel', this._onWheel);
        document.addEventListener('keydown', this._onKeydown);

        this.mainView.on('pointermove', this._onPointerMove, this);
        this.mainView.on('pointerup', this._onPointerUp, this);
        this.toolset.on('itemClick', this._onToolsetItemClick, this);

        this.items.forEach((item) => this._setItemListeners(item));
    }

    private _removeListeners(): void {
        document.removeEventListener('wheel', this._onWheel);
        document.removeEventListener('keydown', this._onKeydown);

        this.mainView.off('pointermove', this._onPointerMove, this);
        this.mainView.off('pointerup', this._onPointerUp, this);
        this.toolset.off('itemClick', this._onToolsetItemClick, this);

        this.items.forEach((item) => this._removeItemListeners(item));
    }

    private _setItemListeners(item: PIXI.DisplayObject): void {
        item.interactive = true;
        item.on('pointerup', this._onItemUp, this);
        item.on('pointerdown', this._onItemDown, this);
    }

    private _removeItemListeners(item: PIXI.DisplayObject): void {
        item.interactive = false;
        item.removeAllListeners();
    }

    private _onWheel = (event: WheelEvent): void => {
        this._state.onWheel(event);
    };

    private _onKeydown = (event: KeyboardEvent): void => {
        this._state.onKeyDown(event);
    };

    private _onPointerMove(event: PIXI.InteractionEvent): void {
        this._state.onPointerMove(event);
    }

    private _onPointerUp(event: PIXI.InteractionEvent): void {
        this._state.onPointerUp(event);
    }

    private _onToolsetItemClick(itemKey: string): void {
        this._state.onToolsetItemClick(itemKey);
    }

    private _onItemUp(event: PIXI.InteractionEvent): void {
        this._state.onItemUp(event);
    }

    private _onItemDown(event: PIXI.InteractionEvent): void {
        this._state.onItemDown(event);
    }

    private _buildToolset(): void {
        this.toolset = new BgDebuggerToolset();
        this.toolset.on('addItems', this._onAddItemsClick, this);
        this.toolset.on('removeItems', this._onRemoveItemsClick, this);
        this.toolset.on('updateItems', this._onUpdateItemsClick, this);
        this.toolset.on('download', this._getData, this);
    }

    private _removeToolset(): void {
        this.toolset.destroy();
    }

    private _onAddItemsClick(): void {
        this.state = new AddItemsBgStrategy(this);
    }

    private _onRemoveItemsClick(): void {
        this.state = new RemoveItemsBgStrategy(this);
    }

    private _onUpdateItemsClick(): void {
        this.state = new UpdateItemsBgStrategy(this);
    }

    private _getData(): void {
        const data: Record<string, BgItemConfig[]> = {};

        this.items.forEach((item) => {
            const { x: itemX, y: itemY, scale: itemScale } = item;
            const itemKey = Object.keys(bgItemClasses).find((itemKey) => {
                if (item instanceof bgItemClasses[itemKey]) return itemKey;
            });

            !data[itemKey] && (data[itemKey] = []);

            const x = Math.floor(itemX);
            const y = Math.floor(itemY);
            const scaleX = +itemScale.x.toFixed(2);
            const scaleY = +itemScale.y.toFixed(2);

            data[itemKey].push({ x, y, scale: { x: scaleX, y: scaleY } });
        });

        this._logData(data);
        this._downloadData(data);
    }

    private _logData(data: Record<string, BgItemConfig[]>): void {
        console.warn(data, JSON.stringify(data));
    }

    private _downloadData(data: Record<string, BgItemConfig[]>): void {
        const a = document.createElement('a');
        const json = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
        a.setAttribute('href', json);
        a.setAttribute('download', 'items-config.json');
        a.click();
    }
}

export const bgDebugger = new BgDebugger();
