import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'; // Import CSS module

import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log("Server Response:", result.data);
        if (result.data.message === "Login successful") {
          console.log("Login successful");
          localStorage.setItem('loggedInUserEmail', result.data.email);
          navigate('/lent');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
        setError('Check your credentials.');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['login-content']}>
      <div className={styles.content}>
        <div className={styles.text}>Login Form</div>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.field}>
            <input placeholder='Email' type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="fas fa-user"></span>
          </div>
          <div className={styles.field}>
            <input placeholder='Password' type={showPassword ? "text" : "password"} name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="fas fa-lock"></span>
          </div>
          <button type="submit">Sign in</button>
          <div className={styles['sign-up']}>
            Not a member? <Link to="/register">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
