import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import store from "../src/Components/Store/store" // Import your Redux store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap your App with Provider and pass the store */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
