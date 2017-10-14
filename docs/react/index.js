// @flow

import "self/common/libs/prismjs/prism"

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import { App } from "./components/App/App"

const render = Component => element =>
    element && ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        element
    )

window.onload = () => render(App)(document.getElementById("framework-root"))

// Hot Module Replacement API
if(module.hot && typeof module.hot.accept === "function") {
    module.hot.accept("./components/App/App", () => {
        render(App)(document.getElementById("framework-root"))
    })
}
