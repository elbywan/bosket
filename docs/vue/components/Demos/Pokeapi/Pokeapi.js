import "self/common/styles/Pokeapi.css"

import { TreeView } from "bosket/vue"
import { css } from "bosket/tools"
import { Item, cachedFetch } from "./models"

const conf = {
    strategies: { fold: [ "opener-control", _ => !_.__subsection ], click: ["toggle-fold"]},
    css: { TreeView: "PokeapiDemo" },
    disabled: _ => _.__children && _.__children instanceof Array && _.__children.length === 0,
    search: input => item => item.name && item.name.startsWith(input)
}

export default {
    name: "PokeapiDemo",
    mounted() {
        this.init()
    },
    data: () => ({
        data: [],
        selection: [],
        loading: false,
        loadUrl: "https://pokeapi.co/api/v2/pokemon"
    }),
    methods: {
        init() {
            this.loadUrl = "https://pokeapi.co/api/v2/pokemon"
            this.loadPokemons().then(_ => this.data = _)
        },
        loadPokemons() {
            if(!this.loadUrl) return
            this.loading = true
            return cachedFetch(this.loadUrl)
                .then(json => {
                    this.loadUrl = json.next
                    this.loading = false
                    return json.results.map(i => ({
                        ...i,
                        display: () => i.name,
                        __children: () => cachedFetch(i.url).then(json => [new Item(json)])
                    }))
                })
                .catch(err => this.loading = false)
        },
        onSelect(_) { this.selection = _ },
        onDisplay(h) { return item =>  item.display(h) }
    },
    render(h) {
        const props = {
            props: {
                model: this.data,
                category: "__children",
                display: this.onDisplay(h),
                selection: this.selection,
                onSelect: this.onSelect,
                strategies: conf.strategies,
                css: conf.css,
                disabled: conf.disabled,
                search: conf.search
            }
        }

        return <div>
            <div style={{ textAlign: "center", margin: "10px" }}>
                <div>
                    <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
                        <img src="https://avatars3.githubusercontent.com/u/19692032?v=4&s=200"
                            alt="Pokéapi logo" style={{ width: "50px", filter: "drop-shadow(0 0 2px #444)" }}/>
                    </a>
                </div>
                <h5>Pokémon API crawler</h5>
                <div>
                    <button onClick={ _ => this.init(_) } class="PokeapiButton">Reset</button>
                </div>
            </div>
            <TreeView { ...props } />
            <div
                class={ "PokeapiLoadMore center-text " + css.classes({ loading: this.loading })  }
                style={{ display: this.loadUrl ? "block" : "none" }}
                onClick={ ev => !this.loading && this.loadPokemons().then(_ => this.data = [ ...this.data, ..._ ]) }>
                { this.loading ? <i class="fa fa-spinner fa-2x"></i> : <span>Show more pokémons</span> }
            </div>
        </div>
    }
}
