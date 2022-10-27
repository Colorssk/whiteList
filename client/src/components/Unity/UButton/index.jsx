import { Button, Tooltip } from 'antd';
import React from 'react';
import  './index.less';

const UButton = (props) => {
  let typeClass = 'u-button-wrapper-basic';
  let type = props.type;
  if (props.disabled) {
    type = 'gray';
  }
  if (type) {
    // eslint-disable-next-line default-case
    switch (type) {
    case 'gray':
      typeClass = 'u-button-wrapper-gray';
      break;
    }
  }
  return <div className={[ 'u-button-wrapper', typeClass, props.className ].join(' ')}>
    <Tooltip title={props.tooltip}>
      <Button
        size="small"
        style={props.style}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
    </Tooltip>
  </div>;
};

export default UButton;