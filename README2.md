为避免出现问题,设置值的时候,尽量使用此方法
this.setState((state,props)=>({
      counter:state.counter + 1
   }))

User组件
路由嵌套:父亲路由不能设置 exact={true} 精确匹配,否则子路由无法匹配到

<Route path={'/user'} exact={true}> <User /> </Route>

在User这个组件中,设置子路由
<Switch>
   <Route path={'/user/list'}>
      <UserList/>
   </Route>
   <Route path={'/user/detail'}>
         <UserDetail />
   </Route>
</Switch>

//重定向
 if(!this.auth){  //如果没有认证,那么就返回一个组件,重定向
   window.location.href='/login' 
   return null
   //from 从哪来的 to:去登录页进行认证
   //  return <Redirect to='/login' from='/user/detail' />

}

<Redirect to='/login' from='/user/detail' />
<Redirect to='/login' from='/user/detail' push/>

有push相当于replace,不会加入栈中,浏览器没有返回 ,定向到login后,只能在login页面了
没有push: 会有返回

//判断路由匹配 如果匹配成功,返回路由信息,如果失败了返回null
//用于 菜单权限匹配,即动态路由
import {matchPath} from 'react-router'

 const match = matchPath('/user/detail/1',{
           path:'/user/detail/:id',
           exact:true,
           strict:true
       })


//登录,拿到所有权限路由 然后循环比对当前url 地址,匹配到了说明有权限,匹配不到说明没有权限
this.props.match.url:当前要去的路由地址
    const match = matchPath(this.props.match.url,{
        path:'/user/detail/:id',
        exact:true,
        strict:true
    })
       console.log(match)


## match进行左侧菜单栏高亮显示

## //如果匹配不到,让它回到原来页面
    this.props.history.goBack()
    
##    //类似重定向 到某个页面 浏览器没有返回功能
    // this.props.history.push('/user/list')
###   //用replace的路由替换当前路由 浏览器有返回
    this.props.history.replace('/user/list')


## 高级组件: 获取所需要的参数 ,重定向等
  import {withRouter} from 'react-router'

  class User extends Component<any,any>{
     ...
  }

  export default withRouter(User)

## 忽略错误下面一行代码的错误://@ts-ignore  


## 代码分割,在路由中使用,切换路由的时候,重新加载内容
## 用于优化
   组件使用懒加载方式const UserList = lazy(()=>import('../UserList'))  //组件懒加载
   <Router>
      <Suspense fallback={<>loading...</>}>
   </Router>

## 状态提升:把一个子组件的状态提升到父级组件


## Redux 状态管理,共享数据仓库,存储一些公用的数据 
  ## 重点:主要是为了解决跨页面数据共享
  ## 响应式的,是观察者模式

   ## 安装插件 npm install react-redux


## react中的高阶组件： HOC 函数
## 例子，withLee1 高阶组件， User.tsx中引用
   高阶组件是参数为：组件，返回值为：新组件的函数

   组件是将 props 转为UI，而高阶组件时将组件转为另一个组件
   例子：一个简单的高阶组件
   export function withLee(Wrap:any){
    return class extends Component<any,any>{

        render(): ReactNode {
            return <Wrap />
        }

      }
   }

   class Lee extends Component<any,any>{
      render(): ReactNode {
         return (
               <Fragment>

               </Fragment>
         )
      }
   }
   //高阶组件：传入一个组件，生成一个新的组件
   //参数就是：组件
   //具体而言：高阶组件是参数为组件，返回值为新组件的函数
   export default  withLee(Lee)

## js 柯里化
   ## 函数 柯里化 ：给一个函数传入一部分参数 ，此时就会返回一个函数来接收剩余的参数

   例子：
      function func1(a){
         a+=2  ==》a=2+2 =4
         return function(b){
            b*=2  ==>b=2*3 =6
            return function(c){
               c**=2 ==>2*4*2 =16
               return a+b+c
            }
         }
      }
      func1(2)(3)(4)   ==>26
   ## 自动柯里化
   function func2(fn){
      return function curry(...args1){
         if(args1.length >= fn.length){
            return fn.call(null,...args1)
         }else{
            return function(...args2){
               return curry.apply(null,[...args1,...args2])
            }
         }
      }
   }

   function sum(a,b,c,d,e){
      return a+b+c+d+e
   }
  let resFunc = func2(sum)
  console.log(resFunc(1,3,4)(1)(23))

