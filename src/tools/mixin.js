export default function(target, mix) {
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