// @flow

/* Adds transitions on component mount / unmount. */

import React from "react"
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup"

import type { trait } from "./helpers"
import { displayName } from "./helpers"

export const withTransition : trait<> = ({ key }) => Component =>
    class extends React.PureComponent<*, *> {
        static displayName = displayName("withTransition", Component)
        render = () =>
            this.props.transition ?
                <CSSTransitionGroup { ...this.props.transition }>
                    <Component { ...this.props } key={ key(this.props) }></Component>
                </CSSTransitionGroup> :
                <Component { ...this.props }></Component>
    }
