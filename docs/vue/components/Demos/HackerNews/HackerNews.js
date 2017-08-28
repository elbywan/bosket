import "self/common/styles/HackerNews.css"

import { TreeView } from "bosket/vue"
import { fetchLast, TopStory } from "./models"

const conf = {
    strategies: { fold: ["opener-control"]},
    css: { TreeView: "HackerNewsDemo" }
}

export default {
    name: "HackerNewsDemo",
    data: () => ({
        stories: [],
        selection: []
    }),
    mounted() {
        this.init()
    },
    methods: {
        init() {
            fetch("https://hacker-news.firebaseio.com/v0/beststories.json")
                .then(response => response.json())
                .then(topStories => fetchLast(topStories, _ => `https://hacker-news.firebaseio.com/v0/item/${_}.json`))
                .then(topStories => this.stories = topStories.map(story => new TopStory(story)))
        },
        onSelect(_) { this.selection = _ },
        onDisplay(h) { return item => item.display(h) }
    },
    render(h) {
        const props = {
            props: {
                model: this.stories,
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
                        <a href="https://news.ycombinator.com" target="_blank" rel="noopener noreferrer">
                            <img src="http://www.ycombinator.com/images/ycombinator-logo-fb889e2e.png"
                                alt="HackerNews logo" style={{ width: "50px", filter: "drop-shadow(0 0 2px #444)" }}/>
                        </a>
                    </div>
                    <h5>The top 10 stories from HackerNews.</h5>
                    <div>
                        <button onClick={ this.init } class="HackerNewsButton">Reset</button>
                    </div>
                    { this.stories.length === 0 ? <i class="HackerNewsSpinner fa fa-spinner fa-3x"></i> : null }
                </div>
                { this.stories.length > 0 ? <TreeView { ... props } /> : null }
            </div>
        )
    }
}
