import riot from "riot"
import { transitionMixin } from "../mixins"

export default riot.tag("with-transition", false, function(opts) {
    this.mixin(transitionMixin())
    const updateKeys = () => {
        for(const key in this.parent) {
            if(this.parent.hasOwnProperty(key)) this[key] = this.parent[key]
        }
    }
    updateKeys()
    this.on("update", updateKeys)
})
