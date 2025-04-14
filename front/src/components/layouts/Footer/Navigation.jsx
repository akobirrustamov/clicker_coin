import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("Asosiy");

  // Функция для обновления активной вкладки
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-xl justify-between items-center px-4 mt-4 py-2 absolute bottom-0 border-t-2 border-gray-300 bg-white">
        {/* Asosiy Tab */}
        <Link
          to={"/"}
          className={`flex flex-col items-center w-1/5 border-r-2 border-gray-200 `}
          onClick={() => handleTabClick("Asosiy")}
        >
          <i
            className={`fa-solid fa-house text-xl ${
              activeTab === "Asosiy" ? "text-blue-500" : "text-gray-500"
            }`}
          ></i>
          <p
            className={`mt-1 text-sm font-semibold ${
              activeTab === "Asosiy" ? "text-blue-600" : "text-gray-700"
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
            className={`fa-solid fa-chart-line text-xl ${
              activeTab === "Hisobot" ? "text-green-500" : "text-gray-500"
            }`}
          ></i>
          <p
            className={`mt-1 text-sm font-semibold ${
              activeTab === "Hisobot" ? "text-green-600" : "text-gray-700"
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
            className={`fa-solid fa-wallet text-xl ${
              activeTab === "Sariflash" ? "text-yellow-500" : "text-gray-500"
            }`}
          ></i>
          <p
            className={`mt-1 text-sm font-semibold ${
              activeTab === "Sariflash" ? "text-yellow-600" : "text-gray-700"
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
            className={`fa-solid fa-tasks text-xl ${
              activeTab === "Topshiriqlar" ? "text-purple-500" : "text-gray-500"
            }`}
          ></i>
          <p
            className={`mt-1 text-sm font-semibold ${
              activeTab === "Topshiriqlar" ? "text-purple-600" : "text-gray-700"
            }`}
          >
            Topshiriqlar
          </p>
        </Link>

        {/* Menu Tab */}
        <Link
          to={"/menu"}
          className={`flex flex-col items-center w-1/5 `}
          onClick={() => handleTabClick("Menu")}
        >
          <i
            className={`fa-solid fa-bars text-xl ${
              activeTab === "Menu" ? "text-black" : "text-gray-500"
            }`}
          ></i>
          <p
            className={`mt-1 text-sm font-semibold ${
              activeTab === "Menu" ? "text-black" : "text-gray-700"
            }`}
          >
            Menu
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
