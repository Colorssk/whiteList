/* eslint-disable no-unused-vars */
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
//components
import SModal from '@/components/Modal'
import SSelect from '@/components/Select'
import { Button } from 'ss-ui-library'
import { UInput } from '@/components/Unity'
import SInput from '@/components/Input';
import TimeInput from '@/common/TimeInput'
//style
import style from './index.module.less'
//assets
import images from '@/assets/images'

//边际识别
const AnalyzeModal = forwardRef((props, ref) => {
    const { TextArea } = SInput;
    const { Option } = SSelect;
    const [currentModalData, setCurrentModalData] = useState({})
    const [labelList, setLabelList] = useState([])
    const [modalVisble, setModalVisble] = useState(false)
    const [feedBackDeadLineTimeList, setFeedBackDeadLineTimeList] = useState([0, 0]);// 反馈截标时间变量 list
    const [deadLine, setDeadLine] = useState([0, 0]);// 截标时间变量 list
    const operateModal = (status = false, data = null) => {
        if (data) {
            status && setCurrentModalData(data)
        }
        setModalVisble(status);
    }
    useImperativeHandle(ref, () => ({
        operateModal
    }));
    // 识别操作
    const onRecognize = () => {

    }
    // 修改反馈截标时间或者截标时间 list 是数组,分别代表左右两个输入框的值
    const changeTimeInput = (list, type) => {
        type === 'feedBackDeadLine' ? setFeedBackDeadLineTimeList(list) : setDeadLine(list)

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
            <div className={style.analyzeContent}>
                <div className={style.textAreaContainer}>
                    智能填写
                </div>
                <div className={style.textaAreaContainer}>
                    <TextArea placeholder="请输入内容" autoSize={{ minRows: 5, maxRows: 5 }} maxLength={100} />
                    <img className={style.deletePng} src={images.deleteLogo} alt="" />
                </div>
                <div className={style.buttonContainer}>
                    <Button type="primary" basic onClick={onRecognize}>识别</Button>
                </div>
                <div className={style.recognizeContainer}>
                    <div className={style.title}>
                        识别结果
                    </div>
                    <div className={style.lineBlock}>
                        <div className={style.block}>
                            <div className={style.label}>
                                当前边际(%)
                            </div>
                            <div className={style.action}>
                                <UInput></UInput>
                            </div>
                        </div>
                        <div className={style.block}>
                            <div className={style.label}>
                                全场倍数
                            </div>
                            <div className={style.action}>
                                <UInput></UInput>
                            </div>
                        </div>
                        <div className={style.block}>
                            <div className={style.label}>
                                边际倍数
                            </div>
                            <div className={style.action}>
                                <UInput></UInput>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.lineBlock} ${style.marginTop}`}>
                        <div className={style.blockSpliteOne}>
                            <div className={style.label}>
                                反馈截标时间
                            </div>
                            <div className={style.actionContainer}>
                                <TimeInput value={feedBackDeadLineTimeList} onChange={(list) => { changeTimeInput(list, 'feedBackDeadLine') }}></TimeInput>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.lineBlock} ${style.marginTopLittle}`}>
                        <div className={style.blockSpliteOne}>
                            <div className={style.label}>
                                截标时间
                            </div>
                            <div className={style.actionContainer}>
                                <TimeInput value={deadLine} onChange={(list) => { changeTimeInput(list, 'deadLine') }}></TimeInput>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.lineBlock} ${style.marginTop}`}>
                        <div className={style.blockSpliteOne}>
                            <div className={style.label}>
                                发行人预测
                            </div>
                            <div className={style.actionContainer}>
                                <UInput></UInput>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.lineBlock} ${style.marginTopLittle}`}>
                        <div className={style.blockSpliteOne}>
                            <div className={style.label}>
                                小区(%)
                            </div>
                            <div className={style.actionContainer}>
                                <div className={style.halfInput}>
                                    <UInput></UInput>
                                </div>
                                <div className={style.split}>-</div>
                                <div className={style.halfInput}>
                                    <UInput></UInput>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SModal>
    )
})

export default AnalyzeModal