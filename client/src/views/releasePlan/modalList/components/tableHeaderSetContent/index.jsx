/* eslint-disable no-unused-vars */
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
//style
import style from './index.module.less';
//config
import { initListNone, initList } from './config'
//components
import { message } from 'antd';
//utils
import { rankList, transAndRankList, transSelectedList } from './util'

const TableHeaderSetContent = forwardRef((props, ref) => {
    const lineHeight = 24
    const [dragStatus, setDragStatus] = useState({
        dragging: false, // 是否开始拖`动`
        draggingIndex: -1, // 拖动元素的下标
        startPageY: 0, // 开始拖动的 Y 轴坐标
        startPageX: 0, // 开始拖动的 X 轴坐标
        offsetPageY: 0, // 拖动元素的位移
        offsetPageX: 0, // 拖动元素的位移
        directionIndex: -1, // 目标对象索引
        type: 'right',// 移动类型，移动过程会改动
        typeStatic: 'right',// 移动类型，移动过程不会变动
        isMoveingBig: false,// 是否真正移动
        movingToal: 0, //总移动距离
        startClientY: 0,// 初始clientY
    })
    const [selectObj, setSelectObj] = useState({ item: null, type: null })
    // 列表
    const [lineList, setLineList] = useState(initList) // right
    const [lineListNone, setLineListNone] = useState(initListNone) //left
    const [selectItemsLeft, setSelectItemsLeft] = useState([]);
    const [selectItemsRight, setSelectItemsRight] = useState([]);
    //选中标签添加选中数列
    const onSelectItem = ({ item, type }) => {
        let resolveData = type === 'left' ? JSON.parse(JSON.stringify(selectItemsLeft)) : JSON.parse(JSON.stringify(selectItemsRight));
        const hasItemIndex = resolveData.findIndex(el => String(el) === String(item.dataIndex));
        if (hasItemIndex === -1) {
            // only push dataIndex
            type === 'left' ? setSelectItemsLeft(resolveData.concat([item.dataIndex])) : setSelectItemsRight(resolveData.concat([item.dataIndex]))
        } else {
            resolveData.splice(hasItemIndex, 1)
            type === 'left' ? setSelectItemsLeft(resolveData) : setSelectItemsRight(resolveData)
        }
    }
    // 回调的数据
    useImperativeHandle(ref, () => ({
        res: {data: lineList}
    }));
    // 点击的时候记录 X Y 轴的位置 
    const dragging = (e, index, item, type) => {
        setSelectObj({ item, type })
        setDragStatus({
            ...dragStatus,
            dragging: true,
            draggingIndex: index,
            startPageY: e.pageY,
            startPageX: e.pageX,
            offsetPageY: 0,
            offsetPageX: 0,
            startClientY: e.clientY,
            type,
            typeStatic: type,
            movingToal: 0,// 总移动距离
        })
    }
    //change rank
    const move = (startIndex, toIndex) => {
        let arr = dragStatus.type === 'left' ? lineListNone : lineList
        // 如果是自己移动排序
        if (dragStatus.type === dragStatus.typeStatic) {
            arr = rankList(arr, startIndex, toIndex)
            dragStatus.type === 'left' ? setLineListNone(arr) : setLineList(arr)
        } else {
            // type 是left 就是从右到左 否则是从左到右 arr [originArr, directionArr]
            const arrParam = dragStatus.type === 'left' ? [JSON.parse(JSON.stringify(lineList)), JSON.parse(JSON.stringify(lineListNone))] : [JSON.parse(JSON.stringify(lineListNone)), JSON.parse(JSON.stringify(lineList))]
            const [leftArr, rightArr] = transAndRankList(arrParam[0], arrParam[1], startIndex, toIndex, dragStatus.type);
            // 左右交换需要交换选中状态 此时一定发生了交换
            const [selectLeft, selectRight] = transSelectedList(selectItemsLeft, selectItemsRight, selectObj.item);
            setLineListNone(leftArr);
            setSelectItemsLeft(selectLeft);
            setTimeout(() => {
                setLineList(rightArr)
            }, 0)
            setTimeout(() => {
                setSelectItemsRight(selectRight);
            }, 0);
            // 如果是拖拽到了另一个模块
            console.log('到了另一个模块', startIndex, toIndex);
        }
        return arr;
    }
    // 移动的轨迹
    const onMouseMove = (e) => {
        let offsetYTemp = e.pageY - dragStatus.startPageY
        let offsetXTemp = e.pageX - dragStatus.startPageX
        let offsetX = 0;
        let modalDom = document.getElementsByClassName('ant-modal')[0];
        let containerDom = document.getElementById('rightContainer');
        console.log('containerDomTop', containerDom.offsetTop)
        console.log('dom.clientTop', modalDom.offsetTop)
        const totalExtraHeight = containerDom.offsetTop + modalDom.offsetTop
        // 有优化条件
        // 限制X轴移动范围
        if (dragStatus.typeStatic === 'right') {
            if (offsetXTemp <= 0 && offsetXTemp >= -214) {
                offsetX = offsetXTemp
            } else {
                if (offsetXTemp > 0) {
                    offsetX = 0
                } else {
                    offsetX = -214
                }

            }
        } else {
            if (offsetXTemp >= 0 && offsetXTemp <= 214) {
                offsetX = offsetXTemp
            } else {
                if (offsetXTemp < 0) {
                    offsetX = 0
                } else {
                    offsetX = 214
                }
            }
        }
        let offsetY = offsetYTemp
        const draggingIndex = dragStatus.draggingIndex
        let directionIndex = -1
        // 当前的实时状态
        let typeTemp = (dragStatus.typeStatic === 'right' && offsetX < -140) ? 'left' : (dragStatus.typeStatic === 'left' && offsetX > 140) ? 'right' : dragStatus.typeStatic;
        const directionIndexTemp = Math.round((e.clientY - totalExtraHeight) / 24)
        //计算放置的索引
        directionIndex = directionIndexTemp < 0 ? 0 : (e.clientY > dragStatus.startClientY ? directionIndexTemp + (typeTemp===dragStatus.typeStatic ? 1 : 0) : directionIndexTemp)
        const currentListLength = lineList.length > lineListNone.length ? lineList.length : lineListNone.length;
        //限定可移动范围(x,y)
        if (directionIndex >= 0 && directionIndexTemp>=0  && directionIndex <= currentListLength) {
            setDragStatus({
                ...dragStatus,
                directionIndex,
                offsetPageY: offsetY,
                offsetPageX: offsetX,
                movingToal: dragStatus.movingToal + Math.abs(offsetY),
                isMoveingBig: offsetY <= -18 || offsetY >= 18,
                type: typeTemp,
            })
        }
    }
    // 松开鼠标的时候，重新初始化 startPageY、draggingIndex,

    const onMouseUp = (e) => {
        if (dragStatus.directionIndex !== -1 && (dragStatus.draggingIndex !== dragStatus.directionIndex || dragStatus.type !== dragStatus.typeStatic)) {
            move(dragStatus.draggingIndex, dragStatus.directionIndex)
        } else {
            //没有过多移动，认定是点击事件
            onSelectItem(selectObj);
        }
        setDragStatus({
            ...dragStatus,
            dragging: false,// 移除遮罩
            startPageY: 0,
            startPageX: 0,
            draggingIndex: -1,
            directionIndex: -1,
            isMoveingBig: false,
            movingToal: 0,
            startClientY: 0,
        })
    }
    const lineBlockClassName = (item, index, data, type) => {
        // directionLineHeight: 移动插入对象的下影线  lineBlockactive: 选中效果 lineBlockMoving: 移动的选中效果
        return `
            ${style.lineBlcok} 
            ${(type === dragStatus.typeStatic && dragStatus.draggingIndex === index && dragStatus.dragging) ? style.lineBlockMoving : ''}
            ${[].concat([...selectItemsLeft, ...selectItemsRight]).some(data => String(data) === String(item.dataIndex)) ? style.lineBlockactive : ''}
            ${(type === dragStatus.type && dragStatus.directionIndex === index + 1) ? style.directionLineHeight : ''}
        `
    }
    // 移动动画
    const getDraggingStyle = (index, type) => {
        if (index !== dragStatus.draggingIndex) {
            return
        }
        return {
            position: ((dragStatus.isMoveingBig && dragStatus.dragging) || (dragStatus.movingToal > 24)) ? 'absolute' : 'relative',
            width: '166px',
            transform: `translate(${dragStatus.offsetPageX}px,${dragStatus.offsetPageY}px)`,
            opacity: 0.6,
        }
    }
    // unite line
    const listRender = ({ data, type }) => {
        return data.map((item, index) => {
            return <div key={index} style={dragStatus.typeStatic === type ? getDraggingStyle(index, type) : {}}
                onMouseDown={(e) => dragging(e, index, item, type)} className={lineBlockClassName(item, index, data, type)}>{item.title}</div>
        })
    }
    // 交替数据
    const onTrans = (type) => {
        //至少留一列
        if (lineList.length === selectItemsRight.length) {
            return message.info('请至少展示一个列表')
        }
        let rightListTemp = JSON.parse(JSON.stringify(type === 'toLeft' ? lineList : lineListNone));
        let directionRes = []
        for (var i = rightListTemp.length - 1; i >= 0; i--) {
            let value = rightListTemp[i];
            const searchOrigin = type === 'toLeft' ? selectItemsRight : selectItemsLeft;
            if (searchOrigin.some(dataIndex => String(dataIndex) === String(value.dataIndex))) {
                directionRes.push(value)
                rightListTemp.splice(i, 1);
            }
        }
        if (type === 'toLeft') {
            setLineListNone([...lineListNone, ...directionRes])
            setLineList(rightListTemp)
            setSelectItemsRight([])
        } else {
            setLineList([...lineList, ...directionRes])
            setLineListNone(rightListTemp)
            setSelectItemsLeft([])
        }
    }
    const maskStyle = {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgorund: 'rgba(0,0,0,0.5)'
    }
    return (
        <div id="headerMenuContentContainer" className={style.headerMenuContentContainer}>
            <div className={style.headerConrtainer}>
                <div className={style.topRightInfo}>
                    可拖拽移动并排序
                </div>
                <div className={style.containerTitleHeader}>
                    <div className={style.titleInfo}>
                        未选表头&nbsp;<span>{lineListNone.length}</span>
                    </div>
                    <div className={style.titleInfo}>
                        已选表头/顺序&nbsp;<span>{lineList.length}</span>
                    </div>
                </div>
            </div>
            <div className={style.bodyContainer}>
                <div className={style.leftContainer}>
                    {listRender({ data: lineListNone, type: 'left' })}
                </div>
                <div className={style.actionButtonContainer}>
                    <div style={{ cursor: 'pointer' }} onClick={() => { onTrans('toLeft') }}>
                        {'\u003C'}
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => { onTrans('toRight') }}>
                        {'\u003E'}
                    </div>
                </div>
                <div id='rightContainer' className={style.rightContainer}>
                    {listRender({ data: lineList, type: 'right' })}
                    {/* 用一个遮罩监听事件，也可以监听整个 document */}
                    {
                        dragStatus.dragging && (
                            <div
                                style={maskStyle}
                                onMouseUp={e => onMouseUp(e)}
                                onMouseMove={e => onMouseMove(e)}
                            >
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
})
export default TableHeaderSetContent