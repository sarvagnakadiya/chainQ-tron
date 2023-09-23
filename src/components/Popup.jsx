import React, { useState } from "react";
import "../styles/Popup.css";
import { addUser } from "../APIs/apis";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie";

const Popup = ({ onClose }) => {
  const { connected, address } = useWallet();
  const [loading, setLoading] = useState(false); // Initialize loading state as false
  const navigate = useNavigate();
  const { tronWeb } = window;
  var resData;

  const userLoginAndAuthenticate = async (signature, address) => {
    try {
      resData = await addUser(address, signature);
      console.log(resData);
      if (resData.status === 200) {
        Cookies.set(address, resData.data.token);
        onClose();
        navigate("/chat-dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error authenticating user:", error);
    }
  };

  const getSign = async () => {
    const signature = await tronWeb.trx.signMessageV2("hello");
    if (signature) {
      setLoading(true); // Set loading to true when signing starts
      await userLoginAndAuthenticate(signature, address);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <h2 className="popup-title">Sign Message</h2>
          <p className="popup-description">
            Sign this message to securely authenticate your identity.
          </p>
          {loading ? (
            <p>Loading...</p> // Render loading message when loading is true
          ) : (
            <>
              <button className="popup-button" onClick={getSign}>
                Sign Request
              </button>
              <button className="popup-button" onClick={onClose}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
