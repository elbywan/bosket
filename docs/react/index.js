import React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App/App"

import { AppContainer } from "react-hot-loader"

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("framework-root")
    )

render(App)

// Hot Module Replacement API
if(module.hot) {
    module.hot.accept("./components/App/App", () => {
        render(App)
    })
}