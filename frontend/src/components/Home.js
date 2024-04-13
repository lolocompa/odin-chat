import React from "react";
import { useState, useEffect } from "react";
import "../css/home.css";
import { formatISO9075 } from "date-fns";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [all_posts, setall_posts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/get_all_posts")
      .then((response) => response.json())
      .then((data) => {
        setall_posts(data);
      });
  }, []);

  const render_post = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="container_posts">
      {all_posts.map((post) => (
        <div
          key={post._id}
          onClick={() => {
            render_post(post._id);
          }}
          className="post"
        >
          <div className="title_cont">
            <h1>
              {post.title}
            </h1>
          </div>
          <div className="post_fotter">
            <time>{formatISO9075(post.date)}</time>
            <p>by {post.author.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
