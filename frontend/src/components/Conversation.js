import React from "react";
import { useState, useEffect } from "react";
import { formatISO9075 } from "date-fns";

const Conversation = (props) => {
  const [all_messages, setall_messages] = useState([]);
  const [me, setme] = useState("");

  useEffect(() => {
    if (props.props && props.props.conversation) {
      setall_messages(props.props.conversation.messages);
      setme(props.props.me);
    } else {
      setall_messages([]);
    }
  }, [props.props]);

  return (
    <div className="conversation_container">
      {/* Map through all_messages and render each message */}
      {all_messages.map((message) => (
        <div
          key={message._id}
          className={`card${message.sender === me ? "1" : "2"}`}
        >
          <div className="date">
            <time>{formatISO9075(message.timestamp)}</time>
          </div>
          <h2 className="annonymus_tag">{message.sender}</h2>
          {message.sender === me ? (
            <div className="message right">
              <div className="text_container">
                <h1>{message.content}</h1>
              </div>
              <img
                src="https://avatarfiles.alphacoders.com/375/375473.jpeg"
                alt=""
                className="avatar"
              ></img>
            </div>
          ) : (
            <div class="message left">
              <img src={props.pic} alt="" class="avatar"></img>
              <h1>{message.content}</h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
