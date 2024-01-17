import React from "react";
import { Routes, Route } from "react-router-dom";

import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Home from "./pages/Home";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:productId" element={<Product />} />
        {/* <Catalog /> */}
      </Routes>
      <Contacts />

      <Footer />
    </div>
  );
}

export default App;
