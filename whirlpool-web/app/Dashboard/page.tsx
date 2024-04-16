"use client";

import React from "react";
import styles from "../styles/dashboard.module.css";
import Report from "../components/Report";
import Leaderboard from "../components/Leaderboard";

import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [reporte, setReporte] = React.useState<any[]>([]);
  const [rank, setRank] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const fetchReporte = async () => {
    try {
      const response = await axios.get("http://35.197.2.168:5001/reportes");
      console.log(response);
  
      const sortedReportes = response.data.sort((a: { fecha_generacion: string }, b: { fecha_generacion: string }) => new Date(b.fecha_generacion).getTime() - new Date(a.fecha_generacion).getTime());  
      setReporte(sortedReportes);
    } catch (error) {
      console.log("Error :(");
    }
  };

  const fetchLeaderBoard = async () => {
    try {
      const response = await axios.get("http://35.197.2.168:5001/tablero");
      console.log(response);
      setRank(response.data);
    } catch (error) {
      console.log("Error");
    }
  };

  React.useEffect(() => {
    fetchReporte();
    fetchLeaderBoard();
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
              onClick={openModal}
            />
          ))}
        </div>

        <div className={styles.right}>
          <div className={styles.leaderboard}>
            <h1>LeaderBoard</h1>
            <Leaderboard users={rank} />
          </div>

          <div className={styles.game}>
            <h1>Diviertete y gana !</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
