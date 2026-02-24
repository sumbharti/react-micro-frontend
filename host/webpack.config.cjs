const {ModuleFederationPlugin} = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (
    {
        entry: './src/main.tsx',
        mode: 'production',
        performance: {
            hints: false,
            maxEntrypointSize: 2000,
            maxAssetSize: 2000
        },
        resolve: {
            alias: {
            "../../../.power/schemas/appschemas": path.resolve(__dirname, ".power/schemas/appschemas")
            },
            extensions: [".tsx", ".ts", ".jsx", ".js"]
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
                shared: {
                    react: {
                    singleton: true,        // ← only one instance allowed
                    requiredVersion: deps["react"],
                    eager: true,            // ← host should set eager: true
                    },
                    "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                    eager: true,
                    },
                    "@microsoft/power-apps": {
                        singleton: true,
                        eager: true
                    }
                },
            }),
            new ModuleFederationPlugin({
                name: "mfe1",
                remotes: {
                    mfe1: 'mfe1@https://aab8eb134fa9e0719c20fe969e5bc9.d5.environment.api.powerplatformusercontent.com/powerapps/appruntime/57c6fb9d-517e-4231-9220-b11ca092b349/t/0ea672eb-3c32-4002-bd03-fec2acb1fea8/storageproxy/57c6fb9d517e42319220b11ca092b34920260223t171341z7fbc052f9e/remoteEntry.js'
                }
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer'
            })
        ]
    }
)