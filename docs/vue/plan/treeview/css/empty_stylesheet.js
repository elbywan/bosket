export default `
/* Elements */
.TreeView ul {}
.TreeView ul > li {}
.TreeView ul > li > span.item {}
.TreeView > input[type="search"] {}

/* Root list */
.TreeView ul.depth-0 {}

/* Not disabled */
.TreeView ul li:not(.disabled) {}
.TreeView ul li:not(.disabled) > span.item {}

/* Selected */
.TreeView ul li.selected {}
.TreeView ul li.selected > span.item {}

/* Categories : Nodes with children */
.TreeView ul li.category {}
.TreeView ul li.category > span.item {}
/* Folded */
.TreeView ul li.category.folded {}
.TreeView ul li.category.folded > span.item {}
/* Unfolded */
.TreeView ul li.category:not(.folded) {}
.TreeView ul li.category:not(.folded) > span.item {}
/* Opener */
.TreeView ul li.category > span.item > .opener {}
.TreeView ul li.category > span.item > .opener::after {}
/* Folded async */
.TreeView li.category.async {}
.TreeView li.category.async > span.item {}
/* Loading async */
.TreeView li.category.loading {}
.TreeView li.category.loading > span.item {}

/* Animations on component creation / destruction */
.TreeViewTransition-enter {}
.TreeViewTransition-enter-active {}
.TreeViewTransition-leave {}
.TreeViewTransition-leave-active {}

/* Drag'n'drop */
.TreeView ul.dragover {}
.TreeView li.dragover {}
.TreeView li.dragover > span.item {}
.TreeView li.nodrop {}
.TreeView li.nodrop > span.item {}`