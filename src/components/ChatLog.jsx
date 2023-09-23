import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/favicon.png";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";
import "../styles/ChatLog.scss";
import EmptyComponent from "./EmptyComponent";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie";
import { PiCopySimpleLight } from "react-icons/pi";
import { BiCheck } from "react-icons/bi";
import { BounceLoader } from "react-spinners";
import { getUserChatIds, getChatPromptsAndResponses } from "../APIs/apis";

const ChatLog = ({ messages, isLoading, currentChatId }) => {
  const [copiedMessage, setCopiedMessage] = useState(null);
  const responseContainerRef = useRef(null);
  const [isSigned, setIsSigned] = useState(null);
  const [token, setToken] = useState(null);
  const { connected, address } = useWallet();
  const [apiResponse, setApiResponse] = useState([]);
  const [chatData, setChatData] = useState([]);

  console.log(messages);
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

  const fetchChatPromptsAndResponses = async () => {
    try {
      if (token) {
        const response = await getChatPromptsAndResponses(currentChatId, token);
        console.log("response:", response);
        setChatData(response.data.promptsAndResponses); // Assuming the response data is an array of prompts and responses
      }
    } catch (error) {
      console.error("Error fetching chat prompts and responses:", error);
    }
  };

  useEffect(() => {
    fetchChatPromptsAndResponses();
  }, [currentChatId]);

  console.log("chatData", chatData);

  useEffect(() => {
    // Scroll to the latest response when it is received
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatData]);

  // Function to copy a message to the clipboard
  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopiedMessage(text);

    // Reset copiedMessage to null after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setCopiedMessage(null);
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  return (
    <>
      {chatData.length === 0 ? (
        <EmptyComponent />
      ) : (
        <div className="chat-log-main">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/">
              <img className="chat-log-title" src={logo} alt="Chat Log Title" />
            </Link>
          </div>
          <div className="chat-log">
            {chatData.map((chatItem, index) => (
              <>
                <div key={index} className="chat-msg-user">
                  {/* User message */}
                  {chatItem.promptText && (
                    <div className="chat-msg-center">
                      {/* User avatar */}
                      <div className="chat-avatar-user">
                        <img
                          src={user} // Replace with your user's avatar image
                          alt="User Avatar"
                          style={{
                            width: "35px",
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      {/* Prompt text */}
                      <div className="chat-msg-user prompt-window-main">
                        <div className="prompt-window-subClass">
                          {chatItem.promptText}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div key={index} className="chat-msg-response">
                  {/* Bot message */}
                  {chatItem.responseText && (
                    <>
                      <div className="chat-msg-center">
                        {/* Bot avatar */}
                        <div className="chat-avatar-response">
                          <img
                            src={icon} // Replace with your bot's avatar image
                            alt="Bot Avatar"
                            style={{
                              width: "35px",
                              height: "45px",
                            }}
                          />
                        </div>
                        {/* Response text */}
                        <div className="chat-msg-response response-window-main">
                          <div className="response-window-subClass">
                            {chatItem.responseText}
                          </div>
                        </div>
                        <div
                          className="copy-main-div"
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            position: "relative",
                            marginLeft: "2%",
                            left: "0%",
                          }}
                        >
                          <div
                            className="copy-button"
                            onClick={() =>
                              copyToClipboard(chatItem.responseText)
                            }
                          >
                            {copiedMessage === chatItem.responseText ? (
                              <div>
                                <BiCheck className="bicheck" />
                              </div>
                            ) : (
                              <PiCopySimpleLight className="picopysimplelight" />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ))}
            {isLoading && (
              <div className="loader-bounce-main">
                <BounceLoader className="bounce-loader" color="#191919" />
                {/* <BounceLoader className="bounce-loader" color="#adb0b0" /> */}
              </div>
            )}
            <div ref={responseContainerRef}></div>{" "}
            {/* This element is used for focusing on the latest response */}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatLog;
