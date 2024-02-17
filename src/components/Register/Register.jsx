import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/user/userSlice';
import { useNavigate,Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    name: '', 
  
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(userData)).unwrap();
      navigate('/login'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>

      <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Full name</label>
          <input type="text" id="name" name="name" placeholder='Full name' className={styles.input} value={userData.name} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" name="username" placeholder='username' className={styles.input} value={userData.username} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" name="email" placeholder='email@example.com' className={styles.input} value={userData.email} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" name="password" placeholder='enter password here' className={styles.input} value={userData.password} onChange={handleChange} required />
        </div>
{/*         
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>address</label>
          <input type="address" id="address" name="address" placeholder='enter address here' className={styles.input} value={userData.address} onChange={handleChange} required />
        </div> */}

        <div>
          <button type="submit" className={styles.button}>Register</button>
        </div>
        <div className={styles.button}>
          Already have an account? <Link to="/login" className={styles.link}>Login</Link> 
        </div>
      </form>
    </div>
  );
}

export default Register;

