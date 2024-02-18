// import React, { useState, useEffect } from 'react';
// import adminProductsManagementApi from '../../api/adminProductsManagementApi';
// import styles from './ProductManagement.module.css';

// const ProductManagement = () => {
//     const [products, setProducts] = useState([]);
//     const [product, setProduct] = useState({
//         name: '',
//         brand: '',
//         manufacturer: '',
//         category: '',
//         uniqueIdentifier: '',
//         description: { short: '', long: '' },
//         price: { amount: '', currency: 'USD' },
//         inventory: { sku: '', count: '' },
//         images: [''],
//     });
//     const [editingProductId, setEditingProductId] = useState(null);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             const data = await adminProductsManagementApi.getProducts();
//             setProducts(data);
//         } catch (error) {
//             setError('Failed to fetch products');
//         }
//     };

//     const handleInputChange = (e, nested = null) => {
//         const { name, value } = e.target;
//         if (nested) {
//             setProduct(prev => ({
//                 ...prev,
//                 [nested]: {
//                     ...prev[nested],
//                     [name]: value,
//                 },
//             }));
//         } else {
//             setProduct(prev => ({
//                 ...prev,
//                 [name]: value,
//             }));
//         }
//     };
    
//     const handleImageChange = (e, index) => {
//         let newImages = [...product.images];
//         if (index !== undefined) {
//             newImages[index] = e.target.value;
//         } else {
//             newImages.push('');
//         }
//         setProduct(prev => ({ ...prev, images: newImages }));
//     };
    
//     // Example for adjusting handleSubmit to use only `product` state
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = {
//                 ...product,
//                 price: { ...product.price, amount: parseFloat(product.price.amount) },
//                 inventory: { ...product.inventory, count: parseInt(product.inventory.count) },
//                 // Convert images array if needed, ensure category is an ObjectId
//             };
//             const response = editingProductId ? await adminProductsManagementApi.updateProductById(editingProductId, formData) : await adminProductsManagementApi.addProduct(formData);
//             setSuccess(editingProductId ? 'Product updated successfully' : 'Product added successfully');
//             resetForm();
//             fetchProducts();
//         } catch (error) {
//             setError('Failed to save product: ' + error.message);
//         }
//     };
    

//     const resetForm = () => {
//         setProduct({
//             name: '',
//             brand: '',
//             manufacturer: '',
//             category: '',
//             uniqueIdentifier: '',
//             description: { short: '', long: '' },
//             price: { amount: '', currency: 'USD' },
//             inventory: { sku: '', count: '' },
//             images: [''],
//         });
//         setEditingProductId(null);
//     };

//     const startEditProduct = (product) => {
//         setEditingProductId(product._id);
//         setProduct({ ...product });
//     };

//     const handleDeleteProduct = async (productId) => {
//         try {
//             await adminProductsManagementApi.deleteProductById(productId);
//             setSuccess('Product deleted successfully');
//             fetchProducts();
//         } catch (error) {
//             setError('Failed to delete product');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h1>Product Management</h1>
//             {error && <p className={styles.error}>{error}</p>}
//             {success && <p className={styles.success}>{success}</p>}
//             <form onSubmit={handleSubmit} className={styles.productForm}>
//                             <input
//                     type="text"
//                     name="name"
//                     value={product.name}
//                     onChange={handleInputChange}
//                     placeholder="Product Name"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="brand"
//                     value={product.brand}
//                     onChange={handleInputChange}
//                     placeholder="Brand"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="manufacturer"
//                     value={product.manufacturer}
//                     onChange={handleInputChange}
//                     placeholder="Manufacturer"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="category"
//                     value={product.category}
//                     onChange={handleInputChange}
//                     placeholder="Category"
//                     required
//                 />
//                 {/* <input
//                     type="text"
//                     name="uniqueIdentifier"
//                     value={product.uniqueIdentifier}
//                     onChange={handleInputChange}
//                     placeholder="Unique Identifier"
//                     required
//                 /> */}
//                 <input
//                     type="text"
//                     name="short"
//                     value={product.description.short}
//                     onChange={(e) => handleInputChange(e, 'description')}
//                     placeholder="Short Description"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="long"
//                     value={product.description.long}
//                     onChange={(e) => handleInputChange(e, 'description')}
//                     placeholder="Long Description"
//                     required
//                 />
//                 {/* <input
//                     type="text"
//                     name="sku"
//                     value={product.inventory.sku}
//                     onChange={(e) => handleInputChange(e, 'inventory')}
//                     placeholder="SKU"
//                     required
//                 /> */}
//                 <input
//                     type="number"
//                     name="count"
//                     value={product.inventory.count}
//                     onChange={(e) => handleInputChange(e, 'inventory')}
//                     placeholder="Inventory Count"
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="amount"
//                     value={product.price.amount}
//                     onChange={(e) => handleInputChange(e, 'price')}
//                     placeholder="Price Amount"
//                     required
//                 />
//                 <select
//                     name="currency"
//                     value={product.price.currency}
//                     onChange={(e) => handleInputChange(e, 'price')}
//                     required
//                 >
//                     <option value="USD">USD</option>
//                     <option value="EUR">EUR</option>
//                     <option value="GBP">GBP</option>
//                 </select>
                
//                 {product.images.map((image, index) => (
//             <input
//                 key={index}
//                 type="text"
//                 value={image}
//                 onChange={(e) => handleImageChange(e, index)}
//                 placeholder={`Image URL ${index + 1}`}
//                 required
//             />
//         ))}
//                 <button type="button" onClick={() => handleImageChange({}, undefined)}>Add Image Field</button>
//                 <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
//             </form>
//             <table className={styles.productsTable}>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th> Short Description</th>
//                         <th> Detailed Description</th>
//                         <th>Price</th>
//                         <th>Image</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Array.isArray(products) && products.map((product) => (
//                         <tr key={product._id}>
//                             <td>{product.name}</td>
//                             <td>{product.description.short}</td>
//                             <td>{product.description.long}</td>

//                             <td>${product.price.amount.toFixed(2)}</td>
//                             <td>

//                                 <img src={product.images[0]} alt={product.name} style={{ width: "100px" }} />
//                             </td>
//                             <td>
//                             <div className={styles.actions}>
//                             <button onClick={() => startEditProduct(product)}>Edit Product</button>
//                             <button onClick={() => setEditingProductId(product._id)}>Edit Product ID</button>
//                             <button onClick={() => handleDeleteProduct(product._id)}>Delete Product</button>
//                             </div>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ProductManagement;



import React, { useState, useEffect } from 'react';
import adminProductsManagementApi from '../../api/adminProductsManagementApi';
import styles from './ProductManagement.module.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        manufacturer: '',
        category: '',
        uniqueIdentifier: '',
        description: { short: '', long: '' },
        price: { amount: '', currency: 'USD' },
        inventory: { sku: '', count: '' },
        images: [''],
    });
    const [categories, setCategories] = useState([]); // Assuming categories are fetched from the backend
    const [editingProductId, setEditingProductId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories(); // Assuming a function to fetch categories
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await adminProductsManagementApi.getProducts();
            setProducts(data);
        } catch (error) {
            setError('Failed to fetch products');
        }
    };

    const handleInputChange = (e, nestedField = null) => {
        const { name, value } = e.target;
        if (nestedField) {
            setProduct(prev => ({
                ...prev,
                [nestedField]: {
                    ...prev[nestedField],
                    [name]: value,
                },
            }));
        } else {
            setProduct(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e, index) => {
        let newImages = [...product.images];
        if (index >= 0) {
            newImages[index] = e.target.value;
        } else {
            newImages.push('');
        }
        setProduct(prev => ({ ...prev, images: newImages }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const modifiedProduct = {
            ...product,
            price: { ...product.price, amount: parseFloat(product.price.amount) },
            inventory: { ...product.inventory, count: parseInt(product.inventory.count, 10) }
        };

        try {
            const action = editingProductId ? adminProductsManagementApi.updateProductById(editingProductId, modifiedProduct) : adminProductsManagementApi.addProduct(modifiedProduct);
            const response = await action;
            setSuccess(editingProductId ? 'Product updated successfully' : 'Product added successfully');
            resetForm();
            fetchProducts();
        } catch (error) {
            setError('Failed to save product');
        }
    };

    const resetForm = () => {
        setProduct({
            name: '',
            brand: '',
            manufacturer: '',
            category: '',
            uniqueIdentifier: '',
            description: { short: '', long: '' },
            price: { amount: '', currency: 'USD' },
            inventory: { sku: '', count: '' },
            images: [''],
        });
        setEditingProductId(null);
    };

    const startEditProduct = (product) => {
        setEditingProductId(product._id);
        setProduct({ ...product });
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await adminProductsManagementApi.deleteProductById(productId);
            setSuccess('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            setError('Failed to delete product');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Product Management</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <form onSubmit={handleSubmit} className={styles.productForm}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    placeholder="Brand"
                    required
                />
                <input
                    type="text"
                    name="manufacturer"
                    value={product.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Manufacturer"
                    required
                />
                <select
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <textarea
                    name="short"
                    value={product.description.short}
                    onChange={(e) => handleInputChange(e, 'description')}
                    placeholder="Short Description"
                    required
                />
                <textarea
                    name="long"
                    value={product.description.long}
                    onChange={(e) => handleInputChange(e, 'description')}
                    placeholder="Long Description"
                    required
                />
                <input
                    type="text"
                    name="sku"
                    value={product.inventory.sku}
                    onChange={(e) => handleInputChange(e, 'inventory')}
                    placeholder="SKU"
                    required
                />
                <input
                    type="number"
                    name="count"
                    value={product.inventory.count}
                    onChange={(e) => handleInputChange(e, 'inventory')}
                    placeholder="Inventory Count"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    value={product.price.amount}
                    onChange={(e) => handleInputChange(e, 'price')}
                    placeholder="Price Amount"
                    required
                />
                <select
                    name="currency"
                    value={product.price.currency}
                    onChange={(e) => handleInputChange(e, 'price')}
                    required
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>
                {product.images.map((image, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(e, index)}
                            placeholder={`Image URL ${index + 1}`}
                            required
                        />
                        {product.images.length > 1 && (
                            <button type="button" onClick={() => handleImageChange({ target: { value: '' }}, index)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={() => handleImageChange({}, undefined)}>Add Image Field</button>
                <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
            </form>
            <table className={styles.productsTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Manufacturer</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.manufacturer}</td>
                            <td>{product.category.name}</td> {/* Assuming category is populated */}
                            <td>{`${product.price.currency} ${product.price.amount}`}</td>
                            <td>
                                <button onClick={() => startEditProduct(product)}>Edit</button>
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
