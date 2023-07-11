import React from "react";

const PageButton = ({ text, details, handle }) => {
  return (
    <div>
      <button
        className={`${details} mr-1 ml-1 border-2 text-2xl sm:text-base md:text-xl lg:text-2xl font-bold border-gray-300 hover:bg-azulgris text-black px-5 py-1`}
        onClick={handle}
        id={text}
      >
        {text}
      </button>
    </div>
  );
};

export default PageButton;
