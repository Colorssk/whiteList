/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
//components
import { Button } from 'ss-ui-library'
import STable from '@/components/Table'
import { columns, columnsSmall, dettailData } from '../config'
import { QuotationModalAdd,  QuotationModalEdit} from './quotationModal'
import AnalyzeModal from './analyzeModal'
//utils
import { useCalculateHeight } from '../utils'
import _ from 'lodash'
import { quoteList } from '@/api/workFlow'
import { useHistory ,useLocation } from 'react-router-dom';
//img
import images from '@/assets/images'
//style
import style from '../index.module.less'


const Step1 = props => {
    const location = useLocation();
    const history = useHistory();
    const [tableSource, setTableSource] = useState([])
    const [scrollActive, setScrollActive] = useState(false)
    const [tableSourceSmall, setTableSourceSmall] = useState([])
    let { scrollY } = useCalculateHeight({ extraHeight: 40, parContainerId: 'tableContainer', extraTableClass: 'workFlowTable' })
    let { scrollY: scrollYS } = useCalculateHeight({ extraHeight: 24, extraTableClass: 'rightBottomTable', parContainerId: 'rightTopContainer' })
    let scrollSTimeout = useRef(null);
    const addModalRef = useRef(null);
    const editModalRef = useRef(null);
    const analyzeModal = useRef(null);
    const searchParams = new URLSearchParams(location.search)
    useEffect(() => {
        queryQuote();
        const data = new Array(35).fill().map((item, index) => ({
            key: index,
            coump: '3.5',
            price: '100',
            vol: '13:58:13',
            senior: '张晓红',
            note: '必中',
            updateTime: '13:58:13',
            operationDate: '13:58:13',
            status: index % 3,
        }))
        const dataD = new Array(15).fill().map((item, index) => ({
            key: index,
            coump: '3.5',
            vol: '13:58:13'
        }))
        let time = setTimeout(() => {
            setTableSource(data)
            setTableSourceSmall(dataD)
        }, 1000);
        return () => {
            clearTimeout(time);
            clearTimeout(scrollSTimeout.current);
            time = null;
            scrollSTimeout.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onIconScroll = () => {
        setScrollActive(true);
        scrollSTimeout.current = setTimeout(() => {
            setScrollActive(false);
        }, 200)
        showAnalyzeModal()
    }
    const onShowAddModal = () => {
        addModalRef.current && addModalRef.current.operateModal(true, {
            label: '新增报价',
            width: '736px',
        })
        // editModalRef.current && editModalRef.current.operateModal(true, {
        //     label: '编辑报价',
        //     width: '524px'
        // })
    }
    //展示边际信息弹窗
    const showAnalyzeModal = () => {
        analyzeModal.current && analyzeModal.current.operateModal(true, {
            label: '边际信息',
            width: '536px'
        })
    }
    // 接口
    const  queryQuote = () => {
        if(searchParams.get('bondId')){
            quoteList({bondId: searchParams.get('bondId')});
        }else{
            history.goBack();
        }
    }
    return (
        <div className={style.bodyContainer}>
            <div id='tableContainer' className={style.tableContainer}>
                <div className={style.buttonContainer}>
                    <Button type="primary" basic onClick={onShowAddModal}>新增报价</Button>
                    <QuotationModalAdd ref={addModalRef}></QuotationModalAdd>
                    <QuotationModalEdit ref={editModalRef}></QuotationModalEdit>
                </div>
                <STable className={'workFlowTable'} columns={columns()} dataSource={tableSource} pagination={false} scroll={{ y: scrollY, x: 1024 }} />
            </div>
            <div className={style.bodyRightContainer}>
                <div id="rightTopContainer" className={style.rightTopContainer}>
                    <div className={style.rightTopTitleContainer}>
                        标位汇总-20工元居3C
                        <img className={style.rightTopFloatButton} src={images.copy} alt="暗色主题 图标" title='复制' />
                    </div>
                    <STable className='rightBottomTable' columns={columnsSmall()} dataSource={tableSourceSmall} pagination={false} scroll={{ y: scrollYS }} />
                    <div className={style.rightBottomInfo}>合计有效面值<span>15000</span></div>
                </div>
                <div className={style.rightBottomContainer}>
                    <div className={style.rightBottomTitle}>
                        边际信息
                        <img className={`${style.refreshICon} ${scrollActive ? style.scrollActive : ''}`} src={images.refresh} alt="暗色主题 图标" onClick={_.debounce(onIconScroll, 200)}/>
                        <AnalyzeModal ref={analyzeModal}></AnalyzeModal>
                    </div>
                    <div className={style.rightBottomTitleOccupy}></div>
                    {
                        dettailData.map((data, index) => (
                            <div key={index} className={style.infoBlcok}>
                                <div className={style.infoTitleContainer}>
                                    {data.time}
                                    <img className={style.infoTitleFloatButton} src={images.copy} alt="暗色主题 图标" title='复制' />
                                </div>
                                <div className={style.infoContent}>
                                    {
                                        data.items.map((item, ind) => (
                                            <div key={ind} className={style.infoLittleBlock}>
                                                <div className={style.infoTitle}>{item.title}</div>
                                                <div className={style.infoContent}>{item.info}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Step1