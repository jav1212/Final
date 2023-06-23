import React from "react";
import "react-circular-progressbar/dist/styles.css";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className=" w-44 h-44 border-2 border-gray-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
