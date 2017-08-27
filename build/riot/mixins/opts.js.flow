export const optsMixin = (argument = "opts") => ({
    init: function() {
        this.on("update", this.updateOpts)
        this._originalOpts = Object.keys(this.opts)
        this.updateOpts()
    },
    updateOpts: function() {
        if(!this.opts) return
        for(const key in this.opts[argument]) {
            if(!~this._originalOpts.indexOf(key))
                this.opts[key] = this.opts[argument][key]
        }
    }
})
