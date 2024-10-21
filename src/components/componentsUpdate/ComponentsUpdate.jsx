import React, { useState } from 'react';
import axios from 'axios';
import style from './componentsUpdate.module.css';
import { IoClose } from "react-icons/io5";

// Error boundary component to catch any errors in the update component
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
    return null; // Don't render the component if the item is undefined
  }

  const [categoryTitle, setCategoryTitle] = useState(item.categoryTitle || '');
  const [parentId, setParentId] = useState(item.parentId || '');
  const [categoryImage, setCategoryImage] = useState(item.categoryImage || '');
  const [languageId, setLanguageId] = useState(item.languageId || '');

  const handleUpdate = () => {
    if (!categoryTitle || !languageId) {
      alert('Category title and Language ID are required');
      return;
    }

    const updatedData = {
      categoryId: item.categoryId,
      parentId: parentId || null,
      categoryImage,
      categoryTranslates: [
        {
          categoryTranslateId: 0,
          languageId: parseInt(languageId, 10),
          categoryTitle,
        },
      ],
    };

    axios.put(
      `http://restartbaku-001-site4.htempurl.com/api/Category/update-category/${item.categoryId}`,
      updatedData
    )
      .then(response => {
        if (response.data.isSuccessful) {
          onUpdateSuccess(); // Trigger success callback to refresh data
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

  // Closes the modal when clicked
  const handleClose = () => {
    if (onClose) {
      onClose(); // Trigger the onClose callback to close the modal
    }
  };

  return (
    <ErrorBoundary>
      {/* Backdrop for modal */}
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
          name="categoryImage"
          value={categoryImage}
          onChange={(e) => setCategoryImage(e.target.value)}
          className={style.componentsUpdate_input}
          placeholder="Update Category Image URL"
        />
        <input
          name="languageId"
          value={languageId}
          onChange={(e) => setLanguageId(e.target.value)}
          className={style.componentsUpdate_input}
          placeholder="Update Language ID"
          required
        />
        <button className={style.componentsUpdate_btn} onClick={handleUpdate}>
          Save
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default ComponentsUpdate;
