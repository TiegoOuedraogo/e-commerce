// OrderManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderManagement.module.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);


    return (
        <div className={styles.orderManagementContainer}>
            <h1>Order Management</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>{order.total}</td>
                            <td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;

