import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';
import { BrowserRouter as Router,Switch,Route,Link,Redirect } from 'react-router-dom';

import UserList from './UserList'
import UserDetail from './UserDetail'

import Lee from './withLee1'  //引入高阶组件

//用户详情列表
interface IProps{
    id:number  //一般传id给后台就可以删除
    callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

}
 class User extends Component<any,any>{  //IProps 父组件传的数据
    
   render(): ReactNode {
       return(
        <Fragment>
            <h3>使用简单的高阶组件Lee</h3>
            <Lee name='我试试'/>
            user page 路由嵌套:父亲路由不能设置 exact={true} 精确匹配,否则子路由无法匹配到
           <Switch>
               <Route path={'/user/list'}>
                  <UserList/>
               </Route>
               <Route path={'/user/detail'}>
                    <UserDetail />
               </Route>
           </Switch>
        </Fragment>
       )
   }
}
export default  User


