const { resolve } = require("path")
const webpack = require("webpack")
const ngtools = require("@ngtools/webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlTargets = [ "angular", "react", "vue", "riot" ]

module.exports = {
    entry: {
        react: "./docs/react/index.prod.js",
        angular: "./docs/angular/index.aot.ts",
        vue: "./docs/vue/index.js",
        riot: "./docs/riot/index.js",
        common: "./docs/common/index.js"
    },
    output: {
        filename: "[name]/build/[name].js",
        path: resolve(__dirname, "")
    },
    resolve: {
        extensions: [ ".js", ".ts" ],
        alias: {
            "@bosket": resolve(__dirname, "../build"),
            self: resolve(__dirname, ".")
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([
                    "css-loader",
                    "postcss-loader"
                ])
            },
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.tsx?)$/,
                loader: "@ngtools/webpack"
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    extractCSS: true,
                    postcss: [ require('postcss-cssnext')() ]
                }
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader"
            },
            {
                test: /\.tag$/,
                loader: "riot-tag-loader",
                query: { type: "es6", whitespace: true }
            }
        ]
    },
    plugins: [
        new ngtools.AngularCompilerPlugin({
            tsConfigPath:   __dirname + "/angular/tsconfig.aot.json",
            entryModule:    __dirname + "/angular/demo.module#DemoModule"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin("./[name]/build/[name].css"),
        new HtmlWebpackPlugin({
            filename: `${__dirname}/index.html`,
            template: `${__dirname}/index.hbs`,
            chunks: [ 'common' ],
            inject: 'head'
        }),
        ...htmlTargets.map(target => new HtmlWebpackPlugin({
            filename: `${__dirname}/${target}/index.html`,
            template: `${__dirname}/${target}/index.hbs`,
            chunks: [ 'common', target ],
            inject: 'head'
        }))
    ]
}
