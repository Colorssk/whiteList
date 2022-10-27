import React, { useEffect, useState, useRef } from "react";
import STable from '@/components/Table';
import { UInput } from "@/components/Unity";
import { Button } from 'ss-ui-library';
import style from './index.module.less';
import { useCalculateHeight } from './util'
//components
import AccountModal from './accountModal'
//config
import { columns, data }  from './config'
const Coumsers = props=>{
    const [tableSource, setTableSource] = useState([])
    const accountModalRef = useRef(null);
    useEffect(()=>{
        setTableSource(data)
    },[])
    let { scrollY } = useCalculateHeight({ extraHeight: 40 })
    // 添加账户
    const addCount = () => {
        accountModalRef.current.operateModal(true, {label: '添加账户', width: '536px'})
    }
    return (
        <div id="section" className={style.coumserContainer}>
            <div className={style.topSearchContainer}>
                <div className={style.headerTitleRightContainer}>
                    <div className={style.headerTitleRightInput}><UInput style={{ height: '24px' }} placeholder="input" type="search" /></div>
                    <Button className={style.headerTitleRightButton} type="primary" basic style={{ height: '24px' }} onClick={addCount}>添加账户</Button>
                    <AccountModal ref={accountModalRef}></AccountModal>
                </div>
            </div>
            <STable  columns={columns()} dataSource={tableSource} pagination={false} scroll={{ y: scrollY }} />
        </div>
    )
}


export default Coumsers;