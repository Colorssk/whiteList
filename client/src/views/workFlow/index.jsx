import React, { useState, useRef, useEffect } from 'react';
// import { CSSTransition, TransitionGroup } from "react-transition-group";
//components
import Flow from './flow';
import { Button } from 'ss-ui-library'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
//style
import style from './index.module.less'
//config
import { workFlowData } from './config'
const WorkFlow = props => {
    const flowRef = useRef(null)
    const [stepStuts, setStepStuts] = useState(0);
    const onStop = (index) => {
        setStepStuts(index)
        if(flowRef.current&&flowRef.current['changeProcessData']){
            flowRef.current['changeProcessData'](index)
        }
    }
    useEffect(()=>{
        onStop(0)
    },[])
    const renderStepContainer = () => {
        return { 0: <Step1></Step1>, 1: <Step2></Step2>, 2: <Step3></Step3> }[stepStuts]
    }
    const renderButtonContaienr = () => {
        return { 
            0: <Button type="primary" basic onClick={()=>{onStop(1)}}>截标</Button>, 
            1: <><Button type="primary" basic onClick={()=>{onStop(2)}}>完成分配</Button><Button type="primary" basic onClick={()=>{onStop(0)}}>撤销截标</Button></>, 
            2: <Button type="primary" basic onClick={()=>{onStop(1)}}>撤销分配</Button> 
        }[stepStuts]
    }
    return (
        <div className={style.workFlowContainer}>
            <div className={style.titleContainer}>
                业务流程-泰安投资
                {renderButtonContaienr()}
            </div>
            <div className={style.flowContainer}>
                <Flow ref={flowRef} />
                <div className={style.infoTitle}>泰安市发展投资有限公司2021年度第一期中期票据</div>
                <div className={style.flowButtonContainer}>
                    {
                        workFlowData.map((item, index) => (
                            <div key={index} className={style.contentBlcok}>
                                <div className={style.blockTitle}>{item.title}</div>
                                <div className={style.blockInfo}>{item.info}</div>
                            </div>
                        ))
                    }

                </div>
            </div>
            {/* 预留动画 */}
            {/* <TransitionGroup className={style.CSSTransitionContainer}>
                <CSSTransition
                    in={testStatus}
                    key={1}
                    timeout={100}
                    exit={true}
                    appear={true}
                    unmountOnExit
                    classNames='fade'
                > */}
            <div className={style.CSSTransitionContainer}>
                {
                    renderStepContainer()
                }
            </div>
            {/* </CSSTransition>
            </TransitionGroup> */}
        </div>
    )
}
export default WorkFlow;