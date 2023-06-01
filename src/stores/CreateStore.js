import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';

export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();

  middleware.push(sagaMiddleware);
  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(rootReducer, compose(...enhancers));
  const persistor = persistStore(store);

  // Kick off the sagas
  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};
