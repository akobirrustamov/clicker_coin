import React, { useEffect, useRef, useState } from "react";

const SideMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем меню с анимацией при монтировании
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // таймер должен совпадать с duration в tailwind (300ms)
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchEndX - touchStartX;
      if (deltaX > 70) {
        closeWithAnimation();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    const menu = menuRef.current;
    menu.addEventListener("touchstart", handleTouchStart);
    menu.addEventListener("touchmove", handleTouchMove);
    menu.addEventListener("touchend", handleTouchEnd);

    return () => {
      menu.removeEventListener("touchstart", handleTouchStart);
      menu.removeEventListener("touchmove", handleTouchMove);
      menu.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX, touchEndX]);

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Menyu</h2>
        <button onClick={closeWithAnimation} className="text-gray-600 text-xl">&times;</button>
      </div>

      <div className="p-4">
        <button className="w-full text-left mb-4 text-sm text-gray-700 hover:text-blue-500">
          ⚙️ Sozlamalar
        </button>
        <button className="w-full text-left mb-4 text-sm text-gray-700 hover:text-blue-500">
          🎨 Mavzuni o'zgartirish
        </button>
        <button className="w-full text-left text-sm text-gray-700 hover:text-blue-500">
          🔒 Hisobdan chiqish
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
