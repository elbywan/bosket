// @flow

import { array, tree } from "../tools"

type selectionStrategy = (item: Object, selection: Object[], neighbours: Object[], ancestors: Object[]) => Object[]
type clickStrategy = (item: Object, event: MouseEvent, ancestors: Array<Object>, neighbours: Array<Object>) => void
type foldStrategy = (item: Object, folded: boolean) => boolean

const singleSelect : selectionStrategy = function(item, selection, neighbours, ancestors) {
    return array(selection).contains(item) ? [] : [item]
}
const multiSelect : selectionStrategy = function(item, selection, neighbours, ancestors) {
    let alreadySelected = false
    let newSelection = selection.filter(i => {
        // Mark if the item was already selected
        if(!alreadySelected) alreadySelected = i === item
        // Deselect all ancestors
        return i !== item && ancestors.indexOf(i) < 0
    })
    // Categories : deselect all children
    if(!alreadySelected && item[this.inputs.get().category] && item[this.inputs.get().category] instanceof Array) {
        tree(item[this.inputs.get().category], this.inputs.get().category).visit((children: any) => {
            newSelection = array(newSelection).notIn(children)
        })
    }
    if(!alreadySelected) newSelection.push(item)
    return newSelection
}

// Selection strategies are triggered when the selection is updated.
export const selectionStrategies : { [key: string] : selectionStrategy } = {
    // The single strategy allows only one selected item at the same time (usually the last item clicked).
    single: singleSelect,
    // The multiple strategy allows any number of selected items and will add the last item clicked to the selection list.
    multiple: multiSelect,
    /*
    The modifiers strategy is the way most file explorers behave.
    Without keyboard modifiers, only one selected item is allowed.
    While pressing the shift key, all items between the two last selected siblings are added to the selection array.
    While pressing the ctrl (or cmd for mac users) key, the item is added to the selection list.
     */
    modifiers: function(item, selection, neighbours, ancestors) {
        if(this.modifiers.control || this.modifiers.meta) {
            this.lastSelection = item
            delete this.lastIndex
            delete this.lastPivot
            return multiSelect.bind(this)(item, selection, neighbours, ancestors)
        } else if(this.modifiers.shift) {
            if(!this.lastSelection)
                return selection

            const originIndex = neighbours.indexOf(this.lastSelection)
            if(originIndex < 0)
                return selection

            let newSelection = selection.slice()
            const endIndex = neighbours.indexOf(item)

            if(originIndex >= 0) {
                if(this.lastPivot) {
                    const lastIndex = neighbours.indexOf(this.lastPivot)
                    const [ smaller, higher ] = originIndex > lastIndex ?
                        [ lastIndex, originIndex ] :
                        [ originIndex, lastIndex ]
                    const deletions : any = neighbours.slice(smaller, higher + 1)
                    newSelection = array(newSelection).notIn(deletions)
                }
                this.lastPivot = item

                const [ smaller, higher ] = originIndex > endIndex ?
                    [ endIndex, originIndex ] :
                    [ originIndex, endIndex ]
                const additions : any = !this.inputs.get().disabled ?
                    neighbours.slice(smaller, higher + 1) :
                    neighbours.slice(smaller, higher + 1).filter(i => !this.inputs.get().disabled(i))
                newSelection = array(newSelection).notIn(additions)
                newSelection.push(...additions)
            }

            return newSelection
        } else {
            this.lastSelection = item
            delete this.lastIndex
            delete this.lastPivot
            return singleSelect.bind(this)(item, selection.length > 1 ? [] : selection, neighbours, ancestors)
        }
    },
    // Selects an item and its ancestors.
    ancestors: function(item, selection, neighbours, ancestors) {
        return selection.length === 0 ?
            [item] :
            array(selection).contains(item) ?
                [...ancestors] :
                [ ...ancestors, item ]
    }
}

// Click strategies are triggered on item click
export const clickStrategies : { [key: string] : clickStrategy } = {
    // Unfold an item when selecting it. Pair it with the "opener-control" fold strategy.
    "unfold-on-selection": function(item) {
        if(!this.isSelected(item)) {
            const newUnfolded = this.state.get().unfolded.filter(i => i !== item)
            newUnfolded.push(item)
            this.state.set({ unfolded: newUnfolded })
        }
    },
    // Toggle fold/unfold. Pair it with the "opener-control" fold strategy.
    "toggle-fold": function(item) {
        const newUnfolded = this.state.get().unfolded.filter(i => i !== item)
        if(newUnfolded.length === this.state.get().unfolded.length) {
            newUnfolded.push(item)
        }
        this.state.set({ unfolded: newUnfolded })
    }
}

// Fold strategies determine if an item will be folded or not, meaning if its children are hidden.
export const foldStrategies : { [key: string] : foldStrategy } = {
    // Allow the opener (usually an arrow-like element) to control the fold state.
    "opener-control": function(item) {
        return !array(this.state.get().unfolded).contains(item)
    },
    // Fold when not selected.
    "not-selected": function(item) {
        return !this.isSelected(item)
    },
    // Unfold as long as there is at least one child selected.
    "no-child-selection": function(item) {
        // naive algorithm ...
        const recurseCheck = node =>
            this.isSelected(node) ||
            node[this.inputs.get().category] &&
            node[this.inputs.get().category] instanceof Array &&
            node[this.inputs.get().category].some(recurseCheck)
        return !recurseCheck(item)
    },
    // Fold every item deeper than then "max-depth" component property.
    "max-depth": function() {
        return this.inputs.get().maxDepth && !isNaN(parseInt(this.inputs.get().maxDepth, 10)) ?
            this.inputs.get().depth >= parseInt(this.inputs.get().maxDepth, 10) :
            false
    }
}
