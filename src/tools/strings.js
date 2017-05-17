export const string = str => ({
    contains: input => str.match(new RegExp(`.*${ input }.*`, "gi"))
})