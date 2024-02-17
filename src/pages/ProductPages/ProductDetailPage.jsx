import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productAPI from '../../api/productApi';
import Carousel from 'react-bootstrap/Carousel';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await productAPI.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const averageRating = product?.reviews?.length
    ? product.reviews.reduce((acc, {rating}) => acc + rating, 0) / product.reviews.length
    : 'No reviews yet';

  return (
    <div className={styles.productDetailContainer}>
      <h1>{product?.name}</h1>
      {product?.images?.length > 0 && (
        <Carousel>
          {product.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={image} alt={`${product.name} view ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <p>{product?.description?.long || 'No description available.'}</p>
      <p>Price: ${product?.price?.amount.toFixed(2)}</p>
      <p>Rating: {typeof averageRating === 'number' ? `${averageRating.toFixed(1)} Stars` : averageRating} ({product?.reviews?.length || 0} Reviews)</p>
      <p>Category: {product?.category}</p>
      <p>Availability: {product?.availability || 'Unavailable'}</p>
      
      {/* Review Section */}
      <div>
        <h2>Customer Reviews</h2>
        {product?.reviews?.length > 0 ? (
          <ul>
            {product.reviews.map((review, index) => (
              <li key={index}>
                <p><strong>{review.user}</strong> - {new Date(review.date).toLocaleDateString()}</p>
                <p>Rating: {`${review.rating} Stars`}</p>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
