import { array } from "./arrays"

export const tree = (tree, prop) => {
    let t = tree
    if(!(tree instanceof Array))
        if(typeof tree === "object")
            t = [tree]
        else
            throw new Error("Bad tree format")

    return {
        flatten: () => {
            let flattened = []
            let fifo = [t]
            while(fifo.length > 0) {
                const tree = fifo.pop()
                if(!(tree instanceof Array))
                    continue
                flattened = [ ...array(flattened).notIn(tree), ...tree ]
                fifo = [ ...fifo, ...tree.filter(item => item[prop]).map(item => item[prop]) ]
            }

            return flattened
        },
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
        treeFilter: filterFun => {
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
        add: (parent, elt) => {
            let fifo = [t]
            while(fifo.length > 0) {
                const tree = fifo.pop()
                const idx = tree.indexOf(parent)
                if(idx >= 0 && tree[idx][prop]) {
                    tree[idx][prop] = tree[idx][prop].slice()
                    tree[idx][prop].push(elt)
                    return t
                }
                fifo = [ ...fifo, ...tree.filter(item => item[prop]).map(item => item[prop]) ]
            }
            return t
        },
        findPath: elt => {
            const recurse = item => {
                if(array(item).contains(elt))
                    return [item]
                item[prop].forEach(child => {
                    const path = recurse(child)
                    if(path)
                        return [ ...path, item ]
                })
            }
            return false
        },
        visit: visitor => {
            const fifo = [t]
            while(fifo.length > 0) {
                const tree = fifo.pop()
                visitor(tree)
                tree.forEach(child => child[prop] && child[prop] instanceof Array ?
                    fifo.push(child[prop]) :
                    null)
            }
        }
    }
}