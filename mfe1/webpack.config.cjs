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
        output: {
            publicPath: 'auto'
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
            port: 3001,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
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