import React from "react"

import "./IntroductionDemos.css"

import { ComponentDemo } from "self/react/components/ComponentDemo/ComponentDemo"
import { ChuckNorris } from "self/react/components/Demos/ChuckNorris/ChuckNorris"
import { HackerNews } from "self/react/components/Demos/HackerNews/HackerNews"

export class IntroductionDemos extends React.PureComponent {

    demos = [ "HackerNews", "ChuckNorris" ]
    state = { demo: this.demos[0] }

    renderDemo() {
        const Component =
            this.state.demo === "ChuckNorris" ? ChuckNorris :
                this.state.demo === "HackerNews" ? HackerNews :
                    null

        const files = [
            `./components/Demos/${this.state.demo}/${this.state.demo}.js`,
            `./components/Demos/${this.state.demo}/${this.state.demo}.css`,
            `./components/Demos/${this.state.demo}/models.js`
        ]

        return (
            <ComponentDemo files={ files }>
                <Component />
            </ComponentDemo>
        )
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
