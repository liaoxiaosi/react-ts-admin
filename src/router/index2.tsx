import {lazy, ReactNode} from 'react'
import {
    DashboardFilled,
    UserOutlined
  } from '@ant-design/icons';

//懒加载可以使速度更快
const Login = lazy(()=>import('../Login'))
const DashBoard = lazy(()=>import('../index/DashBoard'))
const Page404 = lazy(()=>import('../Page404'))
const UserList = lazy(()=>import('../UserList'))  //组件懒加载
const UserDetail = lazy(()=>import('../UserDetail'))  //组件懒加载




export interface IRouter{
    title:string 
    path:string 
    key:string
    exact?:boolean
    icon?:ReactNode
    component?:ReactNode
    children?:IRouter[]
}

export const router:IRouter[]=[
    
    {
        path:'/admin/DashBoard',
        title:'首页',
        key:'DashBoard',
        icon:<DashboardFilled />,
        exact:true,
        component:<DashBoard />, 

    },
    
    
    {
        path:'/admin/user',
        title:'用户管理',
        key:'user',
        icon:<UserOutlined />,
        // component:<UserList />, 
        children:[
            {
                path:'/admin/user/userlist',
                title:'用户列表',
                key:'userlist',
                // icon:<DashboardFilled />,
                exact:true,
                component:<UserList />, 
            },
            
            {
                path:'/admin/user/UserDetail',
                title:'用户详情',
                key:'UserDetail',
                // icon:<DashboardFilled />,
                exact:true,
                component:<UserList />, 
            }
        ]

    },
    // {
    //     path:'/login',
    //     title:'登录',
    //     key:'login',
    //     exact:true,
    //     component:<Login />, 

    // },
    // //404页面一般放在最后，匹配不到才显示
    // {
    //     path:'*',
    //     title:'404',
    //     exact:true,
    //     key:'404',
    //     component:<Page404 />, 

    // },

]
//这里放不需要认证的页面
 export const unAuthRouter:IRouter[]=[
    {
        path:'/login',
        title:'登录',
        key:'login',
        exact:true,
        component:<Login />, 

    },
    //404页面一般放在最后，匹配不到才显示
    {
        path:'*',
        title:'404',
        exact:true,
        key:'404',
        component:<Page404 />, 

    },

]
// export default{
//     router,
//     unAuthRouter
// }


