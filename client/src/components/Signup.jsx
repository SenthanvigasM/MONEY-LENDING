import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css'; // Import CSS module

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email address');
      return;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit');
      return;
    }

    axios.post('https://loaneds.vercel.app/register', { name, email, password })
      .then(response => {
        if (response.data.error) {
          setError(response.data.message);
        } else {
          console.log(response.data);
          navigate('https://loaneds.vercel.app/login');
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className={styles['signup-content']}>
      <div className={styles.content}>
        <div className={styles.text}>Signup Form</div>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.field}>
            <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.field}>
            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Register</button>
          <div className={styles['sign-in']}>
            Already have an account? <Link to="https://loaneds.vercel.app/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
