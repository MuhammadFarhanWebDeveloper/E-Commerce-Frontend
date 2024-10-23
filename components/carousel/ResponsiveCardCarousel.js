"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ResponsiveCardCarousel = ({children}) => {
  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10 hidden md:block"
      onClick={onClick}
    >
      <AiOutlineLeft size={24} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10 hidden md:block"
      onClick={onClick}
    >
      <AiOutlineRight size={24} />
    </button>
  );

  
  const settings = {
    speed: 500,
    slidesToShow: 4, // Default slides to show
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // For screens <= 1024px
        settings: {
          slidesToShow: 3, // Show 3 slides
          slidesToScroll: 1,
       
        },
      },
      {
        breakpoint: 600, // For screens <= 600px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For smaller screens <= 480px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings} className="w-full">
        {children}
      </Slider>
    </div>
  );
};

export default ResponsiveCardCarousel;
