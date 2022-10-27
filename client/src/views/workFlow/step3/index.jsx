import React, { useState, useEffect, useRef } from 'react'
//components
import STable from '@/components/Table'
import { Button } from 'ss-ui-library'
//config
import { columns } from './config'
//utils
import { useCalculateHeight } from '../utils'
//style
import style from './index.module.less'

const Step2 = props => {
    const [tableSource, setTableSource] = useState([])
    let { scrollY } = useCalculateHeight({ extraHeight: 34, parContainerId: 'step3tableContainer', extraTableClass: 'workFlowTable' })
    let scrollSTimeout = useRef(null);
    useEffect(() => {
        const data = new Array(35).fill().map((item, index) => ({
            key: index,
            companny: 'XXXX',
            account: 'XXXXXX',
            market: 'XXXX',
            rate: '3.5',
            price: '100',
            vol: '100',
            type: 'XXXX',
            date: 'YYYY-MM-DD',
            note: '必中',
            senior: '张三',
            status: index%2
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
        <div className={style.step3BodyContainer}>
            <div id='step3tableContainer' className={style.righttableContainer}>
                <div className={style.titleContainer}>
                    中标信息
                    <div className={style.buttonContainer}>
                        <Button type="primary" yellow>已锁定</Button>
                        <Button type="primary" basic style={{width: '88px',marginLeft: '10px'}}>保存</Button>
                    </div>
                </div>
                <STable className={'workFlowTable'} columns={columns()} dataSource={tableSource} pagination={false} scroll={{ y: scrollY, x: 1024 }} />
            </div>
        </div>
    )
}

export default Step2