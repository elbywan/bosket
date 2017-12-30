// @flow

import "self/common/libs/prismjs/prism"

import React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App/App"

window.onload = () => {
    const element = document.getElementById("framework-root")
    element && ReactDOM.render(< App/>, element)
}
