import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import { createWrapper } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const logger = createLogger({ collapsed: true, diff: true });

const makeConfiguredStore = (reducer, sagas) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const store = createStore(reducer, applyMiddleware(...middlewares));

  sagaMiddleware.run(sagas);

  return store;
};

const makeStore = () => makeConfiguredStore(rootReducer, rootSaga);

const wrapper = createWrapper(makeStore);

export default wrapper;
