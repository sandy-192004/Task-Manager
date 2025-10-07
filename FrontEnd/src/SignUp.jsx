import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form className="mt-3">
        <strong>Name</strong>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
        />
        <strong>Email Address</strong>
        <input
        type = "email"
        className="form-control"
        placeholder="Enter Email Address"/>
        <strong>Password</strong>
        <input
          type="password"
          className="form-control"
            placeholder="Enter Password"
          autoComplete="new-password"
        />

      </form>
      <button className="btn btn-primary mt-3">Sign Up</button>
    </div>
  );
};

export default SignUp;
