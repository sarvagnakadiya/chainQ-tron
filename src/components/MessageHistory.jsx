import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin6Line  } from "react-icons/ri";
import "../styles/MessageHistory.scss";

const MessageHistory = ({
  sessions,
  currentSession,
  handleCreateNewSession,
  handleSwitchSession,
  handleDeleteSession,
  handleClearChatClick,
}) => {
  return (
    <div className="message-history">
      <div className="action-btns-mh">
        <div
          className="side-menu-newChat-button"
          onClick={handleCreateNewSession}
        >
          + New Chat
        </div>
        <div className="side-menu-button" onClick={handleClearChatClick}>
          <span>
            <AiOutlineDelete />
          </span>
        </div>
      </div>
      <div className="chat-history-list">
        <div className="chat-history-msg-list">
          {sessions.length === 0 ? (
            <div className="no-messages-center" style={{ color: "white" }}>
              No chats yet.
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`message chat-session ${
                  session.id === currentSession ? "active-session" : ""
                }`}
                onClick={() => handleSwitchSession(session.id)}
              >
                {session.name}
                <span
                  className="delete-session"
                  onClick={() => handleDeleteSession(session.id)}
                >
                  <RiDeleteBin6Line />
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageHistory;
