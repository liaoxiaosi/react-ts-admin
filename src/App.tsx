import React, { Component, Fragment, Suspense, lazy } from 'react';
import logo from './logo.svg';
import './App.css'

import { Menu, } from 'antd'
import { MailOutlined, SettingOutlined } from '@ant-design/icons';


import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

//使用类的方式开发
//这个方式的有点:
//1.类有完整的作用域,封装性比较好,不容易受到外界局部变量污染

import { router } from './router/index';  //自定义的路由列表

import Lee from './Lee'
// import State from './State'
// import Live from './live'
// import User from './User'
import UserList from './UserList'
import UserDetail from './UserDetail'
import Login from './Login'
const User = lazy(() => import('./User'))  //组件懒加载




// interface IState{
//   width:number
// }

//组件要更新状态要通过state,所以,要改变 box 的宽度,使用state来更新

// class App extends Component<any,IState>{
class App extends Component<any, any>{
  constructor(props: any, context: any) {
    //super 就是将父类this继承给父类
    super(props, context)
    this.state = {
      width: 40
    }
  }

  handleClick = () => {
    // this.setState((state,props)=>({
    //   width:state.width+10
    // }))
  }
  // <Route path={'/user'} exact={true}> <User /> </Route> 如果开启精确匹配,那么,其路由地底下的子路由就匹配不到
  //定义一个组件Lee.tsx
  // render(): React.ReactNode {
  //   return (
  //     <Fragment>
  //       {/* <Live />
  //       <p className={this.state.width>200?'ady':'box'} style={{backgroundColor:'red',width:`${this.state.width}px`}}>这是父组件</p>
  //       <button onClick={this.handleClick}>点击改宽度</button>

  //        <Lee name={'东方不败'} age={12}/>
  //       <State /> */}
  //       {/* <UserList /> */}
  //       {/* exact={true}:精确匹配 */}
  //       {/* <Link to={'/login'}>login</Link> */}
  //       {/* 等价于 */}
  //       {/* <a href={"/login"}>login</a> */}
  //       <Router>
  //         <ul>
  //           {/* <li><Link to={'/'}>App</Link></li> */}
  //           <li><Link to={'/Lee'}>Lee</Link></li>
  //           <li><Link to={'/UserList'}>UserList</Link></li>
  //           <li><Link to={'/login'}>login</Link></li>
  //           <li><Link to={'/user'} >
  //             User page
  //             {/* 底下是子路由,即嵌套路由 */}
  //             <ul>
  //               <li>
  //                 <Link to={'/user/list'}> user list</Link>
  //               </li>
  //               <li>
  //                 <Link to={'/user/detail'}> user detail</Link>
  //               </li>
  //             </ul>
  //           </Link></li>
  //         </ul>


  //         <Switch >

  //           <Route path={"/UserList"}><UserList /></Route>
  //           <Route path={"/Lee"}><Lee name={'东方不败'} age={12} /></Route>
  //           <Route path={'/user'}> <User /> </Route>
  //           <Route path={"/user/list"}><UserList /></Route>
  //           <Route path={'/user/detail'}><UserDetail /></Route>
  //         </Switch>
  //         <Route path={'/login'}> <Login /> </Route>
  //       </Router>
  //     </Fragment>
  //   )
  // }

  render(): React.ReactNode {
    //动态路由   inlineCollapsed={collapsed}
    return (
      <Fragment>
        <h1>什么情况</h1>
        <Router>
          <Suspense fallback={<>loading...</>}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ width: 256 }}
              mode="inline"
              theme="dark"
            >
              {
                router.map((r, i) => {
                  if (r.children) {
                    return (
                      <Menu.SubMenu key={r.key} icon={<SettingOutlined />} title={r.title}>
                        {
                          r.children.map((sr, si) => (
                            <Menu.Item key={sr.key}>
                              <Link to={sr.path}>{sr.title}</Link>
                            </Menu.Item>
                          ))
                        }

                      </Menu.SubMenu>
                    )

                  } else {
                    return (
                      <Menu.Item key={r.key} icon={<MailOutlined />}>
                        {r.title}
                        <Link to={r.path} >{r.title}</Link>
                      </Menu.Item>
                    )
                  }
                })
              }
            </Menu>
            {
              router.map((r, i) => {
                if (r.children) {
                  return (
               
                    <Switch key={`rer${r.key}`}>
                      {
                        r.children.map((sr, si) => (
                          <Route key={`str${sr.key}`} path={sr.path} exact={sr.exact === true}>
                            {sr.component}
                          </Route>
                        )

                        )
                      }
                    </Switch>
                

                  )

                } else {
                  return (
                    <Route key={`tr${r.key}`} path={r.path} exact={r.exact === true}>
                      {r.component}
                    </Route>
                  )
                }
              })
            }

          </Suspense>

        </Router>
      </Fragment>

    )
  }
}
export default App