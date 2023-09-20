import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../styles/MessageHistory.scss";

const MessageHistory = ({
  sessions,
  currentSession,
  handleCreateNewSession,
  handleSwitchSession,
  handleDeleteSession,
  handleClearChatClick,
}) => {



  useEffect(() => {
    // Check if there is an authenticated user and get their chat IDs
    if (connected) {
      // console.log(connected)
      getUserChatIds(address, token)
        .then((response) => {
          // console.log(address, token)
          // console.log(response)
          const chatData = response.data.chatData;
          // console.log(chatData)
          // Create a mapping of chat IDs to chat titles
          const chatTitleMap = {};
          chatData.forEach((chat) => {
            chatTitleMap[chat.chatId] = chat.chatTitle;
          });
          // Update the sessions with chat titles
          const updatedSessions = sessions.map((session) => ({
            ...session,
            name: chatTitleMap[session.id] || session.name,
          }));
          setSessions(updatedSessions);
        })
        .catch((error) => {
          console.error("Error fetching user's chat IDs:", error);
        });
    }
  }, [address, sessions]);

  
  console.log(sessions)
  // Sort sessions by creation date in descending order
  const sortedSessions = sessions
    .slice() // Create a copy of the sessions array to avoid mutating the original
    .sort((a, b) => {
      // Compare the creation date of sessions a and b
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

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
          {sortedSessions.length === 0 ? (
            <div className="no-messages-center" style={{ color: "white" }}>
              No chats yet.
            </div>
          ) : (
            sortedSessions.map((session) => (
              <div
                key={session.id}
                className={`message chat-session ${
                  session.id === currentSession ? "active-session" : ""
                }`}
                onClick={() => handleSwitchSession(session.id)}
              >
                <div className="session-main-title">{session.name}</div>
                <div
                  className="delete-session"
                  // onClick={() => handleDeleteSession(session.id)}
                  onClick={(event) => handleDeleteSession(event, session.id)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageHistory;
