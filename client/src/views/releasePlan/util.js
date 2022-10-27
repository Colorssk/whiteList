/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEffect,
    useState,
    useCallback
} from 'react';
import moment from 'moment';
//复选框的参数映射
import { checkboxQueryList } from './config'
//config
import * as mapList from '@/config/mapList'
import {sortWhiteList} from './config'
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
        return () => {
            return {}
        }
    }, []);
    const getHeight = (parContainerId = 'section', extraTableClass = 'ant-table-wrapper') => {
        const bodyHeight = document.body.clientHeight
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

// calcuate collect
export const filterTableData = ({
    raw,
    key = 'isAttention',
    row
}) => {
    const res = JSON.parse(JSON.stringify(raw))
    if (Array.isArray(raw) && raw.length) {
        return res.map(item => {
            if (item.hasOwnProperty(key)) {
                if (row['secId'] && row['secId'] === item['secId']) {
                    item[key] = item[key] === 'Y' ? 'N' : 'Y'
                }
            } else {
                if (row['secId'] === item['secId']) {
                    item[key] = 'Y';
                } else {
                    item[key] = 'N';
                }
            }
            return item
        })
    } else {
        return res
    }
}

// whether the line highlight
export const onRowClassNameString = (record, key) => {
    if (judgeTimeValid(record[key])) {
        return 'hightLightRow'
    }
    return ''
}

const judgeTimeValid = (time) => {
    let res = false;
    const newTimeTramp = (daysMinus, time=null) => {
        return time ? moment(moment(time).add(daysMinus, 'minutes').format('YYYY-MM-DD HH:mm:ss')).valueOf() : moment(moment().add(daysMinus, 'minutes').format('YYYY-MM-DD HH:mm:ss')).valueOf()
    }
    const [preTime, lastTime, nowTime] = [newTimeTramp(-30), newTimeTramp(30), newTimeTramp(0, time)];
    res = (nowTime > preTime) &&  (nowTime < lastTime)  
    return res;
}

// today only show time
export const renderTime = (time) => {
    const today = [moment().startOf('day'), moment().endOf('day')];
    const timeValue = moment(time).valueOf()
    return timeValue > today[0] && timeValue < today[1] ? time.split(' ')[1] : time
}


// filters组件筛选出的关键字是 query key 和对应数字字典的label 需要输出value
export const labelTransToValue = ({filterKey, filterSelect}) => {
    const mapConfig = mapList[filterKey] || []
    if(mapConfig.length){
        return {[filterKey]: mapConfig.filter(e=>(filterSelect.some(label=>label===e.label))).map(item=>(item.value)).join(',')}
    }else{
        return {}
    }
}

// 删选得出复选框的查询数据
export const getChcekQuery = (selectRes) => {
    let resMap =   JSON.parse(JSON.stringify(checkboxQueryList))
    let queryRes = {}
    for(const [key ,value] of Object.entries(resMap)){
        let queryKey = value.key
        if(selectRes.some(item=>String(item)===key)){
            queryRes[queryKey] = value.valid
        }else{
            queryRes[queryKey] = value.inValid
        }
    }
    return queryRes
}

// 前端简单字段排序
/**
 * 
 * @param {*} raw  原始数据 
 * @param {*} key  需要排序的字段
 * @param {*} sorter  降序， 升序的字段
 */
export const sortByKey = (raw, key, sorter) => {
    return JSON.parse(JSON.stringify(mergeSort(raw,sorter,key)))
}

// merge sort
// eslint-disable-next-line no-unused-vars
const mergeSort = (arr, sorter, key) => {
    const length = arr.length;
    if (length === 1) {
      return arr;
    }
    const mid = Math.floor(length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, length);
    return merge(mergeSort(left,sorter,key), mergeSort(right,sorter,key), sorter, key);
  };
  
const merge = (left, right, sorter, key) => {
    console.log(key)
    const result = [];
    let il = 0;
    let ir = 0;
    while (il < left.length && ir < right.length) {
        if (sortWhiteList(left[il],right[ir], sorter, key)) {
        result.push(left[il]);
        il++;
        } else {
        result.push(right[ir]);
        ir++;
        }

    }
    while (il < left.length) {
        result.push(left[il]);
        il++;
    }
    while (ir < right.length) {
        result.push(right[ir]);
        ir++;
    }
    return result;
};