import React, { useEffect, useState } from "react";
import UserCard from "../custom/UserCard";
import Title from "../custom/Title";

const UserConnected = ({ socket }) => {
  const [newUser, setNewUser] = useState([]);
  useEffect(() => {
    function onNewUser(data) {
      if (!newUser.includes(data) && data.type === "connected")
        setNewUser([...newUser, data]);
      else {
        const updatedUsers = newUser.filter((user) => user.id !== data.id);
        setNewUser(updatedUsers);
      }
    }
    socket.on("newUser", (data) => onNewUser(data));
    return () => {
      socket.off("newUser", (data) => onNewUser(data));
    };
  }, [newUser, socket]);

  return (
    <div className=" w-2/4 flex-row">
      <Title text="Users Connected" />
      <div className=" mt-10 flex-col justify-center items-center">
        {newUser.map((user, index) => (
          <UserCard
            key={index}
            nombre={user.nombre}
            apellido={user.apellido}
            type={user.type}
          />
        ))}
      </div>
    </div>
  );
};

export default UserConnected;
