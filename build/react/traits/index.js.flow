// @flow

import type { factory, ClassComponent } from "./helpers"

/* HOC reducer helper */
export const combine = (...factories : factory<*>[]) =>
    <P: any>(Component: ClassComponent<P, *>) : ClassComponent<P, *> =>
        factories.reduce((accu, factory) => factory(accu), Component)

export * from "./listener"
export * from "./labels"
export * from "./transitions"
export * from "./debug"
