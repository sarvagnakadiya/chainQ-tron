import Navbar from "./Navbar";
import hero from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import Popup from "./Popup";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PlansPopup from "./PlansPopup";
import abi from "../contract/artifacts/chainq_abi.json";
import { CHAINQ_SHASTA_TESTNET } from "../config";

function Home() {
  const navigate = useNavigate();
  const { connected, address } = useWallet(); // Get wallet connection status and address
  const [showPopup, setShowPopup] = useState(false);
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [isSigned, setIsSigned] = useState(null);

  useEffect(() => {
    // Check if the user has signed a message using cookies
    const signatureFromCookie = Cookies.get(address); // Use the address as the key
    if (signatureFromCookie) {
      setIsSigned(true);
    } else {
      setIsSigned(false); // Address changed, reset the sign status
    }
  }, [address]); // Make sure to include address as a dependency

  const getStarted = async () => {
    if (connected) {
      console.log(isSigned);
      if (isSigned == true) {
        const connectedContract = await tronWeb.contract(
          abi,
          CHAINQ_SHASTA_TESTNET
        );

        let txget = await connectedContract
          .getSubscriptionStatus(address)
          .call();
        console.log(txget.hasSubscription);
        // console.log(txget);
        if (txget.hasSubscription) {
          navigate("./chat-dashboard");
        } else {
          setShowPlanPopup(!showPlanPopup);
        }
      } else {
        // User has not signed, show the popup
        setShowPopup(!showPopup);
      }
    } else {
      toast.error("Please connect to the wallet first!");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const togglePlanPopup = () => {
    setShowPlanPopup(!showPlanPopup);
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
      {showPopup && (
        <Popup
          onClose={togglePopup}
          address={address}
          setShowPlanPopup={setShowPlanPopup}
        />
      )}
      {showPlanPopup && <PlansPopup setShowSPopup={togglePlanPopup} />}
    </div>
  );
}

export default Home;
