/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
import releasePlanIcon from './imgs/releasePlan.png';
import releasePlanActiveIcon from './imgs/releasePlan_active.png';
import clientManager from '@/assets/images/dark/clientManager.png'
import {
  USER_CONSUMER,
  USER_ADMINISTRATOR
} from './auth'
// import releasePlanActiveIcon from './imgs/releasePlan_active.png'
const menuList = [
  {
    title: "发行计划",
    key: 'releasePlan',
    path: "/releasePlan",
    icon: releasePlanIcon,
    activeIcon: releasePlanActiveIcon,
    isBottomMenu: false, // 是否显示在下方的菜单
    roles:[USER_CONSUMER]// menulist中加上权限判断，兼容权限放在后端的情况
  },
  {
    title: "账户管理",
    key: 'userManager',
    path: "/userManager",
    icon: releasePlanIcon,
    activeIcon: releasePlanActiveIcon,
    isBottomMenu: false, // 是否显示在下方的菜单
    roles:[USER_ADMINISTRATOR]
  },
  {
    title: "角色管理",
    key: 'roleManager',
    path: "/roleManager",
    icon: releasePlanIcon,
    activeIcon: releasePlanActiveIcon,
    isBottomMenu: false, // 是否显示在下方的菜单
    roles:[USER_ADMINISTRATOR]
  },
  {
    title: "客户管理",
    key: 'clientManager',
    path: "/clientManager",
    icon: clientManager,
    isBottomMenu: true, // 是否显示在下方的菜单
    roles:[USER_CONSUMER]
  },
  {
    title: "A路由",
    key: 'routeA',//
    path: false,// 表示页面只在左侧显示，点击不会导航
    icon: clientManager,
    isBottomMenu: false, // 是否显示在下方的菜单
    roles:[USER_CONSUMER,USER_ADMINISTRATOR]
  },
  {
    title: "B路由",
    key: 'routeB',//
    path: false,// 表示页面只在左侧显示，点击不会导航
    icon: clientManager,
    isBottomMenu: false, // 是否显示在下方的菜单
    roles:[USER_CONSUMER,USER_ADMINISTRATOR]
  },
  {
    title: "C路由",
    key: 'routeC',//
    path: false,// 表示页面只在左侧显示，点击不会导航
    icon: clientManager,
    isBottomMenu: false, // 是否显示在下方的菜单
    roles:[USER_CONSUMER,USER_ADMINISTRATOR]
  },
];
export default menuList;
