import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import rootSaga from './saga/RootSaga';
import rootReducer from './reducres';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['subjectsConfig']
}




export default function configureStore() {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  // initSagas(sagaMiddleware);
  return {store, persistor};
  }

