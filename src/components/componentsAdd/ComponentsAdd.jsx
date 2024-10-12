import React, { useState } from 'react';
import style from "./componentsAdd.module.css";
import Header from '../header/header';
import axios from 'axios';

const FileUpload = () => {
  const [parentId, setParentId] = useState('');  // Parent ID state
  const [languageId, setLanguageId] = useState('');  // Language ID state
  const [categoryTitle, setCategoryTitle] = useState('');  // Category Title state
  const [selectedFile, setSelectedFile] = useState(null);  // Selected file state
  const [previewUrl, setPreviewUrl] = useState(null);  // File preview URL state
  const [message, setMessage] = useState('');  // Message to show form feedback (success/error)

  // Handle file selection (for image upload)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);  // Generate preview URL
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  // Handle form submission (POST category data)
  const handleFormSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Check if all fields are filled
    if (!parentId || !languageId || !categoryTitle || !selectedFile) {
      setMessage('Please fill all fields and upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;  // Convert file to base64 string

      const payload = {
        parentId: parseInt(parentId),  // Parent ID
        categoryImage: base64String,   // Category image as base64
        categoryTranslates: [
          {
            categoryTranslateId: 0,
            languageId: parseInt(languageId),
            categoryTitle: categoryTitle,  // Category Title
          },
        ],
      };

      try {
        // Send POST request to create a new category
        const response = await axios.post(
          'http://restartbaku-001-site4.htempurl.com/api/Category/create-category',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',  // Specify JSON format
            },
          }
        );

        // Handle the response
        if (response.status === 200) {
          setMessage('Category created successfully!');
          setParentId('');  // Clear the form fields after successful submission
          setLanguageId('');
          setCategoryTitle('');
          setSelectedFile(null);
          setPreviewUrl(null);  // Reset the image preview
        } else {
          setMessage('Failed to create category. Please try again.');
        }
      } catch (error) {
        console.error('Error occurred while creating category:', error);
        setMessage(`An error occurred: ${error.message}`);
      }
    };

    reader.readAsDataURL(selectedFile);  // Start reading the file as base64
  };

  return (
    <div className="componentsAdd_container">
      <Header />
      <div className="container">
        <div className={style.componentAdd}>
          <p className={style.componentAdd_title}>Add Category</p>
          <form onSubmit={handleFormSubmit}>
            {/* Parent ID input */}
            <div className={style.componentAdd_header}>
              <p>Parent Id *</p>
              <input
                type="text"
                placeholder="Parent Id"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className={style.componentAdd_header_input}
                required
              />
            </div>

            {/* Language ID input */}
            <div className={style.componentAdd_header}>
              <p>Language Id *</p>
              <input
                type="text"
                placeholder="Language Id"
                value={languageId}
                onChange={(e) => setLanguageId(e.target.value)}
                className={style.componentAdd_header_input}
                required
              />
            </div>

            {/* Category Title input */}
            <div className={style.componentAdd_header}>
              <p>Category Title *</p>
              <input
                type="text"
                placeholder="Category Title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className={style.componentAdd_header_input}
                required
              />
            </div>

            {/* File Upload Section */}
            <div className={style.componentAdd_main}>
              <p className={style.componentAdd_main_title}>Upload Image *</p>
              <div className={style.componentAdd_main_uploadBox}>
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  className={style.componentAdd_main_input} 
                  accept="image/*" 
                />
                {/* Show image preview if selected */}
                {previewUrl && <img className={style.componentAdd_main_img} src={previewUrl} alt="Selected File" />}
              </div>
            </div>

            {/* Submit Button */}
            <div className={style.componentAdd_bottom}>
              <button type="submit" className={style.componentAdd_bottom_btn}>
                Create Category
              </button>
            </div>

            {/* Message to show status after form submission */}
            {message && <p className={style.componentAdd_message}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
