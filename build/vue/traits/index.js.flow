export * from "./labels"
export * from "./transitions"

/* HOC reducer helper */
export const combine = (...factories) => Component =>
    factories.reduce((accu, factory) => factory(accu), Component)
