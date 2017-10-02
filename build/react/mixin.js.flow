// @flow
export const deepMix = function<O: Object, O2: Object>(one: O, two: O2, mergeArrays: boolean = false) : O | O & O2 {
    if(!one || !two || typeof one !== "object" || typeof two !== "object")
        return one

    const clone : O & O2 = { ...one, ...two }
    for(const prop: $Keys<O2> in two) {
        if(two.hasOwnProperty(prop)) {
            if(two[prop] instanceof Array && one[prop] instanceof Array) {
                clone[prop] = mergeArrays ? [ ...one[prop], ...two[prop] ] : clone[prop] = two[prop]
            } else if(typeof two[prop] === "object" && typeof one[prop] === "object") {
                clone[prop] = deepMix(one[prop], two[prop], mergeArrays)
            }
        }
    }

    return clone
}
