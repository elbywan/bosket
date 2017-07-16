// @flow

import React from "react"

import "self/common/styles/App.css"

import { Planner } from "self/react/components/Planner/Planner"
import plan from "self/react/plan"

export class App extends React.PureComponent {
    componentDidMount() {
        if(window.location.hash) {
            const elt = document.getElementById(window.location.hash.substring(1))
            if(elt) elt.scrollIntoView()
        }
    }

    render() {
        return <div className="App">
            <Planner plan={ plan } maxDepth={ 1 } sticky={ true }></Planner>
        </div>
    }
}
