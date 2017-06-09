// @flow

import "./App.css"
import React from "react"

import * as sectionsImport from "self/react/components/Sections"
import { Planner } from "self/react/components/Planner/Planner"

import plan from "self/react/plan"

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
            const elt = document.getElementById(window.location.hash.substring(1))
            if(elt) elt.scrollIntoView()
        }
    }

    render = () =>
        <div className="App">
            { <Planner plan={ plan } maxDepth={ 1 }></Planner> }
            <div className="components-container">
                { sections.map((Section, i) => <Section key={i}></Section>) }
            </div>
        </div>
}
