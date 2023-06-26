import React, { useState, useEffect } from "react";
import Bar from "../../utils/custom/Bar";
import { useLocation } from "react-router";
import ProductSliderImages from "../../utils/custom/ProductSliderImages";
import ProductCard from "../../utils/custom/ProductCard";
import Notification from "../../utils/custom/Notification";
import { socket } from "../../../config/socket";

const Product = () => {
  const location = useLocation();
  const utils = location.state.utils;

  const [visible, setVisible] = useState(false);
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [visibleNotification, setVisibleNotification] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return event.returnValue;
    };

    const handleUnload = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <div className=" h-screen w-screen justify-center items-center flex">
      <Notification
        response={response}
        visible={visibleNotification}
        message={message}
      />
      <Bar
        visible={visible}
        setVisible={setVisible}
        nombre={utils.nombre}
        apellido={utils.apellido}
      />
      <div className=" w-full mr-20  ml-20 mt-10 flex">
        <ProductSliderImages id_product={utils.product.id_producto} />
        <ProductCard
          id_cliente={utils.id_cliente}
          product={utils.product}
          setResponse={setResponse}
          setVIsibleNotification={setVisibleNotification}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default Product;
