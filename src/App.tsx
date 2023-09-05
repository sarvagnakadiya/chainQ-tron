// import { ConnectWallet } from "./ConnectWallet";
import "./App.css";
// @ts-ignore
import  MainDashboard from "./components/MainDashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// @ts-ignore
import Home from "./components/Home";


export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/chat-dashboard"
            element={<MainDashboard />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
