import {Component, Fragment} from 'react';
//定义IUser
interface IUser{
    name:string
}
//定义一个接口
interface IPerson{
    name:string
    age?:number
    auth?:boolean
    user?:IUser

}
// export default  导出这个类,这样其他页面就可以直接引入使用
 //<any,any> 这两个参数,作为组件很重要
export default class Lee extends Component<IPerson,any>{  //传入第一个参数,其类型是IPerson类型
    //组件Lee.tsx
    render(): React.ReactNode {
      return(
        <Fragment>
            <h1>我是 Lee 组件</h1>
            <h2>{this.props.name}</h2>
        </Fragment>
      )
    }
  }




