import React, { useEffect, useState } from "react";
import "../styles/PlansPopup.scss";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Cookies from "js-cookie";
import abi from "../contract/artifacts/chainq_abi.json";
import { CHAINQ_SHASTA_TESTNET } from "../config";

function PlansPopup({ onClose }) {
  console.log("hello me aa gaya");
  const currentPlanPoints = ["Limited to 10 chats"];
  const upgradePlanPoints = ["Unlimited chats"];

  const { connected, address } = useWallet();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { tronWeb } = window;
  const [isSigned, setIsSigned] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState({
    hasSubscription: false,
    expirationTimestamp: 0,
  });
  useEffect(() => {
    // Check if the user has signed a message using cookies
    const signatureFromCookie = Cookies.get(address); // Use the address as the key
    if (signatureFromCookie) {
      setIsSigned(true);
      getPlanDetails();
    } else {
      setIsSigned(false); // Address changed, reset the sign status
    }
  }, [address]);

  const getPlanDetails = async () => {
    const connectedContract = await tronWeb.contract(
      abi,
      CHAINQ_SHASTA_TESTNET
    );
    console.log(connectedContract);
    let txget = await connectedContract.getSubscriptionStatus(address).call();
    console.log(txget.hasSubscription);
    console.log(parseInt(txget.expirationTimestamp));
    setSubscriptionData({
      hasSubscription: txget.hasSubscription,
      expirationTimestamp: parseInt(txget.expirationTimestamp),
    });
  };

  const buyPlan = async () => {
    if (connected && isSigned) {
      const connectedContract = await tronWeb.contract(
        abi,
        CHAINQ_SHASTA_TESTNET
      );
      console.log(connectedContract);
      let txget = await connectedContract.subscriptionPrice().call();
      console.log(parseInt(txget));
      // console.log(tronWeb.toSun(txget));
      if (txget) {
        let tx = await connectedContract.purchaseSubscription().send({
          callValue: tronWeb.toSun(txget),
        });
        console.log(tx);
      }

      navigate("/chat-dashboard");
    } else {
      // User has not signed, show the popup
      // setShowPopup(true);
    }
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  return (
    <>
      <div className="plans-popup-overlay">
        <div className="plans-popup">
          <div className="plans-popup-content">
            <div className="plans-header">
              <div className="plans-popup-title">Upgrade your plan</div>
              <button className="plans-popup-close-button" onClick={onClose}>
                &times;
              </button>
            </div>

            <div className="plans-horizontal-divider"></div>
            <div className="plans-section">
              <div className="plans-column">
                <h3 className="plans-subtitle">Your Current Plan</h3>
                <p>
                  Has Subscription:{" "}
                  {subscriptionData.hasSubscription ? "Yes" : "No"}
                </p>
                <p>
                  Expiration Timestamp:{" "}
                  {formatTimestamp(subscriptionData.expirationTimestamp)}
                </p>
              </div>
              <div className="plans-divider"></div>
              <div className="plans-column">
                <h3 className="plans-subtitle">Upgrade Plan</h3>
                {upgradePlanPoints.map((point, index) => (
                  <div className="plans-point" key={index}>
                    {point}
                  </div>
                ))}
                <button
                  className="plans-popup-button"
                  onClick={() => buyPlan()}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlansPopup;
