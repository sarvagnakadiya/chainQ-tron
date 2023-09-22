import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../styles/MessageHistory.scss";
import { getUserChatIds, deleteChat, deleteUserData } from "../APIs/apis";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie";

const MessageHistory = ({
  sessions,
  currentChatId,
  handleCreateNewChat,
  handleSwitchSession,
}) => {
  const [isSigned, setIsSigned] = useState(null);
  const [chatTitleList, setChatTitleList] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [token, setToken] = useState(null);
  const { connected, address } = useWallet();

  useEffect(() => {
    const signatureFromCookie = Cookies.get(address); // Use the address as the key
    console.log("signatureFromCookie", signatureFromCookie);
    if (signatureFromCookie) {
      setToken(signatureFromCookie);
      setIsSigned(true);

      // Check if there is an authenticated user and get their chat IDs
      if (connected) {
        fetchUserChatIds(address, token);
      }
    } else {
      setIsSigned(false);
    }
  }, [address, connected, token]);

  const fetchUserChatIds = async () => {
    try {
      if (token) {
        // Check if the token is defined
        const response = await getUserChatIds(address, token);
        setApiResponse(response.data.chatData);
      }
    } catch (error) {
      console.error("Error fetching user's chat IDs:", error);
    }
  };

  const handleDeleteChat = async (event, chatID) => {
    const deleteChatConfirm = window.confirm("Click ok to continue.");
    if (deleteChatConfirm) {
      event.stopPropagation();
      if (connected) {
        try {
          const response = await deleteChat(chatID, token);
          console.log(response);
          setApiResponse((prevChats) =>
            prevChats.filter((chat) => chat.chatId !== chatID)
          );
        } catch (error) {
          console.error("Error deleting chat:", error);
        }
      }
    }
  };

  const handleDeleteUserData = async () => {
    if (connected) {
      const confirmDelete = window.confirm("It will delete all your chats.");
      if (confirmDelete) {
        try {
          const response = await deleteUserData(address, token);
          console.log(response);
        } catch (error) {
          console.error("Error deleting user data:", error);
        }
      }
    }
  };

  // console.log(apiResponse);
  // console.log(chatTitleList)
  return (
    <div className="message-history">
      <div className="action-btns-mh">
        <div className="side-menu-newChat-button" onClick={handleCreateNewChat}>
          + New Chat
        </div>
        <div className="side-menu-button" onClick={handleDeleteUserData}>
          <span>
            <AiOutlineDelete />
          </span>
        </div>
      </div>
      <div className="chat-history-list">
        <div className="chat-history-msg-list">
          {apiResponse.length === 0 ? (
            <div className="no-messages-center" style={{ color: "white" }}>
              No chats yet.
            </div>
          ) : (
            apiResponse.map((chat) => (
              <div
                key={chat.chatId}
                className={`message chat-session
                 ${chat.chatId === currentChatId ? "active-session" : ""}
                 `}
                onClick={() => handleSwitchSession(chat.chatId)}
              >
                <div className="session-main-title">{chat.chatTitle}</div>
                <div
                  className="delete-session"
                  onClick={(event) => handleDeleteChat(event, chat.chatId)}
                  // onClick={() => handleDeleteChat(chat.chatId)}
                  // onClick={(event) => handleDeleteSession(event, chat.chatId)}
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
