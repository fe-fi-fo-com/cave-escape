const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry : path.join( __dirname, 'input', 'index.js' ),
	output : {
		path : path.resolve( __dirname, 'output' )
	},
	devtool : 'source-map',
	module: {
		rules : [
			{
				test : /\.?js$/,
				exclude : /node_modules/,
				use : {
					loader : 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						]
					}
				}
			},
			{
				test: /\.(css)$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins : [
		new HtmlWebpackPlugin( {
			template : './input/index.html'
		} )
	]
};
