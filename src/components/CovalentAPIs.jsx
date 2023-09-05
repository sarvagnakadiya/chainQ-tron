import React, { useState } from "react";
import axios from "axios";
// import "../style/CovalentAPIs.css"; // Import the new CSS file

function NewComponent() {
  const [response, setResponse] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("matic-mainnet"); // Default network selection
  const [quoteCurrency, setQuoteCurrency] = useState(""); // State for quote currency input
  const [contractAddress, setContractAddress] = useState(""); // State for contract address input
  const [hoveredButton, setHoveredButton] = useState(""); // State to track hovered button

  const fetchData = (url) => {
    const headers = {
      Authorization: "Bearer ckey_6702edeceef9404abb0bf0b6331",
    };

    axios
      .get(url, { headers })
      .then((response) => {
        setResponse(response.data.data.items);
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
      });
  };

  const handleNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
  };

  const handleFetchBalances = () => {
    const url = `https://api.covalenthq.com/v1/${selectedNetwork}/address/${walletAddress}/balances_nft/`;
    fetchData(url);
  };

  const handleGetAllApproval = () => {
    const url = `https://api.covalenthq.com/v1/${selectedNetwork}/approvals/${walletAddress}/`;
    fetchData(url);
  };

  const handleGetTokenPricings = () => {
    const url = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${selectedNetwork}/${quoteCurrency}/${contractAddress}/`;
    fetchData(url);
  };

  const handleQuoteCurrencyChange = (e) => {
    setQuoteCurrency(e.target.value);
  };

  const handleContractAddressChange = (e) => {
    setContractAddress(e.target.value);
  };

  const handleButtonHover = (buttonName) => {
    setHoveredButton(buttonName);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",

        flexDirection: "column",
      }}
    >
      <h1 className="dash-title">
        Let's Explore The Power Of{" "}
        <span style={{ color: "#246aee" }}>Covalent APIs</span>
      </h1>
      <div className="container">
        <div className="input-row">
          <input
            type="text"
            className={`input-field ${
              hoveredButton === "fetchBalances" && "green-border"
            }`}
            placeholder="Enter ETH Address"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <input
            type="text"
            className={`input-field ${
              hoveredButton === "getTokenPricings" && "green-border"
            }`}
            placeholder="Enter Quote Currency"
            onChange={handleQuoteCurrencyChange}
          />
          <input
            type="text"
            className={`input-field ${
              hoveredButton === "getTokenPricings" && "green-border"
            }`}
            placeholder="Enter Contract Address"
            onChange={handleContractAddressChange}
          />
        </div>

        <div className="controls-row">
          <select
            className="network-dropdown"
            onChange={handleNetworkChange}
            value={selectedNetwork}
          >
            <option value="optimism-mainnet">Optimism Mainnet</option>
            <option value="matic-mainnet">Polygon Mainnet</option>
            <option value="eth-mainnet">Ethereum Mainnet</option>
            {/* Add more options for other networks if needed */}
          </select>
          <button
            className="fetch-button"
            onClick={handleFetchBalances}
            onMouseEnter={() => handleButtonHover("fetchBalances")}
            onMouseLeave={() => handleButtonHover("")}
          >
            Fetch NFTs
          </button>
          <button
            className="fetch-button"
            onClick={handleGetAllApproval}
            onMouseEnter={() => handleButtonHover("fetchBalances")}
            onMouseLeave={() => handleButtonHover("")}
          >
            Get All Approvals
          </button>
          <button
            className="fetch-button"
            onClick={handleGetTokenPricings}
            onMouseEnter={() => handleButtonHover("getTokenPricings")}
            onMouseLeave={() => handleButtonHover("")}
          >
            Get Token historical Pricings
          </button>
        </div>

        <div className="table-main-class">
          <table className="balance-table">
            <thead>
              <tr>
                {response.length > 0 &&
                  Object.keys(response[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {response.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key) => (
                    <td key={key}>
                      {Array.isArray(item[key]) ? (
                        <ul>
                          {item[key].map((subItem, subIndex) => (
                            <li key={subIndex}>{JSON.stringify(subItem)}</li>
                          ))}
                        </ul>
                      ) : (
                        JSON.stringify(item[key])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NewComponent;
