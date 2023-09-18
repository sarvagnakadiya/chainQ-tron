// import React, { useState } from "react";
// import "../styles/Popup.css";
// import { addUser } from "../APIs/apis";
// import { useNavigate } from "react-router-dom";
// import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

// const Popup = ({ onClose }) => {
//   const { connected, address } = useWallet();
//   console.log(address);
//   const navigate = useNavigate();
//   const { tronWeb } = window;
//   var data;

//   const userLoginAndAuthinticate = async (signature) => {
//     data = await addUser(address, signature);
//     console.log(data);
//   };

//   const getSign = async () => {
//     const signature = await tronWeb.trx.signMessageV2("hello");
//     if (signature) {
//       console.log(address);
//       console.log(signature);
//       await userLoginAndAuthinticate(signature);
//       onClose();
//       // if (data.status === 200) navigate("/chat-dashboard");
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <button className="close-button" onClick={onClose}>
//           Close
//         </button>
//         <div className="popup-content">
//           <button onClick={getSign}>Sign Request</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;

import React from "react";
import "../styles/Popup.css";
import { addUser } from "../APIs/apis";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie"; // Import the Cookies library

const Popup = ({ onClose }) => {
  const { connected, address } = useWallet();
  console.log(address);
  const navigate = useNavigate();
  const { tronWeb } = window;
  var data;

  // const userLoginAndAuthinticate = async (signature) => {
  //   try {
  //     data = await addUser(address, signature);
  //     console.log(data);
  //     if (data.status === 200) {
  //       // Set the signature in cookies
  //       // Cookies.set("signature", signature);
  //       Cookies.set("token", data.data.token);

  //       onClose();
  //       navigate("/chat-dashboard");
  //     }
  //   } catch (error) {
  //     console.error("Error authenticating user:", error);
  //   }
  // };

  const userLoginAndAuthinticate = async (signature, address) => {
    try {
      data = await addUser(address, signature);
      console.log(data);
      if (data.status === 200) {
        // Set the token in cookies with the wallet's address as the key
        Cookies.set(address, data.data.token);

        onClose();
        navigate("/chat-dashboard");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  };

  // const getSign = async () => {
  //   const signature = await tronWeb.trx.signMessageV2("hello");
  //   if (signature) {
  //     console.log(address);
  //     console.log(signature);
  //     await userLoginAndAuthinticate(signature);
  //   }
  // };

  const getSign = async () => {
    const signature = await tronWeb.trx.signMessageV2("hello");
    if (signature) {
      console.log(address);
      console.log(signature);
      await userLoginAndAuthinticate(signature, address);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        {/* <button className="close-button" onClick={onClose}>
          &times;
        </button> */}
        <div className="popup-content">
          <h2 className="popup-title">Sign Message</h2>
          <p className="popup-description">
            Sign this message to securely authenticate your identity.
          </p>
          <button className="popup-button" onClick={getSign}>
            Sign Request
          </button>
          <button className="popup-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
