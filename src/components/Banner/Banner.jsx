import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Banner.module.css';
import { getProducts } from '../../api/productApi';

const Banner = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchAndSetRandomProducts = async () => {
      try {
        const products = await getProducts();
        setRandomProducts(getRandomProducts(products, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAndSetRandomProducts();
  }, []);

  // Helper function to get a random set of products
  const getRandomProducts = (products, num) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>Welcome to Our Shop</h1>
        <p>Get the best products for your needs</p>
        <Link to="/products" className={styles.shopButton}>Browse Our Shop</Link>
        <div className={styles.offers}>
          {renderOffers()}
        </div>
      </div>
      {renderPromotionArea(randomProducts)}
    </div>
  );
};

// Render special offers section
const renderOffers = () => (
  <>
    <div className={styles.limitedTimeOffer}>
      <span>🔥 10% Off! Limited Time Offer</span>
    </div>
    <div className={styles.lastCallOffer}>
      <span>Last Call! Buy 2 Get One Free 🎉</span>
    </div>
    <div className={styles.newSignupOffer}>
      <span>🌟 Special Offer for New Sign-ups: Buy 2 Get One Free!</span>
      <Link to="/register" className={styles.signupButton}>Sign Up Now</Link>
    </div>
  </>
);

// Render promotion area with featured products
const renderPromotionArea = (randomProducts) => (
  <div className={styles.promotionArea}>
    <div className={styles.featuredProducts}>
      {randomProducts.map(product => (
        <div className={styles.productCard} key={product.uniqueIdentifier}>
          <img className={styles.productImage} src={product.images[0]} alt={product.name} />
          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <p>{product.description.short}</p>
            <p>Price: {product.price.currency} {product.price.amount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Banner;

