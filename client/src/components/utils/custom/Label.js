import React from "react";

const Label = ({ type }) => {
  return (
    <label
      htmlFor={type}
      className="block font-[Helvetica Neue] font-semibold text-xl text-gray-900"
    >
      {type}
    </label>
  );
};

export default Label;
