export const mixin = function(target, mix) {
    if(!target || !mix || typeof target !== "object" || typeof mix !== "object")
        return {}

    const clone = {}
    for(const prop in target) {
        if(target.hasOwnProperty(prop))
            clone[prop] = target[prop]
    }
    for(const prop in mix) {
        if(mix.hasOwnProperty(prop)) {
            clone[prop] = mix[prop]
        }
    }

    return clone
}

export const deepMix = function(one, two, mergeArrays = false) {
    if(!one || !two || typeof one !== "object" || typeof two !== "object")
        return {}

    const clone = { ...one }
    for(const prop in two) {
        if(two.hasOwnProperty(prop)) {
            if(two[prop] instanceof Array && one[prop] instanceof Array) {
                clone[prop] = mergeArrays ? [ ...one[prop], ...two[prop] ] : clone[prop] = two[prop]
            } else if(typeof two[prop] === "object" && typeof one[prop] === "object") {
                clone[prop] = deepMix(one[prop], two[prop], mergeArrays)
            } else {
                clone[prop] = two[prop]
            }
        }
    }

    return clone
}