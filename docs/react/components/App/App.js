import "./App.css"
import React from "react"

import * as sectionsImport from "../Sections"
import plan from "../../plan"
import { Planner } from "../Planner/Planner"

const sections = (() => {
    const res = []
    for(const section in sectionsImport) {
        res.push(sectionsImport[section])
    }
    return res
})()

export class App extends React.PureComponent {

    componentDidMount = () => {
        if(window.location.hash) {
            document.getElementById(window.location.hash.substring(1)).scrollIntoView()
        }
    }

    render = () =>
        <div className="App">
            { <Planner plan={ plan } maxDepth="2"></Planner> }
            <div className="components-container">
                { sections.map((Section, i) => <Section key={i}></Section>) }
            </div>
        </div>
}

