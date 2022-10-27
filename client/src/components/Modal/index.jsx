/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Modal } from 'ss-ui-library';
import './index.module.less'
//utils
import classNames from "classnames";
import { useEffect } from "react";

const SModal = (props) => {
    const [position, setPosition] = useState({ left: 0, top: 100 })
    const positionCache = useRef({ left: 0, top: 100 })
    const { isMove = true } = props
    const wrapClass = classNames({
        'buttonCenterPosition': props.buttonCenter,
        'modalLimitClass': true
    })
    const onMouseDown = e => {
        e.preventDefault(); //记录初始移动的鼠标位置 
        let startPosX = e.clientX;
        let startPosY = e.clientY;
        let plusLeft = positionCache.current.left;
        let plusTop = positionCache.current.top;
        document.body.onmousemove = event => {
            let left = event.clientX - startPosX + plusLeft;
            let top = event.clientY - startPosY + plusTop;
            setPosition({
                left,
                top
            })
            positionCache.current = {
                left,
                top
            }
        };//鼠标放开时去掉移动事件
        document.body.onmouseup = () => {
            document.body.onmousemove = null;
        };


    };
    useEffect(() => {
        if (isMove) {
            document.body.addEventListener('mousedown', (e) => { if (e && (e.target.className === 'ant-modal-header' || e.target.className === 'antd-modal-title-custom')) { onMouseDown(e) } },);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        props.visible && <Modal wrapClassName={wrapClass} style={{ left: position.left + 'px', top: position.top + 'px' }} {...props} title={<div className="antd-modal-title-custom" style={{ width: '100%', cursor: 'move' }} >{props.title || ''}</div>} >
            {props.children}
        </Modal>
    )



};

export default SModal