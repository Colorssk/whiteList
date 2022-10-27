import React, { useState, forwardRef, useImperativeHandle, useRef} from 'react';
import SModal from '@/components/Modal'
//components
import { UInput } from '@/components/Unity'
import BondModalContent from './components/bondModalContent'
import TimeInput from '@/common/TimeInput'
import TableHeaderSetContent from './components/tableHeaderSetContent'
//style
import style from './index.module.less';

const ModalList = forwardRef((props, ref) => {
    const [modalVisble, setModalVisble] = useState(false);
    const contentRef = useRef({
        current0: useRef(null),// 配置项找config中的key值
        current1: useRef(null),
        current2: useRef(null),
        current3: useRef(null),
        current4: useRef(null),
    })
    const [currentModalMenu, setCurrentModalMenu] = useState(0);// 当前显示的modal key值
    // 选中显示或者取消显示
    const operateModal = (menu, status = false) => {
        const { key: type } = menu;
        //选择显示哪一个menu内容
        status && setCurrentModalMenu(menu)
        if (type || type === 0) {
            setModalVisble(status);
        }
    }
    // 确定回车事件
    const operateOk = (menu)=>{
        props.onOk && props.onOk({menu, data: contentRef.current.current4.current.res.data, callBack: ()=>{operateModal(menu, false);}})
    }
    useImperativeHandle(ref, () => ({
        operateModal
    }));
    // 截标时间内容渲染
    const deadLineRender = () => {
        return (
            <div className={style.inputContent}>
               <TimeInput></TimeInput>
            </div>
        )
    }
    // 设置可投比例
    const bidValid = () => {
        return (
            <div className={style.bidValidContainer}>
                <UInput></UInput>%
            </div>
        )
    }
    // 输入实际发行量
    const releaseVolumn = () => {
        return (
            <div className={style.releaseVolumn}>
                <UInput></UInput>%
            </div>
        )
    }
    // 修改债券信息
    const editBond = () => { 
        return (
            <BondModalContent></BondModalContent>
        )
    }
    // 头部表格设置
    const editTableHeader = () => {
        // 回调交给内容区域执行
        return (
            <TableHeaderSetContent ref={contentRef.current.current4}></TableHeaderSetContent>
        )
    }
    const switchRender = () => {
        return { 0: deadLineRender(), 1: bidValid(), 2: releaseVolumn(), 3: editBond(), 4:  editTableHeader()}[currentModalMenu.key]
    }
    return (
        <>
            <SModal
                title={currentModalMenu.label}
                width={currentModalMenu.width || '500px'}
                maskNotUse={true}
                mask={false}
                maskClosable={false}
                visible={modalVisble}
                buttonCenter={currentModalMenu.buttonCenter}
                onOk={() => { operateOk(currentModalMenu) }}
                onCancel={() => { operateModal(currentModalMenu) }}>
                {switchRender(currentModalMenu)}
            </SModal>
        </>
    )
})

export default ModalList