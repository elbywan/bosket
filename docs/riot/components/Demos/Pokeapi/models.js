export class Item {

    constructor(data) {
        Object.assign(this, formatData(data))
    }

    display() { return this.name && this.url ? "pokeapisubcategory" : "pokeapiitem" }
}

const cache = new Map()
export const cachedFetch = (url, ...args) => {
    if(cache.has(url)) return Promise.resolve(cache.get(url))
    return fetch(url, ...args)
        .then(response => response.json())
        .then(json => {
            cache.set(url, json)
            return json
        })
}

const imageMatch = (name, val) =>
    name === "sprites" && val.front_default

const formatData = d => {
    const data = { ...d }
    if(data.url) {
        const url = data.url
        data.__children = () => cachedFetch(url).then(json => [new Item(json)])
        return data
    }
    data.__subsection = true
    for(const prop in data) {
        if(prop.startsWith("__")) continue

        if(data[prop] instanceof Array) {
            if(!data.__children) data.__children = []
            data.__children.push({
                name: "" + prop,
                display: () => "pokeapisubcategory",
                __children: data[prop].map(_ => new Item(_))
            })
            delete data[prop]
        } else if(data[prop] && typeof data[prop] === "object") {
            if(!data.__children) data.__children = []
            if(data[prop].url && data[prop].name) {
                const name = data[prop].name
                const url = data[prop].url
                data.__children.push({
                    name: name,
                    display: () => "pokeapisubcategory",
                    __children: () => cachedFetch(url).then(json => [new Item(json)])
                })
            } else {
                data.__children.push({
                    name: "" + prop,
                    display: () => "pokeapisubcategory",
                    __children: [new Item(data[prop])]
                })
            }
            const img = imageMatch(prop, data[prop])
            if(img) data.__image = img
            delete data[prop]
        }
    }
    return data
}
