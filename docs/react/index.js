// @flow

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import { App } from "./components/App/App"

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("framework-root")
    )

window.onload = () => render(App)

// Hot Module Replacement API
if(module.hot && typeof module.hot.accept === "function") {
    module.hot.accept("./components/App/App", () => {
        render(App)
    })
}
