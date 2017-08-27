/* Adds a configurable global listener. */

export const withListener = ({
    eventType = "click",
    prop = "listener",
    mountOn = null,
    autoMount = false,
    regulate = false
}) => Component => ({
    name: `withListener-${ Component.name }`,
    props: Component.props ? [...Component.props] : [],
    created() {
        if(autoMount) this.mount(this)
    },
    beforeDestroy() {
        this.unmount()
    },
    beforeUpdate() {
        if(mountOn) mountOn(this.$props) ? this.mount(this) : this.unmount()
    },
    data: () => ({
        listening: false,
        ticking: false,
        callback: null
    }),
    methods: {
        /* Subscriptions */

        subscribe(cb) { this.callback = cb },
        onEvent(event) {
            if(this.callback) {
                if(regulate) {
                    if(!this.ticking) {
                        const callback = this.callback
                        window.requestAnimationFrame(() => callback(event, () => { this.ticking = false }))
                    }
                    this.ticking = true
                } else
                    this.callback(event)
            }
        },

        /* Events */

        mount() {
            if(!this.listening) {
                document.addEventListener(eventType, this.onEvent)
                this.listening = true
            }
        },

        unmount() {
            if(this.listening) {
                document.removeEventListener(eventType, this.onEvent)
                this.listening = false
            }
        }
    },
    render() {
        const listener = {
            [prop]: {
                subscribe: this.subscribe,
                mount:     this.mount,
                unmount:   this.unmount
            }
        }
        const props = {
            props: { ...this.$props, ...listener }
        }
        return <Component { ...props } />
    }
})
