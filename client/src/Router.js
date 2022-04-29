import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/signup"  element={<Signup /> } />
      </Routes>
    </BrowserRouter>
  );
};


export default Router;
