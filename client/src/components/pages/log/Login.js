import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../images/Logo.jpg";
import Form from "../../utils/custom/Form";
import Notification from "../../utils/custom/Notification";
import LoginFormHeader from "../../utils/custom/LoginFormHeader";

const Login = ({ socket }) => {
  const [login, setLogin] = useState({
    Email: "",
    Password: "",
  });

  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onResponse(data) {
      const { response, message, nombre, apellido, id_cliente } = data;
      if (response === "Success") {
        const utils = {
          nombre: nombre,
          apellido: apellido,
          id_cliente: id_cliente,
        };
        navigate("/auctions", { state: { utils: utils } });
      } else {
        if (response === "Disconnected") socket.disconnect();
        setResponse(response);
        setMessage(message);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 4000);
      }
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return event.returnValue;
    };

    const handleUnload = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    socket.on("Login response", onResponse);

    return () => {
      socket.off("Login response", onResponse);
      socket.off("connect_error");
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [navigate, socket]);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Email, Password } = login;
    if (Email !== "" || Password !== "") {
      socket.emit("Login", {
        email: Email,
        password: Password,
      });
    } else {
      setResponse("Preventive");
      setMessage("Incomplete fields, please try again");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };

  return (
    <div className=" w-2/4 flex flex-col h-screen items-center justify-center">
      <Notification
        response={response}
        visible={visible}
        message={message}
        position="fixed top-0 right-0 m-4"
      />
      <LoginFormHeader logo={Logo} text="Login to your account" />
      <div className=" m-10 w-full flex flex-col justify-center items-center">
        <Form
          look=" w-2/4"
          types={["Email", "Password"]}
          boton="Login"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Login;
