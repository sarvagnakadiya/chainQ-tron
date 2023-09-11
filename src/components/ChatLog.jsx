import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/favicon.png";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";
import "../styles/ChatLog.scss";

const ChatLog = ({ messages }) => {
  console.log("this is from ChatLog", messages);

  const responseContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the latest response when it is received
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="chat-log-main">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/">
          <img className="chat-log-title" src={logo} alt="Chat Log Title" />
        </Link>
      </div>
      <div className="chat-log">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-msg-${
              message.sender === "user" ? "user" : "response"
            }`}
          >
            <div className="chat-msg-center">
              <div
                className={`chat-avatar-${
                  message.sender === "user" ? "user" : "response"
                }`}
              >
                {message.sender === "user" ? (
                  /* User avatar image */
                  <img src={user} alt="User Avatar" style={{ width: "30px" }} />
                ) : (
                  /* Bot avatar image */
                  <img src={icon} alt="Bot Avatar" style={{ width: "30px" }} />
                )}
              </div>
              <div className={`chat-msg-${message.sender}`}>{message.text}</div>
            </div>
          </div>
        ))}
        <div ref={responseContainerRef}></div>{" "}
        {/* This element is used for focusing on the latest response */}
      </div>
    </div>
  );
};

export default ChatLog;
