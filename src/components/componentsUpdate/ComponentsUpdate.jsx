import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './componentsUpdate.module.css';
import { IoClose } from "react-icons/io5";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const ComponentsUpdate = ({ item, onUpdateSuccess, onClose }) => {
  if (!item) {
    return null;
  }

  const [categoryTitle, setCategoryTitle] = useState(item.categoryTitle || '');
  const [parentId, setParentId] = useState(item.parentId || '');
  const [categoryImage, setCategoryImage] = useState(null); // Image file
  const [languageId, setLanguageId] = useState(item.languageId || '');
  const [isSaving, setIsSaving] = useState(false); // Track save status
  const [error, setError] = useState(null); // Track errors

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]); // File input
  };

  const handleUpdate = async () => {
    if (!categoryTitle || !languageId) {
      alert('Category title and Language are required');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', item.categoryId);
    formData.append('parentId', parentId || null);
    
    // Only append categoryImage if an image is selected
    if (categoryImage) {
      formData.append('categoryImage', categoryImage);
    }

    formData.append('categoryTranslates[0].categoryTranslateId', 0);
    formData.append('categoryTranslates[0].languageId', parseInt(languageId, 10));
    formData.append('categoryTranslates[0].categoryTitle', categoryTitle);

    try {
      setIsSaving(true); // Indicate saving is in progress
      const response = await axios.put(
        `http://restartbaku-001-site4.htempurl.com/api/Category/update-category/${item.categoryId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.isSuccessful) {
        alert('Category updated successfully!');
        onUpdateSuccess(); // Trigger callback to refresh data or close modal
      } else {
        console.error('Failed to update the category:', response.data);
        setError('Failed to update the category.');
      }
    } catch (error) {
      console.error('Error updating the category:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
        setError(`Error: ${error.response.data.message || 'Unknown error occurred'}`);
      } else {
        setError('Error occurred while updating.');
      }
    } finally {
      setIsSaving(false); // Reset saving status
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <ErrorBoundary>
      <div className={style.backdrop} onClick={handleClose}></div>

      <div className={style.componentsUpdate}>
        <p onClick={handleClose} className={style.componentsUpdate_title}>
          Update Component <IoClose className={style.componentsUpdate_title_icon} />
        </p>
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
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={style.componentsUpdate_input}
        />
        <select
          name="languageId"
          value={languageId}
          onChange={(e) => setLanguageId(e.target.value)}
          className={style.componentsUpdate_input}
          required
        >
          <option value="" disabled>Select Language</option>
          <option value="1">Azerbaijani</option>
          <option value="2">Russian</option>
          <option value="3">English</option>
        </select>
        <button 
          className={style.componentsUpdate_btn} 
          onClick={handleUpdate}
          disabled={isSaving} // Disable button while saving
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        {error && <p className={style.error}>{error}</p>}
      </div>
    </ErrorBoundary>
  );
};

export default ComponentsUpdate;
