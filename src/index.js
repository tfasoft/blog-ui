import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import store from "./redux";
import App from "./App";

import "./App.sass";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
