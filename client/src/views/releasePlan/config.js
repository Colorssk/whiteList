import React from 'react';
//config
import * as mapList from '@/config/mapList'
// import { filterTableData } from './util'
//style
import style from './index.module.less';
import {
    StarOutlined,
    StarFilled
} from '@ant-design/icons';

//utils
import {
    renderTime
} from './util'

import moment from 'moment';
import {
    message
} from 'antd';

const getFilterSlist = (type) => {
    let res = [{
        title: '全部'
    }];
    return res.concat(mapList[type].map(e => ({
        title: e.label
    })))

}
export const filterlists = [{
    title: '状态',
    key: 'bondStatus',
    filterList: getFilterSlist('bondStatus')
}, {
    title: '债券',
    key: 'bondType',
    filterList: getFilterSlist('bondType')
}, {
    title: '期限',
    key: 'securityTerm',
    filterList: getFilterSlist('securityTerm')
}, {
    title: '评级',
    key: 'bondRatingLevelLatest',
    filterList: getFilterSlist('bondRatingLevelLatest')
}, {
    title: '企业',
    key: 'institutionSubtype',
    filterList: getFilterSlist('institutionSubtype')
}]


// 复选框value值的参数对应
export const checkboxQueryList = {
    '0': {
        key: 'isAttention',
        valid: 'Y',
        inValid: 'N'
    },
    '1': { // 假映射
        key: 'hasQuote',
        valid: 'Y',
        inValid: 'N'
    },
    '2': { //假映射
        key: 'releasing',
        valid: 'Y',
        inValid: 'N'
    }
}

// checkbox复选框
export const checkboxsList = [{
        label: '我的关注',
        value: '0',
        disabled: false
    },
    {
        label: '有报价',
        value: '1',
        disabled: false
    },
    {
        label: '正在发行',
        value: '2',
        disabled: false
    }
]


// 右击配置项
export const rightlClickMenu = () => {
    return [{
            label: '设置截标时间',
            key: 0,
            buttonCenter: true, // 确认按钮居中对齐
        },
        {
            label: '设置可投比例',
            key: 1,
            buttonCenter: true,
        },
        {
            label: '输入实际发行量',
            key: 2,
            buttonCenter: true,
        },
        {
            label: '修改债券信息',
            key: 3,
            width: '660px',
        },
        //   {
        //     label: '关注债券',
        //     key: 4,
        //   }
    ]
}

//header右击配置项
export const headerRightlClickMenu = () => {
    return [{
        label: '表格设置',
        key: 4,
    }]
}

// 过滤并且排序数据
/**
 * 
 * @param {*} originArr 
 * @param {*} rankList [{title: '', dataIndex: 'xxx'}] 
 */
const filterAndRank = (originArr, rankList) => {
    let res = [];
    const rankListTemp = [].concat(rankList)
    rankListTemp.forEach(el => {
        let index = originArr.findIndex(e => e.dataIndex === el.dataIndex)
        if (index !== -1) {
            res.push(originArr[index])
        }
    });
    if (!res.length) {
        message.info('请至少展示一列')
        return originArr
    }
    return res;
}
// 债券状态 数字字典
const bondStatusMap = {
    'ASSIGNED': {
        title: '已分配',
        color: 'rgba(1,166,91,1)'
    },
    'DONE': {
        title: '已完成',
        color: 'rgba(1,166,91,1)'
    },
    'NO_CLOSING': {
        title: '未截标',
        color: 'rgba(251,66,50,1)'
    },
    'WAIT_ASSIGN': {
        title: '等待分配',
        color: 'rgba(245,190,81,1)'
    },
    'WAIT_TRADING': {
        title: '等待交易',
        color: 'rgba(245,190,81,1)'
    }
}

// 发行计划列表columns
export const columns = ({
    handleClick = () => {},
    defaultColmuns = true,
    rankList = []
}) => {
    let resColumns = [{
            title: '收藏',
            dataIndex: 'isAttention',
            key: 'isAttention',
            fixed: true,
            width: 64,
            align: 'center',
            render: (value, row) => {
                return value === 'Y' ?
                    <
                    StarFilled style = {
                        {
                            color: '#FF9300',
                            cursor: 'pointer',
                            fontSize: '18px'
                        }
                    }
                onClick = {
                    () => {
                        handleClick(row)
                    }
                }
                /> : <
                StarOutlined style = {
                    {
                        color: '##FFEBC8',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }
                }
                onClick = {
                    () => {
                        handleClick(row)
                    }
                }
                />
            }
        },
        {
            title: '债券状态',
            width: 96,
            dataIndex: 'bondStatus',
            key: 'bondStatus',
            render: (text) => {
                return <div className = {
                    style.tableCellRender
                }
                style = {
                    {
                        color: bondStatusMap[text] ? bondStatusMap[text].color : ''
                    }
                } > {
                    bondStatusMap[text] ? bondStatusMap[text].title : text
                } </div>
            }
        }, {
            title: '发行日',
            width: 112,
            dataIndex: 'issueStartDate',
            sorter: true,
            key: 'issueStartDate',
            render: (text) => {
                return <div className = {
                    style.tableCellRender
                } > {
                    text
                } </div>
            }
        }, {
            title: '截标时间',
            dataIndex: 'auctionDate',
            sorter: true,
            width: 96,
            key: 'auctionDate',
            render: (text) => {
                return <div className = {
                    style.tableCellRender
                } > {
                    renderTime(text)
                } </div>
            }
        }, {
            title: '债券简称',
            dataIndex: 'bondShortNameCN',
            sorter: true,
            width: 96,
            key: 'bondShortNameCN',
            render: (value) => {
                return <div className = {
                    style.tableCellRender
                }
                style = {
                    {
                        'color': '#F9C152'
                    }
                } > {
                    value
                } </div>
            }
        }, {
            title: '期限',
            width: 64,
            dataIndex: 'securityTerm',
            sorter: true,
            key: 'securityTerm',
            render: (text) => {
                return <div className = {
                    style.tableCellRender
                } > {
                    text
                } </div>
            }
        }, {
            title: '可投比例',
            width: 96,
            dataIndex: 'canBidRatio',
            sorter: true,
            key: 'canBidRatio',
            render: (text) => {
                return <div className = {
                    style.tableCellRender
                } > {
                    text
                } </div>
            }
        }, {
            title: '主承销商',
            dataIndex: 'leadUnderwriter',
            sorter: true,
            // width: 96,
            key: 'leadUnderwriter',
            render: (text) => {
                return <div className = {
                    style.tableCellRender
                } > {
                    text
                } </div>
            }
        },
    ]
    return defaultColmuns ? resColumns : filterAndRank(resColumns, rankList)
};
// 不采用正则匹配去选择排序方案, 需要排序的字段放在这个列表里面
const whiteSortList = {
    'date': ['issueStartDate', 'auctionDate'],// 发行日， 截标时间， 时间排序
    'nameZH': ['bondShortNameCN','leadUnderwriter'], // 债券简称， 主承销商  名称排序
    'nu': ['securityTerm', 'canBidRatio'] // 期限， 可投比例 数字排序
}
const compareList = (leftObj, rightObj, sorter, key, resType) => {
    return {
        'nameZH':  sorter ==='ascend' ? String(leftObj[key]).localeCompare(String(rightObj[key])) < 0 : String(rightObj[key]).localeCompare(String(leftObj[key])) < 0,
        'date': sorter ==='ascend' ? moment(leftObj[key]).unix() - moment(rightObj[key]).unix() < 0 : moment(rightObj[key]).unix() - moment(leftObj[key]).unix() < 0,
        'nu': sorter ==='ascend' ? Number(String(leftObj[key]).match(/\d*/)[0]) - Number(String(rightObj[key]).match(/\d*/)[0]) < 0 : Number(String(rightObj[key]).match(/\d*/)[0]) - Number(String(leftObj[key]).match(/\d*/)[0]) < 0
    }[resType]
}
/**
 * 
 * @param {*} dataIndex columns 中的dataIndex 
 */
export const sortWhiteList = (leftObj, rightObj, sorter, dataIndex) => {
    let resType = null;
    for(const [key, value] of Object.entries(whiteSortList)){
        if(value.some(e=>String(e)===String(dataIndex))){
            resType = key;
            break;
        }
    }
    return compareList(leftObj, rightObj, sorter, dataIndex, resType)
}