import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../header/header';
import style from './componentsPage.module.css';
import ComponentsUpdate from './componentsUpdate';
import InfiniteScroll from 'react-infinite-scroll-component';

const ComponentsPage = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isComponentUpdateCard, setComponentUpdateCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az&page=1&limit=10');
      const { data } = response.data;
      if (Array.isArray(data)) {
        setDataList(data);
        setHasMore(data.length > 0); // Check if more data is available
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (loading) return; // Prevent loading new data if a request is still in progress
    setLoading(true);
    try {
      const nextPage = Math.ceil(dataList.length / 10) + 1; // Calculate next page
      const response = await axios.get(`http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az&page=${nextPage}&limit=10`);
      const { data } = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setDataList((prev) => [...prev, ...data]);
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  const clickTrashBox = (categoryId) => {
    axios.delete(`http://restartbaku-001-site4.htempurl.com/api/Category/delete-category/${categoryId}`)
      .then(response => {
        if (response.data.isSuccessful) {
          setDataList(prevDataList => prevDataList.filter(item => item.categoryId !== categoryId));
        } else {
          console.error('Failed to delete the category:', response.data);
        }
      })
      .catch(error => {
        console.error('Error deleting the category:', error);
      });
  };

  const handleUpdateSuccess = () => {
    setComponentUpdateCard(null);
    fetchData(); // Refresh data after update
  };

  return (
    <div className={style.componentsPage_container}>
      <Header />
      <div className="container">
        <p className={style.componentsPage_title}>Add Attribute</p>
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
              <p className={style.componentsPage_bottom_header_title}>Title</p>
              <p className={style.componentsPage_bottom_header_title}>Parent ID</p>
              <p className={style.componentsPage_bottom_header_title}>Image</p>
              <p className={style.componentsPage_bottom_header_title}>Action</p>
            </div>

            {/* Infinite Scroll Component */}
            <InfiniteScroll
              dataLength={dataList.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading more categories...</h4>}
              endMessage={<p>No more categories to load</p>}
              scrollThreshold={0.9}
            >
              {dataList.map((item) => (
                <div key={item.categoryId} className={style.componentsPage_bottom_main_container}>
                  <div className={`${style.componentsPage_bottom_main} ${deleteBox ? style.componentsPage_bottom_main_displayNone : ""}`}>
                    <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryId}</p>
                    <p className={style.componentsPage_bottom_main_productTitle}>{item.categoryTitle}</p>
                    <p className={style.componentsPage_bottom_main_productParentId}>{item.parentId || 'N/A'}</p>
                    <div className={style.componentsPage_bottom_main_productImageBox}>
                      <img 
                        src={item.categoryImage}
                        alt={item.categoryTitle} 
                        className={style.componentsPage_bottom_main_productImage}
                      />
                    </div>
                    <div className={style.componentsPage_bottom_main_iconBox}>
                      <FaPenFancy className={style.componentsPage_bottom_main_iconBox_icon} 
                        onClick={() => setComponentUpdateCard(item)} 
                      />
                      <FaTrash 
                        className={style.componentsPage_bottom_main_iconBox_icon} 
                        onClick={() => clickTrashBox(item.categoryId)} 
                      />
                    </div>
                  </div>
                  {isComponentUpdateCard?.categoryId === item.categoryId && (
                    <ComponentsUpdate 
                      item={item} 
                      onUpdateSuccess={handleUpdateSuccess} 
                    />
                  )}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
