import React, { useEffect, useState } from "react";
import UserCard from "../custom/UserCard";
import Title from "../custom/Title";

const UserConnected = ({ socket, cleaner, setCleaner }) => {
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

    if (newUser.length === 0) setCleaner(true);
    else setCleaner(false);
    socket.on("newUser", (data) => onNewUser(data));
    return () => {
      socket.off("newUser", (data) => onNewUser(data));
    };
  }, [newUser, setCleaner, socket]);

  return (
    <div className=" w-2/4">
      <div className=" flex justify-center items-center mt-5">
        <Title text="Users Connected" />
      </div>
      <div className=" mt-10 flex flex-col justify-center items-center">
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
