import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
// import { ConnectWallet } from "../ConnectWallet.tsx";
import { ConnectWallet } from "../ConnectWallet.tsx";

function Navbar() {
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <span
            className="logo"
            style={{
              width: "35%",
              display: "flex",
              // textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "5%",
            }}
          >
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: "35%" }} />
            </Link>
          </span>
          <div
            style={{
              width: "30%",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ConnectWallet />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
