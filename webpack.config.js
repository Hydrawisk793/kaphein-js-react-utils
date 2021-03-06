var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var nodeExternals = require("webpack-node-externals");

module.exports = (function ()
{
    var outputDirectoryName = "dist";

    return {
        entry : path.resolve(__dirname, "src", "index.js"),
        target : "web",
        output : {
            filename : "index.js",
            path : path.resolve(__dirname, outputDirectoryName),
            library : "kapheinJsReactUtils",
            libraryTarget : "umd",
            globalObject : "this"
        },
        plugins : [
            new CopyWebpackPlugin({
                patterns : [
                    {
                        context : "src",
                        from : "**/*.d.ts",
                        to : ""
                    }
                ]
            }),
        ],
        module : {
            rules : [
                {
                    test : /\.tsx?$/,
                    exclude : ["/node_modules/"],
                    loader : "babel-loader",
                },
                {
                    test : /\.jsx?$/,
                    exclude : ["/node_modules/"],
                    loader : "babel-loader",
                },
            ],
        },
        externals : [
            nodeExternals()
        ],
        resolve : {
            modules : ["node_modules"],
            extensions : [".ts", ".tsx", ".js", ".jsx", ".json"]
        }
    };
})();
