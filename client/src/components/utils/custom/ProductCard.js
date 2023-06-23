import React, { useEffect, useState } from "react";
import { socket } from "../../../config/socket";

const ProductCard = ({
  nombre,
  descripcion,
  precio,
  marca,
  modelo,
  año,
  id_producto,
  id_cliente,
  min_offer,
}) => {
  const [offer, setOffer] = useState({
    precio: "",
  });

  const handleChange = (e) => {
    setOffer({
      ...offer,
      [e.target.name]: e.target.value,
    });
  };

  const handleOffer = (e) => {
    e.preventDefault();

    const { precio } = offer;
    if (precio >= min_offer) {
      socket.emit("validate_offer", {
        id_producto: id_producto,
        id_cliente: id_cliente,
        offer: min_offer,
      });
    } else console.log("no");
  };

  useEffect(() => {
    function onResponseOffer(data) {
      console.log(data);
    }

    socket.on("response_offer", (data) => onResponseOffer(data));
    return () => {
      socket.off("response_offer", (data) => onResponseOffer(data));
    };
  }, [socket]);

  return (
    <div className=" w-full">
      <div className=" flex  ml-24 mb-10">
        <h2 className=" text-4xl text-gray-900 font-semibold font-[Dosis]">
          {marca.toUpperCase()}
        </h2>
      </div>
      <div className=" flex ml-24 mb-10">
        <h1 className=" text-6xl font-semibold font-[Dosis]">{nombre}</h1>
      </div>
      <div className=" flex ml-24 mb-10">
        <p className=" text-3xl text-gray-400 font-light text-justify">
          {descripcion}
        </p>
      </div>
      <div className=" flex ml-24 mb-20 justify-between">
        <h2 className=" text-4xl font-[Dosis]">USD{precio}</h2>
        <h2 className=" text-4xl font-semibold font-[Dosis]">
          {modelo.toUpperCase()}
        </h2>
        <h2 className=" text-4xl font-[Dosis]">{año}</h2>
      </div>
      <div className=" flex ml-24 mb-20 justify-center gap-44">
        <div className=" flex justify-center items-center">
          <form className=" flex">
            <input
              onChange={handleChange}
              name="precio"
              required
              className=" text-center text-3xl placeholder:text-center placeholder:text-3xl font-[Dosis] w-full border text-3x placeholder:font-[Dosis] hover:border-gray-400 focus:outline-none"
              placeholder={`min ${min_offer}`}
            />
            <button
              onClick={handleOffer}
              className=" text-center font-semibold rounded text-white text-4xl px-8 py-2 border-gray-400 border-2 bg-azulgris"
            >
              Offer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
