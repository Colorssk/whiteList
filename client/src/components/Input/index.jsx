import React, { forwardRef } from 'react'
import { Input } from 'ss-ui-library';
//style
import style from './index.module.less';

const SInput = forwardRef((props, ref) => {
    return <Input className={style.SInput}  {...props}></Input>
})
SInput.TextArea = forwardRef((props, ref) => {
    return <Input.TextArea className={style.extendInput} {...props} />
});

export default SInput;