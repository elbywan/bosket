export default `
<!-- Presets override this class with the preset component name. -->
<div class="TreeView">

    <!-- If [search](#TreeView#Optional properties#search) is defined, hidden otherwise.-->
    <input type="search" class="search" />

    <!-- 'depth-0'' is the root list, each nested list has the depth incremented by 1 -->
    <ul class="depth-0">
        <li>
            <span class="item">
                <!-- Output of the [display](#TreeView#Optional properties#display) function.-->
                <!-- If a [displayComponent](#TreeView#Optional properties#displayComponent) is set, then : -->
                <ng-component>
                    <!-- Or whatever selector the component is configured with. -->
                </ng-component>
            </span>
        </li>

        <!-- If the item is selected. -->
        <li class="selected">
            <span class="item"></span>
        </li>

        <!-- A category is a node having children. This node is folded, its children are hidden. -->
        <li class="folded category">
            <span class="item">
                <!-- If [openerOpts](#TreeView#Optional properties#openerOpts) position is set, hidden otherwise. -->
                <span class="opener"></span>
            </span>
        </li>

        <!-- This category is not folded. -->
        <li class="category">
            <span class="item"><span class="opener"></span></span>

            <!-- Children. -->
            <ul class="depth-1">

                <!-- Asynchronous, folded node. See [async](#TreeView#Optional properties#async). -->
                <li class="category folded async">
                    <span class="item"><span class="opener"></span></span>
                </li>

                <!-- This async is currently fetching its children, waiting for the Promise to resolve. See [async](#TreeView#Optional properties#async). -->
                <li class="category loading">
                    <span class="item"><span class="opener"></span></span>
                </li>

                <!-- Disabled item, cannot be selected. See [disabled](#TreeView#Optional properties#disabled). -->
                <li class="disabled">
                    <span class="item"><span class="opener"></span></span>
                </li>

                <!-- An item is being dragged over. See [dragndrop](#TreeView#Optional properties#dragndrop). -->
                <li class="dragover">
                    <span class="item"><span class="opener"></span></span>
                </li>

                <!-- An invalid drop target. See [dragndrop](#TreeView#Optional properties#dragndrop). -->
                <li class="nodrop">
                    <span class="item"><span class="opener"></span></span>
                </li>
            </ul>
        </li>
    </ul>
</div>`
