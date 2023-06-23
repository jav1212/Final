import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaginationButtons from "../../utils/custom/PaginationButtons";
import { socket } from "../../../config/socket";
import Pagination from "../../utils/custom/Pagination";
import Bar from "../../utils/custom/Bar";

const Auctions = () => {
  const location = useLocation();
  const utils = location.state.utils;

  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [dataArrived, setDataArrived] = useState(false);
  const [visible, setVisible] = useState(false);
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

      socket.on("post_products", (data) => onPostProducts(data));
      return () => {
        socket.off("post_products", (data) => onPostProducts(data));
      };
    }
    socket.on("database_change", () => setDataArrived(false));
    return () => {
      socket.off("database_change", () => setDataArrived(false));
    };
  }, [socket]);

  return (
    <div className=" w-screen h-screen justify-center items-center flex">
      <Bar
        visible={visible}
        setVisible={setVisible}
        nombre={utils.nombre}
        apellido={utils.apellido}
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
