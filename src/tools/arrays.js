export const array = self => {
    if(!self || !(self instanceof Array))
        throw new Error("Bad array format")

    return {
        last:   () => self.length > 0 ? self[self.length - 1] : null,
        "in":   (arr, otherCondition = elt => true) => self.filter(elt =>
            arr.indexOf(elt) >= 0 && otherCondition(elt)),
        notIn:  (arr, otherCondition = elt => true) => self.filter(elt =>
            arr.indexOf(elt) < 0 && otherCondition(elt)),
        is:     ({ isIn = [], notIn = []}, otherCondition = elt => true) => self.filter(elt =>
            isIn.reduce((acc, curr) => curr.indexOf(elt) >= 0 && acc, true) &&
            notIn.reduce((acc, curr) => curr.indexOf(elt) < 0 && acc, true) &&
            otherCondition(elt)),
        contains: element => self.indexOf(element) >= 0,
        allIn: arr => self.every(elt => arr.indexOf(elt) >= 0)
    }
}
