import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
