import { ChangeDetectorRef, ComponentFactoryResolver, AfterViewInit, AfterViewChecked } from "@angular/core";
import { ItemInjector } from "./ItemInjector.directive";
import { TreeNode } from "../../../core";
export declare class TreeViewNode<Item extends Object> implements AfterViewInit, AfterViewChecked {
    private _cdRef;
    private _componentFactoryResolver;
    _props: {
        get: () => {};
        set: (s: {}) => void;
    };
    _state: {
        unfolded: any[];
        get: () => {
            unfolded: any[];
        };
        set: (s: {}) => void;
    };
    constructor(_cdRef: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    model: Array<Item>;
    category: string;
    selection: Array<Item>;
    display: (Item) => string;
    key: (_: Item) => string;
    strategies: {
        selection: Array<string | ((item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>)>;
        click: Array<string | ((item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void)>;
        fold: Array<string | ((item: Item, lastState: boolean) => boolean)>;
    };
    labels: {
        [key: string]: string;
    };
    sort: (a: Item, b: Item) => boolean;
    disabled: (_: Item) => boolean;
    noOpener: boolean;
    async: (_: Function) => Promise<any>;
    itemComponent: any;
    dragndrop: {
        draggable: boolean | (() => boolean);
        droppable: boolean | (() => boolean);
        drag?: (event: DragEvent, item: Item, inputs: Object) => void;
        guard?: (event: DragEvent, item: Item, inputs: Object) => boolean;
        drop?: (event: DragEvent, item: Item, inputs: Object) => void;
    };
    filteredModel: Map<Item, Map<Item, any>>;
    css: {
        [key: string]: string;
    };
    folded: boolean;
    loading: boolean;
    depth: number;
    ancestors: Array<Item>;
    searched: string;
    onSelect: (item: Item, ancestors: Array<Item>, neighbours: Array<Item>) => Array<Item>;
    itemInjectors: ItemInjector[];
    node: TreeNode<Item>;
    getModel: () => Item[];
    getChildModel: (item: Item) => any;
    getChildFiltered: (item: Item) => Map<Item, any>;
    ancestorsMap: Map<Item, Item[]>;
    getAncestors: (item: Item) => Item[];
    injectItems(): void;
    invokeEvent: (name: any, item: any, event: any, condition?: boolean) => void;
}
