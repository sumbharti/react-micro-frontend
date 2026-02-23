const {ModuleFederationPlugin} = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { devServer } = require('../host/webpack.config.cjs');

module.exports = (
    {
        entry: './main.jsx',
        mode: 'production',
        output: {
            publicPath: 'auto'
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
            port: 3001,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "mfe1",
                filename: "remoteEntry.js",
                exposes: {
                    "./Remote": "./remote.jsx"
                }
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer'
            })
        ]
    }
)