import Vue from "vue"
import App from "./components/App.vue"

window.onload = () => new Vue({
    el: "#framework-root",
    render: h => <App/>
})
