import React from "react"

import "self/common/styles/Pokeapi.css"

import { TreeView } from "bosket/react"
import { css } from "bosket/tools"
import { Item, cachedFetch } from "./models"

export class Pokeapi extends React.PureComponent<*, *> {

    state = {
        data: [],
        selection: [],
        loading: false
    }

    conf = {
        strategies: { fold: [ "opener-control", _ => !_.__subsection ], click: ["toggle-fold"]},
        css: { TreeView: "PokeapiDemo" },
        disabled: _ => _.__children && _.__children instanceof Array && _.__children.length === 0,
        search: input => item => item.name && item.name.startsWith(input)
    }

    loadUrl = "https://pokeapi.co/api/v2/pokemon"

    componentDidMount() {
        this.init()
    }

    init() {
        this.loadUrl = "https://pokeapi.co/api/v2/pokemon"
        this.loadPokemons().then(_ => this.setState({ data: _ }))
    }

    loadPokemons() {
        if(!this.loadUrl) return
        this.setState({ loading: true })
        return cachedFetch(this.loadUrl)
            .then(json => {
                this.loadUrl = json.next
                this.setState({ loading: false })
                return json.results.map(i => ({
                    ...i,
                    display: _ => _.name,
                    __children: () => cachedFetch(i.url).then(json => [new Item(json)])
                }))
            })
            .catch(err => this.setState({ loading: false }))
    }

    render = () =>
        <div style={{ position: "relative " }}>
            <div style={{ textAlign: "center", margin: "10px" }}>
                <div>
                    <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
                        <img src="https://avatars3.githubusercontent.com/u/19692032?v=4&s=200"
                            alt="Pokéapi logo" style={{ width: "50px", filter: "drop-shadow(0 0 2px #444)" }}/>
                    </a>
                </div>
                <h5>Pokémon API crawler</h5>
                <div>
                    <button onClick={ _ => this.init(_) } className="PokeapiButton">Reset</button>
                </div>
            </div>
            <TreeView
                model={ this.state.data }
                category="__children"
                display={ _ => _.display(_)  }
                selection={ this.state.selection }
                onSelect={ _ => this.setState({ selection: _ }) }
                strategies={ this.conf.strategies }
                css={ this.conf.css }
                disabled={ this.conf.disabled }
                search={ this.conf.search }/>
            <div
                className={ "PokeapiLoadMore center-text " + css.classes({ loading: this.state.loading })  }
                style={{ display: this.loadUrl ? "block" : "none" }}
                onClick={ ev => !this.state.loading && this.loadPokemons().then(_ => this.setState({ data: [ ...this.state.data, ..._ ]})) }>
                { this.state.loading ? <i className="fa fa-spinner"></i> : <span>Show more pokémons</span> }
            </div>
        </div>

}
