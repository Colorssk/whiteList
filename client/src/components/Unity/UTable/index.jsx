/* eslint-disable react-hooks/exhaustive-deps */
   
import React from "react";
import { Table }  from 'antd';
import style from  './index.module.less'
//hooks
import { useCalculateHeight } from './util'

const UTable = (props) => {
    const scrollY = useCalculateHeight(props)
    return <div className={style.UTableContainer}><Table {...props}   scroll={{ y: scrollY.scrollY }} /></div>
};

export default UTable