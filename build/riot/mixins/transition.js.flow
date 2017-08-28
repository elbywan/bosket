export const transitionMixin = nodeTarget => ({
    init: function() {
        if(!this.opts.transition)
            return
        const transitionName = this.opts.transition.name
        const origUnmount = this.unmount

        const mountTransition = () => {
            const target = (nodeTarget || (() => this.root))()
            if(!target) return

            target.classList.add(transitionName)
            target.classList.add(`${transitionName}-mount`)
            setTimeout(() => {
                target.classList.remove(`${transitionName}-mount`)
            }, 10)
        }

        let guard = false
        const unmountTransition = () => {
            if(guard) return
            guard = true
            const target = (nodeTarget || (() => this.root))()
            if(!target) return origUnmount.call(this)

            target.addEventListener("transitionend", () => {
                origUnmount.call(this)
            })
            target.classList.add(`${transitionName}-unmount`)
        }

        this.one("mount", mountTransition)
        Object.defineProperty(this, "unmount", {
            value: unmountTransition
        })
    }
})
