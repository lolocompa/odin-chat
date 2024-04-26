import React, { useEffect, useState } from "react";
import "../css/card.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";


const Card = (props) => {
  const [latestMessage, setLatestMessage] = useState({
    content: "no messages yet",
    timestamp: "",
  });
  const navigate = useNavigate();



  useEffect(() => {
    // Fetch the conversation data for the friend
    fetch(`/api/get_conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: props.name }), // Sending the name in the body
    })
      .then((response) => {
        if (response.status === 500) {
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (
          data &&
          data.conversation &&
          data.conversation.messages.length > 0
        ) {
          const latest =
            data.conversation.messages[data.conversation.messages.length - 1];
          setLatestMessage({
            content: latest.content,
            timestamp: latest.timestamp,
          });
        } else {
          setLatestMessage({
            content: "no messages yet",
            timestamp: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  }, [props.name, props.change]);

  return (
    <div className="card_container" onClick={props.onClick}>
      <img className="profile_pic" src={props.image} alt="Avatar" />
      <div className="user_info">
        <div className="top_info">
          <h4>{props.name}</h4>
          <time>
            {latestMessage.timestamp
              ? format(new Date(latestMessage.timestamp), "HH:mm")
              : ""}
          </time>
        </div>
        <div className="bottom_info">
          <h4>{latestMessage.content}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
