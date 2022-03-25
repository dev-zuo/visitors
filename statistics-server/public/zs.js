
// 获取性能数据
function getPerformanceTiming() {
  let t = performance.timing

  // 不支持 performance.timing 时 
  if (!t) {
    return {
      raw: {},
      calcData: {}
    }
  }

  // 重定向结束时间 - 重定向开始时间
  let redirect = t.redirectEnd - t.redirectStart
  // DNS 查询开始时间 - fetech start 时间
  let appCache = t.domainLookupStart - t.fetchStart
  // DNS 查询结束时间 - DNS 查询开始时间
  let dns = t.domainLookupEnd - t.domainLookupStart
  // 完成 TCP 连接握手时间 - TCP 连接开始时间 
  let tcp = t.connectEnd - t.connectStart
  // 从请求开始到接收到第一个响应字符的时间 
  let ttfb = t.responseStart - t.requestStart
  // 资源下载时间，响应结束时间 - 响应开始时间
  let contentDL = t.responseEnd - t.responseStart
  // 从请求开始到响应结束的时间
  let httpTotal = t.responseEnd - t.requestStart
  // 从页面开始到 domContentLoadedEventEnd
  let domContentloaded = t.domContentLoadedEventEnd - t.navigationStart
  // 从页面开始到 loadEventEnd
  let loaded = t.loadEventEnd - t.navigationStart

  let result = [
    { key: "Redirect", desc: "网页重定向的耗时", value: redirect }, 
    { key: "AppCache", desc: "检查本地缓存的耗时", value: appCache },
    { key: "DNS", desc: "DNS查询的耗时", value: dns },
    { key: "TCP", desc: "TCP连接的耗时", value: tcp },
    { key: "Waiting(TTFB)", desc: "从客户端发起请求到接收到响应的时间 / Time To First Byte", value: ttfb },
    { key: "Content Download", desc: "下载服务端返回数据的时间", value: contentDL },
    { key: "HTTP Total Time", desc: "http请求总耗时", value: httpTotal },
    { key: "DOMContentLoaded", desc: "dom加载完成的时间", value: domContentloaded },
    { key: "Loaded", desc: "页面load的总耗时", value: loaded }
  ]

  let calcData = {}
  result.forEach(item => { calcData[item.key] = item.value })
  return {
    raw: t,
    calcData
  }
}


// 如果错误有try-catch捕获，那程序会继续执行，如果没有捕获，会触发error事件，程序不会向下执行，注意：window.onerror要放在最前面
window.addEventListener('error', (message, url, line) => {
  console.log('message: ' + message) // message: Uncaught TypeError: 类型错误
  console.log('url: ' + url) // url: http://127.0.0.1/error.html
  console.log('line:' + line) // line:25
}) 

// 上报 js
function report(params) {
  var img = document.createElement('img')
  // var img = new Image(1, 1)
  let str = JSON.stringify(params)
  console.log('【cccc】', params, str, encodeURIComponent(str),str.length )
  img.src = 'http://127.0.0.1:3000/zs.gif?data=' + encodeURIComponent(str);
  img.onload = function () {
    console.log('资源加载成功')
  }
}

window.addEventListener('unload', (event) => {
  navigator.sendBeacon('/base/pageUnload', `{"page": "/xxx", "duration": "12s" }`)
})

window.addEventListener('load', (event) => {
  console.log('onload')
  var performance = {}
  setTimeout(() => {
    // 性能数据
    performance = getPerformanceTiming()

    // UA 等
    var navProps = ['userAgent', 'platform', 'language', 'hardwareConcurrency', 'deviceMemory', 'cookieEnabled']
    var navData = {}
    navProps.forEach(prop => { navData[prop] = navigator[prop]})

    // 上报数据
    var reportData = {
      perf: performance,
      href: location.href,
      pathname: location.pathname,
      navData: navData,
      screen: {
        size: screen.width + 'x' + screen.height,
        dpr: window.devicePixelRatio,
        colorDepth: screen.colorDepth // 屏幕颜色：24-bit
      },
      network: navigator.connection.effectiveType,
    }
    report(reportData)
  }, 0)
})