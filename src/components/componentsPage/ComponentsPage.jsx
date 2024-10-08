import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaPenFancy, FaTrash } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../header/header';
import style from "./componentsPage.module.css";

const ComponentsPage = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editDataList, setEditDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az')
      .then(response => {
        console.log('API Response:', response.data);
        const { data } = response.data;
        if (Array.isArray(data)) {
          setEditDataList(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const clickTrashBox = (categoryId) => {
    axios.delete(`http://restartbaku-001-site4.htempurl.com/api/Category/delete-category/${categoryId}`)
      .then(response => {
        console.log('Delete Response:', response.data);
        if (response.data.isSuccessful) {
          setEditDataList(prevDataList => prevDataList.filter(item => item.categoryId !== categoryId));
        } else {
          console.error('Failed to delete the category:', response.data);
        }
      })
      .catch(error => {
        console.error('Error deleting the category:', error);
      });
  };

  const handleEditClick = (categoryId) => {
    setIsEditing(categoryId);
  };

  const handleInputChange = (e, categoryId) => {
    const { name, value } = e.target;
    setEditDataList(prevDataList =>
      prevDataList.map(item =>
        item.categoryId === categoryId ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSave = () => {
    setIsEditing(null);
  };

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Atribute</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input className={style.componentsPage_header_input} type="text" placeholder="Search..." />
            <FaSearch className={style.componentsPage_header_input_icon} />
            <button className={style.componentsPage_header_btn} onClick={() => navigate('/componentsAdd')}>
              <FaPlus /> Add New
            </button>
          </div>
          <div className={style.componentsPage_bottom}>
            <div className={style.componentsPage_bottom_header}>
              <p className={style.componentsPage_bottom_header_title}>ID</p>
              <p className={style.componentsPage_bottom_header_title}>Status</p>
              <p className={style.componentsPage_bottom_header_title}>Parent ID</p>
              <p className={style.componentsPage_bottom_header_title}>Image</p>
              <p className={style.componentsPage_bottom_header_title}>Action</p>
            </div>
            {editDataList.map((item) => (
              <div key={item.categoryId} className={`${style.componentsPage_bottom_main} ${deleteBox ? style.componentsPage_bottom_main_displayNone : ""}`}>
                {isEditing === item.categoryId ? (
                  <>
                    <input
                      name="categoryTitle"
                      value={item.categoryTitle}
                      onChange={(e) => handleInputChange(e, item.categoryId)}
                      className={style.componentsPage_bottom_main_productTitle}
                      required
                    />
                    <input
                      name="parentId"
                      value={item.parentId || ''}
                      onChange={(e) => handleInputChange(e, item.categoryId)}
                      className={style.componentsPage_bottom_main_productParentId}
                      required
                      type='number'
                    />
                    <input
                      name="categoryImage"
                      value={item.categoryImage}
                      onChange={(e) => handleInputChange(e, item.categoryId)}
                      className={style.componentsPage_bottom_main_productImage}
                      required
                      type='text'
                    />
                    <button onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <>
                    <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryTitle}</p>
                    <p className={style.componentsPage_bottom_main_productParentId}>{item.parentId || 'N/A'}</p>
                    <p className={style.componentsPage_bottom_main_productParentId}>{item.parentId || 'N/A'}</p>
                    <div className={style.componentsPage_bottom_main_productImageBox}>
                      <img src={item.categoryImage} 
                        alt={item.categoryTitle} 
                        className={style.componentsPage_bottom_main_productImage}
                      />
                    </div>
                  </>
                )}
                <div className={style.componentsPage_bottom_main_iconBox}>
                  <FaPenFancy className={style.componentsPage_bottom_main_iconBox_icon} onClick={() => handleEditClick(item.categoryId)} />
                  <FaTrash className={style.componentsPage_bottom_main_iconBox_icon} onClick={() => clickTrashBox(item.categoryId)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
