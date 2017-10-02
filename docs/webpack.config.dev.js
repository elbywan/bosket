const { resolve } = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlTargets = [ "angular", "react", "vue", "riot" ]

module.exports = {
    entry: {
        hotreload: "webpack/hot/only-dev-server",
        react: [
            "react-hot-loader/patch",
            "./docs/react/index.js"
        ],
        angular: "./docs/angular/index.ts",
        vue: "./docs/vue/index.js",
        riot: "./docs/riot/index.js",
        common: "./docs/common/index.js"
    },
    output: {
        filename: "[name]/build/[name].js",
        path: resolve(__dirname, ""),
        publicPath: "/"
    },
    resolve: {
        extensions: [ ".js", ".ts" ],
        alias: {
            "@bosket": resolve(__dirname, "../src"),
            self: resolve(__dirname, ".")
        }
    },

    devtool: "inline-source-map",

    devServer: {
        hot: true,
        host: "0.0.0.0",
        disableHostCheck: true,
        contentBase: resolve(__dirname, ""),
        publicPath: "/",
        port: 8080,
        compress: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { importLoaders: 1 }},
                    "postcss-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: resolve(__dirname, "angular/tsconfig.json"),
                    transpileOnly: true
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
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
                query: {
                    hot: true,
                    debug: true,
                    whitespace: true,
                    type: "es6"
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
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
