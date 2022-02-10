const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: false,
        minimizer: [
            new CssMinimizerPlugin({}),
            new TerserPlugin()
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 4200
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
              {from: "src/media", to: "media/"}
            ],
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                "ie": "11"
                            }
                        }]
                    ]
                  }
                }
            },

            {
                test: /\.(mov|mp4)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }  
                  }
                ]
            },
            {
                test:/\.(jpg|jpeg|png|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                    maxSize: 8192
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    target: ['web', 'es5']
}