export const css = {
    classes: classes => {
        const css = []
        for(const key in classes) {
            if(classes[key]) {
                css.push(key)
            }
        }
        return css.join(" ")
    },
    addClass: (elt, cname) =>
        elt.className = elt.className
            .split(" ")
            .filter(c => c !== cname)
            .join(" ") + " " + cname,
    removeClass: (elt, cname) =>
        elt.className = elt.className
            .split(" ")
            .filter(c => c !== cname)
            .join(" "),
    hasClass: (elt, cname) => elt.className.indexOf(cname) >= 0
}