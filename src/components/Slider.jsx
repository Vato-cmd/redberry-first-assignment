import { useState, useEffect } from "react";
import Button from "./UI/Button";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import ArrowLeftWhite from "../assets/Arrowleft-white.png";
import ArrowLeftGreyed from "../assets/Arrowleft-greyed.png";
import ArrowRightWhite from "../assets/Arrowright-white.png";
import ArrowRightGreyed from "../assets/Arrowright-greyed.png";

const slides = [slide1, slide2, slide3];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const isFirst = current === 0;
  const isLast = current === slides.length - 1;

  return (
    <div className="relative w-full mt-[64px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="slide"
            className="w-full h-[420px] rounded-[30px] object-cover flex-shrink-0 "
          />
        ))}
      </div>
      <div className={`flex gap-[30px] absolute right-[48px] bottom-[55px]`}>
        <Button
          className="w-[54px] h-[54px]"
          onClick={prevSlide}
          disabled={isFirst}
        >
          <img
            src={isFirst ? ArrowLeftGreyed : ArrowLeftWhite}
            alt="left arrow"
          />
        </Button>

        <Button
          className="w-[54px] h-[54px]"
          onClick={nextSlide}
          disabled={isLast}
        >
          <img
            src={isLast ? ArrowRightGreyed : ArrowRightWhite}
            alt="right arrow"
          />
        </Button>
      </div>
    </div>
  );
}
