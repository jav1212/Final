import { useRef, useEffect } from "react";
import Notification from "./Notification";

const LastMovements = ({ movement }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [movement]);
  console.log(movement);
  return (
    <div
      className=" w-auto h-full bg-gray-200 rounded-sm border-gray-400 border-4"
      style={{ maxHeight: "200px", overflow: "auto", minWidth: "300px" }}
    >
      {movement.length > 1 ? (
        movement.map((move, index) =>
          move.response != null ? (
            <Notification
              position=""
              response={move.response}
              visible={true}
              message={move.message}
            />
          ) : (
            ""
          )
        )
      ) : (
        <h1 className=" text-2xl font-[Dosis] text-center">
          No hay movimientos recientemente
        </h1>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default LastMovements;
