import React, { useEffect, useState } from "react";
import Title from "../custom/Title";
import MoveCard from "../custom/MoveCard";

const OffersByUsers = ({ socket }) => {
  const [change, setChange] = useState([]);
  useEffect(() => {
    function onNewChange(data) {
      console.log(data);
      setChange([...change, data]);
    }
    socket.on("new_change", (data) => onNewChange(data));
    return () => {
      socket.off("new_change", (data) => onNewChange(data));
    };
  }, [change, socket]);
  return (
    <div className=" w-2/4">
      <Title text="Offers by clients" />
      <div className=" mt-10 flex flex-col justify-center items-center">
        {change.map((move, index) => (
          <MoveCard
            key={index}
            nombre_cliente={move.nombre_cliente}
            nombre_producto={move.nombre_producto}
            monto={move.monto}
            tipo={move.tipo}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersByUsers;
