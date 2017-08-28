import { Component, Input, ChangeDetectorRef } from "@angular/core"
import { DisplayComponent } from "bosket/angular"
import sanitize from "sanitize-html"

export const fetchLast = (arr, getUrl, limit = 10, offset = 0) =>
    Promise.all(arr.slice(offset, offset + limit).map(_ => fetch(getUrl(_)).then(response => response.json())))


type fetchMoreItem = {
    id: number,
    fetchKids: () => any,
    display: () => Function
}

@Component({
    template: `
        <div class="fetchMore" (click)="item.fetchKids().then(update)">
            <a>Load more comments</a>
        </div>
    `
})
export class FetchMoreComponent implements DisplayComponent<fetchMoreItem> {
    constructor(private cdRef: ChangeDetectorRef){}

    item: fetchMoreItem
    update = () => {
        this.cdRef.markForCheck()
    }
}

class Item {

    constructor(data) {
        Object.assign(this, data)
        if(this.kids) {
            this.children = () => this.fetchKids()
        }
    }

    offset = 0
    fetchLimit = 5
    children: (() => Promise<Object[]>) | Object[]

    id: number
    kids: number[]
    by: string

    fetchKids() {
        if(this.children instanceof Array && (this.children[this.children.length - 1] as fetchMoreItem).id === -1)
            this.children = this.children.slice(0, this.children.length - 1)
        return fetchLast(this.kids, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`, this.fetchLimit, this.offset)
            .then(kids => {
                const result : Object[] = kids.map(k => new Comment(k))
                this.offset += this.fetchLimit
                if(this.offset < this.kids.length) {
                    result.push({
                        id: -1,
                        fetchKids: () => this.fetchKids().then(_ => {
                            if(this.children instanceof Array)
                                this.children = [ ...this.children, ..._ ]
                        }),
                        display: () => FetchMoreComponent
                    })
                }
                return result
            })
    }
}

@Component({
    template: `
        <span class="story">
            <span class="commentCount"><span *ngIf="item.descendants">({{ item.descendants}}) </span>({{ item.score }} points) - by <a [href]="'https://news.ycombinator.com/user?id=' + item.by" target="_blank" rel="noopener noreferrer">{{ item.by }}</a></span>
            <a [href]="item.url" target="_blank" rel="noopener noreferrer">
                {{ item.title }}
            </a>
        </span>
    `
})
export class TopStoryComponent implements DisplayComponent<TopStory> {
    item: TopStory
}
export class TopStory extends Item {

    title: string
    url: string

    descendants: number[]
    score: number

    display() { return TopStoryComponent }

}

@Component({
    template: `
        <div class="comment">
            <div class="infobar">
                <span class="commentCount" *ngIf="item.kids && item.kids.length > 0">({{ item.kids.length }})</span>
                <a [href]="'https://news.ycombinator.com/user?id=' + item.by" target="_blank" rel="noopener noreferrer">{{ item.by }}</a> {{ item.date }}
            </div>
            <div class="text" *ngIf="item.deleted"><em>Deleted.</em></div>
            <div class="text" *ngIf="!item.deleted" [innerHtml]="item.text"></div>
        </div>
    `
})
export class CommentComponent implements DisplayComponent<Comment> {
    item: Comment
}
export class Comment extends Item {

    constructor(data) {
        super(data)
        this.text = sanitize(this.text)
        this.date = new Date(this.time * 1000).toLocaleDateString()
    }

    text: string
    time: number
    date: string
    deleted: boolean

    display() { return CommentComponent }

}
