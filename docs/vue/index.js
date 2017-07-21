import Vue from "vue"
import App from "./components/App.vue"

window.onload = () => new Vue({
    el: "#framework-root",
    render: h => <div id="framework-root"><App/></div>
})
