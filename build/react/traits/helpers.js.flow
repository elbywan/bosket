// @flow

import React from "react"

export type FunctionComponent<P> = (props: P) => ?React$Element<any>
export type ClassComponent<P, S> = Class<React.Component<P, S>>

export type factory<P: Object> = (ClassComponent<P, *> | FunctionComponent<P>) => ClassComponent<P, *>
// _ is a workaround to keep bypass generic type destruction
/* eslint-disable */
export type trait<_ = any> = Object => factory<*>
/* eslint-enable */

export const displayName = (name: string, WrappedComponent: *) =>
    `${name}(${ WrappedComponent.displayName || WrappedComponent.name || "Component" })`
