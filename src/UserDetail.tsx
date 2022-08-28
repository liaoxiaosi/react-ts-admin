import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';
import { Redirect } from 'react-router-dom';
import {withRouter,RouteComponentProps} from 'react-router'

import {matchPath} from 'react-router'

//withRouter :高级组件
//RouteComponentProps 是在withRouter里找到的,withRouter就是继承了这个类
interface IProps extends RouteComponentProps{
    auth?:boolean 
}


class UserDetail extends Component<IProps,any>{  //IProps 父组件传的数据
   
   
   componentDidMount(){
       //忽略下面一行代码 的错误
       //@ts-ignore  
    //    console.log('9999props',this.props.match.params.id)
       console.log('9999props',this.props)
       //判断路由匹配,如果匹配成功,返回路由信息,如果失败了返回null
    //    const match = matchPath('/user/detail/1',{
    //        path:'/user/detail/:id',
    //        exact:true,
    //        strict:true
    //    })
    //如果匹配不到,让它回到原来页面
    // this.props.history.goBack()
    //类似重定向 到某个页面 浏览器没有返回功能
    // this.props.history.push('/user/list')
    //用replace的路由替换当前路由 浏览器有返回
    // this.props.history.replace('/user/list')
    

    //登录,拿到所有权限路由 然后循环比对当前url 地址,匹配到了说明有权限,匹配不到说明没有权限

    const match = matchPath(this.props.match.url,{
        path:'/user/detail/:id',
        exact:true,
        strict:true
    })
       console.log(match)
   }
    // auth = false 
   render(): ReactNode {
    //    if(!this.auth){  //如果没有认证,那么就返回一个组件,重定向
    //     // window.location.href='/login' 
    //     // return null
    //     // 与下面的写法功能一样
    //     //from 从哪来的 to:去登录页进行认证 push:加入后,相当于replace 浏览器没有返回 ,定向到login后,只能在login页面了
    //     //  return <Redirect to='/login' from='/user/detail' push />
    //      return <Redirect to='/login' from='/user/detail'  push/>
    //    }


       return(
        <Fragment>
            <h1>这是用户详情啊</h1>
            用户详情
        </Fragment>
       )
   }
}

export default withRouter(UserDetail)


