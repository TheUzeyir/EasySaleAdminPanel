import React ,{useState,useRef}from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { HiArrowTrendingUp,HiArrowTrendingDown } from "react-icons/hi2";
import style from "./mainElement.module.css"

const MainElement = () => {

  return (
    <div className='mainElement'>
      <div className="container">
        <div className={style.mainElements_headerBoxs}>
            <div className={style.mainElements_headerBoxs_card}>
                <FaShoppingBag/>
                <div className="mainElements_headerBoxs_card_textBox">
                <p>Total Sales</p>
                <p>34,985</p>
                </div>  
                <p><HiArrowTrendingUp /> 1.5%</p>
            </div>
            <div className={style.mainElements_headerBoxs_card}>
                <FaShoppingBag/>
                <div className="mainElements_headerBoxs_card_textBox">
                <p>Total Sales</p>
                <p>34,985</p>
                </div>  
                <p><HiArrowTrendingUp /> 1.5%</p>
            </div>
            <div className={style.mainElements_headerBoxs_card}>
                <FaShoppingBag/>
                <div className="mainElements_headerBoxs_card_textBox">
                <p>Total Sales</p>
                <p>34,985</p>
                </div>  
                <p><HiArrowTrendingUp /> 1.5%</p>
            </div>
            <div className={style.mainElements_headerBoxs_card}>
                <FaShoppingBag/>
                <div className="mainElements_headerBoxs_card_textBox">
                <p>Total Sales</p>
                <p>34,985</p>
                </div>  
                <p><HiArrowTrendingUp /> 1.5%</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainElement
