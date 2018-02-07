//开发环境打包，项目环境打包要清空输出文件夹内容并压缩
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vendor = require('./vendor.config.js')
const fs = require('fs')
const entryFolder = 'src'//输入文件夹
const outputFolder = 'pages'//输出文件夹
const publicPath = '/web'
const paths = vendor.paths
const shim = vendor.shim
const rootPath = path.resolve(__dirname, '../')
const prodPlugins = require('./webpack/prodPlugins')

const utils = require('./webpack/utils')
//定义统一的Application，不同的单页面会作为不同的Application
const appsConfig = require('./apps.config.js')

const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
// var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

/*添加到myPlugins数组，重复数据不添加*/
let setMyPlugins = function (vendorPath, myPlugins) {
  // if(jQuery.inArray(vendorPath, myPlugins)==-1){
  if (myPlugins.indexOf(vendorPath) < 0) {
    myPlugins.push(vendorPath)
  }
}
/*遍历webpack.vendor.config.js，添加依赖文件*/
let getVendor = function (quote, myPlugins) {
  if ((typeof shim[quote]) === 'object') {//判断是否存在依赖
    let deps = shim[quote]['deps']
    if ((typeof deps === 'object')) {//存在依赖
      for (let i = 0; i < deps.length; i++) {
        let dep = deps[i]
        if ((typeof dep) === 'string') {
          getVendor(dep, myPlugins)
        }
      }
    }
  }
  let app = paths['app']
  let vendorPath = paths[quote]
  if ((typeof vendorPath) === 'string') {//paths存在路径
    setMyPlugins(app + '/' + vendorPath, myPlugins)
  } else if ((typeof vendorPath) === 'undefined') {//paths不存在路径，默认配置信息为路径
    setMyPlugins(app + '/' + quote, myPlugins)
  }
}
/*遍历文件.config.js，查找引用文件*/
let getQuote = function (key) {
  let myPlugins = []
  let relativePath = '../' + key.replace(outputFolder, entryFolder) + '-config.js'
  try {
    let quotes = require(relativePath).quotes
    if ((typeof quotes) === 'object') {
      for (let i = 0; i < quotes.length; i++) {
        let quote = quotes[i]
        if ((typeof quote) === 'string') {
          getVendor(quote, myPlugins)
        }
      }
    }
  } catch (err) {}
  return myPlugins
}

function getAppVendor (id) {
  for (app of appsConfig.apps) {
    if (app.id && app.id === id) {
      return app.vendor
    }
  }
  return null
}

function getAppQuote (quotes) {
  let myPlugins = []
  try {
    if ((typeof quotes) === 'object') {
      for (let i = 0; i < quotes.length; i++) {
        let quote = quotes[i]
        if ((typeof quote) === 'string') {
          getVendor(quote, myPlugins)
        }
      }
    }
  } catch (err) {}
  return myPlugins
}

function MyPlugin (options) {
  // Configure your plugin with options...
  this.options = options
}

MyPlugin.prototype.apply = function (compiler) {
  // ...
  compiler.plugin('compilation', function (compilation, options) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      let paths = []
      if (htmlPluginData.plugin && htmlPluginData.plugin.options && htmlPluginData.plugin.options.id) {
        // 在app中定义的入口
        let vendor = getAppVendor(htmlPluginData.plugin.options.id)
        paths = getAppQuote(vendor)
      } else {
        // 未在app中定义的入口
        let outputName = htmlPluginData.outputName.replace('.html', '')
        paths = getQuote(outputName)
      }
      for (let i = paths.length - 1; i >= 0; i--) {
        let path = paths[i]
        let fileType = path.substr(path.lastIndexOf('.') + 1).toLowerCase()
        if (fileType === 'css') {//此处可判断添加的是js或css进行添加,暂时非css均添加为js
          htmlPluginData.assets.css.unshift(path)
          // }else if(fileType=='.png'){
          //     htmlPluginData.assets.png.unshift(path);
        } else {
          htmlPluginData.assets.js.unshift(path)
        }
      }
      callback(null, htmlPluginData)
    })
  })

}

let htmlRelativePaths = []
let jsRelativePaths = []

//获取文件数组
function readFile (readUrl, name) {
  //readdirSync同步，readdir 异步
  try {
    let readNameUrl = path.join(readUrl, name)
    let files = fs.readdirSync(readNameUrl)
    files.forEach(function (filename) {
      try {
        let stats = fs.statSync(path.join(readNameUrl, filename))
        if (stats.isFile()) {
          let fullPath = path.join(readNameUrl, filename)
          let relativePath = fullPath.replace(path.join(rootPath, entryFolder), '')
          relativePath = relativePath.substr(0, relativePath.lastIndexOf('.')).replace(/\\/g, '/')
          let fileType = fullPath.substr(fullPath.lastIndexOf('.') + 1).toLowerCase()
          if (fileType === 'html') {
            htmlRelativePaths.push(relativePath)
          } else if (fileType === 'js') {
            jsRelativePaths.push(relativePath)
          }
        } else if (stats.isDirectory()) {//文件夹
          readFile(readNameUrl, filename)
        }
      } catch (err) {
        if (err) throw err
        return
      }

    })
  } catch (err) {
    console.log(err)
    return
  }
}

readFile(rootPath, entryFolder)

//添加module.exports
module.exports = (options = {}) => {
  // const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'));
  //  console.log(options.dev)

  let entry = {}
  let plugins = [
    new webpack.optimize.CommonsChunkPlugin({//公共js
      names: [outputFolder + '/public/pub', outputFolder + '/manifest'],
      //name: outputFolder + publicPath+ '/public/pub',
      minChunks: 2,
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: false,
    }),//添加css

    new MyPlugin(),//添加第三方文件

    // new ChunkManifestPlugin({
    //   filename: 'manifest.json',
    //   manifestVariable: 'webpackManifest',
    //   inlineManifest: false
    // }),

    /*new HtmlWebpackIncludeAssetsPlugin({
     assets: ['jquery/jquery.min.js','DataTables/Buttons/css/buttons.bootstrap.css', 'DataTables/Buttons/js/buttons.html5.js'],
     append: false,
     hash: false,
     publicPath: '/ur/pages/ur/vendor/'
     })*/
  ]
  //添加生产环境打包需要的插件
  if ('production' === process.env.NODE_ENV) {
    plugins = [...plugins,...prodPlugins.plugins]
  }

  //先遍历在app中定义好的页面进行构造
  appsConfig.apps.forEach(function (app) {
    //判断是否加入编译,如果还未开发好,就设置为false
    if (app.compiled === false) {
      return
    }
    //判断入口文件是否存在
    if (!fs.existsSync(app.src)) {
      return
    }

    //添加入口模块
    let key = outputFolder + '/' + app.id
    entry[key] = app.src

    //Html生成
    let indexPage = app.indexPage
    let distPage = path.dirname(key) + '/' + path.basename(indexPage)
    let chunks = []
    chunks.push(outputFolder + '/manifest')
    chunks.push(outputFolder + '/public/pub')
    chunks.push(key)

    let config = {
      id: app.id, //自定义,后续处理有用
      filename: distPage,
      template: indexPage, // 模版文件
      //inject: 'head',
      // hash: chunks,
      chunks: chunks, // 按照先后顺序插入script标签
      'chunksSortMode': function (chunk1, chunk2) {//解决插入顺序
        let order = chunks
        let order1 = order.indexOf(chunk1.names[0])
        let order2 = order.indexOf(chunk2.names[0])
        return order1 - order2
      }
    }

    if ('production' === process.env.NODE_ENV) {
      Object.assign(config,prodPlugins.htmlMminify)
    }
    let plugin = new HtmlWebpackPlugin(config)

    plugins.push(plugin)
  })

  //再按规则(a.js,a.html,a-config.js)遍历未在app中定义的页面进行构造
  htmlRelativePaths.forEach(function (relativePath) {
    let key = outputFolder + relativePath
    if (!entry[key]) {
      let filename = key + '.html'
      let template = './' + entryFolder + relativePath + '.html'
      let chunks = []
      if (jsRelativePaths.indexOf(relativePath) < 0) {//不存在入口js
        chunks.push('')
      } else {
        entry[key] = ['./' + entryFolder + relativePath + '.js']
        chunks.push(outputFolder + '/manifest')
        chunks.push(outputFolder + '/public/pub')
        chunks.push(key)
      }
      let config = {
        filename: filename,
        template: template, // 模版文件
        //inject: 'head',
        // hash: chunks,
        chunks: chunks, // 按照先后顺序插入script标签
        'chunksSortMode': function (chunk1, chunk2) {//解决插入顺序
          let order = chunks
          let order1 = order.indexOf(chunk1.names[0])
          let order2 = order.indexOf(chunk2.names[0])
          return order1 - order2
        }
      }
      if ('production' === process.env.NODE_ENV) {
        Object.assign(config,prodPlugins.htmlMminify)
      }
      let plugin = new HtmlWebpackPlugin(config)

      plugins.push(plugin)
    }
  })

  let r = {
    entry: entry,
    output: {
      path: rootPath,
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[name].js?[chunkhash]',
      publicPath: publicPath,
      libraryTarget: 'umd',
    },
    externals: utils.externals,
    plugins: plugins,
    devtool: 'cheap-module-eval-source-map',
    module: {
      // 加载器配置
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
          exclude: [/node_modules/, /vendor/],
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, /vendor/],
          query: {
            presets: ['es2015', 'stage-0']
          },
        },
        {
          test: /\.less$/,
          use: ["style-loader", 'css-loader', "less-loader"]
        },
      ],
      noParse: [/moment-with-locales/]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        pub: path.resolve(__dirname, './' + entryFolder + publicPath + '/public/pub.js'),
        jquery: '/pages/vendor/jquery/jquery',
      }
    },
  }

  if ('production' === process.env.NODE_ENV) {
    r.devtool = false
  }

  return r
}
