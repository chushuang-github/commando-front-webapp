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
