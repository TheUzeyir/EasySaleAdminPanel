import React, { useState } from 'react';
import style from "./componentsAdd.module.css";
import Header from '../header/header';
import axios from 'axios';

const FileUpload = () => {
  const [parentId, setParentId] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!parentId || !languageId || !categoryTitle || !selectedFile) {
      setMessage('Please fill all fields and upload a file.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      const payload = {
        parentId: parseInt(parentId), 
        categoryImage: base64String,
        categoryTranslates: [
          {
            languageId: parseInt(languageId), 
            categoryTitle: categoryTitle,
          },
        ],
      };

      try {
        const response = await axios.post(
          'http://restartbaku-001-site4.htempurl.com/api/Category/create-category',
          payload,
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          }
        );

        if (response.status === 200) {
          setMessage('Category created successfully!');
        } else {
          setMessage('');
        }
      } catch (error) {
        console.error('Error occurred while creating category:', error);
        setMessage(`An error occurred: ${error.message}`);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="componentsAdd_container">
      <Header />
      <div className="container">
        <div className={style.componentAdd}>
          <p className={style.componentAdd_title}>Add Category</p>
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
          <div className={style.componentAdd_main}>
            <p className={style.componentAdd_main_title}>Upload Image *</p>
            <div className={style.componentAdd_main_uploadBox}>
              <input type="file" onChange={handleFileChange} className={style.componentAdd_main_input} />
              {previewUrl && <img className={style.componentAdd_main_img} src={previewUrl} alt="Selected File" />}
            </div>
          </div>

          <div className={style.componentAdd_bottom}>
            <button onClick={handleFormSubmit} className={style.componentAdd_bottom_btn}>
              Create Category
            </button>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;