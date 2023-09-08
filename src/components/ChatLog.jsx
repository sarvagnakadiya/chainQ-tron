// import React from "react";
// import { Link } from "react-router-dom";
// import icon from "../assets/favicon.png";
// import logo from "../assets/logo.png";
// import user from "../assets/user.jpg";

// const ChatLog = ({ messages, isLoading }) => {
//   console.log("this is from ChatLog", messages);

//   return (
//     <div className="chat-log-main">
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Link to="/">
//           <img className="chat-log-title" src={logo} alt="Chat Log Title" />
//         </Link>
//       </div>
//       <div className="chat-log">
//         {isLoading ? (
//           <div className="loader">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         ) : (
//           messages.map((message) => (
//             <div
//               key={message.id}
//               className={`chat-msg-${
//                 message.sender === "user" ? "log" : "response"
//               }`}
//             >
//               <div className="chat-msg-center">
//                 <div
//                   className={`chat-avatar-${
//                     message.sender === "user" ? "user" : "response"
//                   }`}
//                 >
//                   {message.sender === "user" ? (
//                     /* User avatar image */
//                     <img
//                       src={user}
//                       alt="User Avatar"
//                       style={{ width: "30px" }}
//                     />
//                   ) : (
//                     /* Bot avatar image */
//                     <img
//                       src={icon}
//                       alt="Bot Avatar"
//                       style={{ width: "30px" }}
//                     />
//                   )}
//                 </div>
//                 <div className="chat-msg">
//                   <>{message.text}</>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatLog;

import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/favicon.png";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";

const ChatLog = ({ messages, isLoading }) => {
  console.log("this is from ChatLog", messages);

  return (
    <div className="chat-log-main">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/">
          <img className="chat-log-title" src={logo} alt="Chat Log Title" />
        </Link>
      </div>
      <div className="chat-log">
        {isLoading ? (
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          messages.map((message) => (
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
                      style={{ width: "30px" }}
                    />
                  ) : (
                    /* Bot avatar image */
                    <img
                      src={icon}
                      alt="Bot Avatar"
                      style={{ width: "30px" }}
                    />
                  )}
                </div>
                <div className={`chat-msg-${message.sender}`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatLog;
