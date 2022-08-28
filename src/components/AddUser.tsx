import {Component, Fragment, ReactNode, RefObject,createRef} from 'react';
import {Form, Button ,Popconfirm,message, Modal, FormInstance} from 'antd';

interface IProps{
   visible:boolean
    callback:() => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

}
// interface IUser{
//     name:string 
//     id:number 
// }
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
//添加用户
//主要用到一个思路：状态提升,加数据回调：数据回调给父亲，父亲去处理
//子组件的状态(props)交给父组件来管理，例如，子组件的操作，数据，显示隐藏
export default class AddUser extends Component<IProps,any>{  //IProps 父组件传的数据
    //引入form 拿到form实例
    formRef:RefObject<FormInstance>
    constructor(props:IProps,context:any){
        super(props,context)
        this.formRef = createRef<FormInstance>()
    }
    
    cancel=()=>{  
        //这里将通过回调函数，告诉父亲我要关闭
        //调用父亲传过来的回调函数，也就是调用父亲的hideAddUserModal 方法，将showAddUserModal值转为false
        this.props.callback()
    }
    //添加用户
    submit=(info:any)=>{
        console.log('???数据呢',info)
        //将数据传回给后台，进行数据添加，
        //并且将当前弹窗关掉
    }
   render(): ReactNode {
       console.log('??添加用户',this.props.visible)
       return(
        <Fragment>
           <Modal title='添加用户' 
           visible={this.props.visible} 
           onCancel={this.cancel}
           footer={null}
           >
               <Form ref={this.formRef} {...layout}  onFinish={this.submit}>
                    <Form.Item 
                    label='用户名' 
                    name={'name'}
                    rules={[{
                        type:'string',
                        required:true,
                        message:'用户名不能为空'
                    }]}
                    >
                        <input type="text" />
                    </Form.Item>
             
              
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >
                            添加管理员
                        </Button>
                        &nbsp;&nbsp;
                        <Button type="primary" htmlType="reset">
                            重置
                        </Button>
                    </Form.Item>
               </Form>
           </Modal>
        </Fragment>
       )
   }
}



