## 什么是服务器渲染 SSR server-side-rendering  服务器渲染
   服务器渲染：后端先调用数据库，获得数据之后，将数据和页面元素进行拼接，组合成完整的html页面，再直接返回浏览器，也便用户浏览

   原理是：通过将react组件转化成字符串，再将字符串 插入到html中，然后发送给浏览器，给用户浏览

   如何辨别是不是服务器渲染：
       点开网页，查看源代码，如果能看到网页中的数据，例如直接就有<div>这个是里面的内容</div>等网页上的相关内容，说明是服务器渲染
       服务器渲染直接返回的是thml文件

       客户端渲染，是在源代码中看不到html的相关内容的，例如，如果是react vue用的客户端渲染，那就会直接只显示link script等引用

## 什么是客户端渲染
   客户端渲染：数据由浏览器通过ajax动态取得，再通过js将数据填充到dom元素上最终展示到网页中，这样的过程就叫客户端渲染

## 两者对比
   1.服务端渲染需要消耗更多的服务端资源（CPU，内存等）
   2.客户端渲染可以将静态资源部署到CDN上，实现高并发
   3.服务端渲染对seo友好，因为每个页面都有head，head里面可以写一些信息，还有title这些，利于搜索引擎


## react 服务器端渲染的实现
   1.构建编译与运行环境
      .安装babel-node
           npm install babel-cli-g  //支持es6的核心库，将es6语法转为es5语法
      安装react 需要的组件
           npm install babel-preset-react - S  //专门用在react环境下运行的环境
           npm install babel-preset-env - S  //根据浏览器的版本，自动取合适的版本,
           npm install babel-plugin-transform-decorators-legacy -S
   2.在package.json中设置运行命令
         cross-env NODE_ENV=test nodemon --exec babel-node src/server.js
        
         这是指用nodemon监视并命令server.js的运行

         cross-env:跨平台设置环境变量
         nodemon:监视文件的改变并重新运行命令


## react-dom/server 包里有两个方法renderToString和renderToStaticMarkup
   renderToString 和 renderToStaticMarkup的主要作用都是讲React Component (组件)转为html字符串

   1.renderToString ：将react Component转为HTML字符串，生成的HTML的DOM会有额外属性：各个DOM会有data-react-id属性，第一个DOM会有data-checksum属性。

   2.renderToStaticMarkup：同样是将react Component转为HTML字符串，生成的HTML的DOM 不会有额外属性，从而节省HTML字符串的大小

 ## 所以服务端渲染的原理就是： ！！！！！
      通过renderToString 和 renderToStaticMarkup 将组件转为html字符串发送给客户端的，
   这个过程不能对组件进行事件绑定，如果要进行事件绑定，交互，需要在客户端实现。这就使用到一个概念： 同构
   
   ##  react同构:
       客户端与服务器使用同样的组件。服务端负责首次渲染（html），而行为与交互由客户端进行

   ##  实现同构：
        1.使用脚手架创建工程 create-react-app
        2.将express 和 create-react-app 项目的配置文件进行结合
        3.将create-react-app 编译打包后的文件通过 express 公开出来
        app.use('/',express.static("build"))



 03 , 5.05分的位置，.babelrc的配置


### react next
    next是服务器端渲染的框架，具有如下特点
    热代码更新，自动路由，单文件组件，服务端渲染
    生态系统兼容：next.js与js、node、react生态系统协作良好
    自动代码分割，预读取，动态组件，静态输出

   ## 安装
      npm install --save next react react-dom

      创建一个文件夹：react-next
      首先创建一个packge.json
      1.npm init -y
      2.npm install --save next react react-dom

      创建package.json 加入启动脚本
      {
         "script":{
            "dev":"next"
         }
      }
      页面文件写在page文件夹中

      视频进行到 03分
   ## 样式的使用
   ## 定制head
   ## 获取数据以及生命周期
   ## 路由，动态传参
   ## 路由遮盖（route Masking）
   ## redux全局状态管理
   ## 部署



