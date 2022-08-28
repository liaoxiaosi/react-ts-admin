import React, { Component, Fragment, Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import { IRouter, router, unAuthRouter } from '../router/index2'
import AppLayout from './AppLayout';

class View extends Component {
    //由于二级菜单没有正确渲染，定义一个方法，动态生成router
    //进行递归动态生成router,返回的是reactNode
    generateRouter = (routerList?: IRouter[]): ReactNode => {
        return (
            <>
                {
                    routerList?.map(r => {
                        if (r.children) {
                            return (
                                <>
                                    {
                                        this.generateRouter(r.children)
                                    }
                                </>
                            )
                        } else {
                            return (
                                <Route path={r.path} exact={r.exact} key={r.key}>
                                    {r.component}
                                </Route>
                            )
                        }
                    })
                }
            </>
        )
    }

    render() {
        return (
            <Fragment>

                <Router>
                    <Suspense fallback={<>loading...</>}>
                        {/* 两个switch，如果匹配不到上面的，就匹配下面的 */}
                        <Switch>
                            {/* 如果匹配到 ‘/’ 重定向到DashBoard 页面 */}
                            <Route path={'/'} exact={true}>
                                <Redirect to={'/admin/DashBoard'} />
                            </Route>
                            <Route>
                                {/* 在此部分显示公共布局 */}
                                <AppLayout>
                                    <Suspense fallback={<>loading...</>}>

                                        {
                                            // router.map(r => (<Route path={r.path} exact={r.exact} key={r.key}>{r.component}</Route>))
                                            this.generateRouter(router)
                                        }

                                    </Suspense>
                                </AppLayout>
                            </Route>

                            <Switch>
                                {
                                    unAuthRouter.map(r => (<Route path={r.path} exact={r.exact} key={r.key}>{r.component}</Route>))
                                }
                            </Switch>
                        </Switch>
                    </Suspense>
                </Router>

            </Fragment>
        )
    }
}
export default View