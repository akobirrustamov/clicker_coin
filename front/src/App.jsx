import React, { useState, useEffect } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter, logo } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';

const App = () => {
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
    "Lord"
  ];

  const levelMinPoints = [
    0, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 100000000, 1000000000
  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState([]);
  const pointsToAdd = 10;

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

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
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
          <div className="px-4 z-10">
            <div className="flex items-center space-x-2 pt-4">
              <div className="p-2 rounded-lg bg-white shadow-md">
                <Hamster size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Akobir dev</p>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4 mt-4">
              <div className="flex items-center w-1/3">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-700">{levelNames[levelIndex]}</p>
                    <p className="text-sm text-gray-500">{levelIndex + 1} <span className="text-gray-400">/ {levelNames.length}</span></p>
                  </div>
                  <div className="flex items-center mt-1 border border-gray-300 rounded-full">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-2/3 border border-gray-300 rounded-full px-4 py-1 bg-white shadow-sm max-w-64">
                <img src={binanceLogo} alt="Exchange" className="w-6 h-6" />
                <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 font-medium">Profit per hour</p>
                  <div className="flex items-center justify-center space-x-1">
                    <img src={dollarCoin} alt="Dollar Coin" className="w-[14px] h-[14px]" />
                    <p className="text-sm text-gray-700">{formatProfitPerHour(profitPerHour)}</p>
                    <Info size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>
                <Settings className="text-gray-600" size={18} />
              </div>
            </div>
          </div>

          <div className="flex-grow mt-6 bg-gradient-to-r  from-purple-400 to-blue-400 rounded-t-[48px] relative overflow-hidden">
            <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-white rounded-t-[46px] shadow-inner">
              <div className="px-4 mt-6 flex justify-between gap-3">
                <div className="bg-white rounded-lg px-4 py-3 w-full relative shadow-md border border-gray-100">
                  <div className="dot bg-purple-500"></div>
                  <img src={dailyReward} alt="Daily Reward" className="mx-auto w-10 h-10" />
                  <p className="text-xs text-center text-gray-700 mt-1">Daily reward</p>
                  <p className="text-xs font-medium text-center text-purple-500 mt-1">{dailyRewardTimeLeft}</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 w-full relative shadow-md border border-gray-100">
                  <div className="dot bg-blue-500"></div>
                  <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-10 h-10" />
                  <p className="text-xs text-center text-gray-700 mt-1">Daily cipher</p>
                  <p className="text-xs font-medium text-center text-blue-500 mt-1">{dailyCipherTimeLeft}</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 w-full relative shadow-md border border-gray-100">
                  <div className="dot bg-pink-500"></div>
                  <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-10 h-10" />
                  <p className="text-xs text-center text-gray-700 mt-1">Daily combo</p>
                  <p className="text-xs font-medium text-center text-pink-500 mt-1">{dailyComboTimeLeft}</p>
                </div>
              </div>

              <div className="relative mt-20 mx-4" onClick={handleCardClick}>
                <div className="click-card max-w-[280px] mx-auto flex flex-col items-center justify-center rounded-full p-8 pb-6 overflow-hidden relative cursor-pointer z-10">
                  <img src={logo} alt="Main Character" className="main-character z-20 relative w-32 h-32" />
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-full h-full absolute left-0 top-0 rounded-full"></div>
                </div>
                {clicks.map(click => (
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

              <div className="flex flex-wrap justify-between w-full items-center px-4 mt-8 py-2 rounded-t-3xl bg-blue-200 absolute bottom-0">
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Mine className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex items-center bg-white rounded-xl p-2 font-bold px-4 shadow-md border border-gray-100">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <p className="text-gray-700 text-sm ml-2">{points}</p>
                </div>
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Friends className="w-6 h-6 text-blue-500" />
                </div>
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Info className="w-6 h-6 text-gray-500" />
                </div>
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Settings className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;