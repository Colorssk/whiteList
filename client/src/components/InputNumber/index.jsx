import React from 'react';
//compomnent
import { InputNumber } from 'ss-ui-library';
//style
import style from './index.module.less';

const SInputNumber = props => {
    const combineClassNames = `${style.InputNumberContainer} ${props.className || ''}`
    return <InputNumber {...props} className={combineClassNames}></InputNumber>
}
export default SInputNumber;