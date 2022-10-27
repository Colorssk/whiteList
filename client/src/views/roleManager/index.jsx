import React, { useEffect, useState } from "react";
import STable from '@/components/Table';
import { UInput } from "@/components/Unity";
import { Button } from 'ss-ui-library';
import style from './index.module.less';
import { useCalculateHeight } from './util'
//config
import { columns, data }  from './config'
const RoleManager = props=>{
    const [tableSource, setTableSource] = useState([])
    useEffect(()=>{
        setTableSource(data)
    },[])
    let { scrollY } = useCalculateHeight({ extraHeight: 40 })
    return (
        <div id="section" className={style.coumserContainer}>
            <div className={style.topSearchContainer}>
                <div className={style.headerTitleRightContainer}>
                    <div className={style.headerTitleRightInput}><UInput style={{ height: '24px' }} placeholder="input" type="search" /></div>
                    <Button className={style.headerTitleRightButton} type="primary" basic style={{ height: '24px' }}>添加角色</Button>
                </div>
            </div>
            <STable  columns={columns()} dataSource={tableSource} pagination={false} scroll={{ y: scrollY }} />
        </div>
    )
}


export default RoleManager;