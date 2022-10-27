import React, { forwardRef } from 'react';
import { Input } from 'antd';
import style from './index.module.less';
//imgs
import preSearchIcon from './imgs/pre_search.png';

const UInput = forwardRef((props,ref) => {
    return <div className={`${style.UInput} ${props.type==='search'? style.searchStyle : ''}`}><Input prefix={props.type && props.type === 'search' ? <img alt="search input" src={preSearchIcon} /> : null} {...props} /></div>
})

export default UInput