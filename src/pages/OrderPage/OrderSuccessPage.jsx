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
    const [product, setProduct] = useState({})

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
                {/* <p><strong>Total Items:</strong> {order.orderDetails.length }</p> */}
                <p><strong>Total Items:</strong> {order.orderDetails.reduce((total, item) => total + item.quantity, 0)}</p>

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
                <Link to='/api/orders/orderId' className={styles.viewOrdersLink}>View Orders</Link>
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


