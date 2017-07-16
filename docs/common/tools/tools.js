// @flow

export const indent = (str: string | string[], ...params: any[]) => {
    let fullStr = str instanceof Array ? str[0] : str
    for(let i = 0; i < params.length; i++) {
        fullStr += params[i]
        if(i + 1 < str.length)
            fullStr += str[i + 1]
    }

    let lines = fullStr.split(/\r?\n/)
    lines = lines.filter((line, idx) => idx !== 0 && idx !== lines.length - 1 || line.length > 0)
    if(lines.length < 2)
        return fullStr.trim()

    const spaceSplit = lines[0].split(/\S+/)
    const baseIndent = spaceSplit.length < 2 ? 0 : spaceSplit[0].length

    return lines.map(line =>
        line.length < baseIndent ?
            line :
            line.substring(baseIndent)
    ).join("\n").trim()
}

const memoize : Map<string, string> = new Map()
export const loadFile = (filePath: string, cb: string => void) => {
    const memoized = memoize.get(filePath)
    if(memoized)
        return cb(memoized)

    const req = new XMLHttpRequest()

    req.onreadystatechange = function(event) {
        if(this.readyState === 4) {
            if(this.status === 200) {
                memoize.set(filePath, this.responseText)
                cb(this.responseText)
            }
        }
    }

    req.open("GET", filePath, true)
    req.send(null)
}
