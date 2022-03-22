
// 上报 js
function report(params) {
  var img = document.createElement('img')
  img.src = 'http://127.0.0.1:3000/zs.gif?a=1&b=2&screen=1920x1080';
  console.log(document.body, img)
  document.body.appendChild(img)
}

window.addEventListener('load', (event) => {
  console.log('onload')
  report()
})