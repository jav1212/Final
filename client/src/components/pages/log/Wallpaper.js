import React, { useEffect, useState } from "react";
import slide2 from "../../../images/LoginWallpaper.jpg";
import slide3 from "../../../images/LoginWallpaper1.jpg";
import slide4 from "../../../images/LoginWallpaper2.jpg";
import "../../../App.css";

const Wallpaper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [change, setChange] = useState(false);

  const slides = [
    { slide: slide2, alt: "" },
    {
      slide: slide3,
      alt: "Bid to Win! Discover the Best Online Auctions on Our Platform.",
    },
    {
      slide: slide4,
      alt: "Make Your Dreams Come True by Bidding on What You Desire Most! Join Our Online Auctions Now.",
    },
  ];

  const timer = () => {
    setChange(true);
    setTimeout(() => {
      setChange(false);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      const isLast = currentIndex === slides.length - 1;
      const newIndex = isLast ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 4000);
    timer();
  }, [currentIndex, setCurrentIndex, slides.length]);
  return (
    <div className=" h-screen w-2/4 flex justify-center items-center flex-col ">
      {
        <img
          className=" w-9/12 app"
          alt="Login Wallpaper"
          src={slides[currentIndex].slide}
          loading="lazy"
          style={change ? { animation: "fadeIn 1s" } : { opacity: "1" }}
        />
      }
      {
        <div className=" w-9/12">
          <h1
            className=" text-4xl mt-10 font-bold"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {slides[currentIndex].alt}
          </h1>
        </div>
      }
    </div>
  );
};

export default Wallpaper;
