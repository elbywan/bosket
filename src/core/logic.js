// @flow

import { css, array, tree } from "../tools"
import { wrapEvents, nodeEvents } from "./dragndrop"
import { selectionStrategies, foldStrategies, clickStrategies } from "./strategies"
import { defaults } from "./defaults"

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
//  Boilerplate  for framework class adapters

class Core<Input: Object> {
    inputs: { get: () => Input }
    outputs: Object
    state: { get: () => Object, set: Object => void }
    refresh: () => void

    constructor(inputs: { get: () => Input }, outputs: Object, state: { get: () => Object, set: Object => void }, refresh: () => void) {
        this.inputs = inputs
        this.outputs = outputs
        this.state = state
        this.refresh = refresh
    }

}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
// Tree node

export type TreeNodeInput = {
    model:              Object[],
    category:           string,
    selection:          Object[],
    onSelect:           (item: Object, ancestors: Object[], neighbours: Object[]) => void,
    ancestors:          Object[],
    strategies?:        Object,
    disabled?:          Object => boolean,
    dragndrop:          Object,
    css:                { [key: string]: string },
    async?:             (mixed => Promise<Object[]>) => Promise<Object[]>,
    depth?:             number
}

export class TreeNode extends Core<*> {

    /* Various checks */

    isSelected = (item: Object) => array(this.inputs.get().selection).contains(item)
    isFolded = (item: Object) : boolean => {
        const strats = this.inputs.get().strategies
        return  (!this.inputs.get().searched || this.isAsync(item)) &&
                    (strats && strats.fold || [])
                        .map(strat => (foldStrategies[strat] || strat).bind(this))
                        .reduce((last, curr) => last && curr(item, last), true)
    }
    hasChildren = (item: Object) => item[this.inputs.get().category] && item[this.inputs.get().category] instanceof Array
    isAsync = (item: ?Object) : boolean => !!item && [this.inputs.get().category] && typeof item[this.inputs.get().category] === "function"
    isDisabled = (item: Object) => {
        const disabledFun = this.inputs.get().disabled
        return disabledFun ? disabledFun(item) : false
    }
    isDraggable = (item: ?Object) =>
        item &&
        this.inputs.get().dragndrop.draggable && (
            typeof this.inputs.get().dragndrop.draggable === "function" ?
                this.inputs.get().dragndrop.draggable(item) :
                true
        )
    isDroppable = (item: ?Object) =>
        this.inputs.get().dragndrop.droppable && (
            typeof this.inputs.get().dragndrop.droppable === "function" ?
                this.inputs.get().dragndrop.droppable(item) :
                true
        )

    /* Styles calculation */

    // Css mixin helper
    mixCss = (prop: string) => this.inputs.get().css[prop] || defaults.css[prop]

    ulCss = () =>
        css.classes({
            [`${this.mixCss("depth")}-${this.inputs.get().depth || 0}`]: true
        })

    liCss = (item: Object) =>
        css.classes({
            [this.mixCss("selected")]:  this.isSelected(item),
            [this.mixCss("category")]:  this.hasChildren(item) || this.isAsync(item),
            [this.mixCss("folded")]:    this.hasChildren(item) || this.isAsync(item) ? this.isFolded(item) : null,
            [this.mixCss("disabled")]:  this.isDisabled(item),
            [this.mixCss("async")]:     this.isAsync(item) && this.isFolded(item),
            [this.mixCss("loading")]:   this.isAsync(item) && !this.isFolded(item)
        })

    /* Promises */

    // Pending promises
    pending = []

    // Unwrap a promise and mutate the model to add the results
    unwrapPromise = (item: Object) : Promise<mixed> => {
        this.pending.push(item)
        const asyncFun = this.inputs.get().async
        if(!asyncFun)
            return Promise.reject(new Error("Missing async function."))
        else
            return asyncFun(item[this.inputs.get().category])
                .then(res => {
                    item[this.inputs.get().category] = res
                    this.refresh()
                })
                .catch(err => {
                    /* eslint-disable */
                    throw err
                    /* eslint-enable */
                })
                .then(() => this.pending = this.pending.filter(e => e !== item))
    }

    /* Events */

    // On item click
    onClick = (item: Object) =>
        (event: MouseEvent) => {
            if(this.isDisabled(item))
                return
            const strats = this.inputs.get().strategies;
            (strats && strats.click || [])
                .map(strat => (clickStrategies[strat] || strat).bind(this))
                .forEach(strat => strat(item, event, this.inputs.get().ancestors, this.inputs.get().model))
            this.inputs.get().onSelect(item, this.inputs.get().ancestors, this.inputs.get().model)
            event.stopPropagation()
        }

    // On opener click
    onOpener(item: Object) {
        return (event: MouseEvent) => {
            const newVal = this.state.get().unfolded.filter(i => i !== item)
            if(newVal.length === this.state.get().unfolded.length)
                newVal.push(item)
            this.state.set({ unfolded: newVal })
            event.stopPropagation()
        }
    }

    // Drag'n'drop //

    getDragEvents = (item: ?Object, condition?: boolean = true) => {
        if(!condition) return {}
        const result = {
            draggable:      this.isDraggable(item),
            onDragStart:    this.isDraggable(item) && nodeEvents.onDragStart(item).bind(this),
            onDragOver:     this.isDroppable(item) && nodeEvents.onDragOver(item).bind(this),
            onDragEnter:    this.isDroppable(item) && nodeEvents.onDragEnter(item).bind(this),
            onDragLeave:    this.isDroppable(item) && nodeEvents.onDragLeave(item).bind(this),
            onDrop:         this.isDroppable(item) && nodeEvents.onDrop(item).bind(this),
            onDragEnd:      this.isDraggable(item) && nodeEvents.onDragEnd(item).bind(this)
        }
        for(const key in result)
            if(!result[key])
                delete result[key]
        return result
    }

}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
// Root node of the tree

export type RootNodeInput = {
    model:              Object[],
    category:           string,
    selection:          Object[],
    strategies:         Object,
    css:                { [key: string]: string },
    dragndrop?:         Object,
    search?:            string => Object => boolean
}

export class RootNode extends Core<*> {

    /* Events */

    // Keyboard modifiers list
    modifiers = {}
    onKey = (event: KeyboardEvent) => {
        this.modifiers = {
            control: event.getModifierState("Control"),
            meta: event.getModifierState("Meta"),
            shift: event.getModifierState("Shift")
        }
    }

    // When new element(s) are selected
    onSelect = (item: Object, ancestors: Object[], neighbours: Object[]) => {
        const selectionStrategy = this.inputs.get().strategies.selection || []
        const newSelection = selectionStrategy
            .map(strat => (selectionStrategies[strat] || strat).bind(this))
            .reduce((last, curr) => curr(item, last, neighbours, ancestors), this.inputs.get().selection)
        this.outputs.onSelect(newSelection, item, ancestors, neighbours)
        return newSelection
    }

    // Framework input wrapper
    wrapDragNDrop = wrapEvents.bind(this)

    // Css mixin helper
    mixCss = (prop: string) => this.inputs.get().css[prop] || defaults.css[prop]

    // Used to filter the tree when performing a search
    filterTree = (input: string) => {
        const search = this.inputs.get().search
        return !search ? null : !input.trim() ? null :
            tree(this.inputs.get().model, this.inputs.get().category)
                .treeFilter(search(input.trim()))
    }

}
