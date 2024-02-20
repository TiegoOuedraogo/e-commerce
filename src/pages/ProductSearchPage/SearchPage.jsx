import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../../features/product/productSlice';
// import productApi from '../../api/productApi'; 

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchProduct(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or ID..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && products.length === 0 && <p>No products found.</p>}
      {status === 'succeeded' && products.map((product) => (
        <div key={product.uniqueIdentifier}>
          <h2>{product.name}</h2>
          <p>{product.description.short}</p>
        </div>
      ))}
      {status === 'failed' && <p>Error: {error}</p>}
    </div>
  );
};

export default SearchPage;
