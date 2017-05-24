import { mixin, printer } from "../tools/mixin"
import React from "react"

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup"

/* Setup higher order component with a readable name. */
const setupHoc = (hocFactory, name) => Component => {
    const hoc = hocFactory(Component)
    hoc.displayName = `${name}(${Component.displayName || Component.name || "Component"})`
    return hoc
}

/* HOC reducer helper */
export const combine = (...traits) => Component =>
    traits.reduce((accu, trait) => trait(accu), Component)


/* Adds i18n support through customisable labels. */
export const withLabels = defaultLabels => setupHoc(Component => ({ labels = {}, ...rest }) =>
    <Component labels={ mixin(defaultLabels, labels) } { ...rest } ></Component>
, "withLabels")

/* Adds a configurable global listener. */
export const withListener = ({
        eventType = "click",
        propName = "globalListener",
        mountOn = null,
        autoMount = false } = {}) => setupHoc(Component =>
    class extends React.Component {

        /* Lifecycle */

        constructor(props) {
            super(props)
            if(autoMount) this.mount()
        }

        componentWillUnmount() {
            this.unmount()
        }

        componentWillReceiveProps(nextProps) {
            if(mountOn) mountOn.bind(this)(nextProps) ? this.mount() : this.unmount()
        }

        /* Subscriptions */

        callback = null
        subscribe = cb => {
            this.callback = cb
        }
        onEvent = function(event) {
            if(this.callback) this.callback(event)
        }.bind(this)

        /* Events */

        mount = () => {
            if(!this.listening) {
                document.addEventListener(eventType, this.onEvent)
                this.listening = true
            }
        }

        unmount = () => {
            if(this.listening) {
                document.removeEventListener(eventType, this.onEvent)
                this.listening = false
            }
        }

        /* Rendering */

        render() {
            const listener = {
                [propName]: {
                    subscribe: this.subscribe,
                    mount:     this.mount,
                    unmount:   this.unmount
                }
            }
            return <Component { ...listener } { ...this.props } ></Component>
        }

    }, "withListener")

/* Adds transitions on component mount / unmount. */
export const withTransition = ({ key }) => setupHoc(Component => props =>
    props.transition ?
        <CSSTransitionGroup { ...props.transition }>
            <Component { ...props } key={ key(props) }></Component>
        </CSSTransitionGroup> :
        <Component { ...props }></Component>
, "withTransition")

/* Add debug info for component updates */
export const withDebugUpdates = (print = (a => a)) => setupHoc(Component =>
    class extends React.Component {

        monkeyPatch = ref => {
            if(!ref) return
            const originalFunction = ref.shouldComponentUpdate
            const shouldComponentUpdate = function(nextProps, nextState) {
                const propsDiff = []
                const stateDiff = []
                for(const key in nextProps) {
                    if(nextProps[key] !== ref.props[key])
                        propsDiff.push(key)
                }
                for(const key in nextState) {
                    if(nextState[key] !== ref.state[key])
                        stateDiff.push(key)
                }
                /* eslint-disable */
                printer.debug(`shouldComponentUpdate [${print(ref)}]`, `State diff : ${stateDiff}\nProps diff : ${propsDiff}`)
                /* eslint-enable */
                return originalFunction.bind(ref)(nextProps, nextState)
            }
            ref.shouldComponentUpdate = shouldComponentUpdate
        }

        render = () =>
            <Component {...this.props}
                ref={ ref => this.monkeyPatch(ref) }>
            </Component>

    }, "withDebugUpdates")