import React, { forwardRef } from 'react';
//components
import { Radio } from 'ss-ui-library';
//style
import style from './index.module.less';
const SRadio = forwardRef((props, ref)=> {
    return (
        <Radio className={style.SRadioContainer} {...props}>{props.children}</Radio>
    )
})
SRadio.Group = forwardRef((props, ref)=> {
    return (
        <Radio.Group className={style.SRadioGroupContainer} {...props}>{props.children}</Radio.Group>
    )
})
export default SRadio