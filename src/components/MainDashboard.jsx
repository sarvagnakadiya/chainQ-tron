// import { useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import "../styles/main.scss";
// import EmptyComponent from "./EmptyComponent";
// import ChatLog from "./ChatLog";
// import MessageHistory from "./MessageHistory";
// import send from "../assets/send.png";
// import axios from "axios";
// import { TbSend } from "react-icons/tb";

// const Dashboard = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const [sessions, setSessions] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [showChatLog, setShowChatLog] = useState(false);
//   const [currentSession, setCurrentSession] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const inputRef = useRef(null);

//   // Load sessions from local storage on component mount
//   useEffect(() => {
//     const savedSessions =
//       JSON.parse(localStorage.getItem("chatSessions")) || [];
//     setSessions(savedSessions);
//   }, []);

//   // Save sessions to local storage whenever sessions change
//   useEffect(() => {
//     localStorage.setItem("chatSessions", JSON.stringify(sessions));
//   }, [sessions]);

//   const createNewSession = () => {
//     const sessionName = prompt("Enter a name for the new session:");
//     if (sessionName) {
//       const newSession = {
//         id: uuidv4(),
//         name: sessionName,
//         messages: [],
//       };
//       setSessions([...sessions, newSession]);
//       setCurrentSession(newSession.id);
//     }
//   };

//   const switchSession = (sessionId) => {
//     setCurrentSession(sessionId);
//   };

//   const handleDeleteSession = (sessionId) => {
//     const remainingSessions = sessions.filter(
//       (session) => session.id !== sessionId
//     );
//     setSessions(remainingSessions);
//     // If the deleted session was the current one, switch to another session or set it to null.
//     if (currentSession === sessionId) {
//       if (remainingSessions.length > 0) {
//         setCurrentSession(remainingSessions[0].id);
//       } else {
//         setCurrentSession(null);
//       }
//     }
//   };

//   useEffect(() => {
//     // Check if isLoading becomes false and the input field exists in the DOM
//     if (!isLoading && inputRef.current) {
//       // Focus on the input field
//       inputRef.current.focus();
//     }
//   }, [isLoading]);

//   const sendMessage = () => {
//     if (newMessage.trim() !== "") {
//       setIsLoading(true);
//       const userMessage = {
//         id: uuidv4(),
//         sender: "user",
//         text: newMessage,
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setNewMessage("");

//       const requestData = {
//         user_prompt: newMessage,
//       };

//       axios
//         .post("https://dummy-api-purvik6062.vercel.app/echo/", requestData, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//         .then((response) => {
//           setTimeout(() => {
//             const botResponse = {
//               id: uuidv4(),
//               sender: "bot",
//               text: response.data.answer,
//             };
//             setMessages((prevMessages) => [...prevMessages, botResponse]);
//             setIsLoading(false);
//           }, 3000);
//         })
//         .catch((error) => {
//           console.log(error);
//           setIsLoading(false);
//         });
//     }
//   };

//   const handleDeleteMessage = (messageId) => {
//     const messageIndex = messages.findIndex(
//       (message) => message.id === messageId
//     );
//     if (messageIndex === -1) {
//       return;
//     }
//     const isUserMessage = messages[messageIndex].sender === "user";
//     setMessages((prevMessages) => {
//       const updatedMessages = [...prevMessages];
//       updatedMessages.splice(messageIndex, 1);
//       if (
//         isUserMessage &&
//         messageIndex < updatedMessages.length &&
//         updatedMessages[messageIndex].sender === "bot"
//       ) {
//         updatedMessages.splice(messageIndex, 1);
//       }
//       return updatedMessages;
//     });
//   };

//   const handleClearChatClick = () => {
//     const confirmResult = window.confirm(
//       "Are you sure you want to delete all chats?"
//     );
//     if (confirmResult) {
//       setMessages([]);
//       setShowChatLog(false);
//     }
//   };

//   const isSendButtonDisabled = newMessage === "";

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   // const userPrompt = "Your user prompt here";
//   // const requestData = { user_prompt: userPrompt };

//   const getCurrentSession = () => {
//     return sessions.find((session) => session.id === currentSession);
//   };

//   return (
//     <div className="chat-app-container">
//       <MessageHistory
//         sessions={sessions}
//         currentSession={currentSession}
//         handleCreateNewSession={createNewSession}
//         handleSwitchSession={switchSession}
//         handleDeleteSession={handleDeleteSession}
//         handleClearChatClick={handleClearChatClick}
//       />

//       <div className="chat-box-main">
//         <div className="chat-box">
//           {currentSession == null ? (
//             <EmptyComponent />
//           ) : (
//             <ChatLog
//               messages={messages[currentSession] || []}
//               isLoading={isLoading}
//             />
//           )}

//           <div className="chat-input">
//             <div className="prompt-input-area">
//               <input
//                 className="prompt-input-field"
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder="Send your query"
//                 disabled={isLoading}
//                 ref={inputRef}
//               />
//               <div>
//                 {isLoading ? (
//                   <div className="loader">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={sendMessage}
//                     disabled={isSendButtonDisabled}
//                     className="send-btn"
//                   >
//                     {/* <img src={send} style={{ width: "20px" }} alt="Send" /> */}
//                     <TbSend />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/main.scss";
import EmptyComponent from "./EmptyComponent";
import ChatLog from "./ChatLog";
import MessageHistory from "./MessageHistory";
import axios from "axios";
import { TbSend } from "react-icons/tb";

const Dashboard = () => {
  const [newMessage, setNewMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState({});
  const [showChatLog, setShowChatLog] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Load sessions and messages from local storage on component mount
  useEffect(() => {
    const savedSessions =
      JSON.parse(localStorage.getItem("chatSessions")) || [];
    setSessions(savedSessions);

    const savedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || {};
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    // Check if isLoading becomes false and the input field exists in the DOM
    if (!isLoading && inputRef.current) {
      // Focus on the input field
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Save sessions and messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [sessions, messages]);

  const createNewSession = () => {
    const sessionName = prompt("Enter a name for the new session:");
    if (sessionName) {
      const newSession = {
        id: uuidv4(),
        name: sessionName,
      };
      setSessions([...sessions, newSession]);
      setMessages({
        ...messages,
        [newSession.id]: [],
      });
      setCurrentSession(newSession.id);
    }
  };

  const switchSession = (sessionId) => {
    setCurrentSession(sessionId);
  };

  const handleDeleteSession = (sessionId) => {
    const remainingSessions = sessions.filter(
      (session) => session.id !== sessionId
    );
    setSessions(remainingSessions);

    // Delete messages for the session
    const { [sessionId]: deletedSession, ...remainingMessages } = messages;
    setMessages(remainingMessages);

    // If the deleted session was the current one, switch to another session or set it to null.
    if (currentSession === sessionId) {
      if (remainingSessions.length > 0) {
        setCurrentSession(remainingSessions[0].id);
      } else {
        setCurrentSession(null);
      }
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

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setIsLoading(true);
      const userMessage = {
        id: uuidv4(),
        sender: "user",
        text: newMessage,
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentSession]: [
          ...(prevMessages[currentSession] || []),
          userMessage,
        ],
      }));
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
            setMessages((prevMessages) => ({
              ...prevMessages,
              [currentSession]: [
                ...(prevMessages[currentSession] || []),
                botResponse,
              ],
            }));
            setIsLoading(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const isSendButtonDisabled = newMessage === "";

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

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
          {currentSession === null ? (
            <EmptyComponent />
          ) : (
            <ChatLog
              messages={messages[currentSession] || []}
              isLoading={isLoading}
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
