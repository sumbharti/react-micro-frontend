const {ModuleFederationPlugin} = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (
    {
        entry: './main.jsx',
        mode: 'production',
        performance: {
            hints: false,
            maxEntrypointSize: 2000,
            maxAssetSize: 2000
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets:[
                            '@babel/preset-env', '@babel/preset-react'
                        ]
                        }
                    }
                }
            ]
        },
        devServer: {
            port: 3000
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "mfe1",
                remotes: {
                    mfe1: 'mfe1@http://localhost:3001/remoteEntry.js'
                }
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer'
            })
        ]
    }
)