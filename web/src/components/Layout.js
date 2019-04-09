import React, { useState } from 'react'
import { Link } from "react-router-dom"

import logo from '../images/logoO.png'
import CategoryList from './CategoryList'

export default props => {

  const [category, setCategory] = useState('')

  return (
    <div>
      <div className="top clear">
        <div className="fl logo">
          <img src={logo} alt=""/>
        </div>
        <ul className="fr nav clear">
          <li className="fl nav-active">控件</li>
          <li className="fl">期刊</li>
          <li className="fl">文章</li>
          <li className="fl">招聘</li>
          <li className="fl">问答</li>
          <li className="fl">关于</li>
        </ul>
      </div>
      <CategoryList setCategory={setCategory}/>
      <div className="main">
        <div className="main-box">
          <div className="title">
            <span>{category}</span>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}
