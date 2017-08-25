import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from "@angular/core"
import { RootNode, defaults } from "../../../core"
import * as strategies from "../../../core/strategies"

type dragOutput<T> = { target: T, event: DragEvent, inputs: Object }

/* Root tree node */

@Component({
    selector: 'TreeView',
    template: `
        <div [class]="rootNode.mixCss('TreeView')">
                <input #searchBox
                    *ngIf="search"
                    type="search"
                    [class]="rootNode.mixCss('search')"
                    [placeholder]="labels['search.placeholder']"
                    (input)="onSearch(searchBox.value)" />
                <TreeViewNode
                    [model]="getChildModel()"
                    [filteredModel]="_state.filtered"
                    [category]="category"
                    [selection]="selection"
                    [onSelect]="rootNode.onSelect"
                    [strategies]="strategies"
                    [display]="display"
                    [displayComponent]="displayComponent"
                    [key]="key"
                    [css]="css"
                    [dragndrop]="dragndrop"
                    [async]="async"
                    [ancestors]="[]"
                    [sort]="sort"
                    [disabled]="disabled"
                    [searched]="_state.search.trim()">
                </TreeViewNode>
            </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:keyup)':   'rootNode.onKey($event)',
        '(document:keydown)': 'rootNode.onKey($event)'
    }
})
export class TreeView<Item extends Object> {

    /* Adapter boilerplate */

    _props = {
        get: () => {
            const keys = [ "model", "category", "selection", "display", "search", "async", "key",
                "strategies", "labels", "css", "dragndrop", "sort", "disabled", "noOpener" ]
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
        onSelect:   (selection, item, ancestors, neighbours) => this.selectionChange.emit(selection),
        onDrop:     (target, event, inputs) => this.onDrop.emit({target, event, inputs}),
        onDrag:     (target, event, inputs) => this.onDrag.emit({target, event, inputs}),
        onCancel:   (target, event, inputs) => this.onCancel.emit({target, event, inputs})
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
    @Input() display: (item: Item, inputs: Object) => string = defaults.display
    @Input() displayComponent
    @Input() key: (index: number, item: Item) => string = (idx, item) => "" + idx
    @Input() search: (query: string) => (_: Item) => boolean
    @Input() strategies: {
        selection:  Array<string | ((item: Item, selection: Array<Item>, neighbours: Array<Item>, ancestors: Array<Item>) => Array<Item>)>
        click:      Array<string | ((item: Item, event: MouseEvent, ancestors: Array<Item>, neighbours: Array<Item>) => void)>,
        fold:       Array<string | ((item: Item, lastState: boolean) => boolean)>
    } = defaults.strategies
    @Input() labels = defaults.labels

    // Optional
    @Input() css = defaults.css
    @Input() sort: (a: Item, b: Item) => number
    @Input() disabled: (_: Item) => boolean
    @Input() noOpener: boolean = defaults.noOpener
    // Opener template ?!
    @Input() async: (_: Function) => Promise<any> = defaults.async
    @Input()
    set dragndrop(d) { this._dragndrop = d; this._dragndrop = this.rootNode.wrapDragNDrop() }
    get dragndrop(){ return this._dragndrop }
    _dragndrop: {
        draggable: boolean,
        droppable: boolean
    } = defaults.dragndrop

    // Outputs
    @Output() selectionChange = new EventEmitter<Array<Item>>()
    @Output() onDrop = new EventEmitter<dragOutput<Item>>()
    @Output() onDrag = new EventEmitter<dragOutput<Item>>()
    @Output() onCancel = new EventEmitter<dragOutput<Item>>()

    /* Internal logic */

    rootNode : RootNode<Item>
    getChildModel = () => {
        return this.sort ? this.model.sort(this.sort) : this.model
    }

    onSearch = (query: string) => {
        this._state.set({
            search: query,
            filtered: this.rootNode.filterTree(query)
        })
    }
}
