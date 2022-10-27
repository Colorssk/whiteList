//往另一个列表里面塞数据
export const transAndRankList = (originArr = [], directionArr = [], dataIndex, directionIndex, type) => {
    let originArrTemp = JSON.parse(JSON.stringify(originArr));
    let directionArrTemp = JSON.parse(JSON.stringify(directionArr));
    const moveData = originArrTemp[dataIndex];
    // 删除移动源的数据
    originArrTemp.splice(dataIndex, 1);
    // 移动对象源添加数据
    if(directionIndex > directionArrTemp.length){
        directionArrTemp.push(moveData);
    }else{
        directionArrTemp.splice(directionIndex,0,moveData);
    }
    // left： 从右到左originArr: 右边 right： 从左边到右　返回的数据固定：［list(左边)， list(右边)］
    return type === 'left' ?  [directionArrTemp, originArrTemp] : [originArrTemp, directionArrTemp]
}

// 当前列表的数据排序
export const rankList = (arr, startIndex, toIndex)=>{
    const res = JSON.parse(JSON.stringify(arr))
    let toIndexTemp = toIndex
    if(toIndex > arr.length){
        toIndexTemp = arr.length
    }
    const temp = res[startIndex];
    res.splice(startIndex, 1);
    if (startIndex > toIndexTemp) {
        //往上添加
        res.splice(toIndexTemp, 0, temp)
    } else {
        res.splice(toIndexTemp - 1, 0, temp)
    }
    return res
}

// 交换选中状态
export const transSelectedList = (left,right, selectData)=>{
    let leftTemp = JSON.parse(JSON.stringify(left));
    let rightTemp = JSON.parse(JSON.stringify(right));
    const dataIndex = selectData.dataIndex
    if(leftTemp.indexOf(dataIndex)!==-1){
        leftTemp.splice(leftTemp.indexOf(dataIndex),1);
        rightTemp.push(dataIndex)
    }else if(rightTemp.indexOf(dataIndex)!==-1){
        rightTemp.splice(rightTemp.indexOf(dataIndex),1);
        leftTemp.push(dataIndex)
    }
    return [leftTemp, rightTemp]
}