/* Adds i18n support through customisable labels. */

export const withLabels = defaultLabels => Component => ({
    name: `withLabels-${ Component.name }`,
    functional: true,
    render(h, ctx) {
        return <Component { ...{ props: ctx.props } } labels={ { ...defaultLabels, ...ctx.props.labels } } />
    }
})
