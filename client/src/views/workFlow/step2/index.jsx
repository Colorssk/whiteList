import React, { useState, useEffect, useRef } from 'react'
//components
import STable from '@/components/Table'
import { UInput } from "@/components/Unity";
//config
import { columns, releaseConfig }  from './config'
//utils
import { useCalculateHeight } from '../utils'
//style
import style from './index.module.less'

const Step2 = props=>{
    const [tableSource, setTableSource] = useState([])
    let { scrollY } = useCalculateHeight({ extraHeight: 34, parContainerId: 'step2tableContainer', extraTableClass: 'workFlowTable' })
    let scrollSTimeout = useRef(null);
    useEffect(() => {
        const data = new Array(35).fill().map((item, index) => ({
            key: index,
            coump: '3.5',
            price: '100',
            vol: '13:58:13',
            senior: '张晓红',
        }))
        let time = setTimeout(() => {
            setTableSource(data)
        }, 1000);
        return () => {
            clearTimeout(time);
            clearTimeout(scrollSTimeout.current);
            time = null;
            scrollSTimeout.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={style.step2BodyContainer}>
            <div className={style.leftAllocateContainer}>
                <div className={style.titleContainer}>
                    发行结果
                </div>
                <div className={style.buttonContainer}>
                    <div className={style.buttonStyle}>保存发行结果</div>
                    <div className={style.buttonStyle} style={{marginRight: '23px'}}>一健分配</div>
                </div>
                <div className={style.leftBodyConntainer}>
                    {
                        releaseConfig.map((item,index)=>(
                            <div key={index} className={style.blockContainer}>
                                <div className={`${style.block} ${item.required && style.blockRequired}`}>{item.title}</div>
                                <div className={style.block}><UInput></UInput></div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div id='step2tableContainer' className={style.righttableContainer}>
                <div className={style.titleContainer}>
                    中标信息
                </div>
                <STable className={'workFlowTable'} columns={columns()} dataSource={tableSource} pagination={false} scroll={{ y: scrollY, x: 1024 }} />
            </div>
        </div>
    )
}

export default Step2