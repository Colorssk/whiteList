import React, { forwardRef, useImperativeHandle, useState } from 'react';
//components
import SModal from '@/components/Modal'
import SSelect from '@/components/Select'
import SInput from '@/components/Input';
import { Button } from 'ss-ui-library'
import { UInput } from '@/components/Unity'
//utils
import _ from 'lodash'
//style
import style from './index.module.less'
//asset
import {
    CheckOutlined
} from '@ant-design/icons';
import images from '@/assets/images'

const { Option } = SSelect
const { TextArea } = SInput;
//增加报价
const QuotationModalAdd = forwardRef((props, ref) => {
    const [modalVisble, setModalVisble] = useState(false);
    const [list, setList] = useState([])
    const [currentModalData, setCurrentModalData] = useState({});// 存储当前传进来的值
    const operateModal = (status = false, data = null) => {
        if (data) {
            status && setCurrentModalData(data)
        }
        setModalVisble(status);

    }
    useImperativeHandle(ref, () => ({
        operateModal
    }));
    const addFiveList = () => {
        // 暂定最多新增20条
        if (list.length < 20) {
            //新增5条数据
            const newData = new Array(5).fill(null).map(item => (
                { key: _.uniqueId('quotation_'), status: 1, bid: 0, calType: 0, clickStatus: false }
            ))
            const res = JSON.parse(JSON.stringify(list)).concat(newData)
            setList([].concat(res))
        }

    }
    //edit list item
    const onChangeListItem = (item, editKey, editValue) => {
        const { key: itemKey } = item
        let res = JSON.parse(JSON.stringify(list));
        res = res.map(data => {
            if (String(data.key) === String(itemKey)) {
                data[editKey] = editValue
            }
            return data
        })
        setList(res)
    }
    // edit input in list
    const changeInput = (e, type, item) => {
        const editValue = e.target.value;
        onChangeListItem(item, type === 0 ? 'bid' : 'calType', editValue)
    }
    // judge whether is all selected
    const judgeWetherSelectAll = () => {
        return list.length && list.filter(item => item.clickStatus).length === list.length;
    }
    //点击全选标志
    const onClickAll = () => {
        let res = JSON.parse(JSON.stringify(list))
        if (judgeWetherSelectAll()) {
            //have selected all
            res.map(item => {
                item.clickStatus = false
                return item
            })
        } else {
            res.map(item => {
                item.clickStatus = true
                return item
            })
        }
        setList(res)
    }
    // 是否有选中
    const hasSelected = ()=>{
        return !!list.filter(item=>item.clickStatus).length
    }
    return (
        <>
            <SModal
                title={currentModalData.label || ''}
                width={currentModalData.width || '500px'}
                maskNotUse={true}
                mask={false}
                maskClosable={false}
                visible={modalVisble}
                buttonCenter={currentModalData.buttonCenter}
                onOk={() => { operateModal() }}
                onCancel={() => { operateModal() }}>
                <div className={style.addModalContainer}>
                    <div className={style.leftContainer}>
                        <div className={style.modalLineBlock}>
                            债券简称&nbsp;<span className={style.modalInfoStyle}>19华电SXP6</span>
                        </div>
                        <div className={style.modalLineBlock}>
                            债券期限&nbsp;<span className={style.modalInfoStyle}>30D</span>
                        </div>
                        <div className={`${style.modalLineBlock} ${style.selectContainer}`}>
                            <div className={style.modalSelectLabel}>投资经理</div>
                            <div className={style.modalSelectContainer}>
                                <SSelect style={{ width: '100%', height: '24px' }} defaultValue="tom" placeholder="请选择"
                                    optionFilterProp="children">
                                    <Option value="jack">张三</Option>
                                    <Option value="lucy">李四</Option>
                                    <Option value="tom">罗翔</Option>
                                </SSelect>
                            </div>
                        </div>
                        <div className={style.modalLineBlock}>
                            本次发行&nbsp;<span className={style.modalInfoStyle}>亿</span>
                        </div>
                        <div className={style.modalLineBlock}>
                            可投比例(%)&nbsp;<span className={style.modalInfoStyle}>10</span>
                        </div>
                        <div className={style.noteContainer}>
                            <div className={style.noteTitle}>
                                备注信息
                            </div>
                            <div className={style.textAreaContainer}>
                                <TextArea placeholder="请输入内容" maxLength={200} autoSize={{ minRows: 14, maxRows: 14 }} />
                            </div>
                        </div>
                    </div>
                    {/* 右侧操作 */}
                    <div className={style.addrightCOntainer}>
                        <div className={style.actionContainer}>
                            <Button type="primary" basic onClick={addFiveList}>新增5条</Button>
                        </div>
                        <div className={style.headerContainer}>
                            <div className={`${style.checkBoxContainer} ${judgeWetherSelectAll() && style.checkBoxContainerActive}`} onClick={onClickAll}>
                                {judgeWetherSelectAll() ? <CheckOutlined /> : ( hasSelected()?  <div className={style.hasSelectedContain}></div> : <></>)}
                            </div>
                            <div className={`${style.coumpContainer} ${style.coumpContainerSplit}`}>
                                标位(%)
                            </div>
                            <div className={style.calculateContainer}>
                                计算方式
                            </div>
                        </div>
                        <div className={style.actionTableContainer}>
                            {
                                list.map((item) => (
                                    <div key={item.key} className={style.lineContainer}>
                                        <div className={`${style.checkBoxContainer} ${item.clickStatus && style.checkBoxContainerActive}`} onClick={() => { onChangeListItem(item, 'clickStatus', item.clickStatus ? false : true) }}>
                                            {item.clickStatus ? <CheckOutlined /> : <></>}
                                        </div>
                                        <div className={style.coumpContainer}>
                                            <UInput value={item.bid} onChange={(e) => { changeInput(e, 0, item) }} style={{ width: '80px', height: '24px' }} />
                                        </div>
                                        <div className={style.calculateContainer}>
                                            <div className={style.unitContainer} onClick={() => { onChangeListItem(item, 'status', item.status === 1 ? 2 : 1) }}>
                                                {item.status === 1 ? '%' : '万'}
                                                <img className={style.unitIcon} src={images.triangle} alt="计算方式小下标 暗主题"></img>
                                            </div>
                                            <UInput onChange={(e) => { changeInput(e, 1, item) }} value={item.calType} style={{ width: '80px', height: '24px' }} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </SModal>
        </>
    )
})

export default QuotationModalAdd