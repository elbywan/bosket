import * as strategies from "./strategies"

export declare const defaults : {
    labels: string,
    css: { [key: string]: string },
    strategies: {
        selection:  Array<string | strategies.selectionStrategy<any>>
        click:      Array<string | strategies.clickStrategy<any>>,
        fold:       Array<string | strategies.foldStrategy<any>>
    },
    display: (Object) => string,
    async: (Function) => Promise<any>,
    noOpener: boolean,
    draggable: boolean
}