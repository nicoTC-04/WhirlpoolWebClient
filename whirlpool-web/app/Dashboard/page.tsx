"use client";

import React from "react";
import styles from "../styles/dashboard.module.css";
import Report from "../components/Report";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [reporte, setReporte] = React.useState<any[]>([]);

  const fetchReporte = async () => {
    try {
      const response = await axios.get("http://35.197.2.168:5001/reportes");
      console.log(response);
      setReporte(response.data);
    } catch (error) {
      console.log("Error :(");
    }
  };

// se llama cuando se crea el componente
  React.useEffect(() => {
    fetchReporte();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.usuario}>
          <h1> Hola! usuario </h1>
        </div>

        <div className={styles.reporte}>
          <h1> Reportes </h1>
          {reporte.map((report, index) => (
            <Report
              key={index}
              descripcion={report.descripcion}
              nombre={report.nombre_empleado}
              id={report.id_reporte}
              ubicacion={report.nombre_ubicacion}
              fecha={report.fecha_generacion}
            />
          ))}
        </div>

        <div className={styles.right}>
          <div className={styles.leaderboard}>
            <h1> Leaderboard</h1>
          </div>

          <div className={styles.game}>
            <h1>Game</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
