const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
	entry: {
		'index': './index.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html', //因为sharkjs需要走java站点的thymeleaf，所以本地启动的时候不会替换，所以另搞一个shark换好的文件
			chunks: 'index',
			inject: true,
		}),
    new MiniCssExtractPlugin( {
      filename: 'styles.css'
    } )
	],
	module: {
		rules: [
		  {
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader', // 用babel-loader处理 和 eslint检查错误
				options: {
					presets: ['@babel/preset-react', '@babel/preset-env'],
					plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-optional-chaining'],
					cacheDirectory: true
				}
			}]
		},
      {
			test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
			use: ['raw-loader']
		}, {
			test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

			use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
				// {
				// 	loader: 'style-loader',
				// 	options: {
				// 		injectType: 'singletonStyleTag',
				// 		attributes: {
				// 			'data-cke': true
				// 		}
				// 	}
				// },
				{
					loader: 'postcss-loader',
					options: styles.getPostCssConfig( {
						themeImporter: {
							themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
						},
						minify: true
					} )
				}
			]
		}, {
			test: /\.(png|jpg|gif|woff)$/i,
			loader: "url-loader?mimetype=image/png"
		}, {
			test: /\.css$/,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        ],
			use: [{
				loader: 'style-loader'
			},
				{
					loader: 'css-loader'
				}
			]
		}]
	},
	devServer: {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		},
		host: '0.0.0.0',
		port: 8080,
		disableHostCheck: true
	}
};
