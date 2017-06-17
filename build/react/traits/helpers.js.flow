// @flow

import React from "react"

export type FunctionComponent<P> = (props: P) => ?React.Element<any>
export type ClassComponent<D, P, S> = Class<React.Component<D, P, S>>

export type factory<P: Object> = (ClassComponent<void, P, *> | FunctionComponent<P>) => ClassComponent<void, P, *>
// _ is a workaround to keep bypass generic type destruction
/* eslint-disable */
export type trait<_ = any> = Object => factory<*>
/* eslint-enable */

export const displayName = (name: string, WrappedComponent: *) =>
    `${name}(${ WrappedComponent.displayName || WrappedComponent.name || "Component" })`
