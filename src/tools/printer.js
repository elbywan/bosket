export const printer = {
    debug: (title, msg) => {
        const headerStyle = "background-color: red; color: white; font-size: 1.1em; font-weight: bold; padding: 3px 10px; border-radius: 5px"
        const titleStyle = "color: #444; font-weight: bold; font-size: 1.1em"
        const msgStyle = "color: #222; font-weight: bold"
        /* eslint-disable */
        console.log(`%cDEBUG%c ${title}`, headerStyle, titleStyle)
        console.log(`%c${msg}`, msgStyle)
        /* eslint-enable */
    }
}