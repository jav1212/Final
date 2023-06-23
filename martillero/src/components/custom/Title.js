import React from "react";

const Title = ({ text }) => {
  return (
    <div>
      <h1 className=" text-2xl font-[Helvetica Neue] font-semibold text-center mt-14">
        {text}
      </h1>
    </div>
  );
};

export default Title;
