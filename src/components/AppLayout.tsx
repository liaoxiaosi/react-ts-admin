import { Component, Fragment, ReactNode } from 'react';
import { Breadcrumb, Menu, Layout } from 'antd';


import LeftBar from './LeftBar';
import BreadCrumbs from './breadCrumbs';

const { Header, Content, Sider } = Layout;



//用户详情列表
// interface IProps{
//     id:number  //一般传id给后台就可以删除
//     callback:(id:number) => void  //一个回调传回给父组件,父组件去实现调用接口,传id 在callback中实现业务逻辑

// }
export default class AppLayout extends Component<any, any>{  //IProps 父组件传的数据

    render(): ReactNode {
        return (
            <Fragment>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={[]} />
                    </Header>
                    <Layout>
                        {/* <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                items={[]}
                            />
                        </Sider> */}
                        {/* 侧边栏 */}
                        <LeftBar />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb> */}
                            <BreadCrumbs />
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
}



