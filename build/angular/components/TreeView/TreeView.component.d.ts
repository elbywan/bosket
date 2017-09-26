import { EventEmitter, ChangeDetectorRef } from "@angular/core";
import { RootNode } from "../../../core";
export declare class TreeView<Item extends Object> {
    private cdRef;
    private _props;
    private _outputs;
    _state: any;
    constructor(cdRef: ChangeDetectorRef);
    model: Array<Item>;
    category: string;
    selection: Array<Item>;
    display: (item: Item, inputs: Object) => string;
    displayComponent: any;
    key: (index: number, item: Item) => string;
    search: (query: string) => (_: Item) => boolean;
    strategies: {
        selection: Array<string | ((item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>)>;
        click: Array<string | ((item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void)>;
        fold: Array<string | ((item: Item, lastState: boolean) => boolean)>;
    };
    labels: string;
    css: {
        [key: string]: string;
    };
    sort: (a: Item, b: Item) => number;
    disabled: (_: Item) => boolean;
    noOpener: boolean;
    async: (_: Function) => Promise<any>;
    dragndrop: {
        draggable: boolean;
        droppable: boolean;
    };
    _dragndrop: {
        draggable: boolean;
        droppable: boolean;
    };
    selectionChange: EventEmitter<Item[]>;
    onDrag: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    onOver: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    onEnter: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    onLeave: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    onDrop: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    onCancel: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    rootNode: RootNode<Item>;
    getChildModel: () => Item[];
    onSearch: (query: string) => void;
}
