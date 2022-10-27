/* eslint-disable no-unused-vars */
import React from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import { getMenuItemInMenuListByProperty } from "@/utils";
import routeList from "@/config/routeMap";
import menuList from "@/config/menuConfig";
//whiteList
import { whiteList } from "@/config/auth";
// style
import style from './index.module.less'

const { Content } = Layout;

const getPageTitle = (menuList, pathname) => {
  let title = "平安养老";
  let item = getMenuItemInMenuListByProperty(menuList, "path", pathname);
  if (item) {
    title = `${item.title} - 平安养老`;
  }
  return title;
};

const LayoutContent = (props) => {
  const { role, location } = props;
  const { pathname } = location;
  const whiteMainRoute = (role && whiteList[role]) ? whiteList[role].mainRoute[0] : null
  const handleFilter = (route) => {
    const validRouters = (role && whiteList[role]) ? whiteList[role].routers : null
    if (!validRouters) {
      return 'error'
    } else {
      // 过滤没有权限的页面
      if (route.key) {
        return validRouters.includes(route.key)
      } else {
        return 'error'
      }
    }

  };
  const routesRender = () => {
    return routeList.map((route) => {
      return (
        handleFilter(route) && (
          <Route
            component={route.component}
            key={route.path}
            path={route.path}
          />
        )
      );
    })
  }
  return (
    <DocumentTitle title={getPageTitle(menuList, pathname)}>
      {/* <Content style={{ height: "calc(100% - 100px)" }}> */}
      <Content id='layoutContent' className={style.layoutContent}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={500}
            classNames="fade"
            exit={false}
          >
            <Switch location={location}>
              <Redirect exact from="/" to={whiteMainRoute ? whiteMainRoute : "/login"} />
              {routesRender()}
              <Redirect to="/error/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  );
};

export default connect((state) => state.user)(withRouter(LayoutContent));
