import React from "react";

const UserCard = ({ nombre, apellido, type }) => {
  return (
    <div
      className={` w-2/4  text-xl rounded font-[Helvetica Neue] m-5 text-white ${
        type === "connected" ? "  bg-green" : " bg-red"
      } `}
    >
      <h2 className=" text-center">
        {nombre} {apellido}
      </h2>
    </div>
  );
};

export default UserCard;
