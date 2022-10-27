import React from 'react';
//components
import { UInput } from "@/components/Unity";
//style
import style from './index.module.less'

export const columns = (handleClick = () => {}) => {
    return [
        {
            title: '标位(%)',
            width: 130,
            dataIndex: 'coump',
            key: 'coump',
            render: (text)=>{
                return <div className={`${style.tableCellRender} ${style.tableCellyellow}`}>{text}</div>
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
            title: '中标利率',
            dataIndex: 'senior',
            width: 140,
            key: 'senior',
            render: (text)=>{
                return <UInput style={{width: '88px', height: '24px'}}></UInput>
            }
        },
        {
            title: '中标价格',
            dataIndex: 'senior',
            width: 140,
            key: 'senior',
            render: (text)=>{
                return <UInput style={{width: '88px', height: '24px'}}></UInput>
            }
        },
        {
            title: '中标面值',
            dataIndex: 'senior',
            width: 140,
            key: 'senior',
            render: (text)=>{
                return <UInput style={{width: '88px',height: '24px'}}></UInput>
            }
        },
      
    ]
};

export const releaseConfig = [
    {
        title: '加权利率(%)',
        required: true
    },
    {
        title: '加权价格(元)',
        required: false
    },
    {
        title: '全场倍数',
        required: true
    },
    {
        title: '总中标面值(亿)',
        required: false
    },
    {
        title: '边际利率(%)',
        required: false
    },
    {
        title: '边际价格(元)',
        required: false
    },
    {
        title: '边际倍数',
        required: false
    },
]