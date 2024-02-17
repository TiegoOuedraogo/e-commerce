import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { useNavigate, Link } from 'react-router-dom'; 
import styles from './Login.module.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("line21 " ,credentials)
      await dispatch(login(credentials)).unwrap();
      navigate('/products'); 
    } catch (err) {
      console.log("line 25",err)
      setError('Failed to log in. Please check your credentials.',err); 
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.actionContainer}>
          <button type="submit" className={styles.button}>Login</button>
          <Link to="/forgot" className={styles.link}>Forgot Username or Password?</Link> 
        </div>
        <div className={styles.registerContainer}>
          No account? <Link to="/register" className={styles.link}>Register here</Link> 
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;

