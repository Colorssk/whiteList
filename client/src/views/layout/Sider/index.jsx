import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Logo from "./Logo";
import Menu from "./Menu";
import SliderFooter from './SliderFooter'
import SliderMenu from './SliderMenu'
const { Sider } = Layout;

const LayoutSider = (props) => {
  const { sidebarCollapsed, showLoginMenu } = props;
  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{ zIndex: "10" }}
    >
      <Logo />
      <Menu />
      <SliderFooter />
      {showLoginMenu && <SliderMenu />}

    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
  };
};
export default connect(mapStateToProps)(LayoutSider);
