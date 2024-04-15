'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Login from "./Login/page";
import Dashboard from "./Dashboard/page";
import Game from "./Game/page";

import Link from "next/link";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Here you could check for user's auth token from localStorage or cookies
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token: string): void => {
    localStorage.setItem('userToken', token); // Storing the user token
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clearing the user token
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.container}>
          <Dashboard handleLogout={handleLogout} />
        </div>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
}
