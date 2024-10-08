import React, { useState } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { CgShapeRhombus } from "react-icons/cg";
import style from './headerSideBar.module.css';
import { useNavigate } from 'react-router';
import { FaUser } from "react-icons/fa";

const HeaderSideBar = ({ hideBar }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate=useNavigate()

  const categories = [
    { name: 'Dasboard', item: ['lorem', 'lorem', 'lorem'], icon: <BiSolidCategory /> },
    { name: 'User', item: ['All User', 'Add New User', 'Login','Sign Up'], icon: <FaUser /> },
    { name: 'Category', item: ['lorem', 'lorem', 'lorem'], icon: <BiSolidCategory /> },
    { name: 'Report', item: ['lorem', 'lorem', 'lorem'], icon: <BiSolidCategory /> }
  ];

  const mainCategory = categories[0]; 
  const remainingCategories = categories.slice(1); 

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };
  const handleItemClick = (item) => {
    if (item === 'Login') {
      navigate('/login');
    }
  };
  return (
    <div className={style.headerSideBar}>
      <div className={style.headerSideBar_header}>
        <span className={style.headerSideBar_logo}>EasySale</span>  
        <FaBarsStaggered className={style.headerSideBar_header_icon} onClick={hideBar}/> 
      </div>
      <p className={style.headerSideBar_title}>MAIN HOME</p>
      <div className={style.categoryBox_card_boxs}>
        <div className={`${style.categoryBox_card_box} ${activeCategory === 0 ? style.categoryBox_card_box_select : ''}`} 
         onClick={() => toggleCategory(0)}>
          <p className={style.categoryBox_card_box_title}>
            {mainCategory.icon} {mainCategory.name}
          </p>
          <MdOutlineKeyboardArrowDown className={`${style.categoryBox_card_box_icon} ${activeCategory === 0 ? style.categoryBox_card_box_icon_select : ''}`} />
        </div>
        {activeCategory === 0 && (
          <div className={style.categoryBox_card_box_card}>
            {mainCategory.item.map((product, productIndex) => (
              <p className={style.categoryBox_card_box_card_item} key={productIndex}><CgShapeRhombus className={style.categoryBox_card_box_card_icon}/>{product}</p>
            ))}
          </div>
        )}
      </div>

      <p className={style.headerSideBar_title}>All Page</p>
      <div className={style.headerSideBar_title_box} onClick={()=>navigate("/category")}><BiSolidCategory className={style.categoryBox_card_box_icon} />Category</div>
      {remainingCategories.map((category, index) => (
        <div key={index + 1} className={style.categoryBox_card_boxs}>
          <div  className={`${style.categoryBox_card_box} ${activeCategory === index+1 ? style.categoryBox_card_box_select : ''}`}  
            onClick={() => toggleCategory(index + 1)}>
            <p className={style.categoryBox_card_box_title}>
              {category.icon} {category.name}
            </p>
            <MdOutlineKeyboardArrowDown className={`${style.categoryBox_card_box_icon} ${activeCategory === index+1 ? style.categoryBox_card_box_icon_select : ''}`} />
          </div>
          {activeCategory === index + 1 && (
            <div className={style.categoryBox_card_box_card}>
              {category.item.map((product, productIndex) => (
                <p
                  className={style.categoryBox_card_box_card_item}
                  key={productIndex}
                  onClick={() => handleItemClick(product)} 
                >
                  <CgShapeRhombus className={style.categoryBox_card_box_card_icon} />
                  {product}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HeaderSideBar;