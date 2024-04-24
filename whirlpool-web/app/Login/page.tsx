// login
"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const Login = ({ handleLogin }: { handleLogin: (token: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate email and password exists
    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }

    setIsLoading(true); // Start loading
    const apiKey = "AIzaSyCz4ZaPW6pi0XwNeqrz2h6IoZFV5QgQ7cM";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.error.message || "An error occurred");
      }

      handleLogin(data.idToken); // Pass the Firebase token to the handler
    } catch (error) {
      setError((error as Error).message || "Failed to login");
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo_black.png"
          alt="Whirlpool"
          width={400}
          height={133.3}
        />
        {/*<Image src="/logo_black.png" alt="Whirlpool" width={400} height={133.3} />*/}
      </div>

      <div className={styles.separator}></div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
