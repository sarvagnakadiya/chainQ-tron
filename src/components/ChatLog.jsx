// import React from "react";
// import { Link } from "react-router-dom";
// import icon from "../assets/favicon.png";
// import logo from "../assets/logo.png";
// import user from "../assets/user.jpg";

// const ChatLog = ({ messages, isLoading }) => {
//   console.log("this is from ChatLog" + messages);

//   console.log(
//     "Message IDs:",
//     messages.map((message) => message.id)
//   );

//   return (
//     <div className="chat-log-main">
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Link to="/">
//           {" "}
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
  // Add code to assign unique IDs to messages
  const messagesWithUniqueIds = messages.map((message, index) => ({
    ...message,
    id: index + 1, // Assign a unique ID based on the message's position in the array
  }));

  console.log("this is from ChatLog", messages);

  return (
    <div className="chat-log-main">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/">
          {" "}
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
          messagesWithUniqueIds.map((message) => (
            <div
              key={message.id}
              className={`chat-msg-${
                message.sender === "user" ? "log" : "response"
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
                <div className="chat-msg">
                  <>{message.text}</>
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
