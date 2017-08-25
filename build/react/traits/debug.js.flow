// @flow

/* Add debug info for component updates */

import React from "react"

import type { trait } from "./helpers"
import { displayName } from "./helpers"

import { printer } from "../../tools/printer"

export const withDebugUpdates : trait<> = ({ print = (_:string) : string => _ } = {}) => Component =>
    class extends React.Component<*, *> {
        static displayName = displayName("withDebugUpdates", Component)
        monkeyPatch = (ref: Object) => {
            if(!ref) return true
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
                return originalFunction && originalFunction.bind(ref)(nextProps, nextState) || true
            }
        }

        render = () =>
            <Component {...this.props}
                ref={ ref => this.monkeyPatch(ref) }>
            </Component>

    }
