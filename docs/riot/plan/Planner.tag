<planner>
    <div class="Planner">
        <div class="Planner opener" ref="opener">
            <i class={
                "fa": true,
                "fa-bars": !opened,
                "fa-times": opened
            }></i>
        </div>
        <aside ref="sidePanel" class={ "Planner": true, "side-panel": true, opened: opened }>
            <div><h1>Table of contents</h1></div>
            <TreeView
                model={ opts.plan }
                css={{ TreeView: "PlannerTree" }}
                category="subs"
                selection={ selection }
                onselection={ updateSelection }
                strategies={{ selection: ["ancestors"], fold: [ foldDepth(), "not-selected", "no-child-selection" ]}}
                openeropts={{ position: "none" }}
                displaytag={ display }>
            </TreeView>
        </aside>
        <div ref="content" class="Planner content">
            <div each={ p in opts.plan }>
                <planner-content plan={ p }></planner-content>
            </div>
        </div>
    </div>

    <script>
        import { listenerMixin } from "@bosket/riot"
        import "self/common/styles/Planner.css"

        this.mixin(listenerMixin({ callback: e => this.onDocumentClick(e) }))
        this.mixin(listenerMixin({ eventType: "scroll", callback: (..._) => this.onDocumentScroll(..._), regulate: true }))
        this.mixin(listenerMixin({ eventType: "scroll", callback: (..._) => this.onStickyScroll(..._), regulate: true }))

        this.selection = []
        this.opened = false
        this.updateSelection = _ => {
            this.selection = _
            this.update()
        }
        this.display = item => "display-planner-content"
        this.foldDepth = () => {
            const max = this.opts.maxdepth
            return function() {
                return this.inputs.get().depth >= max
            }
        }
        this.findPosition = () => {
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
            loop(this.opts.plan)
            return position
        }
        this.one("mount", () => {
            this.selection = this.findPosition()
            this.update()
        })

        this.onDocumentClick = ev => {
            if(!(ev.target instanceof HTMLElement)) return
            if(this.refs.opener && this.refs.opener.contains(ev.target)) {
                this.opened = !this.opened
            } else if(this.opened && this.refs.sidePanel && !this.refs.sidePanel.contains(ev.target)) {
                this.opened = false
            }
            this.update()
        }

        this.onDocumentScroll = (ev, end) => {
            const position = this.findPosition()
            const newHash = "#" + position.map(_ => _.title).join("#")
            if(newHash !== (window.location.hash || "#")) {
                this.selection = position
                this.update()
                window.history && window.history.replaceState(
                    {},
                    document.title,
                    "#" + position.map(_ => _.title).join("#"))
            }

            // Prevents safari security exception (SecurityError (DOM Exception 18): Attempt to use history.replaceState() more than 100 times per 30.000000 seconds)
            setTimeout(() => end(), 100)
        }

        this.onStickyScroll = (ev, end) => {
            if(!this.opts.sticky) return
            if(this.refs.content.getBoundingClientRect().top > 0) {
                this.refs.sidePanel.style.position = "absolute"
                this.refs.sidePanel.style.top = ""
                end()
            } else {
                this.refs.sidePanel.style.position = "fixed"
                this.refs.sidePanel.style.top = "0px"
                end()
            }
        }

    </script>
</planner>

<planner-content>
    <div class={ depth === 1 ? "chapter" : "planner-section" }>
        <h1 if={ depth === 1 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </h1>
        <h2 if={ depth === 2 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </h2>
        <h3 if={ depth === 3 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </h3>
        <h4 if={ depth === 4 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </h4>
        <h5 if={ depth === 5 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </h5>
        <h6 if={ depth === 6 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </h6>
        <p if={ depth > 6 } id={ id() } class="Planner heading">
            <span>{ plan.title }</span>
            <span class="icons">
                <a href={ "#" + id() }><i class="fa fa-link"></i></a>
                <a if={ plan.editLink } href={ plan.editLink } target="_blank" rel=" noopener noreferrer">
                    <i class="fa fa-pencil"></i>
                </a>
            </span>
        </p>
        <div data-is={ plan.content }></div>
        <div if={ plan.subs }>
            <div each={ s in plan.subs }>
                <planner-content plan={ s } prefix={ prefix ? prefix+'#'+plan.title : plan.title } depth={ depth + 1 }></planner-content>
            </div>
        </div>
    </div>

    <script>
        this.plan = this.opts.plan
        this.depth = this.opts.depth || 1
        this.prefix = this.opts.prefix || ""
        this.id = () =>
            this.prefix ? `${this.prefix}#${this.plan.title}` : this.plan.title
    </script>
</planner-content>

<display-planner-content>
    <a href={ href() }>{ opts.item.title }</a>

    <script>
        this.href = () => {
            return `${this.opts.inputs.ancestors.map(a => "#" + a.title).join("")}#${this.opts.item.title}`
        }
    </script>
</display-planner-content>
