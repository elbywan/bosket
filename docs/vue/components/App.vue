<template>

    <div class="App">
        <Planner :plan="plan" :maxDepth="1" :sticky="true"></Planner>
    </div>

</template>

<script>

    import "self/common/styles/App.css"

    import Vue from "vue"

    import plan from "../plan"

    import Planner from "./Planner"
    Vue.component("Planner", Planner)

    export default {
        data: () => ({
            plan: plan
        })
    }

</script>
