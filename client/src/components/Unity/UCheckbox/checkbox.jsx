import React from 'react';
//styles
import style from './index.module.less';
import {
    CheckOutlined
} from '@ant-design/icons';


const Checkbox = props => {
    const { checked = false, label = 'checkbox', disabled = false, onChange = () => { }, style: styleProps = {} } = props
    const onCheckBoxChange = function () {
        !disabled && onChange(...arguments)
    }
    return (
        <div className={`${style.UCheckboxContainer} ${disabled ? style.UCheckboxContainerDisabled : ''}`} onClick={onCheckBoxChange} style={styleProps}>
            <div className={`${style.UCheckboxleftIconContainer} ${checked ? style.UCheckboxleftIconContainerActive : ''} ${disabled ? style.UCheckboxleftIconContainerDisabled : ''}`}>
                {checked && <CheckOutlined />}
            </div>
            <div className={`${style.UCheckboxrigthInfo} ${checked ? style.UCheckboxrigthInfoActive : ''}`}>{label}</div>
        </div>
    );
}
export default Checkbox;