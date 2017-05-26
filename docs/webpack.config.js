const path = require("path")
const ngtools = require("@ngtools/webpack")

module.exports = {
    entry: {
        react: "./docs/react/index.js",
        angular: "./docs/angular/index.aot.ts",
        common: "./docs/common/index.js"
    },
    output: {
        filename: "[name]/[name].js",
        path: path.resolve(__dirname, "")
    },
    resolve: {
        extensions: [ ".js", ".ts" ]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { importLoaders: 1 }},
                    "postcss-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "@ngtools/webpack"
            }
        ]
    },
    plugins: [
        new ngtools.AotPlugin({
            tsConfigPath:   __dirname + "/angular/tsconfig.aot.json",
            entryModule:    __dirname + "/angular/demo.module#DemoModule"
        })
    ]
}