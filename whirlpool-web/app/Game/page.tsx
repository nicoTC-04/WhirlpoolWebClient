import React from 'react'

const Game = () => {
  const unityUrl = "http://35.197.2.168:3000/";
  return (
    <iframe src={unityUrl} width="800" height="600" style={{ border: "none" }}></iframe>
  )
}

export default Game