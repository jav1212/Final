import React from "react";
import { Login } from "react-icons/bs";

const UserCard = ({ nombre, apellido }) => {
  return (
    <div
      className="fixed top-12 right-96 bg-azulgris rounded-lg shadow-lg p-4 m-4"
      style={{ zIndex: 3 }}
    >
      <h2 className=" text-3xl font-medium mb-2 cursor-default">Usuario</h2>
      <p className=" text-2xl font-normal font-[Dosis] text-white ">
        {nombre} {apellido}
      </p>
    </div>
  );
};

export default UserCard;
