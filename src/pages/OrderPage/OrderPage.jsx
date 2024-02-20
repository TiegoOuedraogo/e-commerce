import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/order/orderSlice';
import styles from './OrderPage.module.css';
import { Link } from 'react-router-dom'; 

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading orders...</div>;
  if (error) return <div>Error fetching orders: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Orders</h1>
      <ul className={styles.orderList}>
        {orders.map((order) => (
          <Link to={`/orders/${order._id}`} key={order._id} className={styles.orderItem}>
            <p>Order ID: {order._id}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
