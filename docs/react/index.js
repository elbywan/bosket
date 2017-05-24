import React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App/App"

import { AppContainer } from "react-hot-loader"

if(document.getElementById("framework-root").childNodes.length > 0 && window["demoCleanup"]) {
    window["demoCleanup"]()
    delete window["demoCleanup"]
}

window.demoCleanup = function() {
    ReactDOM.unmountComponentAtNode(document.getElementById("framework-root"))
    if(document.getElementById("framework-root"))
        document.getElementById("framework-root").remove()
    var root = document.createElement("div")
    root.setAttribute("id", "framework-root")
    document.getElementById("content").appendChild(root)
}

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