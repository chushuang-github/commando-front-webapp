// 检测是否为纯粹的对象
export const isPlainObject = function isPlainObject(obj) {
  let proto
  let Ctor
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false
  }
  proto = Object.getPrototypeOf(obj)
  if (!proto) return true
  Ctor = proto.hasOwnProperty('constructor') && proto.constructor
  return typeof Ctor === 'function' && Ctor === Object
}

// 处理移动端屏幕最大宽度 (我们这个项目的屏幕最大宽度为750px，根html标签font-size最大为75px)
// 我们做了移动端适配，根标签的font-size大小由amfe-flexible库设置的 (这个库会根据屏幕大小设置根html font-size大小)
// 屏幕大小超过750px，amfe-flexible这个库给根标签font-size设置的大小也会超过75px
// 所以屏幕大小超过750px，我们要手动的调整根html字体大小 (因为我们这个移动端app设置的大小最大为750px)
export const handleMaxWidth = () => {
  let html = document.documentElement
  let app = document.getElementById('app')
  let size = parseFloat(html.style.fontSize)
  if (size > 75) {
    html.style.fontSize = '75px'
    app.style.width = '750px'
    return
  }
  app.style.width = '100%'
  app.style.minHeight = html.clientHeight + 'px'
}

// 日期格式化
// time格式：'20211025'、'2021/10/25'、'2021-10-25 10:00:00'
// template指定的日期格式
export const formatTime = (time, template) => {
  if (typeof time !== 'string') {
    // 'zh-CN'：语言是中国；{ hour12: false }：不采用12小时时间，采用24小时时间
    // time：'2022/7/13 22:43:00'
    time = new Date().toLocaleString('zh-CN', { hour12: false })
  }
  if (typeof template !== 'string') {
    template = '{0}年{1}月{2}日 {3}:{4}:{5}'
  }
  // 解析出年月日等信息
  let arr = []
  // 如果是纯数字字符串：'20211025'
  if (/^\d{8}$/.test(time)) {
    // ['20211025', '2021', '10', '25', index: 0, input: '20211025', groups: undefined]
    // 正则表达式加上括号，调用exec方法，进行正则捕获
    let [, $1, $2, $3] = /^(\d{4})(\d{2})(\d{2})$/.exec(time)
    // arr = ['2021', '10', '25']
    arr.push($1, $2, $3)
  } else {
    // 这种：'2021/10/25'、'2021-10-25 10:00:00'
    // '2021/10/25'.match(/(\d+)/g) --> ['2021', '10', '25']
    // '2021-10-25 10:00:00'.match(/(\d+)/g) --> ['2021', '10', '25', '10', '00', '00']
    arr = time.match(/(\d+)/g)
  }

  // 把arr数组数据模板替换
  // 匹配：{数字}，并且捕获数字
  // 第二个参数回调函数里面返回的东西回去替换匹配到的正则表达式的内容
  return template.replace(/\{(\d+)\}/g, (_, $1) => {
    // 1) 第一个参数：正则表达式匹配到的字符串
    // 2) 第二个参数
    //  + 正则表达式没有括号进行捕获：匹配到的字符串在原字符串里面的索引
    //  + 正则表达式有括号进行捕获：括号捕获的内容
    // 3) 第三个参数
    //  + 正则表达式没有括号进行捕获：完整字符串
    //  + 正则表达式有括号进行捕获：匹配到的字符串在原字符串里面的索引
    // 4) 第四个参数
    //  + 正则表达式没有括号进行捕获：没有第四个参数，也就是undefined
    //  + 正则表达式有括号进行捕获：完整字符串
    let item = arr[$1] || '00'
    if (item.length < 2) {
      item = '0' + item
    }
    return item
  })
}
