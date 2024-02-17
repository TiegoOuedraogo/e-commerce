import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductManagement.module.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '',image: '' });
    const [editingProductId, setEditingProductId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products');
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/products', newProduct);
            setSuccess('Product added successfully');
            setNewProduct({ name: '', description: '', price: '' });
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Failed to add product');
        }
    };

    const handleEditProduct = async (product) => {
        try {
            await axios.put(`/api/products/${editingProductId}`, product);
            setSuccess('Product updated successfully');
            setEditingProductId(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Failed to update product');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            setSuccess('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Product Management</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <form onSubmit={handleAddProduct} className={styles.productForm}>
                <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product Name"
                    required
                />
                <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Product Description"
                    required
                />
                <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Price"
                    required
                />
                <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                placeholder="Image URL"
                required
                />

                <button type="submit">Add Product</button>
            </form>
            <table className={styles.productsTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>
                            <img src={product.image} alt={product.name} style={{ width: "100px" }} /> 
                            </td>
                            <td>
                            <button onClick={() => setEditingProductId(product._id)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;

