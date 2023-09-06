import * as React from "react";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import ReactDOM from "react-dom/client";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App></App>
    <Toaster />
  </React.StrictMode>
);
