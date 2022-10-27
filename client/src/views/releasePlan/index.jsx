/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import style from "./index.module.less";
import { UTable, USelect, UModal, UInput, UButton, UDatePicker, UCheckbox, } from "@/components/Unity";
import STable from '@/components/Table'
import RightClickMenu from '@/components/RightClickMenu'
import TabPanes from '@/components/TabPannel';
import Filter from '@/components/Filter';
import { Button, Input, DatePicker } from 'ss-ui-library';
import ModalList from './modalList'
//api
import { releasePlanList, collectBond, unCollectBond } from '@/api/releasePlan'
//config
import { filterlists, checkboxsList, columns, rightlClickMenu, headerRightlClickMenu } from './config'
//hooks
import { useCalculateHeight, filterTableData, onRowClassNameString, labelTransToValue, getChcekQuery, sortByKey } from './util'
const { Search } = Input;
const ReleasePlan = (props) => {
  const [modalVisible, setModalVisible] = useState(true)
  const [checkedValue, setCheckedValue] = useState(true)
  const [unfold, setUnfold] = useState(true);
  const [tableSource, setTableSource] = useState([])// 切记 setTableSource后也要赋值给tableDataCache.current
  const [unfoldTableHeight, setUnfoldTableHeight] = useState(0)
  const [ rightClickPosition, setRightClickPosition ] = useState({left:0,top: 0});
  const [ heaserRightClickPosition, setHeaserRightClickPosition ] = useState({left:0,top: 0});
  const [refresh, setRefresh] = useState(false);
  const [columnsDy, setColumnDy] = useState([]);
  const editCollectLoading = useRef(false)
  const [defaultReleaseDate] = useState(['2022-01-02','2022-01-03']);// 默认发行日
  const filterrRef = useRef(
    {
      statusRef: useRef(),
      bondRef: useRef(),
      deadline: useRef(),
      rateRef: useRef(),
      enterpriseRef: useRef(),
    }
  )
  const listQuery  = useRef({})// 列表参数的集合
  const tableDataCache = useRef(null);
  let time = useRef(null)
  const modalRef = useRef(null);
  const interVal = useRef(null);

  const data = [
    {
      key: '001',
      secId: '1',
      bondId: '1',
      isAttention: 'N',
      bondStatus: 'DONE',
      issueStartDate: '2022-01-01 12:58:13',
      auctionDate: '2022-01-01 12:58:13',
      bondShortNameCN: 'A',
      securityTerm: '10%',
      mcanBidRatioain: '1',
      leadUnderwriter: 'C78星云'
    },
    {
      key: '002',
      secId: '2',
      bondId: '2',
      isAttention: 'Y',
      bondStatus: 'DONE',
      issueStartDate: '2022-01-01 12:58:14',
      auctionDate: '2022-01-25 14:32:13',
      bondShortNameCN: 'B',
      securityTerm: '12%',
      mcanBidRatioain: '1',
      leadUnderwriter: 'B78星云'
    },
    {
      key: '003',
      secId: '3',
      bondId: '3',
      isAttention: 'Y',
      bondStatus: 'DONE',
      issueStartDate: '2022-01-01 12:58:15',
      auctionDate: '2022-01-25 14:32:13',
      bondShortNameCN: 'c',
      securityTerm: '9%',
      mcanBidRatioain: '1',
      leadUnderwriter: 'A78星云'
    },
  ];
  useEffect(() => {
    //初始化列表数据
    setColumnDy(columns({handleClick: handleColumnsClick, defaultColmuns: true}))
    queryList()
    // 模拟接口延迟
    time.current = setTimeout(() => {
      setTableSource(data)
      tableDataCache.current = data
    }, 1000);
    listenClickCancelMenu()
    interVal.current = setInterval(()=>{
      doRefresh() // 强制刷新页面
      setTableSource(tableDataCache.current)
    },15000)
    return () => {
      clearTimeout(time.current);
      clearInterval(interVal.current);
      time.current = null;
      interVal.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false))
    }, [refresh])
  const doRefresh = () => setRefresh(true)
  let { scrollY, calcTableHeight } = useCalculateHeight({ extraHeight: 60 })
  const listenClickCancelMenu = ()=>{// 监听关闭右键菜单
    window.addEventListener('click',()=>{
      setRightClickPosition({left: 0,top: 0})
      setHeaserRightClickPosition({left: 0,top: 0})
    })
  }
  const onChangePane = (activeIndex) => {
    console.log(activeIndex)
  }
  const onOk = () => {
    setModalVisible(false)
  }
  const onCancel = () => {
    setModalVisible(false)
  }
  //多标签筛选回调
  const handleChangeQueryTab = (tabs) => {
    listQuery.current = {...listQuery.current, ...labelTransToValue(tabs)}
    queryList()
  }
  // 切换复选框
  const onChanegP = (value) => {
    listQuery.current = {...listQuery.current, ...getChcekQuery(value)}
    queryList()
  }
  const onChangeUnfold = () => {
    setUnfold(!unfold)
    setTimeout(() => {
      scrollY = calcTableHeight();
    }, 500);

  }
  // show all 展示所有
  const onShowAll = ()=>{
    listQuery.current = {}
    queryList()
  }
  // 修改收藏
  const handleColumnsClick = (row) => {
    if(!editCollectLoading.current){
      editCollectLoading.current = true
      editCollectAxios(row)
    }
  }
  // 双击发行计划行数据
  const rowDoubleCLick = (record) => {
    props.history.push({
      pathname: '/workFlow',
      search: `?bondId=${record.bondId}`
    })
  }
  const rowRightClick = (event,type) => {
    window.event.returnValue = false;  
    let containerDom = document.getElementById('section');
    let delLength = containerDom.offsetLeft;
    type === 'top' ? setRightClickPosition({left:event.clientX - delLength + 10,top: event.clientY + 10}) : setHeaserRightClickPosition({left:event.clientX - delLength + 10,top: event.clientY + 10})
  }
  // 发行计划列表行点击事件
  const onClickRow = record => {
    return {
      onDoubleClick: (event) => { rowDoubleCLick(record) },
      onContextMenu: (event) => { rowRightClick(event,'top')},
    }
  }
  //点击表头
  const onHeaderClickRow = (columns, index) => {
    return {
      onContextMenu: (event) => { rowRightClick(event,'header')},
    };
  }
  //点击菜单
  const onClickMenu = (menu)=>{
    modalRef.current && modalRef.current.operateModal(menu, true) 
  }
  // 表格设置
  const onHeaderClickMenu = menu => {
    modalRef.current && modalRef.current.operateModal(menu, true) 
  }
  // row attribute
  const onRowClassName = record => {
    return onRowClassNameString(record, 'auctionDate')
  }
  //弹窗关闭回调
  const onConfirm = ({menu, data, callBack}) => {
    setColumnDy(columns({handleClick: handleColumnsClick, rankList: data, defaultColmuns: false }))
    //记得关闭弹窗
    callBack()
  }
  // table change 事件
  const onChangeTable = (pagination, filters, sorter, extra)=>{
    console.log(sorter)
    if(sorter.order){
      const resData = sortByKey(tableDataCache.current, sorter.field, sorter.order)
      setTableSource(resData)
      tableDataCache.current = resData
    }else{
      queryList()
    }
  }

  // 接口---
  // 收藏接口
  const editCollectAxios = (row) => {
    const promiseObj =  row.isAttention==='Y' ? unCollectBond({secId:row.secId}) : collectBond({secId:row.secId})
    promiseObj.then(res=>{
      if(res){
        setTableSource(filterTableData({ raw: tableDataCache.current, row }))
        tableDataCache.current = filterTableData({ raw: tableDataCache.current, row }) // 缓存存一份
      }
      editCollectLoading.current = false
    }).catch(()=>{
      editCollectLoading.current = false
    })
  }
  // list接口
  const queryList = () => {
    releasePlanList(listQuery.current);
  }
  // 发行日
  const onChangeReleaseDate = (_,value) => {
    if(value){
      listQuery.current = {...listQuery.current, issueStartDate: value[0], issueEndDate: value[1]}
    }else{
      listQuery.current = {...listQuery.current, issueStartDate: '', issueEndDate:''}
    }
    queryList()
  }
  return (
    <div id='section' className={style.appcontainer}>
      <div className={style.headerTitleContainer}>
        发行计划
        <div className={style.headerTitleRightContainer}>
          <div className={style.headerTitleRightInput}><UInput style={{ height: '24px' }} placeholder="input" type="search" /></div>
          <Button className={style.headerTitleRightButton} type="primary" basic style={{ height: '24px' }}>债券录入</Button>
        </div>
      </div>
      <div className={`${style.searchContainer} ${unfold ? style.unfold : ''}`} >
        <div className={style.searchContainerLeftContainer}>
          <div className={style.searchLeftButtonContainer}><Button className={style.searchContainerLeftButton} type="primary" yellow style={{ height: '24px' }} onClick={onShowAll}>SHOW ALL</Button></div>
        </div>
        <div className={style.searchContainerRightContainer}>
          {filterlists.map((item, index) => (
            <div key={item.key} className={style.filterItemContainer}>
              <Filter
                title={item.title}
                queryKey={item.key}
                isCtrl={true}
                ref={filterrRef.current[item.key]}
                onChange={handleChangeQueryTab}
                filters={item.filterList}
              />
            </div>
          ))}
        </div>

        <div className={style.searchFooterContainer}>
          <div className={style.issueDate}>发行日</div>
          <div className={style.dateContainer}>
            <DatePicker defaultValue={defaultReleaseDate} picker="range" onChange={onChangeReleaseDate}/>
          </div>
          <UCheckbox.Group options={checkboxsList} defaultValue={['0', '1', '2']} onChange={onChanegP} style={{ marginRight: '4px' }} />
        </div>

        {/* expand icon */}
        <div className={style.expandIconContainer} onClick={onChangeUnfold}>
          <div className={style.triangleIconTop}></div>
          <div className={style.triangleIconBottom}></div>
        </div>
      </div>
      {/* 列表 */}
      <STable onRow={onClickRow} onHeaderRow={onHeaderClickRow} rowClassName={onRowClassName} columns={columnsDy} dataSource={tableSource} pagination={false} scroll={{ y: scrollY, x: 1024 }} onChange={onChangeTable}/>
      {rightClickPosition.left===0&&rightClickPosition.top===0?<></>:<RightClickMenu {...rightClickPosition} menuList={rightlClickMenu()} handler={onClickMenu}/>}
      {heaserRightClickPosition.left===0&&heaserRightClickPosition.top===0?<></>:<RightClickMenu {...heaserRightClickPosition} menuList={headerRightlClickMenu()} handler={onHeaderClickMenu}/>}
      <ModalList ref={modalRef} onOk={onConfirm}></ModalList>
    </div>
  );
};

export default ReleasePlan;
