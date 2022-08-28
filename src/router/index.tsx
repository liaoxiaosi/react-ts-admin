//实现动态路由

import {ElementType,lazy,ReactNode} from 'react'


//组件
// import App from '../App'
// import User from '../User'
// import UserList from '../UserList'
// import UserDetail from '../UserDetail'
const App = lazy(()=>import('../App'))  //组件懒加载
const UserDetail = lazy(()=>import('../UserDetail'))  //组件懒加载
const User = lazy(()=>import('../User'))  //组件懒加载
const UserList = lazy(()=>import('../UserList'))  //组件懒加载


//用接口定义路由
interface IRouter {
    id:number
    path:string 
    title:string  
    key:string
    exact?:boolean  //是否精确匹配
    // component?:ElementType|ReactNode
    component?:ReactNode
    children?:IRouter[]  //是否有子路由
}

export const router:IRouter[]=[
    {
        id:1,
        path:'/',
        key:'home',
        title:'首页' , 
        exact:true,  //是否精确匹配
        component:<App />
       
    },
    {
        
        id:2,
        path:'/user',
        title:'user list' , 
        key:'user',
        exact:true,  //是否精确匹配
        // component:<User />,
        children:[
            {
        
                id:3,
                path:'/user/list',
                key:'userlist',
                title:'user list' , 
                exact:true,  //是否精确匹配
                component:<UserList />,
            },
            {
        
                id:3,
                path:'/user/detail',
                key:'userdetail',
                title:'user detail' , 
                exact:true,  //是否精确匹配
                component:<UserDetail />
            }
        ]
    },
    
]


