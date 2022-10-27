import React, { useEffect } from "react";
import Content from "./Content";
import { connect } from "react-redux";
//actions
import { setLogoMenuVisible } from '@/store/actions'
import {  useLocation } from 'react-router-dom';
import routeList from "@/config/routeMap";
import Header from "./Header";
//style
import style from './index.module.less';
import Sider from "./Sider";
import { Layout } from "antd";
//util
import { controllSidebarCollapsed } from '@/utils/controllSidebarCollapsed'
const Main = (props) => {
  const {setLogoMenuVisible} = props
  const location = useLocation();
  const path = location.pathname;
  const route = routeList.filter(route => {
    if(route.path === path.split('?')[0]){
      return route
    }else{
      return false
    }
  })
  console.log(route)
  let hasSlider = true;
  useEffect(()=>{
    controllSidebarCollapsed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  if(route && route.length){
    hasSlider = route[0].hasSlider
  }
  const onHiddenLogoMenu = () => {
    setLogoMenuVisible(false)
  }
  return (
    <Layout className={style.layoutMain} onClick={onHiddenLogoMenu}>
      {hasSlider && <Sider />}
      <Layout>
        {!hasSlider && <Header></Header>}
        <Content />
      </Layout>
    </Layout>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
  };
};
export default connect(mapStateToProps, {setLogoMenuVisible})(Main);
