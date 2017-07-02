const { resolve } = require("path")
const webpack = require("webpack")
const ngtools = require("@ngtools/webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlTargets = [ "angular", "react" ]

module.exports = {
    entry: {
        react: "./docs/react/index.js",
        angular: "./docs/angular/index.aot.ts",
        common: "./docs/common/index.js"
    },
    output: {
        filename: "[name]/build/[name].js",
        path: resolve(__dirname, "")
    },
    resolve: {
        extensions: [ ".js", ".ts" ],
        alias: {
            bosket: resolve(__dirname, "../build"),
            self: resolve(__dirname, ".")
        }
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
                use: ExtractTextPlugin.extract([
                    "css-loader",
                    "postcss-loader"
                ])
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin("./[name]/build/[name].css"),
        new HtmlWebpackPlugin({
            filename: `${__dirname}/index.html`,
            template: `${__dirname}/index.ejs`,
            chunks: [ 'common' ],
            inject: 'head'
        }),
        ...htmlTargets.map(target => new HtmlWebpackPlugin({
            filename: `${__dirname}/${target}/index.html`,
            template: `${__dirname}/${target}/index.ejs`,
            chunks: [ 'common', target ],
            inject: 'head'
        }))
    ]
}
