// @flow

import "self/common/styles/ComponentDemo.css"

import React from "react"

import Prism from "self/common/libs/prismjs/prism"

import { loadFile } from "self/common/tools"

const getFileName = file => file.split("/").splice(-1)
const getPrismExtension = file => {
    const split = file.split(".")
    let extension = "javascript"
    if(split[split.length - 1] === "css") extension = "css"
    return extension
}

export class ComponentDemo extends React.PureComponent {

    state : { tab: string, expand: null | string} = { tab: "", expand: "demo" }
    props: {
        componentName: string,
        description: string | React.Element<any>,
        files: string[],
        children?: React$Element<any>
    }

    get files() : string[] { return this.props.files || [] }
    get tab() : string | null { return this.state.tab || (this.files.length > 0 ? this.files[0] : null) }
    isExpanded = (state: string | null) : boolean => this.state.expand === state
    set expand(state: string) {
        this.setState({ expand: this.isExpanded(state) ? "" : state })
    }

    render() {
        return <div className="ComponentDemo section">
            { this.props.componentName ? <h3>{ this.props.componentName }</h3> : null }
            <div> { this.props.description } </div>
            <div className={ "ComponentDemo flex-container" + (this.state.expand ? " expanded" : "") }>
                <div className={ "ComponentDemo demo-area" + (this.isExpanded("demo") ? " expand" : "") }>
                    <div className="ComponentDemo expander" onClick={ _ => this.expand = "demo" }>
                        <i className={ "fa" + (this.isExpanded("demo") ? " fa-compress" : " fa-expand") }></i>
                    </div>
                    <div className="ComponentDemo padded">{ this.props.children }</div>
                </div>
                <div className={ "ComponentDemo code" + (this.state.expand === "code" ? " expand" : "") }>
                    <div className="ComponentDemo expander" onClick={ _ => this.expand = "code" }>
                        <i className={ "fa" + (this.isExpanded("code") ? " fa-compress" : " fa-expand") }></i>
                    </div>
                    { this.renderTabs(this.files) }
                    { this.tab && this.renderFile(this.tab) }
                </div>
            </div>
        </div>
    }

    renderFile = (file: string) =>
        <pre key={ file } className={"language-" + getPrismExtension(file)}>
            <code ref={ ref => ref && loadFile(file, code => {
                ref.innerHTML = Prism.highlight(code, Prism.languages[getPrismExtension(file)])
            })} className={"language-" + getPrismExtension(file)}></code>
        </pre>

    renderTabs = (files: string[]) =>
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
