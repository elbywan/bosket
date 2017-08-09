/* Adds i18n support through customisable labels. */

export const withLabels = defaultLabels => Component => ({
    name: `withLabels-${ Component.name }`,
    props: Component.props ? [...Component.props] : [],
    render() {
        const props = {
            props: {
                ...this.$props,
                labels: { ...defaultLabels, ...this.$props.labels }
            }
        }
        return <Component { ...props } />
    }
})
