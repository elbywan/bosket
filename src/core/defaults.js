export const defaults = {
    labels: {
        "search.placeholder": "Search box"
    },
    css: {
        /* moar css */
        ItemTree:           "ItemTree",
        opener:             "opener",
        depth:              "depth",
        selected:           "selected",
        category:           "category",
        folded:             "folded",
        disabled:           "disabled",
        async:              "async",
        loading:            "loading",
        nodrop:             "nodrop",
        dragover:           "dragover",
        search:             "search",
        item:               "item"
    },
    strategies: {
        selection: ["modifiers"],
        click: [],
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