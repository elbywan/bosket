var resolve = require("path").resolve

module.exports = {
    parser: false,
    plugins: {
        "postcss-import": {
            path: resolve(__dirname, "style")
        },
        "postcss-cssnext": {
            browsers: "> 5%",
            warnForDuplicates: false
        },
        cssnano: {
            reduceIdents: false
        }
    }
}
