import React, { useState } from 'react';
import axios from 'axios';
import style from './componentsPage.module.css';

const ComponentsUpdate = ({ item, onUpdateSuccess }) => {
  const [categoryTitle, setCategoryTitle] = useState(item.categoryTitle || '');
  const [parentId, setParentId] = useState(item.parentId || '');
  const [categoryImage, setCategoryImage] = useState(item.categoryImage || '');

  const handleUpdate = () => {
    // Validate category title
    if (!categoryTitle) {
      alert('Category title is required');
      return;
    }
  
    // Prepare the updated data object
    const updatedData = {
      categoryTitle,
      parentId: parentId || null, // Set parentId to null if not provided
      ...(categoryImage && { categoryImage }), // Include categoryImage only if it has a valid value
    };
  
    console.log('Data being sent for update:', updatedData);
  
    axios.put(`http://restartbaku-001-site4.htempurl.com/api/Category/update-category/${item.categoryId}`, updatedData)
      .then(response => {
        console.log('Update Response:', response.data);
        if (response.data.isSuccessful) {
          onUpdateSuccess(); // This should trigger your API call again to refresh data
        } else {
          console.error('Failed to update the category:', response.data);
        }
      })
      .catch(error => {
        console.error('Error updating the category:', error);
        if (error.response && error.response.data) {
          console.error('Error details:', error.response.data);
        }
      });
  };  

  return (
    <div className={`${style.componentsUpdate} ${style.componentsUpdate_container}`}>
      <input
        name="categoryTitle"
        value={categoryTitle}
        onChange={(e) => setCategoryTitle(e.target.value)}
        className={style.componentsUpdate_input}
        placeholder="Update Category Title"
        required
      />
      <input
        name="parentId"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        className={style.componentsUpdate_input}
        placeholder="Update Parent ID"
        required
        type="number"
      />
      <input
        name="categoryImage"
        value={categoryImage}
        onChange={(e) => setCategoryImage(e.target.value)}
        className={style.componentsUpdate_input}
        placeholder="Update Category Image URL"
        required
        type="text"
      />
      <button className={style.componentsUpdate_btn} onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
};

export default ComponentsUpdate;
