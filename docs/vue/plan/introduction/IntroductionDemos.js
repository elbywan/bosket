import "self/common/styles/IntroductionDemos.css"

import ComponentDemo from "self/vue/components/ComponentDemo.vue"
import ChuckNorris from "self/vue/components/Demos/ChuckNorris/ChuckNorris"
import HackerNews from "self/vue/components/Demos/HackerNews/HackerNews"
import Pokeapi from "self/vue/components/Demos/Pokeapi/Pokeapi"

const demos = [ "HackerNews", "Pokeapi", "ChuckNorris" ]

export default {
    name: "IntroductionDemos",
    data: () => ({ demo: demos[0] }),
    methods: {
        renderDemo() {
            const Component =
                this.demo === "ChuckNorris" ? ChuckNorris :
                    this.demo === "HackerNews" ? HackerNews :
                        this.demo === "Pokeapi" ? Pokeapi :
                            null

            const files = [
                `./components/Demos/${this.demo}/${this.demo}.js`,
                `../common/styles/${this.demo}.css`,
                `./components/Demos/${this.demo}/models.js`
            ]

            return (
                <ComponentDemo files={ files }>
                    <Component />
                </ComponentDemo>
            )
        },
        renderButtons() {
            return demos.map(demo =>
                <button onClick={ ev => this.demo = demo } key={ demo } class={ this.demo === demo ? "selected" : "" }>
                    { demo }
                </button>)
        }
    },
    render() {
        return (
            <div class="IntroductionDemos">
                <div class="center-text">
                    <span class="button-row">{ this.renderButtons() }</span>
                </div>
                { this.renderDemo() }
            </div>
        )
    }
}
