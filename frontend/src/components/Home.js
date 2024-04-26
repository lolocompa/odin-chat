import React from "react";
import "../css/home.css";
import Card from "./Card";
import Conversation from "./Conversation";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [all_friends, setall_friends] = useState([]);
  const [conversation, setconversation] = useState([]);
  const [header_name, setheader_name] = useState("chat with someone");
  const [is_chat_opened, setis_chat_opened] = useState(false);
  const [type_message, settype_message] = useState("");
  const [change, setchange] = useState(0);
  const [opem_pop, setopen_pop] = useState(false);
  const [pop_add, setpop_add] = useState(false);
  const [friend_add, setfriend_add] = useState("");
  const [current_pic, setcurrent_pic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/is_auth");
        if (response.status === 400) {
          navigate("/login"); // Navigate to login if not authenticated
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        navigate("/login"); // Navigate to login in case of error
      }
    };

    fetchData(); // Call fetchData immediately when the component mounts
  }, [navigate]);

  useEffect(() => {
    fetch("/api/get_all_friends")
      .then((response) => response.json())
      .then((data) => {
        setall_friends(data);
      });
  }, []);

  const getConversation = (name, image) => {
    setis_chat_opened(true);
    setheader_name(name);
    setcurrent_pic(image);

    fetch(`/api/get_conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }), // Sending the name in the body
    })
      .then((response) => {
        if (response.status === 404) {
          setconversation([]);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setconversation(data);
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  };

  const send_message = async (event) => {
    await fetch("/api/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ header_name, type_message }),
    });

    settype_message("");
    setchange((prevChange) => prevChange + 1);

    fetch(`/api/get_conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: header_name }), // Sending the name in the body
    })
      .then((response) => response.json())
      .then((data) => {
        setconversation(data);
      })
      .catch((error) => {
        console.error("Error fetching conversation:", error);
      });
  };

  const add_friend = async () => {
    setpop_add(false);
    setfriend_add("");

    await fetch("/api/add_friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friend_add }),
    }).then(window.location.reload(true));

    // Update the list of friends after adding a new friend
  };

  const delete_friend = async () => {
    await fetch("/api/delete_friend", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ header_name }),
    });

    fetch("/api/get_all_friends")
      .then((response) => response.json())
      .then((data) => {
        setall_friends(data);
      });

    setopen_pop(false);
    setconversation([]);
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="homepage">
      <div className="aside">
        <div className="aside1">
          <div className="top_icons">
            <i className="bi bi-chat-dots"></i>
            <i onClick={logout} class="bi bi-box-arrow-right"></i>
          </div>
          <div className="bottom_icons">
            <img
              className="my_profile"
              src="https://avatarfiles.alphacoders.com/375/375473.jpeg"
              alt=""
            />
            <div className="online"></div>
          </div>
        </div>
        <div className="aside2">
          <div className="aside_header">
            <h1>Chats</h1>
            <i onClick={() => setpop_add(true)} className="bi bi-plus-lg"></i>
          </div>
          {all_friends.map((friend) => (
            <Card
              key={friend._id}
              name={friend.name}
              image={friend.image}
              onClick={() => getConversation(friend.name, friend.image)}
              change={change}
            />
          ))}
          {pop_add && (
            <div className="card_container">
              <img
                className="profile_pic"
                src="https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
                alt=""
              />
              <div className="user_info">
                <div className="top_info2">
                  <input
                    onChange={(e) => setfriend_add(e.target.value)}
                    value={friend_add}
                    className="add_input"
                    type="text"
                  />
                  <button onClick={add_friend} className="add_button">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                  <time></time>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="conversation">
        {is_chat_opened ? (
          <>
            <div className="header">
              <img src={current_pic} alt="" className="profile_pic" />
              <div className="header_info">
                <div>
                  <h4>{header_name}</h4>
                  <h4>offline</h4>
                </div>
                <div className="menu_container">
                  <i
                    onClick={() => setopen_pop(true)}
                    className="bi bi-list"
                  ></i>
                </div>
              </div>
            </div>
            <Conversation props={conversation} pic = {current_pic} />
            <div className="input_cont">
              <input
                type="text"
                maxlength="40"
                placeholder="Write your message"
                name="text"
                className="type_message"
                value={type_message}
                onChange={(e) => settype_message(e.target.value)}
              />
              <button onClick={send_message} type="submit">
                <i className="bi bi-send"></i>{" "}
              </button>
            </div>
          </>
        ) : (
          <div className="chat-closed">
            <h3>Select a friend to start chatting</h3>
          </div>
        )}
      </div>
      {opem_pop && (
        <div className="block">
          <div className="pop_up">
            <div className="cross_container">
              <i onClick={() => setopen_pop(false)} className="bi bi-x"></i>
            </div>
            <div className="cont">
              <img className="my_profile" src={current_pic} alt="" />
            </div>
            <h2>{header_name}</h2>
            <button onClick={delete_friend} className="delete_chat">
              Delete chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
