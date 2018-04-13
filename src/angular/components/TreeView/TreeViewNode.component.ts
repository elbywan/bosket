import { Component, Input, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef,
    ComponentFactoryResolver, AfterViewInit, AfterViewChecked } from "@angular/core"
import { ItemInjector } from "./ItemInjector.directive"
import { TreeNode } from "@bosket/core"
import * as strategies from "@bosket/core"

const object = require("../../../tools/objects").object

/* Tree node */

@Component({
    selector: 'TreeViewNode',
    template: `
        <ul *ngIf="!folded && !loading"
            [ngClass]="node.ulCss()"
            (dragover)="invokeEvent('onDragOver', null, $event, !depth)"
            (dragenter)="invokeEvent('onDragEnter', null, $event, !depth)"
            (dragleave)="invokeEvent('onDragLeave', null, $event, !depth)"
            (drop)="invokeEvent('onDrop', null, $event, !depth)">

            <li *ngFor="let item of getModel(); let i = index; trackBy: key"
                [class]="node.liCss(item)"
                [draggable]="node.getDragEvents(item).draggable"
                (dragstart)="invokeEvent('onDragStart', item, $event)"
                (dragover)="invokeEvent('onDragOver', item, $event)"
                (dragenter)="invokeEvent('onDragEnter', item, $event)"
                (dragleave)="invokeEvent('onDragLeave', item, $event)"
                (dragend)="invokeEvent('onDragEnd', item, $event)"
                (drop)="invokeEvent('onDrop', item, $event)">
                <span [class]="node.mixCss('item')" (click)="node.onClick(item)($event)">
                    <span *ngIf="renderOpener(item, 'left')"
                        [class]="node.mixCss('opener')"
                        (click)="node.onOpener(item, openerOpts.callback)($event)"></span>
                    <ng-container *ngIf="!displayComponent">{{ display(item, _props.get()) }}</ng-container>
                    <ng-template *ngIf="displayComponent" [itemInjector]="item" [inject]="displayComponent" [inputs]="_props.get()"></ng-template>
                    <span *ngIf="renderOpener(item, 'right')"
                        [class]="node.mixCss('opener')"
                        (click)="node.onOpener(item, openerOpts.callback)($event)"></span>
                </span>
                <TreeViewNode
                    *ngIf="node.hasChildren(item) || node.isAsync(item)"
                    [model]="getChildModel(item)"
                    [filteredModel]="getChildFiltered(item)"
                    [ancestors]="getAncestors(item)"
                    [depth]="depth + 1"
                    [folded]="node.isFolded(item)"
                    [loading]="node.isAsync(item) && !node.isFolded(item)"
                    [category]="category"
                    [selection]="selection"
                    [onSelect]="onSelect"
                    [strategies]="strategies"
                    [labels]="labels"
                    [display]="display"
                    [displayComponent]="displayComponent"
                    [css]="css"
                    [async]="async"
                    [dragndrop]="dragndrop"
                    [sort]="sort"
                    [disabled]="disabled"
                    [searched]="searched"
                    [openerOpts]="openerOpts">
                </TreeViewNode>
            </li>
        </ul>
        <span *ngIf="loading"></span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewNode<Item extends Object> implements AfterViewInit {

    /* Adapter boilerplate */

    private keys = [
        "model", "category", "selection", "display", "key", "strategies", "dragndrop",
        "labels", "sort", "disabled", "openerOpts", "async", "css", "folded",
        "loading", "depth", "ancestors", "searched", "onSelect"
    ]

    /* Lifecycle */

    private _props
    private _state

    constructor(private _cdRef: ChangeDetectorRef, private _componentFactoryResolver: ComponentFactoryResolver) {
        this._props = {
            memoized: null,
            update: () => {
                const props = {}
                this.keys.forEach(key => {
                    props[key] = this[key]
                })
                this._props.memoized = props
            },
            get: () => this._props.memoized || this._props.update() && this._props.memoized,
            set: (s: {}) => {
                for(const key in s) {
                    if(key in this) this[key] = s[key]
                }
            }
        }

        this._state = {
            unfolded: [],
            get: () => ({ unfolded: this._state.unfolded }),
            set: (s: {}) => {
                for(const key in s) {
                    if(key in this._state) this._state[key] = s[key]
                }
            }
        }

        this.node = new TreeNode<Item>(
            this._props,
            null,
            this._state,
            () => this._cdRef.detectChanges()
        )
    }

    ngOnChanges() { this._props.update() }

    ngAfterViewInit(): void {
        if(this.model instanceof Array)
            this.model.forEach(i => this.ancestorsMap.set(i, [ ...this.ancestors, i ]))
    }

    /* Inputs / outputs declaration */

    // Bare minimum
    @Input() model: Array<Item>
    @Input() category: string
    @Input() selection: Array<Item>

    // Recommended
    @Input() display: (Item, Object) => string
    @Input() key : (index: number, item: Item) => string
    @Input() strategies: {
        selection:  Array<string | ((item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>)>
        click:      Array<string | ((item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void)>,
        fold:       Array<string | ((item: Item, lastState: boolean) => boolean)>
    }
    @Input() labels: {[key: string]: string}

    // Optional
    @Input() sort: (a: Item, b: Item) => boolean
    @Input() disabled: (_: Item) => boolean
    @Input() openerOpts: {
        position?: "none" | "left" | "right",
        callback?: (item: Item, callback: boolean) => void
    } = {
        position: "none"
    }
    // Opener template ?!
    @Input() async: (_: Function) => Promise<any>
    @Input() displayComponent
    @Input() dragndrop : {
        draggable: boolean | (() => boolean),
        droppable: boolean | (() => boolean),
        onDrag?:    (event: DragEvent, item: Item, inputs: Object) => void,
        guard?:     (event: DragEvent, item: Item, inputs: Object) => boolean,
        onDrop?:    (event: DragEvent, item: Item, inputs: Object) => void,
        onCancel?:  (event: DragEvent, item: Item, inputs: Object) => void
    }

    // Internal
    @Input() filteredModel: Map<Item, Map<Item, any>>
    @Input() css: {[key:string]: string}
    @Input() folded: boolean
    @Input() loading: boolean
    @Input() depth: number = 0
    @Input() ancestors: Array<Item>
    @Input() searched: string
    @Input() onSelect: (item: Item, ancestors: Array<Item>, neighbours: Array<Item>) => Array<Item>

    @ViewChildren(ItemInjector) itemInjectors : ItemInjector[]

    /* Internal logic */

    node: TreeNode<Item>

    getModel() {
        return this.searched ?
            this.model.filter(m => this.filteredModel.has(m)) :
            this.model
    }

    getChildModel(item: Item) {
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
    getChildFiltered(item: Item) {
        return this.searched ?
            this.filteredModel.get(item) :
            null
    }

    ancestorsMap = new Map<Item, Array<Item>>()
    getAncestors(item: Item) {
        if(!this.ancestorsMap.has(item))
            this.ancestorsMap.set(item, [ ...this.ancestors, item ])
        return this.ancestorsMap.get(item)
    }

    invokeEvent(name, item, event, condition = true) {
        const fun = this.node.getDragEvents(item, condition)[name]
        fun ? fun(event) : null
    }

    renderOpener(item, position) {
        return (this.node.hasChildren(item) || this.node.isAsync(item)) &&
            this.openerOpts.position === position
    }
}
