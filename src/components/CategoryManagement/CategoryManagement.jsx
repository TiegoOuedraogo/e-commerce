import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const navigate = useNavigate();
  const { userRole } = useSelector((state) => state.user);

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/');
    } else if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [userRole, status, dispatch, navigate]);

  if (!Array.isArray(categories)) {
    return <p>Categories data is not available or not an array.</p>;
  }

  // const [newCategoryName, setNewCategoryName] = useState('');
  // const [editCategory, setEditCategory] = useState({ id: null, name: '' });

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      dispatch(addCategory({ name: newCategoryName }));
      setNewCategoryName('');
    }
  };

  const handleEditCategoryChange = (e) => {
    setEditCategory({ ...editCategory, name: e.target.value });
  };

  const handleUpdateCategory = () => {
    if (editCategory.id && editCategory.name.trim()) {
      dispatch(updateCategory(editCategory));
      setEditCategory({ id: null, name: '' });
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
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
      {error && <p className={styles.error}>{error}</p>}
      {Array.isArray(categories) && categories.map((category) => (
        <div key={category.id} className={styles.categoryItem}>

          {editCategory.id === category.id ? (
            <>
              <input
                type="text"
                value={editCategory.name}
                onChange={handleEditCategoryChange}
              />
              <button onClick={handleUpdateCategory}>Update</button>
              <button onClick={() => setEditCategory({ id: null, name: '' })}>Cancel</button>
            </>
          ) : (
            <>
              <span>{category.name}</span>
              <button onClick={() => setEditCategory({ id: category.id, name: category.name })}>Edit</button>
              <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryManagement;

