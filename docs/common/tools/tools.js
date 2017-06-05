export const indent = (str, ...params) => {
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
    ).join("\n")
}