import React, { useState } from 'react'
//components
import { UInput } from '@/components/Unity'
import { Button, CheckBox } from 'ss-ui-library'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
//style
import style from './index.module.less'
//config
import { failListData } from './config'


const ClientManager = props => {
    const [selectIds, setSelectIds] = useState([]);
    const [roleOp, setRoleOp] = useState(true);
    const [roleRe, setRoleRe] = useState(true);
    const onSelect = (id) => {
        const index = selectIds.findIndex(item => String(item) === String(id))
        const selectIdsTemp = JSON.parse(JSON.stringify(selectIds));
        if (index === -1) {
            selectIdsTemp.push(id)
        } else {
            selectIdsTemp.splice(index, 1)
        }
        setSelectIds(selectIdsTemp)
    }
    const onChnageRole = (event, type) => {
        if (type === 0) {
            setRoleOp(event.target.checked)
        } else {
            setRoleRe(event.target.checked)
        }
    }
    // filter list in font-end
    const filterList = (data) => {
        const res = JSON.parse(JSON.stringify(data))
        return res.filter(item => ((roleOp && item.type === 1) || (roleRe && item.type === 0)))
    }
    return (
        <div className={style.clientManagerContainer}>
            <div className={style.titleContainer}>
                客户管理
                <div className={style.actionContainer}>
                    <UInput type="search" placeholder='搜索机构名称' className={style.input} />
                    <Button type="primary" basic className={style.button}>添加机构</Button>
                    <Button type="primary" basic className={style.button}>操作日志</Button>
                </div>
            </div>
            {/* 机构属性选择栏 */}
            <div className={style.selectedContainer}>
                机构属性
                <CheckBox style={{ marginLeft: '4px' }} checked={roleOp} onChange={(event) => { onChnageRole(event, 0) }}>对手方</CheckBox>
                <CheckBox checked={roleRe} onChange={(event) => { onChnageRole(event, 1) }}>关联方</CheckBox>
            </div>
            <div className={style.tagContainer}>
                <div className={style.tagItem}>
                    <CheckCircleOutlined className={style.tagIcon} />
                    正常:1535
                </div>
                <div className={style.tagItem}>
                    <CloseCircleOutlined className={style.tagIcon} />
                    冻结:154
                </div>
            </div>
            <div className={style.bodyContainer}>
                {
                    filterList(failListData).map((item, index) => (
                        <div key={index} className={`${style.lineBlock} ${selectIds.includes(item.id) && style.hasSelected}`} onClick={() => { onSelect(item.id) }}>
                            <div className={style.iconBlcok}>
                                {item.icon ? <CheckCircleOutlined style={{ color: '#00B563' }} className={style.statusIcon} /> : <CloseCircleOutlined style={{ color: '#FF4333' }} className={style.statusIcon} />}
                            </div>
                            <div className={style.titleBlock}>
                                <div className={`${style.topTitle} ${item.disabled && style.userManagerDisabledColor}`}>
                                    {item.companyName}
                                </div>
                                <div className={`${style.bottomTitle} ${item.disabled && style.userManagerDisabledColor}`}>
                                    {item.shortname}
                                </div>
                            </div>
                            <div className={style.rightContainer}>
                                <div className={`${style.typeInfo} ${item.disabled && style.userManagerDisabledColor}`}>{Number(item.type) === 0 ? '关联方' : '对手方'}</div>
                                <div className={`${style.typeDate} ${item.disabled && style.userManagerDisabledColor}`}>{item.date}</div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ClientManager