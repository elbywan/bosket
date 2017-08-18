// @flow

export const string = (str: string) => ({
    contains: (input: string) => !!str && !!str.match(new RegExp(`.*${ input }.*`, "gi"))
})
