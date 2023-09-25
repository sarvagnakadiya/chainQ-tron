import React from "react";
import "../styles/PlansPopup.scss";

function PlansPopup({ setShowSPopup }) {
  const currentPlanPoints = ["Limited to 10 chats"];
  const upgradePlanPoints = ["Unlimited chats"];

  return (
    <>
      {/* <div className="plans-popup-overlay">
        <div className="plans-popup">
          <div className="plans-popup-content">
            <h2 className="plans-popup-title">Upgrade your plan</h2>
            <p className="plans-popup-description"></p>
            <>
              <button className="plans-popup-button">Subscribe</button>
              <button
                className="plans-popup-close-button"
                onClick={() => setShowSPopup(false)}
              >
                &times;
              </button>
            </>
          </div>
        </div>
      </div> */}

      <div className="plans-popup-overlay">
        <div className="plans-popup">
          <div className="plans-popup-content">
            <div className="plans-header">
              <div className="plans-popup-title">Upgrade your plan</div>
              <button
                className="plans-popup-close-button"
                onClick={() => setShowSPopup(false)}
              >
                &times;
              </button>
            </div>
            {/* <hr /> */}
            <div className="plans-horizontal-divider"></div>
            <div className="plans-section">
              <div className="plans-column">
                <h3 className="plans-subtitle">Your Current Plan</h3>
                {currentPlanPoints.map((point, index) => (
                  <div className="plans-point" key={index}>
                    {point}
                  </div>
                ))}
              </div>
              <div className="plans-divider"></div>
              <div className="plans-column">
                <h3 className="plans-subtitle">Upgrade Plan</h3>
                {upgradePlanPoints.map((point, index) => (
                  <div className="plans-point" key={index}>
                    {point}
                  </div>
                ))}
                <button className="plans-popup-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlansPopup;
