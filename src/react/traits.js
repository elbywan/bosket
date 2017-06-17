// @flow

import React from "react"
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup"
import { printer } from "../tools/printer"

type FunctionComponent<P> = (props: P) => ?React.Element<any>
type ClassComponent<D, P, S> = Class<React.Component<D, P, S>>

type factory<P: Object> = (ClassComponent<void, P, *> | FunctionComponent<P>) => ClassComponent<void, P, *>
// _ is a workaround to keep bypass generic type destruction
/* eslint-disable */
type trait<_ = any> = Object => factory<*>
/* eslint-enable */

/* HOC reducer helper */
export const combine = (...factories : factory<*>[]) =>
    <P: any>(Component: ClassComponent<void, P, *>) : ClassComponent<void, P, *> =>
        factories.reduce((accu, factory) => factory(accu), Component)

const displayName = (name, WrappedComponent) =>
    `${name}(${ WrappedComponent.displayName || WrappedComponent.name || "Component" })`

/* Adds i18n support through customisable labels. */
export const withLabels : trait<> = (defaultLabels: Object) => Component =>
        class extends React.Component {
            static displayName = displayName("withLabels", Component)
            render() {
                return <Component { ...this.props } labels={ { ...defaultLabels, ...this.props.labels } }></Component>
            }
        }

/* Adds a configurable global listener. */
export const withListener : trait<> = ({
        eventType = "click",
        propName = "listener",
        mountOn = null,
        autoMount = false,
        regulate = false } = {}) => Component =>
    class extends React.Component<void, { listener: Object }, void> {

        static displayName = displayName("withListener", Component)
        listening = false
        ticking = false

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
        subscribe = (cb: (Event, ?(void => void)) => mixed) => {
            this.callback = cb
        }
        onEvent = function(event: Event) {
            if(this.callback) {
                if(regulate) {
                    if(!this.ticking) {
                        const callback = this.callback
                        window.requestAnimationFrame(() => callback(event, () => { this.ticking = false }))
                    }
                    this.ticking = true
                } else
                    this.callback(event)
            }
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
    }

/* Adds transitions on component mount / unmount. */
export const withTransition : trait<> = ({ key }) => Component =>
    class extends React.PureComponent {
        static displayName = displayName("withTransition", Component)
        render = () =>
            this.props.transition ?
                <CSSTransitionGroup { ...this.props.transition }>
                    <Component { ...this.props } key={ key(this.props) }></Component>
                </CSSTransitionGroup> :
            <Component { ...this.props }></Component>
    }

/* Add debug info for component updates */
export const withDebugUpdates : trait<> = ({ print = (_:string) : string => _ }) => Component =>
    class extends React.Component {
        static displayName = displayName("withDebugUpdates", Component)
        monkeyPatch = (ref: Object) => {
            if(!ref) return
            const originalFunction = ref.shouldComponentUpdate
            ref.shouldComponentUpdate = function(nextProps, nextState, nextContext) {
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
                printer.debug(`shouldComponentUpdate [${print(ref.toString())}]`, `State diff : ${stateDiff.join(" ")}\nProps diff : ${propsDiff.join(" ")}`)
                /* eslint-enable */
                return originalFunction.bind(ref)(nextProps, nextState)
            }
        }

        render = () =>
            <Component {...this.props}
                ref={ ref => this.monkeyPatch(ref) }>
            </Component>

    }
