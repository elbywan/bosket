// @flow

import React from "react"
import "./Planner.css"

import { TreeView } from "bosket/react"
import { css } from "bosket/tools"
import { withListener, combine } from "bosket/react/traits"

const headerLevel = (depth, prefix, inner) => {
    const id = prefix ? `${prefix}#${inner}` : inner
    return React.createElement("h" + depth, {
        id: id,
        className: "Planner heading"
    },
        <span>{ inner }</span>,
        <a href={ "#" + id }><i className="fa fa-link"></i></a>
    )
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

type Plan = {
    title: string,
    content?: React.Element<>,
    subs?: Plan[]
}

export const Planner = combine(
    withListener({ propName: "clickListener", autoMount: true }),
    withListener({ eventType: "scroll", propName: "scrollListener", autoMount: true, regulate: true }),
    withListener({ eventType: "scroll", propName: "offsetListener", autoMount: true, regulate: true })
)(class extends React.PureComponent {

    props : {
        plan: Plan[],
        clickListener?: Object,
        scrollListener?: Object,
        offsetListener?: Object,
        maxDepth?: number,
        sticky?: boolean
    }

    state = {
        conf: {
            css: { TreeView: "PlannerTree" },
            category: "subs",
            selection: [],
            display: (item, ancestors) => <a href={ `${ancestors.map(a => "#" + a.title).join("")}#${item.title}` }>{ item.title }</a>,
            onSelect: _ => { if(_.length > 0) { this.setState({ conf: { ...this.state.conf, selection: _ }}) } },
            strategies: {
                selection: ["ancestors"],
                fold: [ "max-depth", "not-selected", "no-child-selection" ]
            },
            noOpener: true
        },
        opened: false
    }
    opener: HTMLElement
    sidePanel: HTMLElement
    content: HTMLElement
    ticking = false

    componentDidMount = () => {
        this.props.clickListener && this.props.clickListener.subscribe((ev: Event) => {
            if(!(ev.target instanceof HTMLElement)) return
            if(this.opener && this.opener.contains(ev.target)) {
                this.setState({ opened: !this.state.opened })
            } else if(this.state.opened && this.sidePanel && !this.sidePanel.contains(ev.target))
                this.setState({ opened: false })
        })

        this.props.scrollListener && this.props.scrollListener.subscribe((ev: Event, end: void => void) => {
            const result = []
            const loop = (arr, acc = []) => {
                for(let i = 0; i < arr.length; i++) {
                    const elt = arr[i]
                    const domElt = document.getElementById(acc.length > 0 ? acc.join("#") + "#" + elt.title : elt.title)
                    if(domElt && domElt.parentElement &&
                            domElt.parentElement.getBoundingClientRect().top <= 50 &&
                            domElt.parentElement.getBoundingClientRect().bottom > 10) {
                        result.push(elt)
                        if(elt.subs)
                            loop(elt.subs, [ ...acc, elt.title ])
                        break
                    }
                }
            }
            loop(this.props.plan)
            this.setState({ conf: { ...this.state.conf, selection: result }})
            const newHash = "#" + result.map(_ => _.title).join("#")
            if(newHash !== window.location.hash) {
                window.history && window.history.replaceState(
                    {},
                    document.title,
                    "#" + result.map(_ => _.title).join("#"))
            }

            // Prevents safari security exception (SecurityError (DOM Exception 18): Attempt to use history.replaceState() more than 100 times per 30.000000 seconds)
            setTimeout(() => end(), 100)
        })

        this.props.offsetListener && this.props.offsetListener.subscribe((ev: Event, end: void => void) => {
            if(this.sidePanel && this.content && this.props.sticky) {
                if(this.content.getBoundingClientRect().top > 0) {
                    this.sidePanel.style.position = "absolute"
                    this.sidePanel.style.top = ""
                } else {
                    this.sidePanel.style.position = "fixed"
                    this.sidePanel.style.top = "0px"
                }
            }
            end()
        })
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
                <TreeView model={ this.props.plan } maxDepth={ this.props.maxDepth } { ...this.state.conf }></TreeView>
            </div>
            <div ref={ ref => this.content = ref } className="Planner content">
                { processContent(this.props.plan) }
            </div>
        </div>

})
