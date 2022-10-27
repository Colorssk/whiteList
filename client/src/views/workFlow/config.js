import React from 'react';
// import { filterTableData } from './util'
//components
import { Button } from 'ss-ui-library'
//priviledge
import PrivilegeComp from '@/common/PrivilegeComp';
//style
import style from './index.module.less';
export const columns = (handleClick = () => {}) => {
    return [
        {
            title: ' ',
            width: 30,
            dataIndex: 'status',
            key: 'status',
            render: (text)=>{
                return (
                    <div>
                        {
                            text!==0 ? 
                            <div className={`${style.columnnTag} ${text===1?style.colorEdit :''} ${text===2?style.colorCancel :''}`}>
                                {text === 1 ? '改' : '撤'}
                            </div>:
                            <>&nbsp;&nbsp;</>   
                        }
                    </div>
                   
                )
            }
        },
        {
            title: '标位(%)',
            width: 130,
            dataIndex: 'coump',
            key: 'coump',
            render: (text, row)=>{
                return (
                    <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>
                        {text}
                    </div>
                )
            }
        },
        {
            title: '价格(元)',
            width: 130,
            dataIndex: 'price',
            key: 'price',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
            }
        },
        {
            title: '面值(万)',
            width: 170,
            dataIndex: 'vol',
            ellipsis: true,
            key: 'vol',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
            }
        },
        {
            title: '经理',
            dataIndex: 'senior',
            width: 140,
            key: 'senior',
            render: (text)=>{
                return <div className={style.tableCellRender}>{text}</div>
            }
        },
        {
            title: '备注',
            dataIndex: 'note',
            width: 140,
            key: 'note',
            render: (text)=>{
                return <div className={style.tableCellRender}>{text}</div>
            }
        },
        {
            title: '更新时间',
            width: 120,
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text)=>{
                return <div className={style.tableCellRender}>{text}</div>
            }
        },
        {
            title: '操作时间',
            width: 120,
            dataIndex: 'operationDate',
            key: 'operationDate',
            render: (text)=>{
                return <div className={style.tableCellRender}>{text}</div>
            }
        },
        {
            title: '标位操作',
            dataIndex: 'action',
            width: 260,
            key: 'action',
            render: (text)=>{
                return (
                    <> 
                        <span>已确认</span>
                        <PrivilegeComp privilegeKey={1}><Button type="primary" gray="true" style={{marginLeft: '4px'}}>确认</Button></PrivilegeComp>
                        <PrivilegeComp privilegeKey={2}><Button type="primary" gray="true" style={{marginLeft: '4px'}}>撤销</Button></PrivilegeComp>
                        <Button type="primary" gray="true" style={{marginLeft: '4px'}}>恢复</Button>
                    </>
                )
            }
        },
    ]
};

export const columnsSmall = (handleClick = () => {}) => {
    return [
        {
            title: '标位(%)',
            dataIndex: 'coump',
            key: 'coump',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
            }
        },
        {
            title: '面值(万)',
            dataIndex: 'vol',
            key: 'vol',
            render: (text)=>{
                return <div className={`${style.tableCellRender}`}>{text}</div>
            }
        }
    ]
}

export const dettailData = [
    {
        time: '13:48:03',
        items: [
            {
                title: '截标时间',
                info: '截标时间'
            },
            {
                title: '目前边际(%)',
                info: '3.15'
            },
            {
                title: '全场倍数(%)',
                info: '1.6'
            },
            {
                title: '边际倍数(%)',
                info: '1.5'
            },
            {
                title: '小区间(%)',
                info: '2.5-2.8'
            },
            {
                title: '发行人预期(%)',
                info: '<2.7'
            },
            {
                title: '反馈截止时间',
                info: '13:58:13'
            },
        ]
    },
    {
        time: '13:48:03',
        items: [
            {
                title: '截标时间',
                info: '截标时间'
            },
            {
                title: '目前边际(%)',
                info: '3.15'
            },
            {
                title: '全场倍数(%)',
                info: '1.6'
            },
            {
                title: '边际倍数(%)',
                info: '1.5'
            },
            {
                title: '小区间(%)',
                info: '2.5-2.8'
            },
            {
                title: '发行人预期(%)',
                info: '<2.7'
            },
            {
                title: '反馈截止时间',
                info: '13:58:13'
            },
        ]
    },
    {
        time: '13:48:03',
        items: [
            {
                title: '截标时间',
                info: '截标时间'
            },
            {
                title: '目前边际(%)',
                info: '3.15'
            },
            {
                title: '全场倍数(%)',
                info: '1.6'
            },
            {
                title: '边际倍数(%)',
                info: '1.5'
            },
            {
                title: '小区间(%)',
                info: '2.5-2.8'
            },
            {
                title: '发行人预期(%)',
                info: '<2.7'
            },
            {
                title: '反馈截止时间',
                info: '13:58:13'
            },
        ]
    },
    {
        time: '13:48:03',
        items: [
            {
                title: '截标时间',
                info: '截标时间'
            },
            {
                title: '目前边际(%)',
                info: '3.15'
            },
            {
                title: '全场倍数(%)',
                info: '1.6'
            },
            {
                title: '边际倍数(%)',
                info: '1.5'
            },
            {
                title: '小区间(%)',
                info: '2.5-2.8'
            },
            {
                title: '发行人预期(%)',
                info: '<2.7'
            },
            {
                title: '反馈截止时间',
                info: '13:58:13'
            },
        ]
    }
]

export const workFlowData = [
    {
        title: '债券期限',
        info: '3Y+2Y'
    },
    {
        title: '发行规模',
        info: '10亿'
    },
    {
        title: '主体/债项评级',
        info: 'AAA/AAA'
    },
    {
        title: '招标方式',
        info: '荷兰式'
    },
    {
        title: '招标标的',
        info: '利率招标'
    },
    {
        title: '缴款日',
        info: '2021-12-03'
    },
    {
        title: '上市日',
        info: '2021-12-05'
    }
]