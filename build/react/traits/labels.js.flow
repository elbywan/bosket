// @flow

/* Adds i18n support through customisable labels. */

import React from "react"

import type { trait } from "./helpers"
import { displayName } from "./helpers"

export const withLabels : trait<> = (defaultLabels: Object) => Component =>
    class extends React.Component {
        static displayName = displayName("withLabels", Component)
        render() {
            return <Component { ...this.props } labels={ { ...defaultLabels, ...this.props.labels } }></Component>
        }
    }
