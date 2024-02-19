import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { logout } from '../../features/user/userSlice';
import styles from './UserProfileCard.module.css';
import profileImage from './assets/profileCard/Profile.jpeg'; 

const UserProfile = () => {
  const { token } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setError('User is not authenticated.');
        return;
      }
      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(response.data);
      } catch (err) {
        setError('Failed to fetch user profile.');
      }
    };
    fetchUserProfile();
  }, [token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/profile', userProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
      setEditMode(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };


  const toggleAccountNumberVisibility = () => {
    setShowAccountNumber(prevShow => !prevShow);
  };
  
  if (!userProfile) return <div className={styles.profileContainer}>{error || 'Loading...'}</div>;

  return (
    <div className={styles.profileContainer}>
    <img src={userProfile.image || profileImage} alt="Profile" className={styles.profileImage} />
  
    <button onClick={toggleAccountNumberVisibility} className={styles.toggleButton}>
      Show Account Number
    </button>
  
    {showAccountNumber && (
      <div className={styles.profileItem}>
        <span className={styles.profileLabel}>Account Number:</span>
        <span className={styles.profileValue}>{userProfile._id}</span>
      </div>
    )}

      {editMode ? (
        <form onSubmit={handleProfileUpdate}>
          {/* Editable fields */}
          <input name="username" value={userProfile.username || ''} onChange={handleChange} placeholder="Username" />
          <input name="name" value={userProfile.name || ''} onChange={handleChange} placeholder="Name" />
          <input name="email" type="email" value={userProfile.email || ''} onChange={handleChange} placeholder="Email" />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <>
          {/* Displaying user details */}
          <div className={styles.profileItem}>Name: {userProfile.name}</div>
          <div className={styles.profileItem}>Email: {userProfile.email}</div>
          <div className={styles.profileItem}>Address: {userProfile.address}</div>
          <button onClick={() => setEditMode(true)} className={styles.editButton}>Edit Profile</button>
        </>
      )}

      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
};

export default UserProfile;

