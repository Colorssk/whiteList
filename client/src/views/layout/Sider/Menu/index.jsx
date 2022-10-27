import React, { Component } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import menuList from "@/config/menuConfig";
import style from "./index.module.less";
//whiteList
import { whiteList } from "@/config/auth";
const SubMenu = Menu.SubMenu;
// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
class Meun extends Component {
  state = {
    menuTreeNode: null,
    openKey: [],
    currentKey: '',
    whiteMainRoute: '/'
  };
  // filterMenuItem用来根据配置信息筛选可以显示的菜单项
  filterMenuItem = (item) => {
    const { roles } = item;
    const { user: { role } } = this.props;
    if (roles.includes(role)) {
      return true;
    } else if (item.children) {
      // 如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => roles.includes(child.role));
    }
    return false;
  };

  // 菜单渲染
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname;
    const { currentKey, whiteMainRoute } = this.state
    return menuList.reduce((pre, item) => {
      console.log('menu切换检测,', path === item.path, item.path, path)
      if (this.filterMenuItem(item)) {
        if (!item.children) {
          console.log('path', path, item.path)
          pre.push(
            <Menu.Item key={item.path?item.path:item.key}>
              {/* mvp项目中取消路由导航功能 */}
              {
                item.path?(
                  <Link to={item.path}>
                    {item.icon ? <img alt="menu logo" style={{ marginLeft: '-5px' }} className={`anticon ${style.menuLogo}`} src={path === item.path || (path === '/' && whiteMainRoute === item.path) || currentKey === item.path ? item.activeIcon : item.icon} /> : null}
                    <span style={{ 'fontSize': '12px' }}>{item.title}</span>
                  </Link>
                ):(
                  <>
                    {item.icon ? <img alt="menu logo" style={{ marginLeft: '-5px' }} className={`anticon ${style.menuLogo}`} src={path === item.path || (path === '/' && whiteMainRoute === item.path) || currentKey === item.path ? item.activeIcon : item.icon} /> : null}
                    <span style={{ 'fontSize': '12px' }}>{item.title}</span>
                  </>
                )
              }
              
            </Menu.Item>
          );
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(
            (cItem) => path.indexOf(cItem.path) === 0
          );
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.setState((state) => ({
              openKey: [...state.openKey, item.path],
            }));
          }

          // 向pre添加<SubMenu>
          pre.push(
            <SubMenu
              key={item.path}
              title={
                <span>
                  {item.icon ? <img alt="menu logo" className={`anticon ${style.menuLogo}`} src={item.icon} /> : null}
                  <span style={{ 'fontSize': '12px' }}>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }

      return pre;
    }, []);
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const _items = reorder(
      this.state.menuTreeNode,
      result.source.index,
      result.destination.index
    );
    this.setState({
      menuTreeNode: _items,
    });
  };

  componentWillMount() {
    this.setState({
      whiteMainRoute: (this.props && this.props.user.role && whiteList[this.props.user.role]) ? whiteList[this.props.user.role].mainRoute[0] : null
    })
    // 过滤上方菜单
    this.updateMenu()
  }
  //更新菜单
  updateMenu = ()=>{
    const topMenu = menuList.filter(menu => !menu['isBottomMenu'])
    const menuTreeNode = this.getMenuNodes(topMenu);
    this.setState({
      menuTreeNode,
    });
  }
  handleMenuSelect = ({ key }) => {
    this.setState(()=>(
      {
        currentKey: key
      }
    ),()=>{
      // 过滤上方菜单
      this.updateMenu()
    })
   
   
  }
  componentDidUpdate(props){
    if(props.location.pathname==='/'){
      this.handleMenuSelect({key: this.state.whiteMainRoute})
    }
  }
  render() {
    const path = this.props.location.pathname;
    const openKey = this.state.openKey;
    return (
      <div className={style.sidebarMenuContainer}>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.menuTreeNode.map((item, index) => (
                    <Draggable
                      key={item.key}
                      draggableId={item.key}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Menu
                            mode="inline"
                            theme="light"
                            onSelect={this.handleMenuSelect}
                            selectedKeys={[path]}
                            defaultOpenKeys={openKey}
                          >
                            {item}
                          </Menu>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Scrollbars>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user, app: state.app }))(withRouter(Meun));
