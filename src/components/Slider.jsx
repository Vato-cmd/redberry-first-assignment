import { useState, useEffect } from "react";
import Button from "./UI/Button";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import ArrowLeftWhite from "../assets/Arrowleft-white.png";
import ArrowLeftGreyed from "../assets/Arrowleft-greyed.png";
import ArrowRightWhite from "../assets/Arrowright-white.png";
import ArrowRightGreyed from "../assets/Arrowright-greyed.png";

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
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const isFirst = current === 0;
  const isLast = current === slides.length - 1;

  return (
    <div className="relative w-full mt-[64px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-[420px] flex-shrink-0 relative rounded-[30px] overflow-hidden"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-start px-[48px] pt-[48px] pb-[140px] text-white bg-black/30">
              <h2 className="text-[48px] font-[700]">{slide.title}</h2>
              <p className="text-[24px] font-[300] w-[1218px] mb-[40px]">
                {slide.text}
              </p>
              <Button className="bg-[#4F46E5] w-[206px] h-[64px] rounded-[8px] py-[17px] px-[25px] text-[20px] font-[500]">
                {slide.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-[30px] absolute right-[48px] bottom-[55px]">
        <Button className="w-[54px] h-[54px]" onClick={prevSlide}>
          <img
            src={isFirst ? ArrowLeftGreyed : ArrowLeftWhite}
            alt="left arrow"
          />
        </Button>

        <Button className="w-[54px] h-[54px]" onClick={nextSlide}>
          <img
            src={isLast ? ArrowRightGreyed : ArrowRightWhite}
            alt="right arrow"
          />
        </Button>
      </div>

      <div className="absolute bottom-[78px] left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <span
            key={index}
            className={`w-14.25 h-2 mr-[12px] rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
