import "../styles/main.scss";
import Navbar from "./Navbar";
import hero from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useState, useEffect } from "react";
import Popup from "./Popup";
import { toast } from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const { connected, address } = useWallet(); // Get wallet connection status and address

  const getStarted = () => {
    if (connected) {
      console.log("connected", connected);
      navigate("./chat-dashboard");
    } else {
      toast.error("Please connect to the wallet first!");
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  // // useEffect to show the popup when the wallet is connected
  useEffect(() => {
    // const popupShown = localStorage.getItem("popupShown");
    // if (connected && !popupShown) {
    if (connected) {
      setShowPopup(true);
    }
  }, [connected]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // localStorage.setItem("popupShown", "true");
  };

  return (
    <div className="main-div-landing">
      <Navbar togglePopup={togglePopup} />

      <div className="landing-flex">
        <div className="home-left-section">
          <h1 className="home-title">
            The AI-Powered Blockchain Data Querying System
          </h1>

          <p className="home-desc">
            Unleashing the Power of NLP and AI to Seamlessly Access and Analyze
            Blockchain Data
          </p>

          <button className="try-btn" onClick={() => getStarted()}>
            Try it first!
          </button>
        </div>
        <div className="hero-right">
          <div className="hero-right-inside">
            <img className="hero-right-bg1" src={hero} alt="backgroundimage" />
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-flex">
          <div style={{ color: "white", fontSize: "15px" }}>
            © 2023 ChainQ. All Rights Reserved.
          </div>
        </div>
      </footer>
      {showPopup && <Popup onClose={togglePopup} address={address} />}
    </div>
  );
}

export default Home;
