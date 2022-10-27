/* eslint-disable no-unused-vars */
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
//components
import SModal from '@/components/Modal'
import SSelect from '@/components/Select'
import { UInput } from '@/components/Unity'
//config
import { leftLalbel } from './config'
//style
import style from './index.module.less'

//编辑报价
const QuotationModalEdit = forwardRef((props, ref) => {
    const { Option } = SSelect;
    const [currentModalData, setCurrentModalData] = useState({})
    const [labelList, setLabelList] = useState([])
    const [modalVisble, setModalVisble] = useState(false)
    const operateModal = (status = false, data = null) => {
        if (data) {
            status && setCurrentModalData(data)
        }
        setModalVisble(status);

    }
    // initData
    useEffect(() => {
        setLabelList(leftLalbel(['19华电SXP6', '30D', '123134', '10']))
    }, [])
    useImperativeHandle(ref, () => ({
        operateModal
    }));
    // render left label
    const renderLeftLabel = () => {
        return labelList.map((item, index) => {
            return (
                <div key={index} className={style.lineBlock}>
                    {item.label}<span>&nbsp;&nbsp;{item.value}</span>
                </div>
            )
        })
    }
    // 右边列表渲染
    const renderRightAction = () => {
        return (
            <>
                <div className={style.lineBlcok}>
                    <div className={style.labelLeft}>
                        投资经理
                    </div>
                    <div className={style.actionRight}>
                        <SSelect style={{ width: '100%', height: '24px' }} placeholder="请选择"
                            optionFilterProp="children">
                            <Option value="jack">张三</Option>
                            <Option value="lucy">李四</Option>
                            <Option value="tom">罗翔</Option>
                        </SSelect>
                    </div>
                </div>
                <div className={style.lineBlcok}>
                    <div className={style.labelLeft}>
                        标位(%)
                    </div>
                    <div className={style.actionRight}>
                        <UInput></UInput>
                    </div>
                </div>
                <div className={`${style.lineBlcok} ${style.lastLineBlock}`}>
                    <div className={style.labelLeft}>
                        万
                    </div>
                    <div className={style.actionRight}>
                        <UInput></UInput>
                    </div>
                </div>
            </>

        )
    }
    return (
        <SModal
            title={currentModalData.label || ''}
            width={currentModalData.width || '500px'}
            maskNotUse={true}
            mask={false}
            maskClosable={false}
            visible={modalVisble}
            onOk={() => { operateModal() }}
            onCancel={() => { operateModal() }}>
            <div className={style.editContent}>
                <div className={style.titleContainer}>
                    已确认
                </div>
                <div className={style.bodyContainer}>
                    <div className={style.leftContainer}>
                        {renderLeftLabel()}
                    </div>
                    <div className={style.rightContainer}>
                        {renderRightAction()}
                    </div>
                </div>
            </div>
        </SModal>
    )
})

export default QuotationModalEdit