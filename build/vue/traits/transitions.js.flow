/* Adds transitions on component mount / unmount. */

export const withTransition = ({ key }) => Component => ({
    name: `withTransition-${ Component.name }`,
    functional: true,
    render(h, ctx) {
        if(!ctx.props.transition)
            return <Component { ...ctx.data } />
        const transitionProps = { ...ctx.props.transition }
        return (
            <transition { ...transitionProps }>
                <Component { ...ctx.data } key={ key(ctx.props) }/>
            </transition>
        )
    }
})
