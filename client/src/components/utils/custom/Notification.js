import React from "react";
import { IoMdClose, IoMdWarning, IoMdCheckmark } from "react-icons/io";

const Notification = ({ response, visible, message }) => {
  return (
    <div style={{ zIndex: 3 }}>
      {visible && (
        <div
          className={`fixed top-3 text-2xl font-[Dosis] right-0 m-4 p-4 rounded-lg shadow-lg ${
            response === "Failed"
              ? "  bg-red"
              : response === "Warning"
              ? " bg-yellow"
              : "bg-green"
          }`}
        >
          <div className="flex items-center justify-center">
            {response === "Failed" ? (
              <IoMdClose className="text-white h-6 w-6 mr-2" />
            ) : response === "Warning" ? (
              <IoMdWarning className="text-black h-6 w-6 mr-2" />
            ) : (
              <IoMdCheckmark className=" text-white h-6 w-6 mr-2" />
            )}
            <span
              className={`${
                response === "Failed" || response === "Successful"
                  ? " text-white"
                  : "text-black"
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
