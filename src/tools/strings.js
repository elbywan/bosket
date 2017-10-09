// @flow

/* eslint-disable no-useless-escape */
export const string = (str: string) => ({
    contains: (input: string) => !!str &&
        !!str.match(new RegExp(`.*${ input.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") }.*`, "gi"))
})
