import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Header from '../header/header';
import style from "./userInfo.module.css"

const UserInfo = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDataList, setEditDataList] = useState([
    { id: '54', status: 'true', weight: '526', img: 'true', slug: 'true' },
  ]);

  const clickTrashBox = (id) => {
    setEditDataList(prevDataList => prevDataList.filter(item => item.id !== id));
  };

  const handleEditClick = (id) => {
    setIsEditing(id);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditDataList(prevDataList =>
      prevDataList.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const navigate = useNavigate();

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Atribute</p>
        <div className={style.componentsPage}>
          <div className={style.componentsPage_header}>
            <input className={style.componentsPage_header_input} type="text" />
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
            {
              editDataList.map((item)=>(
                <div key={item.id} className={`${style.componentsPage_bottom_main} ${deleteBox ? style.componentsPage_bottom_main_displayNone : ""}`}>
                  {isEditing ===item.id ? (
                    <>
                      <input
                        name="status"
                        value={item.status}
                        onChange={(e)=>handleInputChange(e,item.id)}
                        className={style.componentsPage_bottom_main_productName}
                        required
                        type='text'
                      />
                      <input
                        name="status"
                        value={item.status}
                        onChange={(e)=>handleInputChange(e,item.id)}
                        className={style.componentsPage_bottom_main_productStatus}
                        required
                      />
                      <input
                        name="weight"
                        value={item.weight}
                        onChange={(e)=>handleInputChange(e,item.id)}
                        className={style.componentsPage_bottom_main_productWeight}
                        required
                        type='number'
                      />
                      <input
                        name="img"
                        value={item.img}
                        onChange={(e)=>handleInputChange(e,item.id)}
                        className={style.componentsPage_bottom_main_productImg}
                        required
                      />
                      <input
                        name="slug"
                        value={item.slug}
                        onChange={(e)=>handleInputChange(e,item.id)}
                        className={style.componentsPage_bottom_main_productSlug}
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
                <FaPenFancy className={style.componentsPage_bottom_main_iconBox_icon} onClick={() => handleEditClick(item.id)} />
                <FaTrash className={style.componentsPage_bottom_main_iconBox_icon} onClick={() => clickTrashBox(item.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default UserInfo;
