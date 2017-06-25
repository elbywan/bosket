// @flow

import "./ComponentSection.css"

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

export class ComponentSection extends React.PureComponent {

    state : { tab: string, expand: null | string} = { tab: "", expand: null }
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

    render = () =>
        <div className="ComponentSection section">
            <h3>{ this.props.componentName }</h3>
            <div> { this.props.description } </div>
            <div className={ "ComponentSection flexContainer" + (this.state.expand ? " expanded" : "") }>
                <div className={ "ComponentSection demo-area" + (this.isExpanded("demo") ? " expand" : "") }>
                    <div className="ComponentSection expander" onClick={ _ => this.expand = "demo" }>
                        <i className={ "fa" + (this.isExpanded("demo") ? " fa-compress" : " fa-expand") }></i>
                    </div>
                    <div className="ComponentSection padded">{ this.props.children }</div>
                </div>
                <div className={ "ComponentSection code" + (this.state.expand === "code" ? " expand" : "") }>
                    <div className="ComponentSection expander" onClick={ _ => this.expand = "code" }>
                        <i className={ "fa" + (this.isExpanded("code") ? " fa-compress" : " fa-expand") }></i>
                    </div>
                    { this.renderTabs(this.files) }
                    { this.files.filter(f => f === this.tab).map(this.renderFile) }
                </div>
            </div>
        </div>

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
