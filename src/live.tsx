import {Component, Fragment, ReactNode} from 'react';

interface IState{
    counter:number
}
//挂载生命周期
// constructor => static getDerivedStateFromProps => render=>componentDidMount
//更新状态 生命周期:
// static getDerivedStateFromProps() => shouldComponentUpdate()=> render()==> getSnapshotBeforeUpdate()=> componentDidUpdate()
export default class Live extends Component<any,IState>{
    constructor(props:any,context:any){
        super(props,context)
        this.state = {
            counter:0
        }
        console.log('constructor---')

    }

    //让组件在 props 变化时更新 state。
     // 该方法返回一个对象用于更新 state，如果返回 null 则不更新任何内容。
    static getDerivedStateFromProps (props:any, state:IState){ 
       
        console.log('static getDerivedStateFromProps----- ',state.counter)
        // return {counter: props.counter }; //加入父组件传了这个值过来
        return {counter:1 }; //始终显示 counter: 1  counter值始终显示1
        // return null  //返回null 不更新任何内容
    }
    componentDidMount(){
        console.log('componentDidMount---')
    }
    // shouldComponentUpdate(nextProps, nextState)
    // 方法会返回一个布尔值，指定 React 是否应该继续渲染，
    // 默认值是 true， 即 state 每次发生变化组件都会重新渲染。
    // 的返回值用于判断 React 组件的输出是否受当前 state 或 props 更改的影响，
    // 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
    // 方法会返回一个布尔值: true继续更新页面, false不更新页面
    shouldComponentUpdate(nextProps:Readonly<any>,nextState:Readonly<IState>,nextContext:any):boolean{  //shouldComponentUpdate(nextProps, nextState)
        console.log('componentDidMount---')
        // return false;  //state改变,页面也不更新

        //值大于5的时候,页面更新
        return nextState.counter >=5  
    }

    add = ()=>{
        this.setState((state,props)=>({
            counter:state.counter + 1
        }))
    }
    render(): ReactNode {
        console.log('render---')
        return(
            <Fragment>
                <h1>生命周期</h1>
                <p>{this.state.counter}</p>
                <button onClick={this.add}>添加</button>
            </Fragment>
        )
    }
}