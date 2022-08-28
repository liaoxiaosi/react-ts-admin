//定义hook的文件

//切割数组，变成二维数组 参数：
// pageSize:每个数组多少条
// array
export function useSliceArray<T>(pageSize:number,arr:T[]){ 

    //切割数组，没十条作为一个数组存进去
    let newArr = []
    for(let i=0;i<arr.length;i+=pageSize){  //循环，每循环一次，i+=pageSize ,那就是，每pageSize个数被循环一次
        // console.log(i)
        let list:any =  arr.slice(i,i+pageSize)//0-9 10-19 没10个为一组 
        newArr.push(list)
    }
    console.log('newArr',newArr)
    return newArr
                                              

}

export default{
    useSliceArray
}