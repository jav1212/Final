import React, { useEffect, useState, useRef } from "react";
import Title from "../custom/Title";
import MoveCard from "../custom/MoveCard";

const OffersByUsers = ({ socket, cleaner, setCleaner }) => {
  const [change, setChange] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [change]);

  useEffect(() => {
    function onNewChange(data) {
      setChange([...change, data]);
    }

    if (cleaner) {
      setChange([]);
      setCleaner(false);
    }
    socket.on("new_change", (data) => onNewChange(data));
    return () => {
      socket.off("new_change", (data) => onNewChange(data));
    };
  }, [change, cleaner, setCleaner, socket]);
  return (
    <div className=" w-2/4 ">
      <div className=" flex justify-center items-center mt-5">
        <Title text="Offers by clients" />
      </div>
      <div
        className=" mt-10 flex flex-col justify-center items-center"
        style={{ maxHeight: "80%", overflow: "auto" }}
      >
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
