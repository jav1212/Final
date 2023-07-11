import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { socket } from "../../config/socket";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({ type, array, labels, label }) => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  const [dataArrived, setDataArrived] = useState(false);

  useEffect(() => {
    if (!dataArrived) {
      function onSaleData(data) {
        setSales(data);
      }

      function onProductsData(data) {
        setProducts(data);
      }

      socket.emit("get_report");
      socket.on("change_report", () => setDataArrived(false));
      socket.on("post_report", () => setDataArrived(true));
      socket.on("post_sales", (data) => onSaleData(data));
      socket.on("products", (data) => onProductsData(data));

      return () => {
        socket.off("change_report", () => setDataArrived(false));
        socket.off("post_report", () => setDataArrived(true));
        socket.off("post_sales", (data) => onSaleData(data));
        socket.off("products", (data) => onProductsData(data));
      };
    }
  }, [dataArrived]);

  let inicialData = [
    49.99, 399.99, 1399.0, 279.95, 2499.0, 799.0, 1599.99, 109.99, 799.0,
    1799.99, 89.99, 799.99, 799.99, 499.99, 2899.0,
  ];
  let finalLabels = [];
  let finalDataProfits = [];
  let finalData = [];
  let monto = 0;
  products.forEach((product) => {
    finalLabels.push(product.nombre_producto);
    sales.forEach((sale) => {
      if (sale.id_producto === product.id_producto) monto = sale.monto;
    });
    finalData.push(monto);
    finalDataProfits.push(monto + (monto * 15) / 100);
    monto = 0;
  });

  const data = {
    labels: finalLabels,
    datasets: [
      {
        label: "Vendidos",
        data: finalData,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(231, 76, 60)",
        backgroundColor: "rgba(231, 76, 60,0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(231, 76, 60)",
        pointBackgroundColor: "rgba(231, 76, 60)",
      },
      {
        label: "Ganancia",
        data: finalDataProfits,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(41, 128, 185)",
        backgroundColor: "rgba(41, 128, 185,0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(41, 128, 185)",
        pointBackgroundColor: "rgba(41, 128, 185)",
      },
      {
        label: "Precio incial",
        data: inicialData,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(72, 201, 176 )",
        backgroundColor: "rgba(72, 201, 176 ,0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(72, 201, 176 )",
        pointBackgroundColor: "rgba(72, 201, 176 )",
      },
    ],
  };

  const optionSet = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          font: {
            size: 16, // Establece el tamaño de fuente a 16
            color: "#000000", // Establece el color de fuente a negro
          },
        },
      },
      x: {
        display: false, // Oculta el eje x
      },
    },
    elements: {
      point: {
        pointLabelFont: {
          size: 16, // Establece el tamaño de fuente a 16 para la etiqueta del punto
        },
      },
    },
    tooltips: {
      mode: "index",
      intersect: false,
      titleFontSize: 16,
      bodyFontSize: 14,
      callbacks: {
        label: function (tooltipItem, data) {
          var datasetLabel =
            data.datasets[tooltipItem.datasetIndex].label || "";
          var dataPoint = tooltipItem.yLabel;
          return datasetLabel + ": " + dataPoint + " unidades vendidas";
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 20, // Establece el tamaño de fuente a 20
          },
        },
      },
    },
  };
  return (
    <div className=" hover:cursor-pointer w-full h-full flex justify-center items-center">
      <div className=" m-5 graph-container w-full h-full">
        <Line data={data} options={optionSet} responsive={true} />
      </div>
    </div>
  );
};

export default Chart;
