import "./App.css";
import MainDashboard from "./components/MainDashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import { Widget } from "explorex";

import { useMemo } from "react";
import type {
  Adapter,
  WalletError,
} from "@tronweb3/tronwallet-abstract-adapter";
import {
  WalletDisconnectedError,
  WalletNotFoundError,
} from "@tronweb3/tronwallet-abstract-adapter";
import {
  WalletProvider,
  useWallet,
} from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletModalProvider } from "@tronweb3/tronwallet-adapter-react-ui";
import toast from "react-hot-toast";

import {
  TronLinkAdapter,
  TokenPocketAdapter,
  BitKeepAdapter,
  OkxWalletAdapter,
} from "@tronweb3/tronwallet-adapters";
import { WalletConnectAdapter } from "@tronweb3/tronwallet-adapter-walletconnect";
import { LedgerAdapter } from "@tronweb3/tronwallet-adapter-ledger";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function App() {
  // const { connected, address } = useWallet();
  const [isSigned, setIsSigned] = useState();

  // useEffect(() => {
  //   // Check if the user has signed a message using cookies
  //   const signatureFromCookie = Cookies.get(address); // Use the address as the key
  //   if (signatureFromCookie) {
  //     setIsSigned(true);
  //   } else {
  //     setIsSigned(false); // Address changed, reset the sign status
  //   }
  // }, [address]);

  function onError(e: WalletError) {
    console.log(e);
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }
  const adapters = useMemo(function () {
    const tronLink1 = new TronLinkAdapter();
    const walletConnect1 = new WalletConnectAdapter({
      network: "Nile",
      options: {
        relayUrl: "wss://relay.walletconnect.com",
        // example WC app project ID
        projectId: "5fc507d8fc7ae913fff0b8071c7df231",
        metadata: {
          name: "Test DApp",
          description: "JustLend WalletConnect",
          url: "https://your-dapp-url.org/",
          icons: ["https://your-dapp-url.org/mainLogo.svg"],
        },
      },
      web3ModalConfig: {
        themeMode: "dark",
        themeVariables: {
          "--w3m-z-index": "1000",
        },
        // explorerRecommendedWalletIds: 'NONE',
        enableExplorer: true,
        explorerRecommendedWalletIds: [
          "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
          "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        ],
        // mobileWallets: [],
        // desktopWallets: []
        // explorerExcludedWalletIds: [
        //   '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
        //   '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
        //   '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        //   '802a2041afdaf4c7e41a2903e98df333c8835897532699ad370f829390c6900f',
        //   'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
        //   '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
        //   '6464873279d46030c0b6b005b33da6be5ed57a752be3ef1f857dc10eaf8028aa',
        //   '2c81da3add65899baeac53758a07e652eea46dbb5195b8074772c62a77bbf568'
        // ]
      },
    });
    const ledger = new LedgerAdapter({
      accountNumber: 2,
    });
    const tokenPocket = new TokenPocketAdapter();
    const bitKeep = new BitKeepAdapter();
    const okxWalletAdapter = new OkxWalletAdapter();
    return [
      tronLink1,
      walletConnect1,
      ledger,
      tokenPocket,
      bitKeep,
      okxWalletAdapter,
    ];
  }, []);
  function onConnect() {
    console.log("onConnect");
  }
  async function onAccountsChanged() {
    console.log("onAccountsChanged");
  }
  async function onAdapterChanged(adapter: Adapter | null) {
    console.log("onAdapterChanged", adapter);
  }

  const { connected, address } = useWallet();
  console.log(address);

  // function isUserAuthenticated() {
  //   const isConnected = connected;
  //   const signatureFromCookie = Cookies.get(address);
  //   return isConnected && signatureFromCookie;
  // }

  return (
    <WalletProvider
      onError={onError}
      onConnect={onConnect}
      onAccountsChanged={onAccountsChanged}
      onAdapterChanged={onAdapterChanged}
      autoConnect={true}
      adapters={adapters}
      disableAutoConnectOnLoad={true}
    >
      <WalletModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat-dashboard" element={<MainDashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </WalletModalProvider>
      {/* <Widget
        address="Connected wallet address"
        chain="Mainnet or Shasta or Nile"
      /> */}
    </WalletProvider>
  );
}
