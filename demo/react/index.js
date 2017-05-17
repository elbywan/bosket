import React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App/App"

if(document.getElementById("framework-root").childNodes.length > 0 && window["boscageDemoCleanup"]) {
    window["boscageDemoCleanup"]()
    delete window["boscageDemoCleanup"]
}

window.boscageDemoCleanup = function() {
    ReactDOM.unmountComponentAtNode(document.getElementById("framework-root"))
    if(document.getElementById("framework-root"))
        document.getElementById("framework-root").remove()
    var root = document.createElement("div")
    root.setAttribute("id", "framework-root")
    document.getElementById("content").appendChild(root)
}

ReactDOM.render(
    <App />,
    document.getElementById("framework-root")
)