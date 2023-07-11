import React, { useState } from "react";
import Logo from "../../../images/Logo.jpg";
import { BsCart2 } from "react-icons/bs";
import UserCard from "./UserCard";

const Bar = ({ visible, setVisible, nombre, apellido, id_cliente }) => {
  const handleMouseOver = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div className=" absolute top-5 w-screen h-auto flex flex-wrap justify-between sm:w-screen md:w-screen lg:w-screen">
      <div style={{ width: "5%" }} className=" ml-12">
        <img
          className=" h-fit"
          src={Logo}
          alt="logo"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div
        className=" flex justify-center items-center h-fit"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className=" text-2xl font-[Dosis] cursor-pointer sm:text-base md:text-xl lg:text-2xl ">
          Mi Bid Max
        </h1>
        {visible === true ? (
          <UserCard
            nombre={nombre}
            apellido={apellido}
            id_cliente={id_cliente}
          />
        ) : (
          ""
        )}
      </div>
      <div className=" mr-12 flex justify-center items-center">
        <BsCart2 size="3rem" />
      </div>
    </div>
  );
};

export default Bar;
