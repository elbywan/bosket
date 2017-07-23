import React from "react"

import "./HackerNews.css"

import { TreeView } from "bosket/react"
import { fetchLast, TopStory } from "./models"

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
