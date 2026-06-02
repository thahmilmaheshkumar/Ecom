import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const Imageslider = ({ image, isproductpage = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1,
    );
  };
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % image.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative overflow-hidden shadow-lg w-full">
      {/* slider offers*/}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {image.map((img, index) => (
          <img
            key={index}
            src={`${isproductpage ? img.urls : img}`}
            className={`w-full h-67 md:h-87 object-cover shrink-0 ${isproductpage ? "rounded-2xl hover:scale-105 cursor-pointer transition-transform duration-300" : ""}`}
          />
        ))}
      </div>

      {/* slider controls */}

      {/* previous */}
      <button
        onClick={prevSlide}
        className="absolute bg-black/40 left-4 top-1/2 text-white p-2 rounded-full transition"
      >
        <ChevronLeft />
      </button>

      {/* next */}
      <button
        onClick={nextSlide}
        className="absolute bg-black/40 right-4 top-1/2 text-white p-2 rounded-full transition"
      >
        <ChevronRight />
      </button>

      {/* indicators */}
      <div className="absolute bottom-4 left-1/2 flex">
        {image.map((img, index) => {
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 transition-all bg-white rounded-full mx-1 ${index === activeIndex ? "w-8 bg-blue-500" : ""}`}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Imageslider;
