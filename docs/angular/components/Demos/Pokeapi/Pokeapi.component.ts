import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef } from "@angular/core"

import "self/common/styles/Pokeapi.css"

import { Item, cachedFetch } from "./models"

@Component({
    selector: "PokeApiComponent",
    template: `
        <div>
            <div style="text-align: center; margin: 10px;">
                <div>
                    <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
                        <img src="https://avatars3.githubusercontent.com/u/19692032?v=4&s=200"
                            alt="Pokéapi logo" style="width: 50px; filter: drop-shadow(0 0 2px #444);" />
                    </a>
                </div>
                <h5>Pokémon API crawler</h5>
                <div>
                    <button (click)="init()" class="PokeapiButton">Reset</button>
                </div>
            </div>
            <TreeView
                [model]="data"
                category="__children"
                [(selection)]="selection"
                [displayComponent]="displayComponent"
                [strategies]="conf.strategies"
                [css]="conf.css"
                [disabled]="conf.disabled"></TreeView>
            <div
                class="PokeapiLoadMore center-text"
                [ngClass]="{ loading: loading }"
                [style]="'display:' + loadUrl ? 'block' : 'none'"
                (click)="loadMorePokemons()">
                <i class="fa fa-spinner" *ngIf="loading"></i>
                <span *ngIf="!loading">Show more pokémons</span>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokeApiComponent {

    conf = {
        strategies: { fold: [ "opener-control", _ => !_.__subsection ], click: ["toggle-fold"]},
        css: { TreeView: "PokeapiDemo" },
        disabled: _ => _.__children && _.__children instanceof Array && _.__children.length === 0
    }
    data = []
    selection = []
    loading = false
    loadUrl = "https://pokeapi.co/api/v2/pokemon"
    displayComponent(item) { return item.display() }

    constructor(private cdRef: ChangeDetectorRef){}

    ngOnInit() {
        this.init()
    }

    init() {
        this.loadUrl = "https://pokeapi.co/api/v2/pokemon"
        this.loadPokemons().then(_ => {
            this.data = _
            this.cdRef.markForCheck()
        })
    }

    loadPokemons() {
        if(!this.loadUrl) return
        this.loading = true
        return cachedFetch(this.loadUrl)
            .then(json => {
                this.loadUrl = json.next
                this.loading = false
                return json.results.map(i => ({
                    ...i,
                    display: () => PokemonDisplayComponent,
                    __children: () => cachedFetch(i.url).then(json => [new Item(json)])
                }))
            })
            .catch(err => this.loading = false)
    }
    loadMorePokemons() {
        if(this.loading) return
        this.loadPokemons().then(_ => {
            this.data = [ ...this.data, ..._ ]
            this.cdRef.markForCheck()
        })
    }
}

@Component({
    template: "{{item.name}}"
})
export class PokemonDisplayComponent { item }