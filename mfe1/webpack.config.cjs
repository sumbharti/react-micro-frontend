const {ModuleFederationPlugin} = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { devServer } = require('../host/webpack.config.cjs');

module.exports = (
    {
        entry: './src/main.tsx',
        mode: 'production',
        output: {
            publicPath: 'auto'
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets:[
                            '@babel/preset-env', ["@babel/preset-react", { "runtime": "automatic" }], "@babel/preset-typescript"
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
                    "./Remote": "./src/remote.tsx"
                }
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer'
            })
        ]
    }
)