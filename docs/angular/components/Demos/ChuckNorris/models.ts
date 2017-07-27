import { Component, Input, ChangeDetectorRef } from "@angular/core"
import { DisplayComponent } from "bosket/angular"

@Component({
    template: `
        <span class="value">{{ item.value }}
            <i [class]="'fa fa-refresh' + (item.children.length === 0 ? ' loading' : '')"
                (click)="onClick()">
            </i>
        </span>
    `
})
export class CategoryComponent implements DisplayComponent<Category> {

    constructor(private cdRef: ChangeDetectorRef){}

    item: Category

    onClick() {
        this.item.children = []
        this.item.loadJoke().then(joke => {
            this.item.children = joke
            this.cdRef.markForCheck()
            this.cdRef.detectChanges()
        })
    }
}

export class Category {
    constructor(category) {
        this.value = category
        this.children = this.loadJoke
    }

    value: String
    children: (() => Promise<Joke[]>) | Joke[]

    loadJoke() {
        return fetch(`https://api.chucknorris.io/jokes/random?category=${ this.value }`)
            .then(response => response.json())
            .then(joke => [new Joke(joke)])
    }

    display() { return CategoryComponent }
}

@Component({
    template: `
        <div class="value">
            <a [href]="item.url" target="_blank" rel="noopener noreferrer">{{ this.item.value }}</a>
        </div>
    `
})
export class JokeComponent implements DisplayComponent<Joke> {
    item: Joke
}

export class Joke {
    constructor(joke) { Object.assign(this, joke) }

    url: string
    value: string

    display() { return JokeComponent }
}
