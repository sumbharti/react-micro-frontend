const {ModuleFederationPlugin} = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (
    {
        entry: './src/bootstrap.tsx',
        mode: process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_event === 'build' ? 'production' : 'development',
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
                name: "mfe1",
                filename: "remoteEntry.js",
                exposes: {
                    "./Remote": "./src/remote.tsx",
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: deps["react"],
                        eager: true,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                        eager: true,
                    },
                    "react-router-dom": {
                    singleton: true,
                    requiredVersion: deps["react-router-dom"],
                    eager: true,
                    },
                    // Do not share Power-Apps mfe1 bundles its own so standalone app loads
                    // Do not share Fluent UI: mfe1 bundles its own so standalone app loads
                    // and build finishes. Host still wraps with FluentProvider for when remote is used there.
                },
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                scriptLoading: 'defer'
            })
        ]
    }
)