import React from "react";
import "../css/write.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app_context } from "./Header";
import { useContext } from "react";

export const Write = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const navigate = useNavigate();
  const { is_auth } = useContext(app_context);

  const handle_submit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/create_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      {is_auth ? (
        <form onSubmit={handle_submit} className="conteiner_create">
          <h1 className="create_page_title">Create Your Own Blog Below!</h1>
          <label className="create_label" for="title">
            Title
          </label>
          <input
            className="title_input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          ></input>
          <label className="create_label" for="content">
            Content
          </label>
          <textarea
            className="content_input"
            cols={65}
            rows={30}
            name="textarea"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          ></textarea>
          <button className="submit_btn" type="submit">
            Create
          </button>
        </form>
      ) : (
        <h1>Please log in to create a blog.</h1>
      )}
    </>
  );
};
