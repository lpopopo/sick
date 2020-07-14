import React , {Component} from 'react';
import './App.css';

import Login from "./Component/longin"
import Check from "./Component/check"

import {connect} from "react-redux"

class App extends  Component{
  constructor(props){
    super(props)
  }

  render(){
    const {onload} = this.props.counter
    return(
      <div id="App" style={{'height' : '100%' , 'width' : '100%'}}>
        {onload ? <Check /> : <Login />}
      </div>
    )
  }
}

const getcounter= state=>{
  return {
    counter : state.counter
  }
}



export default  connect(getcounter , null)(App)
