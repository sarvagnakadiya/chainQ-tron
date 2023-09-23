import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/main.scss";
import EmptyComponent from "./EmptyComponent";
import ChatLog from "./ChatLog";
import MessageHistory from "./MessageHistory";
import axios from "axios";
import { TbSend } from "react-icons/tb";
import { getUserChatIds } from "../APIs/apis";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { connected, address } = useWallet();
  const [newMessage, setNewMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState({});
  const [showChatLog, setShowChatLog] = useState(false);
  const [currentChatId, setCurrentChatId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [isSigned, setIsSigned] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const signatureFromCookie = Cookies.get(address);
    console.log("signatureFromCookie", signatureFromCookie);
    if (signatureFromCookie) {
      setToken(signatureFromCookie);
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  }, [address]);

  useEffect(() => {
    console.log("Current Chat ID:", currentChatId);
  }, [currentChatId]);

  const handleCreateNewChat = () => {
    console.log("call handleCreateNewChat");
    setCurrentChatId(null);
  };

  const sendMessage = async () => {
    console.log("call sendMessage");
    console.log("message sent to session:-", currentChatId);
  };

  const isSendButtonDisabled = newMessage === "";

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      // Focus on the input field
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  function hasZeroMessages(sessionId) {
    return messages[sessionId]?.length === 0;
  }

  return (
    <div className="chat-app-container">
      <MessageHistory
        inputRef={inputRef}
        sessions={sessions}
        setCurrentChatId={setCurrentChatId}
        currentChatId={currentChatId}
        handleCreateNewChat={handleCreateNewChat}
      />

      <div className="chat-box-main">
        <div className="chat-box">
          {(currentChatId === null && !showChatLog) ||
          (currentChatId !== null &&
            hasZeroMessages(currentChatId) &&
            !showChatLog) ? (
            <EmptyComponent
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              inputRef={inputRef}
            />
          ) : (
            <ChatLog
              messages={messages[currentChatId] || []}
              isLoading={isLoading}
              setCurrentChatId={setCurrentChatId}
              currentChatId={currentChatId}
            />
          )}

          <div className="chat-input">
            <div className="prompt-input-area">
              <input
                className="prompt-input-field"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Send your query"
                disabled={isLoading}
                ref={inputRef}
              />
              <div>
                {isLoading ? (
                  <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <button
                    onClick={sendMessage}
                    disabled={isSendButtonDisabled}
                    className="send-btn"
                  >
                    <TbSend />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
