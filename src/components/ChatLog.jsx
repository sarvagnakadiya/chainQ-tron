// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import icon from "../assets/favicon.png";
// import logo from "../assets/logo.png";
// import user from "../assets/user.jpg";
// import "../styles/ChatLog.scss";
// import EmptyComponent from "./EmptyComponent";

// const ChatLog = ({ messages }) => {
//   console.log("this is from ChatLog", messages);

//   const responseContainerRef = useRef(null);

//   useEffect(() => {
//     // Scroll to the latest response when it is received
//     if (responseContainerRef.current) {
//       responseContainerRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//     }
//   }, [messages]);

//   return (
//     <>
//       {messages.length === 0 ? (
//         <EmptyComponent />
//       ) : (
//         <div className="chat-log-main">
//           <div style={{ display: "flex", justifyContent: "flex-end" }}>
//             <Link to="/">
//               <img className="chat-log-title" src={logo} alt="Chat Log Title" />
//             </Link>
//           </div>
//           <div className="chat-log">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`chat-msg-${
//                   message.sender === "user" ? "user" : "response"
//                 }`}
//               >
//                 <div className="chat-msg-center">
//                   <div
//                     className={`chat-avatar-${
//                       message.sender === "user" ? "user" : "response"
//                     }`}
//                   >
//                     {message.sender === "user" ? (
//                       /* User avatar image */
//                       <img
//                         src={user}
//                         alt="User Avatar"
//                         style={{ width: "30px" }}
//                       />
//                     ) : (
//                       /* Bot avatar image */
//                       <img
//                         src={icon}
//                         alt="Bot Avatar"
//                         style={{ width: "30px" }}
//                       />
//                     )}
//                   </div>
//                   <div className={`chat-msg-${message.sender}`}>
//                     {message.text}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={responseContainerRef}></div>{" "}
//             {/* This element is used for focusing on the latest response */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatLog;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/favicon.png";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";
import "../styles/ChatLog.scss";
import EmptyComponent from "./EmptyComponent";

import { PiCopySimpleLight } from "react-icons/pi";
import { BiCheck } from "react-icons/bi";
import { BounceLoader } from "react-spinners";

const ChatLog = ({ messages, isLoading }) => {
  const [copiedMessage, setCopiedMessage] = useState(null);
  const responseContainerRef = useRef(null);
  // if (messages.length > 0) {
  //   console.log("this is from ChatLog", messages);
  // }
  useEffect(() => {
    // Scroll to the latest response when it is received
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

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
      {messages.length === 0 ? (
        <EmptyComponent />
      ) : (
        <div className="chat-log-main">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/">
              <img className="chat-log-title" src={logo} alt="Chat Log Title" />
            </Link>
          </div>
          <div className="chat-log">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-msg-${
                  message.sender === "user" ? "user" : "response"
                }`}
              >
                <div className="chat-msg-center">
                  <div
                    className={`chat-avatar-${
                      message.sender === "user" ? "user" : "response"
                    }`}
                  >
                    {message.sender === "user" ? (
                      /* User avatar image */
                      <img
                        src={user}
                        alt="User Avatar"
                        style={{
                          width: "35px",
                          // height: "35px",
                          borderRadius: "50px",
                        }}
                      />
                    ) : (
                      /* Bot avatar image */
                      <img
                        src={icon}
                        alt="Bot Avatar"
                        style={{
                          width: "35px",
                          // height: "37px"
                        }}
                      />
                    )}
                  </div>
                  <div className={`chat-msg-${message.sender}`}>
                    <div>{message.text}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      position: "relative",
                      marginLeft: "2%",
                      left: "0%",
                    }}
                  >
                    {message.sender !== "user" && (
                      <div
                        className="copy-button"
                        onClick={() => copyToClipboard(message.text)}
                      >
                        {copiedMessage === message.text ? (
                          <div>
                            <BiCheck className="bicheck" />
                          </div>
                        ) : (
                          <PiCopySimpleLight className="picopysimplelight" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
