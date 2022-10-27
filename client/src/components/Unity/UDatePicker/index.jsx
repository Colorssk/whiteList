import React from "react";
// hooks
import {
    useReplaceClearIcon
} from './util'
import {
    DatePicker
} from "antd";
const {
    RangePicker: AntdRangePicker
} = DatePicker;

const UDatePicker = (props) => {
    return <DatePicker {
        ...props
    }
    onChange = {
        useReplaceClearIcon(props)
    }
    />
};
const DateRange = (props) => {
    return <AntdRangePicker {
        ...props
    }
    onChange = {
        useReplaceClearIcon(props)
    }
    />
}
UDatePicker.RangePicker = DateRange;

export default UDatePicker