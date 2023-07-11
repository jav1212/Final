import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { socket } from "./config/socket";
import UserConnected from "./components/pages/UserConnected";
import OffersByUsers from "./components/pages/OffersByUsers";

function App() {
  const [cleaner, setCleaner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }

    function onGenerateReport() {
      navigate("/reporte");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("generate_report", onGenerateReport);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [navigate]);

  return (
    <div className=" h-screen w-screen flex">
      <UserConnected
        socket={socket}
        cleaner={cleaner}
        setCleaner={setCleaner}
      />
      <OffersByUsers
        socket={socket}
        cleaner={cleaner}
        setCleaner={setCleaner}
      />
    </div>
  );
}

export default App;
