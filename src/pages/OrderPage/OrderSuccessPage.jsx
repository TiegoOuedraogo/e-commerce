// import React, { useEffect, useState } from 'react';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
// import orderApi from '../../api/orderApi';
// import styles from './OrderSuccessPage.module.css';

// const OrderSuccessPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const orderId = location.state?.orderId; 
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (!orderId) {
//             setError('Order ID not provided. Redirecting to home page...');
//             setTimeout(() => navigate('/'), 5000); 
//             return; 
//         }

//         const fetchOrderDetails = async () => {
//             try {
//                 const orderDetails = await orderApi.getOrderDetails(orderId);
//                 setOrder(orderDetails); 
//             } catch (err) {
//                 console.error('Failed to fetch order details:', err);
//                 setError('Failed to fetch order details. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrderDetails();
//     }, [orderId, navigate]);

//     if (loading) return <div className={styles.loading}>Loading order details...</div>;
//     if (error) return <div className={styles.error}>{error}</div>;

//     const productNames = order?.orderDetails.map(item => item.product.name).join(', ');
//     const totalPrice = order?.orderDetails.reduce((acc, item) => acc + item.quantity * item.price, 0) ?? 0;

//     return (
//         <div className={styles.orderSuccessPage}>
//             <h1>Order Placed Successfully</h1>
//             <p>Thank you for shopping with us.</p>

//             <div>
//                 <h2>Order Summary</h2>
//                 <p><strong>Order ID:</strong> {order._id}</p>
//                 <p><strong>Date:</strong> {new Date(order.orderedDate).toLocaleDateString()}</p>
//                 <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
//                 <p><strong>Items Ordered:</strong> {productNames}</p>
//                 <p><strong>Total Items:</strong> {order.orderDetails.length}</p>
//             </div>

//             <div className={styles.navigationLinks}>
//                 <Link to="/">Continue Shopping</Link>
//                 <Link to="/orders" className={styles.viewOrdersLink}>View Orders</Link>
//             </div>

//             <div>
//                 <p>Need help? <Link to="/contact">Contact Customer Support</Link>.</p>
//             </div>
//         </div>
//     );
// };

// export default OrderSuccessPage;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrderDetails, cancelOrder, updateOrder } from '../../features/order/orderSlice'; // Corrected import names
import styles from './OrderSuccessPage.module.css';

const OrderSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderId = location.state?.orderId;
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (!orderId) {
            navigate('/');
            return;
        }
        dispatch(getOrderDetails(orderId))
            .unwrap()
            .then(setOrder)
            .catch(error => console.error('Failed to fetch order details:', error));
    }, [dispatch, navigate, orderId]);

    const handleCancelOrder = () => {
        dispatch(cancelOrder(orderId))
            .unwrap()
            .then(() => {
                alert('Order has been canceled.');
                navigate('/');
            })
            .catch(error => alert(`Failed to cancel order: ${error.message || error}`));
    };


    const handleUpdateOrder = () => {
        navigate(`order-success`);
    };

    if (!order) return <div>Loading order details...</div>;

    const productNames = order?.orderDetails.map(item => item.product.name).join(', ');
    const totalPrice = order?.orderDetails.reduce((acc, item) => acc + item.quantity * item.price, 0) ?? 0;

    return (
        <div className={styles.orderSuccessPage}>
            <h1>Order Placed Successfully</h1>
            <p>Thank you for shopping with us.</p>

            <div>
                <h2>Order Summary</h2>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.orderedDate).toLocaleDateString()}</p>
                <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                <p><strong>Total Items:</strong> {order.orderDetails.length}</p>
                <div>
                    <strong>Items Ordered:</strong>
                    <ul>
                        {productNames.split(', ').map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.navigationLinks}>
                <Link to="/">Continue Shopping</Link>
                <Link to="/orders" className={styles.viewOrdersLink}>View Orders</Link>
            </div>

            <div>
                <p>Need help? <Link to="/contact">Contact Customer Support</Link>.</p>
            </div>
            <button onClick={handleUpdateOrder} className={styles.updateButton}>Update Order</button>
            <button onClick={handleCancelOrder} className={styles.cancelButton}>Cancel Order</button>
        </div>
    );
};

export default OrderSuccessPage;


