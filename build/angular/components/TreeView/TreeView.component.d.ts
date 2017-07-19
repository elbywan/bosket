import { EventEmitter, ChangeDetectorRef } from "@angular/core";
import { RootNode } from "../../../core";
export declare class TreeView<Item extends Object> {
    private cdRef;
    _props: {
        get: () => {};
        set: (s: {}) => void;
    };
    _outputs: {
        onSelect: (selection: any, item: any, ancestors: any, neighbours: any) => void;
        onDrop: (target: any, event: any, inputs: any) => void;
        onDrag: (target: any, event: any, inputs: any) => void;
        onCancel: (target: any, event: any, inputs: any) => void;
    };
    _state: {
        search: string;
        filtered: any;
        get: () => {
            search: string;
            filtered: any;
        };
        set: (s: {}) => void;
    };
    constructor(cdRef: ChangeDetectorRef);
    model: Array<Item>;
    category: string;
    selection: Array<Item>;
    display: (item: Item, ancestors: Item[]) => string;
    displayComponent: any;
    key: (index: number, _: Item) => string;
    search: (input: string) => (_: Item) => boolean;
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
    onDrop: EventEmitter<{
        target: Item;
        event: DragEvent;
        inputs: Object;
    }>;
    onDrag: EventEmitter<{
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
    onSearch: (input: string) => void;
}
