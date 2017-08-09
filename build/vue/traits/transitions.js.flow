/* Adds transitions on component mount / unmount. */

export const withTransition = ({ key }) => Component => ({
    name: `withTransition-${ Component.name }`,
    props: Component.props ? [...Component.props] : [],
    render() {
        const props = {
            props: { ...this.$props }
        }
        const transition  = { ...this.transition }

        if(!this.transition)
            return <Component { ...props } />
        return (
            <transition { ...transition }>
                <Component { ...props } key={ key(this.$props) }/>
            </transition>
        )
    }
})
