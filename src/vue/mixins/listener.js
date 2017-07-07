/* Adds a configurable global listener. */

export const mixListener = ({
    eventType = "click",
    cb = "callback",
    mountOn = null,
    autoMount = false,
    regulate = false
} = {}) => {

    const self = {
        listening: false,
        ticking: false,
        listenerRef: null,
        onEvent: instance => {
            if(!self.listenerRef)
                self.listenerRef = event => {
                    if(instance[cb]) {
                        if(regulate) {
                            if(!self.ticking) {
                                const callback = instance[cb]
                                window.requestAnimationFrame(() => callback(event, () => { self.ticking = false }))
                            }
                            self.ticking = true
                        } else
                            instance[cb](event)
                    }
                }
            return self.listenerRef
        },
        mount(instance) {
            if(!self.listening) {
                document.addEventListener(eventType, self.onEvent(instance))
                self.listening = true
            }
        },
        unmount() {
            if(self.listening) {
                document.removeEventListener(eventType, self.listenerRef)
                self.listening = false
            }
        }
    }

    return {
        created() {
            if(autoMount) self.mount(this)
        },
        beforeDestroy() {
            self.unmount()
        },
        beforeUpdate() {
            if(mountOn) mountOn(this.$props) ? self.mount(this) : self.unmount()
        }
    }
}
