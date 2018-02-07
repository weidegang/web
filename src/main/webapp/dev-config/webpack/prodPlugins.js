const path = require('path')
const webpack = require('webpack')
const ZipFilesPlugin = require('webpack-zip-files-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const plugins = [
  //设置环境变量，否则打包完成后redux会出现问题
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  //处理js文件
  new UglifyJsPlugin({
    sourceMap: false,
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
        beautify: false,
      },
    }
  }),
  //生成前端zip文件
  new ZipFilesPlugin({
    entries: [
      {src: path.join(__dirname, '../../pages'), dist: '../../pages'},
    ],
    output: path.join(__dirname, '../../../../../release/web_to_webapps.ur'),
    format: '',
    ext: 'zip'
  }),
  //处理css文件，
  new OptimizeCssAssetsPlugin({
    // assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  })
]

const htmlMminify = {
  minify: {//压缩HTML文件
    removeComments: true,    //移除HTML中的注释
    collapseWhitespace: true    //删除空白符与换行符
  }
}

exports.plugins = plugins;
exports.htmlMminify = htmlMminify;