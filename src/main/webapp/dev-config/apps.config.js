/**
 * Created by ur on 20170610.
 */
const defaultIndexPage = './dev-config/server/template.html'

module.exports = {
  // 基本的应用配置信息
  //此处配置的模块,将不再自动按规则(a.js,a.html,a-config.js)查找
  /*
   id: 目录/入口模块
   src: 入口模块路径文件名
   indexPage: html页面, 模板页
   compiled:判断是否加入编译构建,如果还未开发好,就设置为false
   vendor:引用的第三方库(不打包,加到html)
   */
  apps: [
    {//任务管理
      id: 'login/login',
      src: './src/login/login.js',
      indexPage: './src/login/login.html',
      vendor: ['polyfill','fetch','jquery', 'react', 'react-dom', 'bootstrap', 'layer'],
      compiled: true
    },
    {//任务管理
      id: 'index/index',
      src: './src/index/index.js',
      indexPage: './src/index/index.html',
      vendor: ['polyfill','fetch','jquery', 'react', 'react-dom', 'bootstrap', 'layer'],
      compiled: true
    },
  ],

  // 开发入口配置
  devServer: {
    appEntrySrc: './src/client.js', //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },

  // 用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: './src/ssr_server.js'
  },

  // 依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    '/api/*': 'http://localhost:3001'
  },

  // 后端 api 配置，这样配置可以避免将测试服务器端口暴露出去
  api: {
    dev: {},
    prod: {}
  }
}
