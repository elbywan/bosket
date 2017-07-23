import React from "react"
import sanitize from "sanitize-html"

export const fetchLast = (arr, getUrl, limit = 10, offset = 0) =>
    Promise.all(arr.slice(offset, offset + limit).map(_ => fetch(getUrl(_)).then(response => response.json())))

class Item {

    constructor(data) {
        Object.assign(this, data)
        if(this.kids) {
            this.children = () => this.fetchKids()
        }
    }

    offset = 0
    fetchLimit = 5

    fetchKids() {
        if(this.children instanceof Array && this.children[this.children.length - 1].id === "showMore")
            this.children = this.children.slice(0, this.children.length - 1)
        return fetchLast(this.kids, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`, this.fetchLimit, this.offset)
            .then(kids => {
                const result = kids.map(k => new Comment(k))
                this.offset += this.fetchLimit
                if(this.offset < this.kids.length) {
                    result.push({
                        id: "showMore",
                        display: update =>
                            <div className="fetchMore" onClick={ ev => this.fetchMore(update) }>
                                <a>Load more comments</a>
                            </div>
                    })
                }
                return result
            })
    }

    fetchMore(update) {
        this.fetchKids().then(_ => {
            this.children = [ ...this.children, ..._ ]
            update()
        })
    }

}

export class TopStory extends Item {

    display() {
        return (
            <span className="story">
                <span className="commentCount">{ this.descendants ? `(${ this.descendants })` : "" } ({ this.score } points) - by <a href={ "https://news.ycombinator.com/user?id=" + this.by } target="_blank" rel="noopener noreferrer">{ this.by }</a></span>
                <a href={ this.url } target="_blank" rel="noopener noreferrer">
                    { this.title }
                </a>
            </span>
        )
    }

}

export class Comment extends Item {

    constructor(data) {
        super(data)
        this.text = sanitize(this.text)
        this.date = new Date(this.time * 1000).toLocaleDateString()
    }

    renderInfobar() {
        const countReplies = !this.kids || !this.kids.length ? null :
            <span className="commentCount">({ this.kids.length })</span>
        return (
            <div className="infobar">
                { countReplies }
                <a href={ "https://news.ycombinator.com/user?id=" + this.by } target="_blank" rel="noopener noreferrer">{ this.by }</a> { this.date }
            </div>
        )
    }

    renderComment() {
        return this.deleted ?
            <div className="text"><em>Deleted.</em></div> :
            <div className="text" dangerouslySetInnerHTML={{ __html: this.text }}></div>
    }

    display() {
        return <div className="comment">{ this.renderInfobar() }{ this.renderComment() }</div>
    }

}
