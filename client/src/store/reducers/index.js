import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'; 
import user from "./user";
import app from "./app";


const config = {
  key: 'admin-buy',
  storage,
};

export default persistCombineReducers(config, {
  user,
  app,
});
