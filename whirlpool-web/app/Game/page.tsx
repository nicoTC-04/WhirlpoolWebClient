'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const Game = () => {
  const unityUrl = "http://34.42.65.97:3000/";
  return (
    <>
      <div className={styles.salir}>
        <Link href="/Dashboard">
          <Image src={"/x-solid.svg"} height={25} width={25} alt="exit"></Image>
        </Link>
      </div>
      <div className={styles.gameDiv}>
        <iframe
          src={unityUrl}
          width="1200"
          height="780"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </>
  );
};

export default Game;
