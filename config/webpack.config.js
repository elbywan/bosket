const path = require("path")
const webpackAngularExternals = require("webpack-angular-externals")

module.exports = {
    entry: {
        core: "./src/core/index.js",
        tools: "./src/tools/index.js",
        react: "./src/react/index.js",
        angular: "./src/angular/index.ts",
        vue: "./src/vue/index.js",
        riot: "./src/riot/index.js"
    },
    output: {
        path: path.resolve(__dirname, "..", "build"),
        filename: "[name]/bundle/[name].umd.min.js",
        library: "bosket-[name]",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [ ".js", ".ts", ".tag" ]
    },
    externals: [
        webpackAngularExternals(),
        {
            "@bosket/core": {
                commonjs: "@bosket/core",
                commonjs2: "@bosket/core",
                amd: "@bosket/core",
                root: "bosket-core"
            },
            "@bosket/tools": {
                commonjs: "@bosket/tools",
                commonjs2: "@bosket/tools",
                amd: "@bosket/tools",
                root: "bosket-tools"
            },
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "react",
                root: "React"
            },
            "react-transition-group": "react-transition-group",
            riot: "riot"
        }
    ],
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(__dirname, "..", "src/angular/tsconfig.json"),
                    compilerOptions: { declaration: false }
                }
            },
            {
                test: /\.tag$/,
                exclude: /(node_modules|bower_components)/,
                loader: "riot-tag-loader",
                query: {
                    type: "es6"
                }
            }
        ]
    }
}
