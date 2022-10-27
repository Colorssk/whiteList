import React, { Component } from 'react';
import { Provider } from "react-redux";
import { StoreContext } from 'redux-react-hook'
import { ConfigProvider } from "antd";
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from "./store";
import zhCN from "antd/es/locale/zh_CN";
import Router from "./router";

class App extends Component {
  
  render() { 
    return (
      <ConfigProvider locale={zhCN}>
        <StoreContext.Provider value={store}>
          <Provider store={store}>
            <PersistGate persistor={persistor} >
              <Router />
            </PersistGate>
          </Provider>
        </StoreContext.Provider>
      </ConfigProvider>
    );
  }
}
 
export default App;
