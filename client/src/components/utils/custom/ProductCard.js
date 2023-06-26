import React, { useEffect, useState } from "react";
import { socket } from "../../../config/socket";

const ProductCard = ({
  product,
  id_cliente,
  response,
  message,
  visibleNotification,
  setResponse,
  setMessage,
  setVIsibleNotification,
}) => {
  const [offer, setOffer] = useState({
    precio: "",
  });
  const [value, setValue] = useState("");
  const [actualPrice, setActualPrice] = useState(product.precio);
  const [minOffer, setMinOffer] = useState(getMinOffer(product.precio));

  function getMinOffer(precio) {
    return Math.trunc(
      parseInt(precio) +
        (parseInt(precio) * Math.floor(Math.random() * 10 + 1)) / 100
    );
  }

  const handleChange = (e) => {
    setOffer({
      ...offer,
      [e.target.name]: e.target.value,
    });
    setValue(e.target.value);
  };

  const handleOffer = (e) => {
    e.preventDefault();
    const { precio } = offer;
    if (precio >= minOffer) {
      console.log("manda a verificar la oferta");
      socket.emit("validate_offer", {
        id_producto: product.id_producto,
        id_cliente: id_cliente,
        offer: precio,
      });
    }
    setValue("");
  };

  useEffect(() => {
    function sendNotification(response, message) {
      setResponse(response);
      setMessage(message);
      setVIsibleNotification(true);
      setTimeout(() => {
        setVIsibleNotification(false);
      }, 3000);
    }

    function update_prices(newPrice) {
      setActualPrice(newPrice);
      setMinOffer(getMinOffer(newPrice));
    }

    function onNewOffer(data) {
      const { newPrice } = data;
      update_prices(newPrice);
    }

    function onResponseOffer(data) {
      const { response, message, newPrice } = data;
      if (response === "Successful") {
        update_prices(newPrice);
      }
      sendNotification(response, message);
    }

    function onSaleProduct(data) {
      console.log("Recibe posibilidad de venta");
      const { response, message, id_cliente_sale, id_producto } = data;
      if (id_cliente_sale === id_cliente)
        sendNotification(response, "Haz comprado un producto");
      else sendNotification("Warning", "Se ha vendido un producto");
    }
    socket.on("new_offer", (data) => onNewOffer(data));
    socket.on("response_offer", (data) => onResponseOffer(data));
    socket.on("sale_product", (data) => onSaleProduct(data));
    return () => {
      socket.on("new_offer", (data) => onNewOffer(data));
      socket.off("response_offer", (data) => onResponseOffer(data));
      socket.off("sale_product", (data) => onSaleProduct(data));
    };
  }, [id_cliente, setMessage, setResponse, setVIsibleNotification]);

  return (
    <div className=" w-full">
      <div className=" flex  ml-24 mb-10">
        <h2 className=" text-4xl text-gray-900 font-semibold font-[Dosis]">
          {product.marca.toUpperCase()}
        </h2>
      </div>
      <div className=" flex ml-24 mb-10">
        <h1 className=" text-6xl font-semibold font-[Dosis]">
          {product.nombre}
        </h1>
      </div>
      <div className=" flex ml-24 mb-10">
        <p className=" text-3xl text-gray-400 font-light text-justify">
          {product.descripcion}
        </p>
      </div>
      <div className=" flex ml-24 mb-20 justify-between">
        <h2 className=" text-4xl font-[Dosis]">USD{actualPrice}</h2>
        <h2 className=" text-4xl font-semibold font-[Dosis]">
          {product.modelo.toUpperCase()}
        </h2>
        <h2 className=" text-4xl font-[Dosis]">{product.año}</h2>
      </div>
      <div className=" flex ml-24 mb-20 justify-center gap-44">
        <div className=" flex justify-center items-center">
          <form className=" flex">
            <input
              onChange={handleChange}
              value={value}
              name="precio"
              required
              className=" text-center text-3xl placeholder:text-center placeholder:text-3xl font-[Dosis] w-full border text-3x placeholder:font-[Dosis] hover:border-gray-400 focus:outline-none"
              placeholder={`min ${minOffer}`}
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
