import React , {Component} from 'react';
import '../asset/css/check.scss';

import Dicom from "./upload"
import Checkres from "./resShow"

import {connect} from "react-redux"

class CheckUpload extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {upload} = this.props.counter
        return(
            <div>
                {upload ? <Checkres /> : <Dicom />}
            </div>
        )
    }
}

const getcounter= state=>{
    return {
      counter : state.counter
    }
  }
  
  
  
export default  connect(getcounter , null)(CheckUpload)