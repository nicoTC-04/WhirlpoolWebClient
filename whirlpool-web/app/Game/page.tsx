import React from 'react';
import styles from './page.module.css';

const Game = () => {
  const unityUrl = "http://35.197.2.168:3000/";
  return (
    <div className={styles.gameDiv}>
      <iframe src={unityUrl} width="1200" height="780" style={{ border: "none" }}></iframe>
    </div>
  )
}

export default Game