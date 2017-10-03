// @flow

import { array } from "./arrays"

// crashes gen-flow-files : type treeMap<T> = Map<T, treeMap<T>>
type treeMap<T> = Map<T, *>
type treeType<T> = {
    flatten: () => T[],
    filter: (T => boolean) => T[],
    treeFilter: (T => boolean) => treeMap<T>,
    add: (T, T) => T[],
    visit: (T[] => void) => void,
    path: (T) => T[] | boolean
}

export const tree = <Item: Object>(t: Item[], prop: string) : treeType<Item> => ({
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
        const path = tree(t, prop).path(parent)
        if(path instanceof Array) {
            parent[prop] = [ ...parent[prop], elt ]
            path.forEach(p => p[prop] = [...p[prop]])
            return [...t]
        } else {
            return t
        }
    },
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
    path: elt => {
        const recurse = item => {
            if(item === elt) return []
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
    }
})
