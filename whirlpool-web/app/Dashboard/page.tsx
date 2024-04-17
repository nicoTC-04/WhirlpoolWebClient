'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/dashboard.module.css";
import Report from "../components/Report";
import Leaderboard from "../components/Leaderboard";
import axios from "axios";
import Link from "next/link";

// Definición de la interfaz para los datos de reporte
interface ReporteData {
  id_reporte: number;
  nombre_empleado: string;
  nombre_ubicacion: string;
  descripcion: string;
  fecha_generacion: string;
}

const Dashboard = () => {
  const [reporte, setReporte] = useState<ReporteData[]>([]);
  const [rank, setRank] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] =
    useState<ReporteData | null>(null);

  const openModal = (
    idReporte: number,
    nombreEmpleado: string,
    ubicacion: string,
    descripcion: string
  ) => {
    setModalOpen(true);
    setReporteSeleccionado({
      id_reporte: idReporte,
      nombre_empleado: nombreEmpleado,
      nombre_ubicacion: ubicacion,
      descripcion: descripcion,
      fecha_generacion: "",
    });
    console.log("abriendo modal");
  };

  const closeModal = () => {
    setModalOpen(false);
    console.log("cerrando modal");
  };

  const fetchReporte = async () => {
    try {
      const response = await axios.get("http://35.197.2.168:5001/reportes");
      console.log(response);

      const sortedReportes = response.data.sort(
        (a: { fecha_generacion: string }, b: { fecha_generacion: string }) =>
          new Date(b.fecha_generacion).getTime() -
          new Date(a.fecha_generacion).getTime()
      );
      setReporte(sortedReportes);
    } catch (error) {
      console.log("Error :(", error);
    }
  };

  const fetchLeaderBoard = async () => {
    try {
      const response = await axios.get("http://35.197.2.168:5001/tablero");
      console.log(response);
      setRank(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchReporte();
    fetchLeaderBoard();
  }, []);

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Image
            src="/logo_white.png"
            height={70}
            width={200}
            alt="whirlpool logo"
          />
        </div>
        <div className={styles.navRight}>
          <Link href="/Game">
            <button>
              <p style={{ color: "white" }}> Prueba nuestro Juego</p>
            </button>
          </Link>
          <div className={styles.usuario}>
            <p> Usuario</p>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.reporte}>
          {reporte.map((report, index) => (
            <button
              key={index}
              onClick={() =>
                openModal(
                  report.id_reporte,
                  report.nombre_empleado,
                  report.nombre_ubicacion,
                  report.descripcion
                )
              }
            >
              <Report
                key={index}
                descripcion={report.descripcion}
                nombre={report.nombre_empleado}
                id={report.id_reporte}
                ubicacion={report.nombre_ubicacion}
                fecha={report.fecha_generacion}
              />
            </button>
          ))}
        </div>
        <div className={styles.right}>
          <div className={styles.leaderboard}>
            <Leaderboard users={rank} />
          </div>
          <div className={styles.game}></div>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.exit} onClick={closeModal}>
              <Image
                src={"/x-solid.svg"}
                height={25}
                width={25}
                alt="exit"
              ></Image>
            </div>
            <div className={styles.modalImage}>
              <img
                src={`http://35.197.2.168:5001/imagen/${reporteSeleccionado?.id_reporte}`}
                alt="Report Image"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>

            <div className={styles.modalDescripcion}>
              <p>Empleado: {reporteSeleccionado?.nombre_empleado}</p>
              <p>Ubicación: {reporteSeleccionado?.nombre_ubicacion}</p>
              <p>Descripción: {reporteSeleccionado?.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
