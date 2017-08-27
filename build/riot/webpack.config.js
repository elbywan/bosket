"use strict";

module.exports = {
    entry: "./src/riot/index.js",
    output: {
        filename: "./build/riot/index.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".js", ".tag"]
    },
    externals: {
        riot: {
            commonjs: "riot",
            commonjs2: "riot",
            amd: "riot",
            root: "riot"
        }
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader"
        }, {
            test: /\.tag$/,
            exclude: /(node_modules|bower_components)/,
            loader: "riot-tag-loader",
            query: {
                type: "es6"
            }
        }]
    }
};
//# sourceMappingURL=webpack.config.js.map