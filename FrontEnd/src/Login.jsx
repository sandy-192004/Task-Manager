import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/app/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className= "container mt-5">
        <h2>Login</h2>
        <form className = "mt-3">
            <strong>Email Address</strong>
            <input
            type = "email"
            className = "form-control"
            placeholder='Enter Email Address' 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}/>
            <strong>Password</strong>
            <input type ="password"
            className = "form-control"
            placeholder="Enter Password"
            value ={password}
            onChange={(e) => setPassword(e.target.value)}></input>
            </form>
            <button className='btn btn-primary mt-3' onSubmit={submitHandle}>Login</button>     
    </div>
  )
}

export default Login
