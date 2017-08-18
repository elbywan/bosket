import _import from "./import"
import dataModel from "./data model"
import style from "./style"

export default {
    title: "Usage",
    editLink: "https://github.com/elbywan/bosket/edit/master/docs/vue/plan/usage/index.js",
    content: h =>
        <div>
            <p>It is assumed that you followed the installation <em><a href="../#Setup" >guidelines</a></em>.</p>
        </div>,
    subs: [
        _import,
        dataModel,
        style
    ]
}
