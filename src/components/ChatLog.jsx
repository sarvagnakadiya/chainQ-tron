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
  const [activeId, setActiveId] = useState();
  const [chatData, setChatData] = useState([]);

  // if (currentChatId === null) {
  //   return <EmptyComponent />;
  // }

  useEffect(() => {
    if (currentChatId === null) {
      return <EmptyComponent />;
    } else {
      setActiveId(currentChatId);
    }
  }, [currentChatId, activeId]);

  useEffect(() => {
    const signatureFromCookie = Cookies.get(address);
    if (signatureFromCookie) {
      setToken(signatureFromCookie);
      setIsSigned(true);

      // if (connected) {
      //   fetchUserChatIds(address, token);
      // }
    } else {
      setIsSigned(false);
    }
  }, [address, connected, token]);

  // const fetchUserChatIds = async () => {
  //   try {
  //     if (token) {
  //       const response = await getUserChatIds(address, token);
  //       setApiResponse(response.data.chatData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user's chat IDs:", error);
  //   }
  // };

  const fetchChatPromptsAndResponses = async () => {
    try {
      if (token) {
        const response = await getChatPromptsAndResponses(activeId, token);
        console.log(response);
        setChatData(response.data.promptsAndResponses);
      }
    } catch (error) {
      console.error("Error fetching chat prompts and responses:", error);
    }
  };

  useEffect(() => {
    fetchChatPromptsAndResponses();
  }, [activeId]);

  useEffect(() => {
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatData]);

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopiedMessage(text);

    setTimeout(() => {
      setCopiedMessage(null);
    }, 3000);
  };

  // Function to display JSON as a table
  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        // Handle arrays
        return (
          <ul>
            {value.map((item, index) => (
              <li key={index}>{renderValue(item)}</li>
            ))}
          </ul>
        );
      } else {
        // Handle objects (display rows vertically)
        return (
          <div className="json-table">
            {Object.entries(value).map(([key, val]) => (
              <div key={key} className="json-row">
                <div className="json-key">{key}</div>
                <div className="json-value">{renderValue(val)}</div>
              </div>
            ))}
          </div>
        );
      }
    } else {
      return value;
    }
  };

  const renderJsonAsTable = (jsonString) => {
    try {
      const jsonData = JSON.parse(jsonString);

      if (typeof jsonData !== "object" || jsonData === null) {
        return <div>{jsonString}</div>;
      }

      return <div>{renderValue(jsonData)}</div>;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return <div>{jsonString}</div>;
    }
  };

  // Function to render a chat message
  const renderChatMessage = (chatItem, index) => {
    return (
      <>
        <div key={index} className="chat-msg-user">
          {chatItem.promptText && (
            <div className="chat-msg-center">
              <div className="chat-avatar-user">
                <img
                  src={user}
                  alt="User Avatar"
                  style={{
                    width: "35px",
                    borderRadius: "50px",
                  }}
                />
              </div>
              <div className="chat-msg-user prompt-window-main">
                <div className="prompt-window-subClass">
                  {chatItem.promptText}
                </div>
              </div>
            </div>
          )}
        </div>
        <div key={index} className="chat-msg-response">
          {chatItem.responseText && (
            <>
              <div className="chat-msg-center">
                <div className="chat-avatar-response">
                  <img
                    src={icon}
                    alt="Bot Avatar"
                    style={{
                      width: "35px",
                      height: "45px",
                    }}
                  />
                </div>
                <div className="chat-msg-response response-window-main">
                  <div className="response-window-subClass">
                    {renderJsonAsTable(chatItem.responseText)}
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
                    onClick={() => copyToClipboard(chatItem.responseText)}
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
    );
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
            {chatData.map((chatItem, index) =>
              renderChatMessage(chatItem, index)
            )}
            {isLoading && (
              <div className="loader-bounce-main">
                <BounceLoader className="bounce-loader" color="#191919" />
              </div>
            )}
            <div ref={responseContainerRef}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatLog;
