import React, { useEffect, useState } from "react";
import Title from "../custom/Title";
import { socket } from "../../config/socket";
import Chart from "../custom/Chart";

const FinalReport = () => {
  const [profit, setProfits] = useState(0);
  const [dataArrived, setDataArrived] = useState(false);
  useEffect(() => {
    if (!dataArrived) {
      function onProfitsData(data) {
        let totalProfit = 0;
        data.forEach((element) => {
          totalProfit += element.monto + (element.monto * 15) / 100;
        });
        setProfits(totalProfit);
        setDataArrived(true);
      }
      socket.emit("get_reports");
      socket.on("post_sales", (data) => onProfitsData(data));
    }
  }, [dataArrived, profit]);
  return (
    <div className=" w-screen h-screen flex flex-col">
      <div className=" flex justify-center items-center m-5">
        <Title text="Reporte final" />
      </div>
      <div className=" h-4/5 flex justify-center items-center">
        <Chart />
        <div className=" w-3/5">
          <h2 className=" text-center text-5xl font-[Dosis] m-5">Ganancias</h2>
          <h3 className=" text-4xl text-gray-400 text-center font-[Dosis] m-5">
            USD {profit}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
