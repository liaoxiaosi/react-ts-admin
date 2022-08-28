# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

###  相关下载
### 创建react + ts项目 npx create-react-app my-app --template typescript

### 下载antd npm install antd --save
### 下载aixos npm install axios --save
//版本不一样可能存在不兼容的问题
### 下载路由  npm install react-router-dom@5 @types/react-router-dom@5 --save


jsx语法:
  js中jsx后缀 .jsx

tsx语法:
   ts中tsx后缀 .tsx

//react的生命周期
//常用:
## 挂载
  当组件实例被创建并插入Dom中时,其生命周期顺序如下
  constructor()
  static getDerivedStateFromProps()
  render()
  componentDidMount()
  ## 注意:componentWillMount()即将过时,应避免使用 

## 更新
   当组件中的props或state发生变化时会触发更新,组件更新的生命周期调用顺序如下
   static getDerivedStateFromProps()
   shouldComponentUpdate()
   render()
   getSnapshotBeforeUpdate()
   componentDidUpdate()
   ## 注意:componentWillUpdate() componentWillReceiveProps()即将过时,应避免使用他们

## 卸载
  当组件从DOM中移除时会调用如下方法
  componentWillUnmount()

## 错误处理
  当渲染过程,生命周期,或子组件的构造函数中抛出错误时,会调用如下方法
  static getDerivedStateFromError()
  componentDidCatch()

## 此外,还提供了额外的API:
   setState()  //更新状态
   forceUpdate() 强制刷新


<!-- 生命周期详解答 -->
## constructor(props,context) 
   在组件挂载之前,会调用它的构造函数constructor
   react.component子类实现构造函数时,应在其他语句之前调用 super(props,context)

## getDerivedStateFromProps(props, state) 方法  props变化时更新state  (更新)
   会在调用render 方法之前调用,即在渲染DOM元素之前都会被调用,也就是,在初始挂载和更新组件状态时都会被调用
  
   作用:让组件在 Props 变化时更新state
   返回:该方法返回一个对象用于更新state,如果返回null则不更新任何内容哦那个

## render()  语法: ReactDOM.render(element, container[, callback]) dom容器  (更新)
   方法用于在提供的容器参数 container里渲染一个 React 元素 element 
   返回:返回对该组件的引用
   如果提供了可选的回调函数 callback，该回调将在组件被渲染或更新之后被执行。


## componentDidMount() 挂载后
   组件挂载后 (插入Dom树中) 立即调用, 依赖于dom节点的 初始化应放在componentDidMount 中
   例如,用户交互事件(点击事件,操作页面数据,视图等),获取数据

## shouldComponentUpdate()  是否继续渲染/是否更新  (更新)
   shouldComponentUpdate(nextProps, nextState)
   返回: 返回布尔值,指定react是否应该继续渲染,默认时true,即每次state发生变化,组件都会重新渲染

   其返回值用于判断react组件的输出是否受当前state或props 更改的影响,当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。

## getSnapshotBeforeUpdate(prevProps, prevState)  更新前  (更新)
   在最近一次渲染输出（提交到 DOM 节点）之前调用。
   在该方法中,可以访问更新前的 props 和 state。
   方法需要与 componentDidUpdate() 方法一起使用，否则会出现错误。


## componentDidUpdate(prevProps, prevState, snapshot)  更新后  (更新)
   方法在组件更新后会被立即调用。
   可以在该方法中直接调用 setState()，但请注意它必须被包裹在一个条件语句里。


## 自我总结记忆,
   ## 挂载 : 子类实现构造函数 (constructor) =>  props变化是否更新state => 更新模板 (render) 界面变化了 => 挂载后 (componentDidMount) 用户想干点啥
   ## 更新: props变化是否更新state => 更新模板(render) => 是否继续更新(should..update) => 更新前干点啥 (beforeUpdate) = > 更新后 (DidUpdate)

## shouldComponentUpdate 和 static getDerivedStateFromProps 都能控制界面是否更新
//可在这两个函数中做权限限制
   区别: 
      shouldComponentUpdate:只在更新时触发  返回false 不更新任何内容

      static getDerivedStateFromProps 加载和更新时都能触发 返回null不更新任何内容