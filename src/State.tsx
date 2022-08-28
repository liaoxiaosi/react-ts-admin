import {Component, Fragment} from 'react';

interface IState{
  counter:number
}
// state:是一个组件的状态,要更新组件,就要更新state
//如果要更新界面,就更新状态 :state
 //<any,any> 这两个参数,作为组件很重要
export default class State extends Component<any,IState>{   //第一个是props属性,第二个参数是状态
    //定义数据有两种方式,一个是在constructor中定义,一种是直接定义
    // state:IState={ 
    //   counter:0
    // } 
  constructor(props:any,context:any){//推荐这种写法
    super(props,context)
      //只能在这里使用 state
      this.state = {
        counter:0
      }
    
  }
  //让计数器跑起来
  componentDidMount(){  //在此发送ajax请求异步获取数据
    // setInterval(()=>{
    //    //更新状态 this.setState更新是异步的
    //   //  this.setState({massages})

    //   //下列这种写法是异步的,多次更新会将结果合并
    //   // this.setState({  
    //   //   counter:this.state.counter + 1
    //   // })


     
    // },100)
     //验证setState是异步的
      //state的改变会合并,所以要避免
      // for(let i =0 ;i<100;i++){
      //   console.log('???',i)
      //   //下列结果是1 错误写法
      //   // this.setState({
      //   //   counter:this.state.counter + 1
      //   // })

      //   //下列结果是正确写法,100
      //   this.setState((state,props)=>({
      //     counter:state.counter + 1
      //   }))
      // }

  }

    render(): React.ReactNode {
      return(
        <Fragment>
            <h1>我是State 组件</h1>
            <p>count:{this.state.counter}</p>
        </Fragment>
      )
    }
  }




