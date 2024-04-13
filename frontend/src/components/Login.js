import React from "react";
import "../css/signup.css";

export const Login = () => {

  return (
    <div>
      <form className="signup_form" action="/api/login" method="POST">
        <h1>Log in to your account</h1>
        <div className="form_container">
          <label htmlFor="username">Username</label>
          <input name="username" placeholder="username" type="text" />
          <label htmlFor="password">Password</label>
          <input placeholder="Password" name="password" type="password" />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
