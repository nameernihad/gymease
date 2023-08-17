import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogPostCard from "./InfoCard";
import { motion } from "framer-motion";
import AboutContentImageSection from "./about";
import ImageWithBotton from "./image&start";
import PricingSection from "./Package";
import Footer from "./footer";

export default function CustomCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef(null);
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setActiveIndex(next),
    afterChange: (current) => setActiveIndex(current),
    nextArrow: null,
    prevArrow: null,
  };

  const slides = [
    {
      imageUrl:
        "https://e1.pxfuel.com/desktop-wallpaper/554/24/desktop-wallpaper-black-fitness-gym-men.jpg",
      title: "WORK HARD OR GO HOME",
      description:
        '"Discover a new era of fitness with our online gym platform. Access personalized workouts, expert guidance, and a supportive community – all at your fingertips. Your fitness journey, reimagined."',
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      title: "TRAIN BEYOND YOUR COMFORT ZONE",
      description:
        "Experience fitness evolution through our virtual gym platform. Access tailored workouts, masterful guidance, and a community that fuels your progress",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      title: "HUSTLE FOR THAT MUSCLE",
      description:
        "Reinvent your fitness expedition with our online gym sanctuary. Engage in tailored workouts, learn from experts, and connect with fellow enthusiasts",
    },
    {
      imageUrl:
        "https://c0.wallpaperflare.com/preview/719/689/312/fitness-sports-gym-exercise.jpg",
      title: "NO LIMITS, JUST RESULTS",
      description:
        "Embark on a fitness revolution through our virtual gym haven. Unearth personalized workouts, glean expert wisdom, and thrive within a united community",
    },
  ];

  return (
    <>
      <div className="bg-black">
        <Slider ref={sliderRef} {...settings} autoplay pauseOnHover={false}>
          {slides.map((slide, index) => (
            <div className="carousel-item relative" key={index}>
              <div className="relative">
                <img
                  alt="..."
                  src={slide.imageUrl}
                  className="w-full h-screen object-cover"
                />
                {index !== slides.length - 1 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                )}
              </div>
              <div className="carousel-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black bg-opacity-50 p-4 rounded">
                <h1 className="text-3xl font-bold mb-2">{slide.title}</h1>
                <p className="text-lg mb-4">{slide.description}</p>
                <button className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded">
                  Get Started Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
        <div className="carousel-pagination absolute bottom-16 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          <ul className="slick-dots">
            {slides.map((_, dotIndex) => (
              <li
                key={dotIndex}
                className={dotIndex === activeIndex ? "slick-active" : ""}
              >
                <button className="w-4 h-4 rounded-full bg-white"></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center h-16 bg-black">
        <p className="font-dancing-script  text-4xl  text-amber-500">
          WHAT YOU GET HERE
        </p>
      </div>
      <div className="bg-black mt-0 w-full">
        <div className="bg-transparent ">
          <motion.div
            className="bg-transparent"
            initial="hidden"
            variants={variants}
            whileInView={"visible"}
            transition={{ duration: 0.5 }}
          >
            <BlogPostCard />
          </motion.div>
        </div>
        <div>
          <AboutContentImageSection />
        </div>
        <div>
          <ImageWithBotton />
        </div>
      </div>
      <div className="flex items-center justify-center h-16 bg-black">
        <p className="font-dancing-script  text-4xl  text-amber-500">
          Choose The Right Plan
        </p>
      </div>
      <div className="bg-black">
        <PricingSection />
      </div>
      <div className="bg-black">
        <Footer />
      </div>
      <style>
        {`.slick-next {
          display: none !important;
        }`}
      </style>
    </>
  );
}
