/*公共js包，单独打包及添加别名*/
exports.pubjs = {
  /*别名:路径*/
}
/*公共css包，添加别名*/
exports.pubcss = {
  /*别名:路径*/
}
/*第三方包*/
exports.paths = {
  /*App路径*/
  app: '/web/pages',


  /*基本*/
  'jquery': 'vendor/jquery/jquery.min.js',
  'bootstrap': 'vendor/bootstrap/js/bootstrap.min.js',

  /*Select下拉列表框*/
  'select': 'vendor/bootstrap-select/js/bootstrap-select.min.js',
  'selecti18n': 'vendor/bootstrap-select/js/i18n/defaults-zh_CN.min.js',

  /*DataTables数据表格*/
  'datatables.net': 'vendor/DataTables/DataTables/js/jquery.dataTables.min.js',
  'datatables.net-bs': 'vendor/DataTables/DataTables/js/dataTables.bootstrap.min.js',

  /*DataTables扩展和插件: 填充*/
  'datatables.net-autofill': 'vendor/DataTables/AutoFill/js/dataTables.autoFill.min.js',
  'datatables.net-autofill-bs': 'vendor/DataTables/AutoFill/js/autoFill.bootstrap.min.js',

  /*DataTables扩展和插件: 按钮*/
  'datatables.net-buttons': 'vendor/DataTables/Buttons/js/dataTables.buttons.min.js',
  'datatables.net-buttons-bs': 'vendor/DataTables/Buttons/js/buttons.bootstrap.min.js',
  'datatables.net-buttons-colVis': 'vendor/DataTables/Buttons/js/buttons.colVis.min.js',
  'datatables.net-buttons-flash': 'vendor/DataTables/Buttons/js/buttons.flash.min.js',
  'datatables.net-buttons-html5': 'vendor/DataTables/Buttons/js/buttons.html5.min.js',
  'datatables.net-buttons-print': 'vendor/DataTables/Buttons/js/buttons.print.min.js',

  /*DataTables扩展和插件: 行列拖动*/
  'datatables.net-colreorder': 'vendor/DataTables/ColReorder/js/dataTables.colReorder.min.js',
  'datatables.net-rowreorder': 'vendor/DataTables/RowReorder/js/dataTables.rowReorder.min.js',

  /*DataTables扩展和插件: 表内编辑*/
  'datatables.net-editor': 'vendor/DataTables/Editor/js/dataTables.editor.min.js',
  'datatables.net-editor-bs': 'vendor/DataTables/Editor/js/editor.bootstrap.min.js',

  /*DataTables扩展和插件: 固定行列*/
  'datatables.net-fixedColumns': 'vendor/DataTables/FixedColumns/js/dataTables.fixedColumns.min.js',
  'datatables.net-fixedHeader': 'vendor/DataTables/FixedHeader/js/dataTables.fixedHeader.min.js',

  /*DataTables扩展和插件: 热键*/
  'datatables.net-keyTable': 'vendor/DataTables/KeyTable/js/dataTables.keyTable.min.js',

  /*DataTables扩展和插件: 响应式*/
  'datatables.net-responsive': 'vendor/DataTables/Responsive/js/dataTables.responsive.min.js',

  /*DataTables扩展和插件: 滚动*/
  'datatables.net-scroller': 'vendor/DataTables/Scroller/js/dataTables.scroller.min.js',

  /*DataTables扩展和插件: 选择器*/
  'datatables.net-select': 'vendor/DataTables/Select/js/dataTables.select.min.js',

  /*插件,多个需合并*/
  'datatables.plugins-ellipsis': 'vendor/DataTables/Plugins/dataRender/ellipsis.js',

  /*DataTables扩展和插件: Excel和pdf支持库*/
  'net-jszip': 'vendor/DataTables/JSZip/jszip.js',
  'net-pdfmake': 'vendor/DataTables/pdfmake/build/pdfmake.min.js',
  'net-pdfmake-fonts': 'vendor/DataTables/pdfmake/build/vfs_fonts.js',

  /*jsTree*/
  'jstree': 'vendor/jstree/jstree.min.js',

  /*对话框弹出,用法见:http://www.lhgdialog.com*/
  'dialog': 'vendor/dialog/lhgdialog.min.js',

  /*基于Bootstrap 的HTML5文件上传插件*/
  'bootstrap-fileinput': 'vendor/bootstrap-fileinput/js/locales/zh.js',

  /*客户端流文件保存文件*/
  'FileSaver': 'vendor/FileSaver/FileSaver.min.js',

  /*zip文件压缩解压*/
  'zip':'vendor/zip/zip-config.js',

  /*handsontable*/
  'handsontable': 'vendor/handsontable/handsontable.full.js',
  'react-handsontable': 'vendor/react-handsontable/react-handsontable.js',

  /*react*/
  'react': 'vendor/react/react.js',
  'react-dom': 'vendor/react/react-dom.js',

  /*react-redux*/
  'react-redux': 'vendor/react-redux/react-redux.js',

  /*fetch,ajax浏览器实现的垫片*/
  'fetch': 'vendor/fetch/fetch.js',
  'promise': 'vendor/fetch/promise.min.js',


  /*lodash*/
  'lodash':'vendor/lodash/lodash.js',

  /*layer*/
  'layer':'vendor/layer/layer.js',

  'bootstrap-datetimepicker': 'vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
  'markdown-it':'vendor/markdown-it/markdown-it.min.js',

  /*es6转码*/
  'polyfill': 'vendor/polyfill/polyfill.min.js',

  /*颜色选择器*/
  'spectrum': 'vendor/spectrum/spectrum.js',

  /*ur自定义图标*/
  'ur-font': 'vendor/ur-font/style.css',

  'bootstrap-switch':'vendor/bootstrap-switch/js/bootstrap-switch.min.js',
}

/*第三方包依赖关系*/
exports.shim = {
  /*基本*/
  'bootstrap': {
    deps: ['jquery', 'vendor/bootstrap/css/bootstrap.min.css',
      'vendor/Font-Awesome/css/font-awesome.min.css'],
  },

  /*Select下拉列表框*/
  'select': {
    deps: ['jquery', 'bootstrap', 'vendor/bootstrap-select/css/bootstrap-select.min.css'],
  },
  'selecti18n': {
    deps: ['select'],
  },

  /*DataTables数据表格*/
  'datatables.net-bs': {
    deps: ['datatables.net', 'vendor/DataTables/DataTables/css/dataTables.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 填充*/
  'datatables.net-autofill-bs': {
    deps: ['vendor/DataTables/AutoFill/css/autoFill.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 按钮*/
  'datatables.net-buttons-bs': {
    /*deps: ['datatables.net-buttons-colVis', 'datatables.net-buttons-flash', 'datatables.net-buttons-html5', 'datatables.net-buttons-print', 'css!vendor/DataTables/Buttons/css/buttons.bootstrap.min'],*/
    deps: ['vendor/DataTables/Buttons/css/buttons.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 行列拖动*/
  'datatables.net-colreorder': {
    deps: ['vendor/DataTables/ColReorder/css/colReorder.bootstrap.min.css'],
  },
  'datatables.net-rowreorder': {
    deps: ['vendor/DataTables/RowReorder/css/rowReorder.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 表内编辑*/
  'datatables.net-editor-bs': {
    deps: ['vendor/DataTables/Editor/css/editor.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 固定行列*/
  'datatables.net-fixedColumns': {
    deps: ['vendor/DataTables/FixedColumns/css/fixedColumns.bootstrap.min.css'],
  },
  'datatables.net-fixedHeader': {
    deps: ['vendor/DataTables/FixedHeader/css/fixedHeader.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 热键*/
  'datatables.net-keyTable': {
    deps: ['vendor/DataTables/KeyTable/css/keyTable.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 响应式*/
  'datatables.net-responsive': {
    deps: ['vendor/DataTables/Responsive/css/responsive.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 滚动*/
  'datatables.net-scroller': {
    deps: ['vendor/DataTables/Scroller/css/scroller.bootstrap.min.css'],
  },

  /*DataTables扩展和插件: 选择器*/
  'datatables.net-select': {
    deps: ['vendor/DataTables/Select/css/select.bootstrap.min.css'],
  },

  /*插件,多个需合并*/
  'datatables.plugins-ellipsis': {
    deps: ['datatables.net-bs'],
  },

  /*DataTables扩展和插件: Excel和pdf支持库*/
  'net-pdfmake': {
    deps: ['net-pdfmake-fonts'],
  },

  /*jsTree*/
  'jstree': {
    deps: ['jquery', 'vendor/jstree/themes/default/style.min.css'],
  },

  /*对话框弹出*/
  'dialog': {
    deps: ['jquery'],
    exports: 'dialog',
  },

  /*基于Bootstrap 的HTML5文件上传插件*/
  'bootstrap-fileinput': {
    deps: ['jquery', 'bootstrap', 'vendor/bootstrap-fileinput/js/fileinput.min.js', 'vendor/bootstrap-fileinput/css/fileinput.min.css'],
  },

  /*zip文件压缩解压*/
  'zip':{
    deps:['vendor/zip/zip.js','vendor/zip/zip-fs.js','vendor/zip/zip-ext.js','vendor/zip/mime-types.js'],
  },

  /*Handsontable pro表格*/
  'handsontable': {
    deps: ['vendor/handsontable/handsontable.full.min.css'],
  },

  /*react-dom*/
  'react-dom': {
    deps: ['react'],
  },

  'fetch': {
    deps: ['promise'],
  },
  'bootstrap-datetimepicker': {
    deps: ['vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
      'vendor/moment/moment-with-locales.min.js'],
  },
  'spectrum': {
    deps: ['vendor/spectrum/spectrum.css'],
  },
  'bootstrap-switch': {
    deps: ['vendor/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css'],
  },
}
