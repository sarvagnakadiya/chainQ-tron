// src/Popup.js
import React, { useState } from "react";
import "../styles/Popup.css";
import { addUser } from "../APIs/apis";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

const Popup = ({ onClose }) => {
  const { connected, address } = useWallet();
  console.log(address);
  const navigate = useNavigate();
  const { tronWeb } = window;
  var data;

  const userLoginAndAuthinticate = async (signature) => {
    data = await addUser(address, signature);
    console.log(data);
  };
  const getSign = async () => {
    const signature = await tronWeb.trx.signMessageV2("hello");
    if (signature) {
      console.log(address);
      console.log(signature);
      await userLoginAndAuthinticate(signature);
      onClose();
      // console.log()
      if (data.status === 200) navigate("./chat-dashboard");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="popup-content">
          <button onClick={getSign}>Sign Request</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
