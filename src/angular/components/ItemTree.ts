import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges,
    ChangeDetectorRef, ViewContainerRef, ViewChildren, AfterViewInit, ComponentFactoryResolver } from "@angular/core"
import { Node, RootNode, defaults } from "../../core"
import * as strategies from "../../core/strategies"

const object = require("../../tools").object

export interface ItemComponent<Item> {
    item: Item
}

@Directive({ selector: '[itemInjector]'})
export class ItemInjector {
    constructor(public viewContainerRef: ViewContainerRef) { }
    @Input ("itemInjector") item
    public componentRef : ItemComponent<any>
}

@Component({
    selector: 'ItemTreeNode',
    template: `
        <ul *ngIf="!folded && !loading"
            [ngClass]="node.ulCss()"
            (dragover)="droppable ? node.onDragOver(null)($event) : null"
            (dragenter)="droppable ? node.onDragEnter(null)($event) : null"
            (dragleave)="droppable ? node.onDragLeave($event) : null"
            (drop)="droppable ? node.onDrop(null)($event) : null">

            <li *ngFor="let item of getModel(); let i = index; trackBy: key"
                [class]="node.liCss(item)"
                (click)="node.onClick(item)($event)"
                [draggable]="node.defaultDragEvents(item).draggable"
                (dragstart)="draggable ? node.defaultDragEvents(item).onDragStart($event) : null"
                (dragover)="draggable ? node.defaultDragEvents(item).onDragOver($event) : null"
                (dragenter)="draggable ? node.defaultDragEvents(item).onDragEnter($event) : null"
                (dragleave)="draggable ? node.defaultDragEvents(item).onDragLeave($event) : null"
                (drop)="draggable ? node.defaultDragEvents(item).onDrop($event) : null">
                <span class="ItemTree-item">
                    <a *ngIf="!itemComponent">{{ display(item) }}</a>
                    <ng-template *ngIf="itemComponent" [itemInjector]="item"></ng-template>
                    <span
                        *ngIf="node.hasChildren(item) || node.isAsync(item) && !noOpener"
                        class="ItemTree-opener"
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
                    [draggable]="draggable"
                    [display]="display"
                    [css]="css"
                    [async]="async"
                    [dragStart]="dragStart"
                    [drop]="drop"
                    [sort]="sort"
                    [disabled]="disabled"
                    [searched]="searched"
                    [noOpener]="noOpener"
                    [itemComponent]="itemComponent">
                </ItemTreeNode>
            </li>
        </ul>
        <span *ngIf="loading" class="ItemTree-async-loading"></span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemTreeNode<Item extends Object> implements AfterViewInit{

    _props = {
        get: () => {
            const keys = [ "model", "category", "selection", "display", "key", "strategies",
                "labels", "draggable", "sort", "disabled", "noOpener", "async", "css", "folded",
                "loading", "depth", "ancestors", "searched", "drop", "dragStart", "onSelect" ]
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
    @Input() draggable: boolean
    @Input() sort: (a: Item, b: Item) => boolean
    @Input() disabled: (_: Item) => boolean
    @Input() noOpener: boolean = false
    // Opener template ?!
    @Input() async: (_: Function) => Promise<any>
    @Input() itemComponent

    // Internal
    @Input() filteredModel: Array<Item>
    @Input() css: {[key:string]: string}
    @Input() dragEvents: {}
    @Input() folded: boolean
    @Input() loading: boolean
    @Input() depth: number = 0
    @Input() ancestors: Array<Item>
    @Input() searched: string
    @Input() drop: (target: Item, event: DragEvent) => void
    @Input() dragStart: (target: Item, event: DragEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void
    @Input() onSelect: (item: Item, ancestors: Array<Item>, neighbours: Array<Item>) => Array<Item>

    @ViewChildren(ItemInjector) itemInjectors : ItemInjector[]

    // Internal logic
    node: Node<Item>
    get droppable() { return this.draggable && !this.depth }

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
}


@Component({
    selector: 'ItemTree',
    template: `
        <div class="ItemTree">
                <input
                    *ngIf="search"
                    type="search"
                    #searchBox
                    class="ItemTree-search"
                    [placeholder]="labels['search.placeholder']"
                    (input)="onSearch(searchBox.value)" />
                <ItemTreeNode
                    [model]="getChildModel()"
                    [filteredModel]="_state.filtered"
                    [category]="category"
                    [selection]="selection"
                    [onSelect]="rootNode.onSelect"
                    [strategies]="strategies"
                    [display]="display"
                    [css]="css"
                    [draggable]="draggable"
                    [async]="async"
                    [dragStart]="rootNode.onDragStart"
                    [drop]="rootNode.onDrop"
                    [ancestors]="[]"
                    [sort]="sort"
                    [disabled]="disabled"
                    [searched]="_state.search.trim()"
                    [itemComponent]="itemComponent">
                </ItemTreeNode>
            </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:keyup)':   'rootNode.onKey($event)',
        '(document:keydown)': 'rootNode.onKey($event)'
    }
})
export class ItemTree<Item extends Object> {

    _props = {
        get: () => {
            const keys = [ "model", "category", "selection", "display", "key", "search",
                "strategies", "labels", "css", "draggable", "sort", "disabled", "noOpener", "async" ]
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
    _outputs = {
        onSelect: items => this.selectionChange.emit(items),
        onDrop: (target, item) => this.onDrop.emit([target, item])
    }
    _state = {
        search: "",
        filtered: null,
        get: () => {
            return { search: this._state.search, filtered: this._state.filtered }
        },
        set: (s: {}) => {
            for(const key in s) {
                if(key in this._state) this._state[key] = s[key]
            }
        }
    }

    constructor(private cdRef: ChangeDetectorRef) {
        this.rootNode = new RootNode<Item>(
            this._props,
            this._outputs,
            this._state,
            this.cdRef.detectChanges
        )
    }

    // Bare minimum
    @Input() model: Array<Item>
    @Input() category: string
    @Input() selection: Array<Item>

    // Recommended
    @Input() display: (Item) => string = defaults.display
    @Input() key: (index: number, _: Item) => string = (idx, _) => "" + idx
    @Input() search: (input: string) => (_: Item) => boolean
    @Input() strategies: {
        selection:  Array<string | strategies.selectionStrategy<Item>>
        click:      Array<string | strategies.clickStrategy<Item>>,
        fold:       Array<string | strategies.foldStrategy<Item>>
    } = defaults.strategies
    @Input() labels = defaults.labels

    // Optional
    @Input() css = defaults.css
    @Input() draggable = defaults.draggable
    @Input() sort: (a: Item, b: Item) => number
    @Input() disabled: (_: Item) => boolean
    @Input() noOpener: boolean = defaults.noOpener
    // Opener template ?!
    @Input() async: (_: Function) => Promise<any> = defaults.async
    @Input() itemComponent

    // Outputs
    @Output() selectionChange = new EventEmitter<Array<Item>>()
    @Output() onDrop = new EventEmitter<[Item, Item]>()

    // Internal logic
    rootNode : RootNode<Item>

     /* Events */

    onSearch = (input: string) => {
        this._state.set({
            search: input,
            filtered: this.rootNode.filterTree(input)
        })
    }

    /* Internal logic */

    getChildModel = () => {
        return this.sort ? this.model.sort(this.sort) : this.model
    }

}