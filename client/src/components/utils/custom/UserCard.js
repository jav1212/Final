import React, { useEffect, useState } from "react";
import { Login } from "react-icons/bs";
import { socket } from "../../../config/socket";

const UserCard = ({ nombre, apellido, id_cliente }) => {
  const [cartera, setCartera] = useState(0);
  const [dataArrived, setDataArrived] = useState(false);
  useEffect(() => {
    if (!dataArrived) {
      function onNewCartera(data) {
        setCartera(data);
        setDataArrived(true);
      }
      socket.emit("get_cartera", id_cliente);
      socket.on("new_cartera", (data) => onNewCartera(data));
      return () => {
        socket.off("new_cartera", (data) => onNewCartera(data));
      };
    }
  }, [dataArrived, id_cliente]);
  return (
    <div
      className="fixed top-12 right-96 bg-azulgris rounded-lg shadow-lg p-4 m-4"
      style={{ zIndex: 3 }}
    >
      <h2 className=" text-3xl font-medium mb-2 cursor-default">Usuario</h2>
      <p className=" text-2xl font-normal font-[Dosis] text-white ">
        {nombre} {apellido}
      </p>
      <h2 className=" text-2xl font-normal font-[Dosis] text-white ">
        USD {cartera}
      </h2>
    </div>
  );
};

export default UserCard;
