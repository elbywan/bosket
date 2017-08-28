import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef } from "@angular/core"

import "self/common/styles/HackerNews.css"
import { fetchLast, TopStory } from "./models"

@Component({
    selector: "HackerNewsComponent",
    template: `
        <div>
            <div style="text-align: center; margin: 10px;">
                <div>
                    <a href="https://news.ycombinator.com" target="_blank" rel="noopener noreferrer">
                        <img src="http://www.ycombinator.com/images/ycombinator-logo-fb889e2e.png"
                            alt="HackerNews logo" style="width: 50px; filter: drop-shadow(0 0 2px #444);" />
                    </a>
                </div>
                <h5>The top 10 stories from HackerNews.</h5>
                <div>
                    <button (click)="init()" class="HackerNewsButton">Reset</button>
                </div>
                <i *ngIf="stories.length === 0" class="HackerNewsSpinner fa fa-spinner fa-3x"></i>
            </div>
            <TreeView *ngIf="stories.length > 0"
                [model]="stories"
                category="children"
                [(selection)]="selection"
                [displayComponent]="displayComponent"
                [strategies]="conf.strategies"
                [css]="conf.css"></TreeView>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HackerNewsComponent {

    stories = []
    selection = []
    conf = {
        strategies: { fold: ["opener-control"]},
        css: { TreeView: "HackerNewsDemo" }
    }
    displayComponent(item) { return item.display() }

    constructor(private cdRef: ChangeDetectorRef){}

    ngOnInit() {
        this.init()
    }

    init() {
        fetch("https://hacker-news.firebaseio.com/v0/beststories.json")
            .then(response => response.json())
            .then(topStories => fetchLast(topStories, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`))
            .then(topStories => {
                this.stories = topStories.map(story => new TopStory(story))
                this.cdRef.markForCheck()
            })
    }

}
