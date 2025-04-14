import React from "react";
import "./App.css";
import Home from "./components/pages/Home/Home";
import Hisobot from "./components/pages/Hisobot/Hisobot"; // Импортируем компонент Hisobot
import Sariflash from "./components/pages/Sariflash/Sariflash"; // Импортируем компонент Sariflash
import Topshiriqlar from "./components/pages/Topshiriqlar/Topshiriqlar"; // Импортируем компонент Topshiriqlar
import Header from "./components/layouts/Header/Header";
import Navigation from "./components/layouts/Footer/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Импортируем Router из react-router-dom

function App() {
  return (
    <Router>
      <div className="App h-screen flex flex-col">
        <Header />
        <div className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hisobot" element={<Hisobot />} />{" "}
            <Route path="/sariflash" element={<Sariflash />} />{" "}
            <Route path="/topshiriqlar" element={<Topshiriqlar />} />{" "}
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
