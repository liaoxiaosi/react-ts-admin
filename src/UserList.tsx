import {Component, Fragment, ReactNode} from 'react';
import { Button,Table,Space,message } from 'antd';

// 引入业务组件
import DeleteUser from './DeleteUser'
import EditUser from './EditUser'
import AddUser from './components/AddUser';

import {useSliceArray} from './hook/hooks'

interface IUser{
    id:number
    name:string
}

interface IColumns{
    title:string
    dataIndex:string
    key:string
}
interface IState{
    // userList:[IUser][],
    userList:[IUser][]
    allList:IUser[]
    columns:IColumns[]
    visible:boolean
    user?:IUser
    total:number 
    current:number 
    pagesize:number

    showAddUserModal:boolean
}
export default class UserList extends Component<any,IState>{
    constructor(props:any,context:any){
        super(props,context)
        // let userList:IUser[]=[]
        // for(let i=1;i<20;i++){
        //     userList.push({
        //         id:i,
        //         name:'user'+i
        //     })
        // }

        const columns = [
            {
              title: 'id',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
                title:'操作',
                dataIndex:'delete',
                key:'delete',
                // render: () => <a>删除</a>,
                render: () => <a>删除</a>,
            }
            // {
            //   title: '住址',
            //   dataIndex: 'address',
            //   key: 'address',
            // },
          ];
          
        this.state = {
            userList:[], //被切割后的数组 二维数组
            allList:[], //作为原数据
            columns:columns,
            visible:false,
            total:0, 
            current:1, 
            pagesize:5,
            showAddUserModal:false
        }
        

        console.log('???啥情况')

    }
    componentDidMount(){
        //挂载完，获取数据,此处使用假数据
        this.getList(10)
        
    }
    //获取数据
    getList = (page:number)=>{
        //此处，前端实现分页效果，所以，定义20条假数据，需要将数组进行分割
        //需要两个数组，一个是原数组，用于进行搜索
        //一个是分割的数组，二维数组[[],[],[],[],[]]
        let userList:any = []
        for(let i=1;i<20;i++){
            userList.push({
                id:i,
                name:'user'+i
            })
        }
        const total = userList.length  //总条数
        const selectList = useSliceArray(this.state.pagesize,userList)  //切割好的数组
        // console.log('selectList',selectList)
        this.setState((state)=>({
            total:total,
            userList:selectList,
            allList:userList
        }))

    }
    //写一个hook对数据进行处理，想多少条数据作为一页，就多少条，进行传值 useSpliceArray


    //需求:实现删除功能,将业务逻辑进行拆分,定义一个删除的组件 DeleteUser.tsx
    //在这里进行删除
    //deleteUser在 DeleteUser.tsx组件中定义的回调,可以拿到 DeleteUser.tsx 组件在回调中传回来的id
    //所以可以直接拿到id
    deleteUser=(id:number)=>{
        // console.log('拿到当前要删除的id',id)
        // let arr = this.state.userList
        // let newArr = arr.filter(item=>item.id!=id)
        // this.setState((state)=>({
        //     userList:newArr
        // }))
        // this.setState((state)=>({
        //     userList:state.userList.filter(item=>item.id!=id)
        // }),()=>{
        //     console.log('这是更新后回调',this.state)
        //     //在此模拟,删除成功后,调用提示
        //     message.success('删除成功')
        // })
        //二维数组的写法
        let  change:any = this.state.userList[this.state.current-1].filter(item=>item.id!=id)
        // console.log('???删除的数组部分',change)
     
        let userList:any =this.state.userList.splice(this.state.current-1,1)  //将操作数组的部分删掉
        // 在指定位置插入修改的数据
        userList.splice(this.state.current-1,0,change)
        this.setState((state)=>({
            allList:state.allList.filter(item=>item.id!=id),
            userList:userList
        }),()=>{
            console.log('这是更新后回调',this.state)
            //在此模拟,删除成功后,调用提示
            message.success('删除成功')
        })
    }
   
    //显示弹窗
    show=(visible:boolean,user?:IUser)=>{
        //目前代码有坑：点击添加的时候，name输入框获取了上一次的数据
        console.log('user---',user)
        //因为当前编辑用户,是要经过父级组件传值给子组件,所以,user需要存值
        //要更新列表
        // this.setState({
        //     visible:visible,
        //     user:user,
        //     userList:this.state.userList.map(item=>{
        //         if(item.id===user?.id){
        //             return user
        //         }else{
        //             return item
        //         }
        //     })
        // })
        //安全写法
        // this.setState((state,props)=>({
        //     visible:visible,
        //     user:user,
        //     userList:state.userList.map(item=>{
        //         if(item.id===user?.id){
        //             return user
        //         }else{
        //             return item
        //         }
        //     })
        //  }))
        //使用二维数组的写法
        // console.log('-------',this.state.current )
       /**
        * 思路：
        *    1.新增的情况 ：在原数组第一个位置插入数据，重新splice即可
        *    2。编辑的情况
        * 
        * */ 
        let list =this.state.userList
            let data = list[this.state.current - 1].map(item=>{
                if(item.id===user?.id){
                    return user
                }else{
                    return item
                }
            }) 
            let userList:any =this.state.userList.splice(this.state.current-1,1)  //将操作数组的部分删掉
            // 在指定位置插入修改的数据
            userList.splice(this.state.current-1,0,data) 
            console.log('改成功了嘛',data) 
    
         
           
         
            this.setState((state,props)=>({
                visible:visible,
                user:user,
                userList:userList,
                allList:state.allList.map(item=>{
                    if(item.id===user?.id){
                        return user
                    }else{
                        return item
                    }
                })
             }))
    //   if(user){
    //       let flag=this.state.allList.find(item=>item.id === user.id)!=undefined?true:false
    //       if(flag){
           

    //       }else{
    //         //插入到列表 首位
    //         let list = this.state.allList
    //         list.unshift(user)
    //         //切割数组
       
    //         const selectList = useSliceArray(this.state.pagesize,list)  //切割好的数组

    //         this.setState((state,props)=>({
    //             visible:visible,
    //             allList:list,
    //             userList:selectList
    //         }))
    //       }
       
    //   }else{
    //       console.log('????')
    //       //关闭弹窗，或者是点击添加按钮显示弹窗时，应该将user清空
    //     this.setState((state,props)=>({
    //         visible:visible,
    //         user:undefined
    //     }))
    //   }
       
    }
    //分页
    onchange=(page:number)=>{
        console.log('???page',page)
        this.setState((state)=>({
            current:page,
            
        }))
    }
    //添加用户 点击显示弹窗
    showAddUserModal=(visible:boolean)=>{
        this.setState({showAddUserModal:true})
    }
    //写一个回调去控制隐藏子组件，子组件
    hideAddUserModal = ()=>{
        this.setState({
            showAddUserModal:false
        })
    }
    render(): ReactNode {
        // console.log('当前页码',this.state.current)
        // console.log('s数据啊==0',this.state.userList[0])
        // console.log('s数据啊---1',this.state.userList[1])
        // console.log('s数据啊',this.state.userList[this.state.current - 1])
        // console.log('s数据啊',this.state.userList)
        return(
            <Fragment>
                {/* 添加弹窗组件 */}
                <AddUser visible={this.state.showAddUserModal} callback={this.hideAddUserModal} />
                {/* 编辑弹窗组件 */}
                <EditUser  visible={this.state.visible} user={this.state.user} callback={this.show}/>
                {/* <Button type='primary' onClick={()=>{
                                   this.show(true)
                               }} >添加用户</Button> */}
                <Button type='primary' onClick={()=>{
                    this.showAddUserModal(true)
                }} >添加用户</Button>
                <Table 
                    dataSource = {this.state.userList[this.state.current-1]} 
                    rowKey = 'id'
                    pagination={{
                        position:['bottomCenter'],
                        total:this.state.total,
                        hideOnSinglePage:true,
                        defaultCurrent:this.state.current,
                        defaultPageSize:this.state.pagesize,
                        showSizeChanger:false,
                        onChange:this.onchange
                    }}
                    // columns={this.state.columns}
                > 
                    <Table.Column
                        title='Id'
                        dataIndex={'id'}/>
                    <Table.Column
                        title='用户名'
                        dataIndex={'name'}/>
                    <Table.Column
                        title='操作'
                       render={(user:IUser)=>(
                           <Space>
                               <Button type='primary' onClick={()=>{
                                   this.show(true,user)
                               }}>编辑</Button>
                               <DeleteUser id={user.id} callback={this.deleteUser}/>
                               {/* <Button type='primary' danger>删除</Button> */}
                           </Space>
                       )}/>
                </Table>
            </Fragment>
        )
    }



}



