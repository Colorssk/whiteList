import React, { useState } from 'react';
import Checkbox from './checkbox';
import style from './group.module.less';

/**
 * 
 * @param {*} props options: {label: '', value: '', disabled: false} 
 * @returns 
 */
const Group = props => {
    const { options = [], onChange = () => { }, defaultValue = [], ...checkboxProps } = props
    const [initValues, setInitValues] = useState(defaultValue);
    const onGroupChange = (value) => {
        onChange(filterInitValues(value))
    }
    // 剔除包含+新增
    const filterInitValues = (value) => {
        let initValuesTemp = []
        if (initValues.includes(value)) {
            initValuesTemp = initValues.filter(el => String(el) !== String(value))
          
        } else {
            initValuesTemp = [].concat(initValues, [value])
        }
        setInitValues(initValuesTemp)
        return initValuesTemp
    }
    return (
        <div className={style.UCheckboxGroup}>
            {
                options.map((item, index) => (
                    <Checkbox key={index} label={item.label} checked={initValues.includes(item.value)} onChange={() => { onGroupChange(item.value) }} disabled={item.disabled} {...checkboxProps} />
                ))
            }
        </div>
    )
}

export default Group;