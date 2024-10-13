import React, { useState } from 'react';
import axios from 'axios';
import style from './componentsPage.module.css';

const ComponentsUpdate = ({ item, onUpdateSuccess }) => {
  const [categoryTitle, setCategoryTitle] = useState(item.categoryTitle || '');
  const [categoryImage, setCategoryImage] = useState(null);

  const handleUpdate = () => {
    // Validate category title
    if (!categoryTitle) {
      alert('Category title is required');
      return;
    }

    // Create the FormData object
    const formData = new FormData();
    formData.append('categoryId', item.categoryId); // Include the category ID for updating
    formData.append('categoryTitle', categoryTitle); // Append the updated category title

    // If an image file is selected, include it in the FormData
    if (categoryImage) {
      formData.append('categoryImage', categoryImage); // Adjust the key if necessary
    }

    console.log('Data being sent for update:', formData);

    // API call
// API call
axios.put(
  `http://restartbaku-001-site4.htempurl.com/api/Category/update-category/${item.categoryId}`,
  formData // Ensure you're not adding Content-Type header here
)
  .then((response) => {
    console.log('Update Response:', response.data);
    if (response.data.isSuccessful) {
      onUpdateSuccess(); // Call to refresh the data
    } else {
      console.error('Failed to update the category:', response.data);
    }
  })
  .catch((error) => {
    console.error('Error updating the category:', error);
    if (error.response && error.response.data) {
      console.error('Error details:', error.response.data);
    }
  });
ed4eww
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryImage(file); // Store the file object
    }
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
        name="categoryImage"
        type="file"
        onChange={handleImageChange}
        className={style.componentsUpdate_input}
      />
      <button className={style.componentsUpdate_btn} onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
};

export default ComponentsUpdate;
