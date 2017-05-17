import "./App.css"
import React from "react"

import * as sectionsImport from "../Sections"

const sections = (() => {
    const res = []
    for(const section in sectionsImport) {
        res.push(sectionsImport[section])
    }
    return res
})()

export const App = prop =>
     <div className="App">
        <p>This page is rendered using react 15.5.4</p>
        <div className="components-container">
            { sections.map((Section, i) => <Section key={i}></Section>) }
        </div>
    </div>