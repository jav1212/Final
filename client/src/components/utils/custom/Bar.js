import React, { useState } from "react";
import Logo from "../../../images/Logo.jpg";
import { BsCart2 } from "react-icons/bs";
import UserCard from "./UserCard";

const Bar = ({ visible, setVisible, nombre, apellido }) => {
  const handleMouseOver = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div className=" absolute top-5 w-full h-auto flex flex-wrap justify-between">
      <div className=" w-fit h-fit ml-12">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "10%", objectFit: "contain" }}
        />
      </div>

      <div
        className=" flex justify-center items-center"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className=" text-2xl font-[Dosis] cursor-pointer">Mi Bid Max</h1>
        {visible === true ? (
          <UserCard nombre={nombre} apellido={apellido} />
        ) : (
          ""
        )}
      </div>
      <div className=" flex w-fit mr-12 justify-center items-center">
        <BsCart2 size="50" className=" hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Bar;
