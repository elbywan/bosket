// @flow

type arrayType<T> = {
    last: () => T | null,
    in: (T[], ?(T => boolean)) => T[],
    notIn: (T[], ?(T => boolean)) => T[],
    is: ({ isIn: T[][], notIn: T[][] }, ?(T => boolean)) => T[],
    contains: T => boolean,
    allIn: T[] => boolean
}

export const array = <T>(self: T[]) : arrayType<T> => ({
    last: () => self.length > 0 ? self[self.length - 1] : null,
    "in": (arr, otherCondition) => self.filter(elt =>
        arr.indexOf(elt) >= 0 && (!otherCondition || otherCondition(elt))),
    notIn: (arr, otherCondition) => self.filter(elt =>
        arr.indexOf(elt) < 0 && (!otherCondition || otherCondition(elt))),
    is: ({ isIn = [], notIn = []}, otherCondition) => self.filter(elt =>
        isIn.reduce((acc, curr) => curr.indexOf(elt) >= 0 && acc, true) &&
        notIn.reduce((acc, curr) => curr.indexOf(elt) < 0 && acc, true) &&
        (!otherCondition || otherCondition(elt))
    ),
    contains: element => self.indexOf(element) >= 0,
    allIn: arr => self.every(elt => arr.indexOf(elt) >= 0)
})
