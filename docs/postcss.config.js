module.exports = {
    parser: false,
    plugins: {
        "postcss-cssnext": {
            browsers: "> 5%"
        },
        cssnano: {
            reduceIdents: false
        }
    }
}
