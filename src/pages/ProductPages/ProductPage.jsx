import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/product/productSlice';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import styles from './ProductDisplay.module.css';
import cartApi from '../../api/cartApi';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleAddToCart = async (product, event) => {
    event.stopPropagation();
    try {
      await cartApi.addToCart({ productId: product._id, quantity: 1 });
      // alert(`Added "${product.name}" to cart successfully.`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Error adding to cart. Please try again.');
    }
  };


  if (status === 'loading') return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.productDisplay}>
      <h1 className={styles.header}>Products List</h1>
      <div className={styles.productsGrid}>
        {currentProducts.map((product) => (
          <div key={product._id} className={styles.productCard} onClick={() => handleProductClick(product)}>
            <img className={styles.productImage} src={product.images[0]} alt={product.name} />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>{product.description.short}</p>
              <p>Price: ${product.price.amount}</p>
              <p>Rating: {product.rating} Stars ({product.reviews?.length ?? 'N/A'} Reviews)</p>
              <button className={styles.addButton} onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.modalContent}>
              <Carousel interval={null}>
                {selectedProduct.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className={styles.modalProductImage}
                      src={image}
                      alt={`${selectedProduct.name} view ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className={styles.modalProductInfo}>
                <p className={styles.price}>${selectedProduct.price.amount.toFixed(2)}</p>
                <div className={styles.options}>
                <p>Color: {selectedProduct.color}</p>
                <p>Size: {selectedProduct.size}</p>                </div>
                <button className={styles.addToCartBtn}>Add To Bag</button>
                <button className={styles.buyNowBtn}>Buy Now</button>
              </div>
            </div>
            <div className={styles.productDetails}>
              <p>{selectedProduct.description.short}</p>
              <p>Price: ${selectedProduct.price.amount.toFixed(2)}</p>
              <p>Rating: {selectedProduct.rating?.stars} Stars ({selectedProduct.rating?.reviews} Reviews)</p>
            </div>
          </Modal.Body>

        </Modal>
      )}


      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? styles.active : ''}>{number}</button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= pageNumbers.length}>Next</button>
      </div>
    </div>
  );
};

export default ProductPage;

