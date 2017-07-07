<template>

    <div class="App">
        <h4 class="inline-row">This page is rendered using Vue.js 2.3.4</h4>
        <div class="components-container">
            <TreeViewDemo/>
        </div>
    </div>

</template>

<style>

    .App-intro {
        font-size: large;
    }

</style>

<script>

    import Vue from "vue"
    import TreeViewDemo from "./Demos/TreeView/TreeViewDemo"
    Vue.component("TreeViewDemo", TreeViewDemo)
    export default {}

</script>
