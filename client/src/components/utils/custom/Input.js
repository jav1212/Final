import React from "react";

const Input = ({ type, handleChange }) => {
  return (
    <input
      className="w-full h-14 px-3 pr-10 text-xl font-semibold font-[Helvetica Neue] text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-azulgrisclaro focus:border-azulgrisclaro"
      id={type}
      name={type}
      type={type}
      autoComplete={type}
      required
      onChange={handleChange}
    />
  );
};

export default Input;
