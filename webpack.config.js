const devMode = process.env.NODE_ENV !== "production"
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
	entry: {
		index: "./src/index.js"
	},
	module: {
		rules: [{
			test: /\.html$/,
			include: path.join(__dirname, "src/views"),
			use: [
				{
					loader: "ejs-html-loader"
				},
				{
					loader: "html-loader",
					options: {
						interpolate: true,
                        minimize: false
					}
				}
			]
		},{
			test: /\.(sc|sa)ss$/,
			use: [{
				loader: "style-loader", // inject CSS to page
                options: {
                    sourceMap: true
                }
			}, {
                loader: MiniCssExtractPlugin.loader,
            }, {
				loader: "css-loader", // translates CSS into CommonJS modules
                options: {
                    sourceMap: true
                },
			}, {
                loader: "resolve-url-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true,
                    sourceMapContents: false
                }
			}]
        }, {
            test: /.*\.(png|svg|jpe?g|gif)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        outputPath: "assets/images",
                        publicPath: "assets/images",
                        name: "[name]_[hash:10].[ext]"
                    }
                },
            ]
        }]
	},
    devtool: "source-map",
	plugins: [
        new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			title: "Home",
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new HtmlWebPackPlugin({
			title: "Step 1",
			template: "./src/steps.html",
			filename: "step1.html"
		}),
		new HtmlWebPackPlugin({
			title: "Step 2",
			template: "./src/steps.html",
			filename: "step2.html",
            test2: "test step 2"
		}),
		new HtmlWebPackPlugin({
			title: "Step 3",
			template: "./src/steps.html",
			filename: "step3.html"
		}),
		new HtmlWebPackPlugin({
			title: "Step 4",
			template: "./src/steps.html",
			filename: "step4.html"
		}),
		new HtmlWebPackPlugin({
			title: "Step 5",
			template: "./src/steps.html",
			filename: "step5.html"
		}),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
	]
}
