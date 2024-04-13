import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import "../css/post.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { app_context } from "./Header";
import { useContext } from "react";

export const Post = () => {
  const { id } = useParams();
  const [post_data, setpost_data] = useState(null);
  const [comments, setcomments] = useState(null);
  const [message, setmessage] = useState("");
  const { is_auth } = useContext(app_context);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/get_one_post/${id}`);
        if (response.ok) {
          const data = await response.json();
          setpost_data(data);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/get_all_comments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setcomments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPostData();
    fetchComments();
  }, [id]);

  const handle_submit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/make_comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error making comment:", error);
    }
  };

  const delete_post = async () => {
    try {
      const response = await fetch(`/api/delete_post/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="single_post_container">
      {post_data && (
        <>
          <div className="author_info">
            <time>{formatISO9075(post_data.date)}</time>
            <p>Written by {post_data.author.username}</p>
          </div>
          <h1 className="post_title">{post_data.title}</h1>
          <div className="post_content">
            <p>{post_data.content}</p>
          </div>
          <div className="comments_section">
            <h4>Comments</h4>
            {comments &&
              comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <h5>{comment.author.username}</h5>
                  <p>{comment.message}</p>
                </div>
              ))}
            {is_auth && (
              <form className="make_comment" onSubmit={handle_submit}>
                <input
                  type="text"
                  name="comment_content"
                  placeholder="comment"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                ></input>
                <button className="btn_submit" type="submit">
                  <i className="bi bi-send"></i>
                </button>
              </form>
            )}
          </div>
          {is_auth === post_data.author.username && (
            <button onClick={delete_post} className="btn delete btn-danger">
              Delete post
            </button>
          )}
        </>
      )}
    </div>
  );
};
