import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';
import { BrowserRouter as Router,Switch,Route,Link,Redirect } from 'react-router-dom';

import UserList from './UserList'
import UserDetail from './UserDetail'


//用户详情列表
interface IProps{
    id:number  //一般传id给后台就可以删除
    callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

}
export default class UserAuth extends Component<any,any>{  
    
   render(): ReactNode {
       return(
        <Fragment>
           用户认证页面
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



