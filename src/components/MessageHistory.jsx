import { useState, useEffect } from "react";
import del from "../assets/delete.png";
import cov from "../assets/covalent-logo.jpg";
import rightUp from "../assets/right-up.png";
import leftArrow from "../assets/left-arrow.png";

const MessageHistory = ({
  messages,
  handleDeleteMessage,
  handleClearChatClick,
}) => {
  const filteredMessages = messages.filter(
    (message) => message.sender !== "bot"
  );

  return (
    <>
      <div className="message-history">
        <div className="side-menu-newChat-button">
          <span>+</span> New Chat
        </div>
        <div className="side-menu-button" onClick={handleClearChatClick}>
          <span>Clear All Chats</span>
        </div>
        <div className="chat-history-list" style={{ margin: "40px 0px" }}>
          {filteredMessages.length === 0 ? (
            <div className="no-messages-center" style={{ color: "white" }}>
              No prompts yet.
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div key={message.id} className="message">
                <span className="msg-span">{message.text}</span>
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  <img src={del} style={{ width: "20px" }} alt="Delete" />
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MessageHistory;
