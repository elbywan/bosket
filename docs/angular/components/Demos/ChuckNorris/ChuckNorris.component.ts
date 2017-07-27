import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef } from "@angular/core"

import "self/common/styles/ChuckNorris.css"
import { Category } from "./models"

@Component({
    selector: "ChuckNorrisComponent",
    template: `
         <div>
            <div style="text-align: center; margin: 10px;">
                <div>
                    <a href="https://api.chucknorris.io/" target="_blank" rel="noopener noreferrer">
                        <img src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small.png"
                            alt="Chuck Norris api logo" style="width: 100px; filter: drop-shadow(0 0 2px #444);" />
                    </a>
                </div>
                <h5>A curated list of Chuck Norris jokes.</h5>
                <div>
                    <button (click)="init()" class="ChuckNorrisButton">Reset</button>
                </div>
            </div>
            <TreeView
                [model]="categories"
                category="children"
                [(selection)]="selection"
                [displayComponent]="displayComponent"
                [strategies]="conf.strategies"
                [css]="conf.css"></TreeView>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChuckNorrisComponent implements OnInit {

    categories = []
    selection = []
    conf = {
        strategies: { fold: ["opener-control"], click: ["unfold-on-selection"]},
        css: { TreeView: "ChuckNorrisDemo" }
    }

    constructor(private cdRef: ChangeDetectorRef){}

    ngOnInit() {
        this.init()
    }

    init() {
        fetch("https://api.chucknorris.io/jokes/categories")
                .then(response => response.json())
                .then(categories => {
                    this.categories = categories.map(cat => new Category(cat))
                    this.cdRef.markForCheck()
                })
    }

    displayComponent(item) { return item.display() }
}