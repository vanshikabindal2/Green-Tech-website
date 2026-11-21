import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./Components/Preloader/Preloader";

import Scroll from "./Components/Scroll/Scroll";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Contact from "./Pages/Contact/Contact";
import Butterfly from "./Components/Butterfly";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import Service from "./Pages/Service/Service";
import Getquote from "./Pages/GetQuote/Getquote";
import Gallery from "./Pages/Gallery/Gallery";

function App() {
  const location = useLocation();

  return (
    <>
      <Preloader />
      <Navbar />
      <Butterfly />
      <Scroll />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/getquote" element={<Getquote />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;