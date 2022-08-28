import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';
//用户详情列表
// interface IProps{
//     id:number  //一般传id给后台就可以删除
//     callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

// }
export default class DeleteUser extends Component<any,any>{  //IProps 父组件传的数据
    
   render(): ReactNode {
       return(
        <Fragment>
            用户详情
        </Fragment>
       )
   }
}



