# zuo-statistics
web ua/pa statistics

从 0 到 1 写一个类似百度统计的轮子

- 前端上报用原生 js
- 后台管理系统用 Vue3 + TS + `@vue/cli`
- 服务端 Nest.js + mysql

## 使用场景
在页面中引入一个 js，初始化即可完成上报

下面是百度统计的引用示例

```html
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?183281668cc3440449274d1f93c04de6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

分析百度统计的上报流程，script 标签动态加载 hm.js 文件(参见 test/hm.js)，然后这个 js 会通过创建 1x1 的 gif 图片来发送 get 请求上报信息？

为什么上报埋点用 gif？参考：[为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87)

- 能够完成整个 HTTP 请求+响应（尽管不需要响应内容）
- 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
- 跨域友好
- 执行过程无阻塞
- 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好
- GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）

结合 JS高级程序设计第 4 版中的 [Beacon API](http://fe.zuo11.com/js/ad3/js-ad3-24.html#beacon-api) 在页面 unload 时候上报信息

```js
navigator.sendBeacon('/user', `{ page: '/xxx', duration: '12s' }`)
```

## 服务端
### 服务端 nest.js 
[nest.js](https://docs.nestjs.com/) 技术调研，[Nest.js 和 koa 有什么不一样？](https://www.zhihu.com/question/323525252)

koa 是渐进式的，很多都依赖其他库，需要手动引入
nest.js 支持 ts，可以很好的发挥装饰器的优势，功能集中，很多功能帮你集成好了，脚手架创建时自带 eslint,prettier,jest,git等（需要更多的学习成本）

```js
sudo npm i -g @nestjs/cli 
nest new statistics-server
```
由于我们这里同一仓库下有两个项目前端、后端，所以需要进入 statistics-server 目录 rm -rf .git 删掉脚手架生成的 git
### mysql
安装 mysql，root/abc123456! 安装完成后，测试

mysql -uroot -p 

需要设置环境变量，在系统偏好这种里面找到最下面的 mysql 然后点击去，configuration 中可以看到 mysql 安装的路径

mysql 命令路径为 /usr/local/mysql/bin/mysql，设置环境变量，这样在任何目录下就都可以访问 mysql 了， 参考：[mysql基本操作](http://www.zuo11.com/blog/2016/10/db_mysql_basecmd.html)


## 后台管理系统 vue3+ts
脚手架 https://cli.vuejs.org/guide/installation.html
```js
npm install -g @vue/cli
vue create statistics-fe
```

