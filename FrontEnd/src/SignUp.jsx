import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";  


const SignUp = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();


const submitHandle = (e) => {
  e.preventDefault();
  try{
axios.post("http://localhost:4000/",{username,email,password});
  alert("registration successful");
  navigate("/login");
  }
  catch(error){
    console.log(error.message)
  }
}

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form className="mt-3">
        <strong>Name</strong>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          value = {username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <strong>Email Address</strong>
        <input
        type = "email"
        className="form-control"
        placeholder="Enter Email Address"
        value ={email}
        onChange = {(e) => setEmail(e.target.value)}/>
        <strong>Password</strong>
        <input
          type="password"
          className="form-control"
            placeholder="Enter Password"
          autoComplete="new-password"
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
        />

      </form>
      <button className="btn btn-primary mt-3"onSubmit={submitHandle}>Sign Up</button>
    </div>
  );
};

export default SignUp;
