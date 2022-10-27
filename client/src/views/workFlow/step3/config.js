import React from 'react';
//components
import { UInput } from "@/components/Unity";
import SSelect from '@/components/Select'
import { DatePicker } from 'ss-ui-library'
//style
import style from './index.module.less'
export const columns = (handleClick = () => {}) => {
    const { Option } = SSelect;
    return [
        {
            title: <div className={style.cellTitle}>对方机构</div>,
            width: 130,
            dataIndex: 'companny',
            key: 'companny',
            render: (text)=>{
                return <UInput style={{width: '88px', height: '24px'}}></UInput>
            }
        },
        {
            title:  <div className={style.cellTitle}>交易账户</div>,
            width: 130,
            dataIndex: 'account',
            key: 'account',
            render: (text)=>{
                return <SSelect style={{width: '88px', height: '24px'}} placeholder="请选择"
                optionFilterProp="children"><Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option></SSelect>
            }
        },
        {
            title:  <div className={style.cellTitle}>托管市场</div>,
            width: 170,
            dataIndex: 'market',
            ellipsis: true,
            key: 'market',
            render: (text)=>{
                return <UInput style={{width: '88px', height: '24px'}}></UInput>
            }
        },
        {
            title: '中标利率(%)',
            dataIndex: 'rate',
            width: 140,
            key: 'rate',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
            }
        },
        {
            title: '中标价格(元)',
            dataIndex: 'price',
            width: 140,
            key: 'price',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
            }
        },
        {
            title: '面值(元)',
            dataIndex: 'vol',
            width: 140,
            key: 'vol',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
            }
        },
        {
            title: '交割方式',
            dataIndex: 'type',
            width: 140,
            key: 'type',
            render: (text)=>{
                return <UInput style={{width: '88px', height: '24px'}}></UInput>
            }
        },
        {
            title: '下单日期',
            dataIndex: 'date',
            width: 140,
            key: 'date',
            render: (text)=>{
                return <DatePicker style={{width: '120px'}}></DatePicker>
            }
        },
        {
            title: '备注',
            dataIndex: 'note',
            width: 140,
            key: 'note',
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
                return <SSelect style={{width: '88px', height: '24px'}} placeholder="请选择"
                optionFilterProp="children"><Option value="jack">张三</Option>
                <Option value="lucy">李四</Option>
                <Option value="tom">罗翔</Option></SSelect>
            }
        },
        // {
        //     title: '提交状态',
        //     dataIndex: 'status',
        //     width: 140,
        //     key: 'status',
        //     render: (text)=>{
        //         return <div className={`${style.tableCellRender}`} style={{color: text===0?'#00B563':'rgba(255,67,51,1)'}}>{text===0?'提交成功':'未提交'}</div>
        //     }
        // },
    ]
};