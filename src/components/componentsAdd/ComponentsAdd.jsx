import React, { useEffect, useState } from 'react';
import style from "./componentsAdd.module.css";
import Header from '../header/header';
import axios from 'axios';

const ComponentsAdd = () => {
  const [parentId, setParentId] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get('http://restartbaku-001-site3.htempurl.com/api/Language/get-all-languages');
      console.log('Languages fetched:', response.data);
      setLanguages(response.data.data); // Adjust based on actual API response structure
    } catch (error) {
      console.error('Error fetching languages:', error.response ? error.response.data : error.message);
      // Optionally, mock the languages for development if the API is not available
      const mockLanguages = [
        { languageId: 1, languageName: 'English' },
        { languageId: 2, languageName: 'Spanish' },
        { languageId: 3, languageName: 'French' },
      ];
      console.log('Using mock languages data');
      setLanguages(mockLanguages);
    }
  };

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
          // Reset form fields after successful submission
          setParentId('');
          setLanguageId('');
          setCategoryTitle('');
          setSelectedFile(null);
          setPreviewUrl(null);
        } else {
          setMessage('Failed to create category.');
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
          <form onSubmit={handleFormSubmit}>
            <div className={style.componentAdd_header}>
              <label>Parent Id *</label>
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
              <label>Language Id *</label>
              <select
                value={languageId}
                onChange={(e) => setLanguageId(e.target.value)}
                className={style.componentAdd_header_input}
                required
              >
                <option value="" disabled>Select Language</option>
                {languages.map(lang => (
                  <option key={lang.languageId} value={lang.languageId}>
                    {lang.languageName}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.componentAdd_header}>
              <label>Category Title *</label>
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
              <button type="submit" className={style.componentAdd_bottom_btn}>
                Create Category
              </button>
            </div>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAdd;
