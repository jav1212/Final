import React from "react";
import { IoMdClose, IoMdWarning } from "react-icons/io";

const Notification = ({ response, visible, message }) => {
  return (
    <div>
      {visible && (
        <div
          className={`fixed top-0 right-0 m-4 p-4 rounded-lg shadow-lg ${
            response === "Failed" ? "  bg-red" : " bg-yellow"
          }`}
        >
          <div className="flex items-center justify-center">
            {response === "Failed" ? (
              <IoMdClose className="text-white h-6 w-6 mr-2" />
            ) : (
              <IoMdWarning className="text-black h-6 w-6 mr-2" />
            )}
            <span
              className={`${
                response === "Failed" ? " text-white" : "text-black"
              }`}
            >
              {message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
