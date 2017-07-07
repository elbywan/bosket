// @flow

export const object = (self: Object) => {
    if(!self || !(self instanceof Object)) {
        throw new Error("Bad object format")
    }

    return {
        shallowCompare: (obj: Object, excludes: string[]) => {
            let equals = true
            for(const key in self) {
                if(self.hasOwnProperty(key)) {
                    if(!(excludes && excludes.indexOf(key) >= 0) && obj[key] !== self[key]) {
                        equals = false
                        return
                    }
                }
            }
            return equals
        },
        filter: (fun: mixed => boolean) : Object => {
            const copy = {}
            for(const prop in self) {
                if(self.hasOwnProperty(prop) && fun(self[prop]))
                    copy[prop] = self[prop]
            }
            return copy
        },
        map: (fun: mixed => mixed) : Object => {
            const copy = {}
            for(const prop in self) {
                if(self.hasOwnProperty(prop))
                    copy[prop] = fun(self[prop])
            }
            return copy
        },
        fullMap: (fun: (string, mixed) => [string, mixed]) : Object => {
            const copy = {}
            for(const prop in self) {
                if(self.hasOwnProperty(prop)) {
                    const [ newProp, newVal ] = fun(prop, self[prop])
                    copy[newProp] = newVal
                }
            }
            return copy
        },
        nestPrefix: (prefix: string, transform: string => string = _ => _) : Object => {
            const copy = { [prefix]: {}}
            for(const prop in self) {
                if(self.hasOwnProperty(prop) && prop.startsWith(prefix)) {
                    copy[prefix][transform(prop.substring(prefix.length))] = self[prop]
                } else {
                    copy[prop] = self[prop]
                }
            }
            return copy
        }
    }
}
