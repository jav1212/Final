import React from "react";

const UserCard = ({ nombre, apellido, type }) => {
  return (
    <div
      className={` w-fit m-5 p-5 justify-center text-2xl items-center flex-col rounded font-[Dosis] text-white ${
        type === "connected" ? "  bg-green/80" : " bg-red/80"
      } `}
    >
      <h2 className=" text-center">
        {nombre} {apellido}
      </h2>
    </div>
  );
};

export default UserCard;
