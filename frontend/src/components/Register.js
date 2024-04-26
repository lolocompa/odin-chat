import React from "react";
import "../css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      console.log(response.status);
      if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="container">
      <form method="POST" onSubmit={handleSubmit} className="login_box">
        <h1>Messaging app</h1>
        <p>Welcome back!</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input_container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default Login;
