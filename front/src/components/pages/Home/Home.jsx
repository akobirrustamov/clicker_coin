import React, { useState, useEffect } from "react";
import "./Home.css";
import Hamster from "../../../icons/Hamster";
import {
  binanceLogo,
  dailyCipher,
  dailyCombo,
  dailyReward,
  dollarCoin,
  hamsterCoin,
  mainCharacter,
  logo,
  testLogo,
} from "../../../images";
import Info from "../../../icons/Info";
import Settings from "../../../icons/Settings";
import Mine from "../../../icons/Mine";
import Friends from "../../../icons/Friends";
import Coins from "../../../icons/Coins";
import TextSlider from "./TextSlider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Home = () => {
  const levelNames = [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Epic",
    "Legendary",
    "Master",
    "GrandMaster",
    "Lord",
  ];

  const levelMinPoints = [
    0, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 100000000,
    1000000000,
  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(0);
  const [coinsSpent, setCoinsSpent] = useState(0);
  const [clicks, setClicks] = useState([]);
  const pointsToAdd = 1;

  const coinsEarned = clicks.length * pointsToAdd;
  const coinBalance = coinsEarned - coinsSpent;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("00:00");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("00:00");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("00:00");

  const dailyRewardDuration = 24 * 60 * 60 * 1000;
  const dailyCipherDuration = 24 * 60 * 60 * 1000;
  const dailyComboDuration = 24 * 60 * 60 * 1000;

  const calculateTimeLeft = (duration) => {
    const now = new Date().getTime();
    const targetTime = now + duration;
    const diff = targetTime - now;

    if (diff <= 0) {
      return "00:00";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(dailyRewardDuration));
      setDailyCipherTimeLeft(calculateTimeLeft(dailyCipherDuration));
      setDailyComboTimeLeft(calculateTimeLeft(dailyComboDuration));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress =
      ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex]);

  const formatProfitPerHour = (profit) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  const profitPerHour = points * 10;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 flex justify-center">
      <div className="w-full text-gray-800 h-screen font-bold flex flex-col max-w-xl">
        <div className=" z-10">
          <div className="flex items-center justify-center pt-4">
            {/* <div className="p-2 rounded-lg bg-white shadow-md">
              <Hamster size={24} className="text-purple-500" />
            </div> */}
            <div>
              <p className="text-4xl text-blue-800 font-thin font-serif text-center">
                {/* OXU */}
                BXU
              </p>
            </div>
          </div>
          <div className="border-2 rounded border-red-400 mt-2">
            <TextSlider />
          </div>
          {/* <div className="flex items-center mx-2 justify-between space-x-4 mt-4">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-700">
                    {levelNames[levelIndex]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {levelIndex + 1}{" "}
                    <span className="text-gray-400">/ {levelNames.length}</span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border border-gray-300 rounded-full">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="progress-gradient h-2 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-2/3 border border-gray-300 rounded-full px-4 py-1 bg-white shadow-sm max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-6 h-6" />
              <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  Profit per hour
                </p>
                <div className="flex items-center justify-center space-x-1">
                  <img
                    src={dollarCoin}
                    alt="Dollar Coin"
                    className="w-[14px] h-[14px]"
                  />
                  <p className="text-sm text-gray-700">
                    {formatProfitPerHour(profitPerHour)}
                  </p>
                  <Info size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>
              <Settings className="text-gray-600" size={18} />
            </div>
          </div> */}
        </div>

        <div className="flex-grow relative overflow-hidden">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-white shadow-inner">
            <div className="flex justify-between items-center px-4 mt-2">
              <p className="font-serif text-3xl font-light">Earning</p>
              <div className="flex items-center gap-2 space-x-2 text-2xl">
                <p className="p-1 px-3 bg-blue-200 rounded text-blue-600">+</p>
                <i class="fa-regular fa-bell text-gray-500"></i>
              </div>
            </div>

            <div
              className="w-full mt-6 main-character "
              onClick={handleCardClick}
            >
              <div className="click-card max-w-[280px] mx-auto flex flex-col items-center justify-center p-4 overflow-hidden relative cursor-pointer z-10">
                <img
                  src={testLogo}
                  alt="Main Character"
                  className="main-character z-20 relative w-60 h-72 object-cover"
                />
                <div className=""></div>
              </div>
              {clicks.map((click) => (
                <div
                  key={click.id}
                  className="coin-fall absolute"
                  onAnimationEnd={() => handleAnimationEnd(click.id)}
                  style={{ left: `${click.x}px`, top: `${click.y}px` }}
                >
                  {/* Coin animation */}
                </div>
              ))}
            </div>
            {/* <div className="flex items-center mx-2 justify-between space-x-4 mt-4">
              <div className="flex items-center w-1/3">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-700">
                      {levelNames[levelIndex]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {levelIndex + 1}{" "}
                      <span className="text-gray-400">
                        / {levelNames.length}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center mt-1 border border-gray-300 rounded-full">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="progress-gradient h-2 rounded-full"
                        style={{ width: `${calculateProgress()}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-2/3 border border-gray-300 rounded-full px-4 py-1 bg-white shadow-sm max-w-64">
                <img src={binanceLogo} alt="Exchange" className="w-6 h-6" />
                <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 font-medium">
                    Profit per hour
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    <img
                      src={dollarCoin}
                      alt="Dollar Coin"
                      className="w-[14px] h-[14px]"
                    />
                    <p className="text-sm text-gray-700">
                      {formatProfitPerHour(profitPerHour)}
                    </p>
                    <Info size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>
                <Settings className="text-gray-600" size={18} />
              </div>
            </div> */}
            {/* Статистика кликов и монет */}
            <div className="w-full px-6 mt-4 border-t-2 border-gray-200">
              <div className="bg-white p-4">
                <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                  <div className="border-r-2 border-gray-200 pr-4">
                    <p className="font-bold text-green-600">{coinsEarned}</p>
                    <p>Заработано</p>
                  </div>
                  <div className="border-r-2 border-gray-200 pr-4">
                    <p className="font-bold text-red-500">{coinsSpent}</p>
                    <p>Потрачено</p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-600">{coinBalance}</p>
                    <p>Остаток:</p>
                  </div>
                </div>

                {/* Кнопка для теста траты */}
                {/* <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      if (coinBalance >= 50) setCoinsSpent(coinsSpent + 50);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Потратить 50 монет
                  </button>
                </div> */}
              </div>
            </div>

            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
