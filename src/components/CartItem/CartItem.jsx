import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
    const { removeFromCart, incrementQuantity, decrementQuantity, updateQuantity } = useContext(CartContext);
    const [editQuantity, setEditQuantity] = useState(item.quantity);

    useEffect(() => {
        setEditQuantity(item.quantity);
    }, [editQuantity]);

    const handleQuantityChange = (e) => {
        console.log("sumbmittin line 14 func")
        const newQuantity = parseInt(e.target.value, 10);
        setEditQuantity(newQuantity);
    };

    const handleSubmitQuantity = () => {
        updateQuantity(item._id, editQuantity);
    };

    if (!item || typeof item !== 'object') {
        console.error('Invalid item structure:', item);
        return <p>Item is not available.</p>;
    }

    return (
        <div className={styles.cartItem}>
            {item.images && item.images.length > 0 ? (
                <img src={item.images[0]} alt={item.name} className={styles.image} />
            ) : (
                <div className={styles.imagePlaceholder}>No Image</div> 
            )}
            <h3 className={styles.details}>{item.name}</h3>
            <p className={styles.details}>{`Price: $${item.price.toFixed(2)}`}</p>
            <div className={styles.quantityControl}>
                <button className={styles.button} aria-label="Decrease quantity" onClick={() => decrementQuantity(item._id)}>-</button>
                <input
                    type="number"
                    className={styles.quantityInput}
                    value={editQuantity}
                    onChange={handleQuantityChange}
                    onBlur={handleSubmitQuantity}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitQuantity()}
                    min="1"
                />
                <button className={styles.button} aria-label="Increase quantity" onClick={() => incrementQuantity(item._id)}>+</button>
            </div>
            <button className={styles.removeButton} aria-label="Remove item from cart" onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
    );
};

export default CartItem;

