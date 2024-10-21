import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaPenFancy, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../header/header';
import style from './componentsPage.module.css';
import ComponentsUpdate from '../componentsUpdate/ComponentsUpdate';
import InfiniteScroll from 'react-infinite-scroll-component';

const ComponentsPage = () => {
  const [deleteBox, setDeleteBox] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isComponentUpdateCard, setComponentUpdateCard] = useState(null); // Track the component update state
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal open state
  const [hasMore, setHasMore] = useState(true); // For InfiniteScroll
  const navigate = useNavigate();

  // Example/mock data for testing
  const mockItem = {
    categoryId: 1,
    categoryTitle: 'Sample Category',
    parentId: 0,
    categoryImage: 'sample.jpg',
    languageId: 1
  };

  // Handle when pencil icon is clicked
  const handleEditClick = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // After successful update
  const handleUpdateSuccess = () => {
    setIsModalOpen(false); // Close the modal after update
    // Optionally refresh data here if needed
  };

  // Fetch data on component mount
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
        setHasMore(data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch more data when InfiniteScroll reaches threshold
  const fetchMoreData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = Math.ceil(dataList.length / 10) + 1;
      const response = await axios.get(`http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az&page=${nextPage}&limit=10`);
      const { data } = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setDataList((prev) => [...prev, ...data]);
      } else {
        setHasMore(false); // No more data
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category deletion
  const clickTrashBox = async (categoryId) => {
    try {
      const response = await axios.delete(`http://restartbaku-001-site4.htempurl.com/api/Category/delete-category/${categoryId}`);
      if (response.data.isSuccessful) {
        setDataList((prevDataList) => prevDataList.filter((item) => item.categoryId !== categoryId));
        alert('Category deleted successfully!');
      } else {
        console.error('Failed to delete the category:', response.data);
        alert('Failed to delete category.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        alert(`Error deleting category: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('No response from server. Please try again later.');
      } else {
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
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
                        onClick={() => handleEditClick(item)} 
                      />
                      <FaTrash 
                        className={style.componentsPage_bottom_main_iconBox_icon} 
                        onClick={() => clickTrashBox(item.categoryId)} 
                      />
                    </div>
                  </div>
                  {isModalOpen && selectedItem && selectedItem.categoryId === item.categoryId && (
                    <ComponentsUpdate 
                      item={selectedItem} 
                      onUpdateSuccess={handleUpdateSuccess}
                      onClose={handleCloseModal}                    
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
