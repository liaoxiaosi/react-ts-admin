import {Component, ComponentType, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';


//高阶组件如何传值？
//对高阶组件进行类型约束:
//Wrap:ComponentType<T>:传入的组件类型是 T，返回的组件类型：ComponentType<T> 是T
export function withLee<T>(Wrap:ComponentType<T>):ComponentType<T>{
    return class extends Component<T>{

        render(): ReactNode {
            return <Wrap {...this.props} />
        }

    }
}
interface IProps{
    name?:string
}
//对高阶组件进行约束，以及传值
// class Lee extends Component<any,any>{
class Lee extends Component<IProps>{
    render(): ReactNode {
        return (
            <Fragment>
                <h1>
                    高阶组件
                </h1>
                <p>传值了嘛：{this.props.name}</p>
               
            </Fragment>
        )
    }
}
//高阶组件：传入一个组件，生成一个新的组件
//参数就是：组件
//具体而言：高阶组件是参数为组件，返回值为新组件的函数
export default  withLee<IProps>(Lee)