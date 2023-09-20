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
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [isSigned, setIsSigned] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const signatureFromCookie = Cookies.get(address); // Use the address as the key
    console.log("signatureFromCookie", signatureFromCookie);
    if (signatureFromCookie) {
      setToken(signatureFromCookie);
      setIsSigned(true);
    } else {
      setIsSigned(false); 
    }
  }, [address]); 

  useEffect(() => {
    // Check if isLoading becomes false and the input field exists in the DOM
    // console.log(inputRef)
    if (!isLoading && inputRef.current) {
      // Focus on the input field
      inputRef.current.focus();
    }
  }, [isLoading]);

  // // Save sessions and messages to local storage whenever they change
  // useEffect(() => {
  //   localStorage.setItem("chatSessions", JSON.stringify(sessions));
  //   localStorage.setItem("chatMessages", JSON.stringify(messages));
  // }, [sessions, messages]);

  // useEffect(() => {
  //   const savedSessions =
  //     JSON.parse(localStorage.getItem("chatSessions")) || [];
  //   const savedMessages =
  //     JSON.parse(localStorage.getItem("chatMessages")) || {};

  //   setSessions(savedSessions);
  //   setMessages(savedMessages);
  // }, []);

  // useEffect(() => {
  //   // Check if there is an authenticated user and get their chat IDs
  //   if (connected) {
  //     // console.log(connected)
  //     getUserChatIds(address, token)
  //       .then((response) => {
  //         // console.log(address, token)
  //         // console.log(response)
  //         const chatData = response.data.chatData;
  //         // console.log(chatData)
  //         // Create a mapping of chat IDs to chat titles
  //         const chatTitleMap = {};
  //         chatData.forEach((chat) => {
  //           chatTitleMap[chat.chatId] = chat.chatTitle;
  //         });
  //         // Update the sessions with chat titles
  //         const updatedSessions = sessions.map((session) => ({
  //           ...session,
  //           name: chatTitleMap[session.id] || session.name,
  //         }));
  //         setSessions(updatedSessions);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user's chat IDs:", error);
  //       });
  //   }
  // }, [address, sessions]);

  const handleDeleteSession = (event, sessionId) => {
    event.stopPropagation();
    // Remove the session from the sessions state
    const remainingSessions = sessions.filter(
      (session) => session.id !== sessionId
    );

    // Remove the messages for the session from the messages state
    const { [sessionId]: deletedSession, ...remainingMessages } = messages;

    if (currentSession === sessionId) {
      if (remainingSessions.length > 0) {
        // Set the next session (if available) as the current session
        const mostRecentSessionId =
          remainingSessions.length > 0
            ? remainingSessions[remainingSessions.length - 1].id
            : null;
        setCurrentSession(mostRecentSessionId);
        // setCurrentSession(remainingSessions[0].id);
      } else {
        // No remaining sessions, set currentSession to null
        setCurrentSession(null);
      }
    }
    // Update the state after all modifications
    setSessions(remainingSessions);
    setMessages(remainingMessages);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearChatClick = () => {
    const confirmResult = window.confirm(
      "Are you sure you want to delete all chats?"
    );
    if (confirmResult) {
      setSessions([]); // Clear all sessions
      setMessages({}); // Clear all messages
      setShowChatLog(false);
      setCurrentSession(null);
    }
  };

  const switchSession = async (sessionId) => {
    // Check if the specified sessionId exists in the sessions state
    const isSessionAvailable = sessions.some(
      (session) => session.id === sessionId
    );

    if (isSessionAvailable) {
      // Set the session only if it exists in the sessions state
      setCurrentSession(sessionId);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      // Handle the case where the session is not available (optional)
      console.log(`Session with ID ${sessionId} does not exist.`);
    }
  };

  const createNewSession = () => {
    // console.log("call");
    const hasActiveSessionWithZeroMessages = sessions.some(
      (session) => messages[session.id]?.length === 0
    );

    // Check if there is no current session or if the current session has at least one message
    if (
      !currentSession ||
      (messages[currentSession] &&
        messages[currentSession].length > 0 &&
        !hasActiveSessionWithZeroMessages)
    ) {
      if (newMessage.trim() !== "") {
        const sessionName = newMessage.trim();
        // const chNum = sessions.length + 1;
        const newSession = {
          id: uuidv4(),
          name: sessionName,
          createdAt: new Date(),
        };
        setSessions([...sessions, newSession]);
        setMessages({
          ...messages,
          [newSession.id]: [],
        });
        // console.log("setting current session");
        setCurrentSession(newSession.id);

        if (inputRef.current) {
          inputRef.current.focus();
        }

        return newSession.id; // Return the ID of the newly created session
      } else {
        // const chNum = sessions.length + 1;
        const newSession = {
          id: uuidv4(),
          name: "New Chat",
          createdAt: new Date(),
        };
        setSessions([...sessions, newSession]);
        setMessages({
          ...messages,
          [newSession.id]: [],
        });
        setCurrentSession(newSession.id);

        if (inputRef.current) {
          inputRef.current.focus();
        }

        setNewMessage("");

        return newSession.id; // Return the ID of the newly created session
      }
    }
    return null; // Return null if a new session was not created
  };

  const sendMessage = async () => {
    // console.log("message sent to session:-", currentSession);

    let newCurrentSession;

    if (!currentSession) {
      // Try to create a new session
      newCurrentSession = createNewSession();
      // console.log(newCurrentSession);
      if (!newCurrentSession) {
        // User canceled session creation, so do nothing
        return;
      }
      // return;
    } else {
      newCurrentSession = currentSession;
    }

    if (newMessage.trim() !== "") {
      setIsLoading(true);

      // Delay sending the Axios request to show the user's message first
      const userMessage = {
        id: uuidv4(),
        sender: "user",
        text: newMessage,
      };

      // Update the state with the user message first
      setMessages((prevMessages) => ({
        ...prevMessages,
        [newCurrentSession]: [
          ...(prevMessages[newCurrentSession] || []),
          userMessage,
        ],
      }));

      // If the session name is still "New Chat," update it with the user's message
      const currentSessionObj = sessions.find(
        (session) => session.id === newCurrentSession
      );
      if (currentSessionObj && currentSessionObj.name === "New Chat") {
        const updatedSessions = sessions.map((session) =>
          session.id === newCurrentSession
            ? { ...session, name: newMessage.trim() }
            : session
        );
        setSessions(updatedSessions);
      }

      // Prepare the request data
      const requestData = {
        user_prompt: newMessage,
      };

      // Initialize a cancel token
      let cancelToken;

      // Create a cancel token source
      const cancelTokenSource = axios.CancelToken.source();

      // Assign the cancel token to cancelToken
      cancelToken = cancelTokenSource.token;

      try {
        setNewMessage("");
        const response = await axios.post(
          // "https://api.dehitas.xyz/get_answer",
          "https://dummy-api-purvik6062.vercel.app/echo/",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            cancelToken: cancelToken,
          }
        );
        if (cancelToken) {
          setTimeout(() => {
            const botResponse = {
              id: uuidv4(),
              sender: "bot",
              text: response.data.answer,
            };

            // Update the state with the bot response
            setMessages((prevMessages) => ({
              ...prevMessages,
              [newCurrentSession]: [
                ...(prevMessages[newCurrentSession] || []),
                botResponse,
              ],
            }));

            setIsLoading(false);
          }, 3000);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log("Error:", error);
        }
        setIsLoading(false);
      }
    }
  };

  const isSendButtonDisabled = newMessage === "";

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
        sessions={sessions}
        currentSession={currentSession}
        handleCreateNewSession={createNewSession}
        handleSwitchSession={switchSession}
        handleDeleteSession={handleDeleteSession}
        handleClearChatClick={handleClearChatClick}
      />

      <div className="chat-box-main">
        <div className="chat-box">
          {(currentSession === null && !showChatLog) ||
          (currentSession !== null &&
            hasZeroMessages(currentSession) &&
            !showChatLog) ? (
            <EmptyComponent
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              inputRef={inputRef}
            />
          ) : (
            <ChatLog
              messages={messages[currentSession] || []}
              isLoading={isLoading}
              currentSession={currentSession}
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
