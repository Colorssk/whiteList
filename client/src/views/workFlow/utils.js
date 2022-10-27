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
        const res = tes - (props.extraHeight ? props.extraHeight : 0)
        setScrollY(res);
        return res
    }, [scrollY]);
    useEffect(() => {
        calcTableHeight();
        reSize();
        return ()=>{
            return {}
        }
    }, []);
    const getHeight = () => {
        const {
            parContainerId = 'tableContainer', extraTableClass = 'workFlowTable', coefficient = 1
        } = props
        if (document.getElementById(parContainerId)) {
            const bodyHeight = document.getElementById(parContainerId).offsetHeight / Number(coefficient)
            const sectionList = document.getElementById(parContainerId) ? document.getElementById(parContainerId).children : [];
            let totalHieght = 0
            if (sectionList.length) {
                for (var i = 0; i < sectionList.length; i++) {
                    const dom = sectionList[i]
                    if (dom.getAttribute && !dom.getAttribute('class').includes(extraTableClass)) {
                        totalHieght += dom.offsetHeight
                    }
                }
            }
            return bodyHeight - totalHieght
        } else {
            return 0
        }




    }
    const reSize = () => {
        window.addEventListener('resize', () => {
            calcTableHeight();
        });
    };
    return {
        scrollY,
        calcTableHeight
    }
}