import React, { Component } from 'react'
import { observer } from "mobx-react"
import logo from '../images/logo.png'

@observer
export default class Home extends Component {

  render() {
    return (
      <div>
        <div className="top clear">
          <div className="fl logo">
            <img src={logo} alt=""/>
            <span>Open Flutter</span>
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
        <div className="nav-list">
          <div className="container">
            <div className="type">分类</div>
            <ul className="nav-main">
              <li>控件运营运营运营</li>
              <li>运营运营运营</li>
              <li>音乐音乐音乐音乐音乐</li>
              <li>图纸</li>
            </ul>
            <div className="type">分类</div>
            <ul className="nav-main">
              <li className="nav-list-active">控件</li>
              <li>运营音乐音乐音乐</li>
              <li>音乐音乐音乐音乐音乐音乐音乐</li>
              <li>图纸</li>
            </ul>

          </div>
        </div>
        <div className="main">
          <div className="main-box">
            <div className="title">
              <span>音乐</span>
            </div>
            <ul className="main-list clear">
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
              <li className="main-item fl">
                <div className="main-img"></div>
                <div className="main-title">Image_picker: 1.1.1</div>
                <div className="limit clear">
                  <span className="fl"></span>
                  <span className="fl"></span>
                </div>
              </li>
            </ul>
            <div className="loadMore">加载更多</div>
          </div>
        </div>
      </div>
    )
  }
}
