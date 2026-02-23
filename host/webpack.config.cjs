const {ModuleFederationPlugin} = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (
    {
        entry: './src/main.tsx',
        mode: 'production',
        performance: {
            hints: false,
            maxEntrypointSize: 2000,
            maxAssetSize: 2000
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
            port: 3000
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "mfe1",
                remotes: {
                    mfe1: 'mfe1@https://aab8eb134fa9e0719c20fe969e5bc9.d5.environment.api.powerplatformusercontent.com/powerapps/appruntime/57c6fb9d-517e-4231-9220-b11ca092b349/t/0ea672eb-3c32-4002-bd03-fec2acb1fea8/storageproxy/57c6fb9d517e42319220b11ca092b34920260223t052653z0152673f9b/remoteEntry.js'
                }
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer'
            })
        ]
    }
)