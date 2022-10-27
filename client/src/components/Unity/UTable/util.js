// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState, useCallback } from 'react';
// export const useCalculateHeight = props=>{
//     const [ scrollY, setScrollY ] = useState({ scrollY: 0 });
//     const calcTableHeight = useCallback(() => {
//         let tes = document.documentElement.clientHeight || document.body.clientHeight;
//         setScrollY({ scrollY: tes - (props.extraHeight ? props.extraHeight : 0)  });
//     },[]);
//     useEffect(() => {
//         calcTableHeight();
//         reSize();
//     },[]);
//     const reSize = () => {
//         window.addEventListener('resize', () => {
//           calcTableHeight();
//         });
//     };
//     return scrollY
// }

/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEffect,
    useState,
    useCallback
} from 'react';
export const useCalculateHeight = props => {
    const [scrollY, setScrollY] = useState(0);
    const calcTableHeight = useCallback(() => {
        let tes = getHeight()
        const res  = tes - (props.extraHeight ? props.extraHeight : 0)
        setScrollY(res);
        return res
    }, [scrollY]);
    useEffect(() => {
        calcTableHeight();
        reSize();
    }, []);
    const getHeight = (parContainerId = 'section', extraTableClass = 'U-table') => {
        const bodyHeight = document.body.clientHeight
        const sectionList = document.getElementById(parContainerId) ? document.getElementById(parContainerId).children : [];
        let totalHieght = 0
        if (sectionList.length) {
            for(var i=0;i < sectionList.length; i++ ){
                const dom  = sectionList[i]
                if (dom.getAttribute && !dom.getAttribute('class').includes(extraTableClass)) {
                    totalHieght += dom.offsetHeight
                }
            }
        }
        return bodyHeight - totalHieght


    }
    const reSize = () => {
        window.addEventListener('resize', () => {
            calcTableHeight();
        });
    };
    console.log('scrollY', scrollY)
    return {scrollY,calcTableHeight}
}