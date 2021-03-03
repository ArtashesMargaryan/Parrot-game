import { bgItemClasses } from './bg-config';

export class BgDebuggerToolset extends PIXI.utils.EventEmitter {
    private _itemsDiv: HTMLDivElement;
    private _optionsDiv: HTMLDivElement;
    private _itemsDivBlocker: HTMLDivElement;
    private _optionsDivBlocker: HTMLDivElement;

    public constructor() {
        super();

        this._buildOptionsToolset();
        this._buildItemsToolset();
    }

    public destroy(): void {
        document.body.removeChild(this._itemsDiv);
        document.body.removeChild(this._optionsDiv);
    }

    public enableInputs(): void {
        this._itemsDivBlocker.style.display = 'none';
        this._optionsDivBlocker.style.display = 'none';
    }

    public disableInputs(): void {
        this._itemsDivBlocker.style.display = 'block';
        this._optionsDivBlocker.style.display = 'block';
    }

    private _onAddItemsClick(): void {
        this._showItemsDiv();
        this.emit('addItems');
    }

    private _onRemoveItemsClick(): void {
        this._hideItemsDiv();
        this.emit('removeItems');
    }

    private _onUpdateItemsClick(): void {
        this._hideItemsDiv();
        this.emit('updateItems');
    }

    private _onLoadDataClick(): void {
        this.emit('download');
    }

    private _onItemClick(itemKey: string): void {
        this.emit('itemClick', itemKey);
    }

    private _showItemsDiv(): void {
        this._itemsDiv.style.display = 'block';
    }

    private _hideItemsDiv(): void {
        this._itemsDiv.style.display = 'none';
    }

    private _buildItemsToolset(): void {
        const div = document.createElement('div');
        div.id = 'items-toolset';
        div.style.position = 'relative';
        div.style.float = 'left';
        div.style.width = '60px';
        div.style.height = '100%';
        div.style.background = '#fff';
        div.style.display = 'none';
        div.style.overflow = 'auto';

        Object.keys(bgItemClasses).forEach((itemKey) => {
            const itemClass = bgItemClasses[itemKey];
            const itemView = new itemClass();

            const dataURL = superApp.app.renderer.plugins.extract.base64(itemView);

            const image = new Image();
            image.src = dataURL;
            image.setAttribute('draggable', 'false');
            image.setAttribute('width', '100%');
            image.addEventListener('click', this._onItemClick.bind(this, itemKey));

            div.appendChild(image);
        });

        const blocker = document.createElement('div');
        blocker.style.width = '60px';
        blocker.style.height = '100%';
        blocker.style.top = '0';
        blocker.style.left = '0';
        blocker.style.background = '#000';
        blocker.style.position = 'sticky';
        blocker.style.opacity = '0.5';
        blocker.style.display = 'none';

        document.body.appendChild((this._itemsDiv = div));
        document.body.appendChild((this._itemsDivBlocker = blocker));
    }

    private _buildOptionsToolset(): void {
        const div = document.createElement('div');
        div.id = 'options-toolset';
        div.style.position = 'relative';
        div.style.float = 'right';
        div.style.width = '40px';
        div.style.height = '100%';
        div.style.background = '#fff';
        div.style.display = 'block';

        this._buildOption(div, '#12c727', this._onAddItemsClick);
        this._buildOption(div, '#d1261d', this._onRemoveItemsClick);
        this._buildOption(div, '#1286c4', this._onUpdateItemsClick);
        this._buildOption(div, '#c48312', this._onLoadDataClick);

        const blocker = document.createElement('div');
        blocker.style.width = '100%';
        blocker.style.height = '100%';
        blocker.style.top = '0';
        blocker.style.left = '0';
        blocker.style.background = '#000';
        blocker.style.position = 'absolute';
        blocker.style.opacity = '0.5';
        blocker.style.display = 'none';
        div.appendChild((this._optionsDivBlocker = blocker));

        document.body.appendChild((this._optionsDiv = div));
    }

    private _buildOption(parent: HTMLDivElement, color: string, callback: () => void): HTMLDivElement {
        const option = document.createElement('div');
        option.style.float = 'left';
        option.style.width = '100%';
        option.style.height = '25%';
        option.style.background = color;
        option.addEventListener('click', callback.bind(this));
        parent.appendChild(option);

        return option;
    }
}
