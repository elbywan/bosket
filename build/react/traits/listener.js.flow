// @flow

/* Adds a configurable global listener. */

import React from "react"

import type { trait } from "./helpers"
import { displayName } from "./helpers"

export const withListener : trait<> = ({
    eventType = "click",
    propName = "listener",
    mountOn = null,
    autoMount = false,
    regulate = false
} = {}) => Component =>
    class extends React.Component<{ listener: Object }, void> {

        static displayName = displayName("withListener", Component)
        listening = false
        ticking = false
        listenerProp: {
            [key: string]: {
                subscribe: ((Event, ?(void => void)) => mixed) => void,
                mount:     () => void,
                unmount:   () => void
            }
        }

        /* Lifecycle */

        constructor(props) {
            super(props)
            if(autoMount) this.mount()
            this.listenerProp = {
                [propName]: {
                    subscribe: this.subscribe,
                    mount:     this.mount,
                    unmount:   this.unmount
                }
            }
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
            return <Component { ...this.listenerProp } { ...this.props } ></Component>
        }
    }
