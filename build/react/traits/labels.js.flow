// @flow

/* Adds i18n support through customisable labels. */

import React from "react"

import type { trait } from "./helpers"
import { displayName } from "./helpers"

export const withLabels : trait<> = (defaultLabels: Object) => Component =>
    class extends React.Component<*, *> {
        static displayName = displayName("withLabels", Component)
        labels = { ...defaultLabels }

        constructor(props) {
            super(props)
            this.labels = { ...defaultLabels, ...props.labels }
        }

        componentWillUpdate(nextProps) {
            if(nextProps.labels !== this.props.labels)
                this.labels = { ...defaultLabels, ...nextProps.labels }
        }

        render() {
            return <Component { ...this.props } labels={ this.labels }></Component>
        }
    }
