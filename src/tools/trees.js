// @flow

import { array } from "./arrays"

// crashes gen-flow-files : type treeMap<T> = Map<T, treeMap<T>>
type treeMap<T> = Map<T, *>
type treeType<T> = {
    flatten: () => T[],
    filter: (T => boolean) => T[],
    filterMap: (T => boolean) => treeMap<T>,
    perform: (T, (T) => any, ?T[]) => T[],
    add: (T, T, ?T[]) => T[],
    remove: (T, T, ?T[]) => T[],
    path: (T) => T[] | boolean,
    visit: (T[] => void) => void,
    unwrapTree: (T => boolean) => Promise<*>
}

export const tree = <Item: Object>(t: Item[], prop: string) : treeType<Item> => ({
    /**
     * Flattens the tree into a single array.
     * @return {Array} A flattened array containing all the tree elements
     */
    flatten: () => {
        let flattened : Item[] = []
        let fifo : Item[][] = [t]
        while(fifo.length > 0) {
            const tree: Item[] = fifo.pop()
            if(!(tree instanceof Array))
                continue
            flattened = [ ...array(flattened).notIn(tree), ...tree ]
            fifo = [ ...fifo, ...tree.filter(item => item[prop]).map(item => item[prop]) ]
        }

        return flattened
    },
    /**
     * Filters the tree.
     * @param  {Function} filterFun Filtering function
     * @return {Tree}               Clone of the original tree without the filtered elements
     */
    filter: filterFun => {
        const copy = t.filter(filterFun)
        const recurse = list => {
            list.forEach(item => {
                if(item[prop] && item[prop] instanceof Array) {
                    item[prop] = item[prop].filter(filterFun)
                    recurse(item[prop])
                }
            })
        }
        recurse(copy)
        return copy
    },
    /**
     * Filters the tree and returns a Map representing the filtered tree.
     * @param  {Function} filterFun Filtering function
     * @return {Map}                A Map representation of the filtered tree
     */
    filterMap: filterFun => {
        const finalMap = new Map()

        const recurse = (list, map) => {
            list.forEach(item => {
                if(item[prop] && item[prop] instanceof Array) {
                    const childMap = new Map()
                    recurse(item[prop], childMap)
                    if(childMap.size > 0) {
                        map.set(item, childMap)
                    } else if(filterFun(item)) {
                        map.set(item, new Map())
                    }
                } else if(filterFun(item)) {
                    map.set(item, null)
                }
            })
        }
        recurse(t, finalMap)
        return finalMap
    },
    /**
     * Perform an action on a tree element, then update its ancestors references.
     * @param  {T}          elt           Element on which to perform the action (or matching function)
     * @param  {Function}   cb            An action callback
     * @param  {Array}      [path=null]   Ancestors path
     * @return {Tree}                     An updated tree clone
     */
    perform: (elt, cb, path = null) => {
        if(!path) path = tree(t, prop).path(elt)
        if(path instanceof Array) {
            path.reverse().forEach((p, idx) => {
                if(idx === 0)
                    cb(p)
                else
                    p[prop] = [...p[prop]]
            })
            return [...t]
        } else {
            return t
        }
    },
    /**
     * Adds an element and update its ancestors references.
     * @param {T}       parent        Where to add
     * @param {T}       elt           What to add (or matching function)
     * @param {Array}   [path=null]   Ancestors path
     * @return {Tree}                 An updated tree clone
     */
    add: (parent, elt, path = null) =>
        tree(t, prop).perform(parent, p => p[prop] = [ ...p[prop], elt ], path),
    /**
     * Removes an element and update its ancestors references.
     * @param  {T}      parent      Where to remove
     * @param  {T}      elt         What to remove (or matching function)
     * @param  {Array}  [path=null] Ancestors path
     * @return {Tree}               An updated tree clone
     */
    remove: (parent, elt, path = null) =>
        tree(t, prop).perform(parent, p => {
            p[prop] = p[prop].filter(_ => {
                if(typeof elt === "function")
                    return !elt(_)
                return _ !== elt
            })
        }, path),
    /**
     * Retrieves all ancestors of an element (or returns false).
     * @param  {T}      elt Element to search for (or matching function)
     * @return {Array}      Ancestors path
     */
    path: elt => {
        const recurse = item => {
            if(item === elt || typeof elt === "function" && elt(item)) return [item]
            if(!item[prop]) return false
            for(let i = 0; i < item[prop].length; i++) {
                const check = recurse(item[prop][i])
                if(check) return [ item, ...check ]
            }
            return false
        }
        for(let i = 0; i < t.length; i++) {
            const check = recurse(t[i])
            if(check) return check
        }
        return false
    },
    /**
     * Visits each node of the tree and performs an action.
     * @param  {Function} visitor Action to perform.
     */
    visit: visitor => {
        const fifo: Item[][] = [t]
        while(fifo.length > 0) {
            const tree = fifo.pop()
            visitor(tree)
            tree.forEach(child => child[prop] && child[prop] instanceof Array ?
                fifo.push(child[prop]) :
                null)
        }
    },
    /**
     * Resolves asynchronous nodes of the tree (Promises).
     * @param {Function} unwrapCheck Allows to skip Promises you don't want to unwrap
     * @return {Promise}
    */
    unwrapTree: (unwrapCheck = (_ => true)) => Promise.all(t.map(item => {
        if(!item.children || !unwrapCheck(item)) return Promise.resolve(item)
        return (
            typeof item.children === "function" ?
                item.children().then(children => tree(children, prop).unwrapTree(unwrapCheck)) :
                tree(item.children, prop).unwrapTree(unwrapCheck)
        ).then(children => ({
            ...item,
            children
        }))
    }))
})
