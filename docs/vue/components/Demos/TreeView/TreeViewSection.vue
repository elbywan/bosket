<template>
    <div>
        <div>
            <p>
                <span>Demonstrates a basic usage of the TreeView component </span>
                <span>and how to override and use most of its </span>
                <em><a href="#TreeView#Required properties">component props</a></em>, and&nbsp;
                <em><a href="#TreeView#Css">css styles</a></em>.
            </p>
            <span>Featuring :</span>
            <ul>
                <li>Drag and drop, with a custom drag image.</li>
                <li>Asynchronous children loading</li>
                <li>Multiselection using keyboard modifiers (shift / ctrl or cmd)</li>
                <li>Transitions on fold / unfold</li>
                <li>Alphabetical sort</li>
                <li>Search bar</li>
            </ul>
        </div>
        <component-demo componentName="Nested items" :files="files">
            <div :style="{ textAlign: 'center' }">
                <div :style="{ display: 'inline-block', textAlign: 'left' }">
                    <treeview-demo v-model="selection"></treeview-demo>
                </div>

                <p>
                    <span v-if="selection.length === 0">No elements are</span>
                    <span v-if="selection.length === 1">One element is</span>
                    <span v-if="selection.length > 1">{{ selection.length }} elements are</span>
                    selected.
                </p>
                <div class="select-blocks">
                    <button v-for="item in selection" @click="deselect(item)">{{ item.label }}</button>
                </div>
            </div>
        </component-demo>
    </div>
</template>

<script>
    import ComponentDemo from "../../ComponentDemo.vue"
    import TreeViewDemo from "./TreeViewDemo"

    export default {
        data() {
            return {
                files: [
                    "./components/Demos/TreeView/TreeViewDemo.js",
                    "./components/Demos/TreeView/TreeViewDemo.css",
                    "../common/models/TreeViewModel.js"
                ],
                selection: []
            }
        },
        methods: {
            deselect(item) { this.selection = this.selection.filter(i => i !== item) }
        },
        components: {
            "component-demo": ComponentDemo,
            "treeview-demo": TreeViewDemo
        }
    }
</script>
