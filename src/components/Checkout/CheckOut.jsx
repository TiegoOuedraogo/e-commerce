import React, { useState, useContext } from 'react';
// Import context or Redux hook if you're using Redux for state management
import { CheckoutContext } from '../context/CheckoutContext'; // Adjust path as needed
import styles from './Checkout.module.css';

const Checkout = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    // Replace CheckoutContext with your state management context or Redux hook
    const { createOrder } = useContext(CheckoutContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Assuming createOrder is an async function that calls your API
        try {
            await createOrder({ shippingAddress, paymentMethod });
            alert('Order placed successfully!');
            // Redirect or update UI upon successful order creation
        } catch (error) {
            alert('Failed to place the order. Please try again.');
            console.error('Checkout error:', error);
        }
    };

    return (
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <div className={styles.formGroup}>
                <label htmlFor="shippingAddress">Shipping Address</label>
                <input
                    type="text"
                    id="shippingAddress"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                >
                    <option value="">Select a payment method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    {/* Add more payment methods as needed */}
                </select>
            </div>
            <button type="submit" className={styles.checkoutButton}>Place Order</button>
        </form>
    );
};

export default Checkout;
