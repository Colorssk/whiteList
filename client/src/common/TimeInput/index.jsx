import React, { forwardRef } from 'react';
//style
import style from './index.module.less';
//components
import SInputNumber from '@/components/InputNumber'

const TimeInput = forwardRef((props, ref) => {
    const { defaultValue = [0, 0], value = [0, 0], min = [0, 0], step = [0.1, 0.1] } = props;
    const onChanggInput = (e, type) => {
        const { onChange = () => { } } = props;
        onChange(type === 0 ? [e, value[1]] : [value[0], e])
    }
    return (
        <div className={style.TimeContainer}>
            <SInputNumber className={style.input1} defaultValue={defaultValue[0] || 0} value={value[0]} min={min[0]} onChange={(e) => { onChanggInput(e, 0) }} step={step[0]}>
            </SInputNumber>
            &nbsp;&nbsp;时&nbsp;&nbsp;
            <SInputNumber className={style.input2} defaultValue={defaultValue[1] || 0} value={value[1]} min={0} onChange={(e) => { onChanggInput(e, 1) }} step={step[1]}>
            </SInputNumber>
            &nbsp;&nbsp;分&nbsp;&nbsp;
        </div>
    )
})

export default TimeInput