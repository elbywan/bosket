import "self/common/styles/ChuckNorris.css"

import { TreeView } from "bosket/vue"
import { Category } from "./models"

const conf = {
    strategies: { fold: ["opener-control"], click: ["unfold-on-selection"]},
    css: { TreeView: "ChuckNorrisDemo" }
}

export default {
    name: "ChuckNorrisDemo",
    data: () => ({
        categories: [],
        selection: []
    }),
    created() {
        this.init()
    },
    methods: {
        init() {
            fetch("https://api.chucknorris.io/jokes/categories")
                .then(response => response.json())
                .then(categories => {
                    this.categories = categories.map(cat => new Category(cat))
                })
        },
        onSelect(_) { this.selection = _ },
        onDisplay(h) { return item => item.display(h) }
    },
    render(h) {

        const props = {
            props: {
                model: this.categories,
                category: "children",
                display: this.onDisplay(h),
                selection: this.selection,
                onSelect: this.onSelect,
                strategies: conf.strategies,
                css: conf.css
            }
        }

        return (
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
                        <button onClick={ _ => this.init() } class="ChuckNorrisButton">Reset</button>
                    </div>
                </div>
                <TreeView { ...props } />
            </div>
        )
    }

}
