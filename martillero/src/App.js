import { useEffect } from "react";
import "./App.css";
import { socket } from "./config/socket";
import UserConnected from "./components/pages/UserConnected";
import OffersByUsers from "./components/pages/OffersByUsers";

function App() {
  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className=" h-screen w-screen flex">
      <UserConnected socket={socket} />
      <OffersByUsers socket={socket} />
    </div>
  );
}

export default App;
