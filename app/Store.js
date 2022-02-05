import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';

import rootSaga from './saga/RootSaga';
import rootReducer from './reducres';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga),
  };
}
