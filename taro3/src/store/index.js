// store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import { init } from "@rematch/core";
import models from "./store";

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(
    require("redux-logger").createLogger({
      collapsed: true
    })
  );
}

const enhancer = compose(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

const store = init({
  models,
  redux: {
    enhancers: [enhancer],
    devtoolOptions:
      typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : ""
  }
});

export default store;
