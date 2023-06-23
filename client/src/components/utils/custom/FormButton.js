import React from "react";

const Button = ({ texto, handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className=" w-full bg-azulgrisclaro hover:bg-azulgris text-xl font-[Helvetica Neue] text-black font-bold py-2 px-4 rounded mt-7"
    >
      {texto}
    </button>
  );
};

export default Button;
