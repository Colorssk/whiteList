import React, { useState, forwardRef, useImperativeHandle } from 'react'
//config
import { processData, editProcessData } from './config'
// style
import style from './index.module.less'
//util
import { calcuateProcessPercent } from './utils'

const Flow = forwardRef((props,ref) => {
    const [processD, setProcess] = useState(processData);
    useImperativeHandle(ref, () => ({
        changeProcessData
    }));
    const changeProcessData = (index)=>{
        setProcess(editProcessData(processD, index))
    }
    return (
        <div className={style.flowContainer}>
            {
                processD.map((item, index) => {
                    const { isShow, process } = calcuateProcessPercent(processD, index)
                    return (
                        <div key={index} className={style.partContainer}>
                            <div className={style.circleContainer}>
                                <div className={`${style.circle} ${item.active ? style.circleActive : ''}`}>
                                    {item.content}
                                </div>
                                <div className={`${style.bottomText} ${item.active?style.bottomTextActive:''}`}>
                                    {item.title}
                                </div>
                            </div>
                            {
                                isShow && <div className={style.lineContainer}>
                                    <div className={style.lineProcess}>
                                        <div className={style.process} style={{ width: process }}>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    )
                })
            }
        </div>
    )
})

export default Flow