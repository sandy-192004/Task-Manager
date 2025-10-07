import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div className= "container mt-5">
        <h2>Login</h2>
        <form className = "mt-3">
            <strong>Email Address</strong>
            <input
            type = "email"
            className = "form-control"
            placeholder='Enter Email Address' />
            <strong>Password</strong>
            <input type ="password"
            className = "form-control"
            placeholder="Enter Password"></input>
            </form>
            <button className='btn btn-primary mt-3'>Login</button>     
    </div>
  )
}

export default Login
