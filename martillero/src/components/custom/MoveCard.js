import React from "react";

const MoveCard = ({ nombre_cliente, nombre_producto, monto, tipo }) => {
  return (
    <div
      className={` w-fit m-5 p-5 justify-center text-2xl items-center flex-col rounded font-[Dosis] ${
        tipo === "venta"
          ? "  bg-green/80 text-white"
          : " bg-yellow/80 text-black"
      } `}
    >
      <h2 className=" text-center">
        {nombre_cliente} ha{" "}
        {tipo === "venta"
          ? "comprado por USD" + monto + " el producto"
          : "ofertado USD" + monto + " por el producto"}
      </h2>
      <br />
      <h2 className=" text-center">{nombre_producto}</h2>
    </div>
  );
};

export default MoveCard;
