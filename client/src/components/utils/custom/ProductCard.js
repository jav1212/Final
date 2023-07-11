import React, { useEffect, useState } from "react";
import { socket } from "../../../config/socket";
import LastMovements from "./LastMovements";

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
  const [available, setAvailable] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const [timer, setTimer] = useState(0);
  const [movement, setMovements] = useState([{}]);

  function getMinOffer(precio) {
    return Math.ceil(
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
      }, 5000);
    }

    function update_prices(newPrice) {
      setActualPrice(newPrice);
      setMinOffer(getMinOffer(newPrice));
    }

    function onNewOffer(data) {
      const { newPrice } = data;
      update_prices(newPrice);
    }

    function randomBetween2And8() {
      setTimer(Math.floor(Math.random() * 7) + 2);
      setTimeout(() => {}, 1000);
    }

    function Timer() {
      if (timer > 0) {
        const timerId = setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    }

    function onResponseOffer(data) {
      const {
        response,
        message,
        newPrice,
        id_cliente_server,
        id_producto,
        nombre_cliente,
        nombre_producto,
      } = data;

      if (response === "Successful") {
        if (id_cliente === id_cliente_server) {
          randomBetween2And8();
          update_prices(newPrice);
          setMovements([
            ...movement,
            {
              response: response,
              message:
                "Haz ofertado USD" + newPrice + " por " + nombre_producto,
            },
          ]);
          //sendNotification(
          //  response,
          //  "Haz ofertado USD" + newPrice + " por " + nombre_producto
          //);
        } else
          setMovements([
            ...movement,
            {
              response: "Warning",
              message:
                nombre_cliente +
                " ha ofertado USD" +
                newPrice +
                " por " +
                nombre_producto,
            },
          ]);
        //sendNotification(
        //  "Warning",
        //  nombre_cliente +
        //    " ha ofertado USD" +
        //    newPrice +
        //    " por " +
        //    nombre_producto
        //);
      } else if (id_cliente === id_cliente_server) {
        setMovements([
          ...movement,
          {
            response: response,
            message: message,
          },
        ]);
        //sendNotification(response, message);
      }
    }

    function onSaleProduct(data) {
      console.log("Recibe posibilidad de venta");
      const {
        response,
        message,
        id_cliente_sale,
        id_producto,
        nombre_cliente,
        nombre_producto,
      } = data;
      if (id_cliente_sale === id_cliente)
        setMovements([
          ...movement,
          {
            response: response,
            message: "Haz comprado un/una " + nombre_producto,
          },
        ]);
      //sendNotification(response, "Haz comprado un/una " + nombre_producto);
      else
        setMovements([
          ...movement,
          {
            response: "Warning",
            message: nombre_cliente + " ha comprado un/una " + nombre_producto,
          },
        ]);
      //sendNotification(
      //  "Warning",
      //  nombre_cliente + " ha comprado un/una " + nombre_producto
      //);
    }

    function onAvailable(data) {
      if (data === "available") setAvailable(true);
      else setAvailable(false);
    }

    if (firstTime) {
      socket.emit("get_available", product.id_producto);
      setFirstTime(false);
    }

    Timer();
    socket.on("new_offer", (data) => onNewOffer(data));
    socket.on("response_offer", (data) => onResponseOffer(data));
    socket.on("sale_product", (data) => onSaleProduct(data));
    socket.on("available", (data) => onAvailable(data));
    return () => {
      socket.on("new_offer", (data) => onNewOffer(data));
      socket.off("response_offer", (data) => onResponseOffer(data));
      socket.off("sale_product", (data) => onSaleProduct(data));
      socket.off("available", (data) => onAvailable(data));
    };
  }, [
    firstTime,
    id_cliente,
    movement,
    product.id_producto,
    setMessage,
    setResponse,
    setVIsibleNotification,
    timer,
  ]);

  return (
    <div className=" w-2/4 h-3/5 2xl:h-3/5 sm:text-2xl md:text-3xl xl:h-3/5 px-5">
      <div className=" flex mb-10">
        <h2 className=" mr-5 text-4xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 font-semibold font-[Dosis]">
          {product.marca.toUpperCase()}
        </h2>
        <h2
          className={` ${
            !available ? " text-red/70" : " text-green/70"
          } text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-semibold font-[Dosis]`}
        >
          {available ? "Disponible" : "No disponible"}
        </h2>
      </div>
      <div className=" flex mb-10">
        <h1 className=" text-6xl sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl font-semibold font-[Dosis]">
          {product.nombre}
        </h1>
      </div>
      <div className=" flex mb-10">
        <p className=" text-3xl sm:text-base md:text-lg lg:text-xl xl:text-3xl text-gray-400 font-light text-justify">
          {product.descripcion}
        </p>
      </div>
      <div className=" flex mb-20 justify-between">
        <h2 className=" text-4xl sm:text-base md:text-xl lg:text-3xl xl:text-4xl font-[Dosis]">
          USD{actualPrice}
        </h2>
        <h2 className=" text-4xl sm:text-base md:text-xl lg:text-3xl xl:text-4xl  font-semibold font-[Dosis]">
          {product.modelo.toUpperCase()}
        </h2>
        <h2 className=" text-4xl sm:text-base md:text-xl lg:text-3xl xl:text-4xl  font-[Dosis]">
          {product.año}
        </h2>
      </div>
      <div className=" flex justify-center w-full xl:w-full md:w-full">
        {timer === 0 || !available ? (
          <div className="flex">
            <div>
              <form className=" flex w-full">
                <input
                  onChange={handleChange}
                  value={value}
                  name="precio"
                  required
                  className=" w-8/12 text-center text-3xl sm:text-base md:text-lg lg:text-xl xl:text-3xl placeholder:text-center placeholder:text-2xl font-[Dosis] border text-3x placeholder:font-[Dosis] hover:border-gray-400 focus:outline-none"
                  placeholder={`min ${minOffer}`}
                />
                <button
                  onClick={handleOffer}
                  className=" w-8/12 text-center font-semibold rounded text-white sm:text-base md:text-xl lg:text-2xl xl:text-3xl text-4xl px-8 py-2 border-gray-400 border-2 bg-azulgris"
                >
                  Offer
                </button>
              </form>
            </div>
          </div>
        ) : (
          <h2 className=" text-5xl sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl  font-semibold font-[Dosis]">
            Podrás ofertar en {timer}
          </h2>
        )}
        <div className=" w-full">
          <LastMovements movement={movement} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
