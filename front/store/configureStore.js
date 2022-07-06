import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import reducer from '../reducers'
// import rootSaga from '../saga/index'

import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

const configtureStore = () => {
  // const sagaMiddleware = createSagaMiddleware()
  // const middlewares = [sagaMiddleware]
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware())
      : composeWithDevTools(applyMiddleware())

  const store = createStore(reducer, enhancer)
  // store.sagaTask = sagaMiddleware.run(rootSaga)
  return store;
}

const wrapper = createWrapper(configtureStore, {
  debug: process.env.NODE_ENV === "development",
})

export default wrapper;