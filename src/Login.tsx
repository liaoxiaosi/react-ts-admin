import {Component, Fragment, ReactNode, RefObject,createRef} from 'react';
import { Button ,Popconfirm,Form,FormInstance} from 'antd';

//用户详情列表
// interface IProps{
//     id:number  //一般传id给后台就可以删除
//     callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

// }
// export default class DeleteUser extends Component<any,any>{  //IProps 父组件传的数据
    
//    render(): ReactNode {
//        return(
//         <Fragment>
//             用户登录
//         </Fragment>
//        )
//    }
// }
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
class Login extends Component<any,any>{
    formRef:RefObject<FormInstance> //引用form
    constructor(props:any,context:any){
        super(props,context)
        this.formRef = createRef<FormInstance>()
    }

    //点击登录
    login = (form:any)=>{
        console.log('???数据',form)
        //成功后存数据
        // localStorage.setItem('token','lhrsy956686') //写死token存进去

    }
    render(): ReactNode {
        return(
            <Fragment>
                <Form 
                {...layout}
                    ref={this.formRef}
                    onFinish={this.login}
                >
                <Form.Item
                        shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name }
                        label='用户名'
                        name='name'
                        rules={[{ required: true },  { type: 'string', min: 2 }]}
                    >
                        <input type="text" />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) => prevValues.password !== currentValues.password }
                        rules={[{ required: true },  { type: 'string', min: 2 }]}
                        label='密码'
                        name='password'
                    >
                        <input type="password" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >
                            登录
                        </Button>
                        &nbsp;&nbsp;
                        <Button type="primary" htmlType="reset">
                            重置
                        </Button>
                    </Form.Item>
                </Form>

            </Fragment>
        )
    }
}

export default Login
