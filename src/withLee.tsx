import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,message} from 'antd';


//高阶组件如何传值？

export function withLee(Wrap:any){
    return class extends Component<any,any>{

        render(): ReactNode {
            return <Wrap />
            // return class extends Component<any,any>{
            //     render()
            // }
        }

    }
}

class Lee extends Component<any,any>{
    render(): ReactNode {
        return (
            <Fragment>
                <h1>
                    引用高阶组件试试
                </h1>
               
            </Fragment>
        )
    }
}
//高阶组件：传入一个组件，生成一个新的组件
//参数就是：组件
//具体而言：高阶组件是参数为组件，返回值为新组件的函数
export default  withLee(Lee)