import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './reducers'
import {
    persistStore
  } from 'redux-persist'

const store = createStore(reducer, applyMiddleware(reduxThunk));
const persistor = persistStore(store)
export  {
    store,
    persistor
}