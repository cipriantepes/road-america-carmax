const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

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
			test: /\.(sc|sa|c)ss$/,
			use: [{
				loader: "style-loader", // inject CSS to page
			}, {
                loader: MiniCssExtractPlugin.loader,
            }, {
				loader: "css-loader", // translates CSS into CommonJS modules
			}, {
				loader: "postcss-loader", // Run post css actions
				options: {
					plugins: function() { // post css plugins, can be exported to postcss.config.js
						return [
							require("precss"),
							require("autoprefixer")
						]
					}
				}
			}, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
			}]
		}]
	},
	plugins: [
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
			chunks: ["index"],
			template: "./src/steps.html",
			filename: "step3.html"
		}),
		new HtmlWebPackPlugin({
			title: "Step 4",
			chunks: ["index"],
			template: "./src/steps.html",
			filename: "step4.html"
		}),
		new HtmlWebPackPlugin({
			title: "Step 5",
			chunks: ["index"],
			template: "./src/steps.html",
			filename: "step5.html"
		}),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
	]
}
