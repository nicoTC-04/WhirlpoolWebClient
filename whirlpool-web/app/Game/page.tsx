'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';


const Game = () => {
  const unityUrl = "http://35.188.105.32:3000/";

  const router = useRouter();

  const returnDashboard = () => {
    console.log("Return dashboard");
    router.push('/Dashboard');
  };
  return (
    <>
      <div className={styles.salir}>
        <Link href="/Dashboard">
          <Image src={"/x-solid.svg"} height={25} width={25} alt="exit" onClick={returnDashboard}></Image>
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
