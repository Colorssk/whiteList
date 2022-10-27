import React from 'react';
import { Modal } from 'antd';
import UButton from '../UButton';
import './index.module.less'
const UModal = props => {
    const defaultFooter = [<UButton key="cancel" type="gray" onClick={props.onCancel ? props.onCancel : () => { }}>取消</UButton>,
    <UButton key="confirm" onClick={props.onOk ? props.onOk : () => { }}>确定</UButton>,]
    return <Modal {...{ ...props, footer: props.footer ? props.footer : defaultFooter }} >{props.children}</Modal>
}

export default UModal;