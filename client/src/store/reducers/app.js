import * as types from "../action-types";
const initState = {
  sidebarCollapsed: false,
  settingPanelVisible: false,
  showLoginMenu:  false,
  hasEverClickSliderBar: 0,//是否以前点击过展开收缩 0 初始化 1 点击过并且当前状态收,2 点击过并且当前状态态展开
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.APP_TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      };
    case types.APP_TOGGLE_SETTINGPANEL:
      return {
        ...state,
        settingPanelVisible: !state.settingPanelVisible,
      };
    case types.App_SHOW_LOGINMENU:
      return {
        ...state,
        showLoginMenu: action.showLoginMenu,
      };
    case types.App_HAS_CLICKED_SLIDERBAR:
      return {
        ...state,
        hasEverClickSliderBar: action.hasEverClickSliderBar,
      }
    default:
      return state;
  }
}
