import { useEffect } from "react";
import "./App.css";
import Login from "./components/pages/log/Login";
import Wallpaper from "./components/pages/log/Wallpaper";
import { socket } from "./config/socket";

function App() {
  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("connected");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  });
  return (
    <div className=" flex">
      <Wallpaper />
      <Login socket={socket} />
    </div>
  );
}

export default App;
