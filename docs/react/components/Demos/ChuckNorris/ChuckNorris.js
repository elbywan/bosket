import React from "react"

import "self/common/styles/ChuckNorris.css"

import { TreeView } from "bosket/react"
import { Category } from "./models"

export class ChuckNorris extends React.PureComponent {

    state = {
        categories: [],
        selection: []
    }

    conf = {
        strategies: { fold: ["opener-control"], click: ["unfold-on-selection"]},
        css: { TreeView: "ChuckNorrisDemo" }
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

    doDisplay = (_, inputs) => _.display(() => {
        inputs.ancestors.forEach(a => a.children = [...a.children])
        this.setState({ categories: [...this.state.categories]})
    })

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
                    <button onClick={ _ => this.init(_) } className="ChuckNorrisButton">Reset</button>
                </div>
            </div>
            <TreeView
                model={ this.state.categories }
                category="children"
                display={ this.doDisplay }
                selection={ this.state.selection }
                onSelect={ _ => this.setState({ selection: _ }) }
                strategies={ this.conf.strategies }
                css={ this.conf.css }/>
        </div>

}
