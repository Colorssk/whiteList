/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./index.module.less";
const path = require('path');
/**
 * 
 * @param {*} props: { tabList, defaultTabActive, onChangePane } 
 * @returns 
 */
const TabPanes = props => {
    const [defaultTabActive, setDefaultTabActive] = useState(props.defaultTabActive || '')
    useEffect(() => {
        if (props.tabList) {
            console.warn(path.resolve(__dirname, '/src/components/TabPannel'), ':props.tabList empty');
        }
    }, [])
    const onChangeTabPanes = (event) => {
        event.persist() 
        const clickIndex = event.target && event.target['id']
        setDefaultTabActive(clickIndex);
        if (props.onChangePane && typeof props.onChangePane === 'function') {
            props.onChangePane(clickIndex)
        } else {
            console.warn(path.resolve(__dirname, '/src/components/TabPannel'), ':props.onChangePane except function');
        }
    }
    const widthL = props.tabList ? props.tabList.length || 0 : 0
    return (
        <div className={style.tabPannesContainer} onClick={onChangeTabPanes}>
            {
                props.tabList.length && props.tabList.map((e, index) => (
                    <div id={e['index']} key={e['index'] ? e['index'] : index} className={`${style.tabBlock} ${defaultTabActive === e['index'] ? style.tabActiveStyle : ''}`} style={{ width: `calc(${Math.floor((100 / widthL) * 100) / 100 + '%'} - 4px)` }}>
                        {e['name'] ? e['name'] : ''}
                    </div>
                )
                )
            }

        </div>
    )
}

export default TabPanes