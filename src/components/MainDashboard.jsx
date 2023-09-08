import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/main.scss";
import EmptyComponent from "./EmptyComponent";
import ChatLog from "./ChatLog";
import MessageHistory from "./MessageHistory";
import send from "../assets/send.png";
import axios from "axios";

const Dashboard = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChatLog, setShowChatLog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      setShowChatLog(true);
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setIsLoading(true);
      const userMessage = {
        id: uuidv4(),
        sender: "user",
        text: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      const requestData = {
        user_prompt: newMessage,
      };

      axios
        .post("https://dummy-api-purvik6062.vercel.app/echo/", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setTimeout(() => {
            const botResponse = {
              id: uuidv4(),
              sender: "bot",
              text: response.data.answer,
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
            setIsLoading(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const handleDeleteMessage = (messageId) => {
    const messageIndex = messages.findIndex(
      (message) => message.id === messageId
    );
    if (messageIndex === -1) {
      return;
    }
    const isUserMessage = messages[messageIndex].sender === "user";
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages.splice(messageIndex, 1);
      if (
        isUserMessage &&
        messageIndex < updatedMessages.length &&
        updatedMessages[messageIndex].sender === "bot"
      ) {
        updatedMessages.splice(messageIndex, 1);
      }
      return updatedMessages;
    });
  };

  const handleClearChatClick = () => {
    const confirmResult = window.confirm(
      "Are you sure you want to start a new chat?"
    );
    if (confirmResult) {
      setMessages([]);
      setShowChatLog(false);
    }
  };

  const isSendButtonDisabled = newMessage === "";

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // const userPrompt = "Your user prompt here";
  // const requestData = { user_prompt: userPrompt };

  // const toggleCovalentAPIs = () => {
  //   console.log("Inside Main component in toggleCovalentAPIs");
  //   setShowCovalentAPIs(!showCovalentAPIs);
  // };

  return (
    <div className="chat-app-container">
      <MessageHistory
        messages={messages}
        handleDeleteMessage={handleDeleteMessage}
        handleClearChatClick={handleClearChatClick}
      />

      <div className="chat-box-main">
        <div className="chat-box">
          {!showChatLog ? (
            <EmptyComponent />
          ) : (
            <ChatLog messages={messages} isLoading={isLoading} />
          )}
          
            <div className="chat-input">
              <div className="prompt-input-area">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isSendButtonDisabled}
                  className="send-btn"
                >
                  <img src={send} style={{ width: "20px" }} alt="Send" />
                </button>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
