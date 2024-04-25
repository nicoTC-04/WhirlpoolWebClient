// pages/page.tsx
'use client';
import React from 'react';
import { useAuth } from './components/AuthContext';
import styles from "./page.module.css";
import Login from "./Login/page";
import Dashboard from "./Dashboard/page";


export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
        {isLoggedIn ? (
          <div className={styles.container}>
            <Dashboard />
          </div>
        ) : (
          <Login />
        )}
    </>
  );
}
