import React from "react"

import "./ChuckNorris.css"

import { TreeView } from "bosket/react"

class Category {
    constructor(category) {
        this.value = category
        this.children = this.loadJoke
    }

    loadJoke = () =>
        fetch(`https://api.chucknorris.io/jokes/random?category=${ this.value }`)
            .then(response => response.json())
            .then(joke => [new Joke(joke)])

    display(update) {
        return <span className="value">{ this.value }
            <i className={ "fa fa-refresh" + (this.children.length === 0 ? " loading" : "") }
                onClick={ _ => {
                    this.children = []
                    this.loadJoke().then(joke => {
                        this.children = joke; update()
                    })
                }}>
            </i>
        </span>
    }
}

class Joke {
    constructor(joke) { Object.assign(this, joke) }
    display() {
        return (
            <div className="value">
                <a href={ this.url } target="_blank" rel="noopener noreferrer">{ this.value }</a>
            </div>
        )
    }
}

export class ChuckNorris extends React.PureComponent {

    state = {
        categories: [],
        selection: []
    }

    constructor(props) {
        super(props)
        this.init()
    }

    init() {
        fetch("https://api.chucknorris.io/jokes/categories")
            .then(response => response.json())
            .then(categories => {
                this.setState({ categories: categories.map(cat => new Category(cat)) })
            })
    }

    render = () =>
        <div>
            <div style={{ textAlign: "center", margin: "10px" }}>
                <div>
                    <a href="https://api.chucknorris.io/" target="_blank" rel="noopener noreferrer">
                        <img src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small.png"
                            alt="Chuck Norris api logo" style={{ width: "100px", filter: "drop-shadow(0 0 2px #444)" }}/>
                    </a>
                </div>
                <div><h5>A curated list of Chuck Norris jokes.</h5></div>
                <div>
                    <button onClick={ _ => this.init() } className="ChuckNorrisButton">Reset</button>
                </div>
            </div>
            <TreeView
                model={ this.state.categories }
                category="children"
                display={ _  => _.display(this.forceUpdate.bind(this)) }
                selection={ this.state.selection }
                onSelect={ _ => this.setState({ selection: _ }) }
                strategies={{ fold: ["opener-control"], click: ["unfold-on-selection"]} }
                css={{ TreeView: "ChuckNorrisDemo" }}/>
        </div>

}
