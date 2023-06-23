import React, { useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ horaInicio }) => {
  const red = "#e61919";
  const yellow = "#ffff00";
  const green = "#0d730d";
  const horaFin = new Date(); // Hora de finalización (hora actual)
  horaFin.toLocaleTimeString(
    horaInicio.getHours(),
    horaInicio.getMinutes(),
    horaInicio.getSeconds + 4
  );

  const diferenciaEnMilisegundos = horaFin.getTime() - horaInicio.getTime(); // Diferencia en milisegundos
  const [segundos, setSegundos] = useState(
    Math.floor((diferenciaEnMilisegundos / 1000) % 60)
  ); //Diferencia en segundos
  const [minutos, setMinutos] = useState(
    Math.floor((diferenciaEnMilisegundos / 1000 / 60) % 60)
  ); // Diferencia en minutos
  const [horas, setHoras] = useState(
    Math.floor(diferenciaEnMilisegundos / 1000 / 60 / 60)
  ); // Diferencia en horas
  const [porcentaje, setPorcentaje] = useState(0);
  const [color, setColor] = useState(green);

  const segundosRef = useRef(segundos);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (segundosRef.current === 0) {
        if (minutos === 0) {
          if (horas === 0) {
            setHoras(0);
          } else {
            setHoras(horas - 1);
          }
          setMinutos(59);
        } else {
          setMinutos(minutos - 1);
        }
        segundosRef.current = 59;
      } else {
        segundosRef.current = segundosRef.current - 1;
      }
      setSegundos(segundosRef.current);

      const tiempoTotal =
        (horaFin.getHours() - horaInicio.getHours()) * 3600 +
        (horaFin.getMinutes() - horaInicio.getMinutes()) * 60 +
        horaFin.getSeconds() -
        horaInicio.getSeconds();
      const tiempoRestante = horas * 3600 + minutos * 60 + segundos;
      const porcentaje =
        100 - ((tiempoTotal - tiempoRestante) / tiempoTotal) * 100;
      console.log(tiempoTotal, tiempoRestante, porcentaje, horaFin);
      setColor(
        porcentaje < 5
          ? red
          : porcentaje > 5 && porcentaje < 30
          ? yellow
          : green
      );
      setPorcentaje(porcentaje);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    diferenciaEnMilisegundos,
    horaFin,
    horaFin.getHours,
    horaFin.getMinutes,
    horaFin.getSeconds,
    horaInicio,
    horas,
    minutos,
    segundos,
    setSegundos,
  ]);

  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={porcentaje}
        text={horas + ":" + minutos + ":" + segundos}
        styles={buildStyles({
          textColor: "#000000",
          pathColor: color,
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
    </div>
  );
};

export default Timer;
