import {Component, Fragment, ReactNode} from 'react';
import { Button ,Popconfirm,Breadcrumb} from 'antd';
import { IRouter,router } from '../router/index2';
import { withRouter,matchPath } from 'react-router-dom';
//用户详情列表
// interface IProps{
//     id:number  //一般传id给后台就可以删除
//     callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

// }

 class BreadCrumbs extends Component<any,any>{  //IProps 父组件传的数据
    //对路由列表进行递归，返回一个ReactNode  ，组件
    generate = (routerList:IRouter[]):ReactNode =>{
            let path = this.props.location.pathname
            return(
                <>
                {
                    routerList.map(r=>{
                        let match =matchPath(path,{path:r.path})
                        // console.log('match------',match)
                        if(match!=null){  //如果匹配到，那就显示面包屑，返回一个组件
                          
                            return(
                                <>
                                 <Breadcrumb.Item>{r.title}</Breadcrumb.Item>
                                 {/* // 判断，如果有children  ,说明此时显示的是二级菜单 ,那就进行递归，，如果没有，那就返回空 */}
                                    {
                                        r.children ?
                                        this.generate(r.children): null
                                    }
                                </>
                            )
                        }
                        //否则就返回空
                       return null
                       
                    })
                }
                </>
            )
        
    }
   render(): ReactNode {
       return(
        <Fragment>
           <Breadcrumb style={{ margin: '16px 0' }}>
                {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item> */}
                 {
                    this.generate(router)
                }
            </Breadcrumb>
           
        </Fragment>
       )
   }
}
export default withRouter(BreadCrumbs)


