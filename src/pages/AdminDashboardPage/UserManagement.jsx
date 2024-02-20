import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminUserManagementApi from '../../api/adminUserManagementApi';
import styles from './UserManagement.module.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userForm, setUserForm] = useState({ username: '', email: '', role: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await adminUserManagementApi.getUsers();
            setUsers(data);
            setError('');
        } catch (error) {
            setError('Failed to fetch users');
        }
    };

    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmitUserForm = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                await adminUserManagementApi.updateUserById(editUserId, userForm);
                setSuccessMessage('User updated successfully');
                setIsEditing(false);
                setUserForm({ username: '', email: '', role: '' });
                fetchUsers();
            } catch (error) {
                setError('Failed to update user');
            }
        } else {
            try {
                await adminUserManagementApi.addUser(userForm);
                setSuccessMessage('User added successfully');
                setUserForm({ username: '', email: '', role: '' });
                fetchUsers();
            } catch (error) {
                setError('Failed to add user');
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await adminUserManagementApi.deleteUserById(userId);
            setSuccessMessage('User deleted successfully');
            fetchUsers();
        } catch (error) {
            setError('Failed to delete user');
        }
    };

    const setFormForEditing = (user) => {
        setIsEditing(true);
        setEditUserId(user._id);
        setUserForm({ username: user.username, email: user.email, role: user.role });
    };

    return (
        <div className={styles.container}>
            <h1>User Management</h1>
            {error && <div className={styles.error}>{error}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}

            <form onSubmit={handleSubmitUserForm} className={styles.userForm}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userForm.username}
                    onChange={handleUserFormChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={handleUserFormChange}
                    required
                />
                <select
                    name="role"
                    value={userForm.role}
                    onChange={handleUserFormChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <button type="submit" className={styles.submitButton}>
                    {isEditing ? 'Update User' : 'Add User'}
                </button>
            </form>

            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => setFormForEditing(user)} className={styles.editButton}>Edit</button>
                                <button onClick={() => handleDeleteUser(user._id)} className={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
