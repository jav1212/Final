import React from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./FormButton";

const Form = ({ look, types, boton, handleSubmit, handleChange }) => {
  return (
    <form className={look}>
      {types.map((type, index) => (
        <div key={index} className="mt-5">
          <Label type={type} />
          <div className="mt-5">
            <Input type={type} handleChange={handleChange} />
          </div>
        </div>
      ))}
      <Button texto={boton} handleSubmit={handleSubmit} />
    </form>
  );
};

export default Form;
