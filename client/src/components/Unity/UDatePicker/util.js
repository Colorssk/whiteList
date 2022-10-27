import React from "react";
import style from './index.module.less'
import ReactDOMServer from 'react-dom/server';
export const useReplaceClearIcon  = (props)=>{
    const closeIcon = ()=>{
        return <span className={style.antdDatePickercloseIcon}>x</span>
    }
    const onPickerChange = function () {
        if (props.onChange && typeof props.onChange === 'function') {
            props.onChange(...arguments)
        }
        setTimeout(() => {
            var newEle = CreateDOM(ReactDOMServer.renderToString(closeIcon()))
            const dom = document.getElementsByClassName('ant-calendar-picker-clear')[0]
            if(dom){
                const olEl = dom.childNodes[0]
                dom.replaceChild(newEle,olEl)
            }
        }, 50);
    }
    function CreateDOM(str) {
        var dom, tmp = document.createElement('div');
        tmp.innerHTML = str;
        dom = tmp.children[0];
        return dom;
    }

    return onPickerChange
}