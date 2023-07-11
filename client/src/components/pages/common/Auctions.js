import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginationButtons from "../../utils/custom/PaginationButtons";
import { socket } from "../../../config/socket";
import Pagination from "../../utils/custom/Pagination";
import Bar from "../../utils/custom/Bar";
import Notification from "../../utils/custom/Notification";

const Auctions = () => {
  const location = useLocation();
  const utils = location.state.utils;

  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [dataArrived, setDataArrived] = useState(false);
  const [visible, setVisible] = useState(false);
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [visibleNotification, setVisibleNotification] = useState(false);
  const totalPages = [];
  for (let index = 1; index <= Math.ceil(products.length / 3); index++) {
    totalPages.push(index);
  }

  useEffect(() => {
    if (!dataArrived) {
      console.log("a");
      socket.emit("get_products");

      function onPostProducts(data) {
        setProducts(data);
        setDataArrived(true);
      }

      function onSaleProduct(data) {
        const { response, message, id_cliente, id_producto } = data;
        if (id_cliente === utils.id_cliente) {
          setResponse(response);
          setMessage(message);
          setVisibleNotification(true);
          setTimeout(() => {
            setVisibleNotification(false);
          }, 3000);
        } else {
          setResponse("Warning");
          setMessage(message);
          setVisibleNotification(true);
          setTimeout(() => {
            setVisibleNotification(false);
          }, 3000);
        }
      }

      socket.on("post_products", (data) => onPostProducts(data));
      socket.on("sale_product", (data) => onSaleProduct(data));
      return () => {
        socket.off("post_products", (data) => onPostProducts(data));
        socket.off("sale_product", (data) => onSaleProduct(data));
      };
    }

    const handleBeforeUnload = (event) => {
      console.log(event);
      socket.disconnect();
    };

    socket.on("database_change", () => setDataArrived(false));
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      socket.off("database_change", () => setDataArrived(false));
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dataArrived, utils.id_cliente]);

  return (
    <div className=" w-screen h-screen justify-center items-center flex">
      <Notification
        response={response}
        visible={visibleNotification}
        message={message}
        position="fixed top-0 right-0 m-4"
      />
      <Bar
        visible={visible}
        setVisible={setVisible}
        nombre={utils.nombre}
        apellido={utils.apellido}
        id_cliente={utils.id_cliente}
      />
      <Pagination
        products={products}
        activePage={activePage}
        nombre={utils.nombre}
        apellido={utils.apellido}
        id_cliente={utils.id_cliente}
      />
      <PaginationButtons
        totalPages={totalPages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
};

export default Auctions;
