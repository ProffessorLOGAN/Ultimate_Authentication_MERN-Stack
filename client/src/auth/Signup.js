import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "submit",
  });

  const {name, email,password,buttonText} = values;

  const handleChange = (name) => (event) => {

  }

  const clickSubmit = event => {

  }

  const signupForm = () => (
    <from>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
      </div>

      <div className="form-group">
        <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
      </div>
    </from>
  )

  return (
    <Layout>
     <div className="col-d-6 offset-md-3">
     <ToastContainer />
      <h1 className="p-5 text-center">Signup</h1>
      {signupForm()}
     </div>
    </Layout>
  );
};

export default Signup;
