import * as types from "../action-types";
export const toggleSiderBar = (val) => dispatch => {
  dispatch({
    type: types.APP_TOGGLE_SIDEBAR,
    sidebarCollapsed: val
  });
}
export const toggleSiderBarAction =  (val) => {
  return ({
    type: types.APP_TOGGLE_SIDEBAR,
    sidebarCollapsed: val
  });
}

export const toggleSettingPanel = () => {
  return {
    type: types.APP_TOGGLE_SETTINGPANEL
  };
};

export const setLogoMenuVisible = (val) => dispatch => {
  dispatch({
    type: types.App_SHOW_LOGINMENU,
    showLoginMenu: val
  })
};

export const setHasClickSliderBar = (val) => dispatch => {
  dispatch({
    type: types.App_HAS_CLICKED_SLIDERBAR,
    hasEverClickSliderBar: val
  })
};

export const setHasClickSliderBarAction = (val) =>  {
  return ({
    type: types.App_HAS_CLICKED_SLIDERBAR,
    hasEverClickSliderBar: val
  })
};