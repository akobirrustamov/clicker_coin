import React, { useEffect, useState } from 'react';

const messages = [
  {
    title: 'Добро пожаловать!',
    description: 'Забери бонус за первый вход.',
  },
  {
    title: 'Играй каждый день!',
    description: 'И получай награды без выходных.',
  },
  {
    title: 'Открывай достижения',
    description: 'И зарабатывай монеты за активность.',
  },
];

const TextSlider = () => {
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIn(false); // уезжаем влево
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length); // меняем текст
        setSlideIn(true); // въезжаем с правой стороны
      }, 500); // время выезда
    }, 4000); // каждые 4 секунды

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-2">
      <div
        className={`w-full max-w-2xl mx-auto text-center transition-transform duration-500 ${
          slideIn ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="font-bold text-sm text-gray-800 mb-1">
          {messages[index].title}
        </h2>
        <p className="text-gray-600 text-xs">{messages[index].description}</p>
      </div>
    </div>
  );
};

export default TextSlider;
