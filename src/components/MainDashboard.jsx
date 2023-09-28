import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/main.scss";
import EmptyComponent from "./EmptyComponent";
import ChatLog from "./ChatLog";
import MessageHistory from "./MessageHistory";
import axios from "axios";
import { TbSend } from "react-icons/tb";
import { getUserChatIds, addChat } from "../APIs/apis";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { connected, address } = useWallet();
  const [newMessage, setNewMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  // const [messages, setMessages] = useState({});
  const [showChatLog, setShowChatLog] = useState(false);
  const [currentChatId, setCurrentChatId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [isSigned, setIsSigned] = useState(null);
  const [token, setToken] = useState(null);
  const [textareaHeight, setTextareaHeight] = useState(25);

  const [chatMessages, setChatMessages] = useState([]);

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
    console.log("called handleCreateNewChat");
    setCurrentChatId(null);
    setShowChatLog(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      setChatMessages({ promptText: newMessage });
    }
    console.log("called sendMessage");
    console.log("message sent to chat:-", currentChatId);
    console.log(newMessage);

    setNewMessage("");

    if (currentChatId) {
      setIsLoading(true);
      try {
        const resData = await addChat(
          address,
          currentChatId,
          newMessage,
          token
        );

        console.log(resData);
        // Update chat messages with the response
        // const responseText = resData.data.executedQuery;

        setIsLoading(false);
      } catch (error) {
        console.error("Error authenticating user:", error);
        setIsLoading(false);
      }
    } else if (currentChatId == null) {
      setIsLoading(true);
      try {
        const resData = await addChat(
          address,
          currentChatId,
          newMessage,
          token
        );

        console.log(resData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error authenticating user:", error);
      }
    }
    setTextareaHeight(25);
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

  useEffect(() => {
    // Ensure the DOM is ready before adding the event listener
    const promptInput = document.querySelector(".prompt-input");

    if (promptInput) {
      promptInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          // You can perform any other actions here, like submitting the form
        }
      });
    }
  }, []);

  useEffect(() => {
    const textarea = inputRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to calculate content height
      const contentHeight = textarea.scrollHeight;
      const maxHeight = 140;

      if (contentHeight > maxHeight) {
        textarea.style.height = maxHeight + "px";
        textarea.style.overflowY = "scroll"; // Enable vertical scrollbar
      } else {
        textarea.style.height = contentHeight + "px";
        textarea.style.overflowY = "hidden"; // Hide vertical scrollbar
      }
    }
  }, [newMessage]);

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
          {/* {(currentChatId === null && !showChatLog) ||
          (currentChatId !== null &&
            hasZeroMessages(currentChatId) &&
            !showChatLog) ? ( */}
          {currentChatId === null && !showChatLog ? (
            <EmptyComponent
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              inputRef={inputRef}
            />
          ) : (
            <ChatLog
              setShowChatLog={setShowChatLog}
              showChatLog={showChatLog}
              isLoading={isLoading}
              setCurrentChatId={setCurrentChatId}
              currentChatId={currentChatId}
              messages={chatMessages}
            />
          )}

          {/* <div className="chat-input"> */}
          <div className="prompt-input-area">
            {/* <input
                className="prompt-input-field"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Send your query"
                disabled={isLoading}
                ref={inputRef}
              /> */}
            {/* <div className="prompt-container"> */}
            <textarea
              className="prompt-input"
              // style={{ minHeight: textareaHeight + "px" }}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Send your query"
              disabled={isLoading}
              ref={inputRef}
            ></textarea>
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
