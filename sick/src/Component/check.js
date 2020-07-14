import React , {Component} from 'react';
import '../asset/css/check.scss';

import CheckreUpload from "./checkUpload"
import History from "./history"

import yishneg from "../asset/img/yisheng.png"

import {Menu} from 'element-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"


import {Button} from "element-react"

class App extends  Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="App">
        <Router>
          <div className="appBox">
            <div className="navigation">
              <div className="avcter">
                <span className="img">
                   <img src= {yishneg} alt="" />
                </span>
                <span className="text">
                  <p>test</p>
                  <Button size='small' type="text" icon="setting"></Button>
                </span>
              </div>
              <Menu defaultActive="1" className="el-menu-vertical-demo">
                {/* <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>智能检测</span>}>
                  <Menu.ItemGroup title="分组一">
                    <Menu.Item index="1-1">
                      <Link to="/home1">
                        智能检测
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu> */}
                <Link to="/home1">
                  <Menu.Item index="1">
                    <i className="el-icon-menu">
                      &nbsp;&nbsp;Intelligent detection
                  </i>
                  </Menu.Item>
                </Link>
                <Link to="/history">
                  <Menu.Item index="2">
                    <i className="el-icon-star-on">
                      &nbsp;&nbsp;History
                  </i>
                  </Menu.Item>
                </Link>
              </Menu>
            </div>
            <div className="content">
              <Route exact path="/home1" component={CheckreUpload} />
              <Route  path="/history" component={History} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}




export default  App
