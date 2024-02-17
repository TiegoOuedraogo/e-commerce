import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../features/checkout/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import styles from "./CheckoutPage.module.css";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: 'CreditCard',
  });

  const handleInputChange = (e, nestedField = null) => {
    const { name, value } = e.target;

    if (nestedField) {
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        [nestedField]: {
          ...prevDetails[nestedField],
          [name]: value,
        },
      }));
    } else {
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
        const orderResponse = await dispatch(createOrder(orderDetails)).unwrap();
        navigate('/order-success', { state: { orderId: orderResponse.order._id } });
      } catch (error){
        console.error('Order creation failed:', error);
      alert(`Failed to create order. ${error.message || 'Please try again.'}`);
    }
};


  return (
    <div className={styles.checkoutFormContainer}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmitOrder} className={styles.checkoutForm}>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            required
            onChange={(e) => handleInputChange(e, 'shippingAddress', true)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            required
            onChange={(e) => handleInputChange(e, 'shippingAddress', true)}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            required
            onChange={(e) => handleInputChange(e, 'shippingAddress', true)}
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            required
            onChange={(e) => handleInputChange(e, 'shippingAddress', true)}
          />
        </div>

        <div>
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            onChange={(e) => handleInputChange(e)}
            value={orderDetails.paymentMethod}
          >
            <option value="CreditCard">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Place Order</button>
      </form>
    </div>
  );
};

export default CheckOutPage;

