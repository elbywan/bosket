import React from "react"
import "./Planner.css"

import { TreeView } from "bosket/react"
import { css } from "bosket/tools"
import { withListener } from "bosket/react/traits"

const headerLevel = (depth, prefix, inner) => {
    const id = prefix ? `${prefix}#${inner}` : inner
    switch (depth) {
        case 1: return (
            <h1 id={ id } className="Planner heading">
                <span>{ inner }</span>
                <a href={ "#" + id }><i className="fa fa-link"></i></a>
            </h1>
        )
        case 2: return (
            <h2 id={ id } className="Planner heading">
                <span>{ inner }</span>
                <a href={ "#" + id }><i className="fa fa-link"></i></a>
            </h2>
        )
        case 3: return (
            <h3 id={ id } className="Planner heading">
                <em><span>{ inner }</span></em>
                <a href={ "#" + id }><i className="fa fa-link"></i></a>
            </h3>
        )
        case 4: return (
            <h4 id={ id } className="Planner heading">
                <span>{ inner }</span>
                <a href={ "#" + id }><i className="fa fa-link"></i></a>
            </h4>
        )
        case 5: return (
            <h5 id={ id } className="Planner heading">
                <span>{ inner }</span>
                <a href={ "#" + id }><i className="fa fa-link"></i></a>
            </h5>
        )
        case 6: return (
            <h6 id={ id } className="Planner heading">
                <span>{ inner }</span>
                <a href={ "#" + id }><i className="fa fa-link"></i></a>
            </h6>
        )
        default: return null
    }
}

const processContent = (plan, parentPrefix = "", depth = 1) => {
    if(!plan && plan.length < 1)
        return null

    return plan.map(item =>
        <div className={ depth === 1 ? "chapter" : "planner-section" } key={ item.title }>
            { headerLevel(depth, parentPrefix, item.title) }
            { item.content }
            { item.subs && item.subs.length > 0 ?
                    processContent(item.subs, parentPrefix ? `${parentPrefix}#${item.title}` : item.title, depth + 1) :
                    null
            }
        </div>
    )
}

export const Planner = withListener({ autoMount: true })(class extends React.PureComponent {

    componentDidMount = () => {
        this.props.listener.subscribe(ev => {
            if(this.opener && this.opener.contains(ev.target)) {
                this.setState({ opened: !this.state.opened })
            } else if(this.state.opened && this.sidePanel && !this.sidePanel.contains(ev.target))
                this.setState({ opened: false })
        })

        this.ticking = false
        this.scrollListener = window.addEventListener("scroll", e => {
            if(!this.ticking) {
                window.requestAnimationFrame(() => {
                    const result = []
                    const loop = (arr, acc = []) => {
                        for(let i = 0; i < arr.length; i++) {
                            const elt = arr[i]
                            const domElt = document.getElementById(acc.length > 0 ? acc.join("#") + "#" + elt.title : elt.title).parentNode
                            if(domElt.getBoundingClientRect().top <= 50 && domElt.getBoundingClientRect().bottom > 10) {
                                result.push(elt)
                                if(elt.subs)
                                    loop(elt.subs, [ ...acc, elt.title ])
                                break
                            }
                        }
                    }
                    loop(this.props.plan)
                    this.setState({ selection: result })
                    const newHash = "#" + result.map(_ => _.title).join("#")
                    if(newHash !== window.location.hash) {
                        window.history && window.history.replaceState(
                            {},
                            document.title,
                            "#" + result.map(_ => _.title).join("#"))
                    }
                    // Prevents safari security exception (SecurityError (DOM Exception 18): Attempt to use history.replaceState() more than 100 times per 30.000000 seconds)
                    setTimeout(() => this.ticking = false, 100)
                })
            }
            this.ticking = true
        })
    }

    componentWillUnmount = () => {
        if(this.scrollListener)
            window.removeEventListener("scroll", this.scrollListener)
    }

    state = {
        css: { TreeView: "PlannerTree" },
        category: "subs",
        selection: [],
        display: (item, ancestors) => <a href={ `${ancestors.map(a => "#" + a.title).join("")}#${item.title}` }>{ item.title }</a>,
        onSelect: _ => { if(_.length > 0) { this.setState({ selection: _ }) } },
        strategies: {
            selection: ["ancestors"],
            fold: [ "max-depth", "not-selected", "no-child-selection" ]
        },
        noOpener: "yes"
    }

    render = () => !this.props.plan ? null :
        <div className="Planner">
            <div className="Planner opener" ref={ ref => this.opener = ref }>
                <i className={ "fa " + css.classes({
                    "fa-bars": !this.state.opened,
                    "fa-times": this.state.opened
                })}></i>
            </div>
            <div ref={ ref => this.sidePanel = ref } className={ "Planner side-panel " + css.classes({ opened: this.state.opened }) }>
                <div><h1>Table of contents</h1></div>
                <TreeView model={ this.props.plan } maxDepth={ this.props.maxDepth } { ...this.state }></TreeView>
            </div>
            <div className="Planner content">{ processContent(this.props.plan) }</div>
        </div>

})