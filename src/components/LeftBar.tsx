import { Component, Fragment, ReactNode } from 'react';
import {Menu, Layout } from 'antd';
import {IRouter} from '../router/index2'
import { Link, matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import { router } from '../router/index2';

interface IState {
    defaultOpenKeys:string[]  //这是antd中使用导航栏，默认展开的二级菜单
    defaultSelectedKeys:string[]  //antd中导航栏，默认选中的菜单
}
//定义一个接口，用来继承路由的接口，
// 直接这样会报错，需要用高阶组件
//凡是要拿到path的信息，都要继承RouteComponentProps
//好像 IProps 不用也可以，用了高阶组件即可，像在breadCrumbs那里一样
interface IProps extends RouteComponentProps{

}

//左侧菜单栏
const {  Sider } = Layout;
 class LeftBar extends Component<any, IState>{
    constructor(props:IProps,context:any){
        super(props,context)
        this.state={
            defaultOpenKeys:[],
            defaultSelectedKeys:[]
        }
    } 
    //组件加载完成后，调用高亮显示
    componentDidMount(){
        this.heightMenu(router)
    }
    /**  
    思路：
        首先，拿到当前的路由地址，和所有的路由地址进行匹配，匹配到，就将对应的菜单进行高亮显示
     */
    heightMenu = (leftRouter:IRouter[])=>{
        //调用match
        let path = this.props.location.pathname
        console.log('.path',path)
        for(let r of leftRouter){
            let match =matchPath(path,{path:r.path})
            if(match){  //如果匹配到，会返回匹配的信息
                if(match.isExact){  //如果精确匹配，那就是没有
                    this.setState({   //子菜单，让它高亮
                        defaultSelectedKeys:[r.key]
                    })

                }else{  //不是精确匹配，那就是 二级菜单的那个点击下拉的单，让它把二级菜单打开
                    this.setState({   //父级菜单，让它打开显示子菜单
                        defaultOpenKeys:[r.key]
                    })

                }
            }
            //如果它有子路由，那就要继续调递归，再一次进行匹配
            if(r.children){
                this.heightMenu(r.children)
            }

        }

    }


    //定义一个函数，用来处理路由,直接用js生成 dom 模板
    generateMenu = (routerlist?:IRouter[])=>{
        return (
            <>
            {
                routerlist?.map((r:any)=>{
                    if(r.children){
                        return (
                            <>
                                <SubMenu key={r.key} title={r.title} icon={r.icon}>
                                    {/* <Menu.Item key={r.key}>
                                        <Link to='r.path'>{r.title}</Link>
                                    </Menu.Item> */}
                                    {this.generateMenu(r.children)} 
                                </SubMenu>
                            </>
                        )
                    }else{
                        return (
                            <>
                                <Menu.Item key={r.key} icon={r.icon}>
                                    <Link to={r.path}>{r.title}</Link>
                                </Menu.Item>
                            </>
                        )
                    }
                })
              
            }
            </>
        )
        
    }

    render(): ReactNode {
        //加这个判断，是因为侧边栏是用的第三方库，有自己的规则，所以要加判断
        // this.state.defaultSelectedKeys.length>0 选中的是否大于零，大于零表示比较过
        //否则就是返回空的
        return (
            <Fragment>
                <Sider width={200} className="site-layout-background">
                    {
                        this.state.defaultSelectedKeys.length>0?
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={this.state.defaultSelectedKeys}
                            // defaultOpenKeys={['sub1']}
                            defaultOpenKeys={this.state.defaultOpenKeys}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {this.generateMenu(router)}
                        </Menu>
                        :null
                    }
                    
                </Sider>
            </Fragment>
        )
    }
}

//withRouter()  //高阶组件，传入一个组件f返回另一个新的组件
export default withRouter(LeftBar)

