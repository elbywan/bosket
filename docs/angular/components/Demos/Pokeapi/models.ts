import { Component, Input, ChangeDetectorRef } from "@angular/core"
import { DisplayComponent } from "bosket/angular"

@Component({
    selector: "item-display-component",
    template: `
        <div [ngClass]="{ subsection : item.__subsection }">
            <img *ngIf="item.__image" [src]="item.__image" alt="sprite" />
            <div class="property-row" *ngFor="let prop of filterProps(properties)">
                <label>{{ prop }}</label><span>{{ "" + item[prop] }}</span>
            </div>
        </div>
    `
})
export class ItemDisplayComponent implements DisplayComponent<Item> {
    _item: Item
    get item() { return this._item }
    set item(i) {
        this._item = i
        this.properties = Object.getOwnPropertyNames(i)
    }
    properties: string[]

    filterProps(props) {
        return props.filter(prop => !prop.startsWith("__") && !(typeof this[prop] === "object") && !(typeof this[prop] === "function"))
    }
}

@Component({
    selector: "subcategory-display-component",
    template: `<span class="subcategory">{{ item.name }}</span>`
})
export class SubcategoryDisplayComponent {
    item
}

export class Item {

    constructor(data) {
        Object.assign(this, formatData(data))
    }

    name?: string
    url?: string
    __subsection?: boolean
    __image?: string

    display() { return this.name && this.url ? SubcategoryDisplayComponent : ItemDisplayComponent }
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
                display: () => SubcategoryDisplayComponent,
                __children: data[prop].map(_ => new Item(_))
            })
            delete data[prop]
        } else if(data[prop] && typeof data[prop] === "object") {
            if(!data.__children) data.__children = []
            data.__children.push({
                name: "" + prop,
                display: () => SubcategoryDisplayComponent,
                __children: [new Item(data[prop])]
            })
            const img = imageMatch(prop, data[prop])
            if(img) data.__image = img
            delete data[prop]
        }
    }
    return data
}
