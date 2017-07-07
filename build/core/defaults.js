export var defaults = {
    labels: {
        "search.placeholder": "Search ..."
    },
    css: {
        TreeView: "TreeView",
        opener: "opener",
        depth: "depth",
        selected: "selected",
        category: "category",
        folded: "folded",
        disabled: "disabled",
        async: "async",
        loading: "loading",
        nodrop: "nodrop",
        dragover: "dragover",
        search: "search",
        item: "item"
    },
    strategies: {
        selection: ["single"],
        click: [],
        fold: ["not-selected", "no-child-selection"]
    },
    display: function display(_) {
        return _.toString();
    },
    async: function async(_) {
        return _();
    },
    noOpener: false,
    dragndrop: {
        draggable: false,
        droppable: false
    }
};
//# sourceMappingURL=defaults.js.map