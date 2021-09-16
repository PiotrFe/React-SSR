// Startup point for the client side application
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import axios from "axios";
import Routes from "./Routes";
import reducers from "./reducers";

const axiosInstance = axios.create({
  baseURL: "/api",
}); // custom action instance

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
  // with extra argument allows to pass an extra argument to thunk action calls;
  // this extra argument gets passed as the 3rd argument to dispatch calls (dispatch, getState, extraArgument)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
