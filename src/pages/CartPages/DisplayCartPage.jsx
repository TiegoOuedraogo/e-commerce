import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '../../features/cart/cartSlice';
import styles from './DisplayCartPage.module.css';
import { useNavigate } from 'react-router-dom';

const DisplayCartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, error, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity({ productId, quantity: parseInt(newQuantity, 10) }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  console.log('Cart items in component:', cartItems);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading cart items...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div className={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div className={styles.DisplayCart}>
      <h1>Shopping Cart</h1>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div className={styles.cartItem} key={item._id}>
            <div className={styles.itemDetails}>
              {item.images && item.images.length > 0 ? (
                <img className={styles.productImage} src={item.images[0]} alt={item.name} />
              ) : (
                <div className={styles.placeholderImage}>No Image Available</div>
              )}
              <div className={styles.productInfo}>
                <h3>{item.name}</h3>
                <p>{item.description.short || item.description.long}</p>
                <div className={styles.quantityControl}>
                  <label htmlFor={`quantity-${item._id}`}>Qty:</label>
                  <select
                    id={`quantity-${item._id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
            </div>
            <div className={styles.itemPrice}>
            {/* <p>${item.price.amount.toFixed(2)}</p> */}
            <p>${(item.quantity * item.price.amount).toFixed(2)}</p>
  <button onClick={() => dispatch(removeFromCart(item._id))} className={styles.removeButton} aria-label="Remove item">Delete</button>
</div>
          </div>
        ))}
      </div>
      <div className={styles.totalSection}>

  {/* <p className={styles.subtotal}>
    Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):
    <span>
  ${cartItems.reduce((acc, item) => acc + item.quantity * (item.price?.amount ?? 0), 0).toFixed(2)}
</span>
  </p> */}

<p className={styles.subtotal}>
  Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items): 
  <span>
    ${cartItems.reduce((acc, item) => acc + item.quantity * (item.price?.amount ?? 0), 0).toFixed(2)}
  </span>
</p>

  <button onClick={handleCheckout} className={styles.checkoutButton}>Proceed to Checkout</button>
</div>

    </div>
  );
};

export default DisplayCartPage;


