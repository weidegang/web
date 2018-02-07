/**
 * Created by Administrator on 2017-06-12.
 */

var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

// Set environment variables here...

var webpackConfig = require('./webpack.config.js');

// webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(webpackConfig); // load webpack
// run dev-server
var server = new WebpackDevServer(compiler, {
  devtool: "source-map",
  contentBase: "/",

  publicPath: "/",
  hot: true,
  inline: true,
  progress: true,
  colors: true
});
server.listen(8000);