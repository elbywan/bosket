export const listenerMixin = ({
    eventType = "click",
    callback,
    regulate = false
}) => ({
    init: function() {
        let ticking = false

        const onEvent = event => {
            if(callback) {
                if(regulate) {
                    if(!ticking) {
                        window.requestAnimationFrame(() => callback(event, () => ticking = false))
                    }
                    ticking = true
                } else
                    callback(event)
            }
        }
        this.one("mount", () => {
            document.addEventListener(eventType, onEvent)
        })
        this.one("unmount", () => {
            document.removeEventListener(eventType, onEvent)
        })
    }
})
