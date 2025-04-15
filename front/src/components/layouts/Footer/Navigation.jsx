import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../SideMenu/SideMenu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Asosiy");

  // Функция для обновления активной вкладки
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleMenuClick = (menu) => {
    if (menu === "Menu") {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex w-full max-w-xl justify-between items-center px-1 py-2 border-t-2 border-gray-300 bg-white">
          {/* Asosiy Tab */}
          <Link
            to={"/"}
            className={`flex flex-col items-center w-1/5 border-r-2 border-gray-200 `}
            onClick={() => handleTabClick("Asosiy")}
          >
            <i
              className={`fa-solid fa-house ${
                activeTab === "Asosiy" ? "text-blue-500" : "text-gray-500"
              }`}
            ></i>
            <p
              className={`mt-1 text-xs  ${
                activeTab === "Asosiy"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Asosiy
            </p>
          </Link>

          {/* Hisobot Tab */}
          <Link
            to={"/hisobot"}
            className={`flex flex-col items-center w-1/5 border-r-2 border-gray-200`}
            onClick={() => handleTabClick("Hisobot")}
          >
            <i
              className={`fa-solid fa-chart-line  ${
                activeTab === "Hisobot"
                  ? "text-green-500 font-semibold"
                  : "text-gray-500"
              }`}
            ></i>
            <p
              className={`mt-1 text-xs  ${
                activeTab === "Hisobot"
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Hisobot
            </p>
          </Link>

          {/* Sariflash Tab */}
          <Link
            to={"/sariflash"}
            className={`flex flex-col items-center w-1/5 border-r-2 border-gray-200 `}
            onClick={() => handleTabClick("Sariflash")}
          >
            <i
              className={`fa-solid fa-wallet ${
                activeTab === "Sariflash" ? "text-yellow-500 " : "text-gray-500"
              }`}
            ></i>
            <p
              className={`mt-1 text-xs  ${
                activeTab === "Sariflash"
                  ? "text-yellow-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Sariflash
            </p>
          </Link>

          {/* Topshiriqlar Tab */}
          <Link
            to={"/topshiriqlar"}
            className={`flex flex-col items-center w-1/5 border-r-2 border-gray-200 `}
            onClick={() => handleTabClick("Topshiriqlar")}
          >
            <i
              className={`fa-solid fa-tasks ${
                activeTab === "Topshiriqlar"
                  ? "text-purple-500"
                  : "text-gray-500"
              }`}
            ></i>
            <p
              className={`mt-1 text-xs  ${
                activeTab === "Topshiriqlar"
                  ? "text-purple-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Topshiriqlar
            </p>
          </Link>

          {/* Menu Tab */}
          <p
            className={`flex flex-col items-center w-1/5 `}
            onClick={() => handleMenuClick("Menu")}
          >
            <i
              className={`fa-solid fa-bars
                text-gray-500`}
            ></i>
            <p className={`mt-1 text-xs text-gray-700`}>Menu</p>
          </p>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <SideMenu onClose={() => setIsMenuOpen(false)} />
        </>
      )}
    </>
  );
};

export default Navigation;
