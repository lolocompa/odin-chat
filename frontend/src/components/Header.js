import React from "react";
import "../css/header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const app_context = createContext();

export const Header = () => {
  const navigate = useNavigate();
  const [is_auth, setis_auth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/is_auth");
        if (response.ok) {
          const data = await response.json();
          setis_auth(data.username);
        } else {
          setis_auth(false);
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setis_auth(false);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
      });
      if (response.ok) {
        setis_auth(false); // Update state to indicate user is no longer authenticated
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <app_context.Provider
      value={{
        is_auth
      }}
    >
      <>
        <div className="nav">
          <div className="conteiner_home">
            <Link className="link" to="/">
              Home
            </Link>
          </div>
          <div className="container_auth">
            {is_auth ? (
              // If authenticated, display user information or logout option
              <>
                <Link className="link" to="/write">
                  Create
                </Link>
                <button className="link" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              // If not authenticated, display sign-up and login links
              <>
                <Link className="link" to="/sign-up">
                  Sign-up
                </Link>
                <Link className="link" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </>
    </app_context.Provider>
  );
};
