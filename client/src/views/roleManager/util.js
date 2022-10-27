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
    const getHeight = (parContainerId = 'section', extraTableClass = 'ant-table-wrapper') => {
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
    return {scrollY,calcTableHeight}
}

// calcuate collect
export const filterTableData = ({raw, key='collect', row})=>{
    const res = JSON.parse(JSON.stringify(raw))
    if(Array.isArray(raw) && raw.length){
        return res.map(item => {
            if(item.hasOwnProperty(key)){
                if(row['key']&&row['key']===item['key']){
                    item[key] = !item[key]
                }
            }else{
                if(row['key']===item['key']){
                    item[key] = true;
                }else{
                    item[key] = false;
                }  
            }
            return item
        })
    }else{
        return res
    }
}