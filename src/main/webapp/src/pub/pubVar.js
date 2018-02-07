/**
 * Created by Administrator on 2017-09-06.
 */
import CONSTANT from  '../../public/constant';
import {pub} from '../../public/function-pub'

let dataTable = {}
dataTable.config = Object.assign({}, CONSTANT.DATA_TABLES.DEFAULT_OPTION,{
  displayLength: 50,//默认显示的记录数
  lengthMenu: [
    [50, 10, 25, 100, 200, -1],
    ['50', '10', '25', '100', '200', '全部'],
  ],
  dom: 't' +   //表格
  /*一行内: 当前页/页数     每页显示数      搜索框          分页按钮  */
  '<\'row\'<\'col-xs-3\'i><\'col-xs-2\'l><\'col-xs-2 pl-5\'f><\'col-xs-5\'p>>',
  language: {
    'lengthMenu': '每页显示 _MENU_ 条记录',
    'info': '从 _START_ 到 _END_ /共 _TOTAL_ 条数据',
    'infoEmpty': '没有数据',
    'infoFiltered': '(从 _MAX_ 条数据中检索)',
    'zeroRecords': '没有检索到数据',
    'search': '搜索:',
    'paginate': {
      'first': '首页',
      'previous': '前一页',
      'next': '后一页',
      'last': '尾页',
    },
    select: {
      rows: {
        _: '%d行被选中',
        0: '',
      },
    },
  },
  select: 'os',
  editor: {
    ajax: function(method, url, editData, success, error) {
      for (let key in editData.data) {
        let out = {data: []};//回调数据结构
        let retData = editData.data[key];
        retData.id = key;
        retData.edit = true;
        out.data.push(retData);
        success(out);
      }
    },
  },
});

let jsTree = {};

jsTree.config = {
  'core': {
    'strings': {
      'Loading ...': '正在加载 ...',
    },
    'animation': 0,
    'multiple': false,
    'check_callback': true,
    'force_text': true,
    'themes': {'stripes': true},
    'data': {
      'type': 'POST',
      'dataType': 'json',
      'async': false,
      // 'url' : "",
      'success': function(data) {
      },
      'cache': false,
      'data': function(node) {
        return {'id': node.id};
      },
    },
  },
  'types': {
    default: {icon: 'fa fa-file-text-o'},
    root: {icon: 'fa fa-th-large fa-lg'},
    child: {icon: 'fa fa-file-text-o text-primary'},
  },
  'plugins': ['search', 'types', 'state', 'wholerow'],
};

jsTree.addSearch = function(treeId) {
  let searchInput = '<input type="text" class="form-control input-sm" value="" ' +
    'id="treeSearch" placeholder="搜索"/>';
  $(searchInput).insertAfter(treeId);

  let to = false;
  $('#treeSearch').keyup(function() {
    if (to) {
      clearTimeout(to);
    }

    to = setTimeout(function() {
      let v = $('#treeSearch').val();
      $(treeId).jstree(true).search(v);
    }, 150);
  });
};

jsTree.addSearchBeforeBody = function(treeId) {
  var searchInput = '<input type="text" class="form-control input-sm" value="" ' +
    'id="treeSearch" placeholder="搜索"/>';
  $(searchInput).insertBefore(treeId);

  var to = false;
  $('#treeSearch').keyup(function() {
    if (to) {
      clearTimeout(to);
    }

    to = setTimeout(function() {
      var v = $('#treeSearch').val();
      $(treeId).jstree(true).search(v);
    }, 150);
  });
};

jsTree.getSelectNode = function(tree) {
  let sel = tree.get_selected();
  let nodeData = tree.get_node(sel);
  return nodeData.original;
};

jsTree.isSelectEnd = function(tree) {
  let sel = tree.get_selected();
  let nodeData = tree.get_node(sel);
  return nodeData.children.length <= 0;
};

jsTree.selectNode = function(tree, id) {
  /*默认选中并打开上级*/
  if (id != undefined) {
    tree.close_all();
    tree.deselect_all();
    tree.select_node([id], true, false);
  }
  ;
};

let fileInput = {};
fileInput.config = {
  language: 'zh',
  /*uploadUrl: '/ur/acc/relation/checkExcel',
   //扩展参数
   uploadExtraData:function() {
   return {
   dwCode: userInfo.coCode,
   nd: $("#active-nd").selectpicker("val")
   }
   },*/
  uploadAsync: true,
  // allowedFileExtensions: ["xlsx"], //只支持Excel(2007)
  showPreview: false,  //显式预览
  maxFileCount: 1,    //最多文件数
  minFileCount: 1,    //最少文件数
  autoReplace: true,  //选择文件时自动替换

  //预览按钮、信息
  layoutTemplates: {
    //actionDelete: '',
    //actionUpload: '',
    actionZoom: '',
    // progress: '',
  },
  fileActionSettings: {
    uploadTitle: '导入文件',
  },
  msgFilesTooLess: '请选择 <b>未导入</b>的文件来进行<b>导入</b>。',
  dropZoneTitle: '拖拽文件到这里 &hellip;',

  //按钮
  showClose: true,
  showRemove: true,
  showUpload: true,
  browseClass: 'btn btn-outline-primary',
  // browseLabel: "选择",
  uploadClass: 'btn btn-success',
  /*uploadLabel: "导入",
   uploadTitle: '导入选择的Excel文件',
   msgUploadThreshold:"正在上传...",
   msgUploadBegin:"准备上传...",
   msgUploadEnd:"上传成功...",
   msgValidationError:"上传失败...",*/
  // msgUploadEmpty:"",
  //图标
  previewFileIconSettings: {
    'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
  },
};

//文件上传下载操作
let file = {};

/*下载文件*/
file.sendFormData = function (formData, action) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', action, true);
  xhr.responseType = 'blob';

  //保存文件
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      let filename = decodeURI(xhr.getResponseHeader('Content-Disposition'));
      saveAs(xhr.response, filename);
    }
  };

  //状态改变时处理返回值
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      //通信成功时
      if (xhr.status === 200) {
        //交易成功时
        showSuccess('文件导出成功, 请在浏览器中另存导出的文件...');
      } else {
        //交易失败时, 处理错误
        showError('文件导出失败：' + decodeURI(xhr.statusText));
      }
    }
  };
  xhr.send(formData);
}


file.downLoadFile = function (expUrl, expParam) {
  //定义form,因为ajax不能接受 流类型数据
  if (expUrl.length != 0) {
    //采用FormData参数
    let formData = new FormData();
    formData.append('expName', document.title);
    formData.append('expParam', expParam);
    sendFormData(formData, expUrl);
  } else {
    showError('导出文件参数错误！');
  }
};

//日期控件配置
let datePicker = {}

datePicker.config={
  locale: (typeof moment) === 'function' ? moment.locale('zh-cn') : false,
  viewMode: 'days',//第一次选择默认最小视图 months,days,years,decades
  format: 'YYYY-MM-DD',
  // sideBySide:true,//横向日期时间
  // collapse:false,//纵向日期时间
  defaultDate: (typeof moment) === 'function' ? moment((new Date()).format('yyyy-MM-dd'), 'YYYY-MM-DD') : false,
  // // disabledDates: [
  // //   moment("2015/12/25",'YYYY/MM/DD'),
  // //   new Date(2013, 11 - 1, 21),
  // //   "2013/12/25 00:53",
  // // ],
  //daysOfWeekDisabled:[0,6],//禁用星期几
  //dayViewHeaderFormat: 'YYYY  MMMM',//头部显示
  debug: false,
  toolbarPlacement: 'bottom',
  showTodayButton: true,
  showClear: true,
  //showClose:true, //关闭按钮
  widgetPositioning: {//部件定位
    horizontal: 'right',
    vertical: 'auto'
  },
  tooltips: {
    today: '今天',
    clear: '清除选择',
    close: '关闭',
    prevMonth: '上个月',
    selectMonth: '选择月',
    nextMonth: '下个月',
    prevYear: '上一年',
    selectYear: '选择年',
    nextYear: '下一年',
    prevDecade: '上个十年',
    selectDecade: '选择十年',
    nextDecade: '下个十年',
    prevCentury: '上个世纪',
    nextCentury: '下个世纪',
    selectTime: '选择',
    pickHour: '选择小时',
    incrementHour: '增加小时',
    decrementHour: '减少小时',
    pickMinute: '选择分',
    incrementMinute: '增加分',
    decrementMinute: '减少分',
    pickSecond: '选择秒',
    incrementSecond: '增加秒',
    decrementSecond: '减少秒',
    togglePeriod: '选择',
  },
  icons: {
    time: 'fa fa-clock-o',
    date: 'fa fa-calendar',
    up: 'fa fa-chevron-up',
    down: 'fa fa-chevron-down',
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-crosshairs',
    clear: 'fa fa-trash-o',
    close: 'fa fa-remove'
  }
}

//公共函数
let pubFunc = {};
/**
 * 根据模板拷贝数据
 * @param src
 * @param temp
 */
pubFunc.copyFromTemp = function (src,temp) {
  let data = {};
  for (let key of Object.keys(temp)) {
    if (key in src) {
      let value = src[key];
      data[key] = pub.isNull(value)?'':value;
    }
  }
  return data;
}

pubFunc.isNull = pub.isNull
pubFunc.getUrlParam = pub.getUrlParam

pubFunc.getLength = function (str) {
  let c = 0.0,unicode = 0;
  if (str == null || str == "") {
    return 0;
  }
  // len = str.length;
  for(let i = 0; i < str.length; i++) {
    unicode = str.charCodeAt(i);
    if (unicode < 127) { //判断是单字符还是双字符
      c += 1;
    } else {  //chinese
      c += 2;
    }
  }
  return c;
}

pubFunc.subStr = function (str, startp, endp) {
  let i=0, c = 0, unicode=0, rstr = '';
  let len = str.length;
  let sblen = pubFunc.getLength(str);
  if (startp < 0) {
    startp = sblen + startp;
  }
  if (endp < 1) {
    endp = sblen + endp;// - ((str.charCodeAt(len-1) < 127) ? 1 : 2);
  }
  // 寻找起点
  for(i = 0; i < len; i++) {
    if (c >= startp) {
      break;
    }
    unicode = str.charCodeAt(i);
    if (unicode < 127) {
      c += 1;
    } else {
      c += 2;
    }
  }
  // 开始取
  for(i = i; i < len; i++) {
    unicode = str.charCodeAt(i);
    if (unicode < 127) {
      c += 1;
    } else {
      c += 2;
    }
    rstr += str.charAt(i);
    if (c >= endp) {
      break;
    }
  }
  return rstr;
}

//提示框
let layerDlg = {index:-1}

layerDlg.showConfirm = function (info, yes=()=>{}, no=()=>{}) {
  layer.confirm(info, {title:'询问',btn: ['确定','取消'],icon: 3}, yes,no)
}

layerDlg.showError = function (info) {
  layer.alert(info, {title:'错误',icon: 2})
}

layerDlg.showAjaxError = function (data) {
  let info = '';
  if (data.saveError != undefined) {
    info = data.saveError;
  } else {
    info = data.reason;
  }
  layerDlg.showError(info);
}

layerDlg.showSuccess = function (info) {
  layer.msg(info,{icon: 1,time: 1000});
}

layerDlg.showAjaxSuccess = function (data) {
  let info = '保存成功!';
  if ((data != undefined) && (data.reason != undefined)) {
    info = data.reason;
  }
  layerDlg.showSuccess(info);
}

layerDlg.showWarn = function (info) {
  layer.alert(info, {title:'警告',icon: 0})
}

layerDlg.showMessage  = function (info) {
  layer.msg(info,{time: 1000});
}

layerDlg.showLoading  = function (info) {
  layerDlg.index = layer.load(0, {
    content:'<i class="fa fa-spinner fa-spin fa-3x fa-fw" style="color:white"></i>' +
    '<span style="white-space: nowrap;vertical-align: 7px;color:white">' +
    '<strong>'+info+'</strong>' +
    '</span>',
  });

  return layerDlg.index
}

layerDlg.closeLoading  = function (info) {
  layer.close(layerDlg.index);
}

export {
  dataTable,
  jsTree,
  fileInput,
  pubFunc,
  datePicker,
  layerDlg,
}

