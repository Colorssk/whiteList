import React,{ forwardRef } from "react";
import { Select } from 'ss-ui-library';
import './index.module.less'

const SSelect = forwardRef((props,ref) => {
    return <Select {...props}/>
});
SSelect.Option = Select.Option
export default SSelect