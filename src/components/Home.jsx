import Navbar from "./Navbar";
import hero from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useEffect, useState } from "react";
import Popup from "./Popup";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();
  const { connected, address } = useWallet(); // Get wallet connection status and address
  const [isSigned, setIsSigned] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user has signed a message using cookies
    const signatureFromCookie = Cookies.get(address); // Use the address as the key
    if (signatureFromCookie) {
      setIsSigned(true);
    } else {
      setIsSigned(false); // Address changed, reset the sign status
    }
  }, [address]); // Make sure to include address as a dependency

  const getStarted = () => {
    if (connected) {
      // Check if the user has signed a message
      if (isSigned) {
        // User has signed, navigate to "/chat-dashboard"
        navigate("./chat-dashboard");
      } else {
        // User has not signed, show the popup
        setShowPopup(true);
      }
    } else {
      toast.error("Please connect to the wallet first!");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
