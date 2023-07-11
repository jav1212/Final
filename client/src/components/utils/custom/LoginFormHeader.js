import React from "react";

const LoginFormHeader = ({ logo, text }) => {
  return (
    <div className=" flex flex-col justify-center items-center ">
      <img className=" w-1/4" src={logo} alt="" />
      <h2 className=" w-auto font-[Helvetica Neue] text-3xl font-semibold sm:text-xl md:text-2xl lg:text-3xl">
        {text}
      </h2>
    </div>
  );
};

export default LoginFormHeader;
