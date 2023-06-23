import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Auctions from "./components/pages/common/Auctions";
import Product from "./components/pages/common/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
