import React from "react";
import { connect } from 'react-redux';
import logo from "@/assets/images/logo.png";
import style from "./index.module.less";
import { toggleSiderBar, setHasClickSliderBar } from "@/store/actions";
const Logo = (props) => {
  const { sidebarCollapsed, toggleSiderBar, setHasClickSliderBar } = props;
  const onClickSlider = () => {
    setHasClickSliderBar(!sidebarCollapsed ? 1 : 2)// sidebarCollapsed false 展开-> true 收缩 1
    toggleSiderBar(!sidebarCollapsed)

  }
  return (
    <div className={`${style.sidebarLogoContainer} ${!sidebarCollapsed ? style.expandStyle : ''}`}>
      <img src={logo} className={style.sidebarLogo} alt="logo" onClick={onClickSlider} />
      <h1 className={style.sidebarTitle}>债券投标管理</h1>
    </div>
  );
};

export default connect(state => state.app, { toggleSiderBar, setHasClickSliderBar })(Logo);
