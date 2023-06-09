import React, { useState } from 'react';
import { authenticateUser } from '../api';
import styles from "../css/Login.module.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
   const [loginToken, setLoginToken] = useState('');


  const handleLogin = async () => {
    // Perform login logic here, such as calling the API

    // Example validation: Check if email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter your email and password');
      return;
    }

    // TODO: Call the login API or perform authentication logic
    try {
      const LoginToken = await authenticateUser(email, password);
      console.log(loginToken);
      // Store the login token in state or local storage
      // Example using state:
      setLoginToken(LoginToken);
      throw redirect("/gps-summary")
    } catch (error) {
      // Handle error response from the API
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className={styles.logincontainer}>
      <form className={styles.loginform}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}  className={styles.loginbutton} href="/gps-summary">Login</button>
      <p>{errorMessage}</p>
      <a href="/signup" className={styles.newuserlink}>New User?</a>
      </form>
    </div>
  );
};

export default Login;

