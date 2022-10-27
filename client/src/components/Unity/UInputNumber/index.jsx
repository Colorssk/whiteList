/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import { Tooltip, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import { useHover } from './util';
import Decimal from 'decimal.js';

const UInputNumber = (props) => {

  const [ value, setValue ] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [ props.value ]);

  const [ max, setMax ] = useState(props.max);
  useEffect(() => {
    setMax(props.max);
    if (value > props.max) {
      setValue(props.max);
    }
  }, [props.max, value]);

  const [ isHovered, eventHandlers ] =  useHover();

  return <div className={[ 'u-input-wrapper', props.className ].join(' ')}>
    <Tooltip
      title={isHovered && props.tooltip || props.tooltipWarning}
      color={props.tooltipColor || (isHovered && props.tooltip && '') || (props.tooltipWarning && '#ff4d4f') || ''}
      visible={(Boolean(props.tooltip) && isHovered) || Boolean(props.tooltipWarning)}
      placement="topLeft"
    >
      <InputNumber
        precision={props.precision}
        type="number"
        {...eventHandlers}
        size="small"
        max={max}
        formatter={e => {
          if (props.formatter) {
            return props.formatter(e);
          } else {
            return e && new Decimal(e).toString() || e;
          }
        }}
        min={props.min}
        placeholder={props.placeholder}
        value={value}
        disabled={props.disabled}
        onChange={(e) => {
          setValue(e);
          props.onChange && props.onChange(e);
        }}
        onBlur={props.onBlur}
      />
    </Tooltip>
  </div>;
};

export default UInputNumber;