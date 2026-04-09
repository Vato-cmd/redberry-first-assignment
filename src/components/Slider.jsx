import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./UI/Button";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import ArrowLeftWhite from "../assets/Arrowleft-white.png";
import ArrowLeftGreyed from "../assets/Arrowleft-greyed.png";
import ArrowRightWhite from "../assets/Arrowright-white.png";
import ArrowRightGreyed from "../assets/Arrowright-greyed.png";
import disabledArrow from "../assets/disabledArrow.svg";

const slides = [
  {
    image: slide1,
    title: "Start learning something new today",
    text: "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    buttonText: "Browse Courses",
  },
  {
    image: slide2,
    title: "Pick up where you left off",
    text: "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    buttonText: "Start Learning",
  },
  {
    image: slide3,
    title: "Learn together, grow faster",
    text: "",
    buttonText: "Learn More",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev < slides.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const isFirst = current === 0;
  const isLast = current === slides.length - 1;

  return (
    <div className="relative w-391.5 mx-auto mt-16 overflow-hidden">
      <Link to="/courses">
        <div
          className="flex transition-transform duration-700 ease-in-out h-105"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full shrink-0 relative rounded-[30px] overflow-hidden cursor-pointer"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex flex-col justify-center items-start px-12 pt-12 pb-35 text-white bg-black/30">
                <h2 className="text-[48px] font-bold">{slide.title}</h2>
                <p className="text-[24px] font-light w-304.5 mb-10">
                  {slide.text}
                </p>
                <Button className="bg-[#4F46E5] w-51.5 h-16 rounded-lg py-4.25 px-6.25 text-[20px] font-medium">
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Link>

      <div className="flex items-center justify-center gap-7.5 absolute right-12 bottom-13.75">
        <Button className="w-13.5 h-13.5" onClick={prevSlide}>
          <img
            src={isFirst ? ArrowLeftGreyed : ArrowLeftWhite}
            alt="left arrow"
          />
        </Button>

        <Button className="w-13.5 h-13.5" onClick={nextSlide}>
          <img
            src={isLast ? ArrowRightGreyed : ArrowRightWhite}
            alt="right arrow"
            className={isLast ? `w-11.5 h-11.5` : `w-13.5 h-13.5`}
          />
        </Button>
      </div>

      <div className="absolute bottom-19.5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <span
            key={index}
            className={`w-14.25 h-2 mr-3 rounded-full ${
              current === index ? "bg-white" : "bg-[#C1BCBC80]"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
