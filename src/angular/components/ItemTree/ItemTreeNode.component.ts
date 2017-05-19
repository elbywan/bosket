import { Component, Input, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef,
    ComponentFactoryResolver, AfterViewInit } from "@angular/core"
import { ItemInjector, ItemComponent } from "./ItemInjector.directive"
import { Node } from "../../../core"
import * as strategies from "../../../core/strategies"

const object = require("../../../tools").object

/* Tree node */

@Component({
    selector: 'ItemTreeNode',
    template: `
        <ul *ngIf="!folded && !loading"
            [ngClass]="node.ulCss()"
            (dragover)="invokeEvent('onDragOver', null, $event, rootdrop)"
            (dragenter)="invokeEvent('onDragEnter', null, $event, rootdrop)"
            (dragleave)="invokeEvent('onDragLeave', null, $event, rootdrop)"
            (drop)="invokeEvent('onDrop', null, $event, rootdrop)">

            <li *ngFor="let item of getModel(); let i = index; trackBy: key"
                [class]="node.liCss(item)"
                (click)="node.onClick(item)($event)"
                [draggable]="node.getDragEvents(item).draggable"
                (dragstart)="invokeEvent('onDragStart', item, $event)"
                (dragover)="invokeEvent('onDragOver', item, $event)"
                (dragenter)="invokeEvent('onDragEnter', item, $event)"
                (dragleave)="invokeEvent('onDragLeave', item, $event)"
                (drop)="invokeEvent('onDrop', item, $event)">
                <span [class]="node.mixCss('item')">
                    <a *ngIf="!itemComponent">{{ display(item) }}</a>
                    <ng-template *ngIf="itemComponent" [itemInjector]="item"></ng-template>
                    <span
                        *ngIf="node.hasChildren(item) || node.isAsync(item) && !noOpener"
                        [class]="node.mixCss('opener')"
                        (click)="node.onOpener(item)($event)"></span>
                </span>
                <ItemTreeNode
                    *ngIf="node.hasChildren(item) || node.isAsync(item)"
                    [model]="getChildModel(item)"
                    [filteredModel]="getChildFiltered(item)"
                    [ancestors]="getAncestors(item)"
                    [depth]="(depth || 0) + 1"
                    [folded]="node.isFolded(item)"
                    [loading]="node.isAsync(item) && !node.isFolded(item)"
                    [category]="category"
                    [selection]="selection"
                    [onSelect]="onSelect"
                    [strategies]="strategies"
                    [labels]="labels"
                    [display]="display"
                    [css]="css"
                    [async]="async"
                    [dragndrop]="dragndrop"
                    [sort]="sort"
                    [disabled]="disabled"
                    [searched]="searched"
                    [noOpener]="noOpener"
                    [itemComponent]="itemComponent">
                </ItemTreeNode>
            </li>
        </ul>
        <span *ngIf="loading"></span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemTreeNode<Item extends Object> implements AfterViewInit{

    /* Adapter boilerplate */

    _props = {
        get: () => {
            const keys = [ "model", "category", "selection", "display", "key", "strategies", "dragndrop",
                "labels", "sort", "disabled", "noOpener", "async", "css", "folded",
                "loading", "depth", "ancestors", "searched", "onSelect" ]
            const props = {}
            keys.forEach(key => {
                props[key] = this[key]
            })
            return props
        },
        set: (s: {}) => {
            for(const key in s) {
                if(key in this) this[key] = s[key]
            }
        }
    }
    _state = {
        unfolded: [],
        get: () => {
            return { unfolded: this._state.unfolded }
        },
        set: (s: {}) => {
            for(const key in s) {
                if(key in this._state) this._state[key] = s[key]
            }
        }
    }

    /* Lifecycle */

    constructor(private _cdRef: ChangeDetectorRef, private _componentFactoryResolver: ComponentFactoryResolver) {
        this.node = new Node<Item>(
            this._props,
            null,
            this._state,
            () => this._cdRef.detectChanges()
        )
    }

    ngAfterViewInit(): void {
        if(this.model instanceof Array)
            this.model.forEach(i => this.ancestorsMap.set(i, [ ...this.ancestors, i ]))
    }

    ngAfterViewChecked(): void {
        this.injectItems()
    }

    /* Inputs / outputs declaration */

    // Bare minimum
    @Input() model: Array<Item>
    @Input() category: string
    @Input() selection: Array<Item>

    // Recommended
    @Input() display: (Item) => string
    @Input() key : (_: Item) => string
    @Input() strategies: {
        selection:  Array<string | strategies.selectionStrategy<Item>>
        click:      Array<string | strategies.clickStrategy<Item>>,
        fold:       Array<string | strategies.foldStrategy<Item>>
    }
    @Input() labels: {[key: string]: string}

    // Optional
    @Input() sort: (a: Item, b: Item) => boolean
    @Input() disabled: (_: Item) => boolean
    @Input() noOpener: boolean = false
    // Opener template ?!
    @Input() async: (_: Function) => Promise<any>
    @Input() itemComponent
    @Input() dragndrop : {
        draggable: boolean,
        droppable: boolean,
        dragStart<Item extends Object>(target: Item, event: DragEvent, ancestors: Array<Item>, neighbours: Array<Item>): void,
        onDrop<Item extends Object>(target: Item, event: DragEvent): void
    }

    // Internal
    @Input() filteredModel: Array<Item>
    @Input() css: {[key:string]: string}
    @Input() folded: boolean
    @Input() loading: boolean
    @Input() depth: number = 0
    @Input() ancestors: Array<Item>
    @Input() searched: string
    @Input() onSelect: (item: Item, ancestors: Array<Item>, neighbours: Array<Item>) => Array<Item>

    @ViewChildren(ItemInjector) itemInjectors : ItemInjector[]

    /* Internal logic */

    node: Node<Item>
    get rootdrop(){ return this.dragndrop.draggable && !this.depth }

    getModel = () =>
        this.searched ?
            this.model.filter(m => this.filteredModel.find(f => object(m).shallowCompare(f, [this.category]))) :
            this.model

    getChildModel = (item: Item) => {
        let childModel = item[this.category]

        /* If data has to be retrieved asynchronously */
        if(this.node.isAsync(item) && !this.node.isFolded(item) && this.node.pending.indexOf(item) < 0) {
            this.node.unwrapPromise(item)
        }
        if(!this.node.isAsync(item)) {
            childModel = this.sort ? childModel.sort(this.sort) : childModel
        }

        return childModel
    }
    getChildFiltered = (item: Item) =>
        this.searched ?
            this.filteredModel.find(m => object(item).shallowCompare(m, [this.category]))[this.category] :
            null

    ancestorsMap = new Map<Item, Array<Item>>()
    getAncestors = (item: Item) => {
        if(!this.ancestorsMap.has(item))
            this.ancestorsMap.set(item, [ ...this.ancestors, item ])
        return this.ancestorsMap.get(item)
    }

    injectItems() {
        if(!this.itemComponent || !this.itemInjectors) return
        this.itemInjectors.forEach(injector => {
             let item = injector.item
             if(injector.componentRef) {
                if(injector.componentRef.item === item) return
                injector.componentRef.item = item
             } else {
                let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.itemComponent)
                let viewContainerRef = injector.viewContainerRef
                let componentRef = viewContainerRef.createComponent(componentFactory);
                (<ItemComponent<Item>> componentRef.instance).item = item
                injector.componentRef = (<ItemComponent<Item>> componentRef.instance)
             }
        })
        this._cdRef.markForCheck()
        this._cdRef.detectChanges()
    }

    invokeEvent = (name, item, event, condition = true) => {
        const fun = this.node.getDragEvents(item, condition)[name]
        fun ? fun(event) : null
    }
}