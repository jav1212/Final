import React from "react";

const Title = ({ text }) => {
  return (
    <div className=" w-fit flex justify-center items-center">
      <h1 className=" text-6xl font-[Dosis] font-semibold text-center">
        {text}
      </h1>
    </div>
  );
};

export default Title;
