import React from "react"

import "./HackerNews.css"

import { TreeView } from "bosket/react"
import sanitize from "sanitize-html"

const fetchLast = (arr, getUrl, limit = 10, offset = 0) =>
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

class TopStory extends Item {

    display() {
        return (
            <span className="story">
                <span className="commentCount">{ this.descendants ? `(${ this.descendants })` : "" } ({ this.score } points) - by { this.by }</span>
                <a href={ this.url } target="_blank" rel="noopener noreferrer">
                    { this.title }
                </a>
            </span>
        )
    }
}

class Comment extends Item {

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

export class HackerNews extends React.PureComponent {

    state = {
        stories: [],
        selection: []
    }

    componentDidMount() {
        this.init()
    }

    init() {
        fetch("https://hacker-news.firebaseio.com/v0/beststories.json")
            .then(response => response.json())
            .then(topStories => fetchLast(topStories, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`))
            .then(topStories => this.setState({ stories: topStories.map(story => new TopStory(story)) }))
    }

    render = () =>
        <div>
            <div style={{ textAlign: "center", margin: "10px" }}>
                <div>
                    <a href="https://news.ycombinator.com" target="_blank" rel="noopener noreferrer">
                        <img src="http://www.ycombinator.com/images/ycombinator-logo-fb889e2e.png"
                            alt="HackerNews logo" style={{ width: "50px", filter: "drop-shadow(0 0 2px #444)" }}/>
                    </a>
                </div>
                <div><h5>The top 10 stories from HackerNews.</h5></div>
                <div>
                    <button onClick={ _ => this.init() } className="HackerNewsButton">Reset</button>
                </div>
            </div>
            <TreeView
                model={ this.state.stories }
                category="children"
                display={ _  => _.display(this.forceUpdate.bind(this)) }
                selection={ this.state.selection }
                onSelect={ _ => this.setState({ selection: _ }) }
                strategies={{ fold: ["opener-control"]}}
                css={{ TreeView: "HackerNewsDemo" }}/>
        </div>
}
