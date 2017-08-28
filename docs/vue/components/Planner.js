import { combine, withListener } from "bosket/vue/traits"
import { css } from "bosket/tools"
import { TreeView } from "bosket/vue"

import "self/common/styles/Planner.css"

export default combine(
    withListener({ prop: "clickListener", autoMount: true }),
    withListener({ eventType: "scroll", prop: "scrollListener", autoMount: true, regulate: true }),
    withListener({ eventType: "scroll", prop: "offsetListener", autoMount: true, regulate: true })
)({
    name: "Planner",
    props: [ "plan", "maxDepth", "sticky", "clickListener", "scrollListener", "offsetListener" ],
    data() {
        return {
            conf: {
                css: { TreeView: "PlannerTree" },
                category: "subs",
                selection: [],
                display: (item, inputs) => <a href={ `${inputs.ancestors.map(a => "#" + a.title).join("")}#${item.title}` }>{ item.title }</a>,
                onSelect: _ => { if(_.length > 0) { this.conf = { ...this.conf, selection: _ } } },
                noOpener: true
            },
            opened: false
        }
    },
    mounted() {
        this.clickListener.subscribe(this.onDocumentClick)
        this.scrollListener.subscribe(this.onDocumentScroll)
        this.offsetListener.subscribe(this.onStickyScroll)
        this.selection = this.findPosition()
    },
    methods: {
        onDocumentClick(ev) {
            if(!(ev.target instanceof HTMLElement)) return
            if(this.$refs.opener && this.$refs.opener.contains(ev.target)) {
                this.opened = !this.opened
            } else if(this.opened && this.$refs.sidePanel && !this.$refs.sidePanel.contains(ev.target))
                this.opened = false
        },
        findPosition() {
            const position = []
            const loop = (arr, acc = []) => {
                for(let i = 0; i < arr.length; i++) {
                    const elt = arr[i]
                    const domElt = document.getElementById(acc.length > 0 ? acc.join("#") + "#" + elt.title : elt.title)
                    if(domElt && domElt.parentElement &&
                            domElt.parentElement.getBoundingClientRect().top <= 50 &&
                            domElt.parentElement.getBoundingClientRect().bottom > 10) {
                        position.push(elt)
                        if(elt.subs)
                            loop(elt.subs, [ ...acc, elt.title ])
                        break
                    }
                }
            }
            loop(this.plan)
            return position
        },
        onDocumentScroll(ev, end) {
            const position = this.findPosition()
            const newHash = "#" + position.map(_ => _.title).join("#")
            if(newHash !== (window.location.hash || "#")) {
                this.conf = { ...this.conf, selection: position }
                window.history && window.history.replaceState(
                    {},
                    document.title,
                    "#" + position.map(_ => _.title).join("#"))
            }

            // Prevents safari security exception (SecurityError (DOM Exception 18): Attempt to use history.replaceState() more than 100 times per 30.000000 seconds)
            setTimeout(() => end(), 100)
        },
        onStickyScroll(ev, end) {
            if(!this.sticky) return
            if(this.$refs.content.getBoundingClientRect().top > 0) {
                this.$refs.sidePanel.style.position = "absolute"
                this.$refs.sidePanel.style.top = ""
                end()
            } else {
                this.$refs.sidePanel.style.position = "fixed"
                this.$refs.sidePanel.style.top = "0px"
                end()
            }
        }
    },
    render(h) {
        const maxDepth = this.maxDepth
        const props = {
            props: {
                ...this.conf,
                strategies: {
                    selection: ["ancestors"],
                    fold: [
                        function() {
                            return this.inputs.get().depth >= maxDepth
                        },
                        "not-selected",
                        "no-child-selection" ]
                }
            }
        }

        return !this.plan ? null :
            <div class="Planner">
                <div class="Planner opener" ref="opener">
                    <i class={ "fa " + css.classes({
                        "fa-bars": !this.opened,
                        "fa-times": this.opened
                    })}></i>
                </div>
                <aside ref="sidePanel" class={ "Planner side-panel " + css.classes({ opened: this.opened }) }>
                    <div><h1>Table of contents</h1></div>
                    <TreeView model={ this.plan } { ...props }></TreeView>
                </aside>
                <div ref="content" class="Planner content">
                    { processContent(h, this.plan) }
                </div>
            </div>
    }
})

const headerLevel = (h, depth, prefix, item) => {
    const id = prefix ? `${prefix}#${item.title}` : item.title
    const editLink = !item.editLink ? null : <a href={ item.editLink } target="_blank" rel=" noopener noreferrer"><i class="fa fa-pencil"></i></a>
    return h(
        "h" + depth,
        {
            attrs: { id: id },
            "class": {
                Planner: true,
                heading: true
            }
        },
        [
            <span>{ item.title }</span>,
            <span class="icons">
                <a href={ "#" + id }><i class="fa fa-link"></i></a>
                { editLink }
            </span>
        ]
    )
}

const processContent = (h, plan, parentPrefix = "", depth = 1) => {
    if(!plan && plan.length < 1)
        return null

    return plan.map(item =>
        <div class={ depth === 1 ? "chapter" : "planner-section" } key={ item.title }>
            { headerLevel(h, depth, parentPrefix, item) }
            { item.content && item.content(h) }
            { item.subs && item.subs.length > 0 ?
                processContent(h, item.subs, parentPrefix ? `${parentPrefix}#${item.title}` : item.title, depth + 1) :
                null
            }
        </div>
    )
}
