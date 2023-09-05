import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import React from "react";
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
} from "@tronweb3/tronwallet-adapter-react-hooks";
import {
  WalletModalProvider,
} from "@tronweb3/tronwallet-adapter-react-ui";
import toast from "react-hot-toast";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";

function onError(e: WalletError) {
  console.log(e);
  if (e instanceof WalletNotFoundError) {
    alert(e.message)
    toast.error(e.message);
  } else if (e instanceof WalletDisconnectedError) {
    toast.error(e.message);
  } else toast.error(e.message);
}

const adapters = [new TronLinkAdapter()];

function onConnect() {
  console.log("onConnect");
}

async function onAccountsChanged() {
  console.log("onAccountsChanged");
}

async function onAdapterChanged(adapter: Adapter | null) {
  console.log("onAdapterChanged", adapter);
}

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
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
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </React.StrictMode>
  );
}

renderApp();
