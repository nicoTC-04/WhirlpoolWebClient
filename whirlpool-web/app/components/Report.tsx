'use client';

import React from "react";
import styles from "../styles/report.module.css";
import Image from "next/image";


interface reportProps {
  descripcion: string;
  nombre: string;
  id: number;
  ubicacion: string;
  fecha: string;
}



const Report = (props: reportProps) => {

  


  const handleModal = () => {
    console.log("abriendo modal");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.reporte}>
          <div className={styles.logo}>
            <Image width={70} height={70} alt="Imagen" src="/liverpool.jpg" />
          </div>

          <div className={styles.descripcion}>
            <div className={styles.desc}>
              <p>{props.descripcion}</p>
              <div className={styles.ubicacion}>
                <p> {props.ubicacion}</p>
              </div>
            </div>
          </div>

          <div className={styles.datos}>
            <p>{props.nombre} </p>
            <div>
              <p>{props.fecha}</p>
            </div>
          </div>

          <div className={styles.flecha}>
            <button onClick={handleModal}>
              <Image src={"/arrow.svg"} width={20} height={20} alt="arrow" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
