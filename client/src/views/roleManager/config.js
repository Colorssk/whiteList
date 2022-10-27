// import React from 'react';
export const columns = (handleClick = () => {}) => {
    return [
        {
            title: '名字',
            dataIndex: 'name',
            key: 'name',
        }, 
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role       ',
        },
        {
            title: '登录邮箱',
            dataIndex: 'email',
            key: 'email ',
        },
        {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
        }, 
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '所属团队',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
        },
    ]
};
//failData
export const data  = (function(){
    return new Array(25).fill().map((item,index)=>(
        {
            key: index,
            name: '费欧娜',
            role: '销售经理',
            email: 'feiouna@sumscope.com',
            phone: '1101101110110',
            position: '销售',
            team: '新增团队',
            status: '正常'
        }
    ))
})()