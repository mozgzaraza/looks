import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          {/* <Catalog /> */}
        </Routes>

        <Contacts />
      </main>

      <Footer />
    </div>
  );
}

export default App;
