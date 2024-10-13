import React, { useState } from 'react';
import axios from 'axios';
import style from './componentsPage.module.css';

const ComponentsUpdate = ({ item, onUpdateSuccess }) => {
  const [categoryTitle, setCategoryTitle] = useState(item.categoryTitle || '');
  const [parentId, setParentId] = useState(item.parentId || '');
  const [categoryImage, setCategoryImage] = useState(item.categoryImage || '');
  const [languageId, setLanguageId] = useState(item.languageId || '');

  const handleUpdate = () => {
    // Validate category title and language ID
    if (!categoryTitle || !languageId) {
      alert('Category title and Language ID are required');
      return;
    }

    // Prepare the updated data object
    const updatedData = {
      categoryId: item.categoryId, // Include categoryId from the item
      parentId: parentId || null, // Set parentId to null if not provided
      categoryImage, // Include categoryImage
      categoryTranslates: [
        {
          categoryTranslateId: 0, // Assuming this is for a new entry
          languageId: parseInt(languageId, 10), // Use the entered language ID
          categoryTitle, // Use the updated category title
        },
      ],
    };

    console.log('Data being sent for update:', updatedData);

    // Make the PUT request to update the category
    axios.put(`http://restartbaku-001-site4.htempurl.com/api/Category/update-category/${item.categoryId}`, updatedData)
      .then(response => {
        console.log('Update Response:', response.data);
        if (response.data.isSuccessful) {
          onUpdateSuccess(); // Trigger the success callback to refresh data
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
        type="number"
      />
      <input
        name="categoryImage"
        value={categoryImage}
        onChange={(e) => setCategoryImage(e.target.value)}
        className={style.componentsUpdate_input}
        placeholder="Update Category Image URL"
        type="text"
      />
      <input
        name="languageId"
        value={languageId}
        onChange={(e) => setLanguageId(e.target.value)}
        className={style.componentsUpdate_input}
        placeholder="Update Language ID"
        required
        type="number"
      />
      <button className={style.componentsUpdate_btn} onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
};

export default ComponentsUpdate;
