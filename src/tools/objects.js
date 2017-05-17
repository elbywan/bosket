export const object = self => {
    if(!self || !(self instanceof Object)) {
        throw new Error("Bad object format")
    }

    return {
        shallowCompare: (obj, excludes) => {
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
        }
    }
}