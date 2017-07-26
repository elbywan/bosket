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
                        display: h =>
                            <div class="fetchMore" onClick={ ev => this.fetchMore() }>
                                <a>Load more comments</a>
                            </div>
                    })
                }
                return result
            })
    }

    fetchMore() {
        this.fetchKids().then(_ => {
            this.children = [ ...this.children, ..._ ]
        })
    }

}

export class TopStory extends Item {

    display(h) {
        return (
            <span class="story">
                <span class="commentCount">{ this.descendants ? `(${ this.descendants })` : "" } ({ this.score } points) - by <a href={ "https://news.ycombinator.com/user?id=" + this.by } target="_blank" rel="noopener noreferrer">{ this.by }</a></span>
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

    renderInfobar(h) {
        const countReplies = !this.kids || !this.kids.length ? null :
            <span class="commentCount">({ this.kids.length })</span>
        return (
            <div class="infobar">
                { countReplies }
                <a href={ "https://news.ycombinator.com/user?id=" + this.by } target="_blank" rel="noopener noreferrer">{ this.by }</a> { this.date }
            </div>
        )
    }

    renderComment(h) {
        const dangerousHtml = {
            domProps: {
                innerHTML: this.text
            }
        }
        return this.deleted ?
            <div class="text"><em>Deleted.</em></div> :
            <div class="text" { ...dangerousHtml }></div>
    }

    display(h) {
        return <div class="comment">{ this.renderInfobar(h) }{ this.renderComment(h) }</div>
    }

}
