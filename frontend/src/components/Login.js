import React from "react";
import "../css/login.css";

const Login = () => {
  return (
    <div className="container">
      <form method="POST" action="/api/login" className="login_box">
        <h1>Messaging app</h1>
        <p>Welcome back!</p>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input name="username" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
        <a href="/register">dont have an account?</a>
      </form>
    </div>
  );
};

export default Login;
