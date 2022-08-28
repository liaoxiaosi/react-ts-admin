import React,{Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,Form,Modal, FormInstance} from 'antd';
import { randomUUID } from 'crypto';
//用户详情列表
// interface IProps{
//     id:number  //一般传id给后台就可以删除
//     callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

// }
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

interface IProps{
    visible:boolean
    callback:(visible:boolean,user?:IUser)=>void  //做一个回调,告诉父亲,我关掉了弹窗
    user?:IUser
}
interface IUser{
    name:string 
    id:number 
}
export default class EditUser extends Component<IProps,any>{  //IProps 父组件传的数据
    formRef
    constructor(props:IProps,context:any){
        super(props,context)
        this.formRef = React.createRef<FormInstance>()
        this.state={
            user:props.user
        }
      
    }
    componentDidMount(){
        console.log('???传了值没有',this.props)
    }
    //确定
    handleOk = (user?:any)=>{
        console.log('ok')
        // {...this.props.user, ...user} //展开对象,后面的会把前面的覆盖掉(如果有相同的值),如果有不相同的值,会添加
        this.props.callback(false,{...this.props.user, ...user})
        // this.props.callback(false)
        
    }
    handleCancel = ()=>{
        console.log('ok')
       this.props.callback(false)
    }
    //点击submit后,可能是添加也可能是编辑
    // onFinish = (values: any) => {
    saveUser = (user: IUser) => {
        console.log(user);
        // if(user.id){  //编辑
        //     console.log('????1111-------')
        //     this.props.callback(false,{...this.props.user, ...user})
        // }else{
        //     console.log('????-------')
        //     //如果输入了name，那就生成一条数据，没有就直接关掉弹窗
        //     if(user.name){
        //          // 随机 生成一个id
        //         let id = Date.now() + Math.random()
               
        //         this.props.callback(false,{name:user.name,id:id})
        //     }else{
        //         this.props.callback(false)
        //     }
           
            
        // }
        this.props.callback(false,{...this.props.user, ...user})
      }

    //更新数据后才需要通知父亲,进行调用回调,其他时候,例如关掉,其实不需要,所以把 footer关掉
   render(): ReactNode {
       console.log('this.props.user',this.props.user)
    //    antd 的 Form,值不能用state控制,所以,需要进行一些判断,进行手动更新数据

    //赋值的时候 1:例如shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
    //2. 使用form.setFieldsValue来动态改变  表单值
    this.formRef.current?.setFieldsValue({
        ...this.props.user
    })
    return(
        <Fragment>
            <Modal title='提示?' 
                visible={this.props.visible} 
                onOk={this.handleOk} 
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form 
                   ref={this.formRef}
                   onFinish={this.saveUser}
                    initialValues={
                       this.props.user
                    }
                >
                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name }
                        label='name'
                        name='name'
                    >
                        <input type="text" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    
                </Form>
            </Modal>
        </Fragment>
       )
   }
}



