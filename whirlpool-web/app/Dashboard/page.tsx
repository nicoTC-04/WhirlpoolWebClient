"use client";

import React from "react";
import Image from "next/image";

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
      <div className={styles.navbar}>
        <div className={styles.logo}>
        <Image src="/logo_white.png" height={70} width={200} alt="whirlpool logo"/> 
        </div>

        <div className={styles.usuario}>
          <p> Usuario</p>
        </div>
      </div>
      <div className={styles.container}>
        
        <div className={styles.reporte}>
          
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
            
            <Leaderboard users={rank} />
          </div>

          <div className={styles.game}>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
