import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
import {
  USER_CONSUMER,
  USER_ADMINISTRATOR
} from './auth'
//普通用户账号----
const ReleasePlan = Loadable({
  loader: () => import( /*webpackChunkName:'ReleasePlan'*/ '@/views/releasePlan'),
  loading: Loading
});
const Error404 = Loadable({
  loader: () => import( /*webpackChunkName:'Error404'*/ '@/views/error/404'),
  loading: Loading
});
const WorkFlow = Loadable({
  loader: () => import( /*webpackChunkName:'WorkFlow'*/ '@/views/workFlow'),
  loading: Loading
});
const ClientManager = Loadable({
  loader: () => import( /*webpackChunkName:'ClientManager'*/ '@/views/clientManager'),
  loading: Loading
});

//管理员账号----

// 用户管理
const Coumsers = Loadable({
  loader: () => import( /*webpackChunkName:'Coumsers'*/ '@/views/coumsers'),
  loading: Loading
});
//角色管理
const RoleManager = Loadable({
  loader: () => import( /*webpackChunkName:'RoleManager'*/ '@/views/roleManager'),
  loading: Loading
});
//角


export default [{
    path: "/releasePlan",
    key: 'releasePlan',
    component: ReleasePlan,
    hasSlider: true,
    roles: [USER_CONSUMER]
  },
  {
    path: "/userManager",
    key: 'userManager',
    component: Coumsers,
    hasSlider: true,
    roles: [USER_ADMINISTRATOR]
  },
  {
    path: "/roleManager",
    key: 'roleManager',
    component: RoleManager,
    hasSlider: true,
    roles: [USER_ADMINISTRATOR]
  },
  {
    path: "/error/404",
    key: 'error',
    hasSlider: false,
    component: Error404
  },
  {
    path: "/workFlow",
    key: 'workFlow',
    component: WorkFlow,
    hasSlider: false,
    roles: [USER_CONSUMER]// 无从属的二级页面都要加上roles字段
  },
  {
    path: "/clientManager",
    key: 'clientManager',
    component: ClientManager,
    hasSlider: false,
    roles: [USER_CONSUMER]
  }
];