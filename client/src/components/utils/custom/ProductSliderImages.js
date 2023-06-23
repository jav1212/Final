import React, { useEffect, useState } from "react";
import { socket } from "../../../config/socket";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductSliderImages = ({ id_product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataArrived, setDataArrived] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!dataArrived) {
      socket.emit("get_images", id_product);
      function onPostImages(data) {
        setImages(data);
        setDataArrived(true);
      }

      socket.on("post_images", (data) => onPostImages(data));
      return () => {
        socket.off("post_images", (data) => onPostImages(data));
      };
    }
  }, [socket]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(images.length - 1);
  };

  return (
    <div className=" flex w-fit">
      <div className="flex flex-col items-center justify-center w-1/5 gap-9">
        {images.map((image, index) => {
          return (
            <img
              key={index}
              alt=""
              src={image.url_image}
              style={{
                width: "60%",
                filter: currentIndex !== index ? "grayscale(70%)" : "",
              }}
              className={`${
                currentIndex === index
                  ? "transform scale-125 transition duration-300 ease-in-out"
                  : "filter grayscale-full"
              }`}
            />
          );
        })}
      </div>
      <div className=" flex-col justify-center items-center ">
        <img
          alt=""
          src={dataArrived ? images[currentIndex].url_image : ""}
          style={{ width: "600px", height: "550px", objectFit: "contain" }}
          loading="lazy"
          className=" mb-10"
        />
        <div className="flex-wrap flex items-center justify-center gap-32">
          <div className="">
            <IoIosArrowBack
              size="50"
              color=" grey"
              cursor="pointer"
              onClick={handlePrev}
              className=" transform scale-100 hover:scale-125 transition duration-300 ease-in-out"
            />
          </div>
          <div className="">
            <IoIosArrowForward
              size="50"
              color=" grey"
              cursor="pointer"
              onClick={handleNext}
              className=" transform scale-100 hover:scale-125 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSliderImages;
