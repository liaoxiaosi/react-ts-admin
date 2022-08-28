import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';
//删除业务逻辑组件

interface IProps{
    id:number  //一般传id给后台就可以删除
    callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

}
export default class DeleteUser extends Component<IProps,any>{  //IProps 父组件传的数据
    deleteUser=()=>{ //点击按钮,调用回调函数
        //进行网络请求删除
        this.props.callback(this.props.id)  
    }
  
    confirm = () => {
        // console.log(e);
        // message.success('Click on Yes');
        this.deleteUser()
      };
      
      cancel = () => {
        // console.log(e);
        // message.error('Click on No');
        message.warn('取消删除');
      };
   render(): ReactNode {
       return(
        <Fragment>
            
            <Popconfirm
                title="确认删除吗?"
                onConfirm={this.confirm}
                onCancel={this.cancel}
                okText="确定"
                cancelText="取消"
            >
                {/* <a href="#">Delete</a> */}
                {/* <Button type='primary' danger onClick={this.deleteUser}> 删除</Button> */}
                <Button type='primary' danger > 删除</Button>
            </Popconfirm>
        </Fragment>
       )
   }
}



