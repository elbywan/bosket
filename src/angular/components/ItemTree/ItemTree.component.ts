import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from "@angular/core"
import { RootNode, defaults } from "../../../core"
import * as strategies from "../../../core/strategies"

/* Root tree node */

@Component({
    selector: 'ItemTree',
    template: `
        <div [class]="rootNode.mixCss('ItemTree')">
                <input
                    *ngIf="search"
                    type="search"
                    #searchBox
                    [class]="rootNode.mixCss('search')"
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
                    [dragndrop]="dragndrop"
                    [async]="async"
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

    /* Adapter boilerplate */

    _props = {
        get: () => {
            const keys = [ "model", "category", "selection", "display", "key", "search",
                "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener", "async" ]
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
        onDrop: (target, item) => this.onDrop.emit([target, item]),
        onStart: (target, event, ancestors, neighbours) => this.onStart.emit({target, event, ancestors, neighbours})
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

    /* Lifecycle */

    constructor(private cdRef: ChangeDetectorRef) {
        this.rootNode = new RootNode<Item>(
            this._props,
            this._outputs,
            this._state,
            this.cdRef.detectChanges
        )
    }

    /* Input / output declarations */

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
    @Input() sort: (a: Item, b: Item) => number
    @Input() disabled: (_: Item) => boolean
    @Input() noOpener: boolean = defaults.noOpener
    // Opener template ?!
    @Input() async: (_: Function) => Promise<any> = defaults.async
    @Input() itemComponent
    @Input()
    set dragndrop(d) { this._dragndrop = d; this._dragndrop = this.rootNode.wrapDragNDrop() }
    get dragndrop(){ return this._dragndrop }
    _dragndrop: {
        draggable: boolean,
        droppable: boolean
    } = defaults.dragndrop

    // Outputs
    @Output() selectionChange = new EventEmitter<Array<Item>>()
    @Output() onDrop = new EventEmitter<[Item, Item]>()
    @Output() onStart = new EventEmitter<{
        target: Item, event: DragEvent, ancestors: Array<Item>, neighbours: Array<Item>
    }>()

    /* Internal logic */

    rootNode : RootNode<Item>
    getChildModel = () => {
        return this.sort ? this.model.sort(this.sort) : this.model
    }

    onSearch = (input: string) => {
        this._state.set({
            search: input,
            filtered: this.rootNode.filterTree(input)
        })
    }
}