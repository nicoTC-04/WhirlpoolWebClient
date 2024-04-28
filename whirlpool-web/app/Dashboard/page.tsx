"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/dashboard.module.css";
import Report from "../components/Report";
import Leaderboard from "../components/Leaderboard";
import axios from "axios";
import Link from "next/link";
import { useAuth } from './../components/AuthContext';
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Definición de la interfaz para los datos de reporte
interface ReporteData {
  id_reporte: number;
  nombre_empleado: string;
  nombre_ubicacion: string;
  descripcion: string;
  fecha_generacion: string;
}



// @ts-ignore
const Dashboard = () => {
  const [reporte, setReporte] = useState<ReporteData[]>([]);
  const [rank, setRank] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [reporteSeleccionado, setReporteSeleccionado] = useState<ReporteData | null>(null);
  const [textoIA, setTextoIA] = useState("Generando resumen...");

  const [showDropdown, setShowDropdown] = useState(false);

  const { handleLogout, isLoggedIn } = useAuth();
  const router = useRouter();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const logout = () => {
    console.log(localStorage.getItem('userToken'));
    console.log("Logging out");
    console.log('handleLogout type:', typeof handleLogout);
    console.log('handleLogout:', handleLogout);
    console.log(isLoggedIn);
    handleLogout();
  }

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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const handleSubmit = async () => {
    // Post con axios para solucionar reporte
    try {
      await axios.post("http://10.128.0.3:5001/reporteSolucionado", {
        // datos
        reporte_id: reporteSeleccionado?.id_reporte,
        id_empleado_soluciona: 2,
        puntos: sliderValue,
      });
  
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };
  

  const fetchReporte = async () => {
    try {
      const response = await axios.get("http://10.128.0.3:5001/reportes");
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
      const response = await axios.get("http://10.128.0.3:5001/tablero");
      console.log(response);
      setRank(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchTextoIA = async () => {
    try {
      const response = await axios.get("http://10.128.0.3:5001/resumenAi");
      console.log(response);
      setTextoIA(response.data.resumen);
    } catch (error) {
      console.log("Error", error);
    }
  };


  useEffect(() => {
    fetchReporte();
    fetchLeaderBoard();
    fetchTextoIA();
    if (!isLoggedIn) {
      router.push('/Login');
    }
  }, [isLoggedIn, router]);

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
              <p className={styles.game}> Prueba nuestro Juego</p>
            </button>
          </Link>

          <div className={styles.usuario} onClick={toggleDropdown}>
            <p>Usuario</p>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <p onClick={logout}>Cerrar sesión</p>
              </div>
            )}
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
          <div className={styles.ai}>
            <h4 className={styles.aiHeader}>TU RESUMEN:</h4>
            <p className={styles.aiText}>{textoIA}</p>
          </div>
        </div>
      </div>


      {/* Modal */}
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>

            {/* Botón de salida */}
            <div className={styles.exit} onClick={closeModal}>
              <Image
                src={"/x-solid.svg"}
                height={25}
                width={25}
                alt="exit"
              ></Image>
            </div>

            {/* Imagen del modal */}
            <div className={styles.modalLeft}>
              <img
                src={`http://10.128.0.3:5001/imagen/${reporteSeleccionado?.id_reporte}`}
                alt="Report Image"
                className={styles.modalImage}
              />
            </div>

            {/* Descripción del modal */}
            <div className={styles.modalRight}>
              <div className={styles.modalHeader}>
                <h2>{reporteSeleccionado?.nombre_empleado}</h2>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {reporteSeleccionado?.nombre_ubicacion}</p>
                <p className={styles.descripcion}>Descripción: {reporteSeleccionado?.descripcion}</p>
              </div>
              <div className={styles.modalData}>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={sliderValue}
                  onChange={handleSliderChange} 
                  className={styles.slider}
                  id="myRange"
                />
                <div className={styles.labelValue}>
                  <label htmlFor="myRange">Puntos: <span>{sliderValue}</span></label>
                </div>

                <button onClick={handleSubmit} className={styles.acceptButton}>
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;