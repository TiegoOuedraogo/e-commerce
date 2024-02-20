import React, { useState, useEffect } from 'react';
import adminOrdersManagementApi from '../../api/adminOrdersManagementApi';
import styles from './OrderManagement.module.css';

const OrderDetailsModal = ({ isOpen, order, onClose }) => {
    if (!isOpen || !order) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>User ID:</strong> {order.user ? order.user.username : 'User Deleted'}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderedDate).toLocaleDateString()}</p>
                <h3>Items:</h3>
                <ul>
                    {order.orderDetails.map((item, index) => (
                        <li key={index}>
                            Product ID: {item.product}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditOrder, setCurrentEditOrder] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [editingDetails, setEditingDetails] = useState({
        items: [],
        orderedDate: orders.date,
        orderPrice: orders.price,
        orderQuantity: orders.quantity

    });
    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await adminOrdersManagementApi.getOrders();
                console.log("receiving the orders data", response)
                setOrders(response);
            } catch (error) {
                setError('Failed to fetch orders');
            }
        };
        fetchAllOrders();
    }, []);

    const handleOpenModal = (order) => {
        setCurrentOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenEditModal = (order) => {
        setCurrentEditOrder(order);
        setEditingDetails({
            items: order.orderDetails,
            orderedDate: order.date,
            orderPrice: order.price,
            orderQuantity: order.quantity

        });
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentEditOrder(null);
    };
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...editingDetails.items];
        const currentItem = updatedItems[index];
        currentItem[field] = field === 'quantity' ? parseInt(value, 10) : parseFloat(value).toFixed(2);
        if (field === 'quantity') {
            currentItem.price = calculatePriceForItem(currentItem.productId, value);
        }

        setEditingDetails(prevState => {
            const updatedDetails = { ...prevState, items: updatedItems };
                updatedDetails.orderPrice = updatedItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    
            return updatedDetails;
        });
    };

    const handleEditOrderSubmit = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            status: e.target.status.value,
            items: editingDetails.items,
            orderedDate: editingDetails.orderedDate,

        };

        try {
            await adminOrdersManagementApi.updateOrderById(currentEditOrder._id, updatedOrder);
            setSuccess('Order updated successfully');
            handleCloseEditModal();
            const response = await adminOrdersManagementApi.getOrders();
            setOrders(response.data);
        } catch (error) {
            setError('Failed to update order');
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await adminOrdersManagementApi.cancelOrder(orderId);
            setSuccess('Order canceled successfully');
            const response = await adminOrdersManagementApi.getOrders();
            setOrders(response.data);
        } catch (error) {
            setError('Failed to cancel order');
        }
    };

    return (
        <div className={styles.orderManagementContainer}>
            <h1>Order Management</h1>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
            <OrderDetailsModal isOpen={isModalOpen} order={currentOrder} onClose={handleCloseModal} />

            {editingDetails.items.map((item, index) => (
                <div key={index}>
                    <label>Product ID: {item.product}</label>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                    <input
                        type="text"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    />
                </div>
            ))}

            {isEditModalOpen && currentEditOrder && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Order</h2>
                        <form onSubmit={handleEditOrderSubmit}>
                            <div>
                                <label htmlFor="status">Status:</label>
                                <select id="status" name="status" defaultValue={currentEditOrder.status}>
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={handleCloseEditModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders) && orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user ? order.user.username : 'User Deleted'}</td>
                            <td>{new Date(order.orderedDate).toLocaleDateString()}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleOpenModal(order)}>View Details</button>
                                <button onClick={() => handleOpenEditModal(order)}>Edit</button>
                                <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;

