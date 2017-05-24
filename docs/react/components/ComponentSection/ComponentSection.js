import "./ComponentSection.css"
import React from "react"

import Prism from "prismjs"

const memoize = new Map()

const loadFile = (filePath, cb) => {
    if(memoize.has(filePath))
        return cb(memoize.get(filePath))
    const req = new XMLHttpRequest()

    req.onreadystatechange = function(event) {
        if(this.readyState === XMLHttpRequest.DONE) {
            if(this.status === 200) {
                memoize.set(filePath, this.responseText)
                cb(this.responseText)
            }
        }
    }

    req.open("GET", filePath, true)
    req.send(null)
}

const getFileName = file => file.split("/").splice(-1)
const getPrismExtension = file => {
    const split = file.split(".")
    let extension = "javascript"
    if(split[split.length - 1] === "css") extension = "css"
    return extension
}

export class ComponentSection extends React.PureComponent {

    state = { tab: null }

    get files() { return this.props.files || [] }
    get tab() { return this.state.tab || (this.files.length > 0 ? this.files[0] : null) }

    render = () =>
        <div className="ComponentSection section">
            <h3>{ this.props.componentName }</h3>
            <p> { this.props.description } </p>
            <div className="ComponentSection flexContainer">
                <div className="ComponentSection highlight">{ this.props.children }</div>
                <div className="ComponentSection code">
                    { this.renderTabs(this.files) }
                    { this.files.filter(f => f === this.tab).map(this.renderFile) }
                </div>
            </div>
        </div>

    renderFile = file =>
        <pre key={file} className={"language-" + getPrismExtension(file)}>
            <code ref={ ref => ref && loadFile(file, code => {
                ref.innerHTML = Prism.highlight(code, Prism.languages[getPrismExtension(file)])
            })} className={"language-" + getPrismExtension(file)}></code>
        </pre>

    renderTabs = files =>
        <div className="tabs">
            { files.map(f =>
                <div key={f}
                        onClick={ ev => this.setState({ tab: f }) }
                        className={ f === this.tab ? "selected" : "" }>
                    { getFileName(f) }
                </div>
            )}
        </div>

}