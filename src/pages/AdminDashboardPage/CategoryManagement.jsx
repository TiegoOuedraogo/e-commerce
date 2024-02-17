import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategory, setEditCategory] = useState({ id: null, name: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        if (newCategoryName.trim() === '') {
            alert('Category name cannot be empty');
            return;
        }

        try {
            await axios.post('/api/categories', { name: newCategoryName });
            fetchCategories();
            setNewCategoryName('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEditCategory = async () => {
        try {
            await axios.put(`/api/categories/${editCategory.id}`, { name: editCategory.name });
            fetchCategories();
            setEditCategory({ id: null, name: '' });
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`/api/categories/${categoryId}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Category Management</h1>
            <div>
                <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)} 
                    placeholder="New Category Name"
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
            <div>
                {categories.map((category) => (
                    <div key={category.id} className={styles.categoryItem}>
                        <span>{category.name}</span>
                        {/* Add buttons for editing and deleting categories */}
                        <button onClick={() => setEditCategory({ id: category.id, name: category.name })}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                    </div>
                ))}
            </div>
            {editCategory.id && (
                <div>
                    <input 
                        type="text" 
                        value={editCategory.name} 
                        onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} 
                    />
                    <button onClick={handleEditCategory}>Update Category</button>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;

