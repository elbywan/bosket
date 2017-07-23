import React from "react"

import "./IntroductionDemos.css"

import { ComponentDemo } from "self/react/components/ComponentDemo/ComponentDemo"
import { ChuckNorris } from "self/react/components/Demos/ChuckNorris/ChuckNorris"
import { HackerNews } from "self/react/components/Demos/HackerNews/HackerNews"

export class IntroductionDemos extends React.PureComponent {

    demos = [ "HackerNews", "ChuckNorris" ]
    state = { demo: this.demos[0] }

    renderDemo() {
        switch (this.state.demo) {
            case "ChuckNorris":
                return (
                    <ComponentDemo files={[ "./components/Demos/ChuckNorris/ChuckNorris.js", "./components/Demos/ChuckNorris/ChuckNorris.css" ]}>
                        <ChuckNorris/>
                    </ComponentDemo>
                )
            case "HackerNews":
                return (
                    <ComponentDemo files={[ "./components/Demos/HackerNews/HackerNews.js", "./components/Demos/HackerNews/HackerNews.css" ]}>
                        <HackerNews />
                    </ComponentDemo>
                )
            default:
                return null
        }
    }

    renderButtons() {
        return this.demos.map(demo =>
            <button onClick={ ev => this.setState({ demo: demo }) } key={ demo } className={ this.state.demo === demo ? "selected" : "" }>
                { demo }
            </button>)
    }

    render = () =>
        <div className="IntroductionDemos">
            <div className="inline-row center-text">
                <span className="button-row">{ this.renderButtons() }</span>
            </div>
            { this.renderDemo() }
        </div>
}
