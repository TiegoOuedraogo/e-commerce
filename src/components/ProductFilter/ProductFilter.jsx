import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../features/product/productSlice';
import styles from './ProductFilter.module.css';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products || { products: [], status: 'idle', error: null });
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    brand: '',
    categories: '', 
    rating: '',
    color: '',
    size: '',
  });

  const categories = ['Lip Care', 'Eye Makeup', 'Skin Care', 'Face Makeup', 'Miscellaneous'];
  const brands = ['Beauty Co', 'LashLux', 'Lip Luxuries', 'SkinQuench','Glow Goddess','Lasting Beauty','SilkySkin',
  'PureSkin','EyesAlive','ColorWaves'];
  const colors = ['Red', 'Blue', 'Green', 'Black'];
  const sizes = ['S', 'M', 'L', 'XL'];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    dispatch(fetchProducts(filters))
      .then(() => {
        navigate('/products');
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    handleApplyFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.filterContainer}>
          <h3>Filter Products</h3>
    <div>
      <label htmlFor="minPrice">Min Price:</label>
      <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />

      <label htmlFor="maxPrice">Max Price:</label>
      <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />

      <label htmlFor="categories">Category:</label> 
      <select name="categories" value={filters.categories} onChange={handleFilterChange}> 
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

        <label htmlFor="brand">Brand:</label>
        <select name="brand" value={filters.brand} onChange={handleFilterChange}>
          <option value="">Select a brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>

        <label htmlFor="rating">Rating:</label>
        <input type="number" name="rating" step="0.1" min="0" max="5" value={filters.rating} onChange={handleFilterChange} />

        <label htmlFor="color">Color:</label>
        <select name="color" value={filters.color} onChange={handleFilterChange}>
          <option value="">Select a color</option>
          {colors.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>

        <label htmlFor="size">Size:</label>
        <select name="size" value={filters.size} onChange={handleFilterChange}>
          <option value="">Select a size</option>
          {sizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <button className={styles.applyButton} onClick={handleApplyFilters}>Apply Filters</button>

      {status === 'loading' && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}

      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product._id} className={styles.productItem}>{product.name} - ${product.price?.amount || product.price}</li> 
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;

