import React, { useState } from "react";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response.status)
      if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else if (response.status === 200) {
        navigate("/login")
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <form className="signup_form" onSubmit={handleSubmit}>
        <h1>Sign up for an account</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form_container">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};
