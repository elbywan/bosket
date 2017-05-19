export const defaults = {
    labels: {
        "search.placeholder": "Search box"
    },
    css: {
        /* moar css */
        depth:      "depth",
        selected:   "selected",
        category:   "category",
        folded:     "folded",
        disabled:   "disabled",
        async:      "async",
        loading:    "loading"
    },
    strategies: {
        selection: ["modifiers"],
        click: ["unfold-on-selection"],
        fold: ["opener-control"]
    },
    display: _ => _.toString(),
    async: _ => _(),
    noOpener: false,
    dragndrop: {
        draggable: false,
        droppable: false
    }
}